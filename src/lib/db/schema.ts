import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, serial, varchar, timestamp, uuid, boolean, integer } from 'drizzle-orm/pg-core';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER' | 'ANON';
  createdAt: Date;
  updatedAt?: Date | null;
}

export interface WorkingMemoryExperiment {
  id: string;
  userId: string;
  createdAt: Date;
  trials?: WorkingMemoryTrial[] | null;
}

export interface WorkingMemoryTrial {
  id: string;
  experimentId: string;
  createdAt: Date;
}

export interface WorkingMemoryTrial {
  id: string;
  experimentId: string;
  createdAt: Date;
  trial: number;
  modality: 'DIGITS' | 'SHAPES' | 'MATH';
  sound?: boolean;
  pace?: number;
  length?: number;
  correct?: boolean;
  original?: string;
  entered?: string;
}

export const roleEnum = pgEnum('role', ['ADMIN', 'USER', 'ANON']);
export const modalityEnum = pgEnum('modality', ['DIGITS', 'SHAPES', 'MATH']);

export const users = pgTable('users', {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  role: roleEnum('role').default('ANON').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at'),
});

export const workingMemoryExperiments = pgTable('working_memory_experiments', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  userId: uuid('user_id').notNull().references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const workingMemoryExperimentsRelations = relations(workingMemoryExperiments, ({ one, many }) => ({
  user: one(users, {
    fields: [workingMemoryExperiments.userId],
    references: [users.id],
  }),
  trials: many(workingMemoryTrials)
}))

export const workingMemoryTrials = pgTable('working_memory_trials', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  experimentId: uuid('experiment_id').references(() => workingMemoryExperiments.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  trial: integer('trial').notNull(),
  modality: modalityEnum('modality'),
  sound: boolean('sound'),
  pace: integer('pace'), // in milliseconds,
  length: integer('length'), // number of digits to remember,
  correct: boolean('correct'), // if they got it correct
  original: varchar('original', { length: 255 }), // what was given
  entered: varchar('entered', { length: 255 }), // what they entered
})

export const workingMemoryTrialsRelations = relations(workingMemoryTrials, ({ one }) => ({
  experiment: one(workingMemoryExperiments, {
    fields: [workingMemoryTrials.experimentId],
    references: [workingMemoryExperiments.id],
  })
}))