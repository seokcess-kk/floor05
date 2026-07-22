import type { Metadata } from "next";
import Link from "next/link";

import BlogExtras from "@/components/common/BlogExtras";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import { buildBlogMetadata } from "@/lib/common/blog";

export const metadata: Metadata = {
  ...buildBlogMetadata("loan-interest-guide"),
  title: "대출 이자 계산법: 상환방식 3가지 비교",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "대출 이자는 어떤 값으로 계산하나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "대출 이자는 원금, 연 이율, 상환 기간, 상환 방식으로 계산합니다. 같은 금리와 기간이어도 원리금균등, 원금균등, 만기일시는 월 납입액 흐름과 총이자가 달라집니다.",
      },
    },
    {
      "@type": "Question",
      name: "총이자가 가장 적은 방식은 무엇인가요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "일반적인 원금 상환 대출에서는 원금균등이 총이자를 줄이기 쉽습니다. 다만 첫 달 납입액이 크고 이후 점차 줄어드는 구조라 현금흐름 부담을 함께 봐야 합니다.",
      },
    },
    {
      "@type": "Question",
      name: "만기일시상환은 왜 총이자가 커지나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "만기일시상환은 기간 중 원금이 줄지 않기 때문에 매월 같은 원금에 대해 이자가 붙습니다. 그래서 같은 금리와 기간이면 총이자가 크게 나올 수 있습니다.",
      },
    },
    {
      "@type": "Question",
      name: "계산 결과만 보고 대출 방식을 고르면 되나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "계산 결과는 구조 비교에 유용하지만 실제 선택은 소득 흐름, 중도상환 계획, 금융사 조건을 함께 확인해야 합니다. 수수료와 심사 기준은 금융사와 시점에 따라 다를 수 있습니다.",
      },
    },
  ],
};

export default function LoanInterestGuidePage() {
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
          <span className="text-gray-900">대출 이자 계산법</span>
        </nav>

        <header className="mb-10">
          <p className="mb-3 text-sm font-medium text-gray-500">2026년 7월 22일 · 7분 읽기</p>
          <h1 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
            대출 이자 계산법: 상환방식 3가지 비교
          </h1>
        </header>

        <article className="prose prose-gray max-w-none">
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
            <p className="m-0 text-gray-800">
              대출 금액, 금리, 기간을 넣으면 세 가지 상환 방식의 월 납입액과 총이자를 한 번에
              대조할 수 있습니다. 직접 숫자를 바꿔 보고 싶다면{" "}
              <Link href="/tools/calc/loan" className="font-semibold text-gray-950 underline">
                대출 이자 계산기
              </Link>
              에서 조건을 입력해 보세요.
            </p>
          </div>

          <h2>대출 이자는 무엇으로 달라질까요?</h2>
          <p>
            대출 이자는 원금, 금리, 기간, 상환 방식이 함께 정합니다. 금리가 같아도 원금을
            얼마나 빠르게 줄이느냐에 따라 남은 잔액이 달라지고, 잔액에 붙는 이자도 달라집니다.
            그래서 같은 1억 원을 빌려도 매달 같은 금액을 내는 방식과 매달 같은 원금을 갚는
            방식은 총이자와 월별 부담이 서로 다르게 나타납니다.
          </p>
          <p>
            이자를 볼 때는 연 이율을 그대로 월 계산에 쓰지 않고 월이율로 바꿉니다. 예를 들어
            연 4퍼센트라면 월이율은 4퍼센트를 12로 나눈 값입니다. 이후 개월 수만큼 반복되는
            상환 구조를 반영하면 월 납입액과 총이자가 계산됩니다.
          </p>

          <h2>원리금균등상환은 어떻게 계산할까요?</h2>
          <p>
            원리금균등상환은 매월 내는 전체 금액을 같게 맞추는 방식입니다. 월 상환액 공식은
            원금 x 월이율 x (1 + 월이율)^개월 / ((1 + 월이율)^개월 - 1)입니다. 초반에는
            대출 잔액이 크기 때문에 납입액 안에서 이자 비중이 높고, 시간이 갈수록 원금 비중이
            커집니다.
          </p>
          <p>
            이 방식은 매달 나가는 금액이 일정해 예산을 세우기 쉽습니다. 다만 총이자만 보면
            원금균등보다 많아질 수 있습니다. 월 납입액의 안정성이 중요한지, 전체 이자 절감이
            중요한지에 따라 해석이 달라집니다.
          </p>

          <h2>원금균등상환은 왜 초반 부담이 클까요?</h2>
          <p>
            원금균등상환은 매달 갚는 원금이 같고, 남은 원금에 대한 이자를 더해 내는 방식입니다.
            총이자는 원금 x 월이율 x (개월 + 1) / 2로 계산할 수 있습니다. 처음에는 잔액이
            가장 크므로 첫 달 납입액이 높고, 매월 원금이 줄면서 이자도 함께 감소합니다.
          </p>
          <p>
            구조적으로 총이자는 원금균등이 가장 적게 나오는 경우가 많지만, 초반 현금흐름이
            빠듯하면 부담이 크게 느껴질 수 있습니다. 특히 대출 직후 이사비, 보증금, 생활비가
            겹치는 경우에는 첫 달과 초기 몇 달의 납입액을 따로 확인하는 편이 낫습니다.
          </p>

          <h2>만기일시상환은 어떤 구조일까요?</h2>
          <p>
            만기일시상환은 매월 이자만 내고 만기일에 원금을 한 번에 갚는 방식입니다. 총이자는
            원금 x 월이율 x 개월로 계산합니다. 기간 중 원금이 줄지 않으므로 매월 이자는
            일정하지만, 만기 시점에 큰 원금 상환이 남습니다.
          </p>
          <p>
            월 납입액만 보면 가장 가벼워 보일 수 있습니다. 하지만 전체 기간의 이자 비용은
            커질 수 있고, 만기 자금 마련 계획이 분명해야 합니다. 실제 상품에서는 연장 조건,
            중도상환수수료, 심사 기준 같은 세부 조건이 금융사와 시점에 따라 달라질 수 있습니다.
          </p>

          <h2>1억 원을 30년 빌리면 얼마나 차이날까요?</h2>
          <p>
            주택담보 1억 원, 연 4퍼센트, 30년인 경우에는 월 부담의 흐름과 총이자가 뚜렷하게
            갈립니다. 원리금균등은 월 477,415원으로 일정하고, 원금균등은 첫 달 611,111원에서
            마지막 달 278,704원으로 내려갑니다. 만기일시는 매월 333,333원의 이자를 내지만
            원금은 만기에 남습니다.
          </p>

          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>상환 방식</th>
                  <th>월 상환액</th>
                  <th>총이자</th>
                  <th>특징</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>원리금균등</td>
                  <td>월 477,415원</td>
                  <td>약 7,187만원</td>
                  <td>매월 납입액이 같고 초반 이자 비중이 큼</td>
                </tr>
                <tr>
                  <td>원금균등</td>
                  <td>첫 달 611,111원, 마지막 달 278,704원</td>
                  <td>약 6,017만원</td>
                  <td>총이자는 적지만 초기 납입액이 높음</td>
                </tr>
                <tr>
                  <td>만기일시</td>
                  <td>매월 333,333원</td>
                  <td>1억 2,000만원</td>
                  <td>매월 이자만 내고 만기에 원금을 상환</td>
                </tr>
              </tbody>
            </table>
          </div>

          <figure className="not-prose my-8">
            <svg viewBox="0 0 460 300" role="img" width="100%" className="block max-w-xl mx-auto" style={{ height: "auto" }}>
              <title>원리금균등과 원금균등의 월 상환액 흐름 비교</title>
              <desc>주택담보 1억원 연 4% 30년 예시에서 원리금균등은 매달 약 47만원으로 일정하고, 원금균등은 첫 달 약 61만원에서 마지막 약 28만원으로 줄어드는 막대 그래프.</desc>
              <rect x="90" y="14" width="14" height="14" fill="#F2F0ED" stroke="#0A0A0A" strokeWidth="1.5" />
              <text x="110" y="25" fontSize="12" fill="#0A0A0A">원리금균등</text>
              <rect x="250" y="14" width="14" height="14" fill="#C45C2C" />
              <text x="270" y="25" fontSize="12" fill="#0A0A0A">원금균등</text>
              <line x1="55" y1="240" x2="430" y2="240" stroke="#0A0A0A" strokeWidth="1.5" />
              <rect x="68" y="115" width="20" height="125" fill="#F2F0ED" stroke="#0A0A0A" strokeWidth="1.5" />
              <rect x="138" y="115" width="20" height="125" fill="#F2F0ED" stroke="#0A0A0A" strokeWidth="1.5" />
              <rect x="208" y="115" width="20" height="125" fill="#F2F0ED" stroke="#0A0A0A" strokeWidth="1.5" />
              <rect x="278" y="115" width="20" height="125" fill="#F2F0ED" stroke="#0A0A0A" strokeWidth="1.5" />
              <rect x="348" y="115" width="20" height="125" fill="#F2F0ED" stroke="#0A0A0A" strokeWidth="1.5" />
              <rect x="92" y="80" width="20" height="160" fill="#C45C2C" />
              <rect x="162" y="102" width="20" height="138" fill="#C45C2C" />
              <rect x="232" y="124" width="20" height="116" fill="#C45C2C" />
              <rect x="302" y="145" width="20" height="95" fill="#C45C2C" />
              <rect x="372" y="167" width="20" height="73" fill="#C45C2C" />
              <text x="78" y="108" textAnchor="middle" fontSize="11" fill="#0A0A0A">477,415원</text>
              <text x="102" y="72" textAnchor="middle" fontSize="11" fill="#C45C2C">611,111원</text>
              <text x="382" y="160" textAnchor="middle" fontSize="11" fill="#C45C2C">278,704원</text>
              <text x="240" y="262" textAnchor="middle" fontSize="12" fill="#4A4A4A">상환 회차(시간)</text>
            </svg>
            <figcaption className="mt-3 text-sm text-brand-mid text-center">원리금균등은 매달 상환액이 같지만, 원금균등은 첫 달이 가장 크고 회차가 지날수록 줄어든다.</figcaption>
          </figure>
          <h2>신용대출 3천만 원은 어떤 차이가 날까요?</h2>
          <p>
            신용대출 3,000만 원, 연 5퍼센트, 3년 조건에서는 기간이 짧아 차이가 작아 보이지만
            방식별 구조는 그대로 드러납니다. 원리금균등은 월 899,127원이고 총이자는 2,368,569원입니다.
            원금균등은 첫 달 958,333원으로 시작하고 총이자는 2,312,500원입니다. 만기일시는
            매월 125,000원을 내지만 총이자가 4,500,000원으로 커집니다.
          </p>

          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>조건</th>
                  <th>원리금균등</th>
                  <th>원금균등</th>
                  <th>만기일시</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>주택담보 1억원, 연 4%, 30년</td>
                  <td>월 477,415원, 총이자 약 7,187만원</td>
                  <td>첫 달 611,111원, 총이자 약 6,017만원</td>
                  <td>월 333,333원, 총이자 1억 2,000만원</td>
                </tr>
                <tr>
                  <td>신용대출 3,000만원, 연 5%, 3년</td>
                  <td>월 899,127원, 총이자 2,368,569원</td>
                  <td>첫 달 958,333원, 총이자 2,312,500원</td>
                  <td>월 125,000원, 총이자 4,500,000원</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>어떤 상환 방식이 더 유리할까요?</h2>
          <p>
            한 가지 방식이 항상 더 낫다고 말하기는 어렵고, 비용 구조와 현금흐름을 나눠 봐야
            합니다. 총이자는 원금균등이 가장 적게 나오는 편이지만 초기 부담이 큽니다. 원리금균등은
            매월 금액이 일정해 관리하기 쉽지만 총이자는 원금균등보다 늘 수 있습니다. 만기일시는
            월 부담이 낮아 보여도 원금이 줄지 않아 총이자가 커지고 만기 상환 계획이 중요합니다.
          </p>
          <p>
            실제 의사결정에서는 계산 결과에 더해 소득 변동 가능성, 중도상환 예정 여부, 만기
            자금 조달 계획을 함께 살펴야 합니다. 제도와 수수료는 상품마다 다를 수 있으므로
            계약 전에는 금융사 설명서와 약관의 숫자를 다시 확인하는 편이 좋습니다.
          </p>

          <h2>자주 묻는 질문</h2>
          <h3>대출 이자는 어떤 값으로 계산하나요?</h3>
          <p>
            대출 이자는 원금, 연 이율, 상환 기간, 상환 방식으로 계산합니다. 같은 금리와 기간이어도
            원금을 줄이는 속도가 다르면 월 납입액과 총이자가 달라집니다.
          </p>
          <h3>총이자가 가장 적은 방식은 무엇인가요?</h3>
          <p>
            일반적인 원금 상환 대출에서는 원금균등이 총이자를 줄이기 쉽습니다. 다만 첫 달 납입액이
            커서 초기 예산을 함께 확인해야 합니다.
          </p>
          <h3>만기일시상환은 왜 총이자가 커지나요?</h3>
          <p>
            기간 중 원금이 줄지 않기 때문입니다. 매월 같은 원금에 이자가 붙고, 원금은 만기까지
            남아 있어 전체 이자액이 커질 수 있습니다.
          </p>
          <h3>계산 결과만 보고 대출 방식을 고르면 되나요?</h3>
          <p>
            계산 결과는 비교의 출발점입니다. 실제 선택은 소득 흐름, 중도상환 계획, 금융사 조건을
            함께 확인해야 합니다.
          </p>

          <div className="not-prose mt-10 rounded-lg bg-gray-950 p-6 text-white">
            <h2 className="m-0 text-xl font-semibold">조건을 바꿔 월 납입액을 다시 계산해 보세요</h2>
            <p className="mt-3 text-sm leading-6 text-gray-300">
              금액과 기간을 조금만 바꿔도 총이자 차이가 달라집니다. 세 상환 방식을 같은 화면에서
              비교해 실제 예산에 맞는 범위를 확인할 수 있습니다.
            </p>
            <Link
              href="/tools/calc/loan"
              className="mt-4 inline-flex rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-950"
            >
              대출 계산기로 비교하기
            </Link>
          </div>
        </article>

        <BlogExtras slug="loan-interest-guide" />
      </main>
      <Footer />
    </>
  );
}
