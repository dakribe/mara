import { createResource, Show } from "solid-js";
import "./App.css";

const fetchFn = async () => {
  const response = await fetch(import.meta.env.VITE_API_URL);
  return await response.json();
};

function App() {
  const [data] = createResource(fetchFn);

  return (
    <>
      <h1>Vite + Solid</h1>
      <Show when={!data.loading} fallback={<p>Loading...</p>}>
        <Show when={data()} fallback={<p>No data available</p>}>
          <pre>{JSON.stringify(data(), null, 2)}</pre>
        </Show>
      </Show>
      <p class="read-the-docs">
        Click on the Vite and Solid logos to learn more
      </p>
    </>
  );
}

export default App;
