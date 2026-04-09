"use client";

import Image from "next/image";
import { useState, useCallback, useRef, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Lightbox from "@/components/Lightbox";

const R2_BASE = process.env.NEXT_PUBLIC_R2_PUBLIC_URL ?? "";

interface Photo {
  file: string;
  catKey: string;
}

const PHOTOS: Photo[] = [
  { file: "daniela-cioara-makeup-16.jpg", catKey: "portfolio.cat1" },
  { file: "daniela-cioara-makeup-7.jpg",  catKey: "portfolio.cat2" },
  { file: "daniela-cioara-makeup-1.jpg",  catKey: "portfolio.cat1" },
  { file: "daniela-cioara-makeup-6.jpg",  catKey: "portfolio.cat3" },
  { file: "daniela-cioara-makeup-2.jpg",  catKey: "portfolio.cat4" },
  { file: "daniela-cioara-makeup-24.jpg", catKey: "portfolio.cat2" },
  { file: "daniela-cioara-makeup-25.jpg", catKey: "portfolio.cat1" },
  { file: "daniela-cioara-makeup-17.jpg", catKey: "portfolio.cat3" },
  { file: "daniela-cioara-makeup-23.jpg", catKey: "portfolio.cat1" },
  { file: "daniela-cioara-makeup-20.jpg", catKey: "portfolio.cat4" },
];

function PortfolioItem({
  photo,
  index,
  onClick,
  mobile,
}: {
  photo: Photo;
  index: number;
  onClick: (i: number) => void;
  mobile?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  const src = R2_BASE
    ? `${R2_BASE}/portfolio/${photo.file}`
    : null;

  return (
    <div
      onClick={() => onClick(index)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        cursor: "pointer",
        overflow: "hidden",
        border: "2.5px solid transparent",
        borderImage:
          "linear-gradient(105deg,#6b4f1a,#c9a352,#f5d98b,#c9a352,#fff0a0,#c9a352,#7a5520) 1",
        ...(mobile
          ? { width: "85vw", flexShrink: 0, aspectRatio: "4/5", scrollSnapAlign: "center" }
          : {}),
      }}
      className={mobile ? "" : "aspect-square md:aspect-[4/5]"}
    >
      {/* Corner accents */}
      <span className="corner corner-tl" style={{ zIndex: 3 }} />
      <span className="corner corner-tr" style={{ zIndex: 3 }} />
      <span className="corner corner-bl" style={{ zIndex: 3 }} />
      <span className="corner corner-br" style={{ zIndex: 3 }} />

      {/* Photo */}
      {src ? (
        <Image
          src={src}
          alt={photo.file.replace(/[-_]/g, " ").replace(/\.jpg$/, "")}
          fill
          sizes={mobile ? "85vw" : "(max-width: 768px) 50vw, 40vw"}
          style={{
            objectFit: "cover",
            objectPosition: "center top",
            transition: "transform 0.5s ease",
            transform: hovered ? "scale(1.04)" : "scale(1)",
          }}
        />
      ) : (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#111",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ color: "rgba(237,232,223,0.08)", fontSize: "0.65rem", letterSpacing: "0.1em" }}>
            {photo.file}
          </span>
        </div>
      )}

      {/* Hover overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
          zIndex: 2,
        }}
      />
    </div>
  );
}

export default function Portfolio() {
  const { t } = useLanguage();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [atEnd, setAtEnd] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 10);
  }, []);

  const scrollNext = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const itemWidth = el.clientWidth * 0.85 + 12; // 85vw + gap
    el.scrollBy({ left: itemWidth, behavior: "smooth" });
  }, []);

  const images = PHOTOS.map((p) => ({
    src: R2_BASE ? `${R2_BASE}/portfolio/${p.file}` : "",
    alt: p.file,
  }));

  const openLightbox = useCallback((i: number) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goPrev = useCallback(() =>
    setLightboxIndex((i) => (i === null ? null : (i - 1 + PHOTOS.length) % PHOTOS.length)),
    []
  );
  const goNext = useCallback(() =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % PHOTOS.length)),
    []
  );

  return (
    <>
      <section
        id="portfolio"
        className="portfolio-section"
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          {/* Header */}
          <div className="portfolio-header">
            <p
              className="gm"
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}
            >
              {t("portfolio.label")}
            </p>
            <h2
              className="font-cormorant"
              style={{
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                fontWeight: 300,
                color: "#ede8df",
              }}
            >
              {t("portfolio.title1")}
              <em className="gm" style={{ fontStyle: "italic" }}>
                {t("portfolio.title.italic")}
              </em>
            </h2>
          </div>

          {/* Mobile: horizontal scroll */}
          {isMobile ? (
            <div style={{ position: "relative" }}>
              <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="portfolio-scroll"
                style={{
                  display: "flex",
                  overflowX: "scroll",
                  scrollSnapType: "x mandatory",
                  gap: 12,
                  padding: "0 20px",
                  scrollbarWidth: "none",
                }}
              >
                {PHOTOS.map((photo, i) => (
                  <PortfolioItem
                    key={photo.file}
                    photo={photo}
                    index={i}
                    onClick={openLightbox}
                    mobile
                  />
                ))}
              </div>
              {/* Invisible next arrow */}
              {!atEnd && (
                <button
                  onClick={scrollNext}
                  aria-label="Next photo"
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 44,
                    height: 44,
                    opacity: 0,
                    cursor: "pointer",
                    background: "none",
                    border: "none",
                    zIndex: 4,
                  }}
                />
              )}
            </div>
          ) : (
            /* Desktop: grid 2 columns */
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "1rem",
              }}
            >
              {PHOTOS.map((photo, i) => (
                <PortfolioItem
                  key={photo.file}
                  photo={photo}
                  index={i}
                  onClick={openLightbox}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}

      <style>{`
        .portfolio-section { padding: 6rem 2rem; }
        .portfolio-header  { margin-bottom: 3rem; }

        @media (max-width: 767px) {
          .portfolio-section { padding: 32px 0; }
          .portfolio-header  { padding: 0 20px; margin-bottom: 1.5rem; }
        }
      `}</style>
    </>
  );
}
