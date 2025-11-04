import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import nodemailer from "nodemailer";
import { connectDB } from "./config/db";

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

// ───────────────── Contacto
app.post("/api/contact", async (req, res) => {
  try {
    const { name, from, message } = req.body || {};

    // Validaciones mínimas
    if (!name || !from || !message) {
      return res.status(400).json({ error: "Faltan campos: name, from, message" });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(from)) {
      return res.status(400).json({ error: "Email no válido" });
    }

    // Configuración SMTP desde .env
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,                          // ej: smtp.gmail.com
      port: Number(process.env.SMTP_PORT ?? 465),
      secure: String(process.env.SMTP_SECURE ?? "true") === "true",
      auth: {
        user: process.env.SMTP_USER,                        // tu cuenta SMTP
        pass: process.env.SMTP_PASS,                        // contraseña o app password
      },
    });


    const to = process.env.CONTACT_TO || process.env.SMTP_USER;
    const subject = `Contacto desde el portfolio — ${name}`;

    const text = `De: ${name} <${from}>\n\n${message}`;
    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto;line-height:1.5">
        <h2>Nuevo mensaje desde el portfolio</h2>
        <p><strong>De:</strong> ${name} &lt;${from}&gt;</p>
        <p><strong>Mensaje:</strong></p>
        <p style="white-space:pre-wrap">${message}</p>
      </div>
    `;

    const info = await transporter.sendMail({
      from: `"Portfolio" <${process.env.SMTP_USER}>`,
      to,
      replyTo: from,
      subject,
      text,
      html,
    });

    return res.json({ ok: true, id: info.messageId });
  } catch (err) {
    console.error("CONTACT ERROR:", err);
    return res.status(500).json({ error: "No se pudo enviar el correo" });
  }
});

// ───────────────── DB + arranque
connectDB();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
