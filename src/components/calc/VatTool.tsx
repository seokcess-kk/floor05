"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { vatFromSupply, vatFromTotal } from "@/lib/calc/vat";
import { trackToolUse } from "@/lib/common/analytics";

const won = (n: number) => n.toLocaleString("ko-KR");
const DEFAULT_AMOUNT = 1_000_000;

type Mode = "supply" | "total";

export default function VatTool() {
  const [mode, setMode] = useState<Mode>("supply");
  const [amount, setAmount] = useState(DEFAULT_AMOUNT);

  const result = useMemo(
    () => (mode === "supply" ? vatFromSupply(amount) : vatFromTotal(amount)),
    [mode, amount],
  );

  const usedRef = useRef(false);
  useEffect(() => {
    if (usedRef.current) return;
    if (amount !== DEFAULT_AMOUNT) {
      usedRef.current = true;
      trackToolUse("vat");
    }
  }, [amount]);

  return (
    <div className="space-y-6">
      {/* 모드 탭 */}
      <div className="flex gap-2">
        <Tab active={mode === "supply"} onClick={() => setMode("supply")}>
          공급가액으로 (세액 더하기)
        </Tab>
        <Tab active={mode === "total"} onClick={() => setMode("total")}>
          합계로 (공급가 역산)
        </Tab>
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-brand-black">
          {mode === "supply" ? "공급가액 (부가세 별도)" : "합계금액 (부가세 포함)"}
        </label>
        <div className="relative">
          <input
            type="number"
            min={0}
            step={1000}
            value={amount}
            onChange={(e) => setAmount(Math.max(0, Number(e.target.value) || 0))}
            aria-label="금액"
            className="w-full px-4 py-3 pr-12 rounded-xl border border-brand-light bg-brand-white text-brand-black text-2xl font-mono focus:outline-none focus:border-brand-accent"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-mid text-sm">원</span>
        </div>
      </div>

      {/* 결과 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Cell label="공급가액" value={result.supply} accent={mode === "total"} />
        <Cell label="부가세 (10%)" value={result.vat} accent />
        <Cell label="합계금액" value={result.total} accent={mode === "supply"} />
      </div>

      <p className="text-xs text-brand-mid leading-relaxed">
        일반과세 기준 부가가치세율 10%로 계산합니다. 공급가액은 부가세를 뺀 금액, 합계는 부가세를
        포함한 금액입니다. 간이과세·면세 사업자는 적용이 다릅니다. 입력값은 서버로 전송되지 않습니다.
      </p>
    </div>
  );
}

function Cell({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className={`rounded-xl p-5 text-center ${accent ? "bg-brand-black" : "bg-brand-paper"}`}>
      <p className={`text-xs mb-1 ${accent ? "text-brand-light" : "text-brand-mid"}`}>{label}</p>
      <p className={`font-mono text-xl font-bold ${accent ? "text-brand-paper" : "text-brand-black"}`}>
        {won(value)}
        <span className={`text-sm font-normal ml-0.5 ${accent ? "text-brand-light" : "text-brand-mid"}`}>원</span>
      </p>
    </div>
  );
}

function Tab({
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
      className={`flex-1 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
        active ? "bg-brand-accent text-white" : "bg-brand-paper text-brand-mid hover:text-brand-black"
      }`}
    >
      {children}
    </button>
  );
}
