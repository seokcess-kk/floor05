import { useState } from "react";

const COLORS = {
  black: "#0A0A0A",
  darkGray: "#1A1A1A",
  midGray: "#4A4A4A",
  lightGray: "#B0B0B0",
  offWhite: "#F2F0ED",
  white: "#FAFAFA",
  accent: "#C45C2C",
  accentLight: "#E8734A",
  accentMuted: "rgba(196, 92, 44, 0.12)",
};

const fontStack = `'IBM Plex Mono', 'SF Mono', 'Fira Code', 'JetBrains Mono', 'Courier New', monospace`;
const sansStack = `'Pretendard', 'Apple SD Gothic Neo', -apple-system, sans-serif`;

/* ── Logo Components ── */

function Wordmark({ size = 1, color = COLORS.black }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 2, fontFamily: fontStack }}>
      <span style={{ fontSize: 48 * size, fontWeight: 500, lineHeight: 1, color }}> floor</span>
      <span style={{
        fontSize: 32 * size, fontWeight: 700, color: COLORS.accent,
        lineHeight: 1, position: "relative", top: -16 * size,
      }}>05</span>
    </div>
  );
}

function WordmarkKorean({ size = 1, color = COLORS.black }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 4 }}>
      <span style={{ fontFamily: sansStack, fontSize: 32 * size, fontWeight: 300, letterSpacing: 2, color, lineHeight: 1 }}>플로어</span>
      <span style={{
        fontFamily: fontStack, fontSize: 28 * size, fontWeight: 700, color: COLORS.accent,
        lineHeight: 1, position: "relative", top: -10 * size,
      }}>공오</span>
    </div>
  );
}

function LogoSymbol({ bg = COLORS.black, fg = COLORS.offWhite, size = 80 }) {
  return (
    <div style={{
      width: size, height: size, backgroundColor: bg,
      borderRadius: size * 0.12, position: "relative", overflow: "hidden",
    }}>
      {/* 1층에서 올라오는 라인 (왼쪽 하단) */}
      <div style={{ position: "absolute", bottom: "25%", left: 0, width: "35%", height: 1, backgroundColor: fg, opacity: 0.2 }} />
      {/* 층간 단차를 연결하는 수직 라인 */}
      <div style={{ position: "absolute", bottom: "25%", left: "35%", width: 1, height: "25%", backgroundColor: fg, opacity: 0.2 }} />
      {/* 0.5층 계단참 라인 (오른쪽 상단) */}
      <div style={{ position: "absolute", bottom: "50%", left: "35%", width: "65%", height: 1, backgroundColor: fg, opacity: 0.2 }} />
      {/* 05 텍스트를 0.5층 계단참 라인 바로 위에 안착 */}
      <span style={{
        position: "absolute", bottom: "50%", left: "42%",
        fontFamily: fontStack, fontSize: size * 0.45, fontWeight: 700,
        color: fg, letterSpacing: -1, lineHeight: 1, paddingBottom: size * 0.02,
      }}>05</span>
    </div>
  );
}

function HeaderWordmark() {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 3, fontFamily: fontStack }}>
      <span style={{ fontSize: 15, fontWeight: 500 }}>floor</span>
      <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.accent, position: "relative", top: -4 }}>05</span>
    </div>
  );
}

/* ── UI Components ── */

function Section({ title, number, children }) {
  return (
    <div style={{ marginBottom: 72, paddingBottom: 72, borderBottom: `1px solid ${COLORS.lightGray}22` }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 36 }}>
        <span style={{ fontFamily: fontStack, fontSize: 12, color: COLORS.accent, fontWeight: 600 }}>{number}</span>
        <span style={{ fontFamily: fontStack, fontSize: 12, color: COLORS.midGray, textTransform: "uppercase", letterSpacing: 3, fontWeight: 500 }}>{title}</span>
      </div>
      {children}
    </div>
  );
}

function Card({ children, dark = false, style = {} }) {
  return (
    <div style={{ backgroundColor: dark ? COLORS.black : COLORS.offWhite, borderRadius: 12, padding: 32, color: dark ? COLORS.offWhite : COLORS.black, ...style }}>
      {children}
    </div>
  );
}

function Quote({ children }) {
  return (
    <div style={{ borderLeft: `3px solid ${COLORS.accent}`, paddingLeft: 24, margin: "24px 0" }}>
      <div style={{ fontFamily: sansStack, fontSize: 15, fontStyle: "italic", lineHeight: 1.8, color: COLORS.midGray }}>{children}</div>
    </div>
  );
}

function FloorDiagram() {
  const floors = [
    { label: "2F", name: "주류", desc: "대중이 사는 곳", opacity: 0.3 },
    { label: "0.5F", name: "floor05", desc: "우리가 만드는 곳", opacity: 1, accent: true },
    { label: "1F", name: "주류", desc: "대중이 사는 곳", opacity: 0.3 },
    { label: "B1", name: "언더그라운드", desc: "보이지 않는 곳", opacity: 0.15 },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {floors.map((f, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", gap: 16, padding: "14px 20px",
          backgroundColor: f.accent ? COLORS.accent : COLORS.black,
          opacity: f.accent ? 1 : f.opacity, borderRadius: 6,
        }}>
          <span style={{ fontFamily: fontStack, fontSize: 13, fontWeight: 700, color: COLORS.offWhite, width: 40 }}>{f.label}</span>
          <span style={{ fontFamily: fontStack, fontSize: 12, color: COLORS.offWhite, flex: 1 }}>{f.name}</span>
          <span style={{ fontFamily: fontStack, fontSize: 10, color: "rgba(255,255,255,0.6)" }}>{f.desc}</span>
        </div>
      ))}
    </div>
  );
}

function ProductCard({ floor, name, desc, status }) {
  const statusColors = { live: "#28C840", dev: COLORS.accent, idea: COLORS.lightGray };
  const statusLabels = { live: "LIVE", dev: "IN DEV", idea: "IDEA" };
  return (
    <div style={{
      backgroundColor: COLORS.offWhite, borderRadius: 10, padding: 24,
      border: `1px solid ${COLORS.lightGray}22`, display: "flex", flexDirection: "column", gap: 12,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: fontStack, fontSize: 10, color: COLORS.accent, fontWeight: 600 }}>{floor}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: statusColors[status] }} />
          <span style={{ fontFamily: fontStack, fontSize: 9, color: COLORS.lightGray, letterSpacing: 1 }}>{statusLabels[status]}</span>
        </div>
      </div>
      <div style={{ fontFamily: sansStack, fontSize: 15, fontWeight: 600 }}>{name}</div>
      <div style={{ fontFamily: sansStack, fontSize: 12, color: COLORS.midGray, lineHeight: 1.6 }}>{desc}</div>
    </div>
  );
}

function VoiceExample({ context, good, bad }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontFamily: fontStack, fontSize: 10, color: COLORS.accent, letterSpacing: 2, marginBottom: 12, textTransform: "uppercase" }}>{context}</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div style={{ padding: 16, backgroundColor: "rgba(40,200,64,0.06)", borderRadius: 8, borderLeft: "3px solid #28C840" }}>
          <div style={{ fontFamily: fontStack, fontSize: 9, color: "#28C840", marginBottom: 6, letterSpacing: 1 }}>DO</div>
          <div style={{ fontFamily: sansStack, fontSize: 13, color: COLORS.darkGray, lineHeight: 1.6, fontWeight: 500 }}>{good}</div>
        </div>
        <div style={{ padding: 16, backgroundColor: "rgba(255,95,87,0.06)", borderRadius: 8, borderLeft: "3px solid #FF5F57" }}>
          <div style={{ fontFamily: fontStack, fontSize: 9, color: "#FF5F57", marginBottom: 6, letterSpacing: 1 }}>DON'T</div>
          <div style={{ fontFamily: sansStack, fontSize: 13, color: COLORS.midGray, lineHeight: 1.6, textDecoration: "line-through" }}>{bad}</div>
        </div>
      </div>
    </div>
  );
}

function TimelineItem({ year, event, detail }) {
  return (
    <div style={{ display: "flex", gap: 20, marginBottom: 24 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: COLORS.accent, flexShrink: 0 }} />
        <div style={{ width: 1, flex: 1, backgroundColor: COLORS.lightGray + "33", marginTop: 4 }} />
      </div>
      <div style={{ paddingBottom: 16 }}>
        <div style={{ fontFamily: fontStack, fontSize: 11, color: COLORS.accent, fontWeight: 600, marginBottom: 4 }}>{year}</div>
        <div style={{ fontFamily: sansStack, fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{event}</div>
        <div style={{ fontFamily: sansStack, fontSize: 13, color: COLORS.midGray, lineHeight: 1.6 }}>{detail}</div>
      </div>
    </div>
  );
}

function KeywordPill({ children, accent = false }) {
  return (
    <span style={{
      display: "inline-block", padding: "6px 14px", borderRadius: 20,
      backgroundColor: accent ? COLORS.accent : COLORS.offWhite,
      color: accent ? COLORS.offWhite : COLORS.midGray,
      fontFamily: sansStack, fontSize: 12, margin: "0 6px 8px 0", fontWeight: 500,
    }}>{children}</span>
  );
}

/* ── Main Component ── */

export default function BrandGuide() {
  const [activeTab, setActiveTab] = useState("story");

  const tabs = [
    { id: "story", label: "Brand Story" },
    { id: "architecture", label: "Architecture" },
    { id: "identity", label: "Visual Identity" },
    { id: "voice", label: "Voice & Tone" },
    { id: "extension", label: "Extensibility" },
    { id: "applications", label: "Applications" },
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: COLORS.white, fontFamily: sansStack, color: COLORS.black }}>
      {/* Header */}
      <div style={{
        borderBottom: `1px solid ${COLORS.lightGray}22`, padding: "18px 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, backgroundColor: COLORS.white, zIndex: 10,
      }}>
        <HeaderWordmark />
        <span style={{ fontFamily: fontStack, fontSize: 9, color: COLORS.lightGray, letterSpacing: 3, textTransform: "uppercase" }}>Brand Guide v2.1 — Comprehensive</span>
      </div>

      {/* Tab Navigation */}
      <div style={{ padding: "0 32px", borderBottom: `1px solid ${COLORS.lightGray}22`, display: "flex", gap: 0, overflowX: "auto" }}>
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            padding: "13px 16px", fontFamily: fontStack, fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase",
            color: activeTab === tab.id ? COLORS.accent : COLORS.lightGray, backgroundColor: "transparent",
            border: "none", borderBottom: activeTab === tab.id ? `2px solid ${COLORS.accent}` : "2px solid transparent",
            cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s",
          }}>{tab.label}</button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: "52px 32px", maxWidth: 820, margin: "0 auto" }}>

        {/* ═══════════════ BRAND STORY ═══════════════ */}
        {activeTab === "story" && (
          <>
            <Section title="Origin Story" number="01">
              <Card style={{ marginBottom: 32 }}>
                <div style={{ fontSize: 24, fontWeight: 600, lineHeight: 1.5, marginBottom: 20 }}>
                  건물에는 1층과 2층 사이에{" "}
                  <span style={{ color: COLORS.accent, fontWeight: 700 }}>존재하지 않는 층</span>이 있다.
                </div>
                <div style={{ fontSize: 15, color: COLORS.midGray, lineHeight: 1.8 }}>
                  엘리베이터 버튼에도 없고, 안내 표지판에도 없다.
                  하지만 누군가는 그 층이 있다는 걸 안다.
                  계단 중간에 멈춰 서면, 위에서도 아래에서도 들리지 않는
                  조용한 공간이 있다. 거기서 우리는 만든다.
                </div>
              </Card>
              <FloorDiagram />
              <div style={{ fontSize: 14, color: COLORS.midGray, lineHeight: 1.8, marginTop: 32 }}>
                floor05는 메인스트림이 아닌 곳에서 자기만의 속도로 무언가를 만드는 사람의 브랜드입니다.
                빠를 필요 없고, 클 필요도 없습니다. 다만 자기만의 리듬으로, 자기만의 층에서, 진짜 쓸모 있는 것을 만듭니다.
              </div>
            </Section>

            <Section title="Brand Philosophy" number="02">
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {[
                  { title: "나만의 속도", en: "My Own Tempo", desc: "남의 속도에 맞추지 않는다. 미디엄템포. 느리지도 빠르지도 않은, 나에게 맞는 리듬으로 만든다." },
                  { title: "존재하지 않는 층", en: "The Floor That Doesn't Exist", desc: "주류와 주류 사이. 보이지 않지만 분명히 존재하는 공간. 비주류라는 건 없다는 게 아니라, 다른 곳에 있다는 것." },
                  { title: "과하지 않은 센스", en: "Understated Sense", desc: "소리 지르지 않는다. 화려하지 않지만 한번 보면 기억에 남는. 절제된 감각이 가장 오래간다." },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 20, padding: 24, borderLeft: `3px solid ${COLORS.accent}` }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{item.title}</div>
                      <div style={{ fontFamily: fontStack, fontSize: 10, color: COLORS.accent, letterSpacing: 1, marginBottom: 12, textTransform: "uppercase" }}>{item.en}</div>
                      <div style={{ fontSize: 14, color: COLORS.midGray, lineHeight: 1.7 }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Brand Keywords" number="03">
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontFamily: fontStack, fontSize: 10, color: COLORS.lightGray, letterSpacing: 2, marginBottom: 12, textTransform: "uppercase" }}>Core</div>
                <KeywordPill accent>비주류</KeywordPill>
                <KeywordPill accent>나만의 속도</KeywordPill>
                <KeywordPill accent>미디엄템포</KeywordPill>
              </div>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontFamily: fontStack, fontSize: 10, color: COLORS.lightGray, letterSpacing: 2, marginBottom: 12, textTransform: "uppercase" }}>Aesthetic</div>
                <KeywordPill>레트로</KeywordPill>
                <KeywordPill>모노스페이스</KeywordPill>
                <KeywordPill>공간감</KeywordPill>
                <KeywordPill>웨스 앤더슨</KeywordPill>
                <KeywordPill>절제된 센스</KeywordPill>
              </div>
              <div>
                <div style={{ fontFamily: fontStack, fontSize: 10, color: COLORS.lightGray, letterSpacing: 2, marginBottom: 12, textTransform: "uppercase" }}>Attitude</div>
                <KeywordPill>건축적</KeywordPill>
                <KeywordPill>키치</KeywordPill>
                <KeywordPill>아날로그</KeywordPill>
                <KeywordPill>독립적</KeywordPill>
                <KeywordPill>실험적</KeywordPill>
              </div>
            </Section>

            <Section title="Founder's Note" number="04">
              <Card dark>
                <Quote>
                  "모든 건물에는 0.5층이 있다. 다만 대부분의 사람들은 그 층의 존재를 모른 채 지나친다.
                  나는 거기서 멈춰서, 문을 열고, 무언가를 만들기로 했다.
                  빠르게 성장하는 것보다 오래 만드는 것. 많은 사람이 쓰는 것보다 쓰는 사람이 좋아하는 것.
                  floor05는 그런 것들을 만드는 곳이다."
                </Quote>
                <div style={{ fontFamily: fontStack, fontSize: 11, color: COLORS.lightGray, marginTop: 16, textAlign: "right" }}>— floor05 founder</div>
              </Card>
            </Section>
          </>
        )}

        {/* ═══════════════ ARCHITECTURE ═══════════════ */}
        {activeTab === "architecture" && (
          <>
            <Section title="Brand Architecture" number="05">
              <div style={{ fontSize: 14, color: COLORS.midGray, lineHeight: 1.8, marginBottom: 32 }}>
                floor05는 <strong>"Branded House"</strong> 모델을 채택합니다.
                하나의 브랜드 아래 다양한 프로덕트가 "층"과 "호실"의 메타포로 연결됩니다.
                각 프로덕트는 독립적이지만, floor05라는 건물 안에 있다는 공통 정체성을 공유합니다.
              </div>

              <Card style={{ marginBottom: 32 }}>
                <div style={{ fontFamily: fontStack, fontSize: 10, color: COLORS.accent, letterSpacing: 2, marginBottom: 20, textTransform: "uppercase" }}>Structure</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <div style={{ backgroundColor: COLORS.black, color: COLORS.offWhite, padding: "16px 20px", borderRadius: "8px 8px 2px 2px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontFamily: fontStack, display: "flex", alignItems: "baseline", gap: 3 }}>
                      <span style={{ fontSize: 14, fontWeight: 500 }}>floor</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: COLORS.accent, position: "relative", top: -3 }}>05</span>
                    </div>
                    <span style={{ fontFamily: fontStack, fontSize: 10, color: COLORS.lightGray }}>Master Brand</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 3 }}>
                    {[
                      { room: "Room A", type: "유틸리티 툴" },
                      { room: "Room B", type: "콘텐츠 플랫폼" },
                      { room: "Room C", type: "실험 프로젝트" },
                    ].map((item, i) => (
                      <div key={i} style={{
                        backgroundColor: COLORS.offWhite, padding: "14px 16px",
                        borderRadius: i === 0 ? "2px 2px 2px 8px" : i === 2 ? "2px 2px 8px 2px" : "2px",
                        border: `1px solid ${COLORS.lightGray}22`,
                      }}>
                        <div style={{ fontFamily: fontStack, fontSize: 12, fontWeight: 600, marginBottom: 4 }}>{item.room}</div>
                        <div style={{ fontSize: 11, color: COLORS.lightGray }}>{item.type}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              <div style={{ fontSize: 13, color: COLORS.midGray, lineHeight: 1.8 }}>
                각 프로덕트는 "Room" 또는 고유 이름을 가지며, floor05 브랜드 아래 서브 레이블로 운영됩니다.
                이 구조를 통해 프로덕트 간 크로스 프로모션이 가능하고,
                하나의 프로덕트가 성장하면 전체 브랜드 인지도가 함께 올라갑니다.
              </div>
            </Section>

            <Section title="Naming Convention" number="06">
              <div style={{ fontSize: 14, color: COLORS.midGray, lineHeight: 1.8, marginBottom: 24 }}>
                프로덕트 이름은 세 가지 네이밍 패턴 중 하나를 따릅니다.
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { pattern: "Pattern A — 호실 번호", rule: "floor05 + 호실명", examples: "Room 01, Room 02, Room 03...", useCase: "시리즈형 프로덕트, 순차적으로 번호 부여", domain: "floor05.com/room01" },
                  { pattern: "Pattern B — 고유 이름", rule: "floor05 + 프로덕트 고유명", examples: "floor05 Tempo, floor05 Mono, floor05 Draft", useCase: "독립 브랜딩이 필요한 프로덕트", domain: "tempo.floor05.com" },
                  { pattern: "Pattern C — 독립 브랜드", rule: '"by floor05" 표기', examples: "PixelNote by floor05, HalfBeat by floor05", useCase: "완전히 독립적인 프로덕트, 별도 도메인", domain: "pixelnote.com" },
                ].map((item, i) => (
                  <Card key={i}>
                    <div style={{ fontFamily: fontStack, fontSize: 11, color: COLORS.accent, fontWeight: 600, letterSpacing: 1, marginBottom: 12 }}>{item.pattern}</div>
                    <div style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: "8px 16px", fontSize: 12 }}>
                      <span style={{ color: COLORS.lightGray }}>Rule</span>
                      <span style={{ color: COLORS.midGray }}>{item.rule}</span>
                      <span style={{ color: COLORS.lightGray }}>Examples</span>
                      <span style={{ color: COLORS.midGray }}>{item.examples}</span>
                      <span style={{ color: COLORS.lightGray }}>Use case</span>
                      <span style={{ color: COLORS.midGray }}>{item.useCase}</span>
                      <span style={{ color: COLORS.lightGray }}>Domain</span>
                      <span style={{ fontFamily: fontStack, color: COLORS.accent }}>{item.domain}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </Section>

            <Section title="Product Portfolio (Example)" number="07">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <ProductCard floor="Room 01" name="Trend Pulse" desc="실시간 트렌드 키워드 대시보드. 화제 이슈를 빠르게 캐치." status="idea" />
                <ProductCard floor="Room 02" name="Vibe Timer" desc="포모도로 + 앰비언트 사운드. 나만의 작업 리듬 생성기." status="idea" />
                <ProductCard floor="Room 03" name="Mono Note" desc="마크다운 기반 미니멀 메모. 모노스페이스 감성." status="idea" />
                <ProductCard floor="Experiment" name="????" desc="다음에 만들 것. 아직 존재하지 않는 호실." status="idea" />
              </div>
              <div style={{ fontSize: 11, color: COLORS.lightGray, marginTop: 16, fontStyle: "italic" }}>
                * 위 프로덕트는 예시입니다. 실제 첫 프로덕트는 시장 반응을 보며 결정합니다.
              </div>
            </Section>
          </>
        )}

        {/* ═══════════════ VISUAL IDENTITY ═══════════════ */}
        {activeTab === "identity" && (
          <>
            <Section title="Logo System" number="08">
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                <Card>
                  <div style={{ fontFamily: fontStack, fontSize: 10, color: COLORS.lightGray, letterSpacing: 2, marginBottom: 20, textTransform: "uppercase" }}>Wordmark — Light</div>
                  <Wordmark />
                  <div style={{ fontFamily: fontStack, marginTop: 16, fontSize: 11, color: COLORS.midGray, lineHeight: 1.8 }}>
                    '05'의 베이스라인을 'floor'보다 위로 올려 층간에 존재하는 공간감을 표현.
                    <br />크기 차이(48px vs 32px)로 주종관계를 설정하되, 악센트 컬러로 시선을 유도.
                  </div>
                </Card>

                <Card dark>
                  <div style={{ fontFamily: fontStack, fontSize: 10, color: COLORS.lightGray, letterSpacing: 2, marginBottom: 20, textTransform: "uppercase" }}>Wordmark — Dark</div>
                  <Wordmark color={COLORS.offWhite} />
                </Card>

                <Card>
                  <div style={{ fontFamily: fontStack, fontSize: 10, color: COLORS.lightGray, letterSpacing: 2, marginBottom: 20, textTransform: "uppercase" }}>Korean Logotype</div>
                  <WordmarkKorean />
                  <div style={{ fontFamily: fontStack, marginTop: 16, fontSize: 11, color: COLORS.midGray, lineHeight: 1.8 }}>
                    한글 "플로어"는 Pretendard Light, "공오"는 모노스페이스 Bold + 악센트 컬러.
                    <br />영문 워드마크와 동일한 베이스라인 오프셋 적용.
                  </div>
                </Card>
              </div>
            </Section>

            <Section title="Symbol / Favicon" number="09">
              <div style={{ display: "flex", gap: 24, alignItems: "end", flexWrap: "wrap", marginBottom: 24 }}>
                {[100, 64, 48, 32, 16].map(size => (
                  <div key={size} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <LogoSymbol size={size} />
                    <span style={{ fontFamily: fontStack, fontSize: 10, color: COLORS.lightGray }}>{size}px</span>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  <LogoSymbol size={56} bg={COLORS.accent} fg={COLORS.offWhite} />
                  <span style={{ fontFamily: fontStack, fontSize: 10, color: COLORS.lightGray }}>Accent</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  <LogoSymbol size={56} bg={COLORS.offWhite} fg={COLORS.black} />
                  <span style={{ fontFamily: fontStack, fontSize: 10, color: COLORS.lightGray }}>Light</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  <LogoSymbol size={56} bg={COLORS.black} fg={COLORS.offWhite} />
                  <span style={{ fontFamily: fontStack, fontSize: 10, color: COLORS.lightGray }}>Dark</span>
                </div>
              </div>

              <Card>
                <div style={{ fontSize: 13, color: COLORS.midGray, lineHeight: 1.8 }}>
                  <strong style={{ color: COLORS.accent }}>계단참 모티브</strong> — 왼쪽 하단에서 시작한 선이 중간에 한 단 올라가는 계단 형태로, 1층과 2층 사이의 0.5층을 형상화합니다.
                  "05" 텍스트는 이 계단참 위에 안착되어 '0.5층에 존재한다'는 브랜드 스토리를 시각적으로 완성합니다.
                  <br />파비콘, 앱 아이콘, SNS 프로필, 워터마크에 사용합니다.
                </div>
              </Card>
            </Section>

            <Section title="Color System" number="10">
              <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
                {[
                  { hex: COLORS.black, name: "Black", code: "#0A0A0A" },
                  { hex: COLORS.darkGray, name: "Dark", code: "#1A1A1A" },
                  { hex: COLORS.midGray, name: "Mid", code: "#4A4A4A" },
                  { hex: COLORS.lightGray, name: "Light", code: "#B0B0B0" },
                  { hex: COLORS.offWhite, name: "Paper", code: "#F2F0ED" },
                ].map(c => (
                  <div key={c.name} style={{ flex: 1 }}>
                    <div style={{
                      height: 80, backgroundColor: c.hex, borderRadius: 8,
                      border: c.hex === COLORS.offWhite ? `1px solid ${COLORS.lightGray}44` : "none",
                    }} />
                    <div style={{ fontFamily: fontStack, fontSize: 10, color: COLORS.midGray, marginTop: 6 }}>{c.name}</div>
                    <div style={{ fontFamily: fontStack, fontSize: 9, color: COLORS.lightGray }}>{c.code}</div>
                  </div>
                ))}
                <div style={{ flex: 1 }}>
                  <div style={{ height: 80, backgroundColor: COLORS.accent, borderRadius: 8 }} />
                  <div style={{ fontFamily: fontStack, fontSize: 10, color: COLORS.midGray, marginTop: 6 }}>Accent</div>
                  <div style={{ fontFamily: fontStack, fontSize: 9, color: COLORS.lightGray }}>#C45C2C</div>
                </div>
              </div>

              <div style={{ display: "flex", borderRadius: 6, overflow: "hidden", height: 40, marginBottom: 24 }}>
                <div style={{ flex: 50, backgroundColor: COLORS.offWhite, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: fontStack, fontSize: 9, color: COLORS.midGray }}>Paper 50%</span>
                </div>
                <div style={{ flex: 35, backgroundColor: COLORS.black, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: fontStack, fontSize: 9, color: COLORS.lightGray }}>Black 35%</span>
                </div>
                <div style={{ flex: 10, backgroundColor: COLORS.midGray, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: fontStack, fontSize: 9, color: COLORS.offWhite }}>Gray 10%</span>
                </div>
                <div style={{ flex: 5, backgroundColor: COLORS.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: fontStack, fontSize: 8, color: COLORS.offWhite }}>5%</span>
                </div>
              </div>

              <Card>
                <div style={{ fontSize: 13, color: COLORS.midGray, lineHeight: 1.8 }}>
                  <span style={{ color: COLORS.accent, fontWeight: 600 }}>Burnt Orange #C45C2C</span> — 70년대 건축 도면, 빈티지 타자기 잉크에서 영감.
                  레트로한 따뜻함과 테크 감성의 교차점. Off White(#F2F0ED)는 순백이 아닌 누런 종이 톤으로 레트로 감성 강화.
                </div>
              </Card>
            </Section>

            <Section title="Typography" number="11">
              <Card style={{ marginBottom: 16 }}>
                <div style={{ fontFamily: fontStack, fontSize: 10, color: COLORS.lightGray, letterSpacing: 2, marginBottom: 16, textTransform: "uppercase" }}>Primary — Monospace</div>
                <div style={{ fontFamily: fontStack, fontSize: 28, fontWeight: 400, marginBottom: 12 }}>IBM Plex Mono</div>
                <div style={{ fontFamily: fontStack, fontSize: 13, color: COLORS.midGray, lineHeight: 1.8 }}>
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
                  abcdefghijklmnopqrstuvwxyz<br />
                  0123456789 !@#$%^&*
                </div>
                <div style={{ fontFamily: fontStack, fontSize: 11, color: COLORS.lightGray, marginTop: 12 }}>
                  Usage: 로고, UI 라벨, 코드 블록, 숫자 표기
                </div>
              </Card>
              <Card>
                <div style={{ fontFamily: fontStack, fontSize: 10, color: COLORS.lightGray, letterSpacing: 2, marginBottom: 16, textTransform: "uppercase" }}>Secondary — Korean</div>
                <div style={{ fontFamily: sansStack, fontSize: 28, fontWeight: 600, marginBottom: 12 }}>Pretendard</div>
                <div style={{ fontFamily: sansStack, fontSize: 14, color: COLORS.midGray, lineHeight: 1.8 }}>
                  가나다라마바사아자차카타파하<br />
                  직선적이고 건축적인 느낌. 존재하지 않는 층에서 만듭니다.
                </div>
                <div style={{ fontFamily: fontStack, fontSize: 11, color: COLORS.lightGray, marginTop: 12 }}>
                  Usage: 본문 텍스트, 마케팅 카피, UI 한글 텍스트
                </div>
                <div style={{ marginTop: 16, padding: "12px 16px", backgroundColor: COLORS.accentMuted, borderRadius: 6 }}>
                  <div style={{ fontFamily: fontStack, fontSize: 10, color: COLORS.accent, marginBottom: 6 }}>WHY PRETENDARD?</div>
                  <div style={{ fontSize: 12, color: COLORS.midGray, lineHeight: 1.6 }}>
                    Noto Sans KR 대비 지오메트릭하고 구조적인 글리프. IBM Plex Mono의 직선적 성격과 궁합이 맞으며, '건축적', '절제된 센스' 키워드에 부합.
                  </div>
                </div>
              </Card>
            </Section>
          </>
        )}

        {/* ═══════════════ VOICE & TONE ═══════════════ */}
        {activeTab === "voice" && (
          <>
            <Section title="Brand Voice" number="12">
              <div style={{ fontSize: 14, color: COLORS.midGray, lineHeight: 1.8, marginBottom: 32 }}>
                floor05의 목소리는 <strong>"조용하지만 확실한 사람"</strong>입니다.
                많이 말하지 않지만, 말할 때 정확하고. 유머가 있지만 떠들썩하지 않고.
                전문적이지만 권위적이지 않습니다.
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
                {[
                  { trait: "담백함", desc: "불필요한 수식어를 빼고, 핵심만 말한다." },
                  { trait: "위트", desc: "과하지 않은 유머. 슬쩍 웃기는 정도." },
                  { trait: "가치의 명확성", desc: "담백하게 말하되, 유저가 얻는 혜택(Value)은 숨기지 않고 날카롭게 드러낸다. 과장은 빼되, 뾰족함은 유지한다.", highlight: true },
                  { trait: "독립적", desc: "트렌드를 따르지 않고, 자기 기준으로 말한다." },
                ].map((item, i) => (
                  <div key={i} style={{
                    padding: 20,
                    borderLeft: `2px solid ${item.highlight ? COLORS.accentLight : COLORS.accent}`,
                    backgroundColor: item.highlight ? COLORS.accentMuted : COLORS.offWhite,
                    borderRadius: "0 8px 8px 0",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                      <span style={{ fontSize: 15, fontWeight: 700 }}>{item.trait}</span>
                      {item.highlight && <span style={{ fontFamily: fontStack, fontSize: 8, color: COLORS.accent, backgroundColor: COLORS.white, padding: "2px 6px", borderRadius: 4, fontWeight: 600 }}>NEW</span>}
                    </div>
                    <div style={{ fontSize: 13, color: COLORS.midGray, lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Tone Spectrum" number="13">
              <div style={{ marginBottom: 32 }}>
                {[
                  { left: "격식체", right: "구어체", position: 65 },
                  { left: "진지함", right: "유머러스", position: 60 },
                  { left: "전문적", right: "캐주얼", position: 55 },
                  { left: "절제된", right: "표현적", position: 35 },
                  { left: "소극적", right: "가치 중심", position: 75 },
                ].map((item, i) => (
                  <div key={i} style={{ marginBottom: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontFamily: fontStack, fontSize: 10, color: COLORS.lightGray, marginBottom: 6 }}>
                      <span>{item.left}</span><span>{item.right}</span>
                    </div>
                    <div style={{ height: 4, backgroundColor: COLORS.offWhite, borderRadius: 2, position: "relative" }}>
                      <div style={{
                        position: "absolute", left: `${item.position}%`, top: -4,
                        width: 12, height: 12, borderRadius: "50%", backgroundColor: COLORS.accent, transform: "translateX(-50%)",
                      }} />
                    </div>
                  </div>
                ))}
              </div>
              <Card>
                <div style={{ fontSize: 12, color: COLORS.midGray, lineHeight: 1.8 }}>
                  <span style={{ color: COLORS.accent, fontWeight: 600 }}>핵심 원칙:</span> 담백함이 소극적 메시지가 되지 않도록 한다.
                  말은 짧게 하되, 유저가 얻는 가치는 반드시 드러낸다.
                  "써보세요"가 아니라 "이걸 쓰면 이게 해결됩니다"가 되어야 한다.
                </div>
              </Card>
            </Section>

            <Section title="Writing Examples" number="14">
              <VoiceExample
                context="랜딩페이지 헤드카피 (Value Proposition)"
                good='"복잡한 설정 없이, 클릭 두 번으로 끝나는 타이머."'
                bad='"우리의 혁신적인 알고리즘으로 당신의 삶을 변화시킬 최고의 타이머."'
              />
              <VoiceExample
                context="프로덕트 소개"
                good='"간단한 도구입니다. 잘 됩니다. 써보세요."'
                bad='"혁신적인 AI 기반 솔루션으로 당신의 생산성을 극대화하세요!"'
              />
              <VoiceExample
                context="에러/장애 안내"
                good='"지금 고장났습니다. 고치는 중이에요. 30분 정도 걸릴 것 같습니다."'
                bad='"현재 일시적인 서비스 장애가 발생하여 이용에 불편을 드려 대단히 죄송합니다."'
              />
              <VoiceExample
                context="SNS 포스팅"
                good='"새로운 거 하나 만들었습니다. 별 건 아닌데 쓸만해요. → floor05.com/room03"'
                bad='"드디어! 오랜 기간 준비한 신규 서비스를 런칭합니다! 많은 관심 부탁드려요!"'
              />
              <VoiceExample
                context="자기소개"
                good='"존재하지 않는 층에서 이것저것 만듭니다."'
                bad='"IT 전문가가 운영하는 디지털 프로덕트 스튜디오입니다."'
              />
              <VoiceExample
                context="광고 카피"
                good='"메모 앱이 너무 많죠. 이건 진짜 메모만 됩니다."'
                bad='"당신의 노트를 혁신하는 올인원 생산성 플랫폼!"'
              />
            </Section>

            <Section title="Taglines" number="15">
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { text: "The floor that doesn't exist.", use: "Primary EN" },
                  { text: "존재하지 않는 층에서 만듭니다.", use: "Primary KR" },
                  { text: "Between floors, between rules.", use: "Secondary EN" },
                  { text: "나만의 속도, 나만의 층.", use: "Secondary KR" },
                  { text: "0.5층에서 보내는 신호.", use: "Newsletter / Blog" },
                  { text: "여기는 공오층입니다.", use: "Casual / SNS" },
                ].map((item, i) => (
                  <div key={i} style={{
                    padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center",
                    backgroundColor: i % 2 === 0 ? COLORS.offWhite : COLORS.white, borderRadius: 6,
                  }}>
                    <span style={{ fontSize: 13, fontStyle: i % 2 === 0 ? "italic" : "normal" }}>{item.text}</span>
                    <span style={{ fontFamily: fontStack, fontSize: 9, color: COLORS.lightGray, letterSpacing: 1 }}>{item.use}</span>
                  </div>
                ))}
              </div>
            </Section>
          </>
        )}

        {/* ═══════════════ EXTENSIBILITY ═══════════════ */}
        {activeTab === "extension" && (
          <>
            <Section title="Scalability Model" number="16">
              <div style={{ fontSize: 14, color: COLORS.midGray, lineHeight: 1.8, marginBottom: 32 }}>
                floor05의 "건물" 메타포는 무한히 확장 가능합니다.
                프로덕트가 늘어나면 호실이 늘어나고, 카테고리가 다양해지면 동(棟)이나 층이 추가됩니다.
                이 구조는 1개의 프로덕트에서 100개까지 일관된 브랜드 경험을 유지합니다.
              </div>

              <Card style={{ marginBottom: 24 }}>
                <div style={{ fontFamily: fontStack, fontSize: 10, color: COLORS.accent, letterSpacing: 2, marginBottom: 16, textTransform: "uppercase" }}>Growth Stages</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {[
                    { stage: "Stage 1", count: "1~3개", structure: "floor05.com/room01, /room02...", desc: "단일 도메인, 서브 페이지로 운영" },
                    { stage: "Stage 2", count: "4~10개", structure: "room01.floor05.com (서브도메인)", desc: "서브도메인 분리, 개별 프로덕트 독립성 확보" },
                    { stage: "Stage 3", count: "10개+", structure: "독립 도메인 + 'by floor05'", desc: "성공한 프로덕트는 독립 브랜드로 분리" },
                  ].map((item, i) => (
                    <div key={i} style={{
                      display: "grid", gridTemplateColumns: "70px 60px 1fr", gap: 16, padding: "14px 0",
                      borderBottom: i < 2 ? `1px solid ${COLORS.lightGray}22` : "none",
                    }}>
                      <span style={{ fontFamily: fontStack, fontSize: 11, color: COLORS.accent, fontWeight: 600 }}>{item.stage}</span>
                      <span style={{ fontSize: 12, color: COLORS.midGray }}>{item.count}</span>
                      <div>
                        <div style={{ fontFamily: fontStack, fontSize: 11, color: COLORS.midGray, marginBottom: 2 }}>{item.structure}</div>
                        <div style={{ fontSize: 11, color: COLORS.lightGray }}>{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </Section>

            <Section title="Revenue Channels" number="17">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[
                  { channel: "광고 수익", icon: "📡", desc: "트래픽 기반 프로덕트에 AdSense, 카카오 애드핏 등 적용", priority: "PRIMARY" },
                  { channel: "프리미엄 전환", icon: "⬆", desc: "무료 → 유료 기능 잠금. 월/연 구독 모델", priority: "SECONDARY" },
                  { channel: "제휴/스폰서", icon: "🤝", desc: "니치 오디언스 확보 후 관련 브랜드 제휴", priority: "GROWTH" },
                  { channel: "디지털 상품", icon: "📦", desc: "템플릿, 프리셋, 가이드 등 원샷 판매", priority: "GROWTH" },
                ].map((item, i) => (
                  <Card key={i}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <span style={{ fontSize: 20 }}>{item.icon}</span>
                      <span style={{ fontFamily: fontStack, fontSize: 8, color: COLORS.accent, letterSpacing: 2, fontWeight: 600 }}>{item.priority}</span>
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>{item.channel}</div>
                    <div style={{ fontSize: 12, color: COLORS.midGray, lineHeight: 1.6 }}>{item.desc}</div>
                  </Card>
                ))}
              </div>
            </Section>

            <Section title="Content & Channel Strategy" number="18">
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { channel: "floor05.com", role: "홈 & 포트폴리오", desc: "모든 프로덕트의 허브. 브랜드 소개 + 프로덕트 목록" },
                  { channel: "Blog / Newsletter", role: "0.5층에서 보내는 신호", desc: "빌딩 로그, 개발 기록, 회고. 브랜드 스토리텔링의 핵심 채널" },
                  { channel: "X (Twitter)", role: "짧은 생각 + 런칭 공지", desc: "담백한 톤으로 진행 상황 공유. 개발자/메이커 커뮤니티 연결" },
                  { channel: "Instagram", role: "비주얼 브랜딩", desc: "프로덕트 스크린샷, 브랜드 키비주얼, 공간 사진" },
                  { channel: "GitHub", role: "오픈소스 / 신뢰 구축", desc: "일부 프로덕트 오픈소스화. 개발자 커뮤니티 신뢰 확보" },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: "grid", gridTemplateColumns: "140px 160px 1fr", gap: 16, padding: "12px 16px",
                    backgroundColor: i % 2 === 0 ? COLORS.offWhite : "transparent", borderRadius: 6, alignItems: "center",
                  }}>
                    <span style={{ fontFamily: fontStack, fontSize: 12, fontWeight: 600 }}>{item.channel}</span>
                    <span style={{ fontSize: 12, color: COLORS.accent }}>{item.role}</span>
                    <span style={{ fontSize: 12, color: COLORS.midGray }}>{item.desc}</span>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Roadmap Vision" number="19">
              <TimelineItem year="Phase 1" event="Foundation" detail="사업자등록, 도메인 확보, 브랜드 가이드라인 확정, floor05.com 랜딩 페이지 제작" />
              <TimelineItem year="Phase 2" event="First Products" detail="2~3개 마이크로 프로덕트 빠르게 배포. 트래픽 반응 관찰. 광고 수익 세팅" />
              <TimelineItem year="Phase 3" event="Growth" detail="반응 좋은 프로덕트 중심으로 개선/확장. 뉴스레터 시작. SNS 브랜딩 본격화" />
              <TimelineItem year="Phase 4" event="Scale" detail="성공 프로덕트 유료화 전환. 제휴 수익 개시. 독립 브랜드 분리 검토" />
            </Section>
          </>
        )}

        {/* ═══════════════ APPLICATIONS ═══════════════ */}
        {activeTab === "applications" && (
          <>
            <Section title="Browser & Favicon" number="20">
              <div style={{ borderRadius: 10, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
                <div style={{ backgroundColor: "#E8E6E3", padding: "10px 16px", display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    {["#FF5F57", "#FEBC2E", "#28C840"].map(c => <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: c }} />)}
                  </div>
                  <div style={{ flex: 1, backgroundColor: "#fff", borderRadius: 6, padding: "5px 12px", display: "flex", alignItems: "center", gap: 8, fontFamily: fontStack, fontSize: 12, color: COLORS.midGray }}>
                    <LogoSymbol size={16} />floor05.com
                  </div>
                </div>
                <div style={{ backgroundColor: COLORS.offWhite, height: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: fontStack, fontSize: 12, color: COLORS.lightGray, letterSpacing: 2 }}>the floor that doesn't exist</span>
                </div>
              </div>
            </Section>

            <Section title="Business Card" number="21">
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                <div style={{
                  width: 320, height: 190, backgroundColor: COLORS.offWhite, borderRadius: 8, padding: 24,
                  display: "flex", flexDirection: "column", justifyContent: "space-between",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.06)", border: `1px solid ${COLORS.lightGray}22`,
                }}>
                  <div style={{ fontFamily: fontStack, display: "flex", alignItems: "baseline", gap: 3 }}>
                    <span style={{ fontSize: 20, fontWeight: 500 }}>floor</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: COLORS.accent, position: "relative", top: -6 }}>05</span>
                  </div>
                  <div>
                    <div style={{ fontFamily: fontStack, fontSize: 9, color: COLORS.lightGray, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>the floor that doesn't exist</div>
                    <div style={{ fontFamily: fontStack, fontSize: 11, color: COLORS.midGray }}>floor05.com</div>
                  </div>
                </div>
                <div style={{
                  width: 320, height: 190, backgroundColor: COLORS.black, borderRadius: 8, padding: 24,
                  display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
                }}>
                  <LogoSymbol size={64} />
                  <span style={{ fontFamily: sansStack, fontSize: 10, color: COLORS.lightGray, letterSpacing: 4, marginTop: 12 }}>플로어공오</span>
                </div>
              </div>
            </Section>

            <Section title="Social Profile" number="22">
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                <div style={{ width: 300, backgroundColor: COLORS.offWhite, borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
                  <div style={{ height: 90, backgroundColor: COLORS.black, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontFamily: fontStack, fontSize: 9, letterSpacing: 4, color: COLORS.midGray, textTransform: "uppercase" }}>the floor that doesn't exist</span>
                  </div>
                  <div style={{ padding: "0 18px 18px", position: "relative" }}>
                    <div style={{ marginTop: -20 }}><LogoSymbol size={40} /></div>
                    <div style={{ marginTop: 10 }}>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>플로어공오</div>
                      <div style={{ fontFamily: fontStack, fontSize: 10, color: COLORS.lightGray, marginTop: 2 }}>@floor05</div>
                      <div style={{ fontSize: 12, color: COLORS.midGray, marginTop: 8, lineHeight: 1.6 }}>
                        존재하지 않는 층에서 만듭니다.<br />나만의 속도, 나만의 층.
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ width: 300, display: "flex", flexDirection: "column", gap: 12 }}>
                  <Card>
                    <div style={{ fontFamily: fontStack, fontSize: 10, color: COLORS.lightGray, letterSpacing: 1, marginBottom: 8 }}>HANDLE</div>
                    <div style={{ fontFamily: fontStack, fontSize: 13, color: COLORS.accent }}>@floor05</div>
                    <div style={{ fontSize: 11, color: COLORS.lightGray, marginTop: 4 }}>모든 채널 통일</div>
                  </Card>
                  <Card>
                    <div style={{ fontFamily: fontStack, fontSize: 10, color: COLORS.lightGray, letterSpacing: 1, marginBottom: 8 }}>BIO FORMAT</div>
                    <div style={{ fontSize: 12, color: COLORS.midGray, lineHeight: 1.6 }}>
                      Line 1: 존재하지 않는 층에서 만듭니다.<br />
                      Line 2: 나만의 속도, 나만의 층.<br />
                      Line 3: floor05.com
                    </div>
                  </Card>
                </div>
              </div>
            </Section>

            <Section title="Product Page Template" number="23">
              <div style={{ borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", border: `1px solid ${COLORS.lightGray}22` }}>
                <div style={{ backgroundColor: COLORS.black, padding: "32px 32px 24px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                    <HeaderWordmark />
                    <div style={{ display: "flex", gap: 16, fontFamily: fontStack, fontSize: 10, color: COLORS.lightGray }}>
                      <span>Products</span><span>Blog</span><span>About</span>
                    </div>
                  </div>
                  <div style={{ fontFamily: fontStack, fontSize: 9, color: COLORS.accent, letterSpacing: 2, marginBottom: 8 }}>ROOM 01</div>
                  <div style={{ fontSize: 28, fontWeight: 600, color: COLORS.offWhite, marginBottom: 8 }}>Product Name</div>
                  <div style={{ fontSize: 14, color: COLORS.lightGray, lineHeight: 1.6 }}>한 줄로 설명할 수 있는 프로덕트 설명.</div>
                </div>
                <div style={{ backgroundColor: COLORS.offWhite, padding: 32, display: "flex", alignItems: "center", justifyContent: "center", height: 120 }}>
                  <span style={{ fontFamily: fontStack, fontSize: 12, color: COLORS.lightGray }}>[ Product Screenshot / Demo Area ]</span>
                </div>
              </div>
            </Section>

            <Section title="Design Specification" number="24">
              <Card>
                <div style={{ fontFamily: fontStack, fontSize: 10, color: COLORS.accent, letterSpacing: 2, marginBottom: 16, textTransform: "uppercase" }}>v2.1 Change Log</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 12, color: COLORS.midGray, lineHeight: 1.6 }}>
                  {[
                    { tag: "TYPOGRAPHY", desc: "한글 서체를 Noto Sans KR에서 Pretendard로 변경. 직선적·건축적 느낌 강화." },
                    { tag: "SYMBOL", desc: "로고 심볼에 계단 단차(Step) 형태 라인 적용. 05 텍스트가 계단참 위에 안착되는 구조로 변경." },
                    { tag: "WORDMARK", desc: "'05'를 위첨자 형태로 베이스라인 오프셋 적용. 층간 부유감 표현." },
                    { tag: "VOICE", desc: "'가치의 명확성' 보이스 항목 추가. 랜딩페이지 VP 카피, 광고 카피 예시 보강." },
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: 12 }}>
                      <span style={{ fontFamily: fontStack, fontSize: 9, color: COLORS.accent, fontWeight: 600, minWidth: 80, letterSpacing: 1 }}>{item.tag}</span>
                      <span>{item.desc}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </Section>
          </>
        )}
      </div>

      {/* Footer */}
      <div style={{ padding: "24px 32px", borderTop: `1px solid ${COLORS.lightGray}22`, display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontFamily: fontStack, fontSize: 9, color: COLORS.lightGray }}>© 2026 floor05 플로어공오</span>
        <span style={{ fontFamily: fontStack, fontSize: 9, color: COLORS.lightGray }}>Brand Identity Guide v2.1</span>
      </div>
    </div>
  );
}
