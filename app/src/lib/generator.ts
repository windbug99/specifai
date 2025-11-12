import { ProjectState } from "@/types";
import { ECOMMERCE_QUESTIONS } from "./questions";
import { getProjectTypeName, getComplexityName } from "./analyzer";

// Markdown 명세서 생성
export function generateMarkdownSpec(projectState: ProjectState): string {
  if (!projectState.analysis) return "";

  const { analysis, initialInput, answers } = projectState;
  const date = new Date().toLocaleDateString("ko-KR");

  let md = `# 프로젝트 요구사항 명세서\n\n`;
  md += `**작성일**: ${date}\n`;
  md += `**작성 도구**: Specifai (AI 기반 요구사항 명세서 작성 플랫폼)\n\n`;
  md += `---\n\n`;

  // 1. 프로젝트 개요
  md += `## 1. 프로젝트 개요\n\n`;
  md += `### 1.1 프로젝트 정보\n`;
  md += `- **프로젝트 유형**: ${getProjectTypeName(analysis.type)}\n`;
  md += `- **복잡도**: ${getComplexityName(analysis.complexity)}\n`;
  md += `- **예상 개발 기간**: ${calculateEstimates(projectState).weeks}주 (${
    calculateEstimates(projectState).totalDays
  }일)\n`;
  md += `- **예상 개발 비용**: 약 ${(
    calculateEstimates(projectState).totalCost / 10000
  ).toFixed(0)}만원 (프리랜서 기준)\n\n`;

  md += `### 1.2 초기 요구사항\n`;
  md += `${initialInput}\n\n`;

  md += `---\n\n`;

  // 2. 핵심 기능
  md += `## 2. 핵심 기능 명세\n\n`;

  // 카테고리별로 그룹화
  const categorizedAnswers = groupByCategory(answers);

  Object.entries(categorizedAnswers).forEach(([category, categoryAnswers]) => {
    md += `### ${category}\n\n`;

    categoryAnswers.forEach((answer) => {
      const question = ECOMMERCE_QUESTIONS.find(
        (q) => q.id === answer.questionId
      );
      if (question) {
        md += `#### ${question.question}\n\n`;
        answer.selectedOptions.forEach((optId) => {
          const option = question.options.find((opt) => opt.id === optId);
          if (option) {
            md += `- **${option.text}**\n`;
            md += `  - ${option.description}\n`;
            if (option.impact && option.impact.dev_time_days > 0) {
              md += `  - 개발 시간: +${option.impact.dev_time_days}일\n`;
              md += `  - 예상 비용: +${(option.impact.cost_krw / 10000).toFixed(
                0
              )}만원\n`;
            }
          }
        });
        md += `\n`;
      }
    });
  });

  md += `---\n\n`;

  // 3. 기술 스택 (기본)
  md += `## 3. 기술 스택 권장사항\n\n`;
  md += `### Frontend\n`;
  md += `- **프레임워크**: Next.js 14 또는 React 18\n`;
  md += `- **스타일링**: Tailwind CSS\n`;
  md += `- **상태 관리**: React Context 또는 Zustand\n\n`;

  md += `### Backend\n`;
  md += `- **프레임워크**: Next.js API Routes 또는 Node.js + Express\n`;
  md += `- **데이터베이스**: PostgreSQL (Supabase 추천)\n`;
  md += `- **인증**: NextAuth.js 또는 Supabase Auth\n\n`;

  md += `### Deployment\n`;
  md += `- **호스팅**: Vercel (Frontend + API)\n`;
  md += `- **데이터베이스**: Supabase (Managed PostgreSQL)\n\n`;

  md += `---\n\n`;

  // 4. 다음 단계
  md += `## 4. 다음 단계\n\n`;
  md += `1. **개발자 선정**\n`;
  md += `   - 이 명세서를 기반으로 개발자 또는 외주사에게 견적 요청\n`;
  md += `   - 추천 플랫폼: 위시켓, 크몽, 프리모아\n\n`;

  md += `2. **상세 설계**\n`;
  md += `   - 화면 설계 (Wireframe, Mockup)\n`;
  md += `   - 데이터베이스 스키마 설계\n`;
  md += `   - API 설계\n\n`;

  md += `3. **개발 시작**\n`;
  md += `   - 애자일 방법론 적용 (2주 스프린트)\n`;
  md += `   - 주간 진행상황 리뷰\n`;
  md += `   - 중간 데모 및 피드백\n\n`;

  md += `---\n\n`;
  md += `**생성 도구**: [Specifai](https://specifai.com) - AI 기반 요구사항 명세서 작성 플랫폼\n`;

  return md;
}

// AI 프롬프트 생성
export function generateAIPrompt(projectState: ProjectState): string {
  if (!projectState.analysis) return "";

  const { analysis, initialInput, answers } = projectState;

  let prompt = `# AI 개발 지시사항 (Instruction Prompt)\n\n`;
  prompt += `이 프롬프트는 Cursor, Claude 등 AI 코딩 도구에서 바로 사용할 수 있도록 작성되었습니다.\n\n`;
  prompt += `---\n\n`;

  prompt += `## 프로젝트 개요\n\n`;
  prompt += `${initialInput}\n\n`;

  prompt += `## 프로젝트 정보\n`;
  prompt += `- 유형: ${getProjectTypeName(analysis.type)}\n`;
  prompt += `- 복잡도: ${getComplexityName(analysis.complexity)}\n`;
  prompt += `- 예상 개발 기간: ${
    calculateEstimates(projectState).weeks
  }주\n\n`;

  prompt += `## 요구사항\n\n`;

  const categorizedAnswers = groupByCategory(answers);

  Object.entries(categorizedAnswers).forEach(([category, categoryAnswers]) => {
    prompt += `### ${category}\n\n`;

    categoryAnswers.forEach((answer) => {
      const question = ECOMMERCE_QUESTIONS.find(
        (q) => q.id === answer.questionId
      );
      if (question) {
        prompt += `**${question.question}**\n`;
        answer.selectedOptions.forEach((optId) => {
          const option = question.options.find((opt) => opt.id === optId);
          if (option) {
            prompt += `- ${option.text}: ${option.description}\n`;
          }
        });
        prompt += `\n`;
      }
    });
  });

  prompt += `## 기술 스택\n\n`;
  prompt += `- Frontend: Next.js 14 + TypeScript + Tailwind CSS\n`;
  prompt += `- Backend: Next.js API Routes\n`;
  prompt += `- Database: Supabase (PostgreSQL)\n`;
  prompt += `- Authentication: Supabase Auth\n`;
  prompt += `- Deployment: Vercel\n\n`;

  prompt += `## 개발 지시사항\n\n`;
  prompt += `1. **프로젝트 구조**\n`;
  prompt += `   - Next.js 14 App Router 사용\n`;
  prompt += `   - 모든 컴포넌트는 TypeScript로 작성\n`;
  prompt += `   - Tailwind CSS로 스타일링\n`;
  prompt += `   - 반응형 디자인 적용 (모바일 우선)\n\n`;

  prompt += `2. **코드 품질**\n`;
  prompt += `   - ESLint + Prettier 설정\n`;
  prompt += `   - 타입 안정성 보장 (TypeScript strict mode)\n`;
  prompt += `   - 컴포넌트 재사용성 최대화\n`;
  prompt += `   - 명확한 주석 및 문서화\n\n`;

  prompt += `3. **보안**\n`;
  prompt += `   - 환경 변수로 민감한 정보 관리\n`;
  prompt += `   - SQL Injection 방지\n`;
  prompt += `   - XSS 방지\n`;
  prompt += `   - CSRF 토큰 사용\n\n`;

  prompt += `4. **성능**\n`;
  prompt += `   - 이미지 최적화 (Next.js Image)\n`;
  prompt += `   - 코드 스플리팅\n`;
  prompt += `   - 서버 사이드 렌더링 활용\n`;
  prompt += `   - 캐싱 전략\n\n`;

  prompt += `## 구현 순서\n\n`;
  prompt += `1. 프로젝트 초기 설정\n`;
  prompt += `2. 데이터베이스 스키마 설계 및 구현\n`;
  prompt += `3. 인증 시스템 구현\n`;
  prompt += `4. 핵심 기능 구현 (위 요구사항 참고)\n`;
  prompt += `5. UI/UX 개선\n`;
  prompt += `6. 테스트 및 디버깅\n`;
  prompt += `7. 배포\n\n`;

  prompt += `---\n\n`;
  prompt += `이 지시사항을 AI 코딩 도구(Cursor, Claude 등)에 입력하면, 자동으로 프로젝트를 생성하고 개발할 수 있습니다.\n`;

  return prompt;
}

// 카테고리별 그룹화
function groupByCategory(answers: ProjectState["answers"]) {
  const grouped: Record<string, typeof answers> = {};

  answers.forEach((answer) => {
    const question = ECOMMERCE_QUESTIONS.find((q) => q.id === answer.questionId);
    if (question) {
      if (!grouped[question.category]) {
        grouped[question.category] = [];
      }
      grouped[question.category].push(answer);
    }
  });

  return grouped;
}

// 예상 개발 기간 및 비용 계산
function calculateEstimates(projectState: ProjectState) {
  let totalDays = 20; // 기본 개발 기간
  let totalCost = 5000000; // 기본 비용 (500만원)

  projectState.answers.forEach((answer) => {
    const question = ECOMMERCE_QUESTIONS.find((q) => q.id === answer.questionId);
    answer.selectedOptions.forEach((optId) => {
      const option = question?.options.find((opt) => opt.id === optId);
      if (option?.impact) {
        totalDays += option.impact.dev_time_days;
        totalCost += option.impact.cost_krw;
      }
    });
  });

  const weeks = Math.ceil(totalDays / 7);

  return { totalDays, totalCost, weeks };
}
