import type { Metadata } from "next";
import ToolLayout from "@/components/common/ToolLayout";
import OvulationTool from "@/components/health/OvulationTool";
import { SITE_URL } from "@/lib/common/constants";

const PAGE_URL = `${SITE_URL}/tools/health/ovulation`;

export const metadata: Metadata = {
  title: "배란일 계산기 - 가임기·다음 생리일까지",
  description:
    "마지막 생리 시작일과 평균 주기만 넣으면 배란 예정일, 가임기, 다음 생리 예정일을 바로 계산합니다. 향후 3개 주기까지. 회원가입 없이 무료, 입력값은 저장·전송되지 않습니다.",
  keywords: [
    "배란일 계산기",
    "가임기 계산기",
    "배란일 계산",
    "가임기 계산",
    "생리주기 계산",
    "다음 생리일",
    "배란 예정일",
  ],
  openGraph: {
    title: "배란일 계산기 - 가임기·다음 생리일까지",
    description:
      "마지막 생리일과 주기로 배란 예정일·가임기·다음 생리일을. 향후 3개 주기 예측.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "배란일 계산기 - 가임기·다음 생리일까지",
    description: "마지막 생리일과 주기로 배란일·가임기·다음 생리일을 바로 계산.",
  },
  alternates: { canonical: PAGE_URL },
};

const guide = {
  intro:
    "배란일과 가임기는 임신을 계획하거나 피하려 할 때 모두 알아두면 좋은 날짜입니다. 다만 배란은 직접 보이지 않기 때문에, 보통 생리 주기를 바탕으로 예측합니다. 이 도구는 마지막 생리일과 평균 주기로 배란일과 가임기를 계산합니다.",
  sections: [
    {
      heading: "배란일과 가임기는 어떻게 예측하나",
      paragraphs: [
        "배란 후 다음 생리까지의 기간(황체기)은 사람마다 비교적 일정해서 보통 14일로 봅니다. 그래서 배란 예정일은 '다음 생리 예정일에서 14일을 뺀 날'로 추정합니다. 다음 생리 예정일은 마지막 생리 시작일에 평균 주기를 더해 구합니다.",
        "가임기는 배란일 하나가 아니라 그 앞뒤로 잡습니다. 정자는 여성의 몸에서 최대 약 5일까지 살 수 있고, 배란된 난자는 약 하루 살아 있기 때문입니다. 그래서 이 도구는 배란 5일 전부터 배란 1일 후까지를 가임기로 표시합니다.",
      ],
    },
    {
      heading: "예측이 빗나가는 이유",
      paragraphs: [
        "이 계산은 주기가 규칙적이라는 가정에서 출발합니다. 하지만 생리 주기는 스트레스, 수면, 체중 변화, 건강 상태에 따라 흔들립니다. 주기가 들쭉날쭉하면 예측과 실제 배란일이 며칠씩 차이 날 수 있습니다.",
        "더 정확히 알고 싶다면 기초체온 측정이나 배란 테스트기를 함께 쓰는 것이 좋습니다. 무엇보다 이 도구의 결과는 참고용이며, 피임이나 임신 계획의 의학적 판단을 대신하지 않습니다.",
      ],
    },
  ],
};

const faqs = [
  {
    question: "배란일은 어떻게 계산하나요?",
    answer:
      "다음 생리 예정일(마지막 생리일 + 평균 주기)에서 14일을 뺀 날을 배란 예정일로 봅니다. 황체기를 14일로 가정한 표준 모델입니다.",
  },
  {
    question: "가임기는 며칠인가요?",
    answer:
      "정자 생존 기간과 난자 수명을 고려해, 보통 배란 5일 전부터 배란 1일 후까지 약 일주일을 가임기로 봅니다. 이 도구도 그 범위로 표시합니다.",
  },
  {
    question: "주기가 불규칙해도 정확한가요?",
    answer:
      "아니요. 이 계산은 주기가 규칙적이라는 가정에서 출발하므로, 주기가 들쭉날쭉하면 실제 배란일과 며칠씩 차이 날 수 있습니다. 기초체온·배란 테스트기를 함께 쓰면 정확도가 올라갑니다.",
  },
  {
    question: "피임 목적으로 믿어도 되나요?",
    answer:
      "권장하지 않습니다. 예측 배란일은 변동이 크기 때문에 피임 수단으로는 신뢰도가 낮습니다. 피임·임신 계획은 산부인과 전문의와 상담하세요.",
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
    name: "배란일 계산기",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
    description:
      "마지막 생리일과 평균 주기로 배란 예정일·가임기·다음 생리 예정일을 계산하는 무료 도구. 참고용 추정치.",
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

export default function OvulationPage() {
  return (
    <ToolLayout
      title="배란일 계산기"
      description="마지막 생리일과 주기로 배란 예정일·가임기·다음 생리일을."
      guide={guide}
      faqs={faqs}
      currentToolHref="/tools/health/ovulation"
      relatedPostSlugs={["bmi-obesity-guide"]}
      schemas={schemas}
    >
      <OvulationTool />
    </ToolLayout>
  );
}
