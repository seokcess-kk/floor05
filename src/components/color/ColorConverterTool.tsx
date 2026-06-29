"use client";

import { useState, useMemo, useRef } from "react";
import {
  parseColor,
  rgbToHex,
  rgbToHsl,
  rgbToCmyk,
  rgbString,
  hslString,
  cmykString,
  type RGB,
} from "@/lib/color/convert";
import { trackToolUse } from "@/lib/common/analytics";

const DEFAULT: RGB = { r: 196, g: 92, b: 44 }; // floor05 accent

export default function ColorConverterTool() {
  const [rgb, setRgb] = useState<RGB>(DEFAULT);
  const [hexText, setHexText] = useState(rgbToHex(DEFAULT));
  const [copied, setCopied] = useState<string | null>(null);

  const usedRef = useRef(false);
  function markUsed() {
    if (usedRef.current) return;
    usedRef.current = true;
    trackToolUse("color-converter");
  }

  // 다른 입력(피커·슬라이더)에서 색이 바뀌면 rgb와 hex를 함께 갱신
  function applyRgb(next: RGB) {
    setRgb(next);
    setHexText(rgbToHex(next));
    markUsed();
  }

  const hex = rgbToHex(rgb);
  const hsl = useMemo(() => rgbToHsl(rgb), [rgb]);
  const cmyk = useMemo(() => rgbToCmyk(rgb), [rgb]);

  async function copy(text: string, key: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied((c) => (c === key ? null : c)), 1200);
    } catch {
      /* 클립보드 거부 시 무시 */
    }
  }

  const outputs = [
    { key: "hex", label: "HEX", value: hex },
    { key: "rgb", label: "RGB", value: rgbString(rgb) },
    { key: "hsl", label: "HSL", value: hslString(hsl) },
    { key: "cmyk", label: "CMYK", value: cmykString(cmyk) },
  ];

  return (
    <div className="space-y-6">
      {/* 미리보기 + 피커 */}
      <div className="flex items-center gap-4">
        <label
          className="relative h-24 w-24 shrink-0 cursor-pointer overflow-hidden rounded-xl border border-brand-light"
          style={{ backgroundColor: hex }}
        >
          <input
            type="color"
            value={hex}
            onChange={(e) => applyRgb(parseColor(e.target.value) ?? rgb)}
            aria-label="색상 선택"
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
        </label>
        <div className="flex-1 space-y-1.5">
          <label className="block text-sm font-medium text-brand-black" htmlFor="hex">
            HEX 입력
          </label>
          <input
            id="hex"
            type="text"
            value={hexText}
            onChange={(e) => {
              setHexText(e.target.value);
              const p = parseColor(e.target.value);
              if (p) {
                setRgb(p);
                markUsed();
              }
            }}
            placeholder="#C45C2C"
            className="w-full rounded-xl border border-brand-light bg-brand-white px-4 py-3 font-mono text-xl text-brand-black focus:border-brand-accent focus:outline-none"
          />
          <p className="text-xs text-brand-mid">#RGB·#RRGGBB·rgb()·hsl() 형식을 인식합니다.</p>
        </div>
      </div>

      {/* RGB 슬라이더 */}
      <div className="space-y-3 rounded-xl bg-brand-paper p-4 sm:p-6">
        {(["r", "g", "b"] as const).map((ch) => (
          <div key={ch} className="flex items-center gap-3">
            <span className="w-5 font-mono text-sm font-medium text-brand-black uppercase">{ch}</span>
            <input
              type="range"
              min={0}
              max={255}
              value={rgb[ch]}
              onChange={(e) => applyRgb({ ...rgb, [ch]: Number(e.target.value) })}
              className="flex-1 accent-brand-accent"
            />
            <input
              type="number"
              min={0}
              max={255}
              value={rgb[ch]}
              onChange={(e) =>
                applyRgb({ ...rgb, [ch]: Math.min(255, Math.max(0, Number(e.target.value) || 0)) })
              }
              className="w-16 rounded-lg border border-brand-light bg-brand-white px-2 py-1.5 text-right font-mono text-sm text-brand-black focus:border-brand-accent focus:outline-none"
            />
          </div>
        ))}
      </div>

      {/* 출력 + 복사 */}
      <div className="space-y-2">
        {outputs.map((o) => (
          <div key={o.key} className="flex items-center gap-3 rounded-lg border border-brand-light bg-brand-white p-3">
            <span className="w-12 shrink-0 font-mono text-xs text-brand-mid">{o.label}</span>
            <span className="min-w-0 flex-1 truncate font-mono text-brand-black">{o.value}</span>
            <button
              onClick={() => copy(o.value, o.key)}
              className="shrink-0 rounded-md bg-brand-paper px-3 py-1.5 text-xs font-medium text-brand-mid transition-colors hover:text-brand-black"
            >
              {copied === o.key ? "복사됨" : "복사"}
            </button>
          </div>
        ))}
      </div>

      <p className="text-xs text-brand-mid leading-relaxed">
        CMYK는 화면(RGB) 기준의 근사 변환으로, 실제 인쇄 색은 용지·잉크 프로파일에 따라 달라집니다.
        모든 변환은 브라우저에서 이루어지며 입력값은 서버로 전송되지 않습니다.
      </p>
    </div>
  );
}
