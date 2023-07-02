import React, { useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useSelector, useDispatch } from "react-redux";
import Seo from "../common/Seo";

import WalletSummary from "../components/Dashboard/WalletSummary";
import TrendingCard from "../components/Dashboard/TrendingCard";
import DashboardActivities from "../components/Dashboard/DashboardActivities";

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
    fontSize: 24,
    color: "#f9f9f9",
    textAlign: "left",
    [theme.breakpoints.down("md")]: {
      fontSize: 18,
    },
  },

  pageSubtitle: {
    color: "#bdbdbd",
    textAlign: "left",
  },
  card1: {
    // backgroundColor: constants.baseColorLight,
    backgroundImage:
      "url(https://www.analyticsinsight.net/wp-content/uploads/2021/12/Top-10-cryptocurrencies-to-invest-for-US100-in-2022.jpg)",
    height: 295,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    marginTop: 20,
    marginBottom: 20,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    width: "100%",
    border: "1px solid #414141",
    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.03)",
    borderRadius: 14,
    "&:hover": {
      boxShadow: "0px 24px 33px -9px #0000005C",
    },

    [theme.breakpoints.down("md")]: {
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 5,
      paddingRight: 5,
    },
  },

  title: {
    fontWeight: 600,
    color: "#f9f9f9",
    textAlign: "left",
    fontSize: 16,
  },
  description: {
    fontWeight: 400,
    color: "#bdbdbd",
    textAlign: "left",
    lineHeight: 1.5,
    paddingTop: 5,
  },
}));

const DashboardPage = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box mb={4.6}>
      <Seo
        title="SleepSwap | Track and Trade Smartly"
        description="Trade like a pro"
        keywords="sleepswap"
        image="https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/001/990/708/datas/gallery.jpg"
      />
      <Box className={classes.background}>
        <Container>
          <Typography variant="h2" className={classes.pageTitle}>
            Overview Dashboard
          </Typography>
          <Grid container spacing={2} mb={4}>
            <Grid item md={8} sm={12} xs={12}>
              <Box pt={0} className={classes.card1}></Box>
            </Grid>
            <Grid item md={4} sm={12} xs={12}>
              <WalletSummary />
            </Grid>
          </Grid>
          {/*  Trending cards */}
          <Typography variant="h5">Trending</Typography>
          <Grid container spacing={2}>
            <Grid item md={4} sm={12} xs={12}>
              <TrendingCard />
            </Grid>
            <Grid item md={4} sm={12} xs={12}>
              <TrendingCard />
            </Grid>
            <Grid item md={4} sm={12} xs={12}>
              <TrendingCard />
            </Grid>
          </Grid>

          {/*  Activities */}
          <Box mt={5}>
            <div>
              <Typography variant="h5">Recent Orders</Typography>
            </div>
            <div>
              <DashboardActivities />
            </div>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default DashboardPage;
