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
    </div>
  );
}
