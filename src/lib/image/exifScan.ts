/**
 * EXIF/GPS 존재 여부 가벼운 감지 (100% 클라이언트, 순수 함수)
 * - 파싱이 아니라 바이트 스캔으로 JPEG의 EXIF(APP1) 세그먼트와 GPS IFD 태그 존재만 확인
 * - 메타데이터 제거 전 "원본에 위치·촬영정보가 있었는지" 안내용
 */

export interface ExifScanResult {
  /** EXIF(APP1) 세그먼트 존재 */
  hasExif: boolean;
  /** GPS 태그(0x8825) 존재 — 위치정보 가능성 */
  hasGps: boolean;
}

export function scanExif(bytes: Uint8Array): ExifScanResult {
  // JPEG SOI 확인
  if (bytes.length < 4 || bytes[0] !== 0xff || bytes[1] !== 0xd8) {
    return { hasExif: false, hasGps: false };
  }
  // "Exif\0\0" = 45 78 69 66 00 00
  let exifStart = -1;
  const scanLen = Math.min(bytes.length - 6, 200_000);
  for (let i = 2; i < scanLen; i++) {
    if (
      bytes[i] === 0x45 &&
      bytes[i + 1] === 0x78 &&
      bytes[i + 2] === 0x69 &&
      bytes[i + 3] === 0x66 &&
      bytes[i + 4] === 0x00 &&
      bytes[i + 5] === 0x00
    ) {
      exifStart = i;
      break;
    }
  }
  if (exifStart < 0) return { hasExif: false, hasGps: false };

  // GPS IFD 태그(0x8825)를 EXIF 영역에서 대략 탐색 (엔디안 무시한 양방향 매칭)
  let hasGps = false;
  const end = Math.min(bytes.length - 1, exifStart + 64_000);
  for (let i = exifStart; i < end; i++) {
    if (
      (bytes[i] === 0x88 && bytes[i + 1] === 0x25) ||
      (bytes[i] === 0x25 && bytes[i + 1] === 0x88)
    ) {
      hasGps = true;
      break;
    }
  }
  return { hasExif: true, hasGps };
}
