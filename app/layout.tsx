import type { Metadata } from "next";
import Script from "next/script";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";
import SplashScreen from "@/components/SplashScreen";

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
    url: "https://danielacioara.com",
    siteName: "Daniela Cioara",
    images: [
      {
        url: "https://danielacioara.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Daniela Cioara — Makeup Artist Rome",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daniela Cioara | Makeup Artist Rome",
    description: "Professional makeup artist in Rome",
    images: ["https://danielacioara.com/og-image.jpg"],
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
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA4_ID}');
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col">
        <SplashScreen />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
