import React, { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { useChain } from "react-moralis";
import { Container } from "@mui/system";
import PoolCard from "./PoolCard";

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

export default function Pools() {
  const classes = useStyles();
  const theme = useTheme();

  const { account } = useChain();

  let poolsData = [
    {
      title: "Accumulation Strategy",
      description:
        "Buy your desired tokens on successive price drops automatically by placing the strategy in the pool.",
      icon: "https://cdn3d.iconscout.com/3d/premium/thumb/dollar-coin-in-winner-cup-5493527-4581314.png",
      url: "accumulation",
      contractAddress: "0xEF8bfB001801Dfee3dc421aB31398C2d1fdB2bd4",
      type: "ACCUMULATION",
    },
    {
      title: "Spot Grid Strategy",
      description:
        "Your orders will be placed and executed based on percentage changes in the market price of the specific token.",
      icon: "https://cdn3d.iconscout.com/3d/premium/thumb/blockchain-6841751-5607102.png",
      url: "grid-strategy",
      contractAddress: "0xbfEE21a8af83089d31432cF67B57D22046215592",
      type: "GRID",
    },
  ];

  return (
    <Box>
      <Box className={classes.background}>
        <Container>
          <Typography variant="h2" className={classes.pageTitle}>
            Pools
          </Typography>
          <Typography variant="body2" className={classes.pageSubtitle}>
            Place order inside the strategy pools and enjoy high yeilds
          </Typography>

          <Grid
            container
            display={"flex"}
            justifyContent="space-between"
            spacing={12}
          >
            {poolsData.map((singlePool, index) => (
              <Grid item md={6} key={index}>
                <PoolCard poolStaticData={singlePool} index={index} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
