import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box, Grid, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import SideBar from "../common/Sidebar";
import Seo from "../common/Seo";
import Header from "../components/resuableComponents/Header";
import AccumulationComponent from "../components/AccumulationComponents/AccumulationComponent";

const useStyles = makeStyles({
  background: {
    backgroundPosition: "center center,center center",
    backgroundRepeat: "no-repeat,no-repeat",
    backgroundSize: "cover,contain",
    backgroundColor: "#16161A",
    minHeight: "100vh",

    paddingTop: "5%",
    paddingLeft: "3%",
    paddingRight: "3%",
  },
  pageTitle: {
    fontWeight: 600,
    fontSize: 32,
    letterSpacing: "0.02em",
    color: "#ffffff",
    textAlign: "left",
  },

  para: {
    fontWeight: 400,
    fontSize: 16,
    letterSpacing: "0.02em",
    color: "#414141",
    textAlign: "center",
  },
});

export default function Acculumation() {
  const classes = useStyles();
  const theme = useTheme();
  const store = useSelector((state) => state);
  const [pageLoaded, setPageLoaded] = useState(false);
  useEffect(() => setPageLoaded(true), []);

  const supportedTokens = [
    { TEST: "0xF13285D6659Aa6895e02EEFe3495408c99f70a86" },
    { PBR: "0x0d6ae2a429df13e44a07cd2969e085e4833f64a0" },
    { ORARE: "0xff2382bd52efacef02cc895bcbfc4618608aa56f" },
  ];
  return (
    <Box>
      <Seo
        title="SleepSwap | Track and Trade Smartly"
        description="Take a look at your ORARE, Ingredients, Dishes and the Dish calculator — all in one place. See the Dashboard here."
        keywords="dashboard, metaverse dashboard, dashboard foodverse, foodverse status, dish calculator foodverse, nft game, metaverse game, game nft, nft metaverse, nft blockchain, metaverse blockchain, food metaverse, foodverse, food game, nft food, metaverse food game"
        image="https://1499377728-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F-MkXfxALyD8sO44Y1OrY%2Fuploads%2FQvX3Uc0Ek5QPRRZIUMK2%2FUntitled%20design%20(3).gif?alt=media&token=eb3bd406-f66b-4738-9428-3dd8d8ed97fe"
      />
      {pageLoaded && (
        <Grid container>
          <Grid item md={2}>
            <SideBar />
          </Grid>
          <Grid item md={10} style={{ backgroundColor: "black" }}>
            <Header />
            <AccumulationComponent supportedTokens={supportedTokens} />
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
