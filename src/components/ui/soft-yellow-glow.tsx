"use client";

import React from "react";

interface SoftYellowGlowProps {
  children?: React.ReactNode;
}

export const SoftYellowGlow = ({ children }: SoftYellowGlowProps) => {
  return (
    <div className="min-h-screen w-full relative bg-white">
      {/* Soft Yellow Glow */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at center, #FFF991 0%, transparent 70%)`,
          opacity: 0.6,
          mixBlendMode: "multiply",
        }}
      />
      {children}
    </div>
  );
};
