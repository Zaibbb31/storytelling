"use client";

import dynamic from "next/dynamic";

const SmoothScrollProvider = dynamic(
  () => import("@/components/SmoothScrollProvider"),
  { ssr: false }
);
const HeroNavigation = dynamic(() => import("@/components/HeroNavigation"), {
  ssr: false,
});
const CinematicHero = dynamic(() => import("@/components/CinematicHero"), {
  ssr: false,
});
const AboutSection = dynamic(() => import("@/components/AboutSection"), {
  ssr: false,
});
const PhilosophySection = dynamic(
  () => import("@/components/PhilosophySection"),
  { ssr: false }
);
const ProjectsSection = dynamic(
  () => import("@/components/ProjectsSection"),
  { ssr: false }
);
const ProcessSection = dynamic(() => import("@/components/ProcessSection"), {
  ssr: false,
});
const MaterialsSection = dynamic(
  () => import("@/components/MaterialsSection"),
  { ssr: false }
);
const ContactSection = dynamic(() => import("@/components/ContactSection"), {
  ssr: false,
});
const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: false,
});

export default function ClientPage() {
  return (
    <SmoothScrollProvider>
      <HeroNavigation />

      <main>
        {/* 01 — Cinematic Hero (fixed video + scroll runway) */}
        <CinematicHero />

        {/* Everything below scrolls OVER the fixed video */}
        <div className="relative z-20 bg-[var(--color-charcoal)]">
          {/* 02 — Introduction */}
          <AboutSection />

          {/* 03 — Philosophy */}
          <PhilosophySection />

          {/* 04 — Selected Work */}
          <ProjectsSection />

          {/* 05 — Process */}
          <ProcessSection />

          {/* 06 — Materials & Craft */}
          <MaterialsSection />

          {/* 07 — Final CTA */}
          <ContactSection />

          {/* 08 — Footer */}
          <Footer />
        </div>
      </main>
    </SmoothScrollProvider>
  );
}
