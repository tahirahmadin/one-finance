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
import ReactImageGallery from "react-image-gallery";
import TopPoolCard from "../components/Dashboard/TopPoolCard";
import {
  AccessTime,
  Architecture,
  LockClock,
  Pix,
  Savings,
  ShoppingBasket,
  Train,
  TrendingUp,
} from "@mui/icons-material";
import ArticleCard from "../components/Dashboard/ArticleCard";

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
    height: 295,
    marginTop: 15,
    backgroundSize: "cover",
    backgroundImage:
      "url(https://ninjapromo.io/wp-content/uploads/2022/11/best-crypto-ad-networks.jpg)",
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

  const images = [
    {
      original:
        "https://ninjapromo.io/wp-content/uploads/2022/11/best-crypto-ad-networks.jpg",
    },
    {
      original:
        "https://www.cronj.com/blog/wp-content/uploads/How-Crypto-in-Metaverse-is-Revolutionizing-the-Digital-World.png",
    },
  ];

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
                <Grid container spacing={2} mb={md ? 5 : 6}>
                  <Grid item md={8} sm={12} xs={12}>
                    {/* <Box style={{ height: 100, borderRadius: 100 }}>
                      <ReactImageGallery
                        items={images}
                        autoPlay={true}
                        infinite={true}
                        showBullets={true}
                        showThumbnails={false}
                        showNav={false}
                        showFullscreenButton={false}
                        showPlayButton={false}
                      />
                    </Box> */}
                    <Box className={classes.card1}></Box>
                  </Grid>
                  <Grid item md={4} sm={12} xs={12}>
                    <WalletSummary />
                  </Grid>
                </Grid>

                <Typography variant="h6" fontWeight={600}>
                  Top pools this week
                </Typography>
                <Grid container spacing={md ? 0 : 2} mb={md ? 5 : 6}>
                  <Grid item md={3} sm={12} xs={12}>
                    <TopPoolCard
                      title={"Accumulation"}
                      invested={"112,324"}
                      change={"12.32"}
                      icon={<ShoppingBasket />}
                    />
                  </Grid>
                  <Grid item md={3} sm={12} xs={12}>
                    <TopPoolCard
                      title={"RSI"}
                      invested={"93,324"}
                      change={"9.32"}
                      icon={<Train />}
                    />
                  </Grid>
                  <Grid item md={3} sm={12} xs={12}>
                    <TopPoolCard
                      title={"Spot Grid"}
                      invested={"73,324"}
                      change={"7.11"}
                      icon={<LockClock />}
                    />
                  </Grid>
                  <Grid item md={3} sm={12} xs={12}>
                    <TopPoolCard
                      title={"DCA"}
                      invested={"53,324"}
                      change={"6.32"}
                      icon={<LockClock />}
                    />
                  </Grid>
                </Grid>
                <Typography variant="h6" fontWeight={600} mt={3}>
                  Learning booth
                </Typography>
                <Grid
                  container
                  spacing={md ? 2 : 4}
                  style={{ marginBottom: 20 }}
                >
                  <Grid item md={4} sm={12} xs={12}>
                    <ArticleCard
                      title={
                        "Why Dollar Cost Averaging is the best bet to accumulate your favourite crypto for long term"
                      }
                      image="https://zebpay.com/in/wp-content/uploads/2022/09/Dollar-Cost-Average.jpg"
                    />
                  </Grid>
                  <Grid item md={4} sm={12} xs={12}>
                    <ArticleCard
                      title={
                        "How accumulation strategy works, and give returns in one bull cycle"
                      }
                      image={
                        "https://public.bnbstatic.com/static/academy/uploads-original/db73faaafcff40a19b1d8e952d75562b.png"
                      }
                    />
                  </Grid>
                  <Grid item md={4} sm={12} xs={12}>
                    <ArticleCard
                      title={
                        "Why trading with indicators is the best way to avoid rist in investment"
                      }
                      image="https://en.cryptonomist.ch/wp-content/uploads/2019/06/RSI-indicator-cryptocurrency-trading.jpg"
                    />
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
