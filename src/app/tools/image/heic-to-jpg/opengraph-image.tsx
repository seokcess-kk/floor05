import { generateOgImage } from "@/lib/common/og-image";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "HEIC → JPG 변환 - floor05";

export default async function Image() {
  return generateOgImage({
    title: "HEIC → JPG 변환",
    description: "아이폰 사진을 브라우저에서 바로",
  });
}
