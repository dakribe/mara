import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const user = pgTable("users", {
	id: uuid("id").primaryKey(),
	email: varchar("email", { length: 255 }),
});
