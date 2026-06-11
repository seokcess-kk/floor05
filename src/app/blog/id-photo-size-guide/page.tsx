import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import BlogExtras from "@/components/common/BlogExtras";
import { buildBlogMetadata } from "@/lib/common/blog";

export const metadata: Metadata = {
  ...buildBlogMetadata("id-photo-size-guide"),
  title: "증명사진 크기와 만드는 법 - 3×4·여권·원형 프로필까지",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "증명사진 규격은 어떻게 되나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "일반 증명사진은 3×4cm, 여권사진은 3.5×4.5cm, 미국 비자는 2×2인치(5.1×5.1cm)입니다. 300DPI로 만들면 각각 약 354×472px, 413×531px, 600×600px입니다.",
      },
    },
    {
      "@type": "Question",
      name: "증명사진을 원형(프로필)으로 만들 수 있나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "네. 크롭 도구의 '원형으로 자르기'를 켜면 선택 영역을 원형으로 잘라 투명 배경 PNG로 저장합니다. 1:1 비율과 함께 쓰면 완전한 원이 되어 프로필 사진에 적합합니다.",
      },
    },
    {
      "@type": "Question",
      name: "사진관 없이 집에서 증명사진을 만들 수 있나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "정면·균일한 배경으로 찍은 사진이라면 규격에 맞게 잘라 만들 수 있습니다. 다만 여권·비자 등 공식 제출용은 배경색·표정 등 별도 규정이 있으니 기관 안내를 확인하세요.",
      },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "증명사진 규격으로 만드는 방법",
  step: [
    {
      "@type": "HowToStep",
      name: "사진 업로드",
      text: "얼굴이 정면으로 나온 사진을 크롭 도구에 올립니다.",
    },
    {
      "@type": "HowToStep",
      name: "증명사진 프리셋 선택",
      text: "증명사진(3×4), 여권(3.5×4.5), 미국 비자(2×2) 중 규격을 선택합니다.",
    },
    {
      "@type": "HowToStep",
      name: "영역 맞추기",
      text: "얼굴이 규격 안에 들어오도록 크롭 영역을 조정합니다.",
    },
    {
      "@type": "HowToStep",
      name: "다운로드",
      text: "권장 크기로 저장하고, 용량 제한이 있으면 압축으로 맞춥니다.",
    },
  ],
};

export default function IdPhotoSizeGuidePage() {
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
            <span className="text-brand-mid">증명사진 크기</span>
          </nav>

          <header className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-brand-black mb-4 leading-tight">
              증명사진 크기와 만드는 법
            </h1>
            <p className="text-lg text-brand-mid">
              3×4, 여권 3.5×4.5, 원형 프로필까지 — 규격에 맞춰 자르기
            </p>
            <div className="mt-4 flex items-center gap-4 text-sm text-brand-light">
              <time dateTime="2026-06-12">2026-06-12</time>
              <span>·</span>
              <span>6분 읽기</span>
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            <p className="text-brand-mid text-lg leading-relaxed mb-8">
              지원서·여권·각종 신청에 증명사진이 필요한데 규격이 제각각이라 헷갈리기 쉽습니다.
              대표 규격과, 사진관 없이 브라우저에서 규격에 맞춰 만드는 방법을 정리했습니다.
            </p>

            <div className="bg-brand-paper rounded-lg p-6 mb-10 border border-brand-light/20">
              <p className="font-medium text-brand-black mb-3">💡 바로 만들고 싶다면?</p>
              <p className="text-brand-mid text-sm mb-4">
                크롭 도구의 증명사진 프리셋으로 규격 비율 + 권장 크기를 한 번에 맞출 수 있습니다. 파일이 서버로 전송되지 않습니다.
              </p>
              <Link
                href="/tools/image/crop"
                className="inline-block bg-brand-accent text-brand-white px-4 py-2 rounded-md text-sm font-medium hover:bg-brand-accent-light transition-colors"
              >
                크롭 도구로 증명사진 만들기 →
              </Link>
            </div>

            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">
              1. 대표 증명사진 규격
            </h2>
            <ul className="list-disc list-inside text-brand-mid space-y-2 mb-6">
              <li>
                <strong>일반 증명사진</strong>: 3×4cm — 300DPI 기준 약 354×472px
              </li>
              <li>
                <strong>여권사진</strong>: 3.5×4.5cm — 약 413×531px
              </li>
              <li>
                <strong>미국 비자</strong>: 2×2인치(5.1×5.1cm) — 600×600px
              </li>
            </ul>
            <p className="text-brand-mid leading-relaxed mb-4">
              화면·웹 제출용은 위 픽셀 크기면 충분합니다. 인화용은 300DPI 기준 픽셀로 맞추면
              실측 크기로 출력됩니다.
            </p>

            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">
              2. 비율이 안 맞으면 잘리거나 늘어납니다
            </h2>
            <p className="text-brand-mid leading-relaxed mb-4">
              증명사진은 가로세로 비율이 정해져 있어, 비율을 무시하고 크기만 바꾸면 얼굴이
              찌그러집니다. <strong>규격 비율로 먼저 자르고</strong> 권장 픽셀 크기로 맞추는 순서가
              안전합니다. 크롭 도구의 증명사진 프리셋은 비율과 출력 크기를 함께 설정해줍니다.
            </p>

            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">
              3. 브라우저에서 만드는 법
            </h2>
            <ol className="list-decimal list-inside text-brand-mid space-y-2 mb-6">
              <li>
                <Link href="/tools/image/crop" className="text-brand-accent hover:underline">
                  크롭
                </Link>
                에 정면 사진을 올립니다.
              </li>
              <li>증명사진 / 여권 / 미국 비자 프리셋 중 규격을 선택합니다.</li>
              <li>얼굴이 규격 안에 들어오도록 영역을 맞춥니다.</li>
              <li>
                저장 후 용량 제한이 있으면{" "}
                <Link href="/tools/image/compress" className="text-brand-accent hover:underline">
                  압축
                </Link>
                으로 200KB·500KB 등에 맞춥니다.
              </li>
            </ol>
            <p className="text-brand-mid leading-relaxed mb-4">
              제출 용량 제한을 맞추는 자세한 방법은{" "}
              <Link href="/blog/passport-photo-size" className="text-brand-accent hover:underline">
                증명사진 용량 줄이기
              </Link>
              에서 다룹니다.
            </p>

            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">
              4. 원형 프로필 사진으로
            </h2>
            <p className="text-brand-mid leading-relaxed mb-4">
              SNS·메신저 프로필처럼 원형이 필요하면 크롭의 <strong>&lsquo;원형으로 자르기&rsquo;</strong>를
              켜세요. 선택 영역을 원형으로 잘라 투명 배경 PNG로 저장합니다. 1:1 비율과 함께 쓰면
              완전한 원이 됩니다.
            </p>

            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-6">
              자주 묻는 질문
            </h2>
            <div className="space-y-6">
              <div className="border-b border-brand-light/20 pb-6">
                <h3 className="text-lg font-semibold text-brand-black mb-2">
                  Q. 증명사진 규격은 어떻게 되나요?
                </h3>
                <p className="text-brand-mid">
                  일반 증명사진 3×4cm, 여권 3.5×4.5cm, 미국 비자 2×2인치입니다. 300DPI로 만들면
                  각각 약 354×472, 413×531, 600×600px입니다.
                </p>
              </div>
              <div className="border-b border-brand-light/20 pb-6">
                <h3 className="text-lg font-semibold text-brand-black mb-2">
                  Q. 원형(프로필)으로 만들 수 있나요?
                </h3>
                <p className="text-brand-mid">
                  네. &lsquo;원형으로 자르기&rsquo;를 켜면 원형으로 잘라 투명 PNG로 저장합니다. 1:1과
                  함께 쓰면 완전한 원이 됩니다.
                </p>
              </div>
              <div className="pb-6">
                <h3 className="text-lg font-semibold text-brand-black mb-2">
                  Q. 집에서 만들어도 되나요?
                </h3>
                <p className="text-brand-mid">
                  정면·균일한 배경 사진이라면 규격에 맞게 잘라 쓸 수 있습니다. 다만 공식 제출용은
                  배경색·표정 규정이 있으니 기관 안내를 확인하세요.
                </p>
              </div>
            </div>

            <div className="bg-brand-black rounded-lg p-8 mt-12 text-center">
              <h3 className="text-xl font-bold text-brand-paper mb-3">
                지금 바로 증명사진 만들기
              </h3>
              <p className="text-brand-light mb-6">
                규격 프리셋·원형 크롭까지. 회원가입 없이 무료, 파일은 서버로 전송되지 않습니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/tools/image/crop"
                  className="inline-block bg-brand-accent text-brand-white px-6 py-3 rounded-md font-medium hover:bg-brand-accent-light transition-colors"
                >
                  이미지 크롭
                </Link>
                <Link
                  href="/tools/image/compress"
                  className="inline-block bg-brand-dark text-brand-paper px-6 py-3 rounded-md font-medium hover:bg-brand-mid transition-colors"
                >
                  용량 줄이기
                </Link>
              </div>
            </div>

            <BlogExtras slug="id-photo-size-guide" />
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
