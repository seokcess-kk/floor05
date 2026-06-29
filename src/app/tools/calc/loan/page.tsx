import type { Metadata } from "next";
import ToolLayout from "@/components/common/ToolLayout";
import LoanTool from "@/components/calc/LoanTool";
import { SITE_URL } from "@/lib/common/constants";

const PAGE_URL = `${SITE_URL}/tools/calc/loan`;

export const metadata: Metadata = {
  title: "대출이자 계산기 - 원리금균등·원금균등·만기일시",
  description:
    "대출 원금·금리·기간을 넣으면 월 상환액, 총이자, 총상환액을 상환 방식별로 계산합니다. 원리금균등·원금균등·만기일시 비교까지. 회원가입 없이 무료, 입력값은 저장·전송되지 않습니다.",
  keywords: [
    "대출이자 계산기",
    "대출 이자 계산",
    "원리금균등상환",
    "원금균등상환",
    "월 상환액 계산",
    "대출 상환 계산기",
    "이자 계산기",
  ],
  openGraph: {
    title: "대출이자 계산기 - 원리금균등·원금균등·만기일시",
    description: "월 상환액·총이자·총상환액을 상환 방식별로 바로 비교.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "대출이자 계산기 - 원리금균등·원금균등·만기일시",
    description: "월 상환액·총이자를 상환 방식별로 바로 계산.",
  },
  alternates: { canonical: PAGE_URL },
};

const guide = {
  intro:
    "같은 금액을 같은 금리로 빌려도, 상환 방식에 따라 매달 내는 돈과 총이자가 달라집니다. 대출을 비교할 때 월 상환액만 보면 손해를 볼 수 있어, 총이자까지 함께 봐야 합니다. 이 도구는 세 가지 방식의 결과를 바로 보여줍니다.",
  sections: [
    {
      heading: "세 가지 상환 방식",
      paragraphs: [
        "상환 방식은 원금을 언제 갚느냐의 차이입니다. 같은 조건이라면 원금을 빨리 갚을수록 총이자가 줄어듭니다.",
      ],
      bullets: [
        "원리금균등: 매달 같은 금액(원금+이자)을 갚습니다. 초반엔 이자 비중이 크고 점점 원금 비중이 커집니다. 매달 일정해 계획을 세우기 좋습니다.",
        "원금균등: 원금을 기간으로 똑같이 나눠 갚고, 이자는 남은 원금에 붙습니다. 초반 상환액이 가장 크지만 총이자는 가장 적습니다.",
        "만기일시: 기간 내내 이자만 내다가 만기에 원금을 한 번에 갚습니다. 매달 부담은 작지만 총이자가 가장 많습니다.",
      ],
    },
    {
      heading: "월 상환액보다 총이자를 보라",
      paragraphs: [
        "만기일시는 매달 내는 돈이 적어 부담이 없어 보이지만, 원금이 줄지 않아 총이자가 가장 많습니다. 반대로 원금균등은 처음에 부담스럽지만 길게 보면 이자를 가장 아낍니다. 여유가 된다면 원금을 빨리 갚는 쪽이 유리합니다.",
        "이 계산기는 중도상환수수료나 취급 수수료, 금리 변동(변동금리)은 반영하지 않은 단순 예상치입니다. 실제 대출은 우대금리·수수료 조건을 함께 확인하세요. 입력값은 서버로 전송되지 않습니다.",
      ],
    },
  ],
};

const faqs = [
  {
    question: "원리금균등과 원금균등 중 뭐가 이자가 적나요?",
    answer:
      "원금균등이 총이자가 적습니다. 원금을 처음부터 똑같이 나눠 갚아 잔액이 빨리 줄기 때문입니다. 대신 초반 상환액이 원리금균등보다 큽니다.",
  },
  {
    question: "월 상환액은 어떻게 계산되나요?",
    answer:
      "원리금균등은 매달 같은 금액을, 원금균등은 첫 달이 가장 크고 점점 줄며, 만기일시는 매달 이자만 내고 만기에 원금을 갚습니다. 이 도구가 방식별로 자동 계산합니다.",
  },
  {
    question: "중도상환수수료도 계산되나요?",
    answer:
      "아니요. 이 계산기는 원금·금리·기간에 따른 단순 예상치로, 중도상환수수료·취급 수수료·변동금리는 반영하지 않습니다.",
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
    name: "대출이자 계산기",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
    description:
      "대출 원금·금리·기간으로 월 상환액·총이자·총상환액을 원리금균등·원금균등·만기일시 방식별로 계산하는 무료 도구.",
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

export default function LoanPage() {
  return (
    <ToolLayout
      title="대출이자 계산기"
      description="원금·금리·기간으로 월 상환액과 총이자를. 상환 방식별 비교까지."
      guide={guide}
      faqs={faqs}
      currentToolHref="/tools/calc/loan"
      schemas={schemas}
    >
      <LoanTool />
    </ToolLayout>
  );
}
