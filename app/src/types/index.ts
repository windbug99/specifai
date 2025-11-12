// MVP 컨텍스트 고정값
export const MVP_CONTEXT = {
  requester: {
    role: "프로젝트 담당 PM",
    technical_knowledge: "중급", // 개발 용어 부분 이해
    company_size: "소규모"
  },
  developer: {
    role: "프리랜서 개발자",
    experience_years: 5,
    expertise: ["웹 개발", "풀스택"]
  },
  service: {
    country: "한국",
    language: "ko",
    timezone: "Asia/Seoul"
  }
} as const;

// 프로젝트 분석 결과 타입
export interface ProjectAnalysis {
  type: "ecommerce" | "community" | "saas" | "landing" | "other";
  complexity: "simple" | "medium" | "complex";
  estimatedQuestions: number;
  estimatedTime: string;
  keyFeatures: string[];
}

// 질문 옵션 타입
export interface QuestionOption {
  id: string;
  text: string;
  description: string;
  impact?: {
    dev_time_days: number;
    cost_krw: number;
  };
}

// 질문 타입
export interface Question {
  id: string;
  category: string;
  question: string;
  type: "single" | "multiple";
  options: QuestionOption[];
}

// 사용자 답변 타입
export interface UserAnswer {
  questionId: string;
  selectedOptions: string[];
}

// 프로젝트 상태 타입
export interface ProjectState {
  initialInput: string;
  analysis: ProjectAnalysis | null;
  currentStep: number;
  answers: UserAnswer[];
  specification: string;
}

// 명세서 섹션 타입
export interface SpecificationSection {
  title: string;
  content: string[];
}
