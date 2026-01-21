import { date, index, integer, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { tableColumns } from "./base";
import { tours } from "./tours";

// Day type enum - industry-standard values for touring
export const dayTypeEnum = pgEnum("day_type", [
  "show",
  "travel",
  "off",
  "rehearsal",
  "press",
  "promo",
]);

// Day status enum - workflow states
export const dayStatusEnum = pgEnum("day_status", [
  "tentative",
  "confirmed",
  "in_progress",
  "completed",
  "cancelled",
]);

// Days table
export const days = pgTable("days", {
  // Audited columns (id, createdBy, createdAt, updatedAt)
  ...tableColumns.audited(),

  // Tour relationship
  tourId: uuid("tour_id").notNull().references(() => tours.id, { onDelete: "cascade" }),

  // Day identification
  date: date("date").notNull(),
  dayNumber: integer("day_number"),

  // Classification
  dayType: dayTypeEnum("day_type").notNull().default("off"),
  status: dayStatusEnum("day_status").notNull().default("tentative"),

  // Location (populated when day becomes show/rehearsal/press/promo)
  city: text("city"),
  state: text("state"),
  country: text("country"),
  venueName: text("venue_name"),
  timezone: text("timezone"), // IANA string, null for off/travel days

  // Metadata
  notes: text("notes"),
}, table => [
  // Composite index for common query: "all days for tour by date"
  index("days_tour_date_idx").on(table.tourId, table.date),
]);

// IANA timezone validation pattern (e.g., America/New_York, Europe/London)
const ianaTimezonePattern = /^[a-z_]+\/[a-z_]+$/i;

// Zod schemas for validation
export const insertDaySchema = createInsertSchema(days, {
  // Validate IANA format only when timezone is provided (null for off/travel days)
  timezone: schema => schema.refine(
    val => !val || ianaTimezonePattern.test(val),
    "Must be valid IANA timezone (e.g., America/New_York)",
  ),
}).omit({
  id: true,
  createdBy: true,
  createdAt: true,
  updatedAt: true,
});

export const selectDaySchema = createSelectSchema(days);

// Type exports
export type Day = typeof days.$inferSelect;
export type NewDay = typeof days.$inferInsert;
