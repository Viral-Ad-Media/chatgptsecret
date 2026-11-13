import { neon } from "@neondatabase/serverless";
import { drizzle as drizzleNeon } from "drizzle-orm/neon-http";
import { drizzle as drizzlePg } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

function createDb() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Copy .env.example to .env.local and add your Neon connection string.",
    );
  }
  // Neon's HTTP driver in production; a plain Postgres pool for local development.
  const host = new URL(url).hostname;
  if (host === "localhost" || host === "127.0.0.1") {
    return drizzlePg(new Pool({ connectionString: url }), { schema }) as unknown as ReturnType<typeof neonDb>;
  }
  return neonDb(url);
}

function neonDb(url: string) {
  return drizzleNeon(neon(url), { schema });
}

type Db = ReturnType<typeof createDb>;
let cached: Db | undefined;

/** Lazily connect so builds don't need a database. */
export function getDb(): Db {
  cached ??= createDb();
  return cached;
}

export { schema };
