"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  name: string;
  location: string;
  year: string;
  category: string;
  color: string;
}

const projects: Project[] = [
  {
    name: "The Quiet House",
    location: "Kyoto, Japan",
    year: "2024",
    category: "Residential",
    color: "#B79B7A",
  },
  {
    name: "Lumen Penthouse",
    location: "Milan, Italy",
    year: "2024",
    category: "Residential",
    color: "#6F6254",
  },
  {
    name: "Ember Studio",
    location: "Copenhagen, Denmark",
    year: "2023",
    category: "Commercial",
    color: "#E7DED2",
  },
  {
    name: "Stone & Water Retreat",
    location: "Algarve, Portugal",
    year: "2023",
    category: "Hospitality",
    color: "#242321",
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card) => {
        if (!card) return;

        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 50%",
            scrub: 0.5,
          },
          opacity: 0,
          y: 80,
          scale: 0.96,
          duration: 0.5,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="selected-work"
      className="section-content section-dark"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-end justify-between mb-16">
          <div>
            <p
              className="text-label mb-4"
              style={{ color: "var(--color-cream-50)" }}
            >
              Selected Work
            </p>
            <h2 className="heading-editorial text-[clamp(2rem,4vw,3.5rem)]">
              Projects
            </h2>
          </div>
          <div className="section-divider hidden md:block" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, i) => (
            <div
              key={project.name}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className="project-card group"
            >
              {/* Placeholder using colored rectangles since we're not using fake images */}
              <div
                className="w-full overflow-hidden"
                style={{ aspectRatio: "3 / 4" }}
              >
                <div
                  className="w-full h-full transition-transform duration-[1.2s]"
                  style={{
                    background: `linear-gradient(145deg, ${project.color}22, ${project.color}66)`,
                    backgroundColor: project.color + "33",
                  }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <span
                      className="heading-editorial text-[clamp(1.5rem,3vw,2.5rem)] opacity-20"
                      style={{ color: "var(--color-cream)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="project-card-info">
                <h3 className="project-card-name">{project.name}</h3>
                <p className="project-card-meta">
                  {project.location} — {project.year} — {project.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
