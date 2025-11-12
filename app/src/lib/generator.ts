import { ProjectState } from "@/types";
import { ECOMMERCE_QUESTIONS } from "./questions";
import { getProjectTypeName, getComplexityName } from "./analyzer";

// Markdown 명세서 생성
export function generateMarkdownSpec(projectState: ProjectState): string {
  if (!projectState.analysis) return "";

  const { analysis, initialInput, answers } = projectState;
  const date = new Date().toLocaleDateString("ko-KR");

  let md = `# 프로젝트 요구사항 명세서\n\n`;
  md += `**문서 버전**: 1.0\n`;
  md += `**작성일**: ${date}\n`;
  md += `**프로젝트 유형**: ${getProjectTypeName(analysis.type)}\n\n`;
  md += `---\n\n`;

  // 1. 프로젝트 개요
  md += `## 1. 프로젝트 개요\n\n`;
  md += `### 1.1 프로젝트 목적\n`;
  md += `${initialInput}\n\n`;

  md += `### 1.2 프로젝트 범위\n`;
  md += `본 문서는 ${getProjectTypeName(analysis.type)} 프로젝트의 요구사항을 정의합니다. `;
  md += `${getComplexityName(analysis.complexity)} 복잡도의 프로젝트로 분류되며, `;
  md += `아래 명시된 기능 요구사항과 비기능 요구사항을 포함합니다.\n\n`;

  md += `---\n\n`;

  // 2. 기능 요구사항
  md += `## 2. 기능 요구사항 (Functional Requirements)\n\n`;

  const categorizedAnswers = groupByCategory(answers);
  const functionalReqs = buildFunctionalRequirements(categorizedAnswers);

  let reqId = 1;
  Object.entries(functionalReqs).forEach(([category, features]) => {
    md += `### 2.${reqId} ${category}\n\n`;

    features.forEach((feature, idx) => {
      md += `#### FR-${reqId}.${idx + 1} ${feature.title}\n\n`;
      md += `**설명**: ${feature.description}\n\n`;

      if (feature.details && feature.details.length > 0) {
        md += `**세부 요구사항**:\n`;
        feature.details.forEach((detail) => {
          md += `- ${detail}\n`;
        });
        md += `\n`;
      }
    });

    reqId++;
  });

  md += `---\n\n`;

  // 3. 비기능 요구사항
  md += `## 3. 비기능 요구사항 (Non-Functional Requirements)\n\n`;

  const nonFunctionalReqs = buildNonFunctionalRequirements(categorizedAnswers);

  if (nonFunctionalReqs.ui.length > 0) {
    md += `### 3.1 UI/UX 요구사항\n\n`;
    nonFunctionalReqs.ui.forEach((req, idx) => {
      md += `**NFR-1.${idx + 1}**: ${req}\n\n`;
    });
  }

  if (nonFunctionalReqs.performance.length > 0) {
    md += `### 3.2 성능 요구사항\n\n`;
    nonFunctionalReqs.performance.forEach((req, idx) => {
      md += `**NFR-2.${idx + 1}**: ${req}\n\n`;
    });
  }

  if (nonFunctionalReqs.security.length > 0) {
    md += `### 3.3 보안 요구사항\n\n`;
    nonFunctionalReqs.security.forEach((req, idx) => {
      md += `**NFR-3.${idx + 1}**: ${req}\n\n`;
    });
  }

  md += `---\n\n`;

  // 4. 시스템 환경
  md += `## 4. 시스템 환경\n\n`;
  md += `### 4.1 권장 기술 스택\n\n`;
  md += `**Frontend**\n`;
  md += `- 프레임워크: Next.js 14 또는 React 18\n`;
  md += `- 스타일링: Tailwind CSS\n`;
  md += `- 상태 관리: React Context 또는 Zustand\n\n`;

  md += `**Backend**\n`;
  md += `- 프레임워크: Next.js API Routes 또는 Node.js + Express\n`;
  md += `- 데이터베이스: PostgreSQL\n`;
  md += `- 인증: NextAuth.js 또는 JWT 기반 인증\n\n`;

  md += `**Deployment**\n`;
  md += `- 호스팅: Vercel, AWS, 또는 동등한 서비스\n`;
  md += `- 데이터베이스: Supabase, AWS RDS, 또는 동등한 서비스\n\n`;

  md += `### 4.2 개발 환경\n`;
  md += `- 버전 관리: Git\n`;
  md += `- 코드 품질: ESLint, Prettier\n`;
  md += `- 타입 검사: TypeScript\n\n`;

  md += `---\n\n`;

  // 5. 제약사항 및 가정
  md += `## 5. 제약사항 및 가정\n\n`;
  md += `### 5.1 제약사항\n`;
  md += `- 본 명세서에 명시되지 않은 기능은 프로젝트 범위에 포함되지 않습니다.\n`;
  md += `- 개발 범위 변경 시 별도 협의가 필요합니다.\n`;
  md += `- 외부 서비스(결제, 인증 등) 연동 시 해당 서비스의 정책을 준수해야 합니다.\n\n`;

  md += `### 5.2 가정사항\n`;
  md += `- 개발에 필요한 외부 API 키 및 계정은 발주자가 제공합니다.\n`;
  md += `- 서버 및 데이터베이스 호스팅 비용은 별도입니다.\n`;
  md += `- 디자인 가이드 또는 시안이 제공되지 않을 경우 기본 디자인으로 진행합니다.\n\n`;

  md += `---\n\n`;

  // 6. 향후 확장 가능성
  const outOfScope = buildOutOfScopeFeatures(categorizedAnswers);
  if (outOfScope.length > 0) {
    md += `## 6. 현재 범위 제외 항목\n\n`;
    md += `다음 기능들은 현재 프로젝트 범위에 포함되지 않으며, 향후 추가 개발이 가능합니다:\n\n`;
    outOfScope.forEach((feature) => {
      md += `- ${feature}\n`;
    });
    md += `\n`;
    md += `---\n\n`;
  }

  // Footer
  md += `## 문서 이력\n\n`;
  md += `| 버전 | 작성일 | 작성자 | 변경 내용 |\n`;
  md += `|------|--------|--------|----------|\n`;
  md += `| 1.0 | ${date} | Specifai | 초안 작성 |\n\n`;

  md += `---\n\n`;
  md += `*본 문서는 [Specifai](https://specifai.com)를 통해 생성되었습니다.*\n`;

  return md;
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

// 기능 요구사항 빌드
function buildFunctionalRequirements(categorizedAnswers: Record<string, ProjectState["answers"]>) {
  const functionalReqs: Record<string, Array<{ title: string; description: string; details: string[] }>> = {};

  Object.entries(categorizedAnswers).forEach(([category, categoryAnswers]) => {
    // UI/UX, 기술/성능, 기타 카테고리는 비기능 요구사항으로 분류
    if (category === "UI/UX" || category === "기술/성능" || category === "기타") {
      return;
    }

    functionalReqs[category] = [];

    categoryAnswers.forEach((answer) => {
      const question = ECOMMERCE_QUESTIONS.find((q) => q.id === answer.questionId);
      if (!question) return;

      const selectedOptions = answer.selectedOptions
        .map((optId) => question.options.find((opt) => opt.id === optId))
        .filter((opt) => opt !== undefined);

      if (selectedOptions.length === 0) return;

      // 질문을 기능 제목으로 변환
      const title = question.question.replace(/을|를|는|은|가|이|\?/g, "").trim();

      // 선택된 옵션들을 설명과 세부사항으로 변환
      const description = selectedOptions.map((opt) => opt?.text).join(", ");
      const details = selectedOptions.map((opt) => opt?.description || "");

      functionalReqs[category].push({
        title,
        description,
        details: details.filter((d) => d !== ""),
      });
    });
  });

  return functionalReqs;
}

// 비기능 요구사항 빌드
function buildNonFunctionalRequirements(categorizedAnswers: Record<string, ProjectState["answers"]>) {
  const nonFunctionalReqs = {
    ui: [] as string[],
    performance: [] as string[],
    security: [] as string[],
  };

  // UI/UX 카테고리
  if (categorizedAnswers["UI/UX"]) {
    categorizedAnswers["UI/UX"].forEach((answer) => {
      const question = ECOMMERCE_QUESTIONS.find((q) => q.id === answer.questionId);
      if (!question) return;

      answer.selectedOptions.forEach((optId) => {
        const option = question.options.find((opt) => opt.id === optId);
        if (option) {
          if (question.question.includes("디자인")) {
            nonFunctionalReqs.ui.push(`디자인 스타일: ${option.text}`);
          } else if (question.question.includes("반응형")) {
            nonFunctionalReqs.ui.push(`${option.text} - ${option.description}`);
          }
        }
      });
    });
  }

  // 기술/성능 카테고리
  if (categorizedAnswers["기술/성능"]) {
    categorizedAnswers["기술/성능"].forEach((answer) => {
      const question = ECOMMERCE_QUESTIONS.find((q) => q.id === answer.questionId);
      if (!question) return;

      answer.selectedOptions.forEach((optId) => {
        const option = question.options.find((opt) => opt.id === optId);
        if (option) {
          if (question.question.includes("사용자")) {
            nonFunctionalReqs.performance.push(`예상 사용자 규모: ${option.text}`);
          }
        }
      });
    });
  }

  // 회원가입 방식에서 보안 요구사항 추출
  if (categorizedAnswers["회원관리"]) {
    categorizedAnswers["회원관리"].forEach((answer) => {
      const question = ECOMMERCE_QUESTIONS.find((q) => q.id === answer.questionId);
      if (question && question.question.includes("회원가입")) {
        answer.selectedOptions.forEach((optId) => {
          const option = question.options.find((opt) => opt.id === optId);
          if (option && option.text.includes("소셜")) {
            nonFunctionalReqs.security.push("소셜 로그인 OAuth 2.0 보안 표준 준수");
          } else if (option && option.text.includes("이메일")) {
            nonFunctionalReqs.security.push("비밀번호 암호화 저장 (bcrypt 또는 동등한 수준)");
          }
        });
      }
    });
  }

  // 결제 관련 보안 요구사항
  if (categorizedAnswers["주문/결제"]) {
    categorizedAnswers["주문/결제"].forEach((answer) => {
      const question = ECOMMERCE_QUESTIONS.find((q) => q.id === answer.questionId);
      if (question && question.question.includes("결제")) {
        nonFunctionalReqs.security.push("결제 정보 암호화 전송 (HTTPS/TLS)");
        nonFunctionalReqs.security.push("PG사 보안 표준 준수");
      }
    });
  }

  return nonFunctionalReqs;
}

// 범위 제외 항목 빌드
function buildOutOfScopeFeatures(categorizedAnswers: Record<string, ProjectState["answers"]>) {
  const outOfScope: string[] = [];

  // 모든 질문을 확인하여 선택되지 않은 주요 기능 찾기
  ECOMMERCE_QUESTIONS.forEach((question) => {
    const answer = Object.values(categorizedAnswers)
      .flat()
      .find((a) => a.questionId === question.id);

    if (!answer) return;

    // 선택되지 않은 옵션들 중 주요 기능들만 추출
    question.options.forEach((option) => {
      if (!answer.selectedOptions.includes(option.id)) {
        // 주요 기능만 제외 항목에 포함
        if (
          option.text.includes("소셜 로그인") ||
          option.text.includes("재고 관리") ||
          option.text.includes("옵션 관리") ||
          option.text.includes("쿠폰") ||
          option.text.includes("리뷰") ||
          option.text.includes("찜하기") ||
          option.text.includes("관리자")
        ) {
          outOfScope.push(option.text);
        }
      }
    });
  });

  return [...new Set(outOfScope)]; // 중복 제거
}
