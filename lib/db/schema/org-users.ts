import { index, pgTable, unique, uuid } from "drizzle-orm/pg-core";

import { columns } from "./base";
import { orgs } from "./orgs";
import { roles } from "./roles";

export const orgUsers = pgTable(
  "org_users",
  {
    id: columns.id(),
    orgId: uuid("org_id")
      .notNull()
      .references(() => orgs.id, { onDelete: "cascade" }),
    userId: uuid("user_id").notNull(), // References auth.users (Supabase managed)
    roleId: uuid("role_id")
      .notNull()
      .references(() => roles.id),
    createdAt: columns.createdAt(),
  },
  table => [
    index("idx_org_users_user_id").on(table.userId),
    index("idx_org_users_org_id").on(table.orgId),
    unique("uq_org_users_org_user").on(table.orgId, table.userId),
  ],
);

export type OrgUser = typeof orgUsers.$inferSelect;
export type NewOrgUser = typeof orgUsers.$inferInsert;
