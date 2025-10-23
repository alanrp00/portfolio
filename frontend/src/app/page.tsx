import About from "@/components/About";
import Hero from "@/components/Hero";
import PortfolioTabs from "@/components/PortfolioTabs";

export default function Page() {
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)] transition-colors duration-500">
      <Hero />
      <About />
      <PortfolioTabs />
    </main>
  );
}
