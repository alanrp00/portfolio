"use client";

import { getIcon } from "@/utils/iconMap";
import Link from "next/link";
import { useEffect, useState } from "react";

type Social = {
  name: string;
  href: string;
  icon: string;
  color: string;
  sr?: string;
};

export default function Footer() {
  const year = new Date().getFullYear();
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // 🔄 Detectar el tema a través del atributo data-theme (usado por ThemeToggle.tsx)
  useEffect(() => {
    const root = document.documentElement;

    const updateTheme = () => {
      const current = root.getAttribute("data-theme") as "light" | "dark" | null;
      if (current) setTheme(current);
    };

    // Ejecutar al montar
    updateTheme();

    // Escuchar cambios de atributo (cuando el usuario cambia el tema)
    const observer = new MutationObserver(updateTheme);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });

    return () => observer.disconnect();
  }, []);

  // 🎨 Colores oficiales
  const SOCIALS: Social[] = [
    {
      name: "GitHub",
      href: "https://github.com/tu-usuario",
      icon: "FaGithub",
      color: theme === "dark" ? "#E5E5E5" : "#181717", // gris claro en oscuro, negro en claro
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/tu-usuario",
      icon: "FaLinkedin",
      color: "#0A66C2",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/tu-usuario",
      icon: "FaInstagram",
      color: "#E4405F",
    },
    {
      name: "Email",
      href: "mailto:tu-email@dominio.com",
      icon: "FaEnvelope",
      color: "#D14836",
      sr: "Enviar email",
    },
  ];

  return (
    <footer
      id="footer"
      className="mt-14 border-t border-[var(--color-border)] bg-[var(--color-bg)]"
    >
      <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        {/* Copyright + MIT */}
        <div className="text-sm text-[var(--color-text-secondary)]">
          © {year} Alán Rivas — Licensed under{" "}
          <Link href="/LICENSE" className="underline hover:text-[var(--color-text-primary)]">
            MIT License
          </Link>
          .
        </div>

        {/* Socials */}
        <div className="flex items-center gap-3">
          {SOCIALS.map((s) => {
            const Icon = getIcon(s.icon);
            return (
              <Link
                key={s.name}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-[var(--color-border)] text-[var(--color-text-primary)] transition-all duration-300 hover:scale-110"
                aria-label={s.sr ?? s.name}
                style={{
                  transition: "color 0.3s ease, border-color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = s.color;
                  (e.currentTarget as HTMLElement).style.borderColor = s.color;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "";
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
                }}
              >
                {Icon ? <Icon className="w-5 h-5" /> : <span className="text-sm">{s.name[0]}</span>}
              </Link>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
