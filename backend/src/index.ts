import express from "express";
import cors from "cors";
import { db } from "./db.js";
import { seed } from "./seed.js";

const app = express();
app.use(cors());
app.use(express.json());

// Seed on first boot when tables are empty
const metricCount = (db.prepare("SELECT COUNT(*) AS c FROM metrics").get() as { c: number }).c;
if (metricCount === 0) seed();

const STATS = [
  { id: "revenue", label: "Monthly Revenue", value: "$248,900", delta: "+12.4%", trend: "up",
    spark: [42,48,45,55,58,62,60,70,74,78,82,88] },
  { id: "users", label: "Active Users", value: "48,201", delta: "+8.1%", trend: "up",
    spark: [30,34,33,40,44,47,52,55,58,62,66,71] },
  { id: "conversion", label: "Conversion Rate", value: "3.42%", delta: "+0.6%", trend: "up",
    spark: [20,22,21,25,24,28,30,29,33,35,38,41] },
  { id: "churn", label: "Churn Rate", value: "1.8%", delta: "-0.4%", trend: "down",
    spark: [40,38,39,35,34,32,30,31,28,26,25,23] },
];

const HIGHLIGHTS = [
  ["Best day", "Oct 28 — $14,820 revenue"],
  ["Top channel", "Organic search — 42% of signups"],
  ["Fastest growing", "Referrals up 18% this month"],
  ["Watch", "Churn ticked down to 1.8%"],
];

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "nexora-api", version: "1.0.0" });
});

app.get("/api/stats", (_req, res) => {
  res.json(STATS);
});

app.get("/api/revenue", (req, res) => {
  const days = Math.min(Math.max(parseInt(String(req.query.days ?? "30"), 10) || 30, 1), 90);
  const rows = db
    .prepare("SELECT day, revenue, users FROM metrics ORDER BY rowid DESC LIMIT ?")
    .all(days)
    .reverse();
  res.json(rows);
});

app.get("/api/channels", (_req, res) => {
  res.json(db.prepare("SELECT label, value FROM channels ORDER BY value DESC").all());
});

app.get("/api/highlights", (_req, res) => {
  res.json(HIGHLIGHTS);
});

const SORTABLE = new Set(["name", "plan", "status", "spent", "joined"]);

app.get("/api/customers", (req, res) => {
  const q = `%${String(req.query.q ?? "").toLowerCase()}%`;
  const sort = SORTABLE.has(String(req.query.sort)) ? String(req.query.sort) : "spent";
  const dir = String(req.query.dir).toLowerCase() === "asc" ? "ASC" : "DESC";
  const rows = db
    .prepare(
      `SELECT * FROM customers
       WHERE lower(name) LIKE ? OR lower(email) LIKE ? OR lower(plan) LIKE ?
       ORDER BY ${sort} ${dir}`
    )
    .all(q, q, q);
  res.json(rows);
});

app.get("/api/customers/:id", (req, res) => {
  const row = db.prepare("SELECT * FROM customers WHERE id = ?").get(req.params.id);
  if (!row) return res.status(404).json({ error: "Customer not found" });
  res.json(row);
});

app.post("/api/customers", (req, res) => {
  const { name, email, plan = "Starter", status = "trial" } = req.body ?? {};
  if (!name || !email) return res.status(400).json({ error: "name and email are required" });
  const id = `cus_${Date.now()}`;
  const joined = new Date().toISOString().slice(0, 10);
  db.prepare(
    "INSERT INTO customers (id, name, email, plan, status, spent, joined) VALUES (?, ?, ?, ?, ?, 0, ?)"
  ).run(id, name, email, plan, status, joined);
  res.status(201).json(db.prepare("SELECT * FROM customers WHERE id = ?").get(id));
});

app.patch("/api/customers/:id", (req, res) => {
  const allowed = ["name", "email", "plan", "status", "spent"];
  const sets = Object.keys(req.body ?? {}).filter((k) => allowed.includes(k));
  if (sets.length === 0) return res.status(400).json({ error: "Nothing to update" });
  db.prepare(
    `UPDATE customers SET ${sets.map((k) => `${k} = ?`).join(", ")} WHERE id = ?`
  ).run(...sets.map((k) => req.body[k]), req.params.id);
  const row = db.prepare("SELECT * FROM customers WHERE id = ?").get(req.params.id);
  if (!row) return res.status(404).json({ error: "Customer not found" });
  res.json(row);
});

app.delete("/api/customers/:id", (req, res) => {
  const info = db.prepare("DELETE FROM customers WHERE id = ?").run(req.params.id);
  if (info.changes === 0) return res.status(404).json({ error: "Customer not found" });
  res.status(204).end();
});

const PORT = parseInt(process.env.PORT ?? "4000", 10);
app.listen(PORT, () => {
  console.log(`nexora-api listening on http://localhost:${PORT}`);
});
