"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GradientBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  gradient?: string;
}

export const Component = ({
  className,
  children,
  gradient = "radial-gradient(125% 125% at 50% 10%, #fff 40%, #6366f1 100%)",
  ...props
}: GradientBackgroundProps) => {
  return (
    <div className={cn("min-h-screen w-full relative", className)} {...props}>
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: gradient,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export const GradientBackground = Component;
