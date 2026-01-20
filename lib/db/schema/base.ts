import { timestamp, uuid } from "drizzle-orm/pg-core";
import { z } from "zod";

// ============================================================================
// Column Factory Functions
// ============================================================================
// Factory functions ensure each table gets its own column instance
// (static objects would share the same instance across tables)

/**
 * Individual column factories for flexible composition
 */
export const columns = {
  /** Primary key UUID column */
  id: () => uuid("id").primaryKey().defaultRandom(),

  /** Organization scoping column for multi-tenant isolation */
  orgId: () => uuid("org_id").notNull(),

  /** Optional audit column for tracking who created a record */
  createdBy: () => uuid("created_by"),

  /** Created timestamp with timezone (Supabase compatible) */
  createdAt: () => timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),

  /** Updated timestamp with timezone and auto-update */
  updatedAt: () => timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
};

// ============================================================================
// Table Column Presets
// ============================================================================
// Call these functions when defining tables to get fresh column instances

/**
 * Pre-configured column sets for common table patterns
 * Usage: pgTable("my_table", { ...tableColumns.common(), myField: ... })
 */
export const tableColumns = {
  /**
   * Standard columns for most tables
   * Includes: id, createdAt, updatedAt
   */
  common: () => ({
    id: columns.id(),
    createdAt: columns.createdAt(),
    updatedAt: columns.updatedAt(),
  }),

  /**
   * Columns for organization-scoped tables
   * Includes: id, orgId, createdAt, updatedAt
   * Note: Add FK reference to orgs in your table definition
   */
  organizationScoped: () => ({
    id: columns.id(),
    orgId: columns.orgId(),
    createdAt: columns.createdAt(),
    updatedAt: columns.updatedAt(),
  }),

  /**
   * Columns with audit tracking
   * Includes: id, createdBy, createdAt, updatedAt
   */
  audited: () => ({
    id: columns.id(),
    createdBy: columns.createdBy(),
    createdAt: columns.createdAt(),
    updatedAt: columns.updatedAt(),
  }),

  /**
   * Organization-scoped with audit tracking
   * Includes: id, orgId, createdBy, createdAt, updatedAt
   */
  organizationScopedAudited: () => ({
    id: columns.id(),
    orgId: columns.orgId(),
    createdBy: columns.createdBy(),
    createdAt: columns.createdAt(),
    updatedAt: columns.updatedAt(),
  }),
};

// ============================================================================
// Zod Helpers
// ============================================================================

/**
 * Required non-empty string
 */
export function requiredString(message = "This field is required") {
  return z.string().min(1, message).trim();
}

/**
 * Optional string that trims whitespace
 */
export function optionalString() {
  return z.string().trim().optional();
}

/**
 * Date string validation (YYYY-MM-DD or ISO format)
 */
export function dateString(message = "Please enter a valid date") {
  return z.string().min(1, message).refine(
    val => !Number.isNaN(Date.parse(val)),
    { message },
  );
}

/**
 * UUID string validation
 */
export function uuidString(message = "Invalid ID format") {
  return z.string().uuid(message);
}

/**
 * Date range schema with start/end validation
 * Ensures endDate is on or after startDate
 * Uses fixed field names: startDate and endDate
 */
export const dateRangeSchema = z.object({
  startDate: dateString("Start date is required"),
  endDate: dateString("End date is required"),
}).refine(
  (data) => {
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    return start <= end;
  },
  {
    message: "End date must be on or after start date",
    path: ["endDate"],
  },
);

/**
 * Calculate the number of days between two dates (inclusive)
 * @param startDate - Start date string or Date object
 * @param endDate - End date string or Date object
 * @returns Number of days including both start and end dates
 */
export function calculateDayCount(startDate: string | Date, endDate: string | Date): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
}
