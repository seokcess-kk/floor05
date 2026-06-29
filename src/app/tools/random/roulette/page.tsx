import type { Metadata } from "next";
import ToolLayout from "@/components/common/ToolLayout";
import RouletteTool from "@/components/random/RouletteTool";
import { SITE_URL } from "@/lib/common/constants";

const PAGE_URL = `${SITE_URL}/tools/random/roulette`;

export const metadata: Metadata = {
  title: "룰렛 돌리기 - 점심 메뉴·벌칙 돌림판",
  description:
    "항목만 넣으면 돌림판이 바로. 점심 메뉴, 벌칙, 당첨자를 룰렛으로 공정하게 정하세요. 가중치 조절도 가능, 회원가입 없이 무료입니다.",
  keywords: [
    "룰렛 돌리기",
    "돌림판",
    "점심 메뉴 룰렛",
    "랜덤 룰렛",
    "메뉴 추천 룰렛",
    "벌칙 룰렛",
    "온라인 룰렛",
  ],
  openGraph: {
    title: "룰렛 돌리기 - 점심 메뉴·벌칙 돌림판",
    description: "항목을 넣고 돌림판을 돌려 공정하게. 가중치 조절도 가능.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "룰렛 돌리기 - 점심 메뉴·벌칙 돌림판",
    description: "항목을 넣고 돌림판을 돌려 공정하게 결정.",
  },
  alternates: { canonical: PAGE_URL },
};

const guide = {
  intro:
    "점심 메뉴가 안 정해질 때, 벌칙 받을 사람을 뽑을 때, 당첨자를 고를 때 돌림판 하나면 깔끔합니다. 항목만 적어 넣고 돌리면 됩니다. 특정 항목이 더 잘 나오게 가중치도 줄 수 있습니다.",
  sections: [
    {
      heading: "룰렛 사용법",
      paragraphs: [
        "항목 칸에 후보를 적습니다(예: 한식·중식·일식). '돌리기'를 누르면 돌림판이 회전하다 멈추고, 위쪽 화살표가 가리키는 항목이 당첨입니다. 항목은 최대 12개까지 추가할 수 있습니다.",
        "각 항목 옆 숫자는 가중치입니다. 기본은 모두 1로 공평하지만, 어떤 항목을 더 자주 나오게 하고 싶으면 숫자를 키우면 됩니다. 가중치가 2이면 1인 항목보다 두 배 자주 나옵니다.",
      ],
    },
    {
      heading: "조작 없이 공정하게",
      paragraphs: [
        "당첨 항목은 브라우저의 암호학적 난수(crypto)로 정해집니다. 미리 정해진 결과가 없고, 돌릴 때마다 새로 뽑습니다. 돌림판의 회전은 결과를 보여주기 위한 연출이며, 실제 당첨은 가중치에 따라 공정하게 결정됩니다.",
        "모든 처리는 브라우저 안에서 이루어지며, 입력한 항목은 서버로 전송되지 않습니다.",
      ],
    },
  ],
};

const faqs = [
  {
    question: "룰렛 항목은 몇 개까지 넣을 수 있나요?",
    answer: "2개부터 12개까지 넣을 수 있습니다. '항목 추가'로 늘리고, ✕로 지웁니다.",
  },
  {
    question: "특정 항목이 더 잘 나오게 할 수 있나요?",
    answer:
      "네. 각 항목 옆 가중치 숫자를 키우면 그 항목이 더 자주 나옵니다. 가중치 2는 1보다 두 배 확률입니다.",
  },
  {
    question: "결과가 조작되지는 않나요?",
    answer:
      "당첨은 브라우저의 암호학적 난수로 정해지며 미리 정해진 결과가 없습니다. 회전 애니메이션은 연출일 뿐, 실제 당첨은 공정하게 뽑힙니다.",
  },
  {
    question: "입력한 항목이 저장되나요?",
    answer:
      "아니요. 모든 처리는 브라우저 안에서 이루어지며 항목이 서버로 전송되거나 저장되지 않습니다.",
  },
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "룰렛 돌리기",
    applicationCategory: "GameApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
    description: "점심 메뉴·벌칙·당첨자를 정하는 온라인 룰렛 도구. 가중치 조절, 난수로 공정하게.",
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

export default function RoulettePage() {
  return (
    <ToolLayout
      title="룰렛 돌리기"
      description="항목만 넣으면 돌림판이 바로. 점심 메뉴·벌칙·당첨자를 공정하게."
      guide={guide}
      faqs={faqs}
      currentToolHref="/tools/random/roulette"
      relatedPostSlugs={["random-picker-guide"]}
      schemas={schemas}
    >
      <RouletteTool />
    </ToolLayout>
  );
}
