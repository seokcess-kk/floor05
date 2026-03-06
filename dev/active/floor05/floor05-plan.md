# floor05 — 아키텍처 & 설정

> 프로젝트 시작 시 한번 작성하고, 큰 구조 변경이 있을 때만 갱신합니다.
> "이 프로젝트의 기술적 뼈대"를 정리하는 문서입니다.

## 참조 문서
- Spec: `C:\Users\assag\solution\floor05\SPEC.md`
- 프로젝트 가이드: `C:\Users\assag\solution\floor05\CLAUDE.md`
- 디자인 규칙: `.claude/skills/my-design-rules/SKILL.md`
- 브랜드 가이드: `.claude/skills/my-design-rules/resources/brand-guide.jsx`

## 기술 스택

| 카테고리 | 기술 | 버전 |
|----------|------|------|
| 프레임워크 | Next.js (App Router) | 16.1.6 |
| 언어 | TypeScript | 5.x |
| 스타일링 | Tailwind CSS | 3.x |
| 이미지 처리 | Canvas API | - |
| HEIC 변환 | heic2any | 동적 로드 |
| ZIP 다운로드 | JSZip | - |
| 배포 | Vercel | 무료 티어 |

## 기술 결정

| 날짜 | 무엇을 | 왜 | Spec 어디에 |
|------|--------|-----|-----------|
| 2026-03-06 | Next.js 16 선택 | 최신 App Router + Turbopack | 9. 기술 스택 |
| 2026-03-06 | ESLint 8.57.1 다운그레이드 | eslint-config-next@16 호환 문제 | - |
| 2026-03-06 | heic2any 동적 로드 | 초기 번들 크기 최적화 | 8.3 포맷 변환 |
| 2026-03-06 | Canvas API 직접 사용 | Pica 대신 네이티브 API로 충분 | 8.2 리사이즈 |
| 2026-03-07 | TOOLS 중앙 데이터 | 4곳에서 사용하는 도구 목록 중복 제거 | - |

## 폴더 구조

```
src/
├── app/
│   ├── page.tsx                    # 메인 페이지
│   ├── layout.tsx                  # 루트 레이아웃
│   └── tools/image/
│       ├── compress/page.tsx       # 이미지 압축
│       ├── resize/page.tsx         # 리사이즈
│       ├── convert/page.tsx        # 포맷 변환
│       ├── heic-to-jpg/page.tsx    # HEIC→JPG (별도 SEO)
│       └── crop/page.tsx           # 크롭
├── components/
│   ├── common/                     # 공통 컴포넌트
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ToolLayout.tsx
│   │   ├── AdSlot.tsx
│   │   ├── ToolCard.tsx
│   │   ├── FileDropzone.tsx
│   │   ├── BeforeAfter.tsx
│   │   └── DownloadButton.tsx
│   └── image/                      # 이미지 도구 전용
│       ├── CompressTool.tsx
│       ├── ResizeTool.tsx
│       ├── ConvertTool.tsx
│       └── CropTool.tsx
└── lib/
    ├── common/
    │   ├── tools.ts                # 도구 목록 중앙 데이터
    │   └── fileUtils.ts            # 파일 유틸리티
    └── image/
        ├── compress.ts             # 압축 로직
        ├── resize.ts               # 리사이즈 로직
        ├── convert.ts              # 변환 로직
        └── crop.ts                 # 크롭 로직
```

## 핵심 설계 패턴

### 1. ToolLayout 공통 뼈대
모든 도구 페이지는 `ToolLayout`으로 감싸서 10-section 구조 유지:
1. 헤더 → 2. 타이틀 → 3. 도구 본체 → 4. 광고1 → 5. 가이드(FAQ) → 6. 워크플로우 CTA → 7. 광고2 → 8. 다른 도구 → 9. 광고3 → 10. 푸터

### 2. 100% 브라우저 처리
파일이 서버로 전송되지 않음. Canvas API + Web API로 모든 처리.

### 3. 서비스별 폴더 분리
새 서비스 추가 시: `tools/[service]` + `components/[service]` + `lib/[service]`만 생성.

## 브랜드 컬러

| 이름 | HEX | Tailwind |
|------|-----|----------|
| Black | #0A0A0A | brand-black |
| Dark | #1A1A1A | brand-dark |
| Mid | #4A4A4A | brand-mid |
| Light | #B0B0B0 | brand-light |
| Paper | #F2F0ED | brand-paper |
| White | #FAFAFA | brand-white |
| Accent | #C45C2C | brand-accent |
| Accent Light | #E8734A | brand-accent-light |

## 동시 작업 영역

| 영역 | 담당 범위 | 같이 수정하면 안 되는 파일 |
|------|----------|----------------------|
| 공통 | Header, Footer, ToolLayout | src/components/common/* |
| 이미지 도구 | 압축, 리사이즈, 변환, 크롭 | src/components/image/*, src/lib/image/* |
| 도구 목록 | 새 도구 추가 | src/lib/common/tools.ts |
