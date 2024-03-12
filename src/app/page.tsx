import { db } from "@/lib/db/db";
import { users, workingMemoryTrials } from "@/lib/db/schema";
import { sql } from "drizzle-orm";

export default async function Home() {

  const expId = 'ca98b64d-2236-477d-b69f-4c726617d23d';
  await db.insert(workingMemoryTrials).values({
    experimentId: expId,
    trial: 0,
    modality: 'DIGITS',
    correct: true,
    length: 5,
    original: '5',
    entered: '5',
  }).then(() => console.log('inserted')).catch(err => console.log(err))

  // await db.execute(sql`drop table users`)
  // await db.insert(users).values({ name: 'test', email: 'test', role: 'ADMIN' })

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">hellow</main>
  );
}

