"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Discover",
    description:
      "We begin with listening. Understanding your lifestyle, your aspirations, and the subtle details that make a space uniquely yours.",
  },
  {
    number: "02",
    title: "Define",
    description:
      "Together we establish a clear creative direction — materials, palettes, spatial strategies — forming the blueprint for your environment.",
  },
  {
    number: "03",
    title: "Design",
    description:
      "Our studio translates vision into form. Every detail is considered, from the fall of light to the texture of a surface.",
  },
  {
    number: "04",
    title: "Deliver",
    description:
      "We oversee every element of realization, ensuring the final space matches the precision and emotion of the original design.",
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      stepsRef.current.forEach((step) => {
        if (!step) return;

        gsap.from(step, {
          scrollTrigger: {
            trigger: step,
            start: "top 85%",
            end: "top 55%",
            scrub: 0.5,
          },
          opacity: 0,
          x: -40,
          duration: 0.5,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="section-content section-dark"
    >
      <div className="max-w-[1000px] mx-auto">
        <p
          className="text-label mb-4"
          style={{ color: "var(--color-cream-50)" }}
        >
          How We Work
        </p>
        <h2 className="heading-editorial text-[clamp(2rem,4vw,3.5rem)] mb-16">
          Our Process
        </h2>

        <div>
          {steps.map((step, i) => (
            <div
              key={step.number}
              ref={(el) => {
                stepsRef.current[i] = el;
              }}
              className="process-step"
            >
              <span className="process-number">{step.number}</span>
              <div>
                <h3 className="process-title">{step.title}</h3>
                <p className="process-description">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
