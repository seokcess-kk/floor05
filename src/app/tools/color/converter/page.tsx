import type { Metadata } from "next";
import ToolLayout from "@/components/common/ToolLayout";
import ColorConverterTool from "@/components/color/ColorConverterTool";
import { SITE_URL } from "@/lib/common/constants";

const PAGE_URL = `${SITE_URL}/tools/color/converter`;

export const metadata: Metadata = {
  title: "색상 코드 변환 - HEX RGB HSL CMYK 한 번에",
  description:
    "색을 고르거나 HEX를 입력하면 RGB·HSL·CMYK 코드를 바로 변환합니다. 클릭 한 번으로 복사까지. 회원가입 없이 무료, 입력값은 저장·전송되지 않습니다.",
  keywords: [
    "색상코드 변환",
    "rgb hex 변환",
    "hex rgb 변환",
    "색상 코드",
    "cmyk 변환",
    "hsl 변환",
    "컬러 코드 변환",
  ],
  openGraph: {
    title: "색상 코드 변환 - HEX RGB HSL CMYK 한 번에",
    description: "HEX·RGB·HSL·CMYK를 양방향 즉시 변환하고 한 번에 복사.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "색상 코드 변환 - HEX RGB HSL CMYK 한 번에",
    description: "HEX·RGB·HSL·CMYK 즉시 변환·복사.",
  },
  alternates: { canonical: PAGE_URL },
};

const guide = {
  intro:
    "디자인 도구는 HEX, 코드에서는 RGB, 색을 조정할 때는 HSL, 인쇄에서는 CMYK를 씁니다. 같은 색이라도 표기법이 제각각이라 변환이 자주 필요합니다. 이 도구는 색을 고르거나 코드를 입력하면 네 가지 형식을 한 번에 보여주고 복사까지 해줍니다.",
  sections: [
    {
      heading: "HEX·RGB·HSL·CMYK는 무엇이 다른가",
      paragraphs: [
        "모두 같은 색을 다르게 적는 방법입니다. 어디에 쓰느냐에 따라 편한 표기가 다릅니다.",
      ],
      bullets: [
        "HEX: #RRGGBB 16진수. 웹·디자인에서 가장 흔하게 쓰입니다.",
        "RGB: 빨강·초록·파랑을 0~255로. CSS와 코드에서 직관적입니다.",
        "HSL: 색상(Hue)·채도(Saturation)·명도(Lightness). 색을 미세 조정할 때 편합니다.",
        "CMYK: 인쇄 4원색. 화면(RGB) 기준의 근사값으로, 실제 인쇄색은 프로파일에 따라 다릅니다.",
      ],
    },
    {
      heading: "양방향 변환과 복사",
      paragraphs: [
        "색상 피커로 색을 고르거나, HEX 칸에 코드를 직접 입력하거나, RGB 슬라이더로 미세 조정할 수 있습니다. 어느 쪽을 바꿔도 나머지 표기가 즉시 갱신됩니다. rgb()나 hsl() 형식을 그대로 붙여넣어도 인식합니다.",
        "각 표기 옆 복사 버튼으로 코드를 바로 클립보드에 담아 CSS나 디자인 도구에 붙여넣으세요. 모든 변환은 브라우저 안에서 이루어지며 입력값은 서버로 전송되지 않습니다.",
      ],
    },
  ],
};

const faqs = [
  {
    question: "HEX를 RGB로 어떻게 바꾸나요?",
    answer:
      "HEX 칸에 #C45C2C처럼 입력하면 RGB(196, 92, 44)로 바로 변환되어 표시됩니다. 반대로 RGB 슬라이더를 움직이면 HEX가 갱신됩니다.",
  },
  {
    question: "CMYK 값은 정확한가요?",
    answer:
      "화면(RGB)을 기준으로 한 근사 변환입니다. 실제 인쇄 색은 용지·잉크·컬러 프로파일에 따라 달라지므로, 정밀 인쇄에는 전용 프로파일 변환을 쓰는 게 좋습니다.",
  },
  {
    question: "rgb()나 hsl() 코드도 입력할 수 있나요?",
    answer:
      "네. HEX 칸에 rgb(196, 92, 44)이나 hsl(19, 63%, 47%) 형식을 붙여넣어도 인식해 변환합니다.",
  },
  {
    question: "입력한 색이 저장되나요?",
    answer:
      "아니요. 모든 변환은 브라우저 안에서 이루어지며 입력값이 서버로 전송되거나 저장되지 않습니다.",
  },
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "색상 코드 변환",
    applicationCategory: "DesignApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
    description: "HEX·RGB·HSL·CMYK 색상 코드를 양방향으로 변환하고 복사하는 무료 도구.",
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

export default function ColorConverterPage() {
  return (
    <ToolLayout
      title="색상 코드 변환"
      description="HEX·RGB·HSL·CMYK를 양방향 즉시 변환. 클릭 한 번으로 복사까지."
      guide={guide}
      faqs={faqs}
      currentToolHref="/tools/color/converter"
      relatedPostSlugs={["color-code-guide"]}
      schemas={schemas}
    >
      <ColorConverterTool />
    </ToolLayout>
  );
}
