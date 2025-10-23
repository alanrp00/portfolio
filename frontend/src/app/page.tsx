import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import TabsSection from "@/components/TabSection";

export default function Page() {
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)] transition-colors duration-500">
      <Navbar />
      <Hero />
      <TabsSection />
    </main>
  );
}
