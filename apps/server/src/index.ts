import { Hono } from "hono";
import { logger } from "hono/logger";
import { showRoutes } from "hono/dev";
import { event } from "./event";
import { cors } from "hono/cors";

export const app = new Hono();
app.use(cors());
app.use(logger());
app.get("/", (c) => c.json({ message: "Hello world" }));
app.route("/events", event);

console.log(showRoutes(app));

export default {
	port: 4000,
	fetch: app.fetch,
};
