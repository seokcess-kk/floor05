import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import BlogExtras from "@/components/common/BlogExtras";
import { buildBlogMetadata } from "@/lib/common/blog";

export const metadata: Metadata = {
  ...buildBlogMetadata("weekly-holiday-pay-guide"),
  title: "주휴수당 계산법과 조건 - 주 15시간이면 받는다",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "주휴수당을 받으려면 몇 시간 일해야 하나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "1주 소정근로시간이 15시간 이상이고 그 주에 정해진 근로일을 개근해야 합니다. 주 15시간 미만이면 주휴수당이 발생하지 않습니다.",
      },
    },
    {
      "@type": "Question",
      name: "주휴수당은 어떻게 계산하나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "(1주 소정근로시간 ÷ 40) × 8 × 시급입니다. 주 40시간이면 8시간분(하루치 임금), 주 15시간이면 3시간분이 주휴수당입니다.",
      },
    },
    {
      "@type": "Question",
      name: "2026년 최저시급으로 주 40시간이면 월급이 얼마인가요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "2026년 최저시급 10,320원으로 주 40시간 일하면 주휴수당 포함 월 약 216만원(209시간 기준 2,156,880원)입니다.",
      },
    },
  ],
};

export default function WeeklyHolidayPayGuidePage() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />

      <main className="flex-1">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <nav className="mb-8 text-sm text-brand-light">
            <Link href="/blog" className="hover:text-brand-mid">
              블로그
            </Link>
            <span className="mx-2">›</span>
            <span className="text-brand-mid">주휴수당 계산법과 조건</span>
          </nav>

          <header className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-brand-black mb-4 leading-tight">
              주휴수당 계산법과 조건
            </h1>
            <p className="text-lg text-brand-mid">주 15시간 이상이면 받을 수 있다</p>
            <div className="mt-4 flex items-center gap-4 text-sm text-brand-light">
              <time dateTime="2026-06-29">2026-06-29</time>
              <span>·</span>
              <span>5분 읽기</span>
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            <p className="text-brand-mid text-lg leading-relaxed mb-8">
              주휴수당은 1주 동안 정해진 날을 개근한 근로자에게 하루치 임금을 유급으로 더 주는
              제도입니다. 정규직뿐 아니라 알바·시간제 근로자도 조건만 맞으면 받을 수 있는데, 몰라서
              놓치는 경우가 많습니다. 조건과 계산법을 정리했습니다.
            </p>

            <div className="bg-brand-paper rounded-lg p-6 mb-10 border border-brand-light/20">
              <p className="font-medium text-brand-black mb-3">💡 바로 계산하고 싶다면?</p>
              <p className="text-brand-mid text-sm mb-4">
                시급과 1주 근로시간만 넣으면 주휴수당과 월 환산 급여를 바로 보여줍니다. 2026년
                최저시급 기준이며, 입력값은 서버로 전송되지 않습니다.
              </p>
              <Link
                href="/tools/calc/wage"
                className="inline-block bg-brand-accent text-brand-white px-4 py-2 rounded-md text-sm font-medium hover:bg-brand-accent-light transition-colors"
              >
                주휴수당 계산기 사용하기 →
              </Link>
            </div>

            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">받을 수 있는 조건</h2>
            <p className="text-brand-mid leading-relaxed mb-4">
              두 가지를 모두 충족해야 그 주의 주휴수당이 발생합니다.
            </p>
            <ul className="list-disc list-inside text-brand-mid space-y-2 mb-6">
              <li>
                <strong>1주 소정근로시간 15시간 이상</strong> — 일하기로 정한 시간이 주 15시간 미만이면
                대상이 아닙니다.
              </li>
              <li>
                <strong>그 주 개근</strong> — 정해진 근로일에 모두 출근해야 합니다. 지각·조퇴는
                괜찮지만 결근하면 그 주는 발생하지 않습니다.
              </li>
            </ul>
            <p className="text-brand-mid leading-relaxed mb-4">
              고용 형태(정규직·알바·계약직)와 무관하게 조건만 맞으면 받습니다. 5인 미만 사업장도
              주휴수당은 적용됩니다.
            </p>

            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">계산 공식</h2>
            <div className="bg-brand-paper rounded-lg p-5 mb-6 text-center">
              <p className="font-mono text-brand-black">
                주휴수당 = (1주 소정근로시간 ÷ 40) × 8 × 시급
              </p>
              <p className="text-sm text-brand-mid mt-2">주휴시간은 최대 8시간</p>
            </div>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-brand-light/40 text-left">
                    <th className="py-2 pr-4 text-brand-black">1주 근로시간</th>
                    <th className="py-2 pr-4 text-brand-black">주휴시간</th>
                    <th className="py-2 text-brand-black">주휴수당(최저시급)</th>
                  </tr>
                </thead>
                <tbody className="text-brand-mid font-mono">
                  <tr className="border-b border-brand-light/20">
                    <td className="py-2 pr-4">15시간</td>
                    <td className="py-2 pr-4">3시간</td>
                    <td className="py-2">30,960원</td>
                  </tr>
                  <tr className="border-b border-brand-light/20">
                    <td className="py-2 pr-4">20시간</td>
                    <td className="py-2 pr-4">4시간</td>
                    <td className="py-2">41,280원</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">40시간</td>
                    <td className="py-2 pr-4">8시간</td>
                    <td className="py-2">82,560원</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-brand-mid leading-relaxed mb-4">
              2026년 최저시급 10,320원 기준입니다. 주 40시간을 넘게 일해도 주휴시간은 8시간으로 같고,
              초과분은 연장근로수당으로 따로 계산됩니다.
            </p>

            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">
              최저시급 월급에 숨은 209시간
            </h2>
            <p className="text-brand-mid leading-relaxed mb-4">
              흔히 말하는 &lsquo;최저임금 월 216만원&rsquo;의 209시간은, 주 40시간 근로에 주휴 8시간을
              더해 한 달로 환산한 시간입니다. 즉 월급에는 주휴수당이 이미 포함돼 있습니다. 시급제
              알바라면 주휴수당이 빠지지 않았는지 급여명세서를 확인해 보세요.
            </p>

            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-6">자주 묻는 질문</h2>
            <div className="space-y-6">
              <div className="border-b border-brand-light/20 pb-6">
                <h3 className="text-lg font-semibold text-brand-black mb-2">
                  Q. 주 몇 시간부터 주휴수당을 받나요?
                </h3>
                <p className="text-brand-mid">
                  1주 소정근로시간 15시간 이상이고 개근하면 받습니다. 15시간 미만은 대상이 아닙니다.
                </p>
              </div>
              <div className="border-b border-brand-light/20 pb-6">
                <h3 className="text-lg font-semibold text-brand-black mb-2">
                  Q. 주휴수당 계산 공식은?
                </h3>
                <p className="text-brand-mid">
                  (1주 소정근로시간 ÷ 40) × 8 × 시급입니다. 주 40시간이면 하루치 임금이 됩니다.
                </p>
              </div>
              <div className="pb-6">
                <h3 className="text-lg font-semibold text-brand-black mb-2">
                  Q. 5인 미만 사업장도 받나요?
                </h3>
                <p className="text-brand-mid">
                  네. 주휴수당은 5인 미만 사업장에도 적용됩니다.
                </p>
              </div>
            </div>

            <div className="bg-brand-black rounded-lg p-8 mt-12 text-center">
              <h3 className="text-xl font-bold text-brand-paper mb-3">내 주휴수당 바로 계산</h3>
              <p className="text-brand-light mb-6">
                시급과 근로시간만 넣으면 주휴수당과 월급을 바로. 회원가입 없이 무료입니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/tools/calc/wage"
                  className="inline-block bg-brand-accent text-brand-white px-6 py-3 rounded-md font-medium hover:bg-brand-accent-light transition-colors"
                >
                  주휴수당 계산기
                </Link>
                <Link
                  href="/blog/salary-net-pay-guide"
                  className="inline-block bg-brand-dark text-brand-paper px-6 py-3 rounded-md font-medium hover:bg-brand-mid transition-colors"
                >
                  연봉 실수령액 계산법
                </Link>
              </div>
            </div>

            <BlogExtras slug="weekly-holiday-pay-guide" />
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
