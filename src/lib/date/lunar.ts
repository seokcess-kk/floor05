/**
 * 음력 ↔ 양력 변환 (100% 클라이언트, 순수 함수)
 * - 한국천문연구원(KASI) 음양력 데이터 기반 korean-lunar-calendar 라이브러리 래핑
 * - 지원 범위: 양력 1391-02-05 ~ 2050-12-31 (라이브러리 한계)
 * - 윤달(intercalation)과 간지(干支)까지 반영
 */

import KoreanLunarCalendar from "korean-lunar-calendar";
import { DateParts } from "./core";

/** 지원 범위 (양력 연도) */
export const LUNAR_MIN_YEAR = 1391;
export const LUNAR_MAX_YEAR = 2050;

export interface LunarResult {
  /** 음력 날짜 */
  lunar: DateParts;
  /** 윤달 여부 */
  leapMonth: boolean;
  /** 간지 (예: "갑진년") — 한국식 한글 간지 연. 라이브러리가 '년'까지 포함해 반환 */
  ganji: string;
}

export interface SolarResult {
  /** 양력 날짜 */
  solar: DateParts;
  /** 간지 (예: "갑진년") — 라이브러리가 '년'까지 포함해 반환 */
  ganji: string;
}

function inRange(year: number): boolean {
  return year >= LUNAR_MIN_YEAR && year <= LUNAR_MAX_YEAR;
}

/** 양력 → 음력 */
export function solarToLunar(d: DateParts): LunarResult | null {
  if (!inRange(d.year)) return null;
  const cal = new KoreanLunarCalendar();
  if (!cal.setSolarDate(d.year, d.month, d.day)) return null;
  const l = cal.getLunarCalendar();
  return {
    lunar: { year: l.year, month: l.month, day: l.day },
    leapMonth: Boolean(l.intercalation),
    ganji: safeGanji(cal),
  };
}

/** 음력 → 양력 (윤달 여부 지정) */
export function lunarToSolar(d: DateParts, leapMonth: boolean): SolarResult | null {
  if (!inRange(d.year)) return null;
  const cal = new KoreanLunarCalendar();
  if (!cal.setLunarDate(d.year, d.month, d.day, leapMonth)) return null;
  const s = cal.getSolarCalendar();
  return {
    solar: { year: s.year, month: s.month, day: s.day },
    ganji: safeGanji(cal),
  };
}

/**
 * 음력 생일을 특정 양력 연도의 날짜로 변환.
 * "음력 생일이 올해 양력으로 며칠?" 같은 가장 흔한 질문에 답한다.
 * @param month 음력 월
 * @param day   음력 일
 * @param leapMonth 윤달 여부
 * @param solarYear 변환 대상 양력 연도
 */
export function lunarBirthdayToSolar(
  month: number,
  day: number,
  leapMonth: boolean,
  solarYear: number,
): DateParts | null {
  // 음력 연도를 대상 양력 연도와 같게 두면, 대부분 같은 양력 연도의 날짜로 매핑된다
  const r = lunarToSolar({ year: solarYear, month, day }, leapMonth);
  return r ? r.solar : null;
}

/** 라이브러리가 간지를 못 구하면 빈 문자열 (방어) */
function safeGanji(cal: KoreanLunarCalendar): string {
  try {
    return cal.getKoreanGapja().year ?? "";
  } catch {
    return "";
  }
}
