/**
 * 급여·세금 계산용 요율·세액표 (중앙 관리 — 유지보수 단일 지점)
 * ===========================================================================
 * ⚠️ 유지보수 안내
 * - 이 파일의 숫자만 갱신하면 연봉 실수령액·퇴직금 계산기에 일괄 반영된다.
 * - 4대보험 요율은 매년(보통 1월), 소득세 간이세액표는 개정 시 바뀐다.
 * - 각 값에 [기준 시점]과 [출처]를 주석으로 남겼다. 갱신 시 주석도 함께 고쳐라.
 *
 * 📅 기준: 2026년 (2026.01 시행 4대보험 요율 / 2023~ 현행 소득세 누진구조)
 * ⚠️ 면책: 소득세는 국세청 근로소득 간이세액표를 "근사"한 값이다. 실제 원천징수액은
 *    회사가 신고한 부양가족 수·비과세 항목·간이세액표 원본에 따라 달라질 수 있다.
 * ===========================================================================
 */

/** 4대보험 — 근로자 부담분 요율 (2026년 기준) */
export const INSURANCE = {
  /**
   * 국민연금: 근로자 4.75% (전체 9.5%).
   * [2026 인상] 2025년 연금개혁으로 9.0%→9.5%, 매년 0.5%p씩 단계 인상의 첫 해.
   * 근로자 부담은 절반인 4.75%.
   */
  pension: {
    rate: 0.0475,
    /** 기준소득월액 상한 (2026.7~2027.6 적용). 2027.7부터 A값 변동에 따라 재조정 예정 */
    maxBase: 6_590_000,
    /** 기준소득월액 하한 (2026.7~2027.6 적용). 2027.7부터 A값 변동에 따라 재조정 예정 */
    minBase: 410_000,
  },

  /**
   * 건강보험: 근로자 3.595% (전체 7.19%).
   * [2026 인상] 7.09%→7.19%.
   */
  health: {
    rate: 0.03595,
  },

  /**
   * 장기요양보험: 건강보험료(근로자 부담분)의 13.14%.
   * [2026 인상] 12.95%→13.14% (건강보험료 대비). 보수월액 대비로는 약 0.9448%.
   * ※ 보수월액이 아니라 "건강보험료"에 곱하는 점에 유의.
   */
  longTermCare: {
    /** 건강보험료 대비 비율 */
    rateOfHealth: 0.1314,
  },

  /**
   * 고용보험(실업급여): 근로자 0.9%.
   * [2026 동결] 2025년과 동일. (고용안정·직업능력개발 부담분은 사업주 몫이라 제외)
   */
  employment: {
    rate: 0.009,
  },
} as const;

/**
 * 종합소득세 기본세율 — 과세표준 구간·세율·누진공제 (2023년 개정 ~ 현행, 2026 동일).
 * 산출세액 = 과세표준 × rate − deduction.
 * upTo는 "이 금액 이하"의 상한(원). 마지막 구간은 Infinity.
 */
export const INCOME_TAX_BRACKETS: ReadonlyArray<{
  upTo: number;
  rate: number;
  deduction: number;
}> = [
  { upTo: 14_000_000, rate: 0.06, deduction: 0 },
  { upTo: 50_000_000, rate: 0.15, deduction: 1_260_000 },
  { upTo: 88_000_000, rate: 0.24, deduction: 5_760_000 },
  { upTo: 150_000_000, rate: 0.35, deduction: 15_440_000 },
  { upTo: 300_000_000, rate: 0.38, deduction: 19_940_000 },
  { upTo: 500_000_000, rate: 0.40, deduction: 25_940_000 },
  { upTo: 1_000_000_000, rate: 0.42, deduction: 35_940_000 },
  { upTo: Infinity, rate: 0.45, deduction: 65_940_000 },
];

/**
 * 근로소득공제 — 총급여(연) 구간별 (현행).
 * 공제액 = base + (총급여 − floor) × rate. 단 총 공제 한도 2,000만원.
 */
export const EARNED_INCOME_DEDUCTION: ReadonlyArray<{
  upTo: number;
  base: number;
  floor: number;
  rate: number;
}> = [
  { upTo: 5_000_000, base: 0, floor: 0, rate: 0.7 },
  { upTo: 15_000_000, base: 3_500_000, floor: 5_000_000, rate: 0.4 },
  { upTo: 45_000_000, base: 7_500_000, floor: 15_000_000, rate: 0.15 },
  { upTo: 100_000_000, base: 12_000_000, floor: 45_000_000, rate: 0.05 },
  { upTo: Infinity, base: 14_750_000, floor: 100_000_000, rate: 0.02 },
];

/** 근로소득공제 한도 */
export const EARNED_INCOME_DEDUCTION_CAP = 20_000_000;

/** 기본(인적)공제: 본인·부양가족 1인당 (연) */
export const PERSONAL_DEDUCTION_PER_HEAD = 1_500_000;

/** 표준세액공제: 특별공제를 받지 않는 근로자 기본 적용 (연) */
export const STANDARD_TAX_CREDIT = 130_000;

/** 지방소득세: 소득세(결정세액)의 10% */
export const LOCAL_TAX_RATE = 0.1;

/**
 * 근로소득세액공제 — 산출세액 기준 공제율과 총급여별 한도.
 * 공제액 = 산출세액 130만 이하 55%, 초과분 30% (아래 한도 적용).
 */
export const EARNED_INCOME_TAX_CREDIT = {
  threshold: 1_300_000,
  rateUnder: 0.55,
  rateOver: 0.3,
  /** 산출세액 130만원까지의 공제액(= 130만×55%) — 초과분 계산 기준 */
  baseAtThreshold: 715_000,
} as const;

/**
 * 근로소득세액공제 한도 — 총급여(연) 구간별.
 * 검색·국세청 기준: 3,300만 이하 74만 / 3,300만~7,000만 점감(최소 66만) /
 * 7,000만~1.2억 점감(최소 50만) / 1.2억 초과 점감(최소 20만).
 */
export function earnedIncomeTaxCreditCap(grossAnnual: number): number {
  if (grossAnnual <= 33_000_000) return 740_000;
  if (grossAnnual <= 70_000_000) {
    return Math.max(660_000, 740_000 - (grossAnnual - 33_000_000) * 0.008);
  }
  if (grossAnnual <= 120_000_000) {
    return Math.max(500_000, 660_000 - (grossAnnual - 70_000_000) * 0.5);
  }
  return Math.max(200_000, 500_000 - (grossAnnual - 120_000_000) * 0.5);
}

/**
 * 8세 이상 20세 이하 자녀 세액공제 (월, 간이세액표 차감액).
 * 국세청 간이세액표 기준: 1명 12,500원, 2명 29,160원, 3명 이상은 +25,000원/명.
 */
export function childTaxCreditMonthly(children: number): number {
  if (children <= 0) return 0;
  if (children === 1) return 12_500;
  if (children === 2) return 29_160;
  return 29_160 + (children - 2) * 25_000;
}

/** 부가가치세율 (일반과세 10%) */
export const VAT_RATE = 0.1;

/**
 * 이자소득세율 — 소득세 14% + 지방소득세 1.4% = 15.4%.
 * 예·적금 이자에 원천징수된다(세금우대·비과세 상품 제외).
 */
export const INTEREST_INCOME_TAX_RATE = 0.154;

/**
 * 최저임금 — 2026년 적용 (2026.1.1~).
 * [출처] 고용노동부 고시. 2025년 10,030원 → 2026년 10,320원(+2.9%).
 * 월 환산 209시간 = (주 40시간 + 주휴 8시간) × 4.345주.
 */
export const MINIMUM_WAGE = {
  /** 시급(원) */
  hourly: 10_320,
  /** 월 소정근로시간(주휴 포함, 209시간) */
  monthlyHours: 209,
} as const;

/** 주→월 환산 평균 주수 (52.14주 ÷ 12개월) */
export const WEEKS_PER_MONTH = 4.345;

/** 퇴직금 — 법정 산식 상수 */
export const SEVERANCE = {
  /** 1일 평균임금 × 30일분이 1년치 */
  daysPerYear: 30,
  /** 연 환산 기준일수 */
  yearDays: 365,
  /** 퇴직금 발생 최소 재직기간(일): 1년 미만은 법정 퇴직금 대상 아님 */
  minDays: 365,
} as const;
