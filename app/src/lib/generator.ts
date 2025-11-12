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

// 기능 요구사항 빌드 - 질의응답을 실제 요구사항 문서 형식으로 변환
function buildFunctionalRequirements(categorizedAnswers: Record<string, ProjectState["answers"]>) {
  const functionalReqs: Record<string, Array<{ title: string; description: string; details: string[] }>> = {};

  // 회원관리 요구사항 구성
  if (categorizedAnswers["회원관리"]) {
    functionalReqs["회원관리"] = buildMemberRequirements(categorizedAnswers["회원관리"]);
  }

  // 상품관리 요구사항 구성
  if (categorizedAnswers["상품관리"]) {
    functionalReqs["상품관리"] = buildProductRequirements(categorizedAnswers["상품관리"]);
  }

  // 주문/결제 요구사항 구성
  if (categorizedAnswers["주문/결제"]) {
    functionalReqs["주문/결제"] = buildOrderRequirements(categorizedAnswers["주문/결제"]);
  }

  // 부가기능 요구사항 구성
  if (categorizedAnswers["부가기능"]) {
    functionalReqs["부가기능"] = buildAdditionalRequirements(categorizedAnswers["부가기능"]);
  }

  // 관리자 요구사항 구성
  if (categorizedAnswers["관리자"]) {
    functionalReqs["관리자"] = buildAdminRequirements(categorizedAnswers["관리자"]);
  }

  return functionalReqs;
}

// 회원관리 요구사항 구성
function buildMemberRequirements(answers: ProjectState["answers"]) {
  const requirements: Array<{ title: string; description: string; details: string[] }> = [];

  answers.forEach((answer) => {
    const question = ECOMMERCE_QUESTIONS.find((q) => q.id === answer.questionId);
    if (!question) return;

    const selectedOptions = answer.selectedOptions
      .map((optId) => question.options.find((opt) => opt.id === optId))
      .filter((opt) => opt !== undefined);

    if (question.question.includes("회원가입")) {
      const hasEmail = selectedOptions.some(opt => opt?.text.includes("이메일"));
      const hasSocial = selectedOptions.some(opt => opt?.text.includes("소셜"));

      if (hasEmail && hasSocial) {
        requirements.push({
          title: "회원 가입 및 인증",
          description: "이메일 기반 회원가입과 소셜 로그인을 모두 지원하는 통합 인증 시스템",
          details: [
            "이메일 주소를 사용한 회원가입 기능",
            "비밀번호 암호화 저장 및 검증",
            "이메일 인증을 통한 계정 활성화",
            "소셜 로그인 연동 (카카오, 네이버, 구글 등)",
            "소셜 계정과 이메일 계정 통합 관리"
          ]
        });
      } else if (hasSocial) {
        requirements.push({
          title: "소셜 로그인 기반 회원 인증",
          description: "간편한 소셜 로그인을 통한 회원 인증 시스템",
          details: [
            "소셜 계정을 통한 간편 가입 및 로그인",
            "OAuth 2.0 프로토콜 기반 인증",
            "소셜 플랫폼별 API 연동 (카카오, 네이버, 구글, 애플 등)",
            "사용자 프로필 정보 자동 연동"
          ]
        });
      } else {
        requirements.push({
          title: "이메일 기반 회원 관리",
          description: "이메일 주소를 사용한 기본 회원가입 및 로그인 시스템",
          details: [
            "이메일과 비밀번호를 사용한 회원가입",
            "비밀번호 암호화 및 안전한 저장",
            "이메일 인증을 통한 본인 확인",
            "로그인 세션 관리",
            "비밀번호 찾기 및 재설정 기능"
          ]
        });
      }
    }
  });

  // 기본 회원 정보 관리 기능
  requirements.push({
    title: "회원 정보 관리",
    description: "사용자의 개인정보 조회 및 수정 기능",
    details: [
      "회원 프로필 정보 조회",
      "개인정보 수정 (이름, 연락처, 주소 등)",
      "비밀번호 변경",
      "회원 탈퇴 기능"
    ]
  });

  return requirements;
}

// 상품관리 요구사항 구성
function buildProductRequirements(answers: ProjectState["answers"]) {
  const requirements: Array<{ title: string; description: string; details: string[] }> = [];
  let hasCategory = false;
  let hasInventory = false;
  let hasOptions = false;
  let hasSearch = false;
  let searchType = "basic";

  answers.forEach((answer) => {
    const question = ECOMMERCE_QUESTIONS.find((q) => q.id === answer.questionId);
    if (!question) return;

    const selectedOptions = answer.selectedOptions
      .map((optId) => question.options.find((opt) => opt.id === optId))
      .filter((opt) => opt !== undefined);

    if (question.question.includes("상품 등록")) {
      hasCategory = selectedOptions.some(opt => opt?.text.includes("카테고리"));
      hasInventory = selectedOptions.some(opt => opt?.text.includes("재고"));
      hasOptions = selectedOptions.some(opt => opt?.text.includes("옵션"));
    } else if (question.question.includes("검색")) {
      const searchOpt = selectedOptions[0];
      if (searchOpt?.text.includes("고급")) {
        hasSearch = true;
        searchType = "advanced";
      } else if (searchOpt?.text.includes("키워드")) {
        hasSearch = true;
        searchType = "basic";
      }
    }
  });

  // 상품 기본 관리
  const basicDetails = [
    "상품명, 가격, 설명, 대표 이미지 등 기본 정보 등록",
    "상품 이미지 다중 업로드 지원",
    "상품 정보 수정 및 삭제",
    "상품 공개/비공개 상태 관리"
  ];

  if (hasCategory) {
    basicDetails.push("상품 카테고리 분류 및 관리");
  }
  if (hasInventory) {
    basicDetails.push("상품별 재고 수량 관리");
    basicDetails.push("품절 상태 자동 표시");
  }
  if (hasOptions) {
    basicDetails.push("상품 옵션 관리 (색상, 사이즈 등)");
    basicDetails.push("옵션별 가격 및 재고 관리");
  }

  requirements.push({
    title: "상품 정보 관리",
    description: "상품의 등록, 수정, 삭제 및 관련 정보 관리",
    details: basicDetails
  });

  // 상품 조회 및 목록
  const listDetails = [
    "전체 상품 목록 조회",
    "상품 상세 정보 조회",
    "상품 썸네일 및 이미지 표시"
  ];

  if (hasCategory) {
    listDetails.push("카테고리별 상품 목록 조회");
  }

  requirements.push({
    title: "상품 조회",
    description: "사용자가 상품 정보를 확인할 수 있는 기능",
    details: listDetails
  });

  // 상품 검색
  if (hasSearch) {
    const searchDetails = [
      "키워드 기반 상품 검색"
    ];

    if (hasCategory) {
      searchDetails.push("카테고리 필터링");
    }

    if (searchType === "advanced") {
      searchDetails.push("가격 범위 필터");
      searchDetails.push("정렬 기능 (인기순, 가격순, 최신순)");
      searchDetails.push("다중 필터 조합 검색");
    }

    requirements.push({
      title: "상품 검색 및 필터",
      description: "사용자가 원하는 상품을 쉽게 찾을 수 있는 검색 기능",
      details: searchDetails
    });
  }

  return requirements;
}

// 주문/결제 요구사항 구성
function buildOrderRequirements(answers: ProjectState["answers"]) {
  const requirements: Array<{ title: string; description: string; details: string[] }> = [];
  let hasCart = false;
  let paymentMethods: string[] = [];
  let pgProvider = "";
  let hasOrderTracking = false;
  let hasRefund = false;

  answers.forEach((answer) => {
    const question = ECOMMERCE_QUESTIONS.find((q) => q.id === answer.questionId);
    if (!question) return;

    const selectedOptions = answer.selectedOptions
      .map((optId) => question.options.find((opt) => opt.id === optId))
      .filter((opt) => opt !== undefined);

    if (question.question.includes("장바구니")) {
      hasCart = selectedOptions.some(opt => opt?.text.includes("필요"));
    } else if (question.question.includes("결제 방식")) {
      paymentMethods = selectedOptions.map(opt => opt?.text || "");
    } else if (question.question.includes("PG사")) {
      pgProvider = selectedOptions[0]?.text || "";
    } else if (question.question.includes("주문 관리")) {
      hasOrderTracking = selectedOptions.some(opt => opt?.text.includes("상태 추적"));
      hasRefund = selectedOptions.some(opt => opt?.text.includes("취소") || opt?.text.includes("환불"));
    }
  });

  // 장바구니
  if (hasCart) {
    requirements.push({
      title: "장바구니",
      description: "여러 상품을 담아 한 번에 구매할 수 있는 장바구니 기능",
      details: [
        "장바구니에 상품 추가/제거",
        "장바구니 내 상품 수량 조절",
        "장바구니 총 금액 계산 및 표시",
        "선택한 상품만 주문하기"
      ]
    });
  }

  // 주문 생성
  const orderDetails = [
    hasCart ? "장바구니에서 주문 생성" : "상품 상세 페이지에서 바로 주문",
    "배송지 정보 입력 (주소, 연락처)",
    "주문 상품 및 금액 확인",
    "주문 확정 및 결제 진행"
  ];

  requirements.push({
    title: "주문 생성",
    description: "상품 구매를 위한 주문 정보 입력 및 생성",
    details: orderDetails
  });

  // 결제
  if (paymentMethods.length > 0 && !pgProvider.includes("나중에")) {
    const paymentDetails = [
      `PG사 연동: ${pgProvider.replace(" (추천)", "").replace(" (개발자 친화적, 다양한 PG 지원)", "")}`,
      "지원 결제 수단:"
    ];

    paymentMethods.forEach(method => {
      paymentDetails.push(`  - ${method}`);
    });

    paymentDetails.push("결제 성공/실패 처리");
    paymentDetails.push("결제 영수증 발행");

    requirements.push({
      title: "결제 처리",
      description: "안전한 온라인 결제 시스템",
      details: paymentDetails
    });
  }

  // 주문 관리
  const orderManagementDetails = [
    "주문 내역 조회",
    "주문 상세 정보 확인"
  ];

  if (hasOrderTracking) {
    orderManagementDetails.push("주문 상태 실시간 조회 (주문확인, 배송준비, 배송중, 배송완료)");
    orderManagementDetails.push("배송 추적 정보 제공");
  }

  if (hasRefund) {
    orderManagementDetails.push("주문 취소 요청");
    orderManagementDetails.push("환불 처리 및 상태 관리");
  }

  requirements.push({
    title: "주문 관리",
    description: "사용자의 주문 내역 조회 및 관리 기능",
    details: orderManagementDetails
  });

  return requirements;
}

// 부가기능 요구사항 구성
function buildAdditionalRequirements(answers: ProjectState["answers"]) {
  const requirements: Array<{ title: string; description: string; details: string[] }> = [];

  answers.forEach((answer) => {
    const question = ECOMMERCE_QUESTIONS.find((q) => q.id === answer.questionId);
    if (!question) return;

    const selectedOptions = answer.selectedOptions
      .map((optId) => question.options.find((opt) => opt.id === optId))
      .filter((opt) => opt !== undefined);

    if (question.question.includes("리뷰") && selectedOptions.some(opt => opt?.text.includes("필요"))) {
      requirements.push({
        title: "상품 리뷰 및 평점",
        description: "구매자가 상품에 대한 리뷰를 작성하고 평점을 남길 수 있는 기능",
        details: [
          "구매 확정 후 리뷰 작성 가능",
          "별점 평가 (1~5점)",
          "텍스트 리뷰 작성",
          "리뷰 이미지 첨부",
          "상품 평균 평점 표시",
          "리뷰 목록 조회 및 정렬"
        ]
      });
    }

    if (question.question.includes("찜하기") && selectedOptions.some(opt => opt?.text.includes("필요"))) {
      requirements.push({
        title: "찜하기 (위시리스트)",
        description: "관심 상품을 저장하고 나중에 확인할 수 있는 기능",
        details: [
          "상품 상세 페이지에서 찜하기 버튼",
          "찜한 상품 목록 조회",
          "찜 목록에서 상품 제거",
          "찜한 상품 장바구니 담기"
        ]
      });
    }

    if (question.question.includes("쿠폰") && selectedOptions.some(opt => opt?.text.includes("필요"))) {
      requirements.push({
        title: "쿠폰 및 할인 시스템",
        description: "프로모션을 위한 쿠폰 발행 및 할인 적용 기능",
        details: [
          "쿠폰 발행 및 관리",
          "쿠폰 코드 입력 및 검증",
          "할인 금액/비율 적용",
          "쿠폰 사용 조건 설정 (최소 주문 금액, 특정 상품 등)",
          "사용자별 쿠폰 보유 및 사용 내역",
          "쿠폰 유효기간 관리"
        ]
      });
    }
  });

  return requirements;
}

// 관리자 요구사항 구성
function buildAdminRequirements(answers: ProjectState["answers"]) {
  const requirements: Array<{ title: string; description: string; details: string[] }> = [];

  answers.forEach((answer) => {
    const question = ECOMMERCE_QUESTIONS.find((q) => q.id === answer.questionId);
    if (!question) return;

    const selectedOptions = answer.selectedOptions
      .map((optId) => question.options.find((opt) => opt.id === optId))
      .filter((opt) => opt !== undefined);

    const selected = selectedOptions[0];
    if (!selected) return;

    if (selected.text.includes("필요합니다")) {
      requirements.push({
        title: "관리자 대시보드",
        description: "쇼핑몰 운영을 위한 통합 관리 시스템",
        details: [
          "관리자 로그인 및 권한 관리",
          "주요 지표 대시보드 (매출, 주문 수, 회원 수 등)",
          "상품 관리 (등록, 수정, 삭제, 재고 관리)",
          "주문 관리 (주문 확인, 배송 처리, 취소/환불 처리)",
          "회원 관리 (회원 목록, 상세 정보, 권한 관리)",
          "통계 및 리포트 (매출 통계, 인기 상품 등)"
        ]
      });
    } else if (selected.text.includes("간단한")) {
      requirements.push({
        title: "기본 관리 기능",
        description: "필수 운영 기능만 포함한 간소화된 관리 페이지",
        details: [
          "관리자 로그인",
          "상품 등록 및 기본 수정",
          "주문 목록 조회 및 상태 변경",
          "회원 목록 조회"
        ]
      });
    }
  });

  return requirements;
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
