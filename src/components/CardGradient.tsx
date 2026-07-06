import React from "react";

interface CardGradientProps {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export default function CardGradient({
  children,
  className = "",
  contentClassName = "",
}: CardGradientProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-white/40 shadow-[0_20px_50px_rgba(15,23,42,0.08),inset_0_1px_2px_rgba(255,255,255,0.5)] bg-gradient-to-br from-white/20 via-white/10 to-transparent backdrop-blur-[52px] group transition-all duration-300 ${className}`}
    >
      {/* Card Content */}
      <div className={`relative z-20 h-full w-full ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
}
