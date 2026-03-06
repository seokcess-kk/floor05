import type { Metadata } from "next";
import ToolLayout from "@/components/common/ToolLayout";
import ConvertTool from "@/components/image/ConvertTool";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://floor05.com";
const PAGE_URL = `${SITE_URL}/tools/image/heic-to-jpg`;

export const metadata: Metadata = {
  title: "아이폰 사진 변환 - HEIC를 JPG로 브라우저에서 바로",
  description:
    "아이폰에서 찍은 HEIC 사진을 JPG로 변환하세요. 파일이 서버로 전송되지 않습니다. 회원가입 없이 무제한 무료.",
  keywords: ["HEIC JPG 변환", "아이폰 사진 변환", "HEIC 변환", "아이폰 HEIC", "iOS 사진 변환"],
  openGraph: {
    title: "아이폰 사진 변환 - HEIC를 JPG로 브라우저에서 바로",
    description: "아이폰 HEIC 사진을 JPG로 변환. 서버 전송 없이 안전하게.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "아이폰 사진 변환 - HEIC를 JPG로",
    description: "아이폰 HEIC 사진을 JPG로 변환. 서버 전송 없이 안전하게.",
  },
  alternates: {
    canonical: PAGE_URL,
  },
};

const faqs = [
  {
    question: "HEIC가 뭔가요?",
    answer:
      "HEIC(High Efficiency Image Container)는 아이폰에서 사용하는 이미지 포맷입니다. JPG보다 더 좋은 화질을 유지하면서 용량이 작지만, 윈도우나 일부 프로그램에서 열리지 않는 경우가 있습니다.",
  },
  {
    question: "아이폰 사진이 안 열려요. 왜 그런가요?",
    answer:
      "아이폰 iOS 11 이후로 사진이 기본적으로 HEIC 포맷으로 저장됩니다. 이 포맷은 모든 프로그램에서 지원되지 않아서 JPG로 변환하면 어디서든 열 수 있습니다.",
  },
  {
    question: "변환된 사진의 화질이 떨어지나요?",
    answer:
      "품질 90% 이상으로 변환하면 육안으로 구분할 수 없는 수준입니다. 기본 설정(90%)으로 대부분의 용도에 충분합니다.",
  },
  {
    question: "여러 장을 한꺼번에 변환할 수 있나요?",
    answer:
      "네, 데스크톱에서는 최대 10장, 모바일에서는 최대 5장까지 동시에 변환할 수 있습니다. 변환이 완료되면 ZIP 파일로 일괄 다운로드도 가능합니다.",
  },
];

const workflowCTA = {
  message: "변환 끝났나요? 이런 작업도 할 수 있어요.",
  tools: [
    {
      name: "이미지 압축",
      href: "/tools/image/compress",
      description: "용량도 줄여보세요",
    },
    {
      name: "이미지 리사이즈",
      href: "/tools/image/resize",
      description: "크기도 조절해보세요",
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
    name: "HEIC→JPG 변환 도구",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
    description: "아이폰 HEIC 사진을 JPG로 변환. 무제한 무료.",
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
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "아이폰 HEIC 사진을 JPG로 변환하는 방법",
    step: [
      { "@type": "HowToStep", name: "HEIC 파일 업로드", text: "아이폰에서 가져온 HEIC 파일을 드래그앤드롭합니다." },
      { "@type": "HowToStep", name: "출력 포맷 확인", text: "JPG가 기본 선택되어 있습니다. 필요시 품질을 조절합니다." },
      { "@type": "HowToStep", name: "변환", text: "변환 버튼을 클릭하면 브라우저에서 바로 변환됩니다." },
      { "@type": "HowToStep", name: "다운로드", text: "변환된 JPG 파일을 다운로드합니다." },
    ],
  },
];

export default function HeicToJpgPage() {
  return (
    <ToolLayout
      title="HEIC → JPG 변환"
      description="아이폰 사진을 JPG로 브라우저에서 바로. 서버 전송 없이 안전하게."
      faqs={faqs}
      workflowCTA={workflowCTA}
      currentToolHref="/tools/image/heic-to-jpg"
      schemas={schemas}
    >
      <ConvertTool />
    </ToolLayout>
  );
}
