import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { Pricing } from "../components/Pricing";
import { Footer } from "../components/Footer";
import { Button } from "../components/ui/button";

export function Landing() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Pricing />
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-secondary px-6 py-16 text-center text-white sm:px-12">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(40rem_20rem_at_50%_120%,rgba(255,255,255,0.25),transparent)]"
              />
              <h2 className="relative text-3xl font-extrabold tracking-tight sm:text-4xl">
                Ready to move at your speed?
              </h2>
              <p className="relative mx-auto mt-4 max-w-xl text-white/80">
                Join 4,000+ teams already making faster decisions with Nexora.
              </p>
              <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button
                  size="lg"
                  variant="accent"
                  onClick={() => navigate("/dashboard")}
                >
                  Start free trial <ArrowRight className="size-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                  onClick={() => navigate("/dashboard")}
                >
                  Talk to sales
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
