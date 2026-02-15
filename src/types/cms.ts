export interface Skill {
    category: "Frontend" | "Design & Collaboration" | "Backend" | "Tools";
    items: string[];
}

export interface Career {
    id: string; // Unique ID
    company: string;
    role: string;
    period: string;
    type: string; // e.g. "B2B", "B2C"
    techStack: string[];
    description?: string;
}

export interface Project {
    title: string;
    subtitle?: string; // e.g. "Next.js x PWA"
    description: string; // Can be a summary
    tags: string[];
    features?: string[]; // e.g. "Selling Point" details
    achievements?: string[]; // Bullet points
    image?: string;
    link?: string;
    github?: string;
}

export interface IntroData {
    greeting: string;
    description: string;
    subDescription?: string; // For the long text
}
