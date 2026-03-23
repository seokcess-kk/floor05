"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import FileDropzone from "@/components/common/FileDropzone";
import BeforeAfter from "@/components/common/BeforeAfter";
import DownloadButton from "@/components/common/DownloadButton";
import {
  formatFileSize,
  createNewFileName,
  getMaxBatchSize,
  fileToDataUrl,
  loadImage,
} from "@/lib/common/fileUtils";
import {
  resizeImage,
  resizeByPercentage,
  SNS_PRESETS,
  getPresetsByPlatform,
  ResizeResult,
} from "@/lib/image/resize";

interface ProcessedImage {
  id: string;
  file: File;
  originalDataUrl: string;
  originalWidth: number;
  originalHeight: number;
  result: ResizeResult | null;
  status: "pending" | "processing" | "done" | "error";
  error?: string;
}

type ResizeMode = "custom" | "percentage" | "preset";

export default function ResizeTool() {
  // 상태
  const [images, setImages] = useState<ProcessedImage[]>([]);
  const [mode, setMode] = useState<ResizeMode>("custom");
  const [customWidth, setCustomWidth] = useState(800);
  const [customHeight, setCustomHeight] = useState(600);
  const [lockAspectRatio, setLockAspectRatio] = useState(true);
  const [percentage, setPercentage] = useState(50);
  const [selectedPresetId, setSelectedPresetId] = useState("instagram-square");
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  // 원본 비율 저장
  const [originalAspectRatio, setOriginalAspectRatio] = useState(4 / 3);

  // 선택된 이미지
  const selectedImage = useMemo(
    () => images.find((img) => img.id === selectedImageId),
    [images, selectedImageId]
  );

  // 완료된 이미지들
  const completedImages = useMemo(
    () => images.filter((img) => img.status === "done" && img.result),
    [images]
  );

  // 플랫폼별 프리셋
  const presetsByPlatform = useMemo(() => getPresetsByPlatform(), []);

  // 선택된 프리셋
  const selectedPreset = useMemo(
    () => SNS_PRESETS.find((p) => p.id === selectedPresetId),
    [selectedPresetId]
  );

  // 비율 잠금 시 크기 조절
  useEffect(() => {
    if (lockAspectRatio && selectedImage) {
      setOriginalAspectRatio(
        selectedImage.originalWidth / selectedImage.originalHeight
      );
    }
  }, [lockAspectRatio, selectedImage]);

  const handleWidthChange = useCallback(
    (newWidth: number) => {
      setCustomWidth(newWidth);
      if (lockAspectRatio) {
        setCustomHeight(Math.round(newWidth / originalAspectRatio));
      }
    },
    [lockAspectRatio, originalAspectRatio]
  );

  const handleHeightChange = useCallback(
    (newHeight: number) => {
      setCustomHeight(newHeight);
      if (lockAspectRatio) {
        setCustomWidth(Math.round(newHeight * originalAspectRatio));
      }
    },
    [lockAspectRatio, originalAspectRatio]
  );

  // 파일 추가
  const handleFilesAdd = useCallback(async (files: File[]) => {
    const maxBatch = getMaxBatchSize();
    const filesToAdd = files.slice(0, maxBatch);

    const newImages: ProcessedImage[] = await Promise.all(
      filesToAdd.map(async (file) => {
        const dataUrl = await fileToDataUrl(file);
        const img = await loadImage(dataUrl);
        return {
          id: `${file.name}-${Date.now()}-${Math.random()}`,
          file,
          originalDataUrl: dataUrl,
          originalWidth: img.width,
          originalHeight: img.height,
          result: null,
          status: "pending" as const,
        };
      })
    );

    setImages((prev) => {
      const combined = [...prev, ...newImages];
      return combined.slice(0, maxBatch);
    });

    // 첫 번째 이미지 선택 및 크기 설정
    if (newImages.length > 0) {
      setSelectedImageId(newImages[0].id);
      setCustomWidth(newImages[0].originalWidth);
      setCustomHeight(newImages[0].originalHeight);
      setOriginalAspectRatio(
        newImages[0].originalWidth / newImages[0].originalHeight
      );
    }
  }, []);

  // 이미지 제거
  const handleRemoveImage = useCallback(
    (id: string) => {
      setImages((prev) => prev.filter((img) => img.id !== id));
      if (selectedImageId === id) {
        setSelectedImageId(null);
      }
    },
    [selectedImageId]
  );

  // 모든 이미지 제거
  const handleClearAll = useCallback(() => {
    setImages([]);
    setSelectedImageId(null);
  }, []);

  // 리사이즈 실행
  const handleResize = useCallback(async () => {
    if (images.length === 0 || isProcessing) return;

    setIsProcessing(true);

    // 모든 이미지 처리 상태로 변경
    setImages((prev) =>
      prev.map((img) => ({ ...img, status: "processing" as const }))
    );

    for (let i = 0; i < images.length; i++) {
      const img = images[i];

      try {
        let result: ResizeResult;

        if (mode === "percentage") {
          result = await resizeByPercentage(img.file, percentage);
        } else if (mode === "preset" && selectedPreset) {
          result = await resizeImage(img.file, {
            width: selectedPreset.width,
            height: selectedPreset.height || 0,
            maintainAspectRatio: selectedPreset.height === 0,
          });
        } else {
          result = await resizeImage(img.file, {
            width: customWidth,
            height: customHeight,
            maintainAspectRatio: lockAspectRatio,
          });
        }

        setImages((prev) =>
          prev.map((item) =>
            item.id === img.id
              ? { ...item, result, status: "done" as const }
              : item
          )
        );
      } catch (error) {
        setImages((prev) =>
          prev.map((item) =>
            item.id === img.id
              ? {
                  ...item,
                  status: "error" as const,
                  error:
                    error instanceof Error
                      ? error.message
                      : "리사이즈에 실패했습니다.",
                }
              : item
          )
        );
      }
    }

    setIsProcessing(false);
  }, [
    images,
    mode,
    percentage,
    selectedPreset,
    customWidth,
    customHeight,
    lockAspectRatio,
    isProcessing,
  ]);

  // 다운로드용 파일 목록
  const downloadFiles = useMemo(() => {
    return completedImages
      .filter((img) => img.result)
      .map((img) => ({
        name: createNewFileName(img.file.name, "_resized", "jpg"),
        blob: img.result!.blob,
      }));
  }, [completedImages]);

  return (
    <div className="space-y-8">
      {/* 파일 업로드 영역 */}
      {images.length === 0 ? (
        <FileDropzone
          onFilesSelected={handleFilesAdd}
          accept="image/jpeg,image/png,image/webp"
          multiple
          maxFiles={getMaxBatchSize()}
          maxSize={50 * 1024 * 1024}
        />
      ) : (
        <>
          {/* 이미지 목록 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-xs text-brand-accent uppercase tracking-wider">
                이미지 목록 ({images.length}개)
              </h3>
              <button
                onClick={handleClearAll}
                className="text-sm text-brand-mid hover:text-brand-accent transition-colors"
              >
                전체 삭제
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
              {images.map((img) => (
                <div
                  key={img.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`${img.file.name} 선택`}
                  aria-pressed={selectedImageId === img.id}
                  onClick={() => {
                    setSelectedImageId(img.id);
                    if (mode === "custom") {
                      setCustomWidth(img.originalWidth);
                      setCustomHeight(img.originalHeight);
                      setOriginalAspectRatio(
                        img.originalWidth / img.originalHeight
                      );
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedImageId(img.id);
                      if (mode === "custom") {
                        setCustomWidth(img.originalWidth);
                        setCustomHeight(img.originalHeight);
                        setOriginalAspectRatio(
                          img.originalWidth / img.originalHeight
                        );
                      }
                    }
                  }}
                  className={`
                    relative aspect-square rounded-lg overflow-hidden cursor-pointer
                    border-2 transition-all focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2
                    ${
                      selectedImageId === img.id
                        ? "border-brand-accent"
                        : "border-transparent hover:border-brand-light"
                    }
                  `}
                >
                  <img
                    src={img.result?.dataUrl || img.originalDataUrl}
                    alt={img.file.name}
                    className="w-full h-full object-cover"
                  />

                  {/* 상태 오버레이 */}
                  {img.status === "processing" && (
                    <div className="absolute inset-0 bg-brand-black/60 flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}

                  {img.status === "done" && img.result && (
                    <div className="absolute bottom-0 left-0 right-0 bg-brand-black/70 px-2 py-1">
                      <p className="text-xs text-brand-paper font-mono truncate">
                        {img.result.width}×{img.result.height}
                      </p>
                    </div>
                  )}

                  {/* 삭제 버튼 */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveImage(img.id);
                    }}
                    aria-label={`${img.file.name} 삭제`}
                    className="absolute top-1 right-1 w-6 h-6 bg-brand-black/70 rounded-full flex items-center justify-center text-brand-paper hover:bg-red-500 transition-colors"
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}

              {/* 추가 버튼 */}
              {images.length < getMaxBatchSize() && (
                <label className="aspect-square rounded-lg border-2 border-dashed border-brand-light hover:border-brand-accent cursor-pointer flex items-center justify-center transition-colors">
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      handleFilesAdd(files);
                      e.target.value = "";
                    }}
                  />
                  <svg
                    className="w-8 h-8 text-brand-light"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </label>
              )}
            </div>
          </div>

          {/* 원본 크기 표시 */}
          {selectedImage && (
            <div className="bg-brand-paper rounded-lg p-4 text-center">
              <p className="text-sm text-brand-mid">
                원본 크기:{" "}
                <span className="font-mono text-brand-black">
                  {selectedImage.originalWidth} × {selectedImage.originalHeight}
                </span>
                <span className="text-brand-light ml-2">
                  ({formatFileSize(selectedImage.file.size)})
                </span>
              </p>
            </div>
          )}

          {/* 리사이즈 옵션 */}
          <div className="bg-brand-paper rounded-xl p-6 space-y-6">
            {/* 모드 선택 */}
            <div className="flex gap-2">
              <button
                onClick={() => setMode("custom")}
                className={`
                  flex-1 py-3 px-4 rounded-lg font-medium transition-all text-sm
                  ${
                    mode === "custom"
                      ? "bg-brand-accent text-white"
                      : "bg-brand-white text-brand-mid hover:text-brand-black"
                  }
                `}
              >
                직접 입력
              </button>
              <button
                onClick={() => setMode("percentage")}
                className={`
                  flex-1 py-3 px-4 rounded-lg font-medium transition-all text-sm
                  ${
                    mode === "percentage"
                      ? "bg-brand-accent text-white"
                      : "bg-brand-white text-brand-mid hover:text-brand-black"
                  }
                `}
              >
                비율 (%)
              </button>
              <button
                onClick={() => setMode("preset")}
                className={`
                  flex-1 py-3 px-4 rounded-lg font-medium transition-all text-sm
                  ${
                    mode === "preset"
                      ? "bg-brand-accent text-white"
                      : "bg-brand-white text-brand-mid hover:text-brand-black"
                  }
                `}
              >
                SNS 프리셋
              </button>
            </div>

            {/* 직접 입력 */}
            {mode === "custom" && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label htmlFor="resize-width" className="text-sm text-brand-mid mb-1 block">
                      너비 (px)
                    </label>
                    <input
                      id="resize-width"
                      type="number"
                      value={customWidth}
                      onChange={(e) =>
                        handleWidthChange(Math.max(1, Number(e.target.value)))
                      }
                      className="w-full px-4 py-3 rounded-lg border border-brand-light font-mono focus:outline-none focus:border-brand-accent"
                    />
                  </div>

                  {/* 비율 잠금 버튼 */}
                  <button
                    onClick={() => setLockAspectRatio(!lockAspectRatio)}
                    className={`
                      mt-6 p-3 rounded-lg transition-all
                      ${
                        lockAspectRatio
                          ? "bg-brand-accent text-white"
                          : "bg-brand-white text-brand-mid border border-brand-light"
                      }
                    `}
                    aria-label={lockAspectRatio ? "비율 잠금 해제" : "비율 잠금"}
                    aria-pressed={lockAspectRatio}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      {lockAspectRatio ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      ) : (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                        />
                      )}
                    </svg>
                  </button>

                  <div className="flex-1">
                    <label htmlFor="resize-height" className="text-sm text-brand-mid mb-1 block">
                      높이 (px)
                    </label>
                    <input
                      id="resize-height"
                      type="number"
                      value={customHeight}
                      onChange={(e) =>
                        handleHeightChange(Math.max(1, Number(e.target.value)))
                      }
                      className="w-full px-4 py-3 rounded-lg border border-brand-light font-mono focus:outline-none focus:border-brand-accent"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 비율 조절 */}
            {mode === "percentage" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-brand-black">
                    크기 비율
                  </label>
                  <span className="font-mono text-sm text-brand-accent">
                    {percentage}%
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="200"
                  value={percentage}
                  onChange={(e) => setPercentage(Number(e.target.value))}
                  className="w-full h-2 bg-brand-light rounded-lg appearance-none cursor-pointer accent-brand-accent"
                />
                <div className="flex justify-between text-xs text-brand-mid">
                  <span>10%</span>
                  <span>100%</span>
                  <span>200%</span>
                </div>

                {selectedImage && (
                  <p className="text-sm text-brand-mid text-center">
                    결과 크기:{" "}
                    <span className="font-mono text-brand-black">
                      {Math.round(selectedImage.originalWidth * (percentage / 100))} ×{" "}
                      {Math.round(selectedImage.originalHeight * (percentage / 100))}
                    </span>
                  </p>
                )}
              </div>
            )}

            {/* SNS 프리셋 */}
            {mode === "preset" && (
              <div className="space-y-4">
                {Object.entries(presetsByPlatform).map(([platform, presets]) => (
                  <div key={platform}>
                    <p className="text-xs font-mono text-brand-mid uppercase tracking-wider mb-2">
                      {platform}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {presets.map((preset) => (
                        <button
                          key={preset.id}
                          onClick={() => setSelectedPresetId(preset.id)}
                          className={`
                            px-4 py-2 rounded-lg text-sm transition-all
                            ${
                              selectedPresetId === preset.id
                                ? "bg-brand-accent text-white"
                                : "bg-brand-white text-brand-mid hover:text-brand-black border border-brand-light"
                            }
                          `}
                        >
                          {preset.name}
                          <span className="text-xs opacity-70 ml-1">
                            {preset.height > 0
                              ? `${preset.width}×${preset.height}`
                              : `${preset.width}px`}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                {selectedPreset && (
                  <p className="text-sm text-brand-mid text-center mt-4">
                    {selectedPreset.description}:{" "}
                    <span className="font-mono text-brand-black">
                      {selectedPreset.height > 0
                        ? `${selectedPreset.width} × ${selectedPreset.height}`
                        : `너비 ${selectedPreset.width}px (높이 자동)`}
                    </span>
                  </p>
                )}
              </div>
            )}

            {/* 리사이즈 버튼 */}
            <button
              onClick={handleResize}
              disabled={isProcessing || images.length === 0}
              className={`
                w-full py-4 rounded-lg font-medium text-lg transition-all
                ${
                  isProcessing || images.length === 0
                    ? "bg-brand-light text-brand-mid cursor-not-allowed"
                    : "bg-brand-accent text-white hover:bg-brand-accent-light"
                }
              `}
            >
              {isProcessing ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  리사이즈 중...
                </span>
              ) : (
                `${images.length}개 이미지 리사이즈`
              )}
            </button>
          </div>

          {/* Before/After 비교 */}
          {selectedImage && selectedImage.status === "done" && selectedImage.result && (
            <div className="space-y-4">
              <h3 className="font-mono text-xs text-brand-accent uppercase tracking-wider">
                Before / After 비교
              </h3>

              <BeforeAfter
                beforeSrc={selectedImage.originalDataUrl}
                afterSrc={selectedImage.result.dataUrl}
                beforeSize={`${selectedImage.originalWidth}×${selectedImage.originalHeight}`}
                afterSize={`${selectedImage.result.width}×${selectedImage.result.height}`}
              />
            </div>
          )}

          {/* 다운로드 */}
          {completedImages.length > 0 && (
            <div className="bg-brand-black rounded-xl p-6">
              <div className="text-center mb-6">
                <p className="text-brand-paper text-lg">
                  {completedImages.length}개 이미지 리사이즈 완료
                </p>
              </div>

              <div className="flex justify-center">
                {downloadFiles.length === 1 ? (
                  <DownloadButton
                    fileName={downloadFiles[0].name}
                    fileBlob={downloadFiles[0].blob}
                    variant="primary"
                    size="lg"
                    label="다운로드"
                  />
                ) : (
                  <DownloadButton
                    files={downloadFiles}
                    zipFileName="floor05-resized-images.zip"
                    variant="primary"
                    size="lg"
                  />
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
