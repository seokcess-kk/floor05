"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { calcLoan, type RepayMethod } from "@/lib/calc/loan";
import { trackToolUse } from "@/lib/common/analytics";

const won = (n: number) => n.toLocaleString("ko-KR");

const METHODS: { key: RepayMethod; label: string; desc: string }[] = [
  { key: "equalPayment", label: "원리금균등", desc: "매월 같은 금액" },
  { key: "equalPrincipal", label: "원금균등", desc: "원금 균등, 이자 감소" },
  { key: "bullet", label: "만기일시", desc: "매월 이자만, 만기에 원금" },
];

export default function LoanTool() {
  const [principalManwon, setPrincipalManwon] = useState(3000);
  const [ratePct, setRatePct] = useState(5);
  const [months, setMonths] = useState(36);
  const [method, setMethod] = useState<RepayMethod>("equalPayment");

  const result = useMemo(
    () =>
      calcLoan({
        principal: principalManwon * 10_000,
        annualRatePct: ratePct,
        months,
        method,
      }),
    [principalManwon, ratePct, months, method],
  );

  const usedRef = useRef(false);
  useEffect(() => {
    if (usedRef.current) return;
    if (principalManwon !== 3000 || ratePct !== 5 || months !== 36) {
      usedRef.current = true;
      trackToolUse("loan");
    }
  }, [principalManwon, ratePct, months]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Field label="대출 원금" unit="만원" value={principalManwon} step={100}
          onChange={setPrincipalManwon} big />
        <Field label="연이율" unit="%" value={ratePct} step={0.1} onChange={setRatePct} />
        <Field label="대출 기간" unit="개월" value={months} step={1} onChange={setMonths} />
      </div>

      {/* 상환 방식 */}
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-brand-black">상환 방식</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {METHODS.map((m) => (
            <button
              key={m.key}
              onClick={() => setMethod(m.key)}
              className={`px-3 py-2.5 rounded-lg text-left transition-all ${
                method === m.key
                  ? "bg-brand-accent text-white"
                  : "bg-brand-paper text-brand-mid hover:text-brand-black"
              }`}
            >
              <span className="block text-sm font-medium">{m.label}</span>
              <span className={`block text-xs ${method === m.key ? "text-white/80" : "text-brand-light"}`}>
                {m.desc}
              </span>
            </button>
          ))}
        </div>
      </div>

      {result && (
        <>
          <div className="bg-brand-black rounded-xl p-6 text-center">
            <p className="text-sm text-brand-light mb-1">
              {method === "equalPayment"
                ? "매월 상환액"
                : method === "equalPrincipal"
                ? "첫 달 상환액"
                : "매월 이자"}
            </p>
            <p className="font-mono text-4xl sm:text-5xl font-bold text-brand-paper">
              {won(result.firstPayment)}
              <span className="text-xl text-brand-light ml-1">원</span>
            </p>
            {method === "equalPrincipal" && (
              <p className="mt-2 text-brand-light text-sm">
                마지막 달 {won(result.lastPayment)}원까지 매월 감소
              </p>
            )}
            {method === "bullet" && (
              <p className="mt-2 text-brand-light text-sm">
                만기에 원금 {won(result.principal)}원 일시 상환
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-brand-paper rounded-lg p-4 text-center">
              <p className="text-xs text-brand-mid mb-1">총이자</p>
              <p className="font-mono text-lg text-brand-accent">{won(result.totalInterest)}원</p>
            </div>
            <div className="bg-brand-paper rounded-lg p-4 text-center">
              <p className="text-xs text-brand-mid mb-1">총상환액</p>
              <p className="font-mono text-lg text-brand-black">{won(result.totalPayment)}원</p>
            </div>
          </div>

          <p className="text-xs text-brand-mid leading-relaxed">
            원리금균등은 매월 같은 금액을, 원금균등은 원금을 똑같이 나눠 갚아 초반 부담이 크지만
            총이자가 적습니다. 만기일시는 매월 이자만 내고 만기에 원금을 갚습니다. 중도상환수수료·취급
            수수료는 포함하지 않은 <strong>예상치</strong>입니다. 입력값은 서버로 전송되지 않습니다.
          </p>
        </>
      )}
    </div>
  );
}

function Field({
  label,
  unit,
  value,
  step,
  onChange,
  big,
}: {
  label: string;
  unit: string;
  value: number;
  step: number;
  onChange: (v: number) => void;
  big?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-brand-black">{label}</label>
      <div className="relative">
        <input
          type="number"
          min={0}
          step={step}
          value={value}
          onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))}
          aria-label={`${label}(${unit})`}
          className={`w-full px-4 py-3 pr-12 rounded-xl border border-brand-light bg-brand-white text-brand-black font-mono focus:outline-none focus:border-brand-accent ${
            big ? "text-2xl" : "text-lg"
          }`}
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-mid text-sm">{unit}</span>
      </div>
    </div>
  );
}
