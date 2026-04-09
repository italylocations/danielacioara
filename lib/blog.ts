import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  featuredImage?: string;
  description?: string;
}

export interface Post extends PostMeta {
  content: string;
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const year = new Date(dateStr).getFullYear();
  if (isNaN(year)) return "";
  return `Rome, ${year}`;
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  const posts: PostMeta[] = files.map((filename) => {
    const slug = filename.replace(/\.(mdx|md)$/, "");
    const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf-8");
    const { data } = matter(raw);

    return {
      slug,
      title: (data.title as string) ?? slug,
      date: (data.date as string) ?? "",
      category: (data.category as string) ?? "Journal",
      excerpt: (data.excerpt as string) ?? "",
      featuredImage: data.featuredImage as string | undefined,
      description: data.description as string | undefined,
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): Post | null {
  for (const ext of [".mdx", ".md"]) {
    const filePath = path.join(BLOG_DIR, `${slug}${ext}`);
    if (!fs.existsSync(filePath)) continue;

    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    return {
      slug,
      title: (data.title as string) ?? slug,
      date: (data.date as string) ?? "",
      category: (data.category as string) ?? "Journal",
      excerpt: (data.excerpt as string) ?? "",
      featuredImage: data.featuredImage as string | undefined,
      description: data.description as string | undefined,
      content,
    };
  }

  return null;
}
