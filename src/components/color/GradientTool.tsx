"use client";

import { useState, useMemo, useRef } from "react";
import { parseColor, rgbToHex } from "@/lib/color/convert";
import { trackToolUse } from "@/lib/common/analytics";

type GType = "linear" | "radial";
interface Stop {
  id: number;
  color: string; // hex
  pos: number; // 0~100
}

let stopSeq = 0;
const newStop = (color: string, pos: number): Stop => ({ id: stopSeq++, color, pos });

export default function GradientTool() {
  const [type, setType] = useState<GType>("linear");
  const [angle, setAngle] = useState(90);
  const [stops, setStops] = useState<Stop[]>([newStop("#C45C2C", 0), newStop("#0A0A0A", 100)]);
  const [copied, setCopied] = useState(false);

  const usedRef = useRef(false);
  function markUsed() {
    if (usedRef.current) return;
    usedRef.current = true;
    trackToolUse("color-gradient");
  }

  const css = useMemo(() => {
    const sorted = [...stops].sort((a, b) => a.pos - b.pos);
    const list = sorted.map((s) => `${s.color} ${s.pos}%`).join(", ");
    return type === "linear"
      ? `linear-gradient(${angle}deg, ${list})`
      : `radial-gradient(circle, ${list})`;
  }, [type, angle, stops]);

  function updateStop(id: number, patch: Partial<Stop>) {
    setStops((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
    markUsed();
  }
  function addStop() {
    if (stops.length >= 5) return;
    setStops((prev) => [...prev, newStop("#888888", 50)]);
    markUsed();
  }
  function removeStop(id: number) {
    if (stops.length <= 2) return;
    setStops((prev) => prev.filter((s) => s.id !== id));
    markUsed();
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(`background: ${css};`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      /* 무시 */
    }
  }

  return (
    <div className="space-y-6">
      {/* 미리보기 */}
      <div className="h-40 w-full rounded-xl border border-brand-light" style={{ background: css }} />

      {/* 타입 / 각도 */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex gap-2">
          <Seg active={type === "linear"} onClick={() => { setType("linear"); markUsed(); }}>선형</Seg>
          <Seg active={type === "radial"} onClick={() => { setType("radial"); markUsed(); }}>원형</Seg>
        </div>
        {type === "linear" && (
          <div className="flex flex-1 items-center gap-3">
            <span className="text-sm font-medium text-brand-black">각도</span>
            <input
              type="range"
              min={0}
              max={360}
              value={angle}
              onChange={(e) => { setAngle(Number(e.target.value)); markUsed(); }}
              className="flex-1 accent-brand-accent"
            />
            <span className="w-12 text-right font-mono text-sm text-brand-mid">{angle}°</span>
          </div>
        )}
      </div>

      {/* 색 정지점 */}
      <div className="space-y-2">
        {stops.map((s) => (
          <div key={s.id} className="flex items-center gap-3 rounded-lg border border-brand-light bg-brand-white p-2">
            <label
              className="relative h-9 w-9 shrink-0 cursor-pointer overflow-hidden rounded border border-brand-light"
              style={{ backgroundColor: s.color }}
            >
              <input
                type="color"
                value={s.color}
                onChange={(e) => updateStop(s.id, { color: rgbToHex(parseColor(e.target.value) ?? { r: 0, g: 0, b: 0 }) })}
                aria-label="정지점 색상"
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
            </label>
            <input
              type="text"
              value={s.color}
              onChange={(e) => { const p = parseColor(e.target.value); if (p) updateStop(s.id, { color: rgbToHex(p) }); }}
              className="w-28 rounded-lg border border-brand-light bg-brand-white px-2 py-1.5 font-mono text-sm text-brand-black focus:border-brand-accent focus:outline-none"
            />
            <div className="flex flex-1 items-center gap-2">
              <input
                type="range"
                min={0}
                max={100}
                value={s.pos}
                onChange={(e) => updateStop(s.id, { pos: Number(e.target.value) })}
                className="flex-1 accent-brand-accent"
              />
              <span className="w-10 text-right font-mono text-xs text-brand-mid">{s.pos}%</span>
            </div>
            <button
              onClick={() => removeStop(s.id)}
              disabled={stops.length <= 2}
              aria-label="정지점 삭제"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-brand-paper text-brand-mid transition-colors hover:text-brand-black disabled:opacity-30"
            >
              ✕
            </button>
          </div>
        ))}
        {stops.length < 5 && (
          <button
            onClick={addStop}
            className="w-full rounded-lg border border-dashed border-brand-light py-2 text-sm text-brand-mid transition-colors hover:text-brand-black"
          >
            + 색 추가
          </button>
        )}
      </div>

      {/* CSS 출력 */}
      <div className="flex items-center gap-3 rounded-lg bg-brand-black p-4">
        <code className="min-w-0 flex-1 truncate font-mono text-sm text-brand-paper">background: {css};</code>
        <button
          onClick={copy}
          className="shrink-0 rounded-md bg-brand-accent px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-brand-accent-light"
        >
          {copied ? "복사됨" : "CSS 복사"}
        </button>
      </div>

      <p className="text-xs text-brand-mid leading-relaxed">
        선형은 각도, 원형은 중심에서 퍼지는 그라데이션입니다. 색을 최대 5개까지 더해 정지점 위치를
        조절하세요. 모든 처리는 브라우저에서 이루어집니다.
      </p>
    </div>
  );
}

function Seg({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
        active ? "bg-brand-accent text-white" : "bg-brand-paper text-brand-mid hover:text-brand-black"
      }`}
    >
      {children}
    </button>
  );
}
