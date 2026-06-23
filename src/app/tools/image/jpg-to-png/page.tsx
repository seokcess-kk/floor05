import type { Metadata } from "next";
import ToolLayout from "@/components/common/ToolLayout";
import ConvertTool from "@/components/image/ConvertTool";
import { SITE_URL } from "@/lib/common/constants";

const PAGE_URL = `${SITE_URL}/tools/image/jpg-to-png`;

export const metadata: Metadata = {
  title: "JPG를 PNG로 변환 - 무손실·투명 지원 포맷으로",
  description:
    "JPG를 PNG로 브라우저에서 바로 변환하세요. 무손실 보관, 투명도 지원 포맷이 필요할 때. 파일이 서버로 전송되지 않습니다.",
  keywords: ["JPG PNG 변환", "jpg를 png로", "JPEG PNG 변환", "png 변환", "이미지 png 변환"],
  openGraph: {
    title: "JPG를 PNG로 변환 - 무손실·투명 지원 포맷으로",
    description: "JPG를 PNG로 브라우저에서 바로 변환. 서버 전송 없이 안전하게.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "JPG를 PNG로 변환 - 무손실·투명 지원 포맷으로",
    description: "JPG를 PNG로 브라우저에서 바로 변환. 서버 전송 없이 안전하게.",
  },
  alternates: {
    canonical: PAGE_URL,
  },
};

const faqs = [
  {
    question: "JPG를 PNG로 바꾸면 뭐가 좋아지나요?",
    answer:
      "PNG는 무손실 포맷이라 변환 후 추가 화질 저하가 없고, 투명도를 지원합니다. 이미지를 여러 번 편집·저장해야 하거나, 투명 배경이 필요한 작업, 글자·선이 또렷해야 하는 이미지에 어울립니다.",
  },
  {
    question: "JPG를 PNG로 바꾸면 배경이 투명해지나요?",
    answer:
      "아니요. 변환만으로 기존 배경이 자동으로 지워지지는 않습니다. PNG는 '투명도를 저장할 수 있는' 포맷일 뿐이라, 원본 JPG의 배경은 그대로 남습니다. 배경을 실제로 투명하게 만들려면 별도의 배경 제거 작업이 필요합니다.",
  },
  {
    question: "용량이 더 커지지 않나요?",
    answer:
      "사진처럼 색이 복잡한 이미지는 PNG로 바꾸면 용량이 커질 수 있습니다. PNG는 무손실이기 때문입니다. 용량을 줄이는 게 목적이라면 JPG나 WebP가 더 유리하고, 무손실 보관·투명도가 목적이라면 PNG가 맞습니다.",
  },
  {
    question: "화질이 떨어지나요?",
    answer:
      "PNG는 무손실이라 변환 과정에서 추가 손실이 없습니다. 다만 원본 JPG가 이미 손실 압축된 상태라면, 그 시점의 화질이 그대로 PNG에 담깁니다(원본보다 좋아지지는 않습니다).",
  },
  {
    question: "여러 장을 한 번에 변환할 수 있나요?",
    answer:
      "네, 데스크톱은 최대 10장, 모바일은 최대 5장까지 동시에 변환하고, 변환이 끝나면 ZIP 파일로 한 번에 받을 수 있습니다.",
  },
];

const guide = {
  intro:
    "JPG는 용량이 작아 사진에 좋지만, 무손실 보관이나 투명도가 필요할 때는 PNG가 맞습니다. 이 도구는 JPG(JPEG)를 PNG로 브라우저에서 바로 바꿔줍니다. 변환은 전부 브라우저 안에서 끝나고, 파일이 서버로 올라가는 일은 없습니다.",
  sections: [
    {
      heading: "언제 JPG 대신 PNG가 필요한가",
      paragraphs: [
        "JPG는 저장할 때마다 조금씩 화질이 깎이는 손실 압축입니다. 같은 이미지를 여러 번 편집하고 저장하는 작업이라면, 무손실인 PNG로 두는 편이 화질을 지키는 데 유리합니다.",
        "또 PNG는 투명도를 저장할 수 있어서, 로고·아이콘·스티커처럼 배경이 비쳐야 하는 이미지에 적합합니다. 글자나 선이 또렷하게 유지돼야 하는 스크린샷·도표에도 PNG가 어울립니다.",
      ],
    },
    {
      heading: "변환할 때 알아둘 점",
      paragraphs: [
        "PNG로 바꾼다고 해서 원본 JPG의 배경이 자동으로 투명해지지는 않습니다. PNG는 '투명도를 담을 수 있는 그릇'일 뿐이라, 배경을 실제로 비우려면 별도의 배경 제거가 필요합니다. 또 사진처럼 색이 많은 이미지는 PNG로 바꾸면 용량이 커질 수 있으니, 목적에 맞게 고르면 됩니다.",
        "이 페이지는 출력 포맷이 PNG로 기본 설정되어 있지만, 필요하면 JPG·WebP·AVIF로도 바로 바꿀 수 있습니다. 여러 장을 한꺼번에 올려 일괄 변환한 뒤 ZIP으로 받는 것도 가능합니다.",
      ],
      bullets: [
        "무손실 보관·재편집 → PNG가 유리",
        "투명도가 필요한 로고·아이콘 → PNG (단, 배경 제거는 별도 작업)",
        "용량을 줄이는 게 목적 → JPG나 WebP가 더 적합",
      ],
    },
  ],
};

const workflowCTA = {
  message: "변환 끝났나요? 이런 작업도 할 수 있어요.",
  tools: [
    {
      name: "포맷 변환",
      href: "/tools/image/convert",
      description: "PNG·JPG·WebP·AVIF 자유 변환",
    },
    {
      name: "WebP → JPG 변환",
      href: "/tools/image/webp-to-jpg",
      description: "안 열리는 WebP 열기",
    },
    {
      name: "이미지 압축",
      href: "/tools/image/compress",
      description: "용량도 줄여보세요",
    },
  ],
};

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "JPG→PNG 변환 도구",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
    description: "JPG를 PNG로 변환. 무손실·투명 지원 포맷. 100% 브라우저 처리, 무제한 무료.",
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
    name: "JPG를 PNG로 변환하는 방법",
    step: [
      { "@type": "HowToStep", name: "JPG 업로드", text: "변환할 JPG 파일을 드래그앤드롭합니다." },
      { "@type": "HowToStep", name: "출력 포맷 확인", text: "PNG가 기본 선택되어 있습니다." },
      { "@type": "HowToStep", name: "변환", text: "변환 버튼을 누르면 브라우저에서 바로 변환됩니다." },
      { "@type": "HowToStep", name: "다운로드", text: "변환된 PNG 파일을 내려받습니다." },
    ],
  },
];

export default function JpgToPngPage() {
  return (
    <ToolLayout
      title="JPG → PNG 변환"
      description="JPG를 무손실·투명 지원 PNG로 브라우저에서 바로. 서버 전송 없이 안전하게."
      guide={guide}
      faqs={faqs}
      workflowCTA={workflowCTA}
      currentToolHref="/tools/image/jpg-to-png"
      relatedPostSlugs={["transparent-background", "png-vs-jpg", "browser-image-tools-privacy"]}
      schemas={schemas}
    >
      <ConvertTool toolId="jpg-to-png" defaultFormat="image/png" />
    </ToolLayout>
  );
}
