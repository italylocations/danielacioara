"use client";

import { useState, useCallback, useRef, useEffect } from "react";
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

// Flattened list of clips (for fullscreen navigation)
const ALL_CLIPS: string[] = ROWS.flatMap((r) => (r.kind === "videos" ? r.clips : []));

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
  playingFull,
  onToggle,
  videoRef,
}: {
  clip: string;
  playingFull: boolean;
  onToggle: () => void;
  videoRef: (el: HTMLVideoElement | null) => void;
}) {
  const src = playingFull
    ? `${R2}/videos/${clip}.mp4`
    : `${R2}/videos/${clip}-preview.mp4`;

  return (
    <div onClick={onToggle} className="pf-cell pf-video">
      <span className="corner corner-tl" />
      <span className="corner corner-tr" />
      <span className="corner corner-bl" />
      <span className="corner corner-br" />
      <video
        ref={videoRef}
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
      {!playingFull && (
        <div className="pf-play">
          <span className="pf-play-triangle" />
        </div>
      )}
    </div>
  );
}

/* ── Portfolio section ──────────────────────────────────────────────────── */
export default function Portfolio() {
  const { t } = useLanguage();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [playingFull, setPlayingFull] = useState<Record<string, boolean>>({});
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const [fullscreenClip, setFullscreenClip] = useState<string | null>(null);

  // Listen for fullscreen exit (back gesture on Android, ESC, etc.)
  useEffect(() => {
    const onFsChange = () => {
      const fsEl = document.fullscreenElement || (document as any).webkitFullscreenElement;
      if (!fsEl) {
        setFullscreenClip((prev) => {
          if (prev) {
            const video = videoRefs.current[prev];
            if (video) {
              video.src = `${R2}/videos/${prev}-preview.mp4`;
              video.load();
              video.play();
            }
          }
          return null;
        });
      }
    };
    document.addEventListener("fullscreenchange", onFsChange);
    document.addEventListener("webkitfullscreenchange", onFsChange);
    return () => {
      document.removeEventListener("fullscreenchange", onFsChange);
      document.removeEventListener("webkitfullscreenchange", onFsChange);
    };
  }, []);

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

  const enterFullscreen = useCallback((video: HTMLVideoElement) => {
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if ((video as any).webkitRequestFullscreen) {
      (video as any).webkitRequestFullscreen();
    } else if ((video as any).webkitEnterFullscreen) {
      (video as any).webkitEnterFullscreen();
    }
  }, []);

  const exitFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if ((document as any).webkitFullscreenElement) {
      (document as any).webkitExitFullscreen();
    }
  }, []);

  const toggleVideo = useCallback((clip: string) => {
    if (window.innerWidth < 768) {
      const video = videoRefs.current[clip];
      if (!video) return;
      video.src = `${R2}/videos/${clip}.mp4`;
      video.load();
      video.play();
      setFullscreenClip(clip);
      enterFullscreen(video);
    } else {
      setPlayingFull((prev) => ({ ...prev, [clip]: !prev[clip] }));
    }
  }, [enterFullscreen]);

  const navigateFullscreen = useCallback((direction: -1 | 1) => {
    setFullscreenClip((prev) => {
      if (!prev) return null;
      const idx = ALL_CLIPS.indexOf(prev);
      if (idx === -1) return prev;
      const nextIdx = (idx + direction + ALL_CLIPS.length) % ALL_CLIPS.length;
      const nextClip = ALL_CLIPS[nextIdx];

      // Exit fullscreen on current, switch source, re-enter on next
      const prevVideo = videoRefs.current[prev];
      if (prevVideo) {
        prevVideo.src = `${R2}/videos/${prev}-preview.mp4`;
        prevVideo.load();
        prevVideo.play();
      }

      // We need to exit then re-enter fullscreen on the new video
      exitFullscreen();

      // Small delay to let exit complete, then enter new fullscreen
      setTimeout(() => {
        const nextVideo = videoRefs.current[nextClip];
        if (nextVideo) {
          nextVideo.src = `${R2}/videos/${nextClip}.mp4`;
          nextVideo.load();
          nextVideo.play();
          enterFullscreen(nextVideo);
        }
      }, 100);

      return nextClip;
    });
  }, [enterFullscreen, exitFullscreen]);

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
                    playingFull={!!playingFull[clip]}
                    onToggle={() => toggleVideo(clip)}
                    videoRef={(el) => { videoRefs.current[clip] = el; }}
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

      {fullscreenClip && (
        <div className="pf-fs-overlay">
          <button
            className="pf-fs-btn pf-fs-prev"
            onClick={() => navigateFullscreen(-1)}
            aria-label="Previous video"
          >
            &#8592;
          </button>
          <button
            className="pf-fs-btn pf-fs-next"
            onClick={() => navigateFullscreen(1)}
            aria-label="Next video"
          >
            &#8594;
          </button>
          <button
            className="pf-fs-btn pf-fs-close"
            onClick={exitFullscreen}
            aria-label="Exit fullscreen"
          >
            &#10005;
          </button>
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

        .pf-fs-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          pointer-events: none;
          display: none;
        }
        .pf-fs-btn {
          pointer-events: auto;
          position: absolute;
          top: 16px;
          width: 44px;
          height: 44px;
          background: rgba(0,0,0,0.6);
          border: 1px solid rgba(201,163,82,0.5);
          border-radius: 50%;
          color: #C9A874;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          padding: 0;
          line-height: 1;
        }
        .pf-fs-prev  { left: 16px; }
        .pf-fs-next  { right: 68px; }
        .pf-fs-close { right: 16px; }

        @media (max-width: 767px) {
          .pf-fs-overlay { display: block; }
          .portfolio-section { padding: 32px 20px; }
          .portfolio-header  { margin-bottom: 1.5rem; }

          .pf-row-photos {
            grid-template-columns: 1fr 1fr;
          }
          .pf-row-videos {
            grid-template-columns: 1fr;
            overflow-x: visible;
          }
        }
      `}</style>
    </>
  );
}
