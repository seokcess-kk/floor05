import type { Metadata } from "next";
import ToolLayout from "@/components/common/ToolLayout";
import RotateTool from "@/components/image/RotateTool";
import { SITE_URL } from "@/lib/common/constants";

const PAGE_URL = `${SITE_URL}/tools/image/rotate`;

export const metadata: Metadata = {
  title: "사진 회전·반전 - 세로로 찍힌 사진 바로잡기",
  description:
    "사진을 90도씩 회전하거나 좌우·상하로 뒤집습니다. 세로로 찍혀 돌아간 사진을 바로 세우기. 서버 전송 없이 브라우저에서 바로, 회원가입 없이 무료입니다.",
  keywords: [
    "사진 회전",
    "이미지 회전",
    "사진 좌우반전",
    "사진 돌리기",
    "이미지 뒤집기",
    "사진 방향 바꾸기",
    "세로 사진 회전",
  ],
  openGraph: {
    title: "사진 회전·반전 - 세로로 찍힌 사진 바로잡기",
    description: "90도 회전·좌우/상하 반전. 서버 전송 없이 브라우저에서.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "사진 회전·반전 - 세로로 찍힌 사진 바로잡기",
    description: "90도 회전·좌우/상하 반전을 브라우저에서 바로.",
  },
  alternates: { canonical: PAGE_URL },
};

const guide = {
  intro:
    "휴대폰으로 찍은 사진이 옆으로 누워 있거나, 거울처럼 좌우가 바뀌어야 할 때가 있습니다. 이 도구는 사진을 90도씩 회전하거나 좌우·상하로 뒤집어 바로잡습니다. 별도 프로그램 없이 브라우저에서 처리합니다.",
  sections: [
    {
      heading: "회전과 반전, 무엇이 다른가",
      paragraphs: [
        "회전은 사진을 시계 방향·반시계 방향으로 90도씩 돌리는 것이고, 반전은 거울처럼 좌우 또는 상하를 뒤집는 것입니다. 세로로 찍혀 돌아간 사진은 회전으로, 셀카처럼 좌우가 반대인 사진은 좌우 반전으로 바로잡습니다.",
        "이 도구는 사진을 불러올 때 촬영 방향(EXIF) 정보를 반영해 한 번 바로 세운 뒤, 거기서 추가로 회전·반전할 수 있게 합니다. 결과는 원본 화질 그대로 저장됩니다.",
      ],
    },
  ],
};

const faqs = [
  {
    question: "세로로 찍힌 사진을 어떻게 세우나요?",
    answer: "'왼쪽 90°' 또는 '오른쪽 90°' 버튼으로 사진을 바로 세운 뒤 다운로드하면 됩니다.",
  },
  {
    question: "좌우 반전은 언제 쓰나요?",
    answer:
      "셀카처럼 좌우가 거울처럼 뒤집힌 사진이나, 방향을 바꿔야 하는 이미지에 씁니다. '좌우 반전' 버튼을 누르면 됩니다.",
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
    name: "사진 회전·반전",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
    description: "사진을 90도 회전하거나 좌우·상하로 반전하는 무료 도구. 서버 전송 없이 브라우저에서 처리.",
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

export default function RotatePage() {
  return (
    <ToolLayout
      title="사진 회전·반전"
      description="세로로 찍힌 사진을 바로. 90도 회전·좌우/상하 반전, 서버 전송 없이."
      guide={guide}
      faqs={faqs}
      currentToolHref="/tools/image/rotate"
      relatedPostSlugs={["photo-editing-without-photoshop", "image-crop-guide"]}
      schemas={schemas}
    >
      <RotateTool />
    </ToolLayout>
  );
}
