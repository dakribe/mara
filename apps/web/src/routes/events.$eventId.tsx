import { Link, createFileRoute } from "@tanstack/react-router";
import "mapbox-gl/dist/mapbox-gl.css";
import { EventMap } from "../components/event-map/EventMap";
import { EventType } from "../components/event-map/types";

async function getEvent(id: string): Promise<EventType> {
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
  console.log(event);

  return (
    <div className="flex h-dvh w-dvw">
      <div className="w-full">
        <Link to="/">
          <p>Mara</p>
        </Link>
        <div className="text-center mt-8">
          <h2 className="text-3xl font-medium">{event.title}</h2>
        </div>
      </div>
      <div>
        <EventMap
          latitude={event.latitude}
          longitude={event.longitude}
          geoJson={event.geoJson}
        />
      </div>
    </div>
  );
}
