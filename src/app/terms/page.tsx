import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export const metadata: Metadata = {
  title: "이용약관",
  description: "floor05 이용약관",
  robots: {
    index: false,
    follow: false,
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-white">
      <Header />

      <main className="flex-1">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-3xl font-bold text-brand-black mb-2">
            이용약관
          </h1>
          <p className="text-sm text-brand-light mb-12">
            최종 수정일: 2026년 3월 7일
          </p>

          <div className="prose prose-lg max-w-none space-y-10">
            {/* 개요 */}
            <section>
              <p className="text-brand-mid leading-relaxed">
                본 이용약관(이하 &quot;약관&quot;)은 floor05(이하 &quot;서비스&quot;)를
                이용함에 있어 서비스와 이용자 간의 권리, 의무 및 책임 사항을 규정합니다.
                서비스를 이용함으로써 본 약관에 동의하는 것으로 간주됩니다.
              </p>
            </section>

            {/* 1. 서비스 개요 */}
            <section>
              <h2 className="text-xl font-bold text-brand-black mb-4">
                1. 서비스 개요
              </h2>
              <p className="text-brand-mid leading-relaxed mb-4">
                floor05는 브라우저 기반 이미지 편집 도구를 제공합니다:
              </p>
              <ul className="list-disc list-inside text-brand-mid space-y-2">
                <li>이미지 압축</li>
                <li>이미지 리사이즈</li>
                <li>이미지 포맷 변환 (HEIC → JPG 포함)</li>
                <li>이미지 크롭</li>
              </ul>
              <p className="text-brand-mid leading-relaxed mt-4">
                모든 이미지 처리는 사용자의 브라우저에서 이루어지며,
                파일이 서버로 전송되지 않습니다.
              </p>
            </section>

            {/* 2. 이용 조건 */}
            <section>
              <h2 className="text-xl font-bold text-brand-black mb-4">
                2. 이용 조건
              </h2>
              <ul className="list-disc list-inside text-brand-mid space-y-2">
                <li>서비스는 무료로 제공됩니다.</li>
                <li>회원가입 없이 누구나 이용할 수 있습니다.</li>
                <li>
                  상업적 목적으로 서비스를 이용할 수 있으나, 서비스 자체를
                  복제하거나 재배포하는 것은 금지됩니다.
                </li>
              </ul>
            </section>

            {/* 3. 이용자의 의무 */}
            <section>
              <h2 className="text-xl font-bold text-brand-black mb-4">
                3. 이용자의 의무
              </h2>
              <p className="text-brand-mid leading-relaxed mb-4">
                이용자는 다음 행위를 하여서는 안 됩니다:
              </p>
              <ul className="list-disc list-inside text-brand-mid space-y-2">
                <li>서비스를 이용하여 불법적인 콘텐츠를 처리하는 행위</li>
                <li>서비스의 정상적인 운영을 방해하는 행위</li>
                <li>서비스를 악용하여 타인에게 피해를 주는 행위</li>
                <li>서비스의 소스 코드를 무단으로 복제, 수정, 배포하는 행위</li>
              </ul>
            </section>

            {/* 4. 지적재산권 */}
            <section>
              <h2 className="text-xl font-bold text-brand-black mb-4">
                4. 지적재산권
              </h2>
              <ul className="list-disc list-inside text-brand-mid space-y-2">
                <li>
                  서비스의 디자인, 코드, 로고 등 모든 지적재산권은 floor05에 귀속됩니다.
                </li>
                <li>
                  이용자가 업로드하는 이미지의 저작권은 이용자에게 있으며,
                  서비스는 이에 대한 어떠한 권리도 주장하지 않습니다.
                </li>
                <li>
                  처리된 이미지는 서버에 저장되지 않으므로, 서비스가 이용자의
                  이미지에 접근할 수 없습니다.
                </li>
              </ul>
            </section>

            {/* 5. 면책 조항 */}
            <section>
              <h2 className="text-xl font-bold text-brand-black mb-4">
                5. 면책 조항
              </h2>
              <ul className="list-disc list-inside text-brand-mid space-y-2">
                <li>
                  서비스는 &quot;있는 그대로(AS IS)&quot; 제공되며, 특정 목적에의
                  적합성이나 정확성을 보장하지 않습니다.
                </li>
                <li>
                  이미지 처리 결과에 대한 책임은 이용자에게 있습니다.
                  중요한 파일은 반드시 원본을 백업한 후 사용하세요.
                </li>
                <li>
                  서비스 이용 중 발생한 데이터 손실, 손해에 대해 서비스는
                  책임을 지지 않습니다.
                </li>
                <li>
                  브라우저 호환성 문제로 인한 오류에 대해 서비스는 책임을 지지 않습니다.
                </li>
              </ul>
            </section>

            {/* 6. 서비스 변경 및 중단 */}
            <section>
              <h2 className="text-xl font-bold text-brand-black mb-4">
                6. 서비스 변경 및 중단
              </h2>
              <p className="text-brand-mid leading-relaxed">
                서비스는 사전 통지 없이 기능을 추가, 변경, 제거하거나 서비스를
                중단할 수 있습니다. 중요한 변경 사항은 가능한 한 사이트 내
                공지를 통해 안내합니다.
              </p>
            </section>

            {/* 7. 광고 */}
            <section>
              <h2 className="text-xl font-bold text-brand-black mb-4">
                7. 광고
              </h2>
              <p className="text-brand-mid leading-relaxed">
                서비스는 운영 비용 충당을 위해 Google AdSense 등의 광고를
                표시합니다. 광고 내용에 대한 책임은 해당 광고주에게 있으며,
                서비스는 광고 내용을 보증하지 않습니다.
              </p>
            </section>

            {/* 8. 준거법 및 관할 */}
            <section>
              <h2 className="text-xl font-bold text-brand-black mb-4">
                8. 준거법 및 관할
              </h2>
              <p className="text-brand-mid leading-relaxed">
                본 약관은 대한민국 법률에 따라 해석되며, 서비스 이용과 관련하여
                분쟁이 발생할 경우 서울중앙지방법원을 전속 관할 법원으로 합니다.
              </p>
            </section>

            {/* 9. 문의처 */}
            <section>
              <h2 className="text-xl font-bold text-brand-black mb-4">
                9. 문의처
              </h2>
              <p className="text-brand-mid leading-relaxed">
                이용약관에 관한 문의는 아래로 연락해 주세요.
              </p>
              <p className="text-brand-mid mt-2">
                이메일: support@floor05.com
              </p>
            </section>

            {/* 10. 약관 변경 */}
            <section>
              <h2 className="text-xl font-bold text-brand-black mb-4">
                10. 약관 변경
              </h2>
              <p className="text-brand-mid leading-relaxed">
                본 약관은 필요에 따라 수정될 수 있습니다. 변경 시 이 페이지에
                게시하며, 변경된 약관은 게시 즉시 효력이 발생합니다.
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
