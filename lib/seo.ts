import type { Metadata } from "next";

export const SITE_URL = "https://danielacioara.com";
export const SITE_NAME = "Daniela Cioara";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

interface SocialInput {
  title: string;
  description: string;
  /** Percorso assoluto dalla root, es. "/about". La home e' "/". */
  path: string;
  /** URL assoluto. Se omesso usa l'immagine OG di default 1200x630. */
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  publishedTime?: string;
}

/**
 * Costruisce canonical + openGraph + twitter per una singola pagina.
 *
 * Next fa un merge superficiale dei metadata: una pagina che definisce
 * `openGraph` sostituisce per intero quello del layout, non lo estende.
 * Per questo ogni pagina deve emettere il blocco completo — altrimenti
 * perde silenziosamente og:image, og:site_name e og:locale.
 */
export function socialMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  imageAlt,
  type = "website",
  publishedTime,
}: SocialInput): Pick<Metadata, "alternates" | "openGraph" | "twitter"> {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;

  // Le dimensioni sono dichiarate solo per l'immagine di default, di cui
  // conosciamo il formato. Per le cover degli articoli lasciamo che siano
  // i crawler a rilevarle.
  const ogImage =
    image === DEFAULT_OG_IMAGE
      ? { url: image, width: 1200, height: 630, alt: imageAlt ?? title }
      : { url: image, alt: imageAlt ?? title };

  return {
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [ogImage],
      locale: "en_US",
      ...(type === "article"
        ? { type: "article" as const, publishedTime }
        : { type: "website" as const }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
