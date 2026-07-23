import type { Metadata } from "next";
import ToolLayout from "@/components/common/ToolLayout";
import ContrastTool from "@/components/color/ContrastTool";
import { SITE_URL } from "@/lib/common/constants";

const PAGE_URL = `${SITE_URL}/tools/color/contrast`;

export const metadata: Metadata = {
  title: "색상 대비 검사 - 웹접근성 WCAG AA·AAA",
  description:
    "글자색과 배경색의 명도 대비를 WCAG 기준으로 검사합니다. 대비비와 AA·AAA 통과 여부, 실제 가독성 미리보기까지. 검사는 브라우저의 명도 계산만으로 끝납니다.",
  keywords: [
    "색상 대비 검사",
    "명도 대비",
    "웹접근성 대비",
    "WCAG 대비",
    "색 대비 검사기",
    "글자 가독성",
    "contrast checker",
  ],
  openGraph: {
    title: "색상 대비 검사 - 웹접근성 WCAG AA·AAA",
    description: "글자색·배경색 대비비와 AA·AAA 통과 여부를 미리보기와 함께.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "색상 대비 검사 - 웹접근성 WCAG AA·AAA",
    description: "글자색·배경색 대비를 WCAG 기준으로 검사.",
  },
  alternates: { canonical: PAGE_URL },
};

const guide = {
  intro:
    "글자색과 배경색의 대비가 약하면 읽기 어렵고, 저시력 사용자에게는 더 큰 장벽이 됩니다. 웹접근성 지침은 이 대비를 수치로 정해 두었습니다. 이 도구는 두 색의 대비비를 계산하고, WCAG 기준 통과 여부를 미리보기와 함께 보여줍니다.",
  sections: [
    {
      heading: "대비비와 WCAG 기준",
      paragraphs: [
        "대비비는 두 색의 밝기 차이를 1:1(같음)부터 21:1(검정과 흰색)까지로 나타냅니다. 숫자가 클수록 또렷하게 구분됩니다. WCAG 2.1은 텍스트 종류별로 최소 대비를 정해 두었습니다.",
      ],
      bullets: [
        "AA · 일반 텍스트: 4.5 : 1 이상 (가장 널리 쓰이는 기준)",
        "AA · 큰 텍스트(약 18pt·굵게 14pt 이상): 3 : 1 이상",
        "AAA · 일반 텍스트: 7 : 1 이상 (더 엄격)",
        "AAA · 큰 텍스트: 4.5 : 1 이상",
      ],
    },
    {
      heading: "한국 웹접근성(KWCAG)에서도 중요",
      paragraphs: [
        "한국형 웹콘텐츠 접근성 지침(KWCAG)도 본문 텍스트에 4.5 : 1 이상의 명도 대비를 권장합니다. 공공기관·기업 사이트는 접근성 인증에서 이 항목을 점검받기 때문에, 브랜드 색을 정할 때 미리 확인해 두면 좋습니다.",
        "이 도구는 색을 바꾸는 즉시 대비비와 통과 여부가 갱신되고, 실제 글자가 어떻게 보이는지 미리보기로 확인할 수 있습니다. 모든 계산은 브라우저 안에서 이루어집니다.",
      ],
    },
    {
      heading: "합격·불합격 예시로 감 잡기",
      paragraphs: [
        "수치만 보면 막연하니 흰 배경(#FFFFFF)에 글자색을 바꿔 가며 대비를 재 봅니다. 회색 계열은 경계가 애매해서 특히 헷갈리는데, 실제 값으로 보면 선이 또렷해집니다.",
      ],
      bullets: [
        "#767676 글자 → 4.54 : 1. 본문 AA를 겨우 통과하는 하한선입니다.",
        "#999999 글자 → 2.85 : 1. 흔히 쓰는 연회색이지만 본문 기준에는 미달입니다.",
        "#595959 글자 → 7.0 : 1. AAA까지 통과해 긴 글에도 안전합니다.",
        "다크 테마라면 #0A0A0A 배경에 #FAFAFA 글자가 약 19 : 1로 넉넉합니다.",
      ],
    },
    {
      heading: "버튼·링크·비활성 요소는 특히 조심",
      paragraphs: [
        "배경이 브랜드 색인 버튼도 같은 방식으로 확인합니다. 강조색 위에 흰 글자를 얹었을 때 3 : 1도 안 나오면, 글자를 굵게 키우거나 배경을 한 톤 어둡게 조정하는 편이 낫습니다.",
        "대비가 가장 자주 무너지는 곳은 '연하게' 처리하는 요소입니다. 흐린 회색 플레이스홀더, 옅은 링크색, 비활성 버튼의 라벨은 보기엔 세련돼도 읽기 힘든 경우가 많으니, 최소 대비를 넘겼는지 꼭 재 보세요.",
      ],
    },
  ],
};

const faqs = [
  {
    question: "본문 글자는 대비가 얼마나 나와야 하나요?",
    answer:
      "WCAG AA에서 일반 텍스트는 4.5 : 1, 18pt 이상(또는 굵은 14pt)의 큰 텍스트는 3 : 1이 최소선입니다. 더 엄격한 AAA는 각각 7 : 1과 4.5 : 1을 요구합니다.",
  },
  {
    question: "'큰 텍스트'는 몇 pt부터인가요?",
    answer:
      "약 18pt(24px) 이상, 굵은 글씨라면 14pt(약 18.5px) 이상을 큰 텍스트로 봅니다. 큰 텍스트는 더 낮은 대비도 허용됩니다.",
  },
  {
    question: "대비비는 어떻게 계산하나요?",
    answer:
      "각 색의 상대 명도를 구한 뒤 (밝은 색 + 0.05) ÷ (어두운 색 + 0.05)로 계산합니다. 검정과 흰색이 21 : 1로 가장 높습니다. 이 도구가 자동으로 계산합니다.",
  },
  {
    question: "입력한 색이 저장되나요?",
    answer:
      "아니요. 글자색과 배경색의 HEX 코드는 현재 화면에서 대비를 계산할 때만 사용되며, 서버에 보내거나 따로 저장하지 않습니다.",
  },
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "색상 대비 검사",
    applicationCategory: "DesignApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
    description:
      "글자색·배경색의 명도 대비를 WCAG 기준으로 검사하고 AA·AAA 통과 여부를 판정하는 무료 도구.",
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

export default function ContrastPage() {
  return (
    <ToolLayout
      title="색상 대비 검사"
      description="글자색·배경색 대비를 WCAG 기준으로. AA·AAA 통과 여부와 미리보기까지."
      guide={guide}
      faqs={faqs}
      currentToolHref="/tools/color/contrast"
      relatedPostSlugs={["color-code-guide"]}
      schemas={schemas}
    >
      <ContrastTool />
    </ToolLayout>
  );
}
