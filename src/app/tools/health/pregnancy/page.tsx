import type { Metadata } from "next";
import ToolLayout from "@/components/common/ToolLayout";
import PregnancyTool from "@/components/health/PregnancyTool";
import { SITE_URL } from "@/lib/common/constants";

const PAGE_URL = `${SITE_URL}/tools/health/pregnancy`;

export const metadata: Metadata = {
  title: "임신 주수 계산기 - 출산예정일·삼분기까지",
  description:
    "마지막 생리 시작일(LMP)만 넣으면 현재 임신 주수와 출산 예정일, 삼분기, 진행률을 바로 계산합니다. Naegele 법칙 기준. 회원가입 없이 무료, 입력값은 저장·전송되지 않습니다.",
  keywords: [
    "임신주수 계산기",
    "임신 주수 계산",
    "출산예정일 계산기",
    "임신 개월수",
    "분만예정일",
    "임신 주차",
    "출산일 계산",
  ],
  openGraph: {
    title: "임신 주수 계산기 - 출산예정일·삼분기까지",
    description:
      "마지막 생리일로 현재 임신 주수와 출산 예정일, 삼분기·진행률을 한 번에.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "임신 주수 계산기 - 출산예정일·삼분기까지",
    description: "마지막 생리일로 임신 주수와 출산 예정일을 바로 계산.",
  },
  alternates: { canonical: PAGE_URL },
};

const guide = {
  intro:
    "임신 주수와 출산 예정일은 마지막 생리 시작일(LMP)을 기준으로 셉니다. 수정된 날이 아니라 생리 시작일부터 세는 게 의학 표준이라, 처음 들으면 헷갈리기 쉽습니다. 이 도구는 LMP만 넣으면 지금 임신 몇 주 며칠인지, 출산 예정일이 언제인지 보여줍니다.",
  sections: [
    {
      heading: "임신 주수는 왜 생리일부터 세나",
      paragraphs: [
        "실제 수정은 배란일(보통 생리 시작 후 약 2주)에 이루어지지만, 배란·수정 시점은 정확히 알기 어렵습니다. 반면 마지막 생리 시작일은 기억하기 쉬워, 의학에서는 이 날을 임신 0주 0일의 기준으로 삼습니다. 그래서 실제보다 약 2주 앞서 세는 셈입니다.",
        "출산 예정일은 마지막 생리일에 280일(40주)을 더해 구합니다. 이를 Naegele 법칙이라고 합니다. 다만 예정일에 정확히 맞춰 태어나는 경우는 5% 안팎이고, 대부분 그 전후 2주 안에 출산합니다.",
      ],
    },
    {
      heading: "삼분기(1·2·3분기) 나누기",
      paragraphs: [
        "임신 기간은 크게 세 시기로 나눕니다. 1삼분기(임신 초기)는 0~13주, 2삼분기(중기)는 14~27주, 3삼분기(후기)는 28주부터 출산까지입니다. 시기마다 주의할 점과 검사가 달라, 지금이 어느 시기인지 알아두면 도움이 됩니다.",
        "이 도구는 현재 주수와 함께 삼분기, 출산까지의 진행률, 예정일까지 남은 날(D-Day)도 보여줍니다.",
      ],
    },
  ],
};

const faqs = [
  {
    question: "임신 주수는 어떻게 계산하나요?",
    answer:
      "마지막 생리 시작일(LMP)을 임신 0주 0일로 보고, 오늘까지의 일수를 7로 나눠 주수와 일수를 구합니다. 실제 수정일보다 약 2주 앞서 세는 의학 표준 방식입니다.",
  },
  {
    question: "출산 예정일은 어떻게 정하나요?",
    answer:
      "마지막 생리 시작일에 280일(40주)을 더합니다(Naegele 법칙). 예정일에 정확히 태어나는 경우는 드물고, 보통 그 전후 2주 안에 출산합니다.",
  },
  {
    question: "삼분기는 어떻게 나누나요?",
    answer:
      "1삼분기(초기)는 0~13주, 2삼분기(중기)는 14~27주, 3삼분기(후기)는 28주부터 출산까지입니다.",
  },
  {
    question: "생리 주기가 불규칙한데 정확한가요?",
    answer:
      "마지막 생리일 기준 추정치라, 주기가 불규칙하거나 배란이 늦으면 실제 주수와 차이 날 수 있습니다. 정확한 주수와 예정일은 초음파 검사로 확인해야 합니다.",
  },
  {
    question: "입력한 날짜가 저장되나요?",
    answer:
      "아니요. 모든 계산은 브라우저 안에서 이루어지며 입력값이 서버로 전송되거나 저장되지 않습니다.",
  },
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "임신 주수 계산기",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
    description:
      "마지막 생리일로 현재 임신 주수와 출산 예정일, 삼분기·진행률을 계산하는 무료 도구. 참고용 추정치.",
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

export default function PregnancyPage() {
  return (
    <ToolLayout
      title="임신 주수 계산기"
      description="마지막 생리일로 현재 임신 주수와 출산예정일을. 삼분기·진행률까지."
      guide={guide}
      faqs={faqs}
      currentToolHref="/tools/health/pregnancy"
      relatedPostSlugs={["bmi-obesity-guide"]}
      schemas={schemas}
    >
      <PregnancyTool />
    </ToolLayout>
  );
}
