/**
 * 이미지 워터마크 로직
 * 텍스트/로고 워터마크를 원본 위에 합성한다. (메인 스레드, Canvas API)
 * - 미리보기와 내보내기가 동일한 draw 경로를 공유해 결과가 일치한다.
 * - 모든 크기 옵션은 이미지 짧은 변 기준 %라 이미지 크기와 무관하게 동일하게 보인다.
 */

import { canvasToBlob } from "../common/fileUtils";

export type WatermarkMode = "text" | "logo";

export type WatermarkPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "middle-left"
  | "center"
  | "middle-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface WatermarkOptions {
  mode?: WatermarkMode;
  // 텍스트
  text?: string;
  fontScale?: number; // 짧은 변 대비 글자 크기 % (기본 6)
  color?: string;
  bold?: boolean;
  // 로고
  logoImg?: HTMLImageElement | null;
  logoScale?: number; // 너비 대비 로고 폭 % (기본 20)
  // 공통
  opacity?: number; // 0~100 (기본 50)
  position?: WatermarkPosition;
  rotation?: number; // 도(°)
  tile?: boolean; // 전체 반복(보호용)
  margin?: number; // 가장자리 여백 % (짧은 변 기준, 기본 4)
  outputFormat?: "image/jpeg" | "image/png" | "image/webp";
  quality?: number; // 0~1
}

export interface WatermarkResult {
  blob: Blob;
  width: number;
  height: number;
}

interface ResolvedOptions {
  mode: WatermarkMode;
  text: string;
  fontScale: number;
  color: string;
  bold: boolean;
  logoImg: HTMLImageElement | null;
  logoScale: number;
  alpha: number;
  position: WatermarkPosition;
  rotation: number;
  tile: boolean;
  margin: number;
  outputFormat: "image/jpeg" | "image/png" | "image/webp";
  quality: number;
}

function resolve(opts: WatermarkOptions): ResolvedOptions {
  return {
    mode: opts.mode ?? "text",
    text: opts.text ?? "",
    fontScale: opts.fontScale ?? 6,
    color: opts.color ?? "#FFFFFF",
    bold: opts.bold ?? true,
    logoImg: opts.logoImg ?? null,
    logoScale: opts.logoScale ?? 20,
    alpha: Math.min(1, Math.max(0, (opts.opacity ?? 50) / 100)),
    position: opts.position ?? "bottom-right",
    rotation: opts.rotation ?? 0,
    tile: opts.tile ?? false,
    margin: opts.margin ?? 4,
    outputFormat: opts.outputFormat ?? "image/png",
    quality: opts.quality ?? 0.92,
  };
}

/** position → canvas 정렬 + 기준점 좌표 */
function anchor(
  pos: WatermarkPosition,
  W: number,
  H: number,
  marginPx: number,
): { x: number; y: number; alignH: CanvasTextAlign; alignV: CanvasTextBaseline } {
  const [v, h] = pos.split("-") as [string, string];
  let x: number;
  let alignH: CanvasTextAlign;
  if (h === "left") {
    x = marginPx;
    alignH = "left";
  } else if (h === "right") {
    x = W - marginPx;
    alignH = "right";
  } else {
    x = W / 2;
    alignH = "center";
  }
  let y: number;
  let alignV: CanvasTextBaseline;
  if (v === "top") {
    y = marginPx;
    alignV = "top";
  } else if (v === "bottom") {
    y = H - marginPx;
    alignV = "bottom";
  } else {
    y = H / 2;
    alignV = "middle";
  }
  return { x, y, alignH, alignV };
}

/**
 * 이미 원본이 그려진 캔버스 컨텍스트 위에 워터마크 오버레이를 그린다.
 * 미리보기/내보내기 공통 경로.
 */
export function drawWatermark(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  opts: WatermarkOptions,
): void {
  const o = resolve(opts);
  const minSide = Math.min(W, H);
  const marginPx = (o.margin / 100) * minSide;
  const rad = (o.rotation * Math.PI) / 180;

  ctx.save();
  ctx.globalAlpha = o.alpha;

  if (o.mode === "text") {
    const text = o.text.trim();
    if (!text) {
      ctx.restore();
      return;
    }
    const fontPx = Math.max(8, (o.fontScale / 100) * minSide);
    ctx.fillStyle = o.color;
    ctx.font = `${o.bold ? "bold " : ""}${fontPx}px sans-serif`;
    ctx.shadowColor = "rgba(0,0,0,0.35)";
    ctx.shadowBlur = Math.max(1, fontPx * 0.06);

    if (o.tile) {
      tileStamps(ctx, W, H, rad, fontPx, (cx, cy) => {
        ctx.fillText(text, cx, cy);
      }, ctx.measureText(text).width + fontPx);
    } else {
      const a = anchor(o.position, W, H, marginPx);
      ctx.textAlign = a.alignH;
      ctx.textBaseline = a.alignV;
      ctx.translate(a.x, a.y);
      ctx.rotate(rad);
      ctx.fillText(text, 0, 0);
    }
  } else {
    const logo = o.logoImg;
    if (!logo || !logo.width) {
      ctx.restore();
      return;
    }
    const logoW = Math.max(8, (o.logoScale / 100) * W);
    const logoH = logoW * (logo.height / logo.width);

    if (o.tile) {
      tileStamps(ctx, W, H, rad, logoH, (cx, cy) => {
        ctx.drawImage(logo, cx - logoW / 2, cy - logoH / 2, logoW, logoH);
      }, logoW * 1.5);
    } else {
      const a = anchor(o.position, W, H, marginPx);
      // 정렬 기준점에서 로고의 좌상단 좌표 계산
      let ox: number;
      if (a.alignH === "left") ox = a.x;
      else if (a.alignH === "right") ox = a.x - logoW;
      else ox = a.x - logoW / 2;
      let oy: number;
      if (a.alignV === "top") oy = a.y;
      else if (a.alignV === "bottom") oy = a.y - logoH;
      else oy = a.y - logoH / 2;
      // 로고 중심 기준 회전
      const cx = ox + logoW / 2;
      const cy = oy + logoH / 2;
      ctx.translate(cx, cy);
      ctx.rotate(rad);
      ctx.drawImage(logo, -logoW / 2, -logoH / 2, logoW, logoH);
    }
  }

  ctx.restore();
}

/** 회전 공간에서 캔버스 전체를 덮도록 워터마크를 반복 배치 */
function tileStamps(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  rad: number,
  unitH: number,
  stamp: (cx: number, cy: number) => void,
  unitW: number,
): void {
  ctx.save();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.translate(W / 2, H / 2);
  ctx.rotate(rad);
  const diag = Math.sqrt(W * W + H * H);
  const stepX = Math.max(unitW * 1.6, unitH * 3);
  const stepY = Math.max(unitH * 2.6, 24);
  for (let y = -diag / 2; y <= diag / 2; y += stepY) {
    for (let x = -diag / 2; x <= diag / 2; x += stepX) {
      stamp(x, y);
    }
  }
  ctx.restore();
}

/** 원본 + 워터마크를 합성한 풀해상도 캔버스를 반환 (미리보기·내보내기 공용) */
export function renderWatermarkedCanvas(
  img: HTMLImageElement,
  opts: WatermarkOptions,
): HTMLCanvasElement {
  const W = img.naturalWidth || img.width;
  const H = img.naturalHeight || img.height;
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, W);
  canvas.height = Math.max(1, H);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 컨텍스트를 생성할 수 없습니다.");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  // JPG는 투명을 지원하지 않으므로, 투명 원본이면 검정 대신 흰 배경으로 채운다.
  // (PNG/WebP는 투명 유지)
  if ((opts.outputFormat ?? "image/png") === "image/jpeg") {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, W, H);
  }
  ctx.drawImage(img, 0, 0, W, H);
  drawWatermark(ctx, W, H, opts);
  return canvas;
}

/** 워터마크를 적용하고 Blob/DataURL로 내보낸다. */
export async function applyWatermark(
  img: HTMLImageElement,
  opts: WatermarkOptions,
): Promise<WatermarkResult> {
  const o = resolve(opts);
  const canvas = renderWatermarkedCanvas(img, opts);
  const blob = await canvasToBlob(
    canvas,
    o.outputFormat,
    o.quality,
    "이미지가 너무 커서 처리할 수 없습니다. 크기를 먼저 줄여보세요.",
  );
  return { blob, width: canvas.width, height: canvas.height };
}
