import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export const metadata: Metadata = {
  title: "이미지 용량 줄이기 방법 총정리 - 화질 손실 없이 사진 크기 줄이는 법",
  description:
    "사진 용량이 너무 클 때 화질 손실 없이 이미지 크기를 줄이는 모든 방법을 알려드립니다. 온라인 무료 도구부터 설정 팁까지.",
  keywords: [
    "이미지 용량 줄이기",
    "사진 용량 줄이기",
    "이미지 압축",
    "사진 압축",
    "이미지 크기 줄이기",
    "화질 손실 없이 압축",
    "JPG 압축",
    "PNG 압축",
  ],
  openGraph: {
    title: "이미지 용량 줄이기 방법 총정리",
    description:
      "화질 손실 없이 사진 크기를 줄이는 모든 방법을 알려드립니다.",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "이미지 용량을 줄이면 화질이 떨어지나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "적절한 압축률(70-85%)을 사용하면 육안으로 구분하기 어려운 수준의 화질 저하만 발생합니다. 무손실 압축 옵션을 사용하면 화질 저하 없이 용량만 줄일 수도 있습니다.",
      },
    },
    {
      "@type": "Question",
      name: "어떤 이미지 포맷이 용량이 가장 작나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "일반적으로 WebP가 가장 효율적입니다. 같은 화질 기준으로 JPG보다 25-35% 작은 용량을 제공합니다. 사진은 JPG, 투명 배경이 필요하면 PNG, 웹용이면 WebP를 추천합니다.",
      },
    },
    {
      "@type": "Question",
      name: "온라인에서 이미지 압축하면 개인정보가 유출되나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "대부분의 온라인 압축 도구는 서버에 파일을 업로드합니다. 개인정보가 걱정된다면 브라우저에서 직접 처리하는 도구(예: floor05)를 사용하세요. 파일이 서버로 전송되지 않습니다.",
      },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "이미지 용량 줄이는 방법",
  description: "화질 손실을 최소화하면서 이미지 파일 크기를 줄이는 방법",
  step: [
    {
      "@type": "HowToStep",
      name: "이미지 업로드",
      text: "압축할 이미지 파일을 선택하거나 드래그 앤 드롭합니다.",
    },
    {
      "@type": "HowToStep",
      name: "품질 설정",
      text: "슬라이더로 압축 품질을 조절합니다. 80% 정도가 화질과 용량의 균형점입니다.",
    },
    {
      "@type": "HowToStep",
      name: "압축 결과 확인",
      text: "Before/After 비교로 화질 차이를 확인합니다.",
    },
    {
      "@type": "HowToStep",
      name: "다운로드",
      text: "압축된 이미지를 다운로드합니다.",
    },
  ],
};

export default function ImageCompressionGuidePage() {
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
            <span className="text-brand-mid">이미지 용량 줄이기</span>
          </nav>

          {/* 제목 */}
          <header className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-brand-black mb-4 leading-tight">
              이미지 용량 줄이기 방법 총정리
            </h1>
            <p className="text-lg text-brand-mid">
              화질 손실 없이 사진 크기를 줄이는 모든 방법
            </p>
            <div className="mt-4 flex items-center gap-4 text-sm text-brand-light">
              <time dateTime="2026-03-07">2026-03-07</time>
              <span>·</span>
              <span>5분 읽기</span>
            </div>
          </header>

          {/* 본문 */}
          <div className="prose prose-lg max-w-none">
            {/* 도입 */}
            <p className="text-brand-mid text-lg leading-relaxed mb-8">
              이메일 첨부 용량 초과, 카카오톡 전송 실패, 웹사이트 업로드 거부...
              사진 용량 때문에 곤란했던 적 있으신가요? 이 글에서는 이미지 용량을
              줄이는 모든 방법을 정리해드립니다.
            </p>

            {/* CTA 박스 */}
            <div className="bg-brand-paper rounded-lg p-6 mb-10 border border-brand-light/20">
              <p className="font-medium text-brand-black mb-3">
                💡 바로 압축하고 싶다면?
              </p>
              <p className="text-brand-mid text-sm mb-4">
                파일이 서버로 전송되지 않는 무료 이미지 압축 도구를 사용해보세요.
              </p>
              <Link
                href="/tools/image/compress"
                className="inline-block bg-brand-accent text-brand-white px-4 py-2 rounded-md text-sm font-medium hover:bg-brand-accent-light transition-colors"
              >
                이미지 압축 도구 사용하기 →
              </Link>
            </div>

            {/* 섹션 1 */}
            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">
              1. 이미지 용량이 큰 이유
            </h2>
            <p className="text-brand-mid leading-relaxed mb-4">
              이미지 용량은 크게 세 가지 요소에 의해 결정됩니다:
            </p>
            <ul className="list-disc list-inside text-brand-mid space-y-2 mb-6">
              <li>
                <strong>해상도</strong>: 픽셀 수가 많을수록 용량이 커집니다
              </li>
              <li>
                <strong>색상 깊이</strong>: 색상 정보가 많을수록 용량이 커집니다
              </li>
              <li>
                <strong>포맷</strong>: PNG는 JPG보다 2-3배 큰 경우가 많습니다
              </li>
            </ul>

            {/* 섹션 2 */}
            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">
              2. 용량 줄이는 방법 3가지
            </h2>

            <h3 className="text-xl font-semibold text-brand-black mt-8 mb-3">
              방법 1: 압축하기 (가장 쉬움)
            </h3>
            <p className="text-brand-mid leading-relaxed mb-4">
              이미지 압축은 가장 간단한 방법입니다. 품질을 70-85%로 설정하면
              육안으로 구분하기 어려운 수준의 화질 저하만 발생하면서 용량은
              절반 이하로 줄어듭니다.
            </p>

            <h3 className="text-xl font-semibold text-brand-black mt-8 mb-3">
              방법 2: 리사이즈하기
            </h3>
            <p className="text-brand-mid leading-relaxed mb-4">
              4000x3000 픽셀 사진을 2000x1500으로 줄이면 용량이 1/4로 줄어듭니다.
              용도에 맞는 해상도로 조정하세요:
            </p>
            <ul className="list-disc list-inside text-brand-mid space-y-2 mb-6">
              <li>카카오톡/메신저: 1280px이면 충분</li>
              <li>인스타그램: 1080px 권장</li>
              <li>웹사이트: 1920px 이하 권장</li>
            </ul>

            <h3 className="text-xl font-semibold text-brand-black mt-8 mb-3">
              방법 3: 포맷 변환하기
            </h3>
            <p className="text-brand-mid leading-relaxed mb-4">
              PNG를 JPG로 변환하면 용량이 크게 줄어듭니다. 투명 배경이 필요 없다면
              JPG를 사용하세요. 웹용이라면 WebP가 가장 효율적입니다.
            </p>

            {/* FAQ 섹션 */}
            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-6">
              자주 묻는 질문
            </h2>

            <div className="space-y-6">
              <div className="border-b border-brand-light/20 pb-6">
                <h3 className="text-lg font-semibold text-brand-black mb-2">
                  Q. 이미지 용량을 줄이면 화질이 떨어지나요?
                </h3>
                <p className="text-brand-mid">
                  적절한 압축률(70-85%)을 사용하면 육안으로 구분하기 어려운
                  수준의 화질 저하만 발생합니다. 무손실 압축 옵션을 사용하면
                  화질 저하 없이 용량만 줄일 수도 있습니다.
                </p>
              </div>

              <div className="border-b border-brand-light/20 pb-6">
                <h3 className="text-lg font-semibold text-brand-black mb-2">
                  Q. 어떤 이미지 포맷이 용량이 가장 작나요?
                </h3>
                <p className="text-brand-mid">
                  일반적으로 WebP가 가장 효율적입니다. 같은 화질 기준으로
                  JPG보다 25-35% 작은 용량을 제공합니다. 사진은 JPG, 투명 배경이
                  필요하면 PNG, 웹용이면 WebP를 추천합니다.
                </p>
              </div>

              <div className="pb-6">
                <h3 className="text-lg font-semibold text-brand-black mb-2">
                  Q. 온라인에서 이미지 압축하면 개인정보가 유출되나요?
                </h3>
                <p className="text-brand-mid">
                  대부분의 온라인 압축 도구는 서버에 파일을 업로드합니다.
                  개인정보가 걱정된다면 브라우저에서 직접 처리하는 도구를
                  사용하세요. floor05는 파일이 서버로 전송되지 않습니다.
                </p>
              </div>
            </div>

            {/* 마무리 CTA */}
            <div className="bg-brand-black rounded-lg p-8 mt-12 text-center">
              <h3 className="text-xl font-bold text-brand-paper mb-3">
                지금 바로 이미지 용량 줄이기
              </h3>
              <p className="text-brand-light mb-6">
                회원가입 없이 무료로 사용할 수 있습니다.
                <br />
                파일이 서버로 전송되지 않아 안전합니다.
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
                  href="/tools/image/convert"
                  className="inline-block bg-brand-dark text-brand-paper px-6 py-3 rounded-md font-medium hover:bg-brand-mid transition-colors"
                >
                  포맷 변환
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
