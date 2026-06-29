import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import BlogExtras from "@/components/common/BlogExtras";
import { buildBlogMetadata } from "@/lib/common/blog";

export const metadata: Metadata = {
  ...buildBlogMetadata("pyeong-conversion-guide"),
  title: "평수 계산법과 전용·분양면적 차이 - 84㎡는 몇 평?",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "84㎡는 몇 평인가요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "전용 84㎡는 약 25.4평입니다. ㎡를 3.3058로 나누면 평이 됩니다. 다만 분양(공급)면적으로는 보통 33~34평형으로 광고됩니다.",
      },
    },
    {
      "@type": "Question",
      name: "1평은 몇 ㎡인가요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "약 3.3058㎡입니다(정확히 400/121). 반대로 1㎡는 약 0.3025평입니다.",
      },
    },
    {
      "@type": "Question",
      name: "전용면적과 분양면적은 뭐가 다른가요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "전용면적은 현관 안쪽 실제 사용 공간이고, 분양(공급)면적은 여기에 계단·복도 같은 주거 공용면적을 더한 것입니다.",
      },
    },
  ],
};

export default function PyeongConversionGuidePage() {
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
            <span className="text-brand-mid">평수 계산법과 전용·분양면적 차이</span>
          </nav>

          <header className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-brand-black mb-4 leading-tight">
              평수 계산법과 전용·분양면적 차이
            </h1>
            <p className="text-lg text-brand-mid">㎡로 적힌 면적, 평으로 감 잡기</p>
            <div className="mt-4 flex items-center gap-4 text-sm text-brand-light">
              <time dateTime="2026-06-29">2026-06-29</time>
              <span>·</span>
              <span>5분 읽기</span>
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            <p className="text-brand-mid text-lg leading-relaxed mb-8">
              부동산 서류와 광고는 면적을 ㎡(제곱미터)로 적지만, 우리는 여전히 &lsquo;몇 평&rsquo;으로
              집 크기를 가늠합니다. 변환 공식은 간단한데, 정작 헷갈리는 건 &lsquo;전용&rsquo;이냐
              &lsquo;분양&rsquo;이냐입니다. 둘을 함께 정리했습니다.
            </p>

            <div className="bg-brand-paper rounded-lg p-6 mb-10 border border-brand-light/20">
              <p className="font-medium text-brand-black mb-3">💡 바로 변환하고 싶다면?</p>
              <p className="text-brand-mid text-sm mb-4">
                평과 ㎡를 양방향으로 즉시 변환합니다. 어느 칸에 넣어도 나머지가 바로 바뀌고,
                입력값은 서버로 전송되지 않습니다.
              </p>
              <Link
                href="/tools/unit/pyeong"
                className="inline-block bg-brand-accent text-brand-white px-4 py-2 rounded-md text-sm font-medium hover:bg-brand-accent-light transition-colors"
              >
                평수 계산기 사용하기 →
              </Link>
            </div>

            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">평 ↔ ㎡ 변환 공식</h2>
            <div className="bg-brand-paper rounded-lg p-5 mb-6 text-center">
              <p className="font-mono text-brand-black">㎡ = 평 × 3.3058</p>
              <p className="font-mono text-brand-black mt-1">평 = ㎡ ÷ 3.3058</p>
              <p className="text-sm text-brand-mid mt-2">1평 = 3.3058㎡ · 1㎡ = 0.3025평</p>
            </div>
            <p className="text-brand-mid leading-relaxed mb-4">
              1평은 사방 6자(약 1.818m)인 정사각형 넓이로, 정확히는 400 ÷ 121 ≈ 3.3058㎡입니다.
            </p>

            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">자주 쓰는 평수</h2>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-brand-light/40 text-left">
                    <th className="py-2 pr-4 text-brand-black">전용면적(㎡)</th>
                    <th className="py-2 pr-4 text-brand-black">평</th>
                    <th className="py-2 text-brand-black">흔히 부르는 이름</th>
                  </tr>
                </thead>
                <tbody className="text-brand-mid font-mono">
                  <tr className="border-b border-brand-light/20">
                    <td className="py-2 pr-4">59㎡</td>
                    <td className="py-2 pr-4">약 17.8평</td>
                    <td className="py-2">59타입 (24~25평형)</td>
                  </tr>
                  <tr className="border-b border-brand-light/20">
                    <td className="py-2 pr-4">84㎡</td>
                    <td className="py-2 pr-4">약 25.4평</td>
                    <td className="py-2">국민평형 (33~34평형)</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">114㎡</td>
                    <td className="py-2 pr-4">약 34.5평</td>
                    <td className="py-2">대형 (45평형)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">
              전용·공급(분양)·공용면적
            </h2>
            <p className="text-brand-mid leading-relaxed mb-4">
              같은 집인데 &lsquo;25평&rsquo;과 &lsquo;34평&rsquo;이 같이 쓰이는 이유는 면적 기준이
              여러 개라서입니다.
            </p>
            <ul className="list-disc list-inside text-brand-mid space-y-2 mb-6">
              <li>
                <strong>전용면적</strong> — 현관문 안쪽, 우리 가족만 쓰는 실제 공간. 청약·세금
                기준이 보통 이것.
              </li>
              <li>
                <strong>주거 공용면적</strong> — 계단, 복도, 엘리베이터 등 같은 동 주민이 함께 쓰는
                공간.
              </li>
              <li>
                <strong>공급(분양)면적</strong> — 전용 + 주거 공용. 분양 광고의 &lsquo;평형&rsquo;이
                보통 이 기준.
              </li>
            </ul>
            <p className="text-brand-mid leading-relaxed mb-4">
              그래서 전용 84㎡(25.4평)가 분양면적으로는 33~34평형이 됩니다. 면적을 비교할 때는 항상
              &lsquo;전용&rsquo;인지 &lsquo;공급&rsquo;인지 먼저 확인하세요.
            </p>

            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-6">자주 묻는 질문</h2>
            <div className="space-y-6">
              <div className="border-b border-brand-light/20 pb-6">
                <h3 className="text-lg font-semibold text-brand-black mb-2">
                  Q. 84㎡는 몇 평인가요?
                </h3>
                <p className="text-brand-mid">
                  전용 84㎡는 약 25.4평입니다. 분양면적으로는 보통 33~34평형으로 광고됩니다.
                </p>
              </div>
              <div className="border-b border-brand-light/20 pb-6">
                <h3 className="text-lg font-semibold text-brand-black mb-2">
                  Q. 1평은 몇 ㎡인가요?
                </h3>
                <p className="text-brand-mid">약 3.3058㎡입니다. 반대로 1㎡는 약 0.3025평입니다.</p>
              </div>
              <div className="pb-6">
                <h3 className="text-lg font-semibold text-brand-black mb-2">
                  Q. 전용면적과 분양면적은 뭐가 다른가요?
                </h3>
                <p className="text-brand-mid">
                  전용면적은 실제 사용 공간, 분양면적은 전용에 계단·복도 같은 공용면적을 더한
                  것입니다.
                </p>
              </div>
            </div>

            <div className="bg-brand-black rounded-lg p-8 mt-12 text-center">
              <h3 className="text-xl font-bold text-brand-paper mb-3">평 ↔ ㎡ 바로 변환</h3>
              <p className="text-brand-light mb-6">
                어느 칸에 넣어도 나머지가 바로. 회원가입 없이 무료입니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/tools/unit/pyeong"
                  className="inline-block bg-brand-accent text-brand-white px-6 py-3 rounded-md font-medium hover:bg-brand-accent-light transition-colors"
                >
                  평수 계산기
                </Link>
                <Link
                  href="/tools/unit/length"
                  className="inline-block bg-brand-dark text-brand-paper px-6 py-3 rounded-md font-medium hover:bg-brand-mid transition-colors"
                >
                  길이 변환 (cm·인치)
                </Link>
              </div>
            </div>

            <BlogExtras slug="pyeong-conversion-guide" />
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
