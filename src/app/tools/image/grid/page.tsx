import type { Metadata } from "next";
import ToolLayout from "@/components/common/ToolLayout";
import GridTool from "@/components/image/GridTool";
import { SITE_URL } from "@/lib/common/constants";

const PAGE_URL = `${SITE_URL}/tools/image/grid`;

export const metadata: Metadata = {
  title: "인스타 9분할 - 사진 3×3 그리드 나누기",
  description:
    "한 장의 사진을 3×3 등으로 나눠 ZIP으로 받습니다. 인스타그램 그리드 피드 만들기. 서버 전송 없이 브라우저에서 바로, 회원가입 없이 무료입니다.",
  keywords: [
    "인스타 9분할",
    "인스타그램 그리드",
    "사진 분할",
    "이미지 분할",
    "9분할 사진",
    "인스타 피드 그리드",
    "사진 3x3 나누기",
  ],
  openGraph: {
    title: "인스타 9분할 - 사진 3×3 그리드 나누기",
    description: "한 장을 3×3으로 나눠 ZIP으로. 인스타 그리드 피드 만들기.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "인스타 9분할 - 사진 3×3 그리드 나누기",
    description: "한 장을 3×3으로 나눠 ZIP으로 다운로드.",
  },
  alternates: { canonical: PAGE_URL },
};

const guide = {
  intro:
    "인스타그램 프로필을 큰 사진 하나처럼 꾸미려면, 한 장을 여러 칸으로 나눠 순서대로 올려야 합니다. 이 도구는 사진을 3×3 등으로 잘라 ZIP으로 한 번에 받게 해줍니다.",
  sections: [
    {
      heading: "인스타 9분할 만드는 법",
      paragraphs: [
        "사진을 올리고 '3×3 (인스타 9분할)'을 고르면, 정사각형으로 중앙을 잘라 9칸으로 나눕니다. 분할된 이미지는 왼쪽 위부터 번호 순서로 ZIP에 담깁니다. 인스타그램에는 번호 순서대로 올리면 프로필에서 한 장처럼 이어집니다.",
        "가로 3분할, 세로 3분할, 2×2도 지원합니다. 파노라마 사진을 가로로 나눠 올리거나, 긴 이미지를 세로로 쪼갤 때도 쓸 수 있습니다.",
      ],
    },
  ],
};

const faqs = [
  {
    question: "인스타 9분할은 어떻게 올리나요?",
    answer:
      "ZIP 안의 이미지를 번호 순서(왼쪽 위부터)대로 인스타그램에 올리면 프로필 그리드에서 한 장처럼 이어집니다.",
  },
  {
    question: "정사각형으로 잘리나요?",
    answer:
      "3×3과 2×2는 정사각형으로 중앙을 잘라 각 칸이 정사각형이 되게 합니다. 가로·세로 3분할은 원본 비율을 유지합니다.",
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
    name: "인스타 9분할",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
    description: "한 장의 사진을 3×3 등으로 나눠 ZIP으로 받는 무료 도구. 서버 전송 없이 브라우저에서 처리.",
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

export default function GridPage() {
  return (
    <ToolLayout
      title="인스타 9분할"
      description="한 장을 3×3으로 나눠 ZIP으로. 인스타 그리드 피드 만들기."
      guide={guide}
      faqs={faqs}
      currentToolHref="/tools/image/grid"
      relatedPostSlugs={["instagram-image-size", "image-crop-guide"]}
      schemas={schemas}
    >
      <GridTool />
    </ToolLayout>
  );
}
