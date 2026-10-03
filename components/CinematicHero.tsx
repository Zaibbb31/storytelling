"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CinematicHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const textBlocksRef = useRef<(HTMLDivElement | null)[]>([]);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  // Video ready handler
  const handleCanPlay = useCallback(() => {
    setVideoReady(true);
  }, []);

  // Main scroll-driven logic with optimized video scrubbing
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    // Reduced motion check
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let lastSeekTime = 0;

    const waitForVideo = () => {
      const duration = video.duration;
      if (!duration || isNaN(duration)) return;

      video.pause();
      video.currentTime = 0;

      // ScrollTrigger: set target time + animate text (lightweight)
      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5, // Higher = smoother scroll tracking
        onUpdate: (self) => {
          const p = self.progress;

          // --- Set video target with throttling to avoid decoder lag ---
          const targetTime = p * duration;
          // Only seek if the difference is more than 0.08 seconds (approx 12fps update rate)
          // This significantly reduces the load on the browser's video decoder
          if (Math.abs(targetTime - lastSeekTime) > 0.08) {
            video.currentTime = targetTime;
            lastSeekTime = targetTime;
          }

          // --- Text block animations ---
          animateBlock(textBlocksRef.current[0], p, 0.02, 0.12, 0.22, 0.30);
          animateBlock(textBlocksRef.current[1], p, 0.30, 0.40, 0.50, 0.60);
          animateBlock(textBlocksRef.current[2], p, 0.60, 0.70, 0.78, 0.85);
          animateBlock(textBlocksRef.current[3], p, 0.85, 0.93, 1.1, 1.1);

          // --- Scroll indicator fade ---
          const indicator = scrollIndicatorRef.current;
          if (indicator) {
            const indicatorOpacity = p < 0.05 ? 1 : Math.max(0, 1 - (p - 0.05) / 0.05);
            indicator.style.opacity = String(indicatorOpacity);
          }
        },
      });

      return () => {
        st.kill();
      };
    };

    let cleanup: (() => void) | undefined;

    if (video.readyState >= 1) {
      cleanup = waitForVideo();
    } else {
      const onMeta = () => {
        cleanup = waitForVideo();
      };
      video.addEventListener("loadedmetadata", onMeta, { once: true });
      return () => {
        video.removeEventListener("loadedmetadata", onMeta);
      };
    }

    return () => {
      cleanup?.();
    };
  }, [isMobile]);

  // Helper: animate a text block based on scroll progress
  function animateBlock(
    el: HTMLDivElement | null,
    progress: number,
    fadeInStart: number,
    fadeInEnd: number,
    fadeOutStart: number,
    fadeOutEnd: number
  ) {
    if (!el) return;
    let opacity = 0;
    let y = 30;

    if (progress >= fadeInStart && progress <= fadeInEnd) {
      const t = (progress - fadeInStart) / (fadeInEnd - fadeInStart);
      opacity = t;
      y = 30 * (1 - t);
    } else if (progress > fadeInEnd && progress < fadeOutStart) {
      opacity = 1;
      y = 0;
    } else if (progress >= fadeOutStart && progress <= fadeOutEnd) {
      const t = (progress - fadeOutStart) / (fadeOutEnd - fadeOutStart);
      opacity = 1 - t;
      y = -20 * t;
    }

    el.style.opacity = String(opacity);
    el.style.transform = `translateY(${y}px)`;
    el.style.visibility = opacity > 0.01 ? "visible" : "hidden";
  }

  const videoSrc = isMobile
    ? "/videos/interior-mobile.mp4"
    : "/videos/interior-desktop.mp4";

  const storyBlocks = [
    { lines: ["A Space", "Becomes", "A Story."] },
    { lines: ["Designed", "Around", "The Way", "You Live."] },
    { lines: ["Where", "Design", "Feels", "Like Home."] },
    { lines: ["Explore Our Work"], isCta: true },
  ];

  return (
    <>
      {/* Scroll runway — tall section that provides scroll distance */}
      <section
        ref={sectionRef}
        className="relative w-full"
        style={{ height: "600vh" }}
        aria-label="Cinematic introduction"
      />

      {/* Fixed viewport — stays on screen while scrolling through runway */}
      <div
        className="fixed inset-0 w-full h-screen z-10 pointer-events-none"
        style={{ height: "100dvh" }}
      >
        {/* Loading screen */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center z-50 transition-all duration-1000"
          style={{
            backgroundColor: "var(--color-charcoal)",
            opacity: videoReady ? 0 : 1,
            visibility: videoReady ? "hidden" : "visible",
            pointerEvents: videoReady ? "none" : "auto",
          }}
        >
          <span className="loading-text">Loading Experience</span>
          <div className="loading-line" />
        </div>

        {/* Video */}
        <video
          ref={videoRef}
          key={videoSrc}
          className="absolute inset-0 w-full h-full object-cover"
          src={videoSrc}
          muted
          playsInline
          preload="auto"
          onCanPlay={handleCanPlay}
          style={{
            opacity: videoReady ? 1 : 0,
            transition: "opacity 1s ease",
            willChange: "contents",
            transform: "translateZ(0)",
          }}
        />

        {/* Vignette */}
        <div className="cinematic-vignette" />

        {/* Bottom gradient for text readability */}
        <div
          className="absolute inset-x-0 bottom-0 h-[40%] z-[6] pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(36,35,33,0.5) 0%, transparent 100%)",
          }}
        />

        {/* Story text blocks */}
        {storyBlocks.map((block, i) => (
          <div
            key={i}
            ref={(el) => { textBlocksRef.current[i] = el; }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-20"
            style={{ opacity: 0, visibility: "hidden", pointerEvents: "none" }}
          >
            {block.isCta ? (
              <a
                href="#selected-work"
                className="cta-button pointer-events-auto"
                aria-label="Explore our work"
              >
                <span>Explore Our Work</span>
              </a>
            ) : (
              <h2 className="heading-editorial text-[clamp(2rem,6vw,5rem)] text-[var(--color-cream)]">
                {block.lines.map((line, j) => (
                  <span key={j} className="block">{line}</span>
                ))}
              </h2>
            )}
          </div>
        ))}

        {/* Scroll indicator */}
        <div ref={scrollIndicatorRef} className="scroll-indicator pointer-events-none">
          <span className="scroll-indicator-text">Scroll to explore</span>
          <div className="scroll-indicator-arrow" />
        </div>
      </div>
    </>
  );
}
