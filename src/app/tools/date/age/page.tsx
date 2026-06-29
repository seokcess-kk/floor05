import type { Metadata } from "next";
import ToolLayout from "@/components/common/ToolLayout";
import AgeTool from "@/components/date/AgeTool";
import { SITE_URL } from "@/lib/common/constants";

const PAGE_URL = `${SITE_URL}/tools/date/age`;

export const metadata: Metadata = {
  title: "만 나이 계산기 - 생년월일로 만 나이·연 나이·띠까지",
  description:
    "생년월일만 넣으면 만 나이, 연 나이, 옛 세는 나이, 띠, 다음 생일 D-Day를 바로 계산합니다. 2023년 만 나이 통일법 기준. 회원가입 없이 무료, 입력값은 저장·전송되지 않습니다.",
  keywords: [
    "만나이 계산기",
    "만 나이 계산",
    "나이 계산기",
    "연 나이",
    "세는 나이",
    "만나이 통일",
    "띠 계산",
  ],
  openGraph: {
    title: "만 나이 계산기 - 생년월일로 만 나이·연 나이·띠까지",
    description:
      "만 나이, 연 나이, 세는 나이, 띠, 다음 생일 D-Day를 생년월일 하나로. 2023년 만 나이 통일법 기준.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "만 나이 계산기 - 생년월일로 만 나이·연 나이·띠까지",
    description: "만 나이·연 나이·세는 나이·띠·다음 생일을 생년월일 하나로 바로 계산.",
  },
  alternates: { canonical: PAGE_URL },
};

const guide = {
  intro:
    "2023년 6월 28일 만 나이 통일법이 시행되면서, 이제 법령·계약·공문서의 나이는 특별한 언급이 없으면 모두 만 나이를 뜻합니다. 그런데 우리는 여전히 연 나이(빠른 년생), 옛 세는 나이를 섞어 쓰기 때문에 헷갈릴 때가 많습니다. 이 도구는 생년월일 하나로 세 가지 나이를 동시에 보여줍니다.",
  sections: [
    {
      heading: "만 나이, 연 나이, 세는 나이는 어떻게 다른가",
      paragraphs: [
        "만 나이는 태어난 날을 0세로 시작해, 생일이 지날 때마다 한 살씩 더하는 국제 표준 방식입니다. 같은 해에 태어났어도 생일이 지났는지에 따라 나이가 한 살 차이 납니다.",
      ],
      bullets: [
        "만 나이 = 오늘 − 생일. 생일이 안 지났으면 (올해 − 출생연도) − 1, 지났으면 (올해 − 출생연도). 법적 공식 나이입니다.",
        "연 나이 = 현재 연도 − 출생연도. 생일과 무관하게 같은 해 출생자는 같은 값. 병역법·청소년보호법 등 일부 법령에서 씁니다.",
        "세는 나이 = 연 나이 + 1. 태어나면 1살, 새해마다 한 살. 2023년 이후 법적 효력은 없지만 일상 대화에 남아 있습니다.",
      ],
    },
    {
      heading: "만 나이 통일 이후, 무엇이 바뀌었나",
      paragraphs: [
        "통일법 이후 달라진 건 '기준'입니다. 나이를 따로 '만'이라고 적지 않아도 만 나이로 본다는 것이지, 모든 제도가 만 나이로 바뀐 것은 아닙니다. 초등학교 입학(연 나이), 병역 판정(연 나이), 청소년 보호(연 나이) 등은 여전히 연 나이 기준이라 혼동하기 쉽습니다.",
        "그래서 '내 나이가 몇 살인지'를 물을 때는 어떤 기준인지 함께 확인하는 게 안전합니다. 이 도구는 만 나이를 가장 크게 보여주고, 연 나이와 세는 나이도 같이 표시해 어디에 어떤 값을 써야 할지 한눈에 비교할 수 있게 했습니다.",
      ],
    },
    {
      heading: "띠와 다음 생일까지",
      paragraphs: [
        "띠는 태어난 해의 12지(쥐·소·호랑이…)로 표시합니다. 엄밀히는 음력 설을 기준으로 띠가 바뀌지만, 이 도구는 일상에서 가장 많이 쓰는 양력 연도 기준으로 보여줍니다. 1~2월 초에 태어난 분은 음력 기준과 다를 수 있으니 참고하세요.",
        "다음 생일까지 며칠 남았는지도 함께 계산합니다. 2월 29일 생일은 평년에는 3월 1일로 계산해 매년 생일이 한 번씩 돌아오게 했습니다. 입력한 생년월일은 서버로 전송되지 않고 브라우저 안에서만 계산됩니다.",
      ],
    },
  ],
};

const faqs = [
  {
    question: "만 나이는 어떻게 계산하나요?",
    answer:
      "올해에서 출생연도를 뺀 뒤, 올해 생일이 지났으면 그대로, 아직 안 지났으면 1을 더 빼면 됩니다. 예를 들어 1995년 5월생이 2026년 3월에 있다면 생일 전이라 만 30세, 6월이 지나면 만 31세입니다.",
  },
  {
    question: "만 나이와 연 나이가 헷갈려요. 어디에 뭘 쓰나요?",
    answer:
      "법령·계약·병원·공문서의 나이는 별도 표기가 없으면 만 나이입니다. 다만 초등학교 입학, 병역 판정, 청소년보호법의 나이는 연 나이(현재연도−출생연도) 기준이라 다를 수 있습니다. 이 도구는 두 값을 함께 보여줍니다.",
  },
  {
    question: "세는 나이는 이제 안 쓰나요?",
    answer:
      "2023년 6월 만 나이 통일법 이후 법적 효력은 없습니다. 다만 일상 대화에서는 여전히 쓰이기 때문에, 참고용으로 함께 표시합니다.",
  },
  {
    question: "띠는 양력 기준인가요, 음력 기준인가요?",
    answer:
      "이 도구는 양력 연도 기준으로 띠를 보여줍니다. 전통적으로는 음력 설을 기준으로 띠가 바뀌므로, 1월~2월 초 출생자는 음력 기준과 다를 수 있습니다. 정확한 음력 날짜가 필요하면 음력 양력 변환 도구를 함께 쓰세요.",
  },
  {
    question: "입력한 생년월일이 저장되나요?",
    answer:
      "아니요. 모든 계산은 브라우저 안에서 이루어지며 생년월일이 서버로 전송되거나 저장되지 않습니다.",
  },
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "만 나이 계산기",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
    description:
      "생년월일로 만 나이·연 나이·세는 나이·띠·다음 생일 D-Day를 계산하는 무료 도구. 2023년 만 나이 통일법 기준.",
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

export default function AgePage() {
  return (
    <ToolLayout
      title="만 나이 계산기"
      description="생년월일만 넣으면 만 나이·연 나이·띠·다음 생일을 바로."
      guide={guide}
      faqs={faqs}
      currentToolHref="/tools/date/age"
      relatedPostSlugs={["mannai-age-guide"]}
      schemas={schemas}
    >
      <AgeTool />
    </ToolLayout>
  );
}
