import React, { useCallback, useEffect, useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Grid,
  IconButton,
} from "@mui/material";
import {
  ArrowOutward,
  CallReceived,
  ContactSupport,
  TrendingUp,
} from "@mui/icons-material";
import { constants, strategyType } from "../../utils/constants";
import { usePoolInfo } from "../../hooks/usePoolInfo";
import { useWeb3Auth } from "../../hooks/useWeb3Auth";
import { useUserInfo } from "../../hooks/useUserInfo";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontWeight: 600,
    color: "#f9f9f9",
    textAlign: "left",
    fontSize: "1.0vw",
    [theme.breakpoints.down("md")]: {
      fontSize: 15,
    },
  },

  card: {
    backgroundColor: "#0C0D11",
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 14,
    paddingRight: 14,
    width: "100%",
    height: "100%",
    minHeight: 500,
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
      minHeight: 450,

      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 10,
      paddingRight: 10,
    },
  },
  balanceCard: {
    paddingTop: 21,
    paddingBottom: 21,
    paddingLeft: 21,
    paddingRight: 21,
    width: "100%",
    height: "100%",
    maxHeight: 200,
    backgroundImage: "linear-gradient(to bottom, #D2C7F6,#FAE5E3)",
    border: "1px solid #1b1d24",
    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.03)",
    borderRadius: 14,
    "&:hover": {
      boxShadow: "0px 24px 33px -9px #0000005C",
    },
    [theme.breakpoints.down("md")]: {
      height: "100%",
      width: "100%",
      paddingTop: 21,
      paddingBottom: 21,
      paddingLeft: 21,
      paddingRight: 21,
      maxHeight: 160,
    },
  },
}));

export default function PortfolioTopSection() {
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
    <Box className={classes.card}>
      <Box className={classes.balanceCard}>
        <Typography
          variant="body2"
          fontWeight={500}
          color="#212121"
          fontSize={13}
        >
          Wallet Balance
        </Typography>
        {/* Balances overview */}
        <Grid container spacing={3} height={"100%"} mt={md ? 0 : 2}>
          <Grid item md={8} sm={5} xs={5}>
            <Typography variant="h1" color="#212121" fontWeight={600}>
              $13,434
            </Typography>
            <Box
              mt={1}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <Box
                style={{
                  borderRadius: 30,
                  paddingLeft: md ? 5 : 10,
                  paddingRight: md ? 5 : 10,
                  color: "black",
                  fontWeight: 600,
                  paddingTop: 3,
                  paddingBottom: 3,
                  backgroundColor: "#f9f9f9",
                  width: "fit-content",
                  maxWidth: 100,
                }}
              >
                <Typography
                  variant="body2"
                  fontWeight={500}
                  color="#000000"
                  fontSize={11}
                >
                  <TrendingUp style={{ fontSize: 16, color: "green" }} /> 8.12%
                </Typography>
              </Box>
              <Typography
                variant="body2"
                fontWeight={500}
                color="#757575"
                fontSize={10}
                ml={0.3}
              >
                +$132
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            md={4}
            sm={7}
            xs={7}
            display={"flex"}
            justifyContent={"space-evenly"}
            alignItems={"flex-start"}
            mt={1}
          >
            <Box
              display={"flex"}
              flexDirection="column"
              justifyContent={"center"}
              alignItems={"center"}
            >
              <IconButton
                style={{ backgroundColor: "black", height: 36, width: 36 }}
              >
                <ArrowOutward style={{ fontSize: 16, color: "white" }} />
              </IconButton>
              <Typography
                mt={0.5}
                variant="body2"
                fontWeight={500}
                color="#000000"
                fontSize={10}
                textAlign={"center"}
              >
                Invest
              </Typography>
            </Box>
            <Box
              display={"flex"}
              flexDirection="column"
              justifyContent={"center"}
              alignItems={"center"}
            >
              <IconButton
                style={{ backgroundColor: "black", height: 36, width: 36 }}
              >
                <CallReceived style={{ fontSize: 16, color: "white" }} />
              </IconButton>
              <Typography
                mt={0.5}
                variant="body2"
                fontWeight={500}
                color="#000000"
                fontSize={10}
                textAlign={"center"}
              >
                Receive
              </Typography>
            </Box>
            <Box
              display={"flex"}
              flexDirection="column"
              justifyContent={"center"}
              alignItems={"center"}
            >
              <IconButton
                style={{ backgroundColor: "black", height: 36, width: 36 }}
              >
                <ContactSupport style={{ fontSize: 16, color: "white" }} />
              </IconButton>
              <Typography
                mt={0.5}
                variant="body2"
                fontWeight={500}
                color="#000000"
                fontSize={10}
                textAlign={"center"}
              >
                Help
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {/* All tokens deposited */}
      <Box style={{ paddingLeft: 21, paddingTop: 10 }}>
        <Typography
          variant="body2"
          fontWeight={600}
          color="#f9f9f9"
          fontSize={15}
        >
          My assets
        </Typography>
        <Box
          mt={1}
          display={"flex"}
          alignItems="center"
          justifyContent="space-between"
          style={{ borderBottom: "0.5px solid #212121" }}
        >
          <Box
            display={"flex"}
            alignItems="center"
            justifyContent="flex-start"
            py={1}
          >
            <Box
              mr={2}
              style={{
                backgroundColor: "#f9f9f9",
                height: 30,
                width: 30,
                borderRadius: "36%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="https://cryptologos.cc/logos/ethereum-eth-logo.png"
                alt="ETH"
                height="18px"
              />
            </Box>
            <Typography
              variant="body2"
              textAlign="right"
              fontWeight={600}
              color={"#f9f9f9"}
              fontSize={13}
            >
              Ethereum
            </Typography>
          </Box>

          <Box
            display="flex"
            flexDirection={"column"}
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            <Typography
              variant="body2"
              textAlign="right"
              fontWeight={600}
              color={"#f9f9f9"}
              fontSize={13}
            >
              1.25 Eth
            </Typography>
            <Typography
              variant="body2"
              textAlign="right"
              fontWeight={600}
              color={"#bdbdbd"}
              fontSize={11}
            >
              $12,382
            </Typography>
          </Box>
        </Box>
        <Box
          mt={1}
          display={"flex"}
          alignItems="center"
          justifyContent="space-between"
          style={{ borderBottom: "0.5px solid #212121" }}
        >
          <Box
            display={"flex"}
            alignItems="center"
            justifyContent="flex-start"
            py={1}
          >
            <Box
              mr={2}
              style={{
                backgroundColor: "#f9f9f9",
                height: 30,
                width: 30,
                borderRadius: "36%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="https://cryptologos.cc/logos/ethereum-eth-logo.png"
                alt="ETH"
                height="18px"
              />
            </Box>
            <Typography
              variant="body2"
              textAlign="right"
              fontWeight={600}
              color={"#f9f9f9"}
              fontSize={13}
            >
              Ethereum
            </Typography>
          </Box>

          <Box
            display="flex"
            flexDirection={"column"}
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            <Typography
              variant="body2"
              textAlign="right"
              fontWeight={600}
              color={"#f9f9f9"}
              fontSize={13}
            >
              1.25 Eth
            </Typography>
            <Typography
              variant="body2"
              textAlign="right"
              fontWeight={600}
              color={"#bdbdbd"}
              fontSize={11}
            >
              $12,382
            </Typography>
          </Box>
        </Box>
        <Box
          mt={1}
          display={"flex"}
          alignItems="center"
          justifyContent="space-between"
          style={{ borderBottom: "0.5px solid #212121" }}
        >
          <Box
            display={"flex"}
            alignItems="center"
            justifyContent="flex-start"
            py={1}
          >
            <Box
              mr={2}
              style={{
                backgroundColor: "#212121",
                height: 30,
                width: 30,
                borderRadius: "36%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Binance-coin-bnb-logo.png/1024px-Binance-coin-bnb-logo.png"
                alt="ETH"
                height="18px"
              />
            </Box>
            <Typography
              variant="body2"
              fontWeight={600}
              color={"#f9f9f9"}
              fontSize={13}
            >
              Binance Token
            </Typography>
          </Box>

          <Box
            display="flex"
            flexDirection={"column"}
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            <Typography
              variant="body2"
              textAlign="right"
              fontWeight={600}
              color={"#f9f9f9"}
              fontSize={13}
            >
              1.25 BNB
            </Typography>
            <Typography
              variant="body2"
              textAlign="right"
              fontWeight={600}
              color={"#bdbdbd"}
              fontSize={11}
            >
              $12,382
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
