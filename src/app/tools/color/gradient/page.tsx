import type { Metadata } from "next";
import ToolLayout from "@/components/common/ToolLayout";
import GradientTool from "@/components/color/GradientTool";
import { SITE_URL } from "@/lib/common/constants";

const PAGE_URL = `${SITE_URL}/tools/color/gradient`;

export const metadata: Metadata = {
  title: "CSS 그라데이션 생성기 - 코드 바로 복사",
  description:
    "색을 고르면 CSS 그라데이션 코드를 바로 만듭니다. 선형·원형, 방향, 색 정지점을 조절하고 실시간 미리보기로 확인한 뒤 복사하세요. 회원가입 없이 무료입니다.",
  keywords: [
    "css 그라데이션",
    "그라데이션 생성기",
    "gradient css",
    "css gradient generator",
    "그라디언트 코드",
    "background gradient",
    "linear-gradient",
  ],
  openGraph: {
    title: "CSS 그라데이션 생성기 - 코드 바로 복사",
    description: "선형·원형 그라데이션을 만들고 CSS 코드를 바로 복사. 실시간 미리보기.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CSS 그라데이션 생성기 - 코드 바로 복사",
    description: "선형·원형 그라데이션 코드를 실시간 미리보기와 함께.",
  },
  alternates: { canonical: PAGE_URL },
};

const guide = {
  intro:
    "그라데이션은 CSS로 직접 적기엔 문법이 번거롭습니다. 각도, 색, 정지점 위치를 일일이 외우기보다 눈으로 조절하는 게 빠르죠. 이 도구는 색을 고르고 슬라이더를 움직이면 CSS 코드를 바로 만들어, 복사해 붙여넣기만 하면 됩니다.",
  sections: [
    {
      heading: "선형과 원형 그라데이션",
      paragraphs: [
        "선형(linear) 그라데이션은 한 방향으로 색이 흐르고, 원형(radial) 그라데이션은 중심에서 바깥으로 퍼집니다. 선형은 각도(0~360도)로 방향을 정합니다. 0도는 아래에서 위로, 90도는 왼쪽에서 오른쪽으로 흐릅니다.",
      ],
      bullets: [
        "색 정지점을 최대 5개까지 더해 여러 색을 이을 수 있습니다.",
        "각 정지점의 위치(%)를 조절해 색이 바뀌는 지점을 정합니다.",
        "미리보기를 보며 조절하고, 완성되면 CSS 코드를 복사합니다.",
      ],
    },
    {
      heading: "복사해서 바로 쓰기",
      paragraphs: [
        "결과는 background: linear-gradient(...) 형태의 CSS로 출력됩니다. 복사 버튼을 눌러 그대로 스타일시트나 인라인 스타일에 붙여넣으면 됩니다. 버튼 배경, 카드 헤더, 히어로 영역 배경 등에 활용하기 좋습니다.",
        "모든 처리는 브라우저 안에서 이루어지며, 별도의 회원가입이나 저장 없이 바로 사용할 수 있습니다.",
      ],
    },
  ],
};

const faqs = [
  {
    question: "CSS 그라데이션은 어떻게 만드나요?",
    answer:
      "색을 고르고 선형·원형, 각도, 정지점 위치를 조절하면 background: linear-gradient(...) 형태의 CSS 코드가 자동으로 만들어집니다. 복사해서 붙여넣으면 됩니다.",
  },
  {
    question: "선형과 원형은 뭐가 다른가요?",
    answer:
      "선형은 한 방향으로 색이 흐르고, 원형은 중심에서 바깥으로 퍼집니다. 선형은 각도로 방향을 정합니다.",
  },
  {
    question: "색을 몇 개까지 넣을 수 있나요?",
    answer:
      "색 정지점을 최대 5개까지 추가할 수 있습니다. 각 색의 위치(%)를 조절해 색이 바뀌는 지점을 정합니다.",
  },
  {
    question: "만든 코드는 어디에 쓰나요?",
    answer:
      "출력된 background 코드를 CSS 스타일시트나 인라인 스타일에 붙여넣으면 됩니다. 버튼·카드·배경 등에 활용할 수 있습니다.",
  },
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CSS 그라데이션 생성기",
    applicationCategory: "DesignApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
    description:
      "선형·원형 CSS 그라데이션을 만들고 코드를 복사하는 무료 도구. 실시간 미리보기 제공.",
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

export default function GradientPage() {
  return (
    <ToolLayout
      title="CSS 그라데이션 생성기"
      description="색을 고르면 CSS 코드를. 방향·정지점 조절, 실시간 미리보기, 바로 복사."
      guide={guide}
      faqs={faqs}
      currentToolHref="/tools/color/gradient"
      relatedPostSlugs={["color-code-guide"]}
      schemas={schemas}
    >
      <GradientTool />
    </ToolLayout>
  );
}
