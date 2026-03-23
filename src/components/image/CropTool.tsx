"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import FileDropzone from "@/components/common/FileDropzone";
import BeforeAfter from "@/components/common/BeforeAfter";
import DownloadButton from "@/components/common/DownloadButton";
import {
  formatFileSize,
  createNewFileName,
  fileToDataUrl,
  loadImage,
} from "@/lib/common/fileUtils";
import {
  cropImage,
  getTransformedPreview,
  calculateMaxCropArea,
  getRotatedDimensions,
  ASPECT_RATIO_PRESETS,
  CropArea,
  CropResult,
} from "@/lib/image/crop";

interface ImageData {
  file: File;
  originalDataUrl: string;
  transformedDataUrl: string;
  originalWidth: number;
  originalHeight: number;
}

export default function CropTool() {
  // 상태
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [cropArea, setCropArea] = useState<CropArea>({ x: 0, y: 0, width: 0, height: 0 });
  const [rotation, setRotation] = useState(0);
  const [flipHorizontal, setFlipHorizontal] = useState(false);
  const [flipVertical, setFlipVertical] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const [selectedPresetId, setSelectedPresetId] = useState("free");
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<CropResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragType, setDragType] = useState<"move" | "resize" | null>(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const [displayScale, setDisplayScale] = useState(1);

  // 현재 이미지 크기 (회전 적용)
  const currentDimensions = useMemo(() => {
    if (!imageData) return { width: 0, height: 0 };
    return getRotatedDimensions(
      imageData.originalWidth,
      imageData.originalHeight,
      rotation
    );
  }, [imageData, rotation]);

  // 회전/반전 변경 시 미리보기 업데이트
  useEffect(() => {
    if (!imageData) return;

    getTransformedPreview(
      imageData.originalDataUrl,
      rotation,
      flipHorizontal,
      flipVertical
    ).then((dataUrl) => {
      setImageData((prev) =>
        prev ? { ...prev, transformedDataUrl: dataUrl } : null
      );
    });
  }, [imageData?.originalDataUrl, rotation, flipHorizontal, flipVertical]);

  // 비율 변경 시 크롭 영역 재계산
  useEffect(() => {
    if (!imageData) return;

    const newArea = calculateMaxCropArea(
      currentDimensions.width,
      currentDimensions.height,
      aspectRatio
    );
    setCropArea(newArea);
  }, [imageData, currentDimensions, aspectRatio]);

  // 디스플레이 스케일 계산
  useEffect(() => {
    if (!containerRef.current || !imageData) return;

    const updateScale = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      const scale = containerWidth / currentDimensions.width;
      setDisplayScale(Math.min(scale, 1));
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [imageData, currentDimensions]);

  // 파일 추가
  const handleFilesAdd = useCallback(async (files: File[]) => {
    const file = files[0];
    if (!file) return;

    const dataUrl = await fileToDataUrl(file);
    const img = await loadImage(dataUrl);

    setImageData({
      file,
      originalDataUrl: dataUrl,
      transformedDataUrl: dataUrl,
      originalWidth: img.width,
      originalHeight: img.height,
    });

    // 초기 크롭 영역 설정
    const initialArea = calculateMaxCropArea(img.width, img.height, null);
    setCropArea(initialArea);

    // 상태 초기화
    setRotation(0);
    setFlipHorizontal(false);
    setFlipVertical(false);
    setAspectRatio(null);
    setSelectedPresetId("free");
    setResult(null);
  }, []);

  // 프리셋 선택
  const handlePresetSelect = useCallback((presetId: string) => {
    setSelectedPresetId(presetId);
    const preset = ASPECT_RATIO_PRESETS.find((p) => p.id === presetId);
    setAspectRatio(preset?.ratio ?? null);
  }, []);

  // 회전
  const handleRotate = useCallback((direction: "cw" | "ccw") => {
    setRotation((prev) => {
      const delta = direction === "cw" ? 90 : -90;
      return (prev + delta + 360) % 360;
    });
  }, []);

  // 드래그 시작 (크롭 영역)
  const handleMouseDown = useCallback(
    (e: React.MouseEvent, type: "move" | "resize") => {
      e.preventDefault();
      setIsDragging(true);
      setDragType(type);
      setDragStart({ x: e.clientX, y: e.clientY });
    },
    []
  );

  // 드래그 중 (RAF로 성능 최적화)
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !dragType) return;

      const clientX = e.clientX;
      const clientY = e.clientY;

      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const dx = (clientX - dragStart.x) / displayScale;
        const dy = (clientY - dragStart.y) / displayScale;

        setCropArea((prev) => {
          const newArea = { ...prev };

          if (dragType === "move") {
            newArea.x = Math.max(
              0,
              Math.min(currentDimensions.width - prev.width, prev.x + dx)
            );
            newArea.y = Math.max(
              0,
              Math.min(currentDimensions.height - prev.height, prev.y + dy)
            );
          } else if (dragType === "resize") {
            let newWidth = prev.width + dx;
            let newHeight = prev.height + dy;

            if (aspectRatio !== null) {
              newHeight = newWidth / aspectRatio;
            }

            newWidth = Math.max(50, newWidth);
            newHeight = Math.max(50, newHeight);

            newWidth = Math.min(newWidth, currentDimensions.width - prev.x);
            newHeight = Math.min(newHeight, currentDimensions.height - prev.y);

            if (aspectRatio !== null) {
              if (newWidth / aspectRatio > currentDimensions.height - prev.y) {
                newHeight = currentDimensions.height - prev.y;
                newWidth = newHeight * aspectRatio;
              }
            }

            newArea.width = newWidth;
            newArea.height = newHeight;
          }

          return newArea;
        });

        setDragStart({ x: clientX, y: clientY });
      });
    },
    [isDragging, dragType, dragStart, displayScale, currentDimensions, aspectRatio]
  );

  // 드래그 종료
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setDragType(null);
  }, []);

  // 키보드로 크롭 영역 이동/리사이즈
  const handleCropKeyDown = useCallback(
    (e: React.KeyboardEvent, type: "move" | "resize") => {
      const step = e.shiftKey ? 10 : 1;
      let dx = 0;
      let dy = 0;

      switch (e.key) {
        case "ArrowLeft": dx = -step; break;
        case "ArrowRight": dx = step; break;
        case "ArrowUp": dy = -step; break;
        case "ArrowDown": dy = step; break;
        default: return;
      }

      e.preventDefault();

      setCropArea((prev) => {
        const newArea = { ...prev };

        if (type === "move") {
          newArea.x = Math.max(0, Math.min(currentDimensions.width - prev.width, prev.x + dx));
          newArea.y = Math.max(0, Math.min(currentDimensions.height - prev.height, prev.y + dy));
        } else {
          let newWidth = Math.max(50, prev.width + dx);
          let newHeight = Math.max(50, prev.height + dy);

          if (aspectRatio !== null) {
            newHeight = newWidth / aspectRatio;
          }

          newWidth = Math.min(newWidth, currentDimensions.width - prev.x);
          newHeight = Math.min(newHeight, currentDimensions.height - prev.y);

          if (aspectRatio !== null && newWidth / aspectRatio > currentDimensions.height - prev.y) {
            newHeight = currentDimensions.height - prev.y;
            newWidth = newHeight * aspectRatio;
          }

          newArea.width = newWidth;
          newArea.height = newHeight;
        }

        return newArea;
      });
    },
    [currentDimensions, aspectRatio]
  );

  // 크롭 실행
  const handleCrop = useCallback(async () => {
    if (!imageData || isProcessing) return;

    setIsProcessing(true);
    setError(null);

    try {
      const cropResult = await cropImage(imageData.file, {
        area: cropArea,
        rotation,
        flipHorizontal,
        flipVertical,
      });

      setResult(cropResult);
    } catch (err) {
      const message = err instanceof Error ? err.message : "이미지 크롭에 실패했습니다. 다시 시도해주세요.";
      setError(message);
    } finally {
      setIsProcessing(false);
    }
  }, [imageData, cropArea, rotation, flipHorizontal, flipVertical, isProcessing]);

  // 초기화
  const handleReset = useCallback(() => {
    setImageData(null);
    setCropArea({ x: 0, y: 0, width: 0, height: 0 });
    setRotation(0);
    setFlipHorizontal(false);
    setFlipVertical(false);
    setAspectRatio(null);
    setSelectedPresetId("free");
    setResult(null);
    setError(null);
  }, []);

  return (
    <div className="space-y-8">
      {/* 파일 업로드 영역 */}
      {!imageData ? (
        <FileDropzone
          onFilesSelected={handleFilesAdd}
          accept="image/jpeg,image/png,image/webp"
          multiple={false}
          maxFiles={1}
          maxSize={50 * 1024 * 1024}
        />
      ) : (
        <>
          {/* 크롭 에디터 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-xs text-brand-accent uppercase tracking-wider">
                크롭 영역 선택
              </h3>
              <button
                onClick={handleReset}
                className="text-sm text-brand-mid hover:text-brand-accent transition-colors"
              >
                다른 이미지 선택
              </button>
            </div>

            {/* 크롭 캔버스 */}
            <div
              ref={containerRef}
              className="relative bg-brand-black rounded-lg overflow-hidden"
              style={{
                height: currentDimensions.height * displayScale + 2,
              }}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {/* 이미지 */}
              <img
                src={imageData.transformedDataUrl}
                alt="크롭할 이미지 미리보기"
                className="absolute top-0 left-0"
                style={{
                  width: currentDimensions.width * displayScale,
                  height: currentDimensions.height * displayScale,
                }}
                draggable={false}
              />

              {/* 어두운 오버레이 */}
              <div
                className="absolute inset-0 bg-black/50 pointer-events-none"
                style={{
                  clipPath: `polygon(
                    0 0,
                    100% 0,
                    100% 100%,
                    0 100%,
                    0 0,
                    ${cropArea.x * displayScale}px ${cropArea.y * displayScale}px,
                    ${cropArea.x * displayScale}px ${(cropArea.y + cropArea.height) * displayScale}px,
                    ${(cropArea.x + cropArea.width) * displayScale}px ${(cropArea.y + cropArea.height) * displayScale}px,
                    ${(cropArea.x + cropArea.width) * displayScale}px ${cropArea.y * displayScale}px,
                    ${cropArea.x * displayScale}px ${cropArea.y * displayScale}px
                  )`,
                }}
              />

              {/* 크롭 영역 */}
              <div
                role="application"
                aria-label="크롭 영역 - 방향키로 이동, Shift+방향키로 빠르게 이동"
                tabIndex={0}
                className="absolute border-2 border-white cursor-move focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2"
                style={{
                  left: cropArea.x * displayScale,
                  top: cropArea.y * displayScale,
                  width: cropArea.width * displayScale,
                  height: cropArea.height * displayScale,
                }}
                onMouseDown={(e) => handleMouseDown(e, "move")}
                onKeyDown={(e) => handleCropKeyDown(e, "move")}
              >
                {/* 리사이즈 핸들 */}
                <div
                  role="slider"
                  aria-label="크롭 크기 조절 - 방향키로 조절, Shift+방향키로 빠르게 조절"
                  aria-valuemin={50}
                  aria-valuenow={Math.round(cropArea.width)}
                  tabIndex={0}
                  className="absolute -right-3 -bottom-3 w-6 h-6 bg-white rounded-full cursor-se-resize focus:outline-none focus:ring-2 focus:ring-brand-accent"
                  style={{ touchAction: "none", minWidth: 44, minHeight: 44, padding: 10, margin: -10, boxSizing: "content-box" }}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    handleMouseDown(e, "resize");
                  }}
                  onKeyDown={(e) => {
                    e.stopPropagation();
                    handleCropKeyDown(e, "resize");
                  }}
                />

                {/* 크기 표시 */}
                <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/70 rounded text-xs text-white font-mono">
                  {Math.round(cropArea.width)} × {Math.round(cropArea.height)}
                </div>

                {/* 모바일 터치 안내 */}
                <div className="absolute top-2 left-2 px-2 py-1 bg-black/70 rounded text-[10px] text-white/70 sm:hidden">
                  드래그하여 이동
                </div>
              </div>
            </div>
          </div>

          {/* 옵션 */}
          <div className="bg-brand-paper rounded-xl p-6 space-y-6">
            {/* 비율 프리셋 */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-brand-black">
                비율
              </label>
              <div className="flex flex-wrap gap-2">
                {ASPECT_RATIO_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handlePresetSelect(preset.id)}
                    className={`
                      px-4 py-2.5 rounded-lg text-sm transition-all min-h-[44px]
                      ${
                        selectedPresetId === preset.id
                          ? "bg-brand-accent text-white"
                          : "bg-brand-white text-brand-mid hover:text-brand-black border border-brand-light"
                      }
                    `}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 회전/반전 */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-brand-black">
                회전 / 반전
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => handleRotate("ccw")}
                  aria-label="왼쪽으로 90도 회전"
                  className="flex-1 py-3 px-4 rounded-lg bg-brand-white border border-brand-light text-brand-mid hover:text-brand-black hover:border-brand-accent transition-all"
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h10a4 4 0 014 4v4m0-8l-4-4m4 4l-4 4"
                        transform="scale(-1, 1) translate(-24, 0)"
                      />
                    </svg>
                    왼쪽 90°
                  </span>
                </button>
                <button
                  onClick={() => handleRotate("cw")}
                  aria-label="오른쪽으로 90도 회전"
                  className="flex-1 py-3 px-4 rounded-lg bg-brand-white border border-brand-light text-brand-mid hover:text-brand-black hover:border-brand-accent transition-all"
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h10a4 4 0 014 4v4m0-8l-4-4m4 4l-4 4"
                      />
                    </svg>
                    오른쪽 90°
                  </span>
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setFlipHorizontal(!flipHorizontal)}
                  aria-label="좌우 반전"
                  aria-pressed={flipHorizontal}
                  className={`
                    flex-1 py-3 px-4 rounded-lg transition-all
                    ${
                      flipHorizontal
                        ? "bg-brand-accent text-white"
                        : "bg-brand-white border border-brand-light text-brand-mid hover:text-brand-black hover:border-brand-accent"
                    }
                  `}
                >
                  좌우 반전
                </button>
                <button
                  onClick={() => setFlipVertical(!flipVertical)}
                  aria-label="상하 반전"
                  aria-pressed={flipVertical}
                  className={`
                    flex-1 py-3 px-4 rounded-lg transition-all
                    ${
                      flipVertical
                        ? "bg-brand-accent text-white"
                        : "bg-brand-white border border-brand-light text-brand-mid hover:text-brand-black hover:border-brand-accent"
                    }
                  `}
                >
                  상하 반전
                </button>
              </div>
            </div>

            {/* 크롭 버튼 */}
            <button
              onClick={handleCrop}
              disabled={isProcessing}
              className={`
                w-full py-4 rounded-lg font-medium text-lg transition-all
                ${
                  isProcessing
                    ? "bg-brand-light text-brand-mid cursor-not-allowed"
                    : "bg-brand-accent text-white hover:bg-brand-accent-light"
                }
              `}
            >
              {isProcessing ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  처리 중...
                </span>
              ) : (
                "이미지 크롭"
              )}
            </button>

            {/* 에러 메시지 */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
          </div>

          {/* Before/After 비교 */}
          {result && (
            <div className="space-y-4">
              <h3 className="font-mono text-xs text-brand-accent uppercase tracking-wider">
                Before / After 비교
              </h3>

              <BeforeAfter
                beforeSrc={imageData.originalDataUrl}
                afterSrc={result.dataUrl}
                beforeSize={`${imageData.originalWidth}×${imageData.originalHeight}`}
                afterSize={`${result.width}×${result.height}`}
              />
            </div>
          )}

          {/* 다운로드 */}
          {result && (
            <div className="bg-brand-black rounded-xl p-6">
              <div className="text-center mb-6">
                <p className="text-brand-paper text-lg">
                  크롭 완료 · {result.width} × {result.height}
                </p>
                <p className="text-brand-light text-sm mt-1">
                  {formatFileSize(result.blob.size)}
                </p>
              </div>

              <div className="flex justify-center">
                <DownloadButton
                  fileName={createNewFileName(imageData.file.name, "_cropped", "jpg")}
                  fileBlob={result.blob}
                  variant="primary"
                  size="lg"
                  label="다운로드"
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
