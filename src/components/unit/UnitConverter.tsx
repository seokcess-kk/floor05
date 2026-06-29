"use client";

import { useState, useMemo, useRef } from "react";
import { UNIT_SETS, formatUnitValue } from "@/lib/unit/units";
import { trackToolUse } from "@/lib/common/analytics";

interface Props {
  /** UNIT_SETS의 키 (length·area·temperature) */
  set: string;
  /** 트래킹용 도구 이름 */
  toolName: string;
}

/**
 * 양방향 단위 변환기 — 어느 칸에 입력하든 나머지 칸이 즉시 갱신된다.
 * props가 모두 직렬화 가능(문자열)이라 서버 컴포넌트 페이지에서 바로 렌더 가능.
 */
export default function UnitConverter({ set, toolName }: Props) {
  const cfg = UNIT_SETS[set];
  const [unitKey, setUnitKey] = useState(cfg.defaultUnit);
  const [raw, setRaw] = useState(String(cfg.defaultValue));

  // 현재 입력값을 기준단위로 변환 (빈칸/오입력이면 null)
  const base = useMemo(() => {
    if (raw.trim() === "") return null;
    const v = Number(raw);
    if (!Number.isFinite(v)) return null;
    const u = cfg.units.find((u) => u.key === unitKey);
    return u ? u.toBase(v) : null;
  }, [raw, unitKey, cfg]);

  const usedRef = useRef(false);
  function onEdit(key: string, value: string) {
    setUnitKey(key);
    setRaw(value);
    if (!usedRef.current) {
      usedRef.current = true;
      trackToolUse(toolName);
    }
  }

  return (
    <div className="space-y-3">
      {cfg.units.map((u) => {
        const active = u.key === unitKey;
        const display = active
          ? raw
          : base === null
          ? ""
          : formatUnitValue(u.fromBase(base));
        return (
          <div
            key={u.key}
            className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${
              active ? "border-brand-accent bg-brand-white" : "border-brand-light bg-brand-paper"
            }`}
          >
            <label htmlFor={`unit-${u.key}`} className="w-24 shrink-0">
              <span className="block text-sm font-medium text-brand-black">{u.label}</span>
              <span className="block text-xs text-brand-mid">{u.symbol}</span>
            </label>
            <input
              id={`unit-${u.key}`}
              type="number"
              inputMode="decimal"
              value={display}
              onChange={(e) => onEdit(u.key, e.target.value)}
              aria-label={u.label}
              className="min-w-0 flex-1 bg-transparent text-right text-2xl font-mono text-brand-black focus:outline-none"
            />
            <span className="w-8 shrink-0 text-right text-sm text-brand-mid">{u.symbol}</span>
          </div>
        );
      })}
      <p className="text-xs text-brand-mid leading-relaxed pt-1">
        어느 칸에든 값을 넣으면 나머지가 바로 바뀝니다. 모든 계산은 브라우저에서 이루어지며 입력값은
        서버로 전송되지 않습니다.
      </p>
    </div>
  );
}
