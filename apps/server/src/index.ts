import { Hono } from "hono";

const app = new Hono();
app.get("/", (c) => c.json({ message: "Hello world" }));

export default {
	port: 4000,
	fetch: app.fetch,
};

