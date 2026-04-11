"use client";

import { useState, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Lightbox from "@/components/Lightbox";

const R2 = "https://pub-4bb9524bd21248d2ac34348d996317e9.r2.dev";

type Item =
  | { type: "photo"; file: string }
  | { type: "video"; clip: string };

const ITEMS: Item[] = [
  { type: "photo", file: "daniela-cioara-makeup-16.jpg" },
  { type: "video", clip: "clip6" },
  { type: "photo", file: "daniela-cioara-makeup-7.jpg" },
  { type: "video", clip: "clip10" },
  { type: "photo", file: "daniela-cioara-makeup-1.jpg" },
  { type: "video", clip: "clip1" },
  { type: "photo", file: "daniela-cioara-makeup-6.jpg" },
  { type: "video", clip: "clip5" },
  { type: "photo", file: "daniela-cioara-makeup-2.jpg" },
  { type: "video", clip: "clip7" },
  { type: "photo", file: "daniela-cioara-makeup-24.jpg" },
  { type: "video", clip: "clip12" },
  { type: "photo", file: "daniela-cioara-makeup-25.jpg" },
  { type: "video", clip: "clip15" },
  { type: "photo", file: "daniela-cioara-makeup-17.jpg" },
  { type: "video", clip: "clip9" },
  { type: "photo", file: "daniela-cioara-makeup-23.jpg" },
  { type: "video", clip: "clip4" },
  { type: "photo", file: "daniela-cioara-makeup-20.jpg" },
  { type: "video", clip: "clip2" },
  { type: "video", clip: "clip8" },
  { type: "video", clip: "clip16" },
];

const PHOTOS = ITEMS.filter(
  (it): it is Extract<Item, { type: "photo" }> => it.type === "photo"
);

/* ── Photo cell ──────────────────────────────────────────────────────────── */
function PhotoCell({
  file,
  onClick,
}: {
  file: string;
  onClick: () => void;
}) {
  return (
    <div onClick={onClick} className="pf-cell">
      <span className="corner corner-tl" />
      <span className="corner corner-tr" />
      <span className="corner corner-bl" />
      <span className="corner corner-br" />
      <img
        src={`${R2}/portfolio/${file}`}
        alt={file.replace(/[-_]/g, " ").replace(/\.jpg$/, "")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          display: "block",
        }}
      />
    </div>
  );
}

/* ── Video cell ──────────────────────────────────────────────────────────── */
function VideoCell({ clip }: { clip: string }) {
  const [playing, setPlaying] = useState(false);
  const src = playing
    ? `${R2}/videos/${clip}.mp4`
    : `${R2}/videos/${clip}-preview.mp4`;

  return (
    <div onClick={() => setPlaying((p) => !p)} className="pf-cell">
      <span className="corner corner-tl" />
      <span className="corner corner-tr" />
      <span className="corner corner-bl" />
      <span className="corner corner-br" />
      <video
        key={src}
        autoPlay
        muted
        loop
        playsInline
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      >
        <source src={src} type="video/mp4" />
      </video>
      {!playing && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "1.5px solid rgba(201,163,82,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#C9A874",
            fontSize: 14,
            backgroundColor: "rgba(0,0,0,0.25)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        >
          ▶
        </div>
      )}
    </div>
  );
}

/* ── Portfolio section ──────────────────────────────────────────────────── */
export default function Portfolio() {
  const { t } = useLanguage();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const images = PHOTOS.map((p) => ({
    src: `${R2}/portfolio/${p.file}`,
    alt: p.file,
  }));

  const openLightbox = useCallback((i: number) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goPrev = useCallback(
    () =>
      setLightboxIndex((i) =>
        i === null ? null : (i - 1 + PHOTOS.length) % PHOTOS.length
      ),
    []
  );
  const goNext = useCallback(
    () =>
      setLightboxIndex((i) =>
        i === null ? null : (i + 1) % PHOTOS.length
      ),
    []
  );

  return (
    <>
      <section id="portfolio" className="portfolio-section">
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
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

          <div className="pf-grid">
            {ITEMS.map((item, i) => {
              if (item.type === "photo") {
                const photoIdx = PHOTOS.findIndex(
                  (p) => p.file === item.file
                );
                return (
                  <PhotoCell
                    key={`p-${item.file}-${i}`}
                    file={item.file}
                    onClick={() => openLightbox(photoIdx)}
                  />
                );
              }
              return <VideoCell key={`v-${item.clip}-${i}`} clip={item.clip} />;
            })}
          </div>
        </div>
      </section>

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

        .pf-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }

        .pf-cell {
          position: relative;
          overflow: hidden;
          aspect-ratio: 3 / 4;
          cursor: pointer;
          border: 2.5px solid transparent;
          border-image: linear-gradient(
            105deg,
            #3A2A0A,
            #8A6520,
            rgba(201,163,82,0.3),
            #8A6520,
            #3A2A0A
          ) 1;
          transition: border-image 0.3s ease;
        }
        .pf-cell:hover {
          border-image: linear-gradient(
            105deg,
            #8A6520,
            #E5C373,
            #FFF0A0,
            #E5C373,
            #8A6520
          ) 1;
        }

        @media (max-width: 767px) {
          .portfolio-section { padding: 32px 20px; }
          .portfolio-header  { margin-bottom: 1.5rem; }
          .pf-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </>
  );
}
