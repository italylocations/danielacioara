"use client";

import { useState, FormEvent } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const PROJECT_TYPES = [
  "Commercial & Editorial",
  "Private Session",
  "Destination Wedding",
  "Other",
];

export default function Contact() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    project: "",
    message: "",
    honeypot: "",
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (form.honeypot) return; // bot
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          project: form.project,
          message: form.message,
        }),
      });
      if (res.ok) {
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "none",
    border: "none",
    borderBottom: "0.5px solid rgba(237,232,223,0.2)",
    padding: "0.75rem 0",
    color: "#ede8df",
    fontSize: "0.875rem",
    fontFamily: "var(--font-dm-sans), sans-serif",
    fontWeight: 300,
    transition: "border-bottom-color 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.7rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "rgba(237,232,223,0.4)",
    marginBottom: "0.25rem",
  };

  return (
    <section
      id="contact"
      style={{ backgroundColor: "#080808", padding: "7rem 2rem" }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "6rem",
          alignItems: "start",
        }}
      >
        {/* Left: Form */}
        <div>
          <p
            className="gm"
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}
          >
            {t("contact.label")}
          </p>
          <h2
            className="font-cormorant"
            style={{
              fontSize: "clamp(2rem, 3vw, 2.75rem)",
              fontWeight: 300,
              color: "#ede8df",
              marginBottom: "3rem",
            }}
          >
            {t("contact.title1")}
            <em className="gm" style={{ fontStyle: "italic" }}>
              {t("contact.title.italic")}
            </em>
            {t("contact.title2")}
          </h2>

          {status === "sent" ? (
            <p
              className="font-cormorant"
              style={{
                fontSize: "1.2rem",
                color: "#ede8df",
                fontStyle: "italic",
              }}
            >
              Thank you — I will be in touch soon.
            </p>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Honeypot */}
              <input
                type="text"
                name="website"
                value={form.honeypot}
                onChange={(e) => setForm({ ...form, honeypot: e.target.value })}
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
              />

              <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                <div>
                  <label style={labelStyle}>{t("contact.name")}</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>{t("contact.email")}</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>{t("contact.project")}</label>
                  <select
                    required
                    value={form.project}
                    onChange={(e) =>
                      setForm({ ...form, project: e.target.value })
                    }
                    style={{ ...inputStyle, cursor: "pointer" }}
                  >
                    <option value="" style={{ backgroundColor: "#111" }}>
                      —
                    </option>
                    {PROJECT_TYPES.map((p) => (
                      <option key={p} value={p} style={{ backgroundColor: "#111" }}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>{t("contact.message")}</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    style={{
                      ...inputStyle,
                      resize: "none",
                      display: "block",
                    }}
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="gm-bg"
                    style={{
                      border: "none",
                      cursor: status === "sending" ? "wait" : "pointer",
                      padding: "0.875rem 2.5rem",
                      fontSize: "0.75rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#0a0a0a",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontWeight: 400,
                      opacity: status === "sending" ? 0.7 : 1,
                    }}
                  >
                    {status === "sending" ? "..." : t("contact.send")}
                  </button>
                </div>

                {status === "error" && (
                  <p style={{ color: "#c9a352", fontSize: "0.8rem" }}>
                    Something went wrong. Please try again or email directly.
                  </p>
                )}
              </div>
            </form>
          )}
        </div>

        {/* Right: Info */}
        <div style={{ paddingTop: "7rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            <div>
              <p
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(237,232,223,0.3)",
                  marginBottom: "0.4rem",
                }}
              >
                Email
              </p>
              <a
                href="mailto:daniela@danielacioara.com"
                className="gm"
                style={{
                  textDecoration: "none",
                  fontSize: "0.95rem",
                  letterSpacing: "0.02em",
                }}
              >
                daniela@danielacioara.com
              </a>
            </div>

            <div>
              <p
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(237,232,223,0.3)",
                  marginBottom: "0.4rem",
                }}
              >
                Location
              </p>
              <p style={{ color: "#ede8df", fontSize: "0.9rem" }}>
                {t("contact.location")}
              </p>
            </div>

            <div>
              <p
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(237,232,223,0.3)",
                  marginBottom: "0.4rem",
                }}
              >
                Availability
              </p>
              <p style={{ color: "#ede8df", fontSize: "0.9rem" }}>
                {t("contact.available")}
              </p>
            </div>

            <span className="gm-line" style={{ marginTop: "1rem" }} />

            <p
              className="font-cormorant"
              style={{
                fontStyle: "italic",
                fontSize: "1rem",
                color: "rgba(237,232,223,0.35)",
                lineHeight: 1.6,
              }}
            >
              "Every inquiry is read personally."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
