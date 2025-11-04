"use client";

import { useAccentColor } from "@/hooks/useAccentColor";
import { useTypingEffect } from "@/hooks/useTypingEffect";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  const { text, isTyping } = useTypingEffect(
    [
      "Desarrollador Full Stack Junior",
      "Apasionado por la tecnología",
      "Siempre aprendiendo",
    ],
    90,
    1500
  );

  const accent = useAccentColor();
  // TODO: Actualizar link al CV
  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center min-h-screen text-center container"
    >
      {/* 🧑‍💻 Avatar con glow y sombra flotante 3D */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        whileHover={{
          scale: 1.05,
          y: -5,
          boxShadow: `0 20px 45px ${accent}33, 0 0 30px ${accent}`,
          borderColor: accent,
        }}
        className="relative mb-8 w-64 h-64 flex items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-card-bg)] shadow-[0_12px_24px_rgba(0,0,0,0.25)] overflow-hidden transition-all duration-500"
      >
        {/* 🌌 Glow ambiental dinámico */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${accent} 0%, transparent 70%)`,
            filter: "blur(35px)",
          }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.06, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* 🖼️ Imagen principal */}
        <div className="relative z-10 w-full h-full flex items-center justify-center rounded-2xl overflow-hidden">
          <Image
            src="/avatar.png"
            alt="Alán avatar"
            fill
            className="object-contain rounded-2xl"
            sizes="(max-width: 768px) 100vw, 256px"
            priority
          />
        </div>

        {/* 💡 Borde dinámico */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 pointer-events-none"
          style={{ borderColor: accent }}
          animate={{
            opacity: [0.3, 0.9, 0.3],
            boxShadow: [
              `0 0 0px ${accent}`,
              `0 0 25px ${accent}`,
              `0 0 0px ${accent}`,
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Nombre principal */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold mb-3"
      >
        Hola, soy <span className="text-[var(--color-accent)]">Alán</span>
      </motion.h1>

      {/* Texto con efecto typing */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-[var(--color-text-secondary)] text-lg md:text-xl mb-8"
      >
        <span>{text}</span>
        {isTyping && <span className="cursor-underscore">_</span>}
      </motion.p>

      {/* Botones principales */}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="flex flex-wrap justify-center gap-4"
      >
        <a
          href="/cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
        >
          Descargar CV
        </a>
      </motion.div>

      {/* Flecha hacia abajo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <ArrowDown
          className="w-6 h-6 text-[var(--color-text-secondary)] bounce-down"
          strokeWidth={1.5}
        />
      </motion.div>
    </section>
  );
}
