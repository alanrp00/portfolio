"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import ProjectModal from "../modals/ProjectModal";

export default function ProjectsTab() {
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const projects = [
    {
      title: "Palabro",
      description: "Juego tipo Wordle con partidas infinitas desarrollado en Kotlin.",
      tech: ["Kotlin", "Jetpack Compose", "MVVM"],
      link: "https://github.com/alanrp00/Palabro/releases/tag/v1.0.0",
      images: [
        "/projects/palabro-1.png",
        "/projects/palabro-2.png",
      ],
      details: {
        overview:
          "Palabro es un juego inspirado en Wordle, creado en Kotlin usando Jetpack Compose. Permite partidas infinitas y guarda estadísticas localmente.",
        features: [
          "Diseño moderno con Jetpack Compose",
          "Navegación fluida con Navigation Compose",
          "Almacenamiento con Jetpack DataStore",
          "Arquitectura MVVM limpia y mantenible",
        ],
      },
    },
    {
      title: "Portfolio Personal",
      description:
        "Sitio web profesional con modo claro/oscuro y animaciones modernas.",
      tech: ["Next.js", "Tailwind", "Framer Motion"],
      link: "https://github.com/alanrp00/portfolio",
      images: [
        // Imágenes del proyecto Portfolio Personal
      ],
      details: {
        overview:
          "Portfolio minimalista y totalmente responsive, con animaciones suaves y soporte completo de tema claro/oscuro.",
        features: [
          "Diseño responsivo adaptable",
          "Modo oscuro/claro instantáneo",
          "Animaciones con Framer Motion",
          "Organización modular con componentes reutilizables",
        ],
      },
    },
  ];

  return (
    <>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <motion.div
            key={i}
            whileHover={{
              scale: 1.03,
              y: -3,
              boxShadow: "0 8px 24px rgba(71,132,245,0.15)",
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 18,
            }}
            className="group cursor-pointer rounded-2xl border border-[var(--color-border)] bg-[var(--color-card-bg)] hover:border-[var(--color-accent)]/70 p-6 transition-all duration-300"
            onClick={() => setSelectedProject(p)}
          >
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-accent)] transition-colors">
              {p.title}
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4">
              {p.description}
            </p>
            <div className="flex flex-wrap gap-2 text-xs text-[var(--color-accent)]">
              {p.tech.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 rounded-md bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}
