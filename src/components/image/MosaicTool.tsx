"use client";

import { useState, useRef, useCallback } from "react";
import { saveAs } from "file-saver";
import FileDropzone from "@/components/common/FileDropzone";
import { canvasToBlob, getFileNameWithoutExtension } from "@/lib/common/fileUtils";
import { trackToolUse, trackDownload } from "@/lib/common/analytics";

const MAX_DIM = 2000;
type Mode = "mosaic" | "blur";

interface Sel {
  x: number;
  y: number;
  w: number;
  h: number;
}

export default function MosaicTool() {
  const [loaded, setLoaded] = useState(false);
  const [name, setName] = useState("image");
  const [isJpeg, setIsJpeg] = useState(true);
  const [mode, setMode] = useState<Mode>("mosaic");
  const [strength, setStrength] = useState(12);
  const [sel, setSel] = useState<Sel | null>(null);
  const [applied, setApplied] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bitmapRef = useRef<ImageBitmap | null>(null);
  const dragStart = useRef<{ x: number; y: number } | null>(null);
  const usedRef = useRef(false);

  const drawBase = useCallback(() => {
    const canvas = canvasRef.current;
    const bmp = bitmapRef.current;
    if (!canvas || !bmp) return;
    const scale = Math.min(1, MAX_DIM / Math.max(bmp.width, bmp.height));
    canvas.width = Math.round(bmp.width * scale);
    canvas.height = Math.round(bmp.height * scale);
    const ctx = canvas.getContext("2d");
    ctx?.drawImage(bmp, 0, 0, canvas.width, canvas.height);
  }, []);

  const onSelect = useCallback(
    async (files: File[]) => {
      const f = files[0];
      if (!f) return;
      setError(null);
      try {
        const bmp = await createImageBitmap(f, { imageOrientation: "from-image" });
        bitmapRef.current = bmp;
        setName(getFileNameWithoutExtension(f.name));
        setIsJpeg(f.type !== "image/png");
        setApplied(0);
        setLoaded(true);
        requestAnimationFrame(drawBase);
      } catch {
        setError("이미지를 불러오지 못했습니다. JPG·PNG·WebP 파일인지 확인해 주세요.");
      }
    },
    [drawBase],
  );

  // 화면 좌표 → 캔버스 픽셀 좌표
  function toCanvas(clientX: number, clientY: number) {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const sx = canvas.width / rect.width;
    const sy = canvas.height / rect.height;
    return { x: (clientX - rect.left) * sx, y: (clientY - rect.top) * sy, rect };
  }

  function onPointerDown(e: React.PointerEvent) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.setPointerCapture(e.pointerId);
    const p = toCanvas(e.clientX, e.clientY);
    dragStart.current = { x: p.x, y: p.y };
    setSel({ x: e.clientX - p.rect.left, y: e.clientY - p.rect.top, w: 0, h: 0 });
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragStart.current) return;
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const x0 = (dragStart.current.x * rect.width) / canvas.width;
    const y0 = (dragStart.current.y * rect.height) / canvas.height;
    const x1 = e.clientX - rect.left;
    const y1 = e.clientY - rect.top;
    setSel({ x: Math.min(x0, x1), y: Math.min(y0, y1), w: Math.abs(x1 - x0), h: Math.abs(y1 - y0) });
  }

  function onPointerUp(e: React.PointerEvent) {
    const start = dragStart.current;
    dragStart.current = null;
    setSel(null);
    if (!start) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const p = toCanvas(e.clientX, e.clientY);
    const x = Math.max(0, Math.min(start.x, p.x));
    const y = Math.max(0, Math.min(start.y, p.y));
    const w = Math.min(canvas.width - x, Math.abs(p.x - start.x));
    const h = Math.min(canvas.height - y, Math.abs(p.y - start.y));
    if (w < 4 || h < 4) return; // 너무 작은 영역 무시
    applyRegion(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
    setApplied((n) => n + 1);
    if (!usedRef.current) {
      usedRef.current = true;
      trackToolUse("mosaic");
    }
  }

  function applyRegion(x: number, y: number, w: number, h: number) {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const bs = Math.max(2, strength);
    const tw = Math.max(1, Math.round(w / bs));
    const th = Math.max(1, Math.round(h / bs));
    const tmp = document.createElement("canvas");
    tmp.width = tw;
    tmp.height = th;
    const tctx = tmp.getContext("2d");
    if (!tctx) return;
    // 영역을 작게 축소
    tctx.imageSmoothingEnabled = mode === "blur";
    tctx.drawImage(canvas, x, y, w, h, 0, 0, tw, th);
    // 다시 확대해 덮어쓰기 (모자이크=계단식, 블러=부드럽게)
    ctx.imageSmoothingEnabled = mode === "blur";
    ctx.drawImage(tmp, 0, 0, tw, th, x, y, w, h);
    ctx.imageSmoothingEnabled = true;
  }

  async function download() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const type = isJpeg ? "image/jpeg" : "image/png";
    const blob = await canvasToBlob(canvas, type, isJpeg ? 0.92 : undefined);
    saveAs(blob, `${name}_모자이크.${isJpeg ? "jpg" : "png"}`);
    trackDownload("mosaic", "single");
  }

  return (
    <div className="space-y-6">
      {!loaded ? (
        <FileDropzone onFilesSelected={onSelect} accept="image/jpeg,image/png,image/webp" multiple={false} maxFiles={1} />
      ) : (
        <>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex gap-2">
              <Seg active={mode === "mosaic"} onClick={() => setMode("mosaic")}>모자이크</Seg>
              <Seg active={mode === "blur"} onClick={() => setMode("blur")}>블러</Seg>
            </div>
            <div className="flex flex-1 items-center gap-3">
              <span className="text-sm font-medium text-brand-black">강도</span>
              <input
                type="range"
                min={4}
                max={40}
                value={strength}
                onChange={(e) => setStrength(Number(e.target.value))}
                className="flex-1 accent-brand-accent"
              />
              <span className="w-8 text-right font-mono text-sm text-brand-mid">{strength}</span>
            </div>
          </div>

          <div className="relative rounded-xl bg-brand-paper p-3">
            <canvas
              ref={canvasRef}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              className="mx-auto block max-h-[60vh] w-auto max-w-full cursor-crosshair touch-none rounded"
            />
            {sel && sel.w > 0 && (
              <div
                className="pointer-events-none absolute border-2 border-brand-accent bg-brand-accent/20"
                style={{ left: sel.x + 12, top: sel.y + 12, width: sel.w, height: sel.h }}
              />
            )}
          </div>

          <p className="text-center text-sm text-brand-mid">
            가릴 부분을 드래그하세요. {applied > 0 && `(${applied}곳 적용됨)`}
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => { drawBase(); setApplied(0); }}
              className="rounded-xl bg-brand-paper px-4 py-3 text-sm font-medium text-brand-mid transition-colors hover:text-brand-black"
            >
              초기화
            </button>
            <button
              onClick={download}
              disabled={applied === 0}
              className="flex-1 rounded-xl bg-brand-accent py-3 text-lg font-medium text-white transition-colors hover:bg-brand-accent-light disabled:opacity-50"
            >
              다운로드
            </button>
          </div>
        </>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}

      <p className="text-xs text-brand-mid leading-relaxed">
        얼굴·차량 번호판·주소 같은 개인정보를 가릴 때 쓰세요. 가린 부분은 원본 정보가 사라져 복원할
        수 없습니다. 모든 처리는 브라우저에서 이루어지며, 파일이 서버로 전송되지 않습니다.
      </p>
    </div>
  );
}

function Seg({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
        active ? "bg-brand-accent text-white" : "bg-brand-paper text-brand-mid hover:text-brand-black"
      }`}
    >
      {children}
    </button>
  );
}
