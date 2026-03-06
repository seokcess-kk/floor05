import Link from "next/link";
import Image from "next/image";
import { TOOLS } from "@/lib/common/tools";

function FooterLogo() {
  return (
    <Link href="/" className="block">
      <Image
        src="/images/logo-wordmark.png"
        alt="floor05"
        width={120}
        height={40}
        className="h-8 w-auto"
      />
    </Link>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-black text-brand-paper">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 로고 & 태그라인 */}
          <div className="md:col-span-2">
            <FooterLogo />
            <p className="mt-4 text-sm text-brand-light leading-relaxed max-w-sm">
              존재하지 않는 0.5층에서 만듭니다.
              <br />
              나만의 속도, 나만의 층.
            </p>
            <p className="mt-4 font-mono text-xs text-brand-mid tracking-wider">
              THE FLOOR THAT DOESN&apos;T EXIST
            </p>
          </div>

          {/* 도구 링크 */}
          <div>
            <h3 className="font-mono text-xs text-brand-light uppercase tracking-widest mb-4">
              도구
            </h3>
            <ul className="space-y-2">
              {TOOLS.map((tool) => (
                <li key={tool.href}>
                  <Link
                    href={tool.href}
                    className="text-sm text-brand-mid hover:text-brand-paper transition-colors"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 정보 링크 */}
          <div>
            <h3 className="font-mono text-xs text-brand-light uppercase tracking-widest mb-4">
              정보
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-brand-mid hover:text-brand-paper transition-colors"
                >
                  블로그
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-brand-mid hover:text-brand-paper transition-colors"
                >
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-brand-mid hover:text-brand-paper transition-colors"
                >
                  이용약관
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 하단 저작권 */}
        <div className="mt-12 pt-8 border-t border-brand-dark">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="font-mono text-xs text-brand-mid">
              &copy; {currentYear} floor05 플로어공오
            </p>
            <p className="font-mono text-xs text-brand-mid">
              파일이 서버로 전송되지 않습니다.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
