"use client";

import Image from "next/image";
import { useEffect, useCallback, useRef } from "react";

interface LightboxImage {
  src: string;
  alt: string;
}

interface LightboxProps {
  images: LightboxImage[];
  index: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const BTN: React.CSSProperties = {
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: "0.75rem",
  lineHeight: 1,
  color: "transparent",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default function Lightbox({
  images,
  index,
  onClose,
  onNext,
  onPrev,
}: LightboxProps) {
  const touchStartX = useRef<number>(0);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    },
    [onClose, onNext, onPrev]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prev;
    };
  }, [handleKey]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 50) dx > 0 ? onNext() : onPrev();
  };

  const current = images[index];

  /* ── Gold arrow SVG ─────────────────────────────────────────────────────── */
  const ArrowLeft = () => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M18 6L10 14L18 22" stroke="url(#g)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="28" y2="0">
          <stop offset="0%" stopColor="#c9a352" />
          <stop offset="50%" stopColor="#f5d98b" />
          <stop offset="100%" stopColor="#c9a352" />
        </linearGradient>
      </defs>
    </svg>
  );

  const ArrowRight = () => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M10 6L18 14L10 22" stroke="url(#gr)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <defs>
        <linearGradient id="gr" x1="0" y1="0" x2="28" y2="0">
          <stop offset="0%" stopColor="#c9a352" />
          <stop offset="50%" stopColor="#f5d98b" />
          <stop offset="100%" stopColor="#c9a352" />
        </linearGradient>
      </defs>
    </svg>
  );

  return (
    <div
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.95)",
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        style={{
          ...BTN,
          position: "absolute",
          top: "1.25rem",
          right: "1.25rem",
          fontSize: "1.5rem",
          zIndex: 201,
        }}
        aria-label="Close"
      >
        <span className="gm" style={{ fontSize: "1.75rem", lineHeight: 1, fontWeight: 300, fontFamily: "var(--font-cormorant), serif" }}>
          ×
        </span>
      </button>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        style={{ ...BTN, position: "absolute", left: "1.25rem", top: "50%", transform: "translateY(-50%)", zIndex: 201 }}
        aria-label="Previous"
      >
        <ArrowLeft />
      </button>

      {/* Image */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          maxHeight: "90vh",
          maxWidth: "90vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          src={current.src}
          alt={current.alt}
          width={1200}
          height={1500}
          style={{
            maxHeight: "90vh",
            maxWidth: "90vw",
            width: "auto",
            height: "auto",
            objectFit: "contain",
            display: "block",
          }}
          priority
        />
        {/* Counter */}
        <p
          style={{
            position: "absolute",
            bottom: "-1.75rem",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "0.7rem",
            letterSpacing: "0.12em",
            color: "rgba(237,232,223,0.3)",
            whiteSpace: "nowrap",
          }}
        >
          {index + 1} / {images.length}
        </p>
      </div>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        style={{ ...BTN, position: "absolute", right: "1.25rem", top: "50%", transform: "translateY(-50%)", zIndex: 201 }}
        aria-label="Next"
      >
        <ArrowRight />
      </button>
    </div>
  );
}
