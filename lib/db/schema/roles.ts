import { pgTable, text, varchar } from "drizzle-orm/pg-core";

import { columns } from "./base";

export const roles = pgTable("roles", {
  id: columns.id(),
  name: varchar("name", { length: 50 }).notNull().unique(),
  description: text("description"),
});

export type Role = typeof roles.$inferSelect;
export type NewRole = typeof roles.$inferInsert;
