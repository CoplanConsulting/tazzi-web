import { ROLE_IDS } from "~/lib/db/constants";
import { orgs, orgUsers } from "~/lib/db/schema";
import { signupApiSchema } from "~/lib/validations/auth";
import { useDb } from "~/server/utils/db";
import { useSupabaseAdmin } from "~/server/utils/supabase";

export default defineEventHandler(async (event) => {
  // Parse and validate request body
  const body = await readBody(event);
  const parseResult = signupApiSchema.safeParse(body);

  if (!parseResult.success) {
    throw createError({
      statusCode: 400,
      data: {
        success: false,
        error: "Invalid input",
        code: "VALIDATION_ERROR",
        details: parseResult.error.flatten().fieldErrors,
      },
    });
  }

  const { email, password, firstName, lastName, company } = parseResult.data;

  const supabaseAdmin = useSupabaseAdmin();
  const db = useDb();

  // Step 1: Create Supabase Auth user
  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // Skip email verification for dev
    user_metadata: {
      firstName,
      lastName,
    },
  });

  if (authError) {
    // Map Supabase errors to user-friendly messages
    const errorMessage = mapSupabaseError(authError);
    throw createError({
      statusCode: 400,
      data: {
        success: false,
        error: errorMessage,
        code: authError.code || "AUTH_ERROR",
      },
    });
  }

  const userId = authData.user.id;

  // Step 2: Create org and org_users in a transaction
  try {
    await db.transaction(async (tx) => {
      // Create the organization
      const [newOrg] = await tx
        .insert(orgs)
        .values({
          name: company,
        })
        .returning({ id: orgs.id });

      // Create the org_users link with admin role
      await tx.insert(orgUsers).values({
        orgId: newOrg.id,
        userId,
        roleId: ROLE_IDS.admin,
      });
    });
  }
  catch (dbError) {
    // Step 3: Rollback - delete the auth user if DB insert failed
    console.error("DB transaction failed, rolling back auth user:", dbError);

    try {
      await supabaseAdmin.auth.admin.deleteUser(userId);
    }
    catch (deleteError) {
      // Log for manual cleanup - edge case
      console.error("Failed to delete auth user during rollback:", deleteError);
    }

    throw createError({
      statusCode: 500,
      data: {
        success: false,
        error: "Registration failed, please try again",
        code: "DB_ERROR",
      },
    });
  }

  // Success!
  return {
    success: true,
    user: {
      id: userId,
      email: authData.user.email,
    },
  };
});

// Map Supabase auth errors to user-friendly messages
function mapSupabaseError(error: { code?: string; message: string }): string {
  switch (error.code) {
    case "user_already_exists":
    case "email_exists":
      return "An account with this email already exists";
    case "weak_password":
      return "Password must be at least 6 characters";
    case "invalid_email":
      return "Please enter a valid email address";
    default:
      // For unknown errors, return a generic message but log the details
      console.error("Unhandled Supabase error:", error);
      return "Something went wrong, please try again";
  }
}
