"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const philosophyWords = ["Space.", "Light.", "Material.", "Life."];

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      wordsRef.current.forEach((word, i) => {
        if (!word) return;

        gsap.from(word, {
          scrollTrigger: {
            trigger: word,
            start: "top 85%",
            end: "top 40%",
            scrub: 0.5,
          },
          opacity: 0.08,
          y: 40,
          duration: 0.5,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-content section-dark overflow-hidden"
      style={{
        paddingTop: "clamp(6rem, 12vh, 10rem)",
        paddingBottom: "clamp(6rem, 12vh, 10rem)",
      }}
    >
      <div className="max-w-[1200px] mx-auto">
        <p
          className="text-label mb-12"
          style={{ color: "var(--color-cream-50)" }}
        >
          Our Philosophy
        </p>

        <div className="flex flex-col gap-2 md:gap-4">
          {philosophyWords.map((word, i) => (
            <span
              key={word}
              ref={(el) => {
                wordsRef.current[i] = el;
              }}
              className="heading-display text-[clamp(3rem,10vw,9rem)] block"
              style={{ color: "var(--color-cream)" }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
