import type { Metadata } from "next";
import ToolLayout from "@/components/common/ToolLayout";
import LunarTool from "@/components/date/LunarTool";
import { SITE_URL } from "@/lib/common/constants";

const PAGE_URL = `${SITE_URL}/tools/date/lunar`;

export const metadata: Metadata = {
  title: "음력 양력 변환 - 음력 생일을 올해 양력으로",
  description:
    "음력을 양력으로, 양력을 음력으로 변환합니다. 음력 생일이 올해·내년 양력으로 며칠인지, 윤달·간지까지 한국천문연구원 자료 기준으로 바로. 회원가입 없이 무료, 입력값은 저장·전송되지 않습니다.",
  keywords: [
    "음력 양력 변환",
    "음력 생일 양력",
    "양력 음력 변환",
    "음력 변환기",
    "윤달 계산",
    "음력 날짜 변환",
    "음력 생일 계산",
  ],
  openGraph: {
    title: "음력 양력 변환 - 음력 생일을 올해 양력으로",
    description:
      "음력↔양력 변환과 음력 생일의 올해·내년 양력 날짜를 윤달·간지까지 한 번에.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "음력 양력 변환 - 음력 생일을 올해 양력으로",
    description: "음력↔양력 변환과 음력 생일의 양력 날짜를 윤달·간지까지.",
  },
  alternates: { canonical: PAGE_URL },
};

const guide = {
  intro:
    "음력 생일을 챙기는 집이 많지만, 음력은 해마다 양력 날짜가 달라져서 '올해는 며칠이지?'를 매번 다시 찾게 됩니다. 이 도구는 양력↔음력을 양방향으로 변환하고, 음력 생일이 올해와 내년 양력으로 며칠인지까지 함께 보여줍니다.",
  sections: [
    {
      heading: "음력과 양력은 왜 매년 어긋날까",
      paragraphs: [
        "양력(태양력)은 1년이 365일이지만, 음력(태음력)은 달의 주기를 따라 한 달이 29~30일이라 1년이 약 354일입니다. 매년 11일쯤 차이가 나기 때문에, 이 차이를 메우려고 몇 년에 한 번 윤달을 끼워 넣습니다. 그래서 같은 음력 생일이라도 양력 날짜는 해마다 달라집니다.",
        "이 도구는 한국천문연구원(KASI)이 발표한 음양력 대조 자료를 기준으로 변환하므로, 직접 만세력을 따지지 않아도 정확한 날짜를 얻을 수 있습니다. 지원 범위는 양력 1391년~2050년입니다.",
      ],
    },
    {
      heading: "음력 생일을 양력으로 챙기는 법",
      paragraphs: [
        "음력 → 양력 탭에서 음력 생일(월·일)을 넣으면, 올해와 내년의 양력 생일 날짜를 바로 보여줍니다. 부모님 생신이나 제사처럼 음력으로 기억하는 날을 양력 달력·캘린더 앱에 등록할 때 그대로 쓰면 됩니다.",
        "윤달에 태어났거나 윤달 제사를 지내는 경우 '윤달'을 체크하세요. 윤달은 평년에는 없는 달이라, 윤달이 없는 해에는 평달(같은 숫자의 일반 달)로 챙기는 집이 많습니다. 집안 관습에 맞춰 선택하면 됩니다.",
      ],
    },
    {
      heading: "간지(干支)와 그해의 띠",
      paragraphs: [
        "변환 결과에는 그해의 간지(예: 갑진년)도 함께 표시됩니다. 간지는 10간과 12지를 조합한 60년 주기의 전통 연도 표기로, 갑진년이면 용띠 해처럼 띠와도 이어집니다. 만 나이와 띠가 필요하면 만 나이 계산기를, 며칠 남았는지가 궁금하면 D-Day 계산기를 함께 쓰면 편합니다. 입력값은 서버로 전송되지 않습니다.",
      ],
    },
  ],
};

const faqs = [
  {
    question: "음력 생일이 올해 양력으로 며칠인지 알 수 있나요?",
    answer:
      "네. '음력 → 양력' 탭에 음력 생일의 월·일을 넣으면 올해와 내년의 양력 날짜를 함께 보여줍니다. 음력은 해마다 양력 날짜가 달라지므로 매년 다시 확인하는 게 좋습니다.",
  },
  {
    question: "윤달은 어떻게 처리하나요?",
    answer:
      "음력 → 양력 변환에서 '윤달'을 체크하면 윤달 기준으로 변환합니다. 윤달은 평년에는 없는 달이라, 윤달이 없는 해에는 같은 숫자의 평달로 챙기는 경우가 많습니다. 집안 관습에 맞춰 선택하세요.",
  },
  {
    question: "변환 결과는 정확한가요?",
    answer:
      "한국천문연구원(KASI)이 발표한 음양력 대조 자료를 기준으로 변환합니다. 지원 범위는 양력 1391년부터 2050년까지입니다.",
  },
  {
    question: "간지(갑진년 등)는 무엇인가요?",
    answer:
      "10간과 12지를 조합한 60년 주기의 전통 연도 표기입니다. 예를 들어 갑진년은 용띠 해와 이어집니다. 변환 결과에 그해의 간지를 함께 표시합니다.",
  },
  {
    question: "입력한 날짜가 저장되나요?",
    answer:
      "아니요. 모든 변환은 브라우저 안에서 이루어지며 날짜가 서버로 전송되거나 저장되지 않습니다.",
  },
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "음력 양력 변환",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
    description:
      "음력↔양력을 변환하고 음력 생일의 올해·내년 양력 날짜를 윤달·간지까지 보여주는 무료 도구. 한국천문연구원 음양력 자료 기준.",
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

export default function LunarPage() {
  return (
    <ToolLayout
      title="음력 양력 변환"
      description="음력 생일을 올해 양력으로, 양력을 음력으로. 윤달·간지까지."
      guide={guide}
      faqs={faqs}
      currentToolHref="/tools/date/lunar"
      relatedPostSlugs={["mannai-age-guide"]}
      schemas={schemas}
    >
      <LunarTool />
    </ToolLayout>
  );
}
