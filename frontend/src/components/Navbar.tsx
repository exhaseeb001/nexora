import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "../lib/utils";

const links = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Dashboard", href: "/dashboard" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const go = (href: string) => {
    setOpen(false);
    if (href.startsWith("#")) {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 glass">
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6"
        aria-label="Main navigation"
      >
        <Link to="/" className="flex items-center gap-2" aria-label="Nexora home">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-lg font-extrabold text-primary-foreground">
            N
          </span>
          <span className="text-xl font-extrabold tracking-tight">NEXORA</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) =>
            l.href.startsWith("#") ? (
              <button
                key={l.label}
                onClick={() => go(l.href)}
                className="cursor-pointer rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground"
              >
                {l.label}
              </button>
            ) : (
              <Link
                key={l.label}
                to={l.href}
                className={cn(
                  "rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 hover:bg-muted",
                  location.pathname === l.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {l.label}
              </Link>
            )
          )}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Button variant="outline" size="sm" onClick={() => navigate("/dashboard")}>
            Sign in
          </Button>
          <Button size="sm" onClick={() => navigate("/dashboard")}>
            Get started <ArrowRight className="size-4" />
          </Button>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-background px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) =>
              l.href.startsWith("#") ? (
                <button
                  key={l.label}
                  onClick={() => go(l.href)}
                  className="cursor-pointer rounded-lg px-3 py-2.5 text-left text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  {l.label}
                </button>
              ) : (
                <Link
                  key={l.label}
                  to={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  {l.label}
                </Link>
              )
            )}
            <div className="mt-2 flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => { setOpen(false); navigate("/dashboard"); }}>
                Sign in
              </Button>
              <Button className="flex-1" onClick={() => { setOpen(false); navigate("/dashboard"); }}>
                Get started
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
