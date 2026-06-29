import type { Metadata } from "next";
import ToolLayout from "@/components/common/ToolLayout";
import LadderTool from "@/components/random/LadderTool";
import { SITE_URL } from "@/lib/common/constants";

const PAGE_URL = `${SITE_URL}/tools/random/ladder`;

export const metadata: Metadata = {
  title: "사다리타기 - 온라인으로 공정하게",
  description:
    "이름과 결과만 넣으면 사다리타기를 바로. 경로를 따라가는 애니메이션으로 결과를 확인하고, 가로줄은 난수로 공정하게 배치됩니다. 회원가입 없이 무료입니다.",
  keywords: [
    "사다리타기",
    "온라인 사다리타기",
    "사다리 게임",
    "사다리타기 사이트",
    "제비뽑기",
    "내기 사다리",
    "사다리 뽑기",
  ],
  openGraph: {
    title: "사다리타기 - 온라인으로 공정하게",
    description: "이름과 결과를 넣고 사다리타기. 경로 애니메이션, 난수로 공정하게.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "사다리타기 - 온라인으로 공정하게",
    description: "이름과 결과를 넣고 사다리타기. 경로 애니메이션으로 결과 확인.",
  },
  alternates: { canonical: PAGE_URL },
};

const guide = {
  intro:
    "내기나 역할을 정할 때 사다리타기만큼 깔끔한 방법도 없습니다. 종이에 그릴 필요 없이, 인원과 결과만 넣으면 바로 사다리가 만들어집니다. 각 참가자의 경로를 따라가는 애니메이션으로 결과를 확인할 수 있습니다.",
  sections: [
    {
      heading: "사다리타기 하는 법",
      paragraphs: [
        "먼저 인원(2~8명)을 고르고, 위쪽에 참가자 이름을, 아래쪽에 결과(당첨·꽝·역할 등)를 적습니다. '사다리 만들기'를 누르면 가로줄이 무작위로 배치됩니다. 참가자 아래의 '출발' 버튼을 누르면 그 사람의 경로가 그려지며 어떤 결과에 도착하는지 보여줍니다.",
        "사다리타기는 세로줄을 따라 내려가다 가로줄을 만나면 옆으로 이동하는 게임입니다. 신기하게도 출발점이 다르면 도착점도 반드시 달라져, 결과가 겹치지 않습니다. 그래서 공정한 추첨에 알맞습니다.",
      ],
    },
    {
      heading: "조작 없이 공정하게",
      paragraphs: [
        "가로줄은 브라우저의 암호학적 난수(crypto)로 배치됩니다. 미리 정해진 결과가 없고, 매번 새로 누르면 사다리도 새로 만들어집니다. 결과가 마음에 안 들어 다시 돌리고 싶을 때도 '사다리 다시 놓기'로 새 판을 시작할 수 있습니다.",
        "모든 처리는 브라우저 안에서 이루어지며, 입력한 이름이나 결과는 서버로 전송되지 않습니다.",
      ],
    },
  ],
};

const faqs = [
  {
    question: "사다리타기 결과는 어떻게 정해지나요?",
    answer:
      "가로줄을 따라 세로줄을 오가며 내려가 도착하는 칸이 결과입니다. 출발점이 다르면 도착점도 반드시 달라 결과가 겹치지 않습니다.",
  },
  {
    question: "결과가 미리 정해져 있나요?",
    answer:
      "아니요. 가로줄은 누를 때마다 암호학적 난수로 새로 배치됩니다. 정해진 답 없이 공정하게 결정됩니다.",
  },
  {
    question: "몇 명까지 할 수 있나요?",
    answer: "2명부터 8명까지 가능합니다. 인원을 고르면 이름·결과 칸이 그만큼 만들어집니다.",
  },
  {
    question: "입력한 이름이 저장되나요?",
    answer:
      "아니요. 모든 처리는 브라우저 안에서 이루어지며 이름·결과가 서버로 전송되거나 저장되지 않습니다.",
  },
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "사다리타기",
    applicationCategory: "GameApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
    description: "이름과 결과를 넣어 온라인으로 사다리타기를 하는 무료 도구. 난수로 공정하게 배치.",
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

export default function LadderPage() {
  return (
    <ToolLayout
      title="사다리타기"
      description="이름과 결과를 넣으면 바로. 경로 애니메이션으로 공정하게."
      guide={guide}
      faqs={faqs}
      currentToolHref="/tools/random/ladder"
      relatedPostSlugs={["random-picker-guide"]}
      schemas={schemas}
    >
      <LadderTool />
    </ToolLayout>
  );
}
