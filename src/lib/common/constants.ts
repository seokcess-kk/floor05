// 사이트 정식 도메인 (canonical/OG/구조화데이터 단일 진실 공급원)
// 모든 페이지·sitemap·robots가 www 호스트로 통일되어야 색인 신호가 분산되지 않는다.
// env로 덮어쓸 수 있으나 폴백 기본값도 반드시 www 형태를 유지한다.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.floor05.com";

// 쿠키 동의
export const CONSENT_KEY = "floor05_cookie_consent";
export const CONSENT_CHANGE_EVENT = "floor05_consent_change";
export const CONSENT_RESET_EVENT = "floor05_consent_reset";

// 광고 — AdSense 클라이언트 ID (env 우선, 미설정 시 폴백)
export const ADSENSE_ID =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-3069814419179785";

// AdSense 광고 단위(슬롯) 숫자 ID.
// floor05_horizon_ad (반응형 디스플레이) 단위 ID를 기본값으로 사용하며,
// 필요 시 NEXT_PUBLIC_ADSENSE_SLOT_ID 환경변수로 덮어쓸 수 있다.
// 반응형 단위는 여러 위치(도구 아래·CTA 아래·푸터 위)에 재사용 가능.
// 빈 문자열이면 AdSense를 렌더링하지 않는다(잘못된 광고 요청 방지).
export const ADSENSE_SLOT_ID =
  process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID || "3227968565";

// Kakao Adfit 광고 단위 ID (예: "DAN-xxxxxxxx").
// 설정 시 AdSense 슬롯이 없을 때 대체 노출. 미설정이면 Adfit을 렌더링하지 않는다.
export const ADFIT_UNIT_ID = process.env.NEXT_PUBLIC_ADFIT_UNIT_ID || "";
