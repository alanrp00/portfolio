"use client";

import ProjectModal from "@/components/modals/ProjectModal";
import { projects } from "@/data/projects";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function ProjectsTab() {
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);

  return (
    <section className="w-full flex flex-col items-center justify-center py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr w-full max-w-6xl"
      >
        {projects.map((project, i) => (
          <motion.div
            key={i}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 0 18px var(--color-accent)",
              borderColor: "var(--color-accent)",
            }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="relative bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-2xl p-6 flex flex-col justify-between min-h-[250px] h-full hover:border-[var(--color-accent)] transition-all cursor-pointer"
            onClick={() => setSelectedProject(project)}
          >
            {/* Título y descripción */}
            <div>
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                {project.title}
              </h3>
              <p className="text-[var(--color-text-secondary)] mb-4 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Tecnologías */}
            <div className="flex flex-wrap gap-2 mt-auto px-1 md:px-2">
              {project.tech.slice(0, 3).map((t, j) => (
                <span
                  key={j}
                  className="px-3 py-1 text-sm border border-[var(--color-accent)]/40 rounded-md text-[var(--color-accent)] bg-[var(--color-accent)]/10"
                >
                  {t}
                </span>
              ))}
              {project.tech.length > 3 && (
                <span className="px-2 py-1 text-sm text-[var(--color-accent)] border border-[var(--color-accent)]/30 rounded-md">
                  +{project.tech.length - 3}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Modal del proyecto */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            key={selectedProject.title}
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
