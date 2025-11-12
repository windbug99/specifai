# Specifai - 4. 제품 기능 및 차별점

## 4.1 핵심 기능

### Phase 1: AI-Native 명세서 생성 (MVP - 6주)

#### 1. 대화형 요구사항 수집 (AI가 이해 가능한 수준)

##### 기능 설명
- AI가 50-100개의 질문을 통해 요구사항을 **논리적이고 명확하게** 수집
- 비개발자도 쉽게 답변 가능한 자연어 질문
- 실시간으로 **AI-Native 명세서** 초안 생성 및 미리보기
- 모호한 표현 자동 감지 및 재질문

##### 질문 예시
```
AI: "쇼핑몰을 만들고 싶으시다고 하셨는데, 
     로그인은 어떻게 하실 건가요?"
사용자: "이메일로요"

AI: "소셜 로그인(카카오, 구글 등)도 필요하신가요?"
사용자: "아니요"

AI: "비밀번호 찾기 기능은요?"
사용자: "네, 필요해요"

AI: "이메일로 재설정 링크를 보내드리는 방식이 괜찮으신가요?"
사용자: "네, 좋아요"

AI: "회원가입 시 이메일 인증이 필요한가요?"
사용자: "네, 스팸 방지를 위해 필요해요"
...
```

##### 질문 카테고리
| 카테고리 | 질문 수 | 예시 |
|---------|---------|------|
| **기본 정보** | 5-10개 | 프로젝트명, 목적, 대상 사용자 |
| **핵심 기능** | 20-30개 | 주요 기능, 우선순위, 필수/선택 |
| **사용자 관리** | 10-15개 | 로그인, 권한, 프로필 |
| **데이터 관리** | 10-15개 | 저장, 조회, 수정, 삭제 |
| **UI/UX** | 5-10개 | 디자인, 반응형, 접근성 |
| **기술 요구사항** | 5-10개 | 성능, 보안, 호환성 |
| **운영 요구사항** | 5-10개 | 배포, 유지보수, 모니터링 |

#### 2. 자동 구조화 및 명확화

##### 기능 목록 자동 분류
```
✅ 포함되는 기능:
• 회원가입 (이메일)
• 로그인 (이메일/비밀번호)
• 비밀번호 찾기
• 상품 목록 조회
• 상품 상세 보기
• 장바구니 추가

❌ 포함되지 않는 기능:
• 소셜 로그인
• 쿠폰 시스템
• 포인트 시스템
• 실시간 채팅
• 푸시 알림
```

##### 애매한 표현 자동 감지 및 수정
| Before (애매함) | AI 질문 | After (명확함) |
|----------------|----------|---------------|
| "빠른 속도" | "구체적으로 몇 초를 원하시나요?" | "페이지 로딩 3초 이내" |
| "많은 사용자" | "동시 접속자가 몇 명 정도인가요?" | "동시 접속 1,000명 지원" |
| "예쁜 디자인" | "참고하실 사이트가 있나요?" | "무신사 스타일 미니멀 디자인" |
| "모바일 지원" | "앱인가요, 웹인가요?" | "반응형 웹 (모바일 최적화)" |

##### 일관성 체크
```
⚠️ 모순 발견:
"실시간 채팅"을 원하신다고 하셨는데
"추가 서버 비용 없음"도 요구하셨습니다.
어떤 것이 더 중요한가요?
```

#### 3. 계약서로 사용 가능한 문서 생성

##### 문서 구성
1. **프로젝트 개요**
   - 프로젝트명, 목적, 기간, 예산
   - 발주자 정보, 개발자 정보

2. **상세 요구사항**
   - 기능 요구사항 (FR)
   - 비기능 요구사항 (NFR)
   - 제약사항

3. **범위 정의**
   - 포함 사항 (In-Scope)
   - 제외 사항 (Out-of-Scope)
   - 가정사항 (Assumptions)

4. **검수 기준**
   - 기능별 테스트 케이스
   - 성능 기준
   - 완료 조건

5. **부록**
   - 용어 정의
   - 참조 문서
   - 변경 이력

##### 법적 요소
- 타임스탬프 자동 기록
- 버전 관리 시스템
- 디지털 서명 준비 (Phase 2)
- PDF/A 형식 (장기 보존용)

#### 4. AI-Native Instruction Prompt 자동 생성 ⭐

이것이 Specifai의 가장 중요한 차별화 포인트입니다. 단순한 "명세서"가 아닌 **AI가 직접 실행할 수 있는 instruction prompt** 수준의 문서를 생성합니다.

##### AI-Native Prompt의 특징
```
✓ 논리적 구조: 계층적, 순서적으로 정렬된 정보
✓ 100% 명확성: 모호함 제거, 구체적인 기준 제시
✓ AI 최적화: Cursor, Claude 등 AI 코딩 도구에 직접 사용 가능
✓ 미래 준비: AI 에이전트 시대에 바로 요청 가능
```

##### Cursor용 AI-Native Prompt 예시
```markdown
# E-commerce Platform - AI-Native Requirements Specification

## 1. Project Scope Definition

### 1.1 In-Scope (반드시 포함)
- User authentication: Email/password only
  * Requirement: Implement email verification on signup
  * Requirement: Implement password reset via email link
  * Requirement: Session timeout after 1 hour of inactivity
  
- Product Management
  * Requirement: Display products with pagination (exactly 20 items per page)
  * Requirement: Product search by name (case-insensitive)
  * Requirement: Sort options: price (asc/desc), newest first, popularity
  
### 1.2 Out-of-Scope (포함 안 함)
- Social login (카카오, 구글, 애플)
- Coupon/discount system
- Point system
- Real-time notifications
- Payment integration (예정 미정)

### 1.3 Assumptions
- Database: PostgreSQL (Prisma ORM 사용)
- Framework: Next.js 14 (App Router)
- Authentication: JWT token
- Frontend: React with TypeScript

## 2. Feature Requirements (AI가 구현할 기능)

### 2.1 Authentication
```
Feature: User Registration
Given: User on signup page
When: User enters email, password, confirms password
Then:
  - Validate email format (RFC 5322)
  - Validate password strength: min 8 chars, 1 uppercase, 1 number
  - Send verification email to address
  - User can login only after email verified
  - Success: Redirect to login page with message "Check your email"
  - Error: Display specific error message for each validation failure
```

### 2.2 Performance Requirements
```
Requirement: Page Load Time
- Login page: < 2 seconds (excluding network latency)
- Product listing: < 3 seconds (including initial data load)
- Product search results: < 1 second (after user stops typing)

Measurement: Chrome DevTools Performance tab
Success Criteria: 95th percentile performance meets above targets
```

### 2.3 Data Models
```
User Model:
- id: UUID (primary key)
- email: string (unique, indexed)
- passwordHash: string (bcrypt)
- isEmailVerified: boolean (default: false)
- createdAt: timestamp
- updatedAt: timestamp

Product Model:
- id: UUID
- name: string (max 255 chars)
- description: text
- price: decimal (2 decimal places, >= 0)
- stock: integer (>= 0)
- category: enum ['electronics', 'clothing', 'books', ...]
- createdAt: timestamp
- updatedAt: timestamp

Relationship: User 1 --- Many Product (user_id in products table)
```

[... 총 1,000-2,000줄의 구조화된 명세 ...]
```

##### 특징: AI-Native vs 기존 명세서 비교

| 항목 | 기존 명세서 | AI-Native Prompt |
|------|-----------|-----------------|
| **구조** | 자유형식 | 계층적, 위계적 |
| **명확성** | "빠른 속도" | "< 2초 (네트워크 제외)" |
| **에러 처리** | 암시적 | 명시적 (모든 케이스) |
| **데이터 모델** | 텍스트 설명 | ER 다이어그램 + SQL 스펙 |
| **AI 이해** | 재해석 필요 (재시도 5회+) | 직접 이해 (재시도 1회) |
| **AI 에이전트 준비** | ❌ 불가능 | ✅ 직접 요청 가능 |

##### Claude용 AI-Native Prompt 구조
```
1. Project Context (프로젝트 배경, 목표)
2. Scope Definition (in-scope, out-of-scope, assumptions)
3. Technical Stack (기술, 라이브러리, 버전)
4. Data Models (데이터 구조, 관계도)
5. API Specifications (엔드포인트, 요청/응답 형식)
6. Feature Requirements (BDD 형식의 기능 명세)
7. Performance Requirements (구체적인 측정 기준)
8. Error Handling (모든 에러 케이스와 응답)
9. Testing Requirements (테스트 케이스)
10. Deployment & Monitoring (배포 방식, 모니터링 지표)
```

### Phase 2: 계약 체결 (3개월 후)

#### 기능 목록
- 발주자-개발자 공동 리뷰 기능
- 양측 디지털 서명 기능
- 수정 제안 및 협의 기능
- 에스크로 연동 (선택)

#### 프로세스
```
1. 발주자가 명세서 작성
2. 개발자에게 링크 공유
3. 개발자 리뷰 및 코멘트
4. 협의 및 수정
5. 최종 합의
6. 디지털 서명
7. 계약 완료
```

### Phase 3: 실행 지원 (6개월 후)

#### 기능 목록
- 진행률 추적 체크리스트
- 변경 요청 관리 (추가 비용 자동 계산)
- 일정 및 마일스톤 관리
- 커뮤니케이션 로그 자동 저장

#### 변경 관리 예시
```
원본: "로그인 기능 (이메일)"
변경 요청: "카카오 로그인 추가"
자동 계산: 
- 추가 개발: 2일
- 추가 비용: 50만원
- 일정 영향: 전체 일정 2일 연장
승인 필요: 발주자 & 개발자
```

### Phase 4: 분쟁 해결 (1년 후)

#### 기능 목록
- 원본 명세서 및 모든 변경 이력 제공
- AI 기반 분쟁 분석 및 해결 제안
- 법률 전문가 연결 (파트너십)

---

## 4.2 차별화 포인트 (AI-Native 명세서 중심)

### 핵심 차별화: AI-Native Instruction Prompt

Specifai의 가장 중요한 차별화는 **단순한 문서화**를 넘어 **AI가 직접 실행할 수 있는 instruction prompt** 수준의 명세서를 생성한다는 것입니다.

### 경쟁사 대비 비교표

| 요소 | ChatGPT | 위시켓 | Specifai | 차별화 정도 |
|------|---------|--------|-----------|------------|
| **타겟** | 범용 AI | 매칭 플랫폼 | **소규모 프로젝트 + 외주** | 🔴 매우 높음 |
| **명세서 작성** | 기본 | 부분적 | **AI-Native prompt** | 🔴 매우 높음 |
| **명확성 수준** | 부분적 | 일반적 | **AI 직접 실행 수준** | 🔴 매우 높음 |
| **AI 활용** | 범용 | 없음 | **Cursor/Claude 최적화** | 🔴 매우 높음 |
| **AI 에이전트 준비** | ❌ | ❌ | **✅ 직접 가능** | 🔴 매우 높음 |
| **비개발자 친화** | ⭕ | ⭕ | **✅ 극도로 친화적** | 🟡 높음 |
| **계약 문서** | ❌ | ⭕ | **✅ 버전 추적** | 🟡 높음 |
| **분쟁 해결** | ❌ | ⭕ | **✅ 중재 지원** | 🟡 높음 |
| **데이터 활용** | ❌ | ❌ | **✅ 패턴 학습** | 🔴 매우 높음 |

### 상세 차별점

#### 1. 외주 특화 🎯
```
일반 도구: "프로젝트 요구사항을 작성하세요"
Specifai: "발주자님과 개발자님 모두를 위한 명세서"

특징:
• 발주자-개발자 양측 관점 모두 고려
• 분쟁 시나리오 기반 설계
• 견적 연동
• 변경 요청 프로세스
```

#### 2. 계약 문서 수준 📋
```
일반 문서: 작성 → 끝
Specifai: 작성 → 서명 → 추적 → 보호

특징:
• 명확한 범위 정의 (In/Out)
• 타임스탬프
• 변경 이력 추적
• 법률 자문 검토 (선택)
```

#### 3. 비개발자 친화적 👥
```
일반 도구: "API 엔드포인트를 정의하세요"
Specifai: "어떤 정보를 보여드릴까요?"

특징:
• 기술 용어 없이 자연어로 질문
• 실시간 미리보기
• 빠진 부분 자동 감지
• 예제 기반 설명
```

#### 4. 분쟁 해결 지원 ⚖️
```
분쟁 발생 시:
1. 원본 명세서 확인
2. 변경 이력 추적
3. AI 분석: "개발자 측이 맞습니다. 해당 기능은 명세서에 없었습니다."
4. 해결 제안: "추가 비용 30만원으로 합의 권장"
```

#### 5. AI 구현 최적화 🤖
```
Before: 
개발자 → AI: "쇼핑몰 만들어줘"
→ 5번 재시도, 2주 소요

After:
개발자 → Specifai → 1,000줄 프롬프트 → AI
→ 1번에 성공, 2일 소요
```

#### 6. 데이터 기반 개선 📊
```
100개 프로젝트 후:
"이커머스는 평균 95개 요구사항이 필요합니다.
현재 60개만 정의되었네요. 추가 질문이 필요합니다."

500개 프로젝트 후:
"이 조합은 분쟁 확률 65%입니다.
'실시간 알림' 범위를 더 명확히 하세요."
```

---

## 4.3 사용자 시나리오 (소규모 프로젝트 시장 중심)

### Priority 1: 1인 개발자 & 프리랜서 중심

**이유**: 소규모 프로젝트 시장의 핵심 플레이어들이며, Specifai의 1차 타겟입니다.

### 시나리오 1: 1인 개발자 (AI 활용)

1인 개발자가 본인의 아이디어를 명확히 구체화하고 AI 도구를 최적으로 활용하는 시나리오입니다.

#### 기존 방식 ❌
```
Day 1: 머릿속 아이디어 → Cursor: "쇼핑몰 만들어줘"
Day 2-5: AI 재시도 5회 (부정확한 구현)
Day 5-10: 코드 검토, 맘에 안 들어서 수정
Day 10-14: 수동으로 다시 작성
Day 14: 2주 소요, 품질 부족, 피로도 높음

문제점:
- 만들고자 하는 것이 불명확
- AI 도구 활용 비효율
- 수많은 재작업
- 개발 시간 낭비
```

#### Specifai 사용 ✅
```
Day 1 (30분):
- Specifai 시작
- AI와 체계적 질문으로 아이디어 구체화
- 놓친 부분 발견
- 명세서 완성

Day 2 (5분):
- AI 프롬프트 자동 생성
- 1,000줄 상세 명세 → Cursor 복붙

Day 2-3 (1-2일):
- Cursor에 한 번에 정확하게 구현
- 필요한 부분만 미세 조정
- 고품질 결과물 완성

효과: 
- 개발 시간: 2주 → 2-3일 (7배 단축)
- 재작업: 5회 → 0-1회 (80% 감소)
- 결과물 품질: 낮음 → 높음
- 개발자 피로도: 높음 → 낮음
```

### 시나리오 2: 프리랜서 개발자

소규모 프로젝트를 주로 하는 프리랜서가 고객의 불명확한 요구사항으로 인한 분쟁을 예방하는 시나리오입니다.

#### 기존 방식 ❌
```
고객: "쇼핑몰 만들어주세요 (500만원)"
프리랜서: "네..." (불안하지만 수락)

Week 1-2: 개발 시작
고객: "쿠폰 기능도 넣어주세요" 
프리랜서: "그건 추가 비용입니다"
고객: "쇼핑몰이면 있는 거 아닌가요?"
프리랜서: "처음 말씀 안 하셨는데..."

결과: 
- 미수금 50만원
- 고객 불만족
- 평판 하락
- 법적 분쟁 위험
```

#### Specifai 사용 ✅
```
상담 단계:
1. 프리랜서 → 고객: "Specifai로 명세서 작성하고 견적 드릴게요"

2. 고객이 Specifai 작성 (1시간)
   - 필요한 기능 체계적으로 정리
   - AI가 놓친 부분 추천

3. 프리랜서가 리뷰 (30분)
   - "이 기능은 기본에 포함"
   - "이 부분은 추가 비용 (20만원)"
   - 명확한 커뮤니케이션

4. 명세서 확정 & 디지털 서명
   - 양측 합의 문서화
   - 법적 근거 확보

개발 단계:
5. 명확한 범위로 개발 진행
6. 추가 요청 발생 시:
   - Specifai가 자동 견적 제시
   - 비용/기간 명확
   - 추가 합의 문서화

결과:
- 미수금: 0원
- 고객 만족도: 높음
- 프리랜서 신뢰도: 상승
- 법적 분쟁 제로
- 재계약율: 높음

효과: 불명확한 요구사항 명확화로 분쟁 제로, 신뢰 구축
```

### Priority 2: 소규모 팀/스타트업 (향후 확대)

**이유**: 소규모 프로젝트 시장 이후, Phase 2에서 확대할 타겟입니다.

### 시나리오 3: 스타트업 창업자 (소규모 발주)

#### 기존 방식 ❌
```
창업자: "MVP 만들어주세요"
외주사: "한 달에 3,000만원입니다"
창업자: "정확히 뭐가 들어가나요?"
외주사: "기본 기능 다 들어있습니다"

Month 2: 기능 추가 요청 발생
"카카오 로그인도 필요해요"
외주사: "그건 추가 비용 (500만원)"
창업자: "어? 처음에 포함된 줄..."

결과:
- 예상 비용: 3,000만원 → 실제: 3,500만원 (16% 초과)
- 예상 기간: 1개월 → 실제: 6주 (50% 초과)
- 요구사항 명확화 없음
- 상호 불신 발생
```

#### Specifai 사용 ✅
```
1주차:
1. 스타트업 담당자가 Specifai로 요구사항 정리 (1시간)
   - MVP에 정말 필요한 기능 정의
   - 우선순위 명확화
   - 향후 로드맵과 분리
   
2. 명확한 RFP (Request For Proposal) 자동 생성
   - 명세서 PDF
   - 기능 체크리스트
   - 제약사항 명시

2주차:
3. 3개 외주사에 동일 명세로 견적 요청
   - A사: 2,500만원 (30일)
   - B사: 3,000만원 (25일)
   - C사: 2,800만원 (28일)

4. 객관적 비교로 최적 업체 선정

계약 단계:
5. 명확한 명세서로 계약 체결
   - 포함 사항: 로그인, 회원가입, 상품 목록...
   - 미포함 사항: 카카오 로그인, 푸시 알림...
   - 변경 프로세스 명시: 추가 기능은 별도 계약

개발 단계:
6. 명확한 범위로 개발 진행 (25일)
7. 추가 요청 발생 시:
   - "카카오 로그인이 필요해요"
   - Specifai: "추가 개발 3일, 추가 비용 300만원"
   - 양측 합의 후 진행

결과:
- 예상 비용 (명확): 2,500만원 = 실제 비용 (초과 최소화)
- 예상 기간 (명확): 25일 = 실제 기간 (일정 준수)
- 요구사항 명확화: 100%
- 추가 요청은 비용 투명화
- 발주자-외주사 신뢰도: 높음
- 재계약율: 높음
```

**효과**: 예산과 기간을 명확히 하여 소규모 프로젝트의 성공률 향상

---

## 4.4 기능 로드맵

### MVP (6주)
```
✅ 필수 기능:
• 대화형 질문 엔진
• 명세서 자동 생성
• PDF 출력
• AI 프롬프트 생성
• 데이터 수집 인프라
```

### Phase 1 (3개월)
```
📋 추가 기능:
• 사용자 인증
• 프로젝트 관리
• 명세서 수정
• 템플릿 저장
• 이메일 알림
```

### Phase 2 (6개월)
```
🤝 협업 기능:
• 공동 리뷰
• 디지털 서명
• 변경 요청 관리
• 진행률 추적
• 컨텍스트 패키지 v1
```

### Phase 3 (12개월)
```
🏢 엔터프라이즈:
• 팀 계정
• 권한 관리
• API 제공
• 플랫폼 통합
• 분쟁 중재 시스템
```

---

## 다음 문서
- [3. 시장 분석](03_market_analysis.md)
- [5. 해자 전략](05_moat_strategy.md)
