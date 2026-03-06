import Link from "next/link";

interface ToolCardProps {
  name: string;
  href: string;
  description: string;
  variant?: "light" | "dark";
}

/**
 * 도구 카드 컴포넌트
 * - 메인 페이지, 다른 도구 섹션, 워크플로우 CTA에서 사용
 */
export default function ToolCard({
  name,
  href,
  description,
  variant = "light",
}: ToolCardProps) {
  const isLight = variant === "light";

  return (
    <Link
      href={href}
      className={`
        block p-5 rounded-xl
        transition-all duration-200
        group
        ${isLight
          ? "bg-brand-white border border-brand-light/30 hover:border-brand-accent/50 hover:shadow-md"
          : "bg-brand-dark hover:bg-brand-mid/30"
        }
      `}
    >
      {/* 도구 이름 */}
      <h3
        className={`
          text-base font-semibold mb-2
          transition-colors
          ${isLight
            ? "text-brand-black group-hover:text-brand-accent"
            : "text-brand-paper"
          }
        `}
      >
        {name}
      </h3>

      {/* 설명 */}
      <p
        className={`
          text-sm leading-relaxed
          ${isLight ? "text-brand-mid" : "text-brand-light"}
        `}
      >
        {description}
      </p>

      {/* 화살표 아이콘 */}
      <div
        className="mt-3 flex items-center gap-1 font-mono text-xs text-brand-accent transition-all group-hover:translate-x-1"
      >
        <span>사용하기</span>
        <svg
          className="w-3 h-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </Link>
  );
}
