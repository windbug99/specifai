import { ProjectAnalysis } from "@/types";

// MVP용 간단한 키워드 기반 분석 (AI 대신)
export function analyzeProject(input: string): ProjectAnalysis {
  const lowerInput = input.toLowerCase();

  // 프로젝트 유형 분류
  let type: ProjectAnalysis["type"] = "other";
  const keyFeatures: string[] = [];

  if (
    lowerInput.includes("쇼핑몰") ||
    lowerInput.includes("이커머스") ||
    lowerInput.includes("판매") ||
    lowerInput.includes("상품")
  ) {
    type = "ecommerce";
    keyFeatures.push("쇼핑몰");
  } else if (
    lowerInput.includes("커뮤니티") ||
    lowerInput.includes("게시판") ||
    lowerInput.includes("소셜")
  ) {
    type = "community";
    keyFeatures.push("커뮤니티");
  } else if (
    lowerInput.includes("saas") ||
    lowerInput.includes("구독") ||
    lowerInput.includes("서비스")
  ) {
    type = "saas";
    keyFeatures.push("SaaS");
  } else if (
    lowerInput.includes("랜딩") ||
    lowerInput.includes("홍보") ||
    lowerInput.includes("소개")
  ) {
    type = "landing";
    keyFeatures.push("랜딩 페이지");
  }

  // 주요 기능 추출
  if (lowerInput.includes("회원") || lowerInput.includes("가입")) {
    keyFeatures.push("회원 관리");
  }
  if (lowerInput.includes("결제") || lowerInput.includes("구매")) {
    keyFeatures.push("결제 시스템");
  }
  if (lowerInput.includes("주문")) {
    keyFeatures.push("주문 관리");
  }
  if (lowerInput.includes("관리자")) {
    keyFeatures.push("관리자 페이지");
  }

  // 복잡도 추정 (기능 개수와 단어 수 기반)
  const wordCount = input.split(/\s+/).length;
  let complexity: ProjectAnalysis["complexity"] = "simple";

  if (keyFeatures.length > 3 || wordCount > 100) {
    complexity = "complex";
  } else if (keyFeatures.length > 1 || wordCount > 50) {
    complexity = "medium";
  }

  // 질문 개수 결정
  let estimatedQuestions = 15;
  if (complexity === "simple") {
    estimatedQuestions = 10;
  } else if (complexity === "complex") {
    estimatedQuestions = 20;
  }

  // 예상 시간
  const estimatedTime =
    complexity === "simple"
      ? "10-15분"
      : complexity === "medium"
      ? "15-20분"
      : "20-30분";

  return {
    type,
    complexity,
    estimatedQuestions,
    estimatedTime,
    keyFeatures,
  };
}

// 프로젝트 유형별 한글 이름
export function getProjectTypeName(
  type: ProjectAnalysis["type"]
): string {
  const typeNames = {
    ecommerce: "이커머스 (쇼핑몰)",
    community: "커뮤니티",
    saas: "SaaS",
    landing: "랜딩 페이지",
    other: "기타",
  };
  return typeNames[type];
}

// 복잡도별 한글 이름
export function getComplexityName(
  complexity: ProjectAnalysis["complexity"]
): string {
  const complexityNames = {
    simple: "단순",
    medium: "중간",
    complex: "복잡",
  };
  return complexityNames[complexity];
}
