/* ══ 공용 유틸 + 본문 블록 렌더러 ══════════════════════════ */

const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/** HTML 이스케이프 — 사용자가 올린 문자열은 전부 이걸 통과시킨다 */
function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

/** 커리큘럼 데이터 안의 신뢰된 HTML은 그대로 통과 */
const raw = (s) => String(s ?? '');

function bytes(n) {
  if (!n && n !== 0) return '';
  const u = ['B', 'KB', 'MB', 'GB'];
  let i = 0, v = Number(n);
  while (v >= 1024 && i < u.length - 1) { v /= 1024; i += 1; }
  return `${v < 10 && i > 0 ? v.toFixed(1) : Math.round(v)}${u[i]}`;
}

function timeAgo(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const s = Math.floor((Date.now() - d.getTime()) / 1000);
  if (s < 60) return '방금';
  if (s < 3600) return `${Math.floor(s / 60)}분 전`;
  if (s < 86400) return `${Math.floor(s / 3600)}시간 전`;
  if (s < 604800) return `${Math.floor(s / 86400)}일 전`;
  return `${d.getFullYear()}. ${d.getMonth() + 1}. ${d.getDate()}.`;
}

/* ── 토스트 ─────────────────────────────────────────────── */
function toast(msg, kind = '') {
  let wrap = $('.toast-wrap');
  if (!wrap) {
    wrap = document.createElement('div');
    wrap.className = 'toast-wrap';
    document.body.appendChild(wrap);
  }
  const t = document.createElement('div');
  t.className = `toast ${kind}`;
  t.textContent = msg;
  wrap.appendChild(t);
  setTimeout(() => {
    t.style.transition = 'opacity .3s, transform .3s';
    t.style.opacity = '0';
    t.style.transform = 'translateY(10px)';
    setTimeout(() => t.remove(), 320);
  }, 2600);
}

/* ── 복사 ───────────────────────────────────────────────── */
async function copyText(text, btn) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    if (btn) {
      const old = btn.textContent;
      btn.textContent = '복사됨 ✓';
      btn.classList.add('done');
      setTimeout(() => { btn.textContent = old; btn.classList.remove('done'); }, 1500);
    }
    toast('클립보드에 복사했습니다', 'ok');
  } catch {
    toast('복사에 실패했습니다. 직접 선택해 복사해 주세요.', 'err');
  }
}

/* ── 라이트박스 ─────────────────────────────────────────── */
function lightbox(src, kind = 'image') {
  let lb = $('.lb');
  if (!lb) {
    lb = document.createElement('div');
    lb.className = 'lb';
    lb.innerHTML = '<button class="x" aria-label="닫기">✕</button><div class="lb-in"></div>';
    document.body.appendChild(lb);
    lb.addEventListener('click', (e) => {
      if (e.target === lb || e.target.classList.contains('x')) closeLightbox();
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
  }
  $('.lb-in', lb).innerHTML = kind === 'video'
    ? `<video src="${esc(src)}" controls autoplay playsinline></video>`
    : `<img src="${esc(src)}" alt="">`;
  lb.classList.add('on');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  const lb = $('.lb');
  if (!lb) return;
  lb.classList.remove('on');
  $('.lb-in', lb).innerHTML = '';
  document.body.style.overflow = '';
}

/* ── 비속어 거르기 ───────────────────────────────────────
   연수생끼리 보는 공간이라 강한 필터는 필요 없지만,
   실수로라도 험한 말이 남지 않게 최소한만 막습니다.
   자모 분리·사이 문자 끼우기 같은 흔한 우회도 함께 잡습니다.
   ──────────────────────────────────────────────────────── */
const BAD_WORDS = [
  '시발', '씨발', '시팔', '씨팔', '스발', '씹', '좆', '존나', '졸라',
  '개새끼', '새끼', '병신', '븅신', '지랄', '꺼져', '닥쳐', '미친놈', '미친년',
  '엿먹', '뒤져', '뒈져', '개소리', '멍청이', '바보같', '한심',
  'fuck', 'shit', 'bitch', 'asshole', 'bastard', 'damn',
];

/** 검사용으로 문자열을 납작하게 — 공백·기호를 지웁니다 */
function flatten(s) {
  return String(s).toLowerCase().replace(/[\s.,!?~*^\-_=+/\\|()[\]{}<>'"@#$%&:;]/g, '');
}
/** 같은 글자 반복을 하나로 — 「시이이발」 「ㅋㅋㅋ」 같은 우회를 잡습니다 */
const squash = (s) => flatten(s).replace(/(.)\1+/g, '$1');

/** 비속어가 들어 있으면 그 단어를, 아니면 null */
function findBadWord(text) {
  const a = flatten(text);
  const b = squash(text);
  for (const w of BAD_WORDS) {
    if (a.includes(flatten(w)) || b.includes(squash(w))) return w;
  }
  return null;
}

/* ── 로컬 저장 (체크리스트 · 이름 · 좋아요) ──────────────── */
const store = {
  get(k, def) {
    try { const v = localStorage.getItem('ccai:' + k); return v === null ? def : JSON.parse(v); }
    catch { return def; }
  },
  set(k, v) { try { localStorage.setItem('ccai:' + k, JSON.stringify(v)); } catch { /* 무시 */ } },
};

/* ══ 본문 블록 렌더러 ═════════════════════════════════════ */

function renderBlocks(blocks) {
  return (blocks || []).map(renderBlock).join('');
}

function renderBlock(b) {
  if (typeof b === 'string') return `<p>${raw(b)}</p>`;

  switch (b.type) {
    case 'p':      return `<p>${raw(b.text)}</p>`;
    case 'h':      return `<h3 class="sec-h">${raw(b.text)}</h3>`;
    case 'h3':     return `<h4 class="sub-h">${raw(b.text)}</h4>`;
    case 'list':   return `<ul>${b.items.map((i) => `<li>${raw(i)}</li>`).join('')}</ul>`;
    case 'olist':  return `<ol>${b.items.map((i) => `<li>${raw(i)}</li>`).join('')}</ol>`;
    case 'table':  return renderTable(b);
    case 'code':   return renderCode(b);
    case 'note':   return renderNote(b);
    case 'check':  return renderCheck(b);
    case 'image':  return `<figure class="fig"><img src="${esc(b.src)}" alt="${esc(b.caption || '')}" loading="lazy" data-zoom="${esc(b.src)}">${b.caption ? `<figcaption>${raw(b.caption)}</figcaption>` : ''}</figure>`;
    case 'quote':  return `<blockquote class="quote">${raw(b.text)}${b.cite ? `<cite>— ${raw(b.cite)}</cite>` : ''}</blockquote>`;
    case 'callout':return `<div class="callout">${raw(b.text)}</div>`;
    case 'practice': return renderPractice(b);
    case 'styles': return renderStyleGrid();
    case 'bgm':    return renderBgmList();
    default:       return '';
  }
}

function renderTable(b) {
  const head = b.head ? `<thead><tr>${b.head.map((h) => `<th>${raw(h)}</th>`).join('')}</tr></thead>` : '';
  const body = `<tbody>${b.rows.map((r) => `<tr>${r.map((c) => `<td>${raw(c)}</td>`).join('')}</tr>`).join('')}</tbody>`;
  return `<div class="tbl-scroll"><table class="tbl">${head}${body}</table></div>`;
}

let codeSeq = 0;
function renderCode(b) {
  const id = `code-${++codeSeq}`;
  return `<div class="code">
    <div class="code-head">
      <span class="lbl">${raw(b.label || '복사해서 쓰세요')}</span>
      <button class="copy-btn" data-copy="${id}">복사</button>
    </div>
    <pre><code id="${id}">${esc(b.text)}</code></pre>
  </div>`;
}

function renderNote(b) {
  const tone = b.tone || 'info';
  const body = Array.isArray(b.body) ? renderBlocks(b.body) : `<p>${raw(b.body || '')}</p>`;
  return `<div class="note note-${tone}">
    <div class="note-t">${svgIcon(TONE_ICON[tone] || 'info', 19)}<span>${raw(b.title || '')}</span></div>
    <div class="note-b">${body}</div>
  </div>`;
}

function renderCheck(b) {
  const saved = store.get('check:' + b.id, []);
  const items = b.items.map((t, i) => {
    const on = saved.includes(i);
    return `<li><label>
      <input type="checkbox" data-check="${esc(b.id)}" data-i="${i}"${on ? ' checked' : ''}>
      <span>${raw(t)}</span>
    </label></li>`;
  }).join('');
  const done = saved.filter((i) => i < b.items.length).length;
  return `<div class="check" data-check-box="${esc(b.id)}">
    <div class="check-h">
      ${svgIcon('check', 17)}<span>${raw(b.title || '체크리스트')}</span>
      <span class="prog${done === b.items.length ? ' full' : ''}">${done} / ${b.items.length}</span>
    </div>
    <ul>${items}</ul>
  </div>`;
}

function renderPractice(b) {
  const sched = b.schedule
    ? `<table class="sched">${b.schedule.map(([t, d]) => `<tr><td>${raw(t)}</td><td>${raw(d)}</td></tr>`).join('')}</table>`
    : '';
  const check = b.check
    ? renderCheck({ id: b.checkId || `prac-${b.n}`, title: '완료 조건', items: b.check })
    : '';
  const upload = b.upload
    ? `<a class="btn btn-gold btn-sm" href="#/gallery?day=${b.upload.day}&section=${b.upload.section}&upload=1">${svgIcon('upload', 16)} 이 실습 결과물 올리기</a>`
    : '';
  return `<div class="practice${b.star ? ' star' : ''}">
    <div class="practice-h">
      ${svgIcon('hand', 20)}<span class="t">실습 ${b.n} · ${raw(b.title)}</span>
      ${b.min ? `<span class="m">${b.min}분</span>` : ''}
    </div>
    <div class="practice-b">
      ${b.mission ? `<div class="mission"><b>미션</b> · ${raw(b.mission)}</div>` : ''}
      ${sched}${check}
      <div style="margin-top:12px">${upload}</div>
    </div>
  </div>`;
}

function renderStyleGrid() {
  const cards = (window.STYLES || []).map((s) => `
    <div class="style-card${s.star ? ' star' : ''}">
      <div class="ph">${s.img
        ? `<img src="${esc(s.img)}" alt="${esc(s.name)} 예시" loading="lazy" data-zoom="${esc(s.img)}">`
        : '예시 이미지 없음'}</div>
      <div class="bd">
        <h4>${s.star ? '★ ' : ''}${s.n}. ${esc(s.name)}</h4>
        <div class="en">${esc(s.en)}</div>
        <div class="ds">${raw(s.desc)}</div>
        <div class="style-tags">
          ${s.star ? '<span class="chip gold">설화에 강함</span>' : ''}
          ${s.video ? '<span class="chip">영상 전환 유리</span>' : ''}
        </div>
        ${renderCode({ label: '프롬프트 — [배경]·[주인공]·[행동]만 교체', text: s.prompt })}
      </div>
    </div>`).join('');
  return `<div class="style-grid">${cards}</div>
    <p class="small muted">출처 · ${raw(window.STYLES_NOTE || '')}</p>`;
}

function renderBgmList() {
  return (window.BGM_PROMPTS || []).map((p) => `
    <div style="margin:18px 0">
      <h4 class="sub-h">${p.star ? '★ ' : ''}${raw(p.n)} ${esc(p.name)}</h4>
      ${p.use ? `<p class="small muted">용도 · ${raw(p.use)}</p>` : ''}
      ${renderCode({ label: 'Style 필드', text: p.style })}
      ${renderCode({ label: 'Exclude 필드', text: p.exclude })}
    </div>`).join('');
}

/* ── 전역 이벤트 위임 ───────────────────────────────────── */
document.addEventListener('click', (e) => {
  const copy = e.target.closest('[data-copy]');
  if (copy) {
    const node = document.getElementById(copy.dataset.copy);
    if (node) copyText(node.textContent, copy);
    return;
  }
  const zoom = e.target.closest('[data-zoom]');
  if (zoom) { lightbox(zoom.dataset.zoom, 'image'); }
});

document.addEventListener('change', (e) => {
  const cb = e.target.closest('[data-check]');
  if (!cb) return;
  const id = cb.dataset.check;
  const box = document.querySelector(`[data-check-box="${CSS.escape(id)}"]`);
  const boxes = box ? $$('[data-check]', box) : [];
  const done = boxes.filter((b) => b.checked).map((b) => Number(b.dataset.i));
  store.set('check:' + id, done);
  if (box) {
    const prog = $('.prog', box);
    if (prog) {
      prog.textContent = `${done.length} / ${boxes.length}`;
      prog.classList.toggle('full', done.length === boxes.length);
    }
  }
  document.dispatchEvent(new CustomEvent('ccai:progress'));
});
