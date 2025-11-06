"use client";

import { experiences as data } from "@/data/experience";
import { useAccentColor } from "@/hooks/useAccentColor";
import { getIcon, iconMap } from "@/utils/iconMap";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

/** Colores de marca */
const TECH_COLORS: Record<string, string> = {
  React: "#61DAFB",
  "Next.js": "#000000",
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  "TailwindCSS": "#38BDF8",
  "Tailwind CSS": "#38BDF8",
  "Framer Motion": "#0055FF",
  HTML5: "#E34F26",
  CSS3: "#1572B6",
  "Node.js": "#43853D",
  MongoDB: "#47A248",
  SQLite: "#003B57",
  SQL: "#336791",
  Docker: "#2496ED",
  Git: "#F05032",
  Linux: "#FCC624",
  Kotlin: "#7F52FF",
  "Jetpack Compose": "#4285F4",
  Android: "#3DDC84",
  "Google Cloud": "#4285F4",
  Firebase: "#FFCA28",
  GitHub: "#181717",
  GitLab: "#FC6D26",
  Vercel: "#000000",
  Kubernetes: "#326CE5",
  Prisma: "#2D3748",
  Supabase: "#3ECF8E",
  "Jetpack DataStore": "#336791",
  DataStore: "#336791",
  MVVM: "#8E8E8E",
};

/** Mapa nombre visible -> clave de icono */
const techToIconKey: Record<string, string> = {
  React: "FaReact",
  "Next.js": "SiNextdotjs",
  TypeScript: "SiTypescript",
  JavaScript: "FaJsSquare",
  HTML5: "FaHtml5",
  CSS3: "FaCss3Alt",
  "TailwindCSS": "SiTailwindcss",
  "Tailwind CSS": "SiTailwindcss",
  "Framer Motion": "SiFramer",
  "Node.js": "FaNodeJs",
  Express: "SiExpress",
  Java: "FaJava",
  Python: "FaPython",
  MongoDB: "SiMongodb",
  SQLite: "SiSqlite",
  SQL: "FaDatabase",
  Docker: "FaDocker",
  Git: "FaGitAlt",
  GitHub: "FaGithub",
  GitLab: "FaGitlab",
  Firebase: "SiFirebase",
  Vercel: "SiVercel",
  Kubernetes: "SiKubernetes",
  Prisma: "SiPrisma",
  Supabase: "SiSupabase",
  Android: "FaAndroid",
  Kotlin: "SiKotlin",
  "Jetpack Compose": "SiJetpackcompose",
  "Jetpack DataStore": "FaDatabase",
  DataStore: "FaDatabase",
  MVVM: "FaCertificate",
};

function resolveIcon(name: string) {
  const mappedKey = techToIconKey[name];
  if (mappedKey && iconMap[mappedKey]) return iconMap[mappedKey];
  const compact = name.replace(/\s+|\./g, "").replace("CSS", "Css").replace("JS", "Js");
  if (iconMap[`Fa${compact}`]) return iconMap[`Fa${compact}`];
  if (iconMap[`Si${compact}`]) return iconMap[`Si${compact}`];
  if (iconMap[name]) return iconMap[name];
  return getIcon("____no_existe____");
}

/** Inferir scope si no está en los datos */
function inferScope(exp: any): "personal" | "work" {
  if (exp.scope === "personal" || exp.scope === "work") return exp.scope;
  const c = (exp.company || "").toLowerCase();
  const t = (exp.title || "").toLowerCase();
  if (c.includes("proyecto personal") || t.includes("proyecto") || c.includes("freelance")) return "personal";
  return "work";
}

const filters = [
  { label: "Todos", value: "all" },
  { label: "Proyectos personales", value: "personal" },
  { label: "Trabajos", value: "work" },
] as const;

export default function ExperienceTab() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [lineHeight, setLineHeight] = useState(0);
  const pointRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]["value"]>("all");
  const accent = useAccentColor();

  useEffect(() => {
    if (hoverIndex !== null && pointRefs.current[hoverIndex]) {
      const point = pointRefs.current[hoverIndex]!;
      const topA = contentRef.current?.getBoundingClientRect().top ?? 0; // <-- medimos desde el wrapper del timeline
      const topB = point.getBoundingClientRect().top ?? 0;
      setLineHeight(topB - topA + 10);
    } else {
      setLineHeight(0);
    }
  }, [hoverIndex]);

  const experiences = useMemo(() => {
    if (activeFilter === "all") return data;
    return data.filter((e) => inferScope(e) === activeFilter);
  }, [activeFilter]);

  const filterDescriptions: Record<(typeof filters)[number]["value"], string> = {
    all: "Mostrando todas mis experiencias laborales y proyectos personales.",
    personal: "Mostrando los proyectos personales que he desarrollado.",
    work: "Mostrando mis experiencias laborales y trabajos realizados.",
  };

  // wrapper para que la línea empiece debajo del filtro
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <section id="experience" ref={containerRef} className="relative w-full max-w-6xl mx-auto py-4 px-4 md:px-8">
      {/* Barra de filtros (menos alta y sin pisar la línea) */}
      <motion.div
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="sticky top-[64px] md:top-[72px] z-20 bg-[var(--color-bg-page)]/95 backdrop-blur-lg border-b border-[var(--color-border)] py-3"
      >
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-2 px-4 text-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={activeFilter}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.25 }}
              className="text-sm text-[var(--color-text-secondary)]"
            >
              {filterDescriptions[activeFilter]}
            </motion.p>
          </AnimatePresence>

          <div className="flex justify-center gap-3 flex-wrap">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-300 ${activeFilter === f.value
                  ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)] shadow-[0_0_10px_var(--color-accent)]"
                  : "border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[var(--color-accent)]"
                  }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* === ÁREA DEL TIMELINE (debajo del filtro) === */}
      <div ref={contentRef} className="relative mt-6 py-20">
        {/* Línea principal (ahora empieza debajo del filtro) */}
        <div className="hidden md:block absolute left-1/2 top-10 w-[2px] h-full bg-[var(--color-border)] -translate-x-1/2 z-0" />

        {/* Línea activa */}
        <motion.div
          className="hidden md:block absolute left-1/2 top-0 w-[2px] bg-[var(--color-accent)] -translate-x-1/2 origin-top z-10"
          animate={{ height: lineHeight }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        />

        <div className="flex flex-col space-y-16 relative">
          {experiences.map((exp, i) => (
            <div key={`${exp.title}-${exp.period}-${i}`} className="relative flex items-center justify-center w-full">
              {/* Punto */}
              <motion.div
                ref={(el) => { pointRefs.current[i] = el; }}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className={`hidden md:block absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-4 border-[var(--color-bg-page)] shadow-md z-20 transition-colors duration-300 ${hoverIndex === i ? "bg-[var(--color-accent)] brightness-125" : "bg-[var(--color-accent)] opacity-80"
                  }`}
              />

              {/* Tarjeta */}
              <motion.div
                initial={{
                  opacity: 0,
                  x: typeof window !== "undefined" && window.innerWidth >= 768 ? (i % 2 === 0 ? -100 : 100) : 0,
                  y: typeof window !== "undefined" && window.innerWidth < 768 ? 48 : 0,
                }}
                animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.2, ease: "easeOut" }}
                className={`relative w-full md:w-1/2 ${i % 2 === 0 ? "md:pr-16 md:text-left md:mr-auto" : "md:pl-16 md:text-left md:ml-auto"}`}
                onMouseEnter={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <motion.div
                  animate={{
                    borderColor: hoverIndex === i ? "var(--color-accent)" : "var(--color-border)",
                    boxShadow: hoverIndex === i ? "0 0 12px var(--color-accent)" : "0 0 4px rgba(0,0,0,0.1)",
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className={`bg-[var(--color-card-bg)] border rounded-xl p-6 shadow-md transition-all duration-500 ${i % 2 === 0 ? "md:ml-auto" : "md:mr-auto"}`}
                >
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">{exp.title}</h3>
                  <p className="text-[var(--color-text-secondary)]">{exp.company}</p>
                  <p className="text-[var(--color-accent)] text-sm mb-4 mt-1">{exp.period}</p>

                  <ul className="list-disc list-inside space-y-1 text-[var(--color-text-secondary)] mb-3">
                    {exp.points.map((point, idx) => (<li key={idx}>{point}</li>))}
                  </ul>

                  {/* Chips compactas */}
                  {exp.tech && exp.tech.length > 0 && (
                    <motion.div
                      className="flex flex-wrap gap-1.5 mt-2"
                      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } } }}
                    >
                      {exp.tech.map((t, idx) => {
                        const Icon = resolveIcon(t);
                        const color = TECH_COLORS[t] ?? "var(--color-accent)";
                        return (
                          <motion.span
                            key={`${exp.title}-${t}-${idx}`}
                            variants={{ hidden: { opacity: 0, y: 4 }, show: { opacity: 1, y: 0 } }}
                            className="inline-flex items-center gap-1 text-xs px-2 py-[3px] rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-page)]/60"
                          >
                            {Icon && <Icon className="w-3.5 h-3.5 opacity-90" style={{ color }} />}
                            <span className="text-[var(--color-text-secondary)]">{t}</span>
                          </motion.span>
                        );
                      })}
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
