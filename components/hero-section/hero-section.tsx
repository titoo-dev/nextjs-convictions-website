import { HeroBackground } from "./hero-background";
import { HeroBadge } from "./hero-badge";
import { HeroCTA } from "./hero-cta";
import { HeroHeading } from "./hero-heading";
import { HeroSubheading } from "./hero-subheading";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <HeroBackground />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-32">
        <div className="text-center">
          <HeroBadge />
          <HeroHeading />
          <HeroSubheading />
          <HeroCTA />
        </div>
      </div>
    </section>
  );
}
