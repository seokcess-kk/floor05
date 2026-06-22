import type { Metadata } from "next";
import ToolLayout from "@/components/common/ToolLayout";
import SeveranceTool from "@/components/calc/SeveranceTool";
import { SITE_URL } from "@/lib/common/constants";

const PAGE_URL = `${SITE_URL}/tools/calc/severance`;

export const metadata: Metadata = {
  title: "퇴직금 계산기 - 입사일·월급만 넣으면 평균임금 자동 계산",
  description:
    "입사일·퇴사일과 월급을 넣으면 근로기준법 평균임금 방식으로 퇴직금을 바로 계산합니다. 상여금·연차수당까지 반영. 회원가입 없이 무료, 입력값은 저장·전송되지 않습니다.",
  keywords: [
    "퇴직금 계산기",
    "퇴직금 계산",
    "평균임금 계산",
    "퇴직금 계산 방법",
    "퇴직금 얼마",
    "1년 퇴직금",
    "퇴직금 산정",
    "퇴직금 평균임금",
  ],
  openGraph: {
    title: "퇴직금 계산기 - 입사일·월급만 넣으면 평균임금 자동 계산",
    description:
      "입사일·퇴사일과 월급으로 퇴직금을 바로. 근로기준법 평균임금 방식, 상여·연차수당 반영.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "퇴직금 계산기 - 입사일·월급만 넣으면 평균임금 자동 계산",
    description: "입사일·퇴사일과 월급으로 퇴직금을 바로 계산. 상여·연차수당 반영.",
  },
  alternates: {
    canonical: PAGE_URL,
  },
};

const faqs = [
  {
    question: "퇴직금은 어떻게 계산하나요?",
    answer:
      "법정 퇴직금은 '1일 평균임금 × 30일 × (재직일수 ÷ 365)'로 계산합니다. 1일 평균임금은 퇴직 직전 3개월간 받은 임금총액을 그 기간의 날짜 수로 나눈 값입니다. 즉 1년 일하면 약 한 달치 월급이 퇴직금이 됩니다.",
  },
  {
    question: "1년 미만 근무해도 퇴직금을 받나요?",
    answer:
      "법정 퇴직금은 계속 근로기간이 1년(365일) 이상일 때 발생합니다. 1년 미만이면 법적으로는 지급 대상이 아닙니다. 이 계산기는 1년 미만이면 별도로 안내하고, 1년 기준으로 환산한 참고 금액을 보여줍니다.",
  },
  {
    question: "평균임금과 통상임금 중 무엇으로 계산하나요?",
    answer:
      "원칙은 평균임금(직전 3개월 임금총액 ÷ 기간 일수)입니다. 다만 평균임금이 통상임금보다 적으면 통상임금을 평균임금으로 보아 더 유리한 쪽으로 계산합니다. 이 도구는 입력한 급여를 평균임금으로 계산하므로, 통상임금이 더 큰 경우 그 값으로 다시 확인하세요.",
  },
  {
    question: "상여금과 연차수당도 퇴직금에 포함되나요?",
    answer:
      "네. 연간 상여금과 연차수당은 평균임금에 포함됩니다. 다만 3개월치만 반영하므로 '연간 총액 × 3/12'를 임금총액에 더해 계산합니다. 이 계산기에서 상여금·연차수당 칸에 연간 총액을 입력하면 자동으로 반영됩니다.",
  },
  {
    question: "계산된 퇴직금에서 세금을 떼나요?",
    answer:
      "이 계산기는 세전 금액을 보여줍니다. 실제 수령액은 퇴직소득세와 지방소득세가 차감됩니다. 퇴직소득세는 근속연수가 길수록 공제가 커져 세 부담이 줄어드는 구조라, 같은 금액이라도 오래 근무했을수록 실수령액이 많아집니다.",
  },
];

const guide = {
  intro:
    "퇴직금은 막연히 '한 달 월급쯤'으로 알려져 있지만, 실제 법정 산정 방식은 정해져 있습니다. 이 계산기는 근로기준법 평균임금 방식을 그대로 따라 입사일·퇴사일과 급여만으로 세전 퇴직금을 계산합니다. 입력값은 어디에도 저장·전송되지 않고 브라우저 안에서만 계산됩니다.",
  sections: [
    {
      heading: "퇴직금은 이렇게 계산됩니다",
      paragraphs: [
        "법정 퇴직금 공식은 '1일 평균임금 × 30일 × (재직일수 ÷ 365)'입니다. 풀어 보면 1년(365일)을 꽉 채워 일했을 때 30일치, 즉 약 한 달치 평균임금이 퇴직금으로 쌓이는 구조입니다. 그래서 흔히 '1년에 한 달치'라고 부르는 것입니다.",
        "핵심은 '1일 평균임금'을 어떻게 구하느냐입니다. 퇴직 직전 3개월 동안 받은 임금총액을 그 기간의 실제 날짜 수로 나눕니다. 이 계산기는 입사일과 퇴사일로 재직일수와 직전 3개월 기간 일수를 자동으로 잡아 계산하므로, 같은 월급이라도 퇴직월에 따라 1일 평균임금이 조금씩 달라질 수 있습니다.",
      ],
    },
    {
      heading: "상여금·연차수당이 임금총액에 더해지는 이유",
      paragraphs: [
        "평균임금은 기본급만이 아니라 '근로의 대가로 정기적으로 지급된 모든 임금'을 기준으로 합니다. 그래서 연간 상여금과 연차수당도 임금총액에 포함됩니다. 다만 평균임금은 3개월치만 보기 때문에, 1년 단위로 받는 항목은 연간 총액의 3/12(즉 3개월분)만 가산합니다.",
        "이 도구에서 상여금·연차수당 칸에 '연간 총액'을 입력하면, 내부적으로 ×3/12를 적용해 3개월 급여에 더한 뒤 1일 평균임금을 다시 계산합니다. 입력하지 않으면 0으로 처리되어 기본급만으로 산정됩니다.",
      ],
      bullets: [
        "3개월 급여 = 월 평균 급여 × 3",
        "상여 가산분 = 연간 상여금 × 3/12",
        "연차수당 가산분 = 연차수당 × 3/12",
        "임금총액 = 위 세 값의 합 → ÷ 기간 일수 = 1일 평균임금",
      ],
    },
    {
      heading: "지급 요건과 알아둘 점",
      paragraphs: [
        "법정 퇴직금은 계속 근로기간이 1년(365일) 이상이고, 1주 평균 소정근로시간이 15시간 이상인 근로자에게 발생합니다. 재직일수가 1년 미만이면 법적 지급 대상이 아니므로, 이 계산기도 그 경우 별도 안내를 띄우고 1년 기준으로 환산한 참고 금액만 보여줍니다.",
        "또 하나, 원칙은 평균임금이지만 평균임금이 통상임금보다 적으면 통상임금을 평균임금으로 보아 더 유리한 쪽으로 계산합니다. 마지막으로 여기 표시되는 금액은 모두 세전입니다. 실제 수령액에서는 퇴직소득세와 지방소득세가 차감되며, 근속연수가 길수록 공제가 커져 세 부담이 줄어듭니다. 정확한 실수령액은 회사 정산서나 국세청 모의계산으로 한 번 더 확인하세요.",
      ],
    },
  ],
};

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "퇴직금 계산기",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
    description:
      "입사일·퇴사일과 월급으로 근로기준법 평균임금 방식의 퇴직금을 계산하는 무료 도구. 상여금·연차수당 반영.",
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

const workflowCTA = {
  message: "퇴직 후 다음 단계를 준비한다면?",
  tools: [
    {
      name: "연봉 실수령액",
      href: "/tools/calc/salary",
      description: "새 연봉의 월 실수령액을 미리 계산",
    },
    {
      name: "글자수 세기",
      href: "/tools/text/counter",
      description: "이직 자소서 글자수를 한 번에",
    },
  ],
};

export default function SeverancePage() {
  return (
    <ToolLayout
      title="퇴직금 계산기"
      description="입사일·퇴사일과 월급만 넣으면 평균임금 방식으로 퇴직금을 바로 계산합니다."
      guide={guide}
      faqs={faqs}
      workflowCTA={workflowCTA}
      currentToolHref="/tools/calc/severance"
      relatedPostSlugs={["severance-pay-guide"]}
      schemas={schemas}
    >
      <SeveranceTool />
    </ToolLayout>
  );
}
