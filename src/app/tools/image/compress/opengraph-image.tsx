import { generateOgImage } from "@/lib/common/og-image";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "이미지 압축 - floor05";

export default async function Image() {
  return generateOgImage({
    title: "이미지 압축",
    description: "서버 전송 없이 브라우저에서 바로",
  });
}
