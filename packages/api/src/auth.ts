import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { db } from "./drizzle";
import { user } from "./user/user.sql";
import { type User, type Session, Lucia } from "lucia";
import { session } from "./session/session.sql";
import type { Env } from "hono";

const adapter = new DrizzlePostgreSQLAdapter(db, session, user);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: process.env.NODE_ENV === "production",
		},
	},
	getUserAttributes: (attributes) => {
		return {
			username: attributes.username,
		};
	},
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: Omit<DatabaseUser, "id">;
	}
}

interface DatabaseUser {
	id: string;
	username: string;
	password: string;
}

export interface Context extends Env {
	Variables: {
		user: User | null;
		session: Session | null;
	};
}
