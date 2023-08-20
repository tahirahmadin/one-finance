import React from "react";
import { makeStyles } from "@mui/styles";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: "#18181A",
    backgroundImage: `url(https://uploads-ssl.webflow.com/625440d…/625d972…_nft-sec-mockup.png)`,
    backgroundPosition: "100%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "auto 100%",
    borderRadius: "1em",
    flex: 1,
    padding: "1.5em",
    width: "100%",
    minHeight: 200,
    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.03)",
    "&:hover": {
      boxShadow: "0px 24px 33px -9px #0000005C",
    },

    [theme.breakpoints.down("md")]: {
      height: "100%",
      width: "100%",
    },
  },
  title: {
    fontWeight: 600,
    color: "#f9f9f9",
    textAlign: "left",
    fontSize: 16,
  },
}));

export default function NetWorthCard() {
  const classes = useStyles();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box pt={0} className={classes.card}>
      <Typography variant="h4" className={classes.title}>
        Net Worth
      </Typography>
      <Typography
        variant="body2"
        color={"#ffffff"}
        style={{ lineHeight: 1.4, textTransaform: "lowercase", marginTop: 5 }}
        fontSize={28}
      >
        ₹3,125,000
      </Typography>
    </Box>
  );
}
