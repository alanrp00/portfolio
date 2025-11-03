// frontend/src/components/tabs/ProjectsTab.tsx
"use client";

import ProjectModal from "@/components/modals/ProjectModal";
import { projects, type Project } from "@/data/projects";
import { useAccentColor } from "@/hooks/useAccentColor";
import { getIcon } from "@/utils/iconMap";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";

type TechItem = { name: string; icon?: string; color?: string };

export default function ProjectsTab() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hovered, setHovered] = useState<string | null>(null); // ← para animar glow
  const accent = useAccentColor();

  // var local para usar en clases Tailwind (focus ring, etc.)
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
    <section className="w-full flex flex-col items-center justify-center py-10">
      <div className="max-w-6xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {projects.map((project) => {
          const techs = project.tech ?? [];
          const visible = techs.slice(0, 4);
          const hidden = techs.slice(4);
          const hasMore = hidden.length > 0;
          const isHovered = hovered === project.title;

          return (
            <motion.article
              key={project.title}
              layout
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.995 }}
              role="button"
              tabIndex={0}
              aria-label={`Abrir detalles del proyecto ${project.title}`}
              onClick={() => open(project)}
              onKeyDown={(e) => onKeyOpen(e, project)}
              onHoverStart={() => setHovered(project.title)}
              onHoverEnd={() => setHovered(null)}
              style={accentVar}
              // 👇 Glow animado + borde al estilo ExperienceTab
              animate={{
                borderColor: isHovered ? accent : "var(--color-border)",
                boxShadow: isHovered
                  ? `0 0 12px ${accent}`
                  : "0 0 4px rgba(0,0,0,0.10)",
              }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className={[
                "group cursor-pointer select-none rounded-2xl p-7 min-h-[240px]",
                "border bg-[var(--color-card-bg)] shadow-sm",
                "transition-all duration-200 focus:outline-none",
                "focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-0",
                "flex flex-col justify-between",
              ].join(" ")}
            >
              <div className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">
                  {project.title}
                </h3>
                <p className="text-[var(--color-text-secondary)] leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {visible.map((t: TechItem) => {
                  const Icon = getIcon(t.icon ?? t.name);
                  return (
                    <span
                      key={`${project.title}-${t.name}`}
                      className={[
                        "inline-flex items-center gap-1.5 text-sm px-2.5 py-1 rounded-full",
                        "border border-[var(--color-border-soft)] bg-[var(--color-card-bg)]",
                        "transition-colors",
                        // al pasar por la tarjeta, los chips también marcan el borde con el acento
                        "group-hover:border-[var(--accent)]",
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
                    </span>
                  );
                })}

                {hasMore && (
                  <span
                    className={[
                      "inline-flex items-center justify-center text-sm w-8 px-0 py-1 rounded-full",
                      "border border-[var(--color-border-soft)] bg-[var(--color-card-bg)]",
                      "transition-colors group-hover:border-[var(--accent)]",
                    ].join(" ")}
                    title={hidden.map((t) => t.name).join(", ")}
                    aria-label={`Tecnologías adicionales: ${hidden.map((t) => t.name).join(", ")}`}
                  >
                    …
                  </span>
                )}
              </div>
            </motion.article>
          );
        })}
      </div>

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
