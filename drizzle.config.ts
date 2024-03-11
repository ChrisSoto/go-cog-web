import { defineConfig } from 'drizzle-kit'
require('dotenv').config({ path: '.env.local' })

export default defineConfig({
 schema: "./src/lib/db/schema.ts",
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env["POSTGRES_URL"]!,
  },
  out: "./src/migrations",
  verbose: true,
  strict: true,
})