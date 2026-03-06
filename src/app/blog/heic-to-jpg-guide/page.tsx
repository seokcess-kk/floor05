import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export const metadata: Metadata = {
  title: "아이폰 HEIC 사진 JPG 변환 방법 - 가장 쉬운 무료 변환",
  description:
    "아이폰에서 찍은 HEIC 사진을 JPG로 변환하는 가장 쉬운 방법을 소개합니다. 무료 온라인 도구로 1초 만에 변환하세요.",
  keywords: [
    "HEIC JPG 변환",
    "아이폰 사진 변환",
    "HEIC 변환",
    "HEIC to JPG",
    "아이폰 HEIC",
    "HEIC 파일 열기",
    "아이폰 사진 JPG",
  ],
  openGraph: {
    title: "아이폰 HEIC 사진 JPG 변환 방법",
    description:
      "아이폰에서 찍은 HEIC 사진을 JPG로 변환하는 가장 쉬운 방법을 소개합니다.",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "HEIC 파일이란 무엇인가요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "HEIC(High Efficiency Image Container)는 애플이 iOS 11부터 도입한 이미지 포맷입니다. JPG보다 약 50% 작은 용량으로 같은 화질을 제공하지만, 윈도우나 일부 앱에서 지원되지 않는 경우가 있습니다.",
      },
    },
    {
      "@type": "Question",
      name: "HEIC를 JPG로 변환하면 화질이 떨어지나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "고품질(90% 이상)로 변환하면 육안으로 구분할 수 없는 수준입니다. HEIC 자체가 압축 포맷이므로 JPG로 변환해도 화질 손실은 최소화됩니다.",
      },
    },
    {
      "@type": "Question",
      name: "아이폰에서 처음부터 JPG로 저장할 수 있나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "네, 설정 > 카메라 > 포맷에서 '높은 호환성'을 선택하면 처음부터 JPG로 저장됩니다. 단, 저장 용량이 약 2배로 늘어납니다.",
      },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "HEIC 파일을 JPG로 변환하는 방법",
  description: "아이폰 HEIC 사진을 JPG 포맷으로 변환하는 방법",
  step: [
    {
      "@type": "HowToStep",
      name: "HEIC 파일 선택",
      text: "변환할 HEIC 파일을 선택하거나 드래그 앤 드롭합니다.",
    },
    {
      "@type": "HowToStep",
      name: "출력 포맷 선택",
      text: "출력 포맷으로 JPG를 선택합니다.",
    },
    {
      "@type": "HowToStep",
      name: "변환 및 다운로드",
      text: "변환 버튼을 클릭하고 JPG 파일을 다운로드합니다.",
    },
  ],
};

export default function HeicToJpgGuidePage() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-white">
      <Header />

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <main className="flex-1">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* 브레드크럼 */}
          <nav className="mb-8 text-sm text-brand-light">
            <Link href="/blog" className="hover:text-brand-mid">
              블로그
            </Link>
            <span className="mx-2">›</span>
            <span className="text-brand-mid">HEIC JPG 변환</span>
          </nav>

          {/* 제목 */}
          <header className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-brand-black mb-4 leading-tight">
              아이폰 HEIC 사진 JPG 변환 방법
            </h1>
            <p className="text-lg text-brand-mid">
              가장 쉬운 무료 변환 방법을 알려드립니다
            </p>
            <div className="mt-4 flex items-center gap-4 text-sm text-brand-light">
              <time dateTime="2026-03-07">2026-03-07</time>
              <span>·</span>
              <span>3분 읽기</span>
            </div>
          </header>

          {/* 본문 */}
          <div className="prose prose-lg max-w-none">
            {/* 도입 */}
            <p className="text-brand-mid text-lg leading-relaxed mb-8">
              아이폰으로 찍은 사진을 컴퓨터로 옮겼는데 열리지 않나요?
              아마 HEIC 포맷 때문일 겁니다. 이 글에서는 HEIC 파일을 JPG로
              변환하는 가장 쉬운 방법을 알려드립니다.
            </p>

            {/* CTA 박스 */}
            <div className="bg-brand-paper rounded-lg p-6 mb-10 border border-brand-light/20">
              <p className="font-medium text-brand-black mb-3">
                💡 바로 변환하고 싶다면?
              </p>
              <p className="text-brand-mid text-sm mb-4">
                파일이 서버로 전송되지 않는 무료 HEIC 변환 도구를 사용해보세요.
              </p>
              <Link
                href="/tools/image/heic-to-jpg"
                className="inline-block bg-brand-accent text-brand-white px-4 py-2 rounded-md text-sm font-medium hover:bg-brand-accent-light transition-colors"
              >
                HEIC → JPG 변환 도구 사용하기 →
              </Link>
            </div>

            {/* 섹션 1 */}
            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">
              HEIC 파일이란?
            </h2>
            <p className="text-brand-mid leading-relaxed mb-4">
              HEIC(High Efficiency Image Container)는 애플이 iOS 11(2017년)부터
              도입한 이미지 포맷입니다. JPG보다 약 50% 작은 용량으로 같은 화질을
              제공합니다.
            </p>
            <p className="text-brand-mid leading-relaxed mb-6">
              문제는 윈도우, 안드로이드, 일부 웹사이트에서 HEIC를 지원하지 않는다는
              것입니다. 그래서 다른 기기나 서비스에서 사용하려면 JPG로 변환해야 합니다.
            </p>

            {/* 섹션 2 */}
            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">
              HEIC를 JPG로 변환하는 방법
            </h2>

            <h3 className="text-xl font-semibold text-brand-black mt-8 mb-3">
              방법 1: 온라인 변환 도구 (가장 쉬움)
            </h3>
            <p className="text-brand-mid leading-relaxed mb-4">
              가장 빠르고 쉬운 방법입니다. 프로그램 설치 없이 웹브라우저에서
              바로 변환할 수 있습니다.
            </p>
            <ol className="list-decimal list-inside text-brand-mid space-y-2 mb-6">
              <li>HEIC 변환 도구 페이지 접속</li>
              <li>HEIC 파일 드래그 앤 드롭 (또는 클릭해서 선택)</li>
              <li>자동 변환 후 JPG 다운로드</li>
            </ol>

            <h3 className="text-xl font-semibold text-brand-black mt-8 mb-3">
              방법 2: 아이폰 설정 변경 (예방)
            </h3>
            <p className="text-brand-mid leading-relaxed mb-4">
              처음부터 JPG로 저장하도록 설정을 변경할 수 있습니다:
            </p>
            <ol className="list-decimal list-inside text-brand-mid space-y-2 mb-6">
              <li>설정 앱 열기</li>
              <li>카메라 선택</li>
              <li>포맷 선택</li>
              <li>&quot;높은 호환성&quot; 선택</li>
            </ol>
            <p className="text-brand-light text-sm mb-6">
              ※ 단, 저장 용량이 약 2배로 늘어납니다.
            </p>

            <h3 className="text-xl font-semibold text-brand-black mt-8 mb-3">
              방법 3: 맥에서 내보내기
            </h3>
            <p className="text-brand-mid leading-relaxed mb-4">
              맥 사용자라면 미리보기 앱에서 간단히 변환할 수 있습니다:
            </p>
            <ol className="list-decimal list-inside text-brand-mid space-y-2 mb-6">
              <li>HEIC 파일을 미리보기로 열기</li>
              <li>파일 → 내보내기 선택</li>
              <li>포맷을 JPEG로 변경</li>
              <li>저장</li>
            </ol>

            {/* FAQ 섹션 */}
            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-6">
              자주 묻는 질문
            </h2>

            <div className="space-y-6">
              <div className="border-b border-brand-light/20 pb-6">
                <h3 className="text-lg font-semibold text-brand-black mb-2">
                  Q. HEIC를 JPG로 변환하면 화질이 떨어지나요?
                </h3>
                <p className="text-brand-mid">
                  고품질(90% 이상)로 변환하면 육안으로 구분할 수 없는 수준입니다.
                  HEIC 자체가 압축 포맷이므로 JPG로 변환해도 화질 손실은
                  최소화됩니다.
                </p>
              </div>

              <div className="border-b border-brand-light/20 pb-6">
                <h3 className="text-lg font-semibold text-brand-black mb-2">
                  Q. 여러 장을 한꺼번에 변환할 수 있나요?
                </h3>
                <p className="text-brand-mid">
                  네, floor05 HEIC 변환 도구는 여러 장을 한꺼번에 변환할 수
                  있습니다. 변환된 파일들은 ZIP으로 묶어서 다운로드할 수 있습니다.
                </p>
              </div>

              <div className="pb-6">
                <h3 className="text-lg font-semibold text-brand-black mb-2">
                  Q. 온라인 변환 시 개인정보가 유출되나요?
                </h3>
                <p className="text-brand-mid">
                  대부분의 온라인 도구는 서버에 파일을 업로드합니다.
                  floor05는 브라우저에서 직접 변환하므로 파일이 서버로
                  전송되지 않습니다.
                </p>
              </div>
            </div>

            {/* 마무리 CTA */}
            <div className="bg-brand-black rounded-lg p-8 mt-12 text-center">
              <h3 className="text-xl font-bold text-brand-paper mb-3">
                지금 바로 HEIC 변환하기
              </h3>
              <p className="text-brand-light mb-6">
                회원가입 없이 무료로 사용할 수 있습니다.
                <br />
                파일이 서버로 전송되지 않아 안전합니다.
              </p>
              <Link
                href="/tools/image/heic-to-jpg"
                className="inline-block bg-brand-accent text-brand-white px-6 py-3 rounded-md font-medium hover:bg-brand-accent-light transition-colors"
              >
                HEIC → JPG 변환 도구 사용하기
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
