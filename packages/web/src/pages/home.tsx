import { styled } from "@macaron-css/solid";
import { Navbar } from "../components/navbar";
import { background } from "../ui/theme";

const Root = styled("div", {
  base: {
    background: background,
  },
});

export function Home() {
  return (
    <Root>
      <Navbar />
      <h1>Home</h1>
    </Root>
  );
}
