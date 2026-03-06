# floor05 — 진행 상태

> 이 파일은 새 대화에서 "지금 어디까지 했지?"를 복구하는 핵심 문서입니다.
> Phase가 끝날 때마다 "현재 상태" 부분을 반드시 갱신하세요.

---

## 현재 상태 ← 여기를 매번 갱신!

```
마지막 완료: Phase 3 — Vercel 배포 + 도메인 연결 완료
완료 시각: 2026-03-07 00:55
다음 할 일: OG 이미지 생성, Google Search Console 등록
막힌 것: 없음
마지막 빌드: 성공 (Vercel Production 배포 완료)
```

### 배포 정보
- **Production URL**: https://www.floor05.com
- **Vercel URL**: https://floor05.vercel.app
- **GitHub**: https://github.com/seokcess-kk/floor05

### 마지막에 만들거나 수정한 파일
- `.npmrc` — legacy-peer-deps 설정 (ESLint 충돌 해결)
- `vercel.json` — Vercel 배포 설정

### 배포 완료 항목
- ✅ Vercel 배포 성공
- ✅ 커스텀 도메인 연결 (floor05.com, www.floor05.com)
- ✅ SSL 인증서 자동 발급
- ✅ GitHub 자동 배포 연동

### 남은 수동 작업
- [ ] OG 이미지 (`public/og-image.png`) 생성 (1200x630)
- [ ] Vercel 환경변수 설정 (AdSense ID 등)
- [ ] Google Search Console 등록 + sitemap 제출
- [ ] 블로그 1: '이미지 용량 줄이기 방법 총정리'
- [ ] 블로그 2: '아이폰 HEIC 사진 JPG 변환 방법'

---

## Phase 1: 웹사이트 기반 ✅ 완료
- [x] Next.js 프로젝트 생성 + Tailwind 브랜드 토큰
- [x] Header (로고 + 도구 드롭다운 + 블로그)
- [x] Footer (브랜드 + 서비스 링크)
- [x] ToolLayout 공통 뼈대 (10-section 구조)
- [x] AdSlot 컴포넌트
- [x] 메인 페이지 (Hero + 도구 카드 + 브랜드 텍스트)
- [x] 공통 컴포넌트 (FileDropzone, BeforeAfter, DownloadButton, ToolCard)
- [x] TOOLS 중앙 데이터 (`src/lib/common/tools.ts`)

### Phase 1 코드 리뷰 수정사항 ✅
- [x] Header 드롭다운 race condition 수정 (outside click + ESC)
- [x] DownloadButton 에러 처리 추가
- [x] BeforeAfter SSR 이슈 수정 (useEffect로 클라이언트 전용)
- [x] ToolCard 불필요한 삼항연산자 제거

## Phase 2: 이미지 도구 ✅ 완료
- [x] 압축: 품질 슬라이더, Before/After, 목표 용량, 일괄 처리, ZIP
- [x] 리사이즈: px/%, 비율 잠금, SNS 프리셋 (인스타, 유튜브, 네이버, 카카오, 당근)
- [x] 포맷 변환: 자동 감지, 출력 선택 (JPG/PNG/WebP), 투명 배경 처리
- [x] HEIC→JPG: heic2any 동적 로드, 별도 SEO 랜딩 페이지
- [x] 크롭: 영역 선택, 비율 프리셋 (1:1, 4:3, 16:9), 회전, 반전
- [x] 워크플로우 연결 (각 도구 페이지에 workflowCTA)
- [x] 에러 처리 (한국어 친화적 메시지)

### Phase 2 코드 리뷰 수정사항 ✅
- [x] CropTool 에러 상태 추가 (사용자에게 에러 표시)

### Phase 2 참고사항 (미사용 코드 - 향후 확장용)
- `compress.ts:quickCompress()` — 실시간 미리보기용 (미사용)
- `resize.ts:resizeWithPreset()` — 프리셋 리사이즈 헬퍼 (미사용)
- `fileUtils.ts:isImageFile()` — isSupportedFormat과 중복 (통합 가능)

## Phase 3: SEO/블로그/배포 ✅ 코드 완료
- [x] SEO 메타태그 (title, description, keywords, OG, Twitter)
- [x] Schema Markup (SoftwareApplication, HowTo, FAQPage)
- [x] next-sitemap + sitemap.xml + robots.txt
- [x] Vercel Analytics 연동
- [x] AdSense / Adfit 코드 삽입 (환경변수 설정 필요)

### Phase 3 수동 작업 (배포 후)
- [ ] Vercel 배포 + 도메인 연결
- [ ] `.env.local` 환경변수 설정
- [ ] OG 이미지 생성 (`public/og-image.png`, 1200x630)
- [ ] Google Search Console 등록
- [ ] 블로그 1: '이미지 용량 줄이기 방법 총정리'
- [ ] 블로그 2: '아이폰 HEIC 사진 JPG 변환 방법'
