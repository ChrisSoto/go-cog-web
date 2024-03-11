import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

const migrationClient = postgres(process.env.POSTGRES_URL!, { max: 1, onnotice: () => {}});
migrate(drizzle(migrationClient), { migrationsFolder: 'src/migrations' });
const queryClient = postgres(process.env.POSTGRES_URL!);
export const db = drizzle(queryClient)