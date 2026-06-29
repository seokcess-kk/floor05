"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { calcBmi } from "@/lib/health/bmi";
import { trackToolUse } from "@/lib/common/analytics";

const DEFAULT_HEIGHT = 170;
const DEFAULT_WEIGHT = 65;

/** 비만도 단계별 강조색 */
const LEVEL_COLOR: Record<number, string> = {
  0: "text-brand-accent", // 정상
  1: "text-blue-400", // 저체중
  2: "text-yellow-500", // 비만 전단계
  3: "text-orange-500",
  4: "text-red-500",
  5: "text-red-600",
};

export default function BmiTool() {
  const [height, setHeight] = useState(DEFAULT_HEIGHT);
  const [weight, setWeight] = useState(DEFAULT_WEIGHT);

  const result = useMemo(() => calcBmi(height, weight), [height, weight]);

  const usedRef = useRef(false);
  useEffect(() => {
    if (usedRef.current) return;
    if (height !== DEFAULT_HEIGHT || weight !== DEFAULT_WEIGHT) {
      usedRef.current = true;
      trackToolUse("bmi");
    }
  }, [height, weight]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="키" unit="cm" value={height} onChange={setHeight} />
        <Field label="몸무게" unit="kg" value={weight} onChange={setWeight} />
      </div>

      {result ? (
        <>
          <div className="bg-brand-black rounded-xl p-6 text-center">
            <p className="text-sm text-brand-light mb-1">체질량지수 (BMI)</p>
            <p className="font-mono text-5xl font-bold text-brand-paper">{result.bmi}</p>
            <p className={`mt-2 text-lg font-semibold ${LEVEL_COLOR[result.category.level]}`}>
              {result.category.label}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-brand-paper rounded-lg p-4">
              <p className="text-xs text-brand-mid mb-1">정상 체중 범위</p>
              <p className="font-mono text-brand-black">
                {result.normalMin} ~ {result.normalMax} kg
              </p>
              <p className="text-[11px] text-brand-light mt-0.5">BMI 18.5 ~ 22.9 기준</p>
            </div>
            <div className="bg-brand-paper rounded-lg p-4">
              <p className="text-xs text-brand-mid mb-1">정상 범위까지</p>
              <p className="font-mono text-brand-black">
                {result.diffToNormal === 0
                  ? "현재 정상 범위입니다"
                  : result.diffToNormal > 0
                  ? `약 ${result.diffToNormal}kg 감량`
                  : `약 ${Math.abs(result.diffToNormal)}kg 증량`}
              </p>
            </div>
          </div>

          {/* 비만도 구간표 */}
          <div className="bg-brand-paper rounded-xl p-4 sm:p-6">
            <h3 className="font-mono text-xs text-brand-accent uppercase tracking-wider mb-4">
              대한비만학회 비만도 기준
            </h3>
            <ul className="space-y-1.5 text-sm">
              {[
                { label: "저체중", range: "18.5 미만", lv: 1 },
                { label: "정상", range: "18.5 ~ 22.9", lv: 0 },
                { label: "비만 전단계", range: "23 ~ 24.9", lv: 2 },
                { label: "1단계 비만", range: "25 ~ 29.9", lv: 3 },
                { label: "2단계 비만", range: "30 ~ 34.9", lv: 4 },
                { label: "3단계 비만", range: "35 이상", lv: 5 },
              ].map((row) => (
                <li
                  key={row.label}
                  className={`flex items-center justify-between rounded-lg px-3 py-2 ${
                    row.lv === result.category.level ? "bg-brand-white font-semibold" : ""
                  }`}
                >
                  <span className="text-brand-black">{row.label}</span>
                  <span className="font-mono text-brand-mid text-xs">{row.range}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs text-brand-mid leading-relaxed">
            BMI는 키와 몸무게만으로 계산해 근육량·체지방 분포를 반영하지 못하는 <strong>참고
            지표</strong>입니다. 구간은 대한비만학회 2022 기준(아시아인)으로, WHO 기준과는
            다릅니다. 건강 상태 판단은 의료 전문가와 상담하세요. 입력값은 서버로 전송되지 않습니다.
          </p>
        </>
      ) : (
        <div className="bg-brand-paper rounded-xl p-6 text-center text-brand-mid text-sm">
          키와 몸무게를 입력하면 BMI가 바로 계산됩니다.
        </div>
      )}
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
      <label className="block text-sm font-medium text-brand-black">{label}</label>
      <div className="relative">
        <input
          type="number"
          min={0}
          value={value}
          onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))}
          aria-label={`${label}(${unit})`}
          className="w-full px-4 py-3 pr-12 rounded-xl border border-brand-light bg-brand-white text-brand-black text-2xl font-mono focus:outline-none focus:border-brand-accent"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-mid text-sm">
          {unit}
        </span>
      </div>
    </div>
  );
}
