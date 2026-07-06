import { useEffect, useRef, useState } from "react";

/**
 * Animated gradient background with organic flowing blobs.
 * Colors: lavender/indigo/purple palette with moderate contrast.
 * Interactive: pointer blob follows the mouse cursor.
 */
export default function BackgroundShader() {
  const interactiveRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const curRef = useRef({ x: 0, y: 0 });
  const tgRef = useRef({ x: 0, y: 0 });

  const [isSafari, setIsSafari] = useState(false);

  // Color palette — lavender/indigo/purple with more contrast, natural tones
  const config = {
    gradientStart: "rgb(228, 220, 255)",   // warm lavender
    gradientEnd: "rgb(200, 188, 248)",     // deeper lavender
    first: "79, 70, 229",                  // indigo-600
    second: "126, 68, 204",               // plum purple (natural, not neon)
    third: "72, 120, 210",                // muted steel blue
    fourth: "108, 82, 216",               // medium violet
    fifth: "62, 100, 188",               // cool slate blue
    pointer: "88, 58, 200",              // deep violet (muted)
    size: "80%",
    blending: "hard-light",
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

  const blobBase = (color: string, opacity: string, origin: string, anim: string) =>
    `absolute [background:radial-gradient(circle_at_center,_rgba(var(--${color}),_0.8)_0,_rgba(var(--${color}),_0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] [transform-origin:${origin}] ${anim} opacity-${opacity}`;

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
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
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
        className={`gradients-container h-full w-full blur-lg ${
          isSafari ? "blur-2xl" : "[filter:url(#blurMe)_blur(40px)]"
        }`}
      >
        {/* Blob 1 — Indigo */}
        <div
          className={`absolute [background:radial-gradient(circle_at_center,_rgba(var(--first-color),_0.8)_0,_rgba(var(--first-color),_0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] [transform-origin:center_center] animate-first opacity-100`}
        />

        {/* Blob 2 — Plum Purple */}
        <div
          className={`absolute [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.8)_0,_rgba(var(--second-color),_0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] [transform-origin:calc(50%-400px)] animate-second opacity-100`}
        />

        {/* Blob 3 — Steel Blue */}
        <div
          className={`absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.8)_0,_rgba(var(--third-color),_0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] [transform-origin:calc(50%+400px)] animate-third opacity-100`}
        />

        {/* Blob 4 — Violet */}
        <div
          className={`absolute [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.8)_0,_rgba(var(--fourth-color),_0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] [transform-origin:calc(50%-200px)] animate-fourth opacity-70`}
        />

        {/* Blob 5 — Slate Blue */}
        <div
          className={`absolute [background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.8)_0,_rgba(var(--fifth-color),_0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] [transform-origin:calc(50%-800px)_calc(50%+800px)] animate-fifth opacity-100`}
        />

        {/* Interactive pointer blob — follows cursor */}
        <div
          ref={interactiveRef}
          className={`absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.8)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-full h-full -top-1/2 -left-1/2 opacity-70`}
        />
      </div>
    </div>
  );
}
