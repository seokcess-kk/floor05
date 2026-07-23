import type { Metadata } from "next";
import Link from "next/link";
import ToolLayout from "@/components/common/ToolLayout";
import UnitConverter from "@/components/unit/UnitConverter";
import { SITE_URL } from "@/lib/common/constants";

const PAGE_URL = `${SITE_URL}/tools/unit/pyeong`;

export const metadata: Metadata = {
  title: "평수 계산기 - 평 제곱미터(㎡) 양방향 변환",
  description:
    "평을 제곱미터(㎡)로, ㎡를 평으로 즉시 변환합니다. 84㎡는 몇 평인지, 32평은 몇 ㎡인지 바로. 분양면적·전용면적 차이까지 정리했습니다. 무료로 쓰고, 입력한 면적은 저장하지 않습니다.",
  keywords: [
    "평수 계산기",
    "제곱미터 평 변환",
    "평 제곱미터 변환",
    "㎡ 평 변환",
    "84제곱미터 평",
    "평수 변환",
    "전용면적 평수",
  ],
  openGraph: {
    title: "평수 계산기 - 평 제곱미터(㎡) 양방향 변환",
    description:
      "평↔㎡ 즉시 변환. 84㎡는 몇 평인지, 분양면적·전용면적 차이까지.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "평수 계산기 - 평 제곱미터(㎡) 양방향 변환",
    description: "평↔㎡ 즉시 변환. 84㎡는 몇 평? 전용·분양면적 차이까지.",
  },
  alternates: { canonical: PAGE_URL },
};

const guide = {
  intro:
    "부동산에서 면적은 ㎡(제곱미터)로 표기하지만, 우리는 여전히 '몇 평'으로 가늠합니다. 기준값은 1평 = 3.305785㎡(정확히 400/121), 1㎡ = 0.3025평입니다. 이 도구는 평과 ㎡를 양방향으로 즉시 변환해, '84㎡가 몇 평인지' 같은 질문에 바로 답합니다.",
  sections: [
    {
      heading: "평 ↔ ㎡ 변환과 자주 쓰는 값",
      paragraphs: [
        "평과 제곱미터는 1평 = 400/121㎡ = 3.305785㎡를 기준으로 서로 바꿔 계산합니다. 평에서 ㎡로 바꿀 때는 3.305785를 곱하고, ㎡에서 평으로 바꿀 때는 3.305785로 나누면 됩니다.",
      ],
      bullets: [
        "59㎡ ≈ 17.8평",
        "84㎡ ≈ 25.4평",
        "32평 ≈ 105.8㎡",
        "1평 = 3.305785㎡ / 1㎡ = 0.3025평",
      ],
    },
    {
      heading: "전용·공급·계약면적은 재는 범위가 다르다",
      paragraphs: [
        "같은 집을 두고도 숫자가 달라지는 건 전용·공급·계약처럼 재는 범위가 서로 다르기 때문입니다. 아파트는 공급면적을 평형처럼 부르는 일이 많고, 오피스텔 광고에서는 계약면적이 앞에 나오는 경우가 있습니다.",
        "숫자가 커 보이면 일단 기준 면적부터 확인하는 편이 좋습니다. 평수 계산은 산수지만, 면적 이름 확인은 거의 독해 문제에 가깝습니다.",
      ],
      bullets: [
        "전용면적: 현관 안쪽에서 실제 생활에 쓰는 면적",
        "공급(분양)면적: 전용면적에 계단·복도·엘리베이터 같은 주거 공용면적을 더한 면적",
        "계약면적: 공급면적에 주차장·기계실 등 기타 공용면적까지 더한 면적",
      ],
    },
    {
      heading: "토지·상가에도 그대로",
      paragraphs: [
        "평수 변환은 아파트뿐 아니라 토지, 상가, 사무실 면적에도 똑같이 적용됩니다. 등기부등본이나 건축물대장은 ㎡로 적혀 있으니, 평으로 감을 잡고 싶을 때 이 도구를 쓰면 됩니다. 계산은 브라우저에서 끝나니, 어느 동네 몇 ㎡를 알아보는지는 아무도 모릅니다.",
      ],
    },
  ],
};

const faqs = [
  {
    question: "84㎡를 평으로 바꾸면 얼마인가요?",
    answer:
      "84㎡는 약 25.4평으로, 변환기의 ㎡ 칸에 84를 넣으면 평 칸에 곧바로 나타납니다. 이 숫자는 전용면적 기준이고, 분양 광고에서는 흔히 33~34평형으로 부릅니다.",
  },
  {
    question: "㎡와 평, 어느 칸에 입력해야 하나요?",
    answer:
      "어느 칸에 넣어도 됩니다. ㎡ 칸을 채우면 평이, 평 칸을 채우면 ㎡가 함께 바뀌는 양방향 방식이라 변환 방향을 따로 고르지 않아도 됩니다.",
  },
  {
    question: "1㎡가 몇 평인지 빠르게 어림하려면?",
    answer:
      "1㎡는 약 0.3025평이라, ㎡ 값에 0.3을 곱하면 대략적인 평이 나옵니다. 소수점까지 정확한 값이 필요하면 위 변환기에 그대로 입력하세요.",
  },
  {
    question: "32평은 ㎡로 얼마나 되나요?",
    answer:
      "약 105.8㎡입니다. 평 칸에 32를 넣으면 확인되고, 손으로 셈할 때는 평에 3.305785를 곱하면 ㎡가 됩니다.",
  },
  {
    question: "변환기에 넣을 ㎡가 전용면적인지 어떻게 아나요?",
    answer:
      "등기부등본이나 건축물대장에 적힌 면적을 넣는 것이 가장 확실합니다. 그 서류의 ㎡는 보통 전용면적이고, 분양 광고의 평형은 공용면적이 섞여 실제보다 넓어 보입니다.",
  },
  {
    question: "소수점이 붙은 면적도 변환되나요?",
    answer:
      "네. 84.96처럼 소수점이 있는 ㎡도 그대로 넣으면 평으로 환산됩니다. 등기부의 면적은 소수점 둘째 자리까지 적혀 있는 경우가 많으니 반올림하지 말고 그대로 넣으세요.",
  },
  {
    question: "찾아본 집 면적이 어딘가에 기록되나요?",
    answer:
      "남지 않습니다. 환산은 이 브라우저 안에서 끝나고, 넣은 ㎡나 평은 계산이 지나가면 사라집니다. 어느 지역 몇 ㎡를 알아봤는지 밖으로 넘어갈 일이 없습니다.",
  },
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "평수 계산기",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
    description: "평과 제곱미터(㎡)를 양방향으로 변환하는 무료 도구. 분양·전용면적 안내 포함.",
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

export default function PyeongPage() {
  return (
    <ToolLayout
      title="평수 계산기"
      description="평을 ㎡로, ㎡를 평으로 즉시 변환. 분양·전용면적 차이까지."
      guide={guide}
      faqs={faqs}
      currentToolHref="/tools/unit/pyeong"
      relatedPostSlugs={["pyeong-conversion-guide"]}
      schemas={schemas}
    >
      <>
        <UnitConverter set="area" toolName="pyeong" />

        <section className="mt-6 rounded-lg border border-brand-light/50 bg-brand-paper p-4 shadow-sm">
          <div className="mb-3">
            <h2 className="text-lg font-semibold text-brand-dark">빠른 평수 환산표</h2>
            <p className="mt-1 text-sm text-brand-mid">
              1평 = 3.305785㎡(정확히 400/121), 1㎡ = 0.3025평 기준입니다.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-sm">
              <caption className="sr-only">제곱미터와 평을 양방향으로 빠르게 환산한 표</caption>
              <thead>
                <tr className="border-y border-brand-light/50 bg-brand-light/10 text-left text-brand-dark">
                  <th scope="col" className="px-3 py-2 font-semibold">입력</th>
                  <th scope="col" className="px-3 py-2 font-semibold">환산</th>
                  <th scope="col" className="px-3 py-2 font-semibold">메모</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-light/30">
                <tr>
                  <td className="px-3 py-2">59㎡</td>
                  <td className="px-3 py-2">약 17.8평</td>
                  <td className="px-3 py-2 text-brand-mid">㎡에서 평으로</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">84㎡</td>
                  <td className="px-3 py-2">약 25.4평</td>
                  <td className="px-3 py-2 text-brand-mid">㎡에서 평으로</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">114㎡</td>
                  <td className="px-3 py-2">약 34.5평</td>
                  <td className="px-3 py-2 text-brand-mid">㎡에서 평으로</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">20평</td>
                  <td className="px-3 py-2">약 66.1㎡</td>
                  <td className="px-3 py-2 text-brand-mid">평에서 ㎡로</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">25평</td>
                  <td className="px-3 py-2">약 82.6㎡</td>
                  <td className="px-3 py-2 text-brand-mid">평에서 ㎡로</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">32평</td>
                  <td className="px-3 py-2">약 105.8㎡</td>
                  <td className="px-3 py-2 text-brand-mid">평에서 ㎡로</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-brand-mid">
            전용률, 서비스면적, 오피스텔 계약면적까지 이어서 보려면{" "}
            <Link href="/blog/pyeong-conversion-guide" className="font-medium text-brand-dark hover:underline">
              면적 용어를 깊게 정리한 가이드
            </Link>
            를 참고하세요.
          </p>
        </section>
      </>
    </ToolLayout>
  );
}
