import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Policy — Daniela Cioara",
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

export default function CookiePolicy() {
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
          Cookie Policy
        </h1>
        <div style={{ color: "rgba(237,232,223,0.6)", fontSize: "0.9rem", lineHeight: 1.8 }}>
          <h2 style={h2Style}>Titolare del trattamento</h2>
          <p style={{ marginBottom: "1rem" }}>
            Daniela Cioara<br />
            Codice Fiscale: CRIDLR91D53Z129Y<br />
            Email: <a href="mailto:daniela@danielacioara.com" style={linkStyle}>daniela@danielacioara.com</a><br />
            Sito web: danielacioara.com
          </p>

          <h2 style={h2Style}>Cosa sono i cookie</h2>
          <p style={{ marginBottom: "1rem" }}>
            I cookie sono piccoli file di testo che i siti web memorizzano sul tuo dispositivo
            per migliorare l&apos;esperienza di navigazione. Questo sito non utilizza cookie di
            profilazione pubblicitaria.
          </p>

          <h2 style={h2Style}>Cookie tecnici</h2>
          <p style={{ marginBottom: "1rem" }}>
            La preferenza di lingua (EN/IT) viene salvata in localStorage per garantire
            un&apos;esperienza coerente tra le visite. Non si tratta di un cookie e non comporta
            alcuna forma di tracciamento.
          </p>

          <h2 style={h2Style}>Google Analytics</h2>
          <p style={{ marginBottom: "1rem" }}>
            Questo sito utilizza Google Analytics per raccogliere dati di navigazione in forma
            aggregata e anonima (pagine visitate, durata della sessione, provenienza geografica).
            Questi dati vengono utilizzati esclusivamente per migliorare il sito e non vengono
            condivisi con terze parti a fini commerciali. Google Analytics può impostare cookie
            sul tuo dispositivo (es. _ga, _gid).
          </p>

          <h2 style={h2Style}>Cloudflare Turnstile</h2>
          <p style={{ marginBottom: "1rem" }}>
            Il modulo di contatto utilizza Cloudflare Turnstile come protezione anti-spam.
            Turnstile può impostare cookie tecnici necessari per verificare che la richiesta
            provenga da un utente reale e non da un bot automatico (es. cf_clearance).
          </p>

          <h2 style={h2Style}>Come gestire i cookie</h2>
          <p style={{ marginBottom: "1rem" }}>
            Puoi gestire o disabilitare i cookie attraverso le impostazioni del tuo browser.
            La disabilitazione di alcuni cookie potrebbe influire sul funzionamento del sito.
            Per maggiori informazioni sul trattamento dei tuoi dati, consulta la nostra{" "}
            <Link href="/privacy-policy" style={linkStyle}>Privacy Policy</Link>.
          </p>

          <p style={{ color: "rgba(237,232,223,0.3)", fontSize: "0.8rem", marginTop: "3rem" }}>
            Ultimo aggiornamento: Aprile 2026
          </p>
        </div>
      </div>
    </main>
  );
}
