import { Header } from "@/components/header/header";
import { HeroSection } from "@/components/hero-section/hero-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />
      <HeroSection />
    </div>
  );
}
