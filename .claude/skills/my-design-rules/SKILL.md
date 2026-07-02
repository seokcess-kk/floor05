---
name: floor05-design-rules
description: "floor05 프로젝트의 UI/UX, 페이지 구조, 광고 배치, 코드 구조에 관한 작업을 할 때 사용. 새 페이지, 컴포넌트, 서비스 추가 시 반드시 참조."
---

# Overview

floor05(플로어공오)는 "존재하지 않는 0.5층" 컨셉의 니치 유틸리티 툴 플랫폼이다. 이 스킬은 플랫폼의 일관된 구조와 브랜드 톤을 유지하면서 서비스를 확장하기 위한 공통 규칙을 제공한다. 모든 페이지, 컴포넌트, 서비스 작업 시 이 규칙을 따른다.

## 페이지 구조

### 메인 페이지 (floor05.com)
- 상단: Hero 모션 그래픽 (CSS/Lottie, 비주류 무드) + 브랜드 카피
- 중단: 출시된 도구 카드 목록 (인터랙티브 호버)
- 하단: 브랜드 철학 텍스트
- **광고 없음**

### 헤더 (전체 공통)
- 왼쪽: floor05 로고 (홈 링크)
- 오른쪽: "도구" 드롭다운 | "블로그" 링크
- 출시된 서비스만 표시, 미출시 서비스 "준비 중" 표시 금지

### 도구 페이지 (ToolLayout 공통 뼈대)
모든 도구 페이지는 이 스크롤 흐름을 따른다:

1. 헤더 — 공통
2. 타이틀 영역 — 도구명 + 차별화 포인트 한 줄
3. **도구 본체** — 서비스별 자유 설계 (이 영역만 자유)
4. 광고 슬롯 1 — 도구 본체 바로 아래
5. 사용 가이드 — FAQ 형태 SEO 텍스트 (GEO 최적화)
6. 워크플로우 CTA — "압축 끝났나요?" + 관련 도구 카드 2~3장
7. 광고 슬롯 2 — CTA 아래
8. floor05 다른 도구 — 출시된 전체 도구 카드
9. 광고 슬롯 3 — 푸터 위 (페이지 길이에 따라 생략 가능)
10. 푸터 — 공통

```tsx
// 올바른 사용법: ToolLayout에 도구 본체를 children으로 전달
<ToolLayout title="이미지 압축" description="서버 전송 없이 브라우저에서 바로">
  <CompressTool />
</ToolLayout>
```

## 광고 규칙

- 메인 페이지: 광고 없음
- 한 페이지 최대 3개
- **도구 본체 내부(드롭존~다운로드 사이)에 광고 절대 금지**
- 도구 페이지: 도구 아래(1) + CTA 아래(2) + 푸터 위(3, 선택)
- 블로그: 인-콘텐츠 2~3개
- 퀴즈/테스트(향후): 결과 페이지 집중, 진행 중 광고 없음

## 코드 구조

```
src/
  app/
    page.tsx                        ← 메인 페이지
    blog/                           ← 블로그
    tools/
      image/compress/page.tsx       ← 이미지 압축
      image/resize/page.tsx         ← 리사이즈
      text/                         ← (향후) 새 폴더만 추가
  components/
    common/                         ← Header, Footer, ToolLayout, AdSlot
    image/                          ← 이미지 도구 전용
  lib/
    common/                         ← 공통 유틸
    image/                          ← 이미지 처리 로직
```

**새 서비스 추가 시**: `tools/[service]` + `components/[service]` + `lib/[service]` 폴더만 새로 생성. 기존 코드 수정 금지. `common/` 수정 시 하위 호환 필수.

## SEO 규칙

- title에 floor05 브랜드명 넣지 않음
- 패턴: `[핵심 키워드] - [차별화 한 마디]`
- description: 개인정보 보호 강조 + 핵심 기능 나열
- Schema Markup: SoftwareApplication, HowTo, FAQPage
- 가이드 섹션은 FAQ 형태로 작성 (GEO 최적화)

```html
<!-- 올바른 예시 -->
<title>이미지 압축 - 서버 전송 없이 브라우저에서 바로</title>
<meta name="description" content="파일이 내 기기를 떠나지 않습니다. 회원가입 없이 무제한 무료." />

<!-- 잘못된 예시 -->
<title>이미지 압축 | floor05 - 무료 온라인 도구</title>
```

## 콘텐츠 품질 & 색인 규칙 (애드센스 필수)

> 2026-07 애드센스 "가치가 별로 없는 콘텐츠(thin content)" 반려에서 도출한 규칙.
> **새 도구·블로그 페이지를 추가할 때마다 아래 체크리스트를 전부 통과해야 한다.** 하나라도 어기면 다시 반려된다.

### 1. canonical — 페이지마다 자기 것을 직접 선언

- **모든 페이지는 `metadata.alternates.canonical`을 자기 자신으로 설정한다.** 상속에 기대지 않는다.
- **`src/app/layout.tsx`(루트)에는 사이트 전역 canonical을 절대 두지 않는다.** 루트에 canonical을 두면 자기 canonical이 없는 모든 하위 페이지가 "정식 URL = 홈"으로 선언되어 색인에서 통째로 빠진다. (실제 반려 원인 1위)
- 도구 페이지: `const PAGE_URL = \`${SITE_URL}/tools/[cat]/[tool]\`;` → `alternates: { canonical: PAGE_URL }`.
- 블로그: `buildBlogMetadata(slug)`를 쓰거나 `alternates: { canonical: "/blog/[slug]" }` (metadataBase가 절대화).
- 정보 페이지(about/contact/privacy/terms): `alternates: { canonical: "/about" }` 처럼 상대경로로.

### 2. 정보·정책 페이지는 반드시 색인 허용

- **about / contact / privacy / terms에 `robots: { index: false }`를 넣지 않는다.** 애드센스 심사자는 개인정보처리방침·약관을 확인하므로 noindex면 감점이자 반려 사유.
- 이 페이지들의 `description`도 한 줄짜리("floor05 이용약관")가 아니라 내용을 요약한 문장으로 채운다.

### 3. 새 도구는 반드시 레지스트리에 등록 (고아 페이지 금지)

- **새 도구 페이지를 만들면 즉시 `src/lib/common/tools.ts`의 `TOOLS` 배열에 추가한다.** 등록해야 Header·Footer·홈·"다른 도구" 섹션에 링크가 걸린다.
- sitemap(`npm run build` 시 자동 생성)에는 있으나 내비게이션 어디서도 링크되지 않는 페이지 = **고아/도어웨이 페이지**로 저품질 신호가 된다.
- 기존 도구를 프리셋만 바꿔 재사용하는 근사 중복 랜딩(예: `jpg-to-png`·`webp-to-jpg`가 `ConvertTool` 재사용)이라도, ① 고유한 guide·FAQ를 갖추고 ② 반드시 링크를 건다.

### 4. 도구 페이지 최소 콘텐츠 분량

- `guide`: **섹션 최소 2개, 권장 3개 이상.** 각 섹션은 실질 문단(단순 한 줄 금지). intro 1문단 + 섹션 1개짜리는 thin으로 간주 → 미달.
- `faqs`: **최소 4개, 권장 5개 이상.** 도구 사용법·한계·자주 겪는 문제를 실제로 답한다.
- `workflowCTA`로 관련 도구 2~3개를 내부 링크한다.
- 이 셋(guide/faqs/workflowCTA)은 서버 렌더링되는 고유 텍스트이므로 도구의 실제 가치를 여기서 증명한다.

### 5. 복붙 boilerplate 금지 — "브라우저 처리/무료" 문구는 도구마다 새로 쓴다

- 핵심 메시지(100% 브라우저 처리·서버 미전송·무료)는 유지하되, **문장 자체를 여러 페이지에 그대로 복사하지 않는다.** 같은 문장이 여러 페이지에 반복되면 "템플릿/저가치 중복"으로 판정된다.
- 특히 아래 자리마다 **그 도구에서만 말이 되는 고유 문장**으로 쓴다:
  - FAQ의 "서버에 올라가나요?" 답변 (도구 특성과 연결: 예 EXIF 삭제 → "지우려 올린 사진이 다른 서버에 남으면 모순")
  - `guide` 문단의 프라이버시 꼬리말
  - `metadata.description` 꼬리말, 그리고 `openGraph`/`twitter`의 description (og와 twitter도 서로 조금 다르게)
  - Schema `SoftwareApplication`의 `description`
- **금지된 재사용 문구(예시):** `"아니요. 모든 처리는 브라우저 안에서 이루어지며 …"`, `"회원가입 없이 무료, 입력값은 저장·전송되지 않습니다."`, `"파일이 서버로 전송되지 않습니다."` — 이 표현이 두 페이지 이상에 똑같이 있으면 반려 위험.

### 6. 블로그 글 분량·품질

- 본문 한국어 텍스트 **1,400자 이상.** 분량 채우기용 문장 말고, 검색자가 실제로 궁금해할 수치·예시·단계로 채운다.
- h2 섹션 3개 이상 + FAQ. 글마다 고유 본문(문단 복붙 금지).
- 글을 수정하면 `src/lib/common/blog.ts`의 해당 글 `dateModified`(및 필요 시 `readTime`)를 갱신한다.

### 7. 도메인·URL 일관성

- `SITE_URL`(`constants.ts`) = `public/robots.txt`의 Host = `sitemap.xml`의 모든 loc = **전부 `https://www.floor05.com`(www, 트레일링 슬래시 없음)**.
- non-www → www 301은 `next.config.ts`의 `redirects()`에 있다. 도메인 규칙을 바꾸면 이 리다이렉트도 함께 맞춘다.
- 새 페이지 추가 후 `npm run build`로 sitemap을 재생성한다(빌드 시 자동).

### 새 페이지 추가 최종 체크리스트

```
[ ] canonical을 이 페이지 자신으로 설정 (루트 상속 금지)
[ ] 도구면 tools.ts TOOLS 배열에 등록 (내비게이션 링크 확보)
[ ] guide 섹션 2개 이상 + faqs 4개 이상 + workflowCTA
[ ] 프라이버시/무료 문구를 이 도구만의 표현으로 새로 작성 (복붙 금지)
[ ] metadata / og / twitter / schema description 각각 고유
[ ] (블로그) 본문 1,400자 이상, dateModified 갱신
[ ] npm run build → tsc → lint 통과, sitemap 재생성 확인
```

## 디자인 시스템

- ToolLayout 공통 뼈대는 일관되게, 도구 본체는 자유롭게
- "각 층마다 다른 분위기의 공간" — 서비스별 개성 허용
- 컬러, 타이포그래피는 브랜드 가이드 준수
- `common/` 컴포넌트에 특정 서비스 전용 로직 넣지 않음

## 에러 처리

- 모든 에러 메시지는 기술 용어 없이 친절한 한국어
- 해결 방법을 함께 안내
- 브라우저 미지원 기능은 에러가 아닌 해당 옵션 비활성화 + 안내로 처리

```
✅ "지원하지 않는 파일 형식입니다. JPG, PNG, WebP, HEIC 파일을 사용해주세요."
❌ "Error: Unsupported MIME type application/pdf"
```

## 파일 제한

| 항목 | 데스크톱 | 모바일 |
|------|----------|--------|
| 최대 파일 크기 | 50MB | 50MB |
| 일괄 최대 장수 | 10장 | 5장 |

## 성능 최적화

- heic2any는 변환 페이지 진입 시에만 동적 로드 (전역 번들 포함 금지)
- Web Worker로 이미지 처리 병렬화 (UI 블로킹 방지)

## Resources

상세 제품 기획서, 브랜드 가이드가 필요하면 아래 파일을 참조:

- [전체 제품 기획서](/SPEC.md)
- [브랜드 토큰](resources/brand-tokens.json) — 색상값, 폰트, 로고 규칙 (tailwind.config 연동용)
- [브랜드 가이드](resources/brand-guide.jsx) — 브랜드 가이드 전체 원본
- [브랜드 컬러옵션](resources/color-explorer.jsx) — 6개 컬러 팔레트 비교
