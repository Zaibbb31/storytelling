"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MaterialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "top 35%",
          scrub: 0.5,
        },
        opacity: 0,
        y: 60,
      });

      gsap.from(bodyRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          end: "top 30%",
          scrub: 0.5,
        },
        opacity: 0,
        y: 40,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-content section-dark relative overflow-hidden"
      style={{
        paddingTop: "clamp(6rem, 14vh, 12rem)",
        paddingBottom: "clamp(6rem, 14vh, 12rem)",
      }}
    >
      {/* Subtle gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 70% 50%, rgba(183,155,122,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-[1000px] mx-auto relative z-10">
        <p
          className="text-label mb-4"
          style={{ color: "var(--color-cream-50)" }}
        >
          Materials &amp; Craft
        </p>

        <h2
          ref={headingRef}
          className="heading-editorial text-[clamp(2rem,4.5vw,3.5rem)] mb-12"
        >
          Every Surface
          <br />
          Tells a Story.
        </h2>

        <div ref={bodyRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <p className="text-body" style={{ color: "var(--color-cream-70)" }}>
            We source materials with the same care a curator brings to an
            exhibition. Natural stone from quarries in Tuscany. Oak milled in
            Hokkaido. Handmade ceramics from artisans who have practiced their
            craft for generations.
          </p>
          <p className="text-body" style={{ color: "var(--color-cream-50)" }}>
            The result is an interior that doesn&apos;t just look beautiful — it
            feels alive. Materials age with grace. Surfaces develop character.
            The space becomes more itself over time.
          </p>
        </div>
      </div>
    </section>
  );
}
