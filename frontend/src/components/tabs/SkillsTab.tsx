"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  SiAndroidstudio,
  SiDocker,
  SiFirebase,
  SiGit,
  SiJetpackcompose,
  SiKotlin,
  SiLinux,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

type Skill = {
  name: string;
  icon: React.ElementType;
  category: "Frontend" | "Backend" | "DevOps & Tools";
  projects: ("portfolio" | "palabro")[];
};

const skills: Skill[] = [
  // --- FRONTEND ---
  { name: "React", icon: SiReact, category: "Frontend", projects: ["portfolio"] },
  { name: "Next.js", icon: SiNextdotjs, category: "Frontend", projects: ["portfolio"] },
  { name: "TypeScript", icon: SiTypescript, category: "Frontend", projects: ["portfolio"] },
  { name: "Tailwind CSS", icon: SiTailwindcss, category: "Frontend", projects: ["portfolio"] },

  // --- BACKEND ---
  { name: "Node.js", icon: SiNodedotjs, category: "Backend", projects: ["portfolio"] },
  { name: "MongoDB", icon: SiMongodb, category: "Backend", projects: ["portfolio"] },

  // --- DEVOPS ---
  { name: "Docker", icon: SiDocker, category: "DevOps & Tools", projects: ["portfolio"] },
  { name: "Git", icon: SiGit, category: "DevOps & Tools", projects: ["portfolio", "palabro"] },
  { name: "Linux", icon: SiLinux, category: "DevOps & Tools", projects: ["portfolio"] },

  // --- PALABRO (Android) ---
  { name: "Kotlin", icon: SiKotlin, category: "Backend", projects: ["palabro"] },
  { name: "Jetpack Compose", icon: SiJetpackcompose, category: "Frontend", projects: ["palabro"] },
  { name: "Navigation Compose", icon: SiAndroidstudio, category: "Frontend", projects: ["palabro"] },
  { name: "Jetpack DataStore", icon: SiFirebase, category: "Backend", projects: ["palabro"] },
];

const filters = [
  { label: "Todos", value: "all" },
  { label: "Portfolio", value: "portfolio" },
  { label: "Palabro", value: "palabro" },
];

export default function SkillsTab() {
  const [activeFilter, setActiveFilter] = useState<"all" | "portfolio" | "palabro">("all");

  const filteredSkills =
    activeFilter === "all"
      ? skills
      : skills.filter((skill) => skill.projects.includes(activeFilter));

  const categories = ["Frontend", "Backend", "DevOps & Tools"];

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 20, scale: 0.9 },
  };

  // 🧠 Texto dinámico del filtro
  const filterDescriptions: Record<typeof activeFilter, string> = {
    all: "Mostrando todas las tecnologías utilizadas en mis proyectos.",
    portfolio: "Mostrando tecnologías empleadas en este portfolio web.",
    palabro: "Mostrando tecnologías utilizadas en el proyecto Android Palabro.",
  };

  return (
    <section className="relative w-full bg-[var(--color-bg-page)]">
      {/* 🔘 Sticky Filter Bar */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className="sticky top-[70px] md:top-[80px] z-30 bg-[var(--color-bg-page)]/95 backdrop-blur-lg border-b border-[var(--color-border)] py-4 shadow-sm"
      >
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-3 px-6 text-center">
          {/* 💬 Texto dinámico con animación */}
          <AnimatePresence mode="wait">
            <motion.p
              key={activeFilter}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.3 }}
              className="text-sm text-[var(--color-text-secondary)]"
            >
              {filterDescriptions[activeFilter]}
            </motion.p>
          </AnimatePresence>

          {/* 🔘 Filtros */}
          <div className="flex justify-center gap-4 flex-wrap">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value as any)}
                className={`px-5 py-2 rounded-lg border text-sm font-medium transition-all duration-300 ${activeFilter === filter.value
                  ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)] shadow-[0_0_12px_var(--color-accent)]"
                  : "border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[var(--color-accent)]"
                  }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 🧩 Skills grid content */}
      <div className="w-full max-w-6xl mx-auto py-20 px-6 md:px-12 lg:px-20 flex flex-col space-y-16">
        {categories.map((category) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col items-start w-full"
          >
            <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
              <span className="text-[var(--color-accent)]">◆</span>
              {category}
            </h3>

            <motion.div
              layout
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full"
            >
              <AnimatePresence mode="popLayout">
                {filteredSkills
                  .filter((s) => s.category === category)
                  .map((skill) => {
                    const Icon = skill.icon;
                    return (
                      <motion.div
                        key={skill.name}
                        layout
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        whileHover={{
                          scale: 1.06,
                          boxShadow: "0 0 16px var(--color-accent)",
                        }}
                        className="group bg-[var(--color-card-bg)] border border-[var(--color-border)] hover:border-[var(--color-accent)] rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-md transition-all duration-300"
                      >
                        <Icon className="text-[2rem] text-[var(--color-accent)] mb-2 transition-transform duration-300 group-hover:scale-110" />
                        <p className="text-sm text-[var(--color-text-primary)]">
                          {skill.name}
                        </p>
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
