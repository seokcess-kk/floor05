import type { Metadata } from "next";
import ToolLayout from "@/components/common/ToolLayout";
import CropTool from "@/components/image/CropTool";
import { SITE_URL } from "@/lib/common/constants";

const PAGE_URL = `${SITE_URL}/tools/image/crop`;

export const metadata: Metadata = {
  title: "이미지 크롭 - 원하는 부분만 깔끔하게",
  description:
    "드래그로 간편하게 사진 자르기. 증명사진 규격·원형 크롭·고정 크기 출력, 1:1·16:9 비율 프리셋. 파일이 서버로 전송되지 않습니다.",
  keywords: [
    "이미지 크롭",
    "사진 자르기",
    "이미지 자르기",
    "증명사진 크기",
    "증명사진 자르기",
    "원형 사진 만들기",
    "프로필 사진 자르기",
    "1:1 크롭",
  ],
  openGraph: {
    title: "이미지 크롭 - 원하는 부분만 깔끔하게",
    description: "드래그로 간편하게 사진 자르기. 비율 프리셋 지원.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "이미지 크롭 - 원하는 부분만 깔끔하게",
    description: "드래그로 간편하게 사진 자르기. 비율 프리셋 지원.",
  },
  alternates: {
    canonical: PAGE_URL,
  },
};

const faqs = [
  {
    question: "비율을 고정하고 자를 수 있나요?",
    answer:
      "네, 1:1(정방형), 4:3(일반 사진), 16:9(와이드스크린) 등의 비율 프리셋을 선택하면 해당 비율로 고정됩니다. '자유' 옵션을 선택하면 원하는 대로 자유롭게 선택할 수 있습니다.",
  },
  {
    question: "증명사진 규격으로 자를 수 있나요?",
    answer:
      "네. 증명사진(3×4cm), 여권(3.5×4.5cm), 미국 비자(2×2인치) 프리셋을 선택하면 해당 규격 비율로 자르고 권장 픽셀 크기(300DPI)로 맞춰 저장합니다. '정확한 크기로 출력'에서 원하는 px를 직접 지정할 수도 있습니다.",
  },
  {
    question: "사진을 원형으로 자를 수 있나요?",
    answer:
      "네. '원형으로 자르기'를 켜면 선택한 영역을 원형으로 잘라 투명 배경 PNG로 저장합니다. 1:1 비율과 함께 쓰면 완전한 원이 되어 프로필 사진에 적합합니다.",
  },
  {
    question: "회전이나 반전도 가능한가요?",
    answer:
      "네, 90도 단위로 좌우 회전과 상하/좌우 반전이 가능합니다. 회전과 반전 후 원하는 영역을 선택해서 크롭할 수 있습니다.",
  },
  {
    question: "크롭한 이미지의 품질이 떨어지나요?",
    answer:
      "아니요, 원본 해상도 그대로 크롭됩니다. 선택한 영역의 픽셀을 그대로 추출하므로 품질 저하가 없습니다.",
  },
  {
    question: "여러 장을 한 번에 크롭할 수 있나요?",
    answer:
      "현재는 한 장씩 크롭할 수 있습니다. 같은 크기로 여러 장을 자르고 싶다면 리사이즈 도구의 SNS 프리셋을 활용해보세요.",
  },
  {
    question: "휴대폰에서도 드래그로 자를 수 있나요?",
    answer:
      "네, 모바일에서도 손가락으로 크롭 영역을 이동하고 모서리 핸들을 끌어 크기를 조절할 수 있습니다. PC에서는 마우스로 동일하게 동작합니다.",
  },
  {
    question: "프로필 사진이나 썸네일용으로 자르기 좋은 비율은?",
    answer:
      "프로필·SNS 아바타는 1:1(정방형), 유튜브 썸네일처럼 와이드한 화면은 16:9, 일반 인화용은 4:3 프리셋이 적합합니다. 비율을 선택하면 그 비율이 고정된 채로 영역만 조절됩니다.",
  },
];

const workflowCTA = {
  message: "크롭 끝났나요? 이런 작업도 할 수 있어요.",
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
      name: "포맷 변환",
      href: "/tools/image/convert",
      description: "PNG, WebP로 변환",
    },
  ],
};

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "이미지 크롭 도구",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
    description: "드래그로 간편하게 사진 자르기. 무제한 무료.",
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

export default function CropPage() {
  return (
    <ToolLayout
      title="이미지 크롭"
      description="원하는 부분만 깔끔하게. 드래그로 간편하게 자르기."
      faqs={faqs}
      workflowCTA={workflowCTA}
      currentToolHref="/tools/image/crop"
      relatedPostSlugs={["image-crop-guide", "image-merge-guide"]}
      schemas={schemas}
    >
      <CropTool />
    </ToolLayout>
  );
}
