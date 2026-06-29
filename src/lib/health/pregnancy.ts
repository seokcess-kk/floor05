/**
 * 임신 주수·출산예정일 계산 (100% 클라이언트, 순수 함수)
 * - 마지막 생리 시작일(LMP) 기준. 의학 표준대로 LMP 당일이 임신 0주 0일
 * - 출산예정일(EDD) = LMP + 280일 (Naegele 법칙)
 * - ⚠️ 평균 모델 추정치다. 정확한 주수·예정일은 초음파 검사로 확인해야 한다
 */

import { DateParts, addDays, diffDays, isValidDate } from "@/lib/date/core";

export interface PregnancyResult {
  /** 임신 주수 (N주) */
  weeks: number;
  /** 임신 일수 (N주 D일의 D) */
  days: number;
  /** LMP부터 총 일수 */
  totalDays: number;
  /** 삼분기 (1·2·3) */
  trimester: 1 | 2 | 3;
  /** 삼분기 표기 */
  trimesterLabel: string;
  /** 출산예정일 */
  dueDate: DateParts;
  /** 출산예정일까지 남은 일수 (음수면 예정일 지남) */
  ddayToDue: number;
  /** 진행률 % (0~100, 280일 기준) */
  progressPercent: number;
}

/**
 * @param lmp  마지막 생리 시작일
 * @param base 기준일 (보통 오늘)
 */
export function calcPregnancy(lmp: DateParts, base: DateParts): PregnancyResult | null {
  if (!isValidDate(lmp) || !isValidDate(base)) return null;
  const totalDays = diffDays(base, lmp);
  if (totalDays < 0 || totalDays > 45 * 7) return null; // 0~45주 범위 밖이면 입력 오류로 본다

  const weeks = Math.floor(totalDays / 7);
  const days = totalDays % 7;

  let trimester: 1 | 2 | 3;
  let trimesterLabel: string;
  if (weeks < 14) {
    trimester = 1;
    trimesterLabel = "임신 초기 (1삼분기)";
  } else if (weeks < 28) {
    trimester = 2;
    trimesterLabel = "임신 중기 (2삼분기)";
  } else {
    trimester = 3;
    trimesterLabel = "임신 후기 (3삼분기)";
  }

  const dueDate = addDays(lmp, 280);
  const ddayToDue = diffDays(dueDate, base);
  const progressPercent = Math.min(100, Math.round((totalDays / 280) * 100));

  return {
    weeks,
    days,
    totalDays,
    trimester,
    trimesterLabel,
    dueDate,
    ddayToDue,
    progressPercent,
  };
}
