import type { Metadata } from "next";
import ToolLayout from "@/components/common/ToolLayout";
import ColorPickerTool from "@/components/image/ColorPickerTool";
import { SITE_URL } from "@/lib/common/constants";

const PAGE_URL = `${SITE_URL}/tools/image/color-picker`;

export const metadata: Metadata = {
  title: "이미지 색상 추출 - 사진에서 HEX 코드 뽑기",
  description:
    "사진을 클릭해 그 지점의 색을 추출하고, 이미지의 대표 색 팔레트와 HEX 코드를 뽑습니다. 클릭 한 번으로 복사까지. 서버 전송 없이 브라우저에서, 회원가입 없이 무료입니다.",
  keywords: [
    "이미지 색상 추출",
    "사진 색상 코드",
    "스포이드",
    "hex 추출",
    "이미지 컬러 추출",
    "사진 색 추출",
    "컬러 팔레트 추출",
  ],
  openGraph: {
    title: "이미지 색상 추출 - 사진에서 HEX 코드 뽑기",
    description: "클릭한 지점의 색과 대표 팔레트를 HEX로. 서버 전송 없음.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "이미지 색상 추출 - 사진에서 HEX 코드 뽑기",
    description: "사진을 클릭해 색을 추출하고 대표 팔레트를 뽑기.",
  },
  alternates: { canonical: PAGE_URL },
};

const guide = {
  intro:
    "마음에 드는 색이 담긴 사진에서 그 색의 코드를 알고 싶을 때가 있습니다. 이 도구는 사진을 클릭하면 그 지점의 색을 HEX·RGB로 알려주고, 이미지 전체의 대표 색 팔레트도 함께 뽑아줍니다.",
  sections: [
    {
      heading: "색 추출과 팔레트",
      paragraphs: [
        "사진을 올리면 자동으로 대표 색 6가지를 팔레트로 보여줍니다. 이미지에서 가장 많이 쓰인 색들이라, 디자인의 색 조합을 참고하기 좋습니다. 팔레트의 색을 누르면 HEX 코드가 복사됩니다.",
        "특정 지점의 색이 궁금하면 사진의 그 부분을 클릭하세요. 클릭한 픽셀의 정확한 색이 HEX와 RGB로 표시되고, 복사 버튼으로 바로 가져올 수 있습니다. 추출한 코드는 색상 변환 도구에서 다른 형식으로 바꿀 수도 있습니다.",
      ],
    },
  ],
};

const faqs = [
  {
    question: "사진에서 특정 색의 코드를 어떻게 아나요?",
    answer:
      "사진의 원하는 지점을 클릭하면 그 픽셀의 색이 HEX와 RGB로 표시됩니다. 복사 버튼으로 바로 가져올 수 있습니다.",
  },
  {
    question: "대표 색 팔레트는 어떻게 만들어지나요?",
    answer:
      "이미지에서 가장 많이 쓰인 색을 빈도순으로 묶어 6가지를 보여줍니다. 디자인 색 조합 참고에 좋습니다.",
  },
  {
    question: "추출한 색을 다른 형식으로 바꿀 수 있나요?",
    answer:
      "HEX 코드를 복사해 색상 코드 변환 도구에 넣으면 RGB·HSL·CMYK로 바꿀 수 있습니다.",
  },
  {
    question: "사진이 서버에 올라가나요?",
    answer:
      "아니요. 모든 처리는 브라우저 안에서 이루어지며 사진이 서버로 전송되거나 저장되지 않습니다.",
  },
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "이미지 색상 추출",
    applicationCategory: "DesignApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
    description: "사진을 클릭해 색을 추출하고 대표 색 팔레트와 HEX 코드를 뽑는 무료 도구. 서버 전송 없이 브라우저에서 처리.",
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

export default function ColorPickerPage() {
  return (
    <ToolLayout
      title="이미지 색상 추출"
      description="사진을 클릭해 색을. 대표 색 팔레트와 HEX 코드까지, 클릭 한 번 복사."
      guide={guide}
      faqs={faqs}
      currentToolHref="/tools/image/color-picker"
      relatedPostSlugs={["color-code-guide"]}
      schemas={schemas}
    >
      <ColorPickerTool />
    </ToolLayout>
  );
}
