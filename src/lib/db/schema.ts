import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, serial, varchar, timestamp, uuid } from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('role', ['ADMIN', 'USER', 'ANON']);
export const modalityEnum = pgEnum('modality', ['DIGITS', 'SHAPES', 'MATH']);

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  role: roleEnum('role').default('ANON').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at'),
});

export const workingMemoryExperiments = pgTable('working_memory_experiments', {
  id: uuid('id').primaryKey(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const workingMemoryExperimentsRelations = relations(workingMemoryExperiments, ({ many }) => ({
  trials: many(workingMemoryTrials)
}))

export const workingMemoryTrials = pgTable('working_memory_trials', {
  id: uuid('id').primaryKey(),
  experimentId: uuid('experiment_id'),
})

export const workingMemoryTrialsRelations = relations(workingMemoryTrials, ({ one }) => ({
  experiment: one(workingMemoryExperiments, {
    fields: [workingMemoryTrials.experimentId],
    references: [workingMemoryExperiments.id],
  })
}))

// model WorkMemExperiment {
//   id        String         @id @default(cuid())
//   createdAt DateTime       @default(now()) @map(name: "created_at")
//   trials    WorkMemTrial[]

//   @@index([createdAt])
//   @@map(name: "working_memory_experiments")
// }

// model WorkMemTrial {
//   id           String            @id @default(cuid())
//   experiment   WorkMemExperiment @relation(fields: [experimentId], references: [id])
//   experimentId String            @map(name: "experiment_id")
//   createdAt    DateTime          @default(now()) @map(name: "created_at")
//   trial        Int
//   modality     Modality?
//   sound        Boolean?
//   pace         Int?
//   length       Int?
//   correct      Boolean?
//   original     String?
//   entered      String?

//   @@index([createdAt])
//   @@map(name: "working_memory_trials")
// }

// enum Modality {
//   DIGITS
//   SHAPES
//   MATH
// }

// enum Role {
//   ADMIN
//   USER
//   ANON
// }
