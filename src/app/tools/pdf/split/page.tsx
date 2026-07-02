import type { Metadata } from "next";
import ToolLayout from "@/components/common/ToolLayout";
import PdfSplitTool from "@/components/pdf/PdfSplitTool";
import { SITE_URL } from "@/lib/common/constants";

const PAGE_URL = `${SITE_URL}/tools/pdf/split`;

export const metadata: Metadata = {
  title: "PDF 분할 - 페이지 추출·낱장 나누기",
  description:
    "PDF에서 원하는 페이지만 추출하거나, 모든 페이지를 낱장으로 나눠 ZIP으로 받습니다. 계약서에서 한 페이지를 꺼내는 동안에도 문서는 기기 밖으로 나가지 않습니다. 가입도 결제도 없습니다.",
  keywords: [
    "pdf 분할",
    "pdf 나누기",
    "pdf 페이지 분리",
    "pdf 페이지 추출",
    "pdf 자르기",
    "pdf 페이지 나누기",
    "pdf split",
  ],
  openGraph: {
    title: "PDF 분할 - 페이지 추출·낱장 나누기",
    description: "원하는 페이지만 추출하거나 모든 페이지를 낱장으로. 문서는 기기 안에서만 나뉩니다.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF 분할 - 페이지 추출·낱장 나누기",
    description: "100페이지 PDF도 브라우저에서 바로 낱장으로.",
  },
  alternates: { canonical: PAGE_URL },
};

const guide = {
  intro:
    "PDF 전체가 아니라 일부 페이지만 필요할 때가 있습니다. 계약서에서 서명 페이지만, 자료집에서 특정 장만 떼어내고 싶을 때죠. 이 도구는 원하는 페이지만 뽑아 새 PDF로 만들거나, 모든 페이지를 낱장으로 나눠줍니다.",
  sections: [
    {
      heading: "페이지 추출과 낱장 분할",
      paragraphs: [
        "두 가지 방식이 있습니다. '페이지 추출'은 1-3, 5처럼 원하는 페이지를 입력하면 그 페이지들만 모아 새 PDF 한 개를 만듭니다. '낱장 전부 분할'은 모든 페이지를 1장짜리 PDF로 나눈 뒤 ZIP 한 개로 묶어 받습니다.",
      ],
      bullets: [
        "페이지 추출: '1-3, 5, 8-10' 처럼 쉼표로 여러 범위를 지정",
        "입력한 순서대로 새 PDF에 담깁니다",
        "낱장 분할: 100페이지 PDF면 100개 파일이 ZIP으로",
      ],
    },
    {
      heading: "서버에 올리지 않는 PDF 분할",
      paragraphs: [
        "서명 페이지 한 장이 필요하다고 계약서 전체를 외부 서버에 올리는 건 배보다 배꼽이 큰 일입니다. 이 도구는 문서를 브라우저 안에서 읽고 나누기 때문에 파일이 밖으로 나가지 않고, 업로드 대기가 없어 페이지가 많아도 금방 나뉩니다.",
        "암호가 걸린 PDF는 암호를 먼저 풀어야 합니다. 결과물은 기기에 바로 저장됩니다.",
      ],
    },
  ],
};

const faqs = [
  {
    question: "원하는 페이지만 뽑을 수 있나요?",
    answer:
      "네. '페이지 추출' 모드에서 1-3, 5처럼 입력하면 해당 페이지만 담은 새 PDF 한 개가 만들어집니다.",
  },
  {
    question: "모든 페이지를 낱장으로 나눌 수 있나요?",
    answer:
      "'낱장 전부 분할' 모드를 쓰면 모든 페이지가 1장짜리 PDF로 나뉘어 ZIP 한 개로 묶여 다운로드됩니다.",
  },
  {
    question: "페이지 범위는 어떻게 입력하나요?",
    answer:
      "쉼표로 여러 범위를 지정합니다. 예를 들어 '1-3, 5, 8-10'은 1·2·3·5·8·9·10페이지를 입력한 순서대로 추출합니다.",
  },
  {
    question: "분할하는 PDF가 서버에 올라가나요?",
    answer:
      "아니요. 페이지를 떼어내는 작업은 브라우저가 문서를 직접 읽어 그 자리에서 처리합니다. 계약서 전체를 서버에 올려 두고 한 페이지만 돌려받는 방식이 아닙니다.",
  },
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "PDF 분할",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
    description:
      "PDF에서 원하는 페이지만 추출하거나 모든 페이지를 낱장으로 나누는 무료 도구. 문서는 브라우저 밖으로 나가지 않습니다.",
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

export default function PdfSplitPage() {
  return (
    <ToolLayout
      title="PDF 분할"
      description="원하는 페이지만 추출하거나, 모든 페이지를 낱장으로. 문서는 기기 안에서만."
      guide={guide}
      faqs={faqs}
      currentToolHref="/tools/pdf/split"
      relatedPostSlugs={["image-to-pdf-guide"]}
      schemas={schemas}
    >
      <PdfSplitTool />
    </ToolLayout>
  );
}
