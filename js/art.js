/* ══ 오리지널 SVG 아트 ═══════════════════════════════════
   전부 currentColor / CSS 변수로 그려서 테마 색이 바뀌면 함께 바뀝니다.
   저작권 있는 캐릭터를 쓰지 않기 위해 춘천 모티프로 새로 그렸습니다.
   ── 소양강·의암호 물결 / 봉의산 능선 / 안개 / 술식 문양 / 개나리 불티
   ═════════════════════════════════════════════════════════ */

/* ── 라인 아이콘 ─────────────────────────────────────────
   이모지 대신 쓰는 얇은 선 아이콘. 전부 currentColor를 따릅니다.
   ──────────────────────────────────────────────────────── */
const ICON_PATHS = {
  users:    '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-5.4 6-5.4s6 2.1 6 5.4"/><path d="M16 5.4a3.2 3.2 0 0 1 0 5.2"/><path d="M17.6 14.9c2.1.6 3.4 2.3 3.4 5.1"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2.5"/><path d="M3 10h18M8 3v4M16 3v4"/><circle cx="8.5" cy="15" r="1.1" fill="currentColor" stroke="none"/><circle cx="12" cy="15" r="1.1" fill="currentColor" stroke="none"/>',
  layers:   '<path d="M12 3 21 8l-9 5-9-5 9-5Z"/><path d="M3 13l9 5 9-5"/><path d="M3 17.5l9 5 9-5"/>',
  target:   '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.6"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/>',
  pin:      '<path d="M12 21.5s7-6.2 7-11.1A7 7 0 0 0 5 10.4c0 4.9 7 11.1 7 11.1Z"/><circle cx="12" cy="10.2" r="2.7"/>',
  clock:    '<circle cx="12" cy="12" r="8.6"/><path d="M12 7v5.3l3.4 2"/>',
  box:      '<path d="M21 8.2 12 3 3 8.2v7.6L12 21l9-5.2V8.2Z"/><path d="M3 8.2l9 5.2 9-5.2M12 21v-7.6"/>',
  doc:      '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>',
  book:     '<path d="M4 5.2A2.2 2.2 0 0 1 6.2 3H11v17H6.2A2.2 2.2 0 0 0 4 22V5.2Z"/><path d="M20 5.2A2.2 2.2 0 0 0 17.8 3H13v17h4.8A2.2 2.2 0 0 1 20 22V5.2Z"/>',
  upload:   '<path d="M12 16V4"/><path d="M7.5 8.5 12 4l4.5 4.5"/><path d="M4 15v3.5A2.5 2.5 0 0 0 6.5 21h11a2.5 2.5 0 0 0 2.5-2.5V15"/>',
  download: '<path d="M12 4v12"/><path d="M7.5 11.5 12 16l4.5-4.5"/><path d="M4 16v2.5A2.5 2.5 0 0 0 6.5 21h11a2.5 2.5 0 0 0 2.5-2.5V16"/>',
  link:     '<path d="M10 13.5a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1.6 1.6"/><path d="M14 10.5a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1.6-1.6"/>',
  clip:     '<path d="M20 11.5 12.3 19a4.6 4.6 0 0 1-6.5-6.5l8-8a3.1 3.1 0 0 1 4.4 4.4l-8 8a1.6 1.6 0 0 1-2.2-2.2l7.2-7.2"/>',
  heart:    '<path d="M12 20s-7.4-4.6-7.4-9.6A4.1 4.1 0 0 1 12 7.6a4.1 4.1 0 0 1 7.4 2.8C19.4 15.4 12 20 12 20Z"/>',
  comment:  '<path d="M20 12.6c0 3.9-3.6 7-8 7a9 9 0 0 1-2.6-.4L4 21l1.4-3.7A6.6 6.6 0 0 1 4 12.6c0-3.9 3.6-7 8-7s8 3.1 8 7Z"/>',
  info:     '<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5"/><circle cx="12" cy="7.9" r="1.2" fill="currentColor" stroke="none"/>',
  check:    '<circle cx="12" cy="12" r="9"/><path d="M8 12.3l2.8 2.7L16 9.6"/>',
  warn:     '<path d="M12 3.6 21.2 19a1.4 1.4 0 0 1-1.2 2H4a1.4 1.4 0 0 1-1.2-2L12 3.6Z"/><path d="M12 9.6v4.6"/><circle cx="12" cy="17.4" r="1.15" fill="currentColor" stroke="none"/>',
  danger:   '<path d="M8.6 3h6.8L21 8.6v6.8L15.4 21H8.6L3 15.4V8.6L8.6 3Z"/><path d="M12 7.6v5.2"/><circle cx="12" cy="16.4" r="1.15" fill="currentColor" stroke="none"/>',
  spark:    '<path d="M12 3l2.1 5.9L20 11l-5.9 2.1L12 19l-2.1-5.9L4 11l5.9-2.1L12 3Z"/>',
  image:    '<rect x="3" y="4.5" width="18" height="15" rx="2.2"/><circle cx="8.6" cy="10" r="1.7"/><path d="M3.5 17.5 9 12.4l4 3.6 3-2.4 4.5 3.9"/>',
  video:    '<rect x="3" y="5.5" width="13" height="13" rx="2.2"/><path d="M16 10.6 21 7.6v8.8l-5-3"/>',
  music:    '<path d="M9 18V6.4l10-2v11.2"/><circle cx="6.6" cy="18" r="2.4"/><circle cx="16.6" cy="15.6" r="2.4"/>',
  hand:     '<path d="M8.5 12V5.6a1.5 1.5 0 0 1 3 0V11"/><path d="M11.5 10.6V4.6a1.5 1.5 0 0 1 3 0v6"/><path d="M14.5 11V6.6a1.5 1.5 0 0 1 3 0V15c0 3.3-2.4 6-6 6s-6-2.7-6-6v-2.6a1.5 1.5 0 0 1 3 0"/>',
  search:   '<circle cx="10.7" cy="10.7" r="6.7"/><path d="M15.6 15.6 21 21"/>',
  shield:   '<path d="M12 3l7.5 3v6c0 4.4-3.1 7.9-7.5 9.4C7.6 19.9 4.5 16.4 4.5 12V6L12 3Z"/><path d="M9 12.2l2.2 2.2 4-4.2"/>',
  flag:     '<path d="M5.5 21V4"/><path d="M5.5 5h11l-2 3.4 2 3.4h-11"/>',
};

/** 라인 아이콘 하나 — svgIcon('users', 22) */
function svgIcon(name, size = 22) {
  const d = ICON_PATHS[name] || ICON_PATHS.info;
  return `<svg class="ico" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"
    aria-hidden="true">${d}</svg>`;
}

/** 알림 상자 톤별 아이콘 */
const TONE_ICON = { info: 'info', ok: 'check', warn: 'warn', danger: 'danger', tip: 'spark' };

/** 좌상단 브랜드 엠블럼 (천천히 회전) */
function artEmblem(size = 30) {
  return `<svg class="emblem" viewBox="0 0 100 100" width="${size}" height="${size}" aria-hidden="true">
    <g fill="none" stroke="currentColor" stroke-width="3">
      <circle cx="50" cy="50" r="44" opacity=".55"/>
      <circle cx="50" cy="50" r="34" opacity=".9"/>
      <path d="M50 6 L58 22 L50 18 L42 22 Z" fill="currentColor" stroke="none"/>
      <g opacity=".8">
        <path d="M50 16 L79 33 L79 67 L50 84 L21 67 L21 33 Z"/>
      </g>
    </g>
    <circle cx="50" cy="50" r="13" fill="currentColor" opacity=".18"/>
    <circle cx="50" cy="50" r="7" fill="currentColor"/>
    <circle cx="50" cy="50" r="2.6" fill="#05050A"/>
  </svg>`;
}

/** 우측 큰 술식 문양 */
function artSigil(size = 92) {
  return `<svg class="sigil" viewBox="0 0 120 120" width="${size}" height="${size}" aria-hidden="true">
    <g fill="none" stroke="currentColor" stroke-width="2.4">
      <circle cx="60" cy="60" r="55" opacity=".45"/>
      <circle cx="60" cy="60" r="46" opacity=".85"/>
      <path d="M60 14 L92 32 L92 88 L60 106 L28 88 L28 32 Z" opacity=".7"/>
      <path d="M60 22 L60 98 M27 41 L93 79 M93 41 L27 79" opacity=".28"/>
      ${Array.from({ length: 12 }, (_, i) => {
        const a = (i * 30 * Math.PI) / 180;
        const x1 = 60 + Math.cos(a) * 47, y1 = 60 + Math.sin(a) * 47;
        const x2 = 60 + Math.cos(a) * 54, y2 = 60 + Math.sin(a) * 54;
        return `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}" opacity=".6"/>`;
      }).join('')}
    </g>
    <circle cx="60" cy="60" r="18" fill="currentColor" opacity=".14"/>
    <circle cx="60" cy="60" r="9" fill="currentColor"/>
    <circle cx="60" cy="60" r="3.4" fill="#05050A"/>
  </svg>`;
}

/** 히어로 메인 아트 — 춘천의 밤 + 주력이 갈라지는 형상 */
function artHero() {
  const rnd = mulberry(20260829);           // 매번 같은 그림이 나오게 고정 시드
  const spark = (n, w, h, r) => Array.from({ length: n }, () => {
    const x = (rnd() * w).toFixed(1), y = (rnd() * h).toFixed(1);
    const s = (r[0] + rnd() * (r[1] - r[0])).toFixed(2);
    return `<circle cx="${x}" cy="${y}" r="${s}" opacity="${(0.15 + rnd() * 0.7).toFixed(2)}"/>`;
  }).join('');

  // 갈라지는 균열 — 재귀 분기
  const cracks = [];
  function crack(x, y, ang, len, depth, wid) {
    if (depth === 0 || len < 8) return;
    let px = x, py = y, a = ang, d = `M${x.toFixed(1)} ${y.toFixed(1)}`;
    const steps = 3 + Math.floor(rnd() * 3);
    for (let i = 0; i < steps; i += 1) {
      a += (rnd() - 0.5) * 0.85;
      const seg = len / steps;
      px += Math.cos(a) * seg; py += Math.sin(a) * seg;
      d += ` L${px.toFixed(1)} ${py.toFixed(1)}`;
    }
    cracks.push(`<path d="${d}" stroke-width="${wid.toFixed(2)}" opacity="${(0.28 + depth * 0.16).toFixed(2)}"/>`);
    const branches = depth > 2 ? 2 : 1;
    for (let b = 0; b < branches; b += 1) {
      crack(px, py, a + (rnd() - 0.5) * 1.5, len * (0.5 + rnd() * 0.28), depth - 1, wid * 0.62);
    }
  }
  for (let i = 0; i < 7; i += 1) {
    const a = (-125 + i * 26 + rnd() * 14) * (Math.PI / 180);
    crack(350, 330, a, 120 + rnd() * 80, 4, 3.1);
  }

  return `<svg class="hero-art" viewBox="0 0 700 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <radialGradient id="core" cx="50%" cy="37%" r="46%">
        <stop offset="0%"   stop-color="currentColor" stop-opacity=".92"/>
        <stop offset="38%"  stop-color="currentColor" stop-opacity=".26"/>
        <stop offset="100%" stop-color="currentColor" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stop-color="currentColor" stop-opacity=".85"/>
        <stop offset="100%" stop-color="currentColor" stop-opacity=".05"/>
      </linearGradient>
      <linearGradient id="mist" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stop-color="currentColor" stop-opacity="0"/>
        <stop offset="100%" stop-color="currentColor" stop-opacity=".3"/>
      </linearGradient>
      <filter id="soft"><feGaussianBlur stdDeviation="14"/></filter>
      <filter id="soft2"><feGaussianBlur stdDeviation="4"/></filter>
    </defs>

    <!-- 주력 코어 -->
    <ellipse cx="350" cy="330" rx="300" ry="300" fill="url(#core)"/>
    <g filter="url(#soft)" opacity=".55">
      <ellipse cx="350" cy="330" rx="120" ry="150" fill="currentColor" opacity=".35"/>
    </g>

    <!-- 균열 -->
    <g class="cracks" stroke="currentColor" fill="none" stroke-linecap="round" filter="url(#soft2)">
      ${cracks.join('')}
    </g>
    <g class="cracks" stroke="currentColor" fill="none" stroke-linecap="round">
      ${cracks.join('')}
    </g>

    <!-- 회전 술식 링 -->
    <g class="ring-slow" transform="translate(350 330)" fill="none" stroke="currentColor">
      <circle r="196" stroke-width="1.2" opacity=".3" stroke-dasharray="3 13"/>
      <circle r="168" stroke-width="1.6" opacity=".45"/>
      <path d="M0 -150 L130 -75 L130 75 L0 150 L-130 75 L-130 -75 Z" stroke-width="1.8" opacity=".38"/>
    </g>
    <g class="ring-fast" transform="translate(350 330)" fill="none" stroke="currentColor">
      <circle r="228" stroke-width="1" opacity=".22" stroke-dasharray="34 20 6 20"/>
    </g>

    <!-- 봄내(春川) -->
    <text class="hanja" x="350" y="352" text-anchor="middle" fill="currentColor">春川</text>

    <!-- 안개 -->
    <g filter="url(#soft)" opacity=".5">
      <ellipse cx="250" cy="640" rx="330" ry="46" fill="currentColor" opacity=".2"/>
      <ellipse cx="470" cy="700" rx="290" ry="38" fill="currentColor" opacity=".14"/>
    </g>

    <!-- 봉의산 · 삼악산 능선 -->
    <path d="M-20 700 L90 596 L172 660 L250 566 L330 664 L420 604 L520 690 L620 618 L720 686 L720 900 L-20 900 Z"
          fill="#05050A"/>
    <path d="M-20 700 L90 596 L172 660 L250 566 L330 664 L420 604 L520 690 L620 618 L720 686"
          fill="none" stroke="currentColor" stroke-width="1.6" opacity=".55"/>

    <!-- 도시 불빛 -->
    <g fill="currentColor">${spark(70, 700, 120, [0.7, 1.9]).replace(/cy="([\d.]+)"/g, (m, y) => `cy="${(700 + Number(y) * 1.1).toFixed(1)}"`)}</g>

    <!-- 의암호 물결 -->
    <g stroke="currentColor" fill="none" opacity=".5">
      ${Array.from({ length: 9 }, (_, i) => {
        const y = 792 + i * 13;
        const w = 40 + i * 24;
        const x = 90 + (i % 3) * 130;
        return `<path d="M${x} ${y} q${w / 2} -5 ${w} 0" stroke-width="${(2.2 - i * 0.12).toFixed(2)}" opacity="${(0.75 - i * 0.06).toFixed(2)}"/>`;
      }).join('')}
    </g>
    <rect x="-20" y="770" width="740" height="150" fill="url(#mist)" opacity=".5"/>

    <!-- 개나리 불티 -->
    <g class="embers" fill="currentColor">${spark(46, 700, 760, [0.8, 2.6])}</g>
  </svg>`;
}

/** 결정론적 난수 — 새로고침해도 같은 그림 */
function mulberry(seed) {
  let a = seed >>> 0;
  return function next() {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** 섹션 구분용 얇은 술식 라인 */
function artDivider() {
  return `<svg class="divider" viewBox="0 0 400 20" preserveAspectRatio="none" aria-hidden="true">
    <path d="M0 10 H150" stroke="currentColor" stroke-width="1" opacity=".35"/>
    <path d="M250 10 H400" stroke="currentColor" stroke-width="1" opacity=".35"/>
    <path d="M200 2 L212 10 L200 18 L188 10 Z" fill="none" stroke="currentColor" stroke-width="1.4"/>
    <circle cx="200" cy="10" r="2.2" fill="currentColor"/>
  </svg>`;
}
