/**
 * 건강 도구 단위 테스트 — expected는 공식 문헌 기준 별도 산출
 * - BMI 구간: 대한비만학회 2022 (18.5/23/25/30/35)
 * - BMR: Mifflin-St Jeor (1990)
 * - 배란: 황체기 14일 고정 표준 모델 / 임신: Naegele 법칙 (LMP+280일)
 */
import { describe, it, expect } from "vitest";
import { calcBmi, bmiCategory } from "@/lib/health/bmi";
import { calcBmr, ACTIVITY_LEVELS } from "@/lib/health/bmr";
import { calcOvulation } from "@/lib/health/ovulation";
import { calcPregnancy } from "@/lib/health/pregnancy";

describe("BMI", () => {
  it("170cm·60kg → BMI 20.8 · 정상 · 정상범위 53.5~66.2kg", () => {
    const r = calcBmi(170, 60)!;
    expect(r.bmi).toBe(20.8); // 60 / 1.7² = 20.76
    expect(r.category.label).toBe("정상");
    expect(r.normalMin).toBe(53.5); // 18.5 × 1.7²
    expect(r.normalMax).toBe(66.2); // 22.9 × 1.7²
    expect(r.diffToNormal).toBe(0);
  });

  it("대한비만학회 구간 경계", () => {
    expect(bmiCategory(18.4).label).toBe("저체중");
    expect(bmiCategory(18.5).label).toBe("정상");
    expect(bmiCategory(22.9).label).toBe("정상");
    expect(bmiCategory(23).label).toBe("비만 전단계");
    expect(bmiCategory(25).label).toBe("1단계 비만");
    expect(bmiCategory(30).label).toBe("2단계 비만");
    expect(bmiCategory(35).label).toBe("3단계 비만(고도비만)");
  });

  it("범위 밖 입력은 null", () => {
    expect(calcBmi(0, 60)).toBeNull();
    expect(calcBmi(170, 0)).toBeNull();
    expect(calcBmi(301, 60)).toBeNull();
    expect(calcBmi(170, 501)).toBeNull();
  });
});

describe("BMR (Mifflin-St Jeor)", () => {
  it("남 30세 175cm 70kg → BMR 1649", () => {
    // 10×70 + 6.25×175 − 5×30 + 5 = 1648.75
    const r = calcBmr({ sex: "male", age: 30, heightCm: 175, weightKg: 70, activityFactor: 1.2 })!;
    expect(r.bmr).toBe(1649);
    expect(r.tdee).toBe(1979); // 1648.75 × 1.2 = 1978.5
    expect(r.maintain).toBe(1979);
    expect(r.lose).toBe(1479);
    expect(r.gain).toBe(2379);
  });

  it("여 25세 160cm 50kg → BMR 1114", () => {
    // 10×50 + 6.25×160 − 5×25 − 161 = 1214 ... 검산: 500+1000−125−161 = 1214
    const r = calcBmr({ sex: "female", age: 25, heightCm: 160, weightKg: 50, activityFactor: 1.375 })!;
    expect(r.bmr).toBe(1214);
    expect(r.tdee).toBe(Math.round(1214 * 1.375)); // 1669.25 → 1669
  });

  it("활동계수 표준값 존재", () => {
    expect(ACTIVITY_LEVELS.map((l) => l.factor)).toEqual([1.2, 1.375, 1.55, 1.725, 1.9]);
  });

  it("나이 0·121세는 null", () => {
    expect(calcBmr({ sex: "male", age: 0, heightCm: 175, weightKg: 70, activityFactor: 1.2 })).toBeNull();
    expect(calcBmr({ sex: "male", age: 121, heightCm: 175, weightKg: 70, activityFactor: 1.2 })).toBeNull();
  });
});

describe("배란일 (calcOvulation)", () => {
  it("마지막 생리 2026-08-01 · 28일 주기 → 다음 생리 8/29 · 배란 8/15 · 가임기 8/10~8/16", () => {
    const r = calcOvulation({ year: 2026, month: 8, day: 1 }, 28)!;
    expect(r.current.period).toEqual({ year: 2026, month: 8, day: 29 });
    expect(r.current.ovulation).toEqual({ year: 2026, month: 8, day: 15 });
    expect(r.current.fertileStart).toEqual({ year: 2026, month: 8, day: 10 });
    expect(r.current.fertileEnd).toEqual({ year: 2026, month: 8, day: 16 });
    expect(r.cycles).toHaveLength(3);
    // 두 번째 주기 = +28일
    expect(r.cycles[1].period).toEqual({ year: 2026, month: 9, day: 26 });
  });

  it("주기 범위(20~45) 밖·비정수는 null", () => {
    const d = { year: 2026, month: 8, day: 1 };
    expect(calcOvulation(d, 19)).toBeNull();
    expect(calcOvulation(d, 46)).toBeNull();
    expect(calcOvulation(d, 28.5)).toBeNull();
  });
});

describe("임신 주수 (calcPregnancy)", () => {
  it("LMP 2026-01-01 → 8/13 기준 32주 0일 · 3삼분기 · 예정일 2026-10-08", () => {
    // 총 224일 = 32주 0일. EDD = LMP + 280일 = 10/8 (달력 검산: 1/1+280)
    const r = calcPregnancy({ year: 2026, month: 1, day: 1 }, { year: 2026, month: 8, day: 13 })!;
    expect(r.totalDays).toBe(224);
    expect(r.weeks).toBe(32);
    expect(r.days).toBe(0);
    expect(r.trimester).toBe(3);
    expect(r.dueDate).toEqual({ year: 2026, month: 10, day: 8 });
    expect(r.ddayToDue).toBe(56);
    expect(r.progressPercent).toBe(80); // 224/280
  });

  it("삼분기 경계: 13주=1, 14주=2, 27주=2, 28주=3", () => {
    const lmp = { year: 2026, month: 1, day: 1 };
    // 달력 검산: LMP+97일 = 4/8 (13주6일), +98일 = 4/9 (14주0일), +196일 = 7/16 (28주0일)
    const p13 = calcPregnancy(lmp, { year: 2026, month: 4, day: 8 })!; // +97일 = 13주6일
    expect(p13.weeks).toBe(13);
    expect(p13.trimester).toBe(1);
    const p14 = calcPregnancy(lmp, { year: 2026, month: 4, day: 9 })!; // +98일 = 14주0일
    expect(p14.trimester).toBe(2);
    const p28 = calcPregnancy(lmp, { year: 2026, month: 7, day: 16 })!; // +196일 = 28주0일
    expect(p28.trimester).toBe(3);
  });

  it("LMP가 미래거나 45주 초과면 null", () => {
    const base = { year: 2026, month: 8, day: 13 };
    expect(calcPregnancy({ year: 2026, month: 8, day: 14 }, base)).toBeNull();
    expect(calcPregnancy({ year: 2025, month: 9, day: 1 }, base)).toBeNull(); // 346일 > 315
  });
});
