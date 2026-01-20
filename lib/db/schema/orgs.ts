import { pgTable, varchar } from "drizzle-orm/pg-core";

import { tableColumns } from "./base";

export const orgs = pgTable("orgs", {
  ...tableColumns.common(),
  name: varchar("name", { length: 255 }).notNull(),
});

export type Org = typeof orgs.$inferSelect;
export type NewOrg = typeof orgs.$inferInsert;
