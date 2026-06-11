/**
 * 리사이즈 목표 치수 계산 (DOM 비의존 순수 함수).
 * resizeImage(메인 스레드)와 이미지 워커가 공유하는 단일 소스.
 */

export interface ResizeDimsOptions {
  width: number;
  height: number;
  maintainAspectRatio?: boolean;
}

export function computeResizeDimensions(
  naturalWidth: number,
  naturalHeight: number,
  options: ResizeDimsOptions
): { width: number; height: number } {
  const { width, height, maintainAspectRatio = true } = options;

  let newWidth = width;
  let newHeight = height;

  if (maintainAspectRatio) {
    const aspectRatio = naturalWidth / naturalHeight;

    if (height === 0 || height === undefined) {
      // 너비만 지정된 경우
      newHeight = Math.round(width / aspectRatio);
    } else if (width === 0 || width === undefined) {
      // 높이만 지정된 경우
      newWidth = Math.round(height * aspectRatio);
    } else {
      // 둘 다 지정된 경우: fit 방식
      const targetRatio = width / height;
      if (aspectRatio > targetRatio) {
        newWidth = width;
        newHeight = Math.round(width / aspectRatio);
      } else {
        newHeight = height;
        newWidth = Math.round(height * aspectRatio);
      }
    }
  }

  return { width: newWidth, height: newHeight };
}
