/* 2일차 — 춘천 설화 × AI 영상 제작 (6H) */
window.DAY2 = {
  day: 2,
  slug: 'day2',
  title: '춘천 설화 × AI 영상 제작',
  subtitle: '기획에서 완성 MP4까지, 하루에 한 편',
  notion: 'https://choinssam.notion.site/AI-6H-3ae452af4f1281c89abbcb525c99d383',
  hours: 6,
  accent: '#7A2E1E',
  oneLine: '그릇에 담을 <b>이야기</b>를 만든다',
  hook: '오늘 끝나면 손에 <b>춘천 설화 기반 30~60초 완성 영상 1편(MP4)</b>이 남습니다. 8컷 내외 · 자막 · BGM · 엔딩 크레딧(출처·AI 표기) 포함, 그리고 대회 심사 대응용 프롬프트 기록지 1부.',
  tools: ['Gemini (Nano Banana)', 'Google Flow (Veo)', 'Suno', 'CapCut'],

  outputs: [
    { n: '①', name: '춘천 설화 30~60초 영상 (MP4)', desc: '8컷 내외 · 자막 · BGM · 엔딩 크레딧 포함' },
    { n: '②', name: '8컷 스토리보드', desc: '막 · 시간 · 화면 크기 · 카메라 움직임까지 채운 것' },
    { n: '③', name: '스타일 블록 + 캐릭터 기준 이미지', desc: '일관성의 전부. 메모장에 저장해 매 컷 복붙' },
    { n: '④', name: '프롬프트 기록지 1부', desc: '대회 심사 대응용. 교육부 2026 지도사항' },
  ],

  workflow: [
    { step: '①', label: '기획', sub: '설화 → 로그라인\n→ 3막 → 8컷' },
    { step: '②', label: '이미지', sub: 'Gemini\n8컷 키프레임' },
    { step: '③', label: '영상', sub: 'Google Flow\n이미지 → 클립' },
    { step: '④', label: '음악', sub: 'Suno\nBGM' },
    { step: '⑤', label: '편집', sub: 'CapCut\n조립·자막·완성' },
  ],

  timetable: [
    { period: '0교시', min: 25, topic: '오리엔테이션 · 완성작 시연 · 계정/환경 세팅', output: '계정 로그인 완료', ref: 'd2-p0' },
    { period: '1교시', min: 45, topic: '영상 기획 — 설화 선택 → 로그라인 → 3막 → 8컷', output: '스토리보드 1장', ref: 'd2-p1' },
    { period: '2교시', min: 90, topic: '이미지 — 스타일 고정 · 캐릭터 일관성 · 8컷 키프레임', output: '키프레임 8장', ref: 'd2-p2' },
    { period: '3교시', min: 90, topic: '영상 — 이미지→영상 변환 · 컷 연결 · 재생성 요령', output: '클립 8개', star: true, ref: 'd2-p3' },
    { period: '4교시', min: 35, topic: '음악 — Suno로 설화 BGM 만들기', output: 'BGM 1곡', ref: 'd2-p4' },
    { period: '5교시', min: 60, topic: '편집 — CapCut 조립 · 자막 · 내보내기', output: '완성 MP4', ref: 'd2-p5' },
    { period: '6교시', min: 15, topic: '학생 지도 — 저작권 · 프롬프트 기록 · 대회 대응', output: '기록지 1부', ref: 'd2-p6' },
  ],
  timetableNote: '쉬는 시간(10분×2)·점심(60분) 별도. 순수 강의 <b>360분</b>.',

  dropOrder: {
    title: '시간이 부족할 때 버리는 순서',
    order: '① 4교시 BGM(기성 무료 음원으로 대체) → ② 3교시 클립 수를 8개에서 5개로 축소 → ③ 2교시 캐릭터 시트 생략(스타일 블록만)',
    never: '<b>완주.</b> 완벽을 노리지 말고 끝까지 가세요. 8컷을 다 못 만들어도 컷 1(훅)·컷 5(중간점)·컷 8(마지막)만 있으면 다음 교시로 넘어갈 수 있습니다.',
  },

  sections: [
    /* ───────────────────────── 0교시 ───────────────────────── */
    {
      id: 'd2-p0',
      period: '0교시',
      min: 25,
      title: '오리엔테이션 · 왜 이 순서인가',
      summary: '도구 사이에는 맥락이 전혀 안 넘어간다 — 오늘의 핵심 전제',
      blocks: [
        { type: 'p', text: '<b>"AI로 영상 만드는 법을 안다"가 아니라, "학생에게 지도할 수 있다"가 목표입니다.</b> 그래서 처음부터 끝까지 한 편을 직접 만들어 봅니다. 직접 어려움을 겪어 봐야 학생이 어디서 어려워 할지 알 수 있습니다.' },
        {
          type: 'note', tone: 'ok', title: '① 도구 사이에는 맥락이 전혀 안 넘어갑니다 ← 오늘의 핵심',
          body: [{ type: 'p', text: '오늘은 <b>Gemini → Flow → Suno → CapCut</b> 네 개 도구를 건너다닙니다. Gemini가 무엇을 생각했는지 Flow는 전혀 모릅니다. 도구 사이를 건너가는 것은 <b>내가 손으로 옮기는 이미지 파일과 텍스트뿐</b>입니다. 그래서 그 텍스트(스타일 블록·캐릭터 블록)를 미리 문서로 만들어 두는 것입니다.' }],
        },
        {
          type: 'note', tone: 'info', title: '영상(Veo)은 클립마다 독립적으로 생성됩니다',
          body: [{ type: 'p', text: '이미지와 달리 영상은 클립 A를 만든 기억이 클립 B에 없습니다. Google이 공식으로 <b>"이전 프롬프트의 필수 디테일을 전부 반복하라고 명시적으로 지시하라"</b>고 안내하는 이유가 이것입니다. <b>3교시의 「고정 블록」 기법이 여기서 나옵니다.</b>' }],
        },
        {
          type: 'note', tone: 'info', title: '맥락이 유지된다고 복사되는 것은 아닙니다',
          body: [{ type: 'p', text: '같은 대화 안이라도 매 출력은 <b>복사가 아니라 재생성</b>입니다. 맥락을 참고해 다시 그리는 것이라 컷이 쌓일수록 오차가 누적됩니다(드리프트). 그래서 Google도 맥락만 믿지 말고 <b>①참조 이미지 ②고유 이름 부여 ③멀티턴</b>을 세트로 권장합니다.' }],
        },
        {
          type: 'note', tone: 'danger', title: '크레딧과 시간은 되돌려지지 않습니다',
          body: [{ type: 'p', text: '8컷을 다 뽑고 나서 "근데 이야기가 이상한데?"를 발견하면 6시간이 날아갑니다. <b>기획 45분이 생성 3시간을 살립니다.</b>' }],
        },
        { type: 'check', id: 'd2-setup', title: '환경 세팅', items: [
          'Google 계정 로그인 (<b>Google AI Pro</b> 구독 확인)',
          '<a href="https://labs.google/flow" target="_blank" rel="noopener">labs.google/flow</a> 접속 확인 · 설정에서 <b>크레딧 잔량</b> 확인',
          'Suno 계정 (<a href="https://suno.com" target="_blank" rel="noopener">suno.com</a>)',
          'CapCut 설치 또는 <a href="https://www.capcut.com/" target="_blank" rel="noopener">capcut.com</a> 로그인',
          '작업 폴더 <code>C:\\AI</code> · <code>C:\\CapCut</code> 생성 → <b>영문 경로</b>',
        ] },
      ],
    },

    /* ───────────────────────── 1교시 ───────────────────────── */
    {
      id: 'd2-p1',
      period: '1교시',
      min: 45,
      title: '영상 기획 — 설화에서 8컷까지',
      summary: '설화 선택 → 로그라인 → 3막 → 8컷 스토리보드',
      blocks: [
        { type: 'h', text: '1-1. 춘천 설화 3선 (참고자료)' },
        { type: 'table', head: ['', '① 공주와 상사뱀', '② 부래산 (떠내려온 산)', '③ 용궁에서 가져온 물고기'], rows: [
          ['장소', '북산면 청평사 · 회전문 · 공주탑', '서면 신매리 고산 · 의암호', '공지천 · 퇴계동'],
          ['인물 수', '실질 2명', '3명 (동시 등장 2명)', '2명 + 동물 1'],
          ['클라이맥스', '회전문 앞 뇌성벽력', '산이 강물에 떠내려옴', '지푸라기가 물고기로'],
          ['잔혹 요소', '△ 1문장 (직접 묘사 없이 처리 가능)', '○ 없음', '○ 없음'],
          ['AI 난이도', '★★★★★ 쉬움 (클라이맥스에 사람이 안 나옴)', '★★★★★ 쉬움 (클라이맥스에 사람이 안 나옴)', '★★★★☆ (변신 표현 필요)'],
          ['추천 대상', '극적 연출을 배우고 싶은 분', '<b>초등 지도용 1순위</b> (주인공이 일곱 살 아이)', '캐릭터 일관성을 제대로 연습하고 싶은 분'],
        ] },

        { type: 'h3', text: '① 공주와 상사뱀 (청평사 창건설화)' },
        { type: 'olist', items: [
          '신분이 낮은 총각이 공주를 사랑했고, 이를 안 임금이 분노하여 총각을 죽였다.',
          '그날 밤 큰 뱀이 공주의 방에 들어와 몸을 칭칭 감았고, 공주는 그 뱀이 죽은 총각의 화신임을 알게 되었다.',
          '어떤 방법으로도 뱀이 떨어지지 않아 공주는 날로 여위어 갔고, 마침내 절을 찾아 빌기로 하여 춘천 청평사까지 오게 되었다.',
          '청평사 입구에서 "불공을 드리고 올 테니 잠깐만 풀어다오"라고 하자, 그토록 말을 듣지 않던 뱀이 순순히 몸을 풀어 주었다.',
          '기다리다 지쳐 절로 기어 들어간 뱀이 <b>회전문(廻轉門)</b>에 이르는 순간 뇌성벽력과 폭우가 쏟아져 뱀은 물에 쓸려 내려갔고, 공주는 자유로운 몸이 되었다.',
        ] },
        {
          type: 'note', tone: 'info', title: '이 설화는 이본(異本)이 4가지입니다',
          body: [{ type: 'p', text: '나라(중국/당/원), 남자의 신분(총각/도목수), 죽은 이유(처형/상사병)가 출처마다 다릅니다. 이건 결함이 아니라 <b>구비문학의 정상적인 특성</b>이며, 재해석 수업에 이만한 교재가 없습니다. 청평사 공식 홈페이지도 "이외 다양한 내용으로 설화가 전해지고 있다"고 직접 명시합니다.' }],
        },
        { type: 'p', text: '<b>시각화하기 좋은 장면 3선</b>' },
        { type: 'olist', items: [
          '뱀이 공주의 몸을 아래에서 위로 감아 올라가는 순간 — <b>공주의 눈을 클로즈업</b>했다가 상반신으로 빠지기',
          '청평사 입구, "잠깐만 나를 풀어다오" — <b>공주 얼굴과 풀리는 뱀이 한 화면에</b>',
          '회전문 앞 뇌성벽력과 폭우 — <b>멀리서 회전문 전경</b>을 잡았다가 더 멀리 빠지기 <b>(사람이 안 나오는 장면 = AI 성공률 최상)</b>',
        ] },

        { type: 'h3', text: '② 부래산 / 장마에 떠내려온 산' },
        { type: 'olist', items: [
          '서면 신매리 모랫벌 가운데 홀로 솟은 바위산 <b>고산(孤山)</b>은, 원래 금강산에 있던 것이 장마에 춘천까지 떠내려온 것이라 하여 <b>부래산(浮來山)</b>이라고도 부른다.',
          '금성의 관리가 해마다 춘천에 와서 "이 산 때문에 경치가 좋아졌으니 세금을 내라"며 집집마다 <b>산세(山稅)</b>를 걷어 갔다.',
          '해마다 세금에 시달린 고을 사람들은 가난해지고 원성이 높아졌으며, 고민하던 수령은 병석에 눕고 말았다.',
          '사정을 알게 된 <b>수령의 일곱 살 아들</b>이 관리에게 대들었다 — "저 바위산이 <b>깔고 앉은 자리세</b>를 내세요. 그리고 저 산은 춘천에 필요 없으니 <b>도로 가져 가세요.</b>"',
          '관리는 당황하여 돌아갔고, 그 뒤로는 아무도 세금을 받으러 오지 못했다.',
        ] },
        {
          type: 'note', tone: 'ok', title: '초등 지도용 1순위인 이유',
          body: [{ type: 'p', text: '춘천 설화 중 <b>유일하게 어린이가 주인공이자 문제 해결자</b>입니다. 잔혹 요소가 전혀 없고, 6컷이면 완결되며, "산이 떠내려온다"는 1컷으로 설명이 끝납니다.' }],
        },
        { type: 'quote', text: '晩計昭陽下 司君老一竿 勿憂生事薄 自有浮來山<br>(근심하지 말지어다 — 저 부래산은 원래부터 이 자리에 있었던 것이 아닌가)', cite: '이항복이 춘천에 와서 이 이야기를 듣고 지었다는 시 — 엔딩 자막으로 쓸 수 있는 보너스' },

        { type: 'h3', text: '③ 용궁에서 가져온 물고기 (공지어·공지천 유래)' },
        { type: 'olist', items: [
          '퇴계 이황이 지금의 춘천 퇴계동에서 아이들을 가르치는데, 강아지 한 마리가 마루 밑에 앉아 귀를 쫑긋 세우고 가르침을 경청하기 시작했다.',
          '퇴계는 기특히 여겨 끼니때마다 밥을 반씩 덜어 주었고, 삼 년이 지나자 강아지는 사라졌다.',
          '며칠 뒤 모자를 쓴 아이가 찾아와 큰절을 하고 "저는 <b>용왕의 아들</b>입니다. 게으름을 피워 개의 탈을 쓰고 삼 년을 지내라는 벌을 받았던 것입니다"라며 퇴계를 용궁으로 모셔갔다.',
          '용왕은 <b>짚 한 오라기</b>를 주며 "조금씩 잘라서 반찬으로 드십시오"라고 했는데, 자를 때는 지푸라기인 것이 잘라 놓으면 맛있는 물고기가 되었다.',
          '끝만 조금 남자 퇴계가 그것을 개울에 넣었더니 수많은 물고기가 되었고, 그 고기를 <b>공지어</b>, 그 개울을 <b>공지천</b>이라 부르게 되었다.',
        ] },
        {
          type: 'note', tone: 'warn', title: '반드시 학생에게 알려야 할 사실',
          body: [{ type: 'p', text: '위키강원 퇴계동 페이지는 스스로 이렇게 명시합니다: <b>"실제로 퇴계 선생님이 춘천에 살았다는 역사적인 기록은 없다."</b> 이건 오히려 좋은 교육 소재입니다. "전설은 역사가 아니다"를 가르치는 최고의 사례이며, 엔딩 크레딧에 "이 이야기는 전설이며 역사적 사실은 아닙니다"를 넣는 <b>미디어 윤리 실습</b>으로 연결됩니다.' }],
        },

        { type: 'h', text: '1-2. 로그라인 — 한 문장으로 붙잡기 (5분)' },
        { type: 'p', text: '로그라인은 이야기를 1~2문장으로 요약하되, <b>읽는 사람이 그다음을 궁금해하게 만드는 문장</b>입니다.' },
        { type: 'p', text: '<b>4대 구성요소</b>: ① 주인공 — 이름 대신 <i>속성</i>으로 ② 발단 사건 ③ 목표 ④ 갈등' },
        { type: 'code', label: '로그라인 템플릿', text: '[어떤 상태의 주인공]이(가) [발단 사건] 때문에,\n[목표]하려 하지만 [장애물]이 가로막는다.' },
        { type: 'p', text: '<b>작성 원칙 3가지</b> — 결말을 누설하지 않는다 / 캐릭터 이름을 쓰지 않는다 / <b>아이러니가 있으면 강력하다</b>' },
        { type: 'table', head: ['설화', '로그라인'], rows: [
          ['공주와 상사뱀', '<b>사랑하는 사람이 죽어 뱀이 되어 자기 몸을 감아 버린 공주</b>가, <b>점점 여위어 죽어 가자</b>, <b>먼 나라 절을 찾아 그를 떠나보내려 하지만</b>, <b>뱀은 결코 떨어지려 하지 않는다.</b>'],
          ['공주와 상사뱀<br><i>(뱀 시점 전환)</i>', '<b>사람들에게 괴물이라 불리는 뱀</b>이, <b>사랑하던 사람 곁에 남고 싶어</b>, <b>그녀를 놓지 않으려 하지만</b>, <b>그녀가 자기를 떠나보내려 기도한다는 걸 알게 된다.</b>'],
          ['부래산', '<b>세금에 시달리는 고을의 일곱 살 아이</b>가, <b>아버지가 병으로 눕자</b>, <b>말 한마디로 관리를 돌려보내려 하지만</b>, <b>어른들은 아무도 아이의 말을 듣지 않는다.</b>'],
        ] },

        { type: 'h', text: '1-3. 3막 구조 — 30초는 「7.5 – 15 – 7.5」 (10분)' },
        {
          type: 'note', tone: 'ok', title: '교사 암기 규칙',
          body: [{ type: 'p', text: '<b>30초는 「7.5 – 15 – 7.5」, 60초는 「15 – 30 – 15」. 반으로 접고 또 반으로 접으면 됩니다.</b>' }],
        },
        { type: 'p', text: '표준 3막 비율은 <b>1 : 2 : 1</b> (설정 25% / 대결 50% / 해결 25%)입니다. 숏폼은 여기에 <b>첫 3초 \'훅\'</b>을 하나 더 얹습니다.' },
        { type: 'table', head: ['구간', '시간', '내용'], rows: [
          ['<b>훅</b>', '0~3초', '영상 전체에서 <b>가장 강렬한 장면</b>을 맨 앞에'],
          ['1막 셋업', '0~7.5초', '주인공 + 세계 + 원하는 것'],
          ['2막 전반', '7.5~15초', '시도 → 실패'],
          ['2막 후반', '15~22.5초', '최악의 상황'],
          ['3막 해결', '22.5~30초', '클라이맥스 → 마지막 이미지'],
        ] },
        { type: 'h3', text: '「공주와 상사뱀」 30초 배치 실례' },
        { type: 'table', head: ['구간', '시간', '장면'], rows: [
          ['훅', '0~3초', '뱀의 혓바닥이 공주 얼굴 앞에서 날름거리는 장면 (아주 가까이)'],
          ['1막', '3~7.5초', '총각이 죽고, 그 밤 뱀이 공주를 감는다'],
          ['1차 전환점', '7.5초', '어떤 방법으로도 떨어지지 않는다'],
          ['2막 전반', '7.5~15초', '점술가·의원 모두 실패, 공주는 여위어 간다'],
          ['<b>중간점</b>', '<b>15초</b>', '<b>청평사 입구. "잠깐만 나를 풀어다오" — 그토록 말을 안 듣던 뱀이 순순히 풀어 준다</b>'],
          ['2막 후반', '15~22.5초', '뱀은 기다리다 지쳐 절 안으로 기어 들어간다'],
          ['3막', '22.5~30초', '회전문 앞 뇌성벽력 → 물에 쓸려감 → 자유로워진 공주'],
        ] },
        { type: 'h3', text: '훅(Hook) 만드는 5가지 방법' },
        {
          type: 'note', tone: 'warn', title: '첫 화면 자체가 훅이어야 합니다',
          body: [{ type: 'p', text: '"훅으로 가는 도입부"를 두지 마세요. 콘텐츠를 제작하는 목적이 \'자기계발\'인지 \'홍보\'인지 명확히 정해야 합니다. \'홍보\'가 목적이라면 많은 사람에게 도달할 수 있는 콘텐츠를 기획해야 합니다.' }],
        },
        { type: 'table', head: ['유형', '예시', '춘천 설화 적용'], rows: [
          ['질문형', '"이 호수 밑에 뭐가 있는지 알아?"', '아침못 / 우양리'],
          ['<b>이상함형</b>', '말이 안 되는 이미지 한 컷', '<b>산이 강물에 떠내려온다</b> (부래산)'],
          ['결말 선공개형', '마지막 장면 1초 → 되감기', '회전문 벼락 장면 먼저'],
          ['시점 선언형', '"나는 뱀이 되었다."', '상사뱀 시점'],
          ['경고형', '"이 이야기, 끝까지 안 보면 후회함"', '(비교육적 ㅎㅎ)'],
        ] },
        { type: 'p', text: '훅 문장은 3초 안에 읽히는 분량 = <b>한국어 15~20자</b>.' },

        { type: 'h', text: '1-4. 컷 나누기 — 30초는 몇 컷인가 (5분)' },
        { type: 'p', text: '30초 TV 광고의 평균 컷 수는 1978년 7.9컷 → 1991년 13.2컷으로 증가했습니다(학술 논문 기준). 광고 실무의 통상 기준은 <b>컷당 약 4초</b>, 즉 <b>30초 = 7~8컷</b>입니다.' },
        {
          type: 'note', tone: 'warn', title: '숏폼 표준 리듬 vs AI 클립 제약',
          body: [{ type: 'p', text: '숏폼 표준(컷당 2초 → 30초=15컷) vs AI 클립 제약(1클립 최대 8초 → 30초=4~6클립). <b>해법</b>: 8초 클립 1개를 <b>편집에서 2~3컷으로 재분할</b>합니다. 실제 컷 수는 늘고, 생성 횟수는 그대로입니다.' }],
        },
        { type: 'table', head: ['완성 길이', '권장 컷 수', '컷당 화면 시간', '생성 클립 길이'], rows: [
          ['30초', '6~8컷', '3.5~5초', '<b>8초로 생성</b>'],
          ['45초 <i>(연수 권장)</i>', '8~12컷', '3.5~5초', '<b>8초로 생성</b>'],
          ['60초', '10~16컷', '3.5~6초', '<b>8초로 생성</b>'],
        ] },
        { type: 'p', text: '<b>핵심 설계 규칙</b>: ① 생성은 8초, 사용은 4~6초 — 앞뒤 여유(핸들)를 반드시 남긴다 ② 가장 긴 컷은 맨 처음(장소 소개) 또는 마지막(여운). 6~8초 허용 ③ 중간 컷은 3~4초. 짧을수록 AI의 결함이 덜 보인다 ④ 컷 수를 세지 말고 <b>"문장 수"</b>를 센다. 대본 문장 1개 = 컷 1개.' },

        { type: 'h', text: '1-5. ★ AI가 잘 만드는 컷 / 못 만드는 컷 (10분)' },
        {
          type: 'note', tone: 'ok', title: '이 표만 알고 있어도 오늘 헛수고가 절반으로 줍니다',
          body: [{ type: 'p', text: '기획 단계에서 "낮음" 칸에 해당하는 컷을 <b>아예 안 그리는 것</b>이 가장 확실합니다.' }],
        },
        { type: 'table', head: ['성공률', '어떤 장면인가'], rows: [
          ['<b>높음</b> ○', '· 허리 위로 잡은 인물, 움직임이 적을 때<br>· <b>사람이 안 나오는 풍경·배경 컷</b><br>· <b>피사체 하나만 클로즈업</b>한 컷<br>· 카메라가 천천히 다가가거나 멀어지는 컷<br>· <b>사람은 가만히 있고 배경만 움직이는 컷</b> (나무·물·바람·안개)'],
          ['<b>보통</b> △', '· 두 사람이 대화하는 장면<br>· 걸어가는 장면 (2~3초가 지나면 자세가 무너지는 일이 잦음)<br>· 카메라가 인물 주위를 빙 돌거나 크게 들어 올려지는 복잡한 움직임'],
          ['<b>낮음</b> ✕', '· <b>네 명 이상 나오는 장면</b><br>· 여러 가지가 한꺼번에 빠르게 움직이는 장면<br>· <b>앞 컷과 정확히 이어져야 하는 장면</b> (컷 3에서 든 물건이 컷 4에서도 손에 있어야 하는 경우)'],
        ] },
        { type: 'p', text: '<b>학생 지도 시 발문</b>' },
        { type: 'list', items: [
          '"여기 <b>사람이 몇 명</b> 나와? 다섯 명이 동시에 뛰면 AI가 헷갈려. <b>두 명</b>으로 줄일 수 있을까?"',
          '"이 컷에서 <b>손에 든 물건</b>이 다음 컷에도 있어야 해? 그럼 그 물건이 안 보이게 하는 방법은 없을까?"',
          '"\'슬프다\'를 구체적으로 어떻게 보여줄 수 있을까?"',
        ] },

        { type: 'h', text: '용어 — 화면 크기 6개 + 카메라 움직임 3개, 이게 전부입니다' },
        {
          type: 'note', tone: 'info', title: '"AI한테 프롬프트 써 달라고 하면 되는데, 왜 이런 용어를 알아야 하죠?"',
          body: [
            { type: 'p', text: '맞는 말입니다. <b>요즘은 프롬프트도 AI가 잘 짜 줍니다.</b> 문제는 그다음입니다. AI가 짜 준 프롬프트를 <b>읽지 못하면, 결과가 마음에 안 들 때 무엇을 고쳐야 할지 모릅니다.</b> 그래서 "다시 해 줘"만 반복하게 됩니다. 그건 창작이 아니라 <b>뽑기(가챠)</b>입니다.' },
            { type: 'p', text: '<b>구체적인 예</b> — AI가 써 준 프롬프트에 <code>medium shot</code>이 들어 있는데 결과물이 너무 멀게 나왔습니다. <b>단어를 아는 사람</b> → <code>close-up</code>으로 바꿔 끝. 한 번에 해결. <b>모르는 사람</b> → 전체를 지우고 처음부터 다시. 또 멀게 나옴. <b>크레딧 3배 소모.</b>' },
          ],
        },
        { type: 'quote', text: '몰라도 만들 수 있습니다.<br><b>하지만 아는 만큼 보이고, 아는 만큼 기획할 수 있고, 아는 만큼 다듬을 수 있고, 아는 만큼 덜 실패합니다.</b>' },
        { type: 'table', head: ['쉬운 말', '정식 명칭 (약어)', '화면에 뭐가 보이나', '언제 쓰나'], rows: [
          ['아주 멀리', '<b>익스트림 롱샷 (ELS)</b>', '사람이 점처럼 작게. 풍경이 주인공', '규모·고립감, <b>마지막 여운</b>'],
          ['멀리', '<b>롱샷 · 와이드샷 (LS)</b>', '사람 전신 + 주변 풍경', '장소를 보여줌. 첫 컷에 좋음'],
          ['보통', '<b>미디엄샷 (MS)</b>', '허리 위로 사람이 보임', '<b>가장 무난한 기본값.</b> 대화·행동'],
          ['가슴 위', '<b>바스트샷 (MCU)</b>', '가슴부터 머리까지', '표정과 손짓을 동시에'],
          ['얼굴', '<b>클로즈업 (CU)</b>', '얼굴이 화면을 거의 채움', '감정을 보여줄 때'],
          ['아주 가까이', '<b>익스트림 클로즈업 (ECU)</b>', '눈·입·손 등 일부분만', '디테일 강조, <b>훅(첫 3초)</b>'],
        ] },
        { type: 'table', head: ['카메라 움직임', '무슨 뜻', '언제 쓰나'], rows: [
          ['<b>고정 (픽스)</b>', '카메라를 삼각대에 두고 안 움직임', '<b>AI 실패율이 가장 낮음.</b> 확신 없으면 이걸로'],
          ['<b>달리 인 / 아웃</b>', '카메라가 <b>통째로</b> 앞뒤로 이동. 제자리에서 렌즈만 당기는 줌과 다름', '감정을 끌어올릴 때(인) / 마무리·여운(아웃)'],
          ['<b>팬 (pan)</b>', '카메라는 제자리, 고개만 좌우로 돌림', '넓은 공간을 훑어 보여줄 때'],
        ] },
        {
          type: 'note', tone: 'tip', title: '줌과 달리는 다릅니다',
          body: [{ type: 'p', text: '줌은 제자리에서 화면만 확대되지만, <b>달리는 카메라가 실제로 걸어 들어가서 배경까지 함께 밀려옵니다.</b> 그래서 훨씬 영화 같은 느낌이 나고, Veo도 <code>zoom in</code>보다 <code>slow dolly in</code>을 더 잘 알아듣습니다.' }],
        },

        { type: 'h3', text: '스토리보드 양식 (B형 — 5~6학년/대회용)' },
        { type: 'table', head: ['컷', '막', '시간', '화면 크기', '카메라 움직임', '인물·행동', '자막', '소리'], rows: [
          ['1', '1막(훅)', '0~3s', 'ECU (아주 가까이)', '고정', '', '', ''],
          ['2', '1막', '3~7.5s', 'LS (멀리)', '느린 달리 인', '', '', ''],
          ['3', '2막', '7.5~11s', 'MS (보통)', '고정', '', '', ''],
          ['4', '2막', '11~15s', 'CU (얼굴)', '고정', '', '', ''],
          ['5', '<b>2막(중간점)</b>', '15~19s', 'LS (멀리)', '팬', '', '', ''],
          ['6', '2막', '19~22.5s', 'MCU (가슴 위)', '고정', '', '', ''],
          ['7', '3막', '22.5~26s', 'CU (얼굴)', '느린 달리 인', '', '', ''],
          ['8', '3막', '26~30s', 'ELS (아주 멀리)', '고정', '', '', ''],
        ] },
        {
          type: 'note', tone: 'tip', title: '이 양식의 핵심',
          body: [{ type: 'p', text: '막(Act) 열과 시간 열이 <b>미리 인쇄되어 있어서</b>, 학생이 3막 구조를 "채워 넣는" 방식으로 자연히 학습하게 됩니다. 표에 미리 채워 둔 샷은 <b>예시</b>입니다. 다만 <b>옆 컷끼리는 반드시 다른 크기</b>로. 계속 같은 크기면 지루하고, 무엇보다 <b>AI 영상 전환이 잦을수록 티가 덜 납니다.</b>' }],
        },

        { type: 'practice', n: 1, title: '8컷 스토리보드 채우기', min: 25,
          schedule: [
            ['0~3분', '설화 3편 중 <b>1편 선택</b>'],
            ['3~8분', '<b>로그라인</b> 한 문장 작성'],
            ['8~15분', '3막에 맞춰 <b>8컷 배분</b>'],
            ['15~25분', '각 컷의 <b>화면 크기 · 인물 · 행동 · 자막</b>을 표에 채우기'],
          ],
          checkId: 'd2-prac1',
          check: [
            '설화 1편 선택 완료',
            '로그라인 1문장 (결말 누설 없음 · 이름 없음)',
            '8컷 배분 — 훅 / 1막 / 중간점 / 3막이 표시됨',
            '<b>옆 컷끼리 화면 크기가 다름</b>',
            '"낮음" 유형(4명 이상·연속성 필수 컷)이 <b>없음</b>',
          ],
          upload: { day: 2, section: 'storyboard' },
        },

        { type: 'h', text: '1-6. 설화 재해석 — 어디까지 바꿔도 되나' },
        { type: 'p', text: '대회 초등부 평가 항목 1번이 <b>"설화를 적절하게 이해하고 재해석하였는가"</b>입니다.' },
        {
          type: 'note', tone: 'ok', title: '학술적 기준 한 줄 — 「보편 가치는 계승, 전형성은 탈피」',
          body: [{ type: 'p', text: '(이채영, 「설화의 현대적 계승 및 변주 양상과 의미 고찰」, 『동학학보』 66호, 2023)' }],
        },
        { type: 'table', head: ['지켜야 할 것', '점검 질문', '춘천 적용 예'], rows: [
          ['<b>핵심 화소</b>', '이 설화를 이 설화이게 만드는 최소 사건 1~2개가 남아 있는가?', '상사뱀: "회전문 앞 벼락"<br>부래산: "떠내려온 산 + 자리세"<br>공지어: "지푸라기가 물고기가 됨"'],
          ['<b>지역성·고유명</b>', '지명·인명·유래 설명 기능이 살아 있는가?', '청평사·회전문·공주탑<br>고산·의암호 / 공지천·공지어'],
          ['<b>보편 가치</b>', '원전의 주제 의식(효, 공존, 인과, 금기 위반의 대가)을 계승하고 있는가?', '—'],
        ] },
        { type: 'p', text: '<b>바꿔도 되는 5 (재해석의 자유 영역)</b>' },
        { type: 'olist', items: [
          '<b>화자·시점</b> — 악역 시점, 사물 시점 → "나는 결국 뱀이 되었다" / "나는 금강산에서 왔다"(산 시점)',
          '<b>시대·장소</b> — 현대 도시, 미래, 학교 → 부래산을 현대의 부당 요금 청구로',
          '<b>장르·톤</b> — 호러 → 코미디, 신화 → SF → 부래산을 법정 코미디로',
          '<b>결말 이후 / 공백</b> — 후일담 → "뱀이 죽은 그 다음, 공주는 왜 공주탑을 세웠나"',
          '<b>매체·형식</b> — 웹툰, 숏폼, 뮤직비디오',
        ] },
        {
          type: 'note', tone: 'danger', title: '안전장치 2가지 (반드시 지도)',
          body: [
            { type: 'olist', items: [
              '<b>변형 사실 명시</b> — 엔딩 크레딧에 「이 영상은 춘천 지역의 「○○」 설화를 재해석한 창작물입니다. 원전 출처: ___」 표기. 2022 개정 국어과가 명시한 \'매체 활용 윤리\'와 직결됩니다.',
              '<b>폭력·잔혹 요소 처리</b> — 원전의 잔혹 요소를 학년 수준에 맞게 완화하되, <b>"왜 그런 결말이었는가"(인과·교훈)는 삭제하지 않습니다.</b> 결말의 논리까지 지우면 그것이 곧 원형 훼손입니다.',
            ] },
            { type: 'p', text: '<b>초등 사용 금지 권고 설화</b>: 「부모 위해 송장을 삶은 효자(반희언)」 — 잔혹 / 「호인이 오면 흔들리는 고개(무작개)」 — 특정 민족 비하 소지' },
          ],
        },
      ],
    },

    /* ───────────────────────── 2교시 ───────────────────────── */
    {
      id: 'd2-p2',
      period: '2교시',
      min: 90,
      title: '이미지 — 8컷 키프레임 만들기',
      summary: '스타일 고정 · 캐릭터 일관성 5원칙 · 삽화 스타일 10종',
      blocks: [
        {
          type: 'note', tone: 'ok', title: 'Flow 안에서 Nano Banana 2 이미지 생성은 크레딧 0원입니다',
          body: [{ type: 'p', text: '이미지는 얼마든지 다시 뽑아도 됩니다. 크레딧이 나가는 것은 영상(3교시)뿐입니다.' }],
        },

        { type: 'h', text: '2-1. 오늘 쓸 모델 — 무엇을 고를 것인가 (10분)' },
        { type: 'image', src: 'assets/nb-01-model-select.jpg', caption: '구글 AI 스튜디오의 이미지 생성 모델 선택 화면' },
        { type: 'p', text: '"나노바나나"는 하나의 모델이 아니라 <b>4개 모델의 통칭</b>입니다.' },
        { type: 'table', head: ['참조 이미지 종류', '나노바나나 2 Lite', '나노바나나 2 <i>(Gemini 앱 기본)</i>', '나노바나나 Pro'], rows: [
          ['고충실도 사물', '최대 14장', '최대 10장', '최대 6장'],
          ['<b>캐릭터</b> (일관성 유지용)', '✕ 없음', '최대 4장', '최대 5장'],
          ['<b>스타일 레퍼런스</b>', '✕ 없음', '✕ <b>없음</b>', '최대 3장'],
        ] },
        { type: 'image', src: 'assets/image-1.jpg', caption: '모델별 참조 이미지 슬롯 비교' },
        { type: 'image', src: 'assets/image-2.jpg', caption: '참조 이미지 유형 안내' },
        { type: 'p', text: '출처: <a href="https://ai.google.dev/gemini-api/docs/image-generation" target="_blank" rel="noopener">Gemini API 공식 문서 — Use up to 14 reference images</a>' },
        {
          type: 'note', tone: 'warn', title: '오개념 바로잡기 — "한글보다 영어가 낫다"',
          body: [
            { type: 'p', text: '2026년 기준으로 이 통설은 <b>근거가 약해졌습니다.</b> 구 나노바나나의 최적 언어 목록(EN/es-MX/ja/zh/hi)에는 한국어가 없었지만, <b>나노바나나 Pro부터 ko-KR이 공식 최적 언어 목록에 포함</b>되었습니다.' },
            { type: 'p', text: '<b>실전 규칙</b>: 한국어로 편하게 쓰되, ① <b>스타일·조명·렌즈 등 기술 용어는 영어</b>로 ② <b>이미지 안에 넣을 한글 텍스트는 반드시 한국어</b>로. 잘 안 나오면 그때 영어로 바꿔 재시도.' },
          ],
        },

        { type: 'h', text: '2-2. 스타일 고정 — 오늘 만들 가장 중요한 파일 (15분)' },
        {
          type: 'note', tone: 'ok', title: 'Google 공식 프롬프트 5요소 중 실전 규칙 한 줄',
          body: [
            { type: 'p', text: '<b>"Style + Subject는 복사·붙여넣기. Setting + Action + Composition만 갈아끼운다."</b>' },
            { type: 'p', text: '이것이 스토리보드 일관성의 전부입니다. Google DeepMind 공식 가이드는 프롬프트를 5개 축으로 나눕니다 — <b>Style / Subject / Setting / Action / Composition</b>. 일관성 작업에서는 앞의 두 개를 고정하고 뒤의 세 개만 바꿉니다.' },
          ],
        },
        { type: 'code', lang: 'text', label: '★ 스타일 블록 템플릿 (메모장에 저장하고 매 컷 복사)', text: '--- STYLE LOCK (do not change across scenes) ---\nMedium: 2D hand-painted Korean folktale picture-book illustration.\nLine: bold, clean, uniform-weight dark brown outlines.\nShading: soft two-tone cel shading, no gradients, no airbrush.\nColor palette: warm ochre, deep pine green, muted brick red,\n  cream paper white, charcoal for shadows. Maximum 6 colors.\n  Slightly desaturated.\nLighting: soft directional light from the upper LEFT,\n  gentle warm rim light, no harsh shadows.\nTexture: subtle hanji paper grain overlay across the whole image.\nCamera feel: flat, slightly storybook perspective, no lens distortion.\nFraming: 16:9, generous negative space at the top for caption text.\nNo on-screen text, no watermark, no signature.\n--- END STYLE LOCK ---' },
        { type: 'code', label: '스타일 블록 — 한국어 대응', text: '--- 스타일 고정 (장면이 바뀌어도 변경 금지) ---\n매체: 2D 손그림 한국 설화 그림책 일러스트\n선: 굵고 깔끔한, 균일한 두께의 짙은 갈색 외곽선\n음영: 부드러운 2단계 셀 셰이딩, 그라데이션 없음\n색 팔레트: 따뜻한 황토색, 짙은 소나무 초록, 차분한 벽돌 빨강,\n  크림색 종이 흰색, 그림자는 목탄색. 최대 6색. 약간 채도를 낮춤\n조명: 좌측 상단에서 오는 부드러운 방향광, 강한 그림자 없음\n질감: 이미지 전체에 은은한 한지 결 오버레이\n프레이밍: 16:9, 상단에 자막용 여백을 넉넉히\n화면 안에 글자 없음, 워터마크 없음\n--- 스타일 고정 끝 ---' },

        { type: 'h3', text: '삽화 스타일 10종 — 예시 이미지 + 그대로 쓰는 프롬프트' },
        {
          type: 'note', tone: 'info', title: '사용법',
          body: [
            { type: 'p', text: '프롬프트의 <code>[배경]</code> · <code>[주인공]</code> · <code>[행동]</code> 세 칸만 바꿔 넣으면 바로 씁니다.' },
            { type: 'p', text: '마지막 문장 <b>"글자, 말풍선, 로고는 넣지 마"</b>가 핵심입니다. 그림 위에 글자가 박히는 것을 막아 <b>자막을 편집기에서 얹을 자리</b>를 확보합니다.' },
            { type: 'p', text: '<b>설화 영상에 특히 잘 맞는 것</b> —9 한지 수묵담채 ·6 종이 콜라주 ·4 과슈 ·10 시네마틱<br><b>영상으로 넘길 때 유리한 것</b> — 2 플랫 벡터 · 3 셀 애니메이션 <i>(형태가 단순해 컷마다 캐릭터가 덜 흔들립니다)</i>' },
          ],
        },
        { type: 'styles', ref: 'STYLES' },
        {
          type: 'note', tone: 'danger', title: '금지 사항',
          body: [{ type: 'p', text: '특정 만화가·일러스트레이터·스튜디오 <b>실명</b>을 스타일 지시로 쓰지 마세요 ("○○ 작가 스타일로", "○○풍으로"). 저작권·퍼블리시티 문제이며, 학생 지도 시 반드시 막아야 할 항목입니다. <b>위 템플릿처럼 "특징을 서술"하는 방식</b>으로 대체합니다.' }],
        },
        { type: 'h3', text: 'Google 공식 4대 프롬프트 원칙' },
        { type: 'olist', items: [
          '<b>Be specific</b> — 주체·조명·구도에 구체적 디테일을 제공하라',
          '<b>Use positive framing</b> — 원하지 않는 것이 아니라 <b>원하는 것</b>을 서술하라 (✕ "차 없음" → ○ "텅 빈 거리")',
          '<b>Control the camera</b> — "low angle", "aerial view" 같은 사진·영화 용어를 쓰라',
          '<b>Iterate</b> — 후속 프롬프트로 대화하듯 다듬어라',
        ] },
        { type: 'p', text: '추가 공식 원칙: <b>강한 동사로 시작하라</b> — <code>create an image of</code> / <code>generate an image of</code>로 시작하지 않으면 모델이 텍스트로 답할 수 있습니다. <b>재질은 이름으로</b> — "정장 재킷"이 아니라 <b>"네이비 트위드"</b>.' },

        { type: 'practice', n: 2, title: '스타일 블록 만들고 컷 1 생성하기', min: 15,
          schedule: [
            ['0~5분', '위 템플릿 중 하나를 메모장에 붙여넣고, 내 설화에 맞게 <b>색 팔레트 2~3개만</b> 수정'],
            ['5~10분', 'Gemini에서 <b>새 대화</b>를 열고, 스타일 블록 + 컷 1 내용을 함께 입력'],
            ['10~15분', '결과가 마음에 들 때까지 <b>같은 대화 안에서</b> 이어서 수정'],
          ],
          checkId: 'd2-prac2',
          check: ['스타일 블록 파일 저장 완료', '컷 1 이미지 확정', '<b>새 대화를 열지 않고</b> 같은 대화에서 수정했다'],
          upload: { day: 2, section: 'keyframe' },
        },
        { type: 'code', lang: 'text', label: '컷 1 프롬프트 조립 예시 (부래산)', text: 'Create an image.\n\n--- STYLE LOCK ---\n(여기에 내 스타일 블록 전체를 붙여넣기)\n--- END STYLE LOCK ---\n\nScene: A massive rocky mountain floating down a swollen, muddy river\nduring a monsoon flood. The mountain is tilted, dragging a wake of\ndebris behind it. Distant villagers watch from the riverbank, tiny\nagainst the scale of the mountain.\nComposition: extreme long shot, low camera near the water surface,\nthe mountain filling the right two-thirds of the frame. 16:9.' },
        {
          type: 'note', tone: 'danger', title: '한 대화 안에서 끝까지 갑니다',
          body: [{ type: 'p', text: 'Gemini API 공식 문서 원문: <i>"Multi-turn conversation is the recommended way to iterate on images."</i> <b>새 대화를 열 때마다 일관성이 리셋됩니다.</b>' }],
        },

        { type: 'h', text: '2-3. 캐릭터 일관성 5원칙 (20분)' },
        { type: 'h3', text: '원칙 1. 이름을 붙인다 — Google이 명시한 유일한 공식 기법' },
        { type: 'quote', text: '"Upload clear reference images, and assign a distinct name to each character or object in your prompt. That way, the model can follow along and maintain their look as you build out your scenes."', cite: 'Google DeepMind 공식 프롬프트 가이드' },
        { type: 'p', text: '<b>왜 이름이 중요한가</b>: 이름이 없으면 프롬프트가 길어질수록 "그 여자아이"가 어느 참조 이미지를 가리키는지 모델이 헷갈립니다. <b>고유명사가 있어야 참조 이미지와 설명이 서로 이어집니다.</b>' },
        { type: 'code', lang: 'text', label: '복사용 라벨링 프롬프트', text: '[Image 1] is DEOKSOE. [Image 2] is the TAX OFFICER. [Image 3] is the STYLE REFERENCE.\n\nCharacter lock:\n- DEOKSOE: a 7-year-old Korean boy, round face, short black bowl-cut hair,\n  a small scar above his left eyebrow, wearing a faded indigo jeogori\n  and white baji, straw sandals. His expression is defiant and bright.\n- TAX OFFICER: a stout man in his 50s, thin mustache, black gat hat,\n  dark green official robe with a wide belt, carrying a leather ledger.\n\nScene: DEOKSOE stands facing the TAX OFFICER in a village courtyard,\npointing toward the distant mountain in the river.\nMedium shot, low angle from DEOKSOE\'s height.\nKeep DEOKSOE\'s and the TAX OFFICER\'s appearance exactly as in the\nreference images — same face, same hair, same outfit, same colors.\nDo not change their design.' },
        { type: 'h3', text: '원칙 2. 캐릭터 서술 블록을 한 글자도 안 바꾸고 복사한다' },
        {
          type: 'note', tone: 'danger', title: '의역 금지. 요약 금지. Ctrl+C / Ctrl+V만',
          body: [{ type: 'p', text: '"빨간 저고리를 입은 소녀" → 다음 컷에서 "붉은 옷의 아이"로 쓰면 <b>다른 사람이 나옵니다.</b>' }],
        },
        { type: 'h3', text: '원칙 3. 캐릭터 시트를 먼저 만든다' },
        { type: 'p', text: '참조 이미지 슬롯이 4~5개뿐이므로, <b>여러 각도를 한 장에 압축</b>하면 슬롯 1개로 정면·측면·후면 정보를 모두 전달할 수 있습니다.' },
        { type: 'code', lang: 'text', label: '캐릭터 시트 생성 프롬프트 (실습용 완성본)', text: 'Create a single character reference sheet on a plain light-grey background.\n\nSubject: DEOKSOE, a 7-year-old Korean boy from an old folktale.\nRound face, warm dark brown eyes, short black bowl-cut hair,\na small scar above his left eyebrow. He wears a faded indigo jeogori\n(Korean jacket) with white cuffs, loose white baji (trousers) tied at\nthe ankles, and straw sandals. A small cloth pouch hangs at his waist.\n\nLayout: 5 views arranged in one row, evenly spaced, full body,\nsame scale, same lighting, same distance from camera:\n(1) front view, neutral standing pose\n(2) 3/4 view, neutral standing pose\n(3) side profile, neutral standing pose\n(4) back view\n(5) front view close-up of the head only, neutral expression\n\nStyle: clean 2D Korean folktale picture-book illustration,\nsoft cel shading, bold clean outlines, flat warm color palette,\nno gradients, no texture noise.\nNo text, no labels, no watermark. Plain background. 16:9.' },
        { type: 'p', text: '△ "캐릭터 시트를 쓰면 일관성이 몇 % 올라간다" 류의 수치는 <b>어떤 공식 문서에도 없습니다.</b> 강의에서 수치를 말하지 마세요.' },

        { type: 'h3', text: '원칙 3-B. 기준 이미지 만들기 — 후보 그리드로 좁혀가기' },
        {
          type: 'note', tone: 'ok', title: '5뷰 캐릭터 시트가 버거우면 이 방법을 쓰세요',
          body: [{ type: 'p', text: '실제 동화책 제작 현장에서 검증된 절차이고, <b>초보자에게는 이쪽이 훨씬 쉽습니다.</b>' }],
        },
        { type: 'table', head: ['기준 이미지', '무엇을 통일하나', '오늘 만든 것'], rows: [
          ['<b>스타일 기준 이미지</b>', '그림체 — 색감·선·질감·조명', '2-2에서 만든 컷 1'],
          ['<b>캐릭터 기준 이미지</b>', '캐릭터 외형 — 얼굴·체형·의상', '지금 만듭니다'],
        ] },
        { type: 'table', head: ['기준 이미지 4조건', '왜 필요한가'], rows: [
          ['<b>전신</b> (머리부터 발끝까지)', '이후 다양한 포즈·장면에서 전체 비율을 참조할 수 있음'],
          ['<b>정면 응시, 중립적인 서 있는 포즈</b>', 'AI가 기본 외형을 가장 명확하게 파악함'],
          ['<b>흰색 또는 단색 배경</b>', '실루엣이 명확해야 이후 장면에서 정확히 인식됨'],
          ['<b>중립적인 표정</b>', '이후 장면에서 다양한 감정으로 변형하기 쉬움'],
        ] },
        { type: 'h3', text: '경로 ① 이미 그려진 인물을 기준 이미지로 바꾸기' },
        { type: 'image', src: 'assets/char-01-convert.jpg', caption: '장면 이미지 → 기준 이미지로 변환한 결과' },
        { type: 'code', label: '경로 ① 프롬프트', text: '[주인공이 그려진 이미지 첨부]\n\n이 그림체를 유지하면서, 첨부한 이미지 속 [덕쇠]의 모습을\n기준 이미지 형태로 다시 그려줘.\n전신이 다 보이게, 정면을 보고 선 중립 포즈로, 흰 배경에 중립 표정으로.' },
        { type: 'h3', text: '경로 ② 새 인물 — 후보 6개를 한 번에 뽑아 고르기' },
        { type: 'p', text: '조연처럼 <b>아직 그려진 적 없는 인물</b>은 이 방법이 가장 빠릅니다. <b>탐색 → 선택 → 확정</b> 순서입니다.' },
        { type: 'image', src: 'assets/char-04-grid.jpg', caption: '1단계 — 번호가 붙은 후보 6개 그리드' },
        { type: 'code', label: '1단계 — 후보 6개를 2×3 그리드로', text: '첨부한 스타일 기준 이미지의 그림체로,\n[인물 이름] 캐릭터 기준 이미지를 만들어줘.\n서로 확연히 다른 후보 6개로, 2x3 그리드로 보여줘.\n전신이 다 보이게, 정면을 보고 선 중립 포즈로, 흰 배경에 중립 표정으로.\n각 칸 위쪽 모서리에 1~6 번호를 작게 붙여줘. 번호는 캐릭터 몸에 겹치지 않게.' },
        { type: 'image', src: 'assets/char-07-narrow.jpg', caption: '2단계 — 고른 후보를 기준으로 세부만 다른 변형 3개' },
        { type: 'code', label: '2단계 — 하나 고른 다음 더 좁히기', text: '[인물 이름] 후보 중 3번이 마음에 들어.\n3번을 기준으로, 같은 캐릭터를 유지하면서 세부만 조금씩 다른 후보 3개를 만들어줘.\n(얼굴·체형·의상은 그대로, 디테일만 변형)' },
        { type: 'image', src: 'assets/char-10-final.jpg', caption: '3단계 — 확정된 캐릭터 기준 이미지' },
        { type: 'code', label: '3단계 — 번호·라벨 없는 단일 고화질로 확정', text: '[고른 칸을 잘라 첨부]\n이 캐릭터를 번호·라벨 없이 단일 고화질 이미지로 다시 그려줘.\n전신, 정면, 중립 포즈, 흰 배경, 중립 표정.' },
        {
          type: 'note', tone: 'info', title: '설화 적용',
          body: [{ type: 'p', text: '「부래산」이라면 <b>일곱 살 아이 · 관리 · 수령</b> 세 장, 「공주와 상사뱀」이라면 <b>공주 · 총각(=뱀)</b> 두 장이면 됩니다. 뱀처럼 사람이 아닌 존재도 같은 방식으로 만듭니다 — "전신이 다 보이게, 흰 배경에, 중립적인 자세로."' }],
        },
        { type: 'h3', text: '원칙 4. 한 대화 안에서 멀티턴으로 진행한다' },
        { type: 'list', items: [
          '같은 대화 안에서 이어서 생성',
          '새 장면마다 <b>원본 캐릭터 시트를 다시 첨부</b>',
          '드리프트가 심해지면 → 캐릭터 시트를 다시 붙이고 "<b>이 인물의 얼굴을 정확히 이대로 유지하라</b>" 명시',
        ] },
        { type: 'h3', text: '원칙 5. 부분 수정 시 "나머지는 그대로"를 반드시 붙인다' },
        { type: 'code', lang: 'text', label: 'Google 공식 인페인팅 템플릿', text: 'Using the provided image, change only the [특정 요소] to [새 요소].\nKeep everything else in the image exactly the same, preserving the\noriginal style, lighting, and composition.' },
        { type: 'code', label: '한국어 대응', text: '제공된 이미지에서 [특정 요소]만 [새 요소]로 바꿔라.\n이미지의 나머지 모든 것은 정확히 그대로 유지하고,\n원본의 스타일·조명·구도를 보존하라.' },

        { type: 'h3', text: '실패 증상별 처방전' },
        { type: 'table', head: ['증상', '원인', '처방'], rows: [
          ['장면이 넘어갈수록 얼굴이 조금씩 달라진다', '매 턴 새로 생성되며 오차 누적', '같은 대화 안에서 멀티턴 + 캐릭터 시트 재첨부'],
          ['캐릭터가 아예 다른 사람이 됐다', '참조 이미지와 텍스트가 연결 안 됨', '<b>고유 이름 부여.</b> "그 아이"라고 쓰지 말 것'],
          ['옷·소품이 계속 바뀐다', '서술이 장면마다 미묘하게 달라짐', '캐릭터 블록을 <b>한 글자도 안 바꾸고</b> 복붙'],
          ['5명 넘는 인물이 뒤섞인다', '슬롯 한도 초과', '캐릭터 4~5명 이하. 그 이상은 장면을 쪼갠다'],
          ['편집했더니 배경까지 바뀐다', '유지 대상 미명시', '"Keep everything else exactly the same" 항상 붙이기'],
          ['이미지가 아니라 텍스트 답변이 온다', '프롬프트가 모호함', '<code>create an image of</code>로 <b>시작</b>'],
          ['요청한 개수만큼 안 나온다', '모델 특성 (공식 명시)', '한 번에 여러 장 요구하지 말고 <b>한 장씩</b>'],
          ['스타일 참조 이미지가 무시된다', '<b>나노바나나 2/Lite에 스타일 슬롯이 없음</b>', 'Pro로 전환하거나 <b>텍스트 스타일 블록</b>으로 대체'],
        ] },

        { type: 'practice', n: 3, title: '캐릭터 시트 만들기', min: 15,
          schedule: [
            ['0~5분', '주인공 1명을 정하고 캐릭터 카드를 손으로 채운다'],
            ['5~12분', '캐릭터 시트 프롬프트의 Subject 부분을 내 캐릭터로 교체해 생성'],
            ['12~15분', '마음에 드는 시트가 나오면 <b>다운로드해서 따로 보관</b>'],
          ],
          checkId: 'd2-prac3',
          check: ['캐릭터 카드 손으로 작성', '캐릭터 기준 이미지 확정 (전신·정면·흰배경·중립표정)', '<code>캐릭터기준_○○</code> 이름으로 저장'],
          upload: { day: 2, section: 'character' },
        },
        { type: 'code', label: '캐릭터 카드 (손으로 채우기)', text: '[캐릭터 이름] _______________________\n얼굴에서 제일 눈에 띄는 것 3가지 :\n   1. __________  2. __________  3. __________\n옷 (색깔까지) : _____________________\n항상 갖고 다니는 물건 : _____________\n말투 한 마디 : "___________________"' },
        {
          type: 'note', tone: 'tip', title: '초등 지도 발문',
          body: [{ type: 'p', text: '"네 주인공을 <b>한 번도 안 본 사람에게 말로만 설명</b>해서 똑같이 그리게 하려면 뭐라고 해야 할까? <b>세 가지만.</b>" 현재 모델은 <b>겉모습 특징 3~5개</b>까지는 안정적으로 지켜 줍니다. 시트 전체를 통째로 붙여넣지 말고, 매 샷마다 <b>가장 식별력 높은 2~3개 특징</b>만 압축해 넣으세요.' }],
        },

        { type: 'h', text: '2-4. 다중 이미지 참조 — 라벨링 (10분)' },
        { type: 'code', lang: 'text', label: '패턴 A — 역할 라벨 (가장 안전)', text: 'The first image is the CHARACTER REFERENCE.\nThe second image is the STYLE REFERENCE.\nThe third image is the LOCATION REFERENCE (Cheongpyeongsa temple gate).\n\nGenerate a new image where the character from the CHARACTER REFERENCE\nstands before the gate from the LOCATION REFERENCE, rendered entirely\nin the visual style of the STYLE REFERENCE.' },
        { type: 'code', lang: 'text', label: '패턴 B — 고유명사 라벨 (스토리보드에 최적)', text: '[Image 1] = GONGJU (the princess, character)\n[Image 2] = the SNAKE (character)\n[Image 3] = the temple gate at Cheongpyeongsa (location)\n[Image 4] = STYLE REFERENCE\n\nScene 5: GONGJU stands at the temple gate at dusk.\nThe SNAKE slowly uncoils from her body and lowers itself to the ground.\nKeep GONGJU and the SNAKE exactly as in their reference images.\nMatch the STYLE REFERENCE exactly.\nMedium close-up, eye level, 16:9.' },
        { type: 'p', text: '<b>배분 전략 — "많이 넣을수록 좋다"는 착각</b>' },
        { type: 'list', items: [
          '<b>1인 스토리보드 8컷</b> — 캐릭터 1~2장(정면 시트 + 표정 시트) + 스타일 1장 + 소품 0~2장 = <b>총 3~5장</b>',
          '<b>2인 대화 장면</b> — 캐릭터 2장 + 스타일 1장 = <b>총 3장</b>',
          '<b>지역 배경 시리즈</b> — 스타일 1장 + 실제 장소 사진 2~3장 = <b>총 3~4장</b>',
        ] },
        { type: 'p', text: '<b>핵심 원칙 3가지</b>: ① 꼭 지켜야 할 것만 넣는다 — 캐릭터 얼굴 + 스타일. 나머지는 텍스트로 ② 참조를 늘리기 전에 텍스트 서술을 먼저 정밀하게 만든다 ③ 얼굴이 뭉개지면 → 참조 이미지에서 <b>얼굴이 화면 중앙에 크게, 정면을 향하고, 가려지지 않은</b> 것으로 교체.' },
        { type: 'p', text: '△ <b>오디오·영상은 참조로 넣을 수 없습니다.</b> 공식 제한: <i>"Image generation doesn\'t support audio or video inputs."</i>' },
        {
          type: 'note', tone: 'ok', title: '활용 아이디어 — 진짜 춘천 사진 넣기',
          body: [{ type: 'p', text: '청평사 회전문, 공지천, 고산의 <b>실제 사진을 참조 이미지(고충실도 사물 슬롯)로 넣으면</b> 결과물의 지역성이 확 올라갑니다. 대회 평가 항목의 "지역성·고유명"에 직결됩니다. 단, <b>사진에 사람 얼굴이 나오지 않게</b> 하세요 (초상권).' }],
        },

        { type: 'h', text: '2-5. 8컷 키프레임 워크플로우 (5분 설명)' },
        { type: 'code', label: 'STEP 0~6', text: 'STEP 0  준비      스타일 블록·캐릭터 시트를 메모장에 저장, 새 대화 열기\nSTEP 1  스타일     컷 1을 생성하며 스타일을 확정 (여기서 마음에 들 때까지)\nSTEP 2  캐릭터     캐릭터 시트 생성 → 다운로드 보관\nSTEP 3  컷 1      스타일 블록 + 캐릭터 블록 + 컷1 서술 → 생성\nSTEP 4  컷 2~8    같은 대화에서, Setting/Action/Composition만 교체하며 반복\nSTEP 5  드리프트   흐트러지면 캐릭터 시트 재첨부 + "정확히 이대로 유지"\nSTEP 6  화면비     8컷 전부 16:9로 통일되었는지 확인 → 전부 다운로드' },
        { type: 'p', text: '<b>흔한 스토리보드 실수 5가지</b>' },
        { type: 'olist', items: [
          '<b>화면비가 컷마다 다르다</b> → 편집에서 검은 여백이 생깁니다. 매 프롬프트에 <code>16:9</code>를 명시하세요.',
          '<b>새 대화를 열어 버린다</b> → 일관성 리셋. 한 대화에서 끝까지.',
          '<b>한 번에 8장을 요구한다</b> → 공식 제한상 요청 개수대로 안 나옵니다. 한 장씩.',
          '<b>컷마다 스타일 문구를 조금씩 고친다</b> → 드리프트의 주범.',
          '<b>Lite 모델로 작업한다</b> → 캐릭터 슬롯이 아예 없습니다.',
        ] },
        {
          type: 'note', tone: 'ok', title: '이미지 → 영상으로 넘어가기 전 체크',
          body: [{ type: 'p', text: 'Google Cloud 공식 가이드: <i>"나노바나나로 키프레임을 만들고, 그 사이를 Veo로 생성하라."</i> 지금 만든 8장이 <b>영상의 첫 프레임</b>이 됩니다.' }],
        },
        { type: 'check', id: 'd2-keyframe-check', title: '3교시로 넘어가기 전 체크', items: [
          '8장 전부 <b>16:9</b> 통일',
          '인물의 <b>얼굴이 화면에서 충분히 크게</b> 잡혀 있다 (작으면 영상에서 뭉개집니다)',
          '<b>손이 애매하게 걸쳐 있지 않다</b> (크게 나오거나 아예 안 보이거나)',
          '배경이 지나치게 복잡하지 않다',
          '화면 안에 <b>깨진 글자가 없다</b> (있으면 재생성 — 한글은 특히 취약)',
          '전부 다운로드해서 <code>C:\\AI</code> 같은 <b>영문 폴더</b>에 <code>cut01.png</code> ~ <code>cut08.png</code>로 저장',
        ] },

        { type: 'practice', n: 4, title: '8컷 키프레임 완성', min: 30,
          mission: '스토리보드의 컷 1~8을 순서대로 생성합니다. <b>컷 하나에 3~4분</b>이 목표입니다.',
          checkId: 'd2-prac4',
          check: ['컷 1~8 생성 완료 (또는 최소 컷 1·5·8)', '전부 16:9', '<code>cut01.png</code>~<code>cut08.png</code> 영문 폴더 저장'],
          upload: { day: 2, section: 'keyframe' },
        },
        { type: 'code', lang: 'text', label: '컷마다 이 형식으로 조립', text: '--- STYLE LOCK ---\n(고정 — 한 글자도 바꾸지 않음)\n--- END STYLE LOCK ---\n\n--- CHARACTER ---\n(고정 — 한 글자도 바꾸지 않음)\n--- END CHARACTER ---\n\nSHOT 5 / [샷 사이즈], [카메라 앵글].\n[장소·시간·날씨]. [인물이 하는 단순 동작 1개].\n16:9.' },
        {
          type: 'note', tone: 'warn', title: '시간이 부족하면',
          body: [{ type: 'p', text: '8컷을 다 못 만들어도 괜찮습니다. <b>컷 1(훅), 컷 5(중간점), 컷 8(마지막 이미지)</b> 세 장만 있으면 3교시를 시작할 수 있습니다. 나머지는 3교시 중 병렬로 채우세요.' }],
        },
      ],
    },

    /* ───────────────────────── 3교시 ───────────────────────── */
    {
      id: 'd2-p3',
      period: '3교시',
      min: 90,
      star: true,
      title: '영상 — 이미지를 움직이게 하기',
      summary: 'Flow 지형도 · 크레딧 · 이미지→영상 4대 원칙 · 컷 잇는 5가지 무기',
      blocks: [
        { type: 'h', text: '3-1. Google Flow 지형도 (15분)' },
        { type: 'p', text: '접속: <a href="https://labs.google/flow" target="_blank" rel="noopener">labs.google/flow</a>' },
        { type: 'table', head: ['기능', '무엇을 하나', '오늘의 용도'], rows: [
          ['<b>Frames to Video</b>', '시작 프레임(또는 시작+끝 프레임)을 지정해 영상 생성', '<b>오늘의 주력.</b> 2교시 키프레임 8장을 클립으로'],
          ['<b>Ingredients to Video</b>', '인물·사물·장소 참조 이미지를 넣고 새 장면 생성', '키프레임 없는 컷을 추가로 만들 때'],
          ['<b>Extend</b>', '직전 클립의 <b>마지막 1초</b>를 근거로 이어서 생성', '같은 컷을 더 길게. <b>컷 전환용이 아님</b>'],
          ['<b>Scenebuilder</b>', '클립을 배열·재배치·앞뒤 트리밍·미리보기', '러프컷 확인만. <b>최종 편집은 CapCut에서</b>'],
        ] },
        {
          type: 'note', tone: 'danger', title: 'Scenebuilder에는 트랜지션·오디오·자막·색보정이 없습니다',
          body: [
            { type: 'p', text: '공식 기능 목록은 배열/재배치/앞뒤 트리밍/미리보기/다운로드 5개뿐입니다. → <b>Flow에서 완성하려 하지 마세요.</b> Flow는 소재를 만드는 곳, CapCut은 조립하는 곳입니다.' },
            { type: 'p', text: '<b>★ Extend의 공식 제약 (2026-07 확인)</b> — ① <b>8초 영상만</b> 확장 가능 ② <b>Veo 3.1 Lite로만</b> 확장 가능 ③ Veo로 생성한 영상만 가능 ④ 확장한 클립에는 insert/remove/camera 편집 적용 불가' },
            { type: 'p', text: '<b>Ingredients to Video 제약</b>: Veo 3.1 Lite·Fast는 <b>8초 전용</b>, <b>Quality는 미지원</b>.' },
          ],
        },
        { type: 'p', text: '△ 인터넷에 돌아다니는 <b>"Jump To"</b> 기능은 2025년 Veo 2 시절 블로그에만 나오고 <b>현재 공식 도움말 어디에도 없습니다.</b>' },

        { type: 'h3', text: '★ 크레딧 — 연수 설계의 핵심 (공식 표)' },
        { type: 'table', head: ['모델', '생성 유형', '필요 크레딧'], rows: [
          ['<b>Veo 3.1 Lite</b>', '4/6/8초 영상, Extend', '<b>10</b> (Ultra 5)'],
          ['<b>Veo 3.1 Fast</b>', '4/6/8초 영상, Extend', '<b>20</b> (Ultra 10)'],
          ['<b>Veo 3.1 Quality</b>', '8초 영상, Extend', '<b>100</b>'],
          ['Gemini Omni Flash', '4 / 6 / 8 / 10초', '15 / 20 / 25 / 30'],
          ['<b>Nano Banana 2 (이미지)</b>', '이미지 생성·편집', '<b>0 (무료)</b>'],
          ['전 모델', '1080p 업스케일', 'Pro/Ultra <b>0</b>, 그 외 사용 불가'],
        ] },
        {
          type: 'note', tone: 'danger', title: 'Google 원문에서 반드시 알아야 할 한 문장',
          body: [
            { type: 'p', text: '<i>"The credit costs below are per generation, not per request."</i> → <b>출력 개수(Number of outputs)를 2로 두면 클릭 한 번에 2배가 나갑니다.</b> 실습 시작 전 전원 <b>"출력 = 1"</b>로 통일하세요.' },
            { type: 'p', text: '<b>두 번째로 중요한 사실</b>: 영상 길이(4/6/8초)와 무관하게 Veo 3.1은 <b>같은 크레딧</b>을 씁니다. → <b>무조건 8초로 뽑으세요.</b> 4초를 쓸 이유가 없습니다.' },
          ],
        },
        { type: 'table', head: ['플랜', '크레딧', 'Veo 3.1 Lite 기준 클립 수'], rows: [
          ['무료 (구독 없음)', '<b>하루 50</b> (이월 없음)', '5개 <i>(신규 가입 보너스 100 추가 시 15개)</i>'],
          ['Google AI Plus', '월 200', '20개'],
          ['<b>Google AI Pro</b> <i>(오늘)</i>', '월 1,000', '<b>100개</b> — 여유롭습니다'],
          ['Google AI Ultra', '월 10,000~25,000', '1,000개+'],
        ] },
        { type: 'check', id: 'd2-credit', title: '크레딧 절약 체크리스트 (참가자 배포용)', items: [
          '출력 개수(Number of outputs) = <b>1</b>',
          '모델이 <b>Veo 3.1 Lite</b>인가? (Quality는 10배)',
          '길이가 <b>8초</b>인가? (4·6초와 같은 값이 나감)',
          '이미지는 <b>Nano Banana 2로 충분히</b> 만들었는가? (이미지는 공짜)',
          'Agent의 "여러 개 변형 만들어줘"를 <b>영상에는 쓰지 않았는가?</b>',
          '1080p 업스케일은 Pro 이상 <b>무료</b> — 꼭 쓸 것',
        ] },
        { type: 'p', text: '○ <b>실패한 생성은 과금되지 않습니다</b> (공식). "Audio Generation Failed" 에러도 크레딧이 환불됩니다.<br>△ Google은 "한도는 언제든 변경될 수 있다"고 명시합니다. <b>연수 당일 아침 설정에서 재확인</b>하세요.' },

        { type: 'h', text: '3-2. ★ 이미지 → 영상: 공식 4대 원칙 (20분)' },
        { type: 'h3', text: '원칙 1. 고품질 소스 이미지' },
        { type: 'quote', text: '"Think of your source image as the first frame of your film: the stronger the start, the better the finish."' },
        { type: 'list', items: [
          '선명하고 초점이 맞은 이미지',
          '구도가 안정적인 이미지',
          '인물이 <b>너무 작지 않게</b> 잡혀 있는 이미지',
          '손이 <b>화면에 크게 나오거나 아예 가려져 있는</b> 이미지 (애매하게 걸치면 왜곡)',
          '배경이 지나치게 복잡하지 않은 이미지',
        ] },
        { type: 'h3', text: '원칙 2. ★★ 움직임만 프롬프트로 쓴다 — 가장 중요' },
        {
          type: 'note', tone: 'danger', title: '초보자가 제일 많이 틀리는 대목입니다',
          body: [{ type: 'p', text: 'Google 공식 원문: <i>"Your source image already provides the subject, scene, and style. Focus your prompt on the motion you want to see. Re-describing the character, background, or lighting depicted in the image is not recommended — redundant prompts confuse the model and lead to poor results."</i>' }],
        },
        { type: 'table', head: ['✕ 나쁜 예 (중복 서술)', '○ 좋은 예 (움직임만)'], rows: [
          ['<code>A young Korean boy in indigo hanbok standing by a flooded river at dusk, warm golden light, cinematic</code><br><i>(이미지에 이미 다 있는 내용)</i>', '<code>The subject slowly raises his arm and points toward the horizon. Muddy water rushes past in the foreground. Slow dolly in.</code>'],
        ] },
        { type: 'h3', text: '원칙 3. 인물은 일반 대명사로' },
        { type: 'quote', text: '"Refer to the character with general terms like \'the subject\', \'the woman\', \'he\', \'she\', or \'they\'."' },
        { type: 'p', text: '이름이나 구체적 묘사("빨간 저고리를 입은 소년")를 <b>쓰지 않습니다.</b> 이미지에 이미 있기 때문입니다.' },
        { type: 'h3', text: '원칙 4. 움직임을 3종류로 나눠 지시' },
        { type: 'table', head: ['종류', '설명', '공식 예시', '안정성'], rows: [
          ['<b>Camera Motion</b>', '장면은 정지, 카메라만 이동', '<code>Slow dolly in on the subject.</code>', '★★★'],
          ['<b>Subject Animation</b>', '인물·사물이 움직임 (미묘한 동작에 최적)', "<code>The character's hair and clothes flutter gently in the wind.</code>", '★★'],
          ['<b>Environmental Animation</b>', '배경·대기가 살아남', '<code>Fog rolls in slowly across the landscape.</code>', '★★★'],
        ] },
        {
          type: 'note', tone: 'ok', title: '지도 원칙: "카메라 움직임 1개 + 피사체 동작 1개"까지만',
          body: [{ type: 'p', text: '셋 다 넣거나 동작을 여러 개 넣으면 실패율이 급증합니다.' }],
        },
        { type: 'code', lang: 'text', label: '복붙용 템플릿', text: '[카메라 움직임]. The subject [동작]. [환경 변화].\nAmbient noise: [배경 소리].' },
        { type: 'table', head: ['상황', '프롬프트 (그대로 복사)'], rows: [
          ['인물 컷 (가장 안전)', '<code>Slow dolly in on the subject. She blinks slowly and a faint smile forms at the corner of her mouth. Loose strands of hair move gently in the air. Ambient noise: a quiet room tone.</code>'],
          ['풍경 컷', '<code>A slow, sweeping aerial drone shot rising to reveal the full landscape. Clouds drift across the sky and grass ripples in the wind. Ambient noise: soft wind.</code>'],
          ['<b>일러스트 살리기</b>', "<code>Static shot with gentle parallax between foreground and background layers. The character's hair and clothing flutter softly. Small glowing particles drift upward through the frame. Ambient noise: a soft ambient hum.</code>"],
          ['클라이맥스 (환경)', '<code>Static wide shot. Dark storm clouds gather rapidly. A bolt of lightning strikes and heavy rain begins to fall. Water surges across the ground. SFX: a sharp thunderclap followed by pouring rain.</code>'],
          ['두 컷 연결', '<code>The camera performs a single continuous move from the first framing to the second, with no cut. The motion is smooth and unbroken throughout.</code>'],
        ] },

        {
          type: 'note', tone: 'info', title: '여기서부터는 영어로 씁니다 — 왜?',
          body: [
            { type: 'p', text: '<b>먼저 안심하시라고 드리는 말</b> — "멀리서 보이게", "얼굴을 크게", "천천히 다가가면서" 처럼 <b>쉬운 말로 써도 제미나이와 Veo는 알아듣습니다.</b> 이미 익숙한 말은 그냥 그대로 쓰세요.' },
            { type: 'p', text: '<b>① 정확도</b> — "멀리서"는 사람마다 거리가 다르지만 <code>wide shot</code>은 범위가 훨씬 좁습니다.<br><b>② 반복 재현성</b> — 일관성은 <b>같은 말을 컷마다 글자까지 똑같이 반복</b>해야 생깁니다.<br><b>③ 문제 해결</b> — 구글 공식 문서·해외 사례가 전부 이 용어로 쓰여 있어, 안 될 때 <b>찾아보기가 쉽습니다.</b>' },
            { type: 'p', text: '<b>한 줄 정리</b> — 쉬운 말로 시작하고, <b>원하는 것이 안 나올 때 전문 용어로 바꿔보세요.</b> 외울 필요 없습니다.' },
          ],
        },
        { type: 'table', head: ['쉬운 말', '스토리보드 용어 (1교시)', '프롬프트에 넣을 영어', '프레이밍 기준'], rows: [
          ['아주 멀리', '극원경 (ELS)', '<code>extreme wide shot</code>', '인물이 아주 작게'],
          ['멀리', '롱샷 (LS)', '<code>wide shot</code>', '전신 + 환경'],
          ['보통', '미디엄샷 (MS)', '<code>medium shot</code>', '허리 위'],
          ['가슴 위', '바스트샷 (MCU)', '<code>medium close-up</code>', '가슴 위'],
          ['얼굴', '클로즈업 (CU)', '<code>close-up</code>', '얼굴 전체'],
          ['아주 가까이', '익스트림 클로즈업 (ECU)', '<code>extreme close-up</code>', '눈·입 등 부분만'],
        ] },
        { type: 'table', head: ['카메라 움직임 (영문)', '뜻', '언제 쓰나'], rows: [
          ['<code>Static shot</code>', '카메라 고정', '<b>실패율 최저.</b> 확신 없으면 이걸로'],
          ['<code>Slow dolly in</code>', '천천히 다가감', '감정 고조, 집중'],
          ['<code>Slow dolly out</code>', '천천히 멀어짐', '고립감, 마무리'],
          ['<code>Slow pan left / right</code>', '좌우로 훑음', '공간 소개'],
          ['<code>Tilt up / down</code>', '위아래로 훑음', '크기 강조 <i>(떠내려온 산!)</i>'],
          ['<code>Sweeping aerial drone shot</code>', '드론 항공샷', '오프닝, 장소 소개'],
          ['<code>Gentle parallax</code>', '앞배경과 뒷배경이 서로 다른 속도로 밀림', '<b>정지 일러스트 살리기</b>'],
        ] },
        { type: 'p', text: '△ <b><code>orbit</code> / <code>arc</code>는 피하세요.</b> 인물을 돌며 찍으면 미학습 각도가 생겨 얼굴이 붕괴합니다. <code>push-in</code>이나 <code>parallax</code>로 대체하세요.' },

        { type: 'h', text: '3-3. Veo 프롬프트 공식 — 키프레임 없이 만들 때 (10분)' },
        { type: 'code', label: '5요소 공식', text: '[Cinematography] + [Subject] + [Action] + [Context] + [Style & Ambiance]\n 촬영기법        +  주체    +  동작   +  배경·맥락 +  스타일 & 분위기' },
        { type: 'table', head: ['(A) 모호어를 전부 제거하라', ''], rows: [
          ['✕', "<code>I envision a scene where, like, the main focus, a dude, is kinda sad, and it's like, dark, and the camera is sort of, from below, you know?</code>"],
          ['○', '<code>Low-angle close-up shot of a man with a somber expression. The scene is dimly lit, conveying a melancholic mood.</code>'],
        ] },
        { type: 'table', head: ['(B) ★ 대사는 「화자명: "대사"」 형식으로', ''], rows: [
          ['○ 공식 권장', '<code>A man murmurs, \'This must be it.\'</code><br><code>Man: "That\'s no ordinary bear." Woman: "Then what is it?"</code>'],
          ['△ 화면에 글자가 생길 때', '따옴표를 빼는 게 아니라 <b>부정 프롬프트에 <code>no subtitles, no on-screen text</code>를 추가</b>합니다'],
        ] },
        {
          type: 'note', tone: 'warn', title: '이 항목은 초안에 정반대로 적혀 있던 것을 2026-07-31 재검증으로 바로잡았습니다',
          body: [{ type: 'p', text: '"큰따옴표를 쓰면 화면에 자막이 그려진다"는 서술은 <b>Google 공식 문서 어디에서도 확인되지 않습니다.</b> 인터넷에 널리 퍼져 있으니 주의하세요. 다만 화면에 원치 않는 글자가 실제로 자주 생기는 것은 사실이므로, <b>부정 프롬프트로 막고 자막은 편집기에서 얹는다</b>는 원칙은 그대로 유지합니다.' }],
        },
        { type: 'p', text: '<b>(C) 짧은 영상은 한 장면에만 집중하라</b> — <code>A detective finds a clue, then drives across the city, then confronts a suspect</code> ✕ → <b>3개 클립으로 분리해서 각각 생성</b>' },
        { type: 'callout', text: '한 클립 = 한 컷 = 한 사건. 스토리는 편집이 만든다.' },
        { type: 'p', text: '<b>(D) 부정 프롬프트는 명사로 나열</b> — <code>no walls</code> / <code>don\'t show walls</code> ✕ (지시형 언어 금지) → <code>wall, frame</code> ○ (명사 나열)' },
        { type: 'code', lang: 'text', label: '설화 영상용 부정 프롬프트 (그대로 복사)', text: 'Negative prompt: text overlay, subtitles, watermark, logo,\ndistorted hands, extra fingers, warped face, sudden cut,\ncamera shake, modern buildings, cars, power lines, plastic' },
        { type: 'code', label: 'Gemini를 프롬프트 도우미로 쓰기 (Google 공식 권장)', text: `너는 Google Veo 영상 생성 모델을 위한 전문 프롬프트 엔지니어야.

아래 규칙을 반드시 지켜서 Veo 프롬프트를 영어로 작성해줘.

[규칙]
1. 구조: [카메라기법] + [주체] + [동작] + [배경·맥락] + [스타일·분위기] 순서
2. 한 프롬프트에 사건은 하나만. "A 하고 나서 B 하고 C 한다" 금지
3. 대사는 「화자명: "대사"」 형식. 예: Man: "I'm ready."
4. 대사는 8초 안에 말할 수 있는 길이로만 (한국어 20~25자)
5. 오디오는 별도 문장으로. Ambient noise: ... / SFX: ... 형식
6. 3~6문장 분량
7. 모호한 표현("약간", "~같은") 금지. 전부 구체 명사·형용사로
8. 여러 컷을 만들 때는 이전 프롬프트의 스타일·캐릭터 묘사를
   한 글자도 바꾸지 말고 전부 반복할 것

[내가 만들고 싶은 장면]
{여기에 한국어로 아이디어를 쓰세요}

[출력]
- 영어 프롬프트 1개
- 그 프롬프트의 한국어 해설
- 부정 프롬프트(negative prompt) 제안` },

        { type: 'practice', n: 5, title: '첫 클립 만들기', min: 15,
          schedule: [
            ['0~2분', 'Flow 접속 → <b>New Project</b> → 프로젝트 이름 입력'],
            ['2~4분', '설정에서 <b>모델 = Veo 3.1 Lite</b>, <b>길이 = 8초</b>, <b>출력 개수 = 1</b> 확인'],
            ['4~8분', '<b>Frames to Video</b> 선택 → 2교시 키프레임 <b>컷 1</b> 업로드'],
            ['8~13분', '프롬프트에 <b>움직임만</b> 입력 → 생성'],
            ['13~15분', '결과 확인 → 크레딧 잔량 확인'],
          ],
          checkId: 'd2-prac5',
          check: ['출력 개수 = 1 / 모델 = Lite / 길이 = 8초 확인', '컷 1 클립 생성 완료', '<b>같은 이미지에 프롬프트 2가지를 넣어 차이를 눈으로 확인</b>'],
          upload: { day: 2, section: 'clip' },
        },
        {
          type: 'note', tone: 'tip', title: '여기서 반드시 체험해야 할 것',
          body: [{ type: 'p', text: '같은 이미지에 프롬프트를 두 번 다르게 넣어 보세요. ① 이미지 내용을 다시 설명한 프롬프트 ② 움직임만 쓴 프롬프트. <b>②가 명백히 낫다는 것을 눈으로 확인</b>하는 것이 이 실습의 목적입니다.' }],
        },

        { type: 'h', text: '3-4. ★ AI 영상을 자연스럽게 잇는 법 (20분)' },
        {
          type: 'note', tone: 'ok', title: 'AI 영상 제작에서 가장 어려운 부분입니다',
          body: [{ type: 'p', text: '그리고 대부분의 문제는 <b>생성이 아니라 편집에서 해결됩니다.</b>' }],
        },
        { type: 'p', text: '<b>이미지와 달리 영상은 클립마다 독립적으로 생성됩니다.</b> 클립 A를 만든 기억이 클립 B에 남지 않고, 전달되는 것은 <b>내가 다시 넣은 프롬프트와 참조 이미지뿐</b>입니다. 그래서 세 종류의 드리프트가 발생합니다 — ① 캐릭터 드리프트(얼굴·비율·의상) ② 환경 드리프트(조명·색조·배치) ③ 스타일 드리프트(컷 간 톤).' },

        { type: 'h3', text: '무기 1. 고정 블록 (생성 단계)' },
        { type: 'code', lang: 'text', label: '★ 바로 쓰는 고정 블록 템플릿', text: '━━━━━ ① 스타일 블록 (모든 컷에 그대로 복사) ━━━━━\nVisual style: soft watercolor Korean folktale animation, warm muted palette.\nLighting: late-afternoon golden hour, key light from camera LEFT,\n          soft shadows, no harsh contrast.\nLens/Look: 35mm, shallow depth of field, subtle film grain.\nAspect ratio: 16:9.\n\n━━━━━ ② 캐릭터 블록 (모든 컷에 그대로 복사) ━━━━━\nDEOKSOE: a 7-year-old Korean boy, round face, short black bowl-cut hair,\na small scar above his left eyebrow, faded indigo jeogori, white baji,\nstraw sandals. Calm, slightly defiant expression.\n\n━━━━━ ③ 장소 블록 (같은 장소인 컷에만 복사) ━━━━━\nLOCATION: a riverside village courtyard in late summer, one large\n300-year-old zelkova tree at frame RIGHT, low stone wall behind,\nthe flooded river visible in the far background at frame LEFT.\n\n━━━━━ ④ 샷 블록 (컷마다 이 부분만 교체) ━━━━━\nSHOT 3 / Medium shot, eye level, camera slowly pushes in.\nThe subject turns his head to the RIGHT and looks up at the mountain.\n\n━━━━━ ⑤ 사운드 블록 ━━━━━\nAmbience: rushing water, distant cicadas, light wind.\nNo music, no dialogue, no on-screen text.' },
        { type: 'p', text: '<b>반복해서 말할 규칙 3개</b>: ① 캐릭터 블록은 <b>한 글자도 바꾸지 않는다</b> ② <b>조명 방향을 문장으로 못 박는다</b> — "빛은 화면 왼쪽에서" 한 구절이 색 튐을 크게 줄입니다 ③ <b>화면 좌우 배치를 명시한다</b> ("나무는 화면 오른쪽") → 180도 법칙을 프롬프트로 강제하는 효과.' },

        { type: 'h3', text: '무기 2. 체이닝 — 끝 프레임을 다음 시작 프레임으로' },
        { type: 'olist', items: [
          '클립 A 생성 → 마지막 프레임을 <b>Save frame</b>으로 저장',
          '저장한 프레임을 클립 B의 <b>start frame</b>으로 투입',
          '프롬프트에 "이 프레임에서 이어서" 명시',
        ] },
        { type: 'code', lang: 'text', label: '체이닝 프롬프트', text: '[Start frame: 클립 A의 마지막 프레임 이미지]\n\nContinue from this exact frame. Keep the same character, same clothing,\nsame lighting direction (key light from camera LEFT), and the same\ncolor palette as the input frame.\nThe subject takes two slow steps forward.\nCamera holds still. No cut, no scene change.\nAmbience only: wind, distant water. No music, no dialogue, no on-screen text.' },
        { type: 'code', lang: 'text', label: 'Frames to Video로 두 컷 사이를 잇기 (브리지 클립)', text: 'The camera performs a single continuous move from the first framing\nto the second, with no cut. The motion is smooth and unbroken.' },

        { type: 'h3', text: '무기 3. ★ 붙이기 어려우면 더 크게 바꿔라 (30도 법칙의 AI 버전)' },
        {
          type: 'note', tone: 'ok', title: '오늘 배우는 것 중 가장 쓸모 있는 요령입니다',
          body: [
            { type: 'p', text: '앵글이 <b>비슷할수록</b> 미세 불일치가 도드라집니다. 와이드 ↔ 익스트림 클로즈업처럼 <b>과감히 바꾸면</b> 불일치가 "각도 차이"로 흡수됩니다.' },
            { type: 'p', text: '→ 컷 2와 컷 3이 자꾸 안 붙으면, 컷 3을 <b>더 비슷하게</b> 만들지 말고 <b>더 다르게</b> 만드세요.' },
            { type: 'p', text: '<b>커버리지 세트로 한 장면을 3컷으로</b> — 와이드(LS) 공간과 상황 / 미디엄(MS) 인물과 행동 / 클로즈업(CU) 감정과 디테일' },
          ],
        },
        { type: 'p', text: '△ <b>매치 온 액션은 AI에서 사실상 불가능합니다</b> (생성마다 다른 테이크). 대신 ① <b>그래픽 매치컷</b>(구도를 문장으로 동일 지정) ② <b>Frames to Video 브리지</b>로 대체하세요.' },

        { type: 'h3', text: '무기 4. ★★ J컷 · L컷 — 품은 제일 적게 들고 효과는 제일 큰 기법' },
        { type: 'list', items: [
          '<b>J컷</b> = 다음 장면의 <b>소리가 먼저</b> 들어오고, 그 다음에 그림이 바뀐다',
          '<b>L컷</b> = 앞 장면의 <b>소리가 계속 이어지는 상태</b>에서 그림만 먼저 바뀐다',
        ] },
        {
          type: 'note', tone: 'ok', title: '왜 이게 결정적인가',
          body: [
            { type: 'p', text: '그림은 컷마다 튀지만 <b>소리는 내가 직접 깔기 때문에 튀지 않습니다.</b> 소리를 컷 경계보다 <b>0.3~1초 먼저/나중에</b> 걸치면, 관객의 뇌는 "연속된 하나의 장면"으로 처리합니다.' },
            { type: 'p', text: '<b>실습 지시문 한 줄</b>: "다음 컷의 소리(발소리, 물소리, 천둥)를 <b>화면보다 0.5초 먼저</b> 시작하세요. <b>그것만으로 두 컷이 붙습니다.</b>"' },
          ],
        },
        { type: 'p', text: '△ <b>AI 영상 특유의 함정</b>: Veo가 클립마다 오디오를 생성하므로 <b>컷마다 앰비언스가 다릅니다.</b> → 실무에서는 <b>생성된 오디오를 통째로 음소거하고</b>, BGM + 앰비언스 + 내레이션을 새로 깝니다.' },

        { type: 'h3', text: '무기 5. 완벽주의에서 빠져나오기 — 월터 머치의 우선순위' },
        { type: 'table', head: ['순위', '기준', '가중치'], rows: [
          ['1', '<b>감정</b> — 관객이 느끼게 하는가', '<b>51%</b>'],
          ['2', '<b>이야기</b> — 이야기를 진전시키는가', '23%'],
          ['3', '리듬', '10%'],
          ['4', '시선 유도', '7%'],
          ['5', '2차원 화면 평면 (180도 축)', '5%'],
          ['6', '3차원 공간 연속성', '<b>4%</b>'],
        ] },
        {
          type: 'note', tone: 'ok', title: '연수에서 반드시 할 말',
          body: [{ type: 'p', text: '"AI 영상의 연속성 오류는 머치 기준으로 <b>5~6번, 가장 먼저 버려도 되는 항목</b>입니다. <b>얼굴이 살짝 달라진 것보다, 이야기가 지루한 게 훨씬 큰 문제입니다.</b>" 여기서 완벽주의에 빠지면 6시간이 다 갑니다. 오늘은 <b>완주가 목표</b>입니다.' }],
        },

        { type: 'h', text: '3-5. 대사·소리 — 한국어는 어디까지 되나 (10분)' },
        { type: 'table', head: ['오디오 3종', '표기', '예시'], rows: [
          ['효과음', '<code>SFX:</code>', '<code>SFX: thunder cracks in the distance</code>'],
          ['앰비언트', '<code>Ambient noise:</code>', '<code>Ambient noise: rushing river water, distant cicadas</code>'],
          ['대사', '<code>X says:</code>', '<code>The old man says: Long ago, in these mountains</code>'],
        ] },
        { type: 'p', text: '공식 원문: <i>"Clearly specify if you want audio. We recommend that you use separate sentences in your prompt to describe the audio."</i> → <b>오디오는 별도 문장으로 씁니다.</b>' },
        {
          type: 'note', tone: 'warn', title: '대사가 생성되지 않는 두 가지 조건 — 출처 상태 주의',
          body: [
            { type: 'p', text: '아래 두 조건은 Google 블로그 「5 tips for getting started with Flow」에 실린 것으로 보고되나, <b>해당 URL 원문을 재확인하지 못했습니다.</b> → <b>실무 경험칙으로 받아들이되, 강의에서 "공식 명시"라고 단정하지 마세요.</b>' },
            { type: 'olist', items: [
              '<b>대사가 8초 안에 안 들어가면</b> 음성이 생성되지 않습니다. → <b>한국어 20~25자 이내, 한 문장.</b>',
              '<b>미성년자가 관련되면</b> 음성이 생성되지 않습니다.',
            ] },
            { type: 'p', text: '<b>2번이 결정적입니다. 「부래산」의 일곱 살 주인공이 말하는 컷은 구조적으로 어렵습니다.</b> 대안: ① <b>성인 화자/내레이터</b> 형식 ② <b>무음 생성 + 자막</b> ③ 무음 생성 + 교사·학생 육성 더빙' },
          ],
        },
        { type: 'h3', text: '★ 한국어 대사 — 솔직한 현황' },
        { type: 'list', items: [
          '○ 한국어는 Flow <b>지원 언어 목록에 포함</b>되어 있습니다.',
          '△ 그러나 같은 문서가 명시적으로 경고합니다: <i>"For best results with our tools, we recommend using English prompts."</i>',
          '✕ <b>Google 공식 문서 어디에도 "Veo가 한국어 음성을 생성한다"고 보증하는 문구는 없습니다.</b>',
        ] },
        { type: 'table', head: ['실패 대비 3단 우회안', '방법', '안정성'], rows: [
          ['<b>1안 (권장)</b>', '영상은 <b>무음/앰비언트만</b> 생성 → CapCut에서 <b>한국어 TTS 또는 육성</b> 얹기', '★★★ 확실'],
          ['<b>2안</b>', '영상은 무음 생성 → <b>자막</b>으로 대사 처리', '★★★ 확실'],
          ['3안 (도전)', '프롬프트 본문은 영어, 대사만 큰따옴표로 감싼 한국어', '★ 불안정'],
        ] },
        { type: 'code', lang: 'text', label: '3안 시도용 프롬프트', text: 'Medium shot of an elderly Korean man in a traditional hanbok sitting\nby a fireplace in a rural house at night. He looks into the camera\nwith a gentle smile.\nHe speaks in Korean, saying: "옛날 옛날 아주 먼 옛날에"\nAmbient noise: crackling firewood, distant crickets.' },
        {
          type: 'note', tone: 'danger', title: '강사 필수 사전 테스트',
          body: [{ type: 'p', text: '연수 당일 아침 이 프롬프트로 <b>3~5회 직접 생성</b>해서 성공률을 확인한 뒤, 강의에서 <b>사실대로</b> 안내하세요. 이 항목이 연수 만족도에 직결됩니다.' }],
        },
        { type: 'p', text: '<b>BGM은 Flow에서 만들 수 없습니다.</b> Veo가 생성하는 오디오는 효과음·앰비언스·대사이며, 완성된 BGM 트랙이 아닙니다. 음악 생성은 <b>Google Flow Music</b>(<a href="https://flowmusic.google/" target="_blank" rel="noopener">flowmusic.google</a>)이라는 <b>별개 제품</b>입니다. → <b>오늘 BGM은 4교시에서 Suno로 만듭니다.</b>' },

        { type: 'practice', n: 6, title: '8컷 전부 영상화', min: 40,
          mission: '컷당 4~5분. <b>완벽을 노리지 말고 완주가 목표입니다.</b>',
          checkId: 'd2-prac6',
          check: [
            '모든 프롬프트에 <b>스타일 블록 + 캐릭터 블록을 글자 그대로 복붙</b>했다 (요약·의역 금지)',
            '프롬프트가 참조 이미지와 <b>모순되지 않는다</b>',
            '클립을 <b>8초로</b> 생성했다 (편집 여유분 확보)',
            '이어져야 하는 컷은 <b>직전 클립의 끝 프레임을 start frame으로</b> 넣었다',
            '<b>Extend는 컷 전환에 쓰지 않았다</b> (같은 앵글을 길게 할 때만)',
            '대사가 있는 컷은 <b>화자 1명 + 짧은 문장</b>',
            '다운로드해서 <code>cut01.mp4</code> ~ <code>cut08.mp4</code>로 <b>영문 폴더</b>에 저장',
          ],
          upload: { day: 2, section: 'clip' },
        },
        {
          type: 'note', tone: 'warn', title: '재생성은 각오하세요',
          body: [{ type: 'p', text: '실무에서는 <b>쓸 만한 컷 1개당 평균 3회 생성</b>이 보고됩니다. Veo 3.1 Lite 기준 8컷 × 3회 = 240크레딧. Google AI Pro(1,000)면 여유 있습니다. <b>단, 3회 넘게 실패하면 프롬프트를 고치지 말고 "이 컷이 AI가 못 만드는 유형인가"를 먼저 의심하세요.</b>' }],
        },

        { type: 'h', text: '3-6. 부자연스러움 유형별 대처표' },
        { type: 'table', head: ['증상', '생성 단계 대처', '편집 단계 대처'], rows: [
          ['<b>플리커</b> (미세하게 깜빡임)', '클립을 짧게, 복잡한 텍스처(물결·군중) 회피', '해당 구간 컷아웃'],
          ['<b>모프</b> (얼굴·사물이 녹음)', '동작을 단순하게 (<code>slow, gentle motion</code>)', '<b>모프 구간을 잘라낸다.</b> 살릴 수 없으면 재생성'],
          ['<b>색 튐</b> (컷마다 색온도 다름)', '프롬프트에 조명 방향·시간대·색감 고정', '가장 잘 나온 컷 기준 색 맞춤 + <b>전체에 동일 필터 1개</b>'],
          ['<b>속도 불일치</b>', '<code>slow</code> / <code>steady</code> 명시', '클립별 속도 0.8~1.2배 미세 조정'],
          ['<b>립싱크 어긋남</b>', '한 클립에 화자 1명, 짧은 문장', '대사 컷은 <b>화자 얼굴 대신 반응샷·풍경으로 덮고</b> 목소리만 살림'],
          ['<b>얼굴이 달라짐</b>', 'ingredients 재사용 + 캐릭터 블록 고정', '얼굴이 다른 컷은 <b>롱샷/뒷모습/실루엣으로 대체</b>'],
          ['<b>손·손가락 이상</b>', '손이 화면에 크게 안 나오게 구도 지정', '해당 구간 컷아웃 or 크롭으로 손 제외'],
          ['<b>좌우 뒤집힘</b> (180도 축 위반)', '프롬프트에 좌/우 배치 명시', '편집기에서 <b>수평 반전</b> (단, 화면에 글자 있으면 불가)'],
          ['<b>화면 속 깨진 글자</b>', '<code>no text, no signage, no subtitles</code>로 배제', '자막·타이틀은 <b>편집기에서 얹기</b>'],
          ['<b>첫/끝 0.5초가 어색</b>', '8초 생성으로 여유분 확보', '<b>앞 0.3s / 뒤 0.5s 기본 트림</b>'],
        ] },
        {
          type: 'note', tone: 'ok', title: '표 맨 아래 항목이 오늘 배울 가장 실용적인 습관입니다',
          body: [{ type: 'p', text: 'AI 클립은 처음 0.3~0.5초에 모션이 붙고, 마지막 0.3~0.5초에 모션이 죽거나 드리프트가 시작됩니다. <b>8초로 생성하고 편집에서 4~6초만 쓴다.</b> 이 습관 하나로 "AI 티"의 상당 부분이 사라집니다.' }],
        },
      ],
    },

    /* ───────────────────────── 4교시 ───────────────────────── */
    {
      id: 'd2-p4',
      period: '4교시',
      min: 35,
      title: '음악 — Suno로 설화 BGM 만들기',
      summary: '라이선스가 먼저다. 그 다음 프롬프트 7종',
      blocks: [
        { type: 'h', text: '4-1. 먼저 알아야 할 라이선스 (10분)' },
        {
          type: 'note', tone: 'danger', title: '국내 튜토리얼 대부분이 빠뜨리는 조항입니다',
          body: [
            { type: 'p', text: '<b>Suno 이용약관 원문 (2026-03-26 개정)</b>' },
            { type: 'p', text: '· 유료: <i>"Suno hereby assigns to you all of its right, title and interest"</i> → <b>사용자 소유</b>' },
            { type: 'p', text: '· 무료: <i>"only ... for your lawful, internal, personal and non-commercial purposes, provided that you give attribution credit to Suno in each case."</i> → <b>Suno 소유 + 비상업 한정 + 출처표시 의무</b>' },
          ],
        },
        { type: 'table', head: ['상황', '무료 플랜', '유료 (Pro/Premier)'], rows: [
          ['연수장 시연 · 교실 수업 중 재생', '○ 문제없음', '○'],
          ['교사가 만든 영상을 <b>교내에서만</b> 상영', '○ 대체로 안전', '○'],
          ['학교 유튜브에 <b>비수익화</b> 업로드', '△ <b>회색지대</b>', '○ 안전'],
          ['학교 유튜브가 <b>수익화 중</b>', '✕ <b>명백히 금지</b>', '○'],
          ['<b>학생 대회·공모전 출품</b>', '✕ <b>권하지 않음</b>', '△ 조건부'],
        ] },
        { type: 'p', text: '△ <b>무료로 만든 곡은 나중에 결제해도 상업권이 소급되지 않습니다.</b> 공개 배포용이면 처음부터 유료로 생성해야 합니다.' },
        { type: 'p', text: '<b>학생 대회 출품이 위험한 3가지 이유</b>' },
        { type: 'olist', items: [
          '<b>소유권</b> — 무료 플랜 결과물의 소유자는 Suno입니다. 대부분의 공모전 요강은 "출품작 소재의 권리를 출품자가 보유함을 보증한다"를 요구하는데, <b>이 보증을 할 수 없습니다.</b>',
          '<b>연령</b> — Suno 약관은 <b>만 13세 이상</b>을 요구합니다. <b>초등학생은 계정 생성 자체가 약관 위반</b>입니다.',
          '<b>저작권 미발생</b> — 약관 원문: <i>"Suno makes no representation or warranty to you that any copyright will vest in any Output."</i>',
        ] },
        {
          type: 'note', tone: 'ok', title: '따라서 오늘의 설계',
          body: [
            { type: 'p', text: '<b>"교사가 BGM을 만들어 학생 영상에 제공한다."</b>' },
            { type: 'p', text: '그리고 학생 결과물에는 <b>비-AI 무료 음원</b>을 권합니다 → <b>Pixabay > 유튜브 오디오 보관함 > 공유마당</b> 순. <i>(공유마당은 CC BY-ND가 섞여 있는데, ND는 영상 삽입 자체가 금지이므로 라이선스 확인 필수)</i>' },
          ],
        },
        { type: 'code', label: '무료 플랜을 쓴다면 반드시 — 크레딧 표기', text: '음악 · Music\nBGM generated with Suno (suno.com)' },
        { type: 'p', text: '<b>요금</b> (2026-07-31 직접 확인) — <b>Free $0</b>: 50크레딧 <b>매일</b> 갱신(이월 없음), v4.5-all 전용, <b>상업적 이용 불가</b> / <b>Pro $8/월</b>: 2,500크레딧, v5.5, <b>신규 생성곡 상업권</b>, 스템 분리 / <b>Premier $24/월</b>: 10,000크레딧, Suno Studio' },
        { type: 'p', text: '<b>주의</b>: <code>Crop</code> · <code>Exclude</code> · 스템 분리는 <b>Pro/Premier 기능</b>입니다. 또한 <b>리믹스(remix)는 유료 구독자도 상업적 사용이 불가</b>합니다.' },
        { type: 'p', text: '△ <b>대안 도구 현황</b> — Google MusicFX는 <b>2026-07-31 서비스 종료</b>. Udio는 UMG 합의 이후 <b>다운로드 전면 차단</b>. ElevenLabs Music이 기술적으로 유력하나 무료는 다운로드 불가.' },

        { type: 'h', text: '4-2. BGM 프롬프트 작성법 (10분)' },
        { type: 'code', label: '기본 구조', text: '[장르+서브장르], [무드], [악기], [instrumental], [프로덕션], [BPM]' },
        { type: 'p', text: '<b>핵심 원리 4가지</b>' },
        { type: 'olist', items: [
          '<b>순서가 결정적</b> — 앞 2~3개 태그가 결과를 지배합니다. <b>장르를 맨 앞에.</b>',
          '<b>태그 6~7개가 최적</b> — 4개 미만이면 뻔한 기본값, 10개 초과면 신호 충돌로 뒤쪽이 무시됩니다.',
          '<b>베이스 장르 금지, 서브장르 필수</b> — <code>traditional</code> ✕ → <b><code>korean traditional</code></b> ○',
          '<b>프로덕션 태그를 1개는 반드시</b> — <code>reverb-drenched</code>, <code>spacious</code>, <code>tape saturation</code>, <code>lo-fi</code> 중 하나. 커뮤니티 프롬프트 대부분이 이걸 빠뜨립니다.',
        ] },
        { type: 'p', text: '<b>안 되는 것</b>: 아티스트 실명 / 믹싱 전문용어 / <b>Style 필드에 부정 지시</b>(<code>no vocals</code>는 불안정 → <b>Exclude 필드</b>를 쓸 것) / 정확한 BPM 고정' },
        { type: 'h3', text: '한국 전통악기 지정법' },
        { type: 'p', text: '<b>로마자 표기가 표준입니다</b>: <code>gayageum</code>(가야금) · <code>daegeum</code>(대금) · <code>janggu</code>(장구) · <code>haegeum</code>(해금)' },
        {
          type: 'note', tone: 'ok', title: '★ 장르 앵커가 악기명보다 안전합니다',
          body: [{ type: 'p', text: '<code>korean traditional</code>을 <b>맨 앞</b>에 두는 것이 가장 확실한 앵커입니다. 악기명이 무시되면 학습 데이터가 훨씬 많은 동아시아 악기로 <b>우회</b>하되, 장르 앵커는 앞에 유지하세요.' }],
        },
        { type: 'table', head: ['원하는 소리', '1차 시도', '프록시(백업)'], rows: [
          ['가야금', '<code>gayageum</code>', '<code>guzheng</code>, <code>koto</code>, <code>plucked zither</code>'],
          ['대금', '<code>daegeum</code>', '<code>bamboo flute</code>, <code>shakuhachi</code>, <code>dizi</code>'],
          ['해금', '<code>haegeum</code>', '<code>erhu</code>'],
          ['장구·북', '<code>janggu</code>, <code>buk</code>', '<code>low frame drum</code>, <code>hand drum</code>'],
        ] },
        { type: 'p', text: '△ <code>국악</code>, <code>gugak</code>, <code>pansori</code> 및 <b>장단 용어</b>(<code>jajinmori</code>, <code>jungmori</code>)가 작동한다는 근거는 확인되지 않았습니다. 장단은 서양식으로 병기하세요 → <code>lilting 6/8 groove</code>, <code>slow 12/8 pulse</code>' },
        { type: 'table', head: ['무드 태그 — 신뢰도 높음 ○', '쓰지 말 것 ✕'], rows: [
          ['<code>cinematic</code> ← <b>범용 최강. 무조건 넣을 것</b><br><code>haunting</code> ← 설화에 최적<br><code>dark</code> / <code>melancholic</code> / <code>dreamy</code> / <code>nostalgic</code><br><code>mysterious</code> / <code>brooding</code>', '<code>peaceful</code> (모호 → <code>serene</code>로 대체)<br><code>epic</code> 단독<br>상충 조합 (<code>aggressive + peaceful</code> → 밋밋한 평균값)'],
        ] },
        { type: 'p', text: '<b>설화용 텍스처 어휘</b> (Suno 공식 Music Glossary 기준): <code>sparse</code> · <code>ostinato</code> · <code>pedal point</code> · <code>rubato</code> · <code>tremolo</code> · <code>legato</code> · <code>crescendo</code>' },

        { type: 'practice', n: 8, title: '설화 BGM 만들기', min: 25,
          mission: 'Custom 모드 → <b>Instrumental 토글 ON</b> → Style 필드에 아래 붙여넣기 → (가능하면) Advanced Options → Exclude 필드 입력',
          checkId: 'd2-prac8',
          check: ['Custom 모드 + Instrumental 토글 ON + Exclude 입력 <b>(3중 방어)</b>', '목표 길이보다 <b>10~15초 길게</b> 생성', '다운로드 → 영문 파일명 저장'],
          upload: { day: 2, section: 'bgm' },
        },
        { type: 'bgm', ref: 'BGM_PROMPTS' },
        {
          type: 'note', tone: 'ok', title: '강의 포인트',
          body: [{ type: 'p', text: 'BGM은 "좋은 음악"이 아니라 <b>"방해하지 않는 음악"</b>입니다. <code>sparse</code> + <code>pedal point</code> + <code>unobtrusive</code> 이 조합이 핵심이며, <b>초보자가 가장 많이 하는 실수는 너무 화려한 곡을 고르는 것</b>입니다.' }],
        },

        { type: 'h', text: '4-3. 실패 패턴과 길이 맞추기' },
        { type: 'table', head: ['증상', '대처'], rows: [
          ['<b>Instrumental인데 보컬·허밍이 섞임</b> (가장 흔함)', '<b>3중 방어</b>: ① Custom 모드 ② Instrumental 토글 ON ③ Exclude에 <code>vocals, singing, humming, choir</code> — Style 필드에 <code>no vocals</code>를 쓰는 건 불안정'],
          ['한국풍이 중국풍·일본풍으로 나옴', '<code>korean traditional</code>을 <b>맨 앞</b>으로. 프록시 악기는 뒤로'],
          ['곡이 갑자기 끊긴다', '목표 길이보다 <b>10~15초 길게</b> 생성 후 편집기에서 자르기'],
          ['나레이션 아래 깔기엔 너무 화려하다', '⑦번 언더스코어 프롬프트로 재생성'],
          ['크레딧 부족', '무료는 하루 50크레딧 ≈ <b>5회 시도</b>. 프롬프트를 미리 워크시트에 써 두고 들어가기'],
        ] },
        {
          type: 'note', tone: 'ok', title: '30~60초 맞추기 — 연수 현실 해법',
          body: [{ type: 'p', text: 'Suno의 <code>Crop</code> 기능은 <b>Pro/Premier 전용</b>이고 데스크톱 웹에서만 됩니다. → <b>Suno에서 자르려 하지 말고, 55~90초로 넉넉히 생성한 뒤 CapCut에서 자르고 페이드아웃</b>하세요. 훨씬 빠르고 확실합니다.' }],
        },
      ],
    },

    /* ───────────────────────── 5교시 ───────────────────────── */
    {
      id: 'd2-p5',
      period: '5교시',
      min: 60,
      title: '편집 — CapCut으로 완성하기',
      summary: '조립 7단계 · 사운드 네 겹 · 자막 · 내보내기',
      blocks: [
        { type: 'h', text: '5-0. 시작 전 3가지 (5분)' },
        {
          type: 'note', tone: 'danger', title: '① 프로젝트 설정을 편집 시작 전에 정한다 — 가장 중요한 단계',
          body: [{ type: 'p', text: '공식 문서 경고: 프리셋 템플릿("9:16 TikTok" 등)을 고르면 <b>해상도가 1080p로 잠깁니다.</b> 모바일은 <b>첫 클립이 프로젝트 해상도를 결정</b>합니다.' }],
        },
        {
          type: 'note', tone: 'danger', title: '② 한글 폴더명·파일명을 쓰지 않는다',
          body: [{ type: 'p', text: '공식: 자막 내보내기 경로는 <b>ASCII 문자만</b> 허용. → 실습 시작 전 전원 <b><code>C:\\CapCut</code></b> 같은 영문 폴더를 만들고 파일명을 <code>cut01.mp4</code> 식으로 바꾸게 하세요. <b>이것만으로 실습 중 사고의 절반이 사라집니다.</b>' }],
        },
        {
          type: 'note', tone: 'danger', title: '③ CapCut 내장 음원(Sounds)을 쓰지 않는다',
          body: [{ type: 'p', text: '내장 음원은 <b>개인·비상업 한정</b>이며, 상업 마크가 붙은 것조차 <b>CapCut/TikTok 안에서만</b> 허용됩니다. <b>유튜브는 여기 포함되지 않습니다.</b> 게다가 비상업 소재가 <b>하나만 섞여도 영상 전체가 비상업으로 묶이는</b> 오염 조항이 있습니다. → <b>4교시에서 만든 Suno BGM을 쓰세요.</b>' }],
        },
        { type: 'code', label: '데스크톱 — 프로젝트 설정 절차', text: '1. CapCut 실행 → New project\n2. 클립을 넣기 전에 상단 Project Settings 열기\n3. Resolution = 1080P  (4K는 렌더링이 느려 실습 시간을 잡아먹습니다)\n4. Frame rate = 30fps  (AI 클립은 24 또는 30fps. 30 통일이 가장 안전)\n5. Aspect ratio 결정\n6. 그 다음에 클립 임포트' },
        { type: 'code', label: '웹', text: '1. capcut.com 로그인 → Create new\n2. 프리셋을 고르지 말고 Custom을 눌러 직접 입력 (1920 × 1080)' },
        { type: 'table', head: ['용도', '비율', '해상도'], rows: [
          ['학급 홈페이지·수업 자료·빔프로젝터', '<b>16:9</b>', '1920×1080'],
          ['릴스·쇼츠·틱톡', '9:16', '1080×1920'],
        ] },
        {
          type: 'note', tone: 'ok', title: '오늘은 16:9 / 1920×1080 / 30fps로 전원 통일합니다',
          body: [{ type: 'p', text: '2교시에서 키프레임을 16:9로 만들었고, 대회 발표·상영이 빔프로젝터 기준이기 때문입니다.' }],
        },

        { type: 'h', text: '5-1. 조립 — 7단계 (10분 설명)' },
        { type: 'code', label: '조립 7단계', text: '1. 클립 8개를 대본 순서대로 타임라인에 배치     (틈 없이 붙일 것)\n2. 모든 클립 앞 0.3초 / 뒤 0.5초 트리밍         ← ★ 가장 효과 큰 습관\n3. AI가 생성한 오디오 전부 음소거               (대사 컷만 예외)\n4. Suno BGM을 처음부터 끝까지 한 트랙으로 깔기\n5. 자막 얹기\n6. 전체에 같은 필터 1개 적용 (색 통일)\n7. 내보내기 1080P / 30fps / Higher' },
        { type: 'table', head: ['동작', '조작'], rows: [
          ['<b>트리밍</b>(앞뒤 자르기)', '클립 가장자리에 마우스를 대면 ↔ 커서로 바뀜 → 안쪽으로 드래그'],
          ['<b>분할</b>(중간 자르기)', '재생헤드 이동 → 클립 선택 → 가위 아이콘 (또는 <code>Ctrl+B</code>)'],
          ['삭제', '클립 선택 → <code>Delete</code>'],
          ['순서 변경', '클립을 잡고 좌우 드래그 (자석 기능이 기본 활성)'],
        ] },
        {
          type: 'note', tone: 'ok', title: '"AI가 만들어준 8초를 그대로 다 쓰는 것"이 초보자의 가장 흔한 실수입니다',
          body: [{ type: 'p', text: '8초 클립을 <b>3~4초로 줄이는 것</b>이 오늘 작업의 대부분입니다. 30초 영상에 8컷이면 컷당 평균 3.75초입니다. <b>8초 클립 1개를 2컷으로 분할해서 쓰는 것도 좋은 방법</b>입니다 — 컷 수는 늘고 생성 횟수는 그대로.' }],
        },
        { type: 'h3', text: '트랜지션 — 기본은 "컷"이다' },
        { type: 'table', head: ['트랜지션', '언제 쓰나', 'AI 영상에서의 주의'], rows: [
          ['<b>컷 (하드컷)</b>', '<b>기본값.</b> 같은 장면 안', '두 컷의 밝기·색감이 비슷할 때만 자연스러움'],
          ['<b>디졸브</b>', '<b>시간 경과·장소 이동</b>', '0.5~1초. AI 클립 간 색·구도 차이를 <b>가장 무난하게 흡수</b>. 남발하면 몽롱해짐'],
          ['화이트 플래시', '회상 진입, 충격, <b>벼락</b>', '0.1~0.2초면 충분. 길면 촌스러움'],
          ['페이드 투 블랙', '영상의 시작·끝', '중간에 쓰면 "끝난 줄 알았다" 반응'],
        ] },
        { type: 'quote', text: '어떤 트랜지션을 쓸지 모르겠으면 그냥 컷을 써라.' },
        { type: 'p', text: '△ 트랜지션 아이콘이 안 보이면 → 클립 사이에 <b>빈 공간(gap)이 있는지</b> 확인하세요.<br>△ <b>Fade In/Out은 Transitions 탭에 없습니다.</b> 클립 선택 후 우측 패널에서 찾으세요. (자주 하는 실수 3위)' },

        { type: 'h', text: '5-2. 사운드 — 이음새를 감추는 네 겹 (10분)' },
        { type: 'table', head: ['레이어', '하는 일', '실행'], rows: [
          ['<b>BGM (한 트랙)</b>', '영상 전체를 하나로 묶는 접착제', '컷마다 자르지 말고 <b>처음부터 끝까지 한 트랙</b>으로'],
          ['<b>앰비언스 / 룸톤</b>', '컷이 바뀌어도 <b>공간이 유지된다</b>는 신호', '같은 장소의 컷들 위에 <b>동일한 환경음 1트랙</b>을 통으로'],
          ['<b>효과음(SFX)</b>', '컷 경계에 "사건"을 만들어 시선을 뺏음', '컷 지점에 발소리·물소리·천둥 한 번. <b>3개 이내로 제한</b>'],
          ['<b>J컷 / L컷</b>', '오디오 전환점과 영상 전환점을 어긋나게', '오디오를 <b>0.3~1초 먼저/나중에</b>. 최소 3곳'],
        ] },
        { type: 'table', head: ['트랙', '권장 볼륨'], rows: [
          ['내레이션 / 대사', '기준 (100%)'],
          ['<b>BGM (내레이션 있을 때)</b>', '<b>20~30% 수준으로 크게 낮춤</b>'],
          ['BGM (내레이션 없을 때)', '50~60%'],
        ] },
        { type: 'p', text: '<b>초보자용 단순 규칙</b>: "내레이션이 있으면 BGM은 <b>들릴 듯 말 듯</b>하게."' },
        { type: 'p', text: '△ <b>오디오 덕킹(자동 감쇠)은 CapCut 공식 문서에서 확인되지 않습니다.</b> 있다고 단정하지 마세요. <b>대신 훨씬 간단한 해법</b>: 내레이션 구간에서 <b>BGM 클립을 분할해서 그 구간만 볼륨을 낮추기.</b> 클릭 3번이면 되고 결과는 거의 같습니다.' },
        {
          type: 'note', tone: 'ok', title: '페이드 — 무조건 시키세요',
          body: [{ type: 'p', text: '오디오 클립 선택 → 우측 패널에서 <b>Fade in / Fade out</b> → <b>Fade in 0.5~1초 / Fade out 1~2초</b>. BGM 끝을 페이드아웃 안 해서 음악이 뚝 잘리는 것 — <b>아마추어 티가 가장 많이 나는 대목입니다.</b> 클릭 2번인데 효과는 큽니다.' }],
        },

        { type: 'h', text: '5-3. 자막 — "흰 굵은 고딕 + 검정 외곽선 + 하단 12%" (10분)' },
        { type: 'table', head: ['항목', '권장', '이유'], rows: [
          ['위치', '화면 하단에서 <b>10~15%</b> 위', '너무 아래면 플랫폼 UI에 가림'],
          ['크기', '화면 세로의 5~8%', '스마트폰에서 읽히는 최소 크기'],
          ['줄 수', '최대 2줄, 한 줄 <b>12~16자</b>', '한국어 기준'],
          ['<b>외곽선</b>', '<b>검정, 2~4px</b>', '<b>가장 중요.</b> 배경이 밝든 어둡든 읽힘'],
          ['폰트', '<b>굵은 고딕 계열</b>', '명조체는 작은 화면에서 안 읽힘'],
          ['노출 시간', '최소 1.5초 / 최대 6초', '짧으면 못 읽고 길면 지루함'],
        ] },
        { type: 'p', text: '<b>외곽선 설정</b>: 텍스트 클립 선택 → 우측 <b>Text > Basic</b> → 아래로 스크롤 → <b>Stroke</b> 체크 → 검정, 2~4' },
        {
          type: 'note', tone: 'warn', title: '한글 폰트 주의 · 다이아 아이콘 확인',
          body: [{ type: 'p', text: '영문 전용 폰트를 쓰면 한글이 깨지거나 기본 폰트로 대체됩니다. 템플릿 적용 후 <b>반드시 눈으로 확인</b>하세요. 템플릿·소재에 ◆파란/◆보라 다이아가 붙어 있으면 <b>유료</b>입니다. 무료 실습에서는 <b>아이콘 없는 것만</b> 쓰게 하세요.' }],
        },
        { type: 'p', text: '<b>텍스트가 안 보일 때 — 공식 5단계</b>: ① 위치 조정 ② 레이어 순서(텍스트를 PIP·스티커 <b>위로</b>) ③ 불투명도 ④ 글자 크기 ⑤ 등장 애니메이션 제거' },

        { type: 'h', text: '5-4. 색 통일 · 내보내기 (5분)' },
        { type: 'p', text: '<b>색이 튈 때</b>: ① <b>히어로 샷 먼저</b> — 가장 잘 나온 컷 하나를 원하는 색으로 만들고 ② 나머지를 거기에 맞춘다 ③ <b>교사용 간이 대안</b>: 모든 클립에 <b>같은 필터 1개 + 같은 밝기/대비 값</b>을 적용. 정교하지 않아도 "같은 세계" 느낌이 크게 올라갑니다.' },
        { type: 'code', label: '내보내기', text: '1. 우측 상단 Export\n2. Title 입력 → 영문·숫자\n3. 저장 경로 → 영문 경로 (C:\\CapCut)  (시스템 루트·Program Files 금지)\n4. Resolution 1080P / Frame rate 30fps / Bit rate Higher\n5. Export → 완료 화면 좌측 하단 Open folder' },
        { type: 'table', head: ['오류 코드', '공식 조치'], rows: [
          ['4114', '영상을 여러 조각으로 나눠 내보내 문제 클립을 찾아 교체'],
          ['22113', '모든 compound clip 삭제 후 재생성'],
          ['-1 / 4155', '기기의 가상 메모리(페이지 파일) 증설'],
          ['10004', '구간별 내보내기로 문제 클립을 찾아 삭제 후 재추가'],
          ['-30007', '<b>백신 일시 해제</b> · 저장 경로 변경'],
          ['10006', '가져온 미디어 파일 재연결(re-link)'],
        ] },

        { type: 'practice', n: 9, title: '조립 + 다듬기', min: 45, star: true,
          checkId: 'd2-prac9',
          check: [
            '클립을 대본 순서대로 배치했다',
            '모든 클립의 <b>앞 0.3초 / 뒤 0.5초를 잘라냈다</b>',
            'AI가 생성한 오디오를 <b>일단 전부 음소거</b>했다 (대사 컷만 예외)',
            '<b>BGM을 처음부터 끝까지 한 트랙</b>으로 깔았다',
            'BGM에 <b>Fade in 0.5초 / Fade out 1.5초</b>를 넣었다',
            '컷 경계 최소 3곳에 <b>J컷 또는 L컷</b>을 만들었다',
            '색이 튀는 컷을 <b>가장 잘 나온 컷 기준으로</b> 맞췄다',
            '<b>모든 클립에 같은 필터 1개</b>를 같은 강도로 적용했다',
            '트랜지션은 <b>기본 컷</b>, 시간·장소가 바뀌는 곳만 <b>디졸브 0.5초</b>',
            '화면 속 깨진 글자가 없다',
            '자막을 얹었다 (흰 굵은 고딕 + 검정 외곽선 2~4px)',
            '<b>엔딩 크레딧</b>을 넣었다',
          ],
          upload: { day: 2, section: 'final' },
        },
        { type: 'code', label: '★ 엔딩 크레딧 양식 (그대로 복사)', text: '이 영상은 춘천 지역의 「부래산(浮來山)」 설화를\n         재해석한 창작물입니다.\n\n         원전 출처 · 한국민족문화대백과사전 「춘천시」\n                    위키강원 서면 「장마에 떠내려온 산」\n\n         이미지 · Google Gemini (Nano Banana)로 생성\n         영상   · Google Flow (Veo)로 생성\n         음악   · Suno로 생성\n         기획·구성·편집 · ○○○\n\n         ※ 이 이야기는 전설이며 역사적 사실은 아닙니다.' },
        {
          type: 'note', tone: 'danger', title: '이 크레딧은 장식이 아닙니다',
          body: [
            { type: 'list', items: [
              '대회 심사 기준 "AI 활용 과정이 드러나는가"에 직결',
              '교육부 「수행평가 시 AI 활용 관리 방안」(2026학년도 적용)의 <b>"AI 활용 과정 표기"</b> 지도 사항',
              '2022 개정 국어과 \'매체 활용 윤리\' 성취',
              'Suno 무료 플랜 사용 시 <b>약관상 의무</b>',
            ] },
          ],
        },
        {
          type: 'note', tone: 'ok', title: '★ 최종 점검 — "3회 재생 테스트"',
          body: [
            { type: 'p', text: '<b>1회차 — 소리 끄고 보기</b>: 그림만으로 이야기가 이해되는가? 튀는 컷이 어디인가?' },
            { type: 'p', text: '<b>2회차 — 화면 안 보고 소리만 듣기</b>: 소리가 끊기는 지점이 있는가? (있으면 그 컷이 문제)' },
            { type: 'p', text: '<b>3회차 — 정상 재생</b>: 처음 3초가 시선을 잡는가? 마지막 컷이 여운을 남기는가?' },
            { type: 'p', text: '<b>그리고 옆 사람에게 보여주고 "어디가 어색했어요?" 물어보세요.</b> 스스로는 이미 눈이 익어서 못 봅니다.' },
          ],
        },

        { type: 'h', text: '5-5. △ 학교 현장 사용 시 유의사항 + 대안 도구' },
        { type: 'table', head: ['흔한 오해', '사실'], rows: [
          ['"무료라서 워터마크가 박힌다"', '✕ 공식: <i>"CapCut itself does NOT automatically add a watermark."</i> 워터마크는 <b>템플릿 아웃트로</b> 때문입니다'],
          ['"생체정보를 수집한다"', '✕ 약관 전문에 "biometric"은 <b>한 번도 등장하지 않습니다</b>'],
          ['"내 영상 소유권을 가져간다"', '✕ 공식: <i>"We don\'t own your User Content."</i> (단, perpetual 라이선스 조항은 있음)'],
          ['"2026년 미국 매각으로 해결됐다"', '✕ <b>한국에는 적용되지 않습니다.</b> 한국 사용자는 여전히 ByteDance 싱가포르 법인과 계약합니다'],
          ['"교육청이 CapCut을 차단했다"', '△ <b>근거를 찾지 못했습니다. 단정하지 마세요.</b> 실질 위험은 <b>"학교 PC 방화벽에서 AI 기능(자동자막)이 차단될 수 있다"</b>입니다'],
        ] },
        {
          type: 'note', tone: 'danger', title: '실제로 위험한 것 3가지',
          body: [
            { type: 'p', text: '<b>① 음원 라이선스</b> — 내장 음원은 CapCut/TikTok 밖에서 쓸 수 없고, <b>비상업 소재가 하나만 섞여도 영상 전체가 비상업으로 묶입니다.</b>' },
            { type: 'p', text: '<b>② "사전 업로드" 조항</b> — 한국어 처리방침 원문상 <b>저장·게시 전에도 콘텐츠가 서버로 갈 수 있습니다.</b> "내보내기 안 했으니 안전하다"가 성립하지 않습니다. → <b>학생 얼굴 영상은 올리지 않는다</b>가 원칙.' },
            { type: 'p', text: '<b>③ 2026년 학운위 심의 의무</b> (초·중등교육법 29조의2) — CapCut은 법정대리인 동의 절차가 없어 필수기준을 충족하지 못합니다. 다만 <b>"교사가 학생 정보 처리 없이 단독 사용"은 명시적 예외</b> — 이것이 오늘 제시하는 <b>유일하게 안전한 모델</b>입니다.' },
          ],
        },
        { type: 'p', text: '<b>연령</b> — △ <b>수치를 단정하지 마세요.</b> 2026-07-31 재검증에서 한국 기준 최소 연령 원문을 확인하지 못했습니다. 사실 위험 없는 안내는 이것입니다 — <b>"CapCut은 계정 가입과 연령 제한이 있으므로, 교사 기기·교사 계정으로 편집하는 것을 원칙으로 한다."</b>' },
        { type: 'table', head: ['학교 상황', '1순위', '2순위', '근거'], rows: [
          ['<b>(A) 개인 노트북, 설치 자유</b>', '<b>Vrew</b> (무료 시작, 교육기관 20% 할인)', '곰믹스 평생 ₩43,000', 'Vrew는 한국어 텍스트 기반 편집으로 입문 장벽 최저'],
          ['<b>(B) 학교 PC, 설치 불가, 웹만</b>', '<b>Canva for Education</b> (교사 인증 시 프리미엄 무료)', 'Clipchamp 웹', '한국어 템플릿·폰트가 압도적. △ <b>CapCut 웹은 대안이 못 됩니다</b> — 차단은 보통 도메인 단위'],
          ['<b>(C) M365 교육계정</b>', '<b>Clipchamp</b> (A3/A5면 4K·자동자막·TTS 무료)', 'Canva for Education', '<b>A1이면 사용 불가</b> → 사전 확인 필수'],
          ['<b>(D) 구글 Workspace 교육계정</b>', '<b>Google Vids</b>', 'Canva for Education', 'Classroom 과제 직결. △ AI 기능은 18세 이상'],
          ['<b>(E) 인터넷 차단 심함</b>', '<b>Shotcut portable</b> (USB 배포 가능)', '곰믹스 평생권', '웹 도구는 전부 서버 통신 필수'],
        ] },
        {
          type: 'note', tone: 'ok', title: '연수 준비 필수 3항목',
          body: [
            { type: 'olist', items: [
              '<b>"CapCut 막히면 웹으로"는 통하지 않습니다.</b> 실제 대안은 Canva / Clipchamp / Google Vids입니다.',
              '<b>학교 M365가 A1인지 A3/A5인지 사전 확인</b>시키세요. A1이면 절반이 로그인에서 막힙니다.',
              '<b>자동자막은 반드시 연수장 네트워크에서 사전 테스트</b>하세요. 도구는 열리는데 자동자막만 실패하는 상황이 흔합니다.',
            ] },
          ],
        },
      ],
    },

    /* ───────────────────────── 6교시 ───────────────────────── */
    {
      id: 'd2-p6',
      period: '6교시',
      min: 15,
      title: '학생 지도 — 저작권 · 기록 · 대회 대응',
      summary: '프롬프트 기록은 대회 규정일 뿐 아니라 교육부 공식 방침',
      blocks: [
        { type: 'h', text: '6-1. 교사가 반드시 알아야 할 8가지' },
        { type: 'table', head: ['#', '사실', '실무 영향'], rows: [
          ['1', '<b>AI가 100% 생성한 산출물은 저작물로 인정·등록되지 않는다</b> (저작권법상 저작물 = "인간의 사상 또는 감정을 표현한 창작물")', '대회 출품은 가능. 다만 "학생 본인 창작"임을 입증하려면 <b>프롬프트·수정 과정 기록이 필수</b>'],
          ['2', '<b>Google Flow는 만 18세 이상만</b>', '초5~고2는 Flow를 직접 쓸 수 없다'],
          ['3', '<b>한국 Google 계정 최소 연령은 만 14세</b>', '초5~중1은 <b>학교 Workspace 계정이 사실상 유일한 합법 경로</b>'],
          ['4', '<b>CapCut 내장 음원은 개인·비상업 한정</b>', '대회 출품작·유튜브에 쓰면 약관 위반 소지'],
          ['5', '<b>Suno 무료는 Suno 소유 + 비상업 + 출처표시 의무</b>', '교사가 유료 계정으로 만들어 제공하거나, 크레딧에 "Music: Suno" 표기'],
          ['6', '<b>Flow 무료/Plus/Pro 영상엔 가시적 Veo 워터마크가 박힌다</b> (Ultra만 예외)', '심사위원 사전 고지 필요. <b>잘라내기 지도는 금물</b>'],
          ['7', '<b>모든 Google 생성물에 SynthID 비가시 워터마크가 들어간다</b>', 'Gemini에 업로드하면 AI 생성 여부 확인 가능. "사람이 만든 것처럼 속이는 행위"는 약관 위반'],
          ['8', '<b>교육부가 2026학년도부터 "AI 활용 과정 표기"를 공식화</b> (2025.12.23 발표)', '크레딧 표기와 프롬프트 로그는 선택이 아니라 <b>지도 사항</b>'],
        ] },
        {
          type: 'note', tone: 'ok', title: '이렇게 말씀하시면 통합니다',
          body: [{ type: 'p', text: '"프롬프트 기록은 <b>대회 규정일 뿐 아니라 교육부 공식 방침</b>입니다." 교육부 「수행평가 시 인공지능(AI) 활용 관리 방안」(2025.12.23, 2026학년도 적용) 원문: <i>"AI를 활용할 경우 출처 등 활용 과정을 명확히 표기하고 개인정보 입력 및 처리에 각별히 주의하도록 지도한다."</i>' }],
        },

        { type: 'h', text: '6-2. △ 대회 운영계획의 공백 2가지' },
        {
          type: 'note', tone: 'danger', title: '연수에서 참가 교사에게 반드시 공유하고, 주최 측에 문의할 사항',
          body: [
            { type: 'p', text: '<b>① 프롬프트 기록란이 양식에 없다</b> — 운영계획은 "생성형 AI 활용 과정(프롬프트 작성 및 개선 과정)을 <b>기획서에 포함하여 제출</b>한다"고 명시하는데, <b>제공된 기획서 양식(그룹A·B) 어디에도 프롬프트를 적을 칸이 없습니다.</b> → <b>아래 6-3의 별지 양식을 첨부</b>하도록 지도하거나, 주최 측에 양식 보완을 건의하세요.' },
            { type: 'p', text: '<b>② 참가자격과 연령 요건이 충돌한다</b> — 참가자격은 <b>초5(만 10~11세)</b>부터인데, 대회는 <b>Gemini 사용을 전제</b>합니다. 한국 Google 계정 최소 연령은 <b>만 14세</b>입니다. → <b>교육청 Workspace for Education 계정 제공 여부를 사전 확인</b>해야 합니다.' },
          ],
        },

        { type: 'h', text: '6-3. 프롬프트 기록 양식 (별지)' },
        { type: 'code', label: '표준 양식', text: `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  제1회 액션 플래닝 프로젝트 — AI 활용 기록지 (별지)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
참가번호 [      ]  성명 [      ]  학교/학년 [        ]

■ 사용한 AI 도구
  □ Google Gemini (이미지·아이디어)
  □ Google Flow/Veo (영상, 교사 지원)
  □ Suno (음악)   □ CapCut (편집)   □ 기타 [      ]

■ 장면/작업 이름: [                                  ]

┌─────┬──────────────────────┬──────────────────────┐
│ 회차 │ 내가 입력한 프롬프트 (그대로) │ 결과를 보고 든 생각 / 왜 고쳤나 │
├─────┼──────────────────────┼──────────────────────┤
│ 1차  │                      │                      │
├─────┼──────────────────────┼──────────────────────┤
│ 2차  │ (1차에서 바꾼 부분에 밑줄)  │                      │
├─────┼──────────────────────┼──────────────────────┤
│ 3차  │                      │                      │
├─────┼──────────────────────┼──────────────────────┤
│ 최종 │                      │ 최종 선택 이유:         │
└─────┴──────────────────────┴──────────────────────┘

■ AI가 한 일 / 내가 한 일 (꼭 나눠서 적으세요)
  · AI가 한 일 :
  · 내가 한 일 :
    (예: 이야기 구조 설계, 장면 순서 결정, 색감 재지정,
         대사 작성, 결과물 3개 중 선택, 컷 편집, 자막 작성)

■ 첨부  □ 1차 결과 캡처  □ 2차 결과 캡처  □ 최종 결과 캡처
        □ Gemini 대화 공유 링크 [                      ]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━` },
        { type: 'code', label: '초등 5~6학년용 간이 양식', text: `[ AI랑 이렇게 만들었어요 ]   이름 (        )

① 처음에 이렇게 부탁했어요
   "                                          "
   → 나온 그림이 (        )해서 마음에 안 들었어요.

② 그래서 이렇게 바꿔서 다시 부탁했어요
   "                                          "
   → 이번엔 (        )이 좋아졌어요.

③ 마지막으로 이렇게 했어요
   "                                          "
   → 이걸로 정한 이유:

④ 내가 직접 한 일은?
   □ 이야기 만들기  □ 장면 순서 정하기  □ 그림 고르기
   □ 대사 쓰기      □ 편집하기` },
        { type: 'h3', text: '★ 작성 예시 (교사 시범용)' },
        { type: 'table', head: ['회차', '프롬프트', '왜 고쳤나'], rows: [
          ['1차', '춘천 부래산 설화를 그림으로 그려줘', '서양 판타지풍이 나옴. 한국 전통 느낌이 전혀 없음'],
          ['2차', '(1차) + 조선시대 강원도 춘천, 장마철 흙탕물 강, 한복 입은 사람들, 수묵담채화 스타일', '분위기는 좋아졌으나 산이 너무 작게 나와 "떠내려온다"는 느낌이 안 남'],
          ['3차', '(2차 유지) + 극원경, 산이 화면의 2/3를 차지, 카메라는 물 가까이 낮게, 16:9', '원하는 구도. 다만 색이 탁함'],
          ['최종', '(3차 유지) + 황토색과 회색 위주, 흐린 하늘, 물보라에 은은한 빛', '채택. 이야기의 \'재난과 황당함\' 정서와 맞음'],
        ] },
        { type: 'p', text: '<b>내가 한 일</b>: 설화 원전을 한국민족문화대백과사전으로 확인 → 6개 장면으로 구조화 → 각 장면의 감정을 정하고 그에 맞는 색감·구도를 직접 지정 → 결과 12장 중 6장 선택 → 편집 순서 결정' },
        {
          type: 'note', tone: 'ok', title: '심사에서 점수를 받는 기록의 조건',
          body: [
            { type: 'p', text: '· A그룹: "구체적 명령어 및 <b>꼬리질문</b>으로 아이디어를 구체화했는가?" / "단순 출력 결과물을 복사·붙여넣기만 하지는 않았는가?"' },
            { type: 'p', text: '· B그룹: "답변 보완을 위해 <b>2차 이상의 개선 프롬프트</b> 과정을 거쳤는가?"' },
            { type: 'p', text: '→ <b>핵심은 "왜 고쳤나" 칸입니다.</b> 프롬프트만 나열하면 점수가 안 나옵니다. <b>판단의 근거</b>를 쓰게 하세요.' },
          ],
        },

        { type: 'h', text: '6-4. 학생용 \'하지 말아야 할 것\' 체크리스트 (배포용)' },
        { type: 'check', id: 'd2-student-1', title: '① 사람에 대한 것', items: [
          '친구·선생님·가족의 <b>얼굴 사진을 AI에 올리지 않기</b>',
          '연예인·유튜버·정치인의 <b>이름이나 얼굴을 넣지 않기</b>',
          '실제로 있는 사람이 <b>하지 않은 말·행동을 하는 영상 만들지 않기</b>',
          '<b>내 이름, 친구 이름, 학교 이름, 주소, 전화번호를 쓰지 않기</b> → 대신 "주인공", "○○마을", "산골 학교"',
        ] },
        { type: 'check', id: 'd2-student-2', title: '② 다른 사람이 만든 것', items: [
          '포켓몬·디즈니·짱구·산리오 같은 <b>유명 캐릭터를 만들어달라고 하지 않기</b>',
          '"○○ 캐릭터처럼", "○○ 작가 그림체로" 같은 <b>우회 표현도 안 됨</b>',
          '인터넷에서 찾은 <b>그림·사진을 AI에 올려서 바꾸지 않기</b>',
          '아는 노래의 <b>멜로디나 가사를 Suno에 넣지 않기</b>',
        ] },
        { type: 'check', id: 'd2-student-3', title: '③ 내용', items: [
          '무섭거나 <b>잔인한 장면</b>, <b>피·상처</b> 만들지 않기',
          '<b>야한 장면</b> 만들지 않기',
          '누군가를 <b>놀리거나 비웃는 내용</b> 만들지 않기',
          'AI가 "안 된다"고 할 때 <b>말을 바꿔서 몰래 통과시키려 하지 않기</b> → 계정이 정지될 수 있어요. <b>우리 반 계정 전체가 막힐 수도 있어요.</b>',
        ] },
        { type: 'check', id: 'd2-student-4', title: '④ 정직하게 · ⑤ 챙기기', items: [
          'AI로 만든 걸 <b>"내가 손으로 그렸다"고 말하지 않기</b>',
          '어떤 AI를 썼는지 <b>작품 끝에 꼭 적기</b>',
          '영상에 있는 <b>Veo 워터마크를 잘라내지 않기</b> (정상이에요!)',
          'AI가 알려준 <b>춘천 설화 내용이 진짜인지 책·자료로 확인하기</b> → <b>AI는 없는 이야기를 지어낼 때가 있어요</b>',
          '프롬프트를 <b>바꿀 때마다 기록지에 적기</b> (← 이게 점수예요!)',
        ] },
        { type: 'callout', text: '"실제 사람, 유명 캐릭터, 내 개인정보 — 이 셋은 안 넣는다."' },
      ],
    },
  ],

  limits: {
    title: '제한 사항',
    lead: '<b>Google Flow는 만 18세 이상만 사용할 수 있습니다.</b> 초5~고2 학생은 <b>누구도 Flow를 직접 쓸 수 없습니다.</b>',
    table: {
      head: ['학년', '만 나이', 'Google 계정 (만 14세)', 'Gemini (이미지)', 'Suno (만 13세)', 'CapCut (만 13세)', 'Flow/Veo (만 18세)'],
      rows: [
        ['초5~초6', '10~12', '✕ 개인계정 불가', '△ 학교 계정만', '✕', '✕', '✕'],
        ['중1', '12~13', '✕~△', '△ 학교 계정만', '✕~△', '✕~△', '✕'],
        ['중2~고2', '13~17', '○', '○', '△ 보호자 동의', '△ 보호자 동의', '✕'],
      ],
    },
    conclusion: '<b>그래서 대회는 이렇게 지도합니다.</b> ① <b>학생 = 기획 + 이미지 / 교사 = 영상화</b> — 학생이 스토리보드와 키프레임까지 만들고, 영상 변환은 교사가 시연·대행 ② <b>이미지만으로 완결</b> — 웹툰·디지털북 형식. 8컷 이미지 + 자막 + 페이지 넘김 ③ <b>교사 시연 후 학생 관찰 기록</b> — 심사 기준 "프롬프트 작성 및 개선 과정"에 직결됩니다.',
    privacy: [
      '<b>학생 얼굴 사진·영상을 AI 도구에 올리지 않는다.</b> CapCut은 저장·게시 전에도 콘텐츠가 서버로 갈 수 있습니다.',
      '<b>실명·학교명·주소를 프롬프트에 넣지 않는다.</b> "주인공", "○○마을"로 대체합니다.',
      '<b>Flow는 교사 계정으로만 운용</b>하고, 학생 가입을 유도하지 않습니다.',
    ],
  },

  instructorCheck: [
    '관할 교육청(강원특별자치도교육청·춘천교육지원청) <b>생성형 AI 활용 지침 공문</b> 확인',
    '학교/교육청 <b>Workspace for Education 계정</b>의 Gemini 활성화 여부 확인',
    '연수장 네트워크에서 <b>Flow · Suno · CapCut 접속 테스트</b> (학교망 차단 여부)',
    'CapCut 대안(Canva for Education / Vrew) <b>1개 백업 준비</b>',
    '<b>Flow 크레딧 단가</b> 설정에서 당일 확인 — Google이 "수시 변경" 명시',
    '<b>한국어 대사 성공률 5회 실측</b> — 공식 보증이 없음. 연수 만족도에 직결',
    '<b>클립 1개당 실제 생성 소요 시간</b> 측정 — 실습 타임테이블 역산용',
    '<b>학생 서약서</b>(딥페이크·개인정보·타인 초상 금지) 배포·수합',
    '<b>가정통신문</b>: 사용 도구 목록, 연령 요건, Suno·CapCut 보호자 동의, 개인정보 미입력 원칙',
    '춘천 설화 <b>원전 자료</b> 사전 확보 → <b>환각 대조용</b>',
  ],

  errata: {
    title: '2026-07-31 재검증으로 바로잡은 것 (정오표)',
    rows: [
      ['<b>Veo 대사 표기</b> (3-3 B)', '"큰따옴표를 쓰면 화면에 자막이 그려진다. 콜론(:)을 써라"', '✕ <b>틀림.</b> 공식 문서는 <i>"Use quotes for specific speech"</i> — <b><code>화자명: "대사"</code>가 공식 권장 형식</b>'],
      ['<b>미성년자 음성 미생성</b> (3-5)', '"Google 공식 명시"', '△ <b>원문 재확인 실패.</b> 실무 경험칙으로 격하. 단 대안(내레이터·자막)은 유효'],
      ['<b>CapCut 연령</b> (5-5)', '"한국 기준 만 14세"', '△ <b>약관 원문 확인 실패.</b> 수치 단정 금지 → "교사 계정으로 편집"으로 안내'],
    ],
    confirmed: [
      'Flow <b>만 18세 이상</b> — <i>"You must be 18 years of age or older."</i>',
      '크레딧 단가 전체 (Lite 10 / Fast 20 / Quality 100 / 무료 하루 50 / Pro 월 1,000)',
      '이미지 참조 슬롯 표 <b>숫자 6개 전부 정확</b>',
      'Suno 무료 = 비상업 + 출처표시 의무',
      '한국 Google 계정 <b>만 14세</b> — "Asia — South Korea: 14+"',
      'Flow 4대 기능 <b>전부 존재</b> (단 Extend는 8초·Lite 전용, Ingredients는 Quality 미지원)',
    ],
  },

  moreFolktales: {
    title: '춘천 설화 추가 목록 (줄거리 확보분)',
    note: '오늘 다루지 않았지만 학생 지도에 쓸 수 있는 설화입니다. 모두 <a href="https://wikigw.gwe.go.kr" target="_blank" rel="noopener">위키강원</a>에 원문이 있습니다.',
    rows: [
      ['등선폭포 — 효녀 승천 / 나무꾼과 선녀', '삼악산 등선폭포 (서면 덕두원리)', '★★★★☆', '「나무꾼과 선녀」는 전국 광포설화 — 춘천 고유성 약함'],
      ['퇴계동 무릉계 유래', '퇴계동·대룡산·학곡천', '★★★★☆', '반희언이 물길을 막는 이야기'],
      ['우양리 전설 (말하는 잉어와 물바다)', '서면 우양리, 고산, 눈늪', '★★★☆☆', '"잉어가 눈물을 흘리며 말한다" — 훅으로 강력'],
      ['장수못 / 아침못', '신북읍 유포리', '★★★☆☆', '장자못 유형 — 전국 광포설화'],
      ['좌방산(잣방산)과 덕쇠', '남면 좌방산', '★★★☆☆', ''],
      ['<s>부모 위해 송장을 삶은 효자</s>', '효자동·대룡산', '★★☆☆☆', '✕ <b>잔혹 — 초등 실습 비추천</b>'],
      ['<s>호인이 오면 흔들리는 고개(무작개)</s>', '신북읍 뜨내리재', '★☆☆☆☆', '✕ <b>초등 사용 금지 권고</b>'],
    ],
    warn: '<b>한국민족문화대백과사전 「춘천시」 항목에 제목만 나오고 줄거리가 없는 설화 20편</b>이 있습니다 (봉의산혈전, 옷바위, 칼봉, 죽림동 효녀 우례, 우두산 솟을묘, 비련의 쌍바위 등). "춘천에 이런 설화가 실재한다"는 근거로는 쓸 수 있으나, <b>줄거리는 반드시 별도 확인</b>해야 합니다.',
  },

  closing: [
    'AI는 한 컷만 만듭니다. 이야기는 편집이 만듭니다.',
    'Style + Subject는 복사·붙여넣기. Setting + Action + Composition만 갈아끼웁니다.',
    '얼굴이 살짝 달라진 것보다, 이야기가 지루한 게 훨씬 큰 문제입니다.',
  ],
  closingTail: '몰라도 만들 수 있습니다. <b>하지만 아는 만큼 보이고, 아는 만큼 기획할 수 있고, 아는 만큼 다듬을 수 있고, 아는 만큼 덜 실패합니다.</b>',
};
