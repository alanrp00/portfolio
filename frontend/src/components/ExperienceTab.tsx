export default function ExperienceTab() {
  const jobs = [
    {
      role: "Frontend Developer",
      company: "Tech Studio",
      period: "2022 – Present",
      points: [
        "Built responsive, high-performance web apps focused on UI/UX.",
        "Optimized rendering efficiency and minimized API calls.",
        "Maintained modular, scalable front-end architecture.",
      ],
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {jobs.map((job) => (
        <div
          key={job.role}
          className="bg-foreground/5 border border-foreground/10 rounded-2xl p-6 text-left hover:shadow-xl hover:shadow-indigo-500/10 transition-all"
        >
          <h3 className="text-xl font-semibold mb-1">{job.role}</h3>
          <p className="text-primary mb-2">{job.company} • {job.period}</p>
          <ul className="list-disc ml-6 text-sm text-foreground/80 space-y-1">
            {job.points.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
