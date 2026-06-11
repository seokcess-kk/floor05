/**
 * 블로그 글 레지스트리 (중앙 관리)
 * - 새 글 추가 시 이 파일의 POSTS 배열에만 추가하면 인덱스/메타데이터/스키마/관련글이 일괄 반영
 * - 블로그 인덱스, 각 글의 metadata(canonical), BlogPosting 스키마, 관련글 블록,
 *   도구 페이지의 "관련 가이드"(도구→블로그 링크)가 모두 이 레지스트리를 참조
 */
import type { Metadata } from "next";
import { SITE_URL } from "./constants";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  /** 최초 발행일 (YYYY-MM-DD) */
  datePublished: string;
  /** 최종 수정일 (YYYY-MM-DD) */
  dateModified: string;
  /** 예상 읽기 시간 (예: "5분") */
  readTime: string;
  /** 관련 글 slug 목록 (블로그↔블로그 내부링크) */
  related: string[];
}

/**
 * 글 목록 — 표시 순서는 최신글 우선.
 * datePublished/dateModified는 검색엔진 신선도 신호(BlogPosting)로 사용된다.
 */
export const POSTS: BlogPost[] = [
  // ── 신규 (2026-06) ──────────────────────────────────────────────
  {
    slug: "image-merge-guide",
    title: "사진 여러 장 한 장으로 합치기",
    description:
      "여러 사진을 세로·가로로 이어붙이는 방법. 카카오톡 캡처 합치기부터 상품 비교 이미지까지 한 번에.",
    keywords: [
      "사진 합치기",
      "이미지 합치기",
      "캡처 합치기",
      "사진 여러장 한장으로",
      "사진 세로로 합치기",
      "카톡 캡처 합치기",
      "사진 이어붙이기",
    ],
    datePublished: "2026-06-11",
    dateModified: "2026-06-11",
    readTime: "6분",
    related: ["image-crop-guide", "image-compression-guide", "youtube-thumbnail-size"],
  },
  {
    slug: "youtube-thumbnail-size",
    title: "유튜브 썸네일 크기와 만드는 법",
    description:
      "유튜브 썸네일 권장 크기 1280×720과 비율, 용량 제한, 무료로 만드는 방법을 정리했습니다.",
    keywords: [
      "유튜브 썸네일 크기",
      "썸네일 크기",
      "유튜브 썸네일 만들기",
      "1280x720",
      "유튜브 썸네일 규격",
      "썸네일 사이즈",
    ],
    datePublished: "2026-06-11",
    dateModified: "2026-06-11",
    readTime: "5분",
    related: ["sns-image-size", "instagram-image-size", "image-crop-guide"],
  },
  {
    slug: "photo-editing-without-photoshop",
    title: "포토샵 없이 사진 편집하기",
    description:
      "설치도 결제도 없이, 브라우저에서 사진을 압축·리사이즈·변환·합치는 방법을 한 번에 정리했습니다.",
    keywords: [
      "포토샵 없이 사진 편집",
      "무료 사진 편집",
      "온라인 사진 편집",
      "무료 이미지 편집 사이트",
      "사진 편집 프로그램 무료",
      "브라우저 사진 편집",
    ],
    datePublished: "2026-06-11",
    dateModified: "2026-06-11",
    readTime: "7분",
    related: [
      "image-compression-guide",
      "image-merge-guide",
      "browser-image-tools-privacy",
    ],
  },
  {
    slug: "browser-image-tools-privacy",
    title: "서버에 안 올리는 안전한 이미지 도구",
    description:
      "사진을 서버에 업로드하지 않고 브라우저에서 처리하는 원리와, 개인정보 보호 관점에서의 이점을 설명합니다.",
    keywords: [
      "안전한 이미지 압축",
      "이미지 압축 개인정보",
      "사진 업로드 안전",
      "브라우저 이미지 편집",
      "온라인 이미지 도구 안전",
      "서버 전송 없는 이미지 변환",
    ],
    datePublished: "2026-06-11",
    dateModified: "2026-06-11",
    readTime: "5분",
    related: [
      "image-compression-guide",
      "heic-to-jpg-guide",
      "photo-editing-without-photoshop",
    ],
  },

  // ── 기존 (2026-03) ──────────────────────────────────────────────
  {
    slug: "image-quality-vs-size",
    title: "사진 화질 높이기 vs 용량 줄이기",
    description: "화질과 용량의 차이점, 상황별 올바른 선택 방법을 알려드립니다.",
    keywords: [
      "사진 화질 높이기",
      "이미지 용량 줄이기",
      "화질 vs 용량",
      "사진 해상도",
      "이미지 압축",
      "화질 손실",
      "무손실 압축",
    ],
    datePublished: "2026-03-10",
    dateModified: "2026-06-11",
    readTime: "6분",
    related: ["image-compression-guide", "png-vs-jpg", "webp-guide"],
  },
  {
    slug: "transparent-background",
    title: "이미지 배경 투명하게 만들기",
    description: "PNG 투명 배경의 원리와 포맷별 특성, 활용 방법을 알려드립니다.",
    keywords: [
      "이미지 배경 투명",
      "PNG 투명 배경",
      "배경 없는 이미지",
      "투명 PNG",
      "알파 채널",
      "로고 배경 투명",
      "사진 배경 제거",
    ],
    datePublished: "2026-03-10",
    dateModified: "2026-06-11",
    readTime: "5분",
    related: ["png-vs-jpg", "webp-guide", "image-quality-vs-size"],
  },
  {
    slug: "sns-image-size",
    title: "SNS별 이미지 크기 총정리",
    description:
      "인스타, 유튜브, 페이스북, 트위터 등 플랫폼별 최적 이미지 규격.",
    keywords: [
      "SNS 이미지 크기",
      "인스타그램 사진 크기",
      "유튜브 썸네일 크기",
      "페이스북 이미지 크기",
      "트위터 이미지 크기",
      "네이버 블로그 이미지",
      "카카오톡 프로필 크기",
      "소셜미디어 이미지 규격",
    ],
    datePublished: "2026-03-10",
    dateModified: "2026-06-11",
    readTime: "6분",
    related: ["instagram-image-size", "youtube-thumbnail-size", "image-crop-guide"],
  },
  {
    slug: "image-crop-guide",
    title: "사진 자르기 완벽 가이드",
    description: "비율별 크롭 방법과 무료 온라인 도구 사용법을 알려드립니다.",
    keywords: [
      "사진 자르기",
      "이미지 크롭",
      "사진 크롭",
      "정사각형 사진",
      "1:1 자르기",
      "16:9 자르기",
      "4:3 자르기",
      "온라인 사진 자르기",
    ],
    datePublished: "2026-03-10",
    dateModified: "2026-06-11",
    readTime: "5분",
    related: ["sns-image-size", "instagram-image-size", "image-merge-guide"],
  },
  {
    slug: "passport-photo-size",
    title: "증명사진 용량 줄이기",
    description:
      "취업사이트, 원서접수용 200KB, 500KB 용량 제한 맞추는 방법.",
    keywords: [
      "증명사진 용량 줄이기",
      "증명사진 kb 줄이기",
      "증명사진 200kb",
      "증명사진 500kb",
      "취업 증명사진 용량",
      "원서 사진 용량",
      "사진 용량 줄이기",
    ],
    datePublished: "2026-03-10",
    dateModified: "2026-06-11",
    readTime: "4분",
    related: ["image-compression-guide", "image-quality-vs-size", "image-crop-guide"],
  },
  {
    slug: "webp-guide",
    title: "WebP 포맷 완벽 가이드",
    description:
      "차세대 이미지 포맷 WebP의 장단점과 JPG/PNG에서 변환하는 방법.",
    keywords: [
      "WebP",
      "웹피",
      "WebP 변환",
      "WebP 장점",
      "WebP 단점",
      "이미지 포맷",
      "WebP 지원 브라우저",
      "JPG to WebP",
      "PNG to WebP",
    ],
    datePublished: "2026-03-10",
    dateModified: "2026-06-11",
    readTime: "5분",
    related: ["png-vs-jpg", "transparent-background", "image-quality-vs-size"],
  },
  {
    slug: "instagram-image-size",
    title: "인스타그램 사진 크기 총정리",
    description:
      "인스타그램 피드, 스토리, 릴스, 프로필 사진의 최적 크기와 무료 리사이즈 방법.",
    keywords: [
      "인스타그램 사진 크기",
      "인스타 이미지 규격",
      "인스타 피드 크기",
      "인스타 스토리 크기",
      "인스타 사진 비율",
      "인스타그램 이미지 사이즈",
      "인스타 정사각형",
    ],
    datePublished: "2026-03-10",
    dateModified: "2026-06-11",
    readTime: "4분",
    related: ["sns-image-size", "youtube-thumbnail-size", "image-crop-guide"],
  },
  {
    slug: "png-vs-jpg",
    title: "PNG vs JPG 차이점",
    description:
      "PNG와 JPG의 차이점, 투명 배경, 용량 비교와 상황별 추천 포맷을 알려드립니다.",
    keywords: [
      "PNG JPG 차이",
      "PNG vs JPG",
      "이미지 포맷",
      "PNG JPG 변환",
      "투명 배경",
      "이미지 확장자",
      "사진 포맷 비교",
    ],
    datePublished: "2026-03-10",
    dateModified: "2026-06-11",
    readTime: "5분",
    related: ["webp-guide", "transparent-background", "image-quality-vs-size"],
  },
  {
    slug: "image-compression-guide",
    title: "이미지 용량 줄이기 방법 총정리",
    description:
      "사진 용량이 너무 클 때, 화질 손실 없이 이미지 크기를 줄이는 모든 방법을 알려드립니다.",
    keywords: [
      "이미지 용량 줄이기",
      "사진 용량 줄이기",
      "이미지 압축",
      "사진 압축",
      "이미지 크기 줄이기",
      "화질 손실 없이 압축",
      "JPG 압축",
      "PNG 압축",
    ],
    datePublished: "2026-03-07",
    dateModified: "2026-06-11",
    readTime: "5분",
    related: ["image-quality-vs-size", "passport-photo-size", "png-vs-jpg"],
  },
  {
    slug: "heic-to-jpg-guide",
    title: "아이폰 HEIC 사진 JPG 변환 방법",
    description:
      "아이폰에서 찍은 HEIC 사진을 JPG로 변환하는 가장 쉬운 방법을 소개합니다.",
    keywords: [
      "HEIC JPG 변환",
      "아이폰 사진 변환",
      "HEIC 변환",
      "HEIC to JPG",
      "아이폰 HEIC",
      "HEIC 파일 열기",
      "아이폰 사진 JPG",
    ],
    datePublished: "2026-03-07",
    dateModified: "2026-06-11",
    readTime: "3분",
    related: ["png-vs-jpg", "image-compression-guide", "browser-image-tools-privacy"],
  },
];

/** slug → post 빠른 조회 맵 */
const POST_MAP: Record<string, BlogPost> = Object.fromEntries(
  POSTS.map((p) => [p.slug, p]),
);

/** 전체 글 (표시 순서대로 = 최신글 우선) */
export function getAllPosts(): BlogPost[] {
  return POSTS;
}

/** slug로 단일 글 조회 */
export function getPost(slug: string): BlogPost | undefined {
  return POST_MAP[slug];
}

/** 블로그 글의 정식 URL */
export function getPostUrl(slug: string): string {
  return `${SITE_URL}/blog/${slug}`;
}

/** 여러 slug를 받아 존재하는 글만 입력 순서대로 반환 (도구→블로그 링크 해석용) */
export function getPostsBySlugs(slugs: string[]): BlogPost[] {
  return slugs.map((s) => POST_MAP[s]).filter((p): p is BlogPost => Boolean(p));
}

/** 특정 글의 관련 글 목록 (블로그↔블로그 내부링크) */
export function getRelatedPosts(slug: string): BlogPost[] {
  const post = POST_MAP[slug];
  if (!post) return [];
  return getPostsBySlugs(post.related);
}

/**
 * 블로그 글의 Next.js Metadata 생성 (per-post canonical 포함).
 * 각 글 page.tsx에서: `export const metadata = buildBlogMetadata("slug")`
 */
export function buildBlogMetadata(slug: string): Metadata {
  const post = POST_MAP[slug];
  if (!post) return {};
  const url = getPostUrl(slug);
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

/** 블로그 글의 BlogPosting JSON-LD 스키마 생성 (datePublished/dateModified 포함) */
export function buildBlogPostingSchema(slug: string): Record<string, unknown> | null {
  const post = POST_MAP[slug];
  if (!post) return null;
  const url = getPostUrl(slug);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    inLanguage: "ko-KR",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@type": "Organization", name: "floor05", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "floor05",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/og-image.png`,
      },
    },
  };
}
