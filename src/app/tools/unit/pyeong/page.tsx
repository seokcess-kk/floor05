import type { Metadata } from "next";
import ToolLayout from "@/components/common/ToolLayout";
import UnitConverter from "@/components/unit/UnitConverter";
import { SITE_URL } from "@/lib/common/constants";

const PAGE_URL = `${SITE_URL}/tools/unit/pyeong`;

export const metadata: Metadata = {
  title: "평수 계산기 - 평 제곱미터(㎡) 양방향 변환",
  description:
    "평을 제곱미터(㎡)로, ㎡를 평으로 즉시 변환합니다. 84㎡는 몇 평인지, 32평은 몇 ㎡인지 바로. 분양면적·전용면적 차이까지 정리했습니다. 회원가입 없이 무료, 입력값은 저장·전송되지 않습니다.",
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
    "부동산에서 면적은 ㎡(제곱미터)로 표기하지만, 우리는 여전히 '몇 평'으로 가늠합니다. 1평은 약 3.3058㎡, 1㎡는 약 0.3025평입니다. 이 도구는 평과 ㎡를 양방향으로 즉시 변환해, '84㎡가 몇 평인지' 같은 질문에 바로 답합니다.",
  sections: [
    {
      heading: "평 ↔ ㎡ 변환과 자주 쓰는 값",
      paragraphs: [
        "1평은 사방 6자(약 1.818m)인 정사각형 넓이로, 정확히는 400/121 ≈ 3.3058㎡입니다. 반대로 1㎡는 약 0.3025평입니다. 평에서 ㎡로 바꾸려면 3.3058을 곱하고, ㎡에서 평으로 바꾸려면 3.3058로 나누면 됩니다.",
      ],
      bullets: [
        "59㎡ ≈ 17.8평 (소형 아파트, '59타입')",
        "84㎡ ≈ 25.4평 (국민 평형, '84타입')",
        "32평 ≈ 105.8㎡",
        "1평 = 3.3058㎡ / 1㎡ = 0.3025평",
      ],
    },
    {
      heading: "분양면적·전용면적·공급면적은 다르다",
      paragraphs: [
        "같은 집인데 '25평'과 '34평'이 같이 쓰이는 이유는 면적 기준이 여러 개라서입니다. 전용면적은 현관문 안쪽, 실제 우리 가족만 쓰는 공간입니다. 공급(분양)면적은 전용면적에 계단·복도·엘리베이터 같은 주거 공용면적을 더한 것입니다.",
        "아파트 청약·분양에서 말하는 '84㎡'는 보통 전용면적입니다. 전용 84㎡는 분양면적으로는 약 33~34평이 되는데, 광고에 '34평형'이라 적히는 게 이 때문입니다. 면적을 비교할 때는 항상 '전용'인지 '공급'인지 먼저 확인하세요.",
      ],
    },
    {
      heading: "토지·상가에도 그대로",
      paragraphs: [
        "평수 변환은 아파트뿐 아니라 토지, 상가, 사무실 면적에도 똑같이 적용됩니다. 등기부등본이나 건축물대장은 ㎡로 적혀 있으니, 평으로 감을 잡고 싶을 때 이 도구를 쓰면 됩니다. 입력값은 서버로 전송되지 않습니다.",
      ],
    },
  ],
};

const faqs = [
  {
    question: "84㎡는 몇 평인가요?",
    answer:
      "약 25.4평입니다. ㎡를 3.3058로 나누면 평이 됩니다. 다만 이는 전용면적 기준이고, 분양(공급)면적으로는 보통 33~34평형으로 광고됩니다.",
  },
  {
    question: "1평은 몇 ㎡인가요?",
    answer:
      "약 3.3058㎡입니다(정확히는 400/121). 반대로 1㎡는 약 0.3025평입니다.",
  },
  {
    question: "전용면적과 분양면적은 뭐가 다른가요?",
    answer:
      "전용면적은 현관 안쪽 실제 사용 공간이고, 분양(공급)면적은 여기에 계단·복도 같은 주거 공용면적을 더한 것입니다. 그래서 같은 집도 전용 84㎡가 분양 34평형으로 표기됩니다.",
  },
  {
    question: "32평은 몇 ㎡인가요?",
    answer:
      "약 105.8㎡입니다. 평에 3.3058을 곱하면 ㎡가 됩니다.",
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
      <UnitConverter set="area" toolName="pyeong" />
    </ToolLayout>
  );
}
