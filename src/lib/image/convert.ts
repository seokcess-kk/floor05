/**
 * 이미지 포맷 변환 로직
 * Canvas toBlob(mimeType) 사용
 * HEIC 변환: heic2any 라이브러리 (동적 로드)
 */

import { loadImage, fileToDataUrl } from "../common/fileUtils";

export type OutputFormat = "image/jpeg" | "image/png" | "image/webp";

export interface ConvertOptions {
  outputFormat: OutputFormat;
  quality?: number; // 0.01 ~ 1.0 (JPG, WebP만 적용)
  backgroundColor?: string; // PNG→JPG 변환 시 투명 배경 대체 색상
}

export interface ConvertResult {
  blob: Blob;
  width: number;
  height: number;
  originalFormat: string;
  outputFormat: OutputFormat;
  dataUrl: string;
}

/**
 * 파일 MIME 타입에서 포맷 이름 추출
 */
export function getFormatName(mimeType: string): string {
  const formatMap: Record<string, string> = {
    "image/jpeg": "JPG",
    "image/jpg": "JPG",
    "image/png": "PNG",
    "image/webp": "WebP",
    "image/heic": "HEIC",
    "image/heif": "HEIF",
  };
  return formatMap[mimeType.toLowerCase()] || "Unknown";
}

/**
 * 출력 포맷 확장자
 */
export function getExtension(format: OutputFormat): string {
  const extMap: Record<OutputFormat, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
  };
  return extMap[format];
}

/**
 * HEIC 파일인지 확인
 */
export function isHeicFile(file: File): boolean {
  const type = file.type.toLowerCase();
  const name = file.name.toLowerCase();
  return (
    type === "image/heic" ||
    type === "image/heif" ||
    name.endsWith(".heic") ||
    name.endsWith(".heif")
  );
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

// heic2any 모듈 캐싱
let cachedHeic2any: ((options: { blob: Blob; toType: string; quality: number }) => Promise<Blob | Blob[]>) | null = null;

async function getHeic2any() {
  if (!cachedHeic2any) {
    cachedHeic2any = (await import("heic2any")).default;
  }
  return cachedHeic2any;
}

/**
 * HEIC를 JPEG로 변환 (heic2any 동적 로드)
 */
async function convertHeicToJpeg(file: File): Promise<Blob> {
  const heic2any = await getHeic2any();

  const result = await heic2any({
    blob: file,
    toType: "image/jpeg",
    quality: 0.92,
  });

  // 단일 이미지 또는 배열 처리
  if (Array.isArray(result)) {
    return result[0];
  }
  return result;
}

/**
 * 이미지 포맷 변환 (단일 파일)
 */
export async function convertImage(
  file: File,
  options: ConvertOptions
): Promise<ConvertResult> {
  const {
    outputFormat,
    quality = 0.92,
    backgroundColor = "#FFFFFF",
  } = options;

  let dataUrl: string;
  let originalFormat = file.type;

  // HEIC 파일 처리
  if (isHeicFile(file)) {
    originalFormat = "image/heic";
    const jpegBlob = await convertHeicToJpeg(file);
    dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error("HEIC 파일을 읽을 수 없습니다."));
      reader.readAsDataURL(jpegBlob);
    });
  } else {
    dataUrl = await fileToDataUrl(file);
  }

  // 이미지 로드
  const img = await loadImage(dataUrl);

  // Canvas에 그리기
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas 컨텍스트를 생성할 수 없습니다.");
  }

  // 투명 배경 처리 (PNG→JPG 변환 시)
  if (outputFormat === "image/jpeg" && originalFormat === "image/png") {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, img.width, img.height);
  }

  ctx.drawImage(img, 0, 0);

  // Blob 생성
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => {
        if (b) {
          resolve(b);
        } else {
          reject(new Error("이미지 변환에 실패했습니다."));
        }
      },
      outputFormat,
      quality
    );
  });

  // Blob에서 URL 생성 (toDataURL 중복 호출 방지)
  const convertedDataUrl = URL.createObjectURL(blob);

  return {
    blob,
    width: img.width,
    height: img.height,
    originalFormat,
    outputFormat,
    dataUrl: convertedDataUrl,
  };
}

/**
 * 변환 가능 포맷 목록 (브라우저 지원 확인)
 */
export function getAvailableFormats(): OutputFormat[] {
  const formats: OutputFormat[] = ["image/jpeg", "image/png"];

  if (isWebPSupported()) {
    formats.push("image/webp");
  }

  return formats;
}
