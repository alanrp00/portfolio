"use client";

import { useTypingEffect } from "@/hooks/useTypingEffect";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Hero() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const typedText = useTypingEffect([
    "Full Stack Developer 💻",
    "TypeScript | React | Next.js",
    "Building experiences, not just apps.",
  ]);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center transition-colors duration-700">
      {/* Glow de fondo (cambia según el tema) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1.5 }}
        className={`absolute -z-10 w-[800px] h-[800px] rounded-full blur-[160px] ${resolvedTheme === "dark" ? "bg-blue-800/25" : "bg-blue-300/30"
          }`}
      />

      {/* Botón modo claro/oscuro */}
      <button
        onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
        className="absolute top-6 right-6 p-2 rounded-full bg-neutral-200 dark:bg-neutral-800 hover:scale-105 transition-transform shadow-sm"
        aria-label="Cambiar tema"
      >
        {resolvedTheme === "light" ? (
          <Moon className="w-5 h-5 text-neutral-700" />
        ) : (
          <Sun className="w-5 h-5 text-yellow-400" />
        )}
      </button>

      {/* Tarjeta del avatar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`relative z-10 w-60 h-76 mb-8 rounded-xl border backdrop-blur-md shadow-lg flex items-center justify-center overflow-hidden transition-all duration-700 ${resolvedTheme === "dark"
            ? "bg-neutral-800/20 border-neutral-700/30 shadow-[0_4px_25px_-8px_rgba(59,130,246,0.25)]"
            : "bg-white/10 border-neutral-300/30 shadow-[0_4px_25px_-8px_rgba(59,130,246,0.35)]"
          }`}
      >
        {/* Efecto de gradiente interno */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${resolvedTheme === "dark"
              ? "from-transparent via-transparent to-blue-700/10"
              : "from-transparent via-transparent to-blue-400/20"
            }`}
        />

        <Image
          src="/avatar.png"
          alt="Avatar"
          width={420}
          height={420}
          className="relative z-10 object-contain"
        />
      </motion.div>

      {/* Nombre principal */}
      <motion.h1
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="z-10 text-4xl font-semibold tracking-tight md:text-5xl text-neutral-900 dark:text-neutral-50 transition-colors duration-700"
      >
        Hola, soy{" "}
        <span
          className={`font-bold ${resolvedTheme === "dark" ? "text-blue-400" : "text-blue-600"
            }`}
        >
          Tu Nombre
        </span>
      </motion.h1>

      {/* Subtítulo animado */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.7 }}
        className="z-10 mt-3 text-lg font-light text-neutral-700 dark:text-neutral-300 transition-colors duration-700"
      >
        {typedText}
      </motion.p>

      {/* Indicador scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 z-10 flex flex-col items-center text-neutral-500 dark:text-neutral-400"
      >
        <p className="text-sm mb-2">Desliza hacia abajo</p>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className="w-5 h-5 border-b-2 border-r-2 border-current rotate-45"
        />
      </motion.div>
    </section>
  );
}
