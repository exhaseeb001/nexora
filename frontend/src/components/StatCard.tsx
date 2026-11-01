import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import type { Stat } from "../data/demo";
import { cn } from "../lib/utils";

function Sparkline({ data, positive }: { data: number[]; positive: boolean }) {
  const w = 120;
  const h = 36;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data
    .map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * (h - 4) - 2}`)
    .join(" ");
  const color = positive ? "#10b981" : "#ef4444";
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-9 w-28" aria-hidden>
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StatCard({ stat }: { stat: Stat }) {
  const positive = stat.trend === "up";
  const Icon = positive ? TrendingUp : TrendingDown;
  return (
    <Card className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold",
            positive ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" : "bg-red-500/15 text-red-600 dark:text-red-400"
          )}
        >
          <Icon className="size-3" aria-hidden />
          {stat.delta}
        </span>
      </CardHeader>
      <CardContent className="flex items-end justify-between">
        <p className="text-2xl font-extrabold tracking-tight sm:text-3xl">{stat.value}</p>
        <Sparkline data={stat.spark} positive={positive} />
      </CardContent>
    </Card>
  );
}
