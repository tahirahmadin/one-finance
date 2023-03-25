import React, { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { useChain } from "react-moralis";
import { Container } from "@mui/system";

const useStyles = makeStyles((theme) => ({
  background: {
    // backgroundImage: 'url("images/network.png")',
    backgroundPosition: "center center,center center",
    backgroundRepeat: "no-repeat,no-repeat",
    backgroundSize: "cover,contain",
    height: "100%",
    width: "100%",
    paddingTop: "2%",
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
    color: "#f9f9f9",
    textAlign: "left",
  },

  pageSubtitle: {
    color: "#bdbdbd",
    textAlign: "left",
  },
}));

export default function Rewards() {
  const classes = useStyles();
  const theme = useTheme();

  const { account } = useChain();

  return (
    <Box>
      <Box className={classes.background}>
        <Container>
          <Typography variant="h2" className={classes.pageTitle}>
            Rewards
          </Typography>
          <Typography variant="body2" className={classes.pageSubtitle}>
            Stake SLEEP token and earn rewards
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
