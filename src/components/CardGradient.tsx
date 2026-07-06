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
      className={`relative overflow-hidden rounded-3xl border border-slate-200/80 shadow-[0_15px_40px_rgba(15,23,42,0.05)] bg-slate-100/70 backdrop-blur-3xl group transition-all duration-300 ${className}`}
    >
      {/* Card Content */}
      <div className={`relative z-20 h-full w-full ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
}
