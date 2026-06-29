/**
 * D-Day · 기념일 계산 (100% 클라이언트, 순수 함수)
 * - countdown: 목표일까지 남은 날 (시험·전역 등). 오늘이 그날이면 D-DAY
 * - anniversary: 시작일부터 지난 날. 한국 관습대로 시작일을 1일째로 센다
 *   (사귄 날 = 1일, 100일 = 시작 +99일)
 */

import { DateParts, diffDays, addDays, formatKo, isValidDate } from "./core";

export interface CountdownResult {
  /** 목표일까지 남은 일수 (양수=미래, 0=오늘, 음수=지남) */
  daysUntil: number;
  /** "D-7" · "D-DAY" · "D+3" */
  label: string;
  /** 목표일 문자열 ("2026년 7월 1일 (수)") */
  targetLabel: string;
}

export interface Milestone {
  /** 표시 이름 ("100일", "1주년") */
  name: string;
  /** 해당 날짜 */
  date: DateParts;
  /** 오늘 기준 남은/지난 일수 (양수=미래) */
  dday: number;
  /** 이미 지난 기념일인지 */
  past: boolean;
}

export interface AnniversaryResult {
  /** 오늘이 며칠째인지 (시작일 = 1일) */
  dayCount: number;
  /** 시작일 문자열 */
  startLabel: string;
  /** 주요 기념일 목록 (100·200·…일, 1·2·…주년) */
  milestones: Milestone[];
}

/** 목표일까지 카운트다운 */
export function calcCountdown(target: DateParts, base: DateParts): CountdownResult | null {
  if (!isValidDate(target) || !isValidDate(base)) return null;
  const daysUntil = diffDays(target, base);
  let label: string;
  if (daysUntil > 0) label = `D-${daysUntil}`;
  else if (daysUntil === 0) label = "D-DAY";
  else label = `D+${-daysUntil}`;
  return { daysUntil, label, targetLabel: formatKo(target) };
}

/** n일째 기념일의 날짜 (1일째 = 시작일) */
const DAY_MILESTONES = [100, 200, 300, 365, 500, 1000, 2000, 3000];

/** 시작일 기준 기념일 계산 (한국식 1일째 카운팅) */
export function calcAnniversary(start: DateParts, base: DateParts): AnniversaryResult | null {
  if (!isValidDate(start) || !isValidDate(base)) return null;
  const elapsed = diffDays(base, start); // 시작일 당일이면 0
  if (elapsed < 0) return null; // 시작일이 미래면 계산 불가
  const dayCount = elapsed + 1; // 시작일을 1일째로

  const milestones: Milestone[] = [];

  // N일째 기념일 (시작 + (N-1)일)
  for (const n of DAY_MILESTONES) {
    const date = addDays(start, n - 1);
    const dday = diffDays(date, base);
    milestones.push({ name: `${n.toLocaleString("ko-KR")}일`, date, dday, past: dday < 0 });
  }

  // 주년 기념일 (양력 같은 월·일, 1~10주년)
  for (let y = 1; y <= 10; y++) {
    const date: DateParts = { year: start.year + y, month: start.month, day: start.day };
    // 2/29 시작일이 비윤년 주년이면 3/1로 보정
    const safeDate = isValidDate(date) ? date : addDays({ ...date, day: 28 }, 1);
    const dday = diffDays(safeDate, base);
    milestones.push({ name: `${y}주년`, date: safeDate, dday, past: dday < 0 });
  }

  // 날짜순 정렬
  milestones.sort((a, b) => diffDays(a.date, b.date));

  return { dayCount, startLabel: formatKo(start), milestones };
}
