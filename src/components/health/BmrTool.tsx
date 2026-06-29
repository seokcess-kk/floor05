"use client";

import { useState, useMemo, useRef } from "react";
import { calcBmr, ACTIVITY_LEVELS, type Sex } from "@/lib/health/bmr";
import { trackToolUse } from "@/lib/common/analytics";

const kcal = (n: number) => n.toLocaleString("ko-KR");

export default function BmrTool() {
  const [sex, setSex] = useState<Sex>("male");
  const [age, setAge] = useState(30);
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(65);
  const [activityIdx, setActivityIdx] = useState(2); // 보통 활동

  const result = useMemo(
    () =>
      calcBmr({
        sex,
        age,
        heightCm: height,
        weightKg: weight,
        activityFactor: ACTIVITY_LEVELS[activityIdx].factor,
      }),
    [sex, age, height, weight, activityIdx],
  );

  const usedRef = useRef(false);
  function markUsed() {
    if (usedRef.current) return;
    usedRef.current = true;
    trackToolUse("bmr");
  }

  return (
    <div className="space-y-6">
      {/* 성별 */}
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-brand-black">성별</label>
        <div className="flex gap-2">
          {(["male", "female"] as Sex[]).map((s) => (
            <button
              key={s}
              onClick={() => {
                setSex(s);
                markUsed();
              }}
              className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                sex === s
                  ? "bg-brand-accent text-white"
                  : "bg-brand-paper text-brand-mid hover:text-brand-black"
              }`}
            >
              {s === "male" ? "남성" : "여성"}
            </button>
          ))}
        </div>
      </div>

      {/* 나이·키·몸무게 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Field label="나이" unit="세" value={age} onChange={(v) => { setAge(v); markUsed(); }} />
        <Field label="키" unit="cm" value={height} onChange={(v) => { setHeight(v); markUsed(); }} />
        <Field label="몸무게" unit="kg" value={weight} onChange={(v) => { setWeight(v); markUsed(); }} />
      </div>

      {/* 활동 수준 */}
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-brand-black">활동 수준</label>
        <div className="grid grid-cols-1 gap-2">
          {ACTIVITY_LEVELS.map((lv, i) => (
            <button
              key={lv.key}
              onClick={() => {
                setActivityIdx(i);
                markUsed();
              }}
              className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-sm transition-all ${
                activityIdx === i
                  ? "bg-brand-accent text-white"
                  : "bg-brand-paper text-brand-mid hover:text-brand-black"
              }`}
            >
              <span className="font-medium">{lv.label}</span>
              <span className={`text-xs ${activityIdx === i ? "text-white/80" : "text-brand-light"}`}>
                {lv.desc}
              </span>
            </button>
          ))}
        </div>
      </div>

      {result && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-brand-paper rounded-xl p-6 text-center">
              <p className="text-sm text-brand-mid mb-1">기초대사량 (BMR)</p>
              <p className="font-mono text-3xl font-bold text-brand-black">
                {kcal(result.bmr)}
                <span className="text-base text-brand-mid ml-1">kcal</span>
              </p>
              <p className="text-[11px] text-brand-light mt-1">가만히 있어도 쓰는 에너지</p>
            </div>
            <div className="bg-brand-black rounded-xl p-6 text-center">
              <p className="text-sm text-brand-light mb-1">하루 권장 칼로리 (TDEE)</p>
              <p className="font-mono text-3xl font-bold text-brand-paper">
                {kcal(result.tdee)}
                <span className="text-base text-brand-light ml-1">kcal</span>
              </p>
              <p className="text-[11px] text-brand-light mt-1">활동량 포함, 체중 유지 기준</p>
            </div>
          </div>

          {/* 목표별 칼로리 */}
          <div className="bg-brand-paper rounded-xl p-4 sm:p-6">
            <h3 className="font-mono text-xs text-brand-accent uppercase tracking-wider mb-4">
              목표별 하루 칼로리
            </h3>
            <div className="grid grid-cols-3 gap-3 text-center">
              <Goal label="감량" value={result.lose} hint="−500kcal" />
              <Goal label="유지" value={result.maintain} hint="TDEE" />
              <Goal label="증량" value={result.gain} hint="+400kcal" />
            </div>
          </div>

          <p className="text-xs text-brand-mid leading-relaxed">
            Mifflin-St Jeor 공식 기반 <strong>추정치</strong>입니다. 실제 필요 열량은 근육량,
            대사 상태, 생활 패턴에 따라 다릅니다. 감량은 1주 약 0.5kg을 목표로 하루 500kcal를 줄인
            값이며, 극단적인 식단은 권하지 않습니다. 입력값은 서버로 전송되지 않습니다.
          </p>
        </>
      )}
    </div>
  );
}

function Goal({ label, value, hint }: { label: string; value: number; hint: string }) {
  return (
    <div className="bg-brand-white rounded-lg p-3">
      <p className="text-xs text-brand-mid mb-0.5">{label}</p>
      <p className="font-mono text-lg text-brand-black">{kcal(value)}</p>
      <p className="text-[10px] text-brand-light mt-0.5">{hint}</p>
    </div>
  );
}

function Field({
  label,
  unit,
  value,
  onChange,
}: {
  label: string;
  unit: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs text-brand-mid">{label}</label>
      <div className="relative">
        <input
          type="number"
          min={0}
          value={value}
          onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))}
          aria-label={`${label}(${unit})`}
          className="w-full px-3 py-2.5 pr-10 rounded-lg border border-brand-light bg-brand-white text-brand-black text-lg font-mono focus:outline-none focus:border-brand-accent"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-mid text-xs">
          {unit}
        </span>
      </div>
    </div>
  );
}
