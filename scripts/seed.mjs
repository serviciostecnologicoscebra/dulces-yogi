import { spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { CLIENT_SEEDS } from "../src/server/data/clients.js";
import { PRODUCT_SEEDS } from "../src/server/data/products.js";

const escape = (value) => value == null ? "NULL" : typeof value === "number" ? String(value) : typeof value === "boolean" ? String(Number(value)) : `'${String(value).replaceAll("'", "''")}'`;
const columnName = (value) => value.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
const insert = (table, rows) => {
  const columns = Object.keys(rows[0]);
  return rows.map((row) => `INSERT OR IGNORE INTO ${table} (${columns.map(columnName).join(",")}) VALUES (${columns.map((column) => escape(row[column])).join(",")});`).join("\n");
};

mkdirSync(".sites-runtime", { recursive: true });
writeFileSync(".sites-runtime/seed.sql", `${insert("products", PRODUCT_SEEDS)}\n${insert("client_testimonials", CLIENT_SEEDS)}\n`);
const result = spawnSync(process.execPath, ["--import", "./scripts/sites-env.mjs", "./node_modules/wrangler/bin/wrangler.js", "d1", "execute", "DB", "--local", "--config", "dist/server/wrangler.json", "--persist-to", ".wrangler/state", "--file", ".sites-runtime/seed.sql"], { stdio: "inherit" });
process.exit(result.status ?? 1);
