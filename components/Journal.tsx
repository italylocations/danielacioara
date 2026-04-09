"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import type { PostMeta } from "@/lib/blog";

const R2_BASE = process.env.NEXT_PUBLIC_R2_PUBLIC_URL ?? "";

interface Props {
  posts: PostMeta[];
}

function PostCard({ post }: { post: PostMeta }) {
  const imgSrc =
    post.featuredImage && R2_BASE
      ? `${R2_BASE}/portfolio/${post.featuredImage}`
      : null;

  return (
    <Link
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
        }}
      >
        {/* Gold frame */}
        <div
          className="gm-border"
          style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none" }}
        />
        <span className="corner corner-tl" style={{ zIndex: 3 }} />
        <span className="corner corner-tr" style={{ zIndex: 3 }} />
        <span className="corner corner-bl" style={{ zIndex: 3 }} />
        <span className="corner corner-br" style={{ zIndex: 3 }} />

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
        className="gm"
        style={{
          fontSize: "0.65rem",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          marginBottom: "0.5rem",
        }}
      >
        {post.category}
      </p>

      {/* Title */}
      <h3
        className="font-cormorant"
        style={{
          fontSize: "1.15rem",
          fontWeight: 300,
          color: "#ede8df",
          lineHeight: 1.3,
          marginBottom: "0.5rem",
        }}
      >
        {post.title}
      </h3>

      {/* Excerpt */}
      {post.excerpt && (
        <p
          style={{
            fontSize: "0.8rem",
            color: "rgba(237,232,223,0.45)",
            lineHeight: 1.65,
            marginBottom: "0.5rem",
          }}
        >
          {post.excerpt}
        </p>
      )}

      {/* Date */}
      <p style={{ fontSize: "0.7rem", color: "rgba(237,232,223,0.22)" }}>
        {post.date ? `Rome, ${new Date(post.date).getFullYear()}` : ""}
      </p>
    </Link>
  );
}

export default function Journal({ posts }: Props) {
  const { t } = useLanguage();

  return (
    <section
      id="journal"
      className="journal-section"
      style={{ backgroundColor: "#080808" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "4rem" }}>
          <p
            className="gm"
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}
          >
            {t("journal.label")}
          </p>
          <h2
            className="font-cormorant"
            style={{
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              fontWeight: 300,
              color: "#ede8df",
            }}
          >
            {t("journal.title1")}
            <em className="gm" style={{ fontStyle: "italic" }}>
              {t("journal.title.italic")}
            </em>
          </h2>
        </div>

        {/* Grid */}
        {posts.length > 0 ? (
          <div className="journal-grid">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p
            className="font-cormorant"
            style={{
              color: "rgba(237,232,223,0.22)",
              fontStyle: "italic",
              fontSize: "1rem",
            }}
          >
            Coming soon.
          </p>
        )}
      </div>
      <style>{`
        .journal-section { padding: 7rem 2rem; }
        .journal-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        @media (max-width: 767px) {
          .journal-section { padding: 32px 20px; }
          .journal-grid { grid-template-columns: 1fr; gap: 2.5rem; }
        }
      `}</style>
    </section>
  );
}
