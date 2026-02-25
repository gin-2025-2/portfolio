# 시스템 아키텍처 및 설계 문서 (System Architecture & Design)

이 문서는 본 프로젝트의 기술적 청사진을 정의합니다. Next.js 기반의 프론트엔드 애플리케이션과 헤드리스 CMS(WordPress)를 연동하는 전체 시스템의 구조와 원칙을 명시합니다.

## 1. 시스템 구성도 (System Composition)

전체 시스템은 다음과 같은 요소들로 구성됩니다:

```mermaid
graph TD
    Client[User Browser] -->|HTTP/HTTPS| CDN[Vercel Edge Network]
    CDN -->|Next.js App Router| App[Application Server (Node.js)]
    
    subgraph "Frontend Application"
        App -->|RSC Data Fetching| Service[Service Layer]
        Service -->|WPGraphQL Query| CMS[WordPress Headless CMS]
        Service -->|Image Optimization| Media[Media Storage]
    end

    subgraph "External Services"
        CMS
        Auth[Auth Service (Optional)]
    end
```

### 구성 요소 설명
- **Client (User Browser)**: 최종 사용자가 접속하는 환경. 반응형 웹(Responsive Web) 및 PWA 지원.
- **CDN (Vercel Edge)**: 정적 자산(JS, CSS, Images) 및 ISR(Incremental Static Regeneration) 캐시 제공.
- **Application Server (Next.js)**: 
  - **App Router**: 파일 시스템 기반 라우팅 및 서버 컴포넌트(Server Components) 처리.
  - **Middleware**: 국제화(i18n) 라우팅 및 보안 헤더 처리.
- **Service Layer**: 비즈니스 로직과 데이터 페칭을 담당하는 계층. 외부 API와의 직접적인 통신을 캡슐화.
- **Headless CMS (WordPress)**: 콘텐츠 관리 시스템. WPGraphQL 플러그인을 통해 데이터 제공.

## 2. 레이어 아키텍처 (Layered Architecture)

관심사의 분리(Separation of Concerns)를 위해 애플리케이션을 다음 3계층으로 구분합니다.

| 계층 (Layer) | 역할 (Responsibility) | 주요 구성 요소 (Components) | 기술 스택 |
|---|---|---|---|
| **Presentation Layer** | UI 렌더링, 사용자 인터랙션, 클라이언트 상태 관리 | `src/app`, `src/components`, `src/hooks` | React, Tailwind CSS, Framer Motion |
| **Service Layer** | 비즈니스 로직, 데이터 페칭/가공, 에러 핸들링 | `src/services`, `src/lib/utils` | TypeScript Async Functions |
| **Data Layer** | 원시 데이터 소스 제공, 스키마 정의 | `src/types`, CMS, Mock Data | WPGraphQL, Zod (Validation) |

### 상세 설명
1.  **Presentation Layer (View)**
    - **Server Components**: 페이지 레이아웃, 메타데이터, 초기 데이터 로딩.
    - **Client Components**: 인터랙티브 요소(버튼, 폼, 애니메이션). `use client` 지시어 사용.
    - **Pages**: `components/pages/home` 등 도메인별로 응집도 높게 구성.

2.  **Service Layer (Controller/Biz Logic)**
    - Presentation Layer가 Data Layer를 직접 호출하지 않도록 중개.
    - 예: `getProjects()` 함수는 CMS에서 원시 데이터를 받아와, View가 사용하기 좋은 형태(`Project[]`)로 변환하여 반환.
    - Mocking이 용이하여 백엔드 없이 프론트엔드 개발 가능.

3.  **Data Layer (Model)**
    - 데이터의 형태(Type) 정의.
    - WPGraphQL 쿼리 관리.

## 3. 개발 사상 및 원칙 (Development Principles)

### 3.1 Separation of Concerns (관심사의 분리)
- 뷰(View)는 어떻게 보여질지만 고민하고, 데이터가 어디서 오는지 알 필요가 없어야 합니다.
- 로직(Logic)은 UI 의존성 없이 순수 TypeScript 함수로 테스트 가능해야 합니다.

### 3.2 Progressive Enhancement (점진적 향상)
- **Core Content First**: 자바스크립트가 비활성화된 환경에서도 핵심 정보(텍스트, 이미지)는 볼 수 있어야 합니다. (SSR 기본 적용)
- **Rich Interaction**: JS가 로드되면 애니메이션, 인터랙티브 커서 등의 고급 기능이 활성화됩니다.

### 3.3 Type Safety (타입 안전성)
- "Any is Evil": `any` 타입 사용을 지양합니다.
- API 응답부터 컴포넌트 Props까지 데이터 흐름 전반에 걸쳐 타입을 보장하여 런타임 에러를 방지합니다.

### 3.4 Component-Driven Development (CDD)
- 작은 단위의 UI 컴포넌트(`components/common`)부터 개발하여 상향식으로 페이지를 조립합니다.
- 재사용성을 높여 유지보수 비용을 절감합니다.

## 4. 디렉토리 구조 (Directory Structure)

```
src/
├── app/                  # Next.js App Router (Routes)
│   ├── [locale]/         # i18n Routing
│   │   ├── layout.tsx    # Root Layout
│   │   ├── page.tsx      # Home Page
│   │   └── ...
│   └── globals.css       # Global Styles
├── components/           # React Components
│   ├── common/           # Atomic UI Components (Button, Card, etc.)
│   ├── layout/           # Structural Components (Header, Footer)
│   └── pages/            # Page-Specific Components
│       └── home/         # Home Page Module
├── services/             # Business Logic & Data Fetching (Service Layer)
│   └── cms.ts            # Content Management Service
├── lib/                  # Utilities
│   ├── utils.ts          # Helper Functions
│   └── i18n.ts           # Internationalization Config
├── types/                # TypeScript Definitions (Data Layer)
└── messages/             # i18n Translation Files (JSON)
```
