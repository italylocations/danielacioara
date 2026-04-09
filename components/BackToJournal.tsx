"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { translations } from "@/lib/translations";

type Lang = "en" | "it";

export default function BackToJournal() {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const stored = localStorage.getItem("lang") as Lang | null;
    if (stored === "en" || stored === "it") setLang(stored);
  }, []);

  const dict = translations[lang] as Record<string, string>;
  const label = dict["journal.back"] ?? "← Back to Journal";

  return (
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
        {label}
      </Link>
    </div>
  );
}
