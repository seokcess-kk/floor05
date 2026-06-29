/**
 * 색상 대비 계산 (100% 클라이언트, 순수 함수)
 * - WCAG 2.1 상대 명도·대비비 공식
 * - AA / AAA, 일반 텍스트 / 큰 텍스트 통과 여부 판정
 */

import { RGB } from "./convert";

/** WCAG 상대 명도 (0~1) */
export function relativeLuminance({ r, g, b }: RGB): number {
  const ch = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * ch(r) + 0.7152 * ch(g) + 0.0722 * ch(b);
}

/** 대비비 (1~21) */
export function contrastRatio(a: RGB, b: RGB): number {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  const lighter = Math.max(la, lb);
  const darker = Math.min(la, lb);
  return (lighter + 0.05) / (darker + 0.05);
}

export interface ContrastResult {
  /** 대비비 (소수 2자리) */
  ratio: number;
  /** 일반 텍스트 AA (≥4.5) */
  aaNormal: boolean;
  /** 큰 텍스트 AA (≥3) */
  aaLarge: boolean;
  /** 일반 텍스트 AAA (≥7) */
  aaaNormal: boolean;
  /** 큰 텍스트 AAA (≥4.5) */
  aaaLarge: boolean;
}

export function judgeContrast(fg: RGB, bg: RGB): ContrastResult {
  const raw = contrastRatio(fg, bg);
  const ratio = Math.round(raw * 100) / 100;
  return {
    ratio,
    aaNormal: raw >= 4.5,
    aaLarge: raw >= 3,
    aaaNormal: raw >= 7,
    aaaLarge: raw >= 4.5,
  };
}
