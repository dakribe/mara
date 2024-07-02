import { Hono } from "hono";
import { logger } from "hono/logger";
import { create } from "./user";
import { lucia } from "./auth";

const app = new Hono();
app.use(logger());

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

app.post("/signup", async (c) => {
	const body = await c.req.json<{
		username: string;
		password: string;
	}>();

	try {
		const user = await create(body.username, body.password);
		const session = await lucia.createSession(user.id, {});
		c.header("Set-Cookie", lucia.createSessionCookie(session.id).serialize(), {
			append: true,
		});

		return c.json({ message: "success" }, 200);
	} catch (error) {
		return c.json({ message: "Invalid username or password" }, 401);
	}
});

export default app;
