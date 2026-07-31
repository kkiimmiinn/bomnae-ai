/* ══ 라우터 + 페이지 ══════════════════════════════════════ */

const APP = $('#app');
const DAYS = { day1: window.DAY1, day2: window.DAY2 };

/* 우측 세로 문구 — 연수의 한 줄 */
const SIGIL = { t: '봄내', s: '만들고 끝내지 않는다' };

/* ── 라우팅 ─────────────────────────────────────────────── */
function parseHash() {
  const h = location.hash.replace(/^#/, '') || '/';
  const [path, qs] = h.split('?');
  return { path: path.replace(/\/$/, '') || '/', q: new URLSearchParams(qs || '') };
}

const ROUTES = {
  '/':          () => pageHome(),
  '/day1':      () => pageDay('day1'),
  '/day2':      () => pageDay('day2'),
  '/gallery':   (q) => pageGallery(q),
  '/resources': () => pageResources(),
  '/admin':     () => pageAdmin(),
};

let cleanup = null;

function router() {
  if (cleanup) { try { cleanup(); } catch { /* 무시 */ } cleanup = null; }
  const { path, q } = parseHash();
  APP.innerHTML = '';
  (ROUTES[path] || ROUTES['/'])(q);
  $$('.nav-links a').forEach((a) => a.classList.toggle('on', a.getAttribute('href') === '#' + path));
  $('.nav-links')?.classList.remove('open');
  window.scrollTo({ top: 0 });
}
window.addEventListener('hashchange', router);

/* ── 집계 (하드코딩 대신 데이터에서 뽑습니다) ───────────── */
function counts() {
  const days = [window.DAY1, window.DAY2];
  let periods = 0, practices = 0, outputs = 0, prompts = 0;
  for (const d of days) {
    periods += d.sections.length;
    outputs += d.outputs.length;
    for (const s of d.sections) {
      for (const b of s.blocks) {
        if (b.type === 'practice') practices += 1;
        if (b.type === 'code') prompts += 1;
      }
    }
  }
  prompts += (window.STYLES || []).length + (window.BGM_PROMPTS || []).length * 2;
  for (const g of window.CHEATSHEETS || []) prompts += g.items.length;
  return {
    periods, practices, outputs, prompts,
    days: days.length,
    hours: days.reduce((a, d) => a + d.hours, 0),
  };
}

function allCheckIds() {
  const ids = [];
  for (const d of [window.DAY1, window.DAY2]) {
    for (const s of d.sections) {
      for (const b of s.blocks) {
        if (b.type === 'check') ids.push([b.id, b.items.length]);
        if (b.type === 'practice' && b.check) ids.push([b.checkId || `prac-${b.n}`, b.check.length]);
      }
    }
    ids.push([`${d.slug}-instructor`, d.instructorCheck.length]);
  }
  return ids;
}

function progress() {
  let total = 0, done = 0;
  for (const [id, n] of allCheckIds()) {
    total += n;
    done += (store.get('check:' + id, []) || []).filter((i) => i < n).length;
  }
  return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
}

function ringHTML(pct, label, sub) {
  const r = 27, c = 2 * Math.PI * r;
  return `<div class="ring">
    <svg width="66" height="66" viewBox="0 0 66 66">
      <circle class="bgc" cx="33" cy="33" r="${r}"></circle>
      <circle class="fgc" cx="33" cy="33" r="${r}" stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - pct / 100)}"></circle>
    </svg>
    <div class="lbl"><b>${label}</b><span>${esc(sub)}</span></div>
  </div>`;
}

/* ── 히어로 배경 (오리지널 SVG · 이미지 파일이 있으면 교체) ─ */
function heroBg() {
  return `<div class="hero-bg" id="heroBg">${artHero()}</div>`;
}

/** /assets/hero/<테마>.png|jpg|webp 가 있으면 SVG 대신 그 그림을 씁니다 */
function tryHeroImage() {
  const box = $('#heroBg');
  if (!box) return;
  const acc = document.documentElement.dataset.acc || 'violet';
  const candidates = [
    `assets/hero/${acc}.png`, `assets/hero/${acc}.jpg`, `assets/hero/${acc}.webp`,
    'assets/hero/default.png', 'assets/hero/default.jpg', 'assets/hero/default.webp',
  ];
  let i = 0;
  const probe = () => {
    if (i >= candidates.length) return;
    const img = new Image();
    img.onload = () => {
      const svg = $('.hero-art', box);
      if (svg) svg.style.display = 'none';
      const el = document.createElement('img');
      el.className = 'hero-art';
      el.src = candidates[i];
      el.alt = '';
      el.style.objectFit = 'cover';
      box.appendChild(el);
    };
    img.onerror = () => { i += 1; probe(); };
    img.src = candidates[i];
  };
  probe();
}

/* ══ 홈 ═══════════════════════════════════════════════════ */
function pageHome() {
  const p = window.PROJECT_INFO;
  const c = counts();
  const pr = progress();

  APP.innerHTML = `
  <section class="hero">
    ${heroBg()}

    <aside class="hero-sigil">
      ${artSigil(92)}
      <div class="sigil-txt">${esc(SIGIL.t)}</div>
      <div class="sigil-sub">${esc(SIGIL.s)}</div>
    </aside>

    <div class="wrap-wide hero-in">
      <div class="hero-kicker">AI 활용 집중 연수 <b>${c.days}일 과정 · 총 ${c.hours}시간</b></div>
      <h1 class="hero-title" data-t="봄내 AI">봄내 AI</h1>
      <div class="hero-sub">춘천을 다시 쓰는 이틀</div>
      <div class="hero-tag">강사용 액션 플랜</div>

      <div class="stats">
        ${statHTML('calendar', '일정', p.dateShort, p.dateSub)}
        ${statHTML('pin', '장소', p.venue, '연수 · 숙박')}
        ${statHTML('users', '대상', '강사·지도교사', 'CCAI 프로젝트 운영')}
        ${statHTML('layers', '교시', `${c.periods}교시`, '일차별 0~6교시')}
        ${statHTML('target', '실습', `${c.practices}개`, `산출물 ${c.outputs}종`)}
      </div>

      <div class="info-row">
        ${infoHTML('book', '강의 자료', 'DAY 1 · DAY 2 커리큘럼 전문<br>노션 원본 바로가기 포함')}
        ${infoHTML('doc', '프롬프트·코드', `${c.prompts}종 전부 복사 버튼<br>바로 붙여 쓰면 됩니다`)}
        ${infoHTML('upload', '결과물 수집', '연수생이 직접 업로드<br>실시간으로 함께 봅니다')}
      </div>

      <aside class="flowpanel">
        <h4>연수 흐름 <small>(총 ${c.periods}교시)</small></h4>
        ${[window.DAY1, window.DAY2].map((d, i, arr) => `
          <div class="fp-item">
            <div class="fp-dot"><i></i>${i < arr.length - 1 ? '<span></span>' : ''}</div>
            <div class="fp-b">
              <div class="d">DAY ${d.day}</div>
              <div class="t">${stripTags(d.oneLine)}</div>
              <div class="m">0교시 ~ 6교시 · ${d.hours}시간 · 실습 ${d.sections.reduce((a, s) => a + s.blocks.filter((b) => b.type === 'practice').length, 0)}개</div>
            </div>
          </div>`).join('')}
        <div class="fp-foot">${c.periods}개 교시가 하나의 파이프라인으로 연결됩니다.</div>
      </aside>

      <div class="hex-wrap">
        <a class="hex-btn" href="#/day1">연수 시작하기 <span class="arw">▼</span></a>
      </div>
    </div>
  </section>

  <div class="wrap" style="padding-top:20px">
    <div class="grid g2">${[window.DAY1, window.DAY2].map(dayCard).join('')}</div>

    <h2 class="sec-h">이틀이 실제로 이어지는 지점</h2>
    <div class="grid g3">
      ${window.BRIDGE.map((b) => `<div class="card">
        <div style="font-family:var(--disp);font-size:26px;color:var(--acc);text-shadow:var(--text-glow)">${b.n}</div>
        <div style="font-weight:800;margin-top:8px;color:var(--ink)">${esc(b.from)}</div>
        <div style="color:var(--acc);margin:8px 0;font-size:19px">▼</div>
        <div style="font-weight:800;color:var(--acc-hi)">${esc(b.to)}</div>
      </div>`).join('')}
    </div>

    <h2 class="sec-h">내 진행 상황</h2>
    <div class="card" style="display:flex;gap:26px;flex-wrap:wrap;align-items:center;justify-content:space-between">
      <div id="homeRing">${ringHTML(pr.pct, pr.pct + '%', `체크 ${pr.done} / ${pr.total}개 완료`)}</div>
      <p class="small muted" style="flex:1;min-width:240px;margin:0">
        각 교시의 <b style="color:var(--ink-2)">완료 조건</b> 체크박스를 누르면 이 브라우저에 저장됩니다.
        연수 중에 어디까지 했는지 바로 확인할 수 있고, 다시 들어와도 그대로 남아 있습니다.
      </p>
      <button class="btn btn-ghost btn-sm" id="resetCheck">체크 전체 초기화</button>
    </div>

    <h2 class="sec-h">방금 올라온 결과물 <span class="live-dot" title="실시간"></span></h2>
    <div id="homeWorks" class="works"></div>
    <div style="text-align:center;margin-top:24px">
      <a class="btn" href="#/gallery">결과물 갤러리 전체 보기 →</a>
    </div>

    <h2 class="sec-h">연수 개요</h2>
    <div class="card">
      <dl class="kv">
        <dt>연수명</dt><dd>${esc(p.name)}</dd>
        <dt>일시</dt><dd>${esc(p.date)}</dd>
        <dt>장소</dt><dd>${esc(p.venue)}</dd>
        <dt>대상</dt><dd>${esc(p.target)}</dd>
        <dt>사업</dt><dd>${esc(p.org)}</dd>
      </dl>
      <div style="margin-top:18px;display:flex;gap:9px;flex-wrap:wrap">
        <a class="btn btn-sm" href="#/resources">${svgIcon('doc', 15)} 강의 자료 · 교안 내려받기</a>
      </div>
    </div>
  </div>`;

  $('#resetCheck').addEventListener('click', () => {
    if (!confirm('모든 체크 기록을 지웁니다. 계속할까요?')) return;
    for (const [id] of allCheckIds()) store.set('check:' + id, []);
    toast('체크 기록을 초기화했습니다', 'ok');
    router();
  });

  tryHeroImage();
  loadWorks({ limit: 3, into: $('#homeWorks') });
  cleanup = subscribeLive(() => loadWorks({ limit: 3, into: $('#homeWorks') }));
}

const stripTags = (s) => String(s).replace(/<[^>]+>/g, '');

function statHTML(ic, k, v, sub) {
  return `<div class="stat">
    <div class="ic">${svgIcon(ic, 25)}</div>
    <div class="k">${esc(k)}</div>
    <div class="v">${esc(v)}${sub ? `<small>${esc(sub)}</small>` : ''}</div>
  </div>`;
}
function infoHTML(ic, k, v) {
  return `<div class="info-card">
    <div class="ic">${svgIcon(ic, 22)}</div>
    <div><div class="k">${esc(k)}</div><div class="v">${v}</div></div>
  </div>`;
}

function dayCard(d) {
  const dayDate = d.day === 1 ? '8. 1.(토)' : '8. 2.(일)';
  return `<div class="day-card">
    <a class="day-card-main" href="#/${d.slug}">
      <span class="day-badge">DAY ${d.day} · ${dayDate} · ${d.hours}시간</span>
      <h3>${esc(d.title)}</h3>
      <div class="sub">${esc(d.subtitle)}</div>
      <div class="one">${raw(d.oneLine)}</div>
      <div class="chips">${d.tools.map((t) => `<span class="chip">${esc(t)}</span>`).join('')}</div>
      <div class="chips" style="margin-top:9px">
        ${d.outputs.slice(0, 2).map((o) => `<span class="chip gold">${esc(o.name.replace(/[「」]/g, ''))}</span>`).join('')}
        <span class="chip gold">외 ${d.outputs.length - 2}종</span>
      </div>
    </a>
    <div class="day-card-foot">
      <a class="btn btn-sm" href="#/${d.slug}">커리큘럼 전문 보기</a>
      ${d.notion ? `<a class="btn btn-ghost btn-sm" href="${esc(d.notion)}" target="_blank" rel="noopener">${svgIcon('link', 15)} 노션 원본</a>` : ''}
    </div>
  </div>`;
}

/* ══ 일차 페이지 ══════════════════════════════════════════ */
function pageDay(slug) {
  const d = DAYS[slug];
  const maxMin = Math.max(...d.timetable.map((t) => t.min));
  const practices = d.sections.reduce((a, s) => a + s.blocks.filter((b) => b.type === 'practice').length, 0);

  APP.innerHTML = `
  <section class="hero" style="min-height:auto">
    ${heroBg()}
    <aside class="hero-sigil" style="top:70px">
      ${artSigil(76)}
      <div class="sigil-txt">DAY ${d.day}</div>
    </aside>
    <div class="wrap-wide hero-in" style="padding-bottom:44px">
      <div class="hero-kicker">DAY ${d.day} <b>${d.day === 1 ? '8. 1.(토)' : '8. 2.(일)'} · ${d.hours}시간</b> · ${esc(window.PROJECT_INFO.venue)}</div>
      <h1 class="hero-title" data-t="${esc(d.title)}" style="font-size:clamp(38px,7.2vw,80px)">${esc(d.title)}</h1>
      <div class="hero-sub" style="font-size:clamp(16px,2.3vw,25px)">${esc(d.subtitle)}</div>
      <p class="lede" style="max-width:70ch;margin-top:18px">${raw(d.hook)}</p>
      <div class="chips" style="margin-top:20px">${d.tools.map((t) => `<span class="chip gold">${esc(t)}</span>`).join('')}</div>
      ${d.notion ? `<div style="margin-top:22px">
        <a class="btn" href="${esc(d.notion)}" target="_blank" rel="noopener">${svgIcon('link', 17)} DAY ${d.day} 강의 자료 원본 (노션) 열기</a>
      </div>` : ''}
      <div class="stats" style="max-width:800px;margin-top:26px">
        ${statHTML('layers', '교시', `${d.sections.length}교시`, '0교시 ~ 6교시')}
        ${statHTML('hand', '실습', `${practices}개`, '완료 조건 포함')}
        ${statHTML('box', '산출물', `${d.outputs.length}종`, '전부 업로드 대상')}
        ${statHTML('clock', '순 강의', `${d.timetable.reduce((a, t) => a + t.min, 0)}분`, '쉬는시간·점심 별도')}
      </div>
    </div>
  </section>

  <div class="wrap" style="padding-top:10px">
    <div class="layout">
      <nav class="toc">
        <h4>교시 목차</h4>
        <a href="javascript:void 0" data-goto="top">개요 · 타임테이블</a>
        ${d.sections.map((s) => `<a href="javascript:void 0" data-goto="${s.id}">${esc(s.period)} ${esc(s.title.split(' — ')[0])}</a>`).join('')}
        <a href="javascript:void 0" data-goto="closing">마무리</a>
      </nav>

      <main id="top">
        <h2 class="sec-h">최종 산출물</h2>
        <div class="grid g2">
          ${d.outputs.map((o) => `<div class="card" style="padding:20px">
            <div style="font-family:var(--disp);font-size:22px;color:var(--acc);text-shadow:var(--text-glow)">${o.n}</div>
            <div style="font-weight:850;margin-top:6px;font-size:15.5px;color:var(--acc-hi)">${esc(o.name)}</div>
            <div class="small muted" style="margin-top:6px">${esc(o.desc)}</div>
          </div>`).join('')}
        </div>

        <h2 class="sec-h">오늘의 워크플로우</h2>
        <div class="flow">
          ${d.workflow.map((w, i) => `
            ${i ? '<span class="flow-arrow">▶</span>' : ''}
            <div class="flow-step">
              <div class="n">${w.step}</div>
              <div class="l">${esc(w.label)}</div>
              <div class="s">${esc(w.sub)}</div>
            </div>`).join('')}
        </div>

        <h2 class="sec-h">${d.hours}시간 타임테이블</h2>
        <div class="tbl-scroll">
          <table class="tt">
            <thead><tr><th>교시</th><th>시간</th><th>내용</th><th>배분</th><th>산출물</th></tr></thead>
            <tbody>
              ${d.timetable.map((t) => `<tr class="${t.star ? 'star' : ''}">
                <td class="p"><a href="javascript:void 0" data-goto="${t.ref}">${esc(t.period)}</a></td>
                <td class="m">${t.min}분</td>
                <td>${esc(t.topic)}</td>
                <td style="min-width:110px"><div class="bar${t.star ? ' gold' : ''}" style="width:${Math.round((t.min / maxMin) * 100)}%"></div></td>
                <td class="small">${esc(t.output)}</td>
              </tr>`).join('')}
            </tbody>
          </table>
        </div>
        <p class="small muted">※ ${raw(d.timetableNote)}</p>

        <div class="note note-warn">
          <div class="note-t">${svgIcon('warn', 19)}<span>${esc(d.dropOrder.title)}</span></div>
          <div class="note-b">
            <p>${raw(d.dropOrder.order)}</p>
            <p><b>절대 버리지 않는 것</b> — ${raw(d.dropOrder.never)}</p>
          </div>
        </div>

        <h2 class="sec-h">${esc(d.limits.title)}</h2>
        <div class="note note-danger">
          <div class="note-t">${svgIcon('danger', 19)}<span>먼저 알아야 할 것</span></div>
          <div class="note-b"><p>${raw(d.limits.lead)}</p></div>
        </div>
        ${renderTable(d.limits.table)}
        <div class="note note-ok">
          <div class="note-t">${svgIcon('check', 19)}<span>그래서 설계는 이렇습니다</span></div>
          <div class="note-b"><p>${raw(d.limits.conclusion)}</p></div>
        </div>
        <div class="note note-danger">
          <div class="note-t">${svgIcon('danger', 19)}<span>개인정보 — 가장 조심할 것</span></div>
          <div class="note-b"><ol>${d.limits.privacy.map((x) => `<li>${raw(x)}</li>`).join('')}</ol></div>
        </div>

        <h2 class="sec-h">교시별 상세</h2>
        <div id="periods">${d.sections.map(periodHTML).join('')}</div>

        <h2 class="sec-h" id="closing">강사 사전 점검</h2>
        ${renderCheck({ id: `${slug}-instructor`, title: '연수 전 확인 항목', items: d.instructorCheck })}

        ${d.goesTo ? `
          <h2 class="sec-h">${esc(d.goesTo.title)}</h2>
          ${renderTable({ head: ['산출물', '실제 투입 시점', '사업계획서 근거'], rows: d.goesTo.rows })}
          <div class="note note-ok"><div class="note-t">${svgIcon('check', 19)}<span>연수 마무리에서 할 말</span></div>
          <div class="note-b"><p>${esc(d.goesTo.note)}</p></div></div>` : ''}

        ${d.errata ? `
          <h2 class="sec-h">${esc(d.errata.title)}</h2>
          ${renderTable({ head: ['항목', '오류 (인터넷에 널리 퍼진 설명)', '바로잡은 내용'], rows: d.errata.rows })}
          <div class="note note-ok"><div class="note-t">${svgIcon('check', 19)}<span>재검증에서 공식 원문으로 확정된 것</span></div>
          <div class="note-b"><ul>${d.errata.confirmed.map((x) => `<li>${raw(x)}</li>`).join('')}</ul></div></div>` : ''}

        ${d.moreFolktales ? `
          <h2 class="sec-h">${esc(d.moreFolktales.title)}</h2>
          <p class="small muted">${raw(d.moreFolktales.note)}</p>
          ${renderTable({ head: ['제목', '장소', '30~60초 적합도', '비고'], rows: d.moreFolktales.rows })}
          <div class="note note-warn"><div class="note-t">${svgIcon('warn', 19)}<span>줄거리 확인이 필요한 설화</span></div>
          <div class="note-b"><p>${raw(d.moreFolktales.warn)}</p></div></div>` : ''}

        <h2 class="sec-h">오늘 기억할 세 문장</h2>
        <div class="grid g3">
          ${d.closing.map((cl, i) => `<div class="card" style="padding:22px">
            <div style="font-family:var(--disp);font-size:36px;color:var(--acc);line-height:1;text-shadow:var(--text-glow)">${i + 1}</div>
            <p style="margin:12px 0 0;font-weight:750;font-size:15px;color:var(--ink-2)">${esc(cl)}</p>
          </div>`).join('')}
        </div>
        <div class="callout">${stripTags(d.closingTail)}</div>

        <div class="hex-wrap" style="margin:36px 0;gap:10px;flex-wrap:wrap">
          <a class="hex-btn" style="margin:0" href="#/gallery?day=${d.day}&upload=1">DAY ${d.day} 결과물 올리기</a>
        </div>
        <div style="text-align:center;margin-bottom:30px">
          <a class="btn btn-ghost" href="#/${slug === 'day1' ? 'day2' : 'day1'}">${slug === 'day1' ? 'DAY 2 이어보기 →' : '← DAY 1 다시보기'}</a>
        </div>
      </main>
    </div>
  </div>`;

  $$('.period-head').forEach((h) => h.addEventListener('click', () => h.parentElement.classList.toggle('open')));
  $$('[data-goto]').forEach((a) => a.addEventListener('click', () => {
    if (a.dataset.goto === 'top') return window.scrollTo({ top: 0, behavior: 'smooth' });
    openPeriod(a.dataset.goto);
  }));
  $('.period')?.classList.add('open');
  tryHeroImage();

  const io = new IntersectionObserver((entries) => {
    for (const en of entries) {
      if (!en.isIntersecting) continue;
      $$('.toc a').forEach((a) => a.classList.toggle('on', a.dataset.goto === en.target.id));
    }
  }, { rootMargin: '-70px 0px -75% 0px' });
  $$('.period').forEach((pp) => io.observe(pp));
  cleanup = () => io.disconnect();
}

function openPeriod(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add('open');
  setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 40);
}

function periodHTML(s) {
  return `<section class="period${s.star ? ' star' : ''}" id="${s.id}">
    <button class="period-head" aria-expanded="false">
      <span class="period-num">${esc(s.period.replace('교시', ''))}<small>교시 · ${s.min}분</small></span>
      <span class="period-body-head">
        <h3>${s.star ? '★ ' : ''}${esc(s.title)}</h3>
        <p>${esc(s.summary)}</p>
      </span>
      <span class="period-caret">▼</span>
    </button>
    <div class="period-content blk">${renderBlocks(s.blocks)}</div>
  </section>`;
}

/* ══ 결과물 갤러리 ════════════════════════════════════════ */
let liked = store.get('liked', []);

function pageGallery(q) {
  const day = q.get('day') || 'all';
  const section = q.get('section') || 'all';
  const openUp = q.get('upload') === '1';

  APP.innerHTML = `
  <div class="wrap-wide" style="padding-top:34px">
    <h1 class="page-title">결과물 갤러리</h1>
    <p class="lede" style="margin-top:10px;max-width:78ch">
      만든 것을 여기에 올리면 <b style="color:var(--acc-hi)">모두가 바로 봅니다.</b> 파일은 서버에 실제로 저장되고,
      같은 와이파이에 접속한 다른 연수생 화면에도 <b style="color:var(--acc-hi)">새로고침 없이</b> 나타납니다.
      <span class="live-dot"></span> <span class="small muted" id="liveState">실시간 연결 중…</span>
    </p>

    <div style="margin:22px 0;display:flex;gap:10px;flex-wrap:wrap">
      <button class="btn btn-gold" id="toggleUp">결과물 올리기</button>
      <a class="btn btn-ghost btn-sm" href="#/admin">관리자</a>
    </div>

    <div id="upBox" class="card" style="display:${openUp ? 'block' : 'none'};margin-bottom:24px">
      ${uploadFormHTML(day === 'all' ? '1' : day, section)}
    </div>

    <div class="toolbar">
      <div class="seg" id="daySeg">
        <button data-day="all" class="${day === 'all' ? 'on' : ''}">전체</button>
        <button data-day="1" class="${day === '1' ? 'on' : ''}">DAY 1</button>
        <button data-day="2" class="${day === '2' ? 'on' : ''}">DAY 2</button>
      </div>
      <select class="inp" id="secSel">
        <option value="all">모든 분류</option>
        ${window.SECTIONS.map((s) => `<option value="${s.id}"${s.id === section ? ' selected' : ''}>${esc(s.label)}</option>`).join('')}
      </select>
      <input class="inp" id="qBox" type="search" placeholder="제목 · 이름 · 설명 검색" style="flex:1;min-width:170px">
      <span class="small muted" id="cnt"></span>
    </div>

    <div id="works" class="works"></div>
  </div>`;

  checkBackend();

  $('#toggleUp').addEventListener('click', () => {
    const b = $('#upBox');
    if (b.style.display === 'none') openUploadBox(); else b.style.display = 'none';
  });

  bindUploadForm();

  const refresh = () => loadWorks({
    day: $$('#daySeg button').find((b) => b.classList.contains('on'))?.dataset.day || 'all',
    section: $('#secSel').value,
    q: $('#qBox').value.trim(),
    into: $('#works'),
    countInto: $('#cnt'),
  });

  $$('#daySeg button').forEach((b) => b.addEventListener('click', () => {
    $$('#daySeg button').forEach((x) => x.classList.toggle('on', x === b));
    refresh();
  }));
  $('#secSel').addEventListener('change', refresh);
  let t;
  $('#qBox').addEventListener('input', () => { clearTimeout(t); t = setTimeout(refresh, 220); });

  refresh();
  cleanup = subscribeLive((ev) => {
    if (ev === 'open') $('#liveState').textContent = '실시간 연결됨 — 다른 사람이 올리면 바로 뜹니다';
    else if (ev === 'error') $('#liveState').textContent = '실시간 연결 끊김 (새로고침하면 최신 목록)';
    else refresh();
  });
}

/* 지금 수정 중인 결과물. null 이면 새로 올리는 중입니다. */
let editing = null;
/* 수정하면서 빼기로 표시한 기존 파일들 */
let removeMarked = [];

/** 업로드 창 열기 — 페이지를 다시 부르지 않고 그 자리에서 엽니다 */
function openUploadBox() {
  const b = $('#upBox');
  if (!b) return;
  if (editing) exitEdit();
  b.style.display = 'block';
  const done = $('#upDone');
  if (done) { done.style.display = 'none'; done.innerHTML = ''; }
  b.scrollIntoView({ behavior: 'smooth', block: 'start' });
  setTimeout(() => $('#upForm [name=author]')?.focus(), 350);
}

/** 내가 올린 결과물을 고치기 — 업로드 창을 그대로 재사용합니다 */
function startEdit(w) {
  const box = $('#upBox');
  const form = $('#upForm');
  if (!box || !form) return;

  editing = w;
  removeMarked = [];
  box.style.display = 'block';
  box.classList.add('editing');

  form.author.value = w.author || '';
  form.school.value = w.school || '';
  form.day.value = String(w.day || 1);
  form.title.value = w.title || '';
  form.description.value = w.description || '';
  form.links.value = (w.links || []).join('\n');
  form.source.value = w.source || '';
  form.aiNotice.value = w.aiNotice || '';
  form.tags.value = (w.tags || []).join(', ');
  form.dispatchEvent(new CustomEvent('ccai:refill'));       // 분류 목록 다시 채우기
  setTimeout(() => { form.section.value = w.section || 'etc'; form.section.dispatchEvent(new Event('change')); }, 0);

  $('#upTitle').textContent = '결과물 수정';
  $('#upLead').innerHTML = '이미 올린 내용을 고칩니다. <b>좋아요와 피드백은 그대로 남습니다.</b>';
  $('#upBtn').textContent = '수정 저장';
  $('#upCancel').textContent = '수정 취소';
  const done = $('#upDone');
  if (done) { done.style.display = 'none'; done.innerHTML = ''; }

  paintExistingFiles();
  box.scrollIntoView({ behavior: 'smooth', block: 'start' });
  setTimeout(() => form.title.focus(), 350);
}

/** 편집 모드 해제 — 새로 올리는 모드로 되돌립니다 */
function exitEdit() {
  const form = $('#upForm');
  editing = null;
  removeMarked = [];
  $('#upBox')?.classList.remove('editing');
  if ($('#upTitle')) $('#upTitle').textContent = '결과물 올리기';
  if ($('#upLead')) {
    $('#upLead').innerHTML = '이미지 · 영상 · 오디오 · PDF · 문서 · zip 모두 됩니다. 한 번에 <b>10개까지, 파일당 400MB</b>. '
      + '파일 없이 <b>링크만</b> 올려도 됩니다 (노트북 공유 링크, 배포된 웹페이지 URL 등).';
  }
  if ($('#upBtn')) $('#upBtn').textContent = '올리기';
  if ($('#upCancel')) $('#upCancel').textContent = '닫기';
  if (form) { form.reset(); form.dispatchEvent(new CustomEvent('ccai:refill')); }
  paintExistingFiles();
}

/** 수정 중일 때 「이미 올려둔 파일」 목록 */
function paintExistingFiles() {
  const box = $('#existingFiles');
  if (!box) return;
  const files = (editing && editing.files) || [];
  if (!files.length) { box.innerHTML = ''; box.style.display = 'none'; return; }

  box.style.display = 'block';
  box.innerHTML = `<div class="fld-label">이미 올려둔 파일 <span class="hint">빼려면 ✕ 를 누르세요</span></div>
    ${files.map((f) => {
      const key = API.isGas ? f.id : (f.url || '').split('/').pop();
      const off = removeMarked.includes(key);
      return `<div class="filerow${off ? ' removed' : ''}">
        <span>${svgIcon({ image: 'image', video: 'video', audio: 'music' }[f.kind] || 'doc', 15)}</span>
        <span class="nm">${esc(f.originalName)}</span>
        <span class="sz">${bytes(f.size)}</span>
        <button type="button" data-unmark="${esc(key)}">${off ? '되돌리기' : '✕'}</button>
      </div>`;
    }).join('')}`;

  $$('[data-unmark]', box).forEach((b) => b.addEventListener('click', () => {
    const k = b.dataset.unmark;
    removeMarked = removeMarked.includes(k) ? removeMarked.filter((x) => x !== k) : [...removeMarked, k];
    paintExistingFiles();
  }));
}

function uploadFormHTML(day, section) {
  const me = store.get('me', { author: '', school: '' });
  return `<form id="upForm">
    <h3 id="upTitle" style="font-size:19px;font-weight:850;margin-bottom:4px;color:var(--acc-hi)">결과물 올리기</h3>
    <p class="small muted" style="margin:0 0 18px" id="upLead">
      이미지 · 영상 · 오디오 · PDF · 문서 · zip 모두 됩니다. 한 번에 <b>10개까지, 파일당 400MB</b>.
      파일 없이 <b>링크만</b> 올려도 됩니다 (노트북 공유 링크, 배포된 웹페이지 URL 등).
    </p>

    <div class="up-grid">
      <div class="fld">
        <label>이름 <span class="req">*</span></label>
        <input name="author" required maxlength="40" value="${esc(me.author)}" placeholder="김○○">
      </div>
      <div class="fld">
        <label>소속 <span class="hint">(선택)</span></label>
        <input name="school" maxlength="60" value="${esc(me.school)}" placeholder="○○초등학교">
      </div>

      <div class="fld">
        <label>일차 <span class="req">*</span></label>
        <select name="day" id="upDay">
          <option value="1"${day === '1' ? ' selected' : ''}>DAY 1 — 춘천을 담는 그릇</option>
          <option value="2"${day === '2' ? ' selected' : ''}>DAY 2 — 춘천 설화 × AI 영상</option>
        </select>
      </div>
      <div class="fld">
        <label>분류 <span class="req">*</span></label>
        <select name="section" id="upSec"></select>
        <span class="hint" id="secHint"></span>
      </div>

      <div class="fld full">
        <label>제목 <span class="req">*</span></label>
        <input name="title" required maxlength="120" placeholder="예) 봄내 AI — 안개의 도시, 춘천">
      </div>

      <div class="fld full">
        <label>설명 <span class="hint">(어떻게 만들었는지, 어디서 막혔는지 — 이게 제일 도움이 됩니다)</span></label>
        <textarea name="description" maxlength="2000" placeholder="소스 28개를 6개 카테고리로 접었습니다. 웹 검색으로 위키강원 설화를 12개 추가했고…"></textarea>
      </div>

      <div class="fld full">
        <label>링크 <span class="hint">(줄바꿈으로 여러 개. https:// 로 시작해야 합니다)</span></label>
        <textarea name="links" rows="2" placeholder="https://notebooklm.google.com/notebook/...&#10;https://ai.studio/apps/..."></textarea>
      </div>

      <div class="fld">
        <label>출처 표기 <span class="hint">(사진·자료 출처)</span></label>
        <input name="source" maxlength="300" placeholder="국가기록원 · 공공누리 제1유형">
      </div>
      <div class="fld">
        <label>AI 활용 표기 <span class="hint">(어떤 AI를 어디에 썼는지)</span></label>
        <input name="aiNotice" maxlength="300" placeholder="Canva AI로 색 복원 · Gemini로 배경 생성">
      </div>

      <div class="fld full">
        <label>태그 <span class="hint">(쉼표로 구분)</span></label>
        <input name="tags" maxlength="200" placeholder="부래산, 한지수묵담채, 8컷">
      </div>

      <div class="fld full" id="existingFiles" style="display:none"></div>

      <div class="fld full">
        <label>파일 <span class="hint" id="fileHint"></span></label>
        <div class="drop" id="drop">
          <div class="big">${svgIcon('clip', 30)}</div>
          <div class="t">클릭하거나 여기로 파일을 끌어다 놓으세요</div>
          <div class="s">이미지 · 영상(mp4/mov/webm) · 오디오 · PDF · hwp/hwpx · docx · pptx · zip</div>
        </div>
        <input type="file" id="fileInput" multiple class="sr"
          accept=".png,.jpg,.jpeg,.gif,.webp,.avif,.svg,.mp4,.mov,.webm,.m4v,.mp3,.wav,.m4a,.ogg,.pdf,.hwp,.hwpx,.docx,.pptx,.xlsx,.zip,.txt,.md">
        <div class="filelist" id="fileList"></div>
      </div>
    </div>

    <div class="note note-danger" style="margin:20px 0 0">
      <div class="note-t">${svgIcon('danger', 19)}<span>올리기 전에 한 번만 확인</span></div>
      <div class="note-b"><p class="small">
        학생 <b>실명 · 얼굴 사진 · 학교명 · 보호자 연락처</b>가 들어간 파일은 올리지 마세요.
        신청 폼 결과는 <b>이름·연락처 열을 지운 스크린샷</b>만 올립니다.
        AI로 만들거나 복원한 이미지는 <b>「AI 활용 표기」</b> 칸을 채워 주세요.
      </p></div>
    </div>

    <div class="progress" id="upProg"><i></i></div>
    <div class="small muted" id="upNote" style="margin-top:6px"></div>
    <div class="up-done" id="upDone" style="display:none"></div>
    <div style="margin-top:18px;display:flex;gap:10px;flex-wrap:wrap">
      <button type="submit" class="btn btn-gold" id="upBtn">올리기</button>
      <button type="button" class="btn btn-ghost" id="upCancel">닫기</button>
    </div>
  </form>`;
}

function bindUploadForm() {
  const form = $('#upForm');
  if (!form) return;
  const files = [];
  const daySel = $('#upDay'), secSel = $('#upSec'), hint = $('#secHint');
  const wantSection = new URLSearchParams((location.hash.split('?')[1] || '')).get('section');

  function updateHint() {
    const s = window.SECTIONS.find((x) => x.id === secSel.value);
    hint.textContent = s ? s.hint : '';
  }
  function fillSections() {
    const dd = Number(daySel.value);
    const list = window.SECTIONS.filter((s) => s.day === dd || s.day === 0);
    secSel.innerHTML = list.map((s) => `<option value="${s.id}">${esc(s.label)}</option>`).join('');
    if (wantSection && list.some((s) => s.id === wantSection)) secSel.value = wantSection;
    updateHint();
  }
  daySel.addEventListener('change', fillSections);
  secSel.addEventListener('change', updateHint);
  form.addEventListener('ccai:refill', fillSections);      // 편집 모드에서 다시 채울 때
  if (wantSection) {
    const s = window.SECTIONS.find((x) => x.id === wantSection);
    if (s && s.day) daySel.value = String(s.day);
  }
  fillSections();

  const drop = $('#drop'), input = $('#fileInput'), list = $('#fileList');
  const icon = (f) => (f.type.startsWith('video') ? '' : f.type.startsWith('image') ? '' : f.type.startsWith('audio') ? '' : '');

  function paint() {
    list.innerHTML = files.map((f, i) => `<div class="filerow">
      <span>${icon(f)}</span><span class="nm">${esc(f.name)}</span>
      <span class="sz">${bytes(f.size)}</span>
      <button type="button" data-rm="${i}" aria-label="빼기">✕</button>
    </div>`).join('');
  }
  function add(fl) {
    for (const f of fl) {
      if (files.length >= 10) { toast('한 번에 10개까지 올릴 수 있습니다', 'err'); break; }
      if (f.size > 400 * 1024 * 1024) { toast(`${f.name} — 400MB를 넘습니다`, 'err'); continue; }
      files.push(f);
    }
    paint();
  }

  drop.addEventListener('click', () => input.click());
  input.addEventListener('change', () => { add(input.files); input.value = ''; });
  ['dragenter', 'dragover'].forEach((e) => drop.addEventListener(e, (ev) => { ev.preventDefault(); drop.classList.add('over'); }));
  ['dragleave', 'drop'].forEach((e) => drop.addEventListener(e, (ev) => { ev.preventDefault(); drop.classList.remove('over'); }));
  drop.addEventListener('drop', (ev) => add(ev.dataTransfer.files));
  list.addEventListener('click', (ev) => {
    const b = ev.target.closest('[data-rm]');
    if (b) { files.splice(Number(b.dataset.rm), 1); paint(); }
  });
  $('#upCancel').addEventListener('click', () => {
    if (editing) { exitEdit(); toast('수정을 취소했습니다'); }
    $('#upBox').style.display = 'none';
  });

  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const fd = new FormData(form);
    if (!fd.get('author').trim()) return toast('이름을 입력해 주세요', 'err');
    if (!fd.get('title').trim()) return toast('제목을 입력해 주세요', 'err');

    // 수정 중이면 이미 올려둔 파일 중 남는 것도 세어 줍니다
    const keptCount = editing
      ? (editing.files || []).filter((f) => !removeMarked.includes(API.isGas ? f.id : (f.url || '').split('/').pop())).length
      : 0;
    if (!files.length && !keptCount && !/https?:\/\//i.test(fd.get('links') || '')) {
      return toast('파일을 올리거나 링크를 하나 이상 넣어 주세요', 'err');
    }

    const sec = window.SECTIONS.find((s) => s.id === fd.get('section'));
    fd.append('sectionLabel', sec ? sec.label : '');
    for (const f of files) fd.append('files', f, f.name);
    store.set('me', { author: fd.get('author').trim(), school: (fd.get('school') || '').trim() });

    const isEdit = Boolean(editing);
    const btn = $('#upBtn'), prog = $('#upProg'), note = $('#upNote');
    btn.disabled = true; btn.textContent = isEdit ? '저장 중…' : '올리는 중…'; prog.classList.add('on');

    const fields = {};
    for (const [k, v] of fd.entries()) if (!(v instanceof File)) fields[k] = v;

    const done = () => {
      btn.disabled = false; btn.textContent = isEdit ? '수정 저장' : '올리기';
      prog.classList.remove('on'); $('i', prog).style.width = '0';
      if (note) note.textContent = '';
    };

    const onProg = (loaded, tot, name) => {
      $('i', prog).style.width = `${Math.round((loaded / tot) * 100)}%`;
      if (note) note.textContent = name ? `${name} 전송 중… ${Math.round((loaded / tot) * 100)}%` : '';
    };

    const task = isEdit
      ? API.update(editing.id, fields, files, removeMarked, onProg,
        { editKey: (store.get('mine', {}) || {})[editing.id] || '' })
      : API.create(fields, files, onProg);

    task.then((res) => {
      done();

      if (isEdit) {
        if (res && res.ok) {
          toast('수정했습니다', 'ok');
          exitEdit();
          $('#upBox').style.display = 'none';
          loadWorks({ into: $('#works'), countInto: $('#cnt') });
        } else {
          toast((res && res.message) || '수정하지 못했습니다', 'err');
        }
        return;
      }

      if (res && res.ok) {
        const mine = store.get('mine', {});
        mine[res.work.id] = res.editKey;
        store.set('mine', mine);
        toast('올렸습니다', 'ok');

        // 폼은 열어 둡니다 — 보통 여러 개를 이어서 올리기 때문입니다.
        // 이름·소속은 남겨 두고 나머지만 비웁니다.
        const keepAuthor = form.author.value;
        const keepSchool = form.school.value;
        const keepDay = form.day.value;
        form.reset();
        form.author.value = keepAuthor;
        form.school.value = keepSchool;
        form.day.value = keepDay;
        files.length = 0; paint(); fillSections();

        const done = $('#upDone');
        if (done) {
          done.innerHTML = `${svgIcon('check', 17)}
            <span><b>「${esc(res.work.title)}」</b> 올라갔습니다.
            이어서 더 올리시려면 위 칸을 채우고 <b>올리기</b>를 누르세요.</span>
            <button type="button" class="btn btn-ghost btn-sm" id="upClose2">그만 올리고 목록 보기</button>`;
          done.style.display = 'flex';
          $('#upClose2').addEventListener('click', () => {
            $('#upBox').style.display = 'none';
            $('#works')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          });
        }
        form.querySelector('[name=title]')?.focus();

        const g = $('#works');
        if (g) loadWorks({ into: g, countInto: $('#cnt') });
      } else {
        toast((res && res.message) || '업로드에 실패했습니다', 'err');
      }
    }).catch((err) => {
      done();
      toast(err.message || '업로드에 실패했습니다', 'err');
    });
  });
}

/* ── 목록 로드 ──────────────────────────────────────────── */
async function loadWorks({ day = 'all', section = 'all', q = '', limit = 0, into, countInto } = {}) {
  if (!into) return;
  // 구글 쪽은 왕복이 몇 초 걸립니다. 빈 화면 대신 기다리는 중임을 보여줍니다.
  if (!into.children.length) {
    into.innerHTML = `<div class="empty" style="grid-column:1/-1">
      <div class="ic">${svgIcon('box', 40)}</div>
      <h3>결과물을 불러오는 중입니다…</h3>
      <p class="small">${API.isGas ? '구글 드라이브에서 가져오는 중이라 몇 초 걸립니다.' : ''}</p>
    </div>`;
  }
  if (countInto) countInto.textContent = '…';
  try {
    const data = await API.list({ day, section, q });
    let items = data.items || [];
    if (limit) items = items.slice(0, limit);
    if (countInto) countInto.textContent = `${data.count}건`;

    if (!items.length) {
      // 업로드 창이 이미 열려 있으면 아래쪽에 또 「올리기」 버튼을 두지 않습니다.
      // 그걸 누르면 페이지가 다시 불려서 쓰던 폼이 날아가기 때문입니다.
      const upOpen = $('#upBox') && $('#upBox').style.display !== 'none';
      const filtered = q || day !== 'all' || section !== 'all';
      into.innerHTML = `<div class="empty" style="grid-column:1/-1">
        <div class="ic">${svgIcon('box', 44)}</div>
        <h3>${filtered ? '조건에 맞는 결과물이 없습니다' : '아직 올라온 결과물이 없습니다'}</h3>
        <p class="small">${filtered ? '거르기를 「전체」로 바꿔 보세요.' : '첫 번째로 올려 보세요. 실패한 프롬프트도 훌륭한 자산입니다.'}</p>
        ${upOpen || filtered ? '' : '<p style="margin-top:16px"><button class="btn btn-sm" id="emptyUp">결과물 올리기</button></p>'}
      </div>`;
      $('#emptyUp')?.addEventListener('click', openUploadBox);
      return;
    }
    into.innerHTML = items.map(workHTML).join('');
    bindWorkCards(into, items);
  } catch (err) {
    if (countInto) countInto.textContent = '';
    into.innerHTML = `<div class="empty" style="grid-column:1/-1">
      <div class="ic">${svgIcon('warn', 44)}</div>
      <h3>목록을 불러오지 못했습니다</h3>
      <p class="small">${API.isGas
        ? '<code>js/config.js</code> 의 <b>gasUrl</b> 과 Apps Script 배포 설정(<b>실행 = 나 / 액세스 = 모든 사용자</b>)을 확인해 주세요.'
        : '터미널에서 <code>npm start</code> 가 돌아가고 있는지 확인해 주세요.'}</p>
      <p class="small muted">${esc(err.message || String(err))}</p>
    </div>`;
  }
}

function workHTML(w) {
  const imgs = (w.files || []).filter((f) => f.kind === 'image');
  const vids = (w.files || []).filter((f) => f.kind === 'video');
  const cover = imgs[0];
  const others = (w.files || []).filter((f) => f.kind !== 'image');
  // 드라이브 파일은 썸네일·미리보기 주소가 따로 있고, 썸네일 생성이 늦을 수 있어
  // data-alt 로 대체 주소를 함께 넘겨 실패 시 갈아탑니다.
  const media = cover
    ? `<img src="${esc(cover.thumb || cover.url)}" alt="${esc(w.title)}" loading="lazy"
         data-alt="${esc(cover.thumb2 || '')}" data-zoom="${esc(cover.thumb || cover.url)}">`
    : vids[0]
      ? (vids[0].embed
        ? `<iframe src="${esc(vids[0].embed)}" allow="autoplay" allowfullscreen loading="lazy" title="${esc(w.title)}"></iframe>`
        : `<video src="${esc(vids[0].url)}" controls preload="metadata" playsinline></video>`)
      : `<div class="noimg">
           ${(w.links || []).length ? svgIcon('link', 34) : svgIcon(others[0] ? ({ audio: 'music', file: 'doc' }[others[0].kind] || 'doc') : 'doc', 34)}
           <span>${(w.links || []).length ? '링크 결과물' : (others[0] ? esc(others[0].originalName) : '파일')}</span>
         </div>`;
  const extra = (w.files || []).length > 1 ? `<span class="cnt">파일 ${w.files.length}</span>` : '';
  const isMine = Boolean((store.get('mine', {}) || {})[w.id]);
  const isLiked = liked.includes(w.id);
  const otherFiles = (w.files || []).filter((f) => f !== cover);

  return `<article class="work" data-id="${esc(w.id)}">
    <div class="work-media">${media}${extra}</div>
    <div class="work-bd">
      <div class="work-tags">
        <span class="tag-day">DAY ${w.day}</span>
        <span class="tag-sec">${esc(w.sectionLabel || w.section)}</span>
        ${(w.tags || []).map((t) => `<span class="tag-sec">#${esc(t)}</span>`).join('')}
      </div>
      <h4>${esc(w.title)}</h4>
      <div class="by">${esc(w.author)}${w.school ? ` · ${esc(w.school)}` : ''} · ${esc(timeAgo(w.createdAt))}</div>
      ${w.description ? `<div class="desc">${esc(w.description)}</div>` : ''}
      ${w.source ? `<div class="small muted">출처 · ${esc(w.source)}</div>` : ''}
      ${w.aiNotice ? `<div class="small muted">AI 활용 · ${esc(w.aiNotice)}</div>` : ''}
      ${(w.links || []).length ? `<div class="links">${w.links.map((l) => `<a href="${esc(l)}" target="_blank" rel="noopener noreferrer">${esc(l.length > 52 ? l.slice(0, 52) + '…' : l)}</a>`).join('')}</div>` : ''}
      ${otherFiles.length ? `<div class="files">${otherFiles.map((f) => `<a href="${esc(f.url)}" target="_blank" rel="noopener" download>${esc(f.originalName)} <span class="muted">${bytes(f.size)}</span></a>`).join('')}</div>` : ''}

      <div class="work-foot">
        <button class="mini${isLiked ? ' liked' : ''}" data-like>${svgIcon('heart', 14)} <span>${w.likes || 0}</span></button>
        <button class="mini" data-cmt>${svgIcon('comment', 14)} <span>${(w.comments || []).length}</span></button>
        ${(w.files || []).length ? `<a class="mini" href="${esc(w.files[0].url)}" download>${svgIcon('download', 14)} 받기</a>` : ''}
        ${isMine ? `<button class="mini mini-edit" data-edit style="margin-left:auto">${svgIcon('doc', 14)} 수정</button>
                    <button class="mini" data-del style="color:var(--danger)">삭제</button>` : ''}
      </div>

      <div class="cmts">
        <div data-cmt-list>${(w.comments || []).map(cmtHTML).join('') || '<p class="small muted" style="margin:4px 0">아직 피드백이 없습니다. 첫 한 줄을 남겨 주세요.</p>'}</div>
        <div class="cmt-form">
          <input class="inp" data-cmt-input placeholder="한 줄 피드백 — 어디가 좋았나요?" maxlength="200">
          <button class="btn btn-sm" data-cmt-send>등록</button>
        </div>
      </div>
    </div>
  </article>`;
}

function cmtHTML(c, pending) {
  return `<div class="cmt${pending ? ' pending' : ''}"><b>${esc(c.author)}</b><time>${esc(timeAgo(c.createdAt))}</time><br>${esc(c.text)}</div>`;
}

function bindWorkCards(root, items = []) {
  $$('.work', root).forEach((card) => {
    const id = card.dataset.id;
    const w = items.find((x) => x.id === id) || { id };

    // 좋아요 — 화면을 먼저 바꾸고 서버는 뒤따라갑니다. 실패하면 되돌립니다.
    $('[data-like]', card)?.addEventListener('click', (e) => {
      const btn = e.currentTarget;
      if (btn.dataset.busy) return;                 // 연타 방지
      btn.dataset.busy = '1';

      const undo = liked.includes(id);
      const num = $('span', btn);
      const before = Number(num.textContent) || 0;

      liked = undo ? liked.filter((x) => x !== id) : [...liked, id];
      store.set('liked', liked);
      btn.classList.toggle('liked', !undo);
      num.textContent = Math.max(0, before + (undo ? -1 : 1));

      API.like(id, undo).then((res) => {
        if (res && res.ok) num.textContent = res.likes;
        else throw new Error();
      }).catch(() => {
        liked = undo ? [...liked, id] : liked.filter((x) => x !== id);
        store.set('liked', liked);
        btn.classList.toggle('liked', undo);
        num.textContent = before;
        toast('좋아요를 저장하지 못했습니다', 'err');
      }).finally(() => { delete btn.dataset.busy; });
    });

    $('[data-cmt]', card)?.addEventListener('click', () => $('.cmts', card).classList.toggle('open'));

    // 피드백 — 언제나 익명. 화면에 먼저 붙이고 서버는 뒤따라갑니다.
    const send = () => {
      const input = $('[data-cmt-input]', card);
      const btn = $('[data-cmt-send]', card);
      const text = input.value.trim();
      if (!text || btn.dataset.busy) return;

      const bad = findBadWord(text);
      if (bad) {
        toast('거친 표현이 있어 등록하지 않았습니다. 다듬어 주세요.', 'err');
        input.focus();
        return;
      }

      btn.dataset.busy = '1';
      const listEl = $('[data-cmt-list]', card);
      if (listEl.querySelector('p')) listEl.innerHTML = '';
      const temp = { id: 'tmp', author: '익명', text, createdAt: new Date().toISOString() };
      listEl.insertAdjacentHTML('beforeend', cmtHTML(temp, true));
      const row = listEl.lastElementChild;
      input.value = '';

      API.comment(id, '익명', text).then((res) => {
        if (!res || !res.ok) throw new Error(res?.message || '');
        row.classList.remove('pending');
        const n = $('[data-cmt] span', card) || $('[data-cmt]', card);
        const cnt = listEl.querySelectorAll('.cmt').length;
        if (n) n.textContent = cnt;
      }).catch((err) => {
        row.remove();
        input.value = text;
        toast(err.message || '등록하지 못했습니다', 'err');
      }).finally(() => { delete btn.dataset.busy; });
    };
    $('[data-cmt-send]', card)?.addEventListener('click', send);
    $('[data-cmt-input]', card)?.addEventListener('keydown', (e) => { if (e.key === 'Enter') send(); });

    $('[data-edit]', card)?.addEventListener('click', () => startEdit(w));

    $('[data-del]', card)?.addEventListener('click', async () => {
      if (!confirm('이 결과물과 첨부 파일을 삭제합니다. 되돌릴 수 없습니다.')) return;
      const key = (store.get('mine', {}) || {})[id];
      const res = await API.remove(id, { editKey: key || '' }).catch(() => null);
      if (!res || !res.ok) return toast(res?.message || '삭제하지 못했습니다', 'err');
      card.remove();
      toast('삭제했습니다', 'ok');
    });

    $('.work-media video', card)?.addEventListener('dblclick', (e) => lightbox(e.currentTarget.src, 'video'));

    // 드라이브 썸네일이 아직 안 만들어졌으면 대체 주소로, 그것도 안 되면 아이콘으로
    const cov = $('.work-media img', card);
    if (cov) {
      cov.addEventListener('error', () => {
        const alt = cov.dataset.alt;
        if (alt && cov.src !== alt) { cov.src = alt; cov.dataset.zoom = alt; cov.dataset.alt = ''; return; }
        if (cov.dataset.retry) {
          cov.replaceWith(Object.assign(document.createElement('div'), {
            className: 'noimg', innerHTML: svgIcon('image', 34) + '<span>미리보기 준비 중</span>',
          }));
          return;
        }
        cov.dataset.retry = '1';                    // 방금 올린 파일이면 잠시 뒤 다시
        setTimeout(() => { cov.src = cov.dataset.zoom + '&_r=' + Date.now(); }, 4000);
      });
    }
  });
}

/** 백엔드가 제대로 붙었는지 확인하고, 아니면 뭘 고쳐야 하는지 알려줍니다.
    gas 모드는 왕복이 비싸서 따로 확인하지 않고 목록 요청의 성패로 판단합니다. */
async function checkBackend() {
  const box = $('#works');
  if (!box || API.isGas) return;
  try {
    const r = await API.ping();
    if (r && r.ok) return;
    throw new Error((r && r.message) || '응답이 없습니다');
  } catch (err) {
    const gas = API.isGas;
    box.insertAdjacentHTML('beforebegin', `
      <div class="note note-danger" style="margin-bottom:18px">
        <div class="note-t">${svgIcon('danger', 19)}<span>결과물 서버에 연결하지 못했습니다</span></div>
        <div class="note-b"><p class="small">${gas
          ? `<code>js/config.js</code> 의 <b>gasUrl</b> 을 확인해 주세요 (<code>.../exec</code> 로 끝나야 합니다).
             Apps Script 배포 설정은 <b>실행 = 나 / 액세스 = 모든 사용자</b> 여야 합니다.
             자세한 절차는 <code>SETUP-GITHUB.md</code> 에 있습니다.`
          : 'Node 서버가 실행 중인지 확인해 주세요 — 터미널에서 <code>npm start</code>'}
          <br><span class="muted">오류: ${esc(err.message || String(err))}</span></p></div>
      </div>`);
  }
}

/* ── 실시간 알림 (local=SSE / gas=주기 확인) ─────────────── */
function subscribeLive(onEvent) {
  return API.subscribe((type, msg) => {
    if (type === 'toast') { toast(msg, 'ok'); return; }
    onEvent(type);
  });
}

/* ══ 자료실 ═══════════════════════════════════════════════ */
function pageResources() {
  APP.innerHTML = `
  <div class="wrap" style="padding-top:34px">
    <h1 class="page-title">자료실</h1>
    <p class="lede" style="margin-top:10px">
      연수 중에 가장 많이 되돌아보게 되는 것들만 모았습니다. 모든 코드 블록에 <b style="color:var(--acc-hi)">복사 버튼</b>이 있습니다.
    </p>

    <div class="toolbar" style="margin-top:22px">
      <div class="seg" id="resSeg">
        <button data-tab="materials" class="on">강의 자료</button>
        <button data-tab="styles">삽화 스타일 10종</button>
        <button data-tab="bgm">BGM 프롬프트</button>
        <button data-tab="cheat">치트시트</button>
        <button data-tab="tools">도구 · 요금</button>
        <button data-tab="src">출처</button>
      </div>
    </div>

    <div id="resBody" class="blk"></div>
  </div>`;

  const tabs = {
    materials: () => `<h2 class="sec-h">강의 자료 원본</h2>
      <p class="lede" style="margin-bottom:18px">
        연수에서 쓰는 자료를 원본 그대로 모았습니다. 교안은 내려받아 두면 인터넷 없이도 볼 수 있고,
        노션과 노트북은 새 탭으로 열립니다.
      </p>
      <div class="mat-grid">
        ${(window.MATERIALS || []).map((m) => `
          <a class="mat" href="${esc(m.href)}"
             ${m.kind === 'pdf' ? `download="${esc(m.download || '')}"` : 'target="_blank" rel="noopener"'}>
            <div class="mat-ic">${svgIcon(m.icon, 26)}</div>
            <div class="mat-b">
              <div class="mat-t">${esc(m.title)}</div>
              <div class="mat-s">${esc(m.sub)}</div>
              <div class="mat-d">${raw(m.desc)}</div>
            </div>
            <div class="mat-go">${svgIcon(m.kind === 'pdf' ? 'download' : 'link', 18)}</div>
          </a>`).join('')}
      </div>
      <div class="note note-info">
        <div class="note-t">${svgIcon('info', 19)}<span>제미나이 노트북을 이렇게 써 보세요</span></div>
        <div class="note-b"><p>
          연수 중에 「그 설정이 뭐였더라」 싶을 때 검색보다 빠릅니다.
          <b>「Apps Script 배포 설정 어떻게 하죠?」</b>, <b>「Veo 크레딧 얼마예요?」</b>처럼 물으면
          자료 안에서만 답하고 <b>각주</b>를 붙여 줍니다. 각주를 누르면 원문이 열립니다.
          1교시에서 만드는 「봄내 AI」가 바로 이 방식입니다.
        </p></div>
      </div>`,
    styles: () => `<h2 class="sec-h">삽화 스타일 10종</h2>
      <div class="note note-info">
        <div class="note-t">${svgIcon('info', 19)}<span>사용법</span></div>
        <div class="note-b"><p>프롬프트의 <code>[배경]</code> · <code>[주인공]</code> · <code>[행동]</code> 세 칸만 바꿔 넣으면 바로 씁니다.
        마지막 문장 <b>"글자, 말풍선, 로고는 넣지 마"</b>가 핵심입니다 — 자막을 편집기에서 얹을 자리를 확보합니다.</p></div>
      </div>
      ${renderStyleGrid()}`,
    bgm: () => `<h2 class="sec-h">Suno BGM 프롬프트 7종</h2>
      <div class="note note-danger">
        <div class="note-t">${svgIcon('danger', 19)}<span>쓰기 전에</span></div>
        <div class="note-b"><p>Suno <b>무료 플랜 결과물은 Suno 소유 + 비상업 한정 + 출처표시 의무</b>입니다.
        학생 대회 출품에는 권하지 않습니다. <b>교사가 BGM을 만들어 학생 영상에 제공</b>하는 것이 오늘의 설계입니다.</p></div>
      </div>
      <div class="note note-ok">
        <div class="note-t">${svgIcon('check', 19)}<span>BGM은 "좋은 음악"이 아니라 "방해하지 않는 음악"입니다</span></div>
        <div class="note-b"><p><code>sparse</code> + <code>pedal point</code> + <code>unobtrusive</code> 이 조합이 핵심입니다.
        초보자가 가장 많이 하는 실수는 <b>너무 화려한 곡을 고르는 것</b>입니다.</p></div>
      </div>
      ${renderBgmList()}`,
    cheat: () => `<h2 class="sec-h">프롬프트 · 코드 치트시트</h2>
      ${window.CHEATSHEETS.map((g) => `<h3 class="sub-h">DAY ${g.day} · ${esc(g.group)}</h3>${g.items.map((i) => renderCode(i)).join('')}`).join('')}`,
    tools: () => toolsHTML(),
    src: () => `<h2 class="sec-h">출처</h2>
      <p class="small muted">이 연수 자료의 근거입니다. 강의 전에 최소한 최우선 항목은 직접 열어 확인하세요.</p>
      ${window.SOURCES.map((g) => `<h3 class="sub-h">${esc(g.group)}</h3>
        <ul>${g.items.map(([t, u, n]) => `<li>${u ? `<a href="${esc(u)}" target="_blank" rel="noopener">${esc(t)}</a>` : esc(t)}${n ? ` <span class="muted small">— ${esc(n)}</span>` : ''}</li>`).join('')}</ul>`).join('')}`,
  };

  const body = $('#resBody');
  const show = (name) => { body.innerHTML = tabs[name](); };
  $$('#resSeg button').forEach((b) => b.addEventListener('click', () => {
    $$('#resSeg button').forEach((x) => x.classList.toggle('on', x === b));
    show(b.dataset.tab);
  }));
  show('materials');
}

function toolsHTML() {
  return `<h2 class="sec-h">오늘 쓰는 도구 · 요금 · 연령</h2>
  ${renderTable({
    head: ['도구', '용도', '요금', '연령', '링크'],
    rows: [
      ['<b>Gemini Notebook</b>', '검증된 지역 챗봇 (구 NotebookLM)', 'Google AI Pro 포함', '만 14세 (학교 계정)', '<a href="https://notebooklm.google.com" target="_blank" rel="noopener">열기</a>'],
      ['<b>Canva</b>', '사진 복원 · 카드 · 포스터', 'Education 인증 시 Pro 무료', '만 14세 (학교 계정)', '<a href="https://www.canva.com" target="_blank" rel="noopener">열기</a>'],
      ['<b>Google Stitch</b>', '웹페이지 UI 생성', '무료 (표준 월 350 / 실험 월 50)', '—', '<a href="https://stitch.withgoogle.com" target="_blank" rel="noopener">열기</a>'],
      ['<b>Google AI Studio</b>', '웹페이지 완성 · 배포 · Live', '<b>전 기능 무료</b>', '<b>만 18세</b>', '<a href="https://aistudio.google.com" target="_blank" rel="noopener">열기</a>'],
      ['<b>Apps Script</b>', '신청 폼 · 시트 DB · 자동 메일', '무료 (Workspace 메일 1,500/일)', '교사 감독', '<a href="https://script.google.com" target="_blank" rel="noopener">열기</a>'],
      ['<b>Gemini (Nano Banana)</b>', '8컷 키프레임 · 캐릭터 시트', 'Flow 안에서 <b>이미지 생성 0크레딧</b>', '만 14세 (학교 계정)', '<a href="https://gemini.google.com" target="_blank" rel="noopener">열기</a>'],
      ['<b>Google Flow (Veo)</b>', '이미지 → 영상 클립', 'Pro 월 1,000크레딧 (Lite 1클립 10)', '<b>만 18세</b>', '<a href="https://labs.google/flow" target="_blank" rel="noopener">열기</a>'],
      ['<b>Suno</b>', '설화 BGM', '무료는 <b>비상업 한정</b> / Pro $8', '만 13세', '<a href="https://suno.com" target="_blank" rel="noopener">열기</a>'],
      ['<b>CapCut</b>', '편집 · 자막 · 내보내기', '무료 (내장 음원은 사용 금지)', '교사 계정 원칙', '<a href="https://www.capcut.com" target="_blank" rel="noopener">열기</a>'],
      ['<b>패들렛</b>', '임시 보관소', '무료 (보드 3개까지)', '—', '<a href="https://padlet.com" target="_blank" rel="noopener">열기</a>'],
    ],
  })}
  <div class="note note-danger">
    <div class="note-t">${svgIcon('danger', 19)}<span>연령 요약 — 학생 지도의 전제</span></div>
    <div class="note-b"><p>
      한국 Google 계정 최소 연령 <b>만 14세</b> · Google AI Studio와 Flow는 <b>만 18세</b> · Suno·CapCut은 <b>만 13세</b>.<br>
      → 초5~중1은 <b>학교 Workspace 계정이 사실상 유일한 합법 경로</b>이고,
      <b>AI Studio · Flow · Stitch · Apps Script는 학생이 직접 쓰지 않습니다.</b>
      학생에게 주는 것은 <b>결과물(링크·이미지 파일)</b>뿐입니다.
    </p></div>
  </div>
  <h3 class="sub-h">Flow 크레딧 — 실습 설계의 핵심</h3>
  ${renderTable({
    head: ['모델', '생성 유형', '필요 크레딧'],
    rows: [
      ['<b>Veo 3.1 Lite</b>', '4/6/8초 영상, Extend', '<b>10</b>'],
      ['Veo 3.1 Fast', '4/6/8초 영상, Extend', '20'],
      ['Veo 3.1 Quality', '8초 영상, Extend', '100'],
      ['<b>Nano Banana 2 (이미지)</b>', '이미지 생성·편집', '<b>0 (무료)</b>'],
    ],
  })}
  <div class="note note-warn">
    <div class="note-t">${svgIcon('warn', 19)}<span>실습 시작 전 전원 확인</span></div>
    <div class="note-b"><p>
      <b>출력 개수(Number of outputs) = 1</b> · 모델 = <b>Veo 3.1 Lite</b> · 길이 = <b>8초</b>.<br>
      길이가 4초든 8초든 <b>같은 크레딧</b>이 나갑니다. 무조건 8초로 뽑고 편집에서 4~6초만 쓰세요.
    </p></div>
  </div>`;
}

/* ══ 관리자 ═══════════════════════════════════════════════ */
function pageAdmin() {
  const pw = sessionStorage.getItem('ccai:pw') || '';
  APP.innerHTML = `
  <div class="wrap" style="padding-top:34px">
    <h1 class="page-title">관리자</h1>
    <p class="lede" style="margin-top:10px">등록된 결과물을 한눈에 보고, CSV로 내려받고, 필요하면 삭제합니다.</p>
    <div class="card" style="margin-top:22px">
      <div class="fld" style="max-width:340px">
        <label>관리자 비밀번호</label>
        <input type="password" id="pwIn" value="${esc(pw)}" placeholder="기본값: ccai2026">
        <span class="hint">서버 실행 시 <code>ADMIN_PW</code> 환경변수로 바꿀 수 있습니다.</span>
      </div>
      <button class="btn" id="pwBtn" style="margin-top:14px">확인</button>
    </div>
    <div id="adminBody" style="margin-top:24px"></div>
  </div>`;

  const doLogin = async () => {
    const v = $('#pwIn').value;
    const res = await API.adminLogin(v).catch(() => null);
    if (!res || !res.ok) { sessionStorage.removeItem('ccai:pw'); return toast('비밀번호가 틀렸습니다', 'err'); }
    sessionStorage.setItem('ccai:pw', v);
    renderAdmin(v);
  };
  $('#pwBtn').addEventListener('click', doLogin);
  $('#pwIn').addEventListener('keydown', (e) => { if (e.key === 'Enter') doLogin(); });
  if (pw) doLogin();
}

async function renderAdmin(pw) {
  const body = $('#adminBody');
  const [stats, list] = await Promise.all([
    API.stats(),
    API.list(),
  ]);
  const secCount = window.SECTIONS
    .map((s) => [s, stats.bySection[s.id] || 0])
    .filter(([, n]) => n > 0).sort((a, b) => b[1] - a[1]);

  body.innerHTML = `
    <div class="grid g4">
      ${[['등록 결과물', stats.works], ['참여 연수생', stats.authors], ['첨부 파일', stats.files], ['총 용량', bytes(stats.bytes)]]
        .map(([k, v]) => `<div class="card"><div class="small muted">${k}</div>
          <div style="font-family:var(--disp);font-size:32px;color:var(--acc-hi);text-shadow:var(--text-glow)">${v}</div></div>`).join('')}
    </div>

    <h2 class="sec-h">분류별 제출 현황</h2>
    ${secCount.length ? renderTable({
      head: ['분류', '건수', ''],
      rows: secCount.map(([s, n]) => [`${s.label}`, `<b>${n}</b>`,
        `<div class="bar gold" style="width:${Math.round((n / secCount[0][1]) * 100)}%"></div>`]),
    }) : '<p class="muted">아직 제출이 없습니다.</p>'}

    <h2 class="sec-h">전체 목록</h2>
    <p><button class="btn btn-ghost btn-sm" id="csvBtn">CSV로 내려받기</button></p>
    <div class="tbl-scroll">
      <table class="tbl">
        <thead><tr><th>등록</th><th>일차</th><th>분류</th><th>제목</th><th>이름</th><th>파일</th><th></th><th></th></tr></thead>
        <tbody>${(list.items || []).map((w) => `<tr data-row="${esc(w.id)}">
          <td class="small muted" style="white-space:nowrap">${esc(timeAgo(w.createdAt))}</td>
          <td>${w.day}</td>
          <td class="small">${esc(w.sectionLabel || w.section)}</td>
          <td><b>${esc(w.title)}</b>${(w.links || []).length ? ` <span class="muted small">${w.links.length}</span>` : ''}</td>
          <td class="small">${esc(w.author)}${w.school ? `<br><span class="muted">${esc(w.school)}</span>` : ''}</td>
          <td class="small">${(w.files || []).length}</td>
          <td class="small">${w.likes || 0}</td>
          <td><button class="mini" data-adel="${esc(w.id)}" style="color:var(--danger)">삭제</button></td>
        </tr>`).join('')}</tbody>
      </table>
    </div>
    ${(list.items || []).length ? '' : '<p class="muted">아직 등록된 결과물이 없습니다.</p>'}`;

  $('#csvBtn', body)?.addEventListener('click', () => API.exportCsv(pw));

  $$('[data-adel]', body).forEach((b) => b.addEventListener('click', async () => {
    if (!confirm('이 결과물과 첨부 파일을 삭제합니다. 되돌릴 수 없습니다.')) return;
    const id = b.dataset.adel;
    const res = await API.remove(id, { adminPw: pw }).catch(() => null);
    if (!res || !res.ok) return toast('삭제하지 못했습니다', 'err');
    $(`[data-row="${CSS.escape(id)}"]`)?.remove();
    toast('삭제했습니다', 'ok');
  }));
}

/* ══ 테마 색 — 60초에 네 색을 한 바퀴 ═════════════════════
   색상환을 따라 홍련 → 작염 → 벽록 → 보라 → 홍련 순으로
   끊김 없이 흐릅니다. 색점을 누르면 그 색으로 고정됩니다.
   ═══════════════════════════════════════════════════════ */

const STOPS = [
  { name: 'crimson', h: 4,   s: 100, l: 65 },
  { name: 'ember',   h: 28,  s: 100, l: 62 },
  { name: 'jade',    h: 171, s: 72,  l: 56 },
  { name: 'violet',  h: 266, s: 100, l: 74 },
  { name: 'crimson', h: 364, s: 100, l: 65 },   // 한 바퀴 돌아 제자리
];

const CYCLE_MS = 60000;   // 네 색 전체 한 바퀴
const TICK_MS = 100;      // 0.1초마다 갱신 — 한 걸음이 0.6도라 눈에 안 띕니다

function hslToRgb(h, s, l) {
  const S = s / 100, L = l / 100;
  const k = (n) => (n + ((h % 360) + 360) / 30) % 12;
  const a = S * Math.min(L, 1 - L);
  const f = (n) => L - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [f(0), f(8), f(4)].map((v) => Math.round(v * 255));
}

/** 지금 색을 문서에 반영 */
function paintAccent(h, s, l) {
  const root = document.documentElement.style;
  const [r, g, b] = hslToRgb(h, s, l);
  root.setProperty('--acc', `hsl(${h.toFixed(1)} ${s.toFixed(1)}% ${l.toFixed(1)}%)`);
  root.setProperty('--acc-hi', `hsl(${h.toFixed(1)} ${Math.min(100, s + 6).toFixed(1)}% ${Math.min(92, l + 17).toFixed(1)}%)`);
  root.setProperty('--acc-deep', `hsl(${h.toFixed(1)} ${s.toFixed(1)}% ${Math.max(24, l - 24).toFixed(1)}%)`);
  root.setProperty('--acc-rgb', `${r}, ${g}, ${b}`);
}

let cycleTimer = null;

function stopCycle() {
  if (cycleTimer) { clearInterval(cycleTimer); cycleTimer = null; }
}

function startCycle() {
  stopCycle();
  const legs = STOPS.length - 1;
  const legMs = CYCLE_MS / legs;
  const t0 = performance.now() - (store.get('cyclePhase', 0) || 0);
  let ticks = 0;

  const step = () => {
    const elapsed = (performance.now() - t0) % CYCLE_MS;
    const i = Math.min(legs - 1, Math.floor(elapsed / legMs));
    const k = (elapsed - i * legMs) / legMs;             // 0 → 1
    const e = k * k * (3 - 2 * k);                       // 부드럽게 (smoothstep)
    const A = STOPS[i], B = STOPS[i + 1];
    paintAccent(A.h + (B.h - A.h) * e, A.s + (B.s - A.s) * e, A.l + (B.l - A.l) * e);
    document.documentElement.dataset.acc = e < 0.5 ? A.name : B.name;   // 히어로 이미지 선택용
    if (++ticks % 20 === 0) store.set('cyclePhase', elapsed);           // 2초에 한 번만 기록
  };

  step();
  cycleTimer = setInterval(step, TICK_MS);
}

const FIXED = {
  crimson: [4, 100, 65], ember: [28, 100, 62], jade: [171, 72, 56], violet: [266, 100, 74],
};

function lockColor(name) {
  stopCycle();
  document.documentElement.style.removeProperty('--acc');
  document.documentElement.style.removeProperty('--acc-hi');
  document.documentElement.style.removeProperty('--acc-deep');
  document.documentElement.style.removeProperty('--acc-rgb');
  paintAccent(...FIXED[name]);
  document.documentElement.dataset.acc = name;
}

function initPalette() {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saved = store.get('accMode', reduce ? 'violet' : 'auto');

  const paint = (mode) => {
    store.set('accMode', mode);
    $$('.sw').forEach((s) => s.classList.toggle('on', s.dataset.sw === mode));
    if (mode === 'auto') startCycle(); else lockColor(mode);
  };

  paint(FIXED[saved] || saved === 'auto' ? saved : 'auto');
  $$('.sw').forEach((b) => b.addEventListener('click', () => paint(b.dataset.sw)));

  // 탭이 가려져 있으면 굳이 돌리지 않습니다
  document.addEventListener('visibilitychange', () => {
    if (store.get('accMode', 'auto') !== 'auto') return;
    if (document.hidden) stopCycle(); else startCycle();
  });
}

/* ══ 시작 ═════════════════════════════════════════════════ */
$('#brandMark').innerHTML = artEmblem(32);
$('#navToggle').addEventListener('click', () => $('.nav-links').classList.toggle('open'));
initPalette();
router();
