"use client";

import ProjectsTab from "@/components/tabs/ProjectsTab";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import EducationTab from "./tabs/EducationTab";
import ExperienceTab from "./tabs/ExperienceTab";
import SkillsTab from "./tabs/SkillsTab";

const tabs = [
  { id: "proyectos", label: "Proyectos" },
  { id: "experiencia", label: "Experiencia" },
  { id: "habilidades", label: "Habilidades" },
  { id: "educacion", label: "Educación" },
] as const;

type TabId = (typeof tabs)[number]["id"];
const NAV_OFFSET = 80;

function scrollToAnchor(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top: y, behavior: "smooth" });
}

export default function TabsSection() {
  const [activeTab, setActiveTab] = useState<TabId>("proyectos");

  // Al montar: si hay hash (#experiencia, etc.) selecciona y posiciona
  useEffect(() => {
    const h = window.location.hash.replace(/^#/, "") as TabId;
    if (tabs.some((t) => t.id === h)) {
      setActiveTab(h);
      requestAnimationFrame(() => scrollToAnchor(h));
    }
  }, []);

  // Escuchar cambios de hash (clic desde navbar)
  useEffect(() => {
    const onHash = () => {
      const h = window.location.hash.replace(/^#/, "") as TabId;
      if (tabs.some((t) => t.id === h)) {
        setActiveTab(h);
        scrollToAnchor(h);
      }
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const handleLocalTabClick = (id: TabId) => {
    setActiveTab(id);
    // Usar location.hash para disparar hashchange nativo
    if (window.location.hash !== `#${id}`) {
      window.location.hash = id;
    } else {
      // si ya estabas en el mismo hash, al menos haz scroll
      scrollToAnchor(id);
    }
  };

  return (
    <section id="seccion-tabs" className="container py-20 text-center relative">
      {/* Anclas invisibles para el navbar (el parent es relative) */}
      <div id="proyectos" className="pointer-events-none absolute -top-24 h-0" style={{ scrollMarginTop: NAV_OFFSET }} />
      <div id="experiencia" className="pointer-events-none absolute -top-24 h-0" style={{ scrollMarginTop: NAV_OFFSET }} />
      <div id="habilidades" className="pointer-events-none absolute -top-24 h-0" style={{ scrollMarginTop: NAV_OFFSET }} />
      <div id="educacion" className="pointer-events-none absolute -top-24 h-0" style={{ scrollMarginTop: NAV_OFFSET }} />

      {/* Barra de Tabs (tu diseño) */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleLocalTabClick(tab.id)}
            className={`relative px-5 py-2 rounded-lg font-medium text-sm md:text-base transition-all
              ${activeTab === tab.id
                ? "text-[var(--color-accent)] bg-[var(--color-button-bg)]"
                : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              }`}
            aria-current={activeTab === tab.id ? "page" : undefined}
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

      {/* Contenido dinámico (tu animación) */}
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
            {activeTab === "educacion" && <EducationTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
