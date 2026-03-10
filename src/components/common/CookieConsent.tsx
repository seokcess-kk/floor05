"use client";

import { useState, useEffect } from "react";
import Script from "next/script";

const CONSENT_KEY = "floor05_cookie_consent";
const ADSENSE_ID = "ca-pub-3069814419179785";

type ConsentStatus = "pending" | "accepted" | "declined";

export default function CookieConsent() {
  const [status, setStatus] = useState<ConsentStatus>("pending");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(CONSENT_KEY);
    if (saved === "accepted" || saved === "declined") {
      setStatus(saved);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setStatus("accepted");
  };

  const handleDecline = () => {
    localStorage.setItem(CONSENT_KEY, "declined");
    setStatus("declined");
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
 * AdSlot 등에서 사용
 */
export function useCookieConsent(): boolean {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(CONSENT_KEY);
    setConsented(saved === "accepted");

    // storage 이벤트 리스닝 (다른 탭에서 변경 시)
    const handleStorage = (e: StorageEvent) => {
      if (e.key === CONSENT_KEY) {
        setConsented(e.newValue === "accepted");
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return consented;
}
