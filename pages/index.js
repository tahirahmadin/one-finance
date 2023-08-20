import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Hidden,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useSelector, useDispatch } from "react-redux";
import Seo from "../common/Seo";
import WalletSummary from "../components/Dashboard/WalletSummary";
import SideBar from "../common/Sidebar";
import Header from "../components/resuableComponents/Header";
import MobileBottomBar from "../common/MobileBottomBar";
import TopPoolCard from "../components/Dashboard/TopPoolCard";
import { LockClock, NightsStayTwoTone } from "@mui/icons-material";
import ArticleCard from "../components/Dashboard/ArticleCard";
import { useTopPoolInfo } from "../hooks/useTopPoolsInfo";
import Web3 from "web3";
import NetWorthCard from "../components/Dashboard/NetWorthCard";
import BudgetCard from "../components/Dashboard/BudgetCard";
import SummaryCard from "../components/Dashboard/SummaryCard";

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundPosition: "center center,center center",
    backgroundRepeat: "no-repeat,no-repeat",
    backgroundSize: "cover,contain",
    height: "100%",
    width: "100%",
    paddingTop: "2%",
    paddingLeft: "3%",
    paddingRight: "3%",
    [theme.breakpoints.down("md")]: {
      paddingTop: 0,
      paddingLeft: 5,
      paddingRight: 5,
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
    backgroundColor: "#171320",
    height: 295,

    backgroundSize: "cover",
    backgroundImage:
      "url(https://ninjapromo.io/wp-content/uploads/2022/11/best-crypto-ad-networks.jpg)",
    width: "100%",

    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.03)",
    borderRadius: 14,
    "&:hover": {
      boxShadow: "0px 24px 33px -9px #0000005C",
    },

    [theme.breakpoints.down("md")]: {
      height: 295,
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

const Home = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const [pageLoaded, setPageLoaded] = useState(false);

  // To fetch pools info
  const { poolsInfo: topPoolsData, loading } = useTopPoolInfo();

  useEffect(() => setPageLoaded(true), []);

  return (
    <Box style={{ backgroundColor: "black" }}>
      <Seo
        title="1Finance - All Finance at one place"
        description="Trade like a pro"
        keywords="1finance"
        image="https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/001/990/708/datas/gallery.jpg"
      />

      {pageLoaded && (
        <Grid container>
          <Hidden mdDown>
            <Grid item md={2} sm={12} xs={12}>
              <SideBar />
            </Grid>
          </Hidden>
          <Grid item md={10} sm={12} xs={12}>
            <Header />
            <Box className={classes.background}>
              <Container>
                <Hidden mdDown>
                  <Typography variant="h2" className={classes.pageTitle}>
                    Overview Dashboard
                  </Typography>
                </Hidden>
                <Grid container spacing={2} mb={2}>
                  <Grid item md={8} sm={12} xs={12} mt={2}>
                    <NetWorthCard />
                  </Grid>
                  <Grid item md={4} sm={12} xs={12} mt={2}>
                    <BudgetCard />
                  </Grid>
                </Grid>
                <Grid container spacing={2} mb={md ? 5 : 6}>
                  <Grid item md={8} sm={12} xs={12} mt={2}>
                    <SummaryCard />
                  </Grid>
                  <Grid item md={4} sm={12} xs={12} mt={2}>
                    /....//
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </Grid>
        </Grid>
      )}
      <Hidden mdUp>
        <div style={{ position: "fixed" }}>
          <MobileBottomBar />
        </div>
      </Hidden>
    </Box>
  );
};

export default Home;
