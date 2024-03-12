import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { sql } from 'drizzle-orm';
import { exit } from 'process';
require('dotenv').config({ path: '.env.local' })

const queryClient = postgres(process.env.POSTGRES_URL!);
export const db = drizzle(queryClient)

async function main() {

  console.log("dropping tables");

  await db.execute(sql`
    drop table users;
    drop table working_memory_trials;
    drop table working_memory_experiments;
  `);

  exit(1);
}

main()