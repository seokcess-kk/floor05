import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export const metadata: Metadata = {
  title: "인스타그램 사진 크기 총정리 - 2026년 최신 규격",
  description:
    "인스타그램 피드, 스토리, 릴스, 프로필 사진의 최적 크기를 알려드립니다. 잘리지 않는 정사각형, 세로, 가로 사진 규격과 무료 리사이즈 방법까지.",
  keywords: [
    "인스타그램 사진 크기",
    "인스타 이미지 규격",
    "인스타 피드 크기",
    "인스타 스토리 크기",
    "인스타 사진 비율",
    "인스타그램 이미지 사이즈",
    "인스타 정사각형",
  ],
  openGraph: {
    title: "인스타그램 사진 크기 총정리 - 2026년 최신 규격",
    description:
      "인스타그램 피드, 스토리, 릴스의 최적 크기와 무료 리사이즈 방법",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "인스타그램 피드 사진 크기는 얼마인가요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "인스타그램 피드는 정사각형(1:1) 1080×1080px, 세로형(4:5) 1080×1350px, 가로형(1.91:1) 1080×566px를 지원합니다. 가장 추천하는 크기는 세로형 1080×1350px입니다.",
      },
    },
    {
      "@type": "Question",
      name: "인스타그램 스토리 크기는 얼마인가요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "인스타그램 스토리의 최적 크기는 1080×1920px (9:16 비율)입니다. 이 크기로 올리면 화면 전체를 꽉 채울 수 있습니다.",
      },
    },
    {
      "@type": "Question",
      name: "인스타그램에 올릴 때 사진이 잘리는 이유는?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "인스타그램은 지원하지 않는 비율의 사진을 자동으로 잘라냅니다. 피드는 1:1, 4:5, 1.91:1 비율만 지원하므로, 올리기 전에 해당 비율로 미리 조정하면 잘림을 방지할 수 있습니다.",
      },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "인스타그램 사진 크기 맞추는 방법",
  description: "인스타그램에 올릴 사진을 최적 크기로 조정하는 방법",
  step: [
    {
      "@type": "HowToStep",
      name: "사진 업로드",
      text: "리사이즈 도구에서 사진을 업로드합니다.",
    },
    {
      "@type": "HowToStep",
      name: "인스타그램 프리셋 선택",
      text: "SNS 프리셋에서 Instagram 정사각형, 세로, 또는 가로를 선택합니다.",
    },
    {
      "@type": "HowToStep",
      name: "리사이즈 및 다운로드",
      text: "변환 버튼을 클릭하고 최적화된 이미지를 다운로드합니다.",
    },
  ],
};

export default function InstagramImageSizePage() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-white">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <Header />

      <main className="flex-1">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* 브레드크럼 */}
          <nav className="mb-8 text-sm text-brand-light">
            <Link href="/blog" className="hover:text-brand-mid">
              블로그
            </Link>
            <span className="mx-2">›</span>
            <span className="text-brand-mid">인스타그램 사진 크기</span>
          </nav>

          {/* 제목 */}
          <header className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-brand-black mb-4 leading-tight">
              인스타그램 사진 크기 총정리
            </h1>
            <p className="text-lg text-brand-mid">
              2026년 최신 규격 — 피드, 스토리, 릴스, 프로필
            </p>
            <div className="mt-4 flex items-center gap-4 text-sm text-brand-light">
              <time dateTime="2026-03-10">2026-03-10</time>
              <span>·</span>
              <span>4분 읽기</span>
            </div>
          </header>

          {/* 본문 */}
          <div className="prose prose-lg max-w-none">
            {/* 도입 */}
            <p className="text-brand-mid text-lg leading-relaxed mb-8">
              인스타그램에 사진을 올렸는데 잘리거나 흐릿해진 적 있으신가요?
              인스타그램은 특정 크기와 비율만 지원하기 때문입니다.
              이 글에서 모든 인스타그램 이미지 규격을 정리해드립니다.
            </p>

            {/* CTA 박스 */}
            <div className="bg-brand-paper rounded-lg p-6 mb-10 border border-brand-light/20">
              <p className="font-medium text-brand-black mb-3">
                💡 바로 크기 조절하고 싶다면?
              </p>
              <p className="text-brand-mid text-sm mb-4">
                인스타그램 프리셋이 내장된 무료 리사이즈 도구를 사용해보세요.
              </p>
              <Link
                href="/tools/image/resize"
                className="inline-block bg-brand-accent text-brand-white px-4 py-2 rounded-md text-sm font-medium hover:bg-brand-accent-light transition-colors"
              >
                이미지 리사이즈 도구 →
              </Link>
            </div>

            {/* 피드 */}
            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">
              1. 인스타그램 피드 사진 크기
            </h2>
            <p className="text-brand-mid leading-relaxed mb-4">
              피드에 올릴 수 있는 사진은 세 가지 비율이 있습니다:
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-brand-light/30">
                    <th className="text-left py-3 px-4 text-brand-black font-semibold">유형</th>
                    <th className="text-left py-3 px-4 text-brand-black font-semibold">비율</th>
                    <th className="text-left py-3 px-4 text-brand-black font-semibold">크기 (px)</th>
                    <th className="text-left py-3 px-4 text-brand-black font-semibold">추천</th>
                  </tr>
                </thead>
                <tbody className="text-brand-mid">
                  <tr className="border-b border-brand-light/20">
                    <td className="py-3 px-4">정사각형</td>
                    <td className="py-3 px-4">1:1</td>
                    <td className="py-3 px-4 font-mono">1080 × 1080</td>
                    <td className="py-3 px-4">⭐⭐⭐</td>
                  </tr>
                  <tr className="border-b border-brand-light/20 bg-brand-accent/5">
                    <td className="py-3 px-4 font-medium">세로형</td>
                    <td className="py-3 px-4">4:5</td>
                    <td className="py-3 px-4 font-mono">1080 × 1350</td>
                    <td className="py-3 px-4">⭐⭐⭐⭐⭐</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">가로형</td>
                    <td className="py-3 px-4">1.91:1</td>
                    <td className="py-3 px-4 font-mono">1080 × 566</td>
                    <td className="py-3 px-4">⭐⭐</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-brand-mid leading-relaxed mb-6">
              <strong>가장 추천하는 크기는 세로형 1080×1350px</strong>입니다.
              피드에서 가장 많은 공간을 차지해 눈에 잘 띄고, 참여율도 높습니다.
            </p>

            {/* 스토리 */}
            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">
              2. 인스타그램 스토리 크기
            </h2>
            <p className="text-brand-mid leading-relaxed mb-4">
              스토리는 세로 전체 화면으로 표시됩니다:
            </p>
            <ul className="list-disc list-inside text-brand-mid space-y-2 mb-6">
              <li><strong>최적 크기</strong>: 1080 × 1920 px</li>
              <li><strong>비율</strong>: 9:16</li>
              <li><strong>최대 파일 크기</strong>: 이미지 30MB, 동영상 4GB</li>
            </ul>
            <p className="text-brand-light text-sm mb-6">
              ※ 상단/하단 약 250px 영역에는 프로필명과 답장 버튼이 표시되므로,
              중요한 내용은 중앙에 배치하세요.
            </p>

            {/* 릴스 */}
            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">
              3. 인스타그램 릴스 크기
            </h2>
            <p className="text-brand-mid leading-relaxed mb-4">
              릴스도 스토리와 같은 세로형 전체 화면입니다:
            </p>
            <ul className="list-disc list-inside text-brand-mid space-y-2 mb-6">
              <li><strong>최적 크기</strong>: 1080 × 1920 px (9:16)</li>
              <li><strong>커버 이미지</strong>: 1080 × 1920 px</li>
              <li><strong>피드 미리보기</strong>: 중앙 1080 × 1350 영역이 표시됨</li>
            </ul>

            {/* 프로필 */}
            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">
              4. 프로필 사진 크기
            </h2>
            <ul className="list-disc list-inside text-brand-mid space-y-2 mb-6">
              <li><strong>최적 크기</strong>: 320 × 320 px</li>
              <li><strong>표시 크기</strong>: 110 × 110 px (원형으로 잘림)</li>
              <li><strong>권장</strong>: 얼굴이나 로고를 중앙에 배치</li>
            </ul>

            {/* FAQ 섹션 */}
            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-6">
              자주 묻는 질문
            </h2>

            <div className="space-y-6">
              <div className="border-b border-brand-light/20 pb-6">
                <h3 className="text-lg font-semibold text-brand-black mb-2">
                  Q. 사진이 자꾸 잘리는데 어떻게 하나요?
                </h3>
                <p className="text-brand-mid">
                  인스타그램이 지원하지 않는 비율이기 때문입니다.
                  올리기 전에 1:1, 4:5, 또는 1.91:1 비율로 미리 조정하세요.
                  floor05 리사이즈 도구에서 인스타그램 프리셋을 선택하면 됩니다.
                </p>
              </div>

              <div className="border-b border-brand-light/20 pb-6">
                <h3 className="text-lg font-semibold text-brand-black mb-2">
                  Q. 화질이 떨어지는 이유는?
                </h3>
                <p className="text-brand-mid">
                  1080px보다 작은 이미지를 올리면 인스타그램이 확대하면서
                  화질이 떨어집니다. 항상 1080px 이상의 이미지를 사용하세요.
                </p>
              </div>

              <div className="pb-6">
                <h3 className="text-lg font-semibold text-brand-black mb-2">
                  Q. 여러 사진을 한꺼번에 크기 조절할 수 있나요?
                </h3>
                <p className="text-brand-mid">
                  네, floor05 리사이즈 도구는 여러 장을 한꺼번에 처리할 수 있습니다.
                  같은 프리셋으로 일괄 변환 후 ZIP으로 다운로드하세요.
                </p>
              </div>
            </div>

            {/* 마무리 CTA */}
            <div className="bg-brand-black rounded-lg p-8 mt-12 text-center">
              <h3 className="text-xl font-bold text-brand-paper mb-3">
                인스타그램 최적 크기로 변환하기
              </h3>
              <p className="text-brand-light mb-6">
                인스타그램 프리셋으로 클릭 한 번에 완성.
                <br />
                파일이 서버로 전송되지 않아 안전합니다.
              </p>
              <Link
                href="/tools/image/resize"
                className="inline-block bg-brand-accent text-brand-white px-6 py-3 rounded-md font-medium hover:bg-brand-accent-light transition-colors"
              >
                이미지 리사이즈 도구 사용하기
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
