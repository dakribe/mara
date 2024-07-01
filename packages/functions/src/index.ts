import { Hono } from "hono";
import { handle } from "hono/aws-lambda";

const app = new Hono();
app.get("/", async (c) => {
	return c.json({ message: "Hello world" });
});

export const handler = handle(app);
