import type { Metadata } from "next";
import Link from "next/link";

import BlogExtras from "@/components/common/BlogExtras";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import { buildBlogMetadata } from "@/lib/common/blog";

export const metadata: Metadata = {
  ...buildBlogMetadata("ovulation-calculation-guide"),
  title: "배란일 계산하는 법과 가임기",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "배란 예정일은 어떤 공식으로 구하나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "일반적인 계산 모델은 다음 생리 예정일에서 14일을 빼 배란 예정일을 추정합니다. 황체기가 약 14일이라는 평균 가정을 쓰는 방식입니다.",
      },
    },
    {
      "@type": "Question",
      name: "가임기는 며칠로 보나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "일반 모델에서는 배란일 5일 전부터 배란일 1일 후까지를 가임기로 봅니다. 정자는 최대 약 5일, 난자는 배란 후 약 1일 생존한다는 설명에 기반한 추정입니다.",
      },
    },
    {
      "@type": "Question",
      name: "생리 주기가 불규칙하면 계산을 믿어도 되나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "주기가 불규칙하면 계산 오차가 커질 수 있습니다. 배란테스트기, 기초체온 기록 등을 함께 참고할 수 있지만 임신 계획이나 의학적 판단은 산부인과 상담이 필요합니다.",
      },
    },
    {
      "@type": "Question",
      name: "배란일 계산을 피임에 써도 되나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "배란일 계산은 평균 모델에 따른 참고용 추정이라 피임 목적으로 쓰기에 적합하지 않습니다. 피임 방법은 의료진과 상담해 본인 상황에 맞게 선택하는 것이 좋습니다.",
      },
    },
  ],
};

export default function OvulationCalculationGuidePage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />

        <nav className="mb-8 text-sm text-gray-500" aria-label="breadcrumb">
          <Link href="/" className="hover:text-gray-900">
            홈
          </Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-gray-900">
            블로그
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">배란일 계산하는 법</span>
        </nav>

        <header className="mb-10">
          <p className="mb-3 text-sm font-medium text-gray-500">2026년 7월 22일 · 6분 읽기</p>
          <h1 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
            배란일 계산하는 법과 가임기
          </h1>
        </header>

        <article className="prose prose-gray max-w-none">
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
            <p className="m-0 text-gray-800">
              마지막 생리 시작일과 평균 주기를 넣으면 배란 예정일과 가임기 범위를 간단히
              확인할 수 있습니다. 참고용 날짜를 빠르게 잡고 싶다면{" "}
              <Link href="/tools/health/ovulation" className="font-semibold text-gray-950 underline">
                배란일 계산기
              </Link>
              에서 직접 계산해 보세요.
            </p>
          </div>

          <h2>배란일은 어떻게 계산할까요?</h2>
          <p>
            배란일은 보통 다음 생리 예정일에서 14일을 뺀 날짜로 추정합니다. 이 방식은 황체기가
            약 14일이라는 평균 모델을 사용합니다. 예를 들어 생리 주기가 28일이고 마지막 생리
            시작일을 D일로 두면 다음 생리 예정일은 D+28이고, 배란 예정일은 D+14로 계산합니다.
          </p>
          <p>
            여기서 중요한 점은 계산 결과가 실제 배란일을 단정하지 않는다는 것입니다. 배란은
            스트레스, 수면, 질환, 체중 변화, 약물, 생활 리듬 같은 여러 요인의 영향을 받을 수
            있습니다. 따라서 계산값은 임신 가능성이 상대적으로 높아질 수 있는 기간을 가늠하는
            참고 자료로 보는 편이 적절합니다.
          </p>

          <h2>가임기는 어느 기간을 말할까요?</h2>
          <p>
            가임기는 일반 모델에서 배란일 5일 전부터 배란일 1일 후까지로 잡습니다. 이는 정자가
            최대 약 5일, 난자가 배란 후 약 1일 생존할 수 있다는 설명을 바탕으로 한 범위입니다.
            배란일 하루만 보는 것이 아니라 앞뒤 며칠을 함께 보는 이유가 여기에 있습니다.
          </p>
          <p>
            다만 이 범위도 평균적인 안내입니다. 실제 배란일이 앞당겨지거나 늦어지면 가임기
            추정도 같이 흔들립니다. 생리 주기가 일정한 편이라도 매달 완전히 같다고 보기는
            어렵고, 주기가 불규칙한 경우에는 오차가 더 커질 수 있습니다.
          </p>

          <h2>주기 길이에 따라 날짜는 어떻게 달라질까요?</h2>
          <p>
            마지막 생리 시작일을 D일로 두면 주기가 길수록 배란 예정일도 뒤로 밀립니다. 생리
            주기는 보통 21일부터 35일 사이에서 이야기되지만 개인차가 있고, 최근 기록이 일정하지
            않다면 단일 계산값보다 여러 주기의 흐름을 같이 보는 편이 낫습니다.
          </p>

          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>평균 생리 주기</th>
                  <th>배란 예정일</th>
                  <th>가임기 추정 범위</th>
                  <th>계산 방식</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>26일</td>
                  <td>D+12</td>
                  <td>D+7 ~ D+13</td>
                  <td>다음 생리 D+26에서 14일 전</td>
                </tr>
                <tr>
                  <td>28일</td>
                  <td>D+14</td>
                  <td>D+9 ~ D+15</td>
                  <td>다음 생리 D+28에서 14일 전</td>
                </tr>
                <tr>
                  <td>30일</td>
                  <td>D+16</td>
                  <td>D+11 ~ D+17</td>
                  <td>다음 생리 D+30에서 14일 전</td>
                </tr>
                <tr>
                  <td>32일</td>
                  <td>D+18</td>
                  <td>D+13 ~ D+19</td>
                  <td>다음 생리 D+32에서 14일 전</td>
                </tr>
              </tbody>
            </table>
          </div>

          <figure className="not-prose my-8">
            <svg viewBox="0 0 480 200" role="img" width="100%" className="block max-w-xl mx-auto" style={{ height: "auto" }}>
              <title>28일 주기를 기준으로 한 배란 예정일과 가임기 추정 타임라인</title>
              <desc>생리 시작일 D부터 다음 생리 예정일 D+28까지의 가로 타임라인에서 D+14를 배란 예정일로, D+9부터 D+15까지를 가임기로 추정해 표시한 그림. 평균 모델에 따른 참고용 추정이다.</desc>
              <rect x="168.6" y="98" width="85.7" height="24" rx="3" fill="#E8734A" />
              <line x1="40" y1="110" x2="440" y2="110" stroke="#0A0A0A" strokeWidth="2" />
              <line x1="240" y1="110" x2="240" y2="82" stroke="#C45C2C" strokeWidth="1.5" />
              <text x="240" y="74" textAnchor="middle" fontSize="12" fill="#0A0A0A">배란 예정 D+14</text>
              <circle cx="40" cy="110" r="4" fill="#C45C2C" stroke="#FFFFFF" strokeWidth="1.5" />
              <circle cx="240" cy="110" r="4" fill="#C45C2C" stroke="#FFFFFF" strokeWidth="1.5" />
              <circle cx="440" cy="110" r="4" fill="#C45C2C" stroke="#FFFFFF" strokeWidth="1.5" />
              <text x="211" y="146" textAnchor="middle" fontSize="12" fill="#C45C2C">가임기 D+9~D+15</text>
              <text x="40" y="150" textAnchor="start" fontSize="12" fill="#0A0A0A">생리 시작 D일</text>
              <text x="440" y="150" textAnchor="end" fontSize="12" fill="#0A0A0A">다음 생리 예정 D+28</text>
            </svg>
            <figcaption className="mt-3 text-sm text-brand-mid text-center">28일 주기를 예로 들면 생리 시작일(D)로부터 약 14일 뒤를 배란 예정일로 보고 그 앞뒤 며칠을 가임기로 추정한다.</figcaption>
          </figure>
          <h2>계산값의 한계는 무엇일까요?</h2>
          <p>
            이 계산은 평균 모델 기반의 추정치라 실제 배란일과 다를 수 있습니다. 특히 생리 주기가
            21일보다 짧거나 35일보다 길게 반복되거나, 달마다 간격이 크게 바뀌는 경우에는 단순
            계산의 오차가 커질 수 있습니다. 최근에 출산, 유산, 호르몬 치료, 급격한 체중 변화가
            있었다면 기록 해석도 더 조심해야 합니다.
          </p>
          <p>
            배란일 계산은 피임 목적으로 쓰기에 적합하지 않습니다. 날짜 계산만으로 임신 가능성을
            배제하기 어렵고, 배란이 예상보다 빨라지거나 늦어질 수 있기 때문입니다. 임신을 계획하고
            있거나 생리 불순, 통증, 출혈 같은 의학적 고민이 있다면 산부인과 진료를 통해 확인하는
            것이 좋습니다.
          </p>

          <h2>정확도를 높이려면 무엇을 함께 볼까요?</h2>
          <p>
            계산값만 보기보다 기초체온 기록이나 배란테스트기를 함께 참고하면 날짜를 더 세밀하게
            파악하는 데 도움이 될 수 있습니다. 기초체온법은 매일 비슷한 시간에 체온을 기록해
            변화 흐름을 보는 방식이고, 배란테스트기는 호르몬 변화를 확인하는 도구로 널리 쓰입니다.
          </p>
          <p>
            두 방법도 개인 상태와 사용 방식에 따라 해석이 달라질 수 있습니다. 그래서 계산기,
            기록, 테스트 결과를 한데 모아 추세를 보는 정도로 활용하고, 중요한 판단은 의료진의
            상담을 기준으로 삼는 편이 안전합니다.
          </p>

          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>확인 방법</th>
                  <th>도움이 되는 점</th>
                  <th>주의할 점</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>날짜 계산</td>
                  <td>최근 주기를 바탕으로 예상 범위를 빠르게 잡음</td>
                  <td>불규칙 주기에서는 오차가 커질 수 있음</td>
                </tr>
                <tr>
                  <td>기초체온법</td>
                  <td>여러 주기의 체온 변화를 기록해 흐름을 봄</td>
                  <td>수면, 측정 시간, 컨디션 영향을 받을 수 있음</td>
                </tr>
                <tr>
                  <td>배란테스트기</td>
                  <td>배란 전후 호르몬 변화를 참고함</td>
                  <td>제품 사용법과 개인 상태에 따라 해석이 달라질 수 있음</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>임신 주수와 출산예정일은 어떻게 이어질까요?</h2>
          <p>
            임신 주수와 출산예정일은 배란일 계산과 다른 기준을 함께 봅니다. 널리 알려진
            네겔레 법칙은 출산예정일을 마지막 생리 시작일에 280일을 더해 추정합니다. 이 역시
            평균적인 계산이므로 실제 분만일이나 의학적 판단을 대신하지 않습니다.
          </p>
          <p>
            마지막 생리 시작일 기준으로 임신 주수와 예정일을 대략 확인하려면{" "}
            <Link href="/tools/health/pregnancy" className="font-semibold text-gray-950 underline">
              임신 주수 계산기
            </Link>
            를 함께 참고할 수 있습니다.
          </p>

          <h2>자주 묻는 질문</h2>
          <h3>배란 예정일은 어떤 공식으로 구하나요?</h3>
          <p>
            다음 생리 예정일에서 14일을 빼 배란 예정일을 추정합니다. 황체기가 약 14일이라는
            평균 가정을 쓰는 방법입니다.
          </p>
          <h3>가임기는 며칠로 보나요?</h3>
          <p>
            일반적으로 배란일 5일 전부터 배란일 1일 후까지로 봅니다. 정자와 난자의 생존 기간을
            반영한 참고 범위입니다.
          </p>
          <h3>생리 주기가 불규칙하면 계산을 믿어도 되나요?</h3>
          <p>
            불규칙한 주기에서는 오차가 커질 수 있습니다. 여러 주기 기록, 기초체온, 배란테스트기
            등을 함께 보되 의학적 판단은 진료를 통해 확인하는 것이 좋습니다.
          </p>
          <h3>배란일 계산을 피임에 써도 되나요?</h3>
          <p>
            이 계산은 참고용 추정이라 피임 목적으로 쓰기에 적합하지 않습니다. 피임 방법은 개인의
            건강 상태와 생활 방식에 맞춰 의료진과 상의하는 편이 좋습니다.
          </p>

          <div className="not-prose mt-10 rounded-lg bg-gray-950 p-6 text-white">
            <h2 className="m-0 text-xl font-semibold">최근 주기로 예상 범위를 확인해 보세요</h2>
            <p className="mt-3 text-sm leading-6 text-gray-300">
              마지막 생리 시작일과 평균 주기를 입력하면 배란 예정일과 가임기 범위를 한 화면에서
              볼 수 있습니다. 결과는 참고용으로 확인하고, 중요한 판단은 진료와 함께 검토하세요.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/tools/health/ovulation"
                className="inline-flex rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-950"
              >
                배란일 계산하기
              </Link>
              <Link
                href="/tools/health/pregnancy"
                className="inline-flex rounded-md border border-white/30 px-4 py-2 text-sm font-semibold text-white"
              >
                임신 주수도 보기
              </Link>
            </div>
          </div>
        </article>

        <BlogExtras slug="ovulation-calculation-guide" />
      </main>
      <Footer />
    </>
  );
}
