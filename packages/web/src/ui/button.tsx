import { styled } from "@macaron-css/solid";
import { theme } from "./theme";

export const Button = styled("button", {
  base: {
    color: "white",
    backgroundColor: theme.background,
    padding: "25px 50px",
    border: "none",
  },
  variants: {
    color: {
      primary: {
        backgroundColor: theme.base,
      },
      danger: {
        backgroundColor: theme.red,
      },
    },
  },
});
