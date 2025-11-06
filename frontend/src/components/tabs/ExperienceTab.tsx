"use client";

import { experiences } from "@/data/experience";
import { useAccentColor } from "@/hooks/useAccentColor";
import { getIcon, iconMap } from "@/utils/iconMap";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/** Colores de marca (puedes ampliar/ajustar lo que quieras) */
const TECH_COLORS: Record<string, string> = {
  // Frontend
  "React": "#61DAFB",
  "Next.js": "#000000",
  "TypeScript": "#3178C6",
  "JavaScript": "#F7DF1E",
  "HTML5": "#E34F26",
  "CSS3": "#1572B6",
  "Bootstrap": "#7952B3",
  "Sass": "#CC6699",
  "TailwindCSS": "#38BDF8",
  "Framer Motion": "#0055FF",

  // Backend / DB / Lenguajes
  "Node.js": "#43853D",
  "Express": "#000000",
  "Java": "#E76F00",
  "Python": "#3776AB",
  "MongoDB": "#47A248",
  "SQLite": "#003B57",
  "MySQL": "#4479A1",
  "PHP": "#777BB4",
  "C#": "#239120",
  "C++": "#00599C",
  "Django": "#092E20",
  "Spring": "#6DB33F",
  "Prisma": "#2D3748",
  "Supabase": "#3ECF8E",
  "SQL": "#336791",
  "DataStore": "#336791",

  // Android / Kotlin
  "Android": "#3DDC84",
  "Kotlin": "#7F52FF",
  "Jetpack Compose": "#4285F4",
  "MVVM": "#8E8E8E",

  // DevOps / Cloud
  "Docker": "#2496ED",
  "AWS": "#FF9900",
  "Google Cloud": "#4285F4",
  "Firebase": "#FFCA28",
  "Git": "#F05032",
  "GitHub": "#181717",
  "GitLab": "#FC6D26",
  "Vercel": "#000000",
  "Kubernetes": "#326CE5",

  // Herramientas / Diseño
  "Figma": "#F24E1E",
  "Postman": "#FF6C37",
  "VS Code": "#007ACC",
  "Notion": "#000000",

  // SO
  "Linux": "#FCC624",
  "Windows": "#0078D6",
  "macOS": "#000000",
};

/** Mapeo “nombre visible” -> clave del icono en iconMap */
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

function resolveIcon(name: string) {
  // 1) Mapa explícito
  const mappedKey = techToIconKey[name];
  if (mappedKey && iconMap[mappedKey]) return iconMap[mappedKey];

  // 2) Heurísticas Fa*/Si*
  const compact = name.replace(/\s+|\./g, "").replace("CSS", "Css").replace("JS", "Js");
  if (iconMap[`Fa${compact}`]) return iconMap[`Fa${compact}`];
  if (iconMap[`Si${compact}`]) return iconMap[`Si${compact}`];

  // 3) Último intento: clave directa
  if (iconMap[name]) return iconMap[name];

  // 4) Fallback
  return getIcon("____no_existe____");
}

export default function ExperienceTab() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [lineHeight, setLineHeight] = useState(0);
  const pointRefs = useRef<(HTMLDivElement | null)[]>([]);
  const accent = useAccentColor();

  useEffect(() => {
    if (hoverIndex !== null && pointRefs.current[hoverIndex]) {
      const point = pointRefs.current[hoverIndex]!;
      const containerTop = containerRef.current?.getBoundingClientRect().top ?? 0;
      const pointTop = point.getBoundingClientRect().top ?? 0;
      setLineHeight(pointTop - containerTop + 10);
    } else {
      setLineHeight(0);
    }
  }, [hoverIndex]);

  return (
    <div
      id="experience"
      ref={containerRef}
      className="relative w-full max-w-6xl mx-auto py-20 px-4 md:px-8"
    >
      {/* Línea principal */}
      <div className="hidden md:block absolute left-1/2 top-0 w-[2px] h-full bg-[var(--color-border)] transform -translate-x-1/2 z-0" />

      {/* Línea activa */}
      <motion.div
        className="hidden md:block absolute left-1/2 top-0 w-[2px] bg-[var(--color-accent)] transform -translate-x-1/2 origin-top z-10"
        animate={{ height: lineHeight }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
      />

      <div className="flex flex-col space-y-16 relative">
        {experiences.map((exp, i) => (
          <div key={i} className="relative flex items-center justify-center w-full">
            {/* Punto */}
            <motion.div
              ref={(el) => { pointRefs.current[i] = el; }}
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className={`hidden md:block absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full border-4 border-[var(--color-bg-page)] shadow-md z-20 transition-colors duration-300 ${hoverIndex === i ? "bg-[var(--color-accent)] brightness-125" : "bg-[var(--color-accent)] opacity-80"
                }`}
            />

            {/* Tarjeta */}
            <motion.div
              initial={{
                opacity: 0,
                x: typeof window !== "undefined" && window.innerWidth >= 768 ? (i % 2 === 0 ? -100 : 100) : 0,
                y: typeof window !== "undefined" && window.innerWidth < 768 ? 60 : 0,
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

                {/* Chips compactas con color de marca (o acento por defecto) */}
                {exp.tech && exp.tech.length > 0 && (
                  <motion.div
                    className="flex flex-wrap gap-1.5 mt-2"
                    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } } }}
                  >
                    {exp.tech.map((t, idx) => {
                      const Icon = resolveIcon(t);
                      const color = TECH_COLORS[t] ?? accent;
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
  );
}
