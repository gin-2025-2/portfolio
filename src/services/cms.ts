import { mockSkills, mockCareers, mockProjects } from "./mock-data";
import { resolve } from "path";
import _ from "lodash";

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const cmsService = {
    getSkills: async () => {
        // await delay(500); // Simulate network latency
        // Use lodash to sort or filter if needed
        return mockSkills;
    },

    getCareers: async () => {
        // await delay(500);
        return mockCareers;
    },

    getProjects: async () => {
        // await delay(500);
        return mockProjects;
    },

    getIntroData: async () => {
        // await delay(500);
        return {
            greeting: "안녕하세요,\n프론트엔드 개발자입니다",
            description: "사용자 경험을 중시한, 모던 웹 애플리케이션 개발",
            subDescription: "React, TypeScript, Tailwind CSS를 중심으로, 확장성과 유지보수성이 높은 프론트엔드를 구축합니다. 최신 기술을 학습하며 사용자에게 가치를 제공하는 것을 목표로 합니다."
        };
    }

};
