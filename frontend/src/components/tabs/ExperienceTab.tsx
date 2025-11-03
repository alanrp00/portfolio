"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const experiences = [
  {
    title: "Desarrollador Full Stack Junior",
    company: "Freelance",
    location: "Remoto",
    period: "2023 - Presente",
    points: [
      "Desarrollo de aplicaciones web modernas con React, TypeScript y Node.js.",
      "Diseño de interfaces limpias y funcionales adaptadas a cualquier dispositivo.",
      "Gestión de datos y autenticación segura con bases de datos SQL y NoSQL.",
    ],
  },
  {
    title: "Desarrollador Android (Proyecto personal)",
    company: "Palabro",
    location: "Proyecto propio",
    period: "2022 - 2023",
    points: [
      "Creación de una app nativa en Kotlin con Jetpack Compose.",
      "Implementación de arquitectura MVVM y almacenamiento con Jetpack DataStore.",
      "Publicación y mantenimiento de la aplicación con soporte de actualizaciones.",
    ],
  },
  {
    title: "Colaborador Open Source",
    company: "GitHub",
    location: "Remoto",
    period: "2021 - 2022",
    points: [
      "Contribuciones en proyectos open source de la comunidad.",
      "Revisión de código y soporte técnico a desarrolladores junior.",
      "Integración de herramientas CI/CD y mejoras en documentación.",
    ],
  },
];

export default function ExperienceTab() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [lineHeight, setLineHeight] = useState(0);
  const pointRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (hoverIndex !== null && pointRefs.current[hoverIndex]) {
      const point = pointRefs.current[hoverIndex];
      const containerTop = containerRef.current?.getBoundingClientRect().top ?? 0;
      const pointTop = point?.getBoundingClientRect().top ?? 0;
      setLineHeight(pointTop - containerTop + 10);
    } else {
      setLineHeight(0);
    }
  }, [hoverIndex]);

  return (
    <div
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
              ref={(el) => {
                pointRefs.current[i] = el;
              }}
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className={`hidden md:block absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full border-4 border-[var(--color-bg-page)] shadow-md z-20 transition-colors duration-300 ${hoverIndex === i
                ? "bg-[var(--color-accent)] brightness-125"
                : "bg-[var(--color-accent)] opacity-80"
                }`}
            />

            {/* Tarjeta */}
            <motion.div
              initial={{
                opacity: 0,
                x:
                  typeof window !== "undefined" && window.innerWidth >= 768
                    ? i % 2 === 0
                      ? -100
                      : 100
                    : 0,
                y:
                  typeof window !== "undefined" && window.innerWidth < 768
                    ? 60
                    : 0,
              }}
              animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.2, ease: "easeOut" }}
              className={`relative w-full md:w-1/2 ${i % 2 === 0
                ? "md:pr-16 md:text-left md:mr-auto"
                : "md:pl-16 md:text-left md:ml-auto"
                }`}
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              {/* Tarjeta con borde animado por hoverIndex */}
              <motion.div
                animate={{
                  borderColor:
                    hoverIndex === i
                      ? "var(--color-accent)"
                      : "var(--color-border)",
                  boxShadow:
                    hoverIndex === i
                      ? "0 0 12px var(--color-accent)"
                      : "0 0 4px rgba(0,0,0,0.1)",
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className={`bg-[var(--color-card-bg)] border rounded-xl p-6 shadow-md transition-all duration-500 ${i % 2 === 0 ? "md:ml-auto" : "md:mr-auto"
                  }`}
              >
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                  {exp.title}
                </h3>
                <p className="text-[var(--color-text-secondary)]">
                  {exp.company} • {exp.location}
                </p>
                <p className="text-[var(--color-accent)] text-sm mb-4 mt-1">
                  {exp.period}
                </p>
                <ul className="list-disc list-inside space-y-1 text-[var(--color-text-secondary)]">
                  {exp.points.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
