import "dotenv/config";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import postgres from "postgres";

import env from "../env";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function applyRLS() {
  // Use direct connection (not pooler) for DDL operations
  const directUrl = env.SUPABASE_DB_URL.replace("?pgbouncer=true", "");
  const sql = postgres(directUrl);

  const rlsSQL = readFileSync(join(__dirname, "rls-policies.sql"), "utf-8");

  console.warn("Applying RLS policies...");

  try {
    await sql.unsafe(rlsSQL);
    console.warn("RLS policies applied successfully!");
  }
  catch (error) {
    console.error("Failed to apply RLS policies:", error);
    throw error;
  }
  finally {
    await sql.end();
  }
}

applyRLS()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
