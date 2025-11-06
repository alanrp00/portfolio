export type EducationItem = {
  title: string;
  center: string;
  date: string;
  description?: string;
  icon?: string;
  color?: string;
};

export type CertificateItem = {
  title: string;
  provider: string;
  date?: string;
  icon?: string;
  color?: string;
  url?: string;
};

export const formalEducation: EducationItem[] = [
  {
    title: "Ciclo Superior en Desarrollo de Aplicaciones Web",
    center: "CIFP A Carballeira",
    date: "2025 - En curso",
    description:
      "Formación avanzada en desarrollo de aplicaciones web, tanto frontend como backend, incluyendo bases de datos y servicios web.",
    icon: "FaReact",
    color: "#61DAFB",
  },
  {
    title: "Ciclo Superior en Desarrollo de Aplicaciones Multiplataforma",
    center: "CIFP A Carballeira",
    date: "2020 - 2022",
    description:
      "Formación avanzada en desarrollo de software multiplataforma, bases de datos, entornos móviles y web.",
    icon: "FaJava",
    color: "#E76F00",
  },
  {
    title: "Ciclo Medio en Sistemas Microinformáticos y Redes",
    center: "IES San Mamede",
    date: "2018 - 2020",
    description:
      "Administración de sistemas, mantenimiento de hardware y redes locales.",
    icon: "FaNetworkWired",
    color: "#3B82F6",
  },
];

export const certificates: CertificateItem[] = [
  {
    title: "Fundamentos de Desarrollo Web",
    provider: "IBM SkillsBuild",
    date: "2025",
    icon: "FaHtml5",
    color: "#e96228",
    url: "/certs/fundamentos-desarrollo-web.pdf",
  },
  {
    title: "Programando en Python: Algoritmos",
    provider: "IBM SkillsBuild",
    date: "2025",
    icon: "FaPython",
    color: "#417bac",
    url: "/certs/programando-python-algoritmos.pdf",
  },
  {
    title: "Conceptos básicos de Python",
    provider: "IBM SkillsBuild",
    date: "2025",
    icon: "FaPython",
    color: "#417bac",
    url: "/certs/conceptos-basicos-python.pdf",
  },
  {
    title: "Google: IA y productividad",
    provider: "Santander Open Academy",
    date: "2025",
    icon: "FaPython",
    color: "#417bac",
    url: "/certs/google-ia-productividad.pdf",
  },
];
