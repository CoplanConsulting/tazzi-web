CREATE TYPE "public"."day_status" AS ENUM('tentative', 'confirmed', 'in_progress', 'completed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."day_type" AS ENUM('show', 'travel', 'off', 'rehearsal', 'press', 'promo');--> statement-breakpoint
CREATE TABLE "days" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_by" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"tour_id" uuid NOT NULL,
	"date" date NOT NULL,
	"day_number" integer,
	"day_type" "day_type" DEFAULT 'off' NOT NULL,
	"day_status" "day_status" DEFAULT 'tentative' NOT NULL,
	"city" text,
	"state" text,
	"country" text,
	"venue_name" text,
	"timezone" text,
	"notes" text
);
--> statement-breakpoint
ALTER TABLE "org_users" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "org_users" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "orgs" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "orgs" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "orgs" ALTER COLUMN "updated_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "orgs" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "days" ADD CONSTRAINT "days_tour_id_tours_id_fk" FOREIGN KEY ("tour_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "days_tour_date_idx" ON "days" USING btree ("tour_id","date");