"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center scroll-mt-24"
    >
      {/* Título */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6"
      >
        Sobre mí
      </motion.h2>

      {/* Descripción */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-xl text-base md:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed"
      >
        Soy un desarrollador <strong>Full Stack</strong> apasionado por crear
        aplicaciones web limpias, rápidas y con un gran enfoque en la
        experiencia de usuario. Me encanta combinar diseño, código y rendimiento
        para construir productos que la gente disfrute usar.
        <br />
        <br />
        Actualmente trabajo con tecnologías modernas como{" "}
        <span className="text-violet-500 font-medium">
          TypeScript, Next.js, React, y Node.js
        </span>
        , explorando nuevas formas de optimizar procesos y construir interfaces
        elegantes.
      </motion.p>
    </section>
  );
}
