/**
 * 이미지 압축 로직
 * Canvas API + toBlob() quality parameter 사용
 */

import { loadImage, fileToDataUrl } from "../common/fileUtils";

export interface CompressionOptions {
  quality: number; // 0.01 ~ 1.0
  maxWidth?: number;
  maxHeight?: number;
  outputFormat?: "image/jpeg" | "image/png" | "image/webp";
}

export interface CompressionResult {
  blob: Blob;
  width: number;
  height: number;
  originalSize: number;
  compressedSize: number;
  dataUrl: string;
}

/**
 * 이미지 압축 (단일 파일)
 */
export async function compressImage(
  file: File,
  options: CompressionOptions
): Promise<CompressionResult> {
  const {
    quality,
    maxWidth,
    maxHeight,
    outputFormat = "image/jpeg",
  } = options;

  // 파일을 Data URL로 변환
  const dataUrl = await fileToDataUrl(file);

  // 이미지 로드
  const img = await loadImage(dataUrl);

  // 크기 계산
  let { width, height } = img;

  if (maxWidth && width > maxWidth) {
    height = Math.round((height * maxWidth) / width);
    width = maxWidth;
  }

  if (maxHeight && height > maxHeight) {
    width = Math.round((width * maxHeight) / height);
    height = maxHeight;
  }

  // Canvas에 그리기
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas 컨텍스트를 생성할 수 없습니다.");
  }

  // PNG 투명 배경 처리 (JPG 변환 시 흰색 배경)
  if (outputFormat === "image/jpeg") {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, width, height);
  }

  ctx.drawImage(img, 0, 0, width, height);

  // Blob 생성
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => {
        if (b) {
          resolve(b);
        } else {
          reject(new Error("이미지 압축에 실패했습니다."));
        }
      },
      outputFormat,
      quality
    );
  });

  // Blob에서 Data URL 생성 (toDataURL 중복 호출 방지)
  const compressedDataUrl = URL.createObjectURL(blob);

  return {
    blob,
    width,
    height,
    originalSize: file.size,
    compressedSize: blob.size,
    dataUrl: compressedDataUrl,
  };
}

/**
 * 목표 용량으로 압축 (Binary Search)
 */
export async function compressToTargetSize(
  file: File,
  targetSizeKB: number,
  options: Omit<CompressionOptions, "quality"> = {}
): Promise<CompressionResult> {
  const targetBytes = targetSizeKB * 1024;

  // 이미 목표보다 작으면 그대로 반환
  if (file.size <= targetBytes) {
    const dataUrl = await fileToDataUrl(file);
    const img = await loadImage(dataUrl);
    return {
      blob: file,
      width: img.width,
      height: img.height,
      originalSize: file.size,
      compressedSize: file.size,
      dataUrl,
    };
  }

  // Binary Search로 최적 품질 찾기
  let low = 0.01;
  let high = 1.0;
  let bestResult: CompressionResult | null = null;
  let attempts = 0;
  const maxAttempts = 10; // 최대 10번 시도

  while (attempts < maxAttempts && high - low > 0.01) {
    const mid = (low + high) / 2;

    const result = await compressImage(file, {
      ...options,
      quality: mid,
    });

    if (result.compressedSize <= targetBytes) {
      // 이전 bestResult의 object URL 해제
      if (bestResult) {
        URL.revokeObjectURL(bestResult.dataUrl);
      }
      bestResult = result;
      low = mid;
    } else {
      // 목표 미달 결과의 object URL 즉시 해제
      URL.revokeObjectURL(result.dataUrl);
      high = mid;
    }

    attempts++;
  }

  // 최종 결과
  if (bestResult && bestResult.compressedSize <= targetBytes) {
    return bestResult;
  }

  // 최저 품질로 한 번 더 시도
  if (bestResult) {
    URL.revokeObjectURL(bestResult.dataUrl);
  }
  const finalResult = await compressImage(file, {
    ...options,
    quality: 0.01,
  });

  return finalResult;
}

/**
 * 미리보기용 빠른 압축
 */
export async function quickCompress(
  file: File,
  quality: number
): Promise<{ dataUrl: string; size: number }> {
  const dataUrl = await fileToDataUrl(file);
  const img = await loadImage(dataUrl);

  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas 컨텍스트를 생성할 수 없습니다.");
  }

  // JPG로 변환 (용량 계산)
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, img.width, img.height);
  ctx.drawImage(img, 0, 0);

  const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);

  // Base64 크기 계산 (대략적)
  const base64Length = compressedDataUrl.length - "data:image/jpeg;base64,".length;
  const estimatedSize = Math.round((base64Length * 3) / 4);

  return {
    dataUrl: compressedDataUrl,
    size: estimatedSize,
  };
}

/**
 * 이미지 MIME 타입에서 출력 포맷 결정
 */
export function getOutputFormat(
  mimeType: string
): "image/jpeg" | "image/png" | "image/webp" {
  switch (mimeType.toLowerCase()) {
    case "image/png":
      return "image/png";
    case "image/webp":
      return "image/webp";
    default:
      return "image/jpeg";
  }
}

/**
 * WebP 지원 여부 확인
 */
export function isWebPSupported(): boolean {
  if (typeof document === "undefined") return false;

  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;

  return canvas.toDataURL("image/webp").indexOf("data:image/webp") === 0;
}
