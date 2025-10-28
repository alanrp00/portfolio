import { useEffect, useState } from "react";

export function useAccentColor() {
  const [accent, setAccent] = useState<string>(
    getComputedStyle(document.documentElement).getPropertyValue("--color-accent").trim()
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const newColor = getComputedStyle(document.documentElement)
        .getPropertyValue("--color-accent")
        .trim();
      setAccent(newColor);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style"],
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  return accent;
}
