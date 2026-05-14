'use client';

import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

// --- CARD COMPONENT ---
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: 'blue' | 'cyan' | 'purple' | 'none';
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ glow = 'none', className, children, ...props }) => {
  return (
    <div
      className={twMerge(
        "glass-card-premium rounded-2xl p-6 relative overflow-hidden",
        glow === 'blue' && "hover:border-electric-blue/30 hover:shadow-[0_0_30px_rgba(37,99,235,0.15)]",
        glow === 'cyan' && "hover:border-cyan-glow/40 hover:shadow-[0_0_30px_rgba(56,189,248,0.2)]",
        glow === 'purple' && "hover:border-neon-purple/30 hover:shadow-[0_0_30px_rgba(124,58,237,0.15)]",
        className
      )}
      {...props}
    >
      {/* Dynamic top gradient border flare on hover */}
      {glow !== 'none' && (
        <div className={clsx(
          "absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none",
          glow === 'blue' ? "from-transparent via-electric-blue/40 to-transparent" :
          glow === 'cyan' ? "from-transparent via-cyan-glow/50 to-transparent" :
          "from-transparent via-neon-purple/40 to-transparent"
        )} />
      )}
      {children}
    </div>
  );
};

// --- BUTTON COMPONENT ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'neon' | 'glass' | 'subtle' | 'danger';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'solid',
  size = 'md',
  fullWidth = false,
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={twMerge(
        "inline-flex items-center justify-center font-sora font-semibold tracking-wide rounded-xl transition-all duration-300 active:scale-[0.98] focus:outline-none select-none cursor-pointer border",
        
        // Solid theme (Premium White paper)
        variant === 'solid' && "bg-white border-transparent text-black hover:bg-[#eaeaea] shadow-md shadow-white/5",
        
        // Neon theme (Electric-blue-to-purple gradient with glow shadow)
        variant === 'neon' && "bg-gradient-to-r from-electric-blue to-neon-purple border-transparent text-white hover:brightness-110 shadow-[0_0_25px_rgba(37,99,235,0.35)]",
        
        // Glass theme (Transparent dark crystal with cyan active outline)
        variant === 'glass' && "bg-white/[0.02] border-white/5 text-silver-white hover:bg-white/5 hover:border-cyan-glow/30 hover:shadow-[0_0_15px_rgba(56,189,248,0.1)]",
        
        // Subtle theme (Industrial deep grey)
        variant === 'subtle' && "bg-neutral-900 border-transparent text-silver-white/70 hover:bg-neutral-800 hover:text-white",

        // Danger theme
        variant === 'danger' && "bg-red-950/20 border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white",

        // Size grids
        size === 'xs' && "px-3 py-1 text-[10px] rounded-lg",
        size === 'sm' && "px-4.5 py-1.5 text-xs rounded-lg",
        size === 'md' && "px-6 py-2.5 text-xs rounded-xl",
        size === 'lg' && "px-8 py-3.5 text-sm rounded-xl",
        
        fullWidth ? "w-full flex" : "inline-flex",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

// --- INPUT FIELD ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className, ...props }) => {
  return (
    <div className="flex flex-col w-full mb-4">
      {label && (
        <label className="block text-[10px] font-semibold text-silver-white/40 mb-1.5 tracking-wider uppercase font-sora">
          {label}
        </label>
      )}
      <input
        className={twMerge(
          "w-full bg-neutral-950/80 text-silver-white placeholder:text-silver-white/20 border border-white/5 rounded-xl px-4 py-3 text-xs transition-all duration-300 focus:outline-none focus:border-cyan-glow/40 focus:bg-neutral-950 shadow-inner",
          error && "border-red-500/40 focus:border-red-500",
          className
        )}
        {...props}
      />
      {error && <span className="text-[10px] text-red-400 mt-1 font-mono">{error}</span>}
    </div>
  );
};

// --- TEXTAREA FIELD ---
interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({ label, error, className, ...props }) => {
  return (
    <div className="flex flex-col w-full mb-4">
      {label && (
        <label className="block text-[10px] font-semibold text-silver-white/40 mb-1.5 tracking-wider uppercase font-sora">
          {label}
        </label>
      )}
      <textarea
        className={twMerge(
          "w-full bg-neutral-950/80 text-silver-white placeholder:text-silver-white/20 border border-white/5 rounded-xl px-4 py-3 text-xs transition-all duration-300 focus:outline-none focus:border-cyan-glow/40 focus:bg-neutral-950 shadow-inner resize-none",
          error && "border-red-500/40 focus:border-red-500",
          className
        )}
        {...props}
      />
      {error && <span className="text-[10px] text-red-400 mt-1 font-mono">{error}</span>}
    </div>
  );
};

// --- STATUS BADGE ---
interface BadgeProps {
  status: string;
  variant?: 'green' | 'blue' | 'yellow' | 'gray';
}

export const Badge: React.FC<BadgeProps> = ({ status, variant = 'gray' }) => {
  return (
    <span
      className={twMerge(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-bold font-mono tracking-wider uppercase border select-none",
        variant === 'green' && "bg-emerald-500/5 text-emerald-400 border-emerald-500/10",
        variant === 'blue' && "bg-sky-500/5 text-sky-400 border-sky-500/10",
        variant === 'yellow' && "bg-amber-500/5 text-amber-400 border-amber-500/10",
        variant === 'gray' && "bg-neutral-500/5 text-neutral-400 border-neutral-500/10"
      )}
    >
      {/* Micro Status Dot */}
      <span className={twMerge(
        "w-1 h-1 rounded-full",
        variant === 'green' && "bg-emerald-400 animate-pulse",
        variant === 'blue' && "bg-sky-400 animate-pulse",
        variant === 'yellow' && "bg-amber-400 animate-pulse",
        variant === 'gray' && "bg-neutral-400"
      )} />
      {status}
    </span>
  );
};

// --- SELECT OPTION COMPONENT ---
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({ label, options, className, ...props }) => {
  return (
    <div className="flex flex-col w-full mb-4">
      {label && (
        <label className="block text-[10px] font-semibold text-silver-white/40 mb-1.5 tracking-wider uppercase font-sora">
          {label}
        </label>
      )}
      <select
        className={twMerge(
          "w-full bg-neutral-950/80 text-silver-white border border-white/5 rounded-xl px-4 py-3 text-xs transition-all duration-300 focus:outline-none focus:border-cyan-glow/40 cursor-pointer appearance-none shadow-inner",
          className
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-[#050505] text-silver-white text-xs">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
