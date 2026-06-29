import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import BlogExtras from "@/components/common/BlogExtras";
import { buildBlogMetadata } from "@/lib/common/blog";

export const metadata: Metadata = {
  ...buildBlogMetadata("bmi-obesity-guide"),
  title: "BMI 계산법과 비만도 기준 - 한국 기준은 다르다",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "BMI는 어떻게 계산하나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "몸무게(kg)를 키(m)의 제곱으로 나눕니다. 키 170cm·몸무게 65kg이면 65 ÷ (1.7×1.7) ≈ 22.5입니다.",
      },
    },
    {
      "@type": "Question",
      name: "BMI 정상 범위는 얼마인가요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "대한비만학회 기준으로 18.5 이상 23 미만이 정상입니다. 23~24.9는 비만 전단계, 25 이상부터 비만입니다. WHO 기준(25 이상 과체중)과는 다릅니다.",
      },
    },
    {
      "@type": "Question",
      name: "왜 한국 기준과 WHO 기준이 다른가요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "아시아인은 같은 BMI에서도 체지방률이 높고 대사질환 위험이 커, 대한비만학회가 더 낮은 기준을 적용합니다.",
      },
    },
  ],
};

export default function BmiObesityGuidePage() {
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
            <span className="text-brand-mid">BMI 계산법과 비만도 기준</span>
          </nav>

          <header className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-brand-black mb-4 leading-tight">
              BMI 계산법과 비만도 기준
            </h1>
            <p className="text-lg text-brand-mid">
              같은 숫자도 한국 기준과 WHO 기준은 다르게 본다
            </p>
            <div className="mt-4 flex items-center gap-4 text-sm text-brand-light">
              <time dateTime="2026-06-29">2026-06-29</time>
              <span>·</span>
              <span>5분 읽기</span>
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            <p className="text-brand-mid text-lg leading-relaxed mb-8">
              BMI(체질량지수)는 키와 몸무게만으로 비만 정도를 가늠하는 가장 간단한 지표입니다.
              계산은 쉽지만, 어떤 기준으로 보느냐에 따라 같은 숫자가 &lsquo;정상&rsquo;이 되기도,
              &lsquo;비만 전단계&rsquo;가 되기도 합니다. 한국에서 쓰는 기준을 중심으로 정리했습니다.
            </p>

            <div className="bg-brand-paper rounded-lg p-6 mb-10 border border-brand-light/20">
              <p className="font-medium text-brand-black mb-3">💡 바로 계산하고 싶다면?</p>
              <p className="text-brand-mid text-sm mb-4">
                키와 몸무게만 넣으면 BMI와 비만도, 정상 체중 범위를 대한비만학회 기준으로 바로
                보여줍니다. 입력값은 서버로 전송되지 않습니다.
              </p>
              <Link
                href="/tools/health/bmi"
                className="inline-block bg-brand-accent text-brand-white px-4 py-2 rounded-md text-sm font-medium hover:bg-brand-accent-light transition-colors"
              >
                BMI 계산기 사용하기 →
              </Link>
            </div>

            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">BMI 계산 공식</h2>
            <p className="text-brand-mid leading-relaxed mb-4">
              BMI는 몸무게(kg)를 키(m)의 제곱으로 나눈 값입니다.
            </p>
            <div className="bg-brand-paper rounded-lg p-5 mb-6 text-center">
              <p className="font-mono text-brand-black">BMI = 몸무게(kg) ÷ 키(m)²</p>
              <p className="text-sm text-brand-mid mt-2">
                예) 170cm·65kg → 65 ÷ (1.7 × 1.7) ≈ <strong>22.5</strong>
              </p>
            </div>

            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">
              한국(대한비만학회) 기준
            </h2>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-brand-light/40 text-left">
                    <th className="py-2 pr-4 text-brand-black">구간</th>
                    <th className="py-2 text-brand-black">BMI</th>
                  </tr>
                </thead>
                <tbody className="text-brand-mid">
                  <tr className="border-b border-brand-light/20">
                    <td className="py-2 pr-4">저체중</td>
                    <td className="py-2 font-mono">18.5 미만</td>
                  </tr>
                  <tr className="border-b border-brand-light/20">
                    <td className="py-2 pr-4 font-medium text-brand-black">정상</td>
                    <td className="py-2 font-mono">18.5 ~ 22.9</td>
                  </tr>
                  <tr className="border-b border-brand-light/20">
                    <td className="py-2 pr-4">비만 전단계</td>
                    <td className="py-2 font-mono">23 ~ 24.9</td>
                  </tr>
                  <tr className="border-b border-brand-light/20">
                    <td className="py-2 pr-4">1단계 비만</td>
                    <td className="py-2 font-mono">25 ~ 29.9</td>
                  </tr>
                  <tr className="border-b border-brand-light/20">
                    <td className="py-2 pr-4">2단계 비만</td>
                    <td className="py-2 font-mono">30 ~ 34.9</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">3단계 비만(고도비만)</td>
                    <td className="py-2 font-mono">35 이상</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-brand-mid leading-relaxed mb-4">
              WHO 국제 기준은 25 이상을 과체중, 30 이상을 비만으로 봅니다. 반면 대한비만학회는
              아시아인이 같은 BMI에서도 체지방률이 높고 대사질환 위험이 크다는 점을 반영해, 23부터
              비만 전단계로 보는 더 낮은 기준을 씁니다. 그래서 BMI 24는 WHO로는 정상이지만 한국
              기준으로는 비만 전단계입니다.
            </p>

            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">
              BMI로 알 수 없는 것
            </h2>
            <p className="text-brand-mid leading-relaxed mb-4">
              BMI는 근육과 지방을 구분하지 못합니다.
            </p>
            <ul className="list-disc list-inside text-brand-mid space-y-2 mb-6">
              <li>근육량이 많은 사람은 BMI가 높아도 비만이 아닐 수 있습니다.</li>
              <li>BMI가 정상이어도 체지방이 많은 &lsquo;마른 비만&rsquo;일 수 있습니다.</li>
              <li>지방이 어디에 붙었는지(복부 비만 여부)는 BMI로 알 수 없습니다.</li>
            </ul>
            <p className="text-brand-mid leading-relaxed mb-4">
              그래서 BMI는 큰 흐름을 보는 참고 지표로 쓰고, 정확한 건강 상태는 체지방률·허리둘레·혈액
              검사와 함께 보는 것이 좋습니다. 본격적으로 식단을 조절한다면 하루에 얼마나 먹어야
              하는지부터 아는 게 순서입니다.
            </p>
            <ul className="list-disc list-inside text-brand-mid space-y-2 mb-6">
              <li>
                <Link href="/tools/health/bmi" className="text-brand-accent hover:underline">
                  BMI 계산기
                </Link>
                : 키·몸무게로 비만도와 정상 체중 범위
              </li>
              <li>
                <Link href="/tools/health/bmr" className="text-brand-accent hover:underline">
                  기초대사량 계산기
                </Link>
                : 하루 권장 칼로리와 감량·유지·증량 목표
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-6">자주 묻는 질문</h2>
            <div className="space-y-6">
              <div className="border-b border-brand-light/20 pb-6">
                <h3 className="text-lg font-semibold text-brand-black mb-2">
                  Q. BMI는 어떻게 계산하나요?
                </h3>
                <p className="text-brand-mid">
                  몸무게(kg)를 키(m)의 제곱으로 나눕니다. 170cm·65kg이면 약 22.5입니다.
                </p>
              </div>
              <div className="border-b border-brand-light/20 pb-6">
                <h3 className="text-lg font-semibold text-brand-black mb-2">
                  Q. BMI 정상 범위는 얼마인가요?
                </h3>
                <p className="text-brand-mid">
                  대한비만학회 기준 18.5 이상 23 미만이 정상입니다. 25 이상부터 비만으로 봅니다.
                </p>
              </div>
              <div className="pb-6">
                <h3 className="text-lg font-semibold text-brand-black mb-2">
                  Q. BMI가 정상인데 살이 쪄 보여요.
                </h3>
                <p className="text-brand-mid">
                  BMI는 근육과 지방을 구분하지 못합니다. 체지방률·허리둘레와 함께 보세요.
                </p>
              </div>
            </div>

            <div className="bg-brand-black rounded-lg p-8 mt-12 text-center">
              <h3 className="text-xl font-bold text-brand-paper mb-3">키·몸무게로 바로 확인</h3>
              <p className="text-brand-light mb-6">
                BMI와 비만도, 정상 체중 범위를 한 번에. 회원가입 없이 무료입니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/tools/health/bmi"
                  className="inline-block bg-brand-accent text-brand-white px-6 py-3 rounded-md font-medium hover:bg-brand-accent-light transition-colors"
                >
                  BMI 계산기
                </Link>
                <Link
                  href="/tools/health/bmr"
                  className="inline-block bg-brand-dark text-brand-paper px-6 py-3 rounded-md font-medium hover:bg-brand-mid transition-colors"
                >
                  기초대사량 계산기
                </Link>
              </div>
            </div>

            <BlogExtras slug="bmi-obesity-guide" />
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
