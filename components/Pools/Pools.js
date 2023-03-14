import React, { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { useChain } from "react-moralis";
import { Container } from "@mui/system";
import PoolCard from "./PoolCard";
import PoolCard2 from "./PoolCard2";

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
    fontSize: 15,

    color: "#67686A",
    textAlign: "left",
  },
}));

export default function Pools() {
  const classes = useStyles();
  const theme = useTheme();

  const { account } = useChain();

  return (
    <Box>
      <Box className={classes.background}>
        <Container>
          <h3 className={classes.pageTitle}>Pools</h3>
          <p className={classes.para}>
            Invest in the pool and enjoy profit while sleeping
          </p>
          <Grid
            container
            display={"flex"}
            justifyContent="space-between"
            spacing={12}
          >
            <Grid item md={4}>
              <PoolCard2 />
            </Grid>
            <Grid item md={4}>
              <PoolCard2 />
            </Grid>
            <Grid item md={4}>
              <PoolCard2 />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
