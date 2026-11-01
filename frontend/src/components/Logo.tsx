import { useId } from "react";
import { cn } from "../lib/utils";

/**
 * NEXORA animated mascot logo.
 * A 12s looping story: the penguin stands at the side, then hops up to sit
 * on the upper leg of the N; the panda then hops onto the lower leg on the
 * blue tile. Both idle with cute bobbing, blinking (and the penguin waves).
 * Keyframes live in index.css; disabled under prefers-reduced-motion.
 */
export function LogoMark({ className }: { className?: string }) {
  const id = useId();
  return (
    <svg viewBox="0 -15 160 115" className={cn("h-9 w-auto", className)} role="img" aria-label="Nexora logo">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3B82F6" />
          <stop offset="1" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>
      {/* N tile */}
      <rect x="50" y="22" width="60" height="60" rx="12" fill={`url(#${id})`} />
      <path
        d="M65 68V36l30 32V36"
        fill="none"
        stroke="#fff"
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* panda: starts below-left, hops onto the lower leg */}
      <g className="nx-jd">
        <g className="nx-bob2">
          <ellipse cx="28" cy="92" rx="12" ry="8" fill="#fff" />
          <ellipse cx="17" cy="90" rx="3" ry="6.5" fill="#1E293B" transform="rotate(18 17 90)" />
          <ellipse cx="39" cy="90" rx="3" ry="6.5" fill="#1E293B" transform="rotate(-18 39 90)" />
          <circle cx="16" cy="60" r="6" fill="#1E293B" />
          <circle cx="40" cy="60" r="6" fill="#1E293B" />
          <circle cx="28" cy="72" r="14" fill="#fff" />
          <ellipse cx="22" cy="70" rx="4.2" ry="5.2" fill="#1E293B" transform="rotate(-18 22 70)" />
          <ellipse cx="34" cy="70" rx="4.2" ry="5.2" fill="#1E293B" transform="rotate(18 34 70)" />
          <g className="nx-blink">
            <circle cx="22" cy="70" r="1.8" fill="#fff" />
            <circle cx="34" cy="70" r="1.8" fill="#fff" />
          </g>
          <ellipse cx="28" cy="78" rx="2.6" ry="2" fill="#1E293B" />
          <circle cx="18" cy="76" r="2.6" fill="#F9A8D4" opacity="0.55" />
          <circle cx="38" cy="76" r="2.6" fill="#F9A8D4" opacity="0.55" />
        </g>
      </g>
      {/* penguin: starts standing at the side, hops onto the upper leg */}
      <g className="nx-jp">
        <g className="nx-bob">
          <ellipse cx="119" cy="64" rx="3" ry="8" fill="#1E293B" transform="rotate(12 119 64)" />
          <g className="nx-wave">
            <ellipse cx="145" cy="64" rx="3" ry="8" fill="#1E293B" />
          </g>
          <ellipse cx="132" cy="62" rx="12" ry="17" fill="#1E293B" />
          <ellipse cx="132" cy="67" rx="7.5" ry="10" fill="#fff" />
          <ellipse cx="132" cy="52" rx="8" ry="8.5" fill="#fff" />
          <g className="nx-blink">
            <circle cx="128.5" cy="50.5" r="2" fill="#1E293B" />
            <circle cx="135.5" cy="50.5" r="2" fill="#1E293B" />
          </g>
          <path d="M128.8 54.5 L135.2 54.5 L132 58 Z" fill="#EA580C" />
          <ellipse cx="126" cy="79" rx="4.2" ry="2.4" fill="#EA580C" />
          <ellipse cx="138" cy="79" rx="4.2" ry="2.4" fill="#EA580C" />
        </g>
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
