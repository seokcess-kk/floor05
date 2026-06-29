import type { Metadata } from "next";
import ToolLayout from "@/components/common/ToolLayout";
import PdfMergeTool from "@/components/pdf/PdfMergeTool";
import { SITE_URL } from "@/lib/common/constants";

const PAGE_URL = `${SITE_URL}/tools/pdf/merge`;

export const metadata: Metadata = {
  title: "PDF 합치기 - 여러 PDF를 하나로 병합",
  description:
    "여러 개의 PDF 파일을 하나로 합칩니다. 순서를 바꿔가며 병합하고, 파일은 서버에 올리지 않고 브라우저에서 바로. 회원가입 없이 무료입니다.",
  keywords: [
    "pdf 합치기",
    "pdf 병합",
    "pdf 하나로",
    "pdf 합치기 무료",
    "여러 pdf 합치기",
    "pdf 파일 합치기",
    "pdf merge",
  ],
  openGraph: {
    title: "PDF 합치기 - 여러 PDF를 하나로 병합",
    description: "여러 PDF를 순서대로 하나로. 서버 전송 없이 브라우저에서.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF 합치기 - 여러 PDF를 하나로 병합",
    description: "여러 PDF를 순서대로 하나로 합치기. 서버 전송 없음.",
  },
  alternates: { canonical: PAGE_URL },
};

const guide = {
  intro:
    "흩어진 PDF를 하나로 모아야 할 때가 있습니다. 견적서와 계약서, 여러 장으로 스캔된 서류, 각각 받은 증빙 자료를 한 파일로 제출할 때죠. 이 도구는 여러 PDF를 올려 순서를 정하고 한 파일로 병합합니다. 파일은 서버로 전송되지 않습니다.",
  sections: [
    {
      heading: "PDF를 순서대로 합치기",
      paragraphs: [
        "합칠 PDF들을 올리면 각 파일의 페이지 수가 표시됩니다. 위·아래 화살표로 순서를 맞춘 뒤 '합치기'를 누르면, 위에서 아래 순서로 모든 페이지가 이어진 하나의 PDF가 만들어집니다.",
        "여러 번에 걸쳐 스캔한 서류나, 사람마다 따로 받은 PDF를 하나로 묶어 제출할 때 유용합니다. 파일 개수에 제한을 두지 않았습니다(한 번에 최대 20개).",
      ],
    },
    {
      heading: "서버에 올리지 않는 PDF 병합",
      paragraphs: [
        "PDF에는 계약 내용, 개인정보, 회사 기밀이 담기기 쉽습니다. 이 도구는 병합을 전부 브라우저 안에서 처리하므로, 파일이 외부 서버로 전송되지 않습니다. 인터넷이 잠깐 끊겨도 작업이 이어지는 이유가 여기 있습니다.",
        "암호가 걸린 PDF는 암호를 먼저 풀어야 합칠 수 있습니다. 합쳐진 PDF는 기기에 바로 저장됩니다.",
      ],
    },
  ],
};

const faqs = [
  {
    question: "PDF를 몇 개까지 합칠 수 있나요?",
    answer: "한 번에 최대 20개까지 올려 하나로 합칠 수 있습니다. 위에서 아래 순서대로 병합됩니다.",
  },
  {
    question: "합치는 순서를 바꿀 수 있나요?",
    answer: "네. 목록의 위·아래 화살표로 순서를 조정한 뒤 합치면 그 순서대로 페이지가 이어집니다.",
  },
  {
    question: "파일이 서버에 올라가나요?",
    answer:
      "아니요. 병합은 100% 브라우저 안에서 이루어지며 파일이 서버로 전송되거나 저장되지 않습니다.",
  },
  {
    question: "암호가 걸린 PDF도 합칠 수 있나요?",
    answer:
      "암호가 걸린 PDF는 먼저 암호를 푼 뒤 올려야 합칠 수 있습니다. 읽을 수 없는 파일은 목록에 '읽을 수 없음'으로 표시됩니다.",
  },
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "PDF 합치기",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
    description: "여러 PDF를 순서대로 하나로 병합하는 무료 도구. 서버 전송 없이 브라우저에서 처리.",
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

export default function PdfMergePage() {
  return (
    <ToolLayout
      title="PDF 합치기"
      description="여러 PDF를 순서대로 하나로. 서버에 올리지 않고 브라우저에서."
      guide={guide}
      faqs={faqs}
      currentToolHref="/tools/pdf/merge"
      relatedPostSlugs={["image-to-pdf-guide"]}
      schemas={schemas}
    >
      <PdfMergeTool />
    </ToolLayout>
  );
}
