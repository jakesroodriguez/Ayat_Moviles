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
      className={`relative overflow-hidden rounded-3xl border border-white/30 shadow-[0_15px_40px_rgba(15,23,42,0.05)] bg-white/15 backdrop-blur-[36px] group transition-all duration-300 ${className}`}
    >
      {/* Card Content */}
      <div className={`relative z-20 h-full w-full ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
}
