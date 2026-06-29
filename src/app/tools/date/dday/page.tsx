import type { Metadata } from "next";
import ToolLayout from "@/components/common/ToolLayout";
import DdayTool from "@/components/date/DdayTool";
import { SITE_URL } from "@/lib/common/constants";

const PAGE_URL = `${SITE_URL}/tools/date/dday`;

export const metadata: Metadata = {
  title: "D-Day 계산기 - 디데이·기념일 100일·1000일 한 번에",
  description:
    "목표일까지 며칠 남았는지(D-Day), 시작일부터 며칠 지났는지(100일·200일·1000일·주년)를 바로 계산합니다. 시험·전역·커플 기념일까지. 회원가입 없이 무료, 입력값은 저장·전송되지 않습니다.",
  keywords: [
    "디데이 계산기",
    "D-Day 계산기",
    "날짜 계산기",
    "100일 계산기",
    "기념일 계산기",
    "커플 디데이",
    "전역일 계산",
  ],
  openGraph: {
    title: "D-Day 계산기 - 디데이·기념일 100일·1000일 한 번에",
    description:
      "목표일까지 남은 날(D-Day)과 시작일부터 지난 날(100일·주년)을 한 화면에서.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "D-Day 계산기 - 디데이·기념일 100일·1000일 한 번에",
    description: "목표일 D-Day와 시작일 기준 100일·주년 기념일을 바로 계산.",
  },
  alternates: { canonical: PAGE_URL },
};

const guide = {
  intro:
    "D-Day는 두 가지로 쓰입니다. 하나는 시험·전역처럼 목표일까지 며칠 남았는지 세는 것, 다른 하나는 사귄 날·태어난 날처럼 시작일부터 며칠 지났는지(100일·1000일) 세는 것입니다. 이 도구는 두 방식을 탭으로 나눠 한 화면에서 모두 계산합니다.",
  sections: [
    {
      heading: "남은 날(D-Day): 그날이 D-DAY, 하루 전이 D-1",
      paragraphs: [
        "목표일 당일이 D-DAY이고, 하루 전이 D-1, 일주일 전이 D-7입니다. 목표일이 지났다면 며칠 지났는지 D+로 표시합니다. 시험일, 발표일, 전역일, 이벤트처럼 '며칠 남았는지'가 궁금할 때 이 모드를 씁니다.",
        "전역일은 입대일에 복무 기간을 더해 목표일로 넣으면 됩니다. 군별 복무 기간(육군 18개월, 해군 20개월, 공군 21개월)을 더한 날짜를 목표일로 설정하면 전역까지 남은 D-Day가 나옵니다.",
      ],
    },
    {
      heading: "지난 날·기념일: 시작일을 1일째로 센다",
      paragraphs: [
        "한국에서 커플 기념일이나 아기 백일을 셀 때는 시작일을 1일째로 봅니다. 그래서 사귄 지 100일은 시작일로부터 정확히 99일 뒤이고, 1일은 시작한 그날입니다. 이 도구의 '지난 날' 모드는 이 관습을 그대로 따릅니다.",
        "시작일만 넣으면 100일, 200일, 300일, 1000일은 물론 1주년·2주년까지 각각의 양력 날짜와 남은 D-Day를 한 번에 보여줍니다. 다가오는 기념일은 강조되고, 이미 지난 기념일은 흐리게 표시돼 다음에 챙길 날을 바로 알 수 있습니다.",
      ],
    },
    {
      heading: "백일·돌·1000일을 미리 챙기기",
      paragraphs: [
        "아기 백일은 출생일을 시작일(1일째)로 넣으면 100일째 날짜가 바로 나옵니다. 돌은 1주년으로 표시됩니다. 커플이라면 1000일, 결혼이라면 매년 주년 날짜를 미리 확인해 두기 좋습니다. 입력한 날짜는 서버로 전송되지 않고 브라우저에서만 계산됩니다.",
      ],
    },
  ],
};

const faqs = [
  {
    question: "100일은 시작일로부터 며칠 뒤인가요?",
    answer:
      "한국 관습대로 시작일을 1일째로 세므로, 100일은 시작일로부터 99일 뒤입니다. 예를 들어 1월 1일에 시작했다면 100일째는 4월 10일입니다. 이 도구는 이 방식으로 자동 계산합니다.",
  },
  {
    question: "D-Day 당일은 D-1인가요, D-DAY인가요?",
    answer:
      "목표일 당일이 D-DAY이고, 하루 전이 D-1입니다. 목표일이 이미 지났으면 며칠 지났는지 D+로 표시합니다.",
  },
  {
    question: "전역일도 계산할 수 있나요?",
    answer:
      "네. '남은 날' 모드에 전역 예정일을 목표일로 넣으면 됩니다. 입대일에 복무 기간(육군 18개월·해군 20개월·공군 21개월)을 더한 날짜가 전역일입니다.",
  },
  {
    question: "백일·돌은 어떻게 보나요?",
    answer:
      "'지난 날·기념일' 모드에 아기 출생일을 시작일로 넣으면 100일째 날짜가 바로 나오고, 돌은 1주년으로 표시됩니다. 다가오는 날과 지난 날이 구분돼 보입니다.",
  },
  {
    question: "입력한 날짜가 저장되나요?",
    answer:
      "아니요. 모든 계산은 브라우저 안에서 이루어지며 날짜가 서버로 전송되거나 저장되지 않습니다.",
  },
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "D-Day 계산기",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
    description:
      "목표일까지 남은 날(D-Day)과 시작일부터 지난 날(100일·1000일·주년)을 계산하는 무료 도구.",
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

export default function DdayPage() {
  return (
    <ToolLayout
      title="D-Day 계산기"
      description="목표일까지 남은 날, 시작일부터 지난 날(100일·1000일)을 한 번에."
      guide={guide}
      faqs={faqs}
      currentToolHref="/tools/date/dday"
      relatedPostSlugs={["mannai-age-guide"]}
      schemas={schemas}
    >
      <DdayTool />
    </ToolLayout>
  );
}
