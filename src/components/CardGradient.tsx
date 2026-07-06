import React, { useEffect, useRef, useState } from "react";

interface CardGradientProps {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  interactive?: boolean;
}

export default function CardGradient({
  children,
  className = "",
  contentClassName = "",
  interactive = true,
}: CardGradientProps) {
  const interactiveRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [curX, setCurX] = useState(0);
  const [curY, setCurY] = useState(0);
  const [tgX, setTgX] = useState(0);
  const [tgY, setTgY] = useState(0);
  const [isSafari, setIsSafari] = useState(false);

  // Local color palette with slightly higher contrast but natural tones
  const gradientBackgroundStart = "rgb(235, 230, 255)"; // Warm soft lavender
  const gradientBackgroundEnd = "rgb(210, 200, 250)";   // Deeper soft lila
  const firstColor = "99, 102, 241";    // indigo-500
  const secondColor = "168, 85, 247";   // purple-500
  const thirdColor = "59, 130, 246";    // blue-500
  const fourthColor = "139, 92, 246";   // violet-500
  const fifthColor = "96, 165, 250";    // light blue
  const pointerColor = "124, 58, 237";  // violet-600
  const size = "140%";                  // Larger size for card scaling
  const blendingValue = "hard-light";

  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    function move() {
      setCurX((prevX) => prevX + (tgX - prevX) / 12);
      setCurY((prevY) => prevY + (tgY - prevY) / 12);

      if (interactiveRef.current) {
        interactiveRef.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
      }
      animationFrameId = requestAnimationFrame(move);
    }

    animationFrameId = requestAnimationFrame(move);
    return () => cancelAnimationFrame(animationFrameId);
  }, [tgX, tgY, curX, curY]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      // Calculate local mouse position relative to container
      setTgX(event.clientX - rect.left);
      setTgY(event.clientY - rect.top);
    }
  };

  const localStyle = {
    "--gradient-background-start": gradientBackgroundStart,
    "--gradient-background-end": gradientBackgroundEnd,
    "--first-color": firstColor,
    "--second-color": secondColor,
    "--third-color": thirdColor,
    "--fourth-color": fourthColor,
    "--fifth-color": fifthColor,
    "--pointer-color": pointerColor,
    "--size": size,
    "--blending-value": blendingValue,
  } as React.CSSProperties;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={localStyle}
      className={`relative overflow-hidden rounded-3xl border border-slate-200/80 shadow-[0_15px_40px_rgba(15,23,42,0.05)] bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))] group transition-all duration-300 ${className}`}
    >
      {/* SVG filter definition (Only one is active per page, but defined locally for safety) */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <filter id="cardBlurMe">
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

      {/* Animated gradient container */}
      <div
        className={`absolute inset-0 pointer-events-none select-none overflow-hidden z-0 transition-opacity duration-500 ${
          isSafari ? "blur-2xl" : "[filter:url(#cardBlurMe)_blur(30px)]"
        }`}
      >
        <div
          className={`absolute [background:radial-gradient(circle_at_center,_rgba(var(--first-color),_0.75)_0,_rgba(var(--first-color),_0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] [transform-origin:center_center] animate-first opacity-90`}
        />
        <div
          className={`absolute [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.75)_0,_rgba(var(--second-color),_0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] [transform-origin:calc(50%-200px)] animate-second opacity-90`}
        />
        <div
          className={`absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.75)_0,_rgba(var(--third-color),_0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] [transform-origin:calc(50%+200px)] animate-third opacity-90`}
        />
        <div
          className={`absolute [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.75)_0,_rgba(var(--fourth-color),_0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] [transform-origin:calc(50%-100px)] animate-fourth opacity-70`}
        />
        <div
          className={`absolute [background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.75)_0,_rgba(var(--fifth-color),_0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] [transform-origin:calc(50%-300px)_calc(50%+300px)] animate-fifth opacity-90`}
        />

        {interactive && (
          <div
            ref={interactiveRef}
            className={`absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.7)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-[200px] h-[200px] -mt-[100px] -ml-[100px] top-0 left-0 opacity-80`}
          />
        )}
      </div>

      {/* Frosted Glassmorphism Overlay to ensure content legibility */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-[12px] z-10 transition-colors duration-300 group-hover:bg-white/55" />

      {/* Card Content */}
      <div className={`relative z-20 h-full w-full ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
}
