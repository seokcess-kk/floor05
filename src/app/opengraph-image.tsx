import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "floor05 - 존재하지 않는 층의 도구들";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
            gap: "24px",
          }}
        >
          {/* 2F */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              opacity: 0.3,
            }}
          >
            <div style={{ width: "80px", height: "1px", backgroundColor: "#4A4A4A" }} />
            <span style={{ color: "#4A4A4A", fontSize: "14px", letterSpacing: "4px" }}>2F</span>
            <div style={{ width: "80px", height: "1px", backgroundColor: "#4A4A4A" }} />
          </div>

          {/* 0.5F - 강조 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div style={{ width: "60px", height: "1px", backgroundColor: "#C45C2C" }} />
            <span style={{ color: "#C45C2C", fontSize: "16px", letterSpacing: "4px" }}>0.5F</span>
            <div style={{ width: "60px", height: "1px", backgroundColor: "#C45C2C" }} />
          </div>

          {/* 1F */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              opacity: 0.3,
            }}
          >
            <div style={{ width: "80px", height: "1px", backgroundColor: "#4A4A4A" }} />
            <span style={{ color: "#4A4A4A", fontSize: "14px", letterSpacing: "4px" }}>1F</span>
            <div style={{ width: "80px", height: "1px", backgroundColor: "#4A4A4A" }} />
          </div>
        </div>

        {/* 로고 */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            marginTop: "48px",
            gap: "4px",
          }}
        >
          <span style={{ color: "#F2F0ED", fontSize: "72px", fontWeight: 500 }}>floor</span>
          <span style={{ color: "#C45C2C", fontSize: "48px", fontWeight: 700 }}>05</span>
        </div>

        {/* 서브멘트 */}
        <p
          style={{
            color: "#B0B0B0",
            fontSize: "24px",
            marginTop: "24px",
          }}
        >
          존재하지 않는 층의 도구들
        </p>
      </div>
    ),
    { ...size }
  );
}
