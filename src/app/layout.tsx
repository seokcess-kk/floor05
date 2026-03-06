import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://floor05.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "floor05 - 무료 이미지 도구",
    template: "%s | floor05",
  },
  description:
    "서버 전송 없이 브라우저에서 바로 이미지 압축, 리사이즈, 포맷 변환, 크롭. 회원가입 없이 무제한 무료.",
  keywords: [
    "이미지 압축",
    "이미지 리사이즈",
    "이미지 변환",
    "HEIC 변환",
    "JPG 변환",
    "PNG 변환",
    "WebP 변환",
    "이미지 크롭",
    "사진 용량 줄이기",
    "아이폰 사진 변환",
  ],
  authors: [{ name: "floor05" }],
  creator: "floor05",
  publisher: "floor05",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: "floor05",
    title: "floor05 - 무료 이미지 도구",
    description:
      "서버 전송 없이 브라우저에서 바로 이미지 압축, 리사이즈, 포맷 변환, 크롭. 회원가입 없이 무제한 무료.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "floor05 - 무료 이미지 도구",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "floor05 - 무료 이미지 도구",
    description:
      "서버 전송 없이 브라우저에서 바로 이미지 압축, 리사이즈, 포맷 변환, 크롭.",
    images: ["/og-image.png"],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {ADSENSE_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
