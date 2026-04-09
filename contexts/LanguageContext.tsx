"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type Lang = "en" | "it";

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}

import { translations } from "@/lib/translations";

function detect(): Lang {
  if (typeof window === "undefined") return "en";
  const stored = localStorage.getItem("lang") as Lang | null;
  if (stored === "en" || stored === "it") return stored;
  const browser = navigator.language.toLowerCase();
  return browser.startsWith("it") ? "it" : "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    setLangState(detect());
  }, []);

  function setLang(l: Lang) {
    setLangState(l);
    localStorage.setItem("lang", l);
  }

  function t(key: string): string {
    const dict = translations[lang] as Record<string, string>;
    return dict[key] ?? translations["en"][key] ?? key;
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
