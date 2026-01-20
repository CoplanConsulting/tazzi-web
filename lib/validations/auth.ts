import { z } from "zod";

// Base schema for API (without confirmPassword)
export const signupApiSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(100, "First name must be less than 100 characters")
    .trim(),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(100, "Last name must be less than 100 characters")
    .trim(),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(254, "Email must be less than 254 characters")
    .trim(),
  company: z
    .string()
    .min(1, "Company name is required")
    .max(255, "Company name must be less than 255 characters")
    .trim(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

export type SignupApiData = z.infer<typeof signupApiSchema>;

// Extended schema for form (with confirmPassword and refinement)
export const signupSchema = signupApiSchema
  .extend({
    confirmPassword: z
      .string()
      .min(1, "Please confirm your password"),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupFormData = z.infer<typeof signupSchema>;
