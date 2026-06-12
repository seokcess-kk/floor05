"use client";

import { useState, useEffect, useCallback } from "react";
import Script from "next/script";
import {
  CONSENT_KEY,
  CONSENT_CHANGE_EVENT,
  CONSENT_RESET_EVENT,
  ADSENSE_ID,
} from "@/lib/common/constants";

type ConsentStatus = "pending" | "accepted" | "declined";

export default function CookieConsent() {
  const [status, setStatus] = useState<ConsentStatus>("pending");
  const [mounted, setMounted] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(CONSENT_KEY);
    if (saved === "accepted" || saved === "declined") {
      setStatus(saved);
    }
  }, []);

  // 개인화 여부를 AdSense에 전달한다.
  // 동의(accepted) → 개인화 광고, 그 외(pending/declined) → 비개인화 광고(NPA).
  // requestNonPersonalizedAds는 배열 속성으로 보존되어, 각 AdSlot의 push() 시 적용된다.
  useEffect(() => {
    if (!mounted) return;
    const ads = (window.adsbygoogle = window.adsbygoogle || []);
    ads.requestNonPersonalizedAds = status === "accepted" ? 0 : 1;
  }, [mounted, status]);

  // "쿠키 설정" 재진입: 동의 초기화 → 배너 다시 표시 (광고는 비개인화로 계속 노출)
  useEffect(() => {
    const handleReset = () => {
      setStatus("pending");
      window.dispatchEvent(
        new CustomEvent(CONSENT_CHANGE_EVENT, { detail: { accepted: false } })
      );
    };
    window.addEventListener(CONSENT_RESET_EVENT, handleReset);
    return () => window.removeEventListener(CONSENT_RESET_EVENT, handleReset);
  }, []);

  const dispatchConsentChange = useCallback((accepted: boolean) => {
    window.dispatchEvent(
      new CustomEvent(CONSENT_CHANGE_EVENT, { detail: { accepted, scriptLoaded } })
    );
  }, [scriptLoaded]);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setStatus("accepted");
    // 스크립트가 이미 로드되어 있으면 즉시 이벤트 발생
    // 아니면 onLoad에서 발생
    if (scriptLoaded) {
      dispatchConsentChange(true);
    }
  };

  const handleDecline = () => {
    localStorage.setItem(CONSENT_KEY, "declined");
    setStatus("declined");
    dispatchConsentChange(false);
  };

  const handleScriptLoad = () => {
    setScriptLoaded(true);
    // 스크립트 로드 완료 후 이벤트 발생 (개인화 여부는 현재 동의 상태 기준)
    window.dispatchEvent(
      new CustomEvent(CONSENT_CHANGE_EVENT, {
        detail: { accepted: status === "accepted", scriptLoaded: true },
      })
    );
  };

  // SSR 중에는 렌더링하지 않음
  if (!mounted) return null;

  return (
    <>
      {/* AdSense 스크립트는 동의와 무관하게 로드한다.
          개인화 여부는 requestNonPersonalizedAds 플래그로 제어 (미동의 시 NPA). */}
      {ADSENSE_ID && (
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
          crossOrigin="anonymous"
          strategy="lazyOnload"
          onLoad={handleScriptLoad}
        />
      )}

      {/* 동의 배너 (pending 상태일 때만 표시) */}
      {status === "pending" && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
          <div className="max-w-2xl mx-auto bg-brand-black border border-brand-mid/30 rounded-xl p-5 sm:p-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {/* 텍스트 */}
              <div className="flex-1">
                <p className="text-brand-paper text-sm leading-relaxed">
                  맞춤 광고를 위해 쿠키를 사용합니다. 동의하지 않아도 광고는
                  표시되며, 이 경우 비개인화 광고로 제공됩니다.{" "}
                  <a
                    href="/privacy"
                    className="text-brand-accent hover:underline"
                  >
                    개인정보처리방침
                  </a>
                </p>
              </div>

              {/* 버튼 */}
              <div className="flex gap-3 shrink-0">
                <button
                  onClick={handleDecline}
                  className="px-4 py-2 text-sm text-brand-light hover:text-brand-paper transition-colors"
                >
                  거부
                </button>
                <button
                  onClick={handleAccept}
                  className="px-5 py-2 bg-brand-accent hover:bg-brand-accent-light text-white text-sm font-medium rounded-lg transition-colors"
                >
                  동의
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/**
 * 쿠키 동의 상태를 확인하는 훅
 * - localStorage에서 초기 상태 로드
 * - 커스텀 이벤트로 실시간 변경 감지
 * - 다른 탭에서의 변경도 감지
 */
export function useCookieConsent(): { consented: boolean; scriptReady: boolean } {
  const [consented, setConsented] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    // 초기 상태 로드
    const saved = localStorage.getItem(CONSENT_KEY);
    setConsented(saved === "accepted");

    // 스크립트가 이미 로드되어 있으면 준비 완료로 처리 (동의 여부와 무관).
    // adsbygoogle 큐는 라이브러리 로드 전 push도 안전하게 버퍼링한다.
    if (typeof window !== "undefined" && window.adsbygoogle) {
      setScriptReady(true);
    }

    // 커스텀 이벤트 리스닝 (동의 변경 시)
    const handleConsentChange = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setConsented(detail.accepted);
      if (detail.scriptLoaded) {
        setScriptReady(true);
      }
    };

    // storage 이벤트 리스닝 (다른 탭에서 변경 시)
    const handleStorage = (e: StorageEvent) => {
      if (e.key === CONSENT_KEY) {
        setConsented(e.newValue === "accepted");
      }
    };

    window.addEventListener(CONSENT_CHANGE_EVENT, handleConsentChange);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener(CONSENT_CHANGE_EVENT, handleConsentChange);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return { consented, scriptReady };
}
