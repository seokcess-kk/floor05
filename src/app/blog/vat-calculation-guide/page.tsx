import Link from "next/link";
import BlogExtras from "@/components/common/BlogExtras";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import { buildBlogMetadata } from "@/lib/common/blog";

export const metadata = {
  ...buildBlogMetadata("vat-calculation-guide"),
  title: "부가세 계산법: 공급가액·합계금액 관계",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "공급가액과 합계금액 중 무엇을 먼저 확인해야 하나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "견적서나 영수증에 적힌 금액이 부가세 포함인지 먼저 확인해야 합니다. 포함 금액이면 합계금액에서 1.1로 나누어 공급가액을 구하고, 별도 금액이면 공급가액에 10%를 더해 합계를 구합니다.",
      },
    },
    {
      "@type": "Question",
      name: "합계금액에서 부가세만 바로 구할 수 있나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "일반과세 기준에서는 합계금액에 10/110을 곱하면 포함된 부가세를 구할 수 있습니다. 예를 들어 합계 550,000원에는 부가세 50,000원이 들어 있습니다.",
      },
    },
    {
      "@type": "Question",
      name: "사업자가 실제로 내는 부가세는 매출 부가세 전액인가요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "보통은 매출세액에서 매입세액을 뺀 금액이 납부세액의 출발점입니다. 다만 신고 대상, 공제 가능 여부, 과세 유형에 따라 실제 결과는 달라질 수 있습니다.",
      },
    },
    {
      "@type": "Question",
      name: "간이과세도 같은 공식으로 계산하면 되나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "간이과세는 업종별 부가가치율을 곱해 세부담을 계산하므로 일반과세의 단순 10% 구조와 다릅니다. 정확한 신고 판단은 적용되는 과세 유형을 먼저 확인해야 합니다.",
      },
    },
  ],
};

export default function VatCalculationGuidePage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        <nav className="mb-8 text-sm text-gray-500" aria-label="breadcrumb">
          <Link href="/" className="hover:text-gray-900">홈</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-gray-900">블로그</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">부가세 계산법</span>
        </nav>
        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">부가세 계산법: 공급가액·합계금액 관계</h1>
          <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-500">
            <time dateTime="2026-07-22">2026년 7월 22일</time>
            <span>읽는 시간 6분</span>
          </div>
        </header>
        <div className="prose prose-gray max-w-none">
          <p className="text-brand-mid leading-relaxed mb-4">부가세 계산은 금액이 부가세 별도인지 포함인지부터 나누면 단순해집니다. 일반과세 기준 부가가치세율은 10%이므로 공급가액에 1.1을 곱하면 합계금액이 되고, 이미 부가세가 포함된 합계금액은 1.1로 나누면 공급가액이 됩니다.</p>
          <div className="not-prose my-8 rounded-lg border border-gray-200 bg-gray-50 p-5">
            <p className="text-sm font-medium text-gray-950">금액만 빠르게 맞춰 보고 싶다면</p>
            <p className="mt-2 text-sm leading-6 text-gray-600">공급가액 기준 계산과 합계금액 역산을 한 화면에서 비교할 수 있습니다. 청구서 작성 전 숫자가 맞는지 확인할 때 유용합니다.</p>
            <Link href="/tools/calc/vat" className="mt-4 inline-flex rounded-md bg-gray-950 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800">부가세 계산기로 확인하기</Link>
          </div>
          <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">부가세는 어떤 금액에 붙나요?</h2>
          <p className="text-brand-mid leading-relaxed mb-4">부가세는 재화나 용역의 공급가액을 기준으로 계산합니다. 일반과세 기준에서는 공급가액의 10%가 부가세이고, 소비자가 최종적으로 보는 합계금액은 공급가액과 부가세를 더한 값입니다. 그래서 견적서에 1,000,000원이라고 적혀 있어도 그 금액이 공급가액인지, 부가세까지 들어간 총액인지에 따라 결과가 달라집니다.</p>
          <p className="text-brand-mid leading-relaxed mb-4">실무에서는 “부가세 별도”라는 표현이 있으면 공급가액을 먼저 적고 나중에 10%를 더합니다. 반대로 카드 영수증이나 온라인 결제 화면처럼 이미 납부할 총액이 보이는 경우에는 그 안에 들어 있는 공급가액과 부가세를 나누어 보는 방식이 필요합니다.</p>
          <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">공급가액에서 합계금액은 어떻게 계산하나요?</h2>
          <p className="text-brand-mid leading-relaxed mb-4">공급가액에서 출발할 때는 공급가액에 1.1을 곱하면 합계금액입니다. 부가세는 공급가액의 10%이므로 공급가액 1,000,000원에는 부가세 100,000원이 붙고, 최종 합계는 1,100,000원이 됩니다.</p>
          <div className="overflow-x-auto"><table className="w-full text-sm border-collapse"><thead><tr className="border-b border-brand-light/40 text-left"><th className="py-2 pr-4 text-brand-black">공급가액</th><th className="py-2 pr-4 text-brand-black">부가세</th><th className="py-2 pr-4 text-brand-black">합계금액</th><th className="py-2 pr-4 text-brand-black">계산식</th></tr></thead><tbody className="text-brand-mid"><tr className="border-b border-brand-light/20"><td className="py-2 pr-4">100,000원</td><td className="py-2 pr-4">10,000원</td><td className="py-2 pr-4">110,000원</td><td className="py-2 pr-4">100,000원 × 1.1</td></tr><tr className="border-b border-brand-light/20"><td className="py-2 pr-4">500,000원</td><td className="py-2 pr-4">50,000원</td><td className="py-2 pr-4">550,000원</td><td className="py-2 pr-4">500,000원 × 1.1</td></tr><tr className="border-b border-brand-light/20"><td className="py-2 pr-4">1,000,000원</td><td className="py-2 pr-4">100,000원</td><td className="py-2 pr-4">1,100,000원</td><td className="py-2 pr-4">1,000,000원 × 1.1</td></tr></tbody></table></div>
          <figure className="not-prose my-8">
            <svg viewBox="0 0 480 190" role="img" width="100%" className="block max-w-xl mx-auto" style={{ height: "auto" }}>
              <title>합계금액을 공급가액과 부가세로 나눈 구성</title>
              <desc>합계금액 110,000원이 공급가액 100,000원과 부가세 10,000원(10퍼센트)으로 이루어져 있음을 한 막대의 두 구간으로 보여주는 그림.</desc>
              <line x1="40" y1="58" x2="440" y2="58" stroke="#0A0A0A" strokeWidth="1" />
              <line x1="40" y1="58" x2="40" y2="66" stroke="#0A0A0A" strokeWidth="1" />
              <line x1="440" y1="58" x2="440" y2="66" stroke="#0A0A0A" strokeWidth="1" />
              <text x="240" y="48" textAnchor="middle" fontSize="13" fill="#0A0A0A">합계금액 110,000원</text>
              <rect x="40" y="70" width="364" height="50" fill="#F2F0ED" />
              <rect x="404" y="70" width="36" height="50" fill="#C45C2C" />
              <rect x="40" y="70" width="400" height="50" rx="4" fill="none" stroke="#0A0A0A" strokeWidth="1.5" />
              <line x1="404" y1="70" x2="404" y2="120" stroke="#0A0A0A" strokeWidth="1.5" />
              <text x="222" y="92" textAnchor="middle" fontSize="13" fill="#0A0A0A">공급가액</text>
              <text x="222" y="108" textAnchor="middle" fontSize="12" fill="#4A4A4A">100,000원</text>
              <line x1="422" y1="120" x2="422" y2="140" stroke="#C45C2C" strokeWidth="1" />
              <text x="422" y="156" textAnchor="middle" fontSize="12" fill="#C45C2C">부가세 10,000원 (10%)</text>
            </svg>
            <figcaption className="mt-3 text-sm text-brand-mid text-center">합계금액 110,000원은 공급가액 100,000원과 부가세 10,000원(10%)이 합쳐진 금액이다.</figcaption>
          </figure>
          <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">합계금액에서 공급가액을 역산하려면 어떻게 하나요?</h2>
          <p className="text-brand-mid leading-relaxed mb-4">합계금액에서 역산할 때는 합계를 1.1로 나누면 공급가액입니다. 포함된 부가세만 바로 보고 싶다면 합계금액에 10/110을 곱하면 됩니다. 합계 550,000원은 공급가액 500,000원과 부가세 50,000원으로 나뉩니다.</p>
          <div className="overflow-x-auto"><table className="w-full text-sm border-collapse"><thead><tr className="border-b border-brand-light/40 text-left"><th className="py-2 pr-4 text-brand-black">합계금액</th><th className="py-2 pr-4 text-brand-black">공급가액</th><th className="py-2 pr-4 text-brand-black">부가세</th><th className="py-2 pr-4 text-brand-black">역산식</th></tr></thead><tbody className="text-brand-mid"><tr className="border-b border-brand-light/20"><td className="py-2 pr-4">110,000원</td><td className="py-2 pr-4">100,000원</td><td className="py-2 pr-4">10,000원</td><td className="py-2 pr-4">110,000원 ÷ 1.1</td></tr><tr className="border-b border-brand-light/20"><td className="py-2 pr-4">550,000원</td><td className="py-2 pr-4">500,000원</td><td className="py-2 pr-4">50,000원</td><td className="py-2 pr-4">550,000원 × 10/110</td></tr><tr className="border-b border-brand-light/20"><td className="py-2 pr-4">1,100,000원</td><td className="py-2 pr-4">1,000,000원</td><td className="py-2 pr-4">100,000원</td><td className="py-2 pr-4">1,100,000원 ÷ 1.1</td></tr></tbody></table></div>
          <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">부가세 별도와 포함은 왜 자주 헷갈리나요?</h2>
          <p className="text-brand-mid leading-relaxed mb-4">같은 숫자라도 기준 금액이 다르면 실제 청구액이 달라지기 때문입니다. “100만원”이라는 말이 공급가액을 뜻하면 최종 청구액은 110만원이고, 합계금액을 뜻하면 공급가액은 약 90만9천원이 됩니다. 계약서, 견적서, 세금계산서에서는 이 차이가 금액 오해로 이어질 수 있습니다.</p>
          <p className="text-brand-mid leading-relaxed mb-4">가장 안전한 확인 순서는 세 가지입니다. 첫째, 상대방이 말한 금액이 별도인지 포함인지 묻습니다. 둘째, 공급가액과 부가세를 줄로 나누어 적습니다. 셋째, 합계금액이 실제 결제 금액과 같은지 확인합니다. 이 순서만 지켜도 대부분의 단순 계산 오류는 줄어듭니다.</p>
          <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">사업자가 내는 부가세는 어떻게 이해하면 되나요?</h2>
          <p className="text-brand-mid leading-relaxed mb-4">사업자 입장에서는 매출세액에서 매입세액을 뺀 금액이 납부세액의 기본 구조입니다. 매출할 때 받은 부가세 전액을 그대로 비용처럼 보는 것이 아니라, 사업을 위해 매입하면서 부담한 부가세를 함께 고려합니다. 다만 매입세액 공제 가능 여부와 신고 방식은 상황에 따라 달라질 수 있습니다.</p>
          <p className="text-brand-mid leading-relaxed mb-4">간이과세자는 계산 구조가 일반과세자와 다릅니다. 업종별 부가가치율을 곱해 세부담을 산정하므로 일반과세의 공급가액 10% 방식만으로 최종 부담을 단정하기 어렵습니다. 이 글의 공식은 일반과세 기준의 공급가액, 부가세, 합계금액 관계를 이해하기 위한 기본식으로 보면 됩니다.</p>
          <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">견적서에 적을 때는 무엇을 확인해야 하나요?</h2>
          <p className="text-brand-mid leading-relaxed mb-4">견적서에는 공급가액, 부가세, 합계금액을 분리해 적는 편이 분쟁을 줄입니다. 한 줄에 총액만 적으면 상대방은 부가세 포함 금액으로 이해할 수 있고, 작성자는 별도 금액으로 생각할 수 있습니다. 특히 반복 거래나 용역 계약에서는 처음 합의한 기준 금액이 이후 청구서와 세금계산서까지 이어지므로 표현을 명확히 남기는 것이 좋습니다.</p>
          <p className="text-brand-mid leading-relaxed mb-4">계산 후에는 합계금액이 실제 입금 또는 결제 요청 금액과 일치하는지도 확인해야 합니다. 공급가액을 반올림했거나 원 단위 절사 처리를 했다면 부가세와 합계가 1원 단위로 달라질 수 있습니다. 이런 차이는 계산 원칙을 맞춘 뒤 거래처와 표시 방식을 정하면 됩니다.</p>
          <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">FAQ</h2>
          <section className="mb-6 border-b border-brand-light/20 pb-6"><h3 className="text-lg font-semibold text-brand-black mb-2">공급가액과 합계금액 중 무엇을 먼저 확인해야 하나요?</h3><p className="text-brand-mid">부가세 포함 여부를 먼저 확인해야 합니다. 포함 금액이면 합계를 1.1로 나누고, 별도 금액이면 공급가액에 10%를 더하면 됩니다.</p></section>
          <section className="mb-6 border-b border-brand-light/20 pb-6"><h3 className="text-lg font-semibold text-brand-black mb-2">합계금액에서 부가세만 바로 구할 수 있나요?</h3><p className="text-brand-mid">일반과세 기준에서는 합계금액에 10/110을 곱하면 됩니다. 합계 550,000원이라면 부가세는 50,000원입니다.</p></section>
          <section className="mb-6 border-b border-brand-light/20 pb-6"><h3 className="text-lg font-semibold text-brand-black mb-2">매출 부가세 전부가 납부세액인가요?</h3><p className="text-brand-mid">보통은 매출세액에서 매입세액을 뺀 값이 납부세액의 출발점입니다. 실제 신고 결과는 공제 가능 여부와 과세 유형에 따라 달라질 수 있습니다.</p></section>
          <section className="mb-6 border-b border-brand-light/20 pb-6"><h3 className="text-lg font-semibold text-brand-black mb-2">간이과세도 같은 방식인가요?</h3><p className="text-brand-mid">간이과세는 업종별 부가가치율을 반영하므로 일반과세와 세부담 구조가 다릅니다. 단순 합계 역산에는 일반과세 공식을 쓰되 신고 판단은 별도로 확인해야 합니다.</p></section>
        </div>
        <div className="mt-12 rounded-xl bg-gray-950 p-6 text-white">
          <h2 className="text-xl font-semibold">공급가와 총액을 바로 대조해 보세요</h2>
          <p className="mt-3 text-sm leading-6 text-gray-300">별도 금액과 포함 금액을 오가며 계산할 때는 숫자를 직접 나누어 보는 편이 빠릅니다. 부가세 계산기에서 공급가액, 부가세, 합계를 한 번에 확인할 수 있습니다.</p>
          <Link href="/tools/calc/vat" className="mt-5 inline-flex rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-950 hover:bg-gray-100">부가세 계산기 열기</Link>
        </div>
        <BlogExtras slug="vat-calculation-guide" />
      </main>
      <Footer />
    </>
  );
}
