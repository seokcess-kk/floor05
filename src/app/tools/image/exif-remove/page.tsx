import type { Metadata } from "next";
import ToolLayout from "@/components/common/ToolLayout";
import ExifRemoveTool from "@/components/image/ExifRemoveTool";
import { SITE_URL } from "@/lib/common/constants";

const PAGE_URL = `${SITE_URL}/tools/image/exif-remove`;

export const metadata: Metadata = {
  title: "EXIF 삭제 - 사진 위치정보·메타데이터 제거",
  description:
    "사진에 담긴 촬영 위치(GPS), 기기 정보, 촬영 시각 같은 EXIF 메타데이터를 제거합니다. SNS·중고거래에 올리기 전 위치 노출 차단. 지우려던 정보가 다른 서버에 남지 않도록, 판독부터 제거까지 브라우저 안에서 무료로 끝냅니다.",
  keywords: [
    "exif 삭제",
    "사진 위치정보 삭제",
    "메타데이터 제거",
    "GPS 정보 삭제",
    "사진 위치 제거",
    "exif 제거",
    "사진 정보 삭제",
  ],
  openGraph: {
    title: "EXIF 삭제 - 사진 위치정보·메타데이터 제거",
    description: "촬영 위치(GPS)·기기 정보·촬영 시각을 제거. 판독부터 삭제까지 브라우저 안에서.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "EXIF 삭제 - 사진 위치정보·메타데이터 제거",
    description: "사진의 위치정보·메타데이터를 브라우저에서 바로 제거.",
  },
  alternates: { canonical: PAGE_URL },
};

const guide = {
  intro:
    "스마트폰으로 찍은 사진에는 눈에 보이지 않는 정보가 함께 저장됩니다. 찍은 위치(GPS 좌표), 기기 모델, 촬영 날짜·시각 같은 EXIF 메타데이터입니다. 이걸 그대로 올리면 집 위치나 생활 패턴이 노출될 수 있습니다. 이 도구는 그 정보를 깔끔히 지웁니다.",
  sections: [
    {
      heading: "EXIF에는 어떤 정보가 담기나",
      paragraphs: [
        "EXIF는 사진 파일 안에 들어가는 부가 정보입니다. 특히 위치정보(GPS)가 켜진 상태로 찍은 사진은 정확한 촬영 좌표가 들어가, 지도에 찍으면 어디서 찍었는지가 그대로 드러납니다.",
      ],
      bullets: [
        "촬영 위치(GPS 위도·경도) — 집·직장 위치 노출 위험",
        "기기·렌즈 정보, 카메라 설정",
        "촬영 날짜와 시각",
      ],
    },
    {
      heading: "올리기 전에 지우는 습관",
      paragraphs: [
        "사진을 올리면 그 안의 EXIF가 함께 퍼집니다. 일부 SNS는 업로드 시 자동으로 지우기도 하지만, 모든 플랫폼이 그러는 건 아니고 원본 파일을 직접 주고받을 땐 그대로 남습니다. 중고거래, 블로그, 메신저로 사진을 보낼 때 미리 지워 두는 게 안전합니다.",
        "이 도구는 사진을 다시 인코딩하는 방식으로 EXIF를 포함한 모든 메타데이터를 제거합니다. 여러 장을 한 번에 올리면 ZIP으로 묶어 받을 수 있습니다. 위치 정보를 지우려고 올린 사진이 다른 서버에 남는다면 모순이겠죠. EXIF 판독과 제거 모두 지금 열려 있는 이 브라우저 탭 안에서 끝납니다.",
      ],
    },
  ],
};

const faqs = [
  {
    question: "EXIF를 지우면 사진 화질이 떨어지나요?",
    answer:
      "JPG는 다시 인코딩하는 과정에서 아주 미미한 차이가 있을 수 있으나 눈으로는 거의 구분되지 않습니다(품질 95% 유지). PNG는 무손실로 처리됩니다.",
  },
  {
    question: "위치정보(GPS)만 골라 지울 수 있나요?",
    answer:
      "이 도구는 위치정보를 포함한 모든 메타데이터(기기·시각 등)를 함께 제거합니다. 원본에 위치정보가 있었으면 목록에 '위치정보(GPS) 포함'으로 표시해 알려줍니다.",
  },
  {
    question: "SNS에 올리면 자동으로 지워지지 않나요?",
    answer:
      "일부 플랫폼은 업로드 시 EXIF를 제거하지만 모두 그런 건 아니며, 원본 파일을 직접 주고받을 땐 그대로 남습니다. 미리 지워 두는 게 안전합니다.",
  },
  {
    question: "위치를 지우려는 사진이 서버에 올라가지는 않나요?",
    answer:
      "아니요. 위치를 지우러 온 사진을 서버에 받아 두는 건 이 도구의 존재 이유와 어긋납니다. EXIF 판독도 제거도 기기 안에서만 이루어지고, 원본과 결과물 모두 어디에도 저장되지 않습니다.",
  },
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "EXIF 삭제",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
    description: "사진의 EXIF(위치·기기·시각) 메타데이터를 제거하는 무료 도구. 판독과 제거 모두 브라우저 안에서 이루어집니다.",
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

export default function ExifRemovePage() {
  return (
    <ToolLayout
      title="EXIF 삭제"
      description="사진의 위치정보·촬영정보를 제거. 올리기 전 GPS 노출을 막습니다."
      guide={guide}
      faqs={faqs}
      currentToolHref="/tools/image/exif-remove"
      relatedPostSlugs={["exif-removal-guide", "browser-image-tools-privacy"]}
      schemas={schemas}
    >
      <ExifRemoveTool />
    </ToolLayout>
  );
}
