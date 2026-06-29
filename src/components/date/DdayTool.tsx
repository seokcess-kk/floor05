"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { calcCountdown, calcAnniversary } from "@/lib/date/dday";
import {
  fromISODate,
  toISODate,
  addDays,
  todayParts,
  formatKo,
  type DateParts,
} from "@/lib/date/core";
import { trackToolUse } from "@/lib/common/analytics";

type Mode = "countdown" | "anniversary";

export default function DdayTool() {
  const [mode, setMode] = useState<Mode>("countdown");
  const [base, setBase] = useState<DateParts | null>(null);
  const [targetISO, setTargetISO] = useState("");
  const [startISO, setStartISO] = useState("");

  // 기준일·기본 입력값은 마운트 후 오늘 기준으로 설정 (하이드레이션 안전)
  useEffect(() => {
    const t = todayParts();
    setBase(t);
    setTargetISO(toISODate(addDays(t, 100)));
    setStartISO(toISODate(addDays(t, -100)));
  }, []);

  const target = useMemo(() => fromISODate(targetISO), [targetISO]);
  const start = useMemo(() => fromISODate(startISO), [startISO]);

  const countdown = useMemo(
    () => (target && base ? calcCountdown(target, base) : null),
    [target, base],
  );
  const anniversary = useMemo(
    () => (start && base ? calcAnniversary(start, base) : null),
    [start, base],
  );

  const usedRef = useRef(false);
  function markUsed() {
    if (usedRef.current) return;
    usedRef.current = true;
    trackToolUse("dday");
  }

  return (
    <div className="space-y-6">
      {/* 모드 탭 */}
      <div className="flex gap-2">
        <TabButton active={mode === "countdown"} onClick={() => setMode("countdown")}>
          남은 날 (목표일)
        </TabButton>
        <TabButton active={mode === "anniversary"} onClick={() => setMode("anniversary")}>
          지난 날 · 기념일
        </TabButton>
      </div>

      {mode === "countdown" ? (
        <>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-brand-black" htmlFor="target">
              목표일 (시험·전역·기념일 등)
            </label>
            <input
              id="target"
              type="date"
              value={targetISO}
              onChange={(e) => {
                setTargetISO(e.target.value);
                markUsed();
              }}
              className="w-full px-4 py-3 rounded-xl border border-brand-light bg-brand-white text-brand-black text-lg font-mono focus:outline-none focus:border-brand-accent"
            />
          </div>

          {countdown && (
            <div className="bg-brand-black rounded-xl p-6 text-center">
              <p className="font-mono text-5xl font-bold text-brand-paper">{countdown.label}</p>
              <p className="mt-3 text-brand-light text-sm">
                {countdown.targetLabel}
                {countdown.daysUntil > 0 && ` · ${countdown.daysUntil}일 남음`}
                {countdown.daysUntil === 0 && " · 바로 오늘입니다"}
                {countdown.daysUntil < 0 && ` · ${-countdown.daysUntil}일 지남`}
              </p>
            </div>
          )}
          <p className="text-xs text-brand-mid leading-relaxed">
            목표일 당일이 <strong>D-DAY</strong>, 하루 전이 D-1입니다. 지난 날짜를 넣으면 며칠
            지났는지(D+)를 보여줍니다.
          </p>
        </>
      ) : (
        <>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-brand-black" htmlFor="start">
              시작일 (사귄 날·출생일 등)
            </label>
            <input
              id="start"
              type="date"
              value={startISO}
              onChange={(e) => {
                setStartISO(e.target.value);
                markUsed();
              }}
              className="w-full px-4 py-3 rounded-xl border border-brand-light bg-brand-white text-brand-black text-lg font-mono focus:outline-none focus:border-brand-accent"
            />
          </div>

          {anniversary && (
            <>
              <div className="bg-brand-black rounded-xl p-6 text-center">
                <p className="text-sm text-brand-light mb-1">오늘로</p>
                <p className="font-mono text-5xl font-bold text-brand-paper">
                  {anniversary.dayCount.toLocaleString("ko-KR")}
                  <span className="text-2xl text-brand-light ml-1">일째</span>
                </p>
                <p className="mt-2 text-brand-light text-sm">
                  {anniversary.startLabel}부터 (시작일 = 1일째)
                </p>
              </div>

              <div className="bg-brand-paper rounded-xl p-4 sm:p-6">
                <h3 className="font-mono text-xs text-brand-accent uppercase tracking-wider mb-4">
                  주요 기념일
                </h3>
                <ul className="space-y-1.5">
                  {anniversary.milestones.map((m) => (
                    <li
                      key={m.name}
                      className={`flex items-center justify-between text-sm rounded-lg px-3 py-2 ${
                        m.dday === 0
                          ? "bg-brand-accent/15"
                          : m.past
                          ? "opacity-50"
                          : "bg-brand-white"
                      }`}
                    >
                      <span className="font-medium text-brand-black w-16">{m.name}</span>
                      <span className="text-brand-mid font-mono text-xs flex-1 text-center">
                        {formatKo(m.date)}
                      </span>
                      <span
                        className={`font-mono text-xs w-14 text-right ${
                          m.dday === 0 ? "text-brand-accent font-bold" : "text-brand-light"
                        }`}
                      >
                        {m.dday === 0 ? "D-DAY" : m.dday > 0 ? `D-${m.dday}` : `D+${-m.dday}`}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
          <p className="text-xs text-brand-mid leading-relaxed">
            한국 관습대로 <strong>시작일을 1일째</strong>로 셉니다. 그래서 100일은 시작일로부터
            99일 뒤입니다. 입력한 값은 서버로 전송되지 않습니다.
          </p>
        </>
      )}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
        active
          ? "bg-brand-accent text-white"
          : "bg-brand-paper text-brand-mid hover:text-brand-black"
      }`}
    >
      {children}
    </button>
  );
}
