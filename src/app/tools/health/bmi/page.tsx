import type { Metadata } from "next";
import ToolLayout from "@/components/common/ToolLayout";
import BmiTool from "@/components/health/BmiTool";
import { SITE_URL } from "@/lib/common/constants";

const PAGE_URL = `${SITE_URL}/tools/health/bmi`;

export const metadata: Metadata = {
  title: "BMI 계산기 - 키·몸무게로 비만도·표준체중까지",
  description:
    "키와 몸무게만 넣으면 체질량지수(BMI)와 비만도를 대한비만학회 기준으로 바로 계산합니다. 정상 체중 범위와 감량·증량 목표까지. 회원가입 없이 무료, 입력값은 저장·전송되지 않습니다.",
  keywords: [
    "BMI 계산기",
    "비만도 계산기",
    "체질량지수",
    "BMI 계산",
    "표준체중 계산",
    "정상 체중 범위",
    "비만 기준",
  ],
  openGraph: {
    title: "BMI 계산기 - 키·몸무게로 비만도·표준체중까지",
    description:
      "체질량지수(BMI)와 비만도를 대한비만학회 기준으로. 정상 체중 범위·감량 목표까지.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BMI 계산기 - 키·몸무게로 비만도·표준체중까지",
    description: "체질량지수와 비만도를 대한비만학회 기준으로 바로 계산.",
  },
  alternates: { canonical: PAGE_URL },
};

const guide = {
  intro:
    "BMI(체질량지수)는 키와 몸무게만으로 비만 정도를 가늠하는 가장 간단한 지표입니다. 계산은 쉽지만, 어떤 기준으로 보느냐에 따라 같은 숫자도 '정상'과 '과체중'으로 갈립니다. 이 도구는 한국인에게 맞는 대한비만학회 기준으로 구간을 보여줍니다.",
  sections: [
    {
      heading: "BMI 계산법과 한국 기준",
      paragraphs: [
        "BMI는 몸무게(kg)를 키(m)의 제곱으로 나눈 값입니다. 예를 들어 키 170cm, 몸무게 65kg이면 65 ÷ (1.7 × 1.7) ≈ 22.5로 정상 범위에 듭니다.",
        "주의할 점은 기준이 두 가지라는 것입니다. WHO 국제 기준은 25 이상을 과체중으로 보지만, 대한비만학회는 아시아인의 체형을 반영해 더 낮은 기준을 씁니다. 같은 BMI 24라도 WHO로는 정상, 한국 기준으로는 비만 전단계입니다. 이 도구는 한국 기준을 사용합니다.",
      ],
      bullets: [
        "저체중: 18.5 미만",
        "정상: 18.5 ~ 22.9",
        "비만 전단계(과체중): 23 ~ 24.9",
        "1단계 비만: 25 ~ 29.9",
        "2단계 비만: 30 ~ 34.9",
        "3단계 비만(고도비만): 35 이상",
      ],
    },
    {
      heading: "BMI로 알 수 없는 것",
      paragraphs: [
        "BMI는 근육과 지방을 구분하지 못합니다. 운동선수처럼 근육량이 많은 사람은 BMI가 높게 나와도 비만이 아닐 수 있고, 반대로 BMI가 정상이어도 체지방이 많은 '마른 비만'일 수 있습니다. BMI는 큰 흐름을 보는 참고 지표로 쓰고, 정확한 건강 상태는 체지방률·허리둘레·혈액검사와 함께 봐야 합니다.",
        "이 도구는 BMI와 함께 정상 체중 범위(BMI 18.5~22.9에 해당하는 몸무게)도 보여줍니다. 지금 몸무게가 범위를 벗어났다면 몇 kg을 조절하면 정상 범위에 드는지도 표시합니다.",
      ],
    },
  ],
};

const faqs = [
  {
    question: "BMI는 어떻게 계산하나요?",
    answer:
      "몸무게(kg)를 키(m)의 제곱으로 나눕니다. 키 170cm·몸무게 65kg이면 65 ÷ (1.7×1.7) ≈ 22.5입니다.",
  },
  {
    question: "BMI 정상 범위는 얼마인가요?",
    answer:
      "대한비만학회 기준으로 18.5 이상 23 미만이 정상입니다. 23~24.9는 비만 전단계, 25 이상부터 비만으로 봅니다. WHO 국제 기준(25 이상 과체중)과는 다릅니다.",
  },
  {
    question: "왜 한국 기준과 WHO 기준이 다른가요?",
    answer:
      "아시아인은 같은 BMI에서도 서양인보다 체지방률이 높고 대사질환 위험이 커, 대한비만학회가 더 낮은 기준을 적용합니다. 이 도구는 한국 기준을 사용합니다.",
  },
  {
    question: "BMI가 정상인데 살이 쪄 보여요. 정확한가요?",
    answer:
      "BMI는 근육과 지방을 구분하지 못합니다. 근육량이 많으면 높게, 체지방이 많은 '마른 비만'은 정상으로 나올 수 있습니다. 체지방률·허리둘레와 함께 보는 게 좋습니다.",
  },
  {
    question: "입력한 키·몸무게가 저장되나요?",
    answer:
      "아니요. 모든 계산은 브라우저 안에서 이루어지며 입력값이 서버로 전송되거나 저장되지 않습니다.",
  },
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "BMI 계산기",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
    description:
      "키와 몸무게로 체질량지수(BMI)와 비만도, 정상 체중 범위를 대한비만학회 기준으로 계산하는 무료 도구.",
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

export default function BmiPage() {
  return (
    <ToolLayout
      title="BMI 계산기"
      description="키·몸무게로 체질량지수와 비만도를. 대한비만학회 기준·표준체중까지."
      guide={guide}
      faqs={faqs}
      currentToolHref="/tools/health/bmi"
      relatedPostSlugs={["bmi-obesity-guide"]}
      schemas={schemas}
    >
      <BmiTool />
    </ToolLayout>
  );
}
