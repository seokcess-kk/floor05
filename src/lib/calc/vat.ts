/**
 * 부가가치세 계산 (100% 클라이언트, 순수 함수)
 * - 공급가액 → 세액·합계, 또는 합계 → 공급가액 역산 (양방향)
 */

import { VAT_RATE } from "./rates";

export interface VatResult {
  /** 공급가액 (부가세 별도 금액) */
  supply: number;
  /** 부가세액 */
  vat: number;
  /** 합계 (공급가 + 부가세) */
  total: number;
}

/** 공급가액으로부터 세액·합계 계산 */
export function vatFromSupply(supply: number): VatResult {
  const s = Math.max(0, Math.round(supply));
  const vat = Math.round(s * VAT_RATE);
  return { supply: s, vat, total: s + vat };
}

/** 합계(부가세 포함)로부터 공급가액·세액 역산 */
export function vatFromTotal(total: number): VatResult {
  const t = Math.max(0, Math.round(total));
  const supply = Math.round(t / (1 + VAT_RATE));
  return { supply, vat: t - supply, total: t };
}
