import { Button } from "@app/components/ui/button";
import { json } from "@remix-run/node";
import { useLoaderData, useFetcher } from "@remix-run/react";

type Event = {
  id: string;
  title: string;
};

export const loader = async () => {
  const apiUrl = "http://localhost:8000/api/events/";
  const res = await fetch(apiUrl);

  if (res.status === 500) {
    throw new Error("Unable to fetch evnts");
  }

  const data = await res.json();

  return json(data);
};

export function ErrorBoundary() {
  return (
    <div>
      <p>Unable to get events</p>
    </div>
  );
}

export default function Events() {
  const events = useLoaderData<typeof loader>();
  const fetcher = useFetcher();

  return (
    <div>
      <h1 className="font-bold ">All events</h1>
      <div>
        {events.map((event: Event) => (
          <ul key={event.id}>
            <li>{event.title}</li>
            <fetcher.Form method="POST" action="delete">
              <input type="hidden" name="id" value={event.id} />
              <Button type="submit">Delete</Button>
            </fetcher.Form>
          </ul>
        ))}
      </div>
    </div>
  );
}
