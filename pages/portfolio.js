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
import SideBar from "../common/Sidebar";
import Header from "../components/resuableComponents/Header";
import PortfolioTopSection from "../components/portfolioComponents/PortfolioTopSection";
import { Tweet } from "react-twitter-widgets";
import MobileBottomBar from "../common/MobileBottomBar";
import AuthComponentChecker from "../components/resuableComponents/AuthComponentsChecker";

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
    backgroundImage:
      "url(https://www.analyticsinsight.net/wp-content/uploads/2021/12/Top-10-cryptocurrencies-to-invest-for-US100-in-2022.jpg)",
    height: 295,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    marginTop: 20,
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
      height: 200,
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 5,
      paddingRight: 5,
      backgroundImage:
        "url(https://cdn-scripbox-wordpress.scripbox.com/wp-content/uploads/2021/03/invest-rs-1000-every-month.jpg)",
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

  useEffect(() => setPageLoaded(true), []);

  return (
    <Box style={{ backgroundColor: "black" }}>
      <Seo
        title="Portfolio | Track and Trade Smartly"
        description="Trade like a pro"
        keywords="sleepswap"
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
                    Portfolio
                  </Typography>
                </Hidden>
                <Grid container spacing={2} mb={4} mt={md ? 0 : 1}>
                  <Grid item md={8} sm={12} xs={12}>
                    <AuthComponentChecker>
                      <PortfolioTopSection />
                    </AuthComponentChecker>
                  </Grid>
                  <Grid item md={4} sm={12} xs={12}>
                    <Hidden mdDown>
                      <Tweet
                        tweetId="1675361153138999299"
                        options={{ theme: "dark" }}
                      />
                    </Hidden>
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
