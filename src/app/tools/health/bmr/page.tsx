import type { Metadata } from "next";
import ToolLayout from "@/components/common/ToolLayout";
import BmrTool from "@/components/health/BmrTool";
import { SITE_URL } from "@/lib/common/constants";

const PAGE_URL = `${SITE_URL}/tools/health/bmr`;

export const metadata: Metadata = {
  title: "기초대사량 계산기 - BMR·하루 권장 칼로리(TDEE)",
  description:
    "성별·나이·키·몸무게로 기초대사량(BMR)과 활동량을 반영한 하루 권장 칼로리(TDEE)를 계산합니다. 감량·유지·증량 목표 칼로리까지. 회원가입 없이 무료, 입력값은 저장·전송되지 않습니다.",
  keywords: [
    "기초대사량 계산기",
    "BMR 계산기",
    "TDEE 계산기",
    "하루 권장 칼로리",
    "기초대사량",
    "다이어트 칼로리",
    "권장 섭취 칼로리",
  ],
  openGraph: {
    title: "기초대사량 계산기 - BMR·하루 권장 칼로리(TDEE)",
    description:
      "기초대사량(BMR)과 하루 권장 칼로리(TDEE), 감량·유지·증량 목표 칼로리를 한 번에.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "기초대사량 계산기 - BMR·하루 권장 칼로리(TDEE)",
    description: "BMR과 TDEE, 감량·유지·증량 목표 칼로리를 바로 계산.",
  },
  alternates: { canonical: PAGE_URL },
};

const guide = {
  intro:
    "다이어트를 시작할 때 가장 먼저 알아야 할 숫자가 기초대사량(BMR)과 하루 권장 칼로리(TDEE)입니다. 이 두 값을 알면 '얼마나 먹어야 빠지는지, 유지되는지'를 가늠할 수 있습니다. 이 도구는 가장 널리 쓰이는 Mifflin-St Jeor 공식으로 계산합니다.",
  sections: [
    {
      heading: "기초대사량(BMR)과 활동대사량(TDEE)",
      paragraphs: [
        "기초대사량은 아무것도 하지 않고 누워만 있어도 생명 유지를 위해 쓰는 최소 에너지입니다. 숨 쉬고, 체온을 유지하고, 장기를 움직이는 데 쓰이며, 보통 하루 소비 칼로리의 60~70%를 차지합니다.",
        "여기에 일상 활동과 운동으로 쓰는 에너지를 더한 것이 활동대사량(TDEE)입니다. TDEE는 BMR에 활동 수준별 계수를 곱해 구합니다. 체중을 유지하려면 TDEE만큼 먹으면 되고, 빼려면 그보다 적게, 늘리려면 더 먹으면 됩니다.",
      ],
      bullets: [
        "거의 안 함(좌식): BMR × 1.2",
        "가벼운 활동(주 1~3일 운동): × 1.375",
        "보통 활동(주 3~5일 운동): × 1.55",
        "활발한 활동(주 6~7일 운동): × 1.725",
        "매우 활발(육체노동·선수): × 1.9",
      ],
    },
    {
      heading: "감량·유지·증량, 얼마나 먹어야 할까",
      paragraphs: [
        "체지방 1kg은 약 7,700kcal에 해당합니다. 1주에 0.5kg을 빼려면 하루 약 500kcal를 덜 먹거나 더 써야 한다는 계산이 나옵니다. 이 도구는 TDEE에서 500kcal를 뺀 감량 칼로리, 그대로 유지하는 칼로리, 400kcal를 더한 증량 칼로리를 함께 보여줍니다.",
        "다만 너무 적게 먹으면 근손실과 대사 적응으로 오히려 정체가 오기 쉽습니다. 보통 기초대사량 밑으로는 내려가지 않게 하고, 무리한 단기 감량보다 천천히 꾸준히 하는 편이 안전합니다.",
      ],
    },
  ],
};

const faqs = [
  {
    question: "기초대사량은 어떻게 계산하나요?",
    answer:
      "이 도구는 Mifflin-St Jeor 공식을 씁니다. 남성은 10×몸무게(kg)+6.25×키(cm)−5×나이+5, 여성은 같은 식에서 마지막을 −161로 계산합니다.",
  },
  {
    question: "BMR과 TDEE는 뭐가 다른가요?",
    answer:
      "BMR은 가만히 있어도 쓰는 최소 에너지이고, TDEE는 여기에 활동·운동으로 쓰는 에너지를 더한 하루 총 소비 칼로리입니다. 다이어트 기준은 보통 TDEE입니다.",
  },
  {
    question: "다이어트하려면 하루에 얼마나 먹어야 하나요?",
    answer:
      "체중 유지 칼로리(TDEE)에서 하루 약 500kcal를 줄이면 1주에 약 0.5kg 감량을 기대할 수 있습니다. 다만 기초대사량 밑으로 줄이는 건 권하지 않습니다.",
  },
  {
    question: "계산 결과가 정확한가요?",
    answer:
      "공식 기반 추정치입니다. 실제 필요 열량은 근육량, 대사 상태, 생활 패턴에 따라 달라지므로 참고용으로 활용하세요.",
  },
  {
    question: "입력한 정보가 저장되나요?",
    answer:
      "아니요. 모든 계산은 브라우저 안에서 이루어지며 입력값이 서버로 전송되거나 저장되지 않습니다.",
  },
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "기초대사량 계산기",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
    description:
      "성별·나이·키·몸무게로 기초대사량(BMR)과 하루 권장 칼로리(TDEE), 감량·유지·증량 목표 칼로리를 계산하는 무료 도구.",
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

export default function BmrPage() {
  return (
    <ToolLayout
      title="기초대사량 계산기"
      description="기초대사량(BMR)과 하루 권장 칼로리(TDEE), 감량·유지·증량 목표까지."
      guide={guide}
      faqs={faqs}
      currentToolHref="/tools/health/bmr"
      relatedPostSlugs={["bmi-obesity-guide"]}
      schemas={schemas}
    >
      <BmrTool />
    </ToolLayout>
  );
}
