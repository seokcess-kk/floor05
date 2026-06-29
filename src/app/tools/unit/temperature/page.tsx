import type { Metadata } from "next";
import ToolLayout from "@/components/common/ToolLayout";
import UnitConverter from "@/components/unit/UnitConverter";
import { SITE_URL } from "@/lib/common/constants";

const PAGE_URL = `${SITE_URL}/tools/unit/temperature`;

export const metadata: Metadata = {
  title: "온도 변환 - 섭씨 화씨 켈빈 한 번에",
  description:
    "섭씨(°C), 화씨(°F), 켈빈(K)을 양방향으로 즉시 변환합니다. 화씨 100도가 섭씨 몇 도인지, 섭씨를 화씨로 어느 칸에 넣어도 바로. 회원가입 없이 무료, 입력값은 저장·전송되지 않습니다.",
  keywords: [
    "화씨 섭씨 변환",
    "섭씨 화씨 변환",
    "온도 변환",
    "화씨 100도",
    "섭씨 화씨",
    "켈빈 변환",
    "fahrenheit celsius",
  ],
  openGraph: {
    title: "온도 변환 - 섭씨 화씨 켈빈 한 번에",
    description: "섭씨·화씨·켈빈을 양방향 즉시 변환. 화씨 100도가 몇 도?",
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "온도 변환 - 섭씨 화씨 켈빈 한 번에",
    description: "섭씨·화씨·켈빈을 어느 칸에 넣어도 바로 변환.",
  },
  alternates: { canonical: PAGE_URL },
};

const guide = {
  intro:
    "해외 날씨 앱이나 외국 레시피를 보면 온도가 화씨(°F)로 적혀 있어 감이 안 옵니다. 섭씨와 화씨는 기준점과 간격이 모두 달라 머릿속 암산이 까다롭죠. 이 도구는 섭씨·화씨·켈빈을 한 화면에 놓고 어느 칸에든 넣으면 나머지가 바로 바뀝니다.",
  sections: [
    {
      heading: "섭씨와 화씨 변환 공식",
      paragraphs: [
        "섭씨를 화씨로 바꾸려면 9/5를 곱하고 32를 더합니다(°F = °C × 9/5 + 32). 반대로 화씨를 섭씨로 바꾸려면 32를 뺀 뒤 5/9를 곱합니다(°C = (°F − 32) × 5/9). 물이 어는 점이 0°C = 32°F, 끓는 점이 100°C = 212°F입니다.",
      ],
      bullets: [
        "0°C = 32°F (물이 어는 점)",
        "37°C ≈ 98.6°F (사람 체온)",
        "100°C = 212°F (물이 끓는 점)",
        "100°F ≈ 37.8°C (한여름 더위)",
      ],
    },
    {
      heading: "켈빈은 또 뭔가",
      paragraphs: [
        "켈빈(K)은 과학에서 쓰는 절대온도 단위입니다. 간격은 섭씨와 같지만 시작점이 달라, 0K(절대영도)가 −273.15°C입니다. 그래서 섭씨에 273.15를 더하면 켈빈이 됩니다. 일상에서는 거의 쓸 일이 없지만, 화학·물리 문제를 풀 때 필요합니다.",
        "모든 변환은 브라우저 안에서 즉시 이루어지며, 입력값은 서버로 전송되지 않습니다.",
      ],
    },
  ],
};

const faqs = [
  {
    question: "화씨 100도는 섭씨로 몇 도인가요?",
    answer:
      "약 37.8°C입니다. (100 − 32) × 5/9로 계산합니다. 사람 체온과 비슷한, 꽤 더운 날씨입니다.",
  },
  {
    question: "섭씨를 화씨로 바꾸는 공식은?",
    answer:
      "°F = °C × 9/5 + 32 입니다. 예를 들어 섭씨 25도는 25 × 9/5 + 32 = 77°F입니다.",
  },
  {
    question: "사람 체온은 화씨로 몇 도인가요?",
    answer: "섭씨 37도는 약 98.6°F입니다. 미국에서 체온을 잴 때 흔히 보는 숫자입니다.",
  },
  {
    question: "켈빈은 어떻게 변환하나요?",
    answer:
      "섭씨에 273.15를 더하면 켈빈이 됩니다. 0K(절대영도)는 −273.15°C입니다.",
  },
  {
    question: "입력한 값이 저장되나요?",
    answer:
      "아니요. 모든 변환은 브라우저 안에서 이루어지며 입력값이 서버로 전송되거나 저장되지 않습니다.",
  },
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "온도 변환",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
    description: "섭씨(°C)·화씨(°F)·켈빈(K)을 양방향으로 변환하는 무료 도구.",
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

export default function TemperaturePage() {
  return (
    <ToolLayout
      title="온도 변환"
      description="섭씨·화씨·켈빈을 한 화면에서. 어느 칸에 넣어도 바로 변환됩니다."
      guide={guide}
      faqs={faqs}
      currentToolHref="/tools/unit/temperature"
      schemas={schemas}
    >
      <UnitConverter set="temperature" toolName="temperature" />
    </ToolLayout>
  );
}
