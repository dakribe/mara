import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";

export const user = pgTable("users", {
	id: uuid("id").primaryKey(),
	email: text("email").notNull(),
	username: varchar("email", { length: 255 }).unique().notNull(),
	passwodHash: varchar("password_hash").notNull(),
});
