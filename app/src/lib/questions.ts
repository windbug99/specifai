import { Question } from "@/types";

// MVP용 이커머스 질문 15개 (한국 최적화)
export const ECOMMERCE_QUESTIONS: Question[] = [
  {
    id: "Q001",
    category: "회원관리",
    question: "회원가입 방식을 선택해주세요",
    type: "single",
    options: [
      {
        id: "opt_1",
        text: "이메일 회원가입만",
        description: "가장 기본적인 방식",
        impact: { dev_time_days: 0, cost_krw: 0 }
      },
      {
        id: "opt_2",
        text: "이메일 + 소셜 로그인 (카카오, 네이버 추천)",
        description: "사용자 편의성 증가, 개발 시간 +2일",
        impact: { dev_time_days: 2, cost_krw: 500000 }
      },
      {
        id: "opt_3",
        text: "소셜 로그인만 (카카오, 네이버, 구글, 애플)",
        description: "간편하지만 이메일 수집 제한",
        impact: { dev_time_days: 2, cost_krw: 500000 }
      }
    ]
  },
  {
    id: "Q002",
    category: "상품관리",
    question: "상품 등록 및 관리 기능을 선택해주세요",
    type: "multiple",
    options: [
      {
        id: "opt_1",
        text: "상품 기본 정보 등록 (이름, 가격, 설명, 이미지)",
        description: "필수 기능",
        impact: { dev_time_days: 0, cost_krw: 0 }
      },
      {
        id: "opt_2",
        text: "카테고리 관리",
        description: "상품 분류 및 검색 향상 (+1일)",
        impact: { dev_time_days: 1, cost_krw: 250000 }
      },
      {
        id: "opt_3",
        text: "재고 관리",
        description: "품절 알림, 재입고 알림 (+2일)",
        impact: { dev_time_days: 2, cost_krw: 500000 }
      },
      {
        id: "opt_4",
        text: "옵션 관리 (색상, 사이즈 등)",
        description: "복잡도 증가 (+3일)",
        impact: { dev_time_days: 3, cost_krw: 750000 }
      }
    ]
  },
  {
    id: "Q003",
    category: "상품관리",
    question: "상품 검색 및 필터 기능이 필요한가요?",
    type: "single",
    options: [
      {
        id: "opt_1",
        text: "네, 키워드 검색 + 카테고리 필터",
        description: "기본 검색 기능 (+2일)",
        impact: { dev_time_days: 2, cost_krw: 500000 }
      },
      {
        id: "opt_2",
        text: "네, 고급 필터 (가격 범위, 정렬, 브랜드 등)",
        description: "상세 검색 기능 (+3일)",
        impact: { dev_time_days: 3, cost_krw: 750000 }
      },
      {
        id: "opt_3",
        text: "아니요, 필요 없습니다",
        description: "상품 수가 적은 경우",
        impact: { dev_time_days: 0, cost_krw: 0 }
      }
    ]
  },
  {
    id: "Q004",
    category: "주문/결제",
    question: "장바구니 기능이 필요한가요?",
    type: "single",
    options: [
      {
        id: "opt_1",
        text: "네, 필요합니다",
        description: "여러 상품을 담아서 구매 (+2일)",
        impact: { dev_time_days: 2, cost_krw: 500000 }
      },
      {
        id: "opt_2",
        text: "아니요, 바로 구매만",
        description: "단순한 구매 플로우",
        impact: { dev_time_days: 0, cost_krw: 0 }
      }
    ]
  },
  {
    id: "Q005",
    category: "주문/결제",
    question: "결제 방식을 선택해주세요",
    type: "multiple",
    options: [
      {
        id: "opt_1",
        text: "신용카드",
        description: "필수 결제 수단",
        impact: { dev_time_days: 0, cost_krw: 0 }
      },
      {
        id: "opt_2",
        text: "계좌이체",
        description: "무통장 입금",
        impact: { dev_time_days: 0, cost_krw: 0 }
      },
      {
        id: "opt_3",
        text: "간편결제 (카카오페이, 네이버페이, 토스)",
        description: "편의성 향상 (+1일)",
        impact: { dev_time_days: 1, cost_krw: 250000 }
      }
    ]
  },
  {
    id: "Q006",
    category: "주문/결제",
    question: "PG사(결제대행사)는 어디를 사용하시나요?",
    type: "single",
    options: [
      {
        id: "opt_1",
        text: "토스페이먼츠 (추천)",
        description: "한국 시장 점유율 1위, 수수료 낮음",
        impact: { dev_time_days: 3, cost_krw: 750000 }
      },
      {
        id: "opt_2",
        text: "아임포트",
        description: "개발자 친화적, 다양한 PG 지원",
        impact: { dev_time_days: 3, cost_krw: 750000 }
      },
      {
        id: "opt_3",
        text: "나중에 결정",
        description: "MVP에서는 결제 없이 진행",
        impact: { dev_time_days: 0, cost_krw: 0 }
      }
    ]
  },
  {
    id: "Q007",
    category: "주문/결제",
    question: "주문 관리 기능을 선택해주세요",
    type: "multiple",
    options: [
      {
        id: "opt_1",
        text: "주문 내역 조회",
        description: "필수 기능",
        impact: { dev_time_days: 0, cost_krw: 0 }
      },
      {
        id: "opt_2",
        text: "주문 상태 추적 (주문확인, 배송중, 배송완료)",
        description: "상태 관리 (+1일)",
        impact: { dev_time_days: 1, cost_krw: 250000 }
      },
      {
        id: "opt_3",
        text: "주문 취소 및 환불",
        description: "복잡한 로직 (+2일)",
        impact: { dev_time_days: 2, cost_krw: 500000 }
      }
    ]
  },
  {
    id: "Q008",
    category: "부가기능",
    question: "리뷰 및 평점 기능이 필요한가요?",
    type: "single",
    options: [
      {
        id: "opt_1",
        text: "네, 필요합니다",
        description: "구매 전환율 향상 (+2일)",
        impact: { dev_time_days: 2, cost_krw: 500000 }
      },
      {
        id: "opt_2",
        text: "아니요, 필요 없습니다",
        description: "초기 MVP에서 제외",
        impact: { dev_time_days: 0, cost_krw: 0 }
      }
    ]
  },
  {
    id: "Q009",
    category: "부가기능",
    question: "찜하기(위시리스트) 기능이 필요한가요?",
    type: "single",
    options: [
      {
        id: "opt_1",
        text: "네, 필요합니다",
        description: "재방문율 향상 (+1일)",
        impact: { dev_time_days: 1, cost_krw: 250000 }
      },
      {
        id: "opt_2",
        text: "아니요, 필요 없습니다",
        description: "초기 MVP에서 제외",
        impact: { dev_time_days: 0, cost_krw: 0 }
      }
    ]
  },
  {
    id: "Q010",
    category: "부가기능",
    question: "쿠폰 및 할인 시스템이 필요한가요?",
    type: "single",
    options: [
      {
        id: "opt_1",
        text: "네, 필요합니다",
        description: "마케팅 도구 (+3일)",
        impact: { dev_time_days: 3, cost_krw: 750000 }
      },
      {
        id: "opt_2",
        text: "아니요, 필요 없습니다",
        description: "초기 MVP에서 제외",
        impact: { dev_time_days: 0, cost_krw: 0 }
      }
    ]
  },
  {
    id: "Q011",
    category: "UI/UX",
    question: "디자인 스타일을 선택해주세요",
    type: "single",
    options: [
      {
        id: "opt_1",
        text: "미니멀 모던",
        description: "깔끔하고 현대적인 느낌",
        impact: { dev_time_days: 0, cost_krw: 0 }
      },
      {
        id: "opt_2",
        text: "럭셔리",
        description: "고급스러운 느낌",
        impact: { dev_time_days: 0, cost_krw: 0 }
      },
      {
        id: "opt_3",
        text: "캐주얼/친근함",
        description: "편안하고 친근한 느낌",
        impact: { dev_time_days: 0, cost_krw: 0 }
      }
    ]
  },
  {
    id: "Q012",
    category: "UI/UX",
    question: "반응형 디자인(모바일 대응)이 필요한가요?",
    type: "single",
    options: [
      {
        id: "opt_1",
        text: "네, 반드시 필요합니다",
        description: "모바일 사용자 고려 (+2일)",
        impact: { dev_time_days: 2, cost_krw: 500000 }
      },
      {
        id: "opt_2",
        text: "PC만 지원",
        description: "개발 기간 단축",
        impact: { dev_time_days: 0, cost_krw: 0 }
      }
    ]
  },
  {
    id: "Q013",
    category: "관리자",
    question: "관리자 페이지가 필요한가요?",
    type: "single",
    options: [
      {
        id: "opt_1",
        text: "네, 필요합니다 (상품, 주문, 회원 관리)",
        description: "운영 필수 (+3일)",
        impact: { dev_time_days: 3, cost_krw: 750000 }
      },
      {
        id: "opt_2",
        text: "간단한 관리 기능만",
        description: "최소한의 관리 기능 (+1일)",
        impact: { dev_time_days: 1, cost_krw: 250000 }
      },
      {
        id: "opt_3",
        text: "아니요, 필요 없습니다",
        description: "초기 MVP에서 제외",
        impact: { dev_time_days: 0, cost_krw: 0 }
      }
    ]
  },
  {
    id: "Q014",
    category: "기술/성능",
    question: "예상 사용자 수는 얼마나 되나요?",
    type: "single",
    options: [
      {
        id: "opt_1",
        text: "소규모 (1일 100명 이하)",
        description: "기본 인프라로 충분",
        impact: { dev_time_days: 0, cost_krw: 0 }
      },
      {
        id: "opt_2",
        text: "중규모 (1일 100-1,000명)",
        description: "성능 최적화 필요 (+1일)",
        impact: { dev_time_days: 1, cost_krw: 250000 }
      },
      {
        id: "opt_3",
        text: "대규모 (1일 1,000명 이상)",
        description: "고급 인프라 및 최적화 (+3일)",
        impact: { dev_time_days: 3, cost_krw: 750000 }
      }
    ]
  },
  {
    id: "Q015",
    category: "기타",
    question: "프로젝트 출시 목표일은 언제인가요?",
    type: "single",
    options: [
      {
        id: "opt_1",
        text: "1개월 이내",
        description: "빠른 출시 필요",
        impact: { dev_time_days: 0, cost_krw: 0 }
      },
      {
        id: "opt_2",
        text: "2-3개월",
        description: "여유있는 일정",
        impact: { dev_time_days: 0, cost_krw: 0 }
      },
      {
        id: "opt_3",
        text: "아직 미정",
        description: "일정 조율 가능",
        impact: { dev_time_days: 0, cost_krw: 0 }
      }
    ]
  }
];
