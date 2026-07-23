import type { Metadata } from "next";
import ToolLayout from "@/components/common/ToolLayout";
import RouletteTool from "@/components/random/RouletteTool";
import { SITE_URL } from "@/lib/common/constants";

const PAGE_URL = `${SITE_URL}/tools/random/roulette`;

export const metadata: Metadata = {
  title: "룰렛 돌리기 - 점심 메뉴·벌칙 돌림판",
  description:
    "항목만 넣으면 돌림판이 바로. 점심 메뉴, 벌칙, 당첨자를 룰렛으로 공정하게 정하세요. 가중치 조절도 가능. 무료이고, 돌린 항목은 화면 위에만 잠시 머뭅니다.",
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
      heading: "회전은 연출, 당첨은 난수",
      paragraphs: [
        "돌림판이 도는 동안 결과가 정해지는 게 아닙니다. '돌리기'를 누른 순간 당첨 항목이 브라우저 난수로 확정되고, 회전은 그 항목 앞에 화살표가 오도록 멈추는 연출일 뿐입니다. 그래서 '한 바퀴만 더 돌면 바뀔까' 같은 여지는 없습니다.",
        "가중치를 다르게 줬다면 그만큼 부채꼴 넓이가 달라집니다. 넓이와 확률이 정확히 비례하도록 계산하니, 화면에서 넓어 보이는 칸이 실제로도 그만큼 자주 걸립니다.",
      ],
    },
    {
      heading: "이럴 때 돌리고, 이런 오해는 접어 두기",
      paragraphs: [
        "후보가 여럿인 점심·회식 메뉴, 벌칙이나 청소 당번, 소규모 경품처럼 '여럿 중 하나'를 골라야 할 때 어울립니다. 여러 사람이 한 화면을 보며 돌리면 결과를 다 같이 동시에 확인하니 시비가 줄어드는 것도 장점입니다.",
        "가끔 '아까 그 메뉴가 또 나왔다'며 룰렛이 특정 항목에 치우친 것 아니냐 묻습니다. 하지만 매 회전은 앞선 결과와 무관하게 새로 뽑히기 때문에, 같은 항목이 연달아 나오는 것도 정상 범위입니다. 주사위를 굴려 6이 두 번 잇따라 나오는 것과 다르지 않습니다.",
      ],
    },
  ],
};

const faqs = [
  {
    question: "룰렛에 항목을 몇 개까지 올릴 수 있나요?",
    answer:
      "2개부터 12개까지 올릴 수 있습니다. '항목 추가'로 칸을 늘리고 ✕ 버튼으로 지웁니다. 다만 항목이 너무 많으면 부채꼴이 좁아 읽기 어려우니, 6~8개 안팎이 보기 좋습니다.",
  },
  {
    question: "메뉴 하나만 더 자주 나오게 하고 싶어요.",
    answer:
      "각 항목 옆 가중치 숫자를 올리면 그 항목의 부채꼴이 넓어져 더 자주 걸립니다. 예를 들어 가중치를 3으로 두면 1인 항목보다 세 배 자주 나옵니다.",
  },
  {
    question: "돌릴 때마다 결과가 정말 새로 정해지나요?",
    answer:
      "네. '돌리기'를 누를 때마다 브라우저가 새 난수를 뽑아 당첨을 정합니다. 앞선 결과나 회전 속도와는 무관하게, 매번 처음부터 다시 뽑습니다.",
  },
  {
    question: "돌린 항목이 어딘가 기록되나요?",
    answer:
      "아니요. 후보와 결과는 룰렛이 도는 동안만 화면에 있다가 창을 닫으면 지워집니다. 오늘 누가 벌칙에 걸렸는지는 남는 데가 없습니다.",
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
