# 포트폴리오 마이그레이션 계획: 정적 HTML → Next.js + 헤드리스 CMS

이 계획은 기존의 단일 페이지 포트폴리오를 헤드리스 워드프레스(Headless WordPress)와 연동 가능한 확장성 있는 Next.js 애플리케이션으로 전환하는 과정을 설명합니다.

## 목표
- **마이그레이션**: `index.html`을 모듈화된 Next.js (App Router) 애플리케이션으로 전환
- **컴포넌트화**: 유지보수와 재사용성을 고려한 UI 컴포넌트 분리
- **아키텍처**: 서버 사이드 렌더링(SSR) 및 헤드리스 CMS(WordPress) 연동을 고려한 설계

## 사용자 검토 필요
> [!IMPORTANT]
> **CMS 전략**: 향후 WPGraphQL을 통한 워드프레스 연동을 가정합니다. 초기에는 WPGraphQL 스키마를 엄격히 따르는 **Mock 데이터**를 사용하여, 나중에 실제 CMS로 쉽게 전환할 수 있도록 합니다.
>
> **스타일링**: CDN 기반 Tailwind에서 Next.js 표준인 로컬 PostCSS/Tailwind 설정으로 변경합니다.
>
> **애니메이션**: 기존 바닐라 JS 스크롤 애니메이션은 React 생태계에 더 적합한 **Framer Motion**이나 React 기반 Intersection Observer로 대체합니다.

## 제안된 변경 사항

### 1. 시스템 설계 및 정의 (Architecture & Design)
코딩 전, 프로젝트의 청사진을 명확히 정의합니다. 별도의 설계 문서(`architecture.md`)를 산출물로 작성합니다.

- **시스템 구성도 (System Architecture)**:
  - 클라이언트(Next.js), CDN(Vercel Edge), CMS(WordPress), 미디어 스토리지 간의 데이터 흐름 시각화.
- **레이어 아키텍처 (Layered Architecture)**:
  - **Presentation Layer**: React Server/Client Components (`components/pages`)
  - **Service Layer**: Data Fetching & Business Logic (`services/cms.ts`)
  - **Data Layer**: Headless CMS (WPGraphQL), Mock Data
- **개발 사상 (Development Principles)**:
  - **"Separation of Concerns"**: 뷰와 로직의 철저한 분리.
  - **"Progressive Enhancement"**: JS 없이도 콘텐츠 열람 가능하도록 구성 (SSR).
  - **"Type Safety"**: API 응답부터 컴포넌트 Props까지 End-to-End 타입 보장.

### 2. 프로젝트 초기화 (인프라 및 라이브러리)
- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, PostCSS
- **Animation**: `framer-motion` (필수), `react-animated-cursor` (마우스 효과), **Aceternity UI** (고품질 트렌디 효과)
- **State/Utils**: `lodash` (데이터 처리), `zustand` (필요시 전역 상태)
- **i18n**: `next-intl` 미들웨어 설정 (한국어/영어 지원)
- **Testing**: `reg-suit` (VRT 리포트), `playwright` (E2E)

- **디렉토리 구조**:
  ```
  src/
    app/
      [locale]/        # 다국어 라우팅 (ko, en)
        layout.tsx     # 루트 레이아웃
        page.tsx       # 메인 페이지
      globals.css      # 전역 스타일
    components/
      common/          # 공통 UI 컴포넌트 (버튼, 카드 등 재사용 가능)
      pages/           # 페이지별 컴포넌트 모음
        home/          # 메인 페이지 전용 컴포넌트 (Intro, TechStack 등)
      layout/          # 헤더, 푸터
    services/          # 외부 데이터 연동 (Data Access Layer)
      cms.ts           # 워드프레스/Mock 데이터 페칭 함수
    lib/
      utils.ts         # 유틸리티 (clsx, tailwind-merge)
      i18n.ts          # 국제화 설정 (next-intl)
    messages/          # i18n 번역 파일 (en.json, ko.json)
    types/             # 콘텐츠용 TS 인터페이스
  ```

### 2. 컴포넌트 분리
`index.html`을 다음 컴포넌트들로 분리합니다:

#### `src/components/layout/`
- `Navbar.tsx`: 스무스 스크롤 링크가 포함된 고정 네비게이션.
- `Footer.tsx`: 저작권 및 소셜 링크.

#### `src/components/pages/home/` (메인 페이지 전용)
- `Intro.tsx`: (구 Hero) 최상단 자기소개 및 CTA 버튼 영역.
- `TechStack.tsx`: (구 Skills) 기술 스택 및 스킬 태그 목록.
- `CareerSummary.tsx`: (구 Summary) "경력 요약" 테이블.
- `ProjectList.tsx`: (구 Projects) 프로젝트 카드 리스트.
- `ContactArea.tsx`: 연락처 정보 영역.


### 3. 헤드리스 CMS 아키텍처 (데이터 전략)
워드프레스의 강점인 콘텐츠 관리와 Next.js의 렌더링 성능을 결합합니다.

#### 데이터 구조화 전략 (JSON vs HTML)
사용자 경험(애니메이션, 필터링)을 위해 **구조화된 데이터(JSON)**를 우선합니다.
- **Projects/Skills**: 단순 HTML 덩어리가 아닌, 개별 필드(제목, 설명, 태그 배열, 이미지 URL)로 받아와 React 컴포넌트(`Cannot simulate rich interaction with raw HTML`)에 매핑합니다.
- **포스트 본문(About 등)**: 워드프레스 에디터에서 작성된 **HTML 문자열**을 받아와 `html-react-parser` 등으로 안전하게 렌더링하거나, 필요한 경우 Tailwind 스타일을 적용합니다.

#### 데이터 페칭 및 가공 (`services/cms.ts`)
- **패턴**: **Service Layer** 패턴을 사용합니다. Next.js 서버 컴포넌트에서 비동기 함수를 직접 호출하는 방식입니다.
  - 리액트 서버 컴포넌트(RSC) 표준 패턴을 따르며, 불필요한 'API' 레이어를 거치지 않고 직접 데이터를 가져옵니다.
  - 예시: `export async function getProjects() { ... }`
- **역할**: WPGraphQL 호출 및 타입 안전한 데이터 반환.
- **Mock 데이터**: 초기에는 서비스 내부에서 JSON을 반환하도록 구현하여 백엔드 의존성을 제거합니다.

### 4. 고급 애니메이션 전략 (Interactive Web)
단순한 페이드인을 넘어 사용자와 상호작용하는 웹을 만듭니다.
- **마우스 인터랙션**: `react-animated-cursor`로 커스텀 커서 적용 (링크 호버 시 반응).
- **트렌디한 효과 (Aceternity UI 활용)**:
  - **Intro 섹션**: 'Background Beams' 또는 'Meteor Effect' 등으로 시선을 사로잡는 배경 구현.
  - **ProjectList**: 카드 호버 시 3D 틸트 효과나 글로우 효과 적용.
  - **Framer Motion**: 스크롤에 따른 부드러운 요소 등장 처리.

## 검증 계획

### 자동화 테스트 (VRT & E2E)
- **VRT (Visual Regression Testing)**:
  - 도구: `reg-suit` + `playwright` (또는 storycap)
  - 시나리오: 변경 전후의 스크린샷을 비교하여 HTML/CSS 구조 변경으로 인한 의도치 않은 UI 깨짐을 감지.
  - 리포트: S3 또는 로컬 스토리지에 결과 리포트 생성.
- **빌드 검증**: `npm run build`를 실행하여 타입 안전성 확인.

### 수동 검증
1.  **다국어 확인**: `/ko`, `/en` 진입 시 각각 번역된 텍스트 출력 확인.
2.  **시각적 회귀 테스트**: 로컬에서 `reg-suit` 실행 후 리포트 확인.
3.  **반응형 테스트**: 다양한 뷰포트에서 모바일 메뉴 및 그리드 레이아웃 확인.
4.  **CMS 시뮬레이션**: Mock 데이터 파일 수정 후 프론트엔드 반영 확인.
