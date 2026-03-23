"use client";

import { useState, useCallback, useMemo } from "react";
import FileDropzone from "@/components/common/FileDropzone";
import BeforeAfter from "@/components/common/BeforeAfter";
import DownloadButton from "@/components/common/DownloadButton";
import {
  formatFileSize,
  calculateCompressionRate,
  createNewFileName,
  getMaxBatchSize,
  fileToDataUrl,
} from "@/lib/common/fileUtils";
import {
  compressImage,
  compressToTargetSize,
  CompressionResult,
} from "@/lib/image/compress";

interface ProcessedImage {
  id: string;
  file: File;
  originalDataUrl: string;
  result: CompressionResult | null;
  status: "pending" | "processing" | "done" | "error";
  error?: string;
}

type CompressionMode = "quality" | "target";

export default function CompressTool() {
  // 상태
  const [images, setImages] = useState<ProcessedImage[]>([]);
  const [mode, setMode] = useState<CompressionMode>("quality");
  const [quality, setQuality] = useState(80);
  const [targetSizeKB, setTargetSizeKB] = useState(200);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingIndex, setProcessingIndex] = useState(0);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [batchNotice, setBatchNotice] = useState<string | null>(null);

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

  // 전체 압축 통계
  const totalStats = useMemo(() => {
    const completed = completedImages;
    if (completed.length === 0) return null;

    const totalOriginal = completed.reduce(
      (sum, img) => sum + (img.result?.originalSize || 0),
      0
    );
    const totalCompressed = completed.reduce(
      (sum, img) => sum + (img.result?.compressedSize || 0),
      0
    );

    return {
      count: completed.length,
      originalSize: totalOriginal,
      compressedSize: totalCompressed,
      savedSize: totalOriginal - totalCompressed,
      rate: calculateCompressionRate(totalOriginal, totalCompressed),
    };
  }, [completedImages]);

  // 파일 추가
  const handleFilesAdd = useCallback(async (files: File[]) => {
    const maxBatch = getMaxBatchSize();
    const filesToAdd = files.slice(0, maxBatch);

    const newImages: ProcessedImage[] = await Promise.all(
      filesToAdd.map(async (file) => {
        const dataUrl = await fileToDataUrl(file);
        return {
          id: `${file.name}-${Date.now()}-${Math.random()}`,
          file,
          originalDataUrl: dataUrl,
          result: null,
          status: "pending" as const,
        };
      })
    );

    let overflow = 0;
    setImages((prev) => {
      const combined = [...prev, ...newImages];
      overflow = Math.max(0, combined.length - maxBatch);
      return combined.slice(0, maxBatch);
    });

    if (newImages.length > 0 && overflow > 0) {
      setBatchNotice(`최대 ${maxBatch}개까지 처리됩니다. ${overflow}개 파일이 제외되었습니다.`);
      setTimeout(() => setBatchNotice(null), 4000);
    }

    // 첫 번째 이미지 선택
    if (newImages.length > 0) {
      setSelectedImageId(newImages[0].id);
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

  // 압축 실행
  const handleCompress = useCallback(async () => {
    if (images.length === 0 || isProcessing) return;

    setIsProcessing(true);
    setProcessingIndex(0);

    // 모든 이미지 처리 상태로 변경
    setImages((prev) =>
      prev.map((img) => ({ ...img, status: "processing" as const }))
    );

    for (let i = 0; i < images.length; i++) {
      setProcessingIndex(i + 1);
      const img = images[i];

      try {
        let result: CompressionResult;

        if (mode === "quality") {
          result = await compressImage(img.file, {
            quality: quality / 100,
            outputFormat: "image/jpeg",
          });
        } else {
          result = await compressToTargetSize(img.file, targetSizeKB, {
            outputFormat: "image/jpeg",
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
                      : "압축에 실패했습니다.",
                }
              : item
          )
        );
      }
    }

    setIsProcessing(false);
  }, [images, mode, quality, targetSizeKB, isProcessing]);

  // 다운로드용 파일 목록
  const downloadFiles = useMemo(() => {
    return completedImages
      .filter((img) => img.result)
      .map((img) => ({
        name: createNewFileName(img.file.name, "_compressed", "jpg"),
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
          {/* 배치 초과 알림 */}
          {batchNotice && (
            <div className="bg-brand-accent/10 border border-brand-accent/30 rounded-lg p-3">
              <p className="text-sm text-brand-black">{batchNotice}</p>
            </div>
          )}

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
                  onClick={() => setSelectedImageId(img.id)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelectedImageId(img.id); } }}
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
                      <p className="text-xs text-brand-accent font-mono">
                        -{calculateCompressionRate(img.result.originalSize, img.result.compressedSize)}%
                      </p>
                    </div>
                  )}

                  {img.status === "error" && (
                    <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center" title={img.error || "압축 실패"}>
                      <div className="text-center px-2">
                        <span className="text-red-500 text-xl block">!</span>
                        <span className="text-red-600 text-[10px] leading-tight block mt-1">{img.error || "실패"}</span>
                      </div>
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

          {/* 압축 옵션 */}
          <div className="bg-brand-paper rounded-xl p-6 space-y-6">
            {/* 모드 선택 */}
            <div className="flex gap-4">
              <button
                onClick={() => setMode("quality")}
                className={`
                  flex-1 py-3 px-4 rounded-lg font-medium transition-all
                  ${
                    mode === "quality"
                      ? "bg-brand-accent text-white"
                      : "bg-brand-white text-brand-mid hover:text-brand-black"
                  }
                `}
              >
                품질 조절
              </button>
              <button
                onClick={() => setMode("target")}
                className={`
                  flex-1 py-3 px-4 rounded-lg font-medium transition-all
                  ${
                    mode === "target"
                      ? "bg-brand-accent text-white"
                      : "bg-brand-white text-brand-mid hover:text-brand-black"
                  }
                `}
              >
                목표 용량
              </button>
            </div>

            {/* 품질 슬라이더 */}
            {mode === "quality" && (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-brand-black">
                    압축 품질
                  </label>
                  <span className="font-mono text-sm text-brand-accent">
                    {quality}%
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  aria-label={`이미지 압축 품질 ${quality}%`}
                  className="w-full h-2 bg-brand-light rounded-lg appearance-none cursor-pointer accent-brand-accent"
                />
                <div className="flex justify-between text-xs text-brand-mid">
                  <span>최소 용량</span>
                  <span>최고 품질</span>
                </div>
              </div>
            )}

            {/* 목표 용량 입력 */}
            {mode === "target" && (
              <div className="space-y-3">
                <label className="text-sm font-medium text-brand-black">
                  목표 용량 (KB)
                </label>
                <div className="flex gap-2">
                  {[100, 200, 500, 1000].map((size) => (
                    <button
                      key={size}
                      onClick={() => setTargetSizeKB(size)}
                      className={`
                        px-4 py-2 rounded-lg text-sm font-mono transition-all
                        ${
                          targetSizeKB === size
                            ? "bg-brand-accent text-white"
                            : "bg-brand-white text-brand-mid hover:text-brand-black"
                        }
                      `}
                    >
                      {size < 1000 ? `${size}KB` : `${size / 1000}MB`}
                    </button>
                  ))}
                  <input
                    type="number"
                    value={targetSizeKB}
                    onChange={(e) =>
                      setTargetSizeKB(Math.max(1, Number(e.target.value)))
                    }
                    className="flex-1 px-3 py-2 rounded-lg border border-brand-light text-sm font-mono focus:outline-none focus:border-brand-accent"
                    placeholder="직접 입력"
                  />
                </div>
                <p className="text-xs text-brand-mid">
                  이미지 품질을 자동 조절하여 목표 용량 이하로 압축합니다.
                </p>
              </div>
            )}

            {/* 압축 버튼 */}
            <button
              onClick={handleCompress}
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
                  압축 중... ({processingIndex}/{images.length})
                </span>
              ) : completedImages.length > 0 ? (
                "설정 변경 후 다시 압축"
              ) : (
                `${images.length}개 이미지 압축하기`
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
                beforeSize={formatFileSize(selectedImage.result.originalSize)}
                afterSize={formatFileSize(selectedImage.result.compressedSize)}
              />

              {/* 압축 결과 */}
              <div className="bg-brand-paper rounded-xl p-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-brand-mid mb-1">원본</p>
                    <p className="font-mono text-lg text-brand-black">
                      {formatFileSize(selectedImage.result.originalSize)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-brand-mid mb-1">압축 후</p>
                    <p className="font-mono text-lg text-brand-accent">
                      {formatFileSize(selectedImage.result.compressedSize)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-brand-mid mb-1">감소율</p>
                    <p className="font-mono text-lg text-brand-accent">
                      -{calculateCompressionRate(selectedImage.result.originalSize, selectedImage.result.compressedSize)}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 전체 통계 & 다운로드 */}
          {totalStats && totalStats.count > 0 && (
            <div className="bg-brand-black rounded-xl p-6 space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-sm text-brand-light mb-1">처리 완료</p>
                  <p className="font-mono text-2xl text-brand-paper">
                    {totalStats.count}개
                  </p>
                </div>
                <div>
                  <p className="text-sm text-brand-light mb-1">원본 총 용량</p>
                  <p className="font-mono text-2xl text-brand-paper">
                    {formatFileSize(totalStats.originalSize)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-brand-light mb-1">압축 후</p>
                  <p className="font-mono text-2xl text-brand-accent">
                    {formatFileSize(totalStats.compressedSize)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-brand-light mb-1">절약</p>
                  <p className="font-mono text-2xl text-brand-accent">
                    {formatFileSize(totalStats.savedSize)} (-{totalStats.rate}%)
                  </p>
                </div>
              </div>

              {/* 다운로드 버튼 */}
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
                    zipFileName="floor05-compressed-images.zip"
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
