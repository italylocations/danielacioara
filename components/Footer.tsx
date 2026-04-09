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
