import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  weight: ["300", "400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cormorant",
});

const dmSans = DM_Sans({
  weight: ["300", "400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

const SITE_URL = "https://danielacioara.com";

export const metadata: Metadata = {
  title: "Daniela Cioara | Makeup Artist Rome",
  description:
    "Professional makeup artist based in Rome. Commercial, editorial, private sessions and destination weddings in Italy. Specialist in diverse skin tones and Asian beauty.",
  keywords: [
    "makeup artist Rome",
    "makeup artist Italy",
    "editorial makeup artist Rome",
    "commercial makeup artist Italy",
    "destination wedding makeup artist Rome",
    "soft glam bridal makeup Italy",
    "luxury makeup artist Rome",
    "makeup artist for asian clients Rome",
    "makeup artist asian features Italy",
    "makeup artist Chinese clients Rome",
    "trucco occhi asiatici Roma",
    "makeup for asian skin Rome",
    "Asian beauty makeup artist Italy",
  ],
  icons: { icon: "/favicon.svg" },
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Daniela Cioara | Makeup Artist Rome",
    description:
      "Professional makeup artist based in Rome. Commercial, editorial, private sessions and destination weddings in Italy. Specialist in diverse skin tones and Asian beauty.",
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Daniela Cioara",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Person", "ProfessionalService"],
  name: "Daniela Cioara",
  jobTitle: "Makeup Artist",
  description:
    "Professional makeup artist based in Rome, Italy. Specialist in commercial, editorial, private sessions and destination weddings. Expert in diverse skin tones and Asian beauty.",
  url: SITE_URL,
  email: "daniela@danielacioara.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Rome",
    addressCountry: "IT",
  },
  areaServed: ["Italy", "Europe"],
  knowsAbout: [
    "Commercial makeup",
    "Editorial makeup",
    "Bridal makeup",
    "Destination weddings",
    "Korean skincare",
    "Luxury beauty",
    "Asian beauty makeup",
    "diverse skin tones",
    "beauty makeup for Asian clients",
  ],
  brand: ["Chanel", "Dior Beauty", "Giorgio Armani Beauty", "Lancôme", "YSL Beauty"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable}`}
      style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
