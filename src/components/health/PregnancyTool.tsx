"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { calcPregnancy } from "@/lib/health/pregnancy";
import { fromISODate, toISODate, addDays, formatKo, todayParts, type DateParts } from "@/lib/date/core";
import { trackToolUse } from "@/lib/common/analytics";

export default function PregnancyTool() {
  const [lmpISO, setLmpISO] = useState("");
  const [base, setBase] = useState<DateParts | null>(null);
  const [baseISO, setBaseISO] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = todayParts();
    setBase(t);
    setBaseISO(toISODate(t));
    // 기본값: 8주 전(56일 전)을 마지막 생리일로 둬 결과가 바로 보이게
    setLmpISO(toISODate(addDays(t, -56)));
    setMounted(true);
  }, []);

  const lmp = useMemo(() => fromISODate(lmpISO), [lmpISO]);
  const result = useMemo(
    () => (lmp && base ? calcPregnancy(lmp, base) : null),
    [lmp, base],
  );

  const usedRef = useRef(false);
  function markUsed() {
    if (usedRef.current) return;
    usedRef.current = true;
    trackToolUse("pregnancy");
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-brand-black" htmlFor="lmp">
            마지막 생리 시작일 (LMP)
          </label>
          <input
            id="lmp"
            type="date"
            value={lmpISO}
            onChange={(e) => {
              setLmpISO(e.target.value);
              markUsed();
            }}
            className="w-full px-4 py-3 rounded-xl border border-brand-light bg-brand-white text-brand-black text-lg font-mono focus:outline-none focus:border-brand-accent"
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-brand-black" htmlFor="base">
            기준일
          </label>
          <input
            id="base"
            type="date"
            value={baseISO}
            onChange={(e) => {
              setBaseISO(e.target.value);
              setBase(fromISODate(e.target.value));
            }}
            className="w-full px-4 py-3 rounded-xl border border-brand-light bg-brand-white text-brand-black text-lg font-mono focus:outline-none focus:border-brand-accent"
          />
        </div>
      </div>

      {mounted &&
        (result ? (
          <>
            <div className="bg-brand-black rounded-xl p-6 text-center">
              <p className="text-sm text-brand-light mb-1">현재 임신</p>
              <p className="font-mono text-5xl font-bold text-brand-paper">
                {result.weeks}
                <span className="text-2xl text-brand-light ml-1">주</span>
                <span className="text-3xl ml-2">{result.days}</span>
                <span className="text-2xl text-brand-light ml-1">일</span>
              </p>
              <p className="mt-2 text-brand-accent text-sm font-medium">{result.trimesterLabel}</p>
            </div>

            {/* 진행률 막대 */}
            <div className="bg-brand-paper rounded-xl p-4 sm:p-6">
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-xs text-brand-mid">출산까지 진행률</span>
                <span className="font-mono text-sm text-brand-black">{result.progressPercent}%</span>
              </div>
              <div className="h-2.5 bg-brand-white rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-accent rounded-full transition-all"
                  style={{ width: `${result.progressPercent}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-brand-paper rounded-lg p-4">
                <p className="text-xs text-brand-mid mb-1">출산 예정일</p>
                <p className="font-mono text-brand-black">{formatKo(result.dueDate)}</p>
                <p className="text-[11px] text-brand-light mt-0.5">LMP + 280일 기준</p>
              </div>
              <div className="bg-brand-paper rounded-lg p-4">
                <p className="text-xs text-brand-mid mb-1">출산 예정일까지</p>
                <p className="font-mono text-brand-black">
                  {result.ddayToDue > 0
                    ? `D-${result.ddayToDue}`
                    : result.ddayToDue === 0
                    ? "D-DAY"
                    : `D+${-result.ddayToDue}`}
                </p>
              </div>
            </div>

            <p className="text-xs text-brand-mid leading-relaxed">
              ⚠️ 마지막 생리일 기준 <strong>추정치</strong>입니다. 정확한 임신 주수와 출산예정일은
              초음파 검사로 확인해야 하며, 생리 주기가 불규칙하면 오차가 커집니다. 의학적 판단은
              산부인과 전문의와 상담하세요. 입력값은 서버로 전송되지 않습니다.
            </p>
          </>
        ) : (
          <div className="bg-brand-paper rounded-xl p-6 text-center text-brand-mid text-sm">
            마지막 생리 시작일이 기준일보다 앞서고, 45주 이내인지 확인해 주세요.
          </div>
        ))}
    </div>
  );
}
