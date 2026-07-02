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
    {
      "@type": "Question",
      name: "사다리타기와 룰렛 중 뭘 쓰는 게 좋나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "참가자 전원에게 역할이나 순서를 나눠야 하면 사다리타기, 여럿 중 하나만 뽑으면 룰렛이 편합니다. 확률을 다르게 주고 싶을 때도 룰렛의 가중치 기능을 쓰면 됩니다.",
      },
    },
    {
      "@type": "Question",
      name: "같은 사람이 연달아 걸렸는데 조작 아닌가요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "매번 독립적으로 새 난수를 뽑기 때문에 연속 당첨도 자연스러운 확률 안의 일입니다. 동전을 던져 앞면이 세 번 연속 나오는 것과 같습니다.",
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
              사다리타기 vs 룰렛, 뭘 쓸까
            </h2>
            <p className="text-brand-mid leading-relaxed mb-4">
              둘 다 무작위지만 결과의 모양이 다릅니다. 사다리타기는{" "}
              <strong>전원에게 결과를 하나씩 배분</strong>하고, 룰렛은{" "}
              <strong>여럿 중 하나를 뽑습니다</strong>. 상황에 맞춰 고르면
              됩니다.
            </p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-brand-light/40 text-left">
                    <th className="py-2 pr-4 text-brand-black">상황</th>
                    <th className="py-2 text-brand-black">추천</th>
                  </tr>
                </thead>
                <tbody className="text-brand-mid">
                  <tr className="border-b border-brand-light/20">
                    <td className="py-2 pr-4">전원에게 역할·순서를 나눠야 할 때</td>
                    <td className="py-2 font-medium text-brand-black">사다리타기</td>
                  </tr>
                  <tr className="border-b border-brand-light/20">
                    <td className="py-2 pr-4">벌칙 하나에 나머지는 통과일 때</td>
                    <td className="py-2 font-medium text-brand-black">사다리타기 (꽝 섞기)</td>
                  </tr>
                  <tr className="border-b border-brand-light/20">
                    <td className="py-2 pr-4">후보 중 하나만 뽑을 때 (메뉴·당첨자)</td>
                    <td className="py-2 font-medium text-brand-black">룰렛</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">확률을 다르게 주고 싶을 때</td>
                    <td className="py-2 font-medium text-brand-black">룰렛 (가중치)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">상황별 활용 팁</h2>
            <ul className="list-disc list-inside text-brand-mid space-y-2 mb-6">
              <li>
                <strong>점심·회식 메뉴</strong> — 후보를 4~6개로 추려서 룰렛에 올리세요. 후보가 열
                개를 넘으면 뭐가 나와도 아쉬운 법입니다.
              </li>
              <li>
                <strong>청소·당번 정하기</strong> — 사다리타기에 이름을 올리고 결과 칸에 요일이나
                구역을 적으면 한 번에 배분이 끝납니다.
              </li>
              <li>
                <strong>경품 추첨</strong> — 참가자 이름을 룰렛에 올리고 화면을 공유한 상태에서
                돌리세요. 뽑히는 과정을 모두가 지켜보면 뒷말이 나오지 않습니다.
              </li>
              <li>
                <strong>발표·게임 순서</strong> — 결과 칸에 1번부터 번호를 적은 사다리타기가
                깔끔합니다. 출발점이 다르면 도착점도 달라 순서가 겹칠 일이 없습니다.
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">
              &lsquo;진짜 무작위&rsquo;란
            </h2>
            <p className="text-brand-mid leading-relaxed mb-4">
              두 도구 모두 단순한 의사난수가 아니라 브라우저가 제공하는 암호학적 난수(crypto)를
              씁니다. 그래서 패턴을 예측하거나 결과를 미리 알 수 없습니다. 또 모든 계산이 여러분의
              브라우저 안에서만 이루어져, 입력한 이름이나 항목이 서버로 전송되지 않습니다.
            </p>
            <p className="text-brand-mid leading-relaxed mb-4">
              한 가지 오해도 짚고 갑니다. 같은 사람이 두세 번 연달아 걸리면 조작을 의심하기 쉽지만,
              매번 독립적으로 난수를 새로 뽑기 때문에 연속 당첨도 정상적인 확률 안의 일입니다. 동전을
              던져 앞면이 세 번 연속 나올 수 있는 것과 같은 이치죠. 억울하면 한 판 더 돌리는 수밖에
              없습니다.
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
              <div className="border-b border-brand-light/20 pb-6">
                <h3 className="text-lg font-semibold text-brand-black mb-2">
                  Q. 사다리타기와 룰렛 중 뭘 쓰는 게 좋나요?
                </h3>
                <p className="text-brand-mid">
                  전원에게 역할이나 순서를 나눠야 하면 사다리타기, 여럿 중 하나만 뽑으면 룰렛이
                  편합니다.
                </p>
              </div>
              <div className="border-b border-brand-light/20 pb-6">
                <h3 className="text-lg font-semibold text-brand-black mb-2">
                  Q. 같은 사람이 연달아 걸렸는데 조작 아닌가요?
                </h3>
                <p className="text-brand-mid">
                  매번 독립적으로 새 난수를 뽑기 때문에 연속 당첨도 자연스러운 확률 안의 일입니다.
                  동전 앞면이 세 번 연속 나오는 것과 같습니다.
                </p>
              </div>
              <div className="pb-6">
                <h3 className="text-lg font-semibold text-brand-black mb-2">
                  Q. 입력한 이름이 저장되나요?
                </h3>
                <p className="text-brand-mid">
                  아니요. 입력한 이름은 사다리를 그리는 동안 화면에만 존재하고, 탭을 닫으면
                  함께 사라집니다. 어디에도 기록이 남지 않습니다.
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
