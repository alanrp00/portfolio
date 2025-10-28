// /data/projects.ts

export type Project = {
  title: string;
  description: string;
  tech: string[];
  link?: string;
  images?: string[];
  details?: {
    overview?: string;
    features?: string[];
  };
};

export const projects: Project[] = [
  {
    title: "Palabro",
    description: "Juego basado en Wordle, pero con partidas infinitas y estadísticas locales.",
    tech: ["Kotlin", "Jetpack Compose", "Navigation Compose", "DataStore", "MVVM"],
    link: "https://github.com/alanrp00/Palabro",
    images: ["/projects/palabro-1.png", "/projects/palabro-2.png"],
    details: {
      overview:
        "Palabro es un juego inspirado en Wordle, desarrollado en Kotlin con Jetpack Compose. Cuenta con partidas infinitas y persistencia de datos con Jetpack DataStore.",
      features: [
        "Partidas infinitas y modo diario.",
        "Diseño moderno con Jetpack Compose.",
        "Persistencia de datos con Jetpack DataStore.",
        "Arquitectura MVVM con una sola Activity.",
        "Navegación fluida con Navigation Compose.",
      ],
    },
  },
  {
    title: "Portfolio",
    description: "Mi sitio web personal desarrollado con Next.js, TypeScript y animaciones con Framer Motion.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    link: "https://alanrp.dev",
    images: ["/projects/portfolio-1.png", "/projects/portfolio-2.png"],
    details: {
      overview:
        "Portfolio personal minimalista con animaciones suaves, layout responsive y estructura modular. Implementa un sistema de tabs interactivo para mostrar experiencia, proyectos y skills.",
      features: [
        "Diseño responsive y accesible.",
        "Animaciones con Framer Motion.",
        "Gestión modular de secciones con React y TypeScript.",
        "Estilo visual coherente con variables CSS y tema oscuro.",
      ],
    },
  },
  {
    title: "API Server",
    description: "Backend modular con Node.js y MongoDB para servicios personales y pruebas de integración.",
    tech: ["Node.js", "Express", "MongoDB", "Docker"],
    link: "https://github.com/alanrp00/api-server",
    details: {
      overview:
        "API REST creada con Node.js y Express, conectada a MongoDB, lista para desplegar en contenedores Docker.",
      features: [
        "Estructura modular con controladores y rutas.",
        "Configuración Docker para entorno de desarrollo y producción.",
        "Endpoints CRUD seguros con validación.",
      ],
    },
  },
];
