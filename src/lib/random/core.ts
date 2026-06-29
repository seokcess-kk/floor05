/**
 * 공정한 난수 (100% 클라이언트, 순수 함수)
 * - crypto.getRandomValues 기반 균등 정수 (거부 표집으로 모듈로 편향 제거)
 * - crypto 미지원 환경은 Math.random으로 폴백
 */

/** 0 이상 max 미만의 균등 정수 */
export function randomInt(max: number): number {
  if (max <= 1) return 0;
  const g = globalThis.crypto;
  if (g && typeof g.getRandomValues === "function") {
    const range = 0x100000000; // 2^32
    const limit = range - (range % max); // 균등성을 위한 상한
    const buf = new Uint32Array(1);
    let x = 0;
    do {
      g.getRandomValues(buf);
      x = buf[0];
    } while (x >= limit);
    return x % max;
  }
  return Math.floor(Math.random() * max);
}

/** Fisher-Yates 셔플 (원본 불변) */
export function shuffle<T>(arr: readonly T[]): T[] {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** 가중치 배열에서 인덱스 하나를 뽑는다 (가중치 합 기준 균등) */
export function weightedIndex(weights: number[]): number {
  const total = weights.reduce((a, b) => a + Math.max(0, b), 0);
  if (total <= 0) return randomInt(weights.length);
  // 정수 스케일로 변환해 randomInt 사용 (부동소수 누적오차 회피)
  const target = randomInt(Math.round(total * 1000));
  let acc = 0;
  for (let i = 0; i < weights.length; i++) {
    acc += Math.max(0, weights[i]) * 1000;
    if (target < acc) return i;
  }
  return weights.length - 1;
}
