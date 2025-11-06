"use client";

import { certificates, formalEducation } from "@/data/education";
import { getIcon, iconMap } from "@/utils/iconMap";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

/** Fallbacks de color por tema si no vienen en el dato */
const THEME_COLORS: Record<string, string> = {
  React: "#61DAFB",
  Docker: "#2496ED",
  Git: "#F05032",
  Java: "#E76F00",
  Linux: "#3B82F6",
  Kubernetes: "#326CE5",
};

type PdfViewerState = { url: string; title: string } | null;

export default function EducationTab() {
  const [pdfViewer, setPdfViewer] = useState<PdfViewerState>(null);

  const closePdf = useCallback(() => setPdfViewer(null), []);
  const onKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") closePdf();
  }, [closePdf]);

  useEffect(() => {
    if (pdfViewer) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pdfViewer, onKey]);

  // ...imports iguales


  // dentro del componente:
  const handleCredentialClick = (title: string, url?: string) => {
    if (!url) return;
    const isPdf = /\.pdf($|\?)/i.test(url);

    // Construimos URL absoluta para evitar problemas en rutas anidadas o basePath
    const absUrl = /^https?:\/\//i.test(url) ? url : `${window.location.origin}${url}`;

    if (isPdf) {
      setPdfViewer({ url: absUrl, title });
    } else {
      window.open(absUrl, "_blank", "noopener,noreferrer");
    }
  };


  return (
    <section
      id="education"
      className="relative w-full flex flex-col items-center justify-center py-16 bg-[var(--color-bg-page)]"
    >
      <div className="w-full max-w-6xl px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {/* ─────────── Columna Izquierda: Educación Oficial ─────────── */}
          <div className="flex flex-col gap-6">
            <div className="sticky top-[80px] z-20 -mt-4 pt-4 pb-3 bg-[var(--color-bg-page)]/90 backdrop-blur border-b border-[var(--color-border)]">
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)]">
                Educación <span className="text-[var(--color-accent)]">Oficial</span>
              </h2>
              <p className="mt-1 text-[var(--color-text-secondary)] text-sm">
                Estudios formales y títulos obtenidos.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {formalEducation.map((edu, i) => {
                const Icon = (edu.icon && iconMap[edu.icon]) || getIcon(edu.title.split(" ")[0]);
                const color = edu.color ?? THEME_COLORS[edu.title] ?? "var(--color-accent)";

                return (
                  <motion.article
                    key={`${edu.title}-${i}`}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.05 }}
                    whileHover={{ y: -2, boxShadow: `0 0 18px ${color}` }}
                    className={[
                      "relative bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-2xl p-6 shadow-sm",
                      "transition-all duration-300 ",
                      "before:absolute before:left-0 before:top-0 before:h-full before:w-1.5 before:rounded-l-2xl",
                    ].join(" ")}
                    style={{ ["--bar-color" as any]: color }}
                  >
                    <style jsx>{`article::before { background: var(--bar-color); }`}</style>

                    <div className="flex items-center gap-3 mb-2">
                      {Icon && <Icon className="text-2xl" style={{ color }} />}
                      <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                        {edu.title}
                      </h3>
                    </div>
                    <p className="text-[var(--color-text-secondary)] mb-1 font-medium">
                      {edu.center}
                    </p>
                    <p className="text-sm text-[var(--color-accent)] italic mb-3">
                      {edu.date}
                    </p>
                    {edu.description && (
                      <p className="text-[var(--color-text-secondary)] leading-relaxed">
                        {edu.description}
                      </p>
                    )}
                  </motion.article>
                );
              })}
            </div>
          </div>

          {/* ─────────── Columna Derecha: Certificados y Cursos ─────────── */}
          <div className="flex flex-col gap-6">
            <div className="sticky top-[80px] z-20 -mt-4 pt-4 pb-3 bg-[var(--color-bg-page)]/90 backdrop-blur border-b border-[var(--color-border)]">
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)]">
                Certificados <span className="text-[var(--color-accent)]">&amp; Cursos</span>
              </h2>
              <p className="mt-1 text-[var(--color-text-secondary)] text-sm">
                Formación adicional y especializaciones.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {certificates.map((cert, i) => {
                const Icon = (cert.icon && iconMap[cert.icon]) || getIcon(cert.title.split(" ")[0]);
                const color = cert.color ?? THEME_COLORS[cert.title] ?? "var(--color-accent)";
                const url = cert.url || "";
                const isDisabled = !url;

                return (
                  <motion.article
                    key={`${cert.title}-${i}`}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.04, ease: "easeOut" }}
                    whileHover={{ scale: 1.03, boxShadow: `0 0 18px ${color}` }}
                    className={[
                      "relative bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-2xl p-6 shadow-sm",
                      "flex flex-col items-center text-center transition-all duration-300",
                      "w-full min-h-[200px] sm:min-h-[220px] lg:min-h-[220px] justify-between",
                      "before:absolute before:left-0 before:top-0 before:h-full before:w-1.5 before:rounded-l-2xl",
                    ].join(" ")}
                    style={{ ["--bar-color" as any]: color }}
                  >
                    <style jsx>{`article::before { background: var(--bar-color); }`}</style>

                    <div className="flex flex-col items-center">
                      {Icon && (
                        <Icon className="text-4xl mb-3 transition-transform duration-300" style={{ color }} />
                      )}
                      <h3 className="text-base md:text-lg font-semibold text-[var(--color-text-primary)] mb-1">
                        {cert.title}
                      </h3>
                      <p className="text-[var(--color-text-secondary)] text-sm mb-1">
                        {cert.provider}
                      </p>
                      {cert.date && (
                        <p className="text-[var(--color-text-secondary)] text-sm italic mb-3">
                          {cert.date}
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      disabled={isDisabled}
                      onClick={() => handleCredentialClick(cert.title, url)}
                      className={`inline-flex items-center gap-2 rounded-xl px-3 py-1.5 border text-sm font-medium transition-colors mt-2
                        ${isDisabled
                          ? "border-[var(--color-border)] text-[var(--color-text-secondary)] opacity-60 cursor-not-allowed"
                          : "border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10"
                        }`}
                      aria-disabled={isDisabled}
                      aria-label={isDisabled ? "Credencial no disponible" : `Ver credencial de ${cert.title}`}
                    >
                      Ver credencial
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path d="M13.5 4.5a.75.75 0 0 0 0 1.5h4.19l-8.72 8.72a.75.75 0 1 0 1.06 1.06l8.72-8.72V11a.75.75 0 0 0 1.5 0V4.5h-6.75Z" />
                        <path d="M5.25 6A2.25 2.25 0 0 0 3 8.25v9A2.25 2.25 0 0 0 5.25 19.5h9a.75.75 0 0 0 2.25-2.25V12a.75.75 0 0 0-1.5 0v5.25a.75.75 0 0 1-.75.75h-9a.75.75 0 0 1-.75-.75v-9a.75.75 0 0 1 .75-.75H11a.75.75 0 0 0 0-1.5H5.25Z" />
                      </svg>
                    </button>
                  </motion.article>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>

      {/* === Modal visor PDF === */}
      <AnimatePresence>
        {pdfViewer && (
          <motion.div
            key="pdf-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closePdf}
          >
            <motion.div
              initial={{ scale: 0.98, y: 10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.98, y: 10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-5xl bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-2xl shadow-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={`Credencial: ${pdfViewer.title}`}
            >
              <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--color-border)]">
                <h4 className="text-sm md:text-base font-semibold text-[var(--color-text-primary)] line-clamp-1">
                  {pdfViewer.title}
                </h4>
                <div className="flex items-center gap-2">
                  <a
                    href={pdfViewer.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm px-3 py-1.5 rounded-lg border border-[var(--color-border)] hover:border-[var(--color-accent)] text-[var(--color-text-secondary)]"
                  >
                    Abrir en pestaña nueva
                  </a>
                  <button
                    onClick={closePdf}
                    className="w-8 h-8 inline-flex items-center justify-center rounded-lg hover:bg-white/5 text-[var(--color-text-secondary)]"
                    aria-label="Cerrar"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="w-full h-[75vh]">
                {/* visor PDF con fallback */}
                <object
                  data={pdfViewer.url}
                  type="application/pdf"
                  className="w-full h-full"
                  aria-label={`PDF: ${pdfViewer.title}`}
                >
                  <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-6 text-center">
                    <p className="text-[var(--color-text-secondary)]">
                      No se pudo mostrar el PDF en el navegador.
                    </p>
                    <a
                      href={pdfViewer.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5 border text-sm font-medium border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10"
                    >
                      Abrir / Descargar PDF
                    </a>
                  </div>
                </object>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
