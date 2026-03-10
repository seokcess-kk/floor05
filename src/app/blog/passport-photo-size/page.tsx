import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export const metadata: Metadata = {
  title: "증명사진 용량 줄이기 - 200KB, 500KB 맞추는 방법",
  description:
    "취업사이트, 원서접수에 필요한 증명사진 용량 제한 맞추는 방법. 화질 손실 없이 200KB, 500KB로 줄이는 무료 도구.",
  keywords: [
    "증명사진 용량 줄이기",
    "증명사진 kb 줄이기",
    "증명사진 200kb",
    "증명사진 500kb",
    "취업 증명사진 용량",
    "원서 사진 용량",
    "사진 용량 줄이기",
  ],
  openGraph: {
    title: "증명사진 용량 줄이기 - 200KB, 500KB 맞추는 방법",
    description: "취업사이트, 원서접수용 증명사진 용량을 화질 손실 없이 줄이는 방법",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "증명사진 용량을 200KB로 줄이려면 어떻게 하나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "floor05 이미지 압축 도구에서 목표 용량을 200KB로 설정하고 변환하면 됩니다. 자동으로 최적의 품질을 찾아 화질 손실을 최소화합니다.",
      },
    },
    {
      "@type": "Question",
      name: "증명사진 크기 규격은 어떻게 되나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "일반 증명사진은 3×4cm(354×472px), 여권사진은 3.5×4.5cm(413×531px), 비자/영주권은 5×5cm(600×600px)입니다. 취업사이트마다 다를 수 있으니 공고를 확인하세요.",
      },
    },
    {
      "@type": "Question",
      name: "용량을 줄이면 화질이 많이 떨어지나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "증명사진처럼 작은 이미지는 200~500KB로 줄여도 화질 차이가 거의 느껴지지 않습니다. 스마트폰으로 촬영한 원본이 수 MB라면 충분히 줄일 수 있습니다.",
      },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "증명사진 용량 줄이기",
  description: "증명사진 파일 용량을 원하는 크기로 줄이는 방법",
  step: [
    {
      "@type": "HowToStep",
      name: "이미지 압축 도구 열기",
      text: "floor05 이미지 압축 도구 페이지에 접속합니다.",
    },
    {
      "@type": "HowToStep",
      name: "증명사진 업로드",
      text: "증명사진 파일을 드래그하거나 클릭해서 업로드합니다.",
    },
    {
      "@type": "HowToStep",
      name: "목표 용량 설정",
      text: "목표 용량(예: 200KB, 500KB)을 입력합니다.",
    },
    {
      "@type": "HowToStep",
      name: "압축 및 다운로드",
      text: "압축 버튼을 클릭하고 완료되면 다운로드합니다.",
    },
  ],
};

export default function PassportPhotoSizePage() {
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
            <span className="text-brand-mid">증명사진 용량 줄이기</span>
          </nav>

          {/* 제목 */}
          <header className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-brand-black mb-4 leading-tight">
              증명사진 용량 줄이기
            </h1>
            <p className="text-lg text-brand-mid">
              200KB, 500KB 용량 제한 맞추는 가장 쉬운 방법
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
              취업사이트에 원서를 넣으려는데 &quot;사진 용량이 500KB를 초과합니다&quot;라는
              메시지가 떴나요? 사진관에서 받은 증명사진은 보통 2~5MB라
              그대로는 올릴 수 없습니다. 화질 손상 없이 용량만 줄이는 방법을 알려드립니다.
            </p>

            {/* CTA 박스 */}
            <div className="bg-brand-paper rounded-lg p-6 mb-10 border border-brand-light/20">
              <p className="font-medium text-brand-black mb-3">
                💡 지금 바로 줄이고 싶다면?
              </p>
              <p className="text-brand-mid text-sm mb-4">
                목표 용량을 입력하면 자동으로 맞춰드립니다. 브라우저에서 바로 처리.
              </p>
              <Link
                href="/tools/image/compress"
                className="inline-block bg-brand-accent text-brand-white px-4 py-2 rounded-md text-sm font-medium hover:bg-brand-accent-light transition-colors"
              >
                이미지 압축 도구 →
              </Link>
            </div>

            {/* 용량 제한 안내 */}
            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">
              1. 사이트별 증명사진 용량 제한
            </h2>
            <p className="text-brand-mid leading-relaxed mb-4">
              각 사이트마다 요구하는 용량 제한이 다릅니다. 대표적인 예시:
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-brand-light/30">
                    <th className="text-left py-3 px-4 text-brand-black font-semibold">사이트</th>
                    <th className="text-left py-3 px-4 text-brand-black font-semibold">용량 제한</th>
                    <th className="text-left py-3 px-4 text-brand-black font-semibold">크기 제한</th>
                  </tr>
                </thead>
                <tbody className="text-brand-mid">
                  <tr className="border-b border-brand-light/20">
                    <td className="py-3 px-4">사람인/잡코리아</td>
                    <td className="py-3 px-4 font-mono">500KB 이하</td>
                    <td className="py-3 px-4">3×4cm</td>
                  </tr>
                  <tr className="border-b border-brand-light/20">
                    <td className="py-3 px-4">공무원 원서접수</td>
                    <td className="py-3 px-4 font-mono">200KB 이하</td>
                    <td className="py-3 px-4">3×4cm (100~200px)</td>
                  </tr>
                  <tr className="border-b border-brand-light/20">
                    <td className="py-3 px-4">대학 원서접수</td>
                    <td className="py-3 px-4 font-mono">300~500KB</td>
                    <td className="py-3 px-4">3×4cm</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">여권 신청</td>
                    <td className="py-3 px-4 font-mono">500KB 이하</td>
                    <td className="py-3 px-4">3.5×4.5cm</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-brand-light text-sm mb-6">
              ※ 정확한 규격은 각 사이트 공고를 확인하세요.
            </p>

            {/* 줄이는 방법 */}
            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">
              2. 증명사진 용량 줄이는 방법
            </h2>

            <h3 className="text-lg font-semibold text-brand-black mt-6 mb-3">
              방법 1: 목표 용량 설정 (추천)
            </h3>
            <p className="text-brand-mid leading-relaxed mb-4">
              floor05 압축 도구에서 <strong>목표 용량</strong>을 직접 입력하면
              해당 용량에 맞게 자동으로 압축됩니다. 예를 들어 &quot;200KB&quot;를 입력하면
              200KB 이하로 정확하게 맞춰집니다.
            </p>
            <ol className="list-decimal list-inside text-brand-mid space-y-2 mb-6">
              <li>이미지 압축 도구에서 증명사진 업로드</li>
              <li>&quot;목표 용량&quot; 옵션 활성화</li>
              <li>원하는 용량(예: 200KB) 입력</li>
              <li>압축 버튼 클릭 → 다운로드</li>
            </ol>

            <h3 className="text-lg font-semibold text-brand-black mt-6 mb-3">
              방법 2: 품질 조절
            </h3>
            <p className="text-brand-mid leading-relaxed mb-6">
              품질 슬라이더로 80% → 70% → 60% 순으로 낮춰가며
              원하는 용량이 나올 때까지 조절합니다.
              증명사진은 70% 정도에서도 충분히 깨끗합니다.
            </p>

            {/* 화질 손상 최소화 */}
            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">
              3. 화질 손상 없이 줄이는 팁
            </h2>
            <ul className="list-disc list-inside text-brand-mid space-y-2 mb-6">
              <li>
                <strong>원본 해상도가 너무 크다면?</strong> — 먼저 크기(px)를 줄이세요.
                3×4cm 증명사진은 354×472px면 충분합니다.
              </li>
              <li>
                <strong>JPG로 저장</strong> — PNG보다 용량이 훨씬 작습니다.
                증명사진은 투명 배경이 필요 없으니 JPG가 적합합니다.
              </li>
              <li>
                <strong>불필요한 여백 제거</strong> — 크롭 도구로 얼굴 중심으로
                잘라내면 같은 화질에서도 용량이 줄어듭니다.
              </li>
            </ul>

            {/* 증명사진 크기 규격 */}
            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">
              4. 증명사진 크기 규격 정리
            </h2>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-brand-light/30">
                    <th className="text-left py-3 px-4 text-brand-black font-semibold">용도</th>
                    <th className="text-left py-3 px-4 text-brand-black font-semibold">실물 크기</th>
                    <th className="text-left py-3 px-4 text-brand-black font-semibold">픽셀 (300dpi)</th>
                  </tr>
                </thead>
                <tbody className="text-brand-mid">
                  <tr className="border-b border-brand-light/20">
                    <td className="py-3 px-4">일반 증명사진</td>
                    <td className="py-3 px-4">3 × 4 cm</td>
                    <td className="py-3 px-4 font-mono">354 × 472 px</td>
                  </tr>
                  <tr className="border-b border-brand-light/20">
                    <td className="py-3 px-4">여권사진</td>
                    <td className="py-3 px-4">3.5 × 4.5 cm</td>
                    <td className="py-3 px-4 font-mono">413 × 531 px</td>
                  </tr>
                  <tr className="border-b border-brand-light/20">
                    <td className="py-3 px-4">비자/영주권</td>
                    <td className="py-3 px-4">5 × 5 cm</td>
                    <td className="py-3 px-4 font-mono">600 × 600 px</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">운전면허</td>
                    <td className="py-3 px-4">3 × 4 cm</td>
                    <td className="py-3 px-4 font-mono">354 × 472 px</td>
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
                  Q. 스마트폰으로 찍은 셀카도 사용할 수 있나요?
                </h3>
                <p className="text-brand-mid">
                  네, 배경이 단색이고 얼굴이 정면이라면 가능합니다.
                  크롭 도구로 3:4 비율로 자른 뒤 용량을 줄이면 됩니다.
                  단, 공식 서류용은 사진관에서 찍는 것이 안전합니다.
                </p>
              </div>

              <div className="border-b border-brand-light/20 pb-6">
                <h3 className="text-lg font-semibold text-brand-black mb-2">
                  Q. 여러 장을 한 번에 줄일 수 있나요?
                </h3>
                <p className="text-brand-mid">
                  네, floor05 압축 도구는 여러 장을 동시에 처리할 수 있습니다.
                  같은 설정으로 일괄 압축 후 ZIP으로 다운로드하세요.
                </p>
              </div>

              <div className="pb-6">
                <h3 className="text-lg font-semibold text-brand-black mb-2">
                  Q. 파일이 서버로 업로드되나요?
                </h3>
                <p className="text-brand-mid">
                  아니요. floor05는 브라우저에서 직접 처리하므로
                  <strong> 증명사진이 서버로 전송되지 않습니다.</strong>
                  개인정보가 담긴 사진도 안심하고 사용하세요.
                </p>
              </div>
            </div>

            {/* 마무리 CTA */}
            <div className="bg-brand-black rounded-lg p-8 mt-12 text-center">
              <h3 className="text-xl font-bold text-brand-paper mb-3">
                증명사진 용량 줄이기
              </h3>
              <p className="text-brand-light mb-6">
                목표 용량만 입력하면 자동으로 맞춰드립니다.
                <br />
                파일이 서버로 전송되지 않아 안전합니다.
              </p>
              <Link
                href="/tools/image/compress"
                className="inline-block bg-brand-accent text-brand-white px-6 py-3 rounded-md font-medium hover:bg-brand-accent-light transition-colors"
              >
                이미지 압축 도구 사용하기
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
