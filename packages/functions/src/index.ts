import { Env, Hono } from "hono";
import { handle } from "hono/aws-lambda";
import type { User, Session } from "lucia";

export interface Context extends Env {
	Variables: {
		user: User | null;
		session: Session | null;
	};
}

const app = new Hono();
app.get("/", async (c) => {
	return c.json({ message: "Hello world" });
});

app.post("/signup", async (c) => {
	const body = await c.req.parseBody<{
		username: string;
		password: string;
	}>();
});

export const handler = handle(app);
