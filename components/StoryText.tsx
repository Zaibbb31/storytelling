"use client";

import { useEffect, useRef, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface StoryTextProps {
  sectionRef: RefObject<HTMLDivElement | null>;
  reducedMotion: boolean;
}

interface TextBlock {
  id: string;
  lines: string[];
  startProgress: number;
  endProgress: number;
  fadeInStart: number;
  fadeInEnd: number;
  fadeOutStart: number;
  fadeOutEnd: number;
  isCta?: boolean;
}

const storyBlocks: TextBlock[] = [
  {
    id: "block-1",
    lines: ["A Space", "Becomes", "A Story."],
    startProgress: 0,
    endProgress: 0.35,
    fadeInStart: 0.02,
    fadeInEnd: 0.12,
    fadeOutStart: 0.25,
    fadeOutEnd: 0.35,
  },
  {
    id: "block-2",
    lines: ["Designed", "Around", "The Way", "You Live."],
    startProgress: 0.3,
    endProgress: 0.65,
    fadeInStart: 0.35,
    fadeInEnd: 0.45,
    fadeOutStart: 0.55,
    fadeOutEnd: 0.65,
  },
  {
    id: "block-3",
    lines: ["Where", "Design", "Feels", "Like Home."],
    startProgress: 0.6,
    endProgress: 0.88,
    fadeInStart: 0.65,
    fadeInEnd: 0.75,
    fadeOutStart: 0.82,
    fadeOutEnd: 0.88,
  },
  {
    id: "block-cta",
    lines: ["Explore Our Work"],
    startProgress: 0.85,
    endProgress: 1,
    fadeInStart: 0.88,
    fadeInEnd: 0.95,
    fadeOutStart: 1,
    fadeOutEnd: 1,
    isCta: true,
  },
];

export default function StoryText({ sectionRef, reducedMotion }: StoryTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const blocksRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (reducedMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    const triggers: ScrollTrigger[] = [];

    // Create a ScrollTrigger for text animation
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.3,
      onUpdate: (self) => {
        const progress = self.progress;

        storyBlocks.forEach((block, index) => {
          const el = blocksRef.current[index];
          if (!el) return;

          let opacity = 0;
          let translateY = 30;
          let blur = 8;

          if (progress >= block.fadeInStart && progress <= block.fadeInEnd) {
            // Fading in
            const fadeProgress =
              (progress - block.fadeInStart) / (block.fadeInEnd - block.fadeInStart);
            opacity = fadeProgress;
            translateY = 30 * (1 - fadeProgress);
            blur = 8 * (1 - fadeProgress);
          } else if (progress > block.fadeInEnd && progress < block.fadeOutStart) {
            // Fully visible
            opacity = 1;
            translateY = 0;
            blur = 0;
          } else if (progress >= block.fadeOutStart && progress <= block.fadeOutEnd) {
            // Fading out
            const fadeProgress =
              (progress - block.fadeOutStart) /
              (block.fadeOutEnd - block.fadeOutStart);
            opacity = 1 - fadeProgress;
            translateY = -20 * fadeProgress;
            blur = 6 * fadeProgress;
          }

          // Apply directly to DOM — no React state updates
          el.style.opacity = String(opacity);
          el.style.transform = `translateY(${translateY}px)`;
          el.style.filter = `blur(${blur}px)`;
          el.style.visibility = opacity > 0.01 ? "visible" : "hidden";
        });
      },
    });

    triggers.push(trigger);

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [sectionRef, reducedMotion]);

  // Reduced motion: show all text statically
  if (reducedMotion) {
    return (
      <div className="cinematic-overlay">
        <div className="text-center">
          <h1 className="heading-editorial text-[clamp(2rem,5vw,4rem)] text-[var(--color-cream)]">
            A Space Becomes A Story.
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="cinematic-overlay">
      {storyBlocks.map((block, index) => (
        <div
          key={block.id}
          ref={(el) => {
            blocksRef.current[index] = el;
          }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
          style={{ opacity: 0, visibility: "hidden" }}
        >
          {block.isCta ? (
            <a
              href="#selected-work"
              className="cta-button"
              aria-label="Explore our work"
            >
              <span>{block.lines[0]}</span>
            </a>
          ) : (
            <h2 className="heading-editorial text-[clamp(2rem,6vw,5rem)] text-[var(--color-cream)]">
              {block.lines.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h2>
          )}
        </div>
      ))}
    </div>
  );
}
