import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "~/lib/db/schema";

let _db: PostgresJsDatabase<typeof schema> | null = null;

export function useDb(): PostgresJsDatabase<typeof schema> {
  if (!_db) {
    const config = useRuntimeConfig();
    const client = postgres(config.supabaseDbUrl);
    _db = drizzle(client, { schema });
  }
  return _db;
}
