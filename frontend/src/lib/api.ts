import { customers, stats, revenueSeries, channelData, type Stat as DemoStat } from "../data/demo";

export interface Customer {
  id: string;
  name: string;
  email: string;
  plan: "Starter" | "Growth" | "Enterprise";
  status: "active" | "trial" | "churned";
  spent: number;
  joined: string;
}

export interface Stat {
  id: string;
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down";
  spark: number[];
}

export interface RevenuePoint {
  day: string;
  revenue: number;
  users: number;
}

export interface Channel {
  label: string;
  value: number;
}

export interface CustomerQuery {
  q: string;
  sort: string;
  dir: "asc" | "desc";
}

export interface DataProvider {
  readonly live: boolean;
  getStats(): Promise<Stat[]>;
  getRevenue(days: number): Promise<RevenuePoint[]>;
  getChannels(): Promise<Channel[]>;
  getHighlights(): Promise<[string, string][]>;
  getCustomers(query: CustomerQuery): Promise<Customer[]>;
}

const BASE = import.meta.env.VITE_API_URL as string | undefined;

async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) throw new Error(`API ${res.status} on ${path}`);
  return res.json() as Promise<T>;
}

class ApiProvider implements DataProvider {
  readonly live = true;
  getStats() {
    return http<Stat[]>("/api/stats");
  }
  getRevenue(days: number) {
    return http<RevenuePoint[]>(`/api/revenue?days=${days}`);
  }
  getChannels() {
    return http<Channel[]>("/api/channels");
  }
  getHighlights() {
    return http<[string, string][]>("/api/highlights");
  }
  getCustomers({ q, sort, dir }: CustomerQuery) {
    const params = new URLSearchParams({ q, sort, dir });
    return http<Customer[]>(`/api/customers?${params}`);
  }
}

class DemoProvider implements DataProvider {
  readonly live = false;
  async getStats(): Promise<Stat[]> {
    return stats as Stat[];
  }
  async getRevenue(days: number): Promise<RevenuePoint[]> {
    return revenueSeries.slice(-days);
  }
  async getChannels(): Promise<Channel[]> {
    return channelData;
  }
  async getHighlights(): Promise<[string, string][]> {
    return [
      ["Best day", "Oct 28 — $14,820 revenue"],
      ["Top channel", "Organic search — 42% of signups"],
      ["Fastest growing", "Referrals up 18% this month"],
      ["Watch", "Churn ticked down to 1.8%"],
    ];
  }
  async getCustomers({ q, sort, dir }: CustomerQuery): Promise<Customer[]> {
    const query = q.toLowerCase();
    const filtered = (customers as Customer[]).filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.email.toLowerCase().includes(query) ||
        c.plan.toLowerCase().includes(query)
    );
    const mult = dir === "asc" ? 1 : -1;
    return [...filtered].sort((a, b) => {
      const va = a[sort as keyof Customer];
      const vb = b[sort as keyof Customer];
      if (typeof va === "number" && typeof vb === "number") return (va - vb) * mult;
      return String(va).localeCompare(String(vb)) * mult;
    });
  }
}

export const dataProvider: DataProvider = BASE ? new ApiProvider() : new DemoProvider();

export type { DemoStat };
