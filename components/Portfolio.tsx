"use client";

import Image from "next/image";
import { useState, useCallback } from "react";
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
}: {
  photo: Photo;
  index: number;
  onClick: (i: number) => void;
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
        /* Gold frame */
        border: "2.5px solid transparent",
        borderImage:
          "linear-gradient(105deg,#6b4f1a,#c9a352,#f5d98b,#c9a352,#fff0a0,#c9a352,#7a5520) 1",
      }}
      className="aspect-square md:aspect-[4/5]"
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
          sizes="(max-width: 768px) 50vw, 40vw"
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
      <section id="portfolio" style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          {/* Header */}
          <div style={{ marginBottom: "3rem" }}>
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

          {/* Grid 2 colonne */}
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
    </>
  );
}
