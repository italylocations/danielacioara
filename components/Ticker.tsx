"use client";

import { useLanguage } from "@/contexts/LanguageContext";

const BRANDS = [
  "Chanel",
  "Dior Beauty",
  "Giorgio Armani Beauty",
  "Clé de Peau Beauté",
  "Lancôme",
  "YSL Beauty",
  "Givenchy Beauty",
];

const SEP = (
  <span
    className="ticker-sep"
    style={{
      display: "inline-block",
      width: 4,
      height: 4,
      borderRadius: "50%",
      backgroundColor: "rgba(201,163,82,0.5)",
      verticalAlign: "middle",
      margin: "0 2rem",
    }}
  />
);

export default function Ticker() {
  const { t } = useLanguage();

  const items = [...BRANDS, ...BRANDS]; // duplicate for seamless loop

  return (
    <div
      className="ticker-wrap"
      style={{
        display: "flex",
        alignItems: "stretch",
        height: 64,
        overflow: "hidden",
        borderTop: "0.5px solid #1a1a1a",
        borderBottom: "0.5px solid #1a1a1a",
      }}
    >
      {/* Label */}
      <div
        className="ticker-label"
        style={{
          flexShrink: 0,
          backgroundColor: "#0a0a0a",
          padding: "0 2.5rem",
          display: "flex",
          alignItems: "center",
          borderRight: "0.5px solid rgba(201,163,82,0.3)",
          zIndex: 2,
        }}
      >
        <span
          className="gm font-cormorant"
          style={{
            fontStyle: "italic",
            fontSize: "1rem",
            fontWeight: 300,
            whiteSpace: "nowrap",
          }}
        >
          {t("ticker.label")}
        </span>
      </div>

      {/* Scrolling band */}
      <div
        className="gm-bg"
        style={{ flex: 1, overflow: "hidden", display: "flex", alignItems: "center" }}
      >
        <div className="ticker-track" style={{ display: "flex", alignItems: "center" }}>
          {items.map((brand, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
              <span
                className="ticker-brand"
                style={{
                  color: "#0a0a0a",
                  fontSize: "0.75rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  fontWeight: 400,
                  whiteSpace: "nowrap",
                }}
              >
                {brand}
              </span>
              {SEP}
            </span>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 767px) {
          .ticker-wrap { height: 48px !important; }
          .ticker-label { padding: 0 1rem !important; font-size: 0.8rem !important; }
          .ticker-brand { font-size: 0.65rem !important; letter-spacing: 0.1em !important; }
          .ticker-sep { margin: 0 1rem !important; }
        }
      `}</style>
    </div>
  );
}
