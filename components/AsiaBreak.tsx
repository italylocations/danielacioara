"use client";

export default function AsiaBreak() {
  return (
    <section
      style={{
        width: "100%",
        borderTop: "0.5px solid #1A1A1A",
        borderBottom: "0.5px solid #1A1A1A",
      }}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        src="/hero-asia.mp4"
        style={{
          display: "block",
          width: "100%",
          height: "70vh",
          objectFit: "cover",
        }}
      />
      <style>{`
        @media (max-width: 768px) {
          section > video { height: 50vh !important; }
        }
      `}</style>
    </section>
  );
}
