import { NextResponse } from "next/server";
import { Resend } from "resend";
import { LEAD_PATHS, leadSchema } from "@/lib/lead-schema";
import { site } from "@/lib/site";

/**
 * Lead intake.
 *
 * The client asked for every enquiry to arrive by email rather than by phone, so
 * this route is the only conversion path on the site. It validates, screens for
 * bots, emails a formatted summary to the business, and sends the prospect an
 * immediate acknowledgement so the lead does not go cold waiting.
 */

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const LEAD_TO = process.env.LEAD_TO_EMAIL ?? site.email;
const LEAD_FROM = process.env.LEAD_FROM_EMAIL ?? "GCS Funding <onboarding@resend.dev>";

/**
 * Small in-memory throttle. Enough to stop a naive flood from one address; it
 * resets on redeploy, which is acceptable for a form at this volume.
 */
const hits = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

const LABELS: Record<string, string> = {
  industry: "Industry",
  averageTicket: "Average ticket",
  monthlyVolume: "Monthly card volume",
  annualRevenue: "Annual revenue",
  timeInBusiness: "Time in business",
  fundingAmount: "Funding amount sought",
  highRisk: "High-risk vertical",
};

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again shortly." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Please check the highlighted fields.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  const lead = parsed.data;

  // Honeypot filled means a bot. Return success so it does not learn otherwise.
  if (lead.company_website) {
    return NextResponse.json({ ok: true });
  }

  const pathLabel = LEAD_PATHS[lead.path].label;

  const qualifiers = Object.entries(LABELS)
    .map(([key, label]) => [label, (lead as Record<string, unknown>)[key]])
    .filter(([, value]) => Boolean(value)) as [string, string][];

  const rows = [
    ["Enquiry type", pathLabel],
    ["Name", lead.name],
    ["Business", lead.business],
    ["Email", lead.email],
    ...(lead.phone ? [["Phone", lead.phone]] : []),
    ...qualifiers,
  ];

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;color:#0b1220;max-width:640px">
      <p style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#67738c;margin:0 0 4px">
        New lead from gcsfunding.com
      </p>
      <h1 style="font-size:20px;margin:0 0 20px">${escapeHtml(lead.business)} &mdash; ${escapeHtml(pathLabel)}</h1>
      <table style="border-collapse:collapse;width:100%;font-size:14px">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding:9px 14px 9px 0;color:#67738c;white-space:nowrap;vertical-align:top;border-bottom:1px solid #eceef2">${escapeHtml(label)}</td>
            <td style="padding:9px 0;font-weight:600;border-bottom:1px solid #eceef2">${escapeHtml(String(value))}</td>
          </tr>`,
          )
          .join("")}
      </table>
      ${
        lead.message
          ? `<div style="margin-top:22px">
               <p style="font-size:12px;text-transform:uppercase;letter-spacing:.12em;color:#67738c;margin:0 0 6px">Message</p>
               <p style="font-size:14px;line-height:1.65;margin:0;white-space:pre-wrap">${escapeHtml(lead.message)}</p>
             </div>`
          : ""
      }
      <p style="margin-top:26px;font-size:12px;color:#8792a8">
        Submitted ${new Date().toLocaleString("en-US", { timeZone: "America/Chicago" })} CT
      </p>
    </div>`;

  if (!resend) {
    // Keeps local development usable before the API key is provisioned.
    console.warn("[lead] RESEND_API_KEY missing; logging lead instead.", rows);
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    await resend.emails.send({
      from: LEAD_FROM,
      to: LEAD_TO,
      replyTo: lead.email,
      subject: `New ${pathLabel.toLowerCase()} lead — ${lead.business}`,
      html,
    });

    await resend.emails.send({
      from: LEAD_FROM,
      to: lead.email,
      subject: "We received your request — GCS Funding",
      html: `
        <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;color:#0b1220;max-width:560px;line-height:1.65">
          <p>Hi ${escapeHtml(lead.name.split(" ")[0])},</p>
          <p>Thanks for reaching out to GCS Funding. Your request came through and we will get back to you within one business day.</p>
          <p>If it helps in the meantime, here is what you told us:</p>
          <blockquote style="margin:16px 0;padding:12px 18px;border-left:3px solid #72b62f;background:#f3fbe9">
            ${escapeHtml(pathLabel)}<br/>${escapeHtml(lead.business)}
          </blockquote>
          <p>Talk soon,<br/><strong>GCS Funding</strong><br/>
          <span style="color:#67738c;font-size:13px">A national direct funding source since 2003 &middot; Cypress, TX</span></p>
        </div>`,
    });
  } catch (error) {
    console.error("[lead] delivery failed", error);
    return NextResponse.json(
      { error: "We could not send that just now. Please email us directly." },
      { status: 502 },
    );
  }

  // Optional downstream hook so a CRM or spreadsheet can be added without a rebuild.
  if (process.env.LEAD_WEBHOOK_URL) {
    void fetch(process.env.LEAD_WEBHOOK_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...lead, submittedAt: new Date().toISOString() }),
    }).catch((error) => console.error("[lead] webhook failed", error));
  }

  return NextResponse.json({ ok: true, delivered: true });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
