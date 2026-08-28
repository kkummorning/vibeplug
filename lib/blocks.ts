export const categories = [
  "전체",
  "인증",
  "결제",
  "AI",
  "데이터",
  "협업",
  "인프라",
  "운영",
] as const;

export type Category = (typeof categories)[number];

export type Block = {
  slug: string;
  name: string;
  category: Exclude<Category, "전체">;
  summary: string;
  stack: string[];
  files: number;
  installs: string;
  rating: number;
  price: string;
  publisher: string;
  official?: boolean;
  badge?: "인기" | "신규" | "에디터 픽";
};

export const blocks: Block[] = [
  {
    slug: "auth-passkey",
    name: "패스키 인증",
    category: "인증",
    summary:
      "패스키 · 소셜 · 매직링크 로그인. 세션 회전과 디바이스 관리 화면까지 함께 들어옵니다.",
    stack: ["Next.js", "Drizzle", "Postgres"],
    files: 24,
    installs: "38.2k",
    rating: 4.9,
    price: "무료",
    publisher: "biblelo",
    official: true,
    badge: "인기",
  },
  {
    slug: "billing-stripe",
    name: "구독 결제",
    category: "결제",
    summary:
      "요금제, 업·다운그레이드, 비례 정산, 웹훅 멱등 처리. 인보이스 조회 UI 포함.",
    stack: ["Stripe", "Drizzle", "Postgres"],
    files: 31,
    installs: "24.7k",
    rating: 4.8,
    price: "₩49,000",
    publisher: "biblelo",
    official: true,
    badge: "에디터 픽",
  },
  {
    slug: "billing-toss",
    name: "토스페이먼츠 결제",
    category: "결제",
    summary:
      "국내 카드·간편결제·가상계좌. 부분 취소와 정산 리포트, 현금영수증 발급까지.",
    stack: ["TossPayments", "Prisma"],
    files: 27,
    installs: "9.1k",
    rating: 4.7,
    price: "₩59,000",
    publisher: "@hanbit",
  },
  {
    slug: "ai-rag",
    name: "문서 RAG 검색",
    category: "AI",
    summary:
      "업로드 → 청킹 → 임베딩 → 하이브리드 검색 → 근거 표시 스트리밍 답변까지 한 줄기로.",
    stack: ["Claude", "pgvector", "Postgres"],
    files: 42,
    installs: "31.5k",
    rating: 4.9,
    price: "₩79,000",
    publisher: "biblelo",
    official: true,
    badge: "인기",
  },
  {
    slug: "ai-agent-tools",
    name: "에이전트 툴 런너",
    category: "AI",
    summary:
      "툴 정의, 승인 게이트, 재시도, 실행 로그. 사람이 끼어들 수 있는 에이전트 루프.",
    stack: ["Claude", "Redis"],
    files: 19,
    installs: "6.8k",
    rating: 4.6,
    price: "₩69,000",
    publisher: "@paulkim",
    badge: "신규",
  },
  {
    slug: "realtime-chat",
    name: "실시간 채팅",
    category: "협업",
    summary:
      "채널, 스레드, 타이핑 표시, 읽음 처리, 첨부. 낙관적 업데이트까지 붙어 있습니다.",
    stack: ["Next.js", "Postgres", "SSE"],
    files: 36,
    installs: "17.3k",
    rating: 4.7,
    price: "₩39,000",
    publisher: "@sooyeon",
  },
  {
    slug: "team-workspace",
    name: "팀 · 권한 관리",
    category: "협업",
    summary:
      "조직, 멤버, 역할(RBAC), 초대 메일과 수락 플로우. 멀티테넌트 스코핑 포함.",
    stack: ["Next.js", "Drizzle", "Resend"],
    files: 33,
    installs: "21.0k",
    rating: 4.8,
    price: "무료",
    publisher: "biblelo",
    official: true,
  },
  {
    slug: "file-uploads",
    name: "파일 업로드",
    category: "인프라",
    summary:
      "presigned URL 직행 업로드, 이미지 리사이즈, 확장자 검증, 이어올리기 지원.",
    stack: ["S3", "Sharp"],
    files: 18,
    installs: "28.4k",
    rating: 4.8,
    price: "무료",
    publisher: "biblelo",
    official: true,
  },
  {
    slug: "audit-log",
    name: "감사 로그",
    category: "운영",
    summary:
      "누가 무엇을 언제 바꿨는지 자동 기록. 필터·내보내기가 되는 조회 화면 포함.",
    stack: ["Postgres", "Drizzle"],
    files: 14,
    installs: "11.9k",
    rating: 4.6,
    price: "₩29,000",
    publisher: "@jinu",
  },
  {
    slug: "feature-flags",
    name: "피처 플래그",
    category: "운영",
    summary:
      "퍼센트 롤아웃, 사용자 타게팅, 킬 스위치. 서버·클라이언트 양쪽에서 동일한 평가.",
    stack: ["Redis", "Next.js"],
    files: 16,
    installs: "13.6k",
    rating: 4.5,
    price: "₩29,000",
    publisher: "@dayoung",
  },
  {
    slug: "notifications",
    name: "통합 알림",
    category: "운영",
    summary:
      "인앱 · 이메일 · 웹푸시를 하나의 이벤트로. 사용자별 수신 설정과 다이제스트 묶음.",
    stack: ["Resend", "Web Push", "Postgres"],
    files: 29,
    installs: "15.2k",
    rating: 4.7,
    price: "₩39,000",
    publisher: "biblelo",
    official: true,
  },
  {
    slug: "search-fulltext",
    name: "전문 검색",
    category: "데이터",
    summary:
      "한국어 형태소 분석, 오타 보정, 하이라이트. 색인 재구축 잡까지 들어 있습니다.",
    stack: ["Postgres", "Typesense"],
    files: 21,
    installs: "8.4k",
    rating: 4.6,
    price: "₩49,000",
    publisher: "@minseo",
  },
  {
    slug: "analytics-events",
    name: "제품 분석 이벤트",
    category: "데이터",
    summary:
      "타입 안전한 이벤트 스키마, 배치 수집, 퍼널·리텐션 쿼리와 대시보드 한 장.",
    stack: ["ClickHouse", "Next.js"],
    files: 26,
    installs: "7.7k",
    rating: 4.5,
    price: "₩59,000",
    publisher: "@hanbit",
    badge: "신규",
  },
  {
    slug: "cron-jobs",
    name: "예약 작업",
    category: "인프라",
    summary:
      "크론 정의, 중복 실행 잠금, 실패 재시도, 실행 이력. 운영 화면에서 수동 실행도.",
    stack: ["Redis", "Next.js"],
    files: 15,
    installs: "10.5k",
    rating: 4.6,
    price: "무료",
    publisher: "biblelo",
    official: true,
  },
  {
    slug: "rate-limit",
    name: "레이트 리밋",
    category: "인프라",
    summary:
      "슬라이딩 윈도우 · 토큰 버킷, IP/사용자/API 키 단위. 프록시 한 줄로 적용.",
    stack: ["Redis", "Next.js"],
    files: 9,
    installs: "19.8k",
    rating: 4.8,
    price: "무료",
    publisher: "biblelo",
    official: true,
  },
  {
    slug: "webhooks-outbound",
    name: "아웃바운드 웹훅",
    category: "인프라",
    summary:
      "구독 관리, 서명, 지수 백오프 재시도, 전송 로그와 재전송 버튼까지.",
    stack: ["Postgres", "Redis"],
    files: 22,
    installs: "6.2k",
    rating: 4.7,
    price: "₩39,000",
    publisher: "@jinu",
  },
  {
    slug: "admin-panel",
    name: "관리자 콘솔",
    category: "운영",
    summary:
      "스키마에서 자동 생성되는 CRUD, 권한별 컬럼 마스킹, 대량 작업과 CSV 내보내기.",
    stack: ["Next.js", "Drizzle"],
    files: 45,
    installs: "12.1k",
    rating: 4.6,
    price: "₩69,000",
    publisher: "@sooyeon",
    badge: "에디터 픽",
  },
  {
    slug: "two-factor",
    name: "2단계 인증",
    category: "인증",
    summary:
      "TOTP 앱, 복구 코드, 신뢰 기기 기억. 민감 작업 재인증 훅을 함께 제공합니다.",
    stack: ["Next.js", "Drizzle"],
    files: 17,
    installs: "14.4k",
    rating: 4.8,
    price: "₩29,000",
    publisher: "@dayoung",
  },
  {
    slug: "api-keys",
    name: "API 키 발급",
    category: "인증",
    summary:
      "키 발급·회전·폐기, 스코프 지정, 해시 저장, 마지막 사용 시각 추적.",
    stack: ["Postgres", "Next.js"],
    files: 13,
    installs: "9.6k",
    rating: 4.7,
    price: "무료",
    publisher: "biblelo",
    official: true,
  },
  {
    slug: "data-export",
    name: "데이터 내보내기",
    category: "데이터",
    summary:
      "대용량 비동기 내보내기, 진행률 표시, 만료되는 다운로드 링크. GDPR 요청 대응.",
    stack: ["S3", "Postgres"],
    files: 20,
    installs: "5.3k",
    rating: 4.5,
    price: "₩39,000",
    publisher: "@minseo",
  },
];

export const stacks = [
  "Next.js",
  "Remix",
  "SvelteKit",
  "Nuxt",
  "Drizzle",
  "Prisma",
  "Postgres",
  "MySQL",
  "SQLite",
  "Redis",
  "Stripe",
  "TossPayments",
  "S3",
  "Resend",
  "Claude",
];
