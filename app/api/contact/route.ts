import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, project, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      console.error("RESEND_API_KEY not set");
      return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
    }

    const html = `
      <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
      <p><strong>Project type:</strong> ${project || "—"}</p>
      <hr />
      <p>${message.replace(/\n/g, "<br>")}</p>
    `;

    // Send to admin
    const adminRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "website@danielacioara.com",
        to: ["daniela@danielacioara.com"],
        subject: `New inquiry from ${name} — ${project || "Website"}`,
        html,
        reply_to: email,
      }),
    });

    if (!adminRes.ok) {
      const err = await adminRes.text();
      console.error("Resend error:", err);
      return NextResponse.json({ error: "Email failed" }, { status: 500 });
    }

    // Send confirmation to sender
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "daniela@danielacioara.com",
        to: [email],
        subject: "Thank you for reaching out — Daniela Cioara",
        html: `
          <p>Dear ${name},</p>
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
