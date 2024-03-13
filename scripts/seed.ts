import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { WorkingMemoryTrial, users, workingMemoryExperiments, workingMemoryTrials } from '@/lib/db/schema';
import { sql } from 'drizzle-orm';
import { exit } from 'process';
import { faker } from '@faker-js/faker';
require('dotenv').config({ path: '.env.local' })

const queryClient = postgres(process.env.POSTGRES_URL!);
export const db = drizzle(queryClient)

async function main(numOfUsers: number, maxTrialsPerUser: number) {

  console.log("deleting old data");

  await db.execute(sql`
    delete from working_memory_trials *;
    delete from working_memory_experiments *;
    delete from users *;
  `);

  console.log("seeding started");

  for (let i = 0; i < numOfUsers; i++) {
    const seededUser = await db.insert(users).values({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      role: 'ANON',
    }).returning();
  

    const userId = seededUser[0].id;
    const experiments = await db.insert(workingMemoryExperiments).values([
      {
        userId: userId,
      },
      {
        userId: userId,
      },
      {
        userId: userId,
      },
      {
        userId: userId,
      },
      {
        userId: userId,
      },
    ]).returning();

    for (let k = 0; k < experiments.length; k++) {
      const experimentId = experiments[k].id;
      const trials = Math.round(Math.random() * maxTrialsPerUser);
      for (let l = 0; l < trials; l++) {
        await db.insert(workingMemoryTrials).values({
          experimentId: experimentId,
          trial: l,
          modality: 'DIGITS',
          correct: l % 2 === 0 ? true : false,
          length: Math.round(Math.random() * 5) + 1,
          original: faker.lorem.word(),
          entered: faker.lorem.word(),
          pace: Math.round(Math.random() * 1000) + 1,
          sound: Math.random() < 0.5 ? true : false,
        });
      }
    }
  }

  console.log("seed completed");

  exit(1);
}

main(5, 10)