"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  /** email de fallback para mailto si la API falla */
  toEmail?: string;
};

export default function ContactModal({ open, onClose, toEmail }: Props) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");

  // Cerrar con ESC / click fuera + bloquear scroll
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && handleCancel();
    const onClickOutside = (e: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) handleCancel();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const resetForm = () => {
    setName("");
    setFrom("");
    setMessage("");
    setErr(null);
  };

  const handleCancel = () => {
    resetForm();
    setSuccess(false);
    setLoading(false);
    onClose();
  };

  const validate = () => {
    if (!name.trim()) return "El nombre es obligatorio.";
    if (!from.trim()) return "El email es obligatorio.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(from)) return "Introduce un email válido.";
    if (!message.trim()) return "El mensaje no puede estar vacío.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    const v = validate();
    if (v) return setErr(v);

    setLoading(true);
    try {
      // 👉 Llamamos a la API Route de Next.js (serverless en Vercel)
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // El backend espera "email" (no "from")
        body: JSON.stringify({ name, email: from, message }),
      });

      const data = await res.json().catch(() => ({} as any));
      if (!res.ok || data?.ok === false) {
        const errorMsg =
          data?.error ||
          (data?.issues && "Datos inválidos. Revisa los campos.") ||
          "No se pudo enviar el mensaje.";
        throw new Error(errorMsg);
      }

      setSuccess(true);
      setLoading(false);
      setTimeout(() => {
        handleCancel();
      }, 1200);
    } catch (_error) {
      // Fallback mailto si la API falla (sin interrumpir UX)
      try {
        const subject = encodeURIComponent(`Contacto desde el portfolio — ${name}`);
        const body = encodeURIComponent(`De: ${name} <${from}>\n\n${message}`);
        window.location.href = `mailto:${toEmail ?? "tu-email@dominio.com"}?subject=${subject}&body=${body}`;
      } finally {
        setSuccess(true);
        setLoading(false);
        setTimeout(() => {
          handleCancel();
        }, 1200);
      }
    }
  };

  const sending = loading;
  const sent = success;

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
          {/* Backdrop ligado a tema */}
          <div
            className="absolute inset-0 backdrop-blur-[2px] transition-colors"
            style={{
              background: "color-mix(in oklab, var(--color-bg) 60%, black 40%)",
            }}
          />
          <div className="absolute inset-0 bg-black/30 md:bg-black/25 pointer-events-none" />

          {/* Card */}
          <motion.div
            ref={dialogRef}
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-lg rounded-2xl border bg-[var(--color-card-bg)] border-[var(--color-border)] shadow-xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border)]">
              <h2 id="contact-title" className="text-base font-semibold text-[var(--color-text-primary)]">
                Enviar un mensaje
              </h2>
              <button
                onClick={handleCancel}
                aria-label="Cerrar"
                disabled={sending}
                className="p-2 rounded-lg border border-transparent hover:border-[var(--color-border)] hover:bg-[var(--color-button-bg)] disabled:opacity-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="px-5 py-4">
              {/* Éxito */}
              <AnimatePresence mode="wait">
                {sent && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center justify-center py-8"
                    aria-live="polite"
                  >
                    <motion.svg
                      width="60" height="60" viewBox="0 0 24 24"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="mb-3 text-[var(--color-accent)]"
                    >
                      <motion.circle
                        cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"
                        initial={{ pathLength: 0, opacity: 0.6 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 0.4 }}
                      />
                      <motion.path
                        d="M7 13l3 3 7-7"
                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 0.25, duration: 0.35 }}
                      />
                    </motion.svg>
                    <p className="text-sm text-[var(--color-text-primary)]">¡Mensaje enviado!</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Formulario */}
              {!sent && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="text-left text-sm">
                      <span className="block mb-1 text-[var(--color-text-secondary)]">Nombre</span>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full h-10 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-3 text-[var(--color-text-primary)] outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                        disabled={sending}
                        required
                      />
                    </label>
                    <label className="text-left text-sm">
                      <span className="block mb-1 text-[var(--color-text-secondary)]">Tu email</span>
                      <input
                        type="email"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        className="w-full h-10 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-3 text-[var(--color-text-primary)] outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                        disabled={sending}
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
                      className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-[var(--color-text-primary)] outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                      disabled={sending}
                      required
                    />
                  </label>

                  {err && <p className="text-sm text-red-500">{err}</p>}

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-4 h-10 rounded-xl border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:bg-[var(--color-button-bg)] disabled:opacity-60"
                      disabled={sending}
                    >
                      Cancelar
                    </button>

                    <motion.button
                      type="submit"
                      disabled={sending}
                      whileTap={{ scale: 0.98 }}
                      className="px-5 h-10 rounded-xl text-white disabled:opacity-70"
                      style={{
                        background: "var(--color-accent)",
                        boxShadow: "0 6px 18px -8px color-mix(in oklab, var(--color-accent) 80%, black)",
                      }}
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        {sending ? (
                          <motion.span
                            key="sending"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            className="inline-flex items-center gap-2"
                          >
                            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/80 border-t-transparent" />
                            Enviando…
                          </motion.span>
                        ) : (
                          <motion.span
                            key="send"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                          >
                            Enviar
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </div>
                </form>
              )}

              {/* Botón inerte cuando success=true */}
              {sent && (
                <div className="flex items-center justify-end pt-2">
                  <motion.button
                    type="button"
                    disabled
                    className="px-5 h-10 rounded-xl text-white opacity-90"
                    style={{
                      background: "var(--color-accent)",
                      boxShadow: "0 6px 18px -8px color-mix(in oklab, var(--color-accent) 80%, black)",
                    }}
                    initial={{ scale: 0.98, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key="sent"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="inline-flex items-center gap-2"
                      >
                        <CheckIcon className="h-5 w-5" />
                        Enviado ✅
                      </motion.span>
                    </AnimatePresence>
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M20 6 9 17l-5-5" />
    </svg>
  );
}
