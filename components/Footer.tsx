"use client";

import Link from "next/link";
import Image from "next/image";
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
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          <Image
            src="/daniela-logo-final.png"
            alt="Daniela Cioara Makeup Artist Rome"
            width={140}
            height={64}
            style={{ objectFit: "contain", opacity: 0.7 }}
          />
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

        <p
          style={{
            color: "rgba(237,232,223,0.18)",
            fontSize: "10px",
            marginTop: "0.75rem",
            textAlign: "center",
            width: "100%",
          }}
        >
          Daniela Cioara — C.F. CRIDLR91D53Z129Y
        </p>
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
