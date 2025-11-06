export type Experience = {
  title: string;
  company: string;
  period: string;
  description?: string;
  points: string[];
  tech?: string[];
  scope?: "personal" | "work";
};

export const experiences: Experience[] = [
  {
    title: "Desarrollador Full Stack (Portfolio)",
    company: "Proyecto Personal",
    period: "2025 - Actualidad",
    points: [
      "Diseño y desarrollo de un portfolio web moderno con Next.js y TypeScript.",
      "Implementación de animaciones con Framer Motion y diseño responsivo con Tailwind CSS.",
      "Integración de backend con Node.js, Express y base de datos MongoDB.",
      "Optimización SEO y despliegue mediante Vercel y Docker.",
    ],
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Node.js",
      "Express",
      "MongoDB",
      "Docker",
      "Git",
      "GitHub",
      "Vercel",
    ],
    scope: "personal",
  },
  {
    title: "Desarrollador Android (Proyecto Palabro)",
    company: "Proyecto Personal",
    period: "2023 - 2024",
    points: [
      "Desarrollo de un juego tipo Wordle desde cero utilizando Kotlin y Jetpack Compose.",
      "Implementación de arquitectura MVVM y persistencia local con Jetpack DataStore.",
      "Diseño de animaciones fluidas y UI adaptada a Material Design 3.",
      "Gestión del ciclo de vida de la app y navegación con Navigation Compose.",
    ],
    tech: [
      "Kotlin",
      "Jetpack Compose",
      "DataStore",
      "MVVM",
      "Material Design 3",
      "Android Studio",
      "Git",
      "GitHub",
    ],
    scope: "personal",
  },
  {
    title: "Tester Junior",
    company: "Viewnext",
    period: "2022 - 2024",
    points: [
      "Pruebas funcionales y automatizadas de software empleando Selenium y Jira.",
      "Diseño de casos de prueba y validación de flujos de usuario.",
      "Automatización de tareas mediante scripts en Java y JavaScript.",
      "Documentación de incidencias y comunicación con el equipo de QA y desarrollo.",
    ],
    tech: ["Java", "JavaScript", "Selenium", "Jira", "Git"],
    scope: "work",
  },
  {
    title: "Estudiante en prácticas de desarrollo",
    company: "Viewnext",
    period: "2021 - 2022",
    points: [
      "Desarrollo de scripts en JavaScript para automatización interna.",
      "Pruebas de llamadas API REST con Postman.",
      "Aprendizaje de frameworks como React y Node.js en entornos empresariales.",
    ],
    tech: ["JavaScript", "Postman", "React", "Node.js"],
    scope: "work",
  },
];
