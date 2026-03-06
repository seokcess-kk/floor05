import type { Metadata } from "next";
import ToolLayout from "@/components/common/ToolLayout";
import CropTool from "@/components/image/CropTool";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://floor05.com";
const PAGE_URL = `${SITE_URL}/tools/image/crop`;

export const metadata: Metadata = {
  title: "이미지 크롭 - 원하는 부분만 깔끔하게",
  description:
    "드래그로 간편하게 사진 자르기. 1:1, 4:3, 16:9 비율 프리셋 지원. 파일이 서버로 전송되지 않습니다.",
  keywords: ["이미지 크롭", "사진 자르기", "이미지 자르기", "사진 편집", "1:1 크롭"],
  openGraph: {
    title: "이미지 크롭 - 원하는 부분만 깔끔하게",
    description: "드래그로 간편하게 사진 자르기. 비율 프리셋 지원.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "이미지 크롭 - 원하는 부분만 깔끔하게",
    description: "드래그로 간편하게 사진 자르기. 비율 프리셋 지원.",
  },
  alternates: {
    canonical: PAGE_URL,
  },
};

const faqs = [
  {
    question: "비율을 고정하고 자를 수 있나요?",
    answer:
      "네, 1:1(정방형), 4:3(일반 사진), 16:9(와이드스크린) 등의 비율 프리셋을 선택하면 해당 비율로 고정됩니다. '자유' 옵션을 선택하면 원하는 대로 자유롭게 선택할 수 있습니다.",
  },
  {
    question: "회전이나 반전도 가능한가요?",
    answer:
      "네, 90도 단위로 좌우 회전과 상하/좌우 반전이 가능합니다. 회전과 반전 후 원하는 영역을 선택해서 크롭할 수 있습니다.",
  },
  {
    question: "크롭한 이미지의 품질이 떨어지나요?",
    answer:
      "아니요, 원본 해상도 그대로 크롭됩니다. 선택한 영역의 픽셀을 그대로 추출하므로 품질 저하가 없습니다.",
  },
  {
    question: "여러 장을 한 번에 크롭할 수 있나요?",
    answer:
      "현재는 한 장씩 크롭할 수 있습니다. 같은 크기로 여러 장을 자르고 싶다면 리사이즈 도구의 SNS 프리셋을 활용해보세요.",
  },
];

const workflowCTA = {
  message: "크롭 끝났나요? 이런 작업도 할 수 있어요.",
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
      name: "포맷 변환",
      href: "/tools/image/convert",
      description: "PNG, WebP로 변환",
    },
  ],
};

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "이미지 크롭 도구",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
    description: "드래그로 간편하게 사진 자르기. 무제한 무료.",
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

export default function CropPage() {
  return (
    <ToolLayout
      title="이미지 크롭"
      description="원하는 부분만 깔끔하게. 드래그로 간편하게 자르기."
      faqs={faqs}
      workflowCTA={workflowCTA}
      currentToolHref="/tools/image/crop"
      schemas={schemas}
    >
      <CropTool />
    </ToolLayout>
  );
}
