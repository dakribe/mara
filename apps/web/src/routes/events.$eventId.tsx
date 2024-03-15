import { createFileRoute } from "@tanstack/react-router";
import { EventMap } from "../components/Map";
import "mapbox-gl/dist/mapbox-gl.css";

async function getEvent(id: string) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/events/${id}`);
  const data = res.json();
  return data;
}

export const Route = createFileRoute("/events/$eventId")({
  loader: ({ params: { eventId } }) => getEvent(eventId),
  component: Event,
});

function Event() {
  const event = Route.useLoaderData();
  return (
    <div className="flex h-dvh w-dvw">
      <div className="">{event.title}</div>
      <div>
        <EventMap />
      </div>
    </div>
  );
}
