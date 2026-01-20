CREATE TYPE "public"."tour_status" AS ENUM('Upcoming', 'Active', 'Completed', 'Cancelled');--> statement-breakpoint
CREATE TABLE "tours" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"org_id" uuid NOT NULL,
	"name" text NOT NULL,
	"artist" text,
	"start_date" timestamp with time zone NOT NULL,
	"end_date" timestamp with time zone NOT NULL,
	"tour_manager" text,
	"status" "tour_status" DEFAULT 'Upcoming' NOT NULL,
	"created_by" uuid
);
--> statement-breakpoint
ALTER TABLE "tours" ADD CONSTRAINT "tours_org_id_orgs_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."orgs"("id") ON DELETE cascade ON UPDATE no action;