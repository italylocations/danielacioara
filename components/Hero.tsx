"use client";

import { useLanguage } from "@/contexts/LanguageContext";

const TEXT_SHADOW = "0 2px 20px rgba(0,0,0,0.5)";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="work"
      className="hero-section"
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#0a0a0a",
      }}
    >
      {/* ── Video (mobile + desktop) ─────────────────────────────────────── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="hero-video"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
        }}
      >
        <source src="/hero-v2-mobile.mp4" media="(max-width: 767px)" type="video/mp4" />
        <source src="/hero-v2.mp4" type="video/mp4" />
      </video>

      {/* ── Overlay scuro ────────────────────────────────────────────────── */}
      <div
        className="hero-overlay"
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.38)",
          zIndex: 1,
        }}
      />

      {/* ── Contenuto centrato ───────────────────────────────────────────── */}
      <div
        className="hero-content"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 1.5rem",
          gap: "1.75rem",
        }}
      >
        {/* Eyebrow */}
        <p
          className="gm"
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontWeight: 300,
            textShadow: TEXT_SHADOW,
          }}
        >
          Makeup Artist · Rome, Italy
        </p>

        {/* Titolo */}
        <h1
          className="font-cormorant"
          style={{
            fontSize: "clamp(2.6rem, 5.5vw, 5rem)",
            fontWeight: 300,
            lineHeight: 1.1,
            color: "#ede8df",
            maxWidth: "820px",
            textShadow: TEXT_SHADOW,
          }}
        >
          {t("hero.title1")}
          <em className="gm" style={{ fontStyle: "italic" }}>
            {t("hero.title.italic")}
          </em>
          {t("hero.title2")}
        </h1>

        {/* Sottotitolo */}
        <p
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "rgba(237,232,223,0.45)",
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontWeight: 300,
            textShadow: TEXT_SHADOW,
          }}
        >
          {t("hero.sub")}
        </p>

        {/* Linea oro */}
        <span
          className="gm-line"
          style={{ width: 40, display: "block", margin: "0 auto" }}
        />

        {/* CTA */}
        <a
          href="#portfolio"
          className="gm"
          style={{
            textDecoration: "none",
            fontSize: "0.85rem",
            letterSpacing: "0.1em",
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontWeight: 300,
            transition: "opacity 0.2s",
            textShadow: TEXT_SHADOW,
          }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = "0.7")}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = "1")}
        >
          {t("hero.cta")}
        </a>
      </div>

      {/* ── Responsive ──────────────────────────────────────────────────── */}
      <style>{`
        @media (max-width: 767px) {
          .hero-section { height: 100svh !important; }
          .hero-video { object-position: 60% center !important; }
          .hero-overlay { background-color: rgba(0,0,0,0.32) !important; }
          .hero-content {
            justify-content: flex-start !important;
            padding-top: 35vh !important;
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
          #work h1 { font-size: 28px !important; }
        }
      `}</style>
    </section>
  );
}
