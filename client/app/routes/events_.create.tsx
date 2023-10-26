import { Button } from "@app/components/ui/button";
import { Input } from "@app/components/ui/input";
import { Label } from "@app/components/ui/label";
import { redirect, json, type ActionFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { z } from "zod";

const schema = z.object({
  title: z.string({ required_error: "You must add a title" }).min(4).max(30),
  state: z.string(),
  city: z.string(),
});

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const payload = Object.fromEntries(formData);
  const result = schema.safeParse(payload);

  if (!result.success) {
    return json({
      payload,
      error: result.error.flatten().fieldErrors,
    });
  }

  const res = await fetch("http://localhost:8000/api/events/", {
    method: "POST",
    body: JSON.stringify(result.data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    return redirect("/events");
  }
  return redirect("/events");
}

export default function createEvent() {
  return (
    <div>
      <h1>Create Event</h1>
      <Form method="post">
        <Label htmlFor="title">Title</Label>
        <Input type="text" name="title" placeholder="Title" />
        <Label htmlFor="state">State</Label>
        <Input type="text" name="state" placeholder="State" />
        <Label htmlFor="city">City</Label>
        <Input type="text" name="city" placeholder="City" />
        <Button type="submit">Add Event</Button>
      </Form>
    </div>
  );
}
