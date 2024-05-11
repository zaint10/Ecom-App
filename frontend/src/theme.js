import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#AECBFB",
    },
    secondary: {
      main: "#FC86A1",
    },
    background: {
      default: "#F5F5F5",
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          border: 0,
          borderRadius: 3,
        },
      },
    },
  },
  typography: {
    fontWeightBold: 800,
    button: {
      letterSpacing: "0.05em",
    },
  },
});

export default theme;
