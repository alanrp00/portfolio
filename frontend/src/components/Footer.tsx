// frontend/src/components/layout/Footer.tsx
"use client";

import { getIcon } from "@/utils/iconMap";
import Link from "next/link";

type Social = {
  name: string;
  href: string;
  icon: string; // clave que exista en tu iconMap (p.ej. "Github", "Linkedin", "Twitter", "Mail")
  sr?: string;
};

const SOCIALS: Social[] = [
  { name: "GitHub", href: "https://github.com/tu-usuario", icon: "Github" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/tu-usuario", icon: "Linkedin" },
  { name: "X", href: "https://x.com/tu-usuario", icon: "Twitter" },
  { name: "Email", href: "mailto:tu-email@dominio.com", icon: "Mail", sr: "Enviar email" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="footer"
      className="mt-14 border-t border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        {/* Copyright + MIT */}
        <div className="text-sm text-[var(--color-text-secondary)]">
          © {year} Alán Rivas — Licensed under the{" "}
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
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-[var(--color-border)] hover:border-[var(--accent)] text-[var(--color-text-primary)] transition-colors"
                aria-label={s.sr ?? s.name}
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
