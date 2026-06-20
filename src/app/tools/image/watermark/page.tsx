import type { Metadata } from "next";
import ToolLayout from "@/components/common/ToolLayout";
import WatermarkTool from "@/components/image/WatermarkTool";
import { SITE_URL } from "@/lib/common/constants";

const PAGE_URL = `${SITE_URL}/tools/image/watermark`;

export const metadata: Metadata = {
  title: "사진 워터마크 넣기 - 텍스트·로고를 브라우저에서 바로",
  description:
    "사진에 텍스트나 로고 워터마크를 넣으세요. 위치·투명도·반복까지 조절. 파일이 서버로 전송되지 않습니다. 여러 장 일괄, 회원가입 없이 무료.",
  keywords: [
    "워터마크 넣기",
    "사진 워터마크",
    "이미지 워터마크",
    "워터마크 만들기",
    "사진 로고 넣기",
    "워터마크 삽입",
    "이미지 저작권 표시",
  ],
  openGraph: {
    title: "사진 워터마크 넣기 - 텍스트·로고를 브라우저에서 바로",
    description: "사진에 텍스트·로고 워터마크를. 파일이 서버로 전송되지 않습니다.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "사진 워터마크 넣기 - 텍스트·로고를 브라우저에서 바로",
    description: "사진에 텍스트·로고 워터마크를. 파일이 서버로 전송되지 않습니다.",
  },
  alternates: {
    canonical: PAGE_URL,
  },
};

const faqs = [
  {
    question: "파일이 서버로 전송되나요?",
    answer:
      "아니요, 모든 처리는 100% 브라우저에서 이루어집니다. 워터마크를 넣는 사진과 로고가 서버로 전송되지 않아 안전합니다.",
  },
  {
    question: "텍스트와 로고 둘 다 넣을 수 있나요?",
    answer:
      "텍스트 워터마크와 로고(이미지) 워터마크를 선택할 수 있습니다. 텍스트는 글자·색·굵기를, 로고는 투명 PNG를 올려 크기를 조절합니다. 한 번에 한 종류씩 적용되며, 두 번 적용하면 둘 다 넣을 수 있습니다.",
  },
  {
    question: "여러 장에 같은 워터마크를 한 번에 넣을 수 있나요?",
    answer:
      "네. 여러 장을 올리면 같은 설정으로 일괄 적용되고, ZIP 파일로 한 번에 내려받을 수 있습니다. 데스크톱 최대 10장, 모바일 최대 5장까지 지원합니다.",
  },
  {
    question: "사진 도용을 막으려면 어떻게 하나요?",
    answer:
      "'전체 반복(도용 방지)'을 켜면 워터마크가 사진 전체에 반복돼 일부를 잘라내도 제거하기 어렵습니다. 투명도를 30~50%로 두고 약간 회전시키면 보기에 방해되지 않으면서 보호 효과가 큽니다.",
  },
  {
    question: "워터마크가 사진 크기에 따라 달라지나요?",
    answer:
      "글자·로고·여백 크기는 모두 사진 크기에 비례한 %로 적용됩니다. 그래서 작은 사진이든 큰 사진이든 일괄 적용해도 워터마크 비율이 일정하게 유지됩니다.",
  },
  {
    question: "투명한 로고는 어떤 포맷이 좋나요?",
    answer:
      "배경이 투명한 PNG를 권장합니다. 저장 포맷도 투명을 유지하려면 PNG로 두세요. 용량을 줄이려면 JPG로 저장할 수 있지만, 이 경우 투명 영역은 처리 방식에 따라 채워질 수 있습니다.",
  },
];

const workflowCTA = {
  message: "워터마크 다 넣었나요? 이런 작업도 할 수 있어요.",
  tools: [
    {
      name: "이미지 압축",
      href: "/tools/image/compress",
      description: "용량 줄이기",
    },
    {
      name: "이미지 리사이즈",
      href: "/tools/image/resize",
      description: "크기 조절하기",
    },
    {
      name: "사진 합치기",
      href: "/tools/image/merge",
      description: "여러 장 한 장으로",
    },
  ],
};

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "이미지 워터마크 도구",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "KRW",
    },
    description:
      "서버 전송 없이 브라우저에서 사진에 텍스트·로고 워터마크 넣기. 일괄 처리, 무제한 무료.",
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
    name: "사진에 워터마크 넣는 방법",
    step: [
      {
        "@type": "HowToStep",
        name: "이미지 업로드",
        text: "워터마크를 넣을 사진을 드래그앤드롭하거나 선택합니다. 여러 장도 가능합니다.",
      },
      {
        "@type": "HowToStep",
        name: "텍스트 또는 로고 선택",
        text: "텍스트를 입력하거나 로고 이미지를 올립니다.",
      },
      {
        "@type": "HowToStep",
        name: "위치·투명도 조절",
        text: "위치, 투명도, 회전, 전체 반복 여부를 미리보기를 보며 조절합니다.",
      },
      {
        "@type": "HowToStep",
        name: "적용·다운로드",
        text: "적용 버튼을 누르면 브라우저에서 바로 합성되고, 결과를 다운로드합니다.",
      },
    ],
  },
];

export default function WatermarkPage() {
  return (
    <ToolLayout
      title="사진 워터마크 넣기"
      description="텍스트·로고를 사진 위에. 위치·투명도·반복까지 브라우저에서 바로."
      faqs={faqs}
      workflowCTA={workflowCTA}
      currentToolHref="/tools/image/watermark"
      relatedPostSlugs={["image-watermark-guide", "browser-image-tools-privacy"]}
      schemas={schemas}
    >
      <WatermarkTool />
    </ToolLayout>
  );
}
