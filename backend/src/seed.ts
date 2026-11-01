import { db } from "./db.js";

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(42);

export function seed() {
  db.exec("DELETE FROM customers; DELETE FROM metrics; DELETE FROM channels;");

  const insertMetric = db.prepare(
    "INSERT INTO metrics (day, revenue, users) VALUES (?, ?, ?)"
  );
  for (let i = 0; i < 30; i++) {
    insertMetric.run(
      `Oct ${i + 1}`,
      Math.round(8200 + i * 210 + rand() * 2600),
      Math.round(1200 + i * 48 + rand() * 320)
    );
  }

  const insertChannel = db.prepare(
    "INSERT INTO channels (label, value) VALUES (?, ?)"
  );
  [
    ["Organic", 42],
    ["Paid Ads", 28],
    ["Referral", 18],
    ["Social", 12],
  ].forEach(([label, value]) => insertChannel.run(label as string, value as number));

  const first = ["Ava","Liam","Maya","Noah","Zoe","Ethan","Ivy","Lucas","Nora","Owen","Ella","Milo"];
  const last = ["Chen","Khan","Garcia","Smith","Patel","Kim","Rossi","Silva","Haddad","Novak","Ali","Berg"];
  const plans = ["Starter", "Growth", "Enterprise"];
  const statuses = ["active", "active", "active", "trial", "churned"];
  const insertCustomer = db.prepare(
    "INSERT INTO customers (id, name, email, plan, status, spent, joined) VALUES (?, ?, ?, ?, ?, ?, ?)"
  );
  first.forEach((fn, i) => {
    insertCustomer.run(
      `cus_${1000 + i}`,
      `${fn} ${last[i]}`,
      `${fn.toLowerCase()}.${last[i].toLowerCase()}@example.com`,
      plans[i % 3],
      statuses[i % 5],
      Math.round(120 + rand() * 4800),
      `2026-${String(1 + (i % 9)).padStart(2, "0")}-${String(3 + (i % 25)).padStart(2, "0")}`
    );
  });

  console.log("Seeded: 30 metric days, 4 channels, 12 customers.");
}

if (process.argv[1]?.endsWith("seed.ts") || process.argv[1]?.endsWith("seed.js")) {
  seed();
}
