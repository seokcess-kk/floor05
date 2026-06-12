/**
 * 연봉 → 월 실수령액 계산 (100% 클라이언트, 순수 함수)
 * - 4대보험(국민연금·건강·장기요양·고용) + 근로소득세(간이세액표 근사) + 지방소득세 공제
 * - 요율·세액표는 모두 ./rates 에서 가져온다 (유지보수 단일 지점)
 *
 * ⚠️ 소득세는 국세청 근로소득 간이세액표를 근사한 추정치다. 실제 원천징수액은
 *    회사 신고 부양가족 수·비과세 항목·간이세액표 원본에 따라 달라질 수 있다.
 */

import {
  INSURANCE,
  INCOME_TAX_BRACKETS,
  EARNED_INCOME_DEDUCTION,
  EARNED_INCOME_DEDUCTION_CAP,
  PERSONAL_DEDUCTION_PER_HEAD,
  STANDARD_TAX_CREDIT,
  LOCAL_TAX_RATE,
  EARNED_INCOME_TAX_CREDIT,
  earnedIncomeTaxCreditCap,
  childTaxCreditMonthly,
} from "./rates";

export interface SalaryInput {
  /** 연봉(세전, 원). 비과세 포함 총액 */
  annualSalary: number;
  /** 월 비과세액(원). 식대 등. 기본 200,000 (2024~ 식대 비과세 한도 월 20만) */
  monthlyNonTax: number;
  /** 공제대상 가족 수(본인 포함). 기본 1 */
  dependents: number;
  /** 8세 이상 20세 이하 자녀 수. 기본 0 */
  children: number;
}

export interface Deductions {
  pension: number; // 국민연금
  health: number; // 건강보험
  longTermCare: number; // 장기요양보험
  employment: number; // 고용보험
  incomeTax: number; // 근로소득세
  localTax: number; // 지방소득세
}

export interface SalaryResult {
  /** 월 세전 급여 (연봉/12) */
  monthlyGross: number;
  /** 월 공제 항목별 금액 */
  deductions: Deductions;
  /** 월 공제 합계 */
  totalDeduction: number;
  /** 월 실수령액 */
  monthlyNet: number;
  /** 연 실수령액 (월 실수령 × 12, 참고용) */
  annualNet: number;
}

/** 원 단위 절사 (10원 미만 버림) — 보험료·세금은 통상 원/십원 단위로 절사 */
function floor10(n: number): number {
  return Math.floor(n / 10) * 10;
}

/** 국민연금 (월). 기준소득월액 상·하한 적용 */
export function calcPension(taxableMonthly: number): number {
  const base = Math.min(
    INSURANCE.pension.maxBase,
    Math.max(taxableMonthly < INSURANCE.pension.minBase ? 0 : INSURANCE.pension.minBase, taxableMonthly),
  );
  // 과세소득이 하한 미만이면 0으로 본다(실무상 최저 기준소득월액 적용되나 단순화)
  if (taxableMonthly < INSURANCE.pension.minBase) {
    return floor10(taxableMonthly * INSURANCE.pension.rate);
  }
  return floor10(base * INSURANCE.pension.rate);
}

/** 건강보험 (월) */
export function calcHealth(taxableMonthly: number): number {
  return floor10(taxableMonthly * INSURANCE.health.rate);
}

/** 장기요양보험 (월) — 건강보험료 기준 */
export function calcLongTermCare(health: number): number {
  return floor10(health * INSURANCE.longTermCare.rateOfHealth);
}

/** 고용보험 (월) */
export function calcEmployment(taxableMonthly: number): number {
  return floor10(taxableMonthly * INSURANCE.employment.rate);
}

/** 근로소득공제 (연) — 한도 적용 */
export function earnedIncomeDeduction(grossAnnual: number): number {
  const band = EARNED_INCOME_DEDUCTION.find((b) => grossAnnual <= b.upTo)!;
  const deduction = band.base + (grossAnnual - band.floor) * band.rate;
  return Math.min(deduction, EARNED_INCOME_DEDUCTION_CAP);
}

/** 산출세액 (연) — 기본세율 누진 */
export function computeIncomeTax(taxBase: number): number {
  if (taxBase <= 0) return 0;
  const bracket = INCOME_TAX_BRACKETS.find((b) => taxBase <= b.upTo)!;
  return taxBase * bracket.rate - bracket.deduction;
}

/** 근로소득세액공제 (연) — 한도 적용 */
export function earnedIncomeTaxCredit(computedTax: number, grossAnnual: number): number {
  const { threshold, rateUnder, rateOver, baseAtThreshold } = EARNED_INCOME_TAX_CREDIT;
  const credit =
    computedTax <= threshold
      ? computedTax * rateUnder
      : baseAtThreshold + (computedTax - threshold) * rateOver;
  return Math.min(credit, earnedIncomeTaxCreditCap(grossAnnual));
}

/**
 * 월 근로소득세 (간이세액표 근사).
 * 연환산 → 근로소득공제 → (인적공제 + 연금보험료공제) → 과세표준 →
 * 산출세액 → 근로소득세액공제 → 표준세액공제 → ÷12 → 8~20세 자녀공제.
 */
export function calcIncomeTax(
  taxableMonthly: number,
  dependents: number,
  children: number,
  annualPension: number,
): number {
  const grossAnnual = taxableMonthly * 12;
  const earnedIncome = grossAnnual - earnedIncomeDeduction(grossAnnual);

  const personalDeduction = PERSONAL_DEDUCTION_PER_HEAD * Math.max(1, dependents);
  const taxBase = Math.max(0, earnedIncome - personalDeduction - annualPension);

  const computedTax = computeIncomeTax(taxBase);
  const taxCredit = earnedIncomeTaxCredit(computedTax, grossAnnual);
  const decidedAnnual = Math.max(0, computedTax - taxCredit - STANDARD_TAX_CREDIT);

  let monthly = decidedAnnual / 12 - childTaxCreditMonthly(children);
  monthly = Math.max(0, monthly);
  return floor10(monthly);
}

/** 지방소득세 (월) = 소득세 × 10% */
export function calcLocalTax(incomeTax: number): number {
  return floor10(incomeTax * LOCAL_TAX_RATE);
}

/**
 * 연봉 실수령액 메인 계산.
 */
export function calcSalary(input: SalaryInput): SalaryResult {
  const annualSalary = Math.max(0, input.annualSalary);
  const monthlyGross = annualSalary / 12;
  const monthlyNonTax = Math.max(0, Math.min(input.monthlyNonTax, monthlyGross));
  // 4대보험·소득세 산정 기준이 되는 과세 월급여 (비과세 제외)
  const taxableMonthly = Math.max(0, monthlyGross - monthlyNonTax);

  const pension = calcPension(taxableMonthly);
  const health = calcHealth(taxableMonthly);
  const longTermCare = calcLongTermCare(health);
  const employment = calcEmployment(taxableMonthly);

  // 소득세 과세표준에서 빼는 연금보험료공제 = 국민연금 근로자부담 연액
  const annualPension = pension * 12;
  const incomeTax = calcIncomeTax(
    taxableMonthly,
    input.dependents,
    input.children,
    annualPension,
  );
  const localTax = calcLocalTax(incomeTax);

  const deductions: Deductions = {
    pension,
    health,
    longTermCare,
    employment,
    incomeTax,
    localTax,
  };
  const totalDeduction =
    pension + health + longTermCare + employment + incomeTax + localTax;
  const monthlyNet = monthlyGross - totalDeduction;

  return {
    monthlyGross: Math.round(monthlyGross),
    deductions,
    totalDeduction: Math.round(totalDeduction),
    monthlyNet: Math.round(monthlyNet),
    annualNet: Math.round(monthlyNet * 12),
  };
}
