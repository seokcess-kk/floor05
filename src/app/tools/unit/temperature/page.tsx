import type { Metadata } from "next";
import ToolLayout from "@/components/common/ToolLayout";
import UnitConverter from "@/components/unit/UnitConverter";
import { SITE_URL } from "@/lib/common/constants";

const PAGE_URL = `${SITE_URL}/tools/unit/temperature`;

export const metadata: Metadata = {
  title: "온도 변환 - 섭씨 화씨 켈빈 한 번에",
  description:
    "섭씨(°C), 화씨(°F), 켈빈(K)을 양방향으로 즉시 변환합니다. 화씨 100도가 섭씨 몇 도인지, 섭씨를 화씨로 어느 칸에 넣어도 바로. 회원가입도 설치도 없이 무료, 변환은 브라우저 안에서 끝납니다.",
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
        "변환 공식은 전부 브라우저 안에서 돌아갑니다. 온도 하나 바꿔 보는 데 서버까지 다녀올 이유가 없으니까요.",
      ],
    },
    {
      heading: "화씨는 요리·날씨·체온에서 자주 만납니다",
      paragraphs: [
        "화씨를 실제로 마주치는 곳은 대개 셋입니다. 외국 레시피의 오븐 온도, 해외 날씨 앱, 그리고 미국식 체온 표기입니다. 오븐을 예로 들면 350°F는 약 177°C, 400°F는 약 204°C, 425°F는 약 218°C로, 베이킹 레시피의 온도는 이 언저리에 몰려 있습니다.",
        "날씨는 정확한 숫자보다 어림 감각이 먼저입니다. 화씨에서 30을 뺀 뒤 2로 나누면 대략의 섭씨가 나옵니다. 70°F는 (70−30)÷2 ≈ 20°C(실제 21.1°C)로 쾌적하고, 90°F는 ≈ 30°C(실제 32.2°C)로 한여름 더위입니다. 정밀한 값은 위 변환기에 넣고, 걸어가며 하는 암산은 이 어림식으로 감만 잡으면 됩니다.",
      ],
      bullets: [
        "오븐 350°F ≈ 177°C, 400°F ≈ 204°C, 425°F ≈ 218°C",
        "쾌적한 실내 70°F ≈ 21°C",
        "미열 기준 100.4°F = 38°C",
        "어림 암산: (화씨 − 30) ÷ 2 ≈ 섭씨",
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
    question: "외국 레시피의 오븐 350도는 섭씨 몇 도인가요?",
    answer:
      "약 177°C입니다. (350 − 32) × 5/9로 계산합니다. 400°F는 약 204°C, 425°F는 약 218°C라, 베이킹 온도는 대부분 175~220°C 사이에 들어옵니다.",
  },
  {
    question: "화씨를 섭씨로 암산하는 요령이 있나요?",
    answer:
      "화씨에서 30을 빼고 2로 나누면 대략의 섭씨가 나옵니다. 70°F는 약 20°C(실제 21.1°C) 정도라 날씨 감을 잡는 데는 충분합니다. 소수점까지 정확한 값은 위 변환기를 쓰세요.",
  },
  {
    question: "넣은 온도가 저장되나요?",
    answer:
      "저장되지 않습니다. 온도 변환은 곱셈과 덧셈 몇 번이면 끝나 서버가 관여할 일이 없고, 넣은 값은 화면에서 쓰인 뒤 사라집니다.",
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
      <>
        <UnitConverter set="temperature" toolName="temperature" />

        <section className="mt-6 rounded-lg border border-brand-light/50 bg-brand-paper p-4 shadow-sm">
          <div className="mb-3">
            <h2 className="text-lg font-semibold text-brand-dark">화씨 → 섭씨 기준점 표</h2>
            <p className="mt-1 text-sm text-brand-mid">
              °C = (°F − 32) × 5/9 로 계산합니다. 물은 32°F에서 얼고 212°F에서 끓습니다.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-sm">
              <caption className="sr-only">일상에서 자주 쓰는 화씨 온도를 섭씨로 환산한 표</caption>
              <thead>
                <tr className="border-y border-brand-light/50 bg-brand-light/10 text-left text-brand-dark">
                  <th scope="col" className="px-3 py-2 font-semibold">화씨(°F)</th>
                  <th scope="col" className="px-3 py-2 font-semibold">섭씨(°C)</th>
                  <th scope="col" className="px-3 py-2 font-semibold">메모</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-light/30">
                <tr>
                  <td className="px-3 py-2">0°F</td>
                  <td className="px-3 py-2">약 −17.8°C</td>
                  <td className="px-3 py-2 text-brand-mid">몹시 추운 날</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">32°F</td>
                  <td className="px-3 py-2">0°C</td>
                  <td className="px-3 py-2 text-brand-mid">물이 어는 점</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">70°F</td>
                  <td className="px-3 py-2">약 21.1°C</td>
                  <td className="px-3 py-2 text-brand-mid">쾌적한 실내</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">98.6°F</td>
                  <td className="px-3 py-2">37°C</td>
                  <td className="px-3 py-2 text-brand-mid">사람 평균 체온</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">100.4°F</td>
                  <td className="px-3 py-2">38°C</td>
                  <td className="px-3 py-2 text-brand-mid">미열 기준</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">212°F</td>
                  <td className="px-3 py-2">100°C</td>
                  <td className="px-3 py-2 text-brand-mid">물이 끓는 점</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">350°F</td>
                  <td className="px-3 py-2">약 176.7°C</td>
                  <td className="px-3 py-2 text-brand-mid">오븐 베이킹</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </>
    </ToolLayout>
  );
}
