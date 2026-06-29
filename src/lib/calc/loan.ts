/**
 * 대출 상환 계산 (100% 클라이언트, 순수 함수)
 * - 원리금균등 / 원금균등 / 만기일시 세 가지 상환 방식
 * - 월 상환액(첫달·마지막달), 총이자, 총상환액
 */

export type RepayMethod = "equalPayment" | "equalPrincipal" | "bullet";

export interface LoanInput {
  /** 대출 원금(원) */
  principal: number;
  /** 연이율(%) */
  annualRatePct: number;
  /** 대출 기간(개월) */
  months: number;
  method: RepayMethod;
}

export interface LoanResult {
  method: RepayMethod;
  /** 대출 원금 */
  principal: number;
  /** 개월 수 */
  months: number;
  /** 첫 달 상환액 */
  firstPayment: number;
  /** 마지막 달 상환액 */
  lastPayment: number;
  /** 총이자 */
  totalInterest: number;
  /** 총상환액 (원금 + 총이자) */
  totalPayment: number;
}

export function calcLoan(input: LoanInput): LoanResult | null {
  const principal = Math.max(0, input.principal);
  const months = Math.floor(input.months);
  const r = input.annualRatePct / 100 / 12; // 월이율
  if (principal <= 0 || months <= 0 || input.annualRatePct < 0) return null;

  let firstPayment: number;
  let lastPayment: number;
  let totalInterest: number;

  if (input.method === "equalPayment") {
    // 원리금균등: 매월 동일 상환액
    const m =
      r === 0
        ? principal / months
        : (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
    firstPayment = Math.round(m);
    lastPayment = firstPayment;
    totalInterest = Math.round(m * months - principal);
  } else if (input.method === "equalPrincipal") {
    // 원금균등: 매월 원금 동일, 이자는 잔액 기준으로 감소
    const principalPart = principal / months;
    firstPayment = Math.round(principalPart + principal * r); // 첫달: 이자 최대
    lastPayment = Math.round(principalPart + principalPart * r); // 마지막달: 이자 최소
    // 총이자 = 원금 × 월이율 × (개월수 + 1) / 2
    totalInterest = Math.round((principal * r * (months + 1)) / 2);
  } else {
    // 만기일시: 매월 이자만, 만기에 원금
    const monthlyInterest = principal * r;
    firstPayment = Math.round(monthlyInterest);
    lastPayment = Math.round(monthlyInterest + principal); // 마지막달: 이자 + 원금
    totalInterest = Math.round(monthlyInterest * months);
  }

  return {
    method: input.method,
    principal: Math.round(principal),
    months,
    firstPayment,
    lastPayment,
    totalInterest,
    totalPayment: Math.round(principal) + totalInterest,
  };
}
