import { useEffect, useRef, useState } from "react";

function useAnimatedDraw() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
}

export function LineChart({ data, height = 260 }: { data: { day: string; revenue: number }[]; height?: number }) {
  const { ref, visible } = useAnimatedDraw();
  const w = 720;
  const h = 260;
  const pad = 8;
  const max = Math.max(...data.map((d) => d.revenue));
  const min = Math.min(...data.map((d) => d.revenue));
  const range = max - min || 1;
  const x = (i: number) => pad + (i / (data.length - 1)) * (w - pad * 2);
  const y = (v: number) => h - pad - ((v - min) / range) * (h - pad * 2 - 30);
  const line = data.map((d, i) => `${x(i)},${y(d.revenue)}`).join(" ");
  const area = `${pad},${h - pad} ${line} ${w - pad},${h - pad}`;
  const id = "revGrad";

  return (
    <div ref={ref} style={{ height }}>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="h-full w-full"
        role="img"
        aria-label="Revenue over the last 30 days"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgb(var(--primary))" stopOpacity="0.35" />
            <stop offset="100%" stopColor="rgb(var(--primary))" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((f) => (
          <line
            key={f}
            x1={pad}
            x2={w - pad}
            y1={h * f}
            y2={h * f}
            stroke="rgb(var(--border))"
            strokeDasharray="4 4"
          />
        ))}
        <polygon points={area} fill={`url(#${id})`} opacity={visible ? 1 : 0} style={{ transition: "opacity 0.8s ease 0.4s" }} />
        <polyline
          points={line}
          fill="none"
          stroke="rgb(var(--primary))"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="2000"
          strokeDashoffset={visible ? 0 : 2000}
          style={{ transition: "stroke-dashoffset 1.6s ease" }}
        />
        {data.filter((_, i) => i % 5 === 0).map((d, k) => (
          <text
            key={k}
            x={x(data.indexOf(d))}
            y={h - 2}
            textAnchor="middle"
            fontSize="11"
            fill="rgb(var(--muted-foreground))"
          >
            {d.day}
          </text>
        ))}
      </svg>
    </div>
  );
}

export function BarChart({ data, height = 260 }: { data: { label: string; value: number }[]; height?: number }) {
  const { ref, visible } = useAnimatedDraw();
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div ref={ref} style={{ height }} className="flex items-end justify-around gap-4 px-2" role="img" aria-label="Acquisition channels">
      {data.map((d, i) => (
        <div key={d.label} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
          <span className="text-sm font-bold">{visible ? `${d.value}%` : ""}</span>
          <div
            className="w-full max-w-16 rounded-t-lg bg-gradient-to-t from-primary to-secondary transition-all duration-1000 ease-out"
            style={{ height: visible ? `${(d.value / max) * 72}%` : "0%", transitionDelay: `${i * 120}ms` }}
          />
          <span className="text-xs text-muted-foreground">{d.label}</span>
        </div>
      ))}
    </div>
  );
}
