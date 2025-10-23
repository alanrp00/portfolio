"use client";

import { useTypingEffect } from "@/hooks/useTypingEffect";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  const { text, isTyping } = useTypingEffect(
    ["Desarrollador Full Stack Junior", "Apasionado por la tecnología", "Amante del diseño limpio"],
    90,
    1500
  );

  return (
    <section
      id="inicio"
      className="relative flex flex-col items-center justify-center min-h-screen text-center container"
    >
      {/* Avatar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="card mb-8 w-40 h-40 flex items-center justify-center overflow-hidden"
      >
        <Image
          src="/avatar.png"
          alt="Alán avatar"
          width={160}
          height={160}
          className="rounded-xl object-cover"
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

      {/* Texto typing */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-[var(--color-text-secondary)] text-lg md:text-xl mb-8"
      >
        <span>{text}</span>
        {isTyping && <span className="cursor-underscore">_</span>}
      </motion.p>

      {/* Botones */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="flex flex-wrap justify-center gap-4"
      >
        <a href="#contacto" className="btn btn-primary">
          Contactarme
        </a>
        <a
          href="/cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
        >
          Descargar CV
        </a>
      </motion.div>

      {/* Flecha hacia abajo fija en parte baja */}
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
