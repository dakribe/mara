import { Link, createFileRoute } from "@tanstack/react-router";

import { EventType } from "../components/event-map/types";

async function getEvents(): Promise<EventType[]> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/events`);
  const data = res.json();
  return data;
}

export const Route = createFileRoute("/")({
  loader: () => getEvents(),
  component: Index,
});

function Index() {
  const events = Route.useLoaderData();
  return (
    <div>
      <h1>Home</h1>
      <ul>
        {events.map((event) => (
          <Link
            to="/events/$eventId"
            params={{
              eventId: event.id,
            }}
          >
            <li key={event.id}>{event.title}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
