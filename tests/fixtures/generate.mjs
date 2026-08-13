/**
 * 테스트 fixture 생성기 (제품 코드 미사용 — 독립 생성)
 * - 이미지: Playwright Chromium의 Canvas로 JPG/PNG/WebP 생성
 * - EXIF: 생성한 JPEG에 APP1(Exif) 세그먼트를 바이트 레벨로 삽입 (GPS IFD 포함)
 * - PDF: pdf-lib으로 페이지 수·용지 크기가 다른 PDF 생성
 * - 깨진 파일: 가짜 헤더/절단 파일
 *
 * 실행: node tests/fixtures/generate.mjs
 * 출력: tests/fixtures/generated/ (gitignore 대상)
 */
import { chromium } from "@playwright/test";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), "generated");
fs.mkdirSync(OUT, { recursive: true });

function write(name, buf) {
  fs.writeFileSync(path.join(OUT, name), buf);
  console.log(`  ${name} (${buf.length.toLocaleString()} B)`);
}

// ---------- 이미지 (Chromium canvas) ----------
async function makeImages() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  async function canvasImage({ width, height, mime, quality, transparent = false, seed = 1 }) {
    const dataUrl = await page.evaluate(
      ([w, h, m, q, t, s]) => {
        const c = document.createElement("canvas");
        c.width = w;
        c.height = h;
        const ctx = c.getContext("2d");
        if (!t) {
          const g = ctx.createLinearGradient(0, 0, w, h);
          g.addColorStop(0, `hsl(${(s * 47) % 360}, 70%, 55%)`);
          g.addColorStop(1, `hsl(${(s * 47 + 120) % 360}, 60%, 35%)`);
          ctx.fillStyle = g;
          ctx.fillRect(0, 0, w, h);
        }
        // 노이즈 도형 (압축률 확보용 디테일)
        for (let i = 0; i < 60; i++) {
          ctx.fillStyle = `hsla(${(i * 37 + s * 13) % 360}, 70%, ${30 + (i % 5) * 10}%, ${t && i % 2 ? 0.9 : 0.7})`;
          const x = ((i * 97 + s * 31) % w);
          const y = ((i * 53 + s * 17) % h);
          ctx.beginPath();
          ctx.arc(x, y, 8 + (i % 24), 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = t ? "rgba(196,92,44,0.95)" : "#FAFAFA";
        ctx.font = `${Math.max(14, Math.round(w / 16))}px sans-serif`;
        ctx.fillText(`${w}x${h}`, 10, Math.max(20, Math.round(h / 8)));
        return c.toDataURL(m, q);
      },
      [width, height, mime, quality, transparent, seed],
    );
    return Buffer.from(dataUrl.split(",")[1], "base64");
  }

  console.log("images:");
  write("photo-1200x900.jpg", await canvasImage({ width: 1200, height: 900, mime: "image/jpeg", quality: 0.95, seed: 1 }));
  write("photo-small-100x75.jpg", await canvasImage({ width: 100, height: 75, mime: "image/jpeg", quality: 0.9, seed: 2 }));
  write("wide-3000x500.jpg", await canvasImage({ width: 3000, height: 500, mime: "image/jpeg", quality: 0.92, seed: 3 }));
  write("tall-500x3000.jpg", await canvasImage({ width: 500, height: 3000, mime: "image/jpeg", quality: 0.92, seed: 4 }));
  write("opaque-800x600.png", await canvasImage({ width: 800, height: 600, mime: "image/png", seed: 5 }));
  write("transparent-400x300.png", await canvasImage({ width: 400, height: 300, mime: "image/png", transparent: true, seed: 6 }));
  write("tiny-4x4.png", await canvasImage({ width: 4, height: 4, mime: "image/png", seed: 7 }));
  write("photo-800x600.webp", await canvasImage({ width: 800, height: 600, mime: "image/webp", quality: 0.9, seed: 8 }));
  await browser.close();
}

// ---------- EXIF(GPS 포함) JPEG ----------
// SOI 뒤에 APP1("Exif\0\0" + TIFF: IFD0{GPSInfo→GPS IFD{GPSVersionID}}) 삽입
function makeExifJpeg() {
  const src = fs.readFileSync(path.join(OUT, "photo-1200x900.jpg"));
  if (src[0] !== 0xff || src[1] !== 0xd8) throw new Error("not a JPEG");

  const tiff = new Uint8Array(44);
  const dv = new DataView(tiff.buffer);
  // TIFF 헤더 (리틀엔디안)
  tiff[0] = 0x49; tiff[1] = 0x49; // II
  dv.setUint16(2, 42, true);
  dv.setUint32(4, 8, true); // IFD0 offset
  // IFD0: 엔트리 1개
  dv.setUint16(8, 1, true);
  dv.setUint16(10, 0x8825, true); // GPSInfo
  dv.setUint16(12, 4, true); // LONG
  dv.setUint32(14, 1, true);
  dv.setUint32(18, 26, true); // GPS IFD offset
  dv.setUint32(22, 0, true); // next IFD
  // GPS IFD: GPSVersionID
  dv.setUint16(26, 1, true);
  dv.setUint16(28, 0x0000, true);
  dv.setUint16(30, 1, true); // BYTE
  dv.setUint32(32, 4, true);
  tiff[36] = 2; tiff[37] = 3; tiff[38] = 0; tiff[39] = 0;
  dv.setUint32(40, 0, true); // next IFD

  const exifBody = Buffer.concat([Buffer.from("Exif\0\0", "ascii"), Buffer.from(tiff)]);
  const seg = Buffer.alloc(4);
  seg[0] = 0xff; seg[1] = 0xe1;
  seg.writeUInt16BE(exifBody.length + 2, 2);

  const out = Buffer.concat([src.subarray(0, 2), seg, exifBody, src.subarray(2)]);
  console.log("exif:");
  write("exif-gps.jpg", out);
}

// ---------- 깨진/비정상 파일 ----------
function makeBroken() {
  console.log("broken:");
  write("broken.jpg", Buffer.from("this is not an image at all — floor05 QA fixture"));
  const valid = fs.readFileSync(path.join(OUT, "photo-1200x900.jpg"));
  write("truncated.jpg", valid.subarray(0, Math.floor(valid.length / 2)));
  write("not-image.txt", Buffer.from("plain text file for negative tests"));
  write("broken.pdf", Buffer.from("%PDF-1.4 broken broken broken"));
}

// ---------- PDF ----------
async function makePdfs() {
  console.log("pdfs:");
  // A4 1페이지
  {
    const doc = await PDFDocument.create();
    const font = await doc.embedFont(StandardFonts.Helvetica);
    const p = doc.addPage([595.28, 841.89]);
    p.drawText("floor05 QA fixture: A4 single page", { x: 50, y: 780, size: 18, font });
    p.drawRectangle({ x: 50, y: 300, width: 200, height: 120, color: rgb(0.77, 0.36, 0.17) });
    write("a4-1p.pdf", Buffer.from(await doc.save()));
  }
  // Letter 3페이지
  {
    const doc = await PDFDocument.create();
    const font = await doc.embedFont(StandardFonts.Helvetica);
    for (let i = 1; i <= 3; i++) {
      const p = doc.addPage([612, 792]);
      p.drawText(`Letter page ${i} of 3`, { x: 50, y: 700, size: 24, font });
    }
    write("letter-3p.pdf", Buffer.from(await doc.save()));
  }
  // 서로 다른 페이지 크기 2페이지 (A4 세로 + A5 가로)
  {
    const doc = await PDFDocument.create();
    const font = await doc.embedFont(StandardFonts.Helvetica);
    const p1 = doc.addPage([595.28, 841.89]);
    p1.drawText("mixed sizes: A4 portrait", { x: 40, y: 790, size: 16, font });
    const p2 = doc.addPage([595.28, 419.53]);
    p2.drawText("mixed sizes: A5 landscape", { x: 40, y: 380, size: 16, font });
    write("mixed-2p.pdf", Buffer.from(await doc.save()));
  }
}

await makeImages();
makeExifJpeg();
makeBroken();
await makePdfs();
console.log("done.");
