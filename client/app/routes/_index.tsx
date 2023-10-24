import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

type Event = {
  id: string;
  title: string;
};

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

// Get events
export const loader = async () => {
  const apiUrl = "http://localhost:8000/api/events/";
  const res = await fetch(apiUrl);
  const data = await res.json();
  return json(data);
};

export default function Index() {
  const events = useLoaderData<typeof loader>();
  return (
    <div>
      {events.map((event: Event) => (
        <p key={event.id}>{event.title}</p>
      ))}
    </div>
  );
}
