"use client";

interface ScrollIndicatorProps {
  isVideoReady: boolean;
}

export default function ScrollIndicator({ isVideoReady }: ScrollIndicatorProps) {
  if (!isVideoReady) return null;

  return (
    <div className="scroll-indicator" aria-hidden="true">
      <span className="scroll-indicator-text">Scroll to explore</span>
      <div className="scroll-indicator-arrow" />
    </div>
  );
}
