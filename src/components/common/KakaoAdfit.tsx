"use client";

import { useEffect, useRef } from "react";

interface KakaoAdfitProps {
  unit: string; // Adfit 광고 단위 ID (예: "DAN-xxxxxxxx")
  width: number;
  height: number;
  className?: string;
}

const ADFIT_SCRIPT_SRC = "https://t1.daumcdn.net/kas/static/ba.min.js";

/**
 * Kakao Adfit 광고 단위.
 * - 동의/렌더 조건은 호출측(AdSlot)에서 제어하고, 여기서는 단위 렌더만 담당
 * - ba.min.js는 페이지당 한 번만 로드 (kakao_ad_area 요소를 자동 스캔)
 */
export default function KakaoAdfit({
  unit,
  width,
  height,
  className = "",
}: KakaoAdfitProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const alreadyLoaded = document.querySelector(
      `script[src="${ADFIT_SCRIPT_SRC}"]`
    );
    if (alreadyLoaded) return;

    const script = document.createElement("script");
    script.src = ADFIT_SCRIPT_SRC;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div ref={ref} role="complementary" aria-label="광고" className={className}>
      <ins
        className="kakao_ad_area"
        style={{ display: "none", width: "100%" }}
        data-ad-unit={unit}
        data-ad-width={String(width)}
        data-ad-height={String(height)}
      />
    </div>
  );
}
