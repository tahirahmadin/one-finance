import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { useChain } from "react-moralis";
import { Container } from "@mui/system";
import StakePoolCard from "./StakePoolCard";

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

export default function Stake() {
  const classes = useStyles();
  const theme = useTheme();

  const { account } = useChain();

  return (
    <Box>
      <Box className={classes.background}>
        <h3 variant="h1" className={classes.pageTitle}>
          Active Pools
        </h3>

        <Container>
          <Grid container display={"flex"} justifyContent="center">
            <Grid item md={4}>
              <StakePoolCard />
            </Grid>
            <Grid item md={4}>
              <StakePoolCard />
            </Grid>
            <Grid item md={4}>
              <StakePoolCard />
            </Grid>
            <Grid item md={4}>
              <StakePoolCard />
            </Grid>
            <Grid item md={4}>
              <StakePoolCard />
            </Grid>
            <Grid item md={4}>
              <StakePoolCard />
            </Grid>
            <Grid item md={4}>
              <StakePoolCard />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
