"use client";

import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function ProjectModal({ project, onClose }: any) {
  if (!project) return null; // ✅ Previene renders vacíos
  const images = project.images ?? []; // ✅ Asegura que siempre haya array

  const [index, setIndex] = useState(0);

  const nextImage = () => {
    if (images.length > 0) setIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    if (images.length > 0) setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-4xl bg-[var(--color-card-bg)] rounded-2xl border border-[var(--color-border)] p-8 overflow-y-auto max-h-[90vh]"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Cerrar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>

          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">
            {project.title}
          </h2>

          {/* Carrusel */}
          <div className="relative w-full h-[340px] bg-[var(--color-bg)] rounded-xl overflow-hidden mb-6">
            {images.length > 0 ? (
              <AnimatePresence mode="wait">
                <motion.img
                  key={images[index]}
                  src={images[index]}
                  alt={project.title}
                  className="w-full h-full object-contain"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[var(--color-text-secondary)]">
                <span>No hay imágenes disponibles</span>
              </div>
            )}

            {/* Flechas solo si hay imágenes */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-[var(--color-card-bg)]/80 border border-[var(--color-border)] p-2 rounded-full hover:bg-[var(--color-accent)]/20 transition"
                >
                  <ChevronLeftIcon className="w-5 h-5 text-[var(--color-text-primary)]" />
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-[var(--color-card-bg)]/80 border border-[var(--color-border)] p-2 rounded-full hover:bg-[var(--color-accent)]/20 transition"
                >
                  <ChevronRightIcon className="w-5 h-5 text-[var(--color-text-primary)]" />
                </button>

                {/* Indicadores */}
                <div className="absolute bottom-3 w-full flex justify-center gap-2">
                  {images.map((_: string, i: number) => (
                    <div
                      key={i}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${i === index
                        ? 'bg-[var(--color-accent)]'
                        : 'bg-[var(--color-text-secondary)]/40'
                        }`}
                    ></div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Contenido detallado */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {/* Columna izquierda */}
            <div>
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3">
                Project Description
              </h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                {project.details?.overview}
              </p>

              {project.details?.features && (
                <>
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3">
                    Key Features
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-[var(--color-text-secondary)]">
                    {project.details.features.map((f: string, idx: number) => (
                      <li key={idx}>{f}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            {/* Columna derecha */}
            <div className="flex flex-col gap-6">
              {/* Tecnologías */}
              <div>
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3">
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech?.map((t: string, i: number) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm rounded-md border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Enlace a GitHub */}
              {project.link && (
                <div>
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3">
                    Repository
                  </h3>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[var(--color-accent)] border border-[var(--color-accent)]/40 px-4 py-2 rounded-lg hover:bg-[var(--color-accent)]/10 transition-all duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.8}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 19c-4 1-4-2-6-2m12 2v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0018 3.77 5.07 5.07 0 0017.91 0S16.73-.35 14 2.12a13.38 13.38 0 00-5 0C6.27-.35 5.09 0 5.09 0A5.07 5.07 0 005 3.77 5.44 5.44 0 003.5 6.5c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 15.13V19z"
                      />
                    </svg>
                    <span className="font-medium">View on GitHub</span>
                  </a>
                </div>
              )}
            </div>
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
