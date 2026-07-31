/* ══ 백엔드 설정 ═══════════════════════════════════════════
   이 파일 한 개만 고치면 저장 위치가 바뀝니다.

   'local' — 내 PC의 Node 서버 (uploads 폴더 + data/db.json)
   'gas'   — Google Apps Script 웹앱 (내 구글 드라이브 + 스프레드시트)
             GitHub Pages에 올릴 때는 이쪽입니다.
   ═════════════════════════════════════════════════════════ */

window.CCAI_CONFIG = {

  /* 'local' 또는 'gas' */
  backend: 'gas',

  /* backend: 'gas' 일 때만 씁니다.
     Apps Script → 배포 → 새 배포 → 웹 앱 에서 받은 주소.
     (실행 = 나 / 액세스 = 모든 사용자)
     코드를 고치면 배포 → 배포 관리 → 새 버전 → 배포 를 해야 반영됩니다. */
  gasUrl: 'https://script.google.com/macros/s/AKfycbznvCFEXccVMDVAl5lt0KA9Ac_Qf5algyCozoIERhxsdVq4zHBAQoF86Nx2srF6GLjn/exec',

  /* 업로드 폼에 표시할 최대 용량 안내 (실제 제한은 백엔드가 정합니다) */
  maxFileMB: 400,
};
