"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import {
  solarToLunar,
  lunarToSolar,
  lunarBirthdayToSolar,
  LUNAR_MIN_YEAR,
  LUNAR_MAX_YEAR,
} from "@/lib/date/lunar";
import { fromISODate, toISODate, formatKo, todayParts } from "@/lib/date/core";
import { trackToolUse } from "@/lib/common/analytics";

type Mode = "s2l" | "l2s";

export default function LunarTool() {
  const [mode, setMode] = useState<Mode>("s2l");
  const [mounted, setMounted] = useState(false);

  // 양력 입력 (양력→음력)
  const [solarISO, setSolarISO] = useState("");
  // 음력 입력 (음력→양력)
  const [ly, setLy] = useState(2000);
  const [lm, setLm] = useState(1);
  const [ld, setLd] = useState(1);
  const [leap, setLeap] = useState(false);
  // 올해 양력 생일 계산용 (오늘의 양력 연도)
  const [thisYear, setThisYear] = useState(2026);

  useEffect(() => {
    const t = todayParts();
    setSolarISO(toISODate(t));
    setThisYear(t.year);
    const l = solarToLunar(t);
    if (l) {
      setLy(l.lunar.year);
      setLm(l.lunar.month);
      setLd(l.lunar.day);
      setLeap(l.leapMonth);
    }
    setMounted(true);
  }, []);

  const solar = useMemo(() => fromISODate(solarISO), [solarISO]);
  const s2lResult = useMemo(() => (solar ? solarToLunar(solar) : null), [solar]);
  const l2sResult = useMemo(
    () => lunarToSolar({ year: ly, month: lm, day: ld }, leap),
    [ly, lm, ld, leap],
  );
  // 음력 월·일을 올해/내년 양력으로 (음력 생일 → 올해 양력)
  const birthdayThisYear = useMemo(
    () => lunarBirthdayToSolar(lm, ld, leap, thisYear),
    [lm, ld, leap, thisYear],
  );
  const birthdayNextYear = useMemo(
    () => lunarBirthdayToSolar(lm, ld, leap, thisYear + 1),
    [lm, ld, leap, thisYear],
  );

  const usedRef = useRef(false);
  function markUsed() {
    if (usedRef.current) return;
    usedRef.current = true;
    trackToolUse("lunar");
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <TabButton active={mode === "s2l"} onClick={() => setMode("s2l")}>
          양력 → 음력
        </TabButton>
        <TabButton active={mode === "l2s"} onClick={() => setMode("l2s")}>
          음력 → 양력
        </TabButton>
      </div>

      {mode === "s2l" ? (
        <>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-brand-black" htmlFor="solar">
              양력 날짜
            </label>
            <input
              id="solar"
              type="date"
              value={solarISO}
              min={`${LUNAR_MIN_YEAR}-02-05`}
              max={`${LUNAR_MAX_YEAR}-12-31`}
              onChange={(e) => {
                setSolarISO(e.target.value);
                markUsed();
              }}
              className="w-full px-4 py-3 rounded-xl border border-brand-light bg-brand-white text-brand-black text-lg font-mono focus:outline-none focus:border-brand-accent"
            />
          </div>

          {mounted &&
            (s2lResult ? (
              <div className="bg-brand-black rounded-xl p-6 text-center">
                <p className="text-sm text-brand-light mb-1">음력</p>
                <p className="font-mono text-3xl sm:text-4xl font-bold text-brand-paper">
                  {s2lResult.lunar.year}. {s2lResult.lunar.month}. {s2lResult.lunar.day}
                  {s2lResult.leapMonth && (
                    <span className="text-brand-accent text-xl ml-2">(윤달)</span>
                  )}
                </p>
                <p className="mt-3 text-brand-light text-sm">
                  {formatKo(s2lResult.lunar, false)}
                  {s2lResult.ganji && ` · ${s2lResult.ganji}`}
                </p>
              </div>
            ) : (
              <RangeNote />
            ))}
        </>
      ) : (
        <>
          <div className="space-y-3">
            <label className="block text-sm font-medium text-brand-black">음력 날짜</label>
            <div className="grid grid-cols-3 gap-3">
              <NumField label="년" value={ly} min={LUNAR_MIN_YEAR} max={LUNAR_MAX_YEAR}
                onChange={(v) => { setLy(v); markUsed(); }} />
              <NumField label="월" value={lm} min={1} max={12}
                onChange={(v) => { setLm(v); markUsed(); }} />
              <NumField label="일" value={ld} min={1} max={30}
                onChange={(v) => { setLd(v); markUsed(); }} />
            </div>
            <label className="flex items-center gap-2 text-sm text-brand-mid cursor-pointer">
              <input
                type="checkbox"
                checked={leap}
                onChange={(e) => { setLeap(e.target.checked); markUsed(); }}
                className="w-4 h-4 accent-brand-accent"
              />
              윤달
            </label>
          </div>

          {mounted &&
            (l2sResult ? (
              <>
                <div className="bg-brand-black rounded-xl p-6 text-center">
                  <p className="text-sm text-brand-light mb-1">양력</p>
                  <p className="font-mono text-3xl sm:text-4xl font-bold text-brand-paper">
                    {formatKo(l2sResult.solar, false)}
                  </p>
                  <p className="mt-3 text-brand-light text-sm">
                    {formatKo(l2sResult.solar)}
                    {l2sResult.ganji && ` · ${l2sResult.ganji}`}
                  </p>
                </div>

                {/* 음력 생일 → 올해/내년 양력 (윤달 무관 월·일 기준) */}
                {birthdayThisYear && birthdayNextYear && (
                  <div className="bg-brand-paper rounded-xl p-4 sm:p-6">
                    <h3 className="font-mono text-xs text-brand-accent uppercase tracking-wider mb-3">
                      음력 {lm}월 {ld}일{leap && " (윤달)"} 생일의 양력 날짜
                    </h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="bg-brand-white rounded-lg p-3">
                        <p className="text-xs text-brand-mid mb-0.5">올해 ({thisYear})</p>
                        <p className="font-mono text-brand-black">{formatKo(birthdayThisYear)}</p>
                      </div>
                      <div className="bg-brand-white rounded-lg p-3">
                        <p className="text-xs text-brand-mid mb-0.5">내년 ({thisYear + 1})</p>
                        <p className="font-mono text-brand-black">{formatKo(birthdayNextYear)}</p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <RangeNote />
            ))}
        </>
      )}

      <p className="text-xs text-brand-mid leading-relaxed">
        한국천문연구원(KASI) 음양력 자료 기준이며 {LUNAR_MIN_YEAR}~{LUNAR_MAX_YEAR}년 양력을
        지원합니다. 같은 음력 월·일이라도 해마다 양력 날짜가 달라지므로, 음력 생일은 매년 다시
        확인하는 게 좋습니다. 입력한 값은 서버로 전송되지 않습니다.
      </p>
    </div>
  );
}

function RangeNote() {
  return (
    <div className="bg-brand-paper rounded-xl p-6 text-center text-brand-mid text-sm">
      변환할 수 없는 날짜입니다. 지원 범위({LUNAR_MIN_YEAR}~{LUNAR_MAX_YEAR}년) 안의 올바른
      날짜인지 확인해 주세요. 음력은 월별로 29~30일까지만 있습니다.
    </div>
  );
}

function NumField({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-1">
      <label className="block text-xs text-brand-mid">{label}</label>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className="w-full px-3 py-2.5 rounded-lg border border-brand-light bg-brand-white text-brand-black text-base font-mono focus:outline-none focus:border-brand-accent"
      />
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
