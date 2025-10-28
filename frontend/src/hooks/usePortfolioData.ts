import { experiences } from "@/data/experience";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import { useMemo } from "react";

export function usePortfolioData() {
  // 🧠 Función: obtener skills asociadas a un proyecto
  const getSkillsByProject = (projectKey: "portfolio" | "palabro") => {
    return skills.filter((s) => s.projects.includes(projectKey));
  };

  // 🧠 Función: obtener proyectos que usan una skill concreta
  const getProjectsBySkill = (skillName: string) => {
    return projects.filter((project) =>
      project.tech.some((t) => t.toLowerCase() === skillName.toLowerCase())
    );
  };

  // 🧠 Función: agrupar skills por categoría
  const getSkillsByCategory = () => {
    const grouped: Record<string, typeof skills> = {};
    skills.forEach((skill) => {
      if (!grouped[skill.category]) grouped[skill.category] = [];
      grouped[skill.category].push(skill);
    });
    return grouped;
  };

  // 🧠 Función: obtener experiencia relacionada con un proyecto
  const getExperienceByProject = (projectTitle: string) => {
    return experiences.find((exp) =>
      exp.title.toLowerCase().includes(projectTitle.toLowerCase())
    );
  };

  // 📦 Memorizar todos los datos y funciones
  const data = useMemo(
    () => ({
      projects,
      experiences,
      skills,
      getSkillsByProject,
      getProjectsBySkill,
      getSkillsByCategory,
      getExperienceByProject,
    }),
    []
  );

  return data;
}
