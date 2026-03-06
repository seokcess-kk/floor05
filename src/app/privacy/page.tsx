import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "floor05 개인정보처리방침",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-white">
      <Header />

      <main className="flex-1">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-3xl font-bold text-brand-black mb-2">
            개인정보처리방침
          </h1>
          <p className="text-sm text-brand-light mb-12">
            최종 수정일: 2026년 3월 7일
          </p>

          <div className="prose prose-lg max-w-none space-y-10">
            {/* 개요 */}
            <section>
              <p className="text-brand-mid leading-relaxed">
                floor05(이하 &quot;서비스&quot;)는 사용자의 개인정보를 소중히 여기며,
                개인정보 보호법 등 관련 법령을 준수합니다. 본 개인정보처리방침은
                서비스 이용 시 수집되는 정보와 그 처리 방법에 대해 설명합니다.
              </p>
            </section>

            {/* 1. 수집하는 개인정보 */}
            <section>
              <h2 className="text-xl font-bold text-brand-black mb-4">
                1. 수집하는 개인정보
              </h2>
              <p className="text-brand-mid leading-relaxed mb-4">
                floor05는 <strong>개인정보를 수집하지 않습니다.</strong>
              </p>
              <ul className="list-disc list-inside text-brand-mid space-y-2">
                <li>회원가입이 없습니다.</li>
                <li>이메일, 이름, 연락처 등을 요구하지 않습니다.</li>
                <li>
                  업로드된 이미지 파일은 <strong>서버로 전송되지 않으며</strong>,
                  사용자의 브라우저에서만 처리됩니다.
                </li>
              </ul>
            </section>

            {/* 2. 쿠키 및 분석 도구 */}
            <section>
              <h2 className="text-xl font-bold text-brand-black mb-4">
                2. 쿠키 및 분석 도구
              </h2>
              <p className="text-brand-mid leading-relaxed mb-4">
                서비스 개선 및 광고 제공을 위해 다음 도구를 사용합니다:
              </p>
              <ul className="list-disc list-inside text-brand-mid space-y-2">
                <li>
                  <strong>Vercel Analytics</strong>: 익명화된 방문 통계 수집
                  (페이지뷰, 방문 시간 등)
                </li>
                <li>
                  <strong>Google AdSense</strong>: 맞춤형 광고 제공을 위한 쿠키 사용
                </li>
              </ul>
              <p className="text-brand-mid leading-relaxed mt-4">
                브라우저 설정에서 쿠키를 비활성화할 수 있으나, 일부 기능이
                제한될 수 있습니다.
              </p>
            </section>

            {/* 3. 개인정보 보관 */}
            <section>
              <h2 className="text-xl font-bold text-brand-black mb-4">
                3. 개인정보 보관
              </h2>
              <p className="text-brand-mid leading-relaxed">
                floor05는 서버에 사용자 데이터를 저장하지 않습니다. 이미지 처리는
                전적으로 사용자의 브라우저에서 이루어지며, 브라우저를 닫으면
                모든 데이터가 삭제됩니다.
              </p>
            </section>

            {/* 4. 제3자 제공 */}
            <section>
              <h2 className="text-xl font-bold text-brand-black mb-4">
                4. 제3자 제공
              </h2>
              <p className="text-brand-mid leading-relaxed">
                수집하는 개인정보가 없으므로, 제3자에게 제공하는 개인정보도 없습니다.
                단, Google AdSense를 통해 광고 네트워크에서 쿠키 기반 정보를 수집할 수 있습니다.
              </p>
            </section>

            {/* 5. 이용자 권리 */}
            <section>
              <h2 className="text-xl font-bold text-brand-black mb-4">
                5. 이용자의 권리
              </h2>
              <p className="text-brand-mid leading-relaxed">
                이용자는 언제든지 브라우저 설정을 통해 쿠키를 삭제하거나
                광고 개인화를 거부할 수 있습니다. Google 광고 설정은{" "}
                <a
                  href="https://adssettings.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-accent hover:underline"
                >
                  여기
                </a>
                에서 관리할 수 있습니다.
              </p>
            </section>

            {/* 6. 문의처 */}
            <section>
              <h2 className="text-xl font-bold text-brand-black mb-4">
                6. 문의처
              </h2>
              <p className="text-brand-mid leading-relaxed">
                개인정보처리방침에 관한 문의는 아래로 연락해 주세요.
              </p>
              <p className="text-brand-mid mt-2">
                이메일: privacy@floor05.com
              </p>
            </section>

            {/* 7. 방침 변경 */}
            <section>
              <h2 className="text-xl font-bold text-brand-black mb-4">
                7. 방침 변경
              </h2>
              <p className="text-brand-mid leading-relaxed">
                본 개인정보처리방침은 법령 변경 또는 서비스 정책에 따라 수정될 수 있습니다.
                변경 시 이 페이지에 게시하며, 중요한 변경 사항은 사이트 내 공지합니다.
              </p>
            </section>
          </div>

          {/* 돌아가기 */}
          <div className="mt-16 pt-8 border-t border-brand-light/20">
            <Link
              href="/"
              className="text-brand-accent hover:underline text-sm"
            >
              ← 홈으로 돌아가기
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
