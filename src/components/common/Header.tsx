"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { TOOLS } from "@/lib/common/tools";

function Logo() {
  return (
    <Link href="/" className="flex items-end gap-0.5 group">
      <span className="font-mono text-[15px] font-medium text-brand-black group-hover:text-brand-mid transition-colors">
        floor
      </span>
      <span className="font-mono text-[12px] font-bold text-brand-accent relative -top-1">
        05
      </span>
    </Link>
  );
}

export default function Header() {
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 감지로 드롭다운 닫기
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsToolsOpen(false);
      }
    }

    if (isToolsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isToolsOpen]);

  // ESC 키로 드롭다운 닫기
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsToolsOpen(false);
      }
    }

    if (isToolsOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isToolsOpen]);

  return (
    <header className="sticky top-0 z-50 bg-brand-white border-b border-brand-light/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* 왼쪽: 로고 */}
          <Logo />

          {/* 오른쪽: 네비게이션 */}
          <nav className="flex items-center gap-6">
            {/* 도구 드롭다운 */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsToolsOpen(!isToolsOpen)}
                className="flex items-center gap-1 font-mono text-xs text-brand-mid hover:text-brand-black transition-colors uppercase tracking-wider"
                aria-expanded={isToolsOpen}
                aria-haspopup="true"
              >
                도구
                <svg
                  className={`w-3 h-3 transition-transform ${isToolsOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* 드롭다운 메뉴 */}
              {isToolsOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-brand-white rounded-lg shadow-lg border border-brand-light/20 py-2 z-50">
                  {TOOLS.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      onClick={() => setIsToolsOpen(false)}
                      className="flex items-center justify-between px-4 py-2.5 hover:bg-brand-paper transition-colors group"
                    >
                      <span className="text-sm text-brand-black group-hover:text-brand-accent transition-colors">
                        {tool.name}
                      </span>
                      <span className="text-xs text-brand-light">
                        {tool.shortDescription}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* 블로그 링크 */}
            <Link
              href="/blog"
              className="font-mono text-xs text-brand-mid hover:text-brand-black transition-colors uppercase tracking-wider"
            >
              블로그
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
