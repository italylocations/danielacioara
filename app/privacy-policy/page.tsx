import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Daniela Cioara",
};

export default function PrivacyPolicy() {
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#0a0a0a", paddingTop: 72 }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "5rem 2rem" }}>
        <Link
          href="/"
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "rgba(237,232,223,0.35)",
            textDecoration: "none",
            display: "inline-block",
            marginBottom: "3rem",
          }}
        >
          ← Home
        </Link>
        <h1
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "2.5rem",
            fontWeight: 300,
            color: "#ede8df",
            marginBottom: "2rem",
          }}
        >
          Privacy Policy
        </h1>
        <div style={{ color: "rgba(237,232,223,0.6)", fontSize: "0.9rem", lineHeight: 1.8 }}>
          <p style={{ marginBottom: "1.5rem" }}>
            This website is operated by Daniela Cioara, makeup artist based in Rome, Italy.
          </p>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "1.3rem",
              color: "#ede8df",
              marginBottom: "0.75rem",
              marginTop: "2rem",
            }}
          >
            Data collected
          </h2>
          <p style={{ marginBottom: "1rem" }}>
            When you submit the contact form, we collect your name, email address, and the content
            of your message. This data is used solely to respond to your inquiry and is never shared
            with third parties.
          </p>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "1.3rem",
              color: "#ede8df",
              marginBottom: "0.75rem",
              marginTop: "2rem",
            }}
          >
            Your rights (GDPR)
          </h2>
          <p style={{ marginBottom: "1rem" }}>
            You have the right to access, correct, or delete your personal data at any time. To
            exercise these rights, contact us at daniela@danielacioara.com.
          </p>
          <p style={{ color: "rgba(237,232,223,0.3)", fontSize: "0.8rem", marginTop: "3rem" }}>
            Last updated: April 2025
          </p>
        </div>
      </div>
    </main>
  );
}
