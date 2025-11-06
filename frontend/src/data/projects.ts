export interface Project {
  title: string;
  description: string;
  description_ext: string;
  images?: string[];
  tech?: { name: string; icon?: string; color?: string }[];
  link?: string;
  details?: {
    overview: string;
    features?: string[];
  };
  github?: string;
}

export const projects: Project[] = [
  {
    title: "Palabro",
    description:
      "Juego inspirado en Wordle, partidas ilimitadas y múltiples temas visuales.",
    description_ext: "Palabro es un juego de adivinanza de palabras inspirado en Wordle, desarrollado para dispositivos Android utilizando Kotlin y Jetpack Compose. Los jugadores tienen seis intentos para adivinar una palabra de cinco letras, recibiendo pistas sobre la precisión de sus conjeturas. El juego ofrece múltiples temas visuales y estadísticas detalladas para mejorar la experiencia del usuario.",
    tech: [
      { name: "Kotlin", icon: "FaJava", color: "#7F52FF" },
      { name: "Jetpack Compose", icon: "FaReact", color: "#4285F4" },
      { name: "Navigation Compose", icon: "FaGoogle", color: "#34A853" },
      { name: "DataStore", icon: "FaDatabase", color: "#FFCA28" },
    ],
    images: [
      "/images/projects/palabro/palabro-dark.png",
      "/images/projects/palabro/palabro-light.png",
      "/images/projects/palabro/palabro-dracula.png",
      "/images/projects/palabro/palabro-solarized.png",
      "/images/projects/palabro/palabro-pastel.png",
      "/images/projects/palabro/palabro-retro.png",
      "/images/projects/palabro/palabro-stats.png"
    ],
    github: "https://github.com/alanrp00/Palabro"
  },
  {
    title: "Portfolio",
    description:
      "Sitio web personal desarrollado con Next.js y TypeScript.",
    description_ext: "Este sitio web personal ha sido desarrollado utilizando Next.js y TypeScript, con animaciones implementadas mediante Framer Motion. El diseño es completamente responsivo, asegurando una experiencia óptima en dispositivos móviles y de escritorio. El sitio presenta un modo oscuro y claro, permitiendo a los usuarios elegir su preferencia visual. Además, se han optimizado las imágenes para mejorar los tiempos de carga y el rendimiento general del sitio.",
    tech: [
      { name: "Next.js", icon: "FaReact", color: "#000000" },
      { name: "TypeScript", icon: "FaJsSquare", color: "#3178C6" },
      { name: "Tailwind CSS", icon: "FaCss3Alt", color: "#06B6D4" },
    ],
    images: [
      "/images/projects/portfolio/portfolio-dark-home.gif",
      "/images/projects/portfolio/portfolio-light-home.gif",
      "/images/projects/portfolio/portfolio-dark-projects.png",
      "/images/projects/portfolio/portfolio-light-projects.png",
      "/images/projects/portfolio/portfolio-dark-experience.png",
      "/images/projects/portfolio/portfolio-light-experience.png"
    ],
  },
];
