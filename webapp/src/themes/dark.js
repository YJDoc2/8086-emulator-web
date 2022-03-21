import { createTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// A custom theme for this app
const theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#F4C430",
      light: "rgb(255, 197, 112)",
      dark: "rgb(200, 147, 89)",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    secondary: {
      main: "#101010",
      contrastText: "#FCFDFA",
    },
    background: {
      paper: "#424242",
      default: "#303030",
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: ["JetBrains Mono", "Roboto", "Arial", "sans-serif"].join(","),
    button: {
      fontFamily: ["JetBrains Mono", "Roboto", "Arial", "sans-serif"].join(","),
    },
  },
});

export default theme;
