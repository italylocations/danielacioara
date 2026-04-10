import Image from "next/image";
import Link from "next/link";

const R2 = process.env.NEXT_PUBLIC_R2_PUBLIC_URL ?? "";

export const metadata = {
  title: "About | Daniela Cioara — Makeup Artist Rome",
  description:
    "Makeup artist based in Rome with over 8 years of experience in commercial photography, fashion editorials and private sessions. Specialist in beauty and soft glam makeup for Italian and international clients.",
};

const BTS_IMAGES = [
  "daniela-cioara-makeup-8.jpg",
  "daniela-cioara-makeup-13.jpg",
  "daniela-cioara-makeup-14.jpg",
  "daniela-cioara-makeup-15.jpg",
  "daniela-cioara-makeup-25.jpg",
  "daniela-cioara-makeup-9.jpg",
];

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Daniela Cioara",
    jobTitle: "Makeup Artist",
    description:
      "Professional makeup artist based in Rome with over 8 years experience in commercial photography and private sessions",
    url: "https://danielacioara.com",
    email: "daniela@danielacioara.com",
    telephone: "+393272412788",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Rome",
      addressCountry: "IT",
    },
    areaServed: [
      "Rome",
      "Naples",
      "Amalfi Coast",
      "Tuscany",
      "Umbria",
      "Milan",
      "Italy",
    ],
    knowsAbout: [
      "beauty makeup",
      "soft glam",
      "commercial photography makeup",
      "Asian beauty makeup",
      "bridal makeup",
      "Italian fashion photography",
    ],
    worksFor: [
      {
        "@type": "Organization",
        name: "MM Productions srl",
        url: "https://www.mmproductions.it/",
      },
      {
        "@type": "Organization",
        name: "Nreal",
        url: "https://www.nreal.it/",
      },
      {
        "@type": "Organization",
        name: "Italy Creatives",
        url: "https://www.italycreatives.com/",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── 1. HERO — video ─────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "80vh",
          overflow: "hidden",
          marginTop: 72,
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          <source src="/hero-asia-mobile.mp4" media="(max-width: 767px)" type="video/mp4" />
          <source src="/hero-asia.mp4" type="video/mp4" />
        </video>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.45)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            textAlign: "center",
            width: "90%",
            maxWidth: 700,
          }}
        >
          <p
            className="gm"
            style={{
              fontSize: 9,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontWeight: 300,
              marginBottom: "1.25rem",
            }}
          >
            About
          </p>
          <h1
            className="font-cormorant about-page-hero-title"
            style={{
              fontWeight: 300,
              color: "#ede8df",
              lineHeight: 1.15,
              textShadow: "0 2px 20px rgba(0,0,0,0.5)",
            }}
          >
            The art of{" "}
            <em className="gm" style={{ fontStyle: "italic" }}>
              enhancing
            </em>
            . Never masking.
          </h1>
        </div>
      </section>

      {/* ── 2. BIO ───────────────────────────────────────────────────────── */}
      <section
        className="about-page-bio"
        style={{ backgroundColor: "#080808" }}
      >
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          {/* Portrait — float right on desktop, centered block on mobile */}
          <div className="about-page-portrait">
            <div className="about-page-portrait-frame">
              <Image
                src={`${R2}/portrait/daniela-portrait-opt.jpg`}
                alt="Daniela Cioara — Makeup Artist Rome"
                width={200}
                height={267}
                style={{
                  width: "100%",
                  height: "auto",
                  aspectRatio: "3/4",
                  objectFit: "cover",
                  objectPosition: "top center",
                  display: "block",
                }}
              />
            </div>
            <div style={{ textAlign: "center", marginTop: 8 }}>
              <p
                className="font-cormorant gm"
                style={{
                  fontSize: 11,
                  fontWeight: 300,
                  letterSpacing: "0.15em",
                  marginBottom: 3,
                }}
              >
                Daniela Cioara
              </p>
              <p
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: 8,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "rgba(237,232,223,0.4)",
                }}
              >
                Makeup Artist · Rome
              </p>
            </div>
          </div>

          <p style={paraStyle}>
            Daniela Cioara is a professional makeup artist based in Rome, with
            over eight years of experience working across commercial
            photography, fashion editorials, and exclusive private sessions.
            Born in Romania and raised in Italy, she brings a rare combination
            of European sensibility and cosmopolitan perspective to every
            project. Her work spans Rome, Naples, the Amalfi Coast, Tuscany,
            Umbria, and occasional projects in Milan — always with the same
            standard of precision and care.
            <br />
            <br />
            Her background is unusual for the industry: before becoming a makeup
            artist, she graduated in Psychology at the Pontifical Salesian
            University of Rome. That education is present in every session — in
            the way she listens, observes, and understands what each client
            truly needs, often before they say it.
          </p>

          <p style={paraStyle}>
            Daniela specialises exclusively in makeup. Not hair. Not styling.
            Makeup — and only makeup, done with complete focus and mastery.
            <br />
            <br />
            When a client requires both hair and makeup services, she works
            alongside trusted professional hairstylists she has selected
            personally. This is a deliberate choice: hair and makeup are
            entirely different crafts, and she believes that doing both
            simultaneously compromises the quality of each.
            <br />
            <br />
            She invests continuously in her education — attending masterclasses
            and advanced training throughout the year, because she believes that
            in this craft, learning never stops. She tests every product
            personally on her own skin before it enters her professional kit.
            She arrives on time, works with calm precision, and maintains the
            discretion that her high-profile clients expect.
          </p>

          <p style={paraStyle}>
            Daniela works primarily with Italian production companies
            specialising in commercial and fashion photography. Her
            long-standing collaborations include{" "}
            <a
              href="https://www.mmproductions.it/"
              target="_blank"
              rel="noopener noreferrer"
              className="gm about-page-link"
            >
              MM Productions srl
            </a>
            ,{" "}
            <a
              href="https://www.nreal.it/"
              target="_blank"
              rel="noopener noreferrer"
              className="gm about-page-link"
            >
              Nreal
            </a>{" "}
            and{" "}
            <a
              href="https://www.italycreatives.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="gm about-page-link"
            >
              Italy Creatives
            </a>
            .
            <br />
            <br />
            Her private clientele includes executives, professionals, and
            individuals who seek an exclusive, unhurried beauty experience — at
            her studio or on location at their home or hotel.
          </p>

          <p style={paraStyle}>
            The products in her kit are chosen with the same rigour she applies
            to everything else. She works exclusively with Chanel, Dior, Giorgio
            Armani Beauty, Clé de Peau Beauté, Lancôme, YSL Beauty and Givenchy
            Beauty — luxury brands whose formulations she has tested personally
            and trusts completely.
            <br />
            <br />
            Every session begins with skincare preparation, inspired by the
            Korean approach to beauty: cleansing, hydration, and a luminous base
            that allows the makeup to perform at its best.
          </p>
        </div>
      </section>

      {/* ── 3. DIVIDER ───────────────────────────────────────────────────── */}
      <div style={{ backgroundColor: "#080808", padding: "0 44px" }}>
        <span className="gm-line" style={{ width: "100%", display: "block" }} />
      </div>

      {/* ── 4. BTS GRID ──────────────────────────────────────────────────── */}
      <section
        className="about-page-bts"
        style={{ backgroundColor: "#080808" }}
      >
        <p
          className="gm"
          style={{
            fontSize: "0.68rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginBottom: 48,
          }}
        >
          Behind the work
        </p>
        <div className="about-page-bts-grid">
          {BTS_IMAGES.map((img) => (
            <div key={img} className="about-page-bts-frame">
              <Image
                src={`${R2}/portfolio/${img}`}
                alt="Daniela Cioara behind the scenes"
                width={400}
                height={300}
                style={{
                  width: "100%",
                  height: "auto",
                  aspectRatio: "4/3",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. CTA ───────────────────────────────────────────────────────── */}
      <section
        className="about-page-cta"
        style={{ backgroundColor: "#080808", textAlign: "center" }}
      >
        <p
          className="font-cormorant"
          style={{
            fontSize: 28,
            fontWeight: 300,
            color: "#ede8df",
            lineHeight: 1.4,
            marginBottom: 12,
          }}
        >
          Available in Rome and throughout Italy.
        </p>
        <p
          style={{
            fontSize: 13,
            color: "rgba(237,232,223,0.4)",
            marginBottom: 32,
          }}
        >
          For productions, private sessions and destination weddings.
        </p>
        <span
          className="gm-line"
          style={{ width: 36, display: "block", margin: "0 auto 32px" }}
        />
        <Link
          href="/#contact"
          className="gm"
          style={{
            textDecoration: "none",
            fontSize: "0.82rem",
            letterSpacing: "0.08em",
            fontWeight: 300,
          }}
        >
          Get in touch →
        </Link>
      </section>

      {/* ── Styles ───────────────────────────────────────────────────────── */}
      <style>{`
        .about-page-hero-title { font-size: 46px; }
        .about-page-bio { padding: 80px 44px; }
        .about-page-bts { padding: 48px 44px 80px; }
        .about-page-cta { padding: 80px 44px; }

        .about-page-portrait {
          float: right;
          max-width: 200px;
          margin: 0 0 24px 32px;
        }
        .about-page-portrait-frame {
          padding: 6px;
          border: 0.5px solid rgba(193,163,98,0.25);
          background:
            linear-gradient(135deg, rgba(193,163,98,0.5) 0%, transparent 20%),
            linear-gradient(225deg, rgba(193,163,98,0.5) 0%, transparent 20%),
            linear-gradient(315deg, rgba(193,163,98,0.5) 0%, transparent 20%),
            linear-gradient(45deg,  rgba(193,163,98,0.5) 0%, transparent 20%);
        }

        .about-page-link {
          text-decoration: none;
        }
        .about-page-link:hover {
          text-decoration: underline;
        }

        .about-page-bts-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        .about-page-bts-frame {
          padding: 6px;
          border: 0.5px solid rgba(193,163,98,0.25);
          background:
            linear-gradient(135deg, rgba(193,163,98,0.5) 0%, transparent 20%),
            linear-gradient(225deg, rgba(193,163,98,0.5) 0%, transparent 20%),
            linear-gradient(315deg, rgba(193,163,98,0.5) 0%, transparent 20%),
            linear-gradient(45deg,  rgba(193,163,98,0.5) 0%, transparent 20%);
        }

        @media (max-width: 767px) {
          .about-page-hero-title { font-size: 28px; }
          .about-page-bio { padding: 48px 24px; }
          .about-page-bts { padding: 32px 24px 48px; }
          .about-page-cta { padding: 48px 24px; }
          .about-page-portrait {
            float: none;
            max-width: 160px;
            margin: 0 auto 32px;
          }
          .about-page-bts-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </>
  );
}

const paraStyle: React.CSSProperties = {
  color: "rgba(237,232,223,0.6)",
  fontSize: 14,
  lineHeight: 2,
  marginBottom: 32,
};
