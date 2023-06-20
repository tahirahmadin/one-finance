import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box, Grid, Hidden, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import SideBar from "../common/Sidebar";
import Seo from "../common/Seo";
import Pools from "../components/Pools/Pools";
import Portfolio from "../components/Portfolio/Portfolio";
import Header from "./../components/resuableComponents/Header";
import Rewards from "../components/Rewards";
import Leaderboard from "../components/Leaderboard";
import Activities from "../components/Activities";
import DashboardPage from "./dashboard";

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

export default function Home() {
  const classes = useStyles();
  const theme = useTheme();
  const store = useSelector((state) => state);
  const [pageLoaded, setPageLoaded] = useState(false);
  useEffect(() => setPageLoaded(true), []);

  const { menuIndex } = store.ui;

  return (
    <Box style={{ backgroundColor: "black" }}>
      <Seo
        title="SleepSwap | Track and Trade Smartly"
        description="Trade like a pro"
        keywords="sleepswap"
        image="https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/001/990/708/datas/gallery.jpg"
      />
      {pageLoaded && (
        <Grid container>
          <Hidden mdDown>
            <Grid item md={2}>
              <SideBar />
            </Grid>
          </Hidden>
          <Grid item md={10}>
            <Header />
            {menuIndex === 0 && <DashboardPage />}
            {menuIndex === 1 && <Pools />}
            {menuIndex === 2 && <Rewards />}
            {menuIndex === 3 && <Leaderboard />}
            {menuIndex === 4 && <Activities />}
            {menuIndex === 5 && <Activities />}
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
