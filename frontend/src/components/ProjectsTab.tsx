export default function ProjectsTab() {
  const projects = [
    {
      name: "Portfolio Website",
      desc: "Modern portfolio built with Next.js and Tailwind CSS. Features dark mode, animations, and responsive design.",
      stack: ["Next.js", "Tailwind", "Framer Motion"],
      link: "#",
    },
    {
      name: "Task Management Tool",
      desc: "Responsive task manager with Firebase authentication and drag-and-drop functionality.",
      stack: ["React", "Firebase", "TypeScript"],
      link: "#",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {projects.map((p) => (
        <div
          key={p.name}
          className="group relative bg-foreground/5 border border-foreground/10 rounded-2xl p-6 overflow-hidden hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-indigo-500/10"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition" />
          <h3 className="text-lg font-semibold mb-2">{p.name}</h3>
          <p className="text-sm text-foreground/80 mb-3">{p.desc}</p>
          <div className="flex flex-wrap gap-2 text-xs text-primary">
            {p.stack.map((tech) => (
              <span
                key={tech}
                className="border border-primary/30 px-2 py-1 rounded-md bg-primary/5"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
