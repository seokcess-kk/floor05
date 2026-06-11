import Link from "next/link";
import { buildBlogPostingSchema, getRelatedPosts } from "@/lib/common/blog";

/**
 * 블로그 글 하단 공통 요소.
 * - BlogPosting JSON-LD (datePublished/dateModified 포함) 주입
 * - "관련 글" 블록으로 블로그↔블로그 내부링크 형성 (토픽 클러스터)
 *
 * 각 글 page.tsx에서 본문(.prose) 직후, <article> 내부에 한 줄로 삽입:
 *   <BlogExtras slug="..." />
 */
export default function BlogExtras({ slug }: { slug: string }) {
  const schema = buildBlogPostingSchema(slug);
  const related = getRelatedPosts(slug);

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}

      {related.length > 0 && (
        <aside className="mt-16 pt-8 border-t border-brand-light/20">
          <h2 className="font-mono text-xs text-brand-accent uppercase tracking-widest mb-6">
            관련 글
          </h2>
          <ul className="space-y-5">
            {related.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <span className="block font-medium text-brand-black group-hover:text-brand-accent transition-colors">
                    {post.title}
                  </span>
                  <span className="mt-1 block text-sm text-brand-mid">
                    {post.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </>
  );
}
