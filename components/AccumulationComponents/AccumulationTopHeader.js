import React, { useCallback, useEffect, useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Grid,
  Hidden,
  Grow,
} from "@mui/material";
import {
  AccountBalance,
  MonetizationOn,
  Payment,
  Savings,
  Schedule,
  TrendingUp,
  Wallet,
} from "@mui/icons-material";
import LinearProgressComponent from "../../common/LinearProgressComponent";
import { constants, strategyType } from "../../utils/constants";
import { usePoolInfo } from "../../hooks/usePoolInfo";
import { useWeb3Auth } from "../../hooks/useWeb3Auth";
import { useUserInfo } from "../../hooks/useUserInfo";

const useStyles = makeStyles((theme) => ({
  pageTitle: {
    fontWeight: 600,
    color: "#f9f9f9",
    textAlign: "left",
    fontSize: "1.4vw",
    [theme.breakpoints.down("md")]: {
      fontSize: 15,
    },
  },

  pageSubtitle: {
    color: "#616161",
    textAlign: "left",
  },
  cardTop: {
    backgroundColor: "#0C0D11",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 40,
    width: "100%",
    height: "100%",
    minHeight: 220,
    maxHeight: 250,
    backgroundImage: "linear-gradient(to left, #0C0D11,#000000)",
    border: "1px solid #1b1d24",
    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.03)",
    borderRadius: 14,
    "&:hover": {
      boxShadow: "0px 24px 33px -9px #0000005C",
    },

    [theme.breakpoints.down("md")]: {
      height: "100%",
      width: "100%",
    },
  },
  card: {
    padding: 20,
    width: "100%",
    border: "1px solid #2d2d32",
    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.03)",
    borderRadius: 30,
    "&:hover": {
      boxShadow: "0px 24px 33px -9px #0000005C",
    },
    [theme.breakpoints.down("md")]: {
      height: "100%",
      width: "100%",
    },
  },
  statsCard: {
    padding: 10,
    width: "100%",
    border: "1px solid #2d2d32",
    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.03)",
    borderRadius: 12,
    "&:hover": {
      boxShadow: "0px 24px 33px -9px #0000005C",
    },
    [theme.breakpoints.down("md")]: {
      height: "100%",
      width: "100%",
    },
  },
  statsCardHeading: {
    fontWeight: 600,
    color: "#e5e5e5",
    textAlign: "left",
  },
  statsCardPara: {
    textAlign: "left",
    fontSize: 13,
    fontWeight: 300,
  },

  title: {
    fontWeight: 600,
    fontSize: 32,
    color: "#e5e5e5",
    textAlign: "left",
  },
  heading: {
    fontWeight: 600,
    color: "#e5e5e5",
    textAlign: "left",
  },
  inputWrapper: {
    border: "1px solid #2d2d32",
    padding: "2px 20px 2px 20px",
    borderRadius: 10,
    backgroundColor: "rgba(106, 85, 234,0.03)",
  },

  actionButton: {
    borderRadius: 14,
    background: "rgba(130, 71, 229, 0.7)",
    padding: "12px 20px 12px 20px",
    color: "white",
    width: "100%",
    marginTop: 20,
    fontWeight: 600,
    fontSize: 16,
    "&:hover": {
      background: "rgba(130, 71, 229, 0.9)",
    },
  },
}));

export default function AccumulationTopHeader() {
  const classes = useStyles();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const { accountSC } = useWeb3Auth();

  const [userPoolState, setUserPoolState] = useState(null);

  const { poolInfo: poolGraphData, loading } = usePoolInfo(
    strategyType.ACCUMULATION
  );

  useEffect(() => {
    if (accountSC) {
      async function asyncFn() {
        let { userPoolInfo: userPoolGraphData, loading } = useUserInfo(
          strategyType.ACCUMULATION
        );
        console.log(userPoolGraphData);
        setUserPoolState(userPoolGraphData);
      }
      asyncFn();
    }
  }, [accountSC]);

  return (
    <Box className={classes.cardTop}>
      <Grid container spacing={3} height={"100%"}>
        <Grid item md={9} xs={12} height={"100%"}>
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent="flex-start"
            alignItems="space-between"
            height={"100%"}
          >
            <Box
              display={"flex"}
              justifyContent="flex-start"
              alignItems={"center"}
            >
              <Hidden mdDown>
                <Box
                  style={{
                    backgroundColor: "#0C0D11",
                    height: 55,
                    width: 55,
                    borderRadius: 8,
                  }}
                  display={"flex"}
                  justifyContent="center"
                  alignItems={"center"}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2936/2936952.png"
                    height={36}
                    width={36}
                  />
                </Box>
              </Hidden>
              <Hidden smUp>
                <Box>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2936/2936952.png"
                    height={30}
                    width={30}
                  />
                </Box>
              </Hidden>
              <Box ml={2}>
                <Box
                  display={"flex"}
                  flexDirection={md ? "column" : "row"}
                  justifyContent="flex-start"
                  alignItems={md ? "flex-start" : "center"}
                >
                  <Typography
                    variant="h3"
                    className={classes.pageTitle}
                    color="#f9f9f9"
                  >
                    Accumulate - Eat The Dip
                  </Typography>
                  <Typography
                    style={{
                      marginLeft: md ? 0 : 5,
                      borderRadius: 10,
                      fontSize: 8,
                      paddingLeft: 10,
                      paddingRight: 10,
                      color: "black",
                      fontWeight: 600,
                      paddingTop: 3,
                      paddingBottom: 3,

                      backgroundImage:
                        "linear-gradient(to right,#f9f9f9, #DADADA)",
                    }}
                  >
                    <TrendingUp style={{ fontSize: 13 }} />{" "}
                    {poolGraphData && poolGraphData.participants} people
                    invested
                  </Typography>
                </Box>

                <Typography
                  mt={1}
                  variant="body4"
                  fontSize={md ? 10 : 12}
                  color={"#bdbdbd"}
                  lineHeight={1}
                >
                  Start the strategy and eat every dip automatically without any
                  hassle.
                </Typography>
              </Box>
            </Box>
            <Box style={{ width: "100%" }} mt={3}>
              <Typography
                variant="small"
                color={"#f9f9f9"}
                style={{ textAlign: "right" }}
              >
                <Schedule
                  style={{ color: "#bdbdbd", fontSize: 18, marginRight: 5 }}
                />
                Time remaining
              </Typography>

              <Box
                display={"flex"}
                justifyContent="space-between"
                alignItems={"center"}
                mb={1}
                mt={2}
              >
                <Typography
                  variant="small"
                  color={"#f9f9f9"}
                  style={{ textAlign: "right" }}
                >
                  2023
                </Typography>
                <Typography
                  variant="small"
                  color={"#f9f9f9"}
                  style={{ textAlign: "right" }}
                >
                  214 days 41 hours
                </Typography>
              </Box>
              <LinearProgressComponent value={32} />
            </Box>
          </Box>
        </Grid>
        <Grid item md={3} xs={12}>
          <Box
            display={"flex"}
            flexDirection={md ? "row" : "column"}
            justifyContent={"space-between"}
            alignItems={"flex-start"}
          >
            <Box>
              <Typography variant="body2" color="#bdbdbd" fontSize={12}>
                <Wallet style={{ fontSize: 16 }} /> My Investments($)
              </Typography>
              <Typography
                variant="h2"
                color="#ffffff"
                style={{ fontWeight: 600, lineHeight: 1.6 }}
              >
                ${" "}
                {poolGraphData && poolGraphData.invested
                  ? poolGraphData.invested
                  : "-"}
              </Typography>
            </Box>
            <Box mt={md ? 0 : 2}>
              <Typography variant="body2" color="#bdbdbd" fontSize={12}>
                <TrendingUp style={{ fontSize: 16 }} /> Expected PnL*
              </Typography>
              <Typography
                variant="body1"
                color="#ffffff"
                fontSize={16}
                fontWeight={600}
              >
                +$1273 <span style={{ fontSize: 10, color: "green" }}>56%</span>
              </Typography>
            </Box>
            <Box mt={md ? 0 : 3}>
              <Typography variant="body2" color="#bdbdbd" fontSize={12}>
                <Payment style={{ fontSize: 16 }} />
                Total investment
              </Typography>
              <Typography
                variant="body1"
                color="#ffffff"
                fontSize={16}
                fontWeight={600}
              >
                ${" "}
                {poolGraphData && poolGraphData.invested
                  ? poolGraphData.invested
                  : "-"}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Typography variant="small" color="#bdbdbd">
        * Investment for <strong>2 years</strong> is recommended for best
        results.
      </Typography>
    </Box>
  );
}
