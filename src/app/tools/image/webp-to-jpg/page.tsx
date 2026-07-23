import type { Metadata } from "next";
import ToolLayout from "@/components/common/ToolLayout";
import ConvertTool from "@/components/image/ConvertTool";
import { SITE_URL } from "@/lib/common/constants";

const PAGE_URL = `${SITE_URL}/tools/image/webp-to-jpg`;

export const metadata: Metadata = {
  title: "WebP를 JPG로 변환 - 안 열리는 WebP 바로 열기",
  description:
    "웹에서 받은 WebP가 안 열리나요? WebP를 JPG로 브라우저에서 바로 변환하세요. PNG로도 변환 가능. 안 열리는 파일 때문에 왔는데 또 어딘가에 업로드할 필요는 없습니다.",
  keywords: ["WebP JPG 변환", "webp 변환", "webp 안열림", "webp jpg", "WebP PNG 변환"],
  openGraph: {
    title: "WebP를 JPG로 변환 - 안 열리는 WebP 바로 열기",
    description: "안 열리는 WebP를 JPG·PNG로. 업로드 없이 브라우저에서 바로.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WebP를 JPG로 변환 - 안 열리는 WebP 바로 열기",
    description: "그림판에서 안 열리는 WebP, JPG로 바꿔서 여세요.",
  },
  alternates: {
    canonical: PAGE_URL,
  },
};

const faqs = [
  {
    question: "WebP가 뭔가요? 왜 이 파일이 다운로드됐나요?",
    answer:
      "웹사이트가 이미지를 WebP로 내보내는 일이 많아진 탓입니다. 화면에선 평범한 사진처럼 보여도 '다른 이름으로 저장'을 누르면 원본 그대로 .webp로 떨어지죠. 구글이 웹 로딩을 줄이려고 밀고 있는 포맷이라 점점 흔해졌는데, 정작 저장한 뒤 안 열려 당황하는 경우가 많습니다. 그럴 때 여기서 JPG로 바꾸면 됩니다.",
  },
  {
    question: "WebP가 그림판이나 일부 프로그램에서 안 열려요.",
    answer:
      "구형 윈도우 사진 뷰어, 일부 편집 프로그램, 오래된 문서 도구는 WebP를 지원하지 않습니다. 이럴 때 WebP를 JPG로 변환하면 어디서든 열 수 있습니다. 이 도구는 WebP를 잘 읽는 브라우저의 힘을 빌려 변환하므로, 프로그램 설치도 파일 업로드도 필요 없습니다.",
  },
  {
    question: "WebP를 JPG로 바꾸면 화질이 떨어지나요?",
    answer:
      "WebP도 JPG도 손실 압축이라 이론상 두 번 눌리는 셈이지만, 품질을 90% 안팎으로 두면 그 차이는 화면에서 잘 드러나지 않습니다. 웹에 올릴 사진이면 이 정도로 충분하고, 인쇄처럼 더 또렷해야 한다면 원본 WebP를 따로 남겨 두는 편이 낫습니다.",
  },
  {
    question: "투명한 WebP는 어떻게 되나요?",
    answer:
      "JPG는 투명도를 저장하지 못하므로, 투명한 WebP를 JPG로 바꾸면 투명 부분이 선택한 배경색(기본 흰색)으로 채워집니다. 투명도를 유지하고 싶다면 출력 포맷을 PNG로 고르세요.",
  },
  {
    question: "웹에서 그러모은 WebP 여러 장을 한꺼번에 바꿀 수 있나요?",
    answer:
      "네. 한 번에 데스크톱 10장, 모바일 5장까지 올라가니, 여기저기서 저장해 둔 .webp를 한자리에 모아 통째로 JPG로 돌리기 좋습니다. 변환이 끝나면 ZIP 하나로 묶여 내려옵니다.",
  },
];

const guide = {
  intro:
    "요즘 웹사이트에서 이미지를 저장하면 .webp 확장자로 받아지는 경우가 많습니다. 보기엔 멀쩡한 이미지인데 그림판이나 오래된 프로그램에서 안 열려 당황하기 쉽죠. 이 도구는 그 WebP 파일을 어디서나 열리는 JPG로 바꿔줍니다. 다른 프로그램은 WebP를 못 열어도 브라우저만은 잘 읽는다는 점을 그대로 이용한 도구라, 파일을 어디에 올리지 않고 이 자리에서 변환이 끝납니다.",
  sections: [
    {
      heading: "WebP는 왜 자꾸 받아질까",
      paragraphs: [
        "WebP는 구글이 웹 속도를 위해 만든 포맷입니다. 같은 화질을 JPG보다 작은 용량에 담을 수 있어서, 많은 웹사이트가 이미지를 WebP로 제공합니다. 그래서 이미지를 '다른 이름으로 저장'하면 원본이 WebP인 채로 내려받아지는 일이 흔합니다.",
        "문제는 효율이 좋은 대신 호환성이 아직 완전하지 않다는 점입니다. 최신 브라우저에서는 잘 보이지만, 윈도우 기본 사진 뷰어의 구버전이나 일부 편집·문서 프로그램에서는 'WebP를 지원하지 않는다'며 열리지 않습니다.",
      ],
    },
    {
      heading: "그래서 왜 JPG로 바꾸나",
      paragraphs: [
        "WebP가 웹 속도를 위해 태어난 신참이라면, JPG는 어디서나 통하는 만능 열쇠에 가깝습니다. 그림판이든 관공서 업로드 창이든 JPG를 마다하는 곳은 드무니, WebP를 JPG로 한 번 바꿔 두면 '왜 안 열리지' 하며 헤맬 일이 크게 줄어듭니다.",
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
    description: "안 열리는 WebP를 JPG·PNG로 바꾸는 무료 도구. 브라우저가 직접 읽고 변환합니다.",
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

export default function WebpToJpgPage() {
  return (
    <ToolLayout
      title="WebP → JPG 변환"
      description="안 열리는 WebP를 JPG로. 업로드 없이 브라우저에서 바로 변환."
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
