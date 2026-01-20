import { pgTable, text, varchar } from "drizzle-orm/pg-core";

import { columns } from "./base";

export const capabilities = pgTable("capabilities", {
  id: columns.id(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  description: text("description"),
});

export type Capability = typeof capabilities.$inferSelect;
export type NewCapability = typeof capabilities.$inferInsert;
