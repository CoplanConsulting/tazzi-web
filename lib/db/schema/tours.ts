import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { columns, tableColumns } from "./base";
import { orgs } from "./orgs";

// Tour status enum
export const tourStatusEnum = pgEnum("tour_status", [
  "Upcoming",
  "Active",
  "Completed",
  "Cancelled",
]);

// Tours table
export const tours = pgTable("tours", {
  // Organization-scoped columns with audit (id, orgId, createdBy, createdAt, updatedAt)
  ...tableColumns.organizationScopedAudited(),

  // Foreign key reference to orgs
  orgId: columns.orgId().references(() => orgs.id, { onDelete: "cascade" }),

  // Tour details
  name: text("name").notNull(),
  artist: text("artist"),
  startDate: timestamp("start_date", { withTimezone: true }).notNull(),
  endDate: timestamp("end_date", { withTimezone: true }).notNull(),
  tourManager: text("tour_manager"),

  // Status with default
  status: tourStatusEnum("status").default("Upcoming").notNull(),
});

export type Tour = typeof tours.$inferSelect;
export type NewTour = typeof tours.$inferInsert;
