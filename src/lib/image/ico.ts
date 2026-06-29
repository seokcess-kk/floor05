/**
 * ICO 인코더 (100% 클라이언트, 순수 함수)
 * - 여러 PNG 이미지를 하나의 .ico 컨테이너로 묶는다 (PNG-in-ICO, Vista+ 지원)
 * - favicon.ico에 16/32/48px를 함께 담는 용도
 */

export interface IcoImage {
  /** 정사각 한 변 크기(px). 256은 0으로 기록 */
  size: number;
  /** PNG 바이트 */
  bytes: Uint8Array;
}

export function buildIco(images: IcoImage[]): Uint8Array {
  const count = images.length;
  const headerSize = 6 + 16 * count;
  const dataSize = images.reduce((sum, img) => sum + img.bytes.length, 0);
  const buf = new Uint8Array(headerSize + dataSize);
  const dv = new DataView(buf.buffer);

  // ICONDIR
  dv.setUint16(0, 0, true); // reserved
  dv.setUint16(2, 1, true); // type: 1 = icon
  dv.setUint16(4, count, true);

  let offset = headerSize;
  images.forEach((img, i) => {
    const e = 6 + i * 16; // ICONDIRENTRY
    const dim = img.size >= 256 ? 0 : img.size;
    buf[e] = dim; // width
    buf[e + 1] = dim; // height
    buf[e + 2] = 0; // color palette
    buf[e + 3] = 0; // reserved
    dv.setUint16(e + 4, 1, true); // color planes
    dv.setUint16(e + 6, 32, true); // bits per pixel
    dv.setUint32(e + 8, img.bytes.length, true); // image size
    dv.setUint32(e + 12, offset, true); // image offset
    buf.set(img.bytes, offset);
    offset += img.bytes.length;
  });

  return buf;
}
