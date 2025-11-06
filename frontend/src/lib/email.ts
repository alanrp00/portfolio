import nodemailer from "nodemailer";
import "server-only";

export function createTransport() {
  const host = process.env.SMTP_HOST!;
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = String(process.env.SMTP_SECURE || "false") === "true";
  const user = process.env.SMTP_USER!;
  const pass = process.env.SMTP_PASS!;

  if (!host || !user || !pass) {
    throw new Error("Missing SMTP env vars");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure, // true => 465 | false => STARTTLS en 587
    auth: { user, pass },
  });
}
