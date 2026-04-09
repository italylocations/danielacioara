export default function VideoBreak({ src }: { src: string }) {
  return (
    <div
      style={{
        margin: "32px 0",
        border: "2.5px solid transparent",
        borderImage:
          "linear-gradient(105deg,#6b4f1a,#c9a352,#f5d98b,#c9a352,#fff0a0,#c9a352,#7a5520) 1",
      }}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        src={src}
        style={{
          display: "block",
          width: "100%",
          aspectRatio: "16/9",
          objectFit: "cover",
        }}
      />
    </div>
  );
}
