import Header from "./Header";
import Footer from "./Footer";
import AdSlot from "./AdSlot";
import ToolCard from "./ToolCard";
import { getOtherTools } from "@/lib/common/tools";

interface FAQ {
  question: string;
  answer: string;
}

interface WorkflowCTA {
  message: string;
  tools: Array<{
    name: string;
    href: string;
    description: string;
  }>;
}

// Schema.org 타입
interface SchemaMarkup {
  "@context": string;
  "@type": string;
  [key: string]: unknown;
}

interface ToolLayoutProps {
  // 타이틀 영역
  title: string;
  description: string;

  // 도구 본체 (children)
  children: React.ReactNode;

  // 사용 가이드 (FAQ 형태)
  faqs?: FAQ[];

  // 워크플로우 CTA
  workflowCTA?: WorkflowCTA;

  // 현재 도구의 href (다른 도구 섹션에서 제외)
  currentToolHref?: string;

  // 광고 슬롯 3 표시 여부 (페이지 길이에 따라)
  showThirdAd?: boolean;

  // Schema.org Markup (JSON-LD)
  schemas?: SchemaMarkup[];
}

export default function ToolLayout({
  title,
  description,
  children,
  faqs = [],
  workflowCTA,
  currentToolHref,
  showThirdAd = true,
  schemas = [],
}: ToolLayoutProps) {
  // 현재 도구를 제외한 다른 도구들
  const otherTools = getOtherTools(currentToolHref);

  return (
    <div className="min-h-screen flex flex-col bg-brand-white">
      {/* Schema.org JSON-LD */}
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* 1. 헤더 */}
      <Header />

      <main className="flex-1">
        {/* 2. 타이틀 영역 */}
        <section className="bg-brand-black py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-brand-paper mb-3">
              {title}
            </h1>
            <p className="text-brand-light text-lg">
              {description}
            </p>
          </div>
        </section>

        {/* 3. 도구 본체 */}
        <section className="py-8 sm:py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </section>

        {/* 4. 광고 슬롯 1 */}
        <section className="py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <AdSlot slot="tool-below" />
          </div>
        </section>

        {/* 5. 사용 가이드 (FAQ 형태) */}
        {faqs.length > 0 && (
          <section className="py-12 bg-brand-paper">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-mono text-xs text-brand-accent uppercase tracking-widest mb-8">
                자주 묻는 질문
              </h2>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-brand-light/30 pb-6 last:border-b-0">
                    <h3 className="text-lg font-semibold text-brand-black mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-brand-mid leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 6. 워크플로우 CTA */}
        {workflowCTA && (
          <section className="py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-brand-black rounded-xl p-8 text-center">
                <p className="text-brand-paper text-xl mb-6">
                  {workflowCTA.message}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {workflowCTA.tools.map((tool) => (
                    <ToolCard
                      key={tool.href}
                      name={tool.name}
                      href={tool.href}
                      description={tool.description}
                      variant="dark"
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 7. 광고 슬롯 2 */}
        <section className="py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <AdSlot slot="cta-below" />
          </div>
        </section>

        {/* 8. floor05 다른 도구 */}
        <section className="py-12 bg-brand-paper">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-mono text-xs text-brand-accent uppercase tracking-widest mb-8 text-center">
              floor05 다른 도구
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {otherTools.map((tool) => (
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

        {/* 9. 광고 슬롯 3 (선택) */}
        {showThirdAd && (
          <section className="py-6">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <AdSlot slot="footer-above" />
            </div>
          </section>
        )}
      </main>

      {/* 10. 푸터 */}
      <Footer />
    </div>
  );
}
