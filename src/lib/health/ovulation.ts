/**
 * 배란일·가임기 계산 (100% 클라이언트, 순수 함수)
 * - 표준 모델: 황체기 14일 고정 가정. 배란일 = 다음 생리예정일 − 14일
 * - 가임기 = 배란 5일 전 ~ 배란 1일 후 (정자 생존 ~5일, 난자 ~1일)
 * - ⚠️ 평균 모델 추정치다. 피임·임신 계획의 의학적 판단을 대체하지 않는다
 */

import { DateParts, addDays, isValidDate } from "@/lib/date/core";

export interface Cycle {
  /** 생리 시작 예정일 */
  period: DateParts;
  /** 배란 예정일 */
  ovulation: DateParts;
  /** 가임기 시작 (배란 5일 전) */
  fertileStart: DateParts;
  /** 가임기 종료 (배란 1일 후) */
  fertileEnd: DateParts;
}

export interface OvulationResult {
  /** 이번 주기 (입력한 마지막 생리 기준 다음 주기) */
  current: Cycle;
  /** 향후 3개 주기 (이번 포함) */
  cycles: Cycle[];
}

/**
 * @param lastPeriod 마지막 생리 시작일
 * @param cycleLength 평균 생리 주기(일). 보통 21~35
 */
export function calcOvulation(
  lastPeriod: DateParts,
  cycleLength: number,
): OvulationResult | null {
  if (!isValidDate(lastPeriod)) return null;
  if (!Number.isInteger(cycleLength) || cycleLength < 20 || cycleLength > 45) return null;

  const cycles: Cycle[] = [];
  for (let i = 0; i < 3; i++) {
    // i번째 다음 생리 시작 예정일
    const period = addDays(lastPeriod, cycleLength * (i + 1));
    const ovulation = addDays(period, -14);
    cycles.push({
      period,
      ovulation,
      fertileStart: addDays(ovulation, -5),
      fertileEnd: addDays(ovulation, 1),
    });
  }

  return { current: cycles[0], cycles };
}
