import { Navbar } from "../components/navbar";
import { style } from "@macaron-css/core";
import { theme } from "../ui/theme";
import { Button } from "../ui/button";

const heading = style({
  color: theme.foreground,
});

export function Home() {
  return (
    <>
      <Navbar />
      <h1 class={heading}>Home</h1>
      <Button color="primary">Login</Button>

      <Button color="danger">Login</Button>
    </>
  );
}
