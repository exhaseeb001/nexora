import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { pricingTiers } from "../data/demo";
import { cn } from "../lib/utils";

export function Pricing() {
  const [yearly, setYearly] = useState(false);
  const [chosen, setChosen] = useState<string | null>(null);

  return (
    <section id="pricing" className="scroll-mt-20 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Simple, <span className="text-gradient">honest pricing</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Start free for 14 days. No credit card required. Cancel anytime.
          </p>
          <div
            className="mt-6 inline-flex items-center rounded-full border bg-card p-1"
            role="group"
            aria-label="Billing period"
          >
            {(["Monthly", "Yearly"] as const).map((label) => {
              const active = yearly === (label === "Yearly");
              return (
                <button
                  key={label}
                  onClick={() => setYearly(label === "Yearly")}
                  aria-pressed={active}
                  className={cn(
                    "cursor-pointer rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200",
                    active ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {label}
                  {label === "Yearly" && (
                    <span className="ml-1.5 rounded-full bg-accent px-2 py-0.5 text-[11px] text-accent-foreground">
                      -20%
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {pricingTiers.map((tier) => {
            const price = yearly ? tier.yearly : tier.monthly;
            return (
              <Card
                key={tier.name}
                className={cn(
                  "relative flex flex-col transition-all duration-300 hover:-translate-y-1",
                  tier.highlighted && "border-primary shadow-glow lg:scale-[1.03]"
                )}
              >
                {tier.highlighted && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2" variant="accent">
                    Most popular
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="text-xl">{tier.name}</CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                  <div className="pt-4">
                    <span className="text-4xl font-extrabold">${price}</span>
                    <span className="text-muted-foreground"> / mo{yearly ? ", billed yearly" : ""}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" aria-hidden />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={tier.highlighted ? "default" : "outline"}
                    onClick={() => setChosen(tier.name)}
                  >
                    {chosen === tier.name ? "Selected ✓" : tier.cta}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
