import { Link } from "@remix-run/react";

export default function Nav() {
  return (
    <div className="flex space-x-6">
      <Link to="/">Home</Link>
      <Link to="/events">Events</Link>
      <Link to="/events/create">Create event</Link>
    </div>
  );
}
