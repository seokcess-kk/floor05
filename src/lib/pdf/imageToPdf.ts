/**
 * 이미지 → PDF 조립 (100% 클라이언트, pdf-lib)
 * - 이미지 디코딩·방향보정·JPEG 재인코딩은 컴포넌트(Canvas)에서 처리하고,
 *   여기서는 이미 JPEG 바이트가 된 이미지를 페이지로 배치만 한다.
 */

import { PDFDocument } from "pdf-lib";

export type PageSize = "fit" | "a4" | "letter";
export type Orientation = "portrait" | "landscape" | "auto";

export interface PdfImageItem {
  /** JPEG 바이트 */
  bytes: Uint8Array;
  width: number;
  height: number;
}

export interface ImageToPdfOptions {
  /** fit = 이미지 크기에 맞춤 / a4 / letter */
  pageSize: PageSize;
  orientation: Orientation;
  /** 여백(pt). 0이면 여백 없음 */
  margin: number;
}

const A4 = { w: 595.28, h: 841.89 };
const LETTER = { w: 612, h: 792 };

export async function imagesToPdf(
  items: PdfImageItem[],
  opts: ImageToPdfOptions,
): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();

  for (const it of items) {
    const img = await pdf.embedJpg(it.bytes);
    const margin = Math.max(0, opts.margin);

    let pageW: number;
    let pageH: number;

    if (opts.pageSize === "fit") {
      // 페이지 = 이미지 + 여백
      pageW = it.width + margin * 2;
      pageH = it.height + margin * 2;
    } else {
      const base = opts.pageSize === "a4" ? A4 : LETTER;
      let { w, h } = base;
      const landscape =
        opts.orientation === "landscape" ||
        (opts.orientation === "auto" && it.width > it.height);
      if (landscape) {
        [w, h] = [h, w];
      }
      pageW = w;
      pageH = h;
    }

    const page = pdf.addPage([pageW, pageH]);

    // 여백 안쪽에 비율 유지하며 배치 (중앙 정렬)
    const availW = Math.max(1, pageW - margin * 2);
    const availH = Math.max(1, pageH - margin * 2);
    const scale =
      opts.pageSize === "fit" ? 1 : Math.min(availW / it.width, availH / it.height);
    const drawW = it.width * scale;
    const drawH = it.height * scale;

    page.drawImage(img, {
      x: (pageW - drawW) / 2,
      y: (pageH - drawH) / 2,
      width: drawW,
      height: drawH,
    });
  }

  return pdf.save();
}
