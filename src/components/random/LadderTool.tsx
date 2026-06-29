"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { generateLadder, traceLadder, type Ladder } from "@/lib/random/ladder";
import { trackToolUse } from "@/lib/common/analytics";

const MIN = 2;
const MAX = 8;
const W = 360;
const H = 300;
const PAD_X = 24;
const TOP = 8;
const BOTTOM = H - 8;

function resize(arr: string[], n: number): string[] {
  return Array.from({ length: n }, (_, i) => arr[i] ?? "");
}

export default function LadderTool() {
  const [count, setCount] = useState(4);
  const [names, setNames] = useState<string[]>(["", "", "", ""]);
  const [results, setResults] = useState<string[]>(["꽝", "당첨", "꽝", "꽝"]);
  const [ladder, setLadder] = useState<Ladder | null>(null);
  const [traced, setTraced] = useState<{ start: number; endCol: number; seq: number[] } | null>(null);
  const [revealed, setRevealed] = useState(false);

  const usedRef = useRef(false);
  function markUsed() {
    if (usedRef.current) return;
    usedRef.current = true;
    trackToolUse("ladder");
  }

  function setCountSafe(n: number) {
    const c = Math.max(MIN, Math.min(MAX, n));
    setCount(c);
    setNames((p) => resize(p, c));
    setResults((p) => resize(p, c));
    setLadder(null);
    setTraced(null);
  }

  function regenerate() {
    setLadder(generateLadder(count, count * 2 + 4));
    setTraced(null);
    markUsed();
  }

  function pick(start: number) {
    let l = ladder;
    if (!l) {
      l = generateLadder(count, count * 2 + 4);
      setLadder(l);
    }
    const t = traceLadder(l, start);
    setTraced({ start, endCol: t.endCol, seq: t.seq });
    markUsed();
  }

  // 경로 애니메이션 재시작
  useEffect(() => {
    if (!traced) return;
    setRevealed(false);
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setRevealed(true)));
    return () => cancelAnimationFrame(id);
  }, [traced]);

  const colX = (c: number) => PAD_X + (count === 1 ? 0 : c * ((W - 2 * PAD_X) / (count - 1)));

  const rungY = (row: number, rows: number) => TOP + ((row + 1) * (BOTTOM - TOP)) / (rows + 1);

  // 선택 경로 폴리라인 좌표
  const pathPoints = useMemo(() => {
    if (!ladder || !traced) return "";
    const { seq } = traced;
    const pts: [number, number][] = [[colX(seq[0]), TOP]];
    for (let r = 0; r < ladder.rows; r++) {
      const y = rungY(r, ladder.rows);
      pts.push([colX(seq[r]), y]);
      pts.push([colX(seq[r + 1]), y]);
    }
    pts.push([colX(seq[ladder.rows]), BOTTOM]);
    return pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  }, [ladder, traced, count]);

  return (
    <div className="space-y-5">
      {/* 인원 */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-brand-black">인원</span>
        <div className="flex gap-1.5">
          {Array.from({ length: MAX - MIN + 1 }, (_, i) => i + MIN).map((n) => (
            <button
              key={n}
              onClick={() => setCountSafe(n)}
              className={`h-9 w-9 rounded-lg text-sm font-mono transition-all ${
                count === n ? "bg-brand-accent text-white" : "bg-brand-paper text-brand-mid hover:text-brand-black"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* 참가자 이름 (상단) */}
      <Row label="참가자">
        {names.map((v, i) => (
          <input
            key={i}
            value={v}
            onChange={(e) => setNames((p) => p.map((x, j) => (j === i ? e.target.value : x)))}
            placeholder={`${i + 1}`}
            aria-label={`참가자 ${i + 1}`}
            className={`min-w-0 flex-1 rounded-lg border px-1 py-2 text-center text-sm focus:outline-none focus:border-brand-accent ${
              traced?.start === i ? "border-brand-accent bg-brand-accent/10 font-bold" : "border-brand-light bg-brand-white"
            }`}
          />
        ))}
      </Row>

      {/* 출발 버튼 (열별) */}
      <div className="flex gap-1.5">
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            onClick={() => pick(i)}
            aria-label={`${i + 1}번에서 출발`}
            className="flex-1 rounded-md bg-brand-black py-1.5 text-xs text-brand-paper transition-colors hover:bg-brand-accent"
          >
            ▼ 출발
          </button>
        ))}
      </div>

      {/* 사다리 */}
      <div className="rounded-xl bg-brand-paper p-2">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ aspectRatio: `${W} / ${H}` }} role="img" aria-label="사다리">
          {/* 세로줄 */}
          {Array.from({ length: count }, (_, c) => (
            <line key={c} x1={colX(c)} y1={TOP} x2={colX(c)} y2={BOTTOM} stroke="#C9C3BB" strokeWidth={2} strokeLinecap="round" />
          ))}
          {/* 가로줄 */}
          {ladder?.rungs.map((line, r) =>
            line.map((on, c) =>
              on ? (
                <line
                  key={`${r}-${c}`}
                  x1={colX(c)}
                  y1={rungY(r, ladder.rows)}
                  x2={colX(c + 1)}
                  y2={rungY(r, ladder.rows)}
                  stroke="#C9C3BB"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              ) : null,
            ),
          )}
          {/* 선택 경로 */}
          {ladder && traced && (
            <polyline
              key={`${traced.start}-${revealed}`}
              points={pathPoints}
              fill="none"
              stroke="#C45C2C"
              strokeWidth={3.5}
              strokeLinejoin="round"
              strokeLinecap="round"
              pathLength={1}
              style={{
                strokeDasharray: 1,
                strokeDashoffset: revealed ? 0 : 1,
                transition: "stroke-dashoffset 1.1s ease-in-out",
              }}
            />
          )}
        </svg>
      </div>

      {/* 결과 (하단) */}
      <Row label="결과">
        {results.map((v, i) => (
          <input
            key={i}
            value={v}
            onChange={(e) => setResults((p) => p.map((x, j) => (j === i ? e.target.value : x)))}
            placeholder={`${i + 1}`}
            aria-label={`결과 ${i + 1}`}
            className={`min-w-0 flex-1 rounded-lg border px-1 py-2 text-center text-sm focus:outline-none focus:border-brand-accent ${
              traced?.endCol === i ? "border-brand-accent bg-brand-accent/10 font-bold" : "border-brand-light bg-brand-white"
            }`}
          />
        ))}
      </Row>

      {/* 결과 문구 */}
      {traced && (
        <div className="rounded-xl bg-brand-black p-4 text-center text-brand-paper">
          <span className="font-medium">{names[traced.start]?.trim() || `참가자 ${traced.start + 1}`}</span>
          <span className="mx-2 text-brand-accent">→</span>
          <span className="font-bold">{results[traced.endCol]?.trim() || `결과 ${traced.endCol + 1}`}</span>
        </div>
      )}

      {/* 버튼 */}
      <div className="flex gap-2">
        <button
          onClick={regenerate}
          className="flex-1 rounded-xl bg-brand-paper py-3 text-sm font-medium text-brand-black transition-colors hover:bg-brand-light/40"
        >
          {ladder ? "사다리 다시 놓기" : "사다리 만들기"}
        </button>
      </div>

      <p className="text-xs text-brand-mid leading-relaxed">
        참가자 이름을 누르면 그 경로를 따라가 결과를 보여줍니다. 가로줄은{" "}
        <code>crypto</code> 난수로 공정하게 배치되며, 모든 처리는 브라우저에서 이루어집니다.
      </p>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <span className="block text-xs font-medium text-brand-mid">{label}</span>
      <div className="flex gap-1.5">{children}</div>
    </div>
  );
}
