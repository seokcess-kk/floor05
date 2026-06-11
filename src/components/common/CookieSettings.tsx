"use client";

import { CONSENT_KEY, CONSENT_RESET_EVENT } from "@/lib/common/constants";

/**
 * 쿠키 동의 재설정 진입점.
 * 저장된 동의를 지우고 배너를 다시 띄워, 거부했던 사용자도 결정을 바꿀 수 있게 한다.
 */
export default function CookieSettings({
  className = "",
}: {
  className?: string;
}) {
  const handleClick = () => {
    try {
      localStorage.removeItem(CONSENT_KEY);
    } catch {
      // localStorage 접근 불가 시 무시
    }
    window.dispatchEvent(new CustomEvent(CONSENT_RESET_EVENT));
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      쿠키 설정
    </button>
  );
}
