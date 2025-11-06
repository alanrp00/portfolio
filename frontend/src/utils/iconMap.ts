// src/utils/iconMap.ts
import {
  FaAndroid,
  // FontAwesome
  FaApple,
  FaAws,
  FaBootstrap,
  FaCertificate,
  FaCss3Alt,
  FaDatabase,
  FaDocker,
  FaEnvelope,
  FaFigma,
  FaGitAlt,
  FaGithub,
  FaGitlab,
  FaGoogle,
  FaHtml5,
  FaInstagram,
  FaJava,
  FaJsSquare,
  FaLinkedin,
  FaLinux,
  FaNodeJs,
  FaPython,
  FaReact,
  FaSass,
  FaWindows,
} from "react-icons/fa";

import {
  SiCplusplus,
  SiDjango,
  SiDocker,
  SiExpress,
  SiFirebase,
  SiFramer,
  SiIntellijidea,
  SiJetbrains,
  SiJetpackcompose,
  SiJira,
  SiKotlin,
  SiKubernetes,
  SiMongodb,
  SiMysql,
  // SimpleIcons
  SiNextdotjs,
  SiNotion,
  SiPhp,
  SiPostman,
  SiPrisma,
  SiRedux,
  SiSelenium,
  SiSpring,
  SiSqlite,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite
} from "react-icons/si";

/**
 * 🧠 Mapa centralizado de iconos para todo el portfolio.
 * Permite acceder a los iconos por su nombre (ej: "FaReact", "SiNextdotjs", etc.)
 * sin tener que importarlos individualmente.
 */
export const iconMap: Record<string, React.ElementType> = {
  // --- FRONTEND ---
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaBootstrap,
  FaSass,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiRedux,
  SiVite,

  // --- BACKEND / LENGUAJES ---
  FaNodeJs,
  FaPython,
  FaJava,
  FaDatabase,
  SiExpress,
  SiMongodb,
  SiSqlite,
  SiMysql,
  SiPhp,
  SiCplusplus,
  SiDjango,
  SiSpring,
  SiPrisma,
  SiSupabase,

  // --- ANDROID / KOTLIN ---
  FaAndroid,
  SiKotlin,
  SiJetpackcompose,
  SiJetbrains,
  SiIntellijidea,

  // --- DEVOPS / CLOUD ---
  FaDocker,
  SiDocker,
  FaAws,
  FaGoogle,
  FaGitAlt,
  FaGithub,
  FaGitlab,
  SiFirebase,
  SiVercel,
  SiKubernetes,

  // --- TESTING / QA ---
  SiSelenium,
  SiJira,

  // --- HERRAMIENTAS / DISEÑO ---
  FaFigma,
  SiPostman,
  SiNotion,

  // --- SISTEMAS OPERATIVOS ---
  FaLinux,
  FaWindows,
  FaApple,

  // --- REDES SOCIALES / CONTACTO ---
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
};

/**
 * Devuelve el icono correspondiente al nombre (clave exacta),
 * o un fallback genérico (FaCertificate) si no existe.
 */
export const getIcon = (iconName: string): React.ElementType => {
  return iconMap[iconName] || FaCertificate;
};
