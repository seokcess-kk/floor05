import type { Metadata } from "next";
import ToolLayout from "@/components/common/ToolLayout";
import ConvertTool from "@/components/image/ConvertTool";
import { SITE_URL } from "@/lib/common/constants";

const PAGE_URL = `${SITE_URL}/tools/image/webp-to-jpg`;

export const metadata: Metadata = {
  title: "WebP를 JPG로 변환 - 안 열리는 WebP 바로 열기",
  description:
    "웹에서 받은 WebP가 안 열리나요? WebP를 JPG로 브라우저에서 바로 변환하세요. PNG로도 변환 가능. 파일이 서버로 전송되지 않습니다.",
  keywords: ["WebP JPG 변환", "webp 변환", "webp 안열림", "webp jpg", "WebP PNG 변환"],
  openGraph: {
    title: "WebP를 JPG로 변환 - 안 열리는 WebP 바로 열기",
    description: "WebP를 JPG·PNG로 브라우저에서 바로 변환. 서버 전송 없이 안전하게.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WebP를 JPG로 변환 - 안 열리는 WebP 바로 열기",
    description: "WebP를 JPG·PNG로 브라우저에서 바로 변환. 서버 전송 없이 안전하게.",
  },
  alternates: {
    canonical: PAGE_URL,
  },
};

const faqs = [
  {
    question: "WebP가 뭔가요? 왜 이 파일이 다운로드됐나요?",
    answer:
      "WebP는 구글이 만든 이미지 포맷으로, JPG보다 25~35% 작은 용량에 비슷한 화질을 담습니다. 그래서 요즘 웹사이트들이 이미지를 WebP로 제공하는 경우가 많고, 그 이미지를 저장하면 .webp 확장자로 받아집니다.",
  },
  {
    question: "WebP가 그림판이나 일부 프로그램에서 안 열려요.",
    answer:
      "구형 윈도우 사진 뷰어, 일부 편집 프로그램, 오래된 문서 도구는 WebP를 지원하지 않습니다. 이럴 때 WebP를 JPG로 변환하면 어디서든 열 수 있습니다. 이 도구는 변환을 100% 브라우저에서 처리하므로 파일이 서버로 올라가지 않습니다.",
  },
  {
    question: "WebP를 JPG로 바꾸면 화질이 떨어지나요?",
    answer:
      "품질을 90% 이상으로 두면 육안으로 구분하기 어려운 수준입니다. JPG는 손실 압축이라 약간의 변화는 있지만, 기본 설정(90%)이면 대부분의 용도에 충분합니다.",
  },
  {
    question: "투명한 WebP는 어떻게 되나요?",
    answer:
      "JPG는 투명도를 저장하지 못하므로, 투명한 WebP를 JPG로 바꾸면 투명 부분이 선택한 배경색(기본 흰색)으로 채워집니다. 투명도를 유지하고 싶다면 출력 포맷을 PNG로 고르세요.",
  },
  {
    question: "여러 장을 한 번에 변환할 수 있나요?",
    answer:
      "네, 데스크톱은 최대 10장, 모바일은 최대 5장까지 동시에 변환하고, 변환이 끝나면 ZIP 파일로 한 번에 받을 수 있습니다.",
  },
];

const guide = {
  intro:
    "요즘 웹사이트에서 이미지를 저장하면 .webp 확장자로 받아지는 경우가 많습니다. 보기엔 멀쩡한 이미지인데 그림판이나 오래된 프로그램에서 안 열려 당황하기 쉽죠. 이 도구는 그 WebP 파일을 어디서나 열리는 JPG로 바꿔줍니다. 변환은 전부 브라우저 안에서 끝나고, 파일이 서버로 올라가는 일은 없습니다.",
  sections: [
    {
      heading: "WebP는 왜 자꾸 받아질까",
      paragraphs: [
        "WebP는 구글이 웹 속도를 위해 만든 포맷입니다. 같은 화질을 JPG보다 작은 용량에 담을 수 있어서, 많은 웹사이트가 이미지를 WebP로 제공합니다. 그래서 이미지를 '다른 이름으로 저장'하면 원본이 WebP인 채로 내려받아지는 일이 흔합니다.",
        "문제는 효율이 좋은 대신 호환성이 아직 완전하지 않다는 점입니다. 최신 브라우저에서는 잘 보이지만, 윈도우 기본 사진 뷰어의 구버전이나 일부 편집·문서 프로그램에서는 'WebP를 지원하지 않는다'며 열리지 않습니다.",
      ],
    },
    {
      heading: "JPG로 바꾸면 좋은 이유",
      paragraphs: [
        "JPG는 30년 가까이 표준으로 쓰여 윈도우, 안드로이드, 웹 업로드, 거의 모든 편집기에서 별도 설정 없이 열립니다. WebP를 JPG로 한 번 바꿔두면 '이 파일 안 열려요' 같은 상황을 대부분 피할 수 있습니다.",
        "관공서·쇼핑몰·채용 사이트에서 'JPG·PNG만 업로드 가능'이라며 WebP를 거부하는 경우에도, 이 도구로 JPG로 바꾸면 그대로 제출할 수 있습니다. 투명도가 필요한 이미지라면 JPG 대신 PNG로 변환하면 됩니다.",
      ],
      bullets: [
        "WebP → JPG: 호환성 최우선. 메일 첨부·문서·업로드에 무난",
        "WebP → PNG: 투명도를 유지해야 할 때",
        "품질 90% 안팎이면 용량은 줄고 화질 저하는 눈에 띄지 않음",
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
      name: "JPG → PNG 변환",
      href: "/tools/image/jpg-to-png",
      description: "투명 배경이 필요할 때",
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
    name: "WebP→JPG 변환 도구",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
    description: "WebP를 JPG·PNG로 변환. 100% 브라우저 처리, 무제한 무료.",
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
    name: "WebP를 JPG로 변환하는 방법",
    step: [
      { "@type": "HowToStep", name: "WebP 업로드", text: "변환할 WebP 파일을 드래그앤드롭합니다." },
      { "@type": "HowToStep", name: "출력 포맷 확인", text: "JPG가 기본 선택되어 있습니다. 투명도가 필요하면 PNG를 고릅니다." },
      { "@type": "HowToStep", name: "변환", text: "변환 버튼을 누르면 브라우저에서 바로 변환됩니다." },
      { "@type": "HowToStep", name: "다운로드", text: "변환된 JPG 파일을 내려받습니다." },
    ],
  },
];

export default function WebpToJpgPage() {
  return (
    <ToolLayout
      title="WebP → JPG 변환"
      description="안 열리는 WebP를 JPG로 브라우저에서 바로. 서버 전송 없이 안전하게."
      guide={guide}
      faqs={faqs}
      workflowCTA={workflowCTA}
      currentToolHref="/tools/image/webp-to-jpg"
      relatedPostSlugs={["webp-guide", "avif-guide", "browser-image-tools-privacy"]}
      schemas={schemas}
    >
      <ConvertTool toolId="webp-to-jpg" defaultFormat="image/jpeg" />
    </ToolLayout>
  );
}
