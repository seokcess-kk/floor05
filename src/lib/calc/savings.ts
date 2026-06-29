/**
 * 예금·적금 이자 계산 (100% 클라이언트, 순수 함수)
 * - 예금(목돈 거치) / 적금(매월 납입)
 * - 단리 / 월복리
 * - 세전·세후(이자소득세 15.4%)
 */

import { INTEREST_INCOME_TAX_RATE } from "./rates";

export type ProductType = "deposit" | "installment";
export type InterestType = "simple" | "compound";

export interface SavingsInput {
  /** 예금이면 예치금, 적금이면 월 납입액(원) */
  amount: number;
  /** 연이율(%) */
  annualRatePct: number;
  /** 기간(개월) */
  months: number;
  product: ProductType;
  interest: InterestType;
}

export interface SavingsResult {
  /** 납입 원금 합계 */
  principal: number;
  /** 세전 이자 */
  interest: number;
  /** 이자소득세(15.4%) */
  tax: number;
  /** 세후 이자 */
  afterTaxInterest: number;
  /** 세후 수령액 (원금 + 세후 이자) */
  afterTaxTotal: number;
}

export function calcSavings(input: SavingsInput): SavingsResult | null {
  const amount = Math.max(0, input.amount);
  const months = Math.floor(input.months);
  const annual = input.annualRatePct / 100;
  if (amount <= 0 || months <= 0 || input.annualRatePct < 0) return null;

  const i = annual / 12; // 월이율
  let principal: number;
  let interest: number;

  if (input.product === "deposit") {
    // 예금: 목돈 거치
    principal = amount;
    interest =
      input.interest === "simple"
        ? amount * annual * (months / 12) // 단리
        : amount * (Math.pow(1 + i, months) - 1); // 월복리
  } else {
    // 적금: 매월 납입
    principal = amount * months;
    if (input.interest === "simple") {
      // 단리: 각 회차 납입금이 만기까지 남은 개월수만큼 이자
      // 이자 = 월납입 × 월이율 × (months(months+1)/2)
      interest = amount * i * ((months * (months + 1)) / 2);
    } else {
      // 월복리(매월초 납입): 연금현가식
      interest = amount * ((Math.pow(1 + i, months) - 1) / i) * (1 + i) - principal;
    }
  }

  const interestRounded = Math.round(interest);
  const tax = Math.round(interestRounded * INTEREST_INCOME_TAX_RATE);
  const afterTaxInterest = interestRounded - tax;

  return {
    principal: Math.round(principal),
    interest: interestRounded,
    tax,
    afterTaxInterest,
    afterTaxTotal: Math.round(principal) + afterTaxInterest,
  };
}
