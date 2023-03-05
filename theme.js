import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let themes = createTheme({
  palette: {
    action: {
      disabled: "#A0A0A0",
      disabledBackground: "#737373",
    },
    primary: {
      // light: '#000000',
      main: "rgba(130, 71, 229, 0.3)",
      // dark: '#cccccc',
      contrastText: "#000000",
    },
    secondary: {
      // light: '#ffffff',
      main: "#17191A",
      // dark: '#ffffff',
      contrastText: "#ffffff",
    },
    text: {
      primary: "#ffffff",
      secondary: "#e5e5e5",
    },
    background: {
      default: "#F4F4F4",
      footerGrey: "#D7D7D7",
    },
    pink: {
      main: "#FF43CA",
      light: "#FFEAF9",
    },
    lightGreen: {
      main: "#E7FFDC",
    },

    columbiaBlue: {
      main: "#B0FFFA",
    },
    cyan: {
      main: "#2BFFF2",
    },
    onahauBlue: {
      main: "#C3FFFB",
    },
  },
  typography: {
    fontFamily: "Poppins, Roboto, sans-serif",
    h1: {
      fontFamily: "Poppins",
      fontSize: "2.813rem",
    },
    h2: {
      fontFamily: "Poppins",
      fontSize: "2.1875rem",
    },
    h3: {
      fontFamily: "Poppins",
      fontSize: "1.75rem",
    },
    h4: {
      fontFamily: "Poppins",
      fontSize: "1.75rem",
      fontWeight: "bold",
    },
    h5: {
      fontFamily: "Poppins",
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
    h6: {
      fontFamily: "Poppins",
      fontSize: "1.375rem",
      fontWeight: "normal",
    },
    subtitle1: {
      fontFamily: "Poppins",
      fontSize: "1.25rem",
      fontWeight: "bold",
    },
    body1: {
      fontFamily: "Poppins",
      fontSize: "1.125rem",
    },
    body2: {
      fontFamily: "Poppins",
      fontSize: "1rem",
    },
    body3: {
      fontFamily: "Poppins",
      fontSize: "1rem",
      wordBreak: "break-word",
    },
  },
  // breakpoints: {
  //   values: {
  //     xs: 0,
  //     sm: 600,
  //     md: 960,
  //     lg: 1280,
  //     xl: 1920,
  //   },
  // },
});

let theme = responsiveFontSizes(themes);
export default theme;
