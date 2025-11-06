// frontend/src/hooks/usePortfolioData.ts
import { experiences } from "@/data/experience";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import { useMemo } from "react";

// ─────────────────────────────────────────────────────────────
// Type guards para evitar errores de tipos con datos opcionales
// ─────────────────────────────────────────────────────────────
function hasProjectsField(e: unknown): e is { projects: string[] } {
  return !!e && typeof e === "object" && Array.isArray((e as any).projects);
}

function safeLower(s: unknown): string {
  return typeof s === "string" ? s.toLowerCase() : "";
}

export function usePortfolioData() {
  // Ej: si lo usas en alguna vista de skills→proyectos
  const getProjectsBySkill = (skillName: string) => {
    const needle = safeLower(skillName).trim();
    return projects.filter((project) =>
      project.tech?.some((t) => safeLower(t?.name) === needle)
    );
  };

  // Si usas categorías de skills (opcional)
  const getSkillsByCategory = (category: string) => {
    const needle = safeLower(category);
    return skills.filter((s: any) => safeLower(s?.category) === needle);
  };

  // FIX: `Experience` no tiene `projects` tipado.
  // Usamos un type-guard para filtrar solo las experiencias que SÍ tienen ese campo.
  const getExperienceByProject = (projectTitle: string) => {
    const needle = safeLower(projectTitle);
    return experiences.filter(
      (e) => hasProjectsField(e) && e.projects.some((p) => safeLower(p) === needle)
    );
  };

  // Si tienes una relación skill→project (opcional)
  const getSkillsByProject = (projectKey: string) => {
    const needle = safeLower(projectKey);
    return skills.filter((s: any) =>
      Array.isArray(s?.projects) && s.projects.some((p: string) => safeLower(p) === needle)
    );
  };

  const data = useMemo(
    () => ({
      projects,
      experiences,
      skills,
      getProjectsBySkill,
      getSkillsByCategory,
      getExperienceByProject,
      getSkillsByProject,
    }),
    []
  );

  return data;
}
