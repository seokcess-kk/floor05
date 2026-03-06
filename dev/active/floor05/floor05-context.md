# floor05 — 작업 중 발견한 것들

> 작업하면서 새로 알게 된 것, 도중에 바꾼 것, 주의점을 기록합니다.
> _plan.md는 "시작할 때 정한 뼈대", 이 파일은 "진행하면서 쌓이는 맥락"입니다.
> Phase가 진행될수록 이 파일이 길어지는 게 정상입니다.

## 작업 중 변경/발견 사항

### 2026-03-06 Next.js 15→16 업그레이드
- **뭘 바꿨나**: Next.js 15.1.0 → 16.1.6 업그레이드
- **왜**: 15.1.0에 CVE 보안 취약점 발견
- **영향**: 없음. App Router 호환 유지

### 2026-03-06 ESLint 9→8 다운그레이드
- **뭘 바꿨나**: ESLint 9.x → 8.57.1 다운그레이드, eslint.config.mjs → .eslintrc.json
- **왜**: eslint-config-next@16이 ESLint 9와 peer dependency 충돌
- **영향**: 기존 린트 룰 그대로 유지. flat config 대신 legacy config 사용

### 2026-03-06 styled-jsx 제거
- **뭘 바꿨나**: `<style jsx>` 태그를 Tailwind keyframes로 대체
- **왜**: Server Component에서 styled-jsx 사용 불가
- **영향**: `tailwind.config.ts`에 `animate-float` 키프레임 추가

### 2026-03-07 TOOLS 중앙 데이터화
- **뭘 바꿨나**: 도구 목록을 `src/lib/common/tools.ts`로 중앙화
- **왜**: Header, Footer, ToolLayout, 메인 페이지 4곳에서 중복 사용
- **영향**: 새 도구 추가 시 이 파일만 수정하면 됨

### 2026-03-07 Header 드롭다운 개선
- **뭘 바꿨나**: outside click 감지 + ESC 키 처리 추가
- **왜**: 드롭다운 열린 상태에서 다른 곳 클릭 시 안 닫히는 문제
- **영향**: 접근성 개선

### 2026-03-07 BeforeAfter SSR 수정
- **뭘 바꿨나**: `containerWidth` 초기값을 `null`로 변경, `useEffect`에서 계산
- **왜**: SSR에서 `offsetWidth` 접근 시 hydration 에러
- **영향**: 클라이언트 전용 렌더링으로 변경

### 2026-03-07 heic2any 설치
- **뭘 바꿨나**: `npm install heic2any --legacy-peer-deps`
- **왜**: ESLint peer dependency 충돌로 `--legacy-peer-deps` 필요
- **영향**: HEIC→JPG 변환 기능 활성화

### 2026-03-07 Phase 2 코드 리뷰
- **뭘 바꿨나**: CropTool.tsx에 에러 상태 표시 추가
- **왜**: 크롭 실패 시 사용자에게 피드백이 없었음
- **영향**: 다른 도구들과 일관된 에러 UX 제공

### 2026-03-07 미사용 코드 발견 (향후 확장용)
- **발견**: `quickCompress()`, `resizeWithPreset()`, `isImageFile()` 미사용
- **결정**: 향후 확장 가능성이 있어 유지. 즉시 삭제 불필요
- **영향**: 없음 (dead code지만 tree-shaking으로 번들에 미포함)

### 2026-03-07 Phase 3 SEO/Analytics 완료
- **뭘 바꿨나**:
  - `layout.tsx`: 전체 SEO 메타데이터 + Vercel Analytics + AdSense 스크립트
  - `ToolLayout`: Schema Markup (JSON-LD) props 추가
  - 각 도구 페이지: Metadata 타입 + Schema (SoftwareApplication, FAQPage, HowTo)
  - `AdSlot`: 실제 AdSense/Adfit 광고 코드 구조
  - `next-sitemap.config.js`: sitemap + robots.txt 자동 생성
- **왜**: SEO 최적화 + 수익화 준비
- **영향**: 빌드 시 `public/sitemap.xml`, `public/robots.txt` 자동 생성

### 2026-03-07 환경변수 설정 파일 추가
- **뭘 바꿨나**: `.env.local.example` 파일 생성
- **왜**: 배포 시 필요한 환경변수 문서화
- **영향**: 배포 전 `.env.local`로 복사 후 값 설정 필요

## 알려진 제약이나 주의점

- **ESLint 버전**: 8.57.1 고정. 9.x로 업그레이드 시 eslint-config-next 호환 문제
- **npm install**: `--legacy-peer-deps` 플래그 필요 (ESLint peer dependency 충돌)
- **heic2any**: 변환 페이지에서만 동적 import (번들 크기 최적화)
- **파일 제한**: 50MB/파일, 일괄 10장(데스크톱)/5장(모바일)
- **WebP 지원**: 구형 브라우저에서 미지원 시 옵션 비활성화
- **OG 이미지**: `public/og-image.png` (1200x630) 직접 생성 필요
- **환경변수**: 배포 전 `.env.local.example` → `.env.local` 복사 후 값 설정

## 참고 자료

| 자료 | 어디에 |
|------|--------|
| 전체 기획서 | `SPEC.md` |
| 프로젝트 가이드 | `CLAUDE.md` |
| 디자인 규칙 | `.claude/skills/my-design-rules/SKILL.md` |
| 브랜드 가이드 | `.claude/skills/my-design-rules/resources/brand-guide.jsx` |
| 컬러 탐색기 | `.claude/skills/my-design-rules/resources/color-explorer.jsx` |
