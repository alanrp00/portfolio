import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import nodemailer from "nodemailer";
import { connectDB } from "./config/db";
import ContactMessage from "./models/ContactMessage";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 4000;

// ───────────────── Middlewares
app.use(
  cors({
    origin: (process.env.FRONTEND_ORIGIN ?? "http://localhost:3000")
      .split(",")
      .map((s) => s.trim()),
  })
);
app.use(express.json());

// ───────────────── Rutas básicas
app.get("/", (_req, res) => res.send("API Portfolio running 🚀"));
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// ───────────────── Ruta contacto
app.post("/api/contact", async (req, res) => {
  try {
    const { name, from, message } = req.body || {};
    if (!name || !from || !message) {
      return res.status(400).json({ error: "Faltan campos: name, from, message" });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(from)) {
      return res.status(400).json({ error: "Email no válido" });
    }

    const port = Number(process.env.SMTP_PORT || 465);
    const secure = process.env.SMTP_SECURE
      ? String(process.env.SMTP_SECURE).toLowerCase() === "true"
      : port === 465;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      requireTLS: !secure,
      tls: { minVersion: "TLSv1.2" },
    });

    // Enviar email
    const to = process.env.SMTP_USER;
    const subject = `Contacto desde el portfolio — ${name}`;
    const text = `De: ${name} <${from}>\n\n${message}`;
    const html = `<div style="font-family:system-ui,-apple-system,Segoe UI,Roboto;line-height:1.5">
        <h2>Nuevo mensaje desde el portfolio</h2>
        <p><strong>De:</strong> ${name} &lt;${from}&gt;</p>
        <p><strong>Mensaje:</strong></p>
        <p style="white-space:pre-wrap">${message}</p>
      </div>`;

    const info = await transporter.sendMail({
      from: `"Portfolio" <${process.env.SMTP_USER}>`,
      to,
      replyTo: from,
      subject,
      text,
      html,
    });

    // Guardar en Mongo
    try {
      await ContactMessage.create({
        name,
        from,
        message,
        userAgent: req.headers["user-agent"],
        ip: (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress,
        delivered: true,
      });
    } catch (dbErr) {
      console.warn("DB save warning (contact message):", dbErr);
      // No rompemos la respuesta si solo falla el guardado
    }

    return res.json({ ok: true, id: info.messageId });
  } catch (err) {
    console.error("CONTACT ERROR:", err);
    // Guardado “fallido” para tener copia aunque no se envíe
    try {
      await ContactMessage.create({
        name: req.body?.name,
        from: req.body?.from,
        message: req.body?.message,
        userAgent: req.headers["user-agent"],
        ip: (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress,
        delivered: false,
      });
    } catch { }

    return res.status(500).json({ error: "No se pudo enviar el correo" });
  }
});


// ───────────────── DB + arranque
connectDB();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
