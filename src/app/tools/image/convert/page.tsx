import type { Metadata } from "next";
import ToolLayout from "@/components/common/ToolLayout";
import ConvertTool from "@/components/image/ConvertTool";
import { SITE_URL } from "@/lib/common/constants";

const PAGE_URL = `${SITE_URL}/tools/image/convert`;

export const metadata: Metadata = {
  title: "이미지 포맷 변환 - PNG, JPG, WebP 자유자재로",
  description:
    "PNG를 JPG로, HEIC를 JPG로, WebP로. 아이폰 사진도 브라우저에서 바로 변환. 파일이 서버로 전송되지 않습니다.",
  keywords: ["이미지 변환", "PNG JPG 변환", "WebP 변환", "HEIC JPG 변환", "포맷 변환"],
  openGraph: {
    title: "이미지 포맷 변환 - PNG, JPG, WebP 자유자재로",
    description: "PNG를 JPG로, HEIC를 JPG로. 브라우저에서 바로 변환.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "이미지 포맷 변환 - PNG, JPG, WebP 자유자재로",
    description: "PNG를 JPG로, HEIC를 JPG로. 브라우저에서 바로 변환.",
  },
  alternates: {
    canonical: PAGE_URL,
  },
};

const faqs = [
  {
    question: "아이폰에서 찍은 HEIC 사진도 변환할 수 있나요?",
    answer:
      "네, HEIC/HEIF 파일을 JPG, PNG, WebP로 변환할 수 있습니다. 변환은 100% 브라우저에서 이루어지므로 사진이 서버로 전송되지 않습니다.",
  },
  {
    question: "PNG의 투명 배경은 어떻게 처리되나요?",
    answer:
      "PNG를 JPG로 변환할 때 투명한 부분은 선택한 배경색(흰색, 검정, 회색)으로 채워집니다. PNG로 변환할 경우 투명도가 유지됩니다.",
  },
  {
    question: "WebP란 무엇인가요?",
    answer:
      "WebP는 구글에서 개발한 이미지 포맷으로, JPG보다 25~35% 더 작은 용량에 비슷한 품질을 제공합니다. 대부분의 최신 브라우저에서 지원됩니다.",
  },
  {
    question: "변환 후 이미지 품질이 떨어지나요?",
    answer:
      "품질 설정에 따라 달라집니다. 90% 이상의 품질을 선택하면 육안으로 구분하기 어려운 수준입니다. PNG는 무손실 포맷이므로 품질 저하가 없습니다.",
  },
  {
    question: "여러 장을 한 번에 변환하고 ZIP으로 받을 수 있나요?",
    answer:
      "네, 여러 이미지를 한꺼번에 올린 뒤 출력 포맷을 정하면 일괄 변환됩니다. HEIC, PNG, JPG가 섞여 있어도 되고, 변환이 끝나면 ZIP 파일로 한 번에 다운로드할 수 있습니다.",
  },
  {
    question: "어떤 브라우저에서 WebP로 변환되나요?",
    answer:
      "최신 크롬, 엣지, 파이어폭스, 사파리에서 WebP 변환을 지원합니다. WebP를 지원하지 않는 브라우저에서는 WebP 옵션이 자동으로 비활성화되고 안내가 표시되니, JPG나 PNG를 이용하세요.",
  },
];

const guide = {
  intro:
    "PNG, JPG, WebP는 각자 잘하는 일이 다릅니다. 어떤 포맷을 골라야 할지, 변환할 때 무엇이 달라지는지 짚어 두었습니다. 모든 변환은 브라우저 안에서 끝나기 때문에 파일이 서버로 전송되지 않습니다.",
  sections: [
    {
      heading: "PNG·JPG·WebP, 언제 무엇을 쓰나",
      paragraphs: [
        "세 포맷은 용도가 다릅니다. PNG는 무손실 압축이라 화질 저하가 없고 투명 배경을 지원합니다. 로고, 아이콘, 스크린샷, 글자가 또렷해야 하는 이미지에 어울리지만 용량은 큰 편입니다.",
        "JPG는 사진처럼 색이 많고 복잡한 이미지를 작은 용량으로 담는 데 강합니다. 다만 손실 압축이라 저장할 때마다 화질이 조금씩 깎입니다. WebP는 구글이 만든 포맷으로, 같은 화질을 JPG보다 25~35% 작은 용량에 담습니다. 투명도와 손실/무손실 압축을 모두 지원해 웹 게시용으로 가장 효율적입니다.",
      ],
    },
    {
      heading: "JPG로 바꾸면 투명 배경은 어떻게 되나",
      paragraphs: [
        "JPG는 투명도를 저장하지 못합니다. 그래서 투명 배경이 있는 PNG를 JPG로 변환하면 비어 있던 부분이 단색으로 채워집니다. 이 도구에서는 채울 색을 직접 정할 수 있습니다.",
        "기본값은 흰색이고, 검정과 밝은 회색을 바로 고르거나 색상 선택기로 원하는 색을 지정할 수 있습니다. 배경이 비치는 디자인이라면 흰색, 어두운 화면에 올릴 이미지라면 검정처럼, 쓸 곳에 맞춰 고르면 됩니다. 투명도를 그대로 유지하고 싶다면 PNG나 WebP로 변환하세요.",
      ],
      bullets: [
        "PNG → JPG: 투명 영역이 지정한 배경색으로 채워집니다",
        "PNG → PNG / WebP: 투명도가 그대로 유지됩니다",
        "품질 슬라이더는 JPG·WebP에만 적용되고, PNG는 무손실이라 품질 저하가 없습니다",
      ],
    },
    {
      heading: "용량과 호환성, 그리고 일괄 변환",
      paragraphs: [
        "용량만 보면 보통 WebP가 가장 작고, JPG가 그다음, PNG가 가장 큽니다. 다만 WebP는 비교적 최신 포맷이라 아주 오래된 환경에서는 열리지 않을 수 있습니다. 메일 첨부나 외부 공유처럼 호환성이 중요하면 JPG가 무난하고, 웹사이트에 올린다면 WebP가 로딩 속도에 유리합니다.",
        "아이폰 사진의 HEIC도 JPG·PNG·WebP로 바꿀 수 있고, 형식이 섞여 있어도 한 번에 올려 같은 포맷으로 일괄 변환한 뒤 ZIP으로 받을 수 있습니다. 품질을 90% 안팎으로 두면 용량은 줄이면서 눈에 띄는 화질 저하 없이 변환됩니다.",
      ],
    },
  ],
};

const workflowCTA = {
  message: "포맷 변환 끝났나요? 이런 작업도 할 수 있어요.",
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
    name: "이미지 포맷 변환 도구",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
    description: "PNG, JPG, WebP, HEIC 포맷 변환. 무제한 무료.",
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

export default function ConvertPage() {
  return (
    <ToolLayout
      title="이미지 포맷 변환"
      description="PNG, JPG, WebP, HEIC 자유자재로. 아이폰 사진도 브라우저에서 바로."
      guide={guide}
      faqs={faqs}
      workflowCTA={workflowCTA}
      currentToolHref="/tools/image/convert"
      relatedPostSlugs={["png-vs-jpg", "webp-guide", "transparent-background"]}
      schemas={schemas}
    >
      <ConvertTool />
    </ToolLayout>
  );
}
