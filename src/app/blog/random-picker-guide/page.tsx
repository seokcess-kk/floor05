import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import BlogExtras from "@/components/common/BlogExtras";
import { buildBlogMetadata } from "@/lib/common/blog";

export const metadata: Metadata = {
  ...buildBlogMetadata("random-picker-guide"),
  title: "사다리타기·룰렛으로 공정하게 정하기 - 결과는 정말 공평할까",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "사다리타기 결과는 공정한가요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "가로줄이 암호학적 난수로 배치되고, 출발점이 다르면 도착점도 반드시 달라 결과가 겹치지 않습니다. 정해진 답 없이 공정하게 결정됩니다.",
      },
    },
    {
      "@type": "Question",
      name: "룰렛에서 특정 항목이 더 잘 나오게 할 수 있나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "각 항목의 가중치를 키우면 그 항목이 더 자주 나옵니다. 가중치 2는 1보다 두 배 확률입니다. 기본은 모두 1로 공평합니다.",
      },
    },
  ],
};

export default function RandomPickerGuidePage() {
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
            <span className="text-brand-mid">사다리타기·룰렛으로 공정하게 정하기</span>
          </nav>

          <header className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-brand-black mb-4 leading-tight">
              사다리타기·룰렛으로 공정하게 정하기
            </h1>
            <p className="text-lg text-brand-mid">결과는 정말 공평할까</p>
            <div className="mt-4 flex items-center gap-4 text-sm text-brand-light">
              <time dateTime="2026-06-29">2026-06-29</time>
              <span>·</span>
              <span>4분 읽기</span>
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            <p className="text-brand-mid text-lg leading-relaxed mb-8">
              점심 메뉴가 안 정해질 때, 내기에서 질 사람을 뽑을 때, 당첨자를 고를 때 가장 깔끔한 건
              제비뽑기입니다. 사다리타기와 룰렛은 그걸 화면에서 바로 해주는 도구죠. 그런데 정말
              공정한지 궁금했던 적 있다면, 원리까지 짚어봤습니다.
            </p>

            <div className="bg-brand-paper rounded-lg p-6 mb-10 border border-brand-light/20">
              <p className="font-medium text-brand-black mb-3">💡 바로 해보고 싶다면?</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/tools/random/ladder"
                  className="inline-block bg-brand-accent text-brand-white px-4 py-2 rounded-md text-sm font-medium hover:bg-brand-accent-light transition-colors"
                >
                  사다리타기 →
                </Link>
                <Link
                  href="/tools/random/roulette"
                  className="inline-block bg-brand-dark text-brand-paper px-4 py-2 rounded-md text-sm font-medium hover:bg-brand-mid transition-colors"
                >
                  룰렛 돌리기 →
                </Link>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">사다리타기의 원리</h2>
            <p className="text-brand-mid leading-relaxed mb-4">
              사다리타기는 세로줄을 따라 내려가다 가로줄을 만나면 옆 칸으로 이동하는 게임입니다.
              핵심은 <strong>출발점이 다르면 도착점도 반드시 다르다</strong>는 점입니다. 두 사람이
              같은 결과에 도착하는 일이 없어, 결과가 정확히 1:1로 배분됩니다.
            </p>
            <p className="text-brand-mid leading-relaxed mb-4">
              floor05의{" "}
              <Link href="/tools/random/ladder" className="text-brand-accent hover:underline">
                사다리타기
              </Link>
              는 가로줄을 브라우저의 암호학적 난수로 배치합니다. 미리 정해진 결과가 없고, 누를 때마다
              새 사다리가 만들어집니다. 참가자 경로를 따라가는 애니메이션으로 결과를 확인할 수
              있습니다.
            </p>

            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">룰렛과 가중치</h2>
            <p className="text-brand-mid leading-relaxed mb-4">
              룰렛은 항목을 부채꼴로 나눠 돌리는 방식입니다. 기본은 모든 항목이 같은 크기라 확률이
              똑같지만,{" "}
              <Link href="/tools/random/roulette" className="text-brand-accent hover:underline">
                룰렛 돌리기
              </Link>
              에서는 항목마다 가중치를 줄 수 있습니다. 가중치가 클수록 부채꼴이 넓어져 더 자주
              나옵니다. &lsquo;가위바위보에서 진 사람이 두 배 확률&rsquo; 같은 규칙도 만들 수
              있습니다.
            </p>
            <p className="text-brand-mid leading-relaxed mb-4">
              돌림판이 빙글빙글 도는 건 결과를 극적으로 보여주기 위한 연출입니다. 실제 당첨은 회전이
              멈추기 전에 난수로 이미 정해져 있고, 화면은 그 결과에 맞춰 멈춥니다.
            </p>

            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">
              &lsquo;진짜 무작위&rsquo;란
            </h2>
            <p className="text-brand-mid leading-relaxed mb-4">
              두 도구 모두 단순한 의사난수가 아니라 브라우저가 제공하는 암호학적 난수(crypto)를
              씁니다. 그래서 패턴을 예측하거나 결과를 미리 알 수 없습니다. 또 모든 계산이 여러분의
              브라우저 안에서만 이루어져, 입력한 이름이나 항목이 서버로 전송되지 않습니다.
            </p>

            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-6">자주 묻는 질문</h2>
            <div className="space-y-6">
              <div className="border-b border-brand-light/20 pb-6">
                <h3 className="text-lg font-semibold text-brand-black mb-2">
                  Q. 사다리타기 결과는 공정한가요?
                </h3>
                <p className="text-brand-mid">
                  네. 가로줄이 난수로 배치되고, 출발점이 다르면 도착점도 반드시 달라 결과가 겹치지
                  않습니다.
                </p>
              </div>
              <div className="border-b border-brand-light/20 pb-6">
                <h3 className="text-lg font-semibold text-brand-black mb-2">
                  Q. 룰렛에서 특정 항목을 더 잘 나오게 할 수 있나요?
                </h3>
                <p className="text-brand-mid">
                  가중치를 키우면 됩니다. 가중치 2는 1보다 두 배 확률입니다.
                </p>
              </div>
              <div className="pb-6">
                <h3 className="text-lg font-semibold text-brand-black mb-2">
                  Q. 입력한 이름이 저장되나요?
                </h3>
                <p className="text-brand-mid">
                  아니요. 모든 처리는 브라우저 안에서 이루어지며 서버로 전송되지 않습니다.
                </p>
              </div>
            </div>

            <div className="bg-brand-black rounded-lg p-8 mt-12 text-center">
              <h3 className="text-xl font-bold text-brand-paper mb-3">지금 바로 공정하게</h3>
              <p className="text-brand-light mb-6">
                사다리타기로, 룰렛으로. 회원가입 없이 무료입니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/tools/random/ladder"
                  className="inline-block bg-brand-accent text-brand-white px-6 py-3 rounded-md font-medium hover:bg-brand-accent-light transition-colors"
                >
                  사다리타기
                </Link>
                <Link
                  href="/tools/random/roulette"
                  className="inline-block bg-brand-dark text-brand-paper px-6 py-3 rounded-md font-medium hover:bg-brand-mid transition-colors"
                >
                  룰렛 돌리기
                </Link>
              </div>
            </div>

            <BlogExtras slug="random-picker-guide" />
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
