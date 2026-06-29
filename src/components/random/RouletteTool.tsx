"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { weightedIndex } from "@/lib/random/core";
import { trackToolUse } from "@/lib/common/analytics";

interface Item {
  id: number;
  label: string;
  weight: number;
}

let seq = 0;
const mk = (label: string): Item => ({ id: seq++, label, weight: 1 });

const COLORS = ["#C45C2C", "#E8734A", "#2C3E50", "#4A6572", "#8D6E63", "#5B8C5A", "#B5651D", "#7B6D8D"];
const SIZE = 300;
const R = SIZE / 2 - 6;

export default function RouletteTool() {
  const [items, setItems] = useState<Item[]>(["한식", "중식", "일식", "양식", "분식", "치킨"].map(mk));
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotationRef = useRef(0);
  const usedRef = useRef(false);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const cx = SIZE / 2, cy = SIZE / 2;
    ctx.clearRect(0, 0, SIZE, SIZE);

    const valid = items.filter((it) => it.label.trim() !== "");
    const weights = valid.map((it) => Math.max(0.0001, it.weight));
    const total = weights.reduce((a, b) => a + b, 0);
    if (valid.length === 0 || total <= 0) {
      ctx.fillStyle = "#C9C3BB";
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();
      return;
    }

    let start = rotationRef.current;
    valid.forEach((it, i) => {
      const angle = (weights[i] / total) * Math.PI * 2;
      const end = start + angle;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, R, start, end);
      ctx.closePath();
      ctx.fillStyle = COLORS[i % COLORS.length];
      ctx.fill();
      // 라벨
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(start + angle / 2);
      ctx.textAlign = "right";
      ctx.fillStyle = "#FAFAFA";
      ctx.font = "600 14px sans-serif";
      ctx.fillText(it.label.length > 8 ? it.label.slice(0, 8) + "…" : it.label, R - 14, 5);
      ctx.restore();
      start = end;
    });

    // 중앙 원
    ctx.beginPath();
    ctx.arc(cx, cy, 18, 0, Math.PI * 2);
    ctx.fillStyle = "#0A0A0A";
    ctx.fill();
  }, [items]);

  useEffect(() => {
    draw();
  }, [draw]);

  function spin() {
    if (spinning) return;
    const valid = items.filter((it) => it.label.trim() !== "");
    if (valid.length < 2) return;
    if (!usedRef.current) {
      usedRef.current = true;
      trackToolUse("roulette");
    }
    setWinner(null);

    const weights = valid.map((it) => Math.max(0.0001, it.weight));
    const total = weights.reduce((a, b) => a + b, 0);
    const win = weightedIndex(weights);

    // 당첨 섹터의 중심 각도(현재 회전 미반영)
    let acc = 0;
    for (let i = 0; i < win; i++) acc += (weights[i] / total) * Math.PI * 2;
    const sectorCenter = acc + (weights[win] / total) * Math.PI;

    // 포인터(상단, -π/2)에 당첨 섹터 중심이 오도록 + 여러 바퀴
    const TWO_PI = Math.PI * 2;
    const base = rotationRef.current;
    const desired = -Math.PI / 2 - sectorCenter;
    let target = desired;
    // 최소 5바퀴 이상 더 돌도록 정규화
    while (target < base + 5 * TWO_PI) target += TWO_PI;

    const startRot = base;
    const delta = target - startRot;
    const duration = 3800;
    let startTime = 0;

    setSpinning(true);
    const step = (t: number) => {
      if (!startTime) startTime = t;
      const p = Math.min(1, (t - startTime) / duration);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      rotationRef.current = startRot + delta * eased;
      draw();
      if (p < 1) {
        requestAnimationFrame(step);
      } else {
        rotationRef.current = ((target % TWO_PI) + TWO_PI) % TWO_PI;
        draw();
        setWinner(valid[win].label.trim());
        setSpinning(false);
      }
    };
    requestAnimationFrame(step);
  }

  function update(id: number, patch: Partial<Item>) {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  }
  function add() {
    if (items.length >= 12) return;
    setItems((prev) => [...prev, mk("")]);
  }
  function remove(id: number) {
    if (items.length <= 2) return;
    setItems((prev) => prev.filter((it) => it.id !== id));
  }

  return (
    <div className="space-y-6">
      {/* 휠 */}
      <div className="relative mx-auto" style={{ width: SIZE, maxWidth: "100%" }}>
        {/* 포인터 */}
        <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1">
          <div className="h-0 w-0 border-x-8 border-t-[16px] border-x-transparent border-t-brand-black" />
        </div>
        <canvas
          ref={canvasRef}
          width={SIZE}
          height={SIZE}
          className="w-full"
          style={{ aspectRatio: "1 / 1" }}
        />
      </div>

      {/* 당첨 */}
      <div className="rounded-xl bg-brand-black p-5 text-center">
        {winner ? (
          <p className="text-2xl font-bold text-brand-paper">
            🎉 <span className="text-brand-accent">{winner}</span>
          </p>
        ) : (
          <p className="text-brand-light">{spinning ? "돌리는 중…" : "돌림판을 돌려보세요"}</p>
        )}
      </div>

      <button
        onClick={spin}
        disabled={spinning || items.filter((it) => it.label.trim()).length < 2}
        className="w-full rounded-xl bg-brand-accent py-4 text-lg font-medium text-white transition-colors hover:bg-brand-accent-light disabled:opacity-50"
      >
        {spinning ? "돌리는 중…" : "돌리기"}
      </button>

      {/* 항목 편집 */}
      <div className="space-y-2">
        {items.map((it, i) => (
          <div key={it.id} className="flex items-center gap-2">
            <span className="h-4 w-4 shrink-0 rounded-sm" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
            <input
              value={it.label}
              onChange={(e) => update(it.id, { label: e.target.value })}
              placeholder={`항목 ${i + 1}`}
              aria-label={`항목 ${i + 1}`}
              className="min-w-0 flex-1 rounded-lg border border-brand-light bg-brand-white px-3 py-2 text-sm text-brand-black focus:border-brand-accent focus:outline-none"
            />
            <input
              type="number"
              min={1}
              value={it.weight}
              onChange={(e) => update(it.id, { weight: Math.max(1, Number(e.target.value) || 1) })}
              aria-label={`항목 ${i + 1} 가중치`}
              title="가중치(클수록 잘 나옴)"
              className="w-14 rounded-lg border border-brand-light bg-brand-white px-2 py-2 text-right text-sm font-mono text-brand-black focus:border-brand-accent focus:outline-none"
            />
            <button
              onClick={() => remove(it.id)}
              disabled={items.length <= 2}
              aria-label="삭제"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-brand-paper text-brand-mid transition-colors hover:text-brand-black disabled:opacity-30"
            >
              ✕
            </button>
          </div>
        ))}
        {items.length < 12 && (
          <button
            onClick={add}
            className="w-full rounded-lg border border-dashed border-brand-light py-2 text-sm text-brand-mid transition-colors hover:text-brand-black"
          >
            + 항목 추가
          </button>
        )}
      </div>

      <p className="text-xs text-brand-mid leading-relaxed">
        점심 메뉴, 벌칙, 당첨자를 정할 때. 가중치를 높이면 그 항목이 더 자주 나옵니다. 결과는{" "}
        <code>crypto</code> 난수로 정해지며, 모든 처리는 브라우저에서 이루어집니다.
      </p>
    </div>
  );
}
