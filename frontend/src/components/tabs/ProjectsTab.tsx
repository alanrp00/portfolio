"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import ProjectModal from "../modals/ProjectModal";

type Project = {
  title: string;
  description: string;
  tech: string[];
  link?: string;
  images?: string[];
  details?: {
    overview?: string;
    features?: string[];
  };
};

const projects: Project[] = [
  {
    title: "Palabro",
    description: "Juego basado en Wordle, pero partidas infinitas.",
    tech: ["Kotlin", "Jetpack Compose", "Navigation Compose", "DataStore", "MVVM"],
    link: "https://github.com/alanrp00/Palabro",
    images: [
      "/projects/palabro-1.png",
      "/projects/palabro-2.png",
    ],
    details: {
      overview:
        "Palabro es un juego inspirado en Wordle, desarrollado en Kotlin utilizando Jetpack Compose. La aplicación cuenta con partidas infinitas y estadísticas locales gracias a Jetpack DataStore.",
      features: [
        "Partidas infinitas y modo diario.",
        "Diseño moderno con Jetpack Compose.",
        "Persistencia de datos con Jetpack DataStore.",
        "Arquitectura MVVM con una sola Activity.",
        "Navegación fluida con Navigation Compose.",
      ],
    },
  },
  // Puedes añadir más proyectos aquí...
];

export default function ProjectsTab() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="relative w-full px-6 md:px-12 lg:px-20 py-10">
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
      >
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-2xl p-6 cursor-pointer transition-transform duration-200 hover:scale-[1.03] hover:border-[var(--color-accent)]/60"
            onClick={() => setSelectedProject(project)}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
              {project.title}
            </h3>
            <p className="text-[var(--color-text-secondary)] mb-4">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tech.slice(0, 3).map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs rounded-md border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                >
                  {tech}
                </span>
              ))}
              {project.tech.length > 3 && (
                <span className="px-3 py-1 text-xs rounded-md border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5 text-[var(--color-accent)]/70">
                  +{project.tech.length - 3}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Modal de proyecto con animación de salida */}
      <AnimatePresence mode="wait">
        {selectedProject && (
          <ProjectModal
            key={selectedProject.title}
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
