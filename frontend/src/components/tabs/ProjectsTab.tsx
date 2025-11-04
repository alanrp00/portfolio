// frontend/src/components/tabs/ProjectsTab.tsx
"use client";

import ProjectModal from "@/components/modals/ProjectModal";
import { projects, type Project } from "@/data/projects";
import { useAccentColor } from "@/hooks/useAccentColor";
import { getIcon } from "@/utils/iconMap";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";

// Mantengo exactamente tu estructura y estilos, solo añado animaciones suaves y modernas
// sin forzar tipos de Variants para evitar errores TS con ciertas versiones de framer-motion.

type TechItem = { name: string; icon?: string; color?: string };

// Variantes muy simples y compatibles
// Variantes compatibles sin 'ease' para evitar conflictos de tipos según la versión de framer-motion
const gridVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
} as const;

// Pop & Float — fade + scale-in al entrar; elevación suave en hover
const cardVariants = {
  hidden: { opacity: 0, y: 6, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.38 },
  },
} as const;

export default function ProjectsTab() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const accent = useAccentColor();

  const accentVar = { ["--accent" as any]: accent } as React.CSSProperties;

  const open = useCallback((p: Project) => setSelectedProject(p), []);
  const close = useCallback(() => setSelectedProject(null), []);

  const onKeyOpen = (e: React.KeyboardEvent, p: Project) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open(p);
    }
  };

  return (
    <section id="projects" className="w-full flex flex-col items-center justify-center py-10">
      {/* container con stagger y aparición al entrar en viewport */}
      <motion.div
        variants={gridVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.18 }}
        className="max-w-6xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4"
      >
        {projects.map((project) => {
          const techs = project.tech ?? [];
          const visible = techs.slice(0, 4);
          const hidden = techs.slice(4);
          const hasMore = hidden.length > 0;
          const isHovered = hovered === project.title;

          return (
            <motion.article
              key={project.title}
              variants={cardVariants}
              layout
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.995 }}
              role="button"
              tabIndex={0}
              aria-label={`Abrir detalles del proyecto ${project.title}`}
              onClick={() => open(project)}
              onKeyDown={(e) => onKeyOpen(e, project)}
              onHoverStart={() => setHovered(project.title)}
              onHoverEnd={() => setHovered(null)}
              style={accentVar}
              animate={{
                borderColor: isHovered ? accent : "var(--color-border)",
                boxShadow: isHovered
                  ? `0 8px 28px -16px ${accent}`
                  : "0 2px 8px rgba(0,0,0,0.08)",
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={[
                "group cursor-pointer select-none rounded-2xl p-7 min-h-[240px]",
                "border bg-[var(--color-card-bg)] shadow-sm",
                "transition-all duration-200 focus:outline-none",
                "focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-0",
                "flex flex-col justify-between relative overflow-hidden",
              ].join(" ")}
            >
              {/* Sheen/shine sutil que recorre la tarjeta en hover (minimalista) */}
              <motion.span
                aria-hidden
                initial={{ x: "-120%" }}
                animate={{ x: isHovered ? "120%" : "-120%" }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/8 to-transparent"
              />

              <div className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">
                  {project.title}
                </h3>
                <p className="text-[var(--color-text-secondary)] leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              </div>

              <motion.div
                className="mt-5 flex flex-wrap gap-2"
                // micro-stagger de chips cuando la tarjeta entra
                variants={{
                  hidden: {},
                  show: {
                    transition: { staggerChildren: 0.03, delayChildren: 0.05 },
                  },
                }}
              >
                {visible.map((t: TechItem) => {
                  const Icon = getIcon(t.icon ?? t.name);
                  return (
                    <motion.span
                      key={`${project.title}-${t.name}`}
                      variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0 } }}
                      className={[
                        "inline-flex items-center gap-1.5 text-sm px-2.5 py-1 rounded-xl",
                        "border border-[var(--accent)] bg-[var(--color-card-bg)]",
                        "transition-colors group-hover:border-[var(--accent)]",
                      ].join(" ")}
                      title={t.name}
                    >
                      {Icon && (
                        <Icon
                          className="w-4 h-4"
                          style={{ color: t.color ?? accent }}
                        />
                      )}
                      <span className="text-[var(--color-text-secondary)]">{t.name}</span>
                    </motion.span>
                  );
                })}

                {hasMore && (
                  <motion.span
                    variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0 } }}
                    className={[
                      "inline-flex items-center justify-center text-sm w-8 px-0 py-1 rounded-xl",
                      "border border-[var(--color-border-soft)] bg-[var(--color-card-bg)]",
                      "transition-colors group-hover:border-[var(--accent)]",
                    ].join(" ")}
                    title={hidden.map((t) => t.name).join(", ")}
                    aria-label={`Tecnologías adicionales: ${hidden.map((t) => t.name).join(", ")}`}
                  >
                    …
                  </motion.span>
                )}
              </motion.div>
            </motion.article>
          );
        })}
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            key={selectedProject.title}
            project={selectedProject}
            onClose={close}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
