import { Box, Button, Container, Grid, Table, useTheme } from "@mui/material";
import React, { useState } from "react";
import TokenCard from "./Tokencard";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  background: {
    // backgroundImage: 'url("images/network.png")',
    backgroundPosition: "center center,center center",
    backgroundRepeat: "no-repeat,no-repeat",
    backgroundSize: "cover,contain",
    height: "100%",
    width: "100%",
    paddingTop: "5%",
    paddingLeft: "3%",
    paddingRight: "3%",
    [theme.breakpoints.down("md")]: {
      paddingTop: "10%",

      paddingLeft: 15,
      paddingRight: 15,
    },
  },
  pageTitle: {
    fontWeight: 600,
    fontSize: 32,
    letterSpacing: "0.02em",
    color: "#f9f9f9",
    textAlign: "left",
    [theme.breakpoints.down("md")]: {
      fontSize: 24,
    },
  },

  para: {
    fontWeight: 400,
    fontSize: 16,
    letterSpacing: "0.02em",
    color: "#414141",
    textAlign: "center",
  },
}));

const Portfolio = () => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Box className={classes.background}>
      <h3 variant="h1" className={classes.pageTitle}>
        Portfolio
      </h3>

      <TokenCard />
    </Box>
  );
};

export default Portfolio;
