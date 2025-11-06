import { useEffect, useState } from "react";

export function useAccentColor() {
  const [accent, setAccent] = useState<string>("var(--color-accent)");

  useEffect(() => {
    if (typeof window === "undefined") return; // ✅ evita SSR crash

    const getAccent = () => {
      const root = document.documentElement;
      const color = getComputedStyle(root)
        .getPropertyValue("--color-accent")
        .trim();
      setAccent(color || "#4F46E5"); // fallback: azul elegante
    };

    // obtiene color inicial
    getAccent();

    // observa cambios de estilo dinámicos
    const observer = new MutationObserver(getAccent);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style"],
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  return accent;
}
