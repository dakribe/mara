import { Hono } from "hono";
import { db } from "../db";

export const event = new Hono();

event.get("/", async (c) => {
	const events = await db.event.findMany();
	return c.json(events);
});

event.get("/:id", async (c) => {
	const id = c.req.param("id");

	const event = await db.event.findUnique({
		where: {
			id,
		},
	});

	if (!event) {
		return c.notFound();
	}

	return c.json(event);
});

event.post("/", async (c) => {
	const { title } = await c.req.json();
	console.log(title);

	try {
		const event = await db.event.create({
			data: {
				title,
			},
		});

		return c.json(event);
	} catch (error) {
		return c.json({ error: error });
	}
});
