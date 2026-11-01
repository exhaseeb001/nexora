import { useId } from "react";
import { cn } from "../lib/utils";

export function LogoMark({ className }: { className?: string }) {
  const id = useId();
  return (
    <svg viewBox="0 0 32 32" className={cn("size-8", className)} role="img" aria-label="Nexora logo">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3B82F6" />
          <stop offset="1" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="7" fill={`url(#${id})`} />
      <path
        d="M10 23V9l12 14V9"
        fill="none"
        stroke="#fff"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ className, wordmarkClassName }: { className?: string; wordmarkClassName?: string }) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <LogoMark />
      <span className={cn("text-xl font-extrabold tracking-tight", wordmarkClassName)}>NEXORA</span>
    </span>
  );
}
