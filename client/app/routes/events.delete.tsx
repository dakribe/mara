import { ActionFunctionArgs } from "@remix-run/node";

export async function action({ request }: ActionFunctionArgs) {
  const API_URL = "http://localhost:8000/api/events/";
  const formData = await request.formData();
  const id = formData.get("id");

  const res = await fetch(`${API_URL}${id}`, {
    method: "DELETE",
  });

  return null;
}
