import { useState } from "react";

const BASE = {
  black: "#0A0A0A",
  darkGray: "#1A1A1A",
  midGray: "#4A4A4A",
  lightGray: "#B0B0B0",
  offWhite: "#F2F0ED",
  white: "#FAFAFA",
};

const PALETTES = [
  {
    id: "burnt-orange",
    name: "Burnt Orange",
    accent: "#C45C2C",
    accentLight: "#E8734A",
    mood: "현재 선택",
    desc: "70년대 건축 도면, 빈티지 타자기 잉크. 레트로한 따뜻함.",
    tags: ["레트로", "따뜻함", "아날로그"],
    pros: "레트로 감성이 강하고 눈에 확 들어옴",
    cons: "약간 공격적일 수 있고, '카페 브랜딩' 느낌이 날 수 있음",
  },
  {
    id: "slate-teal",
    name: "Slate Teal",
    accent: "#4A7C7E",
    accentLight: "#5E9EA0",
    mood: "차분한 건축",
    desc: "콘크리트 위의 청록. 건축적 절제와 공간의 깊이감.",
    tags: ["건축적", "절제", "공간감"],
    pros: "과하지 않은 센스, 건축/공간 키워드에 가장 부합",
    cons: "임팩트가 약할 수 있음, 눈에 덜 띔",
  },
  {
    id: "muted-olive",
    name: "Muted Olive",
    accent: "#6B7D5E",
    accentLight: "#8A9E78",
    mood: "빈티지 내추럴",
    desc: "오래된 군용 장비, 빈티지 캔버스. 비주류의 묵직한 존재감.",
    tags: ["빈티지", "비주류", "묵직함"],
    pros: "비주류 감성이 강하고, 흑백과 조합 시 독특한 무드",
    cons: "칙칙하게 보일 수 있음, 디지털 프로덕트에서 활기 부족",
  },
  {
    id: "dusty-rose",
    name: "Dusty Rose",
    accent: "#B5706A",
    accentLight: "#D08E88",
    mood: "웨스 앤더슨",
    desc: "그랜드 부다페스트 호텔의 빛바랜 핑크. 키치하면서 우아함.",
    tags: ["웨스 앤더슨", "키치", "레트로"],
    pros: "웨스 앤더슨 감성에 가장 직접적. 독특하고 기억에 남음",
    cons: "호불호가 갈릴 수 있음, 테크 프로덕트와 거리감",
  },
  {
    id: "warm-mustard",
    name: "Warm Mustard",
    accent: "#C4993C",
    accentLight: "#DEB45A",
    mood: "아날로그 레코드",
    desc: "LP 재킷의 빛바랜 노랑. 미디엄템포의 따뜻한 리듬감.",
    tags: ["아날로그", "미디엄템포", "레코드"],
    pros: "LP/레코드 감성과 잘 맞고, 흑백 위에서 존재감 있음",
    cons: "주의 표시(warning)처럼 보일 수 있음",
  },
  {
    id: "deep-indigo",
    name: "Deep Indigo",
    accent: "#4A5580",
    accentLight: "#6270A0",
    mood: "미드나잇 스튜디오",
    desc: "새벽 작업실의 푸른 빛. 조용하지만 깊은 몰입감.",
    tags: ["미니멀", "모던", "깊이감"],
    pros: "모던하고 신뢰감 있음. 테크 프로덕트에 자연스러움",
    cons: "레트로보다 모던에 가까움, 개성이 덜할 수 있음",
  },
];

const fontStack = `'IBM Plex Mono', 'SF Mono', 'Fira Code', 'Courier New', monospace`;
const sansStack = `'Pretendard', 'Apple SD Gothic Neo', -apple-system, sans-serif`;

function LogoSymbol({ bg, fg, size = 64 }) {
  return (
    <div style={{
      width: size, height: size, backgroundColor: bg,
      borderRadius: size * 0.12, position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", bottom: "25%", left: 0, width: "35%", height: 1, backgroundColor: fg, opacity: 0.2 }} />
      <div style={{ position: "absolute", bottom: "25%", left: "35%", width: 1, height: "25%", backgroundColor: fg, opacity: 0.2 }} />
      <div style={{ position: "absolute", bottom: "50%", left: "35%", width: "65%", height: 1, backgroundColor: fg, opacity: 0.2 }} />
      <span style={{
        position: "absolute", bottom: "50%", left: "42%",
        fontFamily: fontStack, fontSize: size * 0.45, fontWeight: 700,
        color: fg, letterSpacing: -1, lineHeight: 1, paddingBottom: size * 0.02,
      }}>05</span>
    </div>
  );
}

function PaletteCard({ palette, selected, onSelect }) {
  const isSelected = selected === palette.id;
  return (
    <button
      onClick={() => onSelect(palette.id)}
      style={{
        all: "unset", cursor: "pointer",
        padding: "16px 20px", borderRadius: 10,
        backgroundColor: isSelected ? palette.accent + "12" : BASE.white,
        border: isSelected ? `2px solid ${palette.accent}` : `1px solid ${BASE.lightGray}33`,
        display: "flex", flexDirection: "column", gap: 8,
        transition: "all 0.2s",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 24, height: 24, borderRadius: 6, backgroundColor: palette.accent }} />
        <span style={{ fontFamily: fontStack, fontSize: 12, fontWeight: 600 }}>{palette.name}</span>
        {palette.mood === "현재 선택" && (
          <span style={{ fontFamily: fontStack, fontSize: 8, color: palette.accent, backgroundColor: palette.accent + "18", padding: "2px 6px", borderRadius: 4 }}>CURRENT</span>
        )}
      </div>
      <span style={{ fontFamily: sansStack, fontSize: 11, color: BASE.midGray }}>{palette.mood}</span>
    </button>
  );
}

export default function ColorCompare() {
  const [selected, setSelected] = useState("burnt-orange");
  const palette = PALETTES.find(p => p.id === selected);
  const accent = palette.accent;
  const accentLight = palette.accentLight;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: BASE.white, fontFamily: sansStack, color: BASE.black }}>
      {/* Header */}
      <div style={{
        padding: "18px 32px", borderBottom: `1px solid ${BASE.lightGray}22`,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        position: "sticky", top: 0, backgroundColor: BASE.white, zIndex: 10,
      }}>
        <div style={{ fontFamily: fontStack, display: "flex", alignItems: "baseline", gap: 3 }}>
          <span style={{ fontSize: 15, fontWeight: 500 }}>floor</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: accent, position: "relative", top: -4, transition: "color 0.3s" }}>05</span>
        </div>
        <span style={{ fontFamily: fontStack, fontSize: 9, color: BASE.lightGray, letterSpacing: 3, textTransform: "uppercase" }}>Color Palette Explorer</span>
      </div>

      <div style={{ padding: "40px 32px", maxWidth: 900, margin: "0 auto" }}>
        {/* Palette Selector */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: fontStack, fontSize: 10, color: BASE.lightGray, letterSpacing: 2, marginBottom: 16, textTransform: "uppercase" }}>Select Accent Color</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            {PALETTES.map(p => (
              <PaletteCard key={p.id} palette={p} selected={selected} onSelect={setSelected} />
            ))}
          </div>
        </div>

        {/* Color Info */}
        <div style={{
          backgroundColor: BASE.offWhite, borderRadius: 12, padding: 28, marginBottom: 40,
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24,
        }}>
          <div>
            <div style={{ fontFamily: fontStack, fontSize: 20, fontWeight: 700, color: accent, marginBottom: 8, transition: "color 0.3s" }}>{palette.name}</div>
            <div style={{ fontSize: 14, color: BASE.midGray, lineHeight: 1.7, marginBottom: 16 }}>{palette.desc}</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {palette.tags.map(t => (
                <span key={t} style={{
                  fontFamily: sansStack, fontSize: 11, padding: "4px 10px", borderRadius: 16,
                  backgroundColor: accent + "15", color: accent, fontWeight: 500, transition: "all 0.3s",
                }}>{t}</span>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ flex: 1 }}>
                <div style={{ height: 56, backgroundColor: accent, borderRadius: 8, transition: "background-color 0.3s" }} />
                <div style={{ fontFamily: fontStack, fontSize: 9, color: BASE.lightGray, marginTop: 4 }}>{accent}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ height: 56, backgroundColor: accentLight, borderRadius: 8, transition: "background-color 0.3s" }} />
                <div style={{ fontFamily: fontStack, fontSize: 9, color: BASE.lightGray, marginTop: 4 }}>{accentLight}</div>
              </div>
            </div>
            <div style={{
              padding: "10px 14px", borderRadius: 8,
              backgroundColor: "#28C840" + "0F", borderLeft: "3px solid #28C840",
            }}>
              <div style={{ fontFamily: fontStack, fontSize: 9, color: "#28C840", marginBottom: 4 }}>PROS</div>
              <div style={{ fontSize: 12, color: BASE.midGray, lineHeight: 1.5 }}>{palette.pros}</div>
            </div>
            <div style={{
              padding: "10px 14px", borderRadius: 8,
              backgroundColor: "#FF5F57" + "0F", borderLeft: "3px solid #FF5F57",
            }}>
              <div style={{ fontFamily: fontStack, fontSize: 9, color: "#FF5F57", marginBottom: 4 }}>CONS</div>
              <div style={{ fontSize: 12, color: BASE.midGray, lineHeight: 1.5 }}>{palette.cons}</div>
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div style={{ fontFamily: fontStack, fontSize: 10, color: BASE.lightGray, letterSpacing: 2, marginBottom: 16, textTransform: "uppercase" }}>Live Preview</div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Wordmark */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div style={{ backgroundColor: BASE.offWhite, borderRadius: 12, padding: 32, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
              <div style={{ fontFamily: fontStack, display: "flex", alignItems: "flex-end", gap: 2 }}>
                <span style={{ fontSize: 42, fontWeight: 500, lineHeight: 1 }}>floor</span>
                <span style={{ fontSize: 28, fontWeight: 700, color: accent, lineHeight: 1, position: "relative", top: -14, transition: "color 0.3s" }}>05</span>
              </div>
            </div>
            <div style={{ backgroundColor: BASE.black, borderRadius: 12, padding: 32, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
              <div style={{ fontFamily: fontStack, display: "flex", alignItems: "flex-end", gap: 2 }}>
                <span style={{ fontSize: 42, fontWeight: 500, lineHeight: 1, color: BASE.offWhite }}>floor</span>
                <span style={{ fontSize: 28, fontWeight: 700, color: accent, lineHeight: 1, position: "relative", top: -14, transition: "color 0.3s" }}>05</span>
              </div>
            </div>
          </div>

          {/* Symbol Variants */}
          <div style={{ display: "flex", gap: 16, alignItems: "end" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <LogoSymbol size={80} bg={BASE.black} fg={BASE.offWhite} />
              <span style={{ fontFamily: fontStack, fontSize: 9, color: BASE.lightGray }}>Dark</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <LogoSymbol size={80} bg={accent} fg={BASE.offWhite} />
              <span style={{ fontFamily: fontStack, fontSize: 9, color: BASE.lightGray }}>Accent</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <LogoSymbol size={80} bg={BASE.offWhite} fg={BASE.black} />
              <span style={{ fontFamily: fontStack, fontSize: 9, color: BASE.lightGray }}>Light</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <LogoSymbol size={32} bg={BASE.black} fg={BASE.offWhite} />
              <span style={{ fontFamily: fontStack, fontSize: 9, color: BASE.lightGray }}>Favicon</span>
            </div>
          </div>

          {/* Color Ratio Bar */}
          <div>
            <div style={{ display: "flex", borderRadius: 6, overflow: "hidden", height: 36 }}>
              <div style={{ flex: 50, backgroundColor: BASE.offWhite, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: fontStack, fontSize: 9, color: BASE.midGray }}>Paper 50%</span>
              </div>
              <div style={{ flex: 35, backgroundColor: BASE.black, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: fontStack, fontSize: 9, color: BASE.lightGray }}>Black 35%</span>
              </div>
              <div style={{ flex: 10, backgroundColor: BASE.midGray, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: fontStack, fontSize: 9, color: BASE.offWhite }}>Gray 10%</span>
              </div>
              <div style={{ flex: 5, backgroundColor: accent, display: "flex", alignItems: "center", justifyContent: "center", transition: "background-color 0.3s" }}>
                <span style={{ fontFamily: fontStack, fontSize: 8, color: BASE.offWhite }}>5%</span>
              </div>
            </div>
          </div>

          {/* Business Card */}
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{
              width: 300, height: 180, backgroundColor: BASE.offWhite, borderRadius: 8, padding: 22,
              display: "flex", flexDirection: "column", justifyContent: "space-between",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: `1px solid ${BASE.lightGray}22`,
            }}>
              <div style={{ fontFamily: fontStack, display: "flex", alignItems: "baseline", gap: 3 }}>
                <span style={{ fontSize: 18, fontWeight: 500 }}>floor</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: accent, position: "relative", top: -5, transition: "color 0.3s" }}>05</span>
              </div>
              <div>
                <div style={{ fontFamily: fontStack, fontSize: 8, color: BASE.lightGray, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>the floor that doesn't exist</div>
                <div style={{ fontFamily: fontStack, fontSize: 10, color: BASE.midGray }}>floor05.com</div>
              </div>
            </div>
            <div style={{
              width: 300, height: 180, backgroundColor: BASE.black, borderRadius: 8,
              display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            }}>
              <LogoSymbol size={56} bg={BASE.black} fg={BASE.offWhite} />
              <span style={{ fontFamily: sansStack, fontSize: 9, color: BASE.lightGray, letterSpacing: 4, marginTop: 10 }}>플로어공오</span>
            </div>
          </div>

          {/* Mock Landing */}
          <div style={{ borderRadius: 10, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
            <div style={{ backgroundColor: "#E8E6E3", padding: "8px 14px", display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ display: "flex", gap: 5 }}>
                {["#FF5F57", "#FEBC2E", "#28C840"].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: c }} />)}
              </div>
              <div style={{ flex: 1, backgroundColor: "#fff", borderRadius: 5, padding: "4px 10px", display: "flex", alignItems: "center", gap: 6, fontFamily: fontStack, fontSize: 11, color: BASE.midGray }}>
                <LogoSymbol size={14} bg={BASE.black} fg={BASE.offWhite} />
                floor05.com
              </div>
            </div>
            <div style={{ backgroundColor: BASE.black, padding: "40px 32px" }}>
              <div style={{ fontFamily: fontStack, display: "flex", alignItems: "baseline", gap: 3, marginBottom: 24 }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: BASE.offWhite }}>floor</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: accent, position: "relative", top: -3, transition: "color 0.3s" }}>05</span>
              </div>
              <div style={{ fontFamily: fontStack, fontSize: 9, color: accent, letterSpacing: 2, marginBottom: 8, transition: "color 0.3s" }}>ROOM 01</div>
              <div style={{ fontSize: 24, fontWeight: 600, color: BASE.offWhite, marginBottom: 8 }}>Trend Pulse</div>
              <div style={{ fontSize: 13, color: BASE.lightGray, lineHeight: 1.6 }}>실시간 트렌드 키워드 대시보드. 화제 이슈를 빠르게 캐치.</div>
              <div style={{
                marginTop: 20, display: "inline-block",
                padding: "10px 24px", borderRadius: 6,
                backgroundColor: accent, color: BASE.offWhite,
                fontFamily: fontStack, fontSize: 12, fontWeight: 600,
                transition: "background-color 0.3s",
              }}>
                시작하기 →
              </div>
            </div>
            <div style={{ backgroundColor: BASE.offWhite, padding: 32, display: "flex", alignItems: "center", justifyContent: "center", height: 80 }}>
              <span style={{ fontFamily: fontStack, fontSize: 11, color: BASE.lightGray }}>[ Product Demo Area ]</span>
            </div>
          </div>

          {/* Voice Preview */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div style={{
              padding: 20, backgroundColor: BASE.offWhite, borderRadius: 10,
              borderLeft: `3px solid ${accent}`, transition: "border-color 0.3s",
            }}>
              <div style={{ fontFamily: fontStack, fontSize: 9, color: accent, letterSpacing: 1, marginBottom: 8, transition: "color 0.3s" }}>TAGLINE</div>
              <div style={{ fontFamily: fontStack, fontSize: 14, fontStyle: "italic", color: BASE.midGray }}>The floor that doesn't exist.</div>
            </div>
            <div style={{
              padding: 20, backgroundColor: BASE.black, borderRadius: 10,
              borderLeft: `3px solid ${accent}`, transition: "border-color 0.3s",
            }}>
              <div style={{ fontFamily: fontStack, fontSize: 9, color: accent, letterSpacing: 1, marginBottom: 8, transition: "color 0.3s" }}>태그라인</div>
              <div style={{ fontSize: 14, color: BASE.offWhite }}>존재하지 않는 층에서 만듭니다.</div>
            </div>
          </div>

          {/* Social Profile */}
          <div style={{ width: 280, backgroundColor: BASE.offWhite, borderRadius: 12, overflow: "hidden", boxShadow: "0 3px 16px rgba(0,0,0,0.06)" }}>
            <div style={{ height: 72, backgroundColor: BASE.black, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: fontStack, fontSize: 8, letterSpacing: 4, color: BASE.midGray, textTransform: "uppercase" }}>the floor that doesn't exist</span>
            </div>
            <div style={{ padding: "0 16px 16px", position: "relative" }}>
              <div style={{ marginTop: -16 }}><LogoSymbol size={32} bg={accent} fg={BASE.offWhite} /></div>
              <div style={{ marginTop: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>플로어공오</div>
                <div style={{ fontFamily: fontStack, fontSize: 10, color: BASE.lightGray, marginTop: 2 }}>@floor05</div>
                <div style={{ fontSize: 11, color: BASE.midGray, marginTop: 6, lineHeight: 1.5 }}>
                  존재하지 않는 층에서 만듭니다.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendation */}
        <div style={{
          marginTop: 48, padding: 28, backgroundColor: BASE.offWhite, borderRadius: 12,
          border: `1px solid ${BASE.lightGray}22`,
        }}>
          <div style={{ fontFamily: fontStack, fontSize: 10, color: BASE.lightGray, letterSpacing: 2, marginBottom: 16, textTransform: "uppercase" }}>개인적인 추천</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { color: "#B5706A", name: "Dusty Rose", reason: "웨스 앤더슨 감성에 가장 직결. 흑백 + 빛바랜 핑크 조합은 다른 테크 브랜드와 확실히 차별화됨. 키치하면서도 우아한 floor05의 정체성에 가장 부합." },
              { color: "#4A7C7E", name: "Slate Teal", reason: "'과하지 않은 센스'와 '건축적 공간감' 키워드에 정확히 맞음. 차분하지만 존재감이 있어서 장기적으로 질리지 않음." },
              { color: "#C45C2C", name: "Burnt Orange", reason: "현재 선택. 레트로 감성이 강하고 에너지가 있음. 초기 브랜딩 임팩트가 필요한 시점에 유리." },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 120 }}>
                  <span style={{ fontFamily: fontStack, fontSize: 14, fontWeight: 700, color: BASE.midGray }}>#{i + 1}</span>
                  <div style={{ width: 20, height: 20, borderRadius: 5, backgroundColor: item.color }} />
                  <span style={{ fontFamily: fontStack, fontSize: 11, fontWeight: 600 }}>{item.name}</span>
                </div>
                <span style={{ fontSize: 12, color: BASE.midGray, lineHeight: 1.6 }}>{item.reason}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: "24px 32px", borderTop: `1px solid ${BASE.lightGray}22`, marginTop: 40 }}>
        <span style={{ fontFamily: fontStack, fontSize: 9, color: BASE.lightGray }}>floor05 Color Palette Explorer — 각 컬러를 클릭하면 전체 브랜드 요소에 실시간으로 적용됩니다.</span>
      </div>
    </div>
  );
}
