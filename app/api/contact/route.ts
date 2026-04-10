import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

/* ── Rate limiting (in-memory, per-instance) ─────────────────────────── */
const hits = new Map<string, number[]>();
const RATE_WINDOW = 10 * 60 * 1000; // 10 minutes
const RATE_MAX = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW);
  if (timestamps.length >= RATE_MAX) {
    hits.set(ip, timestamps);
    return true;
  }
  timestamps.push(now);
  hits.set(ip, timestamps);
  return false;
}

/* ── Email regex ─────────────────────────────────────────────────────── */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    /* Honeypot — silent reject */
    if (body.website) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    /* Rate limiting */
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    /* Turnstile verification */
    const turnstileRes = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: body.turnstileToken,
        }),
      },
    );
    const turnstileData = await turnstileRes.json();
    if (!turnstileData.success) {
      return NextResponse.json(
        { error: "Verifica anti-spam fallita" },
        { status: 400 },
      );
    }

    const { name, email, project, message } = body;

    /* Validation */
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Name must be at least 2 characters." },
        { status: 400 },
      );
    }
    if (!email || typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }
    if (
      !message ||
      typeof message !== "string" ||
      message.trim().length < 10
    ) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters." },
        { status: 400 },
      );
    }

    const resendKey = process.env.RESEND_API_KEY;

    /* ── No API key: fallback ─────────────────────────────────────────── */
    if (!resendKey) {
      const isDev = process.env.NODE_ENV === "development";

      if (isDev) {
        const filePath = path.join(process.cwd(), "submissions.json");
        const existing = fs.existsSync(filePath)
          ? JSON.parse(fs.readFileSync(filePath, "utf-8"))
          : [];
        existing.push({
          name: name.trim(),
          email: email.trim(),
          project: project || "—",
          message: message.trim(),
          date: new Date().toISOString(),
          ip,
        });
        fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));
        return NextResponse.json({ ok: true });
      }

      /* Production without key */
      return NextResponse.json({
        ok: true,
        fallback: true,
        message:
          "Thank you — please contact us directly at daniela@danielacioara.com",
      });
    }

    /* ── Send via Resend ──────────────────────────────────────────────── */
    const html = `
      <p><strong>From:</strong> ${name.trim()} &lt;${email.trim()}&gt;</p>
      <p><strong>Project type:</strong> ${project || "—"}</p>
      <hr />
      <p>${message.trim().replace(/\n/g, "<br>")}</p>
    `;

    const adminRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "website@danielacioara.com",
        to: ["daniela@danielacioara.com"],
        subject: `New inquiry from ${name.trim()} — ${project || "Website"}`,
        html,
        reply_to: email.trim(),
      }),
    });

    if (!adminRes.ok) {
      const err = await adminRes.text();
      console.error("Resend error:", err);
      return NextResponse.json({ error: "Email failed" }, { status: 500 });
    }

    // Confirmation to sender
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "daniela@danielacioara.com",
        to: [email.trim()],
        subject: "Thank you for reaching out — Daniela Cioara",
        html: `
          <p>Dear ${name.trim()},</p>
          <p>Thank you for your inquiry. I have received your message and will be in touch shortly.</p>
          <p>Warmly,<br>Daniela Cioara</p>
        `,
      }),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
