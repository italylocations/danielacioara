import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/blog";
import InnerPageNav from "@/components/InnerPageNav";

export const metadata: Metadata = {
  title: "Journal — Daniela Cioara",
  description:
    "Beauty insights, behind-the-scenes and editorial stories from Daniela Cioara, makeup artist in Rome.",
};

const R2_BASE = process.env.NEXT_PUBLIC_R2_PUBLIC_URL ?? "";

export default function JournalPage() {
  const posts = getAllPosts();

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#0a0a0a", paddingTop: 72 }}>
      <InnerPageNav />
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "5rem 2rem" }}>
        {/* Header */}
        <div style={{ marginBottom: "4rem" }}>
          <p
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
              background:
                "linear-gradient(105deg,#6b4f1a 0%,#c9a352 18%,#f5d98b 32%,#e8c060 42%,#c9a352 50%,#f0d070 60%,#fff0a0 68%,#c9a352 78%,#8a6520 88%,#c9a352 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
          >
            Journal
          </p>
          <h1
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
              fontWeight: 300,
              color: "#ede8df",
            }}
          >
            From the studio
          </h1>
        </div>

        {posts.length === 0 ? (
          <p
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontStyle: "italic",
              color: "rgba(237,232,223,0.3)",
              fontSize: "1.1rem",
            }}
          >
            Articles coming soon.
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "2.5rem",
            }}
            className="journal-grid"
          >
            {posts.map((post) => {
              const imgSrc =
                post.featuredImage && R2_BASE
                  ? `${R2_BASE}/portfolio/${post.featuredImage}`
                  : null;

              return (
                <Link
                  key={post.slug}
                  href={`/journal/${post.slug}`}
                  style={{ textDecoration: "none", display: "block" }}
                >
                  {/* Thumbnail */}
                  <div
                    style={{
                      position: "relative",
                      paddingTop: "66%",
                      marginBottom: "1.25rem",
                      overflow: "hidden",
                      border: "2.5px solid transparent",
                      borderImage:
                        "linear-gradient(105deg,#6b4f1a,#c9a352,#f5d98b,#c9a352,#fff0a0,#c9a352,#7a5520) 1",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        top: -2,
                        left: -2,
                        width: 14,
                        height: 14,
                        borderTop: "2px solid #f5d98b",
                        borderLeft: "2px solid #f5d98b",
                        zIndex: 3,
                      }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        top: -2,
                        right: -2,
                        width: 14,
                        height: 14,
                        borderTop: "2px solid #f5d98b",
                        borderRight: "2px solid #f5d98b",
                        zIndex: 3,
                      }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        bottom: -2,
                        left: -2,
                        width: 14,
                        height: 14,
                        borderBottom: "2px solid #f5d98b",
                        borderLeft: "2px solid #f5d98b",
                        zIndex: 3,
                      }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        bottom: -2,
                        right: -2,
                        width: 14,
                        height: 14,
                        borderBottom: "2px solid #f5d98b",
                        borderRight: "2px solid #f5d98b",
                        zIndex: 3,
                      }}
                    />

                    {imgSrc ? (
                      <Image
                        src={imgSrc}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        style={{ objectFit: "cover", objectPosition: "center top" }}
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
                        <span
                          style={{
                            color: "rgba(237,232,223,0.06)",
                            fontSize: "0.7rem",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                          }}
                        >
                          Journal
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Category */}
                  <p
                    style={{
                      fontSize: "0.65rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      marginBottom: "0.5rem",
                      background:
                        "linear-gradient(105deg,#6b4f1a 0%,#c9a352 18%,#f5d98b 32%,#e8c060 42%,#c9a352 50%,#f0d070 60%,#fff0a0 68%,#c9a352 78%,#8a6520 88%,#c9a352 100%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      color: "transparent",
                    }}
                  >
                    {post.category}
                  </p>

                  {/* Title */}
                  <h2
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontSize: "1.2rem",
                      fontWeight: 300,
                      color: "#ede8df",
                      lineHeight: 1.3,
                      marginBottom: "0.6rem",
                    }}
                  >
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p
                      style={{
                        fontSize: "0.82rem",
                        color: "rgba(237,232,223,0.5)",
                        lineHeight: 1.65,
                        marginBottom: "0.5rem",
                      }}
                    >
                      {post.excerpt}
                    </p>
                  )}

                  {/* Date */}
                  <p style={{ fontSize: "0.72rem", color: "rgba(237,232,223,0.22)" }}>
                    {post.date ? `Rome, ${new Date(post.date).getFullYear()}` : ""}
                  </p>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 767px) {
          .journal-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
