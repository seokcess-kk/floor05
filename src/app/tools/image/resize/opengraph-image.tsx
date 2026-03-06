import { generateOgImage } from "@/lib/common/og-image";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "이미지 리사이즈 - floor05";

export default async function Image() {
  return generateOgImage({
    title: "이미지 리사이즈",
    description: "SNS 프리셋으로 한 번에",
  });
}
