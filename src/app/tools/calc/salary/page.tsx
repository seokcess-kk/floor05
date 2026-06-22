import type { Metadata } from "next";
import ToolLayout from "@/components/common/ToolLayout";
import SalaryTool from "@/components/calc/SalaryTool";
import { SITE_URL } from "@/lib/common/constants";

const PAGE_URL = `${SITE_URL}/tools/calc/salary`;

export const metadata: Metadata = {
  title: "연봉 실수령액 계산기 - 2026년 4대보험·세금 떼고 월급 바로",
  description:
    "연봉만 넣으면 2026년 국민연금·건강보험·고용보험과 소득세를 떼고 매달 통장에 찍히는 실수령액을 바로 계산합니다. 부양가족·비과세·자녀 공제까지 반영. 회원가입 없이 무료, 입력값은 저장·전송되지 않습니다.",
  keywords: [
    "연봉 실수령액",
    "실수령액 계산기",
    "연봉 계산기",
    "월급 실수령액",
    "연봉 실수령액 계산기",
    "2026 연봉 실수령액",
    "4대보험 계산기",
    "세후 월급",
  ],
  openGraph: {
    title: "연봉 실수령액 계산기 - 2026년 4대보험·세금 떼고 월급 바로",
    description:
      "연봉만 넣으면 4대보험·소득세를 떼고 매달 받는 실수령액을 바로. 부양가족·비과세까지 반영.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "연봉 실수령액 계산기 - 2026년 4대보험·세금 떼고 월급 바로",
    description:
      "연봉만 넣으면 4대보험·소득세를 떼고 매달 받는 실수령액을 바로 계산.",
  },
  alternates: {
    canonical: PAGE_URL,
  },
};

const faqs = [
  {
    question: "연봉 5,000만원이면 실수령액은 얼마인가요?",
    answer:
      "부양가족 본인 1명, 월 비과세 20만원(식대) 기준으로 2026년 요율을 적용하면 월 약 353만원입니다. 국민연금·건강보험·장기요양·고용보험과 소득세·지방소득세를 합쳐 월 약 63만원이 공제됩니다. 부양가족이 많거나 비과세 항목이 크면 실수령액은 늘어납니다.",
  },
  {
    question: "같은 연봉인데 실수령액이 사람마다 다른 이유는?",
    answer:
      "공제되는 소득세가 부양가족 수에 따라 달라지기 때문입니다. 본인 외 부양가족이 1명 늘 때마다 과세표준에서 150만원이 추가로 빠져 소득세가 줄어듭니다. 8~20세 자녀가 있으면 자녀 세액공제도 추가됩니다. 또 식대·차량유지비 같은 비과세 항목이 크면 4대보험·세금 기준 금액이 줄어 실수령액이 늘어납니다.",
  },
  {
    question: "비과세액(식대)은 실수령액에 어떤 영향을 주나요?",
    answer:
      "식대는 월 20만원까지 비과세입니다. 비과세 금액은 4대보험료와 소득세를 매기는 기준에서 빠지므로, 비과세가 클수록 공제가 줄어 실수령액이 늘어납니다. 다만 국민연금 기준소득월액이 낮아지면 나중에 받는 연금액에는 영향이 있을 수 있습니다.",
  },
  {
    question: "2026년에 실수령액이 줄어든다는 게 사실인가요?",
    answer:
      "2026년부터 국민연금 요율이 9.0%에서 9.5%(근로자 4.75%)로 오르고 건강보험도 7.09%에서 7.19%로 인상됩니다. 그만큼 공제가 늘어 같은 연봉이라도 실수령액은 2025년보다 조금 줄어듭니다. 이 계산기는 2026년 인상된 요율을 반영합니다.",
  },
  {
    question: "입력한 연봉 정보가 서버에 저장되나요?",
    answer:
      "아니요. 모든 계산은 브라우저 안에서 이루어지며 연봉·가족 정보가 서버로 전송되지 않습니다. 새로고침하면 입력값도 사라집니다.",
  },
];

const guide = {
  intro:
    "연봉 계약서에 적힌 숫자와 매달 통장에 찍히는 금액이 다른 건 4대보험과 세금이 미리 빠져나가기 때문입니다. 이 계산기는 2026년 기준 요율로 그 차이를 항목별로 보여줍니다. 입력한 연봉·가족 정보는 서버로 전송되지 않고 브라우저 안에서만 계산됩니다.",
  sections: [
    {
      heading: "세전 연봉과 실수령액이 다른 이유",
      paragraphs: [
        "회사가 약속한 연봉은 '세전' 금액입니다. 여기서 매달 국민연금·건강보험·장기요양보험·고용보험(4대보험)과 근로소득세·지방소득세가 원천징수된 뒤 남는 돈이 실수령액입니다.",
        "공제 기준이 되는 건 연봉 전체가 아니라 비과세액을 뺀 '과세 급여'입니다. 그래서 같은 연봉이라도 비과세 항목이 크면 공제가 줄어 손에 쥐는 돈이 늘어납니다.",
      ],
    },
    {
      heading: "공제 항목별 의미 (2026년 기준)",
      paragraphs: [
        "4대보험은 정해진 요율로, 소득세는 부양가족 수와 연봉에 따라 달라집니다. 2026년에는 국민연금과 건강보험 요율이 올라 같은 연봉이라도 공제가 조금 늘었습니다.",
      ],
      bullets: [
        "국민연금: 과세 급여의 4.75% (2025년 4.5%에서 인상). 기준소득월액 상한이 있어 일정 소득 이상은 더 늘지 않습니다.",
        "건강보험: 과세 급여의 3.595% (전체 7.19%의 절반).",
        "장기요양보험: 건강보험료의 13.14%. 급여가 아니라 건강보험료에 곱하는 점이 특징입니다.",
        "고용보험: 과세 급여의 0.9% (2026년 동결).",
        "근로소득세: 근로소득공제·인적공제를 거친 과세표준에 누진세율을 적용해 산출한 뒤, 간이세액표 방식으로 매달 떼는 금액입니다.",
        "지방소득세: 근로소득세의 10%가 함께 붙습니다.",
      ],
    },
    {
      heading: "부양가족·비과세가 실수령액을 바꾼다",
      paragraphs: [
        "같은 연봉인데 동료와 실수령액이 다르다면 대개 소득세 차이입니다. 본인 외 부양가족이 1명 늘 때마다 과세표준에서 1인당 150만원이 추가로 빠져 세금이 줄어듭니다. 8~20세 자녀가 있으면 자녀 세액공제가 더해져 매달 떼는 세금이 또 줄어듭니다.",
        "비과세액도 중요합니다. 식대는 월 20만원까지 비과세로, 이 금액은 4대보험과 소득세를 매기는 기준에서 제외됩니다. 비과세가 클수록 공제가 줄어 실수령액이 늘지만, 국민연금 산정 기준도 함께 낮아져 훗날 받는 연금액에는 영향이 있을 수 있습니다. 참고로 이 계산기 결과는 간이세액표를 근사한 예상치라 실제 원천징수액과 월 1~2만원 정도 차이가 날 수 있습니다.",
      ],
    },
  ],
};

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "연봉 실수령액 계산기",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
    description:
      "연봉을 입력하면 2026년 4대보험과 소득세를 공제한 월 실수령액을 계산하는 무료 도구. 부양가족·비과세·자녀 공제 반영.",
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
  message: "퇴직이나 이직을 준비 중이라면?",
  tools: [
    {
      name: "퇴직금 계산기",
      href: "/tools/calc/severance",
      description: "입사일·월급으로 퇴직금을 바로 계산",
    },
    {
      name: "글자수 세기",
      href: "/tools/text/counter",
      description: "자소서 글자수·바이트를 한 번에",
    },
  ],
};

export default function SalaryPage() {
  return (
    <ToolLayout
      title="연봉 실수령액 계산기"
      description="연봉만 넣으면 2026년 4대보험·세금을 떼고 매달 통장에 찍히는 금액을 바로."
      guide={guide}
      faqs={faqs}
      workflowCTA={workflowCTA}
      currentToolHref="/tools/calc/salary"
      relatedPostSlugs={["salary-net-pay-guide"]}
      schemas={schemas}
    >
      <SalaryTool />
    </ToolLayout>
  );
}
