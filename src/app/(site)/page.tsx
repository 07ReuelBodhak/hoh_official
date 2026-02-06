import Hero from "@/app/_components/Hero";
import Detail from "@/app/_components/Detail";
import CTA from "@/app/_components/CTA";

export default function HomePage() {
  return (
    <main className="w-full flex flex-col">
      <Hero />
      <Detail />
      <CTA />
    </main>
  );
}
