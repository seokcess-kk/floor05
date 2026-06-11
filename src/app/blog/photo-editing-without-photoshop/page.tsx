import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import BlogExtras from "@/components/common/BlogExtras";
import { buildBlogMetadata } from "@/lib/common/blog";

export const metadata: Metadata = {
  ...buildBlogMetadata("photo-editing-without-photoshop"),
  title: "포토샵 없이 사진 편집하기 - 무료 브라우저 도구 총정리",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "포토샵 없이 사진 편집이 가능한가요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "압축, 크기 조절, 포맷 변환, 자르기, 합치기 같은 대부분의 기본 편집은 설치 없이 브라우저에서 무료로 할 수 있습니다. 전문적인 합성·리터칭이 아니라면 포토샵이 필요 없는 경우가 많습니다.",
      },
    },
    {
      "@type": "Question",
      name: "무료 온라인 사진 편집은 안전한가요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "도구에 따라 다릅니다. 파일을 서버에 업로드하는 도구도 있지만, 브라우저에서 직접 처리하는 도구를 쓰면 사진이 기기를 떠나지 않아 더 안전합니다.",
      },
    },
    {
      "@type": "Question",
      name: "설치나 회원가입이 필요한가요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "브라우저 기반 도구는 설치가 필요 없습니다. floor05의 이미지 도구는 회원가입 없이 무제한 무료로 사용할 수 있습니다.",
      },
    },
  ],
};

export default function PhotoEditingWithoutPhotoshopPage() {
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
            <span className="text-brand-mid">포토샵 없이 사진 편집</span>
          </nav>

          <header className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-brand-black mb-4 leading-tight">
              포토샵 없이 사진 편집하기
            </h1>
            <p className="text-lg text-brand-mid">
              설치도 결제도 없이, 브라우저에서 끝내는 기본 편집 총정리
            </p>
            <div className="mt-4 flex items-center gap-4 text-sm text-brand-light">
              <time dateTime="2026-06-11">2026-06-11</time>
              <span>·</span>
              <span>7분 읽기</span>
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            <p className="text-brand-mid text-lg leading-relaxed mb-8">
              사진 한 장 줄이려고 포토샵을 켜는 건 과합니다. 용량 줄이기, 크기
              조절, 포맷 변환, 자르기, 합치기 — 우리가 일상에서 하는 사진 편집의
              대부분은 설치 없이 브라우저에서 무료로 끝낼 수 있습니다. 작업별로
              어떤 도구를 쓰면 되는지 정리했습니다.
            </p>

            <div className="bg-brand-paper rounded-lg p-6 mb-10 border border-brand-light/20">
              <p className="font-medium text-brand-black mb-3">
                💡 핵심부터 말하면
              </p>
              <p className="text-brand-mid text-sm mb-0">
                아래 도구들은 모두 <strong>설치·회원가입 없이</strong>,{" "}
                <strong>파일을 서버로 보내지 않고</strong> 브라우저에서 바로
                처리합니다. 필요한 작업을 골라 바로 쓰세요.
              </p>
            </div>

            {/* 작업별 도구 */}
            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">
              1. 용량이 너무 클 때 — 압축
            </h2>
            <p className="text-brand-mid leading-relaxed mb-4">
              이메일 첨부, 업로드 제한에 걸릴 때. 품질을 조금만 낮춰도 용량은
              절반 이하로 줄어듭니다. 목표 용량(예: 200KB)을 정하면 자동으로
              맞춰주기도 합니다.
            </p>
            <p className="text-brand-mid leading-relaxed mb-6">
              →{" "}
              <Link href="/tools/image/compress" className="text-brand-accent hover:underline">
                이미지 압축
              </Link>
              {" · 자세히는 "}
              <Link href="/blog/image-compression-guide" className="text-brand-accent hover:underline">
                용량 줄이기 총정리
              </Link>
            </p>

            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">
              2. 크기가 안 맞을 때 — 리사이즈
            </h2>
            <p className="text-brand-mid leading-relaxed mb-4">
              인스타, 유튜브 썸네일, 블로그처럼 플랫폼마다 권장 크기가 다릅니다.
              픽셀이나 비율, SNS 프리셋으로 한 번에 맞출 수 있습니다.
            </p>
            <p className="text-brand-mid leading-relaxed mb-6">
              →{" "}
              <Link href="/tools/image/resize" className="text-brand-accent hover:underline">
                이미지 리사이즈
              </Link>
              {" · "}
              <Link href="/blog/sns-image-size" className="text-brand-accent hover:underline">
                SNS별 크기 총정리
              </Link>
            </p>

            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">
              3. 확장자를 바꿔야 할 때 — 포맷 변환
            </h2>
            <p className="text-brand-mid leading-relaxed mb-4">
              PNG를 JPG로, 또는 웹용 WebP로. 투명 배경 처리도 함께 됩니다.
              아이폰 HEIC 사진은 전용 변환을 쓰면 편합니다.
            </p>
            <p className="text-brand-mid leading-relaxed mb-6">
              →{" "}
              <Link href="/tools/image/convert" className="text-brand-accent hover:underline">
                포맷 변환
              </Link>
              {" · "}
              <Link href="/tools/image/heic-to-jpg" className="text-brand-accent hover:underline">
                HEIC → JPG
              </Link>
              {" · "}
              <Link href="/blog/png-vs-jpg" className="text-brand-accent hover:underline">
                PNG vs JPG
              </Link>
            </p>

            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">
              4. 필요한 부분만 — 크롭
            </h2>
            <p className="text-brand-mid leading-relaxed mb-4">
              불필요한 여백을 잘라내거나 1:1, 16:9 같은 비율로 맞출 때.
              회전·반전도 함께 됩니다.
            </p>
            <p className="text-brand-mid leading-relaxed mb-6">
              →{" "}
              <Link href="/tools/image/crop" className="text-brand-accent hover:underline">
                이미지 크롭
              </Link>
              {" · "}
              <Link href="/blog/image-crop-guide" className="text-brand-accent hover:underline">
                사진 자르기 가이드
              </Link>
            </p>

            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">
              5. 여러 장을 하나로 — 합치기
            </h2>
            <p className="text-brand-mid leading-relaxed mb-4">
              대화 캡처를 길게 잇거나, 사진을 나란히 비교할 때. 세로·가로로
              한 장에 합칠 수 있습니다.
            </p>
            <p className="text-brand-mid leading-relaxed mb-6">
              →{" "}
              <Link href="/tools/image/merge" className="text-brand-accent hover:underline">
                이미지 합치기
              </Link>
              {" · "}
              <Link href="/blog/image-merge-guide" className="text-brand-accent hover:underline">
                사진 합치기 가이드
              </Link>
            </p>

            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">
              6. 왜 브라우저 도구일까
            </h2>
            <p className="text-brand-mid leading-relaxed mb-4">
              브라우저에서 처리하는 도구는 설치가 없고, 무엇보다 사진이 기기를
              떠나지 않습니다. 가족 사진이나 신분증처럼 민감한 이미지라면 더욱
              중요한 차이입니다.
            </p>
            <p className="text-brand-mid leading-relaxed mb-6">
              →{" "}
              <Link href="/blog/browser-image-tools-privacy" className="text-brand-accent hover:underline">
                서버에 안 올리는 안전한 이미지 도구
              </Link>
            </p>

            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-6">
              자주 묻는 질문
            </h2>
            <div className="space-y-6">
              <div className="border-b border-brand-light/20 pb-6">
                <h3 className="text-lg font-semibold text-brand-black mb-2">
                  Q. 포토샵 없이 사진 편집이 가능한가요?
                </h3>
                <p className="text-brand-mid">
                  압축, 크기 조절, 포맷 변환, 자르기, 합치기 같은 기본 편집은
                  설치 없이 브라우저에서 무료로 됩니다. 전문 합성·리터칭이
                  아니라면 포토샵이 필요 없는 경우가 많습니다.
                </p>
              </div>
              <div className="border-b border-brand-light/20 pb-6">
                <h3 className="text-lg font-semibold text-brand-black mb-2">
                  Q. 무료 온라인 사진 편집은 안전한가요?
                </h3>
                <p className="text-brand-mid">
                  도구에 따라 다릅니다. 파일을 서버에 올리는 도구도 있지만,
                  브라우저에서 직접 처리하는 도구를 쓰면 사진이 기기를 떠나지
                  않아 더 안전합니다.
                </p>
              </div>
              <div className="pb-6">
                <h3 className="text-lg font-semibold text-brand-black mb-2">
                  Q. 설치나 회원가입이 필요한가요?
                </h3>
                <p className="text-brand-mid">
                  브라우저 기반 도구는 설치가 필요 없습니다. floor05의 도구는
                  회원가입 없이 무제한 무료입니다.
                </p>
              </div>
            </div>

            <div className="bg-brand-black rounded-lg p-8 mt-12 text-center">
              <h3 className="text-xl font-bold text-brand-paper mb-3">
                지금 바로 시작하기
              </h3>
              <p className="text-brand-light mb-6">
                필요한 작업을 골라 바로 쓰세요. 모두 무료입니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/tools/image/compress"
                  className="inline-block bg-brand-accent text-brand-white px-6 py-3 rounded-md font-medium hover:bg-brand-accent-light transition-colors"
                >
                  이미지 압축
                </Link>
                <Link
                  href="/tools/image/resize"
                  className="inline-block bg-brand-dark text-brand-paper px-6 py-3 rounded-md font-medium hover:bg-brand-mid transition-colors"
                >
                  이미지 리사이즈
                </Link>
                <Link
                  href="/tools/image/merge"
                  className="inline-block bg-brand-dark text-brand-paper px-6 py-3 rounded-md font-medium hover:bg-brand-mid transition-colors"
                >
                  이미지 합치기
                </Link>
              </div>
            </div>

            <BlogExtras slug="photo-editing-without-photoshop" />
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
