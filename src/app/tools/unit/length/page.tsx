import type { Metadata } from "next";
import ToolLayout from "@/components/common/ToolLayout";
import UnitConverter from "@/components/unit/UnitConverter";
import { SITE_URL } from "@/lib/common/constants";

const PAGE_URL = `${SITE_URL}/tools/unit/length`;

export const metadata: Metadata = {
  title: "길이 변환 - cm 인치 m 피트 한 번에",
  description:
    "센티미터, 인치, 미터, 피트, 밀리미터, 킬로미터를 한 화면에서 양방향 변환합니다. 인치를 cm로, cm를 인치로 어느 칸에 넣어도 바로. 전부 무료, 입력한 치수는 화면 밖으로 나가지 않습니다.",
  keywords: [
    "cm 인치 변환",
    "인치 cm",
    "길이 변환",
    "인치 센티미터 변환",
    "피트 cm 변환",
    "단위 변환",
    "mm cm m 변환",
  ],
  openGraph: {
    title: "길이 변환 - cm 인치 m 피트 한 번에",
    description: "cm·인치·m·피트·mm·km를 한 화면에서 양방향 즉시 변환.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "길이 변환 - cm 인치 m 피트 한 번에",
    description: "cm·인치·m·피트를 어느 칸에 넣어도 바로 변환.",
  },
  alternates: { canonical: PAGE_URL },
};

const guide = {
  intro:
    "모니터·TV는 인치, 키는 cm, 운동장은 m로 잽니다. 단위가 섞이면 감이 안 잡히죠. 이 도구는 cm·인치·m·피트·mm·km를 한 화면에 놓고, 어느 칸에든 값을 넣으면 나머지가 바로 바뀌게 했습니다.",
  sections: [
    {
      heading: "cm와 인치, 자주 쓰는 변환",
      paragraphs: [
        "1인치는 정확히 2.54cm입니다. 그래서 인치를 cm로 바꾸려면 2.54를 곱하고, cm를 인치로 바꾸려면 2.54로 나눕니다. 청바지·모니터·타이어처럼 인치로 표기되는 물건의 크기를 가늠할 때 자주 쓰입니다.",
      ],
      bullets: [
        "1인치 = 2.54cm",
        "1피트 = 30.48cm (= 12인치)",
        "27인치 모니터 ≈ 68.6cm (대각선)",
        "1m = 100cm = 약 39.4인치",
      ],
    },
    {
      heading: "어느 칸에 넣어도 바로",
      paragraphs: [
        "이 변환기는 한 방향이 아니라 양방향입니다. cm 칸에 170을 넣으면 인치·m·피트가 동시에 바뀌고, 반대로 인치 칸에 값을 넣으면 cm가 바뀝니다. 변환 방향을 고를 필요 없이, 알고 있는 값을 아무 칸에나 넣으면 됩니다.",
        "2.54를 곱하고 나누는 정도는 브라우저 혼자서도 충분합니다. 그래서 입력한 값이 네트워크를 타고 나갈 일이 없습니다.",
      ],
    },
    {
      heading: "인치 표기, 이럴 때 자주 헷갈립니다",
      paragraphs: [
        "인치로 적힌 숫자는 물건마다 재는 방식이 다릅니다. TV·모니터의 인치는 화면 가로가 아니라 대각선 길이입니다. 27인치 모니터는 대각선이 약 68.6cm지만 16:9 화면이라 실제 가로는 약 59.8cm, 세로는 약 33.6cm입니다. 책상 폭을 잴 때 대각선을 가로로 착각하면 크게 어긋납니다.",
        "옷과 신발에서도 인치와 cm, mm가 뒤섞입니다. 청바지 허리 32인치는 약 81.3cm, 34인치는 약 86.4cm입니다. 신발은 발 길이를 mm로 적는 경우가 많아 260mm는 26cm입니다. 1인치가 2.54cm로 딱 떨어지니, 무엇을 재는 치수인지만 알면 환산은 곱셈 한 번으로 끝납니다.",
      ],
      bullets: [
        "TV·모니터 인치: 화면 대각선 길이(가로가 아님)",
        "청바지 인치: 허리둘레 — 32인치 ≈ 81.3cm",
        "타이어·자동차 휠 인치: 휠 지름 — 18인치 = 45.72cm",
        "신발: 발 길이 mm — 260mm = 26cm ≈ 10.2인치",
      ],
    },
  ],
};

const faqs = [
  {
    question: "1인치는 몇 cm인가요?",
    answer: "정확히 2.54cm입니다. 인치에 2.54를 곱하면 cm가 됩니다.",
  },
  {
    question: "cm를 인치로 어떻게 바꾸나요?",
    answer:
      "cm를 2.54로 나누면 인치가 됩니다. 예를 들어 30cm는 약 11.8인치입니다. 이 도구의 cm 칸에 값을 넣으면 인치가 바로 표시됩니다.",
  },
  {
    question: "1피트는 몇 cm인가요?",
    answer: "30.48cm입니다(= 12인치). 피트는 주로 키나 높이를 영미권 단위로 표기할 때 씁니다.",
  },
  {
    question: "27인치 모니터의 실제 가로 길이는 얼마인가요?",
    answer:
      "인치는 화면 대각선이라, 27인치라도 16:9 기준 가로는 약 59.8cm, 세로는 약 33.6cm입니다. 책상에 놓을 폭을 잴 때는 대각선이 아니라 이 가로 값을 봐야 합니다.",
  },
  {
    question: "청바지 32인치는 허리 몇 cm인가요?",
    answer:
      "약 81.3cm입니다. 32에 2.54를 곱한 값으로 허리둘레 기준입니다. 30인치는 약 76.2cm, 34인치는 약 86.4cm로 인치당 약 2.5cm씩 늘어납니다.",
  },
  {
    question: "키를 5피트 5인치처럼 적을 때 cm로는 얼마인가요?",
    answer:
      "피트와 인치를 따로 바꿔 더하면 됩니다. 5피트는 152.4cm, 5인치는 12.7cm라 합치면 약 165.1cm입니다.",
  },
  {
    question: "재서 넣은 치수가 저장되나요?",
    answer:
      "저장되지 않습니다. cm와 인치를 오가는 셈은 이 브라우저가 그 자리에서 처리하고, 넣은 치수는 화면을 벗어나면 남지 않습니다. 허리둘레를 넣어 봤더라도 다음에 열면 빈 칸으로 돌아옵니다.",
  },
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "길이 변환",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
    description: "cm·인치·m·피트·mm·km를 양방향으로 변환하는 무료 도구.",
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

export default function LengthPage() {
  return (
    <ToolLayout
      title="길이 변환"
      description="cm·인치·m·피트를 한 화면에서. 어느 칸에 넣어도 바로 변환됩니다."
      guide={guide}
      faqs={faqs}
      currentToolHref="/tools/unit/length"
      schemas={schemas}
    >
      <>
        <UnitConverter set="length" toolName="length" />

        <section className="mt-6 rounded-lg border border-brand-light/50 bg-brand-paper p-4 shadow-sm">
          <div className="mb-3">
            <h2 className="text-lg font-semibold text-brand-dark">생활 속 인치·피트 환산표</h2>
            <p className="mt-1 text-sm text-brand-mid">
              1인치 = 2.54cm, 1피트 = 30.48cm(12인치), 1야드 = 91.44cm(3피트) 기준입니다.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-sm">
              <caption className="sr-only">생활에서 자주 마주치는 인치·피트를 cm로 환산한 표</caption>
              <thead>
                <tr className="border-y border-brand-light/50 bg-brand-light/10 text-left text-brand-dark">
                  <th scope="col" className="px-3 py-2 font-semibold">표기</th>
                  <th scope="col" className="px-3 py-2 font-semibold">환산</th>
                  <th scope="col" className="px-3 py-2 font-semibold">메모</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-light/30">
                <tr>
                  <td className="px-3 py-2">1인치</td>
                  <td className="px-3 py-2">2.54cm</td>
                  <td className="px-3 py-2 text-brand-mid">모든 환산의 기준값</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">1피트</td>
                  <td className="px-3 py-2">30.48cm</td>
                  <td className="px-3 py-2 text-brand-mid">12인치</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">1야드</td>
                  <td className="px-3 py-2">91.44cm</td>
                  <td className="px-3 py-2 text-brand-mid">3피트</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">27인치 모니터</td>
                  <td className="px-3 py-2">대각선 약 68.6cm</td>
                  <td className="px-3 py-2 text-brand-mid">16:9 가로는 약 59.8cm</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">청바지 32인치</td>
                  <td className="px-3 py-2">허리 약 81.3cm</td>
                  <td className="px-3 py-2 text-brand-mid">34인치는 약 86.4cm</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">18인치 휠</td>
                  <td className="px-3 py-2">지름 45.72cm</td>
                  <td className="px-3 py-2 text-brand-mid">타이어·자동차</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">5피트 5인치</td>
                  <td className="px-3 py-2">약 165.1cm</td>
                  <td className="px-3 py-2 text-brand-mid">키 표기(피트+인치)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </>
    </ToolLayout>
  );
}
