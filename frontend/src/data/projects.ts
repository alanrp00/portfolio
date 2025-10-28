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
    description: "Juego inspirado en Wordle, desarrollado en Kotlin con Jetpack Compose.",
    tech: ["Kotlin", "Jetpack Compose", "Navigation Compose", "DataStore", "MVVM"],
    link: "https://github.com/alanrp00/Palabro",
    images: ["/projects/palabro-1.png", "/projects/palabro-2.png"],
    details: {
      overview:
        "Juego Android con arquitectura MVVM y almacenamiento persistente mediante DataStore. Implementa una experiencia fluida con Jetpack Compose y navegación moderna.",
      features: [
        "Diseño UI 100 % Compose.",
        "Gestión de estado con ViewModel.",
        "Persistencia con DataStore.",
        "Navegación dinámica con Navigation Compose.",
      ],
    },
  },
  {
    title: "Portfolio",
    description: "Sitio web personal creado con Next.js, TypeScript y Framer Motion.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    link: "https://alanrp.dev",
    images: ["/projects/portfolio-1.png"],
    details: {
      overview:
        "Portfolio moderno, con animaciones suaves y tabs interactivos. Construido con arquitectura modular y estilo coherente basado en variables CSS.",
      features: [
        "Animaciones con Framer Motion.",
        "Diseño responsive.",
        "Sistema de tabs dinámicos.",
        "Tema oscuro con acento personalizado.",
      ],
    },
  },
  {
    title: "API Server",
    description: "Backend modular en Node.js y Express con MongoDB y Docker.",
    tech: ["Node.js", "Express", "MongoDB", "Docker"],
    link: "https://github.com/alanrp00/api-server",
    details: {
      overview:
        "API REST modular para proyectos personales y pruebas de integración, desplegable en Docker.",
      features: [
        "Estructura modular (controllers, routes).",
        "Endpoints CRUD seguros.",
        "Configuración Docker Compose.",
      ],
    },
  },
];
