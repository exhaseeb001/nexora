import { useEffect, useRef, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const HeroCanvas = lazy(() =>
  import("./HeroCanvas").then((m) => ({ default: m.HeroCanvas }))
);

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-hero-badge]", { y: 20, opacity: 0, duration: 0.6 })
        .from("[data-hero-title] > span", { y: 60, opacity: 0, duration: 0.8, stagger: 0.12 }, "-=0.3")
        .from("[data-hero-sub]", { y: 24, opacity: 0, duration: 0.7 }, "-=0.4")
        .from("[data-hero-cta] > *", { y: 20, opacity: 0, duration: 0.5, stagger: 0.1 }, "-=0.4")
        .from("[data-hero-canvas]", { opacity: 0, scale: 0.96, duration: 1 }, "-=0.6")
        .from("[data-hero-stats] > *", { y: 16, opacity: 0, duration: 0.5, stagger: 0.08 }, "-=0.6");
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_30rem_at_50%_-10%,rgb(var(--primary)/0.12),transparent)]"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div data-hero-badge>
            <Badge variant="secondary" className="mb-6">
              New: Smart Insights 2.0 is live
            </Badge>
          </div>
          <h1 data-hero-title className="text-4xl font-extrabold tracking-tight sm:text-6xl">
            <span className="block">Analytics that</span>
            <span className="text-gradient block">move at your speed</span>
          </h1>
          <p data-hero-sub className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            Nexora streams your product metrics in realtime, spots anomalies automatically,
            and turns raw events into decisions. Set up in minutes, not sprints.
          </p>
          <div data-hero-cta className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" onClick={() => navigate("/dashboard")}>
              Start free trial <ArrowRight className="size-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/dashboard")}>
              <Play className="size-4" /> Live demo
            </Button>
          </div>
          <dl data-hero-stats className="mx-auto mt-12 grid max-w-lg grid-cols-3 gap-4">
            {[
              ["99.99%", "Uptime SLA"],
              ["32", "Global regions"],
              ["4.9/5", "Customer rating"],
            ].map(([v, l]) => (
              <div key={l} className="rounded-xl border bg-card p-4">
                <dt className="sr-only">{l}</dt>
                <dd className="text-2xl font-extrabold">{v}</dd>
                <dd className="mt-1 text-xs text-muted-foreground">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div data-hero-canvas className="mt-12">
          <Suspense
            fallback={
              <div className="h-64 w-full sm:h-80 lg:h-[26rem]" aria-hidden />
            }
          >
            <HeroCanvas />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
