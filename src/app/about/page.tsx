import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export const metadata: Metadata = {
  title: "소개 - floor05",
  description:
    "floor05는 브라우저에서 바로 동작하는 무료 이미지 도구를 제공합니다. 파일이 서버로 전송되지 않아 안전합니다.",
  openGraph: {
    title: "소개 - floor05",
    description:
      "floor05는 브라우저에서 바로 동작하는 무료 이미지 도구를 제공합니다.",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-white">
      <Header />

      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* 페이지 타이틀 */}
          <header className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-brand-black mb-4">
              소개
            </h1>
            <p className="text-lg text-brand-mid">
              존재하지 않는 0.5층에서 만듭니다.
            </p>
          </header>

          {/* 본문 */}
          <div className="prose prose-lg max-w-none space-y-12">
            {/* floor05란 */}
            <section>
              <h2 className="text-2xl font-bold text-brand-black mb-4">
                floor05란?
              </h2>
              <p className="text-brand-mid leading-relaxed mb-4">
                floor05(플로어공오)는 &quot;존재하지 않는 0.5층&quot;이라는 컨셉의
                유틸리티 도구 플랫폼입니다. 이미지 압축, 리사이즈, 포맷 변환, 크롭 등
                일상에서 필요한 이미지 편집 도구를 무료로 제공합니다.
              </p>
              <p className="text-brand-mid leading-relaxed">
                복잡한 프로그램 설치 없이, 웹 브라우저만 있으면 누구나
                바로 사용할 수 있습니다.
              </p>
            </section>

            {/* 핵심 가치 */}
            <section>
              <h2 className="text-2xl font-bold text-brand-black mb-4">
                핵심 가치
              </h2>

              <div className="space-y-6">
                <div className="bg-brand-paper rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-brand-black mb-2">
                    100% 브라우저 처리
                  </h3>
                  <p className="text-brand-mid">
                    모든 이미지 처리가 사용자의 브라우저에서 직접 이루어집니다.
                    <strong className="text-brand-black"> 파일이 서버로 전송되지 않습니다.</strong>{" "}
                    개인 사진, 민감한 문서 이미지도 안심하고 처리할 수 있습니다.
                  </p>
                </div>

                <div className="bg-brand-paper rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-brand-black mb-2">
                    완전 무료
                  </h3>
                  <p className="text-brand-mid">
                    회원가입, 로그인, 결제 없이 모든 기능을 무료로 사용할 수 있습니다.
                    일일 사용량 제한도 없습니다.
                  </p>
                </div>

                <div className="bg-brand-paper rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-brand-black mb-2">
                    단순함
                  </h3>
                  <p className="text-brand-mid">
                    복잡한 옵션 대신 실제로 필요한 기능만 제공합니다.
                    파일을 드래그하고, 설정하고, 다운로드. 그게 전부입니다.
                  </p>
                </div>
              </div>
            </section>

            {/* 제공 도구 */}
            <section>
              <h2 className="text-2xl font-bold text-brand-black mb-4">
                제공 도구
              </h2>
              <ul className="space-y-3 text-brand-mid">
                <li className="flex items-start gap-3">
                  <span className="text-brand-accent font-bold">•</span>
                  <div>
                    <Link href="/tools/image/compress" className="font-medium text-brand-black hover:text-brand-accent transition-colors">
                      이미지 압축
                    </Link>
                    <span className="ml-2">— 화질 손실 최소화하며 용량 줄이기</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-accent font-bold">•</span>
                  <div>
                    <Link href="/tools/image/resize" className="font-medium text-brand-black hover:text-brand-accent transition-colors">
                      이미지 리사이즈
                    </Link>
                    <span className="ml-2">— SNS별 프리셋으로 쉽게 크기 조절</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-accent font-bold">•</span>
                  <div>
                    <Link href="/tools/image/convert" className="font-medium text-brand-black hover:text-brand-accent transition-colors">
                      포맷 변환
                    </Link>
                    <span className="ml-2">— JPG, PNG, WebP 간 자유롭게 변환</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-accent font-bold">•</span>
                  <div>
                    <Link href="/tools/image/crop" className="font-medium text-brand-black hover:text-brand-accent transition-colors">
                      이미지 크롭
                    </Link>
                    <span className="ml-2">— 원하는 영역만 잘라내기, 비율 프리셋 제공</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-accent font-bold">•</span>
                  <div>
                    <Link href="/tools/image/heic" className="font-medium text-brand-black hover:text-brand-accent transition-colors">
                      HEIC → JPG 변환
                    </Link>
                    <span className="ml-2">— 아이폰 사진을 어디서든 열 수 있게</span>
                  </div>
                </li>
              </ul>
            </section>

            {/* 운영자 소개 */}
            <section>
              <h2 className="text-2xl font-bold text-brand-black mb-4">
                운영
              </h2>
              <p className="text-brand-mid leading-relaxed mb-4">
                floor05는 개인이 운영하는 서비스입니다.
                &quot;누구나 쉽게 쓸 수 있는 도구&quot;를 목표로,
                실제로 필요한 기능을 직접 만들어 공유하고 있습니다.
              </p>
              <p className="text-brand-mid leading-relaxed">
                문의사항이나 건의사항이 있으시면{" "}
                <Link href="/contact" className="text-brand-accent hover:underline">
                  문의 페이지
                </Link>
                를 통해 연락해주세요.
              </p>
            </section>

            {/* CTA */}
            <div className="bg-brand-black rounded-lg p-8 text-center mt-12">
              <h3 className="text-xl font-bold text-brand-paper mb-3">
                지금 바로 사용해보세요
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
