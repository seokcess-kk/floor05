/**
 * 기초대사량(BMR) · 활동대사량(TDEE) 계산 (100% 클라이언트, 순수 함수)
 * - BMR: Mifflin-St Jeor 공식 (현재 가장 널리 쓰이는 추정식)
 * - TDEE: BMR × 활동계수
 * - 목표 칼로리: 1주 0.5kg 감량 ≈ 하루 -500kcal 기준
 * - 참고용 추정치이며 개인차가 크다
 */

export type Sex = "male" | "female";

export interface ActivityLevel {
  key: string;
  label: string;
  desc: string;
  factor: number;
}

/** 활동 수준별 계수 */
export const ACTIVITY_LEVELS: ActivityLevel[] = [
  { key: "sedentary", label: "거의 안 함", desc: "좌식 생활, 운동 거의 안 함", factor: 1.2 },
  { key: "light", label: "가벼운 활동", desc: "주 1~3일 가벼운 운동", factor: 1.375 },
  { key: "moderate", label: "보통 활동", desc: "주 3~5일 운동", factor: 1.55 },
  { key: "active", label: "활발한 활동", desc: "주 6~7일 운동", factor: 1.725 },
  { key: "veryActive", label: "매우 활발", desc: "육체노동·운동선수 수준", factor: 1.9 },
];

export interface BmrInput {
  sex: Sex;
  /** 나이(만) */
  age: number;
  heightCm: number;
  weightKg: number;
  /** 활동계수 (ACTIVITY_LEVELS의 factor) */
  activityFactor: number;
}

export interface BmrResult {
  /** 기초대사량 (kcal/일) */
  bmr: number;
  /** 활동대사량 = 하루 권장 칼로리 (kcal/일) */
  tdee: number;
  /** 감량 목표 칼로리 (TDEE − 500) */
  lose: number;
  /** 유지 칼로리 (= TDEE) */
  maintain: number;
  /** 증량 목표 칼로리 (TDEE + 400) */
  gain: number;
}

export function calcBmr(input: BmrInput): BmrResult | null {
  const { sex, age, heightCm, weightKg, activityFactor } = input;
  if (age <= 0 || age > 120 || heightCm <= 0 || weightKg <= 0) return null;
  if (heightCm > 300 || weightKg > 500) return null;

  // Mifflin-St Jeor
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  const bmr = sex === "male" ? base + 5 : base - 161;
  const tdee = bmr * activityFactor;

  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    lose: Math.round(tdee - 500),
    maintain: Math.round(tdee),
    gain: Math.round(tdee + 400),
  };
}
