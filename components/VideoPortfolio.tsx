"use client";

import { useState } from "react";

const R2_BASE = "https://pub-4bb9524bd21248d2ac34348d996317e9.r2.dev";

const CLIPS: string[] = [
  "clip6",
  "clip10",
  "clip1",
  "clip5",
  "clip7",
  "clip12",
  "clip15",
  "clip9",
  "clip4",
  "clip2",
  "clip8",
  "clip16",
];

function VideoCard({
  clip,
  expanded,
  onClick,
}: {
  clip: string;
  expanded: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  const src = expanded
    ? `${R2_BASE}/videos/${clip}.mp4`
    : `${R2_BASE}/videos/${clip}-preview.mp4`;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={expanded ? "video-card video-card-expanded" : "video-card"}
      style={{
        position: "relative",
        cursor: "pointer",
        overflow: "hidden",
        aspectRatio: "16/9",
        border: "2.5px solid transparent",
        borderImage: hovered
          ? "linear-gradient(105deg,#8a6b28,#e5c373,#fff0a0,#ffe898,#fff0a0,#e5c373,#8a6b28) 1"
          : "linear-gradient(105deg,#6b4f1a,#c9a352,#f5d98b,#c9a352,#fff0a0,#c9a352,#7a5520) 1",
        transition: "border-image 0.3s ease",
        zIndex: expanded ? 10 : 1,
      }}
    >
      {/* Corner accents */}
      <span className="corner corner-tl" style={{ zIndex: 3 }} />
      <span className="corner corner-tr" style={{ zIndex: 3 }} />
      <span className="corner corner-bl" style={{ zIndex: 3 }} />
      <span className="corner corner-br" style={{ zIndex: 3 }} />

      {/* Video */}
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

      {/* Overlay + play icon */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.15)",
          opacity: hovered || expanded ? 0 : 1,
          transition: "opacity 0.3s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: "1.5px solid rgba(201,163,82,0.6)",
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
              borderTop: "6px solid transparent",
              borderBottom: "6px solid transparent",
              borderLeft: "10px solid #c9a352",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function VideoPortfolio() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const handleClick = (i: number) => {
    setExpandedIdx((prev) => (prev === i ? null : i));
  };

  return (
    <section id="motion" className="motion-section">
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Header */}
        <div className="motion-header">
          <p
            className="gm"
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}
          >
            Motion
          </p>
          <h2
            className="font-cormorant"
            style={{
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              fontWeight: 300,
              color: "#ede8df",
            }}
          >
            Work in{" "}
            <em className="gm" style={{ fontStyle: "italic" }}>
              motion
            </em>
          </h2>
        </div>

        {/* Grid */}
        <div className="motion-grid">
          {CLIPS.map((clip, i) => (
            <VideoCard
              key={clip}
              clip={clip}
              expanded={expandedIdx === i}
              onClick={() => handleClick(i)}
            />
          ))}
        </div>
      </div>

      <style>{`
        .motion-section { padding: 6rem 2rem; }
        .motion-header  { margin-bottom: 3rem; }
        .motion-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        .video-card-expanded {
          grid-column: span 2;
          grid-row: span 2;
        }

        @media (max-width: 767px) {
          .motion-section { padding: 32px 20px; }
          .motion-header  { margin-bottom: 1.5rem; }
          .motion-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
          .video-card-expanded {
            grid-column: 1 / -1;
            grid-row: span 2;
          }
        }
      `}</style>
    </section>
  );
}
