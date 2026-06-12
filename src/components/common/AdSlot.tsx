"use client";

import { useEffect, useRef, useState } from "react";
import { useCookieConsent } from "./CookieConsent";
import KakaoAdfit from "./KakaoAdfit";
import {
  ADSENSE_ID,
  ADSENSE_SLOT_ID,
  ADFIT_UNIT_ID,
} from "@/lib/common/constants";

declare global {
  interface Window {
    adsbygoogle: Record<string, unknown>[] & {
      requestNonPersonalizedAds?: number;
    };
  }
}

interface AdSlotProps {
  slot: "tool-below" | "cta-below" | "footer-above" | "blog-inline";
  className?: string;
}

// 슬롯별 설정 (Adfit 대체 노출 시 사용할 크기 포함)
const SLOT_CONFIG: Record<
  string,
  { height: string; format: string; adfitWidth: number; adfitHeight: number }
> = {
  "tool-below": { height: "h-24", format: "horizontal", adfitWidth: 320, adfitHeight: 100 },
  "cta-below": { height: "h-24", format: "horizontal", adfitWidth: 320, adfitHeight: 100 },
  "footer-above": { height: "h-20", format: "horizontal", adfitWidth: 320, adfitHeight: 50 },
  "blog-inline": { height: "h-32", format: "rectangle", adfitWidth: 300, adfitHeight: 250 },
};

export default function AdSlot({ slot, className = "" }: AdSlotProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [adPushed, setAdPushed] = useState(false);
  const { scriptReady } = useCookieConsent();
  const isDev = process.env.NODE_ENV === "development";

  const config = SLOT_CONFIG[slot] || SLOT_CONFIG["tool-below"];

  useEffect(() => {
    // AdSense 광고 로드 (스크립트 준비 + 슬롯 ID 설정 시).
    // 개인화 여부(NPA)는 CookieConsent가 전역 플래그로 제어하므로, 동의와 무관하게
    // 광고를 노출한다. 미동의 시에는 자동으로 비개인화 광고가 게재된다.
    if (!isDev && scriptReady && ADSENSE_SLOT_ID && adRef.current && !adPushed) {
      try {
        const adsbygoogle = window.adsbygoogle || [];
        adsbygoogle.push({});
        setAdPushed(true);
      } catch {
        // 광고 로드 실패 시 무시
      }
    }
  }, [isDev, scriptReady, adPushed]);

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

  // AdSense (슬롯 ID가 설정된 경우 우선)
  if (ADSENSE_SLOT_ID) {
    return (
      <div ref={adRef} role="complementary" aria-label="광고" className={`min-h-[90px] ${className}`}>
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={ADSENSE_ID}
          data-ad-slot={ADSENSE_SLOT_ID}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  // AdSense 슬롯이 없으면 Adfit으로 대체 (설정된 경우)
  if (ADFIT_UNIT_ID) {
    return (
      <KakaoAdfit
        unit={ADFIT_UNIT_ID}
        width={config.adfitWidth}
        height={config.adfitHeight}
        className={`flex justify-center ${className}`}
      />
    );
  }

  // 설정된 광고 ID가 없으면 렌더링하지 않음 (잘못된 광고 요청 방지)
  return null;
}
