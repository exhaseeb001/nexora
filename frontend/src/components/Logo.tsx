import { useId } from "react";
import { cn } from "../lib/utils";

/**
 * NEXORA mascot logo — slim panda and penguin flanking the N tile,
 * each lined up with one leg of the N, bouncing continuously.
 * Keyframes live in index.css; disabled under prefers-reduced-motion.
 */
export function LogoMark({ className }: { className?: string }) {
  const id = useId();
  return (
    <svg viewBox="0 0 180 100" className={cn("h-10 w-auto", className)} role="img" aria-label="Nexora logo">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3B82F6" />
          <stop offset="1" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>
      {/* N tile */}
      <rect x="60" y="12" width="76" height="76" rx="14" fill={`url(#${id})`} />
      <path
        d="M80 70V30l36 40V30"
        fill="none"
        stroke="#fff"
        strokeWidth="7.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* panda — slim, along the left leg */}
      <g className="nx-bounce-a">
        <circle cx="28" cy="28" r="5.5" fill="#1E293B" />
        <circle cx="48" cy="28" r="5.5" fill="#1E293B" />
        <ellipse cx="38" cy="66" rx="8.5" ry="11" fill="#fff" />
        <ellipse cx="29.5" cy="64" rx="2.8" ry="6" fill="#1E293B" transform="rotate(15 29.5 64)" />
        <ellipse cx="46.5" cy="64" rx="2.8" ry="6" fill="#1E293B" transform="rotate(-15 46.5 64)" />
        <circle cx="38" cy="42" r="12" fill="#fff" />
        <ellipse cx="32" cy="40" rx="3.8" ry="4.8" fill="#1E293B" transform="rotate(-18 32 40)" />
        <ellipse cx="44" cy="40" rx="3.8" ry="4.8" fill="#1E293B" transform="rotate(18 44 40)" />
        <g className="nx-blink">
          <circle cx="32" cy="40" r="1.7" fill="#fff" />
          <circle cx="44" cy="40" r="1.7" fill="#fff" />
        </g>
        <ellipse cx="38" cy="50" rx="2.4" ry="1.9" fill="#1E293B" />
        <circle cx="28" cy="48" r="2.4" fill="#F9A8D4" opacity="0.55" />
        <circle cx="48" cy="48" r="2.4" fill="#F9A8D4" opacity="0.55" />
        <ellipse cx="32" cy="77" rx="3.6" ry="2.2" fill="#1E293B" />
        <ellipse cx="44" cy="77" rx="3.6" ry="2.2" fill="#1E293B" />
      </g>
      {/* penguin — slim, along the right leg */}
      <g className="nx-bounce-b">
        <ellipse cx="131.5" cy="52" rx="2.8" ry="7.5" fill="#1E293B" transform="rotate(10 131.5 52)" />
        <ellipse cx="152.5" cy="52" rx="2.8" ry="7.5" fill="#1E293B" transform="rotate(-10 152.5 52)" />
        <ellipse cx="142" cy="50" rx="10.5" ry="19" fill="#1E293B" />
        <ellipse cx="142" cy="55" rx="6.5" ry="11" fill="#fff" />
        <ellipse cx="142" cy="38" rx="7.5" ry="8" fill="#fff" />
        <g className="nx-blink">
          <circle cx="138.5" cy="36.5" r="2" fill="#1E293B" />
          <circle cx="145.5" cy="36.5" r="2" fill="#1E293B" />
        </g>
        <path d="M138.8 40.5 L145.2 40.5 L142 44 Z" fill="#EA580C" />
        <ellipse cx="136" cy="69" rx="4" ry="2.4" fill="#EA580C" />
        <ellipse cx="148" cy="69" rx="4" ry="2.4" fill="#EA580C" />
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
