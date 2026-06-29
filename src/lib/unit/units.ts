/**
 * 단위 변환 정의 (100% 클라이언트, 순수 데이터/함수)
 * - 각 단위는 toBase/fromBase 함수를 가져, 배율(길이·면적)과 비선형(온도) 변환을 모두 표현
 * - UnitConverter 컴포넌트가 set 키로 골라 양방향 변환에 사용
 */

export interface UnitDef {
  key: string;
  /** 한국어 단위명 */
  label: string;
  /** 기호 (cm, ㎡, °C 등) */
  symbol: string;
  /** 입력값 → 기준단위 */
  toBase: (v: number) => number;
  /** 기준단위 → 이 단위 */
  fromBase: (v: number) => number;
}

export interface UnitSet {
  /** 기준단위 1 = factor (base unit) */
  units: UnitDef[];
  defaultUnit: string;
  defaultValue: number;
}

/** 배율 단위 (기준단위 = factor가 1인 단위) */
function factorUnit(key: string, label: string, symbol: string, factor: number): UnitDef {
  return {
    key,
    label,
    symbol,
    toBase: (v) => v * factor,
    fromBase: (v) => v / factor,
  };
}

export const UNIT_SETS: Record<string, UnitSet> = {
  // 길이: 기준 = 미터
  length: {
    units: [
      factorUnit("mm", "밀리미터", "mm", 0.001),
      factorUnit("cm", "센티미터", "cm", 0.01),
      factorUnit("m", "미터", "m", 1),
      factorUnit("km", "킬로미터", "km", 1000),
      factorUnit("inch", "인치", "in", 0.0254),
      factorUnit("ft", "피트", "ft", 0.3048),
    ],
    defaultUnit: "cm",
    defaultValue: 170,
  },

  // 면적: 기준 = 제곱미터. 1평 = 400/121 ≈ 3.3057851㎡
  area: {
    units: [
      factorUnit("pyeong", "평", "평", 400 / 121),
      factorUnit("sqm", "제곱미터", "㎡", 1),
      factorUnit("sqft", "제곱피트", "ft²", 0.09290304),
    ],
    defaultUnit: "pyeong",
    defaultValue: 32,
  },

  // 온도: 기준 = 섭씨(°C). 비선형(affine) 변환
  temperature: {
    units: [
      { key: "c", label: "섭씨", symbol: "°C", toBase: (v) => v, fromBase: (v) => v },
      {
        key: "f",
        label: "화씨",
        symbol: "°F",
        toBase: (v) => ((v - 32) * 5) / 9,
        fromBase: (v) => (v * 9) / 5 + 32,
      },
      {
        key: "k",
        label: "켈빈",
        symbol: "K",
        toBase: (v) => v - 273.15,
        fromBase: (v) => v + 273.15,
      },
    ],
    defaultUnit: "c",
    defaultValue: 36.5,
  },
};

/** 변환 결과 표시용 포맷 — 유효숫자 6자리로 다듬고 불필요한 0 제거 */
export function formatUnitValue(n: number): string {
  if (!Number.isFinite(n)) return "";
  if (n === 0) return "0";
  // 매우 작은 잔차(부동소수점 오차) 제거
  const cleaned = Math.abs(n) < 1e-9 ? 0 : Number(n.toPrecision(6));
  return String(cleaned);
}
