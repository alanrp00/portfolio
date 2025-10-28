export type Experience = {
  title: string;
  company: string;
  period: string;
  description: string;
  tech?: string[];
};

export const experiences: Experience[] = [
  {
    title: "Desarrollador Android (Proyecto Palabro)",
    company: "Proyecto Personal",
    period: "2023 - 2024",
    description:
      "Desarrollo de un juego tipo Wordle desde cero utilizando Kotlin y Jetpack Compose. Arquitectura MVVM, persistencia local y animaciones fluidas.",
    tech: ["Kotlin", "Jetpack Compose", "DataStore", "MVVM"],
  },
  {
    title: "Desarrollador Full Stack (Portfolio)",
    company: "Freelance",
    period: "2024 - Actualidad",
    description:
      "Diseño y desarrollo de mi portfolio personal con Next.js, TypeScript y animaciones con Framer Motion. Sistema modular y estructura de secciones reutilizables.",
    tech: ["Next.js", "React", "TypeScript", "Framer Motion"],
  },
  {
    title: "Backend Developer (API Server)",
    company: "Proyecto Personal",
    period: "2024",
    description:
      "Creación de API REST modular en Node.js con Express y MongoDB. Despliegue con Docker Compose y gestión de entornos de desarrollo/producción.",
    tech: ["Node.js", "Express", "MongoDB", "Docker"],
  },
];
