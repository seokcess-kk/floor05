"use client";

import { useState, useMemo, useRef } from "react";
import { parseColor, rgbToHex, type RGB } from "@/lib/color/convert";
import { judgeContrast } from "@/lib/color/contrast";
import { trackToolUse } from "@/lib/common/analytics";

export default function ContrastTool() {
  const [fg, setFg] = useState<RGB>({ r: 51, g: 51, b: 51 });
  const [bg, setBg] = useState<RGB>({ r: 255, g: 255, b: 255 });

  const usedRef = useRef(false);
  function markUsed() {
    if (usedRef.current) return;
    usedRef.current = true;
    trackToolUse("color-contrast");
  }

  const result = useMemo(() => judgeContrast(fg, bg), [fg, bg]);
  const fgHex = rgbToHex(fg);
  const bgHex = rgbToHex(bg);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ColorField label="글자색 (전경)" hex={fgHex} onChange={(v) => { setFg(v); markUsed(); }} />
        <ColorField label="배경색" hex={bgHex} onChange={(v) => { setBg(v); markUsed(); }} />
      </div>

      {/* 미리보기 */}
      <div className="rounded-xl p-6 text-center" style={{ backgroundColor: bgHex, color: fgHex }}>
        <p className="text-2xl font-bold">큰 텍스트 미리보기 (Aa 가나다 123)</p>
        <p className="mt-2 text-base">일반 텍스트 미리보기입니다. 이 색 조합이 읽기 편한지 눈으로 확인하세요.</p>
      </div>

      {/* 대비비 */}
      <div className="bg-brand-black rounded-xl p-6 text-center">
        <p className="text-sm text-brand-light mb-1">대비비</p>
        <p className="font-mono text-5xl font-bold text-brand-paper">
          {result.ratio.toFixed(2)}
          <span className="text-2xl text-brand-light ml-1">: 1</span>
        </p>
      </div>

      {/* 판정 */}
      <div className="grid grid-cols-2 gap-3">
        <Judge label="AA · 일반 텍스트" pass={result.aaNormal} hint="4.5 : 1 이상" />
        <Judge label="AA · 큰 텍스트" pass={result.aaLarge} hint="3 : 1 이상" />
        <Judge label="AAA · 일반 텍스트" pass={result.aaaNormal} hint="7 : 1 이상" />
        <Judge label="AAA · 큰 텍스트" pass={result.aaaLarge} hint="4.5 : 1 이상" />
      </div>

      <p className="text-xs text-brand-mid leading-relaxed">
        WCAG 2.1 기준입니다. &lsquo;큰 텍스트&rsquo;는 약 18pt(굵게 14pt) 이상을 말합니다. 한국형
        웹콘텐츠 접근성 지침(KWCAG)도 본문 대비 4.5 : 1 이상을 권장합니다. 모든 계산은
        브라우저에서 이루어집니다.
      </p>
    </div>
  );
}

function ColorField({ label, hex, onChange }: { label: string; hex: string; onChange: (v: RGB) => void }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-brand-black">{label}</label>
      <div className="flex items-center gap-2">
        <label
          className="relative h-11 w-11 shrink-0 cursor-pointer overflow-hidden rounded-lg border border-brand-light"
          style={{ backgroundColor: hex }}
        >
          <input
            type="color"
            value={hex}
            onChange={(e) => onChange(parseColor(e.target.value) ?? { r: 0, g: 0, b: 0 })}
            aria-label={label}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
        </label>
        <input
          type="text"
          value={hex}
          onChange={(e) => {
            const p = parseColor(e.target.value);
            if (p) onChange(p);
          }}
          className="min-w-0 flex-1 rounded-lg border border-brand-light bg-brand-white px-3 py-2.5 font-mono text-brand-black focus:border-brand-accent focus:outline-none"
        />
      </div>
    </div>
  );
}

function Judge({ label, pass, hint }: { label: string; pass: boolean; hint: string }) {
  return (
    <div className={`rounded-xl p-4 ${pass ? "bg-brand-paper" : "bg-red-50"}`}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-brand-black">{label}</span>
        <span className={`text-sm font-bold ${pass ? "text-green-600" : "text-red-500"}`}>
          {pass ? "통과" : "실패"}
        </span>
      </div>
      <p className="mt-0.5 text-xs text-brand-mid">{hint}</p>
    </div>
  );
}
