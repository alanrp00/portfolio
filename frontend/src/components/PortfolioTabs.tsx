"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import EducationTab from "./EducationTab";
import ExperienceTab from "./ExperienceTab";
import ProjectsTab from "./ProjectsTab";

const tabs = [
  { id: "experience", label: "Experience", icon: "💼" },
  { id: "education", label: "Education", icon: "🎓" },
  { id: "projects", label: "Projects", icon: "🚀" },
];

export default function PortfolioTabs() {
  const [active, setActive] = useState("experience");

  return (
    <section className="relative w-full overflow-hidden py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-foreground">
          My <span className="text-primary">Journey</span>
        </h2>

        {/* Tabs */}
        <div className="flex justify-center mb-12 flex-wrap gap-4">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-2xl font-medium transition-all border backdrop-blur-sm ${active === tab.id
                ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-lg shadow-indigo-500/20 border-transparent"
                : "border border-foreground/20 text-foreground hover:border-primary/50"
                }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Contenido con animación */}
        <div className="relative min-h-[420px]">
          <AnimatePresence mode="wait">
            {active === "experience" && (
              <motion.div
                key="experience"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <ExperienceTab />
              </motion.div>
            )}
            {active === "education" && (
              <motion.div
                key="education"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <EducationTab />
              </motion.div>
            )}
            {active === "projects" && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <ProjectsTab />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
