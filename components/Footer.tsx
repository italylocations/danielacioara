"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer
      style={{
        backgroundColor: "#0a0a0a",
        borderTop: "0.5px solid #1a1a1a",
        padding: "2rem",
      }}
    >
      <div
        className="footer-inner"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        <Link href="/" style={{ textDecoration: "none" }}>
          <span
            className="gm font-cormorant"
            style={{ fontSize: "1rem", fontWeight: 400, letterSpacing: "0.04em" }}
          >
            Daniela Cioara
          </span>
        </Link>

        {/* Contact row */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center" }}>
          <a
            href="mailto:daniela@danielacioara.com"
            className="gm"
            style={{
              textDecoration: "none",
              fontSize: "11px",
              letterSpacing: "0.08em",
            }}
          >
            daniela@danielacioara.com
          </a>
          <span style={{ color: "rgba(237,232,223,0.2)", fontSize: "11px" }}>·</span>
          <a
            href="https://wa.me/393272412788"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: "none",
              fontSize: "11px",
              letterSpacing: "0.08em",
              color: "rgba(237,232,223,0.5)",
            }}
          >
            +39 327 241 2788
          </a>
        </div>

        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <Link
            href="/privacy-policy"
            style={{
              color: "rgba(237,232,223,0.22)",
              fontSize: "0.7rem",
              letterSpacing: "0.08em",
              textDecoration: "none",
            }}
          >
            Privacy
          </Link>
          <Link
            href="/cookie-policy"
            style={{
              color: "rgba(237,232,223,0.22)",
              fontSize: "0.7rem",
              letterSpacing: "0.08em",
              textDecoration: "none",
            }}
          >
            Cookies
          </Link>
          <p
            style={{
              color: "rgba(237,232,223,0.22)",
              fontSize: "0.7rem",
              letterSpacing: "0.06em",
            }}
          >
            {t("footer.copy")}
          </p>
        </div>
      </div>
      <style>{`
        .footer-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        @media (max-width: 767px) {
          .footer-inner {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
          .footer-inner > div { flex-wrap: wrap; justify-content: center; gap: 1rem; }
        }
      `}</style>
    </footer>
  );
}
