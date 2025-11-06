export type Experience = {
  title: string;
  company: string;
  period: string;
  points: string[];
  tech?: string[];
  scope?: "personal" | "work";
};

export const experiences: Experience[] = [
  {
    title: "Desarrollador Android (Proyecto Palabro)",
    company: "Proyecto Personal",
    period: "2023 - 2024",
    points: [
      "Desarrollo de un juego tipo Wordle desde cero utilizando Kotlin y Jetpack Compose.",
      "Implementación de arquitectura MVVM y persistencia local con Jetpack DataStore.",
      "Diseño de animaciones fluidas y UI adaptada a Material Design 3."
    ],
    tech: ["Kotlin", "Jetpack Compose", "MVVM", "DataStore", "Android"],
    scope: "personal",
  },
  {
    title: "Desarrollador Full Stack (Portfolio)",
    company: "Proyecto Personal",
    period: "2025 - Actualidad",
    points: [
      "Diseño y desarrollo de mi portfolio personal con Next.js, TypeScript y React.",
      "Integración de animaciones suaves con Framer Motion y estilos con TailwindCSS.",
      "Estructura modular con componentes reutilizables y gestión de estado ligera."
    ],
    tech: ["Next.js", "React", "TypeScript", "Framer Motion", "TailwindCSS"],
    scope: "personal",
  },
  {
    title: "Tester Junior",
    company: "Viewnext",
    period: "09/2022 - 02/2024",
    points: [
      "Colaboración en pruebas de calidad de software con Selenium y Jira.",
      "Automatización de pruebas a través de scripts en Java y JavaScript.",
      "Documentación de resultados y coordinación con el equipo de QA."
    ],
    tech: ["Java", "JavaScript", "Selenium", "Jira"],
    scope: "work",
  },
  {
    title: "Estudiante en prácticas de desarrollo",
    company: "Viewnext",
    period: "04/2022 - 09/2022",
    points: [
      "Desarrollo de una aplicación empresarial en Java.",
      "Diseño y mantenimiento de estructuras SQL.",
      "Pruebas de API REST con Postman."
    ],
    tech: ["Java", "SQL", "Postman"],
    scope: "work",
  },
  {
    title: "Estudiante en prácticas de desarrollo",
    company: "Viewnext",
    period: "05/2021 - 09/2021",
    points: [
      "Desarrollo de scripts en JavaScript.",
      "Aprendizaje de frameworks como React y Node.js."
    ],
    tech: ["JavaScript", "React", "Node.js"],
    scope: "work",
  },
];
