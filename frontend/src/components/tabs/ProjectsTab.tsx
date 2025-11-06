// frontend/src/components/tabs/ProjectsTab.tsx
"use client";

import ProjectModal from "@/components/modals/ProjectModal";
import { projects, type Project } from "@/data/projects";
import { useAccentColor } from "@/hooks/useAccentColor";
import { getIcon, iconMap } from "@/utils/iconMap";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";

type TechItem = { name: string; icon?: string; color?: string };

const gridVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 6, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.38 },
  },
} as const;

/** Mapeo explícito de “nombre visible” -> clave del icono del iconMap */
const techToIconKey: Record<string, string> = {
  // Frontend
  "React": "FaReact",
  "Next.js": "SiNextdotjs",
  "TypeScript": "SiTypescript",
  "JavaScript": "FaJsSquare",
  "HTML5": "FaHtml5",
  "CSS3": "FaCss3Alt",
  "Bootstrap": "FaBootstrap",
  "Sass": "FaSass",
  "TailwindCSS": "SiTailwindcss",
  "Framer Motion": "SiFramer",

  // Backend / DB / Lenguajes
  "Node.js": "FaNodeJs",
  "Express": "SiExpress",
  "Java": "FaJava",
  "Python": "FaPython",
  "MongoDB": "SiMongodb",
  "SQLite": "SiSqlite",
  "MySQL": "SiMysql",
  "PHP": "SiPhp",
  "C#": "SiCsharp",
  "C++": "SiCplusplus",
  "Django": "SiDjango",
  "Spring": "SiSpring",
  "Prisma": "SiPrisma",
  "Supabase": "SiSupabase",
  "SQL": "FaDatabase",
  "DataStore": "FaDatabase",

  // Android / Kotlin
  "Android": "FaAndroid",
  "Kotlin": "SiKotlin",
  "Jetpack Compose": "SiJetpackcompose",
  "MVVM": "FaCertificate",

  // DevOps / Cloud
  "Docker": "FaDocker",
  "AWS": "FaAws",
  "Google Cloud": "FaGoogle",
  "Firebase": "SiFirebase",
  "Git": "FaGitAlt",
  "GitHub": "FaGithub",
  "GitLab": "FaGitlab",
  "Vercel": "SiVercel",
  "Kubernetes": "SiKubernetes",

  // Herramientas / Diseño
  "Figma": "FaFigma",
  "Postman": "SiPostman",
  "VS Code": "SiVisualstudiocode",
  "Notion": "SiNotion",

  // SO
  "Linux": "FaLinux",
  "Windows": "FaWindows",
  "macOS": "FaApple",
};

function resolveIconFromTech(t: TechItem) {
  // 1) Si el objeto trae 'icon' explícito y existe en el mapa
  if (t.icon && iconMap[t.icon]) return iconMap[t.icon];

  // 2) Mapeo por nombre visible
  const mapped = techToIconKey[t.name];
  if (mapped && iconMap[mapped]) return iconMap[mapped];

  // 3) Heurísticas Fa*/Si* (React -> FaReact / SiReact, Next.js -> SiNextdotjs, etc.)
  const base = (t.icon ?? t.name)
    .replace(/\s+|\./g, "")
    .replace("CSS", "Css")
    .replace("JS", "Js");
  if (iconMap[`Fa${base}`]) return iconMap[`Fa${base}`];
  if (iconMap[`Si${base}`]) return iconMap[`Si${base}`];

  // 4) Último intento: clave directa igual al nombre
  if (iconMap[t.name]) return iconMap[t.name];

  // 5) Fallback controlado
  return getIcon("____fallback____");
}

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
      <motion.div
        variants={gridVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.18 }}
        className="max-w-6xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4"
      >
        {projects.map((project) => {
          const techs = (project.tech ?? []) as TechItem[];
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
              <div className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">
                  {project.title}
                </h3>
                <p className="text-[var(--color-text-secondary)] leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              </div>

              {/* Chips compactas como en ExperienceTab */}
              <motion.div
                className="mt-5 flex flex-wrap gap-1.5"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.03, delayChildren: 0.05 } },
                }}
              >
                {visible.map((t) => {
                  const Icon = resolveIconFromTech(t);
                  return (
                    <motion.span
                      key={`${project.title}-${t.name}`}
                      variants={{ hidden: { opacity: 0, y: 4 }, show: { opacity: 1, y: 0 } }}
                      className="inline-flex items-center gap-1 text-xs px-2 py-[3px] rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-page)]/60"
                      title={t.name}
                    >
                      {Icon && (
                        <Icon className="w-3.5 h-3.5 opacity-80" style={{ color: t.color ?? accent }} />
                      )}
                      <span className="text-[var(--color-text-secondary)]">{t.name}</span>
                    </motion.span>
                  );
                })}

                {hasMore && (
                  <motion.span
                    variants={{ hidden: { opacity: 0, y: 4 }, show: { opacity: 1, y: 0 } }}
                    className="inline-flex items-center justify-center text-xs w-6 h-[22px] px-0 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-page)]/60"
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
          <ProjectModal key={selectedProject.title} project={selectedProject} onClose={close} />
        )}
      </AnimatePresence>
    </section>
  );
}
