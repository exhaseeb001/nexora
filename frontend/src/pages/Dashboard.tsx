import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Bell } from "lucide-react";
import { Sidebar, type DashboardView } from "../components/Sidebar";
import { StatCard } from "../components/StatCard";
import { LineChart, BarChart } from "../components/charts";
import { DataTable } from "../components/DataTable";
import { ThemeToggle } from "../components/ThemeToggle";
import { Button } from "../components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { dataProvider, type Stat, type RevenuePoint, type Channel } from "../lib/api";
import { cn } from "../lib/utils";

const titles: Record<DashboardView, { title: string; sub: string }> = {
  overview: { title: "Overview", sub: "Your business at a glance" },
  customers: { title: "Customers", sub: "Search, sort and manage accounts" },
  reports: { title: "Reports", sub: "Revenue and acquisition deep dives" },
  settings: { title: "Settings", sub: "Workspace preferences" },
};

function RangeSelector({ range, onChange }: { range: number; onChange: (r: number) => void }) {
  return (
    <div className="inline-flex items-center rounded-full border bg-card p-1" role="group" aria-label="Date range">
      {[7, 30].map((r) => (
        <button
          key={r}
          onClick={() => onChange(r)}
          aria-pressed={range === r}
          className={cn(
            "cursor-pointer rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-200",
            range === r ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:text-foreground"
          )}
        >
          {r}D
        </button>
      ))}
    </div>
  );
}

function Overview() {
  const [range, setRange] = useState(30);
  const [stats, setStats] = useState<Stat[] | null>(null);
  const [series, setSeries] = useState<RevenuePoint[] | null>(null);
  const [channels, setChannels] = useState<Channel[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    dataProvider.getStats().then((s) => !cancelled && setStats(s));
    dataProvider.getChannels().then((c) => !cancelled && setChannels(c));
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    setSeries(null);
    dataProvider.getRevenue(range).then((r) => !cancelled && setSeries(r));
    return () => {
      cancelled = true;
    };
  }, [range]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Key metrics</h2>
        <RangeSelector range={range} onChange={setRange} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats ? (
          stats.map((s) => <StatCard key={s.id} stat={s} />)
        ) : (
          <p className="text-sm text-muted-foreground">Loading metrics...</p>
        )}
      </div>
      <div className="grid gap-5 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Revenue</CardTitle>
              <p className="text-sm text-muted-foreground">Last {range} days</p>
            </div>
            <Badge variant="success">+12.4%</Badge>
          </CardHeader>
          <CardContent>
            {series ? <LineChart data={series} /> : <p className="text-sm text-muted-foreground">Loading chart...</p>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Acquisition channels</CardTitle>
            <p className="text-sm text-muted-foreground">Share of new users</p>
          </CardHeader>
          <CardContent>
            {channels ? <BarChart data={channels} /> : <p className="text-sm text-muted-foreground">Loading chart...</p>}
          </CardContent>
        </Card>
      </div>
      <DataTable compact />
    </div>
  );
}

function Reports() {
  const [series, setSeries] = useState<RevenuePoint[] | null>(null);
  const [channels, setChannels] = useState<Channel[] | null>(null);
  const [highlights, setHighlights] = useState<[string, string][] | null>(null);

  useEffect(() => {
    let cancelled = false;
    dataProvider.getRevenue(30).then((r) => !cancelled && setSeries(r));
    dataProvider.getChannels().then((c) => !cancelled && setChannels(c));
    dataProvider.getHighlights().then((h) => !cancelled && setHighlights(h));
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Revenue trend</CardTitle>
          <p className="text-sm text-muted-foreground">Daily revenue, last 30 days</p>
        </CardHeader>
        <CardContent>
          {series ? <LineChart data={series} height={300} /> : <p className="text-sm text-muted-foreground">Loading chart...</p>}
        </CardContent>
      </Card>
      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Acquisition channels</CardTitle>
            <p className="text-sm text-muted-foreground">Share of new users</p>
          </CardHeader>
          <CardContent>
            {channels ? <BarChart data={channels} height={300} /> : <p className="text-sm text-muted-foreground">Loading chart...</p>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Highlights</CardTitle>
          </CardHeader>
          <CardContent>
            {highlights ? (
              <ul className="space-y-4 text-sm">
                {highlights.map(([k, v]) => (
                  <li key={k} className="flex items-center justify-between gap-4 border-b border-border/60 pb-3 last:border-0">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="text-right font-semibold">{v}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">Loading highlights...</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Settings() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [retention, setRetention] = useState("13 months");

  const Toggle = ({ on, onClick, label }: { on: boolean; onClick: () => void; label: string }) => (
    <button
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onClick}
      className={cn(
        "relative h-6 w-11 cursor-pointer rounded-full transition-colors duration-200",
        on ? "bg-primary" : "bg-muted"
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 size-5 rounded-full bg-white shadow transition-all duration-200",
          on ? "left-[1.375rem]" : "left-0.5"
        )}
      />
    </button>
  );

  return (
    <div className="max-w-2xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <p className="text-sm text-muted-foreground">Switch between light and dark mode.</p>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <span className="text-sm font-medium">Theme</span>
          <ThemeToggle />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Anomaly email alerts</p>
              <p className="text-xs text-muted-foreground">Get emailed when a metric spikes or dips.</p>
            </div>
            <Toggle on={emailAlerts} onClick={() => setEmailAlerts((v) => !v)} label="Anomaly email alerts" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Weekly digest</p>
              <p className="text-xs text-muted-foreground">A summary of your metrics every Monday.</p>
            </div>
            <Toggle on={weeklyDigest} onClick={() => setWeeklyDigest((v) => !v)} label="Weekly digest" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Data retention</CardTitle>
        </CardHeader>
        <CardContent>
          <label className="block text-sm font-medium">
            Keep event data for
            <select
              value={retention}
              onChange={(e) => setRetention(e.target.value)}
              className="mt-2 block h-10 w-full cursor-pointer rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              {["30 days", "6 months", "13 months", "Forever"].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </label>
          <p className="mt-3 text-xs text-muted-foreground">Currently keeping data for {retention}.</p>
        </CardContent>
      </Card>
    </div>
  );
}

export function Dashboard() {
  const [view, setView] = useState<DashboardView>("overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { title, sub } = titles[view];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar view={view} onChange={setView} mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur sm:px-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open sidebar">
              <Menu className="size-5" />
            </Button>
            <div>
              <h1 className="text-lg font-extrabold tracking-tight">{title}</h1>
              <p className="hidden text-xs text-muted-foreground sm:block">{sub}</p>
            </div>
            <Badge variant={dataProvider.live ? "success" : "secondary"} title={dataProvider.live ? "Connected to the Nexora API" : "Using built-in demo data"}>
              {dataProvider.live ? "Live API" : "Demo data"}
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            <Link to="/" className="mr-1 hidden text-sm font-medium text-muted-foreground hover:text-foreground sm:block">
              View site
            </Link>
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell className="size-5" />
            </Button>
            <ThemeToggle />
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6">
          <div className="mx-auto max-w-7xl">
            {view === "overview" && <Overview />}
            {view === "customers" && <DataTable />}
            {view === "reports" && <Reports />}
            {view === "settings" && <Settings />}
          </div>
        </main>
      </div>
    </div>
  );
}
