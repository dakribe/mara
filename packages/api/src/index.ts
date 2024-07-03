import { Hono } from "hono";
import { logger } from "hono/logger";
import { byUsername, create } from "./user";
import { lucia } from "./auth";
import { verify } from "@node-rs/argon2";
import type { Context } from "./auth";

const app = new Hono<Context>();
app.use(logger());

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

app.use("*", async (c, next) => {
	const sessionId = lucia.readSessionCookie(c.req.header("Cookie") ?? "");
	if (!sessionId) {
		c.set("user", null);
		c.set("session", null);
		return next();
	}

	const { session, user } = await lucia.validateSession(sessionId);
	if (session?.fresh) {
		c.header("Set-Cookie", lucia.createSessionCookie(session.id).serialize(), {
			append: true,
		});
	}
	if (!session) {
		c.header("Set-Cookie", lucia.createBlankSessionCookie().serialize(), {
			append: true,
		});
	}
	c.set("session", session);
	c.set("user", user);
	return next();
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

app.post("/login", async (c) => {
	const body = await c.req.json<{
		username: string;
		password: string;
	}>();

	const existingUser = await byUsername(body.username);
	if (!existingUser) {
		return c.json({ message: "Invalid username or password" }, 401);
	}

	const validPassword = await verify(existingUser.passwordHash, body.password, {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1,
	});

	if (!validPassword) {
		return c.json({ message: "Invalid username or password" }, 401);
	}

	const session = await lucia.createSession(existingUser.id, {});
	c.header("Set-Cookie", lucia.createSessionCookie(session.id).serialize(), {
		append: true,
	});
	c.header("Location", "/", { append: true });
	return c.json({ message: "success" }, 200);
});

app.post("/logout", async (c) => {
	const session = c.get("session");
	if (!session) {
		return c.body(null, 401);
	}
	await lucia.invalidateSession(session.id);
	c.header("Set-Cookie", lucia.createBlankSessionCookie().serialize());
	return c.json({ message: "success" }, 200);
});

app.get("/me", async (c) => {
	const user = c.get("user");
	if (!user) {
		return c.json({ error: "Unauthorized" }, 401);
	}
	return c.json({ user }, 200);
});

export default app;
