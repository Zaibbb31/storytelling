"use client";

import { forwardRef, useEffect, useRef, useState, useCallback } from "react";

interface CinematicVideoProps {
  isReady: boolean;
  reducedMotion: boolean;
}

const CinematicVideo = forwardRef<HTMLVideoElement, CinematicVideoProps>(
  function CinematicVideo({ isReady, reducedMotion }, ref) {
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [isMobile, setIsMobile] = useState<boolean | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };

      checkMobile();

      let resizeTimer: ReturnType<typeof setTimeout>;
      const handleResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(checkMobile, 250);
      };

      window.addEventListener("resize", handleResize, { passive: true });
      return () => {
        clearTimeout(resizeTimer);
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    const handleCanPlay = useCallback(() => {
      setVideoLoaded(true);
    }, []);

    // Don't render until we know the viewport
    if (isMobile === null) return null;

    const videoSrc = isMobile
      ? "/videos/interior-mobile.mp4"
      : "/videos/interior-desktop.mp4";

    // Show loading screen until either the video has loaded OR isReady is true
    const showLoading = !videoLoaded;

    return (
      <div ref={containerRef} className="absolute inset-0">
        {/* Loading state */}
        <div className={`loading-screen ${showLoading ? "" : "loaded"}`}>
          <span className="loading-text">Loading Experience</span>
          <div className="loading-line" />
        </div>

        {/* Video element */}
        <video
          ref={ref}
          key={videoSrc}
          className="cinematic-video"
          style={{
            opacity: videoLoaded ? 1 : 0,
            transition: "opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          src={videoSrc}
          muted
          playsInline
          preload="auto"
          onCanPlay={handleCanPlay}
          aria-label="Interior design cinematic experience"
        />
      </div>
    );
  }
);

export default CinematicVideo;
