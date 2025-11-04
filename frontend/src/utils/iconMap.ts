// src/utils/iconMap.ts
import {
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

/**
 * Mapa centralizado de iconos disponibles para todo el portfolio.
 * Permite referenciar iconos por string (ej: "FaReact") desde data o props.
 */
export const iconMap: Record<string, React.ElementType> = {
  // --- FRONTEND ---
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaBootstrap,
  FaSass,

  // --- BACKEND / LENGUAJES ---
  FaNodeJs,
  FaPython,
  FaJava,
  FaDatabase,

  // --- DEVOPS / CLOUD ---
  FaDocker,
  FaAws,
  FaGoogle,
  FaGitAlt,
  FaGithub,
  FaGitlab,

  // --- OTRAS HERRAMIENTAS ---
  FaFigma,
  FaLinux,
  FaWindows,
  FaApple,

  // --- REDES SOCIALES / CONTACTO ---
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
};

/**
 * Devuelve el icono correspondiente o un fallback (FaCertificate).
 */
export const getIcon = (iconName: string): React.ElementType => {
  return iconMap[iconName] || FaCertificate;
};
