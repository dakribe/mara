import { createId } from "@paralleldrive/cuid2";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
	id: varchar("id", { length: 24 })
		.$defaultFn(() => createId())
		.primaryKey(),
	username: varchar("username", { length: 32 }).notNull().unique(),
	passwordHash: text("password_hash").notNull(),
});
