import type { Metadata } from "next";
import ToolLayout from "@/components/common/ToolLayout";
import ColorConverterTool from "@/components/color/ColorConverterTool";
import { SITE_URL } from "@/lib/common/constants";

const PAGE_URL = `${SITE_URL}/tools/color/converter`;

export const metadata: Metadata = {
  title: "색상 코드 변환 - HEX RGB HSL CMYK 한 번에",
  description:
    "색을 고르거나 HEX를 입력하면 RGB·HSL·CMYK 코드를 바로 변환합니다. 클릭 한 번으로 복사까지. 무료이고, 고른 색은 클립보드에만 남습니다.",
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
        "각 표기 옆 복사 버튼으로 코드를 바로 클립보드에 담아 CSS나 디자인 도구에 붙여넣으세요. 변환 수식이 서버가 아닌 브라우저에 들어 있어, 아직 공개 전인 브랜드 컬러를 넣어도 밖으로 새지 않습니다.",
      ],
    },
    {
      heading: "네 값을 한눈에 두고 골라 쓰기",
      paragraphs: [
        "이 변환기의 쓸모는 네 표기가 동시에 뜬다는 데 있습니다. 스타일시트에는 HEX를 붙이고, 반투명 오버레이가 필요하면 옆의 RGB 값을 rgba로 감싸 쓰고, 인쇄 시안에는 CMYK를 참고하는 식으로 상황마다 필요한 칸만 복사하면 됩니다.",
        "색을 조금씩 굴려 보고 싶다면 HSL 쪽을 보세요. 채도(S)를 낮추면 색이 차분해지고, 명도(L)를 올리면 파스텔에 가까워집니다. 세 값이 눈앞에서 함께 움직이니 감이 아니라 숫자로 미세 조정할 수 있습니다.",
      ],
      bullets: [
        "버튼 기본색과 hover색: 색상·채도는 두고 명도만 다르게 두 값을 뽑아 두면 상태 전환이 매끄럽습니다.",
        "본문 글자색: HSL의 명도(L)가 60%를 넘는 색을 흰 배경 본문에 쓰면 대체로 흐릿합니다. 대비 검사로 확인하세요.",
        "브랜드 팔레트: 같은 색상(H)에서 명도만 단계별로 나누면 톤이 통일된 색 계열이 만들어집니다.",
      ],
    },
  ],
};

const faqs = [
  {
    question: "색을 하나 고르면 어떤 값들이 나오나요?",
    answer:
      "색상 피커나 HEX 입력, RGB 슬라이더 중 어느 하나만 건드려도 HEX·RGB·HSL·CMYK 네 값이 동시에 갱신됩니다. 필요한 칸의 복사 버튼만 누르면 그대로 붙여 쓸 수 있습니다.",
  },
  {
    question: "이 도구의 CMYK 값을 인쇄에 그대로 써도 되나요?",
    answer:
      "화면색을 기준으로 계산한 근사치라 참고용으로 보세요. 실제 인쇄는 용지와 잉크에 따라 달라지므로, 최종 색은 인쇄소의 컬러 프로파일로 다시 맞추는 편이 안전합니다.",
  },
  {
    question: "rgb()나 hsl() 문자열을 붙여넣어도 인식하나요?",
    answer:
      "네. HEX 칸에 rgb(196, 92, 44)이나 hsl(19, 63%, 47%)를 그대로 붙여넣으면 알아서 읽어 나머지 표기로 바꿔 줍니다.",
  },
  {
    question: "고른 색이 어딘가 남나요?",
    answer:
      "아니요. 색상값은 화면에서 변환되고 그걸로 끝입니다. 아직 공개 전인 시안 색을 이리저리 굴려 봐도 기록으로 남지 않습니다.",
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
