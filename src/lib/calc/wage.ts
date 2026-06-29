/**
 * 주휴수당·주급·월 환산 계산 (100% 클라이언트, 순수 함수)
 * - 주휴수당 = (1주 소정근로시간 ÷ 40) × 8 × 시급 (주휴시간 최대 8시간)
 * - 1주 소정근로 15시간 이상이어야 발생
 * - 월 환산은 주 평균 4.345주 기준
 */

import { WEEKS_PER_MONTH } from "./rates";

export interface WageInput {
  /** 시급(원) */
  hourlyWage: number;
  /** 1주 소정근로시간 */
  weeklyHours: number;
}

export interface WageResult {
  /** 주휴수당 발생 여부 (주 15시간 이상) */
  eligible: boolean;
  /** 주휴시간 (최대 8시간) */
  weeklyHolidayHours: number;
  /** 주휴수당 (1주) */
  weeklyHolidayPay: number;
  /** 소정근로 주급 (주휴 제외) */
  weeklyBasePay: number;
  /** 주휴 포함 주급 */
  weeklyTotalPay: number;
  /** 주휴 포함 월 환산 급여 */
  monthlyPay: number;
}

export function calcWage(input: WageInput): WageResult | null {
  const hourlyWage = Math.max(0, input.hourlyWage);
  const weeklyHours = Math.max(0, input.weeklyHours);
  if (hourlyWage <= 0 || weeklyHours <= 0) return null;

  const eligible = weeklyHours >= 15;
  // 주휴시간 = min(주 소정근로, 40) ÷ 40 × 8 (40시간 이상은 8시간 고정)
  const weeklyHolidayHours = eligible ? (Math.min(weeklyHours, 40) / 40) * 8 : 0;

  const weeklyHolidayPay = Math.round(weeklyHolidayHours * hourlyWage);
  const weeklyBasePay = Math.round(weeklyHours * hourlyWage);
  const weeklyTotalPay = weeklyBasePay + weeklyHolidayPay;
  // 월 환산: (소정근로 + 주휴) 시간 × 4.345주 × 시급
  const monthlyPay = Math.round(
    (weeklyHours + weeklyHolidayHours) * WEEKS_PER_MONTH * hourlyWage,
  );

  return {
    eligible,
    weeklyHolidayHours: Math.round(weeklyHolidayHours * 100) / 100,
    weeklyHolidayPay,
    weeklyBasePay,
    weeklyTotalPay,
    monthlyPay,
  };
}
