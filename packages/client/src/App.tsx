import { createResource, Show, Switch, Match } from "solid-js";
import "./App.css";

const fetchData = async () => {
  const res = await fetch(import.meta.env.VITE_APP_API_URL);
  return res.json();
};

function App() {
  const [resource] = createResource(fetchData);
  console.log(import.meta.env.VITE_APP_API_URL);

  console.log(resource());
  return (
    <>
      <div>
        <Show when={resource.loading}>
          <p>Loading...</p>
        </Show>
        <Switch>
          <Match when={resource.error}>
            <span>Error: {resource.error}</span>
          </Match>
          <Match when={resource()}>
            <div>{JSON.stringify(resource())}</div>
          </Match>
        </Switch>
      </div>
    </>
  );
}

export default App;
