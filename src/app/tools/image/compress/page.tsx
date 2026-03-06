import type { Metadata } from "next";
import ToolLayout from "@/components/common/ToolLayout";
import CompressTool from "@/components/image/CompressTool";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://floor05.com";
const PAGE_URL = `${SITE_URL}/tools/image/compress`;

export const metadata: Metadata = {
  title: "이미지 압축 - 서버 전송 없이 브라우저에서 바로",
  description:
    "파일이 내 기기를 떠나지 않습니다. 회원가입 없이 무제한 무료. 목표 용량 설정, 일괄 압축, Before/After 비교까지.",
  keywords: ["이미지 압축", "사진 용량 줄이기", "JPG 압축", "PNG 압축", "무료 이미지 압축"],
  openGraph: {
    title: "이미지 압축 - 서버 전송 없이 브라우저에서 바로",
    description: "파일이 내 기기를 떠나지 않습니다. 회원가입 없이 무제한 무료.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "이미지 압축 - 서버 전송 없이 브라우저에서 바로",
    description: "파일이 내 기기를 떠나지 않습니다. 회원가입 없이 무제한 무료.",
  },
  alternates: {
    canonical: PAGE_URL,
  },
};

const faqs = [
  {
    question: "파일이 서버로 전송되나요?",
    answer:
      "아니요, 모든 이미지 처리는 100% 브라우저에서 이루어집니다. 파일이 서버로 전송되지 않아 개인정보가 완벽하게 보호됩니다.",
  },
  {
    question: "한 번에 몇 장까지 압축할 수 있나요?",
    answer:
      "데스크톱에서는 최대 10장, 모바일에서는 최대 5장까지 동시에 압축할 수 있습니다. 파일당 최대 50MB까지 지원합니다.",
  },
  {
    question: "목표 용량 설정은 어떻게 작동하나요?",
    answer:
      "목표 용량을 설정하면 자동으로 최적의 품질을 찾아 해당 용량 이하로 압축합니다. 증명사진이나 지원서 제출 시 용량 제한이 있을 때 유용합니다.",
  },
  {
    question: "어떤 이미지 형식을 지원하나요?",
    answer:
      "JPG, PNG, WebP 형식의 이미지를 압축할 수 있습니다. 압축된 이미지는 JPG 형식으로 저장됩니다.",
  },
];

const workflowCTA = {
  message: "압축 끝났나요? 이런 작업도 할 수 있어요.",
  tools: [
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
    {
      name: "이미지 크롭",
      href: "/tools/image/crop",
      description: "원하는 부분만 자르기",
    },
  ],
};

// Schema.org Markup
const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "이미지 압축 도구",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "KRW",
    },
    description: "서버 전송 없이 브라우저에서 바로 이미지 압축. 무제한 무료.",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "이미지 압축하는 방법",
    step: [
      {
        "@type": "HowToStep",
        name: "이미지 업로드",
        text: "압축할 이미지를 드래그앤드롭하거나 클릭해서 선택합니다.",
      },
      {
        "@type": "HowToStep",
        name: "압축 옵션 설정",
        text: "품질 슬라이더로 압축률을 조절하거나 목표 용량을 설정합니다.",
      },
      {
        "@type": "HowToStep",
        name: "압축 실행",
        text: "압축 버튼을 클릭하면 브라우저에서 바로 압축됩니다.",
      },
      {
        "@type": "HowToStep",
        name: "다운로드",
        text: "압축된 이미지를 다운로드합니다. 여러 장일 경우 ZIP으로 받을 수 있습니다.",
      },
    ],
  },
];

export default function CompressPage() {
  return (
    <ToolLayout
      title="이미지 압축"
      description="서버 전송 없이 브라우저에서 바로. 목표 용량 설정, 일괄 압축까지."
      faqs={faqs}
      workflowCTA={workflowCTA}
      currentToolHref="/tools/image/compress"
      schemas={schemas}
    >
      <CompressTool />
    </ToolLayout>
  );
}
