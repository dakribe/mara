import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const events = pgTable("events", {
	id: uuid("id").primaryKey(),
	title: varchar("title", { length: 255 }),
	state: varchar("state", { length: 255 }),
	city: varchar("city", { length: 255 }),
});
