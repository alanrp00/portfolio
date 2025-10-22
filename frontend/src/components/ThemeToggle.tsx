"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Espera a que el componente se monte en el cliente
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // Evita el renderizado en el servidor para prevenir errores de hidratación
    return (
      <button
        disabled
        className="p-2 rounded-md border opacity-50 cursor-not-allowed"
      >
        🌙
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="p-2 rounded-md border hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
