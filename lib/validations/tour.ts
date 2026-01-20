import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

import { calculateDayCount, requiredString } from "~/lib/db/schema/base";

/**
 * Schema for creating a new tour
 * Validates name (required), startDate, endDate with end >= start
 */
export const createTourSchema = z.object({
  name: requiredString("Tour name is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
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
 * Type for tour creation form data
 */
export type CreateTourFormData = z.infer<typeof createTourSchema>;

/**
 * Typed schema for vee-validate integration
 */
export const createTourFormSchema = toTypedSchema(createTourSchema);

/**
 * Re-export calculateDayCount for convenience
 */
export { calculateDayCount };
