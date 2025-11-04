// frontend/src/components/contact/ContactModal.tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  toEmail?: string; // correo de destino visible/fallback
};

const API_BASE =
  (process.env.NEXT_PUBLIC_API_BASE as string | undefined) ||
  "http://localhost:4000/api";

export default function ContactModal({ open, onClose, toEmail }: Props) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");

  // Cerrar con ESC, click fuera y bloquear scroll
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const onClickOutside = (e: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClickOutside);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClickOutside);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  const validate = () => {
    if (!name.trim()) return "El nombre es obligatorio.";
    if (!from.trim()) return "El email es obligatorio.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(from)) return "Introduce un email válido.";
    if (!message.trim()) return "El mensaje no puede estar vacío.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOk(null);
    setErr(null);

    const v = validate();
    if (v) {
      setErr(v);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, from, message }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "No se pudo enviar el mensaje.");
      }

      setOk("¡Mensaje enviado! Te responderé cuanto antes.");
      setName("");
      setFrom("");
      setMessage("");

      // Cierre suave tras confirmar
      setTimeout(() => {
        setOk(null);
        onClose();
      }, 1400);
    } catch (error) {
      // Fallback a mailto si la API falla o no está disponible
      const subject = encodeURIComponent(`Contacto desde el portfolio — ${name}`);
      const body = encodeURIComponent(`De: ${name} <${from}>\n\n${message}`);
      window.location.href = `mailto:${toEmail ?? "tu-email@dominio.com"}?subject=${subject}&body=${body}`;
      setOk("Abriendo tu cliente de correo…");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-modal="true"
          role="dialog"
          aria-labelledby="contact-title"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

          {/* Card */}
          <motion.div
            ref={dialogRef}
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-lg rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] shadow-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border)]">
              <h2 id="contact-title" className="text-base font-semibold text-[var(--color-text-primary)]">
                Enviar un mensaje
              </h2>
              <button
                onClick={onClose}
                aria-label="Cerrar"
                className="p-2 rounded-lg hover:bg-[var(--color-button-bg)]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <form onSubmit={handleSubmit} className="px-5 py-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="text-left text-sm">
                  <span className="block mb-1 text-[var(--color-text-secondary)]">Nombre</span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 outline-none focus:border-[var(--accent)]"
                    required
                  />
                </label>
                <label className="text-left text-sm">
                  <span className="block mb-1 text-[var(--color-text-secondary)]">Tu email</span>
                  <input
                    type="email"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 outline-none focus:border-[var(--accent)]"
                    required
                  />
                </label>
              </div>

              <label className="text-left text-sm block">
                <span className="block mb-1 text-[var(--color-text-secondary)]">Mensaje</span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 outline-none focus:border-[var(--accent)]"
                  required
                />
              </label>

              {err && <p className="text-sm text-red-500">{err}</p>}
              {ok && <p className="text-sm text-green-600">{ok}</p>}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl border border-[var(--color-border)] hover:border-[var(--accent)]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 rounded-xl border border-[var(--accent)] bg-[var(--color-button-bg)] text-[var(--color-text-primary)] hover:opacity-90 disabled:opacity-60"
                >
                  {loading ? "Enviando…" : "Enviar"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
