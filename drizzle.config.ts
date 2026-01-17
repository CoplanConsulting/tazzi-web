import type { Config } from "drizzle-kit";

import env from "./lib/env";

export default {
  out: "./lib/db/migrations",
  schema: "./lib/db/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.SUPABASE_DB_URL,
  },
} satisfies Config;
