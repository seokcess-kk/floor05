import type { Metadata } from "next";
import ToolLayout from "@/components/common/ToolLayout";
import ConvertTool from "@/components/image/ConvertTool";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://floor05.com";
const PAGE_URL = `${SITE_URL}/tools/image/convert`;

export const metadata: Metadata = {
  title: "이미지 포맷 변환 - PNG, JPG, WebP 자유자재로",
  description:
    "PNG를 JPG로, HEIC를 JPG로, WebP로. 아이폰 사진도 브라우저에서 바로 변환. 파일이 서버로 전송되지 않습니다.",
  keywords: ["이미지 변환", "PNG JPG 변환", "WebP 변환", "HEIC JPG 변환", "포맷 변환"],
  openGraph: {
    title: "이미지 포맷 변환 - PNG, JPG, WebP 자유자재로",
    description: "PNG를 JPG로, HEIC를 JPG로. 브라우저에서 바로 변환.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "이미지 포맷 변환 - PNG, JPG, WebP 자유자재로",
    description: "PNG를 JPG로, HEIC를 JPG로. 브라우저에서 바로 변환.",
  },
  alternates: {
    canonical: PAGE_URL,
  },
};

const faqs = [
  {
    question: "아이폰에서 찍은 HEIC 사진도 변환할 수 있나요?",
    answer:
      "네, HEIC/HEIF 파일을 JPG, PNG, WebP로 변환할 수 있습니다. 변환은 100% 브라우저에서 이루어지므로 사진이 서버로 전송되지 않습니다.",
  },
  {
    question: "PNG의 투명 배경은 어떻게 처리되나요?",
    answer:
      "PNG를 JPG로 변환할 때 투명한 부분은 선택한 배경색(흰색, 검정, 회색)으로 채워집니다. PNG로 변환할 경우 투명도가 유지됩니다.",
  },
  {
    question: "WebP란 무엇인가요?",
    answer:
      "WebP는 구글에서 개발한 이미지 포맷으로, JPG보다 25~35% 더 작은 용량에 비슷한 품질을 제공합니다. 대부분의 최신 브라우저에서 지원됩니다.",
  },
  {
    question: "변환 후 이미지 품질이 떨어지나요?",
    answer:
      "품질 설정에 따라 달라집니다. 90% 이상의 품질을 선택하면 육안으로 구분하기 어려운 수준입니다. PNG는 무손실 포맷이므로 품질 저하가 없습니다.",
  },
];

const workflowCTA = {
  message: "포맷 변환 끝났나요? 이런 작업도 할 수 있어요.",
  tools: [
    {
      name: "이미지 압축",
      href: "/tools/image/compress",
      description: "용량도 줄여보세요",
    },
    {
      name: "이미지 리사이즈",
      href: "/tools/image/resize",
      description: "크기도 조절해보세요",
    },
    {
      name: "이미지 크롭",
      href: "/tools/image/crop",
      description: "원하는 부분만 자르기",
    },
  ],
};

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "이미지 포맷 변환 도구",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
    description: "PNG, JPG, WebP, HEIC 포맷 변환. 무제한 무료.",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  },
];

export default function ConvertPage() {
  return (
    <ToolLayout
      title="이미지 포맷 변환"
      description="PNG, JPG, WebP, HEIC 자유자재로. 아이폰 사진도 브라우저에서 바로."
      faqs={faqs}
      workflowCTA={workflowCTA}
      currentToolHref="/tools/image/convert"
      schemas={schemas}
    >
      <ConvertTool />
    </ToolLayout>
  );
}
