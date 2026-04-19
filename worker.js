export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/contact" && request.method === "POST") {
      return handleContact(request, env);
    }

    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response("Not found", { status: 404 });
  },
};

async function handleContact(request, env) {
  try {
    const contentType = request.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
      return json({ ok: false, error: "Expected JSON request body." }, 415);
    }

    const body = await request.json();
    const name = clean(body.name, 120);
    const email = clean(body.email, 160);
    const phone = clean(body.phone, 60);
    const message = clean(body.message, 5000);
    const website = clean(body.website, 200);

    if (website) {
      return json({ ok: true }, 200);
    }

    if (!name || !email || !message) {
      return json({ ok: false, error: "Please complete the required fields." }, 400);
    }

    if (!isValidEmail(email)) {
      return json({ ok: false, error: "Please enter a valid email address." }, 400);
    }

    if (!env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL || !env.CONTACT_FROM_EMAIL) {
      return json({ ok: false, error: "Server is not configured for email delivery yet." }, 500);
    }

    const subject = `LindsaySnyderSLP | New website inquiry from ${name}`;
    const submittedAt = new Date().toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "America/New_York",
    });

    const html = `
      <div style="font-family: Arial, sans-serif; background: #f6fafb; padding: 24px; color: #253036; line-height: 1.6;">
        <div style="max-width: 680px; margin: 0 auto; background: #ffffff; border: 1px solid #dde6ea; border-radius: 18px; overflow: hidden; box-shadow: 0 12px 32px rgba(18, 52, 63, 0.08);">
          <div style="padding: 20px 24px; background: linear-gradient(120deg, rgba(216, 238, 241, 0.95), rgba(255, 255, 255, 0.95)); border-bottom: 1px solid #dde6ea;">
            <div style="font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: #d88fa8; font-weight: 700;">LindsaySnyderSLP</div>
            <h2 style="margin: 8px 0 0; font-size: 24px; line-height: 1.3; color: #253036;">New website inquiry</h2>
          </div>
          <div style="padding: 24px;">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 0 0 10px; font-weight: 700; width: 120px; vertical-align: top;">Name</td>
                <td style="padding: 0 0 10px;">${escapeHtml(name)}</td>
              </tr>
              <tr>
                <td style="padding: 0 0 10px; font-weight: 700; width: 120px; vertical-align: top;">Email</td>
                <td style="padding: 0 0 10px;"><a href="mailto:${escapeHtml(email)}" style="color: #2a6f7b; text-decoration: none;">${escapeHtml(email)}</a></td>
              </tr>
              <tr>
                <td style="padding: 0 0 10px; font-weight: 700; width: 120px; vertical-align: top;">Phone</td>
                <td style="padding: 0 0 10px;">${escapeHtml(phone || "Not provided")}</td>
              </tr>
              <tr>
                <td style="padding: 0 0 10px; font-weight: 700; width: 120px; vertical-align: top;">Submitted</td>
                <td style="padding: 0 0 10px;">${escapeHtml(submittedAt)}</td>
              </tr>
            </table>

            <div style="margin-top: 20px; padding-top: 18px; border-top: 1px solid #dde6ea;">
              <div style="font-weight: 700; margin-bottom: 8px;">Message</div>
              <div style="white-space: pre-wrap; background: #f9fbfc; border: 1px solid #e5edf0; border-radius: 12px; padding: 14px 16px;">${escapeHtml(message)}</div>
            </div>
          </div>
        </div>
      </div>
    `;

    const text = [
      "LindsaySnyderSLP",
      "New website inquiry",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "Not provided"}`,
      `Submitted: ${submittedAt}`,
      "",
      "Message:",
      message,
    ].join("\n");

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `LindsaySnyderSLP <${env.CONTACT_FROM_EMAIL}>`,
        to: [env.CONTACT_TO_EMAIL],
        reply_to: email,
        subject,
        html,
        text,
      }),
    });

    if (!resendResponse.ok) {
      const details = await resendResponse.text();
      return json({ ok: false, error: "Email delivery failed.", details }, 502);
    }

    return json({ ok: true }, 200);
  } catch (error) {
    return json({ ok: false, error: "Unexpected server error.", details: String(error) }, 500);
  }
}

function clean(value, maxLength) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
