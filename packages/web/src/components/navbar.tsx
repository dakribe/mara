import { Show } from "solid-js";
import { useAuth } from "../providers/auth";

export function Navbar() {
  const { session } = useAuth();
  return (
    <div>
      <Show when={session()?.user}>
        <div>Hello {session()?.user.username}</div>
      </Show>
    </div>
  );
}
