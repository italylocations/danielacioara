"use client";

import Nav from "@/components/Nav";
import { LanguageProvider } from "@/contexts/LanguageContext";

export default function InnerPageNav() {
  return (
    <LanguageProvider>
      <Nav />
    </LanguageProvider>
  );
}
