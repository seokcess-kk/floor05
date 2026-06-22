import type { Metadata } from "next";
import ToolLayout from "@/components/common/ToolLayout";
import CounterTool from "@/components/text/CounterTool";
import { SITE_URL } from "@/lib/common/constants";

const PAGE_URL = `${SITE_URL}/tools/text/counter`;

export const metadata: Metadata = {
  title: "글자수 세기 - 공백·바이트·원고지 한 번에",
  description:
    "붙여넣으면 글자수(공백 포함/제외), 바이트(2·3바이트), 단어·줄·문장, 원고지 매수, 자소서 목표 글자수를 바로 계산합니다. 회원가입 없이 무료, 입력 내용은 저장·전송되지 않습니다.",
  keywords: [
    "글자수 세기",
    "글자수 계산기",
    "자소서 글자수",
    "바이트 계산",
    "원고지 매수",
    "공백 제외 글자수",
    "byte 계산기",
  ],
  openGraph: {
    title: "글자수 세기 - 공백·바이트·원고지 한 번에",
    description:
      "글자수(공백 포함/제외), 바이트(2·3바이트), 원고지 매수, 자소서 목표 글자수까지 실시간 계산.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "글자수 세기 - 공백·바이트·원고지 한 번에",
    description:
      "글자수(공백 포함/제외), 바이트(2·3바이트), 원고지 매수, 자소서 목표까지 실시간 계산.",
  },
  alternates: {
    canonical: PAGE_URL,
  },
};

const guide = {
  intro:
    "글자수 세기는 단순히 숫자를 세는 도구처럼 보이지만, 어디에 제출하느냐에 따라 봐야 할 기준이 전부 다릅니다. 같은 글이라도 공백을 포함하는지, 바이트로 세는지, 원고지 몇 매인지에 따라 결과가 달라지죠. 이 도구는 그 기준들을 한 화면에서 동시에 보여줍니다.",
  sections: [
    {
      heading: "공백 포함과 공백 제외, 언제 뭘 보나",
      paragraphs: [
        "이 도구는 공백 포함 글자수를 가장 크게 보여주고, 공백 제외 글자수도 함께 표시합니다. 국내 자기소개서는 대부분 '공백 포함' 기준을 쓰지만, 제출처에 따라 공백 제외를 요구하는 곳도 있으니 안내 문구를 한 번 확인하는 게 안전합니다.",
        "줄바꿈을 어떻게 셀지도 결과를 바꿉니다. 네이버 기준은 줄바꿈을 공백 1개로 세고, 한글(HWP) 기준은 글자수에서 빼는데, 줄을 많이 나눈 글일수록 두 기준의 차이가 커집니다. 제출하는 곳이 쓰는 편집기 기준에 맞춰 토글하세요. 단어·줄·문장·문단 수도 함께 표시되어 글의 분량 감을 잡는 데 도움이 됩니다.",
      ],
    },
    {
      heading: "자소서 바이트 제한과 원고지 매수",
      paragraphs: [
        "기업 채용 입력폼은 글자수가 아니라 바이트로 분량을 제한하는 경우가 많습니다. 문제는 한글 한 글자를 2바이트로 세는 곳과 3바이트(UTF-8)로 세는 곳이 갈린다는 점입니다. 이 도구는 두 기준을 모두 계산해 보여줍니다.",
      ],
      bullets: [
        "2바이트 기준: 한글 1자 = 2바이트, 영문·숫자 1바이트. 대부분의 기업·기관 입력폼이 이 방식입니다.",
        "3바이트 기준: 한글 1자 = 3바이트(UTF-8). 일부 기관과 웹 표준 시스템에서 사용합니다.",
        "예: 1,000바이트 제한이면 2바이트 기준 약 600자, 3바이트 기준 약 350자까지 들어갑니다.",
      ],
    },
    {
      heading: "원고지, SNS, 과제까지 한 번에",
      paragraphs: [
        "원고지 매수는 200자(20×10) 또는 400자(20×20) 기준을 골라 매수와 마지막 장에 남은 칸을 함께 보여줍니다. 원고지는 공백도 한 칸을 차지하므로 공백 포함 글자수로 계산합니다. 독후감이나 글짓기 과제처럼 '원고지 몇 매 이상'이라는 조건을 맞출 때 유용합니다.",
        "트위터·인스타그램 같은 SNS 글자 제한, 리포트의 분량 조건, 논문 초록의 글자수 제한도 같은 원리로 확인할 수 있습니다. 목표 글자수를 정해 두면 진행률 막대로 얼마나 남았는지 한눈에 보입니다. 입력한 내용은 서버로 전송되지 않고 브라우저 안에서만 계산되며, 재방문 편의를 위해 마지막 입력만 브라우저에 저장되니 민감한 글도 안심하고 붙여넣으세요.",
      ],
    },
  ],
};

const faqs = [
  {
    question: "자소서 글자수는 공백 포함인가요, 제외인가요?",
    answer:
      "기업·기관마다 다르지만 국내 자소서는 보통 '공백 포함' 기준이 가장 많습니다. 이 도구는 공백 포함을 크게 표시하고, 공백 제외 글자수도 함께 보여주므로 요구 조건에 맞춰 확인하면 됩니다.",
  },
  {
    question: "바이트는 2바이트와 3바이트 중 어떤 걸 봐야 하나요?",
    answer:
      "한글을 2바이트로 세는 곳(대부분의 기업 입력폼)과 3바이트(UTF-8)로 세는 곳이 있습니다. 1,000바이트 제한이면 2바이트 기준 약 600자, 3바이트 기준 약 350자입니다. 두 값을 모두 표시하니 제출처 기준에 맞춰 보세요.",
  },
  {
    question: "원고지 몇 매인지 어떻게 보나요?",
    answer:
      "200자(20×10) 또는 400자(20×20) 기준을 선택하면 매수와 마지막 장의 남은 칸을 보여줍니다. 예를 들어 공백 포함 2,000자는 200자 원고지 기준 10매입니다. 원고지는 공백도 한 칸이므로 공백 포함 글자수로 계산합니다.",
  },
  {
    question: "네이버 기준과 한글(HWP) 기준은 뭐가 다른가요?",
    answer:
      "줄바꿈 처리 방식이 다릅니다. 네이버 기준은 줄바꿈을 공백 1개로 세고, 한글(HWP) 기준은 줄바꿈을 글자수에서 제외합니다. 제출하는 곳의 기준에 맞춰 토글하세요.",
  },
  {
    question: "입력한 내용이 서버로 전송되나요?",
    answer:
      "아니요. 모든 계산은 브라우저에서 이루어지며 내용이 서버로 전송되지 않습니다. 편의를 위해 마지막 입력만 브라우저(localStorage)에 저장해 재방문 시 복원하며, '지우기'로 비울 수 있습니다.",
  },
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "글자수 세기",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
    description:
      "글자수(공백 포함/제외), 바이트(2·3바이트), 원고지 매수, 자소서 목표 글자수를 실시간 계산하는 무료 도구.",
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

export default function CounterPage() {
  return (
    <ToolLayout
      title="글자수 세기"
      description="공백·바이트·원고지·자소서 글자수를 한 번에. 붙여넣으면 바로 계산됩니다."
      guide={guide}
      faqs={faqs}
      currentToolHref="/tools/text/counter"
      relatedPostSlugs={["character-count-guide"]}
      schemas={schemas}
    >
      <CounterTool />
    </ToolLayout>
  );
}
