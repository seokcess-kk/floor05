"use client";

import { useState, useEffect, useCallback } from "react";
import Script from "next/script";
import { CONSENT_KEY, CONSENT_CHANGE_EVENT, ADSENSE_ID } from "@/lib/common/constants";

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
    // 스크립트 로드 완료 후 이벤트 발생
    window.dispatchEvent(
      new CustomEvent(CONSENT_CHANGE_EVENT, { detail: { accepted: true, scriptLoaded: true } })
    );
  };

  // SSR 중에는 렌더링하지 않음
  if (!mounted) return null;

  return (
    <>
      {/* 동의한 경우에만 AdSense 로드 */}
      {status === "accepted" && (
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
                  광고 제공을 위해 쿠키를 사용합니다.{" "}
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
    const isAccepted = saved === "accepted";
    setConsented(isAccepted);

    // 이미 스크립트가 로드되어 있는지 확인
    if (isAccepted && typeof window !== "undefined") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const adsbygoogle = (window as any).adsbygoogle;
      if (adsbygoogle) {
        setScriptReady(true);
      }
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
