"use client";

import { certificates, formalEducation } from "@/data/education";
import { getIcon } from "@/utils/iconMap";
import { motion } from "framer-motion";

export default function EducationTab() {
  return (
    <section className="relative w-full flex flex-col items-center justify-center py-16 bg-[var(--color-bg-page)]">
      <div className="w-full max-w-6xl px-6 md:px-10">
        {/* Grid 2 columnas (1 en móvil) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {/* ─────────── Columna Izquierda: Educación Oficial ─────────── */}
          <div className="flex flex-col gap-6">
            {/* Header sticky de la columna */}
            <div className="sticky top-[80px] z-20 -mt-4 pt-4 pb-3 bg-[var(--color-bg-page)]/90 backdrop-blur border-b border-[var(--color-border)]">
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)]">
                Educación <span className="text-[var(--color-accent)]">Oficial</span>
              </h2>
              <p className="mt-1 text-[var(--color-text-secondary)] text-sm">
                Estudios formales y títulos obtenidos.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {formalEducation.map((edu, index) => (
                <motion.article
                  key={`${edu.title}-${index}`}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.05 }}
                  whileHover={{ y: -2, boxShadow: "0 0 18px var(--color-accent)" }}
                  className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-2xl p-6 shadow-sm transition-all duration-300 hover:border-[var(--color-accent)]"
                >
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-1">
                    {edu.title}
                  </h3>
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
              ))}
            </div>
          </div>

          {/* ─────────── Columna Derecha: Certificados y Cursos ─────────── */}
          <div className="flex flex-col gap-6">
            {/* Header sticky de la columna */}
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
                const Icon = getIcon(cert.icon);
                const url = (cert as any).url as string | undefined;
                const isDisabled = !url;

                return (
                  <motion.article
                    key={`${cert.title}-${i}`}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.04, ease: "easeOut" }}
                    whileHover={{ scale: 1.03, boxShadow: `0 0 18px ${cert.color}` }}
                    className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-2xl p-6 shadow-sm flex flex-col items-center text-center transition-all duration-300 hover:border-[var(--color-accent)] w-full min-h-[200px] sm:min-h-[220px] lg:min-h-[220px] justify-between"
                  >
                    <div className="flex flex-col items-center">
                      {Icon && (
                        <Icon
                          className="text-4xl mb-3 transition-transform duration-300"
                          style={{ color: cert.color }}
                        />
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

                    {/* Botón Ver credencial */}
                    <a
                      href={url || "#"}
                      target={isDisabled ? "_self" : "_blank"}
                      rel="noreferrer"
                      aria-disabled={isDisabled}
                      className={`inline-flex items-center gap-2 rounded-xl px-3 py-1.5 border text-sm font-medium transition-colors mt-2
                        ${isDisabled
                          ? "border-[var(--color-border)] text-[var(--color-text-secondary)] opacity-60 cursor-not-allowed"
                          : "border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10"
                        }`}
                      onClick={(e) => {
                        if (isDisabled) e.preventDefault();
                      }}
                    >
                      Ver credencial
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4"
                        aria-hidden="true"
                      >
                        <path d="M13.5 4.5a.75.75 0 0 0 0 1.5h4.19l-8.72 8.72a.75.75 0 1 0 1.06 1.06l8.72-8.72V11a.75.75 0 0 0 1.5 0V4.5h-6.75Z" />
                        <path d="M5.25 6A2.25 2.25 0 0 0 3 8.25v9A2.25 2.25 0 0 0 5.25 19.5h9a2.25 2.25 0 0 0 2.25-2.25V12a.75.75 0 0 0-1.5 0v5.25a.75.75 0 0 1-.75.75h-9a.75.75 0 0 1-.75-.75v-9a.75.75 0 0 1 .75-.75H11a.75.75 0 0 0 0-1.5H5.25Z" />
                      </svg>
                    </a>
                  </motion.article>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
