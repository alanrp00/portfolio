export interface Project {
  title: string;
  description: string;
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
      "Juego inspirado en Wordle, desarrollado en Kotlin con Jetpack Compose.",
    tech: [
      { name: "Kotlin", icon: "FaJava", color: "#7F52FF" },
      { name: "Jetpack Compose", icon: "FaReact", color: "#4285F4" },
      { name: "Navigation Compose", icon: "FaGoogle", color: "#34A853" },
      { name: "DataStore", icon: "FaDatabase", color: "#FFCA28" },
    ],
    images: [
      "/images/projects/palabro-dark.png",
      "/images/projects/palabro-light.png",
      "/images/projects/palabro-dracula.png",
      "/images/projects/palabro-solarized.png",
      "/images/projects/palabro-pastel.png",
      "/images/projects/palabro-retro.png",
      "/images/projects/palabro-stats.png"
    ],
    github: "https://github.com/alanrp00/Palabro"
  },
  {
    title: "Portfolio",
    description:
      "Sitio web personal desarrollado con Next.js, TypeScript y Framer Motion.",
    tech: [
      { name: "Next.js", icon: "FaReact", color: "#000000" },
      { name: "TypeScript", icon: "FaJsSquare", color: "#3178C6" },
      { name: "Tailwind CSS", icon: "FaCss3Alt", color: "#06B6D4" },
    ],
    images: ["/images/portfolio1.png"],
  },
  {
    title: "API Server",
    description:
      "Backend modular en Node.js y Express con MongoDB y Docker.",
    tech: [
      { name: "Node.js", icon: "FaNodeJs", color: "#68A063" },
      { name: "Express", icon: "FaJsSquare", color: "#F7DF1E" },
      { name: "MongoDB", icon: "FaDatabase", color: "#47A248" },
      { name: "Docker", icon: "FaDocker", color: "#2496ED" },
    ],
    images: ["/images/api1.png"],
  },
];
