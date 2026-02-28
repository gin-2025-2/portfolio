- [x] 1단계: 설계 및 아키텍처 (Architecture & Design)
  - [x] 기존 `index.html` 상세 분석 <!-- id: 100 -->
  - [x] 상세 구현 계획서 작성 (`implementation_plan.md`) <!-- id: 101 -->
  - [x] 시스템 아키텍처 문서 작성 (`architecture.md`) <!-- id: 102 -->
  - [x] 계획서 및 태스크 리스트 검토 저장 (`PLAN_ARCHITECTURE.md`, `PLAN_TASK.md`) <!-- id: 103 -->

- [/] 2단계: 프로젝트 초기화 (Infrastructure)
  - [/] 기존 파일 `legacy/` 폴더로 백업 <!-- id: 200 -->
  - [ ] Next.js 15+ 초기화 (App Router, TypeScript, Tailwind, ESLint) <!-- id: 201 -->
  - [ ] `tsconfig.json` (경로 별칭) 및 `next.config.ts` 설정 <!-- id: 202 -->
  - [ ] 핵심 의존성 설치 (`clsx`, `tailwind-merge`, `lodash`, `lucide-react`) <!-- id: 203 -->
  - [ ] 애니메이션 라이브러리 설치 (`framer-motion`) <!-- id: 204 -->
  - [ ] i18n 및 테스트 도구 설치 (`next-intl`, `reg-suit`, `playwright`) <!-- id: 205 -->
  - [ ] 전역 스타일 및 폰트 설정 (`globals.css`, `pretendard` 변수) <!-- id: 206 -->

- [ ] 3단계: 컴포넌트 마이그레이션 (Presentation Layer)
  - [ ] 레이아웃 구현 (네비게이션, 푸터 - 반응형 메뉴 포함) <!-- id: 300 -->
  - [ ] `Intro` 섹션 구현 (Aceternity UI 효과 + Framer Motion) <!-- id: 301 -->
  - [ ] `TechStack` 섹션 구현 (그리드 레이아웃, 호버 인터랙션) <!-- id: 302 -->
  - [ ] `CareerSummary` 섹션 구현 (반응형 테이블 컴포넌트) <!-- id: 303 -->
  - [ ] `ProjectList` 섹션 구현 (3D 카드 효과, 이미지 최적화) <!-- id: 304 -->
  - [ ] `ContactArea` 섹션 구현 (폼 UI) <!-- id: 305 -->

- [ ] 4단계: 서비스 및 데이터 레이어 (Business Logic)
  - [ ] TypeScript 인터페이스 정의 (`types/cms.ts`) <!-- id: 400 -->
  - [ ] Mock 데이터 구현 (`services/mock-data.ts`) <!-- id: 401 -->
  - [ ] 서비스 레이어 구현 (`services/cms.ts`) - 로대시 활용 데이터 가공 <!-- id: 402 -->
  - [ ] 서버 컴포넌트(`page.tsx`)와 서비스 레이어 연결 <!-- id: 403 -->

- [ ] 5단계: 통합 및 고도화 (Interactive Web)
  - [ ] `next-intl` 설정 (미들웨어, 메시지 JSON) <!-- id: 500 -->
  - [ ] 커스텀 커서 구현 (CSS + Framer Motion, 전역 적용) <!-- id: 501 -->
  - [ ] Framer Motion 스크롤 애니메이션 미세 조정 (Stagger, FadeIn) <!-- id: 502 -->

- [ ] 6단계: 검증 및 인계 (Verification & Handover)
  - [ ] `reg-suit` 설정 (시각적 회귀 테스트) <!-- id: 600 -->
  - [ ] 빌드 및 린트 체크 실행 <!-- id: 601 -->
  - [ ] 최종 수동 검토 (반응형, 다국어 전환 확인) <!-- id: 602 -->
