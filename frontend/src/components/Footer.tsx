import { Link } from "react-router-dom";

const columns = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Integrations", "Changelog"],
  },
  {
    title: "Company",
    links: ["About", "Blog", "Careers", "Contact"],
  },
  {
    title: "Resources",
    links: ["Documentation", "API reference", "Status", "Community"],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1fr_2fr]">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-lg font-extrabold text-primary-foreground">
                N
              </span>
              <span className="text-xl font-extrabold tracking-tight">NEXORA</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Realtime analytics for teams that ship. Understand growth, act faster.
            </p>
          </div>
          <nav className="grid grid-cols-2 gap-8 sm:grid-cols-3" aria-label="Footer">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-semibold">{col.title}</h3>
                <ul className="mt-3 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <Link
                        to="/"
                        className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                      >
                        {l}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">© 2026 Nexora Inc. All rights reserved.</p>
          <p className="text-xs text-muted-foreground">Built with React, Tailwind CSS and shadcn/ui.</p>
        </div>
      </div>
    </footer>
  );
}
