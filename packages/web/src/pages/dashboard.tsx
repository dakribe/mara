import { useAuth } from "../providers/auth";

export function Dashboard() {
  const { session } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>
      <h1>{session()?.user.username}</h1>
    </div>
  );
}
