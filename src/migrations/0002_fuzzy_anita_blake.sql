DO $$ BEGIN
 ALTER TABLE "working_memory_experiments" ADD CONSTRAINT "working_memory_experiments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "working_memory_trials" ADD CONSTRAINT "working_memory_trials_experiment_id_working_memory_experiments_id_fk" FOREIGN KEY ("experiment_id") REFERENCES "working_memory_experiments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
