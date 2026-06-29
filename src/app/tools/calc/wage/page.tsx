import type { Metadata } from "next";
import ToolLayout from "@/components/common/ToolLayout";
import WageTool from "@/components/calc/WageTool";
import { SITE_URL } from "@/lib/common/constants";

const PAGE_URL = `${SITE_URL}/tools/calc/wage`;

export const metadata: Metadata = {
  title: "주휴수당 계산기 - 시급·근로시간으로 바로",
  description:
    "시급과 1주 소정근로시간을 넣으면 주휴수당, 주휴 포함 주급, 월 환산 급여를 바로 계산합니다. 2026년 최저시급 10,320원 기준. 회원가입 없이 무료, 입력값은 저장·전송되지 않습니다.",
  keywords: [
    "주휴수당 계산기",
    "주휴수당 계산",
    "주휴수당 조건",
    "최저시급 월급",
    "알바 주휴수당",
    "주 15시간 주휴수당",
    "2026 최저시급",
  ],
  openGraph: {
    title: "주휴수당 계산기 - 시급·근로시간으로 바로",
    description: "주휴수당·주휴 포함 주급·월 환산을 시급과 근로시간으로 바로.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "주휴수당 계산기 - 시급·근로시간으로 바로",
    description: "주휴수당과 월 환산 급여를 시급·근로시간으로 바로 계산.",
  },
  alternates: { canonical: PAGE_URL },
};

const guide = {
  intro:
    "주휴수당은 1주 동안 정해진 근로일을 개근하면 하루치 임금을 더 주는 제도입니다. 알바·시간제 근로자가 놓치기 쉬운데, 1주 15시간 이상 일하면 법적으로 받을 수 있습니다. 이 도구는 시급과 근로시간만으로 주휴수당과 월 급여를 계산합니다.",
  sections: [
    {
      heading: "주휴수당 조건과 계산법",
      paragraphs: [
        "주휴수당은 두 조건을 모두 충족해야 발생합니다. 첫째, 1주 소정근로시간이 15시간 이상이어야 합니다. 둘째, 그 주에 정해진 근로일을 개근해야 합니다. 둘 중 하나라도 빠지면 그 주의 주휴수당은 발생하지 않습니다.",
      ],
      bullets: [
        "주휴수당 = (1주 소정근로시간 ÷ 40) × 8 × 시급",
        "주휴시간은 최대 8시간 (주 40시간 이상 일해도 8시간분)",
        "주 40시간: 8 × 시급 = 하루치 임금",
        "주 15시간: (15÷40) × 8 = 3시간분 × 시급",
      ],
    },
    {
      heading: "최저시급과 월 환산",
      paragraphs: [
        "2026년 최저시급은 10,320원입니다. 주 40시간(주 5일, 하루 8시간) 일하면 주휴수당을 포함한 월 환산 급여는 약 216만원이 됩니다. 흔히 말하는 '최저임금 월 209만원'의 209시간이 바로 주 40시간 근로에 주휴 8시간을 더해 한 달로 환산한 시간입니다.",
        "이 도구는 시급을 직접 바꿀 수 있어 최저임금보다 높은 시급에도 쓸 수 있습니다. 월 환산은 한 달 평균 4.345주 기준이라, 회사가 쓰는 209시간 고정 방식과 수천 원 차이가 날 수 있습니다. 입력값은 서버로 전송되지 않습니다.",
      ],
    },
  ],
};

const faqs = [
  {
    question: "주휴수당을 받으려면 몇 시간 일해야 하나요?",
    answer:
      "1주 소정근로시간이 15시간 이상이고, 그 주에 정해진 근로일을 개근해야 합니다. 주 15시간 미만이면 주휴수당이 발생하지 않습니다.",
  },
  {
    question: "주휴수당은 어떻게 계산하나요?",
    answer:
      "(1주 소정근로시간 ÷ 40) × 8 × 시급입니다. 주 40시간이면 8시간분(하루치 임금), 주 15시간이면 3시간분이 주휴수당입니다.",
  },
  {
    question: "2026년 최저시급으로 주 40시간이면 월급이 얼마인가요?",
    answer:
      "2026년 최저시급 10,320원으로 주 40시간 일하면 주휴수당을 포함해 월 약 216만원(209시간 기준 2,156,880원)입니다.",
  },
  {
    question: "주 40시간 넘게 일하면 주휴수당도 늘어나나요?",
    answer:
      "아니요. 주휴시간은 최대 8시간으로 정해져 있어, 주 40시간을 넘겨도 주휴수당은 8시간분으로 같습니다. 초과분은 연장근로수당으로 별도 계산됩니다.",
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
    name: "주휴수당 계산기",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
    description:
      "시급과 1주 소정근로시간으로 주휴수당·주휴 포함 주급·월 환산 급여를 계산하는 무료 도구. 2026년 최저시급 기준.",
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

export default function WagePage() {
  return (
    <ToolLayout
      title="주휴수당 계산기"
      description="시급·근로시간으로 주휴수당과 월 환산 급여를. 2026년 최저시급 기준."
      guide={guide}
      faqs={faqs}
      currentToolHref="/tools/calc/wage"
      relatedPostSlugs={["weekly-holiday-pay-guide", "salary-net-pay-guide"]}
      schemas={schemas}
    >
      <WageTool />
    </ToolLayout>
  );
}
