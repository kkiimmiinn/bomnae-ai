/* ══ 백엔드 어댑터 ═════════════════════════════════════════
   화면 쪽 코드는 API.* 만 부릅니다. 저장이 내 PC로 가는지
   구글 드라이브로 가는지는 여기서만 갈립니다.

   gas 모드의 파일 업로드는 「재개 가능 업로드」를 씁니다.
     ① Apps Script 가 파일 하나짜리 일회용 업로드 주소를 발급
     ② 브라우저가 그 주소로 드라이브에 직접 전송  ← 용량 제한 없음
     ③ 완료되면 Apps Script 가 시트에 한 줄 기록
   Apps Script 를 파일이 통과하지 않으므로 영상도 그대로 올라갑니다.
   ═════════════════════════════════════════════════════════ */

const CFG = window.CCAI_CONFIG || { backend: 'local', gasUrl: '' };
const IS_GAS = CFG.backend === 'gas';

/* 드라이브 파일 ID → 화면에서 쓸 주소들.
   썸네일은 올린 직후 바로 안 만들어지는 경우가 있어 대체 주소를 함께 줍니다. */
function driveUrls(id, kind) {
  return {
    url:   `https://drive.google.com/uc?export=download&id=${id}`,
    thumb: `https://lh3.googleusercontent.com/d/${id}=w1200`,
    thumb2: `https://drive.google.com/thumbnail?id=${id}&sz=w1200`,
    embed: `https://drive.google.com/file/d/${id}/preview`,
    kind,
  };
}

/* 확장자로 종류 판별 (양쪽 백엔드 공통) */
function kindOf(name) {
  const ext = String(name).toLowerCase().replace(/^.*(\.[^.]+)$/, '$1');
  if (/^\.(png|jpe?g|gif|webp|avif|svg)$/.test(ext)) return 'image';
  if (/^\.(mp4|mov|webm|m4v)$/.test(ext)) return 'video';
  if (/^\.(mp3|wav|m4a|ogg)$/.test(ext)) return 'audio';
  return 'file';
}

/* ── GAS 통신 ────────────────────────────────────────────
   POST 는 Content-Type 을 text/plain 으로 보냅니다.
   그래야 브라우저가 사전 확인(preflight)을 건너뛰어
   Apps Script 가 못 받는 OPTIONS 요청이 생기지 않습니다.
   ──────────────────────────────────────────────────────── */
/* Apps Script 는 같은 사용자의 요청을 한 줄로 세웁니다.
   동시에 쏘면 서로 기다리다 20초씩 걸리므로, 여기서 한 번에 하나씩 보냅니다. */
let gasQueue = Promise.resolve();
function gasSerial(fn) {
  const run = gasQueue.then(fn, fn);
  gasQueue = run.catch(() => {});   // 실패해도 줄은 계속 흐르게
  return run;
}

async function gasGet(params) {
  return gasSerial(async () => {
    const q = new URLSearchParams(params).toString();
    const res = await fetch(`${CFG.gasUrl}?${q}`, { method: 'GET', redirect: 'follow' });
    if (!res.ok) throw new Error(`서버 응답 ${res.status}`);
    return res.json();
  });
}

async function gasPost(payload) {
  return gasSerial(async () => {
    const res = await fetch(CFG.gasUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
      redirect: 'follow',
    });
    if (!res.ok) throw new Error(`서버 응답 ${res.status}`);
    return res.json();
  });
}

/* 목록을 잠깐 재사용합니다. 통계도 목록에서 뽑아 쓰면 왕복이 절반으로 줍니다. */
let listCache = { at: 0, data: null };
const CACHE_MS = 4000;

/* 브라우저가 드라이브에 직접 PUT 할 수 있는지 여부.
   null=아직 모름 / true=가능 / false=막힘(조각 릴레이로) */
let directPutOk = null;

/** 바이트를 base64 로. 큰 배열을 한 번에 펼치면 스택이 터지므로 나눠서 처리합니다. */
function toBase64(buf) {
  const bytes = new Uint8Array(buf);
  let s = '';
  const STEP = 0x8000;
  for (let i = 0; i < bytes.length; i += STEP) {
    s += String.fromCharCode.apply(null, bytes.subarray(i, i + STEP));
  }
  return btoa(s);
}

/** 조각 릴레이 — 4MB 씩 잘라 Apps Script 를 거쳐 드라이브로 보냅니다. */
async function relayToDrive(uploadUrl, file, onProgress) {
  const CHUNK = 4 * 1024 * 1024;          // 드라이브 규격상 256KB 배수여야 합니다
  const total = file.size;
  let start = 0;
  let meta = null;

  while (start < total) {
    const end = Math.min(start + CHUNK, total);
    const slice = await file.slice(start, end).arrayBuffer();
    const res = await gasPost({
      action: 'chunk',
      uploadUrl,
      mime: file.type || 'application/octet-stream',
      data: toBase64(slice),
      start,
      total,
    });
    if (!res.ok) throw new Error(res.message || '조각 전송에 실패했습니다');
    start = end;
    if (onProgress) onProgress(start, total);
    if (res.done) meta = res.file;
  }
  if (!meta) throw new Error('업로드가 끝나지 않았습니다');
  return meta;
}

/** 파일 하나를 드라이브로 직접 올립니다. 진행률 콜백을 받습니다. */
function putToDrive(uploadUrl, file, onProgress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', uploadUrl);
    xhr.setRequestHeader('Content-Type', file.type || 'application/octet-stream');
    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable && onProgress) onProgress(e.loaded, e.total);
    });
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try { resolve(JSON.parse(xhr.responseText)); }
        catch { reject(new Error('업로드 응답을 읽지 못했습니다')); }
      } else {
        reject(new Error(`드라이브 업로드 실패 (${xhr.status})`));
      }
    });
    xhr.addEventListener('error', () => reject(new Error('네트워크가 끊겼습니다')));
    xhr.addEventListener('abort', () => reject(new Error('업로드가 취소되었습니다')));
    xhr.send(file);
  });
}

/* ══ 공개 API ═════════════════════════════════════════════ */
window.API = {
  mode: CFG.backend,
  isGas: IS_GAS,

  /** 백엔드가 살아 있는지 */
  async ping() {
    if (!IS_GAS) {
      const r = await fetch('/api/stats');
      return { ok: r.ok, mode: 'local' };
    }
    if (!CFG.gasUrl) return { ok: false, message: 'js/config.js 의 gasUrl 이 비어 있습니다' };
    const r = await gasGet({ action: 'ping' });
    return { ...r, mode: 'gas' };
  },

  async list({ day = 'all', section = 'all', q = '' } = {}) {
    if (!IS_GAS) {
      const r = await fetch(`/api/works?day=${encodeURIComponent(day)}&section=${encodeURIComponent(section)}&q=${encodeURIComponent(q)}`);
      return r.json();
    }
    // 전체 목록을 한 번만 받아 두고, 거르기·검색은 브라우저에서 합니다.
    // Apps Script 왕복이 몇 초씩 걸려서 필터마다 부르면 느립니다.
    const all = await this.listAll();
    let items = all.items.slice();
    if (day !== 'all') items = items.filter((w) => String(w.day) === String(day));
    if (section !== 'all') items = items.filter((w) => w.section === section);
    if (q) {
      const needle = String(q).toLowerCase();
      items = items.filter((w) => [w.title, w.author, w.school, w.description, w.sectionLabel, (w.tags || []).join(' ')]
        .filter(Boolean).join(' ').toLowerCase().includes(needle));
    }
    return { ok: true, count: items.length, items };
  },

  /** 전체 목록 (짧게 캐시) */
  async listAll(force) {
    if (!force && listCache.data && Date.now() - listCache.at < CACHE_MS) return listCache.data;
    const r = await gasGet({ action: 'list', day: 'all', section: 'all', q: '' });
    for (const w of r.items || []) {
      w.files = (w.files || []).map((f) => ({
        ...f, ...driveUrls(f.id, f.kind || kindOf(f.originalName)),
      }));
    }
    listCache = { at: Date.now(), data: r };
    return r;
  },

  async stats() {
    if (!IS_GAS) return (await fetch('/api/stats')).json();
    // 목록에서 뽑습니다 — 서버를 한 번 더 부르지 않습니다
    const r = await this.listAll();
    const byDay = { 1: 0, 2: 0 };
    const bySection = {};
    const authors = new Set();
    let files = 0, bytes = 0;
    for (const w of r.items || []) {
      byDay[w.day] = (byDay[w.day] || 0) + 1;
      bySection[w.section] = (bySection[w.section] || 0) + 1;
      if (w.author) authors.add(w.author);
      for (const f of w.files || []) { files += 1; bytes += f.size || 0; }
    }
    const latest = (r.items || []).reduce((a, w) => (!a || w.createdAt > a ? w.createdAt : a), null);
    return { ok: true, works: (r.items || []).length, authors: authors.size, files, bytes, byDay, bySection, latest };
  },

  /**
   * 결과물 등록.
   * @param fields 폼 값 객체
   * @param files  File 배열
   * @param onProgress (올린바이트, 전체바이트, 현재파일명) => void
   */
  async create(fields, files, onProgress) {
    if (!IS_GAS) return createLocal(fields, files, onProgress);
    return createGas(fields, files, onProgress);
  },

  /**
   * 결과물 수정. 본인(editKey) 또는 관리자만 됩니다.
   * @param removeIds 뺄 기존 파일 — local 은 저장 파일명, gas 는 드라이브 ID
   * @param newFiles  새로 붙일 File 배열
   */
  async update(id, fields, newFiles, removeIds, onProgress, auth = {}) {
    if (!IS_GAS) return updateLocal(id, fields, newFiles, removeIds, onProgress, auth);
    return updateGas(id, fields, newFiles, removeIds, onProgress, auth);
  },

  async like(id, undo) {
    if (!IS_GAS) {
      return (await fetch(`/api/works/${id}/like`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ undo }),
      })).json();
    }
    listCache.at = 0;
    return gasPost({ action: 'like', id, undo });
  },

  async comment(id, author, text) {
    if (!IS_GAS) {
      return (await fetch(`/api/works/${id}/comments`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ author, text }),
      })).json();
    }
    listCache.at = 0;
    return gasPost({ action: 'comment', id, author, text });
  },

  async remove(id, { editKey = '', adminPw = '' } = {}) {
    if (!IS_GAS) {
      return (await fetch(`/api/works/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'x-edit-key': editKey, 'x-admin-pw': adminPw },
      })).json();
    }
    listCache.at = 0;
    return gasPost({ action: 'delete', id, editKey, adminPw });
  },

  async adminLogin(pw) {
    if (!IS_GAS) {
      return (await fetch('/api/admin/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'x-admin-pw': pw }, body: '{}',
      })).json();
    }
    return gasPost({ action: 'adminLogin', adminPw: pw });
  },

  /** CSV — local 은 서버가, gas 는 브라우저가 만듭니다 */
  async exportCsv(pw) {
    if (!IS_GAS) { window.location.href = `/api/admin/export.csv?pw=${encodeURIComponent(pw)}`; return; }
    const r = await gasGet({ action: 'list', day: 'all', section: 'all', q: '' });
    const esc2 = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const head = ['등록일시', '일차', '분류', '제목', '이름', '소속', '설명', '태그', '파일수', '파일목록', '링크', '좋아요', '피드백수'];
    const rows = (r.items || []).map((w) => [
      w.createdAt, w.day, w.sectionLabel || w.section, w.title, w.author, w.school, w.description,
      (w.tags || []).join(' '), (w.files || []).length,
      (w.files || []).map((f) => f.originalName).join(' | '),
      (w.links || []).join(' | '), w.likes || 0, (w.comments || []).length,
    ].map(esc2).join(','));
    const blob = new Blob(['﻿' + [head.map(esc2).join(','), ...rows].join('\r\n')], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'ccai-works.csv';
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  },

  /** 새 글 알림 — local 은 SSE, gas 는 주기 확인 */
  subscribe(onEvent) {
    if (!IS_GAS) {
      if (!window.EventSource) return () => {};
      const es = new EventSource('/api/events');
      es.addEventListener('open', () => onEvent('open'));
      es.addEventListener('error', () => onEvent('error'));
      for (const type of ['work:new', 'work:delete', 'work:like', 'work:comment', 'work:update']) {
        es.addEventListener(type, (e) => {
          if (type === 'work:new') {
            try { const w = JSON.parse(e.data); onEvent('toast', `새 결과물 · ${w.author} 「${w.title}」`); } catch { /* 무시 */ }
          }
          onEvent(type);
        });
      }
      return () => es.close();
    }
    // Apps Script 는 상시 연결을 못 하므로 주기적으로 확인합니다.
    // 왕복이 몇 초씩 걸리니 자주 부르지 않고, 탭이 가려지면 쉽니다.
    let last = null;
    let stopped = false;
    onEvent('open');
    const tick = async () => {
      if (stopped || document.hidden) return;
      try {
        const r = await this.listAll(true);
        const sig = `${(r.items || []).length}:${(r.items || [])[0]?.id || ''}`;
        if (last !== null && sig !== last) onEvent('work:new');
        last = sig;
      } catch { onEvent('error'); }
    };
    setTimeout(tick, 3000);
    const t = setInterval(tick, 20000);
    return () => { stopped = true; clearInterval(t); };
  },
};

/* ── local 업로드 ────────────────────────────────────────── */
function createLocal(fields, files, onProgress) {
  return new Promise((resolve, reject) => {
    const fd = new FormData();
    for (const [k, v] of Object.entries(fields)) fd.append(k, v);
    for (const f of files) fd.append('files', f, f.name);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/works');
    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable && onProgress) onProgress(e.loaded, e.total, '');
    });
    xhr.addEventListener('load', () => {
      let res = {};
      try { res = JSON.parse(xhr.responseText); } catch { /* 무시 */ }
      if (xhr.status >= 200 && xhr.status < 300 && res.ok) resolve(res);
      else resolve({ ok: false, message: res.message || `업로드 실패 (${xhr.status})` });
    });
    xhr.addEventListener('error', () => reject(new Error('서버에 연결하지 못했습니다')));
    xhr.send(fd);
  });
}

/* ── local 수정 ──────────────────────────────────────────── */
function updateLocal(id, fields, newFiles, removeIds, onProgress, auth) {
  return new Promise((resolve, reject) => {
    const fd = new FormData();
    for (const [k, v] of Object.entries(fields)) fd.append(k, v);
    fd.append('removeIds', (removeIds || []).join(','));
    for (const f of newFiles || []) fd.append('files', f, f.name);

    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `/api/works/${id}`);
    xhr.setRequestHeader('x-edit-key', auth.editKey || '');
    xhr.setRequestHeader('x-admin-pw', auth.adminPw || '');
    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable && onProgress) onProgress(e.loaded, e.total, '');
    });
    xhr.addEventListener('load', () => {
      let res = {};
      try { res = JSON.parse(xhr.responseText); } catch { /* 무시 */ }
      resolve(res.ok ? res : { ok: false, message: res.message || `수정 실패 (${xhr.status})` });
    });
    xhr.addEventListener('error', () => reject(new Error('서버에 연결하지 못했습니다')));
    xhr.send(fd);
  });
}

/* ── gas 수정 ────────────────────────────────────────────── */
async function updateGas(id, fields, newFiles, removeIds, onProgress, auth) {
  const uploaded = await sendFilesToDrive(newFiles || [], onProgress);
  if (uploaded.error) return { ok: false, message: uploaded.error };

  listCache.at = 0;
  const res = await gasPost({
    action: 'update',
    id,
    editKey: auth.editKey || '',
    adminPw: auth.adminPw || '',
    removeIds: removeIds || [],
    ...fields,
    files: uploaded.files,
  });
  if (res.ok && res.work) {
    res.work.files = (res.work.files || []).map((x) => ({ ...x, ...driveUrls(x.id, x.kind || kindOf(x.originalName)) }));
  }
  return res;
}

/* 파일들을 드라이브로 보내고 목록을 돌려줍니다 (등록·수정 공용) */
async function sendFilesToDrive(files, onProgress) {
  const total = files.reduce((a, f) => a + f.size, 0) || 1;
  let doneBytes = 0;
  const out = [];

  for (const f of files) {
    const s = await gasPost({
      action: 'createUpload',
      name: f.name,
      mime: f.type || 'application/octet-stream',
      size: f.size,
      origin: location.origin,
    });
    if (!s.ok || !s.uploadUrl) return { error: s.message || '업로드 주소를 받지 못했습니다', files: [] };

    const report = (loaded) => { if (onProgress) onProgress(doneBytes + loaded, total, f.name); };
    let meta;
    if (directPutOk === false) {
      meta = await relayToDrive(s.uploadUrl, f, report);
    } else {
      try {
        meta = await putToDrive(s.uploadUrl, f, report);
        directPutOk = true;
      } catch (err) {
        if (directPutOk === true) throw err;
        directPutOk = false;
        meta = await relayToDrive(s.uploadUrl, f, report);
      }
    }
    doneBytes += f.size;
    out.push({ id: meta.id, originalName: f.name, size: f.size, mime: f.type || '', kind: kindOf(f.name) });
  }
  return { files: out };
}

/* ── gas 업로드 — 파일은 드라이브로 직행 ─────────────────── */
async function createGas(fields, files, onProgress) {
  const total = files.reduce((a, f) => a + f.size, 0) || 1;
  let doneBytes = 0;
  const uploaded = [];

  for (const f of files) {
    // ① 이 파일 하나만 받을 수 있는 일회용 주소를 받아옵니다
    const s = await gasPost({
      action: 'createUpload',
      name: f.name,
      mime: f.type || 'application/octet-stream',
      size: f.size,
      origin: location.origin,
    });
    if (!s.ok || !s.uploadUrl) {
      return { ok: false, message: s.message || '업로드 주소를 받지 못했습니다' };
    }

    // ② 드라이브로 보냅니다.
    //    먼저 직접 PUT 을 시도하고, 구글이 막으면 조각 릴레이로 자동 전환합니다.
    const report = (loaded) => { if (onProgress) onProgress(doneBytes + loaded, total, f.name); };
    let meta;
    if (directPutOk === false) {
      meta = await relayToDrive(s.uploadUrl, f, report);
    } else {
      try {
        meta = await putToDrive(s.uploadUrl, f, report);
        directPutOk = true;
      } catch (err) {
        if (directPutOk === true) throw err;      // 되던 게 실패하면 진짜 오류
        directPutOk = false;                       // 첫 시도부터 막힘 → 릴레이로
        meta = await relayToDrive(s.uploadUrl, f, report);
      }
    }
    doneBytes += f.size;

    uploaded.push({
      id: meta.id,
      originalName: f.name,
      size: f.size,
      mime: f.type || '',
      kind: kindOf(f.name),
    });
  }

  // ③ 시트에 한 줄 기록 + 파일 공유 설정
  const res = await gasPost({ action: 'submit', ...fields, files: uploaded });
  if (res.ok && res.work) {
    res.work.files = (res.work.files || []).map((x) => ({ ...x, ...driveUrls(x.id, x.kind) }));
  }
  return res;
}
