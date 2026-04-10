import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Daniela Cioara",
};

const h2Style: React.CSSProperties = {
  fontFamily: "var(--font-cormorant), serif",
  fontSize: "1.3rem",
  color: "#ede8df",
  marginBottom: "0.75rem",
  marginTop: "2rem",
};

const linkStyle: React.CSSProperties = {
  color: "rgba(237,232,223,0.6)",
  textDecoration: "underline",
  textUnderlineOffset: "3px",
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
          <h2 style={h2Style}>Titolare del trattamento</h2>
          <p style={{ marginBottom: "1rem" }}>
            Daniela Cioara<br />
            Codice Fiscale: CRIDLR91D53Z129Y<br />
            Email: <a href="mailto:daniela@danielacioara.com" style={linkStyle}>daniela@danielacioara.com</a><br />
            Sito web: danielacioara.com
          </p>

          <h2 style={h2Style}>Dati raccolti</h2>
          <p style={{ marginBottom: "1rem" }}>
            Quando invii il modulo di contatto, raccogliamo il tuo nome, indirizzo email e il
            contenuto del messaggio. Questi dati sono utilizzati esclusivamente per rispondere
            alla tua richiesta e non vengono mai condivisi con terze parti.
          </p>

          <h2 style={h2Style}>Cookie e tecnologie di tracciamento</h2>
          <p style={{ marginBottom: "1rem" }}>
            Questo sito utilizza Google Analytics per analizzare il traffico in forma aggregata
            e anonima, e Cloudflare Turnstile per la protezione anti-spam del modulo di contatto.
            Per maggiori dettagli, consulta la nostra{" "}
            <Link href="/cookie-policy" style={linkStyle}>Cookie Policy</Link>.
          </p>

          <h2 style={h2Style}>Base giuridica del trattamento</h2>
          <p style={{ marginBottom: "1rem" }}>
            I dati personali sono trattati sulla base del legittimo interesse del titolare
            (rispondere alle richieste ricevute) e, ove applicabile, del consenso dell&apos;interessato.
          </p>

          <h2 style={h2Style}>Conservazione dei dati</h2>
          <p style={{ marginBottom: "1rem" }}>
            I dati raccolti tramite il modulo di contatto vengono conservati per il tempo
            necessario a gestire la richiesta e successivamente cancellati.
          </p>

          <h2 style={h2Style}>I tuoi diritti (GDPR)</h2>
          <p style={{ marginBottom: "1rem" }}>
            Ai sensi del Regolamento UE 2016/679 (GDPR), hai il diritto di accedere,
            rettificare o cancellare i tuoi dati personali in qualsiasi momento.
            Per esercitare questi diritti, contattaci all&apos;indirizzo{" "}
            <a href="mailto:daniela@danielacioara.com" style={linkStyle}>daniela@danielacioara.com</a>.
          </p>

          <p style={{ color: "rgba(237,232,223,0.3)", fontSize: "0.8rem", marginTop: "3rem" }}>
            Ultimo aggiornamento: Aprile 2026
          </p>
        </div>
      </div>
    </main>
  );
}
