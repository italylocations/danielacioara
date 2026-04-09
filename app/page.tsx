import { LanguageProvider } from "@/contexts/LanguageContext";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Portfolio from "@/components/Portfolio";
import AsiaBreak from "@/components/AsiaBreak";
import About from "@/components/About";
import Services from "@/components/Services";
import Journal from "@/components/Journal";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/lib/blog";

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <LanguageProvider>
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <Portfolio />
        <AsiaBreak />
        <About />
        <Services />
        <Journal posts={posts} />
        <Contact />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
