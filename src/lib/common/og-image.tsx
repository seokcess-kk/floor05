import { ImageResponse } from "next/og";

const size = { width: 1200, height: 630 };

interface OgImageProps {
  title: string;
  description: string;
}

export function generateOgImage({ title, description }: OgImageProps) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0A0A0A",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* 층 라인들 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          {/* 2F */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              opacity: 0.3,
            }}
          >
            <div style={{ width: "60px", height: "1px", backgroundColor: "#4A4A4A" }} />
            <span style={{ color: "#4A4A4A", fontSize: "12px", letterSpacing: "3px" }}>2F</span>
            <div style={{ width: "60px", height: "1px", backgroundColor: "#4A4A4A" }} />
          </div>

          {/* 0.5F - 강조 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div style={{ width: "40px", height: "1px", backgroundColor: "#C45C2C" }} />
            <span style={{ color: "#C45C2C", fontSize: "14px", letterSpacing: "3px" }}>0.5F</span>
            <div style={{ width: "40px", height: "1px", backgroundColor: "#C45C2C" }} />
          </div>

          {/* 1F */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              opacity: 0.3,
            }}
          >
            <div style={{ width: "60px", height: "1px", backgroundColor: "#4A4A4A" }} />
            <span style={{ color: "#4A4A4A", fontSize: "12px", letterSpacing: "3px" }}>1F</span>
            <div style={{ width: "60px", height: "1px", backgroundColor: "#4A4A4A" }} />
          </div>
        </div>

        {/* 로고 */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            marginTop: "32px",
            gap: "4px",
          }}
        >
          <span style={{ color: "#F2F0ED", fontSize: "48px", fontWeight: 500 }}>floor</span>
          <span style={{ color: "#C45C2C", fontSize: "32px", fontWeight: 700 }}>05</span>
        </div>

        {/* 도구 타이틀 */}
        <h1
          style={{
            color: "#F2F0ED",
            fontSize: "56px",
            fontWeight: 700,
            marginTop: "40px",
            marginBottom: "0",
          }}
        >
          {title}
        </h1>

        {/* 서브멘트 */}
        <p
          style={{
            color: "#B0B0B0",
            fontSize: "24px",
            marginTop: "16px",
          }}
        >
          {description}
        </p>
      </div>
    ),
    { ...size }
  );
}
