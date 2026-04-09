"use client";

import { useLanguage } from "@/contexts/LanguageContext";

/* ── Highlight helper ─────────────────────────────────────────────────────── */
const GOLD_TERMS = ["Chanel", "Dior", "Giorgio Armani Beauty"];
const ITALIC_TERMS = ["75 minutes", "75 minuti"];
const ALL_TERMS = [...GOLD_TERMS, ...ITALIC_TERMS];
const HIGHLIGHT_RE = new RegExp(
  `(${ALL_TERMS.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
  "g"
);

function highlight(text: string): React.ReactNode {
  const parts = text.split(HIGHLIGHT_RE);
  return parts.map((part, i) => {
    if (GOLD_TERMS.includes(part))
      return (
        <span key={i} className="gm">
          {part}
        </span>
      );
    if (ITALIC_TERMS.includes(part))
      return (
        <em key={i} style={{ fontStyle: "italic", color: "#ede8df" }}>
          {part}
        </em>
      );
    return part;
  });
}

export default function About() {
  const { t, lang } = useLanguage();

  /* Split quote at keyword to render it italic + gold */
  const quoteKeyword = lang === "it" ? "Illumino" : "illumination";
  const quoteParts = t("about.quote").split(quoteKeyword);

  return (
    <section id="about">
      {/* ── PARTE 1: Video 16:9 + quote centrata ────────────────────────── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16/9",
          backgroundColor: "#0a0a0a",
          overflow: "hidden",
        }}
      >
        {/* Video — object-fit: contain per non croppare */}
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "center",
          }}
        >
          <source src="/hero2-mobile.mp4" media="(max-width: 767px)" type="video/mp4" />
          <source src="/hero2.mp4" type="video/mp4" />
        </video>

        {/* Overlay scuro */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.45)",
          }}
        />

        {/* Testo sovrapposto */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            width: "90%",
            maxWidth: 760,
          }}
        >
          <p
            className="gm"
            style={{
              fontSize: 9,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontWeight: 300,
              marginBottom: "1.25rem",
            }}
          >
            About
          </p>

          <p
            className="font-cormorant about-quote-text"
            style={{
              fontWeight: 300,
              color: "#ede8df",
              lineHeight: 1.12,
            }}
          >
            {quoteParts[0]}
            <em className="gm" style={{ fontStyle: "italic" }}>
              {quoteKeyword}
            </em>
            {quoteParts[1] ?? ""}
          </p>

          <span
            className="gm-line"
            style={{ width: 40, display: "block", margin: "18px auto 0" }}
          />
        </div>
      </div>

      {/* ── PARTE 2: Solo testo bio ──────────────────────────────────────── */}
      <div
        style={{ backgroundColor: "#080808" }}
        className="about-bio-outer"
      >
        <div
          style={{ maxWidth: 720, margin: "0 auto" }}
          className="about-bio-inner"
        >
          <p
            className="gm"
            style={{
              fontSize: "0.68rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: "2.25rem",
            }}
          >
            {t("about.label")}
          </p>

          {(["body1", "body2", "body3"] as const).map((k) => (
            <p
              key={k}
              style={{
                color: "rgba(237,232,223,0.5)",
                fontSize: 13,
                lineHeight: 1.95,
                marginBottom: "1.35rem",
              }}
            >
              {highlight(t(`about.${k}`))}
            </p>
          ))}

          <span
            className="gm-line"
            style={{ width: 36, display: "block", margin: "2rem 0 1.5rem" }}
          />

          <a
            href="#contact"
            className="gm"
            style={{
              textDecoration: "none",
              fontSize: "0.82rem",
              letterSpacing: "0.08em",
              fontWeight: 300,
            }}
          >
            {t("about.cta")}
          </a>
        </div>
      </div>

      {/* ── Video hero-asia.mp4 — chiude la sezione ────────────────────── */}
      <div style={{ borderTop: "0.5px solid #1A1A1A" }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="about-asia-video"
          style={{
            display: "block",
            width: "100%",
            height: "60vh",
            objectFit: "cover",
          }}
        >
          <source src="/hero-asia-mobile.mp4" media="(max-width: 767px)" type="video/mp4" />
          <source src="/hero-asia.mp4" type="video/mp4" />
        </video>
      </div>

      {/* ── Responsive ──────────────────────────────────────────────────── */}
      <style>{`
        .about-quote-text { font-size: 46px; }
        .about-bio-outer  { padding: 50px 44px; }
        .about-bio-inner  {}

        @media (max-width: 767px) {
          .about-quote-text { font-size: 28px; }
          .about-bio-outer  { padding: 32px 24px; }
          .about-asia-video { height: 45vh !important; }
        }
      `}</style>
    </section>
  );
}
