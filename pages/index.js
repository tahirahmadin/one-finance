import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box, Grid, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import SideBar from "../common/Sidebar";
import Seo from "../common/Seo";
import Stake from "../common/Stake";

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundPosition: "center center,center center",
    backgroundRepeat: "no-repeat,no-repeat",
    backgroundSize: "cover,contain",
    backgroundColor: "#16161A",
    minHeight: "100vh",
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
    color: "#ffffff",
    textAlign: "left",
    [theme.breakpoints.down("md")]: {
      color: "#e5e5e5",
      fontSize: 32,
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

export default function Home() {
  const classes = useStyles();
  const theme = useTheme();
  const store = useSelector((state) => state);
  const { menuIndex } = store.ui;

  return (
    <Box>
      <Seo
        title="SleepSwap | Track and Trade Smartly"
        description="Take a look at your ORARE, Ingredients, Dishes and the Dish calculator — all in one place. See the Dashboard here."
        keywords="dashboard, metaverse dashboard, dashboard foodverse, foodverse status, dish calculator foodverse, nft game, metaverse game, game nft, nft metaverse, nft blockchain, metaverse blockchain, food metaverse, foodverse, food game, nft food, metaverse food game"
        image="https://1499377728-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F-MkXfxALyD8sO44Y1OrY%2Fuploads%2FQvX3Uc0Ek5QPRRZIUMK2%2FUntitled%20design%20(3).gif?alt=media&token=eb3bd406-f66b-4738-9428-3dd8d8ed97fe"
      />
      <Grid container>
        <Grid item md={2}>
          <SideBar />
        </Grid>
        <Grid item md={10}>
          <Box
            className={classes.background}
            style={{ backgroundColor: "#16161A", minHeight: "100vh" }}
          >
            w{/* {menuIndex === 0 && <Stake />} */}
          </Box>
          {menuIndex === 1 && <Stake />}
        </Grid>
      </Grid>
    </Box>
  );
}
