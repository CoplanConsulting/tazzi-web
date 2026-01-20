import { eq } from "drizzle-orm";

import { orgUsers, tours } from "~/lib/db/schema";
import { createTourSchema } from "~/lib/validations/tour";
import { useDb } from "~/server/utils/db";
import { useSupabaseAdmin } from "~/server/utils/supabase";

export default defineEventHandler(async (event) => {
  // Get authorization header
  const authHeader = getHeader(event, "authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    throw createError({
      statusCode: 401,
      data: {
        success: false,
        error: "Authentication required",
        code: "UNAUTHORIZED",
      },
    });
  }

  const token = authHeader.substring(7);
  const supabaseAdmin = useSupabaseAdmin();

  // Verify the token and get the user
  const { data: userData, error: authError } = await supabaseAdmin.auth.getUser(token);

  if (authError || !userData.user) {
    throw createError({
      statusCode: 401,
      data: {
        success: false,
        error: "Invalid or expired token",
        code: "INVALID_TOKEN",
      },
    });
  }

  const userId = userData.user.id;
  const db = useDb();

  // Get the user's organization
  const [userOrgLink] = await db
    .select({ orgId: orgUsers.orgId })
    .from(orgUsers)
    .where(eq(orgUsers.userId, userId))
    .limit(1);

  if (!userOrgLink) {
    throw createError({
      statusCode: 403,
      data: {
        success: false,
        error: "User is not associated with any organization",
        code: "NO_ORGANIZATION",
      },
    });
  }

  // Parse and validate request body
  const body = await readBody(event);
  const parseResult = createTourSchema.safeParse(body);

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

  const { name, startDate, endDate } = parseResult.data;

  // Insert the tour
  try {
    const [newTour] = await db
      .insert(tours)
      .values({
        orgId: userOrgLink.orgId,
        name,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        createdBy: userId,
        // status defaults to 'Upcoming'
      })
      .returning({
        id: tours.id,
        name: tours.name,
        startDate: tours.startDate,
        endDate: tours.endDate,
        status: tours.status,
      });

    setResponseStatus(event, 201);
    return {
      success: true,
      tour: newTour,
    };
  }
  catch (dbError) {
    console.error("Failed to create tour:", dbError);
    throw createError({
      statusCode: 500,
      data: {
        success: false,
        error: "Failed to create tour, please try again",
        code: "DB_ERROR",
      },
    });
  }
});
