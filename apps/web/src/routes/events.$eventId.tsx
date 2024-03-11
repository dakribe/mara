import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/events/$eventId")({
  component: Event,
});

function Event() {
  const { eventId } = Route.useParams();
  return <div>Event: {eventId}</div>;
}
