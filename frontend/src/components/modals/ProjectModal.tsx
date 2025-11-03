"use client";

import { type Project } from "@/data/projects";
import { useAccentColor } from "@/hooks/useAccentColor";
import { getIcon } from "@/utils/iconMap";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Props = { project: Project; onClose: () => void };

const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];
const CARD_SPRING = { type: "spring", stiffness: 360, damping: 28, mass: 0.9 } as const;

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: EASE, when: "beforeChildren", staggerChildren: 0.06 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
};

const slide = (direction: number): Variants => ({
  enter: { x: direction > 0 ? 40 : -40, opacity: 0 },
  center: { x: 0, opacity: 1, transition: { duration: 0.28, ease: EASE } },
  exit: { x: direction > 0 ? -40 : 40, opacity: 0, transition: { duration: 0.24, ease: EASE } },
});

export default function ProjectModal({ project, onClose }: Props) {
  const accent = useAccentColor();
  const accentVar = { ["--accent" as any]: accent } as React.CSSProperties;
  const repoUrl = project.github;;
  const GithubIcon = getIcon("FaGithub");

  const imgs = useMemo(() => project.images ?? [], [project.images]);
  const hasImages = imgs.length > 0;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const paginate = (dir: number) => {
    if (!hasImages) return;
    setDirection(dir);
    setIndex((i) => (i + dir + imgs.length) % imgs.length);
  };
  const DRAG_THRESHOLD = 60;

  // scroll y bloqueo body
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const onScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setScrolled(el.scrollTop > 2);
  }, []);
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);
  const onKey = useCallback((e: KeyboardEvent) => { if (e.key === "Escape") onClose(); }, [onClose]);
  useEffect(() => {
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onKey]);

  return (
    <>
      <motion.div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[2px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: EASE }}
        onClick={onClose}
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`Detalles del proyecto ${project.title}`}
        className="fixed inset-0 z-[60] grid place-items-center p-4 md:p-6"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={CARD_SPRING}
        onClick={onClose}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          layout
          style={accentVar}
          className="relative w-full max-w-5xl rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-card-bg)] shadow-lg"
        >
          {/* HEADER */}
          <div
            className={[
              "sticky top-0 z-10 flex items-center justify-between gap-4 p-5 md:p-6",
              "border-b border-[var(--color-border)]",
              "bg-[var(--color-card-bg)]/90 backdrop-blur supports-[backdrop-filter]:bg-[var(--color-card-bg)]/75",
              "rounded-t-2xl",
              scrolled ? "shadow-sm" : "shadow-none",
            ].join(" ")}
          >
            <h2 className="text-xl md:text-2xl font-semibold text-[var(--color-text-primary)]">
              Detalles del proyecto
            </h2>
            <motion.button
              onClick={onClose}
              aria-label="Cerrar (Esc)"
              title="Cerrar (Esc)"
              className="group inline-flex h-9 w-9 items-center justify-center rounded-full
             border border-[var(--color-border)]/70 bg-[var(--color-card-bg)]/70
             backdrop-blur hover:bg-[var(--accent)]/10
             shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              whileHover={{ scale: 1.06, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 500, damping: 28 }}
            >
              <XMarkIcon className="h-5 w-5 transition-colors text-[var(--color-text-secondary)] group-hover:text-[var(--accent)]" />
            </motion.button>
          </div>

          {/* CUERPO */}
          <motion.div
            ref={scrollRef}
            onScroll={onScroll}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="max-h-[90vh] overflow-y-auto px-5 md:px-6"
          >
            {/* TÍTULO + BOTÓN GITHUB (alineado izq/der y con separación) */}
            <motion.div
              variants={itemVariants}
              className="pt-5 md:pt-6 mb-6 grid grid-cols-[1fr_auto] items-center gap-3 w-full"
            >
              <h3 className="!text-left text-2xl md:text-3xl font-semibold text-[var(--color-text-primary)] leading-snug">
                {project.title}
              </h3>

              {repoUrl && (
                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl px-3 py-2 border border-[var(--accent)]
             text-[var(--accent)] hover:bg-[var(--accent)]/10 transition-all duration-200 ease-out
             focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                  title="Ver en GitHub"
                >
                  <motion.span
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="inline-flex items-center gap-2"
                  >
                    <GithubIcon className="w-5 h-5" />
                    {/* 👇 texto oculto en móvil */}
                    <span className="hidden sm:inline text-sm font-medium">Ver en GitHub</span>
                  </motion.span>
                </a>

              )}
            </motion.div>


            {/* CARRUSEL */}
            <motion.div variants={itemVariants} className="relative rounded-2xl overflow-hidden">
              <div className="bg-[var(--color-card-bg)] grid place-items-center">
                {hasImages ? (
                  <div className="relative w-full h-[280px] md:h-[360px]">
                    <AnimatePresence custom={direction} mode="popLayout">
                      <motion.img
                        key={index}
                        src={imgs[index]}
                        alt={`${project.title} image ${index + 1}`}
                        className="absolute inset-0 w-full h-full object-contain select-none"
                        variants={slide(direction)}
                        custom={direction}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        drag="x"
                        dragElastic={0.08}
                        onDragEnd={(_, info) => {
                          const offset = info.offset.x;
                          if (offset > DRAG_THRESHOLD) paginate(-1);
                          else if (offset < -DRAG_THRESHOLD) paginate(1);
                        }}
                      />
                    </AnimatePresence>
                  </div>
                ) : (
                  <div className="w-full h-[220px] md:h-[300px] grid place-items-center text-[var(--color-text-secondary)]">
                    Sin imágenes
                  </div>
                )}
              </div>

              {hasImages && imgs.length > 1 && (
                <>
                  <motion.button
                    onClick={() => paginate(-1)}
                    aria-label="Anterior"
                    className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-xl px-2.5 py-2 bg-[color:var(--color-card-bg)]/70 border border-[var(--color-border)] shadow-sm backdrop-blur focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                    whileHover={{ scale: 1.05, rotate: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronLeftIcon className="w-5 h-5" />
                  </motion.button>

                  <motion.button
                    onClick={() => paginate(1)}
                    aria-label="Siguiente"
                    className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-xl px-2.5 py-2 bg-[color:var(--color-card-bg)]/70 border border-[var(--color-border)] shadow-sm backdrop-blur focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                    whileHover={{ scale: 1.05, rotate: 3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronRightIcon className="w-5 h-5" />
                  </motion.button>

                  <div className="absolute -bottom-3 left-0 right-0 flex justify-center">
                    <div className="rounded-full bg-[var(--color-card-bg)]/85 px-2 py-1 shadow-sm border border-[var(--color-border)]">
                      <div className="flex items-center gap-1.5">
                        {imgs.map((_, i) => (
                          <motion.span
                            key={i}
                            className={`h-1.5 rounded-full ${index === i ? "bg-[var(--accent)]" : "bg-[var(--color-border)]"}`}
                            animate={{ width: index === i ? 16 : 8 }}
                            transition={{ duration: 0.2, ease: EASE }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>

            {/* GRID 60/40 */}
            <motion.div
              variants={itemVariants}
              className="pt-8 pb-6 md:pb-7 grid grid-cols-1 gap-8 md:[grid-template-columns:3fr_2fr]"
            >
              <div className="space-y-6 text-left">
                <section>
                  <h4 className="text-[var(--color-text-primary)] font-semibold mb-2">
                    Descripción del proyecto
                  </h4>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed">
                    {project.details?.overview ?? project.description}
                  </p>
                </section>
              </div>

              <div className="space-y-6 text-left">
                <section>
                  <h4 className="text-[var(--color-text-primary)] font-semibold mb-2">
                    Tecnologías
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(project.tech ?? []).map((t) => {
                      const Icon = getIcon(t.icon ?? t.name);
                      return (
                        <span
                          key={`${project.title}-${t.name}`}
                          className="inline-flex items-center gap-1.5 text-sm px-2.5 py-1 rounded-full border border-[var(--accent)] bg-[var(--color-card-bg)] hover:bg-[var(--accent)]/10 transition-colors"
                          title={t.name}
                        >
                          {Icon && <Icon className="w-4 h-4" style={{ color: t.color ?? accent }} />}
                          <span className="text-[var(--color-text-secondary)]">{t.name}</span>
                        </span>
                      );
                    })}
                  </div>
                </section>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}
