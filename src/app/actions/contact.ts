"use server";

import { Resend } from "resend";
import { siteConfig } from "@/lib/site";

export type SendContactResult =
  | { ok: true }
  | { ok: false; error: "validation" | "config" | "send" };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContactMessage(
  formData: FormData,
): Promise<SendContactResult> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message || !emailPattern.test(email)) {
    return { ok: false, error: "validation" };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { ok: false, error: "config" };
  }

  const to = process.env.CONTACT_TO_EMAIL ?? siteConfig.email;
  const from =
    process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: email,
    subject: `Contact from ${name}`,
    text: [`Name: ${name}`, `Email: ${email}`, "", message].join("\n"),
  });

  if (error) {
    console.error("[contact] Resend error:", error);
    return { ok: false, error: "send" };
  }

  return { ok: true };
}
