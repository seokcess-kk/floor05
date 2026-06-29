/**
 * 날짜 도구 공통 헬퍼 (100% 클라이언트, 순수 함수)
 * - 만 나이·D-Day·음력변환이 공유하는 날짜 연산
 * - 시간대(DST) 영향을 없애기 위해 모든 날짜 차이는 UTC 자정 기준으로 계산한다
 */

export interface DateParts {
  /** 연도 (예: 1995) */
  year: number;
  /** 월 1~12 */
  month: number;
  /** 일 1~31 */
  day: number;
}

export const WEEKDAYS_KO = ["일", "월", "화", "수", "목", "금", "토"] as const;

/** 해당 연·월의 마지막 날(28~31). month는 1~12 */
export function daysInMonth(year: number, month: number): number {
  // new Date(y, month, 0) = 그 달의 마지막 날 (deterministic, Date.now 미사용)
  return new Date(year, month, 0).getDate();
}

/** 윤년 여부 */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/** 실제 존재하는 날짜인지 검증 (예: 2월 30일·13월 거부) */
export function isValidDate(d: DateParts): boolean {
  if (!Number.isInteger(d.year) || !Number.isInteger(d.month) || !Number.isInteger(d.day)) {
    return false;
  }
  if (d.month < 1 || d.month > 12) return false;
  if (d.day < 1 || d.day > daysInMonth(d.year, d.month)) return false;
  return true;
}

/** UTC 자정 타임스탬프(ms) — 날짜 차이 계산 기준 */
export function toUTCms(d: DateParts): number {
  return Date.UTC(d.year, d.month - 1, d.day);
}

/** 두 날짜의 일수 차 (a - b). a가 b보다 미래면 양수 */
export function diffDays(a: DateParts, b: DateParts): number {
  return Math.round((toUTCms(a) - toUTCms(b)) / 86_400_000);
}

/** 기준일에 n일을 더한 날짜 (n 음수면 과거) */
export function addDays(d: DateParts, n: number): DateParts {
  const t = new Date(toUTCms(d) + n * 86_400_000);
  return { year: t.getUTCFullYear(), month: t.getUTCMonth() + 1, day: t.getUTCDate() };
}

/** 요일 (한국어 한 글자: 일~토) */
export function weekdayKo(d: DateParts): string {
  return WEEKDAYS_KO[new Date(toUTCms(d)).getUTCDay()];
}

/** "1995년 3월 7일 (화)" 형식 */
export function formatKo(d: DateParts, withWeekday = true): string {
  const base = `${d.year}년 ${d.month}월 ${d.day}일`;
  return withWeekday ? `${base} (${weekdayKo(d)})` : base;
}

/** "1995-03-07" 형식 (input[type=date] value) */
export function toISODate(d: DateParts): string {
  const mm = String(d.month).padStart(2, "0");
  const dd = String(d.day).padStart(2, "0");
  return `${d.year}-${mm}-${dd}`;
}

/** "1995-03-07" → DateParts (유효하지 않으면 null) */
export function fromISODate(iso: string): DateParts | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return null;
  const d = { year: Number(m[1]), month: Number(m[2]), day: Number(m[3]) };
  return isValidDate(d) ? d : null;
}

/** 오늘 (로컬 기준) — 클라이언트에서만 호출 */
export function todayParts(): DateParts {
  const t = new Date();
  return { year: t.getFullYear(), month: t.getMonth() + 1, day: t.getDate() };
}
