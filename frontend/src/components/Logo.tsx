import { useId } from "react";
import { cn } from "../lib/utils";

/**
 * NEXORA animated mascot logo — panda + penguin flanking the N tile.
 * Panda bobs and blinks, penguin bobs, blinks and waves.
 * Animations are CSS keyframes (see index.css); disabled under
 * prefers-reduced-motion by the global reset.
 */
export function LogoMark({ className }: { className?: string }) {
  const id = useId();
  return (
    <svg viewBox="0 0 140 80" className={cn("h-8 w-auto", className)} role="img" aria-label="Nexora logo">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3B82F6" />
          <stop offset="1" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>
      {/* panda */}
      <g className="nx-bob2">
        <ellipse cx="28" cy="70" rx="13" ry="9" fill="#fff" />
        <ellipse cx="17" cy="68" rx="3.4" ry="7" fill="#1E293B" transform="rotate(20 17 68)" />
        <ellipse cx="39" cy="68" rx="3.4" ry="7" fill="#1E293B" transform="rotate(-20 39 68)" />
        <circle cx="14" cy="30" r="7" fill="#1E293B" />
        <circle cx="42" cy="30" r="7" fill="#1E293B" />
        <circle cx="28" cy="48" r="17" fill="#fff" />
        <ellipse cx="21" cy="46" rx="5" ry="6.2" fill="#1E293B" transform="rotate(-18 21 46)" />
        <ellipse cx="35" cy="46" rx="5" ry="6.2" fill="#1E293B" transform="rotate(18 35 46)" />
        <g className="nx-blink">
          <circle cx="21" cy="46" r="2.2" fill="#fff" />
          <circle cx="35" cy="46" r="2.2" fill="#fff" />
        </g>
        <ellipse cx="28" cy="56" rx="3" ry="2.4" fill="#1E293B" />
        <circle cx="16" cy="54" r="3" fill="#F9A8D4" opacity="0.55" />
        <circle cx="40" cy="54" r="3" fill="#F9A8D4" opacity="0.55" />
      </g>
      {/* N tile */}
      <g className="nx-float">
        <rect x="50" y="18" width="40" height="40" rx="10" fill={`url(#${id})`} />
        <path
          d="M60 48V32l16 16V32"
          fill="none"
          stroke="#fff"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      {/* penguin */}
      <g className="nx-bob">
        <ellipse cx="96" cy="46" rx="3.6" ry="9" fill="#1E293B" transform="rotate(14 96 46)" />
        <g className="nx-wave">
          <ellipse cx="128" cy="46" rx="3.6" ry="9" fill="#1E293B" />
        </g>
        <ellipse cx="112" cy="44" rx="15" ry="21" fill="#1E293B" />
        <ellipse cx="112" cy="50" rx="9" ry="12" fill="#fff" />
        <ellipse cx="112" cy="32" rx="9.5" ry="10" fill="#fff" />
        <g className="nx-blink">
          <circle cx="108" cy="30" r="2.4" fill="#1E293B" />
          <circle cx="116" cy="30" r="2.4" fill="#1E293B" />
        </g>
        <path d="M107.5 35 L116.5 35 L112 39.5 Z" fill="#EA580C" />
        <ellipse cx="105" cy="65" rx="5" ry="2.8" fill="#EA580C" />
        <ellipse cx="119" cy="65" rx="5" ry="2.8" fill="#EA580C" />
      </g>
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
