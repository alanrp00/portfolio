import { getDb } from "@/lib/db";
import { createTransport } from "@/lib/email";
import { NextResponse } from "next/server";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(5).max(5000),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = ContactSchema.parse(body);

    // Guarda en Mongo (colección 'contacts')
    const db = await getDb();
    const savedAt = new Date();
    await db.collection("contacts").insertOne({ ...data, savedAt });

    // Envía mail
    const to = process.env.CONTACT_TO!;
    const transporter = createTransport();

    const html = `
      <h2>Nuevo mensaje de contacto</h2>
      <p><b>Nombre:</b> ${data.name}</p>
      <p><b>Email:</b> ${data.email}</p>
      <p><b>Fecha:</b> ${savedAt.toLocaleString()}</p>
      <hr/>
      <pre style="font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; white-space:pre-wrap; line-height:1.5;">
${data.message}
      </pre>
    `;

    await transporter.sendMail({
      from: `"Portfolio" <${process.env.SMTP_USER}>`,
      to,
      subject: `Contacto: ${data.name} <${data.email}>`,
      replyTo: data.email,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    // zod error
    if (err?.issues) {
      return NextResponse.json({ ok: false, error: "Invalid data", issues: err.issues }, { status: 400 });
    }
    console.error("CONTACT_API_ERROR:", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
