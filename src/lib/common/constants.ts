// 쿠키 동의
export const CONSENT_KEY = "floor05_cookie_consent";
export const CONSENT_CHANGE_EVENT = "floor05_consent_change";
export const CONSENT_RESET_EVENT = "floor05_consent_reset";

// 광고 — AdSense 클라이언트 ID (env 우선, 미설정 시 폴백)
export const ADSENSE_ID =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-3069814419179785";

// AdSense 광고 단위(슬롯) 숫자 ID.
// AdSense 대시보드 > 광고 > 광고 단위에서 "반응형 디스플레이" 단위를 만들고
// 발급된 숫자 ID(예: "1234567890")를 NEXT_PUBLIC_ADSENSE_SLOT_ID로 주입한다.
// 반응형 단위는 여러 위치에 재사용 가능. 미설정(빈 문자열)이면 AdSense를 렌더링하지 않는다.
export const ADSENSE_SLOT_ID = process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID || "";

// Kakao Adfit 광고 단위 ID (예: "DAN-xxxxxxxx").
// 설정 시 AdSense 슬롯이 없을 때 대체 노출. 미설정이면 Adfit을 렌더링하지 않는다.
export const ADFIT_UNIT_ID = process.env.NEXT_PUBLIC_ADFIT_UNIT_ID || "";
