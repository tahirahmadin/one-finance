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
      fontSize: "2.2rem",
      color: "#f9f9f9",
    },
    h2: {
      fontFamily: "Poppins",
      fontSize: "1.8rem",
      color: "#f9f9f9",
    },
    h3: {
      fontFamily: "Poppins",
      fontSize: "1.5rem",
      color: "#f9f9f9",
    },
    h4: {
      fontFamily: "Poppins",
      fontSize: "1.4rem",
      fontWeight: "bold",
      color: "#f9f9f9",
    },
    h5: {
      fontFamily: "Poppins",
      fontSize: "1.3rem",
      color: "#f9f9f9",
    },
    h6: {
      fontFamily: "Poppins",
      fontSize: "1.1rem",
      fontWeight: "normal",
      color: "#f9f9f9",
      lineHeight: 1,
    },

    subtitle1: {
      fontFamily: "Poppins",
      fontSize: "1.1rem",
      color: "#bdbdbd",
      lineHeight: 1,
    },
    body1: {
      fontFamily: "Poppins",
      fontSize: "1.05rem",
      color: "#bdbdbd",
    },
    body2: {
      fontFamily: "Poppins",
      fontSize: "0.9rem",
      color: "#bdbdbd",
    },
    body3: {
      fontFamily: "Poppins",
      fontSize: "0.8rem",
      wordBreak: "break-word",
      color: "#bdbdbd",
      lineHeight: 1,
    },
    small: {
      fontFamily: "Poppins",
      fontSize: "0.75rem",
      color: "#bdbdbd",
    },
    verysmall: {
      fontFamily: "Poppins",
      fontSize: "0.7rem",
      color: "#bdbdbd",
    },
  },
});

let theme = responsiveFontSizes(themes);
export default theme;
