import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import BlogExtras from "@/components/common/BlogExtras";
import { buildBlogMetadata } from "@/lib/common/blog";

export const metadata: Metadata = {
  ...buildBlogMetadata("exif-removal-guide"),
  title: "사진 위치정보(EXIF) 삭제하는 법 - 올리기 전에",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "사진에 위치정보가 정말 들어 있나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "위치 서비스를 켠 상태로 찍은 사진에는 EXIF에 GPS 좌표가 저장됩니다. 지도에 찍으면 어디서 찍었는지 그대로 드러나, 집·직장 위치가 노출될 수 있습니다.",
      },
    },
    {
      "@type": "Question",
      name: "SNS에 올리면 자동으로 지워지지 않나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "일부 플랫폼은 업로드 시 EXIF를 제거하지만 모두 그런 건 아니며, 원본 파일을 직접 주고받을 땐 그대로 남습니다. 미리 지워 두는 게 안전합니다.",
      },
    },
  ],
};

export default function ExifRemovalGuidePage() {
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
            <span className="text-brand-mid">사진 위치정보(EXIF) 삭제하는 법</span>
          </nav>

          <header className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-brand-black mb-4 leading-tight">
              사진 위치정보(EXIF) 삭제하는 법
            </h1>
            <p className="text-lg text-brand-mid">올리기 전에 지우는 작은 습관</p>
            <div className="mt-4 flex items-center gap-4 text-sm text-brand-light">
              <time dateTime="2026-06-29">2026-06-29</time>
              <span>·</span>
              <span>5분 읽기</span>
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            <p className="text-brand-mid text-lg leading-relaxed mb-8">
              스마트폰으로 찍은 사진에는 눈에 보이지 않는 정보가 함께 저장됩니다. 그중 가장 민감한
              건 찍은 위치를 담은 GPS 좌표입니다. 무심코 올린 사진 한 장으로 집 위치가 드러날 수
              있다는 걸 알면, 올리기 전에 지우는 습관이 생깁니다.
            </p>

            <div className="bg-brand-paper rounded-lg p-6 mb-10 border border-brand-light/20">
              <p className="font-medium text-brand-black mb-3">💡 바로 지우고 싶다면?</p>
              <p className="text-brand-mid text-sm mb-4">
                사진을 올리면 위치·기기·시각 정보를 제거해 돌려줍니다. 사진은 서버로 전송되지
                않습니다.
              </p>
              <Link
                href="/tools/image/exif-remove"
                className="inline-block bg-brand-accent text-brand-white px-4 py-2 rounded-md text-sm font-medium hover:bg-brand-accent-light transition-colors"
              >
                EXIF 삭제 사용하기 →
              </Link>
            </div>

            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">EXIF란 무엇인가</h2>
            <p className="text-brand-mid leading-relaxed mb-4">
              EXIF는 사진 파일 안에 함께 저장되는 부가 정보입니다. 사진을 더 잘 관리하려고 만든
              규격이지만, 개인정보 관점에서는 주의가 필요합니다.
            </p>
            <ul className="list-disc list-inside text-brand-mid space-y-2 mb-6">
              <li>
                <strong>촬영 위치(GPS)</strong> — 위도·경도 좌표. 집·직장·자주 가는 장소가 드러남
              </li>
              <li>기기·렌즈 모델, 카메라 설정값</li>
              <li>촬영 날짜와 시각</li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">
              어디서 위험할까
            </h2>
            <p className="text-brand-mid leading-relaxed mb-4">
              중고거래에서 집에서 찍은 물건 사진, 블로그에 올린 일상 사진, 메신저로 보낸 원본 파일
              모두 EXIF가 따라갑니다. 받는 사람이 마음만 먹으면 촬영 위치를 지도에 띄울 수 있습니다.
              특히 아이 사진이나 집 내부 사진은 더 조심해야 합니다.
            </p>
            <p className="text-brand-mid leading-relaxed mb-4">
              인스타그램·페이스북 같은 일부 SNS는 업로드 과정에서 EXIF를 제거하지만, 모든 서비스가
              그러는 건 아닙니다. 카카오톡으로 &lsquo;원본 전송&rsquo;을 하거나 파일을 직접 주고받을
              때는 그대로 남으니, 올리기 전에 직접 지우는 게 확실합니다.
            </p>

            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-4">
              서버에 올리지 않고 지우기
            </h2>
            <p className="text-brand-mid leading-relaxed mb-4">
              위치정보를 지우겠다고 사진을 모르는 서버에 업로드하는 건 앞뒤가 안 맞습니다. floor05의{" "}
              <Link href="/tools/image/exif-remove" className="text-brand-accent hover:underline">
                EXIF 삭제
              </Link>
              는 사진을 브라우저 안에서 다시 인코딩해 EXIF를 포함한 모든 메타데이터를 제거합니다.
              원본에 위치정보가 있었으면 &lsquo;위치정보(GPS) 포함&rsquo;으로 표시해 알려주고, 여러
              장을 한 번에 처리해 ZIP으로 줍니다. 파일이 서버로 전송되지 않습니다.
            </p>

            <h2 className="text-2xl font-bold text-brand-black mt-12 mb-6">자주 묻는 질문</h2>
            <div className="space-y-6">
              <div className="border-b border-brand-light/20 pb-6">
                <h3 className="text-lg font-semibold text-brand-black mb-2">
                  Q. 사진에 위치정보가 정말 들어 있나요?
                </h3>
                <p className="text-brand-mid">
                  위치 서비스를 켜고 찍었다면 GPS 좌표가 저장됩니다. 지도에 찍으면 촬영 장소가
                  드러납니다.
                </p>
              </div>
              <div className="border-b border-brand-light/20 pb-6">
                <h3 className="text-lg font-semibold text-brand-black mb-2">
                  Q. EXIF를 지우면 화질이 떨어지나요?
                </h3>
                <p className="text-brand-mid">
                  JPG는 재인코딩으로 아주 미미한 차이가 있을 수 있으나 눈으로는 거의 구분되지
                  않습니다. PNG는 무손실입니다.
                </p>
              </div>
              <div className="pb-6">
                <h3 className="text-lg font-semibold text-brand-black mb-2">
                  Q. 사진이 서버에 올라가나요?
                </h3>
                <p className="text-brand-mid">
                  아니요. 모든 처리는 브라우저 안에서 이루어지며 서버로 전송되지 않습니다.
                </p>
              </div>
            </div>

            <div className="bg-brand-black rounded-lg p-8 mt-12 text-center">
              <h3 className="text-xl font-bold text-brand-paper mb-3">올리기 전에 지우기</h3>
              <p className="text-brand-light mb-6">
                위치·기기·시각 정보를 브라우저에서 바로 제거. 회원가입 없이 무료입니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/tools/image/exif-remove"
                  className="inline-block bg-brand-accent text-brand-white px-6 py-3 rounded-md font-medium hover:bg-brand-accent-light transition-colors"
                >
                  EXIF 삭제
                </Link>
                <Link
                  href="/tools/image/mosaic"
                  className="inline-block bg-brand-dark text-brand-paper px-6 py-3 rounded-md font-medium hover:bg-brand-mid transition-colors"
                >
                  사진 모자이크
                </Link>
              </div>
            </div>

            <BlogExtras slug="exif-removal-guide" />
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
