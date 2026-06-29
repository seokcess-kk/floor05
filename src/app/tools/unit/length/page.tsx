import type { Metadata } from "next";
import ToolLayout from "@/components/common/ToolLayout";
import UnitConverter from "@/components/unit/UnitConverter";
import { SITE_URL } from "@/lib/common/constants";

const PAGE_URL = `${SITE_URL}/tools/unit/length`;

export const metadata: Metadata = {
  title: "길이 변환 - cm 인치 m 피트 한 번에",
  description:
    "센티미터, 인치, 미터, 피트, 밀리미터, 킬로미터를 한 화면에서 양방향 변환합니다. 인치를 cm로, cm를 인치로 어느 칸에 넣어도 바로. 회원가입 없이 무료, 입력값은 저장·전송되지 않습니다.",
  keywords: [
    "cm 인치 변환",
    "인치 cm",
    "길이 변환",
    "인치 센티미터 변환",
    "피트 cm 변환",
    "단위 변환",
    "mm cm m 변환",
  ],
  openGraph: {
    title: "길이 변환 - cm 인치 m 피트 한 번에",
    description: "cm·인치·m·피트·mm·km를 한 화면에서 양방향 즉시 변환.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "길이 변환 - cm 인치 m 피트 한 번에",
    description: "cm·인치·m·피트를 어느 칸에 넣어도 바로 변환.",
  },
  alternates: { canonical: PAGE_URL },
};

const guide = {
  intro:
    "모니터·TV는 인치, 키는 cm, 운동장은 m로 잽니다. 단위가 섞이면 감이 안 잡히죠. 이 도구는 cm·인치·m·피트·mm·km를 한 화면에 놓고, 어느 칸에든 값을 넣으면 나머지가 바로 바뀌게 했습니다.",
  sections: [
    {
      heading: "cm와 인치, 자주 쓰는 변환",
      paragraphs: [
        "1인치는 정확히 2.54cm입니다. 그래서 인치를 cm로 바꾸려면 2.54를 곱하고, cm를 인치로 바꾸려면 2.54로 나눕니다. 청바지·모니터·타이어처럼 인치로 표기되는 물건의 크기를 가늠할 때 자주 쓰입니다.",
      ],
      bullets: [
        "1인치 = 2.54cm",
        "1피트 = 30.48cm (= 12인치)",
        "27인치 모니터 ≈ 68.6cm (대각선)",
        "1m = 100cm = 약 39.4인치",
      ],
    },
    {
      heading: "어느 칸에 넣어도 바로",
      paragraphs: [
        "이 변환기는 한 방향이 아니라 양방향입니다. cm 칸에 170을 넣으면 인치·m·피트가 동시에 바뀌고, 반대로 인치 칸에 값을 넣으면 cm가 바뀝니다. 변환 방향을 고를 필요 없이, 알고 있는 값을 아무 칸에나 넣으면 됩니다.",
        "모든 계산은 브라우저 안에서 즉시 이루어지며, 입력값은 서버로 전송되지 않습니다.",
      ],
    },
  ],
};

const faqs = [
  {
    question: "1인치는 몇 cm인가요?",
    answer: "정확히 2.54cm입니다. 인치에 2.54를 곱하면 cm가 됩니다.",
  },
  {
    question: "cm를 인치로 어떻게 바꾸나요?",
    answer:
      "cm를 2.54로 나누면 인치가 됩니다. 예를 들어 30cm는 약 11.8인치입니다. 이 도구의 cm 칸에 값을 넣으면 인치가 바로 표시됩니다.",
  },
  {
    question: "1피트는 몇 cm인가요?",
    answer: "30.48cm입니다(= 12인치). 피트는 주로 키나 높이를 영미권 단위로 표기할 때 씁니다.",
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
    name: "길이 변환",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
    description: "cm·인치·m·피트·mm·km를 양방향으로 변환하는 무료 도구.",
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

export default function LengthPage() {
  return (
    <ToolLayout
      title="길이 변환"
      description="cm·인치·m·피트를 한 화면에서. 어느 칸에 넣어도 바로 변환됩니다."
      guide={guide}
      faqs={faqs}
      currentToolHref="/tools/unit/length"
      schemas={schemas}
    >
      <UnitConverter set="length" toolName="length" />
    </ToolLayout>
  );
}
