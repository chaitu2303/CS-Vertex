"use client";

import { cn } from "@/lib/utils";
import React, { type ReactNode } from "react";
import { Shapes, Send, Check, Repeat, Download } from "lucide-react";

type TColorProp = string | string[];

interface ShineBorderProps {
  borderRadius?: number;
  borderWidth?: number;
  duration?: number;
  color?: TColorProp;
  className?: string;
  children: React.ReactNode;
}

function ShineBorder({
  borderRadius = 8,
  borderWidth = 1,
  duration = 14,
  color = "#000000",
  className,
  children,
}: ShineBorderProps) {
  return (
    <div
      style={
        {
          "--border-radius": `${borderRadius}px`,
        } as React.CSSProperties
      }
      className={cn(
        "relative grid h-full w-full place-items-center rounded-3xl bg-white p-6 text-black dark:bg-black dark:text-white shadow-xl",
        className,
      )}
    >
      <div
        style={
          {
            "--border-width": `${borderWidth}px`,
            "--border-radius": `${borderRadius}px`,
            "--shine-pulse-duration": `${duration}s`,
            "--mask-linear-gradient": `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
            "--background-radial-gradient": `radial-gradient(transparent,transparent, ${color instanceof Array ? color.join(",") : color},transparent,transparent)`,
          } as React.CSSProperties
        }
        className={`before:bg-shine-size before:absolute before:inset-0 before:aspect-square before:size-full before:rounded-3xl before:p-[--border-width] before:will-change-[background-position] before:content-[""] before:![-webkit-mask-composite:xor] before:[background-image:--background-radial-gradient] before:[background-size:300%_300%] before:![mask-composite:exclude] before:[mask:--mask-linear-gradient] motion-safe:before:animate-shine-pulse`}
      ></div>
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}

export function TimelineContainer({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex max-w-md flex-col justify-center gap-6 md:order-2">
      {children}
    </div>
  );
}

const IconMap: Record<string, React.ElementType> = {
  Shapes,
  Send,
  Check,
  Repeat,
  Download,
};

export function TimelineEvent({
  label,
  message,
  icon,
  isLast = false,
}: TimelineEventProps & {
  isLast?: boolean;
}) {
  const Icon = IconMap[icon.name] || Check;
  return (
    <div className="group relative -m-2 flex gap-4 border border-transparent p-2">
      <div className="relative">
        <div
          className={cn(
            "rounded-full border bg-white p-3.5 shadow-sm",
            icon.borderColor
          )}
        >
          <Icon className={cn("h-4 w-4", icon.textColor)} />
        </div>
        {!isLast ? (
          <div className="absolute inset-x-0 mx-auto h-full w-[2px] bg-slate-100 dark:bg-slate-800" />
        ) : null}
      </div>
      <div className="mt-1 flex flex-1 flex-col gap-1.5">
        <div className="flex items-center justify-between gap-4">
          <p className="text-base font-bold text-slate-900">{label}</p>
        </div>
        <p className="text-xs text-slate-500 font-medium leading-relaxed">{message}</p>
      </div>
    </div>
  );
}

export function Timeline() {
  return (
    <div className="w-full max-w-3xl mx-auto py-6">
      <TimelineContainer>
        {timeline.map((event, i) => (
          <TimelineEvent
            key={event.message}
            isLast={i === timeline.length - 1}
            {...event}
          />
        ))}
      </TimelineContainer>
    </div>
  );
}

interface TimelineEventProps {
  label: string;
  message: string;
  icon: {
    name: string;
    textColor: string;
    borderColor: string;
  };
}

const timeline = [
  {
    label: "Choose Your Design",
    message:
      "Browse and select a design that fits your needs, then access your personalized dashboard.",
    icon: {
      name: "Shapes",
      textColor: "text-orange-500",
      borderColor: "border-orange-500/40",
    },
  },
  {
    label: "Provide Your Brief",
    message: "Share your design preferences and requirements with us.",
    icon: {
      name: "Send",
      textColor: "text-amber-500",
      borderColor: "border-amber-500/40",
    },
  },
  {
    label: "Receive Your Designs",
    message: "Get your initial designs within 48 hours.",
    icon: {
      name: "Check",
      textColor: "text-blue-500",
      borderColor: "border-blue-500/40",
    },
  },
  {
    label: "Request Revisions",
    message:
      "We’re committed to perfection—request as many revisions as needed until you’re satisfied.",
    icon: {
      name: "Repeat",
      textColor: "text-emerald-500",
      borderColor: "border-emerald-500/40",
    },
  },
  {
    label: "Get Final Files",
    message: "Once approved, we’ll deliver the final files to you.",
    icon: {
      name: "Download",
      textColor: "text-emerald-500",
      borderColor: "border-emerald-500/40",
    },
  },
] satisfies TimelineEventProps[];

export { ShineBorder };
