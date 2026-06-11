# floor05 트래픽 성장 계획

> 최종 갱신: 2026-06-11
> 이 문서는 검색 트래픽을 키우기 위한 실행 기준이다. 새 도구·블로그를 추가하거나 분기 점검 시 이 문서를 함께 갱신한다.

## 1. 목표와 현황

- **수익화 임계점**: 월 10,000 PV (SPEC §1.3). 광고 수익은 이 이후부터 의미.
- **유입 구조**: 구글 검색 → 개별 도구/블로그에 직접 진입이 주력. 메인은 브랜드·발견 보조.
- **운영 제약**: 100% 브라우저 처리(서버비 $0). 이 차별점이 곧 핵심 메시지("파일이 서버로 전송되지 않습니다").

### 자산 현황 (2026-06-11 기준)
- **도구 6개**: 압축 / 리사이즈 / 포맷 변환 / HEIC→JPG / 크롭 / **합치기(신규)**
- **블로그 14편**: 기존 10 + 신규 4(합치기, 유튜브 썸네일, 포토샵 없이 편집, 안전한 도구)

## 2. 성장 레버 (우선순위)

트래픽은 결국 **① 검색 진입점 수 × ② 진입점당 순위 × ③ 클릭률**의 함수다.

1. **진입점 늘리기** — 신규 도구(키워드 클러스터 1개 = 도구 1개) + 신규 블로그(롱테일).
2. **순위 끌어올리기** — 기술 SEO 정합성(canonical·schema·신선도), 내부 링크로 권위 분배, 토픽 클러스터.
3. **클릭률** — title 패턴 `[키워드] - [차별화 한 마디]`, FAQ 리치결과, GEO(AI 검색 인용).

## 3. 키워드 맵

### 도구 페이지 (거래형 핵심 키워드)
| 페이지 | 핵심 키워드 | 비고 |
|--------|------------|------|
| /tools/image/compress | 이미지 압축, 사진 용량 줄이기 | 최대 검색량 |
| /tools/image/resize | 이미지 리사이즈, 사진 크기 조절, SNS 크기 | 프리셋 강점 |
| /tools/image/convert | PNG JPG 변환, WebP 변환 | |
| /tools/image/heic-to-jpg | 아이폰 사진 변환, HEIC JPG | 별도 랜딩 |
| /tools/image/crop | 사진 자르기, 이미지 크롭 | |
| /tools/image/merge | 사진 합치기, 캡처 합치기 | **신규 클러스터** |

### 블로그 (정보형 롱테일 → 도구로 연결)
- 신규: 사진 합치기 가이드 / 유튜브 썸네일 크기 / 포토샵 없이 편집(필러) / 안전한 이미지 도구(GEO)
- 기존: 용량 줄이기, HEIC, 화질 vs 용량, 투명 배경, SNS·인스타 크기, 크롭, 증명사진, WebP, PNG vs JPG

### 카니발라이제이션 관리 (같은 키워드로 경쟁 방지)
- `sns-image-size`(포괄) vs `instagram-image-size`/`youtube-thumbnail-size`(개별): 포괄 글은 허브, 개별 글은 디테일로 역할 분담하고 상호 링크로 정리.
- "이미지 압축" 키워드는 **도구 compress**가 대표. 블로그(`image-compression-guide` 등)는 "방법/비교" 정보형으로 차별화하고 도구로 유도.

## 4. 내부 링크 전략 (허브-스포크 + 토픽 클러스터)

- **도구 → 블로그** (`ToolLayout`의 `relatedPostSlugs`): 각 도구가 관련 가이드 2~3편으로 링크. (이번에 도입 — 기존 0개였던 역링크 해소)
- **블로그 → 도구**: 본문 CTA로 해당 도구 유도 (기존부터 강함, 유지).
- **블로그 ↔ 블로그** (`BlogExtras`의 관련 글, `blog.ts`의 `related[]`): 주제 클러스터 형성.
  - 포맷 클러스터: png-vs-jpg ↔ webp-guide ↔ transparent-background ↔ image-quality-vs-size
  - 크기 클러스터: sns-image-size ↔ instagram-image-size ↔ youtube-thumbnail-size ↔ image-crop-guide
  - 용량 클러스터: image-compression-guide ↔ passport-photo-size ↔ image-quality-vs-size
  - 합치기/허브: image-merge-guide ↔ image-crop-guide / photo-editing-without-photoshop(필러)가 전 도구로 분배
- **필러 글**(`photo-editing-without-photoshop`)은 6개 도구 + 주요 블로그로 링크하는 허브. 신규 글은 가능하면 이 필러에 편입.

## 5. 콘텐츠 캘린더 (다음 분기 후보 12편)

검색 수요·낮은 경쟁·기존 도구로 연결 가능 여부로 선정. 카니발라이제이션 주의.

| # | 주제(작업 제목) | 타겟 키워드 | 연결 도구 |
|---|------------------|------------|-----------|
| 1 | 카카오톡 사진 용량 줄여서 보내기 | 카톡 사진 용량, 카톡 사진 원본 | compress |
| 2 | 줌·구글미트 가상배경 이미지 크기 | 줌 배경 크기, 가상배경 사이즈 | resize/crop |
| 3 | 네이버 블로그·스마트스토어 이미지 최적화 | 네이버 블로그 이미지 크기 | resize/compress |
| 4 | 카카오톡 프로필·배경 사진 크기 | 카톡 프로필 크기, 배경 사진 | resize/crop |
| 5 | 사진 용량 1MB·500KB 이하로 줄이기 | 사진 1mb 이하, 500kb | compress |
| 6 | 이력서·자소서 사진 규격과 용량 | 이력서 사진 크기, 규격 | crop/compress |
| 7 | 당근마켓·중고거래 사진 올리기 | 당근 사진 크기 | resize/merge |
| 8 | 굿노트·노션용 이미지 만들기 | 굿노트 이미지, 노션 이미지 | resize/merge |
| 9 | WebP를 JPG로 되돌리기 | webp jpg 변환, webp 안 열림 | convert |
| 10 | 스크린샷 깔끔하게 정리·합치기 | 스크린샷 합치기, 캡처 정리 | merge |
| 11 | 프로필 사진 정사각형으로 자르기 | 프로필 사진 1:1, 정사각형 | crop |
| 12 | 온라인 이미지 도구 안전하게 고르기(심화) | 이미지 도구 안전, 개인정보 | (GEO, 전 도구) |

## 6. 신규 도구 로드맵

키워드 클러스터 확장 = 가장 강한 진입점 증설. SPEC §12.3와 정합.

| 순서 | 도구 | 타겟 | 비고 |
|------|------|------|------|
| ✅ | 이미지 합치기 | 사진/캡처 합치기 | 완료 |
| 다음 | 워터마크 | 워터마크 넣기, 사진 워터마크 | SPEC P2, Canvas fillText |
| 이후 | 모자이크/블러 | 얼굴·개인정보 가리기 | 드래그 영역(크롭 패턴 재사용) |
| 이후 | 사진 회전/반전 | 사진 회전 | crop의 applyTransformations 재사용, 경량 |
| 검토 | 텍스트 도구 / PDF / 계산기 | SPEC §12.3 | 신규 Room(폴더 분리) |

> 새 도구 추가 절차: `lib/image/X.ts` + `components/image/XTool.tsx` + `app/tools/image/X/page.tsx` 생성 → `lib/common/tools.ts` 등록. 공통 컴포넌트·유틸 재사용. (기존 코드 수정 최소)

## 7. 기술 SEO 체크리스트

- [x] **도메인 단일화(www)**: `SITE_URL`(`lib/common/constants.ts`) 단일 상수로 모든 canonical/OG 통일. 도구 페이지 non-www 불일치 제거.
- [x] **블로그 per-post canonical**: 14편 전부 적용(`blog.ts` 또는 직접).
- [x] **BlogPosting 스키마 + 발행/수정일**: `BlogExtras`가 datePublished/dateModified 포함 JSON-LD 주입.
- [x] **도구↔블로그 양방향 내부링크**.
- [x] **Organization 스키마**(루트 layout).
- [x] **sitemap 자동 포함**: next-sitemap(postbuild)이 신규 경로 자동 수집.
- [ ] **Google Search Console**: 신규 도구·블로그 URL 색인 요청, 성능 모니터링.
- [ ] **lastmod 정확도**: 현재 sitemap lastmod는 빌드 시각. 추후 글별 dateModified 반영 검토.
- [ ] **OG 이미지 페이지별 차별화**: 현재 공용 `/og-image.png`. 도구/글별 OG 생성 검토.

## 8. GEO (AI 검색 최적화)

Google AI Overview·Perplexity 등에서 인용되도록:
- **FAQ 구조**(질문+답변) 유지 — AI가 발췌하기 좋음. 도구·블로그 모두 FAQPage 스키마 적용.
- **팩트 기반 차별화 진술**: "파일이 서버로 전송되지 않습니다" 같은 구체적·검증가능 문장.
- **비교/원리 콘텐츠**: `browser-image-tools-privacy`처럼 "왜/어떻게"를 설명하는 글이 인용 친화적. 분기 캘린더 #12로 심화.

## 9. 측정 (KPI)

- **공통 지표**: 페이지뷰, 유입 키워드, 체류 시간, 광고 수익. (Vercel Analytics → 트래픽 발생 후 GA4 추가)
- **도구 고유**: 사용 완료율, 워크플로우 전환율, 재방문율.
- **GA4 이벤트(예정)**: 공통 `tool_use_start`/`tool_use_complete`, 도구별 `image_download` 등(SPEC §5.1). 트래픽 발생 후 도입.
- **점검 주기**: 월 1회 Search Console 쿼리 검토 → 순위 오른 키워드는 도구/글 강화, 노출 대비 클릭 낮은 페이지는 title/description 개선.

## 10. 이번 작업 요약 / 다음 할 일

### 이번에 완료
- 신규 도구: **이미지 합치기**(`/tools/image/merge`)
- 신규 블로그 4편(합치기·유튜브 썸네일·포토샵 없이 편집·안전한 도구)
- 기술 SEO: 도메인 www 단일화, 블로그 14편 canonical + BlogPosting 스키마, 도구↔블로그 양방향 내부링크, Organization 스키마, 블로그 레지스트리(`blog.ts`)로 메타데이터 일원화

### 다음 우선순위
1. 배포 후 Search Console에 신규 URL 색인 요청 + 성능 추적
2. 콘텐츠 캘린더 상위 4편(카톡 용량, 줌 배경, 네이버 이미지, 카톡 프로필) 작성
3. 워터마크 도구 추가(다음 키워드 클러스터)
4. 트래픽 임계 도달 시 GA4 + 커스텀 이벤트 도입
