"use client";

import { useCallback, useState } from "react";

interface FileDropzoneProps {
  onFilesSelected: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number; // bytes
  disabled?: boolean;
  className?: string;
}

// 파일 크기 포맷팅
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * 파일 드롭존 컴포넌트
 * - Drag-and-Drop 파일 업로드
 * - 클릭하여 파일 선택
 * - 다중 파일 지원
 */
export default function FileDropzone({
  onFilesSelected,
  accept = "image/*",
  multiple = true,
  maxFiles = 10,
  maxSize = 50 * 1024 * 1024, // 50MB
  disabled = false,
  className = "",
}: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 파일 검증
  const validateFiles = useCallback(
    (files: File[]): { valid: File[]; error: string | null } => {
      const validFiles: File[] = [];
      let errorMessage: string | null = null;

      // 파일 수 제한
      if (files.length > maxFiles) {
        errorMessage = `한 번에 최대 ${maxFiles}개 파일만 업로드할 수 있습니다.`;
        files = files.slice(0, maxFiles);
      }

      for (const file of files) {
        // 파일 크기 제한
        if (file.size > maxSize) {
          errorMessage = `${formatFileSize(maxSize)} 이하 파일만 처리할 수 있습니다.`;
          continue;
        }

        // 파일 타입 검증 (기본적인 이미지 타입 체크)
        if (accept === "image/*" && !file.type.startsWith("image/")) {
          errorMessage = "지원하지 않는 파일 형식입니다. JPG, PNG, WebP, HEIC 파일을 사용해주세요.";
          continue;
        }

        validFiles.push(file);
      }

      return { valid: validFiles, error: errorMessage };
    },
    [maxFiles, maxSize, accept]
  );

  // 파일 처리
  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;

      setError(null);
      const fileArray = Array.from(files);
      const { valid, error: validationError } = validateFiles(fileArray);

      if (validationError) {
        setError(validationError);
      }

      if (valid.length > 0) {
        onFilesSelected(valid);
      }
    },
    [validateFiles, onFilesSelected]
  );

  // 드래그 이벤트 핸들러
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (disabled) return;
      handleFiles(e.dataTransfer.files);
    },
    [disabled, handleFiles]
  );

  // 클릭 이벤트 핸들러
  const handleClick = useCallback(() => {
    if (disabled) return;

    const input = document.createElement("input");
    input.type = "file";
    input.accept = accept;
    input.multiple = multiple;
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      handleFiles(target.files);
    };
    input.click();
  }, [disabled, accept, multiple, handleFiles]);

  return (
    <div className={className}>
      {/* 드롭존 */}
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label={multiple ? `이미지 파일 선택 (최대 ${maxFiles}개)` : "이미지 파일 선택"}
        aria-disabled={disabled}
        onClick={handleClick}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleClick(); } }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative
          border-2 border-dashed rounded-xl
          p-8 sm:p-12
          text-center
          cursor-pointer
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2
          ${disabled
            ? "bg-brand-paper/50 border-brand-light/30 cursor-not-allowed"
            : isDragging
              ? "bg-brand-accent/5 border-brand-accent"
              : "bg-brand-paper border-brand-light/50 hover:border-brand-accent/50 hover:bg-brand-paper/80"
          }
        `}
      >
        {/* 아이콘 */}
        <div
          className={`
            w-16 h-16 mx-auto mb-4
            flex items-center justify-center
            rounded-full
            ${isDragging ? "bg-brand-accent/10" : "bg-brand-white"}
          `}
        >
          <svg
            className={`w-8 h-8 ${isDragging ? "text-brand-accent" : "text-brand-mid"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>

        {/* 안내 텍스트 */}
        <p className="text-brand-black font-medium mb-2">
          {isDragging ? "여기에 놓으세요" : "파일을 드래그하거나 클릭하여 선택"}
        </p>
        <p className="text-sm text-brand-mid">
          {multiple
            ? `최대 ${maxFiles}개, 파일당 ${formatFileSize(maxSize)} 이하`
            : `최대 ${formatFileSize(maxSize)}`}
        </p>

        {/* 지원 포맷 */}
        <p className="text-xs text-brand-light mt-2">
          {accept === "image/*"
            ? "JPG, PNG, WebP, HEIC 지원"
            : accept
                .replace(/image\//g, "")
                .replace(/,/g, ", ")
                .toUpperCase() + " 지원"}
        </p>
      </div>

      {/* 에러 메시지 */}
      {error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
    </div>
  );
}
