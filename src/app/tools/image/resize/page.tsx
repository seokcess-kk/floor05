import type { Metadata } from "next";
import ToolLayout from "@/components/common/ToolLayout";
import ResizeTool from "@/components/image/ResizeTool";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://floor05.com";
const PAGE_URL = `${SITE_URL}/tools/image/resize`;

export const metadata: Metadata = {
  title: "이미지 리사이즈 - SNS 프리셋으로 한 번에",
  description:
    "인스타그램, 유튜브, 네이버 블로그, 카카오톡, 당근마켓 최적 사이즈로 바로 변환. 파일이 서버로 전송되지 않습니다.",
  keywords: ["이미지 리사이즈", "사진 크기 조절", "인스타그램 사진 크기", "유튜브 썸네일", "네이버 블로그 이미지"],
  openGraph: {
    title: "이미지 리사이즈 - SNS 프리셋으로 한 번에",
    description: "인스타그램, 유튜브, 네이버 블로그 최적 사이즈로 바로 변환.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "이미지 리사이즈 - SNS 프리셋으로 한 번에",
    description: "인스타그램, 유튜브, 네이버 블로그 최적 사이즈로 바로 변환.",
  },
  alternates: {
    canonical: PAGE_URL,
  },
};

const faqs = [
  {
    question: "SNS 프리셋은 어떤 게 있나요?",
    answer:
      "인스타그램(정방형, 세로형, 가로형), 유튜브(썸네일, 채널아트), 네이버 블로그, 카카오톡 프로필, 당근마켓 상품 이미지 등 다양한 프리셋을 지원합니다.",
  },
  {
    question: "비율을 유지하면서 크기를 바꿀 수 있나요?",
    answer:
      "네, '직접 입력' 모드에서 잠금 버튼을 클릭하면 가로세로 비율이 유지됩니다. 너비나 높이 중 하나만 입력해도 자동으로 계산됩니다.",
  },
  {
    question: "확대도 가능한가요?",
    answer:
      "네, '비율(%)' 모드에서 100% 이상으로 설정하면 이미지를 확대할 수 있습니다. 단, 원본보다 크게 확대하면 화질이 저하될 수 있습니다.",
  },
  {
    question: "여러 이미지를 같은 크기로 한 번에 변경할 수 있나요?",
    answer:
      "네, 여러 이미지를 업로드하고 원하는 크기를 설정한 후 '리사이즈' 버튼을 누르면 모든 이미지가 같은 크기로 변환됩니다.",
  },
];

const workflowCTA = {
  message: "크기 조절 끝났나요? 이런 작업도 할 수 있어요.",
  tools: [
    {
      name: "이미지 압축",
      href: "/tools/image/compress",
      description: "용량도 줄여보세요",
    },
    {
      name: "포맷 변환",
      href: "/tools/image/convert",
      description: "PNG, WebP로 변환",
    },
    {
      name: "이미지 크롭",
      href: "/tools/image/crop",
      description: "원하는 부분만 자르기",
    },
  ],
};

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "이미지 리사이즈 도구",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
    description: "SNS 프리셋으로 이미지 크기 조절. 무제한 무료.",
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

export default function ResizePage() {
  return (
    <ToolLayout
      title="이미지 리사이즈"
      description="SNS 프리셋으로 한 번에. 인스타, 유튜브, 네이버 블로그 최적 사이즈."
      faqs={faqs}
      workflowCTA={workflowCTA}
      currentToolHref="/tools/image/resize"
      schemas={schemas}
    >
      <ResizeTool />
    </ToolLayout>
  );
}
