import { useId } from "react";
import { cn } from "../lib/utils";

export function LogoMark({ className }: { className?: string }) {
  const id = useId();
  return (
    <svg viewBox="0 0 64 64" className={cn("size-8", className)} role="img" aria-label="Nexora logo">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3B82F6" />
          <stop offset="1" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>
      <ellipse cx="31.5" cy="16" rx="2.8" ry="6" fill="#1E293B" transform="rotate(25 31.5 16)" />
      <ellipse cx="52.5" cy="16" rx="2.8" ry="6" fill="#1E293B" transform="rotate(-25 52.5 16)" />
      <ellipse cx="42" cy="14" rx="10" ry="11" fill="#1E293B" />
      <ellipse cx="42" cy="13" rx="6" ry="7" fill="#fff" />
      <circle cx="39.5" cy="11.5" r="1.7" fill="#1E293B" />
      <circle cx="44.5" cy="11.5" r="1.7" fill="#1E293B" />
      <path d="M38.8 15 L45.2 15 L42 18.5 Z" fill="#EA580C" />
      <ellipse cx="37" cy="23.5" rx="3.4" ry="2" fill="#EA580C" />
      <ellipse cx="47" cy="23.5" rx="3.4" ry="2" fill="#EA580C" />
      <rect x="10" y="22" width="44" height="40" rx="9" fill={`url(#${id})`} />
      <path
        d="M22 54V34l20 20V34"
        fill="none"
        stroke="#fff"
        strokeWidth="4.6"
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
