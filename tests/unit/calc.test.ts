/**
 * 계산기 로직 단위 테스트
 * expected 값은 제품 코드가 아니라 법정 산식·공식 요율(2026)로 별도 산출한 golden value다.
 * - 4대보험 요율: 국민연금 4.75%(상한 659만/하한 41만, 2026.7~), 건강 3.595%,
 *   장기요양 13.14%(건보료 대비), 고용 0.9% [출처: 보건복지부·국민건강보험공단·NPS 고시]
 * - 소득세: 2023~ 현행 누진구조 + 근로소득공제 + 근로소득세액공제 + 표준세액공제 13만
 * - 최저임금 2026: 10,320원 [고용노동부 고시]
 */
import { describe, it, expect } from "vitest";
import { calcSalary } from "@/lib/calc/salary";
import { calcSeverance } from "@/lib/calc/severance";
import { calcWage } from "@/lib/calc/wage";
import { vatFromSupply, vatFromTotal } from "@/lib/calc/vat";
import { calcLoan } from "@/lib/calc/loan";
import { calcSavings } from "@/lib/calc/savings";

describe("연봉 실수령액 (calcSalary)", () => {
  it("연봉 5,000만 · 비과세 월 20만 · 본인 1인 · 자녀 0 — 법정 산식 수기 검산", () => {
    // 수기 검산 (2026 요율):
    // 월 세전 = 4,166,667 / 과세 월급여 = 3,966,666.67
    // 국민연금 = floor10(3,966,666.67 × 0.0475) = 188,410
    // 건강 = floor10(× 0.03595) = 142,600 / 장기요양 = floor10(142,600 × 0.1314) = 18,730
    // 고용 = floor10(× 0.009) = 35,700
    // 총급여(연) 47,600,000 → 근로소득공제 12,130,000 → 근로소득금액 35,470,000
    // 과세표준 = 35,470,000 − 1,500,000(본인) − 2,260,920(연금연액) = 31,709,080
    // 산출세액 = 31,709,080 × 15% − 1,260,000 = 3,496,362
    // 세액공제 = min(715,000 + 2,196,362 × 30%, 한도 660,000) = 660,000
    // 결정세액(연) = 3,496,362 − 660,000 − 130,000 = 2,706,362 → 월 225,530 (10원 절사)
    // 지방소득세 = 22,550
    const r = calcSalary({
      annualSalary: 50_000_000,
      monthlyNonTax: 200_000,
      dependents: 1,
      children: 0,
    });
    expect(r.monthlyGross).toBe(4_166_667);
    expect(r.deductions.pension).toBe(188_410);
    expect(r.deductions.health).toBe(142_600);
    expect(r.deductions.longTermCare).toBe(18_730);
    expect(r.deductions.employment).toBe(35_700);
    expect(r.deductions.incomeTax).toBe(225_530);
    expect(r.deductions.localTax).toBe(22_550);
    expect(r.totalDeduction).toBe(633_520);
    expect(r.monthlyNet).toBe(3_533_147); // 4,166,666.67 − 633,520 (반올림)
  });

  it("고소득: 국민연금 기준소득월액 상한(659만) 적용", () => {
    // 연봉 3억, 비과세 0 → 과세 월 2,500만 > 상한 659만
    // 국민연금 = floor10(6,590,000 × 0.0475) = 313,020 (최대 부담분)
    const r = calcSalary({
      annualSalary: 300_000_000,
      monthlyNonTax: 0,
      dependents: 1,
      children: 0,
    });
    expect(r.deductions.pension).toBe(313_020);
    // 건강보험은 상한이 훨씬 높아 그대로 비례: floor10(25,000,000 × 0.03595) = 898,750
    expect(r.deductions.health).toBe(898_750);
  });

  it("저소득: 소득세 0 하한 (음수 금지)", () => {
    const r = calcSalary({
      annualSalary: 12_000_000,
      monthlyNonTax: 200_000,
      dependents: 4,
      children: 2,
    });
    expect(r.deductions.incomeTax).toBe(0);
    expect(r.deductions.localTax).toBe(0);
    expect(r.monthlyNet).toBeGreaterThan(0);
    expect(r.monthlyNet).toBeLessThan(1_000_000);
  });

  it("연봉 0 → 전부 0", () => {
    const r = calcSalary({ annualSalary: 0, monthlyNonTax: 200_000, dependents: 1, children: 0 });
    expect(r.monthlyGross).toBe(0);
    expect(r.totalDeduction).toBe(0);
    expect(r.monthlyNet).toBe(0);
  });

  it("비과세가 월급보다 커도 과세소득이 음수가 되지 않는다", () => {
    const r = calcSalary({ annualSalary: 1_200_000, monthlyNonTax: 999_999, dependents: 1, children: 0 });
    expect(r.totalDeduction).toBeGreaterThanOrEqual(0);
    expect(r.monthlyNet).toBeGreaterThanOrEqual(0);
    expect(r.monthlyNet).toBeLessThanOrEqual(100_000);
  });
});

describe("퇴직금 (calcSeverance)", () => {
  it("3년 재직 · 월 300만 — 법정 산식 수기 검산", () => {
    // 재직 1,096일(2024 윤년 포함), 산정기간 2025-10-01~2026-01-01 = 92일
    // 평균임금 = 9,000,000 / 92 = 97,826.09 → 반올림 97,826
    // 퇴직금 = 97,826.09 × 30 × (1096/365) = 8,812,388
    const r = calcSeverance({
      joinDate: "2023-01-01",
      leaveDate: "2026-01-01",
      monthlyWage: 3_000_000,
      annualBonus: 0,
      annualLeaveAllowance: 0,
    });
    expect(r.valid).toBe(true);
    expect(r.eligible).toBe(true);
    expect(r.serviceDays).toBe(1096);
    expect(r.periodDays).toBe(92);
    expect(r.avgDailyWage).toBe(97_826);
    expect(r.severancePay).toBe(8_812_388);
  });

  it("상여·연차수당 3/12 가산 (근로기준법 시행령 §2)", () => {
    // 연간상여 1,200만 → 300만 가산 / 연차수당 120만 → 30만 가산
    const r = calcSeverance({
      joinDate: "2025-01-01",
      leaveDate: "2026-01-01",
      monthlyWage: 3_000_000,
      annualBonus: 12_000_000,
      annualLeaveAllowance: 1_200_000,
    });
    expect(r.bonusPortion).toBe(3_000_000);
    expect(r.leavePortion).toBe(300_000);
    expect(r.totalWage).toBe(12_300_000);
  });

  it("1년 미만은 eligible=false", () => {
    const r = calcSeverance({
      joinDate: "2025-06-01",
      leaveDate: "2026-01-01",
      monthlyWage: 3_000_000,
      annualBonus: 0,
      annualLeaveAllowance: 0,
    });
    expect(r.valid).toBe(true);
    expect(r.eligible).toBe(false);
  });

  it("잘못된 날짜(2월 30일)·역순 날짜는 invalid", () => {
    expect(
      calcSeverance({ joinDate: "2025-02-30", leaveDate: "2026-01-01", monthlyWage: 1, annualBonus: 0, annualLeaveAllowance: 0 }).valid,
    ).toBe(false);
    expect(
      calcSeverance({ joinDate: "2026-01-01", leaveDate: "2025-01-01", monthlyWage: 1, annualBonus: 0, annualLeaveAllowance: 0 }).valid,
    ).toBe(false);
  });
});

describe("주휴수당 (calcWage)", () => {
  it("2026 최저시급 10,320원 · 주 40시간 — 주휴 8시간 = 82,560원", () => {
    const r = calcWage({ hourlyWage: 10_320, weeklyHours: 40 })!;
    expect(r.eligible).toBe(true);
    expect(r.weeklyHolidayHours).toBe(8);
    expect(r.weeklyHolidayPay).toBe(82_560);
    expect(r.weeklyBasePay).toBe(412_800);
    expect(r.weeklyTotalPay).toBe(495_360);
    // 월 환산 = 48h × 4.345주 × 10,320 = 2,152,339.2 → 2,152,339
    expect(r.monthlyPay).toBe(2_152_339);
  });

  it("주 20시간 — 주휴 = 20/40×8 = 4시간", () => {
    const r = calcWage({ hourlyWage: 10_320, weeklyHours: 20 })!;
    expect(r.weeklyHolidayHours).toBe(4);
    expect(r.weeklyHolidayPay).toBe(41_280);
  });

  it("주 15시간 미만은 주휴수당 없음", () => {
    const r = calcWage({ hourlyWage: 10_320, weeklyHours: 14.5 })!;
    expect(r.eligible).toBe(false);
    expect(r.weeklyHolidayPay).toBe(0);
  });

  it("주 52시간이라도 주휴시간은 8시간 상한", () => {
    const r = calcWage({ hourlyWage: 10_320, weeklyHours: 52 })!;
    expect(r.weeklyHolidayHours).toBe(8);
  });

  it("0 입력은 null", () => {
    expect(calcWage({ hourlyWage: 0, weeklyHours: 40 })).toBeNull();
    expect(calcWage({ hourlyWage: 10_320, weeklyHours: 0 })).toBeNull();
  });
});

describe("부가세 (vat)", () => {
  it("공급가 → 세액 10%", () => {
    expect(vatFromSupply(10_000)).toEqual({ supply: 10_000, vat: 1_000, total: 11_000 });
    expect(vatFromSupply(1_234_567)).toEqual({ supply: 1_234_567, vat: 123_457, total: 1_358_024 });
  });

  it("합계 → 공급가 역산 (÷1.1)", () => {
    expect(vatFromTotal(11_000)).toEqual({ supply: 10_000, vat: 1_000, total: 11_000 });
    expect(vatFromTotal(1_000_000)).toEqual({ supply: 909_091, vat: 90_909, total: 1_000_000 });
  });

  it("역산 후 공급가+세액=합계 불변식", () => {
    for (const t of [1, 55, 999, 12_345, 98_765_432]) {
      const r = vatFromTotal(t);
      expect(r.supply + r.vat).toBe(r.total);
    }
  });

  it("음수는 0으로 처리", () => {
    expect(vatFromSupply(-100).supply).toBe(0);
    expect(vatFromTotal(-100).total).toBe(0);
  });
});

describe("대출이자 (calcLoan)", () => {
  // golden: 표준 원리금균등 공식 별도 산출 (1억 · 연 4.8% · 12개월)
  it("원리금균등: 1억 · 4.8% · 12개월 → 월 8,551,586", () => {
    const r = calcLoan({ principal: 100_000_000, annualRatePct: 4.8, months: 12, method: "equalPayment" })!;
    expect(r.firstPayment).toBe(8_551_586);
    expect(r.lastPayment).toBe(8_551_586);
    expect(r.totalInterest).toBe(2_619_028);
    expect(r.totalPayment).toBe(102_619_028);
  });

  it("원금균등: 첫달 8,733,333 · 마지막달 8,366,667 · 총이자 260만", () => {
    const r = calcLoan({ principal: 100_000_000, annualRatePct: 4.8, months: 12, method: "equalPrincipal" })!;
    expect(r.firstPayment).toBe(8_733_333);
    expect(r.lastPayment).toBe(8_366_667);
    expect(r.totalInterest).toBe(2_600_000);
  });

  it("만기일시: 매월 40만 이자 · 총이자 480만", () => {
    const r = calcLoan({ principal: 100_000_000, annualRatePct: 4.8, months: 12, method: "bullet" })!;
    expect(r.firstPayment).toBe(400_000);
    expect(r.lastPayment).toBe(100_400_000);
    expect(r.totalInterest).toBe(4_800_000);
  });

  it("금리 0% 원리금균등 = 원금/개월", () => {
    const r = calcLoan({ principal: 12_000_000, annualRatePct: 0, months: 12, method: "equalPayment" })!;
    expect(r.firstPayment).toBe(1_000_000);
    expect(r.totalInterest).toBe(0);
  });

  it("원금 0·기간 0·음수 금리는 null", () => {
    expect(calcLoan({ principal: 0, annualRatePct: 4, months: 12, method: "equalPayment" })).toBeNull();
    expect(calcLoan({ principal: 1000, annualRatePct: 4, months: 0, method: "equalPayment" })).toBeNull();
    expect(calcLoan({ principal: 1000, annualRatePct: -1, months: 12, method: "equalPayment" })).toBeNull();
  });
});

describe("예적금 이자 (calcSavings)", () => {
  it("예금 단리: 1,000만 · 3% · 12개월 → 세전 30만 · 세후 253,800", () => {
    const r = calcSavings({ amount: 10_000_000, annualRatePct: 3, months: 12, product: "deposit", interest: "simple" })!;
    expect(r.principal).toBe(10_000_000);
    expect(r.interest).toBe(300_000);
    expect(r.tax).toBe(46_200); // 15.4%
    expect(r.afterTaxInterest).toBe(253_800);
    expect(r.afterTaxTotal).toBe(10_253_800);
  });

  it("예금 월복리: 1,000만 · 3% · 12개월 → 세전 304,160", () => {
    const r = calcSavings({ amount: 10_000_000, annualRatePct: 3, months: 12, product: "deposit", interest: "compound" })!;
    expect(r.interest).toBe(304_160);
  });

  it("적금 단리: 월 100만 · 3.65% · 12개월 → 세전 237,250 (n(n+1)/2 검산)", () => {
    const r = calcSavings({ amount: 1_000_000, annualRatePct: 3.65, months: 12, product: "installment", interest: "simple" })!;
    expect(r.principal).toBe(12_000_000);
    expect(r.interest).toBe(237_250);
    expect(r.tax).toBe(36_537);
  });

  it("적금 월복리(월초 납입): 월 100만 · 3% · 12개월 → 세전 196,799", () => {
    const r = calcSavings({ amount: 1_000_000, annualRatePct: 3, months: 12, product: "installment", interest: "compound" })!;
    expect(r.interest).toBe(196_799);
  });

  it("0·음수 입력은 null", () => {
    expect(calcSavings({ amount: 0, annualRatePct: 3, months: 12, product: "deposit", interest: "simple" })).toBeNull();
    expect(calcSavings({ amount: 100, annualRatePct: -1, months: 12, product: "deposit", interest: "simple" })).toBeNull();
    expect(calcSavings({ amount: 100, annualRatePct: 3, months: 0, product: "deposit", interest: "simple" })).toBeNull();
  });
});
