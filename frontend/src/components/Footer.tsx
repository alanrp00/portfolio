"use client";

import ContactModal from "@/components/modals/ContactModal";
import { getIcon } from "@/utils/iconMap";
import Link from "next/link";
import { useEffect, useState } from "react";

type Social = {
  name: string;
  href?: string;     // opcional para Email (usa modal)
  icon: string;
  color?: string;
  sr?: string;
  isButton?: boolean;
};

export default function Footer() {
  const year = new Date().getFullYear();
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [openContact, setOpenContact] = useState(false);

  // Detectar tema desde data-theme (compat con tu ThemeToggle)
  useEffect(() => {
    const root = document.documentElement;
    const updateTheme = () => {
      const current = root.getAttribute("data-theme") as "light" | "dark" | null;
      if (current) setTheme(current);
    };
    updateTheme();
    const obs = new MutationObserver(updateTheme);
    obs.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  const SOCIALS: Social[] = [
    { name: "GitHub", href: "https://github.com/tu-usuario", icon: "FaGithub", color: theme === "dark" ? "#E5E5E5" : "#181717" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/tu-usuario", icon: "FaLinkedin", color: "#0A66C2" },
    { name: "Instagram", href: "https://www.instagram.com/tu-usuario", icon: "FaInstagram", color: "#E4405F" },
    { name: "Email", icon: "FaEnvelope", color: "#D14836", sr: "Abrir formulario de contacto", isButton: true },
  ];

  return (
    <footer id="footer" className="mt-14 border-t border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        {/* Socials (arriba y centradas en móvil; a la derecha en desktop) */}
        <div className="order-1 md:order-2 flex items-center justify-center gap-3 md:justify-end">
          {SOCIALS.map((s) => {
            const Icon = getIcon(s.icon);
            const commonClasses =
              "relative inline-flex items-center justify-center w-10 h-10 rounded-xl border border-[var(--color-border)] text-[var(--color-text-primary)] transition-all duration-300 hover:scale-110 overflow-hidden";

            const commonProps = {
              className: commonClasses,
              "aria-label": s.sr ?? s.name,
              style: { transition: "color 0.3s ease, border-color 0.3s ease" },
              onMouseEnter: (e: any) => {
                const el = e.currentTarget as HTMLElement;
                if (s.color) {
                  el.style.color = s.color;
                  el.style.borderColor = s.color;
                }
              },
              onMouseLeave: (e: any) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = "";
                el.style.borderColor = "var(--color-border)";
              },
              children: Icon ? <Icon className="w-5 h-5 relative z-10" /> : <span className="text-sm relative z-10">{s.name[0]}</span>,
            };

            return s.isButton ? (
              <button key={s.name} type="button" onClick={() => setOpenContact(true)} {...(commonProps as any)} />
            ) : (
              <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" {...(commonProps as any)} />
            );
          })}
        </div>

        {/* Copyright + MIT (debajo y centrado en móvil; a la izquierda en desktop) */}
        <div className="order-2 md:order-1 text-sm text-[var(--color-text-secondary)] text-center md:text-left">
          © {year} Alán Rivas — Licensed under{" "}
          <Link href="/LICENSE" className="underline hover:text-[var(--color-text-primary)]">
            MIT License
          </Link>.
        </div>
      </div>


      {/* Modal de contacto */}
      <ContactModal
        open={openContact}
        onClose={() => setOpenContact(false)}
        toEmail="tu-email@dominio.com"
      />
    </footer>
  );
}
