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
} from "@/lib/common/fileUtils";
import {
  convertImage,
  getFormatName,
  getExtension,
  isHeicFile,
  isWebPSupported,
  OutputFormat,
  ConvertResult,
} from "@/lib/image/convert";

interface ProcessedImage {
  id: string;
  file: File;
  originalDataUrl: string;
  originalFormat: string;
  result: ConvertResult | null;
  status: "pending" | "processing" | "done" | "error";
  error?: string;
}

const BACKGROUND_COLORS = [
  { value: "#FFFFFF", label: "흰색", class: "bg-white border" },
  { value: "#000000", label: "검정", class: "bg-black" },
  { value: "#F5F5F5", label: "밝은 회색", class: "bg-gray-100" },
  { value: "transparent", label: "투명 (PNG만)", class: "bg-gradient-to-br from-gray-200 to-gray-300" },
];

export default function ConvertTool() {
  // 상태
  const [images, setImages] = useState<ProcessedImage[]>([]);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("image/jpeg");
  const [quality, setQuality] = useState(90);
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [webpSupported, setWebpSupported] = useState(true);

  // WebP 지원 확인
  useEffect(() => {
    setWebpSupported(isWebPSupported());
  }, []);


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

  // HEIC 파일 포함 여부
  const hasHeicFiles = useMemo(
    () => images.some((img) => isHeicFile(img.file)),
    [images]
  );

  // 파일 추가
  const handleFilesAdd = useCallback(async (files: File[]) => {
    const maxBatch = getMaxBatchSize();
    const filesToAdd = files.slice(0, maxBatch);

    const newImages: ProcessedImage[] = await Promise.all(
      filesToAdd.map(async (file) => {
        let dataUrl: string;
        let originalFormat = file.type;

        // HEIC 파일은 플레이스홀더 표시
        if (isHeicFile(file)) {
          originalFormat = "image/heic";
          dataUrl = ""; // HEIC는 미리보기 불가
        } else {
          dataUrl = await fileToDataUrl(file);
        }

        return {
          id: `${file.name}-${Date.now()}-${Math.random()}`,
          file,
          originalDataUrl: dataUrl,
          originalFormat,
          result: null,
          status: "pending" as const,
        };
      })
    );

    setImages((prev) => {
      const combined = [...prev, ...newImages];
      return combined.slice(0, maxBatch);
    });

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

  // 변환 실행
  const handleConvert = useCallback(async () => {
    if (images.length === 0 || isProcessing) return;

    setIsProcessing(true);

    setImages((prev) =>
      prev.map((img) => ({ ...img, status: "processing" as const }))
    );

    for (let i = 0; i < images.length; i++) {
      const img = images[i];

      try {
        const result = await convertImage(img.file, {
          outputFormat,
          quality: quality / 100,
          backgroundColor:
            backgroundColor === "transparent" ? "#FFFFFF" : backgroundColor,
        });

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
                      : "변환에 실패했습니다.",
                }
              : item
          )
        );
      }
    }

    setIsProcessing(false);
  }, [images, outputFormat, quality, backgroundColor, isProcessing]);

  // 다운로드용 파일 목록
  const downloadFiles = useMemo(() => {
    return completedImages
      .filter((img) => img.result)
      .map((img) => ({
        name: createNewFileName(
          img.file.name,
          "",
          getExtension(img.result!.outputFormat)
        ),
        blob: img.result!.blob,
      }));
  }, [completedImages]);

  return (
    <div className="space-y-8">
      {/* 파일 업로드 영역 */}
      {images.length === 0 ? (
        <FileDropzone
          onFilesSelected={handleFilesAdd}
          accept="image/jpeg,image/png,image/webp,image/heic,image/heif,.heic,.heif"
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
                  onClick={() => setSelectedImageId(img.id)}
                  className={`
                    relative aspect-square rounded-lg overflow-hidden cursor-pointer
                    border-2 transition-all
                    ${
                      selectedImageId === img.id
                        ? "border-brand-accent"
                        : "border-transparent hover:border-brand-light"
                    }
                  `}
                >
                  {img.originalDataUrl ? (
                    <img
                      src={img.result?.dataUrl || img.originalDataUrl}
                      alt={img.file.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    // HEIC 플레이스홀더
                    <div className="w-full h-full bg-brand-paper flex items-center justify-center">
                      <div className="text-center">
                        <span className="font-mono text-xs text-brand-accent">
                          HEIC
                        </span>
                        <p className="text-xs text-brand-mid mt-1 truncate px-2">
                          {img.file.name}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* 상태 오버레이 */}
                  {img.status === "processing" && (
                    <div className="absolute inset-0 bg-brand-black/60 flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}

                  {img.status === "done" && (
                    <div className="absolute bottom-0 left-0 right-0 bg-brand-black/70 px-2 py-1">
                      <p className="text-xs text-brand-accent font-mono">
                        {getFormatName(img.originalFormat)} →{" "}
                        {getFormatName(img.result?.outputFormat || "")}
                      </p>
                    </div>
                  )}

                  {img.status === "error" && (
                    <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                      <span className="text-red-500 text-xl">!</span>
                    </div>
                  )}

                  {/* 삭제 버튼 */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveImage(img.id);
                    }}
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
                    accept="image/jpeg,image/png,image/webp,image/heic,image/heif,.heic,.heif"
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

          {/* HEIC 안내 */}
          {hasHeicFiles && (
            <div className="bg-brand-accent/10 border border-brand-accent/30 rounded-lg p-4">
              <p className="text-sm text-brand-black">
                <span className="font-medium">HEIC 파일 감지됨.</span>{" "}
                아이폰 사진을 JPG, PNG, WebP로 변환할 수 있습니다.
              </p>
            </div>
          )}

          {/* 변환 옵션 */}
          <div className="bg-brand-paper rounded-xl p-6 space-y-6">
            {/* 출력 포맷 선택 */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-brand-black">
                출력 포맷
              </label>
              <div className="flex gap-3">
                {[
                  { format: "image/jpeg" as OutputFormat, label: "JPG" },
                  { format: "image/png" as OutputFormat, label: "PNG" },
                  { format: "image/webp" as OutputFormat, label: "WebP" },
                ].map(({ format, label }) => {
                  const isDisabled =
                    format === "image/webp" && !webpSupported;
                  return (
                    <button
                      key={format}
                      onClick={() => !isDisabled && setOutputFormat(format)}
                      disabled={isDisabled}
                      className={`
                        flex-1 py-3 px-4 rounded-lg font-medium transition-all
                        ${
                          isDisabled
                            ? "bg-brand-light/50 text-brand-mid cursor-not-allowed"
                            : outputFormat === format
                            ? "bg-brand-accent text-white"
                            : "bg-brand-white text-brand-mid hover:text-brand-black border border-brand-light"
                        }
                      `}
                    >
                      {label}
                      {isDisabled && (
                        <span className="block text-xs mt-1">미지원</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 품질 설정 (JPG, WebP) */}
            {outputFormat !== "image/png" && (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-brand-black">
                    품질
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
                  className="w-full h-2 bg-brand-light rounded-lg appearance-none cursor-pointer accent-brand-accent"
                />
                <div className="flex justify-between text-xs text-brand-mid">
                  <span>최소 용량</span>
                  <span>최고 품질</span>
                </div>
              </div>
            )}

            {/* 배경색 선택 (PNG→JPG 시) */}
            {outputFormat === "image/jpeg" && (
              <div className="space-y-3">
                <label className="text-sm font-medium text-brand-black">
                  투명 배경 대체 색상
                </label>
                <p className="text-xs text-brand-mid">
                  PNG 이미지의 투명한 부분을 채울 색상입니다.
                </p>
                <div className="flex gap-3">
                  {BACKGROUND_COLORS.filter((c) => c.value !== "transparent").map(
                    (color) => (
                      <button
                        key={color.value}
                        onClick={() => setBackgroundColor(color.value)}
                        className={`
                          w-10 h-10 rounded-lg ${color.class} transition-all
                          ${
                            backgroundColor === color.value
                              ? "ring-2 ring-brand-accent ring-offset-2"
                              : ""
                          }
                        `}
                        title={color.label}
                      />
                    )
                  )}
                </div>
              </div>
            )}

            {/* 변환 버튼 */}
            <button
              onClick={handleConvert}
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
                  변환 중...
                </span>
              ) : (
                `${images.length}개 이미지 ${getFormatName(outputFormat)}로 변환`
              )}
            </button>
          </div>

          {/* Before/After 비교 */}
          {selectedImage &&
            selectedImage.status === "done" &&
            selectedImage.result &&
            selectedImage.originalDataUrl && (
              <div className="space-y-4">
                <h3 className="font-mono text-xs text-brand-accent uppercase tracking-wider">
                  Before / After 비교
                </h3>

                <BeforeAfter
                  beforeSrc={selectedImage.originalDataUrl}
                  afterSrc={selectedImage.result.dataUrl}
                  beforeLabel={getFormatName(selectedImage.originalFormat)}
                  afterLabel={getFormatName(selectedImage.result.outputFormat)}
                  beforeSize={formatFileSize(selectedImage.file.size)}
                  afterSize={formatFileSize(selectedImage.result.blob.size)}
                />
              </div>
            )}

          {/* 다운로드 */}
          {completedImages.length > 0 && (
            <div className="bg-brand-black rounded-xl p-6">
              <div className="text-center mb-6">
                <p className="text-brand-paper text-lg">
                  {completedImages.length}개 이미지 변환 완료
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
                    zipFileName="floor05-converted-images.zip"
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
