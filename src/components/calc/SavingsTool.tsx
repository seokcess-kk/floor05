"use client";

import { useState, useMemo, useRef } from "react";
import { calcSavings, type ProductType, type InterestType } from "@/lib/calc/savings";
import { trackToolUse } from "@/lib/common/analytics";

const won = (n: number) => n.toLocaleString("ko-KR");

export default function SavingsTool() {
  const [product, setProduct] = useState<ProductType>("deposit");
  const [interest, setInterest] = useState<InterestType>("simple");
  const [amountManwon, setAmountManwon] = useState(1000);
  const [ratePct, setRatePct] = useState(3);
  const [months, setMonths] = useState(12);

  const result = useMemo(
    () =>
      calcSavings({
        amount: amountManwon * 10_000,
        annualRatePct: ratePct,
        months,
        product,
        interest,
      }),
    [amountManwon, ratePct, months, product, interest],
  );

  const usedRef = useRef(false);
  function markUsed() {
    if (usedRef.current) return;
    usedRef.current = true;
    trackToolUse("savings");
  }

  return (
    <div className="space-y-6">
      {/* 상품 / 이자 방식 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex gap-2">
          <Seg active={product === "deposit"} onClick={() => { setProduct("deposit"); markUsed(); }}>
            예금 (목돈 거치)
          </Seg>
          <Seg active={product === "installment"} onClick={() => { setProduct("installment"); markUsed(); }}>
            적금 (매월 납입)
          </Seg>
        </div>
        <div className="flex gap-2">
          <Seg active={interest === "simple"} onClick={() => { setInterest("simple"); markUsed(); }}>
            단리
          </Seg>
          <Seg active={interest === "compound"} onClick={() => { setInterest("compound"); markUsed(); }}>
            월복리
          </Seg>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Field
          label={product === "deposit" ? "예치금" : "월 납입액"}
          unit="만원"
          value={amountManwon}
          step={10}
          onChange={(v) => { setAmountManwon(v); markUsed(); }}
          big
        />
        <Field label="연이율" unit="%" value={ratePct} step={0.1}
          onChange={(v) => { setRatePct(v); markUsed(); }} />
        <Field label="기간" unit="개월" value={months} step={1}
          onChange={(v) => { setMonths(v); markUsed(); }} />
      </div>

      {result && (
        <>
          <div className="bg-brand-black rounded-xl p-6 text-center">
            <p className="text-sm text-brand-light mb-1">세후 수령액</p>
            <p className="font-mono text-4xl sm:text-5xl font-bold text-brand-paper">
              {won(result.afterTaxTotal)}
              <span className="text-xl text-brand-light ml-1">원</span>
            </p>
            <p className="mt-2 text-brand-light text-sm">
              원금 {won(result.principal)}원 + 세후이자 {won(result.afterTaxInterest)}원
            </p>
          </div>

          <div className="bg-brand-paper rounded-xl p-4 sm:p-6">
            <h3 className="font-mono text-xs text-brand-accent uppercase tracking-wider mb-4">
              이자 상세
            </h3>
            <div className="space-y-2 text-sm">
              <Row label="세전 이자" value={result.interest} />
              <Row label="이자소득세 (15.4%)" value={-result.tax} accent />
              <div className="border-t border-brand-light/40 pt-2">
                <Row label="세후 이자" value={result.afterTaxInterest} bold />
              </div>
            </div>
          </div>

          <p className="text-xs text-brand-mid leading-relaxed">
            이자소득세 15.4%(소득세 14% + 지방소득세 1.4%)를 뗀 <strong>예상치</strong>입니다. 적금
            단리는 매월 납입금이 만기까지 남은 기간만큼 이자가 붙는 방식입니다. 세금우대·비과세 상품,
            우대금리 조건은 반영하지 않았습니다. 입력값은 서버로 전송되지 않습니다.
          </p>
        </>
      )}
    </div>
  );
}

function Row({ label, value, accent, bold }: { label: string; value: number; accent?: boolean; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={`${bold ? "font-medium text-brand-black" : "text-brand-mid"}`}>{label}</span>
      <span className={`font-mono ${accent ? "text-brand-accent" : bold ? "text-brand-black font-bold" : "text-brand-black"}`}>
        {won(value)}원
      </span>
    </div>
  );
}

function Seg({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
        active ? "bg-brand-accent text-white" : "bg-brand-paper text-brand-mid hover:text-brand-black"
      }`}
    >
      {children}
    </button>
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
