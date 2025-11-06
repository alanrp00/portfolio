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
    description_ext:
      "Palabro es un juego de adivinanza de palabras inspirado en Wordle, desarrollado para dispositivos Android utilizando Kotlin y Jetpack Compose. Los jugadores tienen seis intentos para adivinar una palabra de cinco letras, recibiendo pistas sobre la precisión de sus conjeturas. El juego ofrece múltiples temas visuales, estadísticas detalladas y almacenamiento persistente con Jetpack DataStore.",
    tech: [
      { name: "Kotlin", icon: "SiKotlin", color: "#7F52FF" },
      { name: "Jetpack Compose", icon: "SiJetpackcompose", color: "#4285F4" },
      { name: "Navigation Compose", icon: "FaAndroid", color: "#3DDC84" },
      { name: "DataStore", icon: "FaDatabase", color: "#FFCA28" },
      { name: "MVVM", icon: "FaCertificate", color: "#9E9E9E" },
      { name: "Android Studio", icon: "FaAndroid", color: "#3DDC84" },
      { name: "Material Design 3", icon: "FaPalette", color: "#FFC107" },
      { name: "Git", icon: "FaGitAlt", color: "#F05032" },
      { name: "GitHub", icon: "FaGithub", color: "#181717" },
    ],
    images: [
      "/images/projects/palabro/palabro-dark.png",
      "/images/projects/palabro/palabro-light.png",
      "/images/projects/palabro/palabro-dracula.png",
      "/images/projects/palabro/palabro-solarized.png",
      "/images/projects/palabro/palabro-pastel.png",
      "/images/projects/palabro/palabro-retro.png",
      "/images/projects/palabro/palabro-stats.png",
    ],
    github: "https://github.com/alanrp00/Palabro",
  },
  {
    title: "Portfolio",
    description:
      "Sitio web personal desarrollado con Next.js y TypeScript.",
    description_ext:
      "Este portfolio personal ha sido desarrollado utilizando Next.js y TypeScript, con animaciones fluidas a través de Framer Motion y un diseño totalmente responsivo con Tailwind CSS. Implementa modo oscuro y claro, optimización de imágenes y estructura modular de componentes, además de integración con MongoDB y backend Express para gestión de contacto y datos.",
    tech: [
      { name: "Next.js", icon: "SiNextdotjs", color: "#000000" },
      { name: "React", icon: "FaReact", color: "#61DAFB" },
      { name: "TypeScript", icon: "SiTypescript", color: "#3178C6" },
      { name: "Tailwind CSS", icon: "SiTailwindcss", color: "#38BDF8" },
      { name: "Framer Motion", icon: "SiFramer", color: "#0055FF" },
      { name: "Node.js", icon: "FaNodeJs", color: "#68A063" },
      { name: "Express", icon: "SiExpress", color: "#000000" },
      { name: "MongoDB", icon: "SiMongodb", color: "#47A248" },
      { name: "Docker", icon: "FaDocker", color: "#2496ED" },
      { name: "Git", icon: "FaGitAlt", color: "#F05032" },
      { name: "GitHub", icon: "FaGithub", color: "#181717" },
      { name: "Vercel", icon: "SiVercel", color: "#000000" },
    ],
    images: [
      "/images/projects/portfolio/portfolio-dark-home.gif",
      "/images/projects/portfolio/portfolio-light-home.gif",
      "/images/projects/portfolio/portfolio-dark-projects.png",
      "/images/projects/portfolio/portfolio-light-projects.png",
      "/images/projects/portfolio/portfolio-dark-skills.png",
      "/images/projects/portfolio/portfolio-light-skills.png",
      "/images/projects/portfolio/portfolio-dark-experience.png",
      "/images/projects/portfolio/portfolio-light-experience.png",
      "/images/projects/portfolio/portfolio-dark-education.png",
      "/images/projects/portfolio/portfolio-light-education.png",
    ],
    github: "https://github.com/alanrp00/portfolio",
  },
];
