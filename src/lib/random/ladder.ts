/**
 * 사다리타기 로직 (100% 클라이언트, 순수 함수)
 * - 세로줄 cols개, 가로 단(row) rows개. rungs[row][col] = col과 col+1을 잇는 가로줄
 * - 같은 단에서 인접한 가로줄이 겹치지 않게 생성(경로 모호성 방지)
 */

import { randomInt } from "./core";

export interface Ladder {
  cols: number;
  rows: number;
  /** rungs[row][col], col 범위 0..cols-2 */
  rungs: boolean[][];
}

/**
 * 사다리 생성. rng는 0~max-1 균등 정수 함수(테스트 주입용, 기본 crypto).
 */
export function generateLadder(cols: number, rows: number, rng: (n: number) => number = randomInt): Ladder {
  const c = Math.max(2, Math.min(12, Math.floor(cols)));
  const r = Math.max(c + 1, Math.floor(rows));
  const rungs: boolean[][] = [];

  for (let row = 0; row < r; row++) {
    const line: boolean[] = new Array(c - 1).fill(false);
    for (let col = 0; col < c - 1; col++) {
      // 인접 가로줄이 이미 있으면 건너뜀(겹침 방지), 아니면 ~45% 확률로 배치
      if (col > 0 && line[col - 1]) continue;
      if (rng(100) < 45) line[col] = true;
    }
    rungs.push(line);
  }

  // 각 세로줄이 최소 1개의 가로줄과 닿도록 보강(밋밋한 직선 경로 방지)
  for (let col = 0; col < c; col++) {
    const touched = rungs.some(
      (line) => (col < c - 1 && line[col]) || (col > 0 && line[col - 1]),
    );
    if (!touched) {
      const row = rng(r);
      const target = col < c - 1 ? col : col - 1;
      if (!(target > 0 && rungs[row][target - 1]) && !(target < c - 2 && rungs[row][target + 1])) {
        rungs[row][target] = true;
      }
    }
  }

  return { cols: c, rows: r, rungs };
}

export interface TraceResult {
  /** 도착한 세로줄 인덱스 */
  endCol: number;
  /** 각 단 경계에서 토큰이 위치한 세로줄. seq[0]=출발, seq[rows]=도착 */
  seq: number[];
}

/** startCol에서 출발해 사다리를 따라 내려간 경로 */
export function traceLadder(ladder: Ladder, startCol: number): TraceResult {
  let col = Math.max(0, Math.min(ladder.cols - 1, startCol));
  const seq: number[] = [col];
  for (let row = 0; row < ladder.rows; row++) {
    const line = ladder.rungs[row];
    if (col > 0 && line[col - 1]) col -= 1;
    else if (col < ladder.cols - 1 && line[col]) col += 1;
    seq.push(col);
  }
  return { endCol: col, seq };
}

/** 모든 출발지의 도착지를 반환 (전체 결과) */
export function traceAll(ladder: Ladder): number[] {
  return Array.from({ length: ladder.cols }, (_, i) => traceLadder(ladder, i).endCol);
}
