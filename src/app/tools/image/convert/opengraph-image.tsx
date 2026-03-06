import { generateOgImage } from "@/lib/common/og-image";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "이미지 포맷 변환 - floor05";

export default async function Image() {
  return generateOgImage({
    title: "이미지 포맷 변환",
    description: "PNG, JPG, WebP 자유자재로",
  });
}
