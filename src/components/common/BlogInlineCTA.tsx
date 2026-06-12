import Link from "next/link";
import type { ReactNode } from "react";

/**
 * 블로그 본문 중간에 삽입하는 인라인 CTA.
 * 도입부 CTA(paper 박스)·하단 마무리 CTA(검정 박스)와 시각적으로 구분되도록
 * accent 좌측 보더 스타일을 쓴다. 글을 읽다가 자연스럽게 만나는 진입점.
 *
 * 본문(.prose) 안, 섹션 h2 앞에 한 줄로 삽입:
 *   <BlogInlineCTA href="/tools/image/compress" label="이미지 압축 →">
 *     원리는 이쯤이면 충분하죠. 바로 줄여보세요.
 *   </BlogInlineCTA>
 */
export default function BlogInlineCTA({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="not-prose my-10 flex flex-col gap-3 rounded-r-lg border-l-4 border-brand-accent bg-brand-paper/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm leading-relaxed text-brand-mid">{children}</p>
      <Link
        href={href}
        className="inline-block shrink-0 whitespace-nowrap rounded-md bg-brand-accent px-4 py-2 text-sm font-medium text-brand-white transition-colors hover:bg-brand-accent-light"
      >
        {label}
      </Link>
    </div>
  );
}
