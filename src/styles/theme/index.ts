import { createTheme, responsiveFontSizes } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    gray: Palette["primary"];
  }

  interface PaletteOptions {
    gray?: PaletteOptions["primary"];
  }
}

export const Colors = {};

let theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: ["Noto Sans Arabic", "Roboto", "sans-serif"].join(","),
    fontSize: 16,
    body2: {
      color: "#373a3c",
    },
    h5: {
      fontSize: "1.5rem",
      fontWeight: "500",
      lineHeight: 1.2,
      color: "#373a3c",
    },
  },
  palette: {
    primary: {
      main: "#008e46",
    },
    secondary: {
      main: "#8e0048",
    },
    text: {
      primary: "#373a3c",
      secondary: "#747373",
    },
    gray: {
      main: "#333",
      contrastText: "#fff",
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true, // No more ripple
      },
    },
  },
});

theme = responsiveFontSizes(theme);
export default theme;
