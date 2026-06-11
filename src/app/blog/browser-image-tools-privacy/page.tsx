import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import BlogExtras from "@/components/common/BlogExtras";
import { buildBlogMetadata } from "@/lib/common/blog";

export const metadata: Metadata = {
  ...buildBlogMetadata("browser-image-tools-privacy"),
  title: "서버에 안 올리는 안전한 이미지 도구 - 브라우저 처리의 원리",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "온라인 이미지 도구에 사진을 올리면 어디로 가나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "대부분의 온라인 도구는 사진을 서버로 업로드한 뒤 처리해 돌려줍니다. 이 경우 사진이 외부 서버에 일시적으로라도 저장될 수 있습니다. 반면 브라우저에서 직접 처리하는 도구는 사진이 내 기기를 떠나지 않습니다.",
      },
    },
    {
      "@type": "Question",
      name: "브라우저에서 처리하면 정말 안전한가요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "사진이 네트워크로 전송되지 않고 기기 안에서만 처리되므로, 업로드 방식보다 개인정보 노출 위험이 낮습니다. 신분증, 가족 사진처럼 민감한 이미지일수록 차이가 큽니다.",
      },
    },
    {
      "@type": "Question",
      name: "브라우저 도구는 인터넷 없이도 되나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "페이지를 한 번 연 뒤에는 처리 자체가 기기에서 이루어지므로, 파일 처리 단계에서 사진이 외부로 나가지 않습니다. 처리 속도도 파일을 올렸다 받는 과정이 없어 빠른 편입니다.",
      },
    },
  ],
};

export default function BrowserImageToolsPrivacyPage() {
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
            <span className="text-brand-mid">안전한 이미지 도구</span>
          </nav>

          <header className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-brand-black mb-4 leading-tight">
              서버에 안 올리는 안전한 이미지 도구
            </h1>
            <p className="text-lg text-brand-mid">
              브라우저에서 처리한다는 건 무슨 뜻일까 — 개인정보 관점에서
            </p>
            <div className="mt-4 flex items-center gap-4 text-sm text-brand-light">
              <time dateTime="2026-06-11">2026-06-11</time>
              <span>·</span>
              <span>5분 읽기</span>
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            <p className="text-brand-mid text-lg leading-relaxed mb-8">
              증명사진 용량을 줄이려고, 신분증 사본을 변환하려고 무심코 온라인
              도구에 사진을 올린 적 있을 겁니다. 그 사진은 어디로 갈까요? 도구의
              처리 방식에 따라 답이 달라집니다.
            </p>

            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">
              1. 대부분의 온라인 도구는 &lsquo;업로드&rsquo;한다
            </h2>
            <p className="text-brand-mid leading-relaxed mb-4">
              일반적인 온라인 이미지 도구는 이렇게 작동합니다. 내가 고른 파일을
              <strong> 서버로 전송 → 서버에서 처리 → 결과를 다시 내려받기</strong>.
              편리하지만, 그 과정에서 사진이 외부 서버에 일시적으로라도 머무릅니다.
              서버가 언제 파일을 지우는지, 로그에 무엇이 남는지는 이용자가 알기
              어렵습니다.
            </p>

            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">
              2. &lsquo;브라우저 처리&rsquo;는 다르다
            </h2>
            <p className="text-brand-mid leading-relaxed mb-4">
              브라우저(클라이언트) 처리 방식은 사진을 서버로 보내지 않습니다.
              압축·리사이즈 같은 연산을 <strong>내 기기 안의 브라우저가 직접</strong>{" "}
              수행합니다. 사진은 네트워크를 타지 않고, 작업이 끝나면 결과만 내
              기기에 저장됩니다.
            </p>
            <div className="bg-brand-paper rounded-lg p-6 my-8 border border-brand-light/20">
              <p className="text-brand-mid text-sm mb-0">
                floor05의 모든 이미지 도구는 이 방식입니다.{" "}
                <strong className="text-brand-black">
                  파일이 서버로 전송되지 않습니다.
                </strong>{" "}
                회원가입도 필요 없습니다.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">
              3. 왜 더 안전할까
            </h2>
            <ul className="list-disc list-inside text-brand-mid space-y-2 mb-6">
              <li>
                <strong>전송이 없음</strong>: 사진이 기기를 떠나지 않으니 가로채기나
                서버 보관 자체가 발생하지 않습니다.
              </li>
              <li>
                <strong>민감한 이미지에 유리</strong>: 신분증, 계약서, 가족 사진처럼
                남기고 싶지 않은 이미지일수록 차이가 큽니다.
              </li>
              <li>
                <strong>빠름</strong>: 올렸다 받는 왕복이 없어 처리도 대체로
                빠릅니다.
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">
              4. 브라우저에서 되는 작업들
            </h2>
            <p className="text-brand-mid leading-relaxed mb-4">
              생각보다 많습니다. 아래 작업은 모두 서버 없이 브라우저에서
              처리됩니다.
            </p>
            <ul className="list-disc list-inside text-brand-mid space-y-2 mb-6">
              <li>
                <Link href="/tools/image/compress" className="text-brand-accent hover:underline">
                  이미지 압축
                </Link>{" "}
                — 용량 줄이기, 목표 용량 맞추기
              </li>
              <li>
                <Link href="/tools/image/resize" className="text-brand-accent hover:underline">
                  리사이즈
                </Link>{" "}
                — 크기·비율 조절, SNS 프리셋
              </li>
              <li>
                <Link href="/tools/image/convert" className="text-brand-accent hover:underline">
                  포맷 변환
                </Link>
                {" 및 "}
                <Link href="/tools/image/heic-to-jpg" className="text-brand-accent hover:underline">
                  HEIC → JPG
                </Link>
              </li>
              <li>
                <Link href="/tools/image/crop" className="text-brand-accent hover:underline">
                  크롭
                </Link>
                {" · "}
                <Link href="/tools/image/merge" className="text-brand-accent hover:underline">
                  합치기
                </Link>
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-6">
              자주 묻는 질문
            </h2>
            <div className="space-y-6">
              <div className="border-b border-brand-light/20 pb-6">
                <h3 className="text-lg font-semibold text-brand-black mb-2">
                  Q. 온라인 도구에 사진을 올리면 어디로 가나요?
                </h3>
                <p className="text-brand-mid">
                  대부분은 서버로 업로드해 처리합니다. 이 경우 사진이 외부 서버에
                  일시적으로라도 저장될 수 있습니다. 브라우저에서 처리하는 도구는
                  사진이 기기를 떠나지 않습니다.
                </p>
              </div>
              <div className="border-b border-brand-light/20 pb-6">
                <h3 className="text-lg font-semibold text-brand-black mb-2">
                  Q. 브라우저에서 처리하면 정말 안전한가요?
                </h3>
                <p className="text-brand-mid">
                  사진이 네트워크로 전송되지 않고 기기 안에서만 처리되므로 업로드
                  방식보다 노출 위험이 낮습니다. 민감한 이미지일수록 차이가 큽니다.
                </p>
              </div>
              <div className="pb-6">
                <h3 className="text-lg font-semibold text-brand-black mb-2">
                  Q. 처리 속도는 어떤가요?
                </h3>
                <p className="text-brand-mid">
                  파일을 올렸다 받는 왕복이 없어 대체로 빠릅니다. 처리 단계에서
                  사진이 외부로 나가지 않습니다.
                </p>
              </div>
            </div>

            <div className="bg-brand-black rounded-lg p-8 mt-12 text-center">
              <h3 className="text-xl font-bold text-brand-paper mb-3">
                안전하게, 무료로 사진 다루기
              </h3>
              <p className="text-brand-light mb-6">
                파일이 서버로 전송되지 않습니다. 회원가입 없이 무제한 무료.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/tools/image/compress"
                  className="inline-block bg-brand-accent text-brand-white px-6 py-3 rounded-md font-medium hover:bg-brand-accent-light transition-colors"
                >
                  이미지 압축
                </Link>
                <Link
                  href="/tools/image/convert"
                  className="inline-block bg-brand-dark text-brand-paper px-6 py-3 rounded-md font-medium hover:bg-brand-mid transition-colors"
                >
                  포맷 변환
                </Link>
                <Link
                  href="/tools/image/heic-to-jpg"
                  className="inline-block bg-brand-dark text-brand-paper px-6 py-3 rounded-md font-medium hover:bg-brand-mid transition-colors"
                >
                  HEIC → JPG
                </Link>
              </div>
            </div>

            <BlogExtras slug="browser-image-tools-privacy" />
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
