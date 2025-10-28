"use client";

import { Project } from "@/data/projects";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type ProjectModalProps = {
  project: Project;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [index, setIndex] = useState(0);
  const { getSkillsByProject } = usePortfolioData();

  // 🔗 Determinar el conjunto de skills del proyecto (portfolio o palabro)
  const projectKey =
    project.title.toLowerCase().includes("palabro") ? "palabro" : "portfolio";
  const relatedSkills = getSkillsByProject(projectKey);

  useEffect(() => {
    const timer = requestAnimationFrame(() => setIsMounted(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  if (!isMounted) return null;

  const handleNext = () => {
    if (project.images?.length) {
      setIndex((prev) => (prev + 1) % (project.images?.length ?? 1));
    }
  };

  const handlePrev = () => {
    if (project.images?.length) {
      setIndex((prev) => (prev - 1 + (project.images?.length ?? 1)) % (project.images?.length ?? 1));
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 sm:px-6 md:px-10"
      >
        {/* Fondo clicable */}
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
          onClick={onClose}
        ></motion.div>

        {/* Contenedor principal */}
        <motion.div
          key="modal-content"
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-[var(--color-card-bg)] rounded-2xl shadow-xl border border-[var(--color-border)]"
          style={{ overflowAnchor: "none", scrollbarWidth: "none" }}
        >
          {/* Botón cerrar */}
          <motion.button
            onClick={onClose}
            className="absolute top-4 right-4 text-[var(--color-text-secondary)]"
            whileHover={{ rotate: 90, scale: 1.2, color: "var(--color-accent)" }}
            transition={{ type: "spring", stiffness: 400, damping: 12 }}
          >
            <XMarkIcon className="w-6 h-6" />
          </motion.button>

          {/* Título */}
          <div className="pt-8 text-center">
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">{project.title}</h2>
          </div>

          {/* Carrusel */}
          <div className="relative w-full mt-6 flex justify-center items-center px-6">
            <button
              onClick={handlePrev}
              className="absolute left-6 p-2 rounded-full bg-[var(--color-bg-button)] hover:bg-[var(--color-accent)]/20 transition-colors"
            >
              <ChevronLeftIcon className="w-5 h-5 text-[var(--color-text-primary)]" />
            </button>

            {project.images && project.images.length > 0 ? (
              <motion.img
                key={index}
                src={project.images[index]}
                alt={project.title}
                className="rounded-lg w-full max-h-[350px] object-contain bg-[var(--color-card-bg)]"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            ) : (
              <div className="text-[var(--color-text-secondary)] py-20">
                No hay imágenes disponibles
              </div>
            )}

            <button
              onClick={handleNext}
              className="absolute right-6 p-2 rounded-full bg-[var(--color-bg-button)] hover:bg-[var(--color-accent)]/20 transition-colors"
            >
              <ChevronRightIcon className="w-5 h-5 text-[var(--color-text-primary)]" />
            </button>
          </div>

          {/* Indicadores */}
          {project.images && project.images.length > 1 && (
            <div className="flex justify-center gap-2 mt-3 mb-2">
              {project.images.map((_: string, i: number) => (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${i === index
                    ? "bg-[var(--color-accent)]"
                    : "bg-[var(--color-text-secondary)]/40"
                    }`}
                />
              ))}
            </div>
          )}

          {/* Contenido detallado */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full max-w-5xl mx-auto mt-6 px-6 md:px-10 pb-10 overflow-x-hidden will-change-transform"
          >
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ delay: 0.15, duration: 0.4, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-[65%_35%] gap-10 items-start"
            >
              {/* Columna izquierda */}
              <div className="text-left">
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3">
                  Project Description
                </h3>
                <p className="text-[var(--color-text-secondary)] leading-relaxed mb-8">
                  {project.details?.overview}
                </p>

                {project.details?.features && (
                  <>
                    <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3">
                      Key Features
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-[var(--color-text-secondary)]">
                      {project.details.features.map((f: string, idx: number) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ delay: 0.2 + idx * 0.05, duration: 0.3 }}
                        >
                          {f}
                        </motion.li>
                      ))}
                    </ul>
                  </>
                )}
              </div>

              {/* Columna derecha */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: 0.25, duration: 0.4, ease: "easeOut" }}
                className="flex flex-col gap-8 text-left"
              >
                {/* Tecnologías */}
                <div>
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2 px-1 md:px-2">
                    {project.tech?.map((t: string, i: number) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ delay: 0.3 + i * 0.05, duration: 0.3 }}
                        className="px-3 py-1 text-sm rounded-md border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>

                </div>

                {/* 💡 Skills relacionadas (usePortfolioData) */}
                {relatedSkills.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3">
                      Related Skills
                    </h3>
                    <div className="flex flex-wrap gap-2 px-1 md:px-2">
                      {relatedSkills.map((skill, i) => (
                        <motion.span
                          key={i}
                          whileHover={{
                            scale: 1.1,
                            boxShadow: "0 0 10px var(--color-accent)",
                          }}
                          transition={{ type: "spring", stiffness: 300, damping: 15 }}
                          className="px-3 py-1 text-sm rounded-md border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                        >
                          {skill.name}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Enlace a GitHub */}
                {project.link && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: 0.45, duration: 0.3 }}
                  >
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
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
