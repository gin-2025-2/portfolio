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
    }
];

export const mockProjects: Project[] = [
    {
        title: "차세대 전기차(Tesla) 카셰어링 관리 시스템 (MVP)2",
        subtitle: "Next.js × PWA",
        description: "노트북 한 대로 풀스택을 끝까지 만들고, 실제 서비스 운영까지 경험했습니다. 0→1 풀스택 MVP 개발: 신규 서비스 기획 단계부터 참여해 프론트엔드 기반을 설계·구현했습니다.",
        tags: ["Next.js 15", "Tailwind CSS", "Shadcn UI", "Neon(PostgreSQL)", "Prisma", "Auth0"],
        achievements: [
            "Auth0 기반 인증 인프라 구축: Next.js(SSR) 환경에서 인증 컨텍스트 설계 및 보안 환경 설정",
            "운영 효율화를 위한 관리자 UI 개발: 권한 제어 및 CRUD용 재사용 모달/컴포넌트 구현",
            "DB 연동 안정화: Prisma & Neon(PostgreSQL) 연동 시 환경변수 캐시/SSL 이슈 해결",
            "렌더링 최적화: Hydration 오류 해결로 사용자 경험(UX) 개선"
        ]
    }
];
