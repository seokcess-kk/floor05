/**
 * 만 나이 계산 (100% 클라이언트, 순수 함수)
 * - 2023.6.28 만 나이 통일법 이후 한국의 공식 나이는 '만 나이'
 * - 보조로 연 나이(현재연도 - 출생연도)와 옛 세는 나이도 함께 제공
 */

import {
  DateParts,
  daysInMonth,
  diffDays,
  isValidDate,
  addDays,
} from "./core";

/** 12지 띠 (양력 연도 기준) */
const ZODIAC = [
  "쥐", "소", "호랑이", "토끼", "용", "뱀",
  "말", "양", "원숭이", "닭", "개", "돼지",
] as const;

export interface AgeResult {
  /** 만 나이 (공식 나이) */
  manAge: number;
  /** 만 나이의 개월 수 (만 N세 M개월) */
  months: number;
  /** 만 나이의 잔여 일수 (만 N세 M개월 D일) */
  days: number;
  /** 연 나이 = 기준연도 - 출생연도 (병역·청소년보호법 등에서 사용) */
  yearAge: number;
  /** 옛 세는 나이 = 연 나이 + 1 (참고용, 법적 효력 없음) */
  koreanAge: number;
  /** 태어난 지 총 일수 */
  totalDays: number;
  /** 띠 (양력 연도 기준) */
  zodiac: string;
  /** 다음 생일까지 남은 일수 (오늘이 생일이면 0) */
  nextBirthdayDday: number;
  /** 오늘이 생일인지 */
  isBirthdayToday: boolean;
}

/**
 * 만 나이·연 나이·세는 나이·띠·다음 생일을 한 번에 계산.
 * @param birth 생년월일
 * @param base  기준일 (보통 오늘)
 */
export function calcAge(birth: DateParts, base: DateParts): AgeResult | null {
  if (!isValidDate(birth) || !isValidDate(base)) return null;
  if (diffDays(base, birth) < 0) return null; // 생일이 기준일보다 미래면 계산 불가

  // 만 N세 M개월 D일 (자리 내림 방식)
  let years = base.year - birth.year;
  let months = base.month - birth.month;
  let days = base.day - birth.day;

  if (days < 0) {
    months -= 1;
    // 기준월의 '직전 달' 일수를 빌려온다
    const pm = base.month - 1 === 0 ? 12 : base.month - 1;
    const py = base.month - 1 === 0 ? base.year - 1 : base.year;
    days += daysInMonth(py, pm);
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const manAge = years;
  const yearAge = base.year - birth.year;
  const koreanAge = yearAge + 1;
  const totalDays = diffDays(base, birth);
  const zodiac = ZODIAC[((birth.year - 2020) % 12 + 12) % 12];

  // 다음 생일 (기준일 포함, 같은 월·일의 다음 도래일)
  const isBirthdayToday = base.month === birth.month && base.day === birth.day;
  let nextBirthdayDday = 0;
  if (!isBirthdayToday) {
    // 올해 생일 후보 (2/29 생일은 비윤년이면 3/1로 자동 보정)
    const thisYear: DateParts = normalizeBirthday(base.year, birth.month, birth.day);
    const target =
      diffDays(thisYear, base) >= 0
        ? thisYear
        : normalizeBirthday(base.year + 1, birth.month, birth.day);
    nextBirthdayDday = diffDays(target, base);
  }

  return {
    manAge,
    months,
    days,
    yearAge,
    koreanAge,
    totalDays,
    zodiac,
    nextBirthdayDday,
    isBirthdayToday,
  };
}

/** 2/29 생일을 해당 연도에 맞춰 보정 (비윤년이면 3/1) */
function normalizeBirthday(year: number, month: number, day: number): DateParts {
  if (month === 2 && day === 29 && day > daysInMonth(year, 2)) {
    return addDays({ year, month: 2, day: 28 }, 1); // → 3/1
  }
  return { year, month, day };
}
