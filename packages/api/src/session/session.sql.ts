import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { user } from "../user/user.sql";

export const session = pgTable("session", {
	id: text("id").primaryKey(),
	userId: varchar("user_id")
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp("expires_at", {
		withTimezone: true,
		mode: "date",
	}).notNull(),
});
