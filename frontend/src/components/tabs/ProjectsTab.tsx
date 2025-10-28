"use client";

import SectionWrapper from "@/components/SectionWrapper";
import { Project, projects } from "@/data/projects";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import ProjectModal from "../modals/ProjectModal";

export default function ProjectsTab() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <SectionWrapper>
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
            className="cursor-pointer"
            onClick={() => setSelectedProject(project)}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Tarjeta animada con borde y glow */}
            <motion.div
              animate={{
                borderColor:
                  hoverIndex === index
                    ? "var(--color-accent)"
                    : "var(--color-border)",
                boxShadow:
                  hoverIndex === index
                    ? "0 0 20px var(--color-accent)"
                    : "0 0 6px rgba(0,0,0,0.15)",
                scale: hoverIndex === index ? 1.03 : 1,
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="bg-[var(--color-card-bg)] border rounded-2xl p-6 transition-all duration-300"
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
          </motion.div>
        ))}
      </motion.div>

      {/* Modal del proyecto */}
      <AnimatePresence mode="wait">
        {selectedProject && (
          <ProjectModal
            key={selectedProject.title}
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
