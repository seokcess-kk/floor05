import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import BlogExtras from "@/components/common/BlogExtras";
import { buildBlogMetadata } from "@/lib/common/blog";

export const metadata: Metadata = {
  ...buildBlogMetadata("mannai-age-guide"),
  title: "만 나이 계산하는 법 - 만 나이·연 나이·세는 나이 차이",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "만 나이는 어떻게 계산하나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "올해에서 출생연도를 뺀 뒤, 올해 생일이 지났으면 그대로, 아직 안 지났으면 1을 더 뺍니다. 예를 들어 1995년 5월생이 2026년 3월이면 생일 전이라 만 30세, 6월이 지나면 만 31세입니다.",
      },
    },
    {
      "@type": "Question",
      name: "만 나이와 연 나이는 어떻게 다른가요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "만 나이는 생일을 기준으로 세고, 연 나이는 현재연도에서 출생연도를 뺀 값으로 생일과 무관합니다. 법령·계약·공문서는 만 나이, 병역·청소년보호법 등은 연 나이를 씁니다.",
      },
    },
    {
      "@type": "Question",
      name: "세는 나이는 이제 안 쓰나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "2023년 6월 만 나이 통일법 이후 법적 효력은 없습니다. 다만 일상 대화에서는 여전히 쓰이므로 참고용으로 알아 두면 좋습니다.",
      },
    },
  ],
};

export default function MannaiAgeGuidePage() {
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
            <span className="text-brand-mid">만 나이 계산하는 법</span>
          </nav>

          <header className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-brand-black mb-4 leading-tight">
              만 나이 계산하는 법
            </h1>
            <p className="text-lg text-brand-mid">
              만 나이·연 나이·세는 나이, 무엇이 어떻게 다른가
            </p>
            <div className="mt-4 flex items-center gap-4 text-sm text-brand-light">
              <time dateTime="2026-06-29">2026-06-29</time>
              <span>·</span>
              <span>5분 읽기</span>
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            <p className="text-brand-mid text-lg leading-relaxed mb-8">
              2023년 6월 28일 <strong>만 나이 통일법</strong>이 시행되면서, 법령과 계약·공문서의
              나이는 특별한 언급이 없으면 모두 만 나이를 뜻하게 됐습니다. 그런데도 우리는 여전히
              연 나이와 옛 세는 나이를 섞어 쓰기 때문에, &ldquo;그래서 내 나이가 몇 살이지?&rdquo;가
              헷갈릴 때가 많습니다. 세 가지 나이의 차이와 계산법을 정리했습니다.
            </p>

            <div className="bg-brand-paper rounded-lg p-6 mb-10 border border-brand-light/20">
              <p className="font-medium text-brand-black mb-3">💡 바로 계산하고 싶다면?</p>
              <p className="text-brand-mid text-sm mb-4">
                생년월일만 넣으면 만 나이·연 나이·세는 나이·띠·다음 생일 D-Day를 한 번에
                보여줍니다. 입력값은 서버로 전송되지 않습니다.
              </p>
              <Link
                href="/tools/date/age"
                className="inline-block bg-brand-accent text-brand-white px-4 py-2 rounded-md text-sm font-medium hover:bg-brand-accent-light transition-colors"
              >
                만 나이 계산기 사용하기 →
              </Link>
            </div>

            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">
              세 가지 나이, 한눈에 비교
            </h2>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-brand-light/40 text-left">
                    <th className="py-2 pr-4 text-brand-black">구분</th>
                    <th className="py-2 pr-4 text-brand-black">계산법</th>
                    <th className="py-2 text-brand-black">쓰이는 곳</th>
                  </tr>
                </thead>
                <tbody className="text-brand-mid">
                  <tr className="border-b border-brand-light/20">
                    <td className="py-2 pr-4 font-medium text-brand-black">만 나이</td>
                    <td className="py-2 pr-4">생일 기준, 태어나면 0세</td>
                    <td className="py-2">법령·계약·공문서·병원</td>
                  </tr>
                  <tr className="border-b border-brand-light/20">
                    <td className="py-2 pr-4 font-medium text-brand-black">연 나이</td>
                    <td className="py-2 pr-4">현재연도 − 출생연도</td>
                    <td className="py-2">병역·청소년보호법·초등 입학</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium text-brand-black">세는 나이</td>
                    <td className="py-2 pr-4">연 나이 + 1, 태어나면 1세</td>
                    <td className="py-2">일상 대화(법적 효력 없음)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">
              만 나이 계산 공식
            </h2>
            <p className="text-brand-mid leading-relaxed mb-4">
              만 나이는 생일이 지났는지로 갈립니다.
            </p>
            <ul className="list-disc list-inside text-brand-mid space-y-2 mb-6">
              <li>올해 생일이 <strong>지났다면</strong>: 올해 − 출생연도</li>
              <li>올해 생일이 <strong>아직 안 지났다면</strong>: 올해 − 출생연도 − 1</li>
            </ul>
            <p className="text-brand-mid leading-relaxed mb-4">
              예를 들어 1995년 5월 15일생을 2026년 기준으로 보면, 5월 15일 전에는 만 30세,
              그 이후에는 만 31세입니다. 같은 해에 태어난 사람도 생일 전후로 한 살 차이가 나는
              이유입니다.
            </p>

            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">
              통일 이후에도 연 나이를 쓰는 곳
            </h2>
            <p className="text-brand-mid leading-relaxed mb-4">
              만 나이 통일법은 &lsquo;기준&rsquo;을 만 나이로 통일한 것이지, 모든 제도를 바꾼 것은
              아닙니다. 다음은 여전히 연 나이를 씁니다.
            </p>
            <ul className="list-disc list-inside text-brand-mid space-y-2 mb-6">
              <li>병역 판정 — 그해 만 19세가 되는 해(연 나이) 기준</li>
              <li>청소년보호법 — 그해 만 19세가 되는 해의 1월 1일부터 성인 취급</li>
              <li>초등학교 입학 — 그해 만 6세가 되는 아동(연 나이)</li>
            </ul>
            <p className="text-brand-mid leading-relaxed mb-4">
              그래서 &lsquo;내 나이&rsquo;를 말할 때는 어떤 기준인지 함께 확인하는 게 안전합니다.
            </p>

            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">
              띠와 음력 생일은 또 다르다
            </h2>
            <p className="text-brand-mid leading-relaxed mb-4">
              띠는 태어난 해의 12지로 정해지는데, 엄밀히는 음력 설을 기준으로 바뀝니다. 그래서
              양력 1~2월 초에 태어난 분은 흔히 아는 양력 연도 기준 띠와 음력 기준 띠가 다를 수
              있습니다. 음력 생일을 챙긴다면 해마다 양력 날짜가 달라지므로 그때그때 변환해 봐야
              합니다.
            </p>
            <ul className="list-disc list-inside text-brand-mid space-y-2 mb-6">
              <li>
                <Link href="/tools/date/age" className="text-brand-accent hover:underline">
                  만 나이 계산기
                </Link>
                : 생년월일로 만 나이·연 나이·세는 나이·띠·다음 생일 D-Day까지
              </li>
              <li>
                <Link href="/tools/date/lunar" className="text-brand-accent hover:underline">
                  음력 양력 변환
                </Link>
                : 음력 생일이 올해·내년 양력으로 며칠인지
              </li>
              <li>
                <Link href="/tools/date/dday" className="text-brand-accent hover:underline">
                  D-Day 계산기
                </Link>
                : 생일·기념일까지 며칠 남았는지
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-6">
              자주 묻는 질문
            </h2>
            <div className="space-y-6">
              <div className="border-b border-brand-light/20 pb-6">
                <h3 className="text-lg font-semibold text-brand-black mb-2">
                  Q. 만 나이는 어떻게 계산하나요?
                </h3>
                <p className="text-brand-mid">
                  올해에서 출생연도를 뺀 뒤, 올해 생일이 지났으면 그대로, 아직 안 지났으면 1을 더
                  빼면 됩니다.
                </p>
              </div>
              <div className="border-b border-brand-light/20 pb-6">
                <h3 className="text-lg font-semibold text-brand-black mb-2">
                  Q. 만 나이와 연 나이는 뭐가 다른가요?
                </h3>
                <p className="text-brand-mid">
                  만 나이는 생일 기준, 연 나이는 현재연도−출생연도입니다. 법령·계약은 만 나이,
                  병역·청소년보호법은 연 나이를 씁니다.
                </p>
              </div>
              <div className="pb-6">
                <h3 className="text-lg font-semibold text-brand-black mb-2">
                  Q. 세는 나이는 이제 안 쓰나요?
                </h3>
                <p className="text-brand-mid">
                  법적 효력은 없지만 일상 대화에는 남아 있습니다. 연 나이에 1을 더한 값입니다.
                </p>
              </div>
            </div>

            <div className="bg-brand-black rounded-lg p-8 mt-12 text-center">
              <h3 className="text-xl font-bold text-brand-paper mb-3">
                생년월일로 바로 계산
              </h3>
              <p className="text-brand-light mb-6">
                만 나이·연 나이·세는 나이·띠·다음 생일을 한 번에. 회원가입 없이 무료입니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/tools/date/age"
                  className="inline-block bg-brand-accent text-brand-white px-6 py-3 rounded-md font-medium hover:bg-brand-accent-light transition-colors"
                >
                  만 나이 계산기
                </Link>
                <Link
                  href="/tools/date/lunar"
                  className="inline-block bg-brand-dark text-brand-paper px-6 py-3 rounded-md font-medium hover:bg-brand-mid transition-colors"
                >
                  음력 양력 변환
                </Link>
              </div>
            </div>

            <BlogExtras slug="mannai-age-guide" />
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
