"use client";
import { useTypingEffect } from "@/hooks/useTypingEffect";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  const typedText = useTypingEffect(
    [
      "Desarrollador Full Stack Junior 💻",
      "Apasionado por el código limpio ✨",
      "Amante de las buenas prácticas 🚀",
    ],
    80, // velocidad de tipeo
    1200 // pausa antes de borrar
  );

  return (
    <main className="bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-500">
      <section
        id="hero"
        className="min-h-screen flex flex-col justify-center items-center text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-semibold tracking-tight"
        >
          Hola, soy{" "}
          <span className="text-indigo-500">Alan</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-4 text-2xl font-mono text-gray-600 dark:text-gray-300 h-8"
        >
          {typedText}
          <span className="animate-pulse">|</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-10"
        >
          <a
            href="#about"
            className="text-indigo-500 border border-indigo-500 px-6 py-3 rounded-md hover:bg-indigo-500 hover:text-white transition-colors duration-300"
          >
            Saber más ↓
          </a>
        </motion.div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="min-h-screen flex flex-col justify-center items-center text-center"
      >
        <h2 className="text-4xl font-bold mb-4">Sobre mí</h2>
        <p className="max-w-xl text-gray-600 dark:text-gray-400">
          Soy un desarrollador full stack junior con pasión por crear
          aplicaciones limpias, rápidas y eficientes. Me encanta aprender
          nuevas tecnologías y aplicar buenas prácticas de desarrollo.
        </p>
        <a
          href="#projects"
          className="mt-10 text-indigo-500 hover:underline"
        >
          Ver proyectos ↓
        </a>
      </section>

      {/* PROJECTS */}
      <section
        id="projects"
        className="min-h-screen flex flex-col justify-center items-center text-center bg-neutral-100 dark:bg-neutral-900"
      >
        <h2 className="text-4xl font-bold mb-4">Proyectos</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Aquí puedes ver algunos de mis trabajos recientes.
        </p>
        <a
          href="#contact"
          className="text-indigo-500 hover:underline"
        >
          Contacto ↓
        </a>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="min-h-screen flex flex-col justify-center items-center text-center"
      >
        <h2 className="text-4xl font-bold mb-4">Contacto</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Si quieres hablar sobre proyectos o colaborar, escríbeme.
        </p>
        <Link
          href="mailto:alan.dev@example.com"
          className="text-indigo-500 border border-indigo-500 px-6 py-3 rounded-md hover:bg-indigo-500 hover:text-white transition-colors duration-300"
        >
          Enviar mensaje
        </Link>
      </section>
    </main>
  );
}
