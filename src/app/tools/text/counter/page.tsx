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
      faqs={faqs}
      currentToolHref="/tools/text/counter"
      relatedPostSlugs={["character-count-guide"]}
      schemas={schemas}
    >
      <CounterTool />
    </ToolLayout>
  );
}
