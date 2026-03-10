import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export const metadata: Metadata = {
  title: "SNS별 이미지 크기 총정리 - 2026년 최신",
  description:
    "인스타그램, 페이스북, 유튜브, 트위터, 네이버 블로그, 카카오톡까지. 각 SNS의 최적 이미지 크기를 한눈에 정리했습니다.",
  keywords: [
    "SNS 이미지 크기",
    "인스타그램 사진 크기",
    "유튜브 썸네일 크기",
    "페이스북 이미지 크기",
    "트위터 이미지 크기",
    "네이버 블로그 이미지",
    "카카오톡 프로필 크기",
    "소셜미디어 이미지 규격",
  ],
  openGraph: {
    title: "SNS별 이미지 크기 총정리 - 2026년 최신",
    description: "인스타, 유튜브, 페이스북 등 SNS별 최적 이미지 크기 가이드",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "인스타그램에 올릴 때 가장 좋은 사진 크기는?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "인스타그램 피드는 세로형 1080×1350px(4:5 비율)이 가장 추천됩니다. 화면에서 가장 많은 공간을 차지해 눈에 잘 띕니다.",
      },
    },
    {
      "@type": "Question",
      name: "유튜브 썸네일 크기는 얼마인가요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "유튜브 썸네일의 권장 크기는 1280×720px (16:9 비율)입니다. 최소 640px 이상이어야 하고, 파일 크기는 2MB 이하를 권장합니다.",
      },
    },
    {
      "@type": "Question",
      name: "SNS마다 이미지 크기가 다른 이유는?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "각 플랫폼의 UI 디자인과 사용 패턴이 다르기 때문입니다. 인스타그램은 세로 스크롤에 최적화되어 있고, 유튜브는 와이드스크린 썸네일을 사용합니다.",
      },
    },
  ],
};

export default function SNSImageSizePage() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-white">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
            <span className="text-brand-mid">SNS별 이미지 크기</span>
          </nav>

          {/* 제목 */}
          <header className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-brand-black mb-4 leading-tight">
              SNS별 이미지 크기 총정리
            </h1>
            <p className="text-lg text-brand-mid">
              2026년 최신 — 플랫폼별 최적 규격 한눈에
            </p>
            <div className="mt-4 flex items-center gap-4 text-sm text-brand-light">
              <time dateTime="2026-03-10">2026-03-10</time>
              <span>·</span>
              <span>6분 읽기</span>
            </div>
          </header>

          {/* 본문 */}
          <div className="prose prose-lg max-w-none">
            {/* 도입 */}
            <p className="text-brand-mid text-lg leading-relaxed mb-8">
              SNS에 사진을 올렸는데 잘리거나 흐릿하게 나온 적 있으신가요?
              각 플랫폼마다 권장하는 이미지 크기가 다르기 때문입니다.
              이 글에서 모든 주요 SNS의 최적 이미지 규격을 정리해드립니다.
            </p>

            {/* CTA 박스 */}
            <div className="bg-brand-paper rounded-lg p-6 mb-10 border border-brand-light/20">
              <p className="font-medium text-brand-black mb-3">
                💡 지금 바로 크기 맞추고 싶다면?
              </p>
              <p className="text-brand-mid text-sm mb-4">
                SNS별 프리셋이 내장된 리사이즈 도구로 원클릭 변환하세요.
              </p>
              <Link
                href="/tools/image/resize"
                className="inline-block bg-brand-accent text-brand-white px-4 py-2 rounded-md text-sm font-medium hover:bg-brand-accent-light transition-colors"
              >
                이미지 리사이즈 도구 →
              </Link>
            </div>

            {/* 인스타그램 */}
            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">
              1. 인스타그램
            </h2>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-brand-light/30">
                    <th className="text-left py-3 px-4 text-brand-black font-semibold">유형</th>
                    <th className="text-left py-3 px-4 text-brand-black font-semibold">비율</th>
                    <th className="text-left py-3 px-4 text-brand-black font-semibold">크기 (px)</th>
                  </tr>
                </thead>
                <tbody className="text-brand-mid">
                  <tr className="border-b border-brand-light/20">
                    <td className="py-3 px-4">피드 정사각형</td>
                    <td className="py-3 px-4">1:1</td>
                    <td className="py-3 px-4 font-mono">1080 × 1080</td>
                  </tr>
                  <tr className="border-b border-brand-light/20 bg-brand-accent/5">
                    <td className="py-3 px-4 font-medium">피드 세로형 (추천)</td>
                    <td className="py-3 px-4">4:5</td>
                    <td className="py-3 px-4 font-mono">1080 × 1350</td>
                  </tr>
                  <tr className="border-b border-brand-light/20">
                    <td className="py-3 px-4">피드 가로형</td>
                    <td className="py-3 px-4">1.91:1</td>
                    <td className="py-3 px-4 font-mono">1080 × 566</td>
                  </tr>
                  <tr className="border-b border-brand-light/20">
                    <td className="py-3 px-4">스토리/릴스</td>
                    <td className="py-3 px-4">9:16</td>
                    <td className="py-3 px-4 font-mono">1080 × 1920</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">프로필 사진</td>
                    <td className="py-3 px-4">1:1</td>
                    <td className="py-3 px-4 font-mono">320 × 320</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 유튜브 */}
            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">
              2. 유튜브
            </h2>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-brand-light/30">
                    <th className="text-left py-3 px-4 text-brand-black font-semibold">유형</th>
                    <th className="text-left py-3 px-4 text-brand-black font-semibold">비율</th>
                    <th className="text-left py-3 px-4 text-brand-black font-semibold">크기 (px)</th>
                  </tr>
                </thead>
                <tbody className="text-brand-mid">
                  <tr className="border-b border-brand-light/20 bg-brand-accent/5">
                    <td className="py-3 px-4 font-medium">썸네일 (필수)</td>
                    <td className="py-3 px-4">16:9</td>
                    <td className="py-3 px-4 font-mono">1280 × 720</td>
                  </tr>
                  <tr className="border-b border-brand-light/20">
                    <td className="py-3 px-4">채널 배너</td>
                    <td className="py-3 px-4">—</td>
                    <td className="py-3 px-4 font-mono">2560 × 1440</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">프로필 사진</td>
                    <td className="py-3 px-4">1:1</td>
                    <td className="py-3 px-4 font-mono">800 × 800</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-brand-light text-sm mb-6">
              ※ 썸네일은 2MB 이하, JPG/PNG/GIF 형식만 지원
            </p>

            {/* 페이스북 */}
            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">
              3. 페이스북
            </h2>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-brand-light/30">
                    <th className="text-left py-3 px-4 text-brand-black font-semibold">유형</th>
                    <th className="text-left py-3 px-4 text-brand-black font-semibold">비율</th>
                    <th className="text-left py-3 px-4 text-brand-black font-semibold">크기 (px)</th>
                  </tr>
                </thead>
                <tbody className="text-brand-mid">
                  <tr className="border-b border-brand-light/20">
                    <td className="py-3 px-4">피드 이미지</td>
                    <td className="py-3 px-4">1.91:1</td>
                    <td className="py-3 px-4 font-mono">1200 × 630</td>
                  </tr>
                  <tr className="border-b border-brand-light/20">
                    <td className="py-3 px-4">스토리</td>
                    <td className="py-3 px-4">9:16</td>
                    <td className="py-3 px-4 font-mono">1080 × 1920</td>
                  </tr>
                  <tr className="border-b border-brand-light/20">
                    <td className="py-3 px-4">커버 사진</td>
                    <td className="py-3 px-4">—</td>
                    <td className="py-3 px-4 font-mono">820 × 312</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">프로필 사진</td>
                    <td className="py-3 px-4">1:1</td>
                    <td className="py-3 px-4 font-mono">180 × 180</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 트위터(X) */}
            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">
              4. X (트위터)
            </h2>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-brand-light/30">
                    <th className="text-left py-3 px-4 text-brand-black font-semibold">유형</th>
                    <th className="text-left py-3 px-4 text-brand-black font-semibold">비율</th>
                    <th className="text-left py-3 px-4 text-brand-black font-semibold">크기 (px)</th>
                  </tr>
                </thead>
                <tbody className="text-brand-mid">
                  <tr className="border-b border-brand-light/20">
                    <td className="py-3 px-4">인피드 이미지</td>
                    <td className="py-3 px-4">16:9</td>
                    <td className="py-3 px-4 font-mono">1200 × 675</td>
                  </tr>
                  <tr className="border-b border-brand-light/20">
                    <td className="py-3 px-4">헤더 이미지</td>
                    <td className="py-3 px-4">3:1</td>
                    <td className="py-3 px-4 font-mono">1500 × 500</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">프로필 사진</td>
                    <td className="py-3 px-4">1:1</td>
                    <td className="py-3 px-4 font-mono">400 × 400</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 네이버/카카오 */}
            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">
              5. 네이버 / 카카오
            </h2>

            <h3 className="text-lg font-semibold text-brand-black mt-6 mb-3">
              네이버 블로그
            </h3>
            <ul className="list-disc list-inside text-brand-mid space-y-2 mb-6">
              <li>본문 이미지: 최대 너비 <strong>860px</strong> (자동 리사이즈)</li>
              <li>대표 이미지: <strong>1200 × 630px</strong> (OG 이미지)</li>
              <li>프로필 사진: <strong>161 × 161px</strong></li>
            </ul>

            <h3 className="text-lg font-semibold text-brand-black mt-6 mb-3">
              카카오톡
            </h3>
            <ul className="list-disc list-inside text-brand-mid space-y-2 mb-6">
              <li>프로필 사진: <strong>640 × 640px</strong> (1:1)</li>
              <li>배경 이미지: <strong>1080 × 1920px</strong> (9:16)</li>
              <li>오픈채팅 커버: <strong>640 × 640px</strong> (1:1)</li>
            </ul>

            {/* 한눈에 보기 */}
            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">
              6. 플랫폼별 프로필 사진 크기 비교
            </h2>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-brand-light/30">
                    <th className="text-left py-3 px-4 text-brand-black font-semibold">플랫폼</th>
                    <th className="text-left py-3 px-4 text-brand-black font-semibold">프로필 사진 크기</th>
                  </tr>
                </thead>
                <tbody className="text-brand-mid">
                  <tr className="border-b border-brand-light/20">
                    <td className="py-3 px-4">인스타그램</td>
                    <td className="py-3 px-4 font-mono">320 × 320 px</td>
                  </tr>
                  <tr className="border-b border-brand-light/20">
                    <td className="py-3 px-4">유튜브</td>
                    <td className="py-3 px-4 font-mono">800 × 800 px</td>
                  </tr>
                  <tr className="border-b border-brand-light/20">
                    <td className="py-3 px-4">페이스북</td>
                    <td className="py-3 px-4 font-mono">180 × 180 px</td>
                  </tr>
                  <tr className="border-b border-brand-light/20">
                    <td className="py-3 px-4">X (트위터)</td>
                    <td className="py-3 px-4 font-mono">400 × 400 px</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">카카오톡</td>
                    <td className="py-3 px-4 font-mono">640 × 640 px</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* FAQ 섹션 */}
            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-6">
              자주 묻는 질문
            </h2>

            <div className="space-y-6">
              <div className="border-b border-brand-light/20 pb-6">
                <h3 className="text-lg font-semibold text-brand-black mb-2">
                  Q. 권장 크기보다 큰 이미지를 올려도 되나요?
                </h3>
                <p className="text-brand-mid">
                  네, 대부분의 플랫폼은 자동으로 리사이즈합니다.
                  다만 용량이 크면 업로드가 느려지고, 비율이 맞지 않으면 잘릴 수 있습니다.
                </p>
              </div>

              <div className="border-b border-brand-light/20 pb-6">
                <h3 className="text-lg font-semibold text-brand-black mb-2">
                  Q. 한 장으로 모든 SNS에 올릴 수 있나요?
                </h3>
                <p className="text-brand-mid">
                  어렵습니다. 각 플랫폼의 비율이 다르기 때문에,
                  핵심 피사체를 중앙에 두고 플랫폼별로 크롭하는 것이 좋습니다.
                </p>
              </div>

              <div className="pb-6">
                <h3 className="text-lg font-semibold text-brand-black mb-2">
                  Q. floor05에서 한 번에 여러 크기로 변환할 수 있나요?
                </h3>
                <p className="text-brand-mid">
                  리사이즈 도구에서 SNS 프리셋을 선택하면 해당 크기로 변환됩니다.
                  여러 플랫폼용이 필요하면 같은 원본으로 여러 번 변환하세요.
                </p>
              </div>
            </div>

            {/* 마무리 CTA */}
            <div className="bg-brand-black rounded-lg p-8 mt-12 text-center">
              <h3 className="text-xl font-bold text-brand-paper mb-3">
                SNS 최적 크기로 변환하기
              </h3>
              <p className="text-brand-light mb-6">
                인스타, 유튜브, 페이스북 등 SNS 프리셋 내장.
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
