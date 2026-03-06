# 바이브코딩 부트스트랩 템플릿 v1.0

> 새 프로젝트를 시작할 때 이 폴더를 통째로 복사하면,
> AI와 협업하기 위한 기본 구조가 한번에 만들어집니다.

---

## 시작하기 전에

- **Spec 문서(기획서)가 먼저 있어야 합니다.**
  - "무엇을 만들 것인가"를 정리한 문서입니다.
  - Spec이 없으면 AI가 추측으로 코딩합니다 → 결과물 품질 하락.

- **CLAUDE.md는 직접 쓰지 않습니다.**
  - AI가 Spec을 읽고 자동으로 만들어줍니다.
  - CLAUDE.md는 "AI가 이 프로젝트에 대해 항상 기억하는 메모"입니다.

---

## 세팅 방법 (5단계)

### 1단계: 템플릿 폴더 복사

이 `template` 폴더 안의 `.claude`와 `dev` 폴더를 프로젝트 폴더에 복사합니다.

**PowerShell:**
```powershell
# 프로젝트 폴더로 이동
cd C:\Users\[사용자명]\[프로젝트 폴더]

# 템플릿 복사
Copy-Item -Path "template\.claude" -Destination ".\" -Recurse
Copy-Item -Path "template\dev" -Destination ".\" -Recurse
```

**또는 탐색기에서:**
1. `template` 폴더를 열기
2. `.claude` 폴더와 `dev` 폴더를 프로젝트 폴더에 붙여넣기
   - `.claude`가 안 보이면: 탐색기 상단 > 보기 > 숨긴 항목 체크

### 2단계: Spec 파일 넣기

프로젝트 폴더 최상위에 Spec 문서(.md 파일)를 넣습니다.
디자인 파일, 프로토타입 등 참조 파일도 같이 넣어두세요.

```
[프로젝트 폴더]\
├── my-project-spec.md          ← Spec (기획서)
├── prototype.html              ← 있으면 (참조용)
├── .claude\                    ← 1단계에서 복사한 것
└── dev\                        ← 1단계에서 복사한 것
```

### 3단계: 프로젝트 전용 스킬 추가 (선택)

프로젝트에만 적용되는 규칙이 있으면 스킬로 만듭니다.
예시: 브랜드 색상 규칙, 코드 스타일, 카피 톤앤매너 등.

```powershell
# _template 폴더를 복사해서 이름 변경
Copy-Item -Path ".claude\skills\_template" -Destination ".claude\skills\my-design-rules" -Recurse
```

그 다음 `my-design-rules\SKILL.md`를 열어서 내용을 채우면 됩니다.
(SKILL.md 안에 작성법이 적혀 있습니다)

**스킬이 뭔가요?**
AI에게 "이 프로젝트에서는 이 규칙을 지켜"라고 알려주는 문서입니다.
필요할 때만 자동으로 읽혀서 토큰(AI 사용량)을 아낍니다.

### 4단계: Vercel Agent Skills 설치 (선택)

Vercel에서 만든 검증된 코딩 규칙 모음입니다.
프로젝트 성격에 맞는 것만 골라 설치합니다.

**간편 설치 (React/Next.js 웹 프로젝트):**

프로젝트 루트에 포함된 `install-skills.bat`을 더블클릭하면 3개 스킬이 자동 설치됩니다.
(vercel-react-best-practices, web-design-guidelines, vercel-composition-patterns)

**또는 수동 설치:**

**React / Next.js 웹사이트:**
```powershell
npx skills add vercel-labs/agent-skills --skill vercel-react-best-practices -a claude-code
npx skills add vercel-labs/agent-skills --skill web-design-guidelines -a claude-code
npx skills add vercel-labs/agent-skills --skill vercel-composition-patterns -a claude-code
```

**React Native 모바일 앱:**
```powershell
npx skills add vercel-labs/agent-skills --skill vercel-react-native-skills -a claude-code
npx skills add vercel-labs/agent-skills --skill vercel-composition-patterns -a claude-code
```

**Vercel 자동 배포:**
```powershell
npx skills add vercel-labs/agent-skills --skill vercel-deploy-claimable -a claude-code
```

> **스킬 이름 주의**: `vercel-` 접두어가 붙는 스킬이 있습니다.
> 설치 실패 시 `npx skills add vercel-labs/agent-skills --list`로 정확한 이름을 확인하세요.

| 스킬 이름 (설치 시 사용) | 내용 | 추천 대상 |
|------------------------|------|----------|
| vercel-react-best-practices | React/Next.js 성능 최적화 규칙 58개 | 웹 프론트엔드 |
| web-design-guidelines | 접근성, UX, 폼, 애니메이션 규칙 100+개 | 모든 웹 프로젝트 |
| vercel-composition-patterns | 컴포넌트 설계 패턴 | 복잡한 UI |
| vercel-react-native-skills | 모바일 성능, 아키텍처 규칙 16개 | 모바일 앱 |

### 5단계: Claude Code 첫 프롬프트 실행

모든 파일이 준비되면, Claude Code에서 아래를 그대로 복사-붙여넣기합니다.

```
이 프로젝트의 Spec([파일명])을 읽어.
[참조 파일이 있으면: 프로토타입([파일명])도 함께 읽어.]

Spec을 바탕으로 CLAUDE.md를 생성해. 아래 섹션을 포함해야 해:
- 프로젝트 개요 (한 줄 요약 + 핵심 개념)
- 기술 스택 (정확한 버전 포함)
- 빌드/실행 명령어 (복사-붙여넣기로 바로 실행 가능하게)
- 환경변수 목록 (실제 값 말고 설명만)
- 폴더 구조 (트리 형태)
- 설계 패턴 (이 프로젝트에서 쓰는 구조)
- 절대 하지 말 것 / 반드시 지킬 것
- 작업 순서 (Spec 파일 경로 포함)

그리고 CLAUDE.md 마지막에 아래 규칙을 반드시 포함해:

## 자동 리뷰 규칙 (모든 Phase에 적용)

Phase의 모든 작업을 마치면, 완료 보고 전에 반드시 아래를 순서대로 실행한다:

1. 빌드 확인: [빌드 명령어] 실행 → 에러가 있으면 먼저 수정
2. 린트 확인: [린트 명령어] 실행 → 경고 0개가 될 때까지 수정
3. 타입 확인: [타입체크 명령어] 실행 → 에러가 있으면 먼저 수정
4. 셀프 체크 (아래 질문에 모두 "예"여야 함):
   - 보안 위험은 없는가? (비밀키 노출, 인증 우회)
   - 에러 처리가 모든 경우에 되어 있는가?
   - 타입이 정확한가? (any 사용, 타입 단언 남용 없는지)
   - Spec에서 요구한 기능이 이 Phase 범위 내에서 전부 구현되었는가?
   - CLAUDE.md의 "절대 하지 말 것"에 해당하는 코드가 없는가?
   - block 모드 스킬 규칙을 위반한 부분이 없는가?
5. 위 전부 통과한 경우에만 완료 보고 + tasks.md "현재 상태" 갱신

하나라도 실패하면 완료 보고하지 말고 문제를 먼저 수정한다.

분량은 5~15KB. 너무 자세한 규칙은 Skills에 있으니까 핵심만 담아.
코드는 아직 쓰지 마.
```

CLAUDE.md를 확인한 뒤 → `"확인 완료. Phase 1 진행해."` 라고 말하면 됩니다.

---

## 이후 작업 흐름

### 자동 리뷰 (2중 안전장치)

매 Phase가 끝날 때 수동으로 "리뷰해줘"라고 하지 않아도 됩니다.
2가지 자동 장치가 걸려 있습니다:

```
1단계: Stop Hook (기계적 검증)
  AI가 작업을 마칠 때마다 자동으로 빌드 명령어 실행
  → 빌드 실패 시 AI가 에러를 보고 자동 수정 시도
  → 빌드 성공해야 작업 종료 가능

2단계: CLAUDE.md 자동 리뷰 규칙 (AI 판단)
  Phase 모든 작업 완료 시 AI가 스스로:
  → 빌드 + 린트 + 타입 체크 실행
  → 셀프 체크 항목 점검 (보안, 에러처리, Spec 충족 등)
  → 전부 통과해야 완료 보고 + tasks.md 갱신
  → 하나라도 실패하면 먼저 수정
```

추가로 상세 리뷰가 필요하면 "리뷰해줘"라고 하면 code-reviewer 에이전트가 동작합니다.

### Stop Hook 설정 (Phase 1에서 진행)

CLAUDE.md 확인 후 Phase 1을 시작할 때, `.claude\settings.json`도 함께 생성합니다:

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [{
          "type": "command",
          "command": "[빌드 명령어] 2>&1 | tail -20"
        }]
      }
    ]
  }
}
```

`[빌드 명령어]`를 프로젝트에 맞게 바꾸세요 (예: `pnpm build`, `npm run build`).
이 Hook은 AI가 작업을 마칠 때마다 자동으로 빌드를 돌려서, 깨진 코드가 넘어가지 않게 합니다.

### 매 단계(Phase) 반복

```
1. "Phase N 계획 세워줘"              → AI가 할 일 목록을 만듦
2. "이 계획 검토해"                    → AI가 빠진 게 없는지 확인
3. "확인 완료. 진행해"                 → AI가 코드 작성
   (Phase 완료 시 자동 리뷰가 돌아감 — 빌드/린트/타입/셀프 체크)
4. 자동 리뷰 결과 확인 → 문제 없으면 tasks.md 자동 갱신됨
5. 추가 리뷰가 필요하면: "리뷰해줘"    → code-reviewer가 상세 점검
```

**중요**: 한번에 전부 시키지 마세요. 한 단계씩 확인하면서 진행해야 품질이 유지됩니다.

---

## 대화가 끊겼거나 새로 시작할 때

Claude Code에서 새 대화를 열었을 때, AI는 이전 작업을 기억하지 못합니다.
이때 아래를 입력하면 이전 맥락을 복구합니다:

```
dev/active/[작업명]/ 폴더의 문서들을 먼저 읽어.
현재 어디까지 했고, 다음에 뭘 해야 하는지 알려줘.
```

tasks.md의 `현재 상태` 섹션에 마지막 작업 내용이 기록되어 있어서
AI가 바로 이어서 작업할 수 있습니다.

---

## 토큰을 아끼는 핵심 원칙

AI에게 전달되는 정보에는 두 종류가 있습니다:

```
항상 읽히는 것 (매 대화마다)          필요할 때만 읽히는 것 (자동 판단)
─────────────────────────           ─────────────────────────────
CLAUDE.md                           .claude\skills\*\SKILL.md
 → 프로젝트 핵심 정보만               → 특정 작업에 필요한 상세 규칙
 → 5~15KB 이내로 유지                 → 각 100줄 이내
 → 여기가 길면 매번 토큰 낭비          → 더 자세한 건 resources\ 폴더에
```

**쉽게 말하면**: "어떤 작업을 하든 알아야 하는 것" → CLAUDE.md,
"특정 작업을 할 때만 알면 되는 것" → Skills.

---

## 이 템플릿에 들어있는 파일들

```
.claude\
├── skills\
│   ├── skill-rules.json           ← 스킬이 언제 켜지는지 규칙
│   │                                (샘플 포함, 복사해서 추가)
│   └── _template\                 ← 새 스킬 만들 때 이 폴더를 복사
│       ├── SKILL.md               ← 스킬 본문 (핵심 규칙)
│       ├── resources\             ← 상세 규칙 (필요할 때만 읽힘)
│       └── examples\              ← 코드 예시 (필요할 때만 읽힘)
│
├── agents\                        ← AI 역할별 지침서
│   ├── planner.md                 ← "계획 세워줘" → 이 지침대로 동작
│   ├── plan-reviewer.md           ← "검토해줘" → 이 지침대로 동작
│   └── code-architecture-reviewer.md  ← "리뷰해줘" → 이 지침대로 동작
│                                    (셀프 체크 리마인더 포함)
│
├── hooks\
│   └── README.md                  ← Stop Hook 설정법 + 추가 Hook 가이드
│
└── quality-checklist.md           ← Phase 0~5 + DDD 통합 점검표

※ .claude\settings.json은 Phase 1에서 생성됩니다 (Stop Hook 포함)

dev\active\_template\              ← 작업 기록 템플릿
├── _plan.md                       ← 기술 결정 기록
├── _context.md                    ← "왜 이렇게 했는지" 기록
└── _tasks.md                      ← 진행 상태 + 다음 할 일

install-skills.bat                 ← 더블클릭으로 Vercel Skills 3개 자동 설치
```

---

## DDD (도메인 주도 설계) — 백엔드가 있는 프로젝트 필독

백엔드 코드를 AI에게 시킬 때, 폴더 구조가 정리되어 있으면 품질이 올라갑니다.
편의점에서 음료는 음료 코너, 과자는 과자 코너에 있는 것처럼
**비즈니스 개념별로 코드를 나눠놓는 것**이 DDD입니다.

### 3파일 세트 (모든 도메인에 적용)

```
domain\[도메인명]\
├── model.py (또는 .ts)      ← 데이터 구조 정의
├── repository.py             ← DB에서 꺼내오기/저장하기
└── service.py                ← 비즈니스 로직 (규칙 처리)
```

예를 들어 "유저"와 "결제"가 있으면:

```
domain\
├── user\
│   ├── model.py
│   ├── repository.py
│   └── service.py
└── payment\
    ├── model.py
    ├── repository.py
    └── service.py
```

### AI에게 DDD가 효과적인 이유

| 이유 | 설명 |
|------|------|
| **패턴 복제** | 첫 도메인(유저)을 잘 만들어두면, AI가 다른 도메인(결제)을 같은 방식으로 정확히 복제 |
| **정보량 줄이기** | 전체 코드가 아니라 해당 도메인 폴더만 보여주면 됨 → 토큰 절약 + 품질 향상 |
| **추측 방지** | 비즈니스 용어를 그대로 코드명으로 쓰면 AI가 추측할 일이 줄어듦 |

### DDD 규칙 4가지

1. **첫 도메인은 반드시 직접 만들기** — AI에게 "이게 완벽한 예시야"를 보여주는 것
2. **비즈니스 용어 = 코드명** — 현업에서 쓰는 말을 그대로 함수명/파일명에 사용
3. **도메인 간 격리** — A 도메인이 B 도메인의 repository를 직접 호출하지 않기
4. **패턴 복제 지시** — "유저 도메인 패턴 그대로 결제 도메인 만들어"

### Spec에 DDD를 반영하는 법

Spec 작성 시 아래를 포함하면 AI가 정확하게 따릅니다:
- 디렉토리 구조에 `domain/[도메인명]/` 트리 포함
- 첫 도메인의 3파일 세트 코드 예시 포함
- "나머지 도메인은 이 패턴을 복제해서 만들어"라고 명시

---

## 2~4주 후: 시스템 점검 (/insight)

프로젝트를 2~4주 진행한 뒤, AI에게 이렇게 요청합니다:

```
지금까지의 작업을 돌아봐.
1. 내가 자주 수정 요청한 패턴이 있나?
2. AI가 반복적으로 실수한 부분이 있나?
3. 스킬이나 에이전트 규칙에 추가할 게 있나?
개선안을 제안해줘.
```

이 피드백을 받아서:

```
마찰 패턴 발견 (예: "코드 작성 전 Spec 확인을 자주 빼먹음")
    ↓
규칙 추가 (예: planner에 "Spec 확인 단계 강화")
    ↓
2~4주 후 다시 점검 → 반복
```

**주의**: AI가 제안하는 **경향이나 패턴**은 유용하지만,
구체적인 **숫자(세션 횟수 등)**는 정확하지 않을 수 있습니다.
숫자보다 패턴에 집중하세요.

---

## 자주 묻는 질문

**Q: skill-rules.json은 꼭 수정해야 하나요?**
프로젝트 전용 스킬을 추가했으면 그에 맞는 규칙도 추가해야 합니다.
Vercel Skills만 쓰면 수정 안 해도 됩니다.

**Q: agents 파일은 수정해야 하나요?**
대부분 그대로 써도 됩니다. 프로젝트에 맞게 검증 기준을 추가하고 싶을 때만 수정하세요.

**Q: dev\active\ 폴더는 왜 필요한가요?**
AI와의 대화가 길어지면 앞에서 한 이야기를 잊어버립니다.
이 폴더에 작업 기록을 남겨두면, 새 대화에서도 이어서 작업할 수 있습니다.

**Q: Hook은 언제 쓰나요?**
Stop Hook은 Phase 1에서 바로 설정합니다 (빌드 자동 검증).
그 외 Hook(skill-activation, post-tool-tracker)은 반복 문제가 생길 때 추가하면 됩니다.
(.claude\hooks\README.md에 가이드 있음)

**Q: _plan.md와 _context.md 차이가 뭔가요?**
`_plan.md`는 프로젝트 시작할 때 한번 쓰는 "뼈대" (기술 결정, 아키텍처).
`_context.md`는 작업하면서 계속 추가하는 "일지" (도중에 바꾼 것, 발견한 것).
시간이 지날수록 `_context.md`가 길어지는 게 정상입니다.
