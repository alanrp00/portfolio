"use client";

import ProjectsTab from "@/components/tabs/ProjectsTab";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import ExperienceTab from "./tabs/ExperienceTab";
import SkillsTab from "./tabs/SkillsTab";


const tabs = [
  { id: "proyectos", label: "Proyectos" },
  { id: "experiencia", label: "Experiencia" },
  { id: "habilidades", label: "Habilidades" },
  { id: "educacion", label: "Educación" },

];

export default function TabsSection() {
  const [activeTab, setActiveTab] = useState("proyectos");

  return (
    <section id="seccion-tabs" className="container py-20 text-center">
      {/* ──────────── Barra de Tabs ──────────── */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-5 py-2 rounded-lg font-medium text-sm md:text-base transition-all
              ${activeTab === tab.id
                ? "text-[var(--color-accent)] bg-[var(--color-button-bg)]"
                : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute inset-0 rounded-lg border border-[var(--color-accent)]"
                transition={{ type: "spring", duration: 0.5 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* ──────────── Contenido dinámico ──────────── */}
      <div className="relative min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-6 items-center"
          >
            {activeTab === "proyectos" && <ProjectsTab />}

            {activeTab === "experiencia" && <ExperienceTab />}

            {activeTab === "habilidades" && <SkillsTab />}

            {activeTab === "educacion" && (
              <div className="text-[var(--color-text-secondary)] max-w-xl">
                <h3 className="text-2xl font-semibold mb-4 text-[var(--color-text-primary)]">
                  Educación & Certificados
                </h3>
                <p>
                  Sección dividida entre educación formal y certificados
                  profesionales, con enlaces a sus credenciales.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
