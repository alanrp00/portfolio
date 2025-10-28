export type Skill = {
  name: string;
  category: "Frontend" | "Backend" | "DevOps & Tools";
  projects: ("portfolio" | "palabro")[];
};

export const skills: Skill[] = [
  // FRONTEND
  { name: "React", category: "Frontend", projects: ["portfolio"] },
  { name: "Next.js", category: "Frontend", projects: ["portfolio"] },
  { name: "TypeScript", category: "Frontend", projects: ["portfolio"] },
  { name: "Tailwind CSS", category: "Frontend", projects: ["portfolio"] },
  { name: "Jetpack Compose", category: "Frontend", projects: ["palabro"] },
  { name: "Navigation Compose", category: "Frontend", projects: ["palabro"] },

  // BACKEND
  { name: "Node.js", category: "Backend", projects: ["portfolio"] },
  { name: "MongoDB", category: "Backend", projects: ["portfolio"] },
  { name: "Kotlin", category: "Backend", projects: ["palabro"] },
  { name: "Jetpack DataStore", category: "Backend", projects: ["palabro"] },

  // DEVOPS & TOOLS
  { name: "Docker", category: "DevOps & Tools", projects: ["portfolio"] },
  { name: "Git", category: "DevOps & Tools", projects: ["portfolio", "palabro"] },
  { name: "Linux", category: "DevOps & Tools", projects: ["portfolio"] },
];
