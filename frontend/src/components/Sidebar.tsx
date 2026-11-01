import { LayoutDashboard, Users, BarChart3, Settings, X } from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";

export type DashboardView = "overview" | "customers" | "reports" | "settings";

const items: { id: DashboardView; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "customers", label: "Customers", icon: Users },
  { id: "reports", label: "Reports", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
];

export function Sidebar({
  view,
  onChange,
  mobileOpen,
  onClose,
}: {
  view: DashboardView;
  onChange: (v: DashboardView) => void;
  mobileOpen: boolean;
  onClose: () => void;
}) {
  const content = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center justify-between border-b border-border px-5">
        <span className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-lg font-extrabold text-primary-foreground">
            N
          </span>
          <span className="text-lg font-extrabold tracking-tight">NEXORA</span>
        </span>
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={onClose} aria-label="Close sidebar">
          <X className="size-5" />
        </Button>
      </div>
      <nav className="flex-1 space-y-1 p-3" aria-label="Dashboard">
        {items.map((item) => {
          const Icon = item.icon;
          const active = view === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                onChange(item.id);
                onClose();
              }}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="size-5" aria-hidden />
              {item.label}
            </button>
          );
        })}
      </nav>
      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">
            AR
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">Alex Rivera</p>
            <p className="truncate text-xs text-muted-foreground">admin@nexora.io</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r border-border bg-card lg:block">{content}</aside>
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden />
          <aside className="absolute inset-y-0 left-0 w-72 bg-card shadow-xl">{content}</aside>
        </div>
      )}
    </>
  );
}
