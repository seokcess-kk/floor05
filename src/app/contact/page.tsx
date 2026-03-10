import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export const metadata: Metadata = {
  title: "문의 - floor05",
  description:
    "floor05에 문의사항이나 건의사항이 있으시면 이메일로 연락해주세요. 최대한 빠르게 답변드리겠습니다.",
  openGraph: {
    title: "문의 - floor05",
    description: "floor05에 문의사항이나 건의사항이 있으시면 이메일로 연락해주세요.",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-white">
      <Header />

      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* 페이지 타이틀 */}
          <header className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-brand-black mb-4">
              문의
            </h1>
            <p className="text-lg text-brand-mid">
              궁금한 점이나 건의사항이 있으시면 언제든 연락해주세요.
            </p>
          </header>

          {/* 본문 */}
          <div className="prose prose-lg max-w-none space-y-12">
            {/* 이메일 연락처 */}
            <section>
              <h2 className="text-2xl font-bold text-brand-black mb-4">
                이메일
              </h2>
              <div className="bg-brand-paper rounded-lg p-6">
                <p className="text-brand-mid mb-4">
                  문의사항은 아래 이메일로 보내주세요.
                </p>
                <a
                  href="mailto:contact@floor05.com"
                  className="inline-flex items-center gap-2 text-lg font-medium text-brand-accent hover:underline"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                  contact@floor05.com
                </a>
              </div>
            </section>

            {/* 문의 유형 */}
            <section>
              <h2 className="text-2xl font-bold text-brand-black mb-4">
                이런 내용으로 연락해주세요
              </h2>
              <ul className="space-y-4 text-brand-mid">
                <li className="flex items-start gap-3">
                  <span className="text-brand-accent font-bold">•</span>
                  <div>
                    <span className="font-medium text-brand-black">도구 사용 중 문제</span>
                    <p className="text-sm mt-1">
                      버그, 오류, 예상과 다른 동작 등 기술적인 문제가 있을 때
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-accent font-bold">•</span>
                  <div>
                    <span className="font-medium text-brand-black">기능 건의</span>
                    <p className="text-sm mt-1">
                      추가되었으면 하는 기능이나 개선 아이디어
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-accent font-bold">•</span>
                  <div>
                    <span className="font-medium text-brand-black">일반 문의</span>
                    <p className="text-sm mt-1">
                      서비스 이용 관련 질문, 협업 제안 등
                    </p>
                  </div>
                </li>
              </ul>
            </section>

            {/* 응답 안내 */}
            <section>
              <h2 className="text-2xl font-bold text-brand-black mb-4">
                응답 안내
              </h2>
              <div className="bg-brand-paper rounded-lg p-6 space-y-3 text-brand-mid">
                <p>
                  <strong className="text-brand-black">응답 시간:</strong>{" "}
                  영업일 기준 1~3일 내에 답변드립니다.
                </p>
                <p>
                  <strong className="text-brand-black">운영 시간:</strong>{" "}
                  평일 오전 10시 ~ 오후 6시 (주말/공휴일 제외)
                </p>
                <p className="text-sm text-brand-light">
                  ※ 개인 운영 서비스로, 답변이 다소 늦어질 수 있습니다. 양해 부탁드립니다.
                </p>
              </div>
            </section>

            {/* FAQ 안내 */}
            <section className="border-t border-brand-light/20 pt-12">
              <h2 className="text-2xl font-bold text-brand-black mb-4">
                자주 묻는 질문
              </h2>
              <p className="text-brand-mid mb-6">
                문의 전에 아래 내용을 확인해주세요.
              </p>

              <div className="space-y-6">
                <div className="border-b border-brand-light/20 pb-6">
                  <h3 className="text-lg font-semibold text-brand-black mb-2">
                    Q. 파일이 서버로 업로드되나요?
                  </h3>
                  <p className="text-brand-mid">
                    아니요.{" "}
                    <strong>모든 처리가 브라우저에서 이루어지며, 파일이 서버로 전송되지 않습니다.</strong>{" "}
                    개인정보가 담긴 이미지도 안심하고 사용하세요.
                  </p>
                </div>

                <div className="border-b border-brand-light/20 pb-6">
                  <h3 className="text-lg font-semibold text-brand-black mb-2">
                    Q. 정말 무료인가요?
                  </h3>
                  <p className="text-brand-mid">
                    네, 모든 기능이 완전 무료입니다. 회원가입이나 결제가 필요 없습니다.
                    서비스 운영은 광고 수익으로 유지됩니다.
                  </p>
                </div>

                <div className="pb-6">
                  <h3 className="text-lg font-semibold text-brand-black mb-2">
                    Q. 처리할 수 있는 파일 크기에 제한이 있나요?
                  </h3>
                  <p className="text-brand-mid">
                    파일당 최대 50MB까지 처리할 수 있습니다.
                    일괄 처리는 데스크톱에서 최대 10장, 모바일에서 최대 5장입니다.
                  </p>
                </div>
              </div>
            </section>

            {/* 도구 바로가기 */}
            <div className="bg-brand-black rounded-lg p-8 text-center mt-12">
              <h3 className="text-xl font-bold text-brand-paper mb-3">
                도구 사용하러 가기
              </h3>
              <p className="text-brand-light mb-6">
                설치 없이, 회원가입 없이, 브라우저에서 바로.
              </p>
              <Link
                href="/"
                className="inline-block bg-brand-accent text-brand-white px-6 py-3 rounded-md font-medium hover:bg-brand-accent-light transition-colors"
              >
                도구 둘러보기
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
