import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export const metadata: Metadata = {
  title: "블로그 - 이미지 편집 가이드",
  description:
    "이미지 압축, 리사이즈, 포맷 변환 등 이미지 편집에 관한 실용적인 가이드를 제공합니다.",
  openGraph: {
    title: "블로그 - 이미지 편집 가이드",
    description:
      "이미지 압축, 리사이즈, 포맷 변환 등 이미지 편집에 관한 실용적인 가이드를 제공합니다.",
  },
};

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
}

const posts: BlogPost[] = [
  {
    slug: "image-quality-vs-size",
    title: "사진 화질 높이기 vs 용량 줄이기",
    description:
      "화질과 용량의 차이점, 상황별 올바른 선택 방법을 알려드립니다.",
    date: "2026-03-10",
    readTime: "6분",
  },
  {
    slug: "transparent-background",
    title: "이미지 배경 투명하게 만들기",
    description:
      "PNG 투명 배경의 원리와 포맷별 특성, 활용 방법을 알려드립니다.",
    date: "2026-03-10",
    readTime: "5분",
  },
  {
    slug: "sns-image-size",
    title: "SNS별 이미지 크기 총정리",
    description:
      "인스타, 유튜브, 페이스북, 트위터 등 플랫폼별 최적 이미지 규격.",
    date: "2026-03-10",
    readTime: "6분",
  },
  {
    slug: "image-crop-guide",
    title: "사진 자르기 완벽 가이드",
    description:
      "비율별 크롭 방법과 무료 온라인 도구 사용법을 알려드립니다.",
    date: "2026-03-10",
    readTime: "5분",
  },
  {
    slug: "passport-photo-size",
    title: "증명사진 용량 줄이기",
    description:
      "취업사이트, 원서접수용 200KB, 500KB 용량 제한 맞추는 방법.",
    date: "2026-03-10",
    readTime: "4분",
  },
  {
    slug: "webp-guide",
    title: "WebP 포맷 완벽 가이드",
    description:
      "차세대 이미지 포맷 WebP의 장단점과 JPG/PNG에서 변환하는 방법.",
    date: "2026-03-10",
    readTime: "5분",
  },
  {
    slug: "instagram-image-size",
    title: "인스타그램 사진 크기 총정리",
    description:
      "인스타그램 피드, 스토리, 릴스, 프로필 사진의 최적 크기와 무료 리사이즈 방법.",
    date: "2026-03-10",
    readTime: "4분",
  },
  {
    slug: "png-vs-jpg",
    title: "PNG vs JPG 차이점",
    description:
      "PNG와 JPG의 차이점, 투명 배경, 용량 비교와 상황별 추천 포맷을 알려드립니다.",
    date: "2026-03-10",
    readTime: "5분",
  },
  {
    slug: "image-compression-guide",
    title: "이미지 용량 줄이기 방법 총정리",
    description:
      "사진 용량이 너무 클 때, 화질 손실 없이 이미지 크기를 줄이는 모든 방법을 알려드립니다.",
    date: "2026-03-07",
    readTime: "5분",
  },
  {
    slug: "heic-to-jpg-guide",
    title: "아이폰 HEIC 사진 JPG 변환 방법",
    description:
      "아이폰에서 찍은 HEIC 사진을 JPG로 변환하는 가장 쉬운 방법을 소개합니다.",
    date: "2026-03-07",
    readTime: "3분",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-white">
      <Header />

      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* 페이지 타이틀 */}
          <div className="mb-12">
            <h1 className="text-3xl font-bold text-brand-black mb-4">블로그</h1>
            <p className="text-brand-mid">
              이미지 편집에 관한 실용적인 가이드
            </p>
          </div>

          {/* 블로그 목록 */}
          <div className="space-y-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="border-b border-brand-light/20 pb-8 last:border-0"
              >
                <Link href={`/blog/${post.slug}`} className="group block">
                  <h2 className="text-xl font-semibold text-brand-black group-hover:text-brand-accent transition-colors mb-2">
                    {post.title}
                  </h2>
                  <p className="text-brand-mid mb-3">{post.description}</p>
                  <div className="flex items-center gap-4 text-sm text-brand-light">
                    <time dateTime={post.date}>{post.date}</time>
                    <span>·</span>
                    <span>{post.readTime} 읽기</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
