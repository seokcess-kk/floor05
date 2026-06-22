import type { Metadata } from "next";
import ToolLayout from "@/components/common/ToolLayout";
import CompressTool from "@/components/image/CompressTool";
import { SITE_URL } from "@/lib/common/constants";

const PAGE_URL = `${SITE_URL}/tools/image/compress`;

export const metadata: Metadata = {
  title: "이미지 압축 - 서버 전송 없이 브라우저에서 바로",
  description:
    "파일이 내 기기를 떠나지 않습니다. 회원가입 없이 무제한 무료. 목표 용량 설정, 일괄 압축, Before/After 비교까지.",
  keywords: ["이미지 압축", "사진 용량 줄이기", "JPG 압축", "PNG 압축", "무료 이미지 압축"],
  openGraph: {
    title: "이미지 압축 - 서버 전송 없이 브라우저에서 바로",
    description: "파일이 내 기기를 떠나지 않습니다. 회원가입 없이 무제한 무료.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "이미지 압축 - 서버 전송 없이 브라우저에서 바로",
    description: "파일이 내 기기를 떠나지 않습니다. 회원가입 없이 무제한 무료.",
  },
  alternates: {
    canonical: PAGE_URL,
  },
};

const faqs = [
  {
    question: "파일이 서버로 전송되나요?",
    answer:
      "아니요, 모든 이미지 처리는 100% 브라우저에서 이루어집니다. 파일이 서버로 전송되지 않아 개인정보가 완벽하게 보호됩니다.",
  },
  {
    question: "한 번에 몇 장까지 압축할 수 있나요?",
    answer:
      "데스크톱에서는 최대 10장, 모바일에서는 최대 5장까지 동시에 압축할 수 있습니다. 파일당 최대 50MB까지 지원합니다.",
  },
  {
    question: "목표 용량 설정은 어떻게 작동하나요?",
    answer:
      "목표 용량을 설정하면 자동으로 최적의 품질을 찾아 해당 용량 이하로 압축합니다. 증명사진이나 지원서 제출 시 용량 제한이 있을 때 유용합니다.",
  },
  {
    question: "어떤 이미지 형식을 지원하나요?",
    answer:
      "JPG, PNG, WebP 이미지를 압축할 수 있습니다. '결과 형식'을 자동으로 두면 PNG는 투명을 유지한 채 압축하고, 나머지는 더 작은 JPG로 저장합니다. 원하면 전부 JPG 또는 전부 PNG로 지정할 수도 있습니다.",
  },
  {
    question: "압축 전후 차이를 미리 확인할 수 있나요?",
    answer:
      "네, Before/After 슬라이더로 원본과 압축 결과를 나란히 비교할 수 있습니다. 품질 슬라이더를 움직이면 예상 용량이 실시간으로 표시되므로, 화질과 용량이 만족스러운 지점을 찾은 뒤 다운로드하세요.",
  },
  {
    question: "PNG를 압축하면 투명 배경은 어떻게 되나요?",
    answer:
      "'결과 형식'을 자동 또는 PNG로 두면 투명 배경을 그대로 유지한 채 압축합니다. JPG로 저장하면 투명한 부분은 흰색으로 채워집니다.",
  },
];

const guide = {
  intro:
    "사진 한 장이 5MB, 10MB를 넘기는 건 요즘 휴대폰에선 흔한 일입니다. 문제는 그 용량 그대로는 이메일 첨부도, 지원서 업로드도, 메신저 전송도 자꾸 막힌다는 거죠. 이미지 압축은 눈에 보이는 화질은 최대한 지키면서 파일 크기만 덜어내는 작업입니다. 이 도구가 어떻게 동작하고, 언제 어떤 설정을 쓰면 좋은지 정리했습니다.",
  sections: [
    {
      heading: "압축은 어떻게 용량을 줄이나요",
      paragraphs: [
        "JPG 압축은 사람 눈이 잘 구분하지 못하는 미세한 색·밝기 차이를 덜어내는 방식으로 동작합니다. 품질 80% 정도면 원본과 나란히 놓고 봐도 차이를 느끼기 어려운데, 용량은 절반 이하로 줄어드는 경우가 많습니다. 품질을 낮출수록 파일은 작아지지만 경계가 뭉개지거나 하늘 같은 단색 면에 얼룩(노이즈)이 생기기 시작합니다.",
        "PNG는 원리가 다릅니다. 색 수를 줄여 데이터를 압축하기 때문에 사진보다는 단색·도형·로고에서 효과가 큽니다. 이 도구는 결과 형식을 '자동'으로 두면 투명이 필요한 PNG는 PNG로, 사진은 더 작은 JPG로 알아서 저장합니다.",
      ],
    },
    {
      heading: "목표 용량을 알고 있다면",
      paragraphs: [
        "증명사진 200KB 이하, 온라인 지원서 1MB 이하처럼 제출처가 정한 상한이 있을 때는 품질을 손으로 맞추기보다 '목표 용량'을 입력하세요. 그 용량 아래로 떨어지는 가장 좋은 품질을 자동으로 찾아줍니다. 매번 슬라이더를 올렸다 내렸다 할 필요가 없습니다.",
      ],
      bullets: [
        "메신저·카카오톡 전송: 1MB 안팎이면 화질·속도가 둘 다 무난합니다.",
        "이메일 첨부: 받는 사람을 배려해 장당 2MB 이하를 권합니다.",
        "온라인 지원서·민원 서류: 안내된 상한보다 살짝 작게 잡으면 안전합니다.",
      ],
    },
    {
      heading: "이럴 땐 압축 대신 다른 도구",
      paragraphs: [
        "사진의 가로·세로 픽셀 자체가 너무 크다면 압축보다 리사이즈가 빠릅니다. 4000×3000을 2000×1500으로 줄이면 그것만으로 용량이 약 1/4이 됩니다. 반대로 화질은 그대로 두되 PNG를 JPG로 바꿔 용량만 줄이고 싶다면 포맷 변환이 맞습니다. 압축·리사이즈·변환은 서로 보완 관계라, 상황에 맞게 골라 쓰면 됩니다.",
        "어떤 경우든 파일은 브라우저 안에서만 처리되고 서버로 올라가지 않습니다. 민감한 신분증·계약서 사진도 마음 놓고 줄일 수 있습니다.",
      ],
    },
  ],
};

const workflowCTA = {
  message: "압축 끝났나요? 이런 작업도 할 수 있어요.",
  tools: [
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
    {
      name: "이미지 크롭",
      href: "/tools/image/crop",
      description: "원하는 부분만 자르기",
    },
  ],
};

// Schema.org Markup
const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "이미지 압축 도구",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "KRW",
    },
    description: "서버 전송 없이 브라우저에서 바로 이미지 압축. 무제한 무료.",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "이미지 압축하는 방법",
    step: [
      {
        "@type": "HowToStep",
        name: "이미지 업로드",
        text: "압축할 이미지를 드래그앤드롭하거나 클릭해서 선택합니다.",
      },
      {
        "@type": "HowToStep",
        name: "압축 옵션 설정",
        text: "품질 슬라이더로 압축률을 조절하거나 목표 용량을 설정합니다.",
      },
      {
        "@type": "HowToStep",
        name: "압축 실행",
        text: "압축 버튼을 클릭하면 브라우저에서 바로 압축됩니다.",
      },
      {
        "@type": "HowToStep",
        name: "다운로드",
        text: "압축된 이미지를 다운로드합니다. 여러 장일 경우 ZIP으로 받을 수 있습니다.",
      },
    ],
  },
];

export default function CompressPage() {
  return (
    <ToolLayout
      title="이미지 압축"
      description="서버 전송 없이 브라우저에서 바로. 목표 용량 설정, 일괄 압축까지."
      guide={guide}
      faqs={faqs}
      workflowCTA={workflowCTA}
      currentToolHref="/tools/image/compress"
      relatedPostSlugs={["image-compression-guide", "passport-photo-size", "image-quality-vs-size"]}
      schemas={schemas}
    >
      <CompressTool />
    </ToolLayout>
  );
}
