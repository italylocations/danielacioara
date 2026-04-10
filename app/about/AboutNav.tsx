"use client";

import Nav from "@/components/Nav";
import { LanguageProvider } from "@/contexts/LanguageContext";

export default function AboutNav() {
  return (
    <LanguageProvider>
      <Nav />
    </LanguageProvider>
  );
}
