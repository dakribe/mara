import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

type Event = {
  id: string;
  title: string;
};

export const loader = async () => {
  const apiUrl = "http://localhost:8000/api/events/";
  const res = await fetch(apiUrl);
  if (res.status !== 200) {
    throw new Response("Not found", { status: 404 });
  }
  const data = await res.json();

  return json(data);
};

export default function EventPage() {
  const events = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>All events</h1>
      <div>
        {events.map((event: Event) => (
          <p key={event.id}>{event.title}</p>
        ))}
      </div>
    </div>
  );
}
