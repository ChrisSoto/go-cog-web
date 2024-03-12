ALTER TABLE "working_memory_trials" ALTER COLUMN "trial" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "working_memory_trials" ALTER COLUMN "pace" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "working_memory_trials" ALTER COLUMN "pace" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "working_memory_trials" ALTER COLUMN "length" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "working_memory_trials" ALTER COLUMN "length" DROP NOT NULL;