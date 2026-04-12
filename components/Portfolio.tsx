"use client";

import { useState, useCallback, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Lightbox from "@/components/Lightbox";

const R2 = "https://pub-4bb9524bd21248d2ac34348d996317e9.r2.dev";

/* ── Data ────────────────────────────────────────────────────────────────── */
type Row =
  | { kind: "photos"; files: [string, string] }
  | { kind: "videos"; clips: [string, string, string] };

const ROWS: Row[] = [
  { kind: "photos", files: ["daniela-cioara-makeup-16.jpg", "daniela-cioara-makeup-7.jpg"] },
  { kind: "videos", clips: ["clip6", "clip10", "clip1"] },
  { kind: "photos", files: ["daniela-cioara-makeup-1.jpg", "daniela-cioara-makeup-6.jpg"] },
  { kind: "videos", clips: ["clip5", "clip7", "clip12"] },
  { kind: "photos", files: ["daniela-cioara-makeup-2.jpg", "daniela-cioara-makeup-24.jpg"] },
  { kind: "videos", clips: ["clip15", "clip9", "clip4"] },
  { kind: "photos", files: ["daniela-cioara-makeup-25.jpg", "daniela-cioara-makeup-17.jpg"] },
  { kind: "videos", clips: ["clip2", "clip8", "clip16"] },
  { kind: "photos", files: ["daniela-cioara-makeup-23.jpg", "daniela-cioara-makeup-20.jpg"] },
];

// Flattened list of photos (for Lightbox index mapping)
const PHOTOS: string[] = ROWS.flatMap((r) => (r.kind === "photos" ? r.files : []));

// Flattened list of clips (for modal navigation)
const VIDEO_CLIPS: string[] = [
  "clip6","clip10","clip1","clip5","clip7","clip12",
  "clip15","clip9","clip4","clip2","clip8","clip16",
];

/* ── Photo cell ──────────────────────────────────────────────────────────── */
function PhotoCell({ file, onClick }: { file: string; onClick: () => void }) {
  return (
    <div onClick={onClick} className="pf-cell pf-photo">
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
          objectPosition: "center top",
          display: "block",
        }}
      />
    </div>
  );
}

/* ── Video cell ──────────────────────────────────────────────────────────── */
function VideoCell({
  clip,
  onToggle,
}: {
  clip: string;
  onToggle: () => void;
}) {
  return (
    <div onClick={onToggle} className="pf-cell pf-video">
      <span className="corner corner-tl" />
      <span className="corner corner-tr" />
      <span className="corner corner-bl" />
      <span className="corner corner-br" />
      <video
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
        <source src={`${R2}/videos/${clip}-preview.mp4`} type="video/mp4" />
      </video>
      <div className="pf-play">
        <span className="pf-play-triangle" />
      </div>
    </div>
  );
}

/* ── Portfolio section ──────────────────────────────────────────────────── */
export default function Portfolio() {
  const { t } = useLanguage();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Video modal state
  const [modalClip, setModalClip] = useState<string | null>(null);
  const [modalIndex, setModalIndex] = useState<number>(0);

  // Block body scroll when modal is open
  useEffect(() => {
    if (modalClip) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [modalClip]);

  const images = PHOTOS.map((file) => ({
    src: `${R2}/portfolio/${file}`,
    alt: file,
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

  const openVideoModal = useCallback((clip: string) => {
    const idx = VIDEO_CLIPS.indexOf(clip);
    setModalIndex(idx);
    setModalClip(clip);
  }, []);

  const navigateModal = useCallback((direction: number) => {
    setModalIndex((prev) => {
      const newIdx = (prev + direction + VIDEO_CLIPS.length) % VIDEO_CLIPS.length;
      setModalClip(VIDEO_CLIPS[newIdx]);
      return newIdx;
    });
  }, []);

  // Keyboard: ESC to close, ArrowLeft/Right to navigate
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!modalClip) return;
      if (e.key === "Escape") setModalClip(null);
      if (e.key === "ArrowLeft") navigateModal(-1);
      if (e.key === "ArrowRight") navigateModal(1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [modalClip, navigateModal]);

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

          {/* Rows */}
          {ROWS.map((row, rowIdx) => {
            if (row.kind === "photos") {
              return (
                <div key={`row-${rowIdx}`} className="pf-row-photos">
                  {row.files.map((file) => {
                    const photoIdx = PHOTOS.indexOf(file);
                    return (
                      <PhotoCell
                        key={file}
                        file={file}
                        onClick={() => openLightbox(photoIdx)}
                      />
                    );
                  })}
                </div>
              );
            }
            return (
              <div key={`row-${rowIdx}`} className="pf-row-videos">
                {row.clips.map((clip) => (
                  <VideoCell
                    key={clip}
                    clip={clip}
                    onToggle={() => openVideoModal(clip)}
                  />
                ))}
              </div>
            );
          })}
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

      {/* Video modal */}
      {modalClip && (
        <div
          className="vm-overlay"
          onClick={(e) => { if (e.target === e.currentTarget) setModalClip(null); }}
        >
          {/* Previous — outside video on desktop */}
          <button
            className="vm-btn vm-prev"
            onClick={() => navigateModal(-1)}
          >
            &#8249;
          </button>

          {/* Video container */}
          <div className="vm-container">
            <video
              key={modalClip}
              autoPlay
              muted
              loop
              playsInline
              className="vm-video"
            >
              <source src={`${R2}/videos/${modalClip}.mp4`} type="video/mp4" />
            </video>

            {/* Close — top-right of container */}
            <button
              className="vm-btn vm-close"
              onClick={() => setModalClip(null)}
            >
              &#10005;
            </button>
          </div>

          {/* Next — outside video on desktop */}
          <button
            className="vm-btn vm-next"
            onClick={() => navigateModal(1)}
          >
            &#8250;
          </button>

          {/* Position indicator */}
          <div className="vm-indicator">
            {modalIndex + 1} / {VIDEO_CLIPS.length}
          </div>
        </div>
      )}

      <style>{`
        .portfolio-section { padding: 6rem 2rem; }
        .portfolio-header  { margin-bottom: 3rem; }

        .pf-row-photos {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 10px;
        }
        .pf-row-videos {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 10px;
          margin-bottom: 10px;
        }

        .pf-cell {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          background: #0D0D0D;
          border: 2.5px solid transparent;
          border-image: linear-gradient(
            105deg,
            #6B4F1A,
            #C9A352,
            #F5D98B,
            #C9A352,
            #FFF0A0,
            #C9A352,
            #7A5520
          ) 1;
          transition: border-image 0.3s ease;
        }
        .pf-photo { aspect-ratio: 4 / 5; }
        .pf-video { aspect-ratio: 16 / 9; }

        .pf-video:hover {
          border-image: linear-gradient(
            105deg,
            #8A6B28,
            #E5C373,
            #FFF0A0,
            #FFE898,
            #FFF0A0,
            #E5C373,
            #8A6B28
          ) 1;
        }

        .pf-play {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1.5px solid rgba(201,163,82,0.55);
          background: rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          opacity: 1;
          transition: opacity 0.2s ease;
          z-index: 2;
        }
        .pf-video:hover .pf-play { opacity: 0; }

        .pf-play-triangle {
          display: block;
          width: 0;
          height: 0;
          margin-left: 3px;
          border-left: 14px solid #C9A874;
          border-top: 9px solid transparent;
          border-bottom: 9px solid transparent;
        }

        /* ── Video modal ─────────────────────────────────── */
        .vm-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.92);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }
        .vm-container {
          position: relative;
          width: 90vw;
          max-width: 900px;
          max-height: 80vh;
          aspect-ratio: 16 / 9;
          border: 2px solid transparent;
          border-image: linear-gradient(105deg,#6B4F1A,#C9A352,#F5D98B,#C9A352,#7A5520) 1;
        }
        .vm-video {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
          background: #000;
        }
        .vm-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(0,0,0,0.7);
          border: 1.5px solid rgba(201,163,82,0.6);
          color: #C9A874;
          font-size: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          padding: 0;
          line-height: 1;
          z-index: 10000;
          flex-shrink: 0;
        }
        .vm-prev {
          margin-right: 20px;
        }
        .vm-next {
          margin-left: 20px;
        }
        .vm-close {
          position: absolute;
          top: -54px;
          right: 0;
        }
        .vm-indicator {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          color: rgba(201,163,82,0.6);
          font-size: 11px;
          letter-spacing: 0.15em;
        }

        @media (max-width: 767px) {
          .portfolio-section { padding: 32px 20px; }
          .portfolio-header  { margin-bottom: 1.5rem; }

          .pf-row-photos {
            grid-template-columns: 1fr 1fr;
          }
          .pf-row-videos {
            grid-template-columns: 1fr;
            overflow-x: visible;
          }

          .vm-overlay {
            background: #000;
            backdrop-filter: none;
            -webkit-backdrop-filter: none;
          }
          .vm-container {
            width: 100%;
            max-width: none;
            max-height: none;
            height: 100%;
            aspect-ratio: auto;
            border: none;
            border-image: none;
          }
          .vm-video {
            object-fit: contain;
          }
          .vm-prev {
            position: absolute;
            top: 50%;
            left: 16px;
            transform: translateY(-50%);
            margin: 0;
          }
          .vm-next {
            position: absolute;
            top: 50%;
            right: 16px;
            transform: translateY(-50%);
            margin: 0;
          }
          .vm-close {
            position: absolute;
            top: 16px;
            right: 16px;
          }
        }
      `}</style>
    </>
  );
}
