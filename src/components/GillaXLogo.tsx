import React from "react";

interface GillaXLogoProps {
  className?: string;
  glow?: boolean;
}

export default function GillaXLogo({ className = "w-10 h-10", glow = true }: GillaXLogoProps) {
  return (
    <div className={`relative inline-flex items-center justify-center ${glow ? "group" : ""}`}>
      {/* Subtle outer purple glow matching the high-end creative style */}
      {glow && (
        <div className="absolute -inset-1.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 rounded-full blur-md opacity-30 group-hover:opacity-70 transition duration-500 pointer-events-none" />
      )}
      <img
        src="/logo.png"
        alt="Gillaxediting Profile Logo"
        className={`relative z-10 select-none object-cover object-center rounded-full shadow-lg border border-purple-500/20 ${className}`}
        loading="eager"
      />
    </div>
  );
}
