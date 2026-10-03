"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 30%",
          scrub: 0.5,
        },
      });

      tl.from(dividerRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.3,
      })
        .from(
          headingRef.current,
          {
            opacity: 0,
            y: 60,
            duration: 0.5,
          },
          0.1
        )
        .from(
          bodyRef.current,
          {
            opacity: 0,
            y: 40,
            duration: 0.5,
          },
          0.25
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-content section-dark"
      style={{ paddingTop: "clamp(6rem, 15vh, 12rem)" }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div ref={dividerRef} className="section-divider mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          <h2
            ref={headingRef}
            className="heading-editorial text-[clamp(2.2rem,4.5vw,4rem)]"
          >
            We Design Spaces
            <br />
            That Feel Like Home.
          </h2>

          <div ref={bodyRef} className="flex flex-col gap-6 pt-2">
            <p className="text-body" style={{ color: "var(--color-cream-70)" }}>
              Atelier is a luxury interior design studio founded on the belief
              that spaces shape the way we live, think, and feel. Every project
              begins with a conversation — about light, about material, about
              the quiet rituals of daily life.
            </p>
            <p className="text-body" style={{ color: "var(--color-cream-50)" }}>
              We work at the intersection of architecture and emotion, creating
              environments that are as considered as they are beautiful. Our
              approach draws from Japandi principles, modernist restraint, and a
              deep respect for craft.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
