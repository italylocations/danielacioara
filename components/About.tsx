"use client";

import Image from "next/image";
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
      {/* ── PARTE 1a: Titolo su sfondo nero ──────────────────────────────── */}
      <div
        style={{
          backgroundColor: "#0A0A0A",
          padding: "60px 44px",
          textAlign: "center",
        }}
        className="about-intro"
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

      {/* ── PARTE 1b: Video clip14 — fullwidth, no overlay ───────────────── */}
      <div
        style={{
          width: "100%",
          aspectRatio: "16/9",
          backgroundColor: "#0a0a0a",
          overflow: "hidden",
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          <source src="/hero-asia-mobile.mp4" media="(max-width: 767px)" type="video/mp4" />
          <source src="/hero-asia.mp4" type="video/mp4" />
        </video>
      </div>

      {/* ── PARTE 2: Grid bio + portrait ──────────────────────────────── */}
      <div
        style={{ backgroundColor: "#080808" }}
        className="about-bio-outer"
      >
        <div
          style={{ maxWidth: 900, margin: "0 auto" }}
          className="about-bio-grid"
        >
          {/* Colonna sinistra — testo bio */}
          <div className="about-bio-text">
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
                  color: "rgba(237,232,223,0.55)",
                  fontSize: 13.5,
                  lineHeight: 2,
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
              href="/about"
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

          {/* Colonna destra — foto + didascalia */}
          <div
            className="about-portrait-col"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div className="about-portrait-frame">
              <Image
                src={`${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/portrait/daniela-portrait-opt.jpg`}
                alt="Daniela Cioara — Makeup Artist"
                width={260}
                height={347}
                style={{
                  width: "100%",
                  height: "auto",
                  aspectRatio: "3/4",
                  objectFit: "cover",
                  objectPosition: "top center",
                  display: "block",
                }}
              />
            </div>
            <div style={{ textAlign: "center" }}>
              <span
                className="gm-line"
                style={{ width: 30, display: "block", margin: "0 auto 10px" }}
              />
              <p
                className="font-cormorant gm"
                style={{
                  fontSize: 13,
                  fontWeight: 300,
                  letterSpacing: "0.15em",
                  marginBottom: 4,
                }}
              >
                Daniela Cioara
              </p>
              <p
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: 9,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "rgba(237,232,223,0.4)",
                }}
              >
                Makeup Artist
              </p>
            </div>
          </div>
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
        .about-quote-text { font-size: 38px; }
        .about-bio-outer  { padding: 50px 44px; }
        .about-bio-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 48px;
          align-items: start;
        }
        .about-portrait-frame {
          max-width: 260px;
          padding: 6px;
          position: relative;
          border: 0.5px solid rgba(193,163,98,0.25);
          background:
            linear-gradient(135deg, rgba(193,163,98,0.5) 0%, transparent 20%),
            linear-gradient(225deg, rgba(193,163,98,0.5) 0%, transparent 20%),
            linear-gradient(315deg, rgba(193,163,98,0.5) 0%, transparent 20%),
            linear-gradient(45deg,  rgba(193,163,98,0.5) 0%, transparent 20%);
        }

        @media (max-width: 767px) {
          .about-quote-text { font-size: 28px; }
          .about-bio-outer  { padding: 32px 24px; }
          .about-asia-video { height: 45vh !important; }
          .about-bio-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .about-portrait-col { order: -1; }
          .about-portrait-frame { max-width: 180px; }
        }
      `}</style>
    </section>
  );
}
