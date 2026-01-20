import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";

import { capabilities } from "./capabilities";
import { roles } from "./roles";

export const roleCapabilities = pgTable(
  "role_capabilities",
  {
    roleId: uuid("role_id")
      .notNull()
      .references(() => roles.id, { onDelete: "cascade" }),
    capabilityId: uuid("capability_id")
      .notNull()
      .references(() => capabilities.id, { onDelete: "cascade" }),
  },
  table => [
    primaryKey({ columns: [table.roleId, table.capabilityId] }),
  ],
);

export type RoleCapability = typeof roleCapabilities.$inferSelect;
export type NewRoleCapability = typeof roleCapabilities.$inferInsert;
