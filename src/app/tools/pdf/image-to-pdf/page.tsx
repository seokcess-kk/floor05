import type { Metadata } from "next";
import ToolLayout from "@/components/common/ToolLayout";
import ImageToPdfTool from "@/components/pdf/ImageToPdfTool";
import { SITE_URL } from "@/lib/common/constants";

const PAGE_URL = `${SITE_URL}/tools/pdf/image-to-pdf`;

export const metadata: Metadata = {
  title: "이미지 PDF 변환 - 여러 사진을 한 PDF로",
  description:
    "JPG·PNG 여러 장을 한 PDF로 묶습니다. 순서 조정, A4·여백 옵션까지. 파일을 서버에 올리지 않고 브라우저에서 바로. 회원가입 없이 무료입니다.",
  keywords: [
    "이미지 pdf 변환",
    "jpg pdf 변환",
    "사진 pdf 만들기",
    "이미지 합쳐 pdf",
    "png pdf 변환",
    "여러 사진 pdf",
    "사진 pdf 변환",
  ],
  openGraph: {
    title: "이미지 PDF 변환 - 여러 사진을 한 PDF로",
    description: "JPG·PNG 여러 장을 순서대로 한 PDF로. A4·여백 옵션, 서버 전송 없음.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "이미지 PDF 변환 - 여러 사진을 한 PDF로",
    description: "JPG·PNG 여러 장을 한 PDF로. 서버 전송 없이 브라우저에서.",
  },
  alternates: { canonical: PAGE_URL },
};

const guide = {
  intro:
    "과제, 서류, 계약서 사진을 한 파일로 제출해야 할 때 PDF가 가장 무난합니다. 이 도구는 여러 장의 사진을 업로드해 순서를 정하고, 한 개의 PDF로 묶어줍니다. 파일은 서버로 전송되지 않고 브라우저 안에서 변환됩니다.",
  sections: [
    {
      heading: "여러 사진을 한 PDF로 묶는 법",
      paragraphs: [
        "사진을 드래그하거나 클릭해 올린 뒤, 위·아래 화살표로 순서를 맞추고 'PDF로 변환'을 누르면 됩니다. 각 사진이 순서대로 한 페이지씩 들어갑니다. 스캔 앱 없이 휴대폰으로 찍은 서류 사진을 그대로 PDF로 만들 때 편합니다.",
      ],
      bullets: [
        "용지 '이미지 맞춤': 사진 비율 그대로 페이지가 만들어집니다.",
        "용지 'A4'·'Letter': 규격 용지에 사진을 비율 유지하며 배치합니다.",
        "여백: 인쇄를 염두에 둔다면 '좁게'나 '넓게'로 가장자리 여백을 줍니다.",
      ],
    },
    {
      heading: "왜 서버에 안 올리는 게 중요한가",
      paragraphs: [
        "신분증, 통장 사본, 계약서처럼 민감한 서류를 PDF로 만들 일이 많습니다. 대부분의 온라인 변환 사이트는 이런 파일을 서버에 업로드해 처리하지만, 이 도구는 변환을 전부 브라우저 안에서 끝냅니다. 사진이 외부로 전송되지 않으니, 민감한 서류도 안심하고 다룰 수 있습니다.",
        "JPG와 PNG, WebP를 지원하며, 사진이 세로로 찍혔다면 회전 정보를 반영해 바로 세워 넣습니다. 변환된 PDF는 기기에 바로 저장됩니다.",
      ],
    },
  ],
};

const faqs = [
  {
    question: "여러 장의 사진을 한 PDF로 만들 수 있나요?",
    answer:
      "네. 사진을 여러 장 올리고 순서를 맞춘 뒤 변환하면 각 사진이 한 페이지씩 들어간 PDF 한 개가 만들어집니다.",
  },
  {
    question: "사진 순서를 바꿀 수 있나요?",
    answer:
      "목록의 위·아래 화살표로 순서를 조정할 수 있습니다. 위에서 아래 순서대로 PDF 페이지가 됩니다.",
  },
  {
    question: "사진이 서버에 올라가나요?",
    answer:
      "아니요. 변환은 100% 브라우저 안에서 이루어지며 사진이 서버로 전송되거나 저장되지 않습니다. 신분증·계약서 같은 민감한 서류도 안전합니다.",
  },
  {
    question: "어떤 이미지 형식을 지원하나요?",
    answer:
      "JPG, PNG, WebP를 지원합니다. 아이폰 HEIC 사진은 포맷 변환 도구로 JPG로 바꾼 뒤 사용하세요.",
  },
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "이미지 PDF 변환",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
    description: "JPG·PNG 여러 장을 한 PDF로 묶는 무료 도구. 서버 전송 없이 브라우저에서 처리.",
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

export default function ImageToPdfPage() {
  return (
    <ToolLayout
      title="이미지 PDF 변환"
      description="여러 사진을 한 PDF로. 순서·용지·여백까지, 서버 전송 없이."
      guide={guide}
      faqs={faqs}
      currentToolHref="/tools/pdf/image-to-pdf"
      relatedPostSlugs={["image-to-pdf-guide"]}
      schemas={schemas}
    >
      <ImageToPdfTool />
    </ToolLayout>
  );
}
