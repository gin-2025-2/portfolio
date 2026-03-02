import { Skill, Career, Project } from "@/types/cms";

export const mockSkills: Skill[] = [
    {
        category: "Frontend",
        items: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Vue.js"]
    },
    {
        category: "Design & Collaboration",
        items: ["Figma", "Git", "Responsive Design"]
    }
];

// In index.html, the "Summary" section contained a Project Summary Table.
// We will adapt that into a Career/Experience entry.
export const mockCareers: Career[] = [
    {
        id: "tesla-project",
        company: "Car Sharing Service Project", // Inferred context
        role: "Full Stack Developer (MVP)",
        period: "2025.08.01 - 2025.12.31 (5개월)",
        type: "B2B / Car Sharing / PWA",
        techStack: ["Next(React)", "Tailwind", "Node.js", "VS Code", "GitHub", "Vercel"],
        description: "Developed a next-generation EV car sharing management system (MVP)."
    },
    {
        id: "wordpress-news-site",
        company: "News Media Platform",
        role: "Full Stack Developer (유지보수 & 개발)",
        period: "2025.11.01 - 현재",
        type: "Headless CMS / News Service",
        techStack: ["Next.js", "React", "TypeScript", "Headless WordPress", "REST API", "ISR/SSG"],
        description: "Headless WordPress 기반 뉴스 플랫폼 운영 및 신기능 개발"
    }
];

export const mockProjects: Project[] = [
    {
        title: "차세대 전기차(Tesla) 카셰어링 관리 시스템 개발(MVP)",
        subtitle: "Next.js × PWA",
        description: "노트북 한 대로 풀스택을 끝까지 만들고, 실제 서비스 운영까지 경험했습니다. 0→1 풀스택 MVP 개발: 신규 서비스 기획 단계부터 참여해 프론트엔드 기반을 설계·구현했습니다.",
        tags: ["Next.js 15", "Tailwind CSS", "Shadcn UI", "Neon(PostgreSQL)", "Prisma", "Auth0"],
        achievements: [
            "Auth0 기반 인증 인프라 구축: Next.js(SSR) 환경에서 인증 컨텍스트 설계 및 보안 환경 설정",
            "운영 효율화를 위한 관리자 UI 개발: 권한 제어 및 CRUD용 재사용 모달/컴포넌트 구현",
            "DB 연동 안정화: Prisma & Neon(PostgreSQL) 연동 시 환경변수 캐시/SSL 이슈 해결",
            "렌더링 최적화: Hydration 오류 해결로 사용자 경험(UX) 개선"
        ]
    },
    {
        title: "Headless WordPress 기반 뉴스 플랫폼 유지보수 및 고도화",
        subtitle: "Next.js × Headless CMS",
        description: "기존 뉴스 사이트를 Headless WordPress + Next.js 아키텍처로 운영하면서, 지속적인 성능 최적화 및 신기능 개발을 담당했습니다. CMS와 프론트엔드 분리를 통해 콘텐츠 관리 효율성과 웹 성능을 동시에 확보했습니다.",
        tags: ["Next.js 14+", "React 19", "TypeScript", "WordPress REST API", "ISR/SSG", "SEO 최적화"],
        achievements: [
            "ISR(Incremental Static Regeneration) 도입: 콘텐츠 갱신 시간 5초 이내로 단축하여 실시간성 확보",
            "성능 최적화: Image Optimization & Code Splitting으로 Lighthouse Score 90+ 달성",
            "동적 라우팅 구현: 카테고리/태그별 페이지 자동 생성으로 SEO 강화 및 관리 번거로움 제거",
            "REST API 안정화: WordPress API 응답 캐싱 및 에러 처리로 서버 부하 30% 감소",
            "지속적 개선: 사용자 피드백 기반 UI/UX 개선 및 신규 섹션 개발"
        ]
    }
];
