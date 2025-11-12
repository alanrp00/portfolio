"use client";

import { skills as DATA } from "@/data/skills";
import { getIcon, iconMap } from "@/utils/iconMap";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

/** Colores de marca (extiende cuando quieras) */
const TECH_COLORS: Record<string, string> = {
  React: "#61DAFB",
  "Next.js": "#000000",
  TypeScript: "#3178C6",
  "Tailwind CSS": "#38BDF8",
  "Framer Motion": "#0055FF",

  "Node.js": "#43853D",
  Express: "#000000",
  MongoDB: "#47A248",
  DataStore: "#FFCA28",
  Java: "#E76F00",

  Docker: "#2496ED",
  Git: "#F05032",
  GitHub: "#181717",
  Vercel: "#000000",
  Linux: "#FCC624",
  Postman: "#FF6C37",
  Selenium: "#43B02A",
  Jira: "#2684FF",

  Kotlin: "#7F52FF",
  "Jetpack Compose": "#4285F4",
  "Navigation Compose": "#3DDC84",
};

/** Filtros por origen del proyecto + 'general' (sin proyecto) */
const FILTERS = [
  { label: "Todos", value: "all" as const },
  { label: "Portfolio", value: "portfolio" as const },
  { label: "Palabro", value: "palabro" as const },
];

type FilterValue = (typeof FILTERS)[number]["value"];

/** Categorías dinámicas a partir del dato (incluye Mobile) */
const CATEGORIES = Array.from(new Set(DATA.map((s) => s.category))) as Array<
  "Frontend" | "Backend" | "DevOps & Tools" | "Mobile"
>;

export default function SkillsTab() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");

  const filtered = useMemo(() => {
    if (activeFilter === "all") return DATA;
    return DATA.filter((s) => s.projects.includes(activeFilter));
  }, [activeFilter]);

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 20, scale: 0.9 },
  } as const;

  const descriptions: Record<FilterValue, string> = {
    all: "Todas las tecnologías que uso en mis proyectos.",
    portfolio: "Tecnologías empleadas en este portfolio web.",
    palabro: "Tecnologías empleadas en el proyecto Android Palabro.",
  };

  return (
    <section id="skills" className="relative w-full bg-[var(--color-bg-page)]">
      {/* Barra de filtros */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className="sticky top-[70px] md:top-[80px] z-30 bg-[var(--color-bg-page)]/95 backdrop-blur-lg border-b border-[var(--color-border)] py-4 shadow-sm"
      >
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-3 px-6 text-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={activeFilter}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.3 }}
              className="text-sm text-[var(--color-text-secondary)]"
            >
              {descriptions[activeFilter]}
            </motion.p>
          </AnimatePresence>

          <div className="flex justify-center gap-4 flex-wrap">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`px-5 py-2 rounded-lg border text-sm font-medium transition-all duration-300 ${activeFilter === f.value
                  ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)] shadow-[0_0_12px_var(--color-accent)]"
                  : "border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[var(--color-accent)]"
                  }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Grid por categorías */}
      <div className="w-full max-w-6xl mx-auto py-20 px-6 md:px-12 lg:px-20 flex flex-col space-y-16">
        {CATEGORIES.map((category) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="flex flex-col items-start w-full"
          >
            <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
              <span className="text-[var(--color-accent)]">◆</span>
              {category}
            </h3>

            <motion.div
              key={activeFilter}
              layout
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full"
            >
              <AnimatePresence mode="popLayout">
                {filtered
                  .filter((s) => s.category === category)
                  .map((skill) => {
                    const Icon =
                      (skill.icon && iconMap[skill.icon]) || getIcon(skill.name);
                    const color = TECH_COLORS[skill.name] ?? "var(--color-accent)";

                    return (
                      <motion.div
                        key={`${skill.name}-${skill.category}`}
                        layout
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        whileHover={{ scale: 1.06, boxShadow: `0 0 16px ${color}` }}
                        className="group bg-[var(--color-card-bg)] border border-[var(--color-border)] hover:border-transparent rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-md transition-all duration-300"
                        title={skill.name}
                      >
                        {Icon && (
                          <Icon
                            className="text-[2rem] mb-2 transition-transform duration-300 group-hover:scale-110"
                            style={{ color }}
                          />
                        )}
                        <p className="text-sm text-[var(--color-text-primary)]">{skill.name}</p>
                      </motion.div>
                    );
                  })}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
