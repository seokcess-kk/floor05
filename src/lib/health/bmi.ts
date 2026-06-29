/**
 * BMI(체질량지수) 계산 (100% 클라이언트, 순수 함수)
 * - 비만도 구간은 대한비만학회 2022 기준(아시아인) 사용 — WHO 기준과 다름
 * - 참고용 추정치이며 의학적 진단을 대체하지 않는다
 */

export interface BmiCategory {
  /** 구간 이름 */
  label: string;
  /** 색 강조용 단계 (0 정상 ~ 5 고도비만) */
  level: number;
}

export interface BmiResult {
  /** BMI (소수 1자리) */
  bmi: number;
  /** 비만도 구간 */
  category: BmiCategory;
  /** 정상(BMI 18.5~22.9) 체중 범위 하한 (kg, 소수 1자리) */
  normalMin: number;
  /** 정상 체중 범위 상한 (kg, 소수 1자리) */
  normalMax: number;
  /** 정상 범위까지 줄이거나 늘려야 하는 무게 (kg). 범위 안이면 0 */
  diffToNormal: number;
}

/** 대한비만학회 2022 기준 비만도 구간 */
export function bmiCategory(bmi: number): BmiCategory {
  if (bmi < 18.5) return { label: "저체중", level: 1 };
  if (bmi < 23) return { label: "정상", level: 0 };
  if (bmi < 25) return { label: "비만 전단계", level: 2 };
  if (bmi < 30) return { label: "1단계 비만", level: 3 };
  if (bmi < 35) return { label: "2단계 비만", level: 4 };
  return { label: "3단계 비만(고도비만)", level: 5 };
}

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

/**
 * @param heightCm 키 (cm)
 * @param weightKg 몸무게 (kg)
 */
export function calcBmi(heightCm: number, weightKg: number): BmiResult | null {
  if (heightCm <= 0 || weightKg <= 0 || heightCm > 300 || weightKg > 500) return null;
  const h = heightCm / 100;
  const bmi = weightKg / (h * h);
  const normalMin = 18.5 * h * h;
  const normalMax = 22.9 * h * h;

  let diffToNormal = 0;
  if (weightKg < normalMin) diffToNormal = round1(weightKg - normalMin); // 음수 = 늘려야
  else if (weightKg > normalMax) diffToNormal = round1(weightKg - normalMax); // 양수 = 줄여야

  return {
    bmi: round1(bmi),
    category: bmiCategory(bmi),
    normalMin: round1(normalMin),
    normalMax: round1(normalMax),
    diffToNormal,
  };
}
