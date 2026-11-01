import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Zap, ShieldCheck, Workflow, Globe, Puzzle, Sparkles, type LucideIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { features } from "../data/demo";

gsap.registerPlugin(ScrollTrigger);

const icons: Record<string, LucideIcon> = {
  zap: Zap,
  shield: ShieldCheck,
  workflow: Workflow,
  globe: Globe,
  puzzle: Puzzle,
  sparkles: Sparkles,
};

export function Features() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;
      gsap.from("[data-feature-card]", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: "[data-feature-grid]",
          start: "top 80%",
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="features" className="scroll-mt-20 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Everything you need to <span className="text-gradient">understand growth</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            One platform for metrics, automation and insights. Built for teams that ship.
          </p>
        </div>
        <div data-feature-grid className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => {
            const Icon = icons[f.icon];
            return (
              <Card
                key={f.title}
                data-feature-card
                className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
              >
                <CardHeader>
                  <span className="mb-2 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <CardTitle>{f.title}</CardTitle>
                  <CardDescription>{f.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
