"use client";

import { useLanguage } from "@/contexts/LanguageContext";

const SERVICES = [
  { num: "01", titleKey: "services.01.title", bodyKey: "services.01.body" },
  { num: "02", titleKey: "services.02.title", bodyKey: "services.02.body" },
  { num: "03", titleKey: "services.03.title", bodyKey: "services.03.body" },
];

export default function Services() {
  const { t } = useLanguage();

  return (
    <section
      id="services"
      style={{ padding: "7rem 2rem" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "4rem" }}>
          <p
            className="gm"
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}
          >
            {t("services.label")}
          </p>
          <h2
            className="font-cormorant"
            style={{
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              fontWeight: 300,
              color: "#ede8df",
            }}
          >
            <em className="gm" style={{ fontStyle: "italic" }}>
              {t("services.title.italic")}
            </em>
            {t("services.title2")}
          </h2>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            border: "0.5px solid #1a1a1a",
          }}
        >
          {SERVICES.map((s, i) => (
            <div
              key={s.num}
              style={{
                padding: "3rem",
                borderRight: i < 2 ? "0.5px solid #1a1a1a" : undefined,
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              {/* Number */}
              <span
                className="gm font-cormorant"
                style={{ fontSize: "2.5rem", fontWeight: 300, lineHeight: 1 }}
              >
                {s.num}
              </span>

              {/* Title */}
              <h3
                className="font-cormorant"
                style={{
                  fontSize: "1.3rem",
                  fontWeight: 300,
                  color: "#ede8df",
                  lineHeight: 1.2,
                }}
              >
                {t(s.titleKey)}
              </h3>

              {/* Divider */}
              <span className="gm-line" />

              {/* Body */}
              <p
                style={{
                  color: "rgba(237,232,223,0.55)",
                  fontSize: "0.875rem",
                  lineHeight: 1.7,
                  flex: 1,
                }}
              >
                {t(s.bodyKey)}
              </p>

              {/* CTA */}
              <a
                href="#contact"
                className="gm"
                style={{
                  textDecoration: "none",
                  fontSize: "0.8rem",
                  letterSpacing: "0.08em",
                  fontWeight: 300,
                  marginTop: "auto",
                  display: "inline-block",
                }}
              >
                {t("services.cta")}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
