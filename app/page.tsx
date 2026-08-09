import type { Metadata } from "next";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Portfolio from "@/components/Portfolio";
import About from "@/components/About";
import Services from "@/components/Services";
import Journal from "@/components/Journal";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/lib/blog";
import { socialMetadata } from "@/lib/seo";

const TITLE = "Daniela Cioara | Makeup Artist Rome";
const DESCRIPTION =
  "Professional makeup artist based in Rome. Commercial, editorial, private sessions and destination weddings in Italy. Specialist in diverse skin tones and Asian beauty.";

export const metadata: Metadata = {
  ...socialMetadata({
    title: TITLE,
    description: DESCRIPTION,
    path: "/",
    imageAlt: "Daniela Cioara — Makeup Artist Rome",
  }),
};

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <LanguageProvider>
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <Portfolio />
        <About />
        <Services />
        <Journal posts={posts} />
        <Contact />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
