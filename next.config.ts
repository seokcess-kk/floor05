import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // non-www → www 301 통일. canonical/sitemap/robots가 모두 www 기준이므로
  // 색인 신호가 두 호스트로 분산되지 않도록 코드 레벨에서도 강제한다.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "floor05.com" }],
        destination: "https://www.floor05.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
