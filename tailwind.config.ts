import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // floor05 브랜드 컬러
        brand: {
          black: "#0A0A0A",
          dark: "#1A1A1A",
          mid: "#4A4A4A",
          light: "#B0B0B0",
          paper: "#F2F0ED",
          white: "#FAFAFA",
          accent: "#C45C2C",
          "accent-light": "#E8734A",
          "accent-muted": "rgba(196, 92, 44, 0.12)",
        },
      },
      fontFamily: {
        // Primary: 모노스페이스
        mono: [
          "IBM Plex Mono",
          "SF Mono",
          "Fira Code",
          "JetBrains Mono",
          "Courier New",
          "monospace",
        ],
        // Secondary: 한글
        sans: [
          "Pretendard",
          "Apple SD Gothic Neo",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "sans-serif",
        ],
      },
      // 반응형 breakpoint 유지
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      // 커스텀 애니메이션
      animation: {
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
