export default function EducationTab() {
  const studies = [
    { title: "PG Diploma in Advance Computing", place: "CDAC", period: "2021 – 2022" },
    { title: "Bachelor’s in Mechanical Engineering", place: "JSPM RSCOE", period: "2017 – 2020" },
  ];

  return (
    <div className="flex flex-col items-center gap-6">
      {studies.map((s, i) => (
        <div
          key={i}
          className="bg-foreground/5 border border-foreground/10 rounded-2xl p-6 w-full md:w-2/3 text-left hover:shadow-lg hover:shadow-purple-500/10 transition"
        >
          <h3 className="text-lg font-semibold mb-1">{s.title}</h3>
          <p className="text-primary mb-1">{s.place}</p>
          <p className="text-sm text-foreground/70">{s.period}</p>
        </div>
      ))}
    </div>
  );
}
