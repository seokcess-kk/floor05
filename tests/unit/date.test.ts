/**
 * 날짜 도구 단위 테스트 — expected는 달력으로 별도 검산한 golden value
 */
import { describe, it, expect } from "vitest";
import { diffDays, addDays, isValidDate, isLeapYear, daysInMonth, fromISODate, toISODate } from "@/lib/date/core";
import { calcAge } from "@/lib/date/age";
import { calcCountdown, calcAnniversary } from "@/lib/date/dday";
import { solarToLunar, lunarToSolar, lunarBirthdayToSolar } from "@/lib/date/lunar";

describe("date core", () => {
  it("윤년 판정 (그레고리력 규칙)", () => {
    expect(isLeapYear(2024)).toBe(true);
    expect(isLeapYear(2026)).toBe(false);
    expect(isLeapYear(2000)).toBe(true); // 400 배수
    expect(isLeapYear(1900)).toBe(false); // 100 배수
  });

  it("월별 일수", () => {
    expect(daysInMonth(2024, 2)).toBe(29);
    expect(daysInMonth(2026, 2)).toBe(28);
    expect(daysInMonth(2026, 4)).toBe(30);
    expect(daysInMonth(2026, 12)).toBe(31);
  });

  it("존재하지 않는 날짜 거부", () => {
    expect(isValidDate({ year: 2026, month: 2, day: 30 })).toBe(false);
    expect(isValidDate({ year: 2026, month: 13, day: 1 })).toBe(false);
    expect(isValidDate({ year: 2024, month: 2, day: 29 })).toBe(true);
  });

  it("diffDays·addDays 왕복", () => {
    const a = { year: 2026, month: 1, day: 1 };
    expect(diffDays({ year: 2026, month: 12, day: 31 }, a)).toBe(364);
    expect(addDays(a, 364)).toEqual({ year: 2026, month: 12, day: 31 });
    expect(addDays(a, -1)).toEqual({ year: 2025, month: 12, day: 31 });
  });

  it("ISO 파싱/포맷 왕복", () => {
    expect(fromISODate("1995-03-07")).toEqual({ year: 1995, month: 3, day: 7 });
    expect(fromISODate("1995-02-30")).toBeNull();
    expect(toISODate({ year: 1995, month: 3, day: 7 })).toBe("1995-03-07");
  });
});

describe("만 나이 (calcAge)", () => {
  const base = { year: 2026, month: 8, day: 13 };

  it("1995-03-07생 → 2026-08-13 기준 만 31세", () => {
    const r = calcAge({ year: 1995, month: 3, day: 7 }, base)!;
    expect(r.manAge).toBe(31);
    expect(r.months).toBe(5);
    expect(r.days).toBe(6);
    expect(r.yearAge).toBe(31);
    expect(r.koreanAge).toBe(32);
    expect(r.zodiac).toBe("돼지"); // 1995년 = 돼지띠
  });

  it("생일 전이면 만 나이 −1", () => {
    const r = calcAge({ year: 1995, month: 12, day: 25 }, base)!;
    expect(r.manAge).toBe(30);
  });

  it("오늘이 생일이면 isBirthdayToday", () => {
    const r = calcAge({ year: 2000, month: 8, day: 13 }, base)!;
    expect(r.manAge).toBe(26);
    expect(r.isBirthdayToday).toBe(true);
    expect(r.nextBirthdayDday).toBe(0);
  });

  it("2/29 출생 — 비윤년 다음 생일은 3/1 (2027-03-01까지 200일)", () => {
    const r = calcAge({ year: 2000, month: 2, day: 29 }, base)!;
    expect(r.manAge).toBe(26);
    expect(r.zodiac).toBe("용"); // 2000년 = 용띠
    expect(r.nextBirthdayDday).toBe(200);
  });

  it("미래 출생일은 null", () => {
    expect(calcAge({ year: 2027, month: 1, day: 1 }, base)).toBeNull();
  });
});

describe("D-Day (dday)", () => {
  const base = { year: 2026, month: 8, day: 13 };

  it("카운트다운: 100일 뒤 = D-100, 오늘 = D-DAY, 지난 날 = D+", () => {
    expect(calcCountdown(addDays(base, 100), base)!.label).toBe("D-100");
    expect(calcCountdown(base, base)!.label).toBe("D-DAY");
    expect(calcCountdown(addDays(base, -3), base)!.label).toBe("D+3");
  });

  it("기념일: 시작일이 1일째 (한국식) — 2026-01-01 시작 → 8/13은 225일째", () => {
    const r = calcAnniversary({ year: 2026, month: 1, day: 1 }, base)!;
    expect(r.dayCount).toBe(225); // 224일 경과 + 1
    // 100일 = 시작 + 99일 = 2026-04-10 (달력 검산: 4/10은 그해 100번째 날)
    const m100 = r.milestones.find((m) => m.name === "100일")!;
    expect(m100.date).toEqual({ year: 2026, month: 4, day: 10 });
    expect(m100.past).toBe(true);
    // 1주년 = 2027-01-01
    const y1 = r.milestones.find((m) => m.name === "1주년")!;
    expect(y1.date).toEqual({ year: 2027, month: 1, day: 1 });
    expect(y1.past).toBe(false);
  });

  it("시작일이 미래면 null", () => {
    expect(calcAnniversary(addDays(base, 1), base)).toBeNull();
  });
});

describe("음력↔양력 (lunar) — KASI 만세력 golden value", () => {
  it("설날 2026: 음력 2026-01-01 = 양력 2026-02-17", () => {
    const r = lunarToSolar({ year: 2026, month: 1, day: 1 }, false)!;
    expect(r.solar).toEqual({ year: 2026, month: 2, day: 17 });
  });

  it("추석 2026: 음력 2026-08-15 = 양력 2026-09-25", () => {
    const r = lunarToSolar({ year: 2026, month: 8, day: 15 }, false)!;
    expect(r.solar).toEqual({ year: 2026, month: 9, day: 25 });
  });

  it("양력 2026-02-17 → 음력 2026-01-01 (역방향)", () => {
    const r = solarToLunar({ year: 2026, month: 2, day: 17 })!;
    expect(r.lunar).toEqual({ year: 2026, month: 1, day: 1 });
    expect(r.leapMonth).toBe(false);
  });

  it("윤달: 음력 2025 윤6월 1일 = 양력 2025-07-25", () => {
    const r = lunarToSolar({ year: 2025, month: 6, day: 1 }, true)!;
    expect(r.solar).toEqual({ year: 2025, month: 7, day: 25 });
  });

  it("존재하지 않는 윤달 지정은 null", () => {
    // 2026년에는 윤6월이 없다
    expect(lunarToSolar({ year: 2026, month: 6, day: 1 }, true)).toBeNull();
  });

  it("지원 범위(1391~2050) 밖은 null", () => {
    expect(solarToLunar({ year: 1390, month: 1, day: 1 })).toBeNull();
    expect(solarToLunar({ year: 2051, month: 1, day: 1 })).toBeNull();
  });

  it("음력 생일 → 올해 양력 변환", () => {
    const r = lunarBirthdayToSolar(8, 15, false, 2026)!;
    expect(r).toEqual({ year: 2026, month: 9, day: 25 });
  });
});
