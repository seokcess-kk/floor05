import type { Metadata } from "next";
import ToolLayout from "@/components/common/ToolLayout";
import MosaicTool from "@/components/image/MosaicTool";
import { SITE_URL } from "@/lib/common/constants";

const PAGE_URL = `${SITE_URL}/tools/image/mosaic`;

export const metadata: Metadata = {
  title: "사진 모자이크 - 얼굴·개인정보 가리기",
  description:
    "사진에서 얼굴, 차량 번호판, 주소 같은 개인정보를 드래그로 가립니다. 모자이크·블러 선택, 강도 조절. 서버 전송 없이 브라우저에서 바로, 회원가입 없이 무료입니다.",
  keywords: [
    "사진 모자이크",
    "얼굴 모자이크",
    "모자이크 처리",
    "사진 가리기",
    "개인정보 가리기",
    "이미지 블러",
    "번호판 가리기",
  ],
  openGraph: {
    title: "사진 모자이크 - 얼굴·개인정보 가리기",
    description: "드래그로 얼굴·번호판·주소를 모자이크·블러 처리. 서버 전송 없음.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "사진 모자이크 - 얼굴·개인정보 가리기",
    description: "드래그로 개인정보를 모자이크·블러 처리. 서버 전송 없음.",
  },
  alternates: { canonical: PAGE_URL },
};

const guide = {
  intro:
    "중고거래 사진에 비친 얼굴, 택배 상자의 주소, 차량 번호판처럼 가리고 싶은 부분이 있을 때가 많습니다. 이 도구는 가릴 부분을 드래그하면 그 영역을 모자이크나 블러로 덮어줍니다. 가린 정보는 복원할 수 없게 사라집니다.",
  sections: [
    {
      heading: "모자이크와 블러, 어떻게 가릴까",
      paragraphs: [
        "가릴 부분을 마우스나 손가락으로 드래그하면 그 사각형 영역이 처리됩니다. 여러 곳을 차례로 드래그해 여러 부분을 가릴 수 있습니다. '강도'를 높일수록 더 거칠게(알아보기 어렵게) 가려집니다.",
        "모자이크는 네모난 격자로 뭉개고, 블러는 부드럽게 흐립니다. 신분증 번호나 얼굴처럼 확실히 가려야 한다면 강도를 충분히 높이세요. 한 번 가린 영역은 원본 픽셀이 사라져 되돌릴 수 없으므로, 개인정보 보호에 안전합니다.",
      ],
    },
    {
      heading: "서버에 올리지 않아 안전하다",
      paragraphs: [
        "가리려는 정보가 민감할수록, 그 사진을 외부 서버에 올리는 건 위험합니다. 이 도구는 처리를 전부 브라우저 안에서 끝내므로 사진이 서버로 전송되지 않습니다. 가린 사진만 기기에 저장됩니다.",
      ],
    },
  ],
};

const faqs = [
  {
    question: "얼굴이나 번호판을 어떻게 가리나요?",
    answer:
      "가릴 부분을 마우스나 손가락으로 드래그하면 그 영역이 모자이크 또는 블러로 가려집니다. 여러 곳을 차례로 드래그할 수 있습니다.",
  },
  {
    question: "가린 부분을 복원할 수 있나요?",
    answer:
      "아니요. 가린 영역은 원본 픽셀이 사라져 복원할 수 없습니다. 그래서 개인정보 보호에 안전합니다. 다만 가리기 전 원본은 따로 보관하세요.",
  },
  {
    question: "모자이크와 블러 중 뭐가 더 안전한가요?",
    answer:
      "둘 다 강도를 충분히 높이면 알아보기 어렵습니다. 확실히 가리려면 강도를 높게 설정하세요. 너무 약하면 형태가 비칠 수 있습니다.",
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
    name: "사진 모자이크",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
    description: "사진에서 얼굴·개인정보를 드래그로 모자이크·블러 처리하는 무료 도구. 서버 전송 없이 브라우저에서 처리.",
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

export default function MosaicPage() {
  return (
    <ToolLayout
      title="사진 모자이크"
      description="가릴 부분을 드래그하면 모자이크·블러로. 얼굴·번호판·개인정보를 안전하게."
      guide={guide}
      faqs={faqs}
      currentToolHref="/tools/image/mosaic"
      relatedPostSlugs={["photo-mosaic-guide", "browser-image-tools-privacy"]}
      schemas={schemas}
    >
      <MosaicTool />
    </ToolLayout>
  );
}
