import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: uuid("id").primaryKey(),
	email: varchar("email", { length: 255 }).notNull(),
	username: varchar("username", { length: 255 }).notNull(),
});
