import { generateOgImage } from "@/lib/common/og-image";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "이미지 크롭 - floor05";

export default async function Image() {
  return generateOgImage({
    title: "이미지 크롭",
    description: "원하는 부분만 깔끔하게",
  });
}
