import type { Metadata } from "next";
import ToolLayout from "@/components/common/ToolLayout";
import BmiTool from "@/components/health/BmiTool";
import { SITE_URL } from "@/lib/common/constants";

const PAGE_URL = `${SITE_URL}/tools/health/bmi`;

export const metadata: Metadata = {
  title: "BMI 계산기 - 키·몸무게로 비만도·표준체중까지",
  description:
    "키와 몸무게만 넣으면 체질량지수(BMI)와 비만도를 대한비만학회 기준으로 바로 계산합니다. 정상 체중 범위와 감량·증량 목표까지. 키와 몸무게는 어디에도 기록되지 않습니다.",
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
    "BMI(체질량지수)는 키와 몸무게, 이 두 숫자만으로 비만 정도를 어림잡는 지표입니다. 계산 자체는 쉬운데, 어떤 기준표를 대느냐에 따라 같은 숫자가 정상으로도 과체중으로도 읽힙니다. 이 도구는 한국인 체형에 맞춘 대한비만학회 기준으로 구간을 나눠 보여줍니다.",
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
        "BMI 한 숫자로는 근육과 지방이 구별되지 않습니다. 운동선수처럼 근육량이 많은 사람은 BMI가 높게 나와도 비만이 아닐 수 있고, 반대로 BMI가 정상이어도 체지방이 많은 '마른 비만'일 수 있습니다. BMI는 큰 흐름을 보는 참고 지표로 쓰고, 정확한 건강 상태는 체지방률·허리둘레·혈액검사와 함께 봐야 합니다.",
        "이 도구는 BMI와 함께 정상 체중 범위(BMI 18.5~22.9에 해당하는 몸무게)도 보여줍니다. 지금 몸무게가 범위를 벗어났다면 몇 kg을 조절하면 정상 범위에 드는지도 표시합니다.",
      ],
    },
    {
      heading: "기준·출처와 참고 한계",
      table: {
        headers: ["구간", "대한비만학회 2022", "WHO 국제 기준"],
        rows: [
          ["저체중", "18.5 미만", "18.5 미만"],
          ["정상", "18.5 ~ 22.9", "18.5 ~ 24.9"],
          ["과체중(비만 전단계)", "23 ~ 24.9", "25 ~ 29.9"],
          ["비만", "25 이상", "30 이상"],
        ],
        caption:
          "출처: 대한비만학회 「비만 진료지침 2022」. 아시아인은 같은 BMI에서도 대사질환 위험이 더 커, 비만 기준을 WHO의 30이 아닌 25로 낮춰 잡습니다.",
      },
      paragraphs: [
        "표준 BMI 구간은 성인을 전제로 만들어졌습니다. 성장기 어린이·청소년은 나이·성별별 성장도표 백분위수로 따로 보고, 노인은 근육이 줄어 같은 BMI라도 체지방 비율이 높게 잡히며, 임산부는 체중 증가 자체가 정상 경과라 일반 구간을 그대로 적용하기 어렵습니다.",
        "그래서 대한비만학회도 BMI 하나만 보지 말고 허리둘레(복부비만: 남성 90cm·여성 85cm 이상)를 함께 확인하도록 권합니다. 같은 BMI라도 배에 지방이 몰려 있으면 대사 위험이 더 크기 때문입니다.",
        "이 표와 계산 결과는 몸 상태를 대략 가늠하는 참고 자료일 뿐 진단이 아닙니다. 체중·비만과 관련해 판단이 필요하면 반드시 의료진과 상담하세요.",
      ],
    },
  ],
};

const faqs = [
  {
    question: "키와 몸무게는 어떤 단위로 넣나요?",
    answer:
      "키는 cm, 몸무게는 kg으로 넣습니다. 예를 들어 170과 65를 넣으면 BMI 약 22.5와 함께 어느 구간에 드는지 바로 표시됩니다. 64.5처럼 소수점이 있는 몸무게도 그대로 넣을 수 있습니다.",
  },
  {
    question: "이 도구는 어떤 기준으로 구간을 나누나요?",
    answer:
      "한국인 체형에 맞춘 대한비만학회 기준으로 나눕니다. 그래서 BMI 24 같은 값은 WHO 기준(25 이상 과체중)으로는 정상이라도 여기서는 '비만 전단계'로 표시됩니다. 어느 기준을 쓰느냐에 따라 결과 문구가 달라진다는 점을 감안하세요.",
  },
  {
    question: "정상 체중 범위는 어디서 보나요?",
    answer:
      "BMI 숫자 아래에 내 키에서 정상(18.5~22.9)에 해당하는 몸무게 범위가 함께 나옵니다. 지금 몸무게가 그 범위를 벗어나 있으면 몇 kg을 빼거나 더해야 범위 안에 드는지도 표시해, 목표 몸무게를 잡을 때 참고할 수 있습니다.",
  },
  {
    question: "BMI가 정상으로 나오면 그대로 믿어도 되나요?",
    answer:
      "BMI만으로는 근육인지 지방인지까지 알 수 없어, 이 숫자 하나로 건강을 단정하긴 어렵습니다. 근육이 많으면 실제보다 높게, 체지방이 많은 '마른 비만'은 오히려 정상으로 나올 수 있으니 허리둘레나 체지방률을 같이 확인하는 편이 안전합니다.",
  },
  {
    question: "넣은 키·몸무게는 어디에 기록되나요?",
    answer:
      "어디에도 기록되지 않습니다. 키와 몸무게는 지금 보고 있는 기기 안에서 BMI를 계산하는 데만 쓰이고, 서버로 전송하거나 저장하는 과정이 없습니다. 체중은 예민한 정보라 이 기기 밖으로 내보내지 않습니다.",
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
