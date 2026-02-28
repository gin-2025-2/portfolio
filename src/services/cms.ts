import { mockSkills, mockCareers, mockProjects } from "./mock-data";
import { resolve } from "path";
import _ from "lodash";

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const cmsService = {
    getSkills: async (locale: string) => {
        // await delay(500); // Simulate network latency
        // Use lodash to sort or filter if needed
        return mockSkills;
    },

    getCareers: async (locale: string) => {
        // await delay(500);
        return mockCareers;
    },

    getProjects: async (locale: string) => {
        // await delay(500);
        return mockProjects;
    },

    getIntroData: async (locale: string) => {
        // await delay(500);
        const introDataByLocale: Record<string, any> = {
            ko: {
                greeting: "안녕하세요,\n프론트엔드 개발자입니다",
                description: "사용자 경험을 중시한, 모던 웹 애플리케이션 개발",
                subDescription: "React, TypeScript, Tailwind CSS를 중심으로, 확장성과 유지보수성이 높은 프론트엔드를 구축합니다. 최신 기술을 학습하며 사용자에게 가치를 제공하는 것을 목표로 합니다."
            },
            en: {
                greeting: "Hello,\nI'm a Frontend Developer",
                description: "Building modern web applications with a focus on user experience",
                subDescription: "I specialize in React, TypeScript, and Tailwind CSS, creating frontend solutions with scalability and maintainability in mind. I aim to deliver value to users while continuously learning the latest technologies."
            }
        };

        return introDataByLocale[locale] || introDataByLocale.ko;
    }

};
