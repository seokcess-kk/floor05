import Link from "next/link";
import BlogExtras from "@/components/common/BlogExtras";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import { buildBlogMetadata } from "@/lib/common/blog";

export const metadata = {
  ...buildBlogMetadata("savings-interest-guide"),
  title: "예금·적금 이자 계산법: 단리와 복리 차이",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "예금과 적금은 같은 금리여도 이자가 같나요?", acceptedAnswer: { "@type": "Answer", text: "같지 않습니다. 예금은 목돈 전체가 처음부터 이자를 받지만, 적금은 매달 들어간 돈이 남은 기간만큼만 이자를 받으므로 같은 연이율이라도 세전이자가 다르게 보입니다." } },
    { "@type": "Question", name: "단리와 월복리는 무엇이 다른가요?", acceptedAnswer: { "@type": "Answer", text: "단리는 원금 기준으로 이자를 계산하고, 월복리는 매월 붙은 이자가 다음 달 계산 원금에 더해지는 방식입니다. 기간과 금리가 길고 높을수록 차이가 커질 수 있습니다." } },
    { "@type": "Question", name: "이자소득세 15.4%는 언제 빠지나요?", acceptedAnswer: { "@type": "Answer", text: "일반적인 과세 상품에서는 이자가 지급될 때 소득세 14%와 지방소득세 1.4%를 합한 15.4%가 원천징수됩니다." } },
    { "@type": "Question", name: "비과세나 세금우대 상품도 같은 세후 이자를 쓰나요?", acceptedAnswer: { "@type": "Answer", text: "상품 조건과 가입 자격에 따라 세금 적용이 달라질 수 있습니다. 세후 금액을 비교할 때는 해당 상품의 과세 조건을 따로 확인해야 합니다." } },
  ],
};

export default function SavingsInterestGuidePage() {
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
          <span className="text-gray-900">예금·적금 이자 계산법</span>
        </nav>
        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">예금·적금 이자 계산법: 단리와 복리 차이</h1>
          <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-500">
            <time dateTime="2026-07-22">2026년 7월 22일</time>
            <span>읽는 시간 6분</span>
          </div>
        </header>
        <div className="prose prose-gray max-w-none">
          <p className="text-brand-mid leading-relaxed mb-4">예금과 적금 이자는 같은 금리라도 납입 방식 때문에 다르게 계산됩니다. 예금은 처음 넣은 목돈 전체가 기간 내내 이자를 받지만, 적금은 매달 납입한 금액이 만기까지 남은 개월 수만큼만 이자를 받습니다.</p>
          <div className="not-prose my-8 rounded-lg border border-gray-200 bg-gray-50 p-5">
            <p className="text-sm font-medium text-gray-950">세전과 세후 금액을 함께 보고 싶다면</p>
            <p className="mt-2 text-sm leading-6 text-gray-600">월 납입액, 기간, 금리를 넣어 단리와 월복리 결과를 비교할 수 있습니다. 만기 전에 예상 수령액을 가늠할 때 계산 흐름을 줄여 줍니다.</p>
            <Link href="/tools/calc/savings" className="mt-4 inline-flex rounded-md bg-gray-950 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800">예적금 계산기로 비교하기</Link>
          </div>
          <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">예금과 적금은 왜 이자가 다르게 보이나요?</h2>
          <p className="text-brand-mid leading-relaxed mb-4">예금은 목돈이 한 번에 들어가고 적금은 원금이 나누어 들어가기 때문에 이자가 다르게 보입니다. 예를 들어 연 600만원을 굴린다고 해도 1월에 600만원을 예금으로 넣는 경우와 매달 50만원씩 12번 넣는 경우는 돈이 머문 시간이 다릅니다. 금리는 같아도 실제 이자가 붙는 원금의 기간이 다르므로 결과가 달라집니다.</p>
          <p className="text-brand-mid leading-relaxed mb-4">적금의 표면금리가 높아 보여도 만기 이자가 기대보다 작게 느껴지는 이유가 여기에 있습니다. 첫 달 납입금은 12개월 동안 이자를 받지만 마지막 달 납입금은 1개월치 이자만 받습니다. 그래서 적금 이자는 매달 납입한 돈을 각각 다른 기간으로 나누어 계산한 값을 더한 구조입니다.</p>
          <div className="overflow-x-auto"><table className="w-full text-sm border-collapse"><thead><tr className="border-b border-brand-light/40 text-left"><th className="py-2 pr-4 text-brand-black">구분</th><th className="py-2 pr-4 text-brand-black">납입 방식</th><th className="py-2 pr-4 text-brand-black">이자가 붙는 방식</th><th className="py-2 pr-4 text-brand-black">같은 연 4% 단리 예시</th></tr></thead><tbody className="text-brand-mid"><tr className="border-b border-brand-light/20"><td className="py-2 pr-4">예금</td><td className="py-2 pr-4">1,200만원을 한 번에 예치</td><td className="py-2 pr-4">원금 전체가 12개월 적용</td><td className="py-2 pr-4">세전이자 480,000원</td></tr><tr className="border-b border-brand-light/20"><td className="py-2 pr-4">적금</td><td className="py-2 pr-4">월 50만원씩 12개월 납입</td><td className="py-2 pr-4">회차별 남은 개월 수만 적용</td><td className="py-2 pr-4">세전이자 130,000원</td></tr></tbody></table></div>
          <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">단리 이자는 어떻게 계산하나요?</h2>
          <p className="text-brand-mid leading-relaxed mb-4">단리는 원금에 약정 금리와 기간을 곱해 계산합니다. 예금 단리 이자는 원금 × 연이율 × (개월/12)입니다. 1,200만원을 12개월 동안 연 4% 단리로 맡기면 세전이자는 480,000원이고, 이자소득세 15.4%인 73,920원을 뺀 세후이자는 406,080원입니다.</p>
          <p className="text-brand-mid leading-relaxed mb-4">적금 단리는 월납입액 × 월이율 × (개월 × (개월+1) ÷ 2)로 계산할 수 있습니다. 월 50만원을 12개월 동안 연 4%로 납입하면 원금은 6,000,000원, 세전이자는 130,000원, 세금은 20,020원, 세후이자는 109,980원입니다. 각 회차 돈이 예치된 기간을 모두 합산한 결과입니다.</p>
          <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">월복리는 단리보다 얼마나 달라지나요?</h2>
          <p className="text-brand-mid leading-relaxed mb-4">월복리는 매월 생긴 이자가 다음 달 계산에 다시 들어가므로 단리보다 세전이자가 조금 커질 수 있습니다. 예금 월복리 이자는 원금 × ((1+월이율)^개월 − 1)로 계산합니다. 1,200만원을 12개월 동안 연 4% 월복리로 맡기면 세전이자는 488,899원입니다.</p>
          <p className="text-brand-mid leading-relaxed mb-4">적금도 월복리 구조에서는 납입 회차별로 남은 기간 동안 복리 효과가 반영됩니다. 월 50만원씩 12개월, 연 4% 조건에서는 세전이자 131,602원, 세후이자 111,335원입니다. 같은 조건의 단리 세후이자 109,980원보다 많지만, 1년·4% 조건에서는 차이가 크지는 않습니다.</p>
          <div className="overflow-x-auto"><table className="w-full text-sm border-collapse"><thead><tr className="border-b border-brand-light/40 text-left"><th className="py-2 pr-4 text-brand-black">조건</th><th className="py-2 pr-4 text-brand-black">계산 방식</th><th className="py-2 pr-4 text-brand-black">세전이자</th><th className="py-2 pr-4 text-brand-black">세후이자</th></tr></thead><tbody className="text-brand-mid"><tr className="border-b border-brand-light/20"><td className="py-2 pr-4">월 50만원 × 12개월 연 4% 적금</td><td className="py-2 pr-4">단리</td><td className="py-2 pr-4">130,000원</td><td className="py-2 pr-4">109,980원</td></tr><tr className="border-b border-brand-light/20"><td className="py-2 pr-4">월 50만원 × 12개월 연 4% 적금</td><td className="py-2 pr-4">월복리</td><td className="py-2 pr-4">131,602원</td><td className="py-2 pr-4">111,335원</td></tr><tr className="border-b border-brand-light/20"><td className="py-2 pr-4">1,200만원 12개월 연 4% 예금</td><td className="py-2 pr-4">단리</td><td className="py-2 pr-4">480,000원</td><td className="py-2 pr-4">406,080원</td></tr><tr className="border-b border-brand-light/20"><td className="py-2 pr-4">1,200만원 12개월 연 4% 예금</td><td className="py-2 pr-4">월복리</td><td className="py-2 pr-4">488,899원</td><td className="py-2 pr-4">조건별 세금 적용</td></tr></tbody></table></div>
          <figure className="not-prose my-8">
            <svg viewBox="0 0 420 280" role="img" width="100%" className="block max-w-xl mx-auto" style={{ height: "auto" }}>
              <title>단리와 복리의 원리금 성장 비교</title>
              <desc>같은 원금에서 시작해도 기간이 길어질수록 복리 곡선이 단리 직선보다 위로 더 크게 벌어지는 모습을 보여주는 그래프.</desc>
              <line x1="50" y1="30" x2="50" y2="230" stroke="#0A0A0A" strokeWidth="1.5" />
              <line x1="50" y1="230" x2="400" y2="230" stroke="#0A0A0A" strokeWidth="1.5" />
              <text x="50" y="22" textAnchor="middle" fontSize="12" fill="#4A4A4A">원리금</text>
              <text x="400" y="250" textAnchor="end" fontSize="12" fill="#4A4A4A">기간</text>
              <circle cx="50" cy="200" r="3" fill="#0A0A0A" />
              <text x="44" y="204" textAnchor="end" fontSize="12" fill="#4A4A4A">원금</text>
              <line x1="50" y1="200" x2="400" y2="110" stroke="#0A0A0A" strokeWidth="2" />
              <path d="M50 200 C 180 185 300 150 400 55" fill="none" stroke="#C45C2C" strokeWidth="2" />
              <text x="395" y="48" textAnchor="end" fontSize="14" fill="#C45C2C">복리</text>
              <text x="395" y="103" textAnchor="end" fontSize="14" fill="#0A0A0A">단리</text>
            </svg>
            <figcaption className="mt-3 text-sm text-brand-mid text-center">같은 원금이라도 기간이 길어질수록 복리는 단리보다 원리금이 더 가파르게 늘어난다.</figcaption>
          </figure>
          <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">세후이자는 어디에서 줄어드나요?</h2>
          <p className="text-brand-mid leading-relaxed mb-4">일반적인 과세 상품에서는 이자 지급 시 이자소득세 15.4%가 원천징수됩니다. 이 비율은 소득세 14%와 지방소득세 1.4%를 더한 값입니다. 따라서 비교할 때는 세전이자가 아니라 실제로 받는 세후이자를 함께 보는 편이 좋습니다.</p>
          <p className="text-brand-mid leading-relaxed mb-4">비과세나 세금우대 상품은 조건에 따라 적용 방식이 달라질 수 있습니다. 가입 대상, 한도, 상품 유형에 따라 세금이 줄어들거나 다르게 계산될 수 있으므로, 같은 금리 상품이라도 최종 수령액 비교에서는 과세 조건을 따로 확인해야 합니다.</p>
          <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">상품을 비교할 때는 어떤 순서로 보면 되나요?</h2>
          <p className="text-brand-mid leading-relaxed mb-4">상품 비교는 납입 방식, 금리 유형, 세후 금액 순서로 보는 것이 좋습니다. 먼저 목돈을 한 번에 넣을 수 있는지, 매달 쌓아 가야 하는지를 정하면 예금과 적금 선택지가 나뉩니다. 그다음 단리인지 월복리인지 확인하고, 마지막으로 세금이 빠진 뒤 실제 수령액을 비교해야 숫자를 비슷한 기준에 놓을 수 있습니다.</p>
          <p className="text-brand-mid leading-relaxed mb-4">금리만 보고 결론을 내리면 조건 차이를 놓치기 쉽습니다. 우대금리 조건, 납입 가능 기간, 중도해지 시 적용 금리, 세금 적용 방식은 상품마다 달라질 수 있습니다. 계산식은 후보를 빠르게 좁히는 도구로 쓰고, 실제 가입 전에는 상품 설명서의 적용 조건을 함께 확인하는 편이 안정적입니다.</p>
          <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">FAQ</h2>
          <section className="mb-6 border-b border-brand-light/20 pb-6"><h3 className="text-lg font-semibold text-brand-black mb-2">예금과 적금은 같은 금리여도 이자가 같나요?</h3><p className="text-brand-mid">같지 않습니다. 예금은 목돈 전체가 처음부터 이자를 받고, 적금은 매달 납입한 돈이 남은 기간만큼만 이자를 받습니다.</p></section>
          <section className="mb-6 border-b border-brand-light/20 pb-6"><h3 className="text-lg font-semibold text-brand-black mb-2">단리와 월복리는 무엇이 다른가요?</h3><p className="text-brand-mid">단리는 원금 기준으로 계산하고, 월복리는 매월 붙은 이자가 다음 계산에 포함됩니다. 기간이 길수록 차이가 커질 수 있습니다.</p></section>
          <section className="mb-6 border-b border-brand-light/20 pb-6"><h3 className="text-lg font-semibold text-brand-black mb-2">이자소득세 15.4%는 언제 빠지나요?</h3><p className="text-brand-mid">일반 과세 상품에서는 이자가 지급될 때 원천징수됩니다. 소득세 14%와 지방소득세 1.4%를 합한 비율입니다.</p></section>
          <section className="mb-6 border-b border-brand-light/20 pb-6"><h3 className="text-lg font-semibold text-brand-black mb-2">비과세 상품은 세후이자가 다르게 나오나요?</h3><p className="text-brand-mid">상품 조건과 가입 자격에 따라 달라질 수 있습니다. 세후 비교를 할 때는 해당 상품의 과세 조건을 함께 확인해야 합니다.</p></section>
        </div>
        <div className="mt-12 rounded-xl bg-gray-950 p-6 text-white">
          <h2 className="text-xl font-semibold">만기 때 받을 금액을 직접 계산해 보세요</h2>
          <p className="mt-3 text-sm leading-6 text-gray-300">예금과 적금, 단리와 월복리는 조건이 조금만 달라도 결과가 달라집니다. 계산기에 기간과 금리를 넣고 세전·세후 금액을 나란히 확인해 보세요.</p>
          <Link href="/tools/calc/savings" className="mt-5 inline-flex rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-950 hover:bg-gray-100">예적금 계산기 열기</Link>
        </div>
        <BlogExtras slug="savings-interest-guide" />
      </main>
      <Footer />
    </>
  );
}
