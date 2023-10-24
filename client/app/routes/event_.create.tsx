import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const title = String(formData.get("title"));
  console.log(title);
  const res = await fetch("http://localhost:8000/api/events/", {
    method: "POST",
    body: JSON.stringify({ title }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    return redirect("/event");
  }
  return redirect("/event");
}

// Action to submit a form to create an event
export default function createEvent() {
  return (
    <div>
      <h1>Create Event</h1>
      <Form method="post">
        <input type="text" name="title" />
        <button type="submit">Add</button>
      </Form>
    </div>
  );
}
