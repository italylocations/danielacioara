"use client";

import Image from "next/image";
import { useState, useCallback, useRef, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Lightbox from "@/components/Lightbox";

const R2_BASE = process.env.NEXT_PUBLIC_R2_PUBLIC_URL ?? "";
const R2_VIDEO = "https://pub-4bb9524bd21248d2ac34348d996317e9.r2.dev";

type Item =
  | { type: "photo"; file: string; catKey: string; tall?: boolean }
  | { type: "video"; clip: string };

const ITEMS: Item[] = [
  { type: "photo", file: "daniela-cioara-makeup-16.jpg", catKey: "portfolio.cat1", tall: true },
  { type: "video", clip: "clip6" },
  { type: "photo", file: "daniela-cioara-makeup-7.jpg", catKey: "portfolio.cat2" },
  { type: "video", clip: "clip10" },
  { type: "photo", file: "daniela-cioara-makeup-1.jpg", catKey: "portfolio.cat1" },
  { type: "video", clip: "clip1" },
  { type: "photo", file: "daniela-cioara-makeup-6.jpg", catKey: "portfolio.cat3" },
  { type: "video", clip: "clip5" },
  { type: "photo", file: "daniela-cioara-makeup-2.jpg", catKey: "portfolio.cat4" },
  { type: "video", clip: "clip7" },
  { type: "photo", file: "daniela-cioara-makeup-24.jpg", catKey: "portfolio.cat2" },
  { type: "video", clip: "clip12" },
  { type: "photo", file: "daniela-cioara-makeup-25.jpg", catKey: "portfolio.cat1" },
  { type: "video", clip: "clip15" },
  { type: "photo", file: "daniela-cioara-makeup-17.jpg", catKey: "portfolio.cat3" },
  { type: "video", clip: "clip9" },
  { type: "photo", file: "daniela-cioara-makeup-23.jpg", catKey: "portfolio.cat1" },
  { type: "video", clip: "clip4" },
  { type: "photo", file: "daniela-cioara-makeup-20.jpg", catKey: "portfolio.cat4" },
  { type: "video", clip: "clip2" },
  { type: "video", clip: "clip8" },
  { type: "video", clip: "clip16" },
];

// Photos only — used by Lightbox
const PHOTOS = ITEMS.filter((it): it is Extract<Item, { type: "photo" }> => it.type === "photo");
// Videos only — used by mobile horizontal scroll
const VIDEOS = ITEMS.filter((it): it is Extract<Item, { type: "video" }> => it.type === "video");

const GOLD_BORDER =
  "linear-gradient(105deg,#6b4f1a,#c9a352,#f5d98b,#c9a352,#fff0a0,#c9a352,#7a5520) 1";

/* ── Photo card ──────────────────────────────────────────────────────────── */
function PhotoCard({
  photo,
  onClick,
  mobile,
  tall,
}: {
  photo: Extract<Item, { type: "photo" }>;
  onClick: () => void;
  mobile?: boolean;
  tall?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const src = R2_BASE ? `${R2_BASE}/portfolio/${photo.file}` : null;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        cursor: "pointer",
        overflow: "hidden",
        border: "2.5px solid transparent",
        borderImage: GOLD_BORDER,
        ...(tall && !mobile ? { gridRow: "span 2", aspectRatio: "8/5" } : { aspectRatio: "4/5" }),
        ...(mobile
          ? { width: "85vw", flexShrink: 0, aspectRatio: "4/5", scrollSnapAlign: "center" }
          : {}),
      }}
    >
      {/* Corner accents */}
      <span className="corner corner-tl" style={{ zIndex: 3 }} />
      <span className="corner corner-tr" style={{ zIndex: 3 }} />
      <span className="corner corner-bl" style={{ zIndex: 3 }} />
      <span className="corner corner-br" style={{ zIndex: 3 }} />

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

/* ── Video card ──────────────────────────────────────────────────────────── */
function VideoCard({
  clip,
  playing,
  onClick,
  mobile,
}: {
  clip: string;
  playing: boolean;
  onClick: () => void;
  mobile?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  const src = playing
    ? `${R2_VIDEO}/videos/${clip}.mp4`
    : `${R2_VIDEO}/videos/${clip}-preview.mp4`;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        cursor: "pointer",
        overflow: "hidden",
        aspectRatio: "4/5",
        border: "2.5px solid transparent",
        borderImage: GOLD_BORDER,
        ...(mobile
          ? { width: "85vw", flexShrink: 0, scrollSnapAlign: "center" }
          : {}),
      }}
    >
      {/* Corner accents */}
      <span className="corner corner-tl" style={{ zIndex: 3 }} />
      <span className="corner corner-tr" style={{ zIndex: 3 }} />
      <span className="corner corner-bl" style={{ zIndex: 3 }} />
      <span className="corner corner-br" style={{ zIndex: 3 }} />

      {/* Video — preview o full in loop a schermo pieno */}
      <video
        key={src}
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Play icon */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: hovered ? 0 : 1,
          transition: "opacity 0.3s ease",
          zIndex: 2,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "1.5px solid rgba(201,163,82,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.25)",
          }}
        >
          <span
            style={{
              display: "block",
              width: 0,
              height: 0,
              marginLeft: 3,
              borderTop: "7px solid transparent",
              borderBottom: "7px solid transparent",
              borderLeft: "11px solid #c9a352",
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ── Portfolio section ──────────────────────────────────────────────────── */
export default function Portfolio() {
  const { t } = useLanguage();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [atEndPhotos, setAtEndPhotos] = useState(false);
  const [atEndVideos, setAtEndVideos] = useState(false);
  const photosScrollRef = useRef<HTMLDivElement>(null);
  const videosScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleScrollPhotos = useCallback(() => {
    const el = photosScrollRef.current;
    if (!el) return;
    setAtEndPhotos(el.scrollLeft + el.clientWidth >= el.scrollWidth - 10);
  }, []);

  const handleScrollVideos = useCallback(() => {
    const el = videosScrollRef.current;
    if (!el) return;
    setAtEndVideos(el.scrollLeft + el.clientWidth >= el.scrollWidth - 10);
  }, []);

  const scrollNext = useCallback((ref: React.RefObject<HTMLDivElement | null>) => {
    const el = ref.current;
    if (!el) return;
    const itemWidth = el.clientWidth * 0.85 + 12;
    el.scrollBy({ left: itemWidth, behavior: "smooth" });
  }, []);

  const images = PHOTOS.map((p) => ({
    src: R2_BASE ? `${R2_BASE}/portfolio/${p.file}` : "",
    alt: p.file,
  }));

  const openLightbox = useCallback((photoIdx: number) => setLightboxIndex(photoIdx), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goPrev = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i - 1 + PHOTOS.length) % PHOTOS.length)),
    []
  );
  const goNext = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i + 1) % PHOTOS.length)),
    []
  );

  const toggleVideo = useCallback((clip: string) => {
    setPlayingVideo((prev) => (prev === clip ? null : clip));
  }, []);

  return (
    <>
      <section id="portfolio" className="portfolio-section">
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

          {isMobile ? (
            /* ── Mobile: photos vertical stack + videos horizontal scroll ── */
            <>
              <div
                ref={photosScrollRef}
                onScroll={handleScrollPhotos}
                className="portfolio-scroll"
                style={{
                  position: "relative",
                  display: "flex",
                  overflowX: "scroll",
                  scrollSnapType: "x mandatory",
                  gap: 12,
                  padding: "0 20px",
                  scrollbarWidth: "none",
                }}
              >
                {PHOTOS.map((photo, i) => (
                  <PhotoCard
                    key={photo.file}
                    photo={photo}
                    onClick={() => openLightbox(i)}
                    mobile
                  />
                ))}
              </div>
              {!atEndPhotos && (
                <button
                  onClick={() => scrollNext(photosScrollRef)}
                  aria-label="Next photo"
                  className="portfolio-arrow-btn"
                />
              )}

              <div style={{ marginTop: 24 }}>
                <div
                  ref={videosScrollRef}
                  onScroll={handleScrollVideos}
                  className="portfolio-scroll"
                  style={{
                    position: "relative",
                    display: "flex",
                    overflowX: "scroll",
                    scrollSnapType: "x mandatory",
                    gap: 12,
                    padding: "0 20px",
                    scrollbarWidth: "none",
                  }}
                >
                  {VIDEOS.map((v) => (
                    <VideoCard
                      key={v.clip}
                      clip={v.clip}
                      playing={playingVideo === v.clip}
                      onClick={() => toggleVideo(v.clip)}
                      mobile
                    />
                  ))}
                </div>
                {!atEndVideos && (
                  <button
                    onClick={() => scrollNext(videosScrollRef)}
                    aria-label="Next video"
                    className="portfolio-arrow-btn"
                  />
                )}
              </div>
            </>
          ) : (
            /* ── Desktop: 2-col mixed grid ────────────────────────────── */
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "1rem",
                alignItems: "stretch",
              }}
            >
              {ITEMS.map((item, i) => {
                if (item.type === "photo") {
                  const photoIdx = PHOTOS.indexOf(item);
                  return (
                    <PhotoCard
                      key={`photo-${item.file}-${i}`}
                      photo={item}
                      onClick={() => openLightbox(photoIdx)}
                      tall={item.tall}
                    />
                  );
                }
                return (
                  <VideoCard
                    key={`video-${item.clip}-${i}`}
                    clip={item.clip}
                    playing={playingVideo === item.clip}
                    onClick={() => toggleVideo(item.clip)}
                  />
                );
              })}
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
        .portfolio-arrow-btn {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 44px;
          height: 44px;
          opacity: 0;
          cursor: pointer;
          background: none;
          border: none;
          z-index: 4;
        }

        @media (max-width: 767px) {
          .portfolio-section { padding: 32px 0; }
          .portfolio-header  { padding: 0 20px; margin-bottom: 1.5rem; }
        }
      `}</style>
    </>
  );
}
