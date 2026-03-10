# floor05 — 진행 상태

> 이 파일은 새 대화에서 "지금 어디까지 했지?"를 복구하는 핵심 문서입니다.
> Phase가 끝날 때마다 "현재 상태" 부분을 반드시 갱신하세요.

---

## 현재 상태 ← 여기를 매번 갱신!

```
마지막 완료: Phase 4 (4-1, 4-2) - About/Contact 페이지 + 블로그 6편 추가
완료 시각: 2026-03-10
다음 할 일: Phase 4-3 (블로그 품질 개선) 또는 4-4 (최종 점검)
막힌 것: 없음
마지막 빌드: 성공
```

### 배포 정보
- **Production URL**: https://www.floor05.com
- **Vercel URL**: https://floor05.vercel.app
- **GitHub**: https://github.com/seokcess-kk/floor05

### 마지막에 만들거나 수정한 파일
- `src/app/about/page.tsx` — 소개 페이지 (신규)
- `src/app/contact/page.tsx` — 문의 페이지 (신규)
- `src/components/common/Footer.tsx` — About/Contact 링크 추가
- `src/app/blog/webp-guide/page.tsx` — WebP 포맷 가이드 (신규)
- `src/app/blog/passport-photo-size/page.tsx` — 증명사진 용량 줄이기 (신규)
- `src/app/blog/image-crop-guide/page.tsx` — 사진 자르기 가이드 (신규)
- `src/app/blog/sns-image-size/page.tsx` — SNS별 이미지 크기 (신규)
- `src/app/blog/transparent-background/page.tsx` — 이미지 배경 투명 (신규)
- `src/app/blog/image-quality-vs-size/page.tsx` — 화질 vs 용량 (신규)
- `src/app/blog/page.tsx` — 블로그 목록 업데이트

### 완료 항목
- ✅ Vercel 배포 + 커스텀 도메인 (floor05.com, www.floor05.com)
- ✅ SSL 인증서 + GitHub 자동 배포
- ✅ 파비콘 (accent 테마)
- ✅ 로고 이미지 (워드마크 PNG)
- ✅ OG 이미지 (정적 png)
- ✅ Header/Footer 로고 적용
- ✅ Google Search Console 등록 + sitemap 제출
- ✅ 블로그 10편 작성 (4편 → 10편 확장 완료)
- ✅ AdSense 설정 (메타태그, 스크립트, ads.txt)
- ✅ 개인정보처리방침 + 이용약관 페이지
- ✅ 쿠키 동의 배너 (GDPR 준수, EU 사용자 대응)
- ✅ About 페이지 (/about)
- ✅ Contact 페이지 (/contact)

### 남은 작업
- [ ] **Phase 4-3** (블로그 품질 개선 - 선택)
- [ ] **Phase 4-4** (최종 점검 - Search Console 색인 요청)
- [ ] AdSense 승인 후 실제 광고 단위 ID 적용

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

## Phase 3: SEO/블로그/배포 ✅ 완료
- [x] SEO 메타태그 (title, description, keywords, OG, Twitter)
- [x] Schema Markup (SoftwareApplication, HowTo, FAQPage)
- [x] next-sitemap + sitemap.xml + robots.txt
- [x] Vercel Analytics 연동
- [x] AdSense 코드 삽입 (메타태그, 스크립트, ads.txt)
- [x] Vercel 배포 + 도메인 연결
- [x] 브랜드 에셋 (파비콘, 로고, OG 이미지)
- [x] Google Search Console 등록 + sitemap 제출
- [x] 블로그 1: '이미지 용량 줄이기 방법 총정리'
- [x] 블로그 2: '아이폰 HEIC 사진 JPG 변환 방법'
- [x] 블로그 3: '인스타그램 사진 크기 총정리'
- [x] 블로그 4: 'PNG vs JPG 차이점'
- [x] 개인정보처리방침 페이지 (/privacy)
- [x] 이용약관 페이지 (/terms)

## Phase 3+ : AdSense 정책 준수 ✅ 완료
- [x] 쿠키 동의 배너 (CookieConsent 컴포넌트)
- [x] 동의 전 AdSense 스크립트 로드 차단
- [x] 동의 후 실시간 광고 활성화 (커스텀 이벤트)
- [x] 거부 시 광고 슬롯 미렌더링 (빈 공간 없음)
- [x] 공통 상수 분리 (constants.ts)
- [x] useCookieConsent 훅으로 상태 관리 일원화

---

## Phase 4: AdSense 승인 준비 🔄 진행 중

> **목표**: 구글 애드센스 승인 요건 충족 (2025년 기준)

### 4-1. 신뢰도 페이지 생성 ✅ 완료
- [x] About 페이지 (`/about`)
  - 블로그 운영 목적
  - 운영자 소개 (floor05 브랜드)
  - "파일이 서버로 전송되지 않습니다" 핵심 가치
- [x] Contact 페이지 (`/contact`)
  - 이메일 연락처 (contact@floor05.com)
  - 응답 시간 안내
  - FAQ 섹션
- [x] Footer에 About/Contact 링크 추가

### 4-2. 블로그 콘텐츠 확장 ✅ 완료 (4편 → 10편)
- [x] 블로그 5: 'WebP 포맷 완벽 가이드' (포맷 변환 연결)
- [x] 블로그 6: '증명사진 용량 줄이기' (압축 연결)
- [x] 블로그 7: '사진 자르기 완벽 가이드' (크롭 연결)
- [x] 블로그 8: 'SNS별 이미지 크기 총정리' (리사이즈 연결)
- [x] 블로그 9: '이미지 배경 투명하게 만들기' (포맷 변환 연결)
- [x] 블로그 10: '사진 화질 높이기 vs 용량 줄이기' (압축/리사이즈 연결)

### 4-3. 블로그 품질 개선 (선택)
- [ ] 기존 블로그 4편 글자 수 보강 (2,000자 이상)
- [ ] 블로그에 직접 제작한 이미지 1-2장 추가 (ALT 태그 포함)
- [ ] 공식 출처 링크 추가 (필요 시)

### 4-4. 최종 점검
- [ ] Google Search Console에서 모든 블로그 URL 색인 요청
- [ ] `site:floor05.com` 검색으로 색인 확인
- [ ] AdSense 재신청

### 블로그 주제 선정 기준
| 기준 | 설명 |
|------|------|
| 검색량 | 월간 검색량 1만+ 키워드 우선 |
| 도구 연결 | floor05 도구로 자연스럽게 유도 |
| 정보성 | 위키백과 스타일, 비상업적 |
| 길이 | 2,000-3,000자 (공백 제외) |

### 페이지별 요건
| 페이지 | 필수 요소 |
|--------|----------|
| About | 운영 목적, 운영자 소개, 핵심 가치 |
| Contact | 이메일, 응답 시간 안내 |
| 블로그 | H2/H3 구조, FAQ 섹션, 도구 CTA, Schema Markup |
