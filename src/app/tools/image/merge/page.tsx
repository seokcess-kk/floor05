import type { Metadata } from "next";
import ToolLayout from "@/components/common/ToolLayout";
import MergeTool from "@/components/image/MergeTool";
import { SITE_URL } from "@/lib/common/constants";

const PAGE_URL = `${SITE_URL}/tools/image/merge`;

export const metadata: Metadata = {
  title: "사진 합치기 - 여러 장을 한 장으로, 브라우저에서 바로",
  description:
    "여러 사진을 세로·가로로 한 장에 이어붙입니다. 파일이 서버로 전송되지 않습니다. 카카오톡 캡처 합치기, 크기 다른 사진 정렬까지 무료로.",
  keywords: [
    "사진 합치기",
    "이미지 합치기",
    "캡처 합치기",
    "사진 여러장 한장으로",
    "사진 세로로 합치기",
    "카톡 캡처 합치기",
  ],
  openGraph: {
    title: "사진 합치기 - 여러 장을 한 장으로, 브라우저에서 바로",
    description: "여러 사진을 세로·가로로 한 장에. 파일이 서버로 전송되지 않습니다.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "사진 합치기 - 여러 장을 한 장으로, 브라우저에서 바로",
    description: "여러 사진을 세로·가로로 한 장에. 파일이 서버로 전송되지 않습니다.",
  },
  alternates: {
    canonical: PAGE_URL,
  },
};

const faqs = [
  {
    question: "파일이 서버로 전송되나요?",
    answer:
      "아니요, 모든 처리는 100% 브라우저에서 이루어집니다. 합치는 사진이 서버로 전송되지 않아 개인정보가 안전합니다.",
  },
  {
    question: "한 번에 몇 장까지 합칠 수 있나요?",
    answer:
      "데스크톱에서는 최대 10장, 모바일에서는 최대 5장까지 합칠 수 있습니다. 파일당 최대 50MB까지 지원합니다.",
  },
  {
    question: "세로와 가로 둘 다 되나요?",
    answer:
      "네. '세로로 합치기'는 위에서 아래로 길게 이어붙이고, '가로로 합치기'는 좌우로 나란히 붙입니다. 캡처를 길게 이어붙일 때는 세로를 사용하세요.",
  },
  {
    question: "크기가 다른 사진도 깔끔하게 합쳐지나요?",
    answer:
      "'너비(높이) 맞추기'를 선택하면 모든 사진을 같은 폭으로 맞춰 비율을 유지한 채 이어붙입니다. '원본 크기 유지'를 선택하면 크기를 그대로 두고 빈 공간을 배경색으로 채웁니다.",
  },
  {
    question: "카카오톡 대화 캡처를 길게 이어붙일 수 있나요?",
    answer:
      "네. 캡처들을 순서대로 추가하고 '세로로 합치기' + '너비 맞추기'를 사용하면 하나의 긴 이미지로 이어집니다. 순서는 목록에서 위/아래 버튼으로 조정할 수 있습니다.",
  },
  {
    question: "합치는 순서는 어떻게 바꾸나요?",
    answer:
      "이미지 목록에서 각 항목의 위/아래 화살표 버튼으로 순서를 바꿀 수 있습니다. 목록에 보이는 순서 그대로 합쳐집니다.",
  },
];

const guide = {
  intro:
    "여러 장의 사진을 한 장으로 이어붙이는 도구입니다. 위아래로 길게 잇거나 좌우로 나란히 붙일 수 있고, 모든 처리는 브라우저 안에서 끝나 파일이 서버로 전송되지 않습니다. 캡처를 길게 잇는 일부터 비교샷 콜라주까지 한 자리에서 해결됩니다.",
  sections: [
    {
      heading: "세로와 가로, 언제 무엇을 쓰나",
      paragraphs: [
        "세로 합치기는 위에서 아래로 차곡차곡 잇습니다. 카카오톡 대화나 긴 웹페이지 캡처처럼 '내려 읽는' 내용에 잘 맞습니다. 캡처 여러 장을 순서대로 추가하고 세로 + 너비 맞추기를 고르면 끊김 없는 하나의 긴 이미지가 됩니다.",
        "가로 합치기는 좌우로 나란히 붙입니다. 비포·애프터 비교샷, 두세 컷을 한 줄로 보여주는 콜라주, 가로로 흐르는 타임라인 같은 구성에 어울립니다. 무엇을 강조하고 싶은지에 따라 방향을 고르면 됩니다.",
      ],
    },
    {
      heading: "크기 다른 사진을 깔끔하게 잇는 법",
      paragraphs: [
        "사진마다 해상도가 다르면 그냥 붙였을 때 들쭉날쭉해 보이기 쉽습니다. 그럴 때 쓰는 옵션이 크기 맞춤입니다.",
      ],
      bullets: [
        "너비(높이) 맞추기: 모든 사진을 같은 폭(또는 높이)으로 정렬해 비율을 유지한 채 이어붙입니다. 캡처 합치기에 가장 깔끔합니다.",
        "원본 크기 유지: 사진 크기를 그대로 두고 남는 공간을 배경색으로 채웁니다. 크기 차이를 일부러 보여주고 싶을 때 씁니다.",
        "간격과 배경색: 사진 사이에 여백을 주고 그 색을 지정할 수 있습니다. 흰 배경에 살짝 간격을 두면 콜라주가 한결 정돈돼 보입니다.",
      ],
    },
    {
      heading: "합친 뒤, 용량과 순서 챙기기",
      paragraphs: [
        "합칠 순서는 목록에 보이는 그대로입니다. 각 항목의 위·아래 버튼으로 자리를 바꿀 수 있으니, 캡처를 뒤죽박죽 넣었어도 마지막에 정리하면 됩니다. 저장 포맷은 사진이 많은 합본이라면 JPG, 글자나 선이 또렷해야 하면 PNG를 고르세요.",
        "여러 장을 이으면 결과 이미지가 꽤 커질 수 있습니다. 메신저나 메일로 보내기엔 부담스러운 용량이라면, 합친 파일을 그대로 이미지 압축 도구로 넘겨 가볍게 줄이면 됩니다. 합치기와 압축을 이어서 쓰면 '길고 선명한데 가벼운' 한 장을 만들 수 있습니다.",
      ],
    },
  ],
};

const workflowCTA = {
  message: "합치기 끝났나요? 이런 작업도 할 수 있어요.",
  tools: [
    {
      name: "이미지 압축",
      href: "/tools/image/compress",
      description: "용량도 줄여보세요",
    },
    {
      name: "이미지 리사이즈",
      href: "/tools/image/resize",
      description: "크기 조절하기",
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
    name: "이미지 합치기 도구",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "KRW",
    },
    description:
      "서버 전송 없이 브라우저에서 여러 사진을 세로·가로로 한 장으로 합치기. 무제한 무료.",
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
    name: "여러 사진을 한 장으로 합치는 방법",
    step: [
      {
        "@type": "HowToStep",
        name: "이미지 추가",
        text: "합칠 이미지 2장 이상을 드래그앤드롭하거나 클릭해서 선택합니다.",
      },
      {
        "@type": "HowToStep",
        name: "순서와 방향 설정",
        text: "목록에서 합칠 순서를 정하고, 세로/가로 방향과 크기 맞춤 방식을 선택합니다.",
      },
      {
        "@type": "HowToStep",
        name: "합치기 실행",
        text: "합치기 버튼을 클릭하면 브라우저에서 바로 한 장으로 결합됩니다.",
      },
      {
        "@type": "HowToStep",
        name: "다운로드",
        text: "합쳐진 이미지를 다운로드합니다.",
      },
    ],
  },
];

export default function MergePage() {
  return (
    <ToolLayout
      title="사진 합치기"
      description="여러 사진을 세로·가로로 한 장에. 캡처 이어붙이기까지."
      guide={guide}
      faqs={faqs}
      workflowCTA={workflowCTA}
      currentToolHref="/tools/image/merge"
      relatedPostSlugs={["image-merge-guide", "youtube-thumbnail-size"]}
      schemas={schemas}
    >
      <MergeTool />
    </ToolLayout>
  );
}
