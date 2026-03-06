"use client";

import { useEffect, useRef } from "react";

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
  const isDev = process.env.NODE_ENV === "development";
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const adfitId = process.env.NEXT_PUBLIC_ADFIT_UNIT_ID;

  const config = SLOT_CONFIG[slot] || SLOT_CONFIG["tool-below"];

  useEffect(() => {
    // AdSense 광고 로드
    if (!isDev && adsenseId && adRef.current) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const adsbygoogle = (window as any).adsbygoogle || [];
        adsbygoogle.push({});
      } catch {
        // 광고 로드 실패 시 무시
      }
    }
  }, [isDev, adsenseId]);

  // 개발 환경 또는 광고 ID 미설정 시 플레이스홀더 표시
  if (isDev || (!adsenseId && !adfitId)) {
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

  // AdSense 광고
  if (adsenseId) {
    return (
      <div ref={adRef} className={`${config.height} ${className}`}>
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={adsenseId}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  // Kakao Adfit 광고
  if (adfitId) {
    return (
      <div className={`${config.height} ${className}`}>
        <ins
          className="kakao_ad_area"
          style={{ display: "none" }}
          data-ad-unit={adfitId}
          data-ad-width="320"
          data-ad-height="100"
        />
      </div>
    );
  }

  return null;
}
