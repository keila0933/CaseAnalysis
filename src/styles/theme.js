import { createTheme } from "@mui/material/styles";

const muiTheme = createTheme();

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#E95076",
    },
  },
});

const theme = createTheme({
  ...muiTheme,
  ...customTheme,
});

export default theme;
