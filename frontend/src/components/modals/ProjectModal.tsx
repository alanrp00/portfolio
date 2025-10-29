"use client";

import { getIcon } from "@/utils/iconMap";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaGithub } from "react-icons/fa";

type Tech = string | { name: string; icon?: string; color?: string };

interface ProjectModalProps {
  project: {
    title: string;
    description: string;
    images?: string[];
    tech: Tech[];
    repo?: string;
    features?: string[];
  };
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextImage = () => {
    if (!project.images || project.images.length === 0) return;
    setDirection(1);
    setCurrentImage((prev) => (prev + 1) % project.images!.length);
  };

  const prevImage = () => {
    if (!project.images || project.images.length === 0) return;
    setDirection(-1);
    setCurrentImage((prev) =>
      prev === 0 ? project.images!.length - 1 : prev - 1
    );
  };

  return (
    <AnimatePresence>
      {/* 🔹 Overlay: sigue siendo translúcido */}
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* 🔸 Contenedor del modal: fondo sólido como las tarjetas */}
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="relative text-[var(--color-text-primary)] p-8 rounded-2xl max-w-4xl w-full shadow-2xl border border-[var(--color-border)] overflow-y-auto max-h-[90vh]"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 15 }}
          style={{
            backgroundColor: 'rgb(18, 18, 18)', // 🔹 Color sólido real
            boxShadow: '0 0 30px rgba(0,0,0,0.5)', // 🔹 Profundidad elegante
          }}
        >




          {/* Cerrar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition"
          >
            ✕
          </button>

          {/* Carrusel con soporte de gestos */}
          {project.images && project.images.length > 0 && (
            <div className="mb-6 relative flex justify-center items-center overflow-hidden rounded-xl bg-[var(--color-bg-page)]/30">
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.img
                  key={project.images[currentImage]}
                  src={project.images[currentImage]}
                  alt={project.title}
                  className="rounded-xl max-h-[420px] w-auto max-w-full object-contain cursor-grab active:cursor-grabbing"
                  initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                  transition={{ duration: 0.4 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_, info) => {
                    if (info.offset.x > 50) prevImage();
                    if (info.offset.x < -50) nextImage();
                  }}
                />
              </AnimatePresence>

              {/* Botones */}
              {project.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-[var(--color-bg-card)]/80 hover:bg-[var(--color-accent)] text-[var(--color-text-primary)] hover:text-white p-2 rounded-full shadow-md transition"
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-[var(--color-bg-card)]/80 hover:bg-[var(--color-accent)] text-[var(--color-text-primary)] hover:text-white p-2 rounded-full shadow-md transition"
                  >
                    <FaChevronRight />
                  </button>

                  {/* Indicadores */}
                  <div className="absolute bottom-3 flex justify-center w-full gap-2">
                    {project.images.map((_, i) => (
                      <div
                        key={i}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${i === currentImage
                          ? "bg-[var(--color-accent)] scale-110"
                          : "bg-gray-500/40"
                          }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Título */}
          <h2 className="text-2xl font-semibold mb-4 text-[var(--color-accent)] text-center">
            {project.title}
          </h2>

          {/* Descripción */}
          <p className="text-[var(--color-text-secondary)] mb-6 leading-relaxed text-center">
            {project.description}
          </p>

          {/* Tecnologías */}
          {project.tech && project.tech.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
                Tecnologías
              </h3>
              <div className="flex flex-wrap gap-2 px-1 md:px-2">
                {project.tech.map((t: Tech, i: number) => {
                  const techName = typeof t === "string" ? t : t.name;
                  const techIcon = typeof t === "string" ? undefined : t.icon;
                  const techColor =
                    typeof t === "string"
                      ? "var(--color-accent)"
                      : t.color || "var(--color-accent)";
                  const Icon = getIcon(techIcon || "");

                  return (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-2 px-3 py-1 text-sm border border-[var(--color-accent)]/40 rounded-md text-[var(--color-accent)] bg-[var(--color-accent)]/10"
                    >
                      {techIcon && (
                        <Icon className="text-base" style={{ color: techColor }} />
                      )}
                      {techName}
                    </motion.span>
                  );
                })}
              </div>
            </div>
          )}

          {/* Características */}
          {project.features && project.features.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
                Características clave
              </h3>
              <ul className="list-disc pl-6 text-[var(--color-text-secondary)] space-y-2">
                {project.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Botón de GitHub */}
          {project.repo && (
            <div className="mt-8 flex justify-center">
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white transition shadow-md"
              >
                <FaGithub className="text-lg" /> Ver en GitHub
              </a>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
