import type { Metadata } from "next";
import ToolLayout from "@/components/common/ToolLayout";
import LadderTool from "@/components/random/LadderTool";
import { SITE_URL } from "@/lib/common/constants";

const PAGE_URL = `${SITE_URL}/tools/random/ladder`;

export const metadata: Metadata = {
  title: "사다리타기 - 온라인으로 공정하게",
  description:
    "이름과 결과만 넣으면 사다리타기를 바로. 경로를 따라가는 애니메이션으로 결과를 확인하고, 가로줄은 난수로 공정하게 배치됩니다. 회원가입 없이 무료, 참가자 이름은 사다리와 함께 사라집니다.",
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
      heading: "가로줄은 누를 때마다 새로 놓입니다",
      paragraphs: [
        "사다리의 공정함은 가로줄이 어디에 놓이느냐에서 나옵니다. 이 위치는 만들 때마다 브라우저 난수로 새로 정해져, 같은 인원이어도 판마다 사다리 모양이 달라집니다. 결과가 마음에 걸리면 '사다리 다시 놓기'로 이전 배치를 버리고 새 판을 그리면 됩니다.",
        "그래서 이름을 넣는 순서를 바꾸든 사다리를 다시 놓든 특정 사람이 유리해지지 않습니다. 이름과 결과는 사다리를 그리는 데만 쓰이고, 화면을 벗어나 어디론가 전송되지 않습니다.",
      ],
    },
    {
      heading: "가로줄을 놓는 난수, 열어 볼 수 있습니다",
      paragraphs: [
        "가로줄이 어느 자리에 생길지는 브라우저의 암호학적 난수(crypto.getRandomValues)가 한 칸씩 정합니다. 난수를 자리 수로 나눌 때 생기는 미세한 치우침(모듈로 편향)은, 치우침이 남는 값을 버리고 새로 뽑는 방식으로 없앱니다. 덕분에 어떤 세로줄도 남보다 가로줄이 잘 붙거나 덜 붙지 않습니다.",
        "이 난수 계산은 어딘가의 서버가 아니라 페이지와 함께 내려받는 공개 코드 안에서 돌아갑니다. 결과가 미심쩍으면 코드를 그대로 뜯어보면 되고, 그래서 '공정하다'는 말이 주장에만 그치지 않습니다.",
      ],
    },
    {
      heading: "겹치지 않는 것도, 매 판이 새로 시작하는 것도",
      paragraphs: [
        "가로줄 하나는 맞닿은 두 세로줄을 서로 맞바꾸는 일만 합니다. 이런 맞바꿈을 몇 번을 거쳐도 출발지와 도착지는 언제나 일대일로 짝지어지므로, 두 사람이 같은 결과에 도착하는 경우는 구조상 나오지 않습니다. 인원수만큼의 결과가 하나씩 빠짐없이 나뉘는 건 운이 아니라 이 맞바꿈이 보장하는 성질입니다.",
        "한편 '사다리 다시 놓기'를 누르면 이전 판은 깨끗이 지워지고 처음부터 다시 그려집니다. 그러니 '지난 판에 꽝이었으니 이번엔 당첨 차례'라는 기대는 들어맞을 이유가 없습니다. 매 판은 앞 결과와 무관한 독립 시행이라, 같은 사람이 연달아 같은 자리를 뽑아도 이상할 게 없습니다.",
      ],
    },
  ],
};

const faqs = [
  {
    question: "사다리타기는 왜 결과가 겹치지 않나요?",
    answer:
      "세로줄을 내려가다 가로줄을 만나면 옆으로 꺾는 구조라, 출발점이 다르면 도착점도 반드시 달라집니다. 덕분에 인원수만큼의 결과가 정확히 하나씩 나뉩니다.",
  },
  {
    question: "사다리를 만들기 전에 결과를 알 수 있나요?",
    answer:
      "없습니다. 가로줄은 '사다리 만들기'를 누르는 순간 난수로 배치되므로, 그 전에는 어떤 경로가 생길지 아무도 미리 알 수 없습니다.",
  },
  {
    question: "몇 명까지 할 수 있나요?",
    answer: "2명부터 8명까지 가능합니다. 인원을 고르면 이름·결과 칸이 그만큼 만들어집니다.",
  },
  {
    question: "적어 넣은 이름은 어디에 남나요?",
    answer:
      "남지 않습니다. 이름과 결과는 사다리를 그리는 동안만 화면에 있다가, 창을 닫으면 함께 지워집니다. 누가 꽝을 뽑았는지 되짚을 기록이 없으니 뒤끝도 없습니다.",
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
