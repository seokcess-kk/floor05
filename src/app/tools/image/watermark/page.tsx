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

const guide = {
  intro:
    "사진 워터마크는 내가 찍은 이미지에 출처나 소유를 표시해 무단 도용을 막는 가장 손쉬운 방법입니다. 이 도구는 텍스트나 로고를 사진 위에 올리고 위치·투명도·반복까지 조절해 합성하며, 모든 처리는 브라우저 안에서 끝나 파일이 서버로 전송되지 않습니다.",
  sections: [
    {
      heading: "왜 워터마크를 넣을까 — 도용 방지와 출처 표시",
      paragraphs: [
        "블로그·SNS·쇼핑몰에 올린 사진은 누구나 저장해 가져갈 수 있습니다. 워터마크는 이미지에 \"이건 내 것\"이라는 흔적을 남겨, 누군가 퍼가더라도 출처가 따라붙게 만듭니다. 완벽한 복제 방지는 아니지만, 도용을 번거롭게 만들고 원작자를 드러내는 효과가 분명합니다.",
        "상호나 닉네임, 저작권 기호(©), 인스타그램 아이디처럼 짧고 알아보기 쉬운 표시를 쓰는 것이 좋습니다. 사진을 본 사람이 출처를 바로 찾아올 수 있다면 워터마크가 홍보 역할까지 겸합니다.",
      ],
    },
    {
      heading: "텍스트 vs 로고, 어떤 걸 넣을까",
      paragraphs: [
        "이 도구는 텍스트 워터마크와 로고(이미지) 워터마크 두 가지를 지원합니다. 상황에 맞게 고르면 됩니다.",
      ],
      bullets: [
        "텍스트: 닉네임·상호·저작권 문구를 빠르게 넣을 때. 글자 크기, 색, 굵게 여부를 조절할 수 있어 별도 준비 없이 바로 적용됩니다.",
        "로고: 이미 만들어 둔 브랜드 마크가 있을 때. 배경이 투명한 PNG를 올리면 깔끔하게 얹히고, 로고 크기는 사진 너비 대비 %로 조절합니다.",
        "둘 다 넣고 싶다면 한 종류를 적용해 내려받은 뒤, 그 결과물을 다시 올려 다른 종류를 한 번 더 적용하면 됩니다.",
      ],
    },
    {
      heading: "투명도·위치·반복 설정 요령",
      paragraphs: [
        "워터마크는 눈에는 띄되 사진 자체를 가리지 않아야 합니다. 투명도는 30~50% 정도가 무난합니다. 너무 진하면 사진이 답답하고, 너무 옅으면 잘라내거나 덮어쓰기 쉬워 보호 효과가 약해집니다. 위치는 보통 오른쪽 아래 모서리에 두지만, 9개 위치 중 사진 구도에 맞춰 고르면 됩니다. 가장자리 여백과 회전 각도까지 미리보기를 보며 다듬을 수 있습니다.",
        "도용 방지가 가장 중요하다면 '전체 반복(타일)'을 켜세요. 워터마크가 사진 전면에 일정 간격으로 반복돼, 일부를 잘라내거나 한 곳을 지워도 나머지가 남기 때문에 제거가 훨씬 까다로워집니다. 투명도를 낮추고 살짝 회전시켜 반복하면 감상은 방해하지 않으면서 보호 강도는 높일 수 있습니다. 글자·로고·여백 크기는 모두 사진 크기에 비례한 %라, 작은 사진과 큰 사진을 함께 처리해도 비율이 일정하게 유지됩니다.",
        "사진 여러 장에 같은 워터마크를 입혀야 한다면 한꺼번에 올려 일괄 적용하고 ZIP으로 내려받을 수 있습니다(데스크톱 10장, 모바일 5장). 저장 포맷은 투명 유지가 필요하면 PNG, 용량을 줄이려면 JPG를 고르면 됩니다.",
      ],
    },
  ],
};

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
      guide={guide}
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
