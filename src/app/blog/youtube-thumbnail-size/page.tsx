import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import BlogExtras from "@/components/common/BlogExtras";
import { buildBlogMetadata } from "@/lib/common/blog";

export const metadata: Metadata = {
  ...buildBlogMetadata("youtube-thumbnail-size"),
  title: "유튜브 썸네일 크기 - 1280×720 규격과 무료로 만드는 법",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "유튜브 썸네일 권장 크기는 얼마인가요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "1280×720 픽셀(가로 세로 16:9 비율)이 권장 규격입니다. 가로 너비는 최소 640픽셀 이상이어야 하며, 파일 용량은 2MB 이하, JPG·PNG·WebP 형식을 지원합니다.",
      },
    },
    {
      "@type": "Question",
      name: "썸네일이 자꾸 잘려요. 왜 그런가요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "16:9가 아닌 비율로 만들면 유튜브가 자동으로 잘라내거나 위아래에 검은 여백을 넣습니다. 1280×720 또는 16:9 비율로 맞추면 잘리지 않습니다.",
      },
    },
    {
      "@type": "Question",
      name: "썸네일 용량이 2MB를 넘으면 어떻게 하나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "이미지 압축으로 용량을 줄이면 됩니다. 1280×720 정도 크기라면 품질을 약간만 낮춰도 2MB 이하로 충분히 들어갑니다.",
      },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "유튜브 썸네일 크기 맞추는 방법",
  step: [
    {
      "@type": "HowToStep",
      name: "16:9로 자르기",
      text: "이미지를 16:9 비율로 크롭해 썸네일 영역을 잡습니다.",
    },
    {
      "@type": "HowToStep",
      name: "1280×720으로 리사이즈",
      text: "유튜브 썸네일 권장 크기인 1280×720으로 크기를 맞춥니다.",
    },
    {
      "@type": "HowToStep",
      name: "2MB 이하로 압축",
      text: "용량이 2MB를 넘으면 압축해 제한 안으로 맞춥니다.",
    },
  ],
};

export default function YoutubeThumbnailSizePage() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-white">
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
          <nav className="mb-8 text-sm text-brand-light">
            <Link href="/blog" className="hover:text-brand-mid">
              블로그
            </Link>
            <span className="mx-2">›</span>
            <span className="text-brand-mid">유튜브 썸네일 크기</span>
          </nav>

          <header className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-brand-black mb-4 leading-tight">
              유튜브 썸네일 크기와 만드는 법
            </h1>
            <p className="text-lg text-brand-mid">
              1280×720 규격, 잘리지 않는 비율, 무료로 만드는 방법
            </p>
            <div className="mt-4 flex items-center gap-4 text-sm text-brand-light">
              <time dateTime="2026-06-11">2026-06-11</time>
              <span>·</span>
              <span>5분 읽기</span>
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            <p className="text-brand-mid text-lg leading-relaxed mb-8">
              썸네일은 클릭률을 좌우하는 가장 중요한 요소입니다. 그런데 크기가
              안 맞아 잘리거나 흐릿하게 올라가면 공들인 디자인이 무색해집니다.
              규격부터 정확히 맞춰봅시다.
            </p>

            <div className="bg-brand-paper rounded-lg p-6 mb-10 border border-brand-light/20">
              <p className="font-medium text-brand-black mb-3">
                💡 바로 크기를 맞추고 싶다면?
              </p>
              <p className="text-brand-mid text-sm mb-4">
                리사이즈 도구에서 1280×720으로 한 번에 맞출 수 있습니다.
                파일이 서버로 전송되지 않습니다.
              </p>
              <Link
                href="/tools/image/resize"
                className="inline-block bg-brand-accent text-brand-white px-4 py-2 rounded-md text-sm font-medium hover:bg-brand-accent-light transition-colors"
              >
                이미지 리사이즈 도구 사용하기 →
              </Link>
            </div>

            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">
              1. 유튜브 썸네일 권장 규격
            </h2>
            <ul className="list-disc list-inside text-brand-mid space-y-2 mb-6">
              <li>
                <strong>크기</strong>: 1280×720 픽셀 (권장)
              </li>
              <li>
                <strong>비율</strong>: 16:9
              </li>
              <li>
                <strong>최소 너비</strong>: 가로 640픽셀 이상
              </li>
              <li>
                <strong>용량</strong>: 2MB 이하
              </li>
              <li>
                <strong>형식</strong>: JPG, PNG, WebP
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">
              2. 왜 16:9가 중요할까
            </h2>
            <p className="text-brand-mid leading-relaxed mb-4">
              유튜브 플레이어와 추천 영역은 모두 16:9를 기준으로 표시됩니다.
              다른 비율로 만들면 자동으로 잘리거나 위아래에 검은 여백이 생겨
              지저분해 보입니다. 1280×720은 16:9를 정확히 만족하는 가장 무난한
              크기입니다.
            </p>

            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">
              3. 무료로 썸네일 크기 맞추기
            </h2>
            <p className="text-brand-mid leading-relaxed mb-4">
              포토샵 없이 브라우저에서 세 단계면 끝납니다.
            </p>
            <ol className="list-decimal list-inside text-brand-mid space-y-2 mb-6">
              <li>
                <Link href="/tools/image/crop" className="text-brand-accent hover:underline">
                  크롭
                </Link>
                에서 16:9 프리셋으로 썸네일 영역을 잡습니다.
              </li>
              <li>
                <Link href="/tools/image/resize" className="text-brand-accent hover:underline">
                  리사이즈
                </Link>
                에서 1280×720으로 크기를 맞춥니다.
              </li>
              <li>
                용량이 2MB를 넘으면{" "}
                <Link href="/tools/image/compress" className="text-brand-accent hover:underline">
                  압축
                </Link>
                으로 줄입니다.
              </li>
            </ol>

            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">
              4. 클릭을 부르는 썸네일 팁
            </h2>
            <ul className="list-disc list-inside text-brand-mid space-y-2 mb-6">
              <li>
                텍스트는 굵고 크게. 모바일에서는 썸네일이 아주 작게 보입니다.
              </li>
              <li>
                중요한 요소는 가장자리를 피해 가운데로. 잘려도 살아남습니다.
              </li>
              <li>
                배경과 글자의 명암 대비를 확실히. 작아도 읽혀야 합니다.
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-6">
              자주 묻는 질문
            </h2>
            <div className="space-y-6">
              <div className="border-b border-brand-light/20 pb-6">
                <h3 className="text-lg font-semibold text-brand-black mb-2">
                  Q. 유튜브 썸네일 권장 크기는 얼마인가요?
                </h3>
                <p className="text-brand-mid">
                  1280×720 픽셀(16:9)이 권장 규격입니다. 가로 너비는 최소
                  640픽셀 이상, 용량은 2MB 이하여야 합니다.
                </p>
              </div>
              <div className="border-b border-brand-light/20 pb-6">
                <h3 className="text-lg font-semibold text-brand-black mb-2">
                  Q. 썸네일이 자꾸 잘려요.
                </h3>
                <p className="text-brand-mid">
                  16:9가 아닌 비율이면 유튜브가 자동으로 잘라냅니다. 1280×720
                  또는 16:9 비율로 맞추면 잘리지 않습니다.
                </p>
              </div>
              <div className="pb-6">
                <h3 className="text-lg font-semibold text-brand-black mb-2">
                  Q. 용량이 2MB를 넘으면요?
                </h3>
                <p className="text-brand-mid">
                  압축으로 줄이면 됩니다. 1280×720 크기라면 품질을 약간만 낮춰도
                  2MB 이하로 충분히 들어갑니다.
                </p>
              </div>
            </div>

            <div className="bg-brand-black rounded-lg p-8 mt-12 text-center">
              <h3 className="text-xl font-bold text-brand-paper mb-3">
                지금 바로 썸네일 크기 맞추기
              </h3>
              <p className="text-brand-light mb-6">
                회원가입 없이 무료로 사용할 수 있습니다.
                <br />
                파일이 서버로 전송되지 않아 안전합니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/tools/image/resize"
                  className="inline-block bg-brand-accent text-brand-white px-6 py-3 rounded-md font-medium hover:bg-brand-accent-light transition-colors"
                >
                  이미지 리사이즈
                </Link>
                <Link
                  href="/tools/image/crop"
                  className="inline-block bg-brand-dark text-brand-paper px-6 py-3 rounded-md font-medium hover:bg-brand-mid transition-colors"
                >
                  이미지 크롭
                </Link>
                <Link
                  href="/tools/image/compress"
                  className="inline-block bg-brand-dark text-brand-paper px-6 py-3 rounded-md font-medium hover:bg-brand-mid transition-colors"
                >
                  이미지 압축
                </Link>
              </div>
            </div>

            <BlogExtras slug="youtube-thumbnail-size" />
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
