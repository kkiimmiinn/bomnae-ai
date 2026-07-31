/* 공통 자료 — 삽화 스타일 10종 · BGM 프롬프트 · 치트시트 · 출처 · 업로드 분류 */

/* ── 결과물 업로드 분류 ─────────────────────────────────── */
window.SECTIONS = [
  { id: 'notebook',   day: 1, label: '01 · 봄내 AI 노트북',      hint: 'Gemini Notebook 공유 링크 / 스튜디오 산출물' },
  { id: 'restore',    day: 1, label: '02 · 그때 그 자리',        hint: '복원 카드 · 포스터 · 카드뉴스' },
  { id: 'multilang',  day: 1, label: '03 · 다국어 카드',         hint: '한 / 영 / 말레이 소개 카드' },
  { id: 'webpage',    day: 1, label: '04 · 우리 웹페이지 ★',     hint: '배포된 URL — 1일차의 본체' },
  { id: 'form',       day: 1, label: '05 · 신청 폼',             hint: 'Apps Script 웹앱 URL · 시트 스크린샷' },
  { id: 'storyboard', day: 2, label: '06 · 8컷 스토리보드',      hint: '로그라인 + 3막 + 8컷 표' },
  { id: 'character',  day: 2, label: '07 · 스타일·캐릭터 기준',  hint: '스타일 블록 · 캐릭터 기준 이미지' },
  { id: 'keyframe',   day: 2, label: '08 · 8컷 키프레임',        hint: 'cut01~cut08 이미지' },
  { id: 'clip',       day: 2, label: '09 · Veo 클립',            hint: 'cut01~cut08 mp4' },
  { id: 'bgm',        day: 2, label: '10 · BGM',                 hint: 'Suno로 만든 설화 BGM' },
  { id: 'final',      day: 2, label: '11 · 완성 영상 ★',         hint: '30~60초 MP4 — 2일차의 본체' },
  { id: 'record',     day: 2, label: '12 · 프롬프트 기록지',     hint: 'AI 활용 기록지 (별지)' },
  { id: 'graveyard',  day: 0, label: '99 · 프롬프트 무덤',       hint: '실패한 프롬프트 1개 이상 — 실패도 자산입니다' },
  { id: 'etc',        day: 0, label: '기타',                     hint: '분류가 애매한 것' },
];

/* ── 삽화 스타일 10종 ───────────────────────────────────── */
window.STYLES = [
  {
    n: 9, star: true, name: '한국적 한지 수묵담채풍', en: 'Korean Hanji Ink & Light Color',
    img: 'assets/style-09-hanji.jpg',
    desc: '한지 질감·먹선·옅은 채색. <b>도깨비·전래·사계절 소재에 가장 강합니다.</b> 약간의 숙련이 필요하고, 예시 이미지를 함께 주면 결과가 좋아집니다.',
    prompt: '[배경]에서 [주인공]이 [행동]하고 있는 장면을, 한국적 한지 수묵담채 그림책 스타일로 그려줘. 먹선은 부드럽고 자연스럽게, 채색은 옅고 은은하게 얹어주고 한지의 따뜻한 질감이 느껴지게 해줘. 전통적인 분위기는 살리되 어린이 그림책처럼 친근하고 읽기 쉽게 표현해줘. 글자, 말풍선, 로고는 넣지 마.',
  },
  {
    n: 6, star: true, name: '종이 콜라주풍', en: 'Paper Cutout Collage',
    img: 'assets/style-06-collage.jpg',
    desc: '종이 질감과 겹친 레이어가 살아 있어 개성이 뚜렷합니다. <b>전래 느낌 재해석·자연·동물</b>에 좋고, 표지나 카드뉴스로도 확장됩니다.',
    prompt: '[배경]에서 [주인공]이 [행동]하고 있는 모습을, 색종이를 오리고 붙인 종이 콜라주 스타일로 표현해줘. 종이 질감과 겹쳐진 레이어, 부드러운 그림자가 보이게 하고 형태는 단순하고 귀엽게 정리해줘. 전체 분위기는 따뜻하고 손으로 만든 그림책처럼 보여줘. 글자, 말풍선, 로고는 넣지 마.',
  },
  {
    n: 4, star: true, name: '과슈 그림책풍', en: 'Matte Gouache Storybook',
    img: 'assets/style-04-gouache.jpg',
    desc: '색면이 안정적이고 질감이 좋습니다. 수채화보다 형태가 또렷하고 플랫보다 감성이 풍부해 <b>모험·판타지·감성 설화</b>에 잘 맞습니다.',
    prompt: '[배경]에서 [주인공]이 [행동]하고 있는 장면을 그려줘. 매트한 과슈 그림책 스타일로, 색은 부드럽지만 또렷하게, 붓질의 질감이 은은하게 느껴지게 해줘. 형태는 둥글고 안정감 있게, 전체 분위기는 따뜻하고 세련된 그림책 삽화처럼 표현해줘. 글자, 말풍선, 로고는 넣지 마.',
  },
  {
    n: 10, star: true, name: '시네마틱 판타지 그림책풍', en: 'Cinematic Fantasy Picture Book',
    img: 'assets/style-10-cinematic.jpg',
    desc: '몰입감이 커서 <b>표지·클라이맥스 컷</b>에 적합합니다. 신비롭되 어린이 그림책답게 과하게 어둡지 않도록 조절하는 것이 핵심입니다. <i>(회전문 벼락 장면에 권합니다)</i>',
    prompt: '[배경]에서 [주인공]이 [행동]하고 있는 장면을 그려줘. 어린이 판타지 그림책의 인상적인 한 장면처럼, 부드러운 영화적 조명과 깊이감 있는 배경으로 표현해줘. 신비롭고 몰입감 있게 보이되 무섭거나 지나치게 어둡지 않게, 희망적이고 따뜻한 분위기를 유지해줘. 글자, 말풍선, 로고는 넣지 마.',
  },
  {
    n: 1, name: '수채화 동화풍', en: 'Soft Watercolor Storybook',
    img: 'assets/style-01-watercolor.jpg',
    desc: '가장 대중적이고 <b>실패 확률이 가장 낮습니다.</b> 맑은 번짐·여백·따뜻한 정서. 확신이 없으면 이걸로 시작하세요.',
    prompt: '[배경]에서 [주인공]이 [행동]하고 있는 장면을 그려줘. 부드러운 수채화 그림책 느낌으로, 물감이 맑게 번지고 색이 은은하게 스며들게 해줘. 형태는 단순하지만 감정은 잘 드러나게, 전체 분위기는 따뜻하고 포근한 어린이 그림책처럼 표현해줘. 글자, 말풍선, 로고는 넣지 마.',
  },
  {
    n: 2, name: '플랫 벡터 그림책풍', en: 'Clean Flat Vector Storybook', video: true,
    img: 'assets/style-02-flatvector.jpg',
    desc: '형태가 단순해 초보자가 안정적으로 결과를 얻습니다. <b>캐릭터 일관성 유지에 가장 유리</b>해 8컷 시리즈에 좋습니다.',
    prompt: '[배경]에서 [주인공]이 [행동]하고 있는 모습을 그려줘. 깔끔한 플랫 벡터 그림책 스타일로, 형태는 단순하고 명확하게 정리하고 색은 밝고 산뜻하게 표현해줘. 화면은 복잡하지 않게, 어린이가 보기 쉽고 이해하기 쉬운 그림책 삽화처럼 구성해줘. 글자, 말풍선, 로고는 넣지 마.',
  },
  {
    n: 3, name: '셀 애니메이션풍', en: 'Clean Cel Animation', video: true,
    img: 'assets/style-03-cel.jpg',
    desc: '또렷한 선과 깔끔한 채색. <b>장면을 반복 생성할 때 안정적</b>이라 컷이 많은 영상에 유리합니다.',
    prompt: '[배경]에서 [주인공]이 [행동]하고 있는 장면을 그려줘. 깔끔한 2D 셀 애니메이션 스타일로, 윤곽선은 또렷하고 채색은 단순하고 선명하게 해줘. 표정과 동작은 생생하게, 전체 분위기는 친근하고 경쾌한 어린이 그림책 삽화처럼 표현해줘. 글자, 말풍선, 로고는 넣지 마.',
  },
  {
    n: 5, name: '색연필·크레용풍', en: 'Colored Pencil & Crayon',
    img: 'assets/style-05-pencil.jpg',
    desc: '손그림의 친근함과 따뜻함. <b>저학년 지도용</b>으로 특히 좋습니다. 지나치게 거칠지 않게 정돈하는 것이 관건입니다.',
    prompt: '[배경]에서 [주인공]이 [행동]하고 있는 모습을 그려줘. 색연필과 크레용으로 그린 듯한 손그림 질감을 살리되, 전체 완성도는 정돈된 어린이 그림책 삽화처럼 표현해줘. 선은 부드럽고 약간의 질감이 느껴지게, 색은 포근하고 따뜻하게 해줘. 글자, 말풍선, 로고는 넣지 마.',
  },
  {
    n: 8, name: '파스텔 잉크 라인풍', en: 'Pastel Ink Line',
    img: 'assets/style-08-pastelink.jpg',
    desc: '잉크 선의 또렷함과 파스텔 채색의 부드러움이 균형을 이룹니다. 인쇄 가독성이 높아 <b>차분한 서사</b>에 안정적입니다.',
    prompt: '[배경]에서 [주인공]이 [행동]하고 있는 장면을 그려줘. 얇고 부드러운 잉크 선 위에 파스텔 톤으로 은은하게 채색한 그림책 스타일로 표현해줘. 형태는 또렷하지만 색은 부드럽고 차분하게, 전체 분위기는 맑고 따뜻한 어린이 그림책처럼 보여줘. 글자, 말풍선, 로고는 넣지 마.',
  },
  {
    n: 7, name: '입체 카툰 3D풍', en: 'Stylized 3D Cartoon',
    img: null,
    desc: '아이들 선호도가 가장 높습니다. 둥글고 말랑한 입체감이 장점이며, <b>장면 간 일관성은 참조 이미지가 있어야</b> 안정적입니다. <i>(예시 이미지는 원본에서 가져오지 못했습니다)</i>',
    prompt: '[배경]에서 [주인공]이 [행동]하고 있는 장면을 만들어줘. 둥글고 말랑한 입체 3D 카툰 스타일로, 표면은 부드럽고 색은 선명하게, 조명은 따뜻하고 친근하게 표현해줘. 애니메이션 영화의 한 장면처럼 완성도 있게 보이되, 어린이 그림책에 어울리도록 과하게 사실적이지 않게 해줘. 글자, 말풍선, 로고는 넣지 마.',
  },
];
window.STYLES_NOTE = '이 10종 가이드는 「[원격연수] 동화책 만들기」 자료에서 가져와 설화 영상용으로 다시 정리한 것입니다. 예시 이미지도 같은 자료의 것입니다.';

/* ── Suno BGM 프롬프트 7종 ──────────────────────────────── */
window.BGM_PROMPTS = [
  {
    n: '①', name: '기본형 — 설화의 시작, 옛날 옛적에',
    style: 'korean traditional, cinematic, mysterious and ancient, solo gayageum,\ndistant daegeum bamboo flute, soft janggu pulse, sparse arrangement,\nreverb-drenched, 70 BPM, instrumental',
    exclude: 'vocals, singing, humming, choir, chanting, drums, electric guitar, synth',
  },
  {
    n: '②', name: '호수·안개 — 춘천 물의 이미지 (의암호·소양강)',
    style: 'cinematic ambient, korean traditional, serene and misty,\nsustained gayageum ostinato, soft string pad, water-like shimmer,\nvery sparse, pedal point, spacious wide reverb, 60 BPM, instrumental',
    exclude: 'vocals, humming, choir, percussion, drums, brass, big drops',
    use: '나레이션이 깔리는 구간. 멜로디가 앞으로 나서지 않아 말소리를 덮지 않습니다.',
  },
  {
    n: '③', name: '긴장·등장 — 상사뱀·이무기·전설의 존재',
    style: 'cinematic korean traditional, dark and ominous, low janggu pulse,\ntaepyeongso wail, string tremolo, building crescendo, dissonance,\ndry and punchy, 90 BPM, instrumental',
    exclude: 'vocals, humming, chanting, pop drums, synth pads, cheerful melody',
  },
  {
    n: '④', name: '프록시 보강형 — 가야금·대금이 무시될 때',
    style: 'korean traditional folk, cinematic, haunting, plucked zither,\nbamboo flute, low frame drum, pentatonic melody, sparse,\nspacious reverb, 65 BPM, instrumental',
    exclude: 'vocals, singing, humming, chanting, brass, synth, electric guitar',
  },
  {
    n: '⑤', name: '결말·여운 — 엔딩 카드',
    style: 'korean traditional, cinematic, warm and bittersweet, solo gayageum,\nsoft string pad, rubato, gentle fade, tape saturation,\n60 BPM, instrumental',
    exclude: 'vocals, humming, percussion, drums',
  },
  {
    n: '⑥', name: '밝은 전래동화 톤 — 저학년용',
    style: 'korean traditional, storybook, gentle and curious, light gayageum plucks,\nsoft bamboo flute, wooden percussion, playful pentatonic melody,\nwarm and clean mix, 85 BPM, instrumental',
    exclude: 'vocals, singing, humming, dark, ominous, heavy drums, distortion',
  },
  {
    n: '⑦', star: true, name: '나레이션 전용 언더스코어 — 가장 실용적',
    style: 'cinematic ambient, korean traditional, calm and mysterious,\nsustained gayageum drone, faint daegeum, extremely sparse, pedal point,\nunobtrusive background music, clean mix, 60 BPM, instrumental',
    exclude: 'vocals, singing, humming, choir, drums, percussion, brass,\nlead melody, big drops, sudden changes',
  },
];

/* ── 치트시트 ───────────────────────────────────────────── */
window.CHEATSHEETS = [
  {
    day: 1, group: 'Gemini Notebook', items: [
      { label: '노트북 4대 원칙', text: '소스 조직 : 카테고리 5개 이상으로 접기\n소스 증식 : 좌측 「웹에서 새 소스를 검색하세요」 + Fast Research\n검증 질문 : 소스에 없는 것을 물어 「자료에 없다」고 답하는지 확인\n배포      : 공유 → 링크가 있는 모든 사용자 → 링크 복사' },
    ],
  },
  {
    day: 1, group: 'Canva', items: [
      { label: '복원·재현·규격·표기', text: '복원 : 캔바 AI → 흑백 사진 선택 → "컬러로 바꿔줘"\n재현 : 매직미디어 → [시대] + [장소] + [구체적 사물] + 「글자는 넣지 마」\n규격 : 비교카드 1200×900 / 카드뉴스 1080×1350 / 포스터 A3 300dpi PDF\n표기 : "출처: ○○ · 공공누리 제1유형 · AI로 색을 복원한 이미지입니다"' },
    ],
  },
  {
    day: 1, group: '다국어 카드', items: [
      { label: '배경 생성 (글자 없이)', text: '[장소]의 [시간대] 풍경, 미니멀한 일러스트,\n[색1]과 [색2] 톤, 상단에 글자를 넣을 여백을 넉넉히,\n글자는 넣지 마.' },
      { label: '되번역 검증', text: '이 영어 문장을 다시 한국어로 번역해 줘.\n원래 내가 쓴 문장과 뜻이 달라진 부분이 있으면 알려 줘.' },
    ],
  },
  {
    day: 1, group: 'Stitch', items: [
      { label: '웹페이지 생성 뼈대', text: 'Create a single-page website for [용도].\nTitle: [제목]\nSections in this order: [섹션을 번호로 나열]\nStyle: [분위기], [주색 HEX] as primary, [강조색 HEX] as accent,\n[배경색 HEX] as background. Korean text. Mobile first, responsive.' },
    ],
  },
  {
    day: 1, group: 'Apps Script', items: [
      { label: '자주 쓰는 한 줄', text: "SpreadsheetApp.openById(SHEET_ID).getSheetByName('신청')   // 시트 열기\nsheet.appendRow([값1, 값2, 값3]);                          // 줄 추가\nsheet.getDataRange().getValues().slice(1)                  // 전체 읽기(머리글 제외)\nUtilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy-MM-dd HH:mm')\nMailApp.sendEmail(받는사람, 제목, 본문);\nMailApp.getRemainingDailyQuota()                           // 남은 메일 한도\nPropertiesService.getScriptProperties().getProperty('KEY') // 비밀 값" },
    ],
  },
  {
    day: 2, group: '이미지 (Gemini)', items: [
      { label: '컷 조립 뼈대', text: 'create an image of ...          ← 이 말로 시작해야 텍스트 답변이 안 옴\n\n--- STYLE LOCK ---              ← 매 컷 그대로 복사\n--- CHARACTER ---               ← 매 컷 그대로 복사\nSHOT n / [샷] [앵글] [장소] [동작]  ← 이것만 교체\n16:9.' },
      { label: '부분 수정 (인페인팅)', text: 'Using the provided image, change only the [X] to [Y].\nKeep everything else in the image exactly the same, preserving\nthe original style, lighting, and composition.' },
    ],
  },
  {
    day: 2, group: '영상 (Veo / Flow)', items: [
      { label: '이미지 → 영상 (움직임만!)', text: '[카메라 움직임]. The subject [동작]. [환경 변화].\nAmbient noise: [배경 소리].' },
      { label: '텍스트 → 영상 (5요소)', text: '[Cinematography] + [Subject] + [Action] + [Context] + [Style & Ambiance]' },
      { label: '부정 프롬프트', text: 'text overlay, subtitles, watermark, logo, distorted hands,\nextra fingers, warped face, sudden cut, camera shake,\nmodern buildings, cars, power lines' },
    ],
  },
  {
    day: 2, group: '음악 (Suno)', items: [
      { label: 'Style / Exclude 뼈대', text: 'Style:   korean traditional, cinematic, [무드], [악기 2~3],\n         sparse, [프로덕션 태그], [BPM], instrumental\nExclude: vocals, singing, humming, choir, drums' },
    ],
  },
  {
    day: 2, group: '편집 (CapCut)', items: [
      { label: '조립 7단계', text: '1. 클립을 대본 순서대로 배치 (틈 없이)\n2. 모든 클립 앞 0.3초 / 뒤 0.5초 트리밍   ← ★ 가장 효과 큰 습관\n3. AI 생성 오디오 전부 음소거 (대사 컷만 예외)\n4. BGM을 처음부터 끝까지 한 트랙으로\n5. 자막 얹기 (흰 굵은 고딕 + 검정 외곽선 2~4px)\n6. 전체에 같은 필터 1개 (색 통일)\n7. 내보내기 1080P / 30fps / Higher' },
    ],
  },
];

/* ── 출처 ───────────────────────────────────────────────── */
window.SOURCES = [
  {
    group: 'Google 공식', items: [
      ['Gemini API — Image generation', 'https://ai.google.dev/gemini-api/docs/image-generation', '참조 이미지 슬롯 표, 멀티턴 권장, 편집 템플릿'],
      ['DeepMind — Gemini Image prompt guide', 'https://deepmind.google/models/gemini-image/prompt-guide/', '이름 붙이기, 프롬프트 5요소'],
      ['Google Cloud — Ultimate prompting guide for Nano Banana', 'https://cloud.google.com/blog/products/ai-machine-learning/ultimate-prompting-guide-for-nano-banana', '4대 원칙'],
      ['Best practices for Veo on Vertex AI', 'https://docs.cloud.google.com/vertex-ai/generative-ai/docs/video/best-practice', '이미지→영상 4대 원칙'],
      ['Google Cloud — Ultimate prompting guide for Veo 3.1', 'https://cloud.google.com/blog/products/ai-machine-learning/ultimate-prompting-guide-for-veo-3-1', '5요소 공식'],
      ['Manage your Google Flow credits', 'https://support.google.com/flow/answer/16526234', '크레딧 단가표'],
      ['Get started with Flow', 'https://support.google.com/flow/answer/16353333', '연령 제한, 실패 시 환불'],
      ['Quotas for Google Services — Apps Script', 'https://developers.google.com/apps-script/guides/services/quotas', '메일 한도 100 / 1,500'],
      ['Apps Script 웹앱 배포 가이드', 'https://developers.google.com/apps-script/guides/web', ''],
      ['Apps Script 트리거 종류', 'https://developers.google.com/apps-script/guides/triggers', 'onMailReceived 미존재 근거'],
      ['Google 계정 최소 연령', 'https://support.google.com/accounts/answer/1350409', '한국 만 14세'],
      ['Google AI Studio', 'https://aistudio.google.com', ''],
      ['Google Stitch', 'https://stitch.withgoogle.com', ''],
    ],
  },
  {
    group: '춘천 자료·설화', items: [
      ['위키강원', 'https://wikigw.gwe.go.kr', '강원도교육청 교육연구원 운영. 설화 원문 최다'],
      ['한국민족문화대백과사전 「춘천시」', 'https://encykorea.aks.ac.kr/Article/E0058016', ''],
      ['춘천시 관광포털 — 전설·설화', 'http://tour.chuncheon.go.kr/contents.do?cid=1b641076812b45abb310cc0649721520', ''],
      ['청평사 공식 — 공주와 상사뱀', 'http://cheongpyeongsa.co.kr/bbs/content.php?co_id=1040&tabs=2', ''],
      ['지역N문화 — 청평사 원나라 공주와 상사뱀', 'https://ncms.nculture.org/traditional-stories/story/209', ''],
    ],
  },
  {
    group: '영상 기획·편집', items: [
      ['StudioBinder — What is a Logline?', 'https://www.studiobinder.com/blog/what-is-a-logline/', ''],
      ['StudioBinder — How Many Acts Are in a Movie?', 'https://www.studiobinder.com/blog/how-many-acts-are-in-a-movie/', ''],
      ['StudioBinder — Guide to Camera Shots', 'https://www.studiobinder.com/blog/types-of-camera-shots-sizes-in-film/', ''],
      ["StudioBinder — Walter Murch's Rule of Six", 'https://www.studiobinder.com/blog/walter-murch-rule-of-six/', '감정 51% / 연속성 4%'],
      ['Adobe — L cuts and J cuts', 'https://www.adobe.com/creativecloud/video/post-production/cuts-in-film/l-and-j-cut.html', ''],
      ['이채영, 「설화의 현대적 계승 및 변주 양상과 의미 고찰」, 『동학학보』 66호(2023)', '', '재해석 기준'],
    ],
  },
  {
    group: '저작권·정책·약관', items: [
      ['공공누리', 'https://www.kogl.or.kr', '유형별 이용 조건'],
      ['교육부 「수행평가 시 인공지능(AI) 활용 관리 방안」 (2025.12.23)', 'https://www.moe.go.kr/boardCnts/viewRenew.do?boardID=294&boardSeq=104984&lev=0&m=020402', '2026학년도 적용'],
      ['Suno Terms of Service', 'https://suno.com/terms', '2026-03-26 개정, 무료/유료 소유권'],
      ['Suno Pricing', 'https://suno.com/pricing', ''],
      ['CapCut 공식 헬프센터', 'https://www.capcut.com/help', '프로젝트 설정, 내보내기, 오류코드'],
    ],
  },
];

/* ── 두 날을 잇는 지점 ──────────────────────────────────── */
window.BRIDGE = [
  { n: '①', from: '1일차 · 봄내 AI 챗봇', to: '2일차 · 설화 원전 확인 자료 조사 도구' },
  { n: '②', from: '1일차 · 복원한 옛 사진', to: '2일차 · 이미지 생성의 참조 자료 (실제 춘천 풍경)' },
  { n: '③', from: '2일차 · 완성한 영상', to: '1일차 · 배포한 웹페이지에 올라감' },
];

/* ── 오늘 만든 것이 실제로 쓰이는 곳 ───────────────────── */
window.PROJECT_INFO = {
  name: 'CCAI 프로젝트 운영을 위한 강사·지도교사 역량 강화 연수',
  date: '2026. 8. 1.(토) ~ 8. 2.(일)',
  dateShort: '8. 1. ~ 8. 2.',
  dateSub: '토 · 일 · 1박 2일',
  venue: '속초 라마다호텔',
  org: '2026 CCAI 융합인재양성사업 · 춘천교육지원청',
  target: 'CCAI 프로젝트 운영 강사·지도교사',
};

/* ── 강의 자료 원본 ─────────────────────────────────────── */
window.MATERIALS = [
  {
    kind: 'pdf', icon: 'doc',
    title: '강사용 액션 플랜 (전체 교안)',
    sub: '이틀치 커리큘럼 전문 · 207쪽 · 20.2MB',
    href: 'assets/docs/bomnae-ai-action-plan.pdf',
    download: '봄내 AI — 강사용 액션 플랜.pdf',
    desc: '연수에서 다루는 내용을 한 파일로 묶은 교안입니다. 내려받아 두면 인터넷 없이도 볼 수 있습니다.',
  },
  {
    kind: 'notion', icon: 'book',
    title: 'DAY 1 강의 자료 원본 (노션)',
    sub: '춘천을 담는 그릇 — AI로 만드는 지역 콘텐츠와 웹페이지',
    href: 'https://fate-moustache-ba0.notion.site/AI-6H-3aeb48c2e51b811ab13df6feca02dd02?pvs=73',
    desc: '1일차 원본입니다. 이 사이트의 DAY 1 페이지와 같은 내용이고, 노션에서 바로 검색·복사할 수 있습니다.',
  },
  {
    kind: 'notion', icon: 'book',
    title: 'DAY 2 강의 자료 원본 (노션)',
    sub: '춘천 설화 × AI 영상 제작',
    href: 'https://choinssam.notion.site/AI-6H-3ae452af4f1281c89abbcb525c99d383',
    desc: '2일차 원본입니다. 삽화 스타일 예시 이미지와 프롬프트가 함께 들어 있습니다.',
  },
  {
    kind: 'notebook', icon: 'search',
    title: '제미나이 노트북 — 연수 자료 검색',
    sub: '자료 전체를 소스로 넣어 둔 노트북',
    href: 'https://notebook.google.com/notebook/566d7b04-7709-4b3e-82f7-28faed6635d4',
    desc: '궁금한 것을 물으면 <b>연수 자료 안에서만</b> 답하고 각주를 붙여 줍니다. '
        + '「캔바 복원은 어떻게 하죠?」처럼 물어보세요. 1교시에서 만드는 「봄내 AI」와 같은 방식입니다.',
  },
];
