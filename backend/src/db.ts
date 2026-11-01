import { DatabaseSync } from "node:sqlite";
import { existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = join(dirname(fileURLToPath(import.meta.url)), "..", "data");
if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

export const db = new DatabaseSync(join(dir, "nexora.db"));

db.exec(`
  CREATE TABLE IF NOT EXISTS customers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    plan TEXT NOT NULL CHECK (plan IN ('Starter','Growth','Enterprise')),
    status TEXT NOT NULL CHECK (status IN ('active','trial','churned')),
    spent INTEGER NOT NULL DEFAULT 0,
    joined TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS metrics (
    day TEXT PRIMARY KEY,
    revenue INTEGER NOT NULL,
    users INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS channels (
    label TEXT PRIMARY KEY,
    value INTEGER NOT NULL
  );
`);
