import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Box,
  Container,
  Grid,
  Hidden,
  Typography,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
import Seo from "../../common/Seo";
import SideBar from "../../common/Sidebar";
import Header from "../../components/resuableComponents/Header";
import AccumulationComponent from "../../components/AccumulationComponents/AccumulationComponent";
import DCAComponent from "../../components/dcaComponents/DCAComponent";
import Link from "next/link";
import { KeyboardArrowRight } from "@mui/icons-material";
import MobileBottomBar from "../../common/MobileBottomBar";

const useStyles = makeStyles((theme) => ({
  background: {
    // backgroundImage: 'url("images/network.png")',
    backgroundPosition: "center center,center center",
    backgroundRepeat: "no-repeat,no-repeat",
    backgroundSize: "cover,contain",
    height: "100%",
    width: "100%",
    paddingTop: 5,
    paddingLeft: "3%",
    paddingRight: "3%",
    [theme.breakpoints.down("md")]: {
      paddingTop: "2%",
      paddingLeft: 0,
      paddingRight: 0,
    },
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
}));

export default function DCA() {
  const classes = useStyles();
  const theme = useTheme();
  const store = useSelector((state) => state);
  const [pageLoaded, setPageLoaded] = useState(false);
  useEffect(() => setPageLoaded(true), []);

  return (
    <Box>
      <Seo
        title="Dollar Cost Averaging | Track and Trade Smartly"
        description="Take a look at your SLEEP, Ingredients, Dishes and the Dish calculator — all in one place. See the Dashboard here."
        keywords="dashboard, metaverse dashboard, dashboard foodverse, foodverse status, dish calculator foodverse, nft game, metaverse game, game nft, nft metaverse, nft blockchain, metaverse blockchain, food metaverse, foodverse, food game, nft food, metaverse food game"
        image="https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/001/990/708/datas/original.png"
      />
      {pageLoaded && (
        <Grid container>
          <Hidden mdDown>
            <Grid item md={2}>
              <SideBar />
            </Grid>
          </Hidden>
          <Grid item md={10} style={{ backgroundColor: "black" }}>
            <Header />
            <Box className={classes.background}>
              <Container>
                <Typography
                  variant={"body2"}
                  fontWeight={300}
                  fontSize={12}
                  mb={2}
                  color={"#bdbdbd"}
                >
                  <Link
                    href="/"
                    style={{
                      textDecoration: "none",
                      color: "#bdbdbd",
                      cursor: "pointer",
                    }}
                  >
                    Home
                  </Link>{" "}
                  <KeyboardArrowRight style={{ fontSize: 18 }} />
                  Pools
                  <KeyboardArrowRight style={{ fontSize: 18 }} />
                  <span style={{ color: "#f9f9f9" }}>DCA Strategy</span>
                </Typography>
                {/* Component Starts from here */}
                <DCAComponent />
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
}
