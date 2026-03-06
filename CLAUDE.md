# floor05 프로젝트 가이드

> **"존재하지 않는 0.5층"** — 무언가가 필요한데 이게 있을까 싶은 것들을 찾는 사람들을 위한 니치 유틸리티 툴 플랫폼

## 핵심 개념

- **100% 브라우저 처리**: 파일이 서버로 전송되지 않음 (운영비 $0)
- **첫 서비스**: 이미지 도구 모음 (압축, 리사이즈, 포맷 변환, 크롭)
- **수익 모델**: Google AdSense + Kakao Adfit 광고
- **진입 경로**: 구글 검색 → 개별 도구 직접 진입

---

## 기술 스택

| 카테고리 | 기술 | 버전/비고 |
|----------|------|-----------|
| 프레임워크 | Next.js (App Router) | 15.x |
| 언어 | TypeScript | 5.x |
| 스타일링 | Tailwind CSS | 3.x |
| 이미지 처리 | Canvas API + Pica | Lanczos 보간법 |
| HEIC 변환 | heic2any | 동적 로드 필수 |
| 병렬 처리 | Web Worker | UI 블로킹 방지 |
| ZIP 다운로드 | JSZip + FileSaver.js | - |
| 배포 | Vercel | 무료 티어 |
| 분석 | Vercel Analytics | 1단계 |
| 광고 | AdSense + Kakao Adfit | - |
| SEO | next-sitemap + next-seo | - |

---

## 빌드/실행 명령어

```bash
# 의존성 설치
npm install

# 개발 서버
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버
npm start

# 린트
npm run lint

# 타입 체크
npx tsc --noEmit
```

---

## 환경변수

```env
# .env.local
NEXT_PUBLIC_ADSENSE_CLIENT_ID=    # Google AdSense 클라이언트 ID
NEXT_PUBLIC_ADFIT_UNIT_ID=        # Kakao Adfit 유닛 ID
NEXT_PUBLIC_GA_ID=                # Google Analytics ID (2단계에서 추가)
```

---

## 폴더 구조

```
floor05/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # 메인 페이지
│   │   ├── layout.tsx                  # 루트 레이아웃
│   │   ├── blog/                       # 블로그
│   │   └── tools/
│   │       └── image/
│   │           ├── compress/page.tsx   # 이미지 압축
│   │           ├── resize/page.tsx     # 리사이즈
│   │           ├── convert/page.tsx    # 포맷 변환
│   │           ├── heic-to-jpg/page.tsx # HEIC→JPG (별도 SEO)
│   │           └── crop/page.tsx       # 크롭
│   ├── components/
│   │   ├── common/                     # 공통 컴포넌트
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── ToolLayout.tsx          # 도구 페이지 공통 뼈대
│   │   │   ├── AdSlot.tsx
│   │   │   ├── ToolCard.tsx
│   │   │   ├── FileDropzone.tsx
│   │   │   ├── BeforeAfter.tsx
│   │   │   └── DownloadButton.tsx
│   │   └── image/                      # 이미지 도구 전용
│   │       ├── CompressTool.tsx
│   │       ├── ResizeTool.tsx
│   │       ├── ConvertTool.tsx
│   │       └── CropTool.tsx
│   └── lib/
│       ├── common/                     # 공통 유틸
│       │   └── fileUtils.ts
│       └── image/                      # 이미지 처리 로직
│           ├── compress.ts
│           ├── resize.ts
│           ├── convert.ts
│           └── worker.ts               # Web Worker
├── public/
│   └── images/
├── SPEC.md                             # 전체 제품 기획서
├── CLAUDE.md                           # 이 파일
└── package.json
```

---

## 설계 패턴

### 1. ToolLayout 공통 뼈대
모든 도구 페이지는 `ToolLayout`으로 감싼다. 공통 영역(헤더, 푸터, 광고, 가이드)은 일관되게, 도구 본체만 자유 설계.

```tsx
<ToolLayout
  title="이미지 압축"
  description="서버 전송 없이 브라우저에서 바로"
>
  <CompressTool />
</ToolLayout>
```

### 2. 도구 페이지 스크롤 흐름
1. 헤더 → 2. 타이틀 → 3. **도구 본체** → 4. 광고1 → 5. 가이드(FAQ) → 6. 워크플로우 CTA → 7. 광고2 → 8. 다른 도구 → 9. 광고3(선택) → 10. 푸터

### 3. 서비스별 폴더 분리
새 서비스 추가 시: `tools/[service]` + `components/[service]` + `lib/[service]`만 생성. 기존 코드 수정 불필요.

### 4. Web Worker 병렬 처리
이미지 처리는 Web Worker에서 실행. UI 스레드 블로킹 방지.

---

## 디자인 시스템

### 브랜드 컬러

| 이름 | HEX | Tailwind 변수 | 용도 |
|------|-----|---------------|------|
| Black | `#0A0A0A` | `--color-black` | 배경, 주요 텍스트 |
| Dark Gray | `#1A1A1A` | `--color-dark` | 보조 배경 |
| Mid Gray | `#4A4A4A` | `--color-mid` | 보조 텍스트 |
| Light Gray | `#B0B0B0` | `--color-light` | 비활성, 힌트 |
| Off White | `#F2F0ED` | `--color-paper` | 카드 배경 (레트로 종이 톤) |
| White | `#FAFAFA` | `--color-white` | 페이지 배경 |
| **Accent** | `#C45C2C` | `--color-accent` | 강조, CTA, 로고 "05" |
| Accent Light | `#E8734A` | `--color-accent-light` | 호버 상태 |
| Accent Muted | `rgba(196,92,44,0.12)` | `--color-accent-muted` | 배경 틴트 |

**컬러 비율**: Paper 50% / Black 35% / Gray 10% / Accent 5%

### 타이포그래피

| 용도 | 폰트 | 비고 |
|------|------|------|
| Primary (모노) | `IBM Plex Mono` | 로고, UI 라벨, 코드, 숫자 |
| Fallback | SF Mono, Fira Code, JetBrains Mono | - |
| Secondary (한글) | `Pretendard` | 본문, 마케팅 카피, UI 한글 |
| Fallback | Apple SD Gothic Neo, -apple-system | - |

### 브랜드 보이스

- **담백함**: 불필요한 수식어 없이 핵심만
- **위트**: 과하지 않은 유머. 슬쩍 웃기는 정도
- **가치의 명확성**: 유저 혜택은 날카롭게 드러냄
- **독립적**: 트렌드를 따르지 않고 자기 기준으로

**예시**:
- DO: "간단한 도구입니다. 잘 됩니다. 써보세요."
- DON'T: "혁신적인 AI 기반 솔루션으로 당신의 생산성을 극대화하세요!"

---

## 절대 하지 말 것

| # | 규칙 | 이유 |
|---|------|------|
| 1 | 메인 페이지에 광고 배치 | 브랜드 첫인상 보호 |
| 2 | 도구 본체 내부(드롭존~다운로드)에 광고 | UX 최우선 |
| 3 | title에 "floor05" 브랜드명 포함 | SEO 키워드 공간 확보 |
| 4 | 미출시 서비스 "준비 중" 표시 | 출시된 것만 노출 |
| 5 | common/ 폴더에 특정 서비스 전용 로직 | 공통 영역 오염 방지 |
| 6 | heic2any 전역 번들 포함 | 변환 페이지에서만 동적 로드 |
| 7 | 기술 용어 에러 메시지 | 친절한 한국어로 |
| 8 | 서버로 파일 전송 | 100% 브라우저 처리 원칙 |
| 9 | 과장된 마케팅 문구 | 담백한 브랜드 보이스 유지 |

---

## 반드시 지킬 것

| # | 규칙 | 상세 |
|---|------|------|
| 1 | 한 페이지 광고 최대 3개 | 페이지 길이에 따라 2개로 축소 가능 |
| 2 | SEO title 패턴 | `[핵심 키워드] - [차별화 한 마디]` |
| 3 | 가이드 섹션은 FAQ 형태 | GEO(AI 검색) 최적화 |
| 4 | Schema Markup 적용 | SoftwareApplication, HowTo, FAQPage |
| 5 | 파일 제한 준수 | 50MB/파일, 일괄 10장(데스크톱)/5장(모바일) |
| 6 | 에러 메시지에 해결 방법 포함 | 사용자 친화적 UX |
| 7 | 새 서비스는 폴더만 추가 | 기존 코드 수정 최소화 |
| 8 | common/ 수정 시 하위 호환 | 기존 서비스 영향 없도록 |
| 9 | 브랜드 컬러/폰트 준수 | Tailwind config에서 토큰 사용 |

---

## 작업 순서

**상세 기획서**: `C:\Users\assag\solution\floor05\SPEC.md`

### Phase 1: 웹사이트 기반 (Day 1~2) ✅ 완료
- [x] Next.js 프로젝트 생성 + Tailwind 브랜드 토큰
- [x] Header (로고 + 도구 드롭다운 + 블로그)
- [x] Footer (브랜드 + 서비스 링크)
- [x] ToolLayout 공통 뼈대
- [x] AdSlot 컴포넌트
- [x] 메인 페이지 (Hero + 도구 카드 + 브랜드 텍스트)
- [x] 공통 컴포넌트 (FileDropzone, BeforeAfter, DownloadButton, ToolCard)

### Phase 2: 이미지 도구 (Day 3~6) ✅ 완료
- [x] 압축: 품질 슬라이더, Before/After, 목표 용량, 일괄 처리, ZIP
- [x] 리사이즈: px/%, 비율 잠금, SNS 프리셋
- [x] 포맷 변환: 자동 감지, 출력 선택, HEIC→JPG
- [x] 크롭: 영역 선택, 비율 프리셋, 회전
- [x] 워크플로우 연결 (압축→리사이즈 등)
- [x] 모바일 반응형 + 에러 처리

### Phase 3: SEO/블로그/배포 (Day 7)
- [ ] SEO 메타태그 + Schema Markup
- [ ] next-sitemap + sitemap.xml
- [ ] Vercel Analytics 연동
- [ ] AdSense / Adfit 코드 삽입
- [ ] Vercel 배포 + 도메인 연결
- [ ] 블로그 2편 작성
- [ ] Google Search Console 등록

---

## 자동 리뷰 규칙 (모든 Phase에 적용)

Phase의 모든 작업을 마치면, 완료 보고 전에 반드시 아래를 순서대로 실행한다:

### 1. 빌드 확인
```bash
npm run build
```
에러가 있으면 먼저 수정

### 2. 린트 확인
```bash
npm run lint
```
경고 0개가 될 때까지 수정

### 3. 타입 확인
```bash
npx tsc --noEmit
```
에러가 있으면 먼저 수정

### 4. 셀프 체크
아래 질문에 모두 "예"여야 함:

- [ ] 보안 위험은 없는가? (비밀키 노출, 인증 우회)
- [ ] 에러 처리가 모든 경우에 되어 있는가?
- [ ] 타입이 정확한가? (`any` 사용, 타입 단언 남용 없는지)
- [ ] Spec에서 요구한 기능이 이 Phase 범위 내에서 전부 구현되었는가?
- [ ] "절대 하지 말 것"에 해당하는 코드가 없는가?
- [ ] Skills 규칙을 위반한 부분이 없는가?

### 5. 완료 처리
위 전부 통과한 경우에만:
- 완료 보고
- tasks.md "현재 상태" 갱신

**하나라도 실패하면 완료 보고하지 말고 문제를 먼저 수정한다.**

---

## 참고 문서

| 문서 | 경로 | 내용 |
|------|------|------|
| 전체 기획서 | `SPEC.md` | 도구별 상세 스펙, 경쟁사 분석, 일정 |
| 디자인 규칙 | `.claude/skills/my-design-rules/SKILL.md` | 페이지 구조, 광고 규칙, 코드 구조 |
| 브랜드 가이드 | `.claude/skills/my-design-rules/resources/brand-guide.jsx` | 로고, 컬러, 타이포, 보이스 |
| 컬러 탐색기 | `.claude/skills/my-design-rules/resources/color-explorer.jsx` | 컬러 팔레트 옵션 |
