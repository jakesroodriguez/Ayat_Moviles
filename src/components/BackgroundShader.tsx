import React, { useEffect, useRef, useState } from "react";

/**
 * Animated gradient background with organic flowing blobs.
 * Colors: lavender/indigo/purple/rose palette with extreme contrast and saturation.
 * Interactive: pointer blob follows the mouse cursor.
 */
export default function BackgroundShader() {
  const interactiveRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const curRef = useRef({ x: 0, y: 0 });
  const tgRef = useRef({ x: 0, y: 0 });

  const [isSafari, setIsSafari] = useState(false);

  // Color palette — highly saturated and contrasted tones
  const config = {
    gradientStart: "rgb(248, 246, 255)",   // Extremely light soft lavender
    gradientEnd: "rgb(230, 220, 255)",     // Very light lavender
    first: "120, 110, 255",                // Bright sky indigo
    second: "220, 120, 255",               // Vibrant bright fuchsia/pink
    third: "100, 180, 255",                // Bright cyan-blue
    fourth: "160, 120, 255",               // Bright violet
    fifth: "255, 140, 190",                // Vibrant bright rose pink
    pointer: "170, 130, 255",              // Bright pointer violet
    size: "100%",
    blending: "normal",                    // Normal blend mode for clean bright overlay
  };

  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
  }, []);

  // Set CSS custom properties on body
  useEffect(() => {
    const s = document.body.style;
    s.setProperty("--gradient-background-start", config.gradientStart);
    s.setProperty("--gradient-background-end", config.gradientEnd);
    s.setProperty("--first-color", config.first);
    s.setProperty("--second-color", config.second);
    s.setProperty("--third-color", config.third);
    s.setProperty("--fourth-color", config.fourth);
    s.setProperty("--fifth-color", config.fifth);
    s.setProperty("--pointer-color", config.pointer);
    s.setProperty("--size", config.size);
    s.setProperty("--blending-value", config.blending);
  }, []);

  // Smooth pointer-following animation loop
  useEffect(() => {
    function animate() {
      if (interactiveRef.current) {
        curRef.current.x += (tgRef.current.x - curRef.current.x) / 20;
        curRef.current.y += (tgRef.current.y - curRef.current.y) / 20;
        interactiveRef.current.style.transform = `translate(${Math.round(curRef.current.x)}px, ${Math.round(curRef.current.y)}px)`;
      }
      animFrameRef.current = requestAnimationFrame(animate);
    }
    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (interactiveRef.current) {
      const rect = interactiveRef.current.getBoundingClientRect();
      tgRef.current.x = event.clientX - rect.left;
      tgRef.current.y = event.clientY - rect.top;
    }
  };

  return (
    <div
      className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]"
      onMouseMove={handleMouseMove}
      style={{ pointerEvents: "auto" }}
    >
      {/* SVG filter for gooey blob merging */}
      <svg className="hidden">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* Animated gradient blobs */}
      <div
        className={`gradients-container h-full w-full ${
          isSafari ? "blur-3xl" : "[filter:url(#blurMe)_blur(25px)]"
        }`}
      >
        {/* Blob 1 — Royal Indigo */}
        <div
          className={`absolute [background:radial-gradient(circle_at_center,_rgba(var(--first-color),_0.95)_0,_rgba(var(--first-color),_0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] [transform-origin:center_center] animate-first opacity-100`}
        />

        {/* Blob 2 — Fuchsia Magenta */}
        <div
          className={`absolute [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.95)_0,_rgba(var(--second-color),_0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] [transform-origin:calc(50%-400px)] animate-second opacity-100`}
        />

        {/* Blob 3 — Bright Blue */}
        <div
          className={`absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.95)_0,_rgba(var(--third-color),_0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] [transform-origin:calc(50%+400px)] animate-third opacity-100`}
        />

        {/* Blob 4 — Violet */}
        <div
          className={`absolute [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.95)_0,_rgba(var(--fourth-color),_0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] [transform-origin:calc(50%-200px)] animate-fourth opacity-80`}
        />

        {/* Blob 5 — Rose Pink */}
        <div
          className={`absolute [background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.95)_0,_rgba(var(--fifth-color),_0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] [transform-origin:calc(50%-800px)_calc(50%+800px)] animate-fifth opacity-100`}
        />

        {/* Interactive pointer blob — follows cursor */}
        <div
          ref={interactiveRef}
          className={`absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.95)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-full h-full -top-1/2 -left-1/2 opacity-80`}
        />
      </div>
    </div>
  );
}
