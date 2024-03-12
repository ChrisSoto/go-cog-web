DO $$ BEGIN
 CREATE TYPE "modality" AS ENUM('DIGITS', 'SHAPES', 'MATH');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "role" AS ENUM('ADMIN', 'USER', 'ANON');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"role" "role" DEFAULT 'ANON' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "working_memory_experiments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "working_memory_trials" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"experiment_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"trial" serial NOT NULL,
	"modality" "modality",
	"sound" boolean,
	"pace" serial NOT NULL,
	"length" serial NOT NULL,
	"correct" boolean,
	"original" varchar(255),
	"entered" varchar(255)
);
