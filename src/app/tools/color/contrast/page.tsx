import type { Metadata } from "next";
import ToolLayout from "@/components/common/ToolLayout";
import ContrastTool from "@/components/color/ContrastTool";
import { SITE_URL } from "@/lib/common/constants";

const PAGE_URL = `${SITE_URL}/tools/color/contrast`;

export const metadata: Metadata = {
  title: "색상 대비 검사 - 웹접근성 WCAG AA·AAA",
  description:
    "글자색과 배경색의 명도 대비를 WCAG 기준으로 검사합니다. 대비비와 AA·AAA 통과 여부, 실제 가독성 미리보기까지. 회원가입 없이 무료, 입력값은 저장·전송되지 않습니다.",
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
  ],
};

const faqs = [
  {
    question: "색상 대비비는 얼마 이상이어야 하나요?",
    answer:
      "WCAG AA 기준으로 일반 텍스트는 4.5 : 1, 큰 텍스트(약 18pt 이상)는 3 : 1 이상이어야 합니다. 더 엄격한 AAA는 각각 7 : 1, 4.5 : 1입니다.",
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
      "아니요. 모든 계산은 브라우저 안에서 이루어지며 입력값이 서버로 전송되거나 저장되지 않습니다.",
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
