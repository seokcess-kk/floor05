/**
 * 글자수/바이트/원고지 분석 로직 (100% 클라이언트, 순수 함수)
 * - byte 2바이트 기준(한글2/ASCII1)과 UTF-8 3바이트 기준 둘 다 계산
 * - NAVER 기준(줄바꿈=공백) / HWP 기준(줄바꿈 제외) 토글 지원
 */

export type CountMode = "naver" | "hwp";

export interface TextStats {
  chars: number; // 공백 포함
  charsNoSpace: number; // 공백 제외
  bytes2: number; // 2바이트 기준(한글2/ASCII1), 공백 포함
  bytes2NoSpace: number;
  bytes3: number; // UTF-8(한글3바이트), 공백 포함
  bytes3NoSpace: number;
  words: number;
  lines: number;
  sentences: number;
  paragraphs: number;
}

const EMPTY_STATS: TextStats = {
  chars: 0,
  charsNoSpace: 0,
  bytes2: 0,
  bytes2NoSpace: 0,
  bytes3: 0,
  bytes3NoSpace: 0,
  words: 0,
  lines: 0,
  sentences: 0,
  paragraphs: 0,
};

const utf8 = new TextEncoder();

// 2바이트 기준 길이: ASCII는 1, 그 외(한글 등)는 2
function byte2Length(s: string): number {
  let n = 0;
  for (const ch of s) {
    n += (ch.codePointAt(0) ?? 0) < 128 ? 1 : 2;
  }
  return n;
}

export function analyzeText(text: string, mode: CountMode = "naver"): TextStats {
  if (!text) return { ...EMPTY_STATS };

  // 줄바꿈 처리: NAVER=공백 1개로 치환, HWP=제거(글자수 미포함)
  const normalized =
    mode === "naver"
      ? text.replace(/\r\n|\r|\n/g, " ")
      : text.replace(/\r\n|\r|\n/g, "");

  // 공백 제외: 띄어쓰기·탭 제거 (NAVER에서 줄바꿈→공백된 것도 함께 제거됨)
  const noSpace = normalized.replace(/[ \t]/g, "");

  const hasContent = text.trim().length > 0;

  return {
    chars: [...normalized].length,
    charsNoSpace: [...noSpace].length,
    bytes2: byte2Length(normalized),
    bytes2NoSpace: byte2Length(noSpace),
    bytes3: utf8.encode(normalized).length,
    bytes3NoSpace: utf8.encode(noSpace).length,
    words: (text.trim().match(/\S+/g) || []).length,
    lines: text.split(/\r\n|\r|\n/).length,
    sentences:
      (text.match(/[^.!?。…\n]+[.!?。…]+/g) || []).length || (hasContent ? 1 : 0),
    paragraphs:
      text
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean).length || (hasContent ? 1 : 0),
  };
}

export interface ManuscriptInfo {
  /** 원고지 매수 (올림) */
  sheets: number;
  /** 마지막 장의 남은 칸 */
  remainingCells: number;
}

/**
 * 원고지 매수 계산. perSheet = 200(20×10) 또는 400(20×20).
 * 공백 포함 글자수 기준(원고지는 칸 단위라 공백도 한 칸).
 */
export function manuscriptSheets(chars: number, perSheet: number): ManuscriptInfo {
  if (chars <= 0 || perSheet <= 0) return { sheets: 0, remainingCells: 0 };
  const sheets = Math.ceil(chars / perSheet);
  const used = chars % perSheet;
  return { sheets, remainingCells: used === 0 ? 0 : perSheet - used };
}
