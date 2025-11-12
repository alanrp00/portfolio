export type Skill = {
  name: string;
  category: "Frontend" | "Backend" | "DevOps & Tools" | "Mobile";
  projects: ("portfolio" | "palabro")[];
  icon?: string;
};

export const skills: Skill[] = [
  // --- FRONTEND ---
  { name: "React", icon: "FaReact", category: "Frontend", projects: ["portfolio"] },
  { name: "Next.js", icon: "SiNextdotjs", category: "Frontend", projects: ["portfolio"] },
  { name: "TypeScript", icon: "SiTypescript", category: "Frontend", projects: ["portfolio"] },
  { name: "Tailwind CSS", icon: "SiTailwindcss", category: "Frontend", projects: ["portfolio"] },
  { name: "Framer Motion", icon: "SiFramer", category: "Frontend", projects: ["portfolio"] },

  // --- BACKEND ---
  { name: "Node.js", icon: "FaNodeJs", category: "Backend", projects: ["portfolio"] },
  { name: "Express", icon: "SiExpress", category: "Backend", projects: ["portfolio"] },
  { name: "MongoDB", icon: "SiMongodb", category: "Backend", projects: ["portfolio"] },
  { name: "DataStore", icon: "FaDatabase", category: "Backend", projects: ["palabro"] },
  { name: "Java", icon: "FaJava", category: "Backend", projects: ["palabro"] },

  // --- DEVOPS & TOOLS ---
  { name: "Docker", icon: "FaDocker", category: "DevOps & Tools", projects: ["portfolio"] },
  { name: "Git", icon: "FaGitAlt", category: "DevOps & Tools", projects: ["portfolio", "palabro"] },
  { name: "GitHub", icon: "FaGithub", category: "DevOps & Tools", projects: ["portfolio", "palabro"] },
  { name: "Vercel", icon: "SiVercel", category: "DevOps & Tools", projects: ["portfolio"] },
  { name: "Linux", icon: "FaLinux", category: "DevOps & Tools", projects: ["portfolio"] },
  { name: "Postman", icon: "SiPostman", category: "DevOps & Tools", projects: [] },

  // --- TESTING ---
  // { name: "Selenium", icon: "SiSelenium", category: "DevOps & Tools", projects: [] },
  { name: "Jira", icon: "SiJira", category: "DevOps & Tools", projects: [] },

  // --- MOBILE / ANDROID ---
  { name: "Kotlin", icon: "SiKotlin", category: "Mobile", projects: ["palabro"] },
  { name: "Jetpack Compose", icon: "SiJetpackcompose", category: "Mobile", projects: ["palabro"] },
  { name: "Navigation Compose", icon: "FaAndroid", category: "Mobile", projects: ["palabro"] },
];
