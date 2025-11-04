"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const NAV_OFFSET = 80;

function scrollToAnchor(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top: y, behavior: "smooth" });
}

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("inicio");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const sections = [
    { id: "inicio", label: "Inicio" },
    { id: "proyectos", label: "Proyectos" },
    { id: "experiencia", label: "Experiencia" },
    { id: "habilidades", label: "Habilidades" },
    { id: "educacion", label: "Educación" },
  ];

  // Detectar scroll para blur y sección activa
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= NAV_OFFSET + 40 && rect.bottom >= NAV_OFFSET + 40) {
            setActiveSection(section.id);
          }
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloquear scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  // Manejar clic en los enlaces
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMenuOpen(false);
    // Actualiza el hash (dispara hashchange → TabsSection cambiará de tab)
    window.location.hash = id;
    // Scroll suave con offset
    requestAnimationFrame(() => scrollToAnchor(id));
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
        ? "backdrop-blur-md bg-[var(--color-bg)]/80 border-b border-[var(--color-border)]"
        : "bg-transparent"
        }`}
    >
      <nav className="container flex items-center justify-between py-4">
        {/* Logo */}
        <a
          href="#inicio"
          onClick={(e) => handleAnchorClick(e, "inicio")}
          className="text-lg font-semibold text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors"
          aria-label="Ir al inicio"
        >
          Alán<span className="text-[var(--color-accent)]">.</span>
        </a>

        {/* Links Desktop */}
        <ul className="hidden md:flex gap-8 text-sm font-medium">
          {sections.map((section) => (
            <li key={section.id} className="relative group">
              <a
                href={`#${section.id}`}
                onClick={(e) => handleAnchorClick(e, section.id)}
                aria-current={activeSection === section.id ? "page" : undefined}
                className={`transition-colors ${activeSection === section.id
                  ? "text-[var(--color-accent)]"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                  }`}
              >
                {section.label}
              </a>
              <span
                className={`absolute left-0 -bottom-1 h-[2px] rounded-full transition-all duration-300 ${activeSection === section.id
                  ? "w-full bg-[var(--color-accent)]"
                  : "w-0 bg-transparent group-hover:w-full group-hover:bg-[var(--color-accent)]"
                  }`}
              />
            </li>
          ))}
        </ul>

        {/* ThemeToggle + botón menú móvil */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            className="md:hidden p-2 rounded-lg hover:bg-[var(--color-button-bg)] transition"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                fill="none"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Menú móvil animado */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed top-16 left-0 w-full h-[calc(100vh-64px)] bg-[var(--color-bg)]/95 backdrop-blur-md border-t border-[var(--color-border)] z-40"
            role="dialog"
            aria-modal="true"
          >
            <ul className="flex flex-col items-center justify-center gap-8 py-6 text-lg font-medium h-full">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={(e) => handleAnchorClick(e, section.id)}
                    aria-current={activeSection === section.id ? "page" : undefined}
                    className={`transition-colors ${activeSection === section.id
                      ? "text-[var(--color-accent)]"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                      }`}
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
