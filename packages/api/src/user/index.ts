import { eq } from "drizzle-orm";
import { db } from "../drizzle";
import { user } from "./user.sql";
import { hash } from "@node-rs/argon2";

export const byUsername = async (username: string) => {
	const [foundUser] = await db
		.select()
		.from(user)
		.where(eq(user.username, username));

	return foundUser;

	// await db.transaction(async (tx) => {
	// 	await tx.select().from(user).where(eq(user.username, username)).execute();
	// });
};

export const create = async (username: string, password: string) => {
	const passwordHash = await hash(password, {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1,
	});

	const [result] = await db
		.insert(user)
		.values({ username, passwordHash })
		.returning();

	return result;
};
