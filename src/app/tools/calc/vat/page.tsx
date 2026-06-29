import type { Metadata } from "next";
import ToolLayout from "@/components/common/ToolLayout";
import VatTool from "@/components/calc/VatTool";
import { SITE_URL } from "@/lib/common/constants";

const PAGE_URL = `${SITE_URL}/tools/calc/vat`;

export const metadata: Metadata = {
  title: "부가세 계산기 - 공급가·합계 양방향 계산",
  description:
    "공급가액에 부가세 10%를 더하거나, 합계금액에서 공급가액을 역산합니다. 세금계산서·견적서 금액을 바로. 회원가입 없이 무료, 입력값은 저장·전송되지 않습니다.",
  keywords: [
    "부가세 계산기",
    "부가가치세 계산",
    "부가세 10%",
    "공급가액 계산",
    "부가세 별도 계산",
    "합계금액 부가세",
    "세금계산서 금액",
  ],
  openGraph: {
    title: "부가세 계산기 - 공급가·합계 양방향 계산",
    description: "공급가액 → 부가세·합계, 합계 → 공급가액 역산을 한 번에.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "부가세 계산기 - 공급가·합계 양방향 계산",
    description: "공급가액과 합계금액을 양방향으로 바로 계산.",
  },
  alternates: { canonical: PAGE_URL },
};

const guide = {
  intro:
    "부가가치세는 공급가액의 10%입니다. 단순해 보여도, 견적서에 적힌 금액이 '부가세 별도'인지 '부가세 포함'인지에 따라 계산 방향이 달라집니다. 이 도구는 공급가액에 세금을 더하는 것과, 합계에서 공급가액을 역산하는 것을 모두 지원합니다.",
  sections: [
    {
      heading: "공급가액·부가세·합계의 관계",
      paragraphs: [
        "공급가액은 부가세를 뺀 순수 물건·서비스 값이고, 부가세는 그 10%, 합계는 둘을 더한 실제 결제 금액입니다. 공급가액 100만원이면 부가세 10만원, 합계 110만원이 됩니다.",
      ],
      bullets: [
        "합계 = 공급가액 × 1.1",
        "공급가액 = 합계 ÷ 1.1",
        "부가세 = 공급가액 × 0.1 = 합계 − 공급가액",
      ],
    },
    {
      heading: "'부가세 별도'와 '부가세 포함'",
      paragraphs: [
        "견적서·계약서에 '부가세 별도'라고 적혀 있으면, 표기 금액이 공급가액이라 결제할 때 10%를 더 내야 합니다. 반대로 '부가세 포함'이면 표기 금액이 이미 합계라, 공급가액을 알려면 1.1로 나눠 역산해야 합니다.",
        "거래 전에 어느 쪽인지 확인하지 않으면 10% 차이가 생깁니다. 이 도구의 탭으로 상황에 맞게 계산하세요. 간이과세자나 면세 품목은 세율이 다르게 적용됩니다.",
      ],
    },
  ],
};

const faqs = [
  {
    question: "부가세는 어떻게 계산하나요?",
    answer:
      "공급가액의 10%입니다. 공급가액 100만원이면 부가세는 10만원, 합계는 110만원입니다. 합계에서 거꾸로 구하려면 1.1로 나누면 공급가액이 나옵니다.",
  },
  {
    question: "합계금액에서 공급가액을 어떻게 빼나요?",
    answer:
      "합계를 1.1로 나누면 공급가액이 됩니다. 예를 들어 합계 110만원의 공급가액은 100만원, 부가세는 10만원입니다. 이 도구의 '합계로' 탭에서 자동 계산됩니다.",
  },
  {
    question: "'부가세 별도'는 무슨 뜻인가요?",
    answer:
      "표기 금액이 공급가액이라는 뜻으로, 결제 시 10%를 추가로 내야 합니다. '부가세 포함'이면 표기 금액이 이미 합계입니다.",
  },
  {
    question: "입력한 금액이 저장되나요?",
    answer:
      "아니요. 모든 계산은 브라우저 안에서 이루어지며 입력값이 서버로 전송되거나 저장되지 않습니다.",
  },
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "부가세 계산기",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
    description: "공급가액에 부가세 10%를 더하거나 합계에서 공급가액을 역산하는 무료 도구.",
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

export default function VatPage() {
  return (
    <ToolLayout
      title="부가세 계산기"
      description="공급가액에 부가세를 더하거나, 합계에서 공급가액을 역산하거나."
      guide={guide}
      faqs={faqs}
      currentToolHref="/tools/calc/vat"
      schemas={schemas}
    >
      <VatTool />
    </ToolLayout>
  );
}
