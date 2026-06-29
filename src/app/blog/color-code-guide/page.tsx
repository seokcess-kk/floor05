import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import BlogExtras from "@/components/common/BlogExtras";
import { buildBlogMetadata } from "@/lib/common/blog";

export const metadata: Metadata = {
  ...buildBlogMetadata("color-code-guide"),
  title: "HEX·RGB·HSL 색상 코드 차이와 변환 - 한 번에 정리",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "HEX와 RGB는 어떻게 다른가요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "둘 다 같은 색을 적는 방법입니다. HEX는 #RRGGBB 16진수, RGB는 빨강·초록·파랑을 0~255로 적습니다. #C45C2C는 rgb(196, 92, 44)와 같은 색입니다.",
      },
    },
    {
      "@type": "Question",
      name: "색상 대비비는 얼마 이상이어야 하나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "WCAG AA 기준으로 일반 텍스트는 4.5 : 1, 큰 텍스트는 3 : 1 이상이어야 합니다. 한국 웹접근성(KWCAG)도 본문 4.5 : 1 이상을 권장합니다.",
      },
    },
  ],
};

export default function ColorCodeGuidePage() {
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
            <span className="text-brand-mid">HEX·RGB·HSL 색상 코드 차이와 변환</span>
          </nav>

          <header className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-brand-black mb-4 leading-tight">
              HEX·RGB·HSL 색상 코드 차이와 변환
            </h1>
            <p className="text-lg text-brand-mid">같은 색을 적는 네 가지 방법</p>
            <div className="mt-4 flex items-center gap-4 text-sm text-brand-light">
              <time dateTime="2026-06-29">2026-06-29</time>
              <span>·</span>
              <span>5분 읽기</span>
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            <p className="text-brand-mid text-lg leading-relaxed mb-8">
              디자인 도구에서는 HEX, 코드에서는 RGB, 색을 미세 조정할 때는 HSL, 인쇄에서는 CMYK를
              씁니다. 모두 같은 색을 다르게 적은 것뿐인데, 표기법이 달라 변환이 자주 필요합니다.
              각각이 무엇이고 어떻게 바꾸는지 정리했습니다.
            </p>

            <div className="bg-brand-paper rounded-lg p-6 mb-10 border border-brand-light/20">
              <p className="font-medium text-brand-black mb-3">💡 바로 변환하고 싶다면?</p>
              <p className="text-brand-mid text-sm mb-4">
                색을 고르거나 HEX를 입력하면 RGB·HSL·CMYK를 한 번에 보여주고 복사까지 됩니다.
              </p>
              <Link
                href="/tools/color/converter"
                className="inline-block bg-brand-accent text-brand-white px-4 py-2 rounded-md text-sm font-medium hover:bg-brand-accent-light transition-colors"
              >
                색상 코드 변환 사용하기 →
              </Link>
            </div>

            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">네 가지 색상 표기</h2>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-brand-light/40 text-left">
                    <th className="py-2 pr-4 text-brand-black">표기</th>
                    <th className="py-2 pr-4 text-brand-black">예시</th>
                    <th className="py-2 text-brand-black">주로 쓰는 곳</th>
                  </tr>
                </thead>
                <tbody className="text-brand-mid">
                  <tr className="border-b border-brand-light/20">
                    <td className="py-2 pr-4 font-medium text-brand-black">HEX</td>
                    <td className="py-2 pr-4 font-mono">#C45C2C</td>
                    <td className="py-2">웹·디자인</td>
                  </tr>
                  <tr className="border-b border-brand-light/20">
                    <td className="py-2 pr-4 font-medium text-brand-black">RGB</td>
                    <td className="py-2 pr-4 font-mono">rgb(196, 92, 44)</td>
                    <td className="py-2">CSS·코드</td>
                  </tr>
                  <tr className="border-b border-brand-light/20">
                    <td className="py-2 pr-4 font-medium text-brand-black">HSL</td>
                    <td className="py-2 pr-4 font-mono">hsl(19, 63%, 47%)</td>
                    <td className="py-2">색 미세 조정</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium text-brand-black">CMYK</td>
                    <td className="py-2 pr-4 font-mono">cmyk(0, 53, 78, 23)</td>
                    <td className="py-2">인쇄</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-brand-mid leading-relaxed mb-4">
              HEX와 RGB는 표기만 다를 뿐 같은 정보입니다. #RRGGBB의 각 두 자리(16진수)가 RGB의
              빨강·초록·파랑(0~255)에 그대로 대응합니다. HSL은 색을 &lsquo;색상-채도-명도&rsquo;로 나눠
              밝기만 낮추거나 채도만 올리는 식의 조정에 편합니다.
            </p>

            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">CMYK는 근사값이다</h2>
            <p className="text-brand-mid leading-relaxed mb-4">
              화면은 빛을 더하는 RGB, 인쇄는 잉크를 섞는 CMYK라 변환은 항상 근사입니다. 같은 CMYK
              값도 용지·잉크·프로파일에 따라 다르게 인쇄됩니다. 그래서 정밀 인쇄에서는 변환기 값을
              참고만 하고, 실제 출력은 전용 컬러 프로파일로 확인하는 게 안전합니다.
            </p>

            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">
              색을 정할 땐 대비도 함께
            </h2>
            <p className="text-brand-mid leading-relaxed mb-4">
              색 코드를 다룰 때 자주 놓치는 게 가독성입니다. 글자색과 배경색의 명도 대비가 약하면
              읽기 어렵고, 웹접근성 기준에도 못 미칩니다. WCAG는 일반 텍스트에 4.5 : 1 이상을
              요구하고, 한국 웹접근성(KWCAG)도 같은 수준을 권장합니다.
            </p>
            <ul className="list-disc list-inside text-brand-mid space-y-2 mb-6">
              <li>
                <Link href="/tools/color/converter" className="text-brand-accent hover:underline">
                  색상 코드 변환
                </Link>
                : HEX·RGB·HSL·CMYK 양방향 변환과 복사
              </li>
              <li>
                <Link href="/tools/color/contrast" className="text-brand-accent hover:underline">
                  색상 대비 검사
                </Link>
                : 두 색의 대비비와 WCAG AA·AAA 통과 여부
              </li>
              <li>
                <Link href="/tools/color/gradient" className="text-brand-accent hover:underline">
                  CSS 그라데이션
                </Link>
                : 색을 골라 CSS 코드 바로 생성
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-6">자주 묻는 질문</h2>
            <div className="space-y-6">
              <div className="border-b border-brand-light/20 pb-6">
                <h3 className="text-lg font-semibold text-brand-black mb-2">
                  Q. HEX와 RGB는 어떻게 다른가요?
                </h3>
                <p className="text-brand-mid">
                  표기만 다른 같은 색입니다. #C45C2C는 rgb(196, 92, 44)와 같습니다.
                </p>
              </div>
              <div className="border-b border-brand-light/20 pb-6">
                <h3 className="text-lg font-semibold text-brand-black mb-2">
                  Q. CMYK 값은 정확한가요?
                </h3>
                <p className="text-brand-mid">
                  화면 기준의 근사값입니다. 실제 인쇄 색은 용지·잉크·프로파일에 따라 달라집니다.
                </p>
              </div>
              <div className="pb-6">
                <h3 className="text-lg font-semibold text-brand-black mb-2">
                  Q. 색상 대비는 얼마 이상이어야 하나요?
                </h3>
                <p className="text-brand-mid">
                  WCAG AA 기준 일반 텍스트 4.5 : 1, 큰 텍스트 3 : 1 이상입니다.
                </p>
              </div>
            </div>

            <div className="bg-brand-black rounded-lg p-8 mt-12 text-center">
              <h3 className="text-xl font-bold text-brand-paper mb-3">색, 코드로 바로 다루기</h3>
              <p className="text-brand-light mb-6">
                변환하고, 대비를 확인하고, 그라데이션까지. 회원가입 없이 무료입니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/tools/color/converter"
                  className="inline-block bg-brand-accent text-brand-white px-6 py-3 rounded-md font-medium hover:bg-brand-accent-light transition-colors"
                >
                  색상 코드 변환
                </Link>
                <Link
                  href="/tools/color/contrast"
                  className="inline-block bg-brand-dark text-brand-paper px-6 py-3 rounded-md font-medium hover:bg-brand-mid transition-colors"
                >
                  색상 대비 검사
                </Link>
              </div>
            </div>

            <BlogExtras slug="color-code-guide" />
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
