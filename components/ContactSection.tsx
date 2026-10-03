"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "top 40%",
          scrub: 0.5,
        },
        opacity: 0,
        y: 80,
      });

      gsap.from(ctaRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
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
      id="contact"
      className="section-content section-dark text-center"
      style={{
        paddingTop: "clamp(8rem, 18vh, 16rem)",
        paddingBottom: "clamp(8rem, 18vh, 16rem)",
      }}
    >
      <div className="max-w-[900px] mx-auto">
        <div ref={headingRef}>
          <h2 className="heading-display text-[clamp(2.5rem,6vw,5.5rem)] mb-8">
            Let&apos;s Create
            <br />
            A Space That
            <br />
            Feels Like You.
          </h2>
        </div>

        <div ref={ctaRef}>
          <a
            href="mailto:hello@atelier.studio"
            className="cta-button inline-flex"
            aria-label="Start a project"
          >
            <span>Start a Project</span>
          </a>
        </div>
      </div>
    </section>
  );
}
