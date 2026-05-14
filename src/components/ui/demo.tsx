"use client";

import React from "react";

export const Component = () => {
  return (
    <div className="min-h-screen w-full bg-white relative overflow-hidden">
      {/* Light Sky Blue Glow */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at center, #93c5fd, transparent)`,
        }}
      />
      {/* Your Content Here */}
    </div>
  );
};

export default Component;
