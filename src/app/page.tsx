import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import ToolCard from "@/components/common/ToolCard";
import { TOOLS } from "@/lib/common/tools";

// Hero 섹션의 모션 그래픽 (CSS 애니메이션)
function HeroAnimation() {
  return (
    <div className="relative w-full h-64 sm:h-80 overflow-hidden">
      {/* 배경 그라데이션 */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-brand-dark to-brand-black" />

      {/* 층 라인들 (0.5층 컨셉) */}
      <div className="absolute inset-0 flex flex-col justify-center items-center">
        {/* 2층 라인 */}
        <div className="w-3/4 max-w-md h-px bg-brand-mid/20 mb-8 animate-pulse" />

        {/* 0.5층 (강조) */}
        <div className="relative flex items-center gap-3 my-4">
          <div className="w-20 h-px bg-brand-accent/40" />
          <span className="font-mono text-sm text-brand-accent tracking-widest animate-pulse">
            0.5F
          </span>
          <div className="w-20 h-px bg-brand-accent/40" />
        </div>

        {/* 1층 라인 */}
        <div className="w-3/4 max-w-md h-px bg-brand-mid/20 mt-8 animate-pulse" style={{ animationDelay: "0.5s" }} />

        {/* 부유하는 05 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="font-mono text-8xl sm:text-9xl font-bold text-brand-accent/10 select-none animate-float">
            05
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-white">
      <Header />

      <main className="flex-1">
        {/* Hero 섹션 */}
        <section className="bg-brand-black">
          {/* 모션 그래픽 */}
          <HeroAnimation />

          {/* 브랜드 카피 */}
          <div className="text-center pb-16 px-4">
            <div className="flex items-end justify-center gap-1 mb-6">
              <span className="font-mono text-4xl sm:text-5xl font-medium text-brand-paper">
                floor
              </span>
              <span className="font-mono text-2xl sm:text-3xl font-bold text-brand-accent relative -top-3">
                05
              </span>
            </div>
            <p className="text-brand-light text-lg sm:text-xl max-w-md mx-auto leading-relaxed">
              존재하지 않는 0.5층에서 만듭니다.
            </p>
            <p className="font-mono text-xs text-brand-mid mt-4 tracking-widest uppercase">
              The floor that doesn&apos;t exist
            </p>
          </div>
        </section>

        {/* 도구 목록 섹션 */}
        <section className="py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-mono text-xs text-brand-accent uppercase tracking-widest mb-4">
                Room 01 — Image Tools
              </h2>
              <p className="text-brand-mid text-lg">
                파일이 서버로 전송되지 않습니다. 무제한 무료.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {TOOLS.map((tool) => (
                <ToolCard
                  key={tool.href}
                  name={tool.name}
                  href={tool.href}
                  description={tool.description}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 브랜드 철학 섹션 */}
        <section className="py-16 sm:py-20 bg-brand-paper">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <blockquote className="relative">
              {/* 인용 부호 */}
              <span className="absolute -top-8 left-0 text-6xl text-brand-accent/20 font-serif">
                &ldquo;
              </span>

              <p className="text-xl sm:text-2xl text-brand-black leading-relaxed font-light">
                건물에는 1층과 2층 사이에
                <span className="text-brand-accent font-medium"> 존재하지 않는 층</span>이 있다.
                <br className="hidden sm:block" />
                엘리베이터 버튼에도 없고, 안내 표지판에도 없다.
                <br className="hidden sm:block" />
                하지만 누군가는 그 층이 있다는 걸 안다.
              </p>

              <footer className="mt-8">
                <p className="font-mono text-sm text-brand-mid">
                  나만의 속도, 나만의 층.
                </p>
              </footer>
            </blockquote>
          </div>
        </section>

        {/* 핵심 가치 섹션 */}
        <section className="py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "파일 미전송",
                  description: "모든 처리는 브라우저에서. 파일이 서버로 전송되지 않습니다.",
                },
                {
                  title: "무제한 무료",
                  description: "회원가입 없이, 이미지 수나 용량 제한 없이 사용하세요.",
                },
                {
                  title: "한국어 네이티브",
                  description: "번역이 아닌, 한국인이 만든 한국어 도구입니다.",
                },
              ].map((value) => (
                <div key={value.title} className="text-center">
                  <h3 className="font-mono text-sm text-brand-accent uppercase tracking-wider mb-3">
                    {value.title}
                  </h3>
                  <p className="text-brand-mid text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
