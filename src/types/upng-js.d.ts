declare module "upng-js" {
  interface DecodedImage {
    width: number;
    height: number;
    depth: number;
    ctype: number;
    data: Uint8Array;
  }

  interface UPNG {
    /**
     * RGBA8 버퍼들을 PNG로 인코딩.
     * @param cnum 색상 수. 0 = 무손실(32bit), 1~256 = 팔레트 양자화(손실, 용량↓)
     */
    encode(bufs: ArrayBuffer[], w: number, h: number, cnum: number, dels?: number[]): ArrayBuffer;
    decode(buf: ArrayBuffer): DecodedImage;
    toRGBA8(img: DecodedImage): ArrayBuffer[];
  }

  const UPNG: UPNG;
  export default UPNG;
}
