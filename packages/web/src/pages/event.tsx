import { EventMap } from "../components/event-map";

export function Event() {
  return (
    <div class="flex min-h-screen min-w-full justify-evenly">
      <div class="bg-red-200 flex-1">test</div>
      <EventMap />
    </div>
  );
}
