import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#12F2AA",
    },
    secondary: {
      main: "#FE35F1",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
