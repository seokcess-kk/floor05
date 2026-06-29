import type { Metadata } from "next";
import ToolLayout from "@/components/common/ToolLayout";
import SavingsTool from "@/components/calc/SavingsTool";
import { SITE_URL } from "@/lib/common/constants";

const PAGE_URL = `${SITE_URL}/tools/calc/savings`;

export const metadata: Metadata = {
  title: "예금 적금 이자 계산기 - 단리·복리 세후 수령액",
  description:
    "예금·적금의 만기 수령액과 이자를 단리·복리로 계산합니다. 이자소득세 15.4%를 뗀 세후 금액까지. 회원가입 없이 무료, 입력값은 저장·전송되지 않습니다.",
  keywords: [
    "예금 적금 이자 계산기",
    "적금 이자 계산",
    "예금 이자 계산",
    "단리 복리 계산",
    "이자 세후 계산",
    "적금 만기 금액",
    "이자소득세",
  ],
  openGraph: {
    title: "예금 적금 이자 계산기 - 단리·복리 세후 수령액",
    description: "예금·적금 만기 수령액을 단리·복리, 세후(15.4%)까지 바로.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "예금 적금 이자 계산기 - 단리·복리 세후 수령액",
    description: "예금·적금 만기 수령액과 세후 이자를 바로 계산.",
  },
  alternates: { canonical: PAGE_URL },
};

const guide = {
  intro:
    "예금·적금에 가입할 때 광고하는 금리는 '세전·연이율'입니다. 실제로 손에 쥐는 돈은 이자소득세를 떼고, 적금이라면 납입 방식까지 따져야 정확합니다. 이 도구는 단리·복리와 세후 금액을 한 번에 보여줍니다.",
  sections: [
    {
      heading: "예금과 적금, 이자가 붙는 방식이 다르다",
      paragraphs: [
        "예금은 목돈을 한 번에 맡기고 기간 내내 그 금액에 이자가 붙습니다. 적금은 매월 일정액을 나눠 넣기 때문에, 먼저 넣은 돈은 오래, 나중에 넣은 돈은 짧게 이자가 붙습니다. 그래서 '연 4% 적금'이라도 실제 받는 이자는 같은 금리 예금의 절반 정도입니다.",
      ],
      bullets: [
        "예금 단리: 이자 = 원금 × 연이율 × (개월/12)",
        "적금 단리: 매월 납입금이 만기까지 남은 개월수만큼 이자",
        "복리: 이자에 다시 이자가 붙어 기간이 길수록 단리보다 유리",
      ],
    },
    {
      heading: "세후 금액 = 이자 − 15.4%",
      paragraphs: [
        "이자에는 이자소득세 15.4%(소득세 14% + 지방소득세 1.4%)가 원천징수됩니다. 예를 들어 이자가 30만원이면 약 4만 6천원이 세금으로 빠져 세후 이자는 약 25만 4천원이 됩니다. 이 도구는 세전 이자와 세후 수령액을 함께 보여줍니다.",
        "세금우대저축이나 비과세 종합저축, 우대금리 조건은 반영하지 않은 기본 계산입니다. 실제 상품은 가입 조건을 함께 확인하세요. 입력값은 서버로 전송되지 않습니다.",
      ],
    },
  ],
};

const faqs = [
  {
    question: "적금 이자가 예금보다 적게 나오는 이유는?",
    answer:
      "적금은 매월 나눠 넣기 때문에 먼저 넣은 돈만 오래 이자가 붙습니다. 그래서 같은 연 4%라도 적금의 실제 이자는 같은 금액 예금의 절반 정도입니다. 금리만 보고 비교하면 오해하기 쉽습니다.",
  },
  {
    question: "단리와 복리는 뭐가 다른가요?",
    answer:
      "단리는 원금에만 이자가 붙고, 복리는 이자에 다시 이자가 붙습니다. 기간이 길수록 복리가 유리하지만, 국내 적금은 대부분 단리입니다.",
  },
  {
    question: "이자소득세는 얼마인가요?",
    answer:
      "이자의 15.4%(소득세 14% + 지방소득세 1.4%)입니다. 이자 30만원이면 약 4만 6천원이 세금으로 빠집니다. 세금우대·비과세 상품은 다릅니다.",
  },
  {
    question: "입력한 값이 저장되나요?",
    answer:
      "아니요. 모든 계산은 브라우저 안에서 이루어지며 입력값이 서버로 전송되거나 저장되지 않습니다.",
  },
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "예금 적금 이자 계산기",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
    description:
      "예금·적금의 만기 수령액과 이자를 단리·복리, 세후(15.4%)로 계산하는 무료 도구.",
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

export default function SavingsPage() {
  return (
    <ToolLayout
      title="예금 적금 이자 계산기"
      description="예금·적금 만기 수령액을 단리·복리로. 세후(15.4%)까지 바로."
      guide={guide}
      faqs={faqs}
      currentToolHref="/tools/calc/savings"
      schemas={schemas}
    >
      <SavingsTool />
    </ToolLayout>
  );
}
