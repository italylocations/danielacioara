import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getAllPosts, formatDate } from "@/lib/blog";
import VideoBreak from "@/components/VideoBreak";
import type { JSX } from "react";

interface Props {
  params: Promise<{ slug: string }>;
}

const R2_BASE = process.env.NEXT_PUBLIC_R2_PUBLIC_URL ?? "";

/* ── Static params ────────────────────────────────────────────────────────── */
export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

/* ── Metadata ─────────────────────────────────────────────────────────────── */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not Found" };

  return {
    title: `${post.title} — Journal — Daniela Cioara`,
    description: post.description ?? post.excerpt,
    openGraph: {
      title: post.title,
      description: post.description ?? post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

/* ── MDX component overrides ──────────────────────────────────────────────── */
const mdxComponents = {
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2
      style={{
        fontFamily: "var(--font-cormorant), serif",
        fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
        fontWeight: 300,
        background:
          "linear-gradient(105deg,#6b4f1a 0%,#c9a352 18%,#f5d98b 32%,#e8c060 42%,#c9a352 50%,#f0d070 60%,#fff0a0 68%,#c9a352 78%,#8a6520 88%,#c9a352 100%)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        color: "transparent",
        margin: "2.5rem 0 1rem",
        lineHeight: 1.2,
      }}
    >
      {children}
    </h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3
      style={{
        fontFamily: "var(--font-cormorant), serif",
        fontSize: "1.3rem",
        fontWeight: 300,
        color: "#ede8df",
        margin: "2rem 0 0.75rem",
        fontStyle: "italic",
      }}
    >
      {children}
    </h3>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p
      style={{
        fontSize: 14,
        lineHeight: 2,
        color: "rgba(237,232,223,0.65)",
        marginBottom: "1.35rem",
      }}
    >
      {children}
    </p>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul
      style={{
        paddingLeft: "1.5rem",
        marginBottom: "1.35rem",
        listStyleType: "none",
      }}
    >
      {children}
    </ul>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li
      style={{
        fontSize: 14,
        lineHeight: 2,
        color: "rgba(237,232,223,0.65)",
        paddingLeft: "0.75rem",
        position: "relative",
      }}
    >
      <span
        style={{
          position: "absolute",
          left: -4,
          top: "0.85em",
          width: 4,
          height: 0.5,
          backgroundColor: "#c9a352",
          display: "inline-block",
        }}
      />
      {children}
    </li>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote
      style={{
        borderLeft: "1.5px solid #c9a352",
        paddingLeft: "1.5rem",
        margin: "2rem 0",
      }}
    >
      {children}
    </blockquote>
  ),
  hr: () => (
    <div
      style={{
        height: 0.5,
        background:
          "linear-gradient(105deg,#6b4f1a 0%,#c9a352 18%,#f5d98b 32%,#e8c060 42%,#c9a352 50%,#f0d070 60%,#fff0a0 68%,#c9a352 78%,#8a6520 88%,#c9a352 100%)",
        margin: "2.5rem 0",
      }}
    />
  ),
  strong: ({ children }: { children: React.ReactNode }) => (
    <strong style={{ color: "#ede8df", fontWeight: 400 }}>{children}</strong>
  ),
  em: ({ children }: { children: React.ReactNode }) => (
    <em style={{ fontStyle: "italic", color: "rgba(237,232,223,0.8)" }}>
      {children}
    </em>
  ),
  VideoBreak: ({ src }: { src: string }) => <VideoBreak src={src} />,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;

/* ── Page ─────────────────────────────────────────────────────────────────── */
export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const imgSrc =
    post.featuredImage && R2_BASE
      ? `${R2_BASE}/portfolio/${post.featuredImage}`
      : null;

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#0a0a0a",
        paddingTop: 72,
      }}
    >
      <article
        style={{
          maxWidth: 720,
          margin: "0 auto",
          padding: "4rem 2rem 6rem",
        }}
      >
        {/* Meta: category + date */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          <span
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              background:
                "linear-gradient(105deg,#6b4f1a 0%,#c9a352 18%,#f5d98b 32%,#e8c060 42%,#c9a352 50%,#f0d070 60%,#fff0a0 68%,#c9a352 78%,#8a6520 88%,#c9a352 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
          >
            {post.category}
          </span>
          {post.date && (
            <>
              <span style={{ color: "rgba(237,232,223,0.2)", fontSize: "0.65rem" }}>·</span>
              <span style={{ fontSize: "0.65rem", color: "rgba(237,232,223,0.3)", letterSpacing: "0.06em" }}>
                {formatDate(post.date)}
              </span>
            </>
          )}
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 300,
            color: "#ede8df",
            lineHeight: 1.15,
            marginBottom: "2.5rem",
          }}
        >
          {post.title}
        </h1>

        {/* Featured image */}
        {imgSrc && (
          <div
            style={{
              position: "relative",
              width: "100%",
              paddingTop: "60%",
              marginBottom: "3rem",
              overflow: "hidden",
              border: "2.5px solid transparent",
              borderImage:
                "linear-gradient(105deg,#6b4f1a,#c9a352,#f5d98b,#c9a352,#fff0a0,#c9a352,#7a5520) 1",
            }}
          >
            <span style={{ position: "absolute", top: -2, left: -2, width: 14, height: 14, borderTop: "2px solid #f5d98b", borderLeft: "2px solid #f5d98b", zIndex: 3 }} />
            <span style={{ position: "absolute", top: -2, right: -2, width: 14, height: 14, borderTop: "2px solid #f5d98b", borderRight: "2px solid #f5d98b", zIndex: 3 }} />
            <span style={{ position: "absolute", bottom: -2, left: -2, width: 14, height: 14, borderBottom: "2px solid #f5d98b", borderLeft: "2px solid #f5d98b", zIndex: 3 }} />
            <span style={{ position: "absolute", bottom: -2, right: -2, width: 14, height: 14, borderBottom: "2px solid #f5d98b", borderRight: "2px solid #f5d98b", zIndex: 3 }} />
            <Image
              src={imgSrc}
              alt={post.title}
              fill
              priority
              sizes="720px"
              style={{ objectFit: "cover", objectPosition: "center top" }}
            />
          </div>
        )}

        {/* Gold divider */}
        <div
          style={{
            height: 0.5,
            width: 40,
            background:
              "linear-gradient(105deg,#6b4f1a 0%,#c9a352 18%,#f5d98b 32%,#e8c060 42%,#c9a352 50%,#f0d070 60%,#fff0a0 68%,#c9a352 78%,#8a6520 88%,#c9a352 100%)",
            marginBottom: "3rem",
          }}
        />

        {/* MDX body */}
        <div>
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>

        {/* Back link */}
        <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "0.5px solid #1a1a1a" }}>
          <Link
            href="/journal"
            style={{
              fontSize: "0.78rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textDecoration: "none",
              background:
                "linear-gradient(105deg,#6b4f1a 0%,#c9a352 18%,#f5d98b 32%,#e8c060 42%,#c9a352 50%,#f0d070 60%,#fff0a0 68%,#c9a352 78%,#8a6520 88%,#c9a352 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
          >
            ← Back to Journal
          </Link>
        </div>
      </article>
    </main>
  );
}
