"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * ThemeToggle — componente de cambio de tema (oscuro / claro)
 * Compatible con variables definidas en globals.css usando [data-theme]
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // Al montar, lee la preferencia del sistema o del localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initialTheme = prefersDark ? "dark" : "light";
      setTheme(initialTheme);
      document.documentElement.setAttribute("data-theme", initialTheme);
    }
  }, []);

  // Cuando cambia el tema, actualiza el DOM y guarda preferencia
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Cambiar tema"
      className="p-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-button-bg)] 
                 text-[var(--color-text-primary)] hover:border-[var(--color-accent)] transition-all"
    >
      {theme === "dark" ? (
        <Sun size={18} strokeWidth={1.8} />
      ) : (
        <Moon size={18} strokeWidth={1.8} />
      )}
    </button>
  );
}
