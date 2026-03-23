"use client";

import { useEffect, useRef, useState } from "react";
import { useCookieConsent } from "./CookieConsent";
import { ADSENSE_ID } from "@/lib/common/constants";

declare global {
  interface Window {
    adsbygoogle: Record<string, unknown>[];
  }
}

interface AdSlotProps {
  slot: "tool-below" | "cta-below" | "footer-above" | "blog-inline";
  className?: string;
}

// 슬롯별 설정
const SLOT_CONFIG: Record<string, { height: string; format: string }> = {
  "tool-below": { height: "h-24", format: "horizontal" },
  "cta-below": { height: "h-24", format: "horizontal" },
  "footer-above": { height: "h-20", format: "horizontal" },
  "blog-inline": { height: "h-32", format: "rectangle" },
};

export default function AdSlot({ slot, className = "" }: AdSlotProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [adPushed, setAdPushed] = useState(false);
  const { consented, scriptReady } = useCookieConsent();
  const isDev = process.env.NODE_ENV === "development";

  const config = SLOT_CONFIG[slot] || SLOT_CONFIG["tool-below"];

  useEffect(() => {
    // AdSense 광고 로드 (동의 + 스크립트 준비 완료 시에만)
    if (!isDev && consented && scriptReady && adRef.current && !adPushed) {
      try {
        const adsbygoogle = window.adsbygoogle || [];
        adsbygoogle.push({});
        setAdPushed(true);
      } catch {
        // 광고 로드 실패 시 무시
      }
    }
  }, [isDev, consented, scriptReady, adPushed]);

  // 개발 환경: 플레이스홀더 표시
  if (isDev) {
    return (
      <div
        className={`
          ${config.height}
          bg-brand-paper
          border border-dashed border-brand-light
          rounded-lg
          flex items-center justify-center
          ${className}
        `}
      >
        <div className="text-center">
          <p className="font-mono text-xs text-brand-light uppercase tracking-wider">
            AD SLOT
          </p>
          <p className="font-mono text-[10px] text-brand-light/60 mt-1">
            {slot}
          </p>
        </div>
      </div>
    );
  }

  // 동의하지 않은 경우: 아무것도 렌더링하지 않음
  if (!consented) {
    return null;
  }

  // AdSense 광고
  return (
    <div ref={adRef} role="complementary" aria-label="광고" className={`min-h-[90px] ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_ID}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
