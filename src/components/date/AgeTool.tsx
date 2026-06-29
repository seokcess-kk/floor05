"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { calcAge } from "@/lib/date/age";
import { fromISODate, toISODate, todayParts, type DateParts } from "@/lib/date/core";
import { trackToolUse } from "@/lib/common/analytics";

const DEFAULT_BIRTH = "1995-05-15";

export default function AgeTool() {
  const [birthISO, setBirthISO] = useState(DEFAULT_BIRTH);
  // 기준일은 하이드레이션 불일치 방지를 위해 마운트 후 설정한다(서버=UTC, 클라이언트=KST 차이 회피)
  const [base, setBase] = useState<DateParts | null>(null);
  const [baseISO, setBaseISO] = useState("");

  useEffect(() => {
    const t = todayParts();
    setBase(t);
    setBaseISO(toISODate(t));
  }, []);

  const birth = useMemo(() => fromISODate(birthISO), [birthISO]);
  const result = useMemo(
    () => (birth && base ? calcAge(birth, base) : null),
    [birth, base],
  );

  // 생년월일을 기본값에서 바꾼 순간 = 실제 사용 (세션당 1회)
  const usedRef = useRef(false);
  useEffect(() => {
    if (usedRef.current) return;
    if (birthISO !== DEFAULT_BIRTH) {
      usedRef.current = true;
      trackToolUse("age");
    }
  }, [birthISO]);

  return (
    <div className="space-y-6">
      {/* 입력 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-brand-black" htmlFor="birth">
            생년월일
          </label>
          <input
            id="birth"
            type="date"
            value={birthISO}
            min="1900-01-01"
            max={baseISO || undefined}
            onChange={(e) => setBirthISO(e.target.value)}
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

      {/* 핵심 결과: 만 나이 */}
      {result ? (
        <>
          <div className="bg-brand-black rounded-xl p-6 text-center">
            <p className="text-sm text-brand-light mb-1">만 나이</p>
            <p className="font-mono text-5xl font-bold text-brand-paper">
              {result.manAge}
              <span className="text-2xl text-brand-light ml-1">세</span>
            </p>
            <p className="mt-2 text-brand-light text-sm">
              만 {result.manAge}세 {result.months}개월 {result.days}일
            </p>
            {result.isBirthdayToday ? (
              <p className="mt-3 inline-block bg-brand-accent/20 text-brand-accent text-sm font-medium px-3 py-1 rounded-full">
                🎂 오늘이 생일입니다
              </p>
            ) : (
              <p className="mt-3 text-sm text-brand-light">
                다음 생일까지{" "}
                <span className="text-brand-accent font-mono font-bold">
                  D-{result.nextBirthdayDday}
                </span>
              </p>
            )}
          </div>

          {/* 보조 정보 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Stat label="연 나이" value={`${result.yearAge}세`} hint="현재연도 − 출생연도" />
            <Stat label="세는 나이" value={`${result.koreanAge}세`} hint="옛 한국식(참고)" />
            <Stat label="띠" value={`${result.zodiac}띠`} hint="양력 연도 기준" />
            <Stat
              label="태어난 지"
              value={`${result.totalDays.toLocaleString("ko-KR")}일`}
              hint="총 일수"
            />
          </div>

          <p className="text-xs text-brand-mid leading-relaxed">
            2023년 6월 28일 <strong>만 나이 통일법</strong> 시행 이후, 법령·계약·공문서의 나이는
            특별한 언급이 없으면 모두 <strong>만 나이</strong>를 뜻합니다. 입력한 값은 서버로
            전송되지 않습니다.
          </p>
        </>
      ) : (
        <div className="bg-brand-paper rounded-xl p-6 text-center text-brand-mid text-sm">
          생년월일을 입력하면 만 나이가 바로 계산됩니다.
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="bg-brand-paper rounded-lg p-3 text-center">
      <p className="text-xs text-brand-mid mb-0.5">{label}</p>
      <p className="font-mono text-lg text-brand-black">{value}</p>
      <p className="text-[10px] text-brand-light mt-0.5">{hint}</p>
    </div>
  );
}
