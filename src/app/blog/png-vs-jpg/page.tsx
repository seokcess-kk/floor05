import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export const metadata: Metadata = {
  title: "PNG vs JPG 차이점 - 언제 어떤 포맷을 써야 할까?",
  description:
    "PNG와 JPG의 차이점을 알기 쉽게 설명합니다. 투명 배경, 용량, 화질 비교와 상황별 추천 포맷, 무료 변환 방법까지.",
  keywords: [
    "PNG JPG 차이",
    "PNG vs JPG",
    "이미지 포맷",
    "PNG JPG 변환",
    "투명 배경",
    "이미지 확장자",
    "사진 포맷 비교",
  ],
  openGraph: {
    title: "PNG vs JPG 차이점 - 언제 어떤 포맷을 써야 할까?",
    description:
      "PNG와 JPG의 차이점, 투명 배경, 용량 비교와 상황별 추천 포맷",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "PNG와 JPG의 가장 큰 차이점은 무엇인가요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "가장 큰 차이점은 투명 배경 지원 여부입니다. PNG는 투명 배경을 지원하고, JPG는 지원하지 않습니다. 또한 PNG는 무손실 압축, JPG는 손실 압축을 사용합니다.",
      },
    },
    {
      "@type": "Question",
      name: "사진은 PNG와 JPG 중 무엇으로 저장해야 하나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "일반 사진은 JPG를 권장합니다. JPG는 사진에 최적화된 압축 방식으로, PNG 대비 용량이 5~10배 작으면서 화질 차이는 거의 없습니다.",
      },
    },
    {
      "@type": "Question",
      name: "로고는 PNG와 JPG 중 무엇으로 저장해야 하나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "로고는 PNG를 권장합니다. 투명 배경이 필요하고, 글자나 도형의 경계가 선명해야 하기 때문입니다. JPG로 저장하면 경계가 뭉개질 수 있습니다.",
      },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "PNG를 JPG로 변환하는 방법",
  description: "PNG 이미지를 JPG 포맷으로 변환하는 방법",
  step: [
    {
      "@type": "HowToStep",
      name: "이미지 업로드",
      text: "변환할 PNG 파일을 선택하거나 드래그합니다.",
    },
    {
      "@type": "HowToStep",
      name: "출력 포맷 선택",
      text: "출력 포맷으로 JPG를 선택합니다.",
    },
    {
      "@type": "HowToStep",
      name: "배경색 선택",
      text: "투명 배경이 있으면 대체할 배경색(흰색/검정)을 선택합니다.",
    },
    {
      "@type": "HowToStep",
      name: "변환 및 다운로드",
      text: "변환 버튼을 클릭하고 JPG 파일을 다운로드합니다.",
    },
  ],
};

export default function PngVsJpgPage() {
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
            <span className="text-brand-mid">PNG vs JPG</span>
          </nav>

          {/* 제목 */}
          <header className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-brand-black mb-4 leading-tight">
              PNG vs JPG 차이점
            </h1>
            <p className="text-lg text-brand-mid">
              언제 어떤 포맷을 써야 할까?
            </p>
            <div className="mt-4 flex items-center gap-4 text-sm text-brand-light">
              <time dateTime="2026-03-10">2026-03-10</time>
              <span>·</span>
              <span>5분 읽기</span>
            </div>
          </header>

          {/* 본문 */}
          <div className="prose prose-lg max-w-none">
            {/* 도입 */}
            <p className="text-brand-mid text-lg leading-relaxed mb-8">
              이미지를 저장할 때 PNG로 할지 JPG로 할지 고민되시나요?
              두 포맷은 각각 장단점이 있어서 상황에 따라 선택해야 합니다.
              이 글에서 차이점과 선택 기준을 명확하게 알려드립니다.
            </p>

            {/* CTA 박스 */}
            <div className="bg-brand-paper rounded-lg p-6 mb-10 border border-brand-light/20">
              <p className="font-medium text-brand-black mb-3">
                💡 바로 변환하고 싶다면?
              </p>
              <p className="text-brand-mid text-sm mb-4">
                PNG↔JPG 변환을 무료로 할 수 있습니다. 파일이 서버로 전송되지 않아요.
              </p>
              <Link
                href="/tools/image/convert"
                className="inline-block bg-brand-accent text-brand-white px-4 py-2 rounded-md text-sm font-medium hover:bg-brand-accent-light transition-colors"
              >
                포맷 변환 도구 →
              </Link>
            </div>

            {/* 핵심 차이 */}
            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">
              1. 핵심 차이점 한눈에 보기
            </h2>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-brand-light/30">
                    <th className="text-left py-3 px-4 text-brand-black font-semibold">항목</th>
                    <th className="text-left py-3 px-4 text-brand-black font-semibold">PNG</th>
                    <th className="text-left py-3 px-4 text-brand-black font-semibold">JPG</th>
                  </tr>
                </thead>
                <tbody className="text-brand-mid">
                  <tr className="border-b border-brand-light/20">
                    <td className="py-3 px-4 font-medium">투명 배경</td>
                    <td className="py-3 px-4 text-green-600">✓ 지원</td>
                    <td className="py-3 px-4 text-red-500">✗ 미지원</td>
                  </tr>
                  <tr className="border-b border-brand-light/20">
                    <td className="py-3 px-4 font-medium">압축 방식</td>
                    <td className="py-3 px-4">무손실</td>
                    <td className="py-3 px-4">손실</td>
                  </tr>
                  <tr className="border-b border-brand-light/20">
                    <td className="py-3 px-4 font-medium">파일 크기</td>
                    <td className="py-3 px-4 text-red-500">큼</td>
                    <td className="py-3 px-4 text-green-600">작음</td>
                  </tr>
                  <tr className="border-b border-brand-light/20">
                    <td className="py-3 px-4 font-medium">화질</td>
                    <td className="py-3 px-4">원본 유지</td>
                    <td className="py-3 px-4">약간 손실</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">적합한 용도</td>
                    <td className="py-3 px-4">로고, 아이콘, 그래픽</td>
                    <td className="py-3 px-4">사진, 복잡한 이미지</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 투명 배경 */}
            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">
              2. 투명 배경이 필요하면 PNG
            </h2>
            <p className="text-brand-mid leading-relaxed mb-4">
              PNG의 가장 큰 장점은 <strong>투명 배경(알파 채널)</strong>을 지원한다는 것입니다.
            </p>
            <ul className="list-disc list-inside text-brand-mid space-y-2 mb-6">
              <li>로고를 다양한 배경 위에 올려야 할 때</li>
              <li>스티커나 아이콘을 만들 때</li>
              <li>웹사이트에서 배경과 자연스럽게 합성해야 할 때</li>
            </ul>
            <p className="text-brand-mid leading-relaxed mb-6">
              JPG는 투명을 지원하지 않아서, 투명한 영역이 흰색이나 검정색으로 채워집니다.
            </p>

            {/* 용량 */}
            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">
              3. 용량이 중요하면 JPG
            </h2>
            <p className="text-brand-mid leading-relaxed mb-4">
              같은 사진을 저장하면 PNG가 JPG보다 <strong>5~10배 더 큽니다</strong>.
            </p>
            <div className="bg-brand-paper rounded-lg p-4 mb-6">
              <p className="font-mono text-sm text-brand-mid">
                예시: 1920×1080 사진<br />
                → PNG: 약 5MB<br />
                → JPG (80%): 약 500KB
              </p>
            </div>
            <p className="text-brand-mid leading-relaxed mb-6">
              웹사이트 로딩 속도, 이메일 첨부, 저장 공간이 중요하다면 JPG를 선택하세요.
            </p>

            {/* 화질 */}
            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">
              4. 화질 비교
            </h2>
            <p className="text-brand-mid leading-relaxed mb-4">
              PNG는 <strong>무손실 압축</strong>이라 원본 화질이 그대로 유지됩니다.
              JPG는 <strong>손실 압축</strong>이라 저장할 때마다 조금씩 화질이 떨어집니다.
            </p>
            <p className="text-brand-mid leading-relaxed mb-6">
              하지만 JPG 품질을 80% 이상으로 설정하면 <strong>육안으로 차이를 구분하기 어렵습니다</strong>.
              사진의 경우 대부분 JPG로 충분합니다.
            </p>

            {/* 선택 가이드 */}
            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">
              5. 상황별 추천 포맷
            </h2>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3 p-4 bg-brand-paper rounded-lg">
                <span className="text-xl">📷</span>
                <div>
                  <p className="font-medium text-brand-black">사진, 풍경, 인물</p>
                  <p className="text-sm text-brand-mid">→ JPG (용량 작고 화질 충분)</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-brand-paper rounded-lg">
                <span className="text-xl">🎨</span>
                <div>
                  <p className="font-medium text-brand-black">로고, 아이콘</p>
                  <p className="text-sm text-brand-mid">→ PNG (투명 배경 + 선명한 경계)</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-brand-paper rounded-lg">
                <span className="text-xl">📊</span>
                <div>
                  <p className="font-medium text-brand-black">스크린샷, 텍스트 이미지</p>
                  <p className="text-sm text-brand-mid">→ PNG (글자가 뭉개지지 않음)</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-brand-paper rounded-lg">
                <span className="text-xl">🌐</span>
                <div>
                  <p className="font-medium text-brand-black">웹사이트 이미지</p>
                  <p className="text-sm text-brand-mid">→ WebP (PNG/JPG보다 30% 작음)</p>
                </div>
              </div>
            </div>

            {/* FAQ 섹션 */}
            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-6">
              자주 묻는 질문
            </h2>

            <div className="space-y-6">
              <div className="border-b border-brand-light/20 pb-6">
                <h3 className="text-lg font-semibold text-brand-black mb-2">
                  Q. PNG를 JPG로 변환하면 화질이 떨어지나요?
                </h3>
                <p className="text-brand-mid">
                  품질 80% 이상으로 변환하면 육안으로 차이를 느끼기 어렵습니다.
                  용량은 크게 줄어들고 화질 손실은 최소화됩니다.
                </p>
              </div>

              <div className="border-b border-brand-light/20 pb-6">
                <h3 className="text-lg font-semibold text-brand-black mb-2">
                  Q. PNG의 투명 배경을 JPG로 변환하면 어떻게 되나요?
                </h3>
                <p className="text-brand-mid">
                  투명한 영역이 단색 배경으로 채워집니다.
                  floor05 변환 도구에서 흰색 또는 검정색 배경을 선택할 수 있습니다.
                </p>
              </div>

              <div className="pb-6">
                <h3 className="text-lg font-semibold text-brand-black mb-2">
                  Q. WebP는 PNG, JPG보다 좋은가요?
                </h3>
                <p className="text-brand-mid">
                  WebP는 PNG와 JPG의 장점을 합친 포맷입니다.
                  투명 배경도 지원하고 용량도 30% 더 작습니다.
                  단, 일부 오래된 프로그램에서 지원하지 않을 수 있습니다.
                </p>
              </div>
            </div>

            {/* 마무리 CTA */}
            <div className="bg-brand-black rounded-lg p-8 mt-12 text-center">
              <h3 className="text-xl font-bold text-brand-paper mb-3">
                PNG ↔ JPG 무료 변환
              </h3>
              <p className="text-brand-light mb-6">
                회원가입 없이 바로 변환할 수 있습니다.
                <br />
                파일이 서버로 전송되지 않아 안전합니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/tools/image/convert"
                  className="inline-block bg-brand-accent text-brand-white px-6 py-3 rounded-md font-medium hover:bg-brand-accent-light transition-colors"
                >
                  포맷 변환 도구
                </Link>
                <Link
                  href="/tools/image/compress"
                  className="inline-block bg-brand-dark text-brand-paper px-6 py-3 rounded-md font-medium hover:bg-brand-mid transition-colors"
                >
                  이미지 압축
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
