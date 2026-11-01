import { useEffect, useState } from "react";
import { ArrowUpDown, Search } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { dataProvider, type Customer } from "../lib/api";
import { cn } from "../lib/utils";

type SortKey = "name" | "plan" | "status" | "spent" | "joined";

const statusVariant: Record<Customer["status"], "success" | "warning" | "destructive"> = {
  active: "success",
  trial: "warning",
  churned: "destructive",
};

export function DataTable({ compact = false }: { compact?: boolean }) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("spent");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [rows, setRows] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const t = setTimeout(() => {
      dataProvider
        .getCustomers({ q: query, sort: sortKey, dir: sortDir })
        .then((r) => {
          if (!cancelled) {
            setRows(r);
            setLoading(false);
          }
        })
        .catch(() => {
          if (!cancelled) setLoading(false);
        });
    }, 150);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [query, sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const shown = compact ? rows.slice(0, 6) : rows;

  const headers: { key: SortKey; label: string }[] = [
    { key: "name", label: "Customer" },
    { key: "plan", label: "Plan" },
    { key: "status", label: "Status" },
    { key: "spent", label: "Spent" },
    { key: "joined", label: "Joined" },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <CardTitle>{compact ? "Recent customers" : "All customers"}</CardTitle>
        <label className="relative block sm:w-64">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search customers..."
            aria-label="Search customers"
            className="h-9 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-sm outline-none transition-shadow focus:ring-2 focus:ring-ring"
          />
        </label>
      </CardHeader>
      <CardContent className="overflow-x-auto px-0 sm:px-6">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              {headers.map((h) => (
                <th key={h.key} className="px-4 py-3 font-medium first:pl-6 last:pr-6">
                  <button
                    onClick={() => toggleSort(h.key)}
                    className="inline-flex cursor-pointer items-center gap-1 hover:text-foreground"
                    aria-label={`Sort by ${h.label}`}
                  >
                    {h.label}
                    <ArrowUpDown
                      className={cn("size-3.5", sortKey === h.key && "text-primary")}
                      aria-hidden
                    />
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shown.map((c) => (
              <tr key={c.id} className="border-b border-border/60 transition-colors last:border-0 hover:bg-muted/50">
                <td className="px-4 py-3 first:pl-6">
                  <p className="font-semibold">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.email}</p>
                </td>
                <td className="px-4 py-3">
                  <Badge variant="outline">{c.plan}</Badge>
                </td>
                <td className="px-4 py-3">
                  <Badge variant={statusVariant[c.status]} className="capitalize">
                    {c.status}
                  </Badge>
                </td>
                <td className="px-4 py-3 font-semibold">${c.spent.toLocaleString()}</td>
                <td className="px-4 py-3 text-muted-foreground last:pr-6">{c.joined}</td>
              </tr>
            ))}
            {!loading && shown.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-muted-foreground">
                  No customers match "{query}".
                </td>
              </tr>
            )}
            {loading && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-muted-foreground">
                  Loading customers...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
