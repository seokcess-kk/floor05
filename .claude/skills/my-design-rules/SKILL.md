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
