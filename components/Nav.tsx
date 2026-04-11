"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";



export default function Nav() {
  const { t, lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);

  /* Chiudi menu on resize → desktop */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* Lock scroll quando menu aperto */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const closeMenu = () => setOpen(false);

  const desktopLinkStyle: React.CSSProperties = {
    color: "rgba(237,232,223,0.65)",
    textDecoration: "none",
    fontSize: "0.8rem",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    fontWeight: 300,
    transition: "color 0.2s",
  };

  const mobileLinkStyle: React.CSSProperties = {
    color: "#ede8df",
    textDecoration: "none",
    fontSize: "32px",
    fontWeight: 300,
    letterSpacing: "0.04em",
    padding: "0.5rem 2rem",
    display: "block",
    textAlign: "center",
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: "rgba(10,10,10,0.92)",
          backdropFilter: "blur(8px)",
          borderBottom: "0.5px solid #1a1a1a",
          height: 72,
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 2rem",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }} onClick={closeMenu}>
            <Image
              src="/daniela-logo-final.png"
              alt="Daniela Cioara Makeup Artist Rome"
              width={160}
              height={72}
              preload
              style={{ objectFit: "contain" }}
              className="nav-logo-img"
            />
          </Link>

          {/* ── Desktop links ─────────────────────────────────────────── */}
          <div
            className="hidden md:flex"
            style={{ alignItems: "center", gap: "2.5rem" }}
          >
            <a
              href="/#portfolio"
              style={desktopLinkStyle}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#ede8df")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(237,232,223,0.65)")}
            >
              {t("nav.work")}
            </a>
            <Link
              href="/about"
              style={desktopLinkStyle}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#ede8df")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(237,232,223,0.65)")}
            >
              {t("nav.about")}
            </Link>
            <a
              href="/#services"
              style={desktopLinkStyle}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#ede8df")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(237,232,223,0.65)")}
            >
              {t("nav.services")}
            </a>
            <Link
              href="/journal"
              style={desktopLinkStyle}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#ede8df")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(237,232,223,0.65)")}
            >
              {t("nav.journal")}
            </Link>
            <a
              href="/#contact"
              className="gm"
              style={{
                textDecoration: "none",
                fontSize: "0.8rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontWeight: 300,
              }}
            >
              {t("nav.contact")}
            </a>

            {/* Language switch */}
            <LangSwitch lang={lang} setLang={setLang} />
          </div>

          {/* ── Mobile: hamburger only ──────────────────────────────────── */}
          <div
            className="flex md:hidden"
            style={{ alignItems: "center" }}
          >
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              <span
                style={{
                  display: "block",
                  width: 22,
                  height: 1,
                  background: open ? "var(--gm)" : "rgba(237,232,223,0.7)",
                  transition: "transform 0.25s, opacity 0.25s",
                  transform: open ? "translateY(6px) rotate(45deg)" : "none",
                  backgroundImage: open ? "var(--gm)" : undefined,
                }}
              />
              <span
                style={{
                  display: "block",
                  width: 22,
                  height: 1,
                  background: "rgba(237,232,223,0.7)",
                  transition: "opacity 0.25s",
                  opacity: open ? 0 : 1,
                }}
              />
              <span
                style={{
                  display: "block",
                  width: 22,
                  height: 1,
                  background: open ? "var(--gm)" : "rgba(237,232,223,0.7)",
                  transition: "transform 0.25s",
                  transform: open ? "translateY(-6px) rotate(-45deg)" : "none",
                }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile menu panel ────────────────────────────────────────────── */}
      <div
        className="md:hidden"
        style={{
          position: "fixed",
          top: 72,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "#0a0a0a",
          borderBottom: open ? "0.5px solid rgba(201,163,82,0.3)" : "none",
          zIndex: 49,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.25rem",
          transform: open ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <a
          href="/#portfolio"
          onClick={closeMenu}
          className="font-cormorant"
          style={mobileLinkStyle}
        >
          {t("nav.work")}
        </a>
        <Link
          href="/about"
          onClick={closeMenu}
          className="font-cormorant"
          style={mobileLinkStyle}
        >
          {t("nav.about")}
        </Link>
        <a
          href="/#services"
          onClick={closeMenu}
          className="font-cormorant"
          style={mobileLinkStyle}
        >
          {t("nav.services")}
        </a>
        <Link
          href="/journal"
          onClick={closeMenu}
          className="font-cormorant"
          style={mobileLinkStyle}
        >
          {t("nav.journal")}
        </Link>
        <a
          href="/#contact"
          onClick={closeMenu}
          className="gm font-cormorant"
          style={{
            textDecoration: "none",
            fontSize: "32px",
            fontWeight: 300,
            letterSpacing: "0.04em",
            padding: "0.5rem 2rem",
            display: "block",
            textAlign: "center",
          }}
        >
          {t("nav.contact")}
        </a>

        {/* Gold divider */}
        <span
          className="gm-line"
          style={{ width: 40, display: "block", margin: "1rem auto" }}
        />

        {/* Language in mobile menu */}
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          {(["en", "it"] as const).map((l, i) => (
            <span key={l} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <button
                onClick={() => { setLang(l); closeMenu(); }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "0.9rem",
                  letterSpacing: "0.1em",
                  color: lang === l ? "#c9a352" : "rgba(237,232,223,0.3)",
                }}
              >
                {l.toUpperCase()}
              </button>
              {i === 0 && (
                <span style={{ color: "rgba(237,232,223,0.15)", fontSize: "0.75rem" }}>|</span>
              )}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .nav-logo-img { width: 160px !important; height: 72px !important; }
        @media (max-width: 767px) {
          .nav-logo-img { width: 130px !important; height: 58px !important; }
        }
      `}</style>
    </>
  );
}

function LangSwitch({
  lang,
  setLang,
}: {
  lang: "en" | "it";
  setLang: (l: "en" | "it") => void;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
      {(["en", "it"] as const).map((l, i) => (
        <span key={l} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <button
            onClick={() => setLang(l)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "2px 4px",
              color: lang === l ? "#c9a352" : "rgba(237,232,223,0.4)",
              fontFamily: "inherit",
              fontSize: "0.75rem",
              letterSpacing: "0.06em",
            }}
          >
            {l.toUpperCase()}
          </button>
          {i === 0 && (
            <span style={{ color: "rgba(237,232,223,0.2)", fontSize: "0.75rem" }}>|</span>
          )}
        </span>
      ))}
    </div>
  );
}
