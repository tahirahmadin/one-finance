import React, { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import {
  Box,
  Grid,
  Hidden,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useChain } from "react-moralis";
import { Container } from "@mui/system";
import PoolCard from "../../components/Pools/PoolCard";
import Seo from "../../common/Seo";
import SideBar from "../../common/Sidebar";
import Header from "../../components/resuableComponents/Header";
import MobileBottomBar from "../../common/MobileBottomBar";

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
  const md = useMediaQuery(theme.breakpoints.down("md"));

  const [pageLoaded, setPageLoaded] = useState(false);

  let poolsData = [
    {
      title: "Accumulation Strategy",
      description:
        "Buy your desired tokens on successive price drops automatically by placing the strategy in the pool instantly.",
      icon: "https://cdn3d.iconscout.com/3d/premium/thumb/dollar-coin-in-winner-cup-5493527-4581314.png",
      url: "pools/accumulation",
      contractAddress: "0xEF8bfB001801Dfee3dc421aB31398C2d1fdB2bd4",
      type: "ACCUMULATION",
    },
    {
      title: "DCA Strategy",
      description:
        "Strategy will be your favorite tokens at a specific interval to make your buy prices normalised.",
      icon: "https://cdn3d.iconscout.com/3d/premium/thumb/blockchain-6841751-5607102.png",
      url: "pools/dca",
      contractAddress: "0xbfEE21a8af83089d31432cF67B57D22046215592",
      type: "DCA",
    },
    {
      title: "RSI Indicator Strategy",
      description:
        "Buy and Sell tokens based market price movement strength based indicator RSI.",
      icon: "https://cdn3d.iconscout.com/3d/premium/thumb/growth-chart-3943015-3273369.png",
      url: "accumulation",
      contractAddress: "0xbfEE21a8af83089d31432cF67B57D22046215592",
      type: "ACCUMULATION",
    },
  ];

  useEffect(() => setPageLoaded(true), []);

  return (
    <Box style={{ backgroundColor: "black" }}>
      <Seo
        title="Strategy Pools | Choose and Earn "
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
            <Box>
              <Box className={classes.background}>
                <Container>
                  <Typography variant="h2" className={classes.pageTitle}>
                    Strategy Pools
                  </Typography>

                  <Grid
                    container
                    display={"flex"}
                    justifyContent="space-between"
                    spacing={md ? 2 : 6}
                  >
                    {poolsData.map((singlePool, index) => (
                      <Grid item md={4} xs={12} sm={12} key={index}>
                        <PoolCard poolStaticData={singlePool} index={index} />
                      </Grid>
                    ))}
                  </Grid>
                </Container>
              </Box>
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
