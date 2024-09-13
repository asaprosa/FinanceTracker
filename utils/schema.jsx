import { date } from "drizzle-orm/mysql-core";
import { serial, varchar, pgTable, integer, numeric } from "drizzle-orm/pg-core";

export const Budgets = pgTable('budgets', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    amount: varchar('amount').notNull(),
    icon: varchar('icon')
    
});


export const Expenses= pgTable('expenses', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    amount: numeric('amount').notNull().default(0),
    createdAt:varchar('createdAt'),
    budgetId:integer('budgetId').references(() => Budgets.id)})