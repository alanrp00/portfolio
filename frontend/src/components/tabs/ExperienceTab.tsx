"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div
      ref={ref}
      className="relative w-full max-w-6xl mx-auto py-20 px-4 md:px-8"
    >
      {/* Línea vertical central (solo en pantallas medianas o mayores) */}
      <div className="hidden md:block absolute left-1/2 top-0 w-[2px] h-full bg-[var(--color-border)] transform -translate-x-1/2" />

      <div className="flex flex-col space-y-16 relative">
        {experiences.map((exp, i) => (
          <div key={i} className="relative flex items-center justify-center w-full">
            {/* Punto central (solo en pantallas medianas o mayores) */}
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-[var(--color-accent)] border-4 border-[var(--color-bg-page)] rounded-full shadow-md z-10"
            />

            {/* Tarjeta de experiencia */}
            <motion.div
              initial={{
                opacity: 0,
                x: i % 2 === 0 ? -100 : 100,
              }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.2, ease: "easeOut" }}
              className={`relative w-full md:w-1/2 ${i % 2 === 0
                  ? "md:pr-16 md:text-right md:mr-auto"
                  : "md:pl-16 md:text-left md:ml-auto"
                }`}
            >
              <div
                className={`bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 ${i % 2 === 0 ? "md:ml-auto" : "md:mr-auto"
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
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
