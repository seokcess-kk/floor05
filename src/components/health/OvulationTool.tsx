"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { calcOvulation, type Cycle } from "@/lib/health/ovulation";
import { fromISODate, toISODate, formatKo, todayParts } from "@/lib/date/core";
import { trackToolUse } from "@/lib/common/analytics";

const CYCLE_PRESETS = [26, 28, 30, 32];

export default function OvulationTool() {
  const [lastISO, setLastISO] = useState("");
  const [cycle, setCycle] = useState(28);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLastISO(toISODate(todayParts()));
    setMounted(true);
  }, []);

  const last = useMemo(() => fromISODate(lastISO), [lastISO]);
  const result = useMemo(
    () => (last ? calcOvulation(last, cycle) : null),
    [last, cycle],
  );

  const usedRef = useRef(false);
  function markUsed() {
    if (usedRef.current) return;
    usedRef.current = true;
    trackToolUse("ovulation");
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-brand-black" htmlFor="last">
            마지막 생리 시작일
          </label>
          <input
            id="last"
            type="date"
            value={lastISO}
            onChange={(e) => {
              setLastISO(e.target.value);
              markUsed();
            }}
            className="w-full px-4 py-3 rounded-xl border border-brand-light bg-brand-white text-brand-black text-lg font-mono focus:outline-none focus:border-brand-accent"
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-brand-black" htmlFor="cycle">
            평균 생리 주기
          </label>
          <div className="relative">
            <input
              id="cycle"
              type="number"
              min={20}
              max={45}
              value={cycle}
              onChange={(e) => {
                setCycle(Number(e.target.value) || 0);
                markUsed();
              }}
              className="w-full px-4 py-3 pr-10 rounded-xl border border-brand-light bg-brand-white text-brand-black text-lg font-mono focus:outline-none focus:border-brand-accent"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-mid text-sm">
              일
            </span>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {CYCLE_PRESETS.map((p) => (
              <button
                key={p}
                onClick={() => {
                  setCycle(p);
                  markUsed();
                }}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                  cycle === p
                    ? "bg-brand-accent text-white"
                    : "bg-brand-paper text-brand-mid hover:text-brand-black"
                }`}
              >
                {p}일
              </button>
            ))}
          </div>
        </div>
      </div>

      {mounted &&
        (result ? (
          <>
            {/* 이번 주기 핵심 */}
            <div className="bg-brand-black rounded-xl p-6 text-center">
              <p className="text-sm text-brand-light mb-1">배란 예정일</p>
              <p className="font-mono text-2xl sm:text-3xl font-bold text-brand-paper">
                {formatKo(result.current.ovulation)}
              </p>
              <p className="mt-3 text-brand-light text-sm">
                가임기 {formatKo(result.current.fertileStart, false)} ~{" "}
                {formatKo(result.current.fertileEnd, false)}
              </p>
            </div>

            {/* 향후 주기 */}
            <div className="bg-brand-paper rounded-xl p-4 sm:p-6">
              <h3 className="font-mono text-xs text-brand-accent uppercase tracking-wider mb-4">
                향후 주기 예측
              </h3>
              <div className="space-y-3">
                {result.cycles.map((c, i) => (
                  <CycleRow key={i} cycle={c} index={i} />
                ))}
              </div>
            </div>

            <p className="text-xs text-brand-mid leading-relaxed">
              ⚠️ 황체기 14일을 가정한 <strong>평균 모델 추정치</strong>입니다. 생리 주기는 스트레스,
              건강 상태에 따라 달라지므로 실제 배란일과 다를 수 있습니다. 피임이나 임신 계획의 의학적
              판단은 이 결과만으로 대신할 수 없으며, 산부인과 전문의와 상담하세요. 입력값은 서버로
              전송되지 않습니다.
            </p>
          </>
        ) : (
          <div className="bg-brand-paper rounded-xl p-6 text-center text-brand-mid text-sm">
            생리 주기는 20~45일 사이로 입력해 주세요.
          </div>
        ))}
    </div>
  );
}

function CycleRow({ cycle, index }: { cycle: Cycle; index: number }) {
  return (
    <div className="bg-brand-white rounded-lg p-3 text-sm">
      <p className="text-xs text-brand-mid mb-1">
        {index === 0 ? "이번 주기" : `${index + 1}번째 주기`}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 text-brand-black">
        <span>
          <span className="text-brand-mid">배란 </span>
          <span className="font-mono">{formatKo(cycle.ovulation, false)}</span>
        </span>
        <span>
          <span className="text-brand-mid">가임기 </span>
          <span className="font-mono">
            {cycle.fertileStart.month}.{cycle.fertileStart.day}~{cycle.fertileEnd.month}.
            {cycle.fertileEnd.day}
          </span>
        </span>
        <span>
          <span className="text-brand-mid">다음 생리 </span>
          <span className="font-mono">{formatKo(cycle.period, false)}</span>
        </span>
      </div>
    </div>
  );
}
