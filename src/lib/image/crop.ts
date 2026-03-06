/**
 * 이미지 크롭 로직
 * Canvas + 마우스/터치 이벤트
 */

import { loadImage, fileToDataUrl } from "../common/fileUtils";

export interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CropOptions {
  area: CropArea;
  rotation?: number; // 0, 90, 180, 270
  flipHorizontal?: boolean;
  flipVertical?: boolean;
  outputFormat?: "image/jpeg" | "image/png" | "image/webp";
  quality?: number;
}

export interface CropResult {
  blob: Blob;
  width: number;
  height: number;
  dataUrl: string;
}

export interface AspectRatioPreset {
  id: string;
  name: string;
  ratio: number | null; // null = 자유
  description: string;
}

/**
 * 비율 프리셋
 */
export const ASPECT_RATIO_PRESETS: AspectRatioPreset[] = [
  { id: "free", name: "자유", ratio: null, description: "자유롭게 선택" },
  { id: "1:1", name: "1:1", ratio: 1, description: "정방형" },
  { id: "4:3", name: "4:3", ratio: 4 / 3, description: "일반 사진" },
  { id: "3:4", name: "3:4", ratio: 3 / 4, description: "세로 사진" },
  { id: "16:9", name: "16:9", ratio: 16 / 9, description: "와이드스크린" },
  { id: "9:16", name: "9:16", ratio: 9 / 16, description: "스마트폰 세로" },
];

/**
 * 이미지 크롭
 */
export async function cropImage(
  file: File,
  options: CropOptions
): Promise<CropResult> {
  const {
    area,
    rotation = 0,
    flipHorizontal = false,
    flipVertical = false,
    outputFormat = "image/jpeg",
    quality = 0.92,
  } = options;

  // 파일을 Data URL로 변환
  const dataUrl = await fileToDataUrl(file);

  // 이미지 로드
  const img = await loadImage(dataUrl);

  // 회전/반전 적용
  const transformedCanvas = applyTransformations(
    img,
    rotation,
    flipHorizontal,
    flipVertical
  );

  // 크롭 영역 추출
  const cropCanvas = document.createElement("canvas");
  cropCanvas.width = area.width;
  cropCanvas.height = area.height;

  const ctx = cropCanvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas 컨텍스트를 생성할 수 없습니다.");
  }

  // 배경색 (JPG인 경우)
  if (outputFormat === "image/jpeg") {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, area.width, area.height);
  }

  // 크롭 영역 그리기
  ctx.drawImage(
    transformedCanvas,
    area.x,
    area.y,
    area.width,
    area.height,
    0,
    0,
    area.width,
    area.height
  );

  // Blob 생성
  const blob = await new Promise<Blob>((resolve, reject) => {
    cropCanvas.toBlob(
      (b) => {
        if (b) {
          resolve(b);
        } else {
          reject(new Error("이미지 크롭에 실패했습니다."));
        }
      },
      outputFormat,
      quality
    );
  });

  // 크롭된 Data URL 생성
  const croppedDataUrl = cropCanvas.toDataURL(outputFormat, quality);

  return {
    blob,
    width: area.width,
    height: area.height,
    dataUrl: croppedDataUrl,
  };
}

/**
 * 회전/반전 적용
 */
function applyTransformations(
  img: HTMLImageElement,
  rotation: number,
  flipHorizontal: boolean,
  flipVertical: boolean
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");

  // 회전에 따른 캔버스 크기 조정
  const isRotated90or270 = rotation === 90 || rotation === 270;
  canvas.width = isRotated90or270 ? img.height : img.width;
  canvas.height = isRotated90or270 ? img.width : img.height;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas 컨텍스트를 생성할 수 없습니다.");
  }

  // 중심으로 이동
  ctx.translate(canvas.width / 2, canvas.height / 2);

  // 회전
  ctx.rotate((rotation * Math.PI) / 180);

  // 반전
  ctx.scale(flipHorizontal ? -1 : 1, flipVertical ? -1 : 1);

  // 이미지 그리기 (중심 기준)
  ctx.drawImage(img, -img.width / 2, -img.height / 2);

  return canvas;
}

/**
 * 회전된 이미지의 크기 계산
 */
export function getRotatedDimensions(
  width: number,
  height: number,
  rotation: number
): { width: number; height: number } {
  const isRotated90or270 = rotation === 90 || rotation === 270;
  return {
    width: isRotated90or270 ? height : width,
    height: isRotated90or270 ? width : height,
  };
}

/**
 * 비율에 맞는 최대 크롭 영역 계산
 */
export function calculateMaxCropArea(
  imageWidth: number,
  imageHeight: number,
  aspectRatio: number | null
): CropArea {
  if (aspectRatio === null) {
    return { x: 0, y: 0, width: imageWidth, height: imageHeight };
  }

  const imageRatio = imageWidth / imageHeight;

  let cropWidth: number;
  let cropHeight: number;

  if (imageRatio > aspectRatio) {
    // 이미지가 더 넓음
    cropHeight = imageHeight;
    cropWidth = cropHeight * aspectRatio;
  } else {
    // 이미지가 더 높음
    cropWidth = imageWidth;
    cropHeight = cropWidth / aspectRatio;
  }

  return {
    x: (imageWidth - cropWidth) / 2,
    y: (imageHeight - cropHeight) / 2,
    width: cropWidth,
    height: cropHeight,
  };
}

/**
 * 회전된 이미지의 미리보기 Data URL 생성
 */
export async function getTransformedPreview(
  dataUrl: string,
  rotation: number,
  flipHorizontal: boolean,
  flipVertical: boolean
): Promise<string> {
  const img = await loadImage(dataUrl);
  const canvas = applyTransformations(img, rotation, flipHorizontal, flipVertical);
  return canvas.toDataURL("image/jpeg", 0.8);
}
