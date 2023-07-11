import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  CircularProgress,
  Hidden,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import ethersServiceProvider from "../../services/ethersServiceProvider";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useWeb3Auth } from "../../hooks/useWeb3Auth";
import { Redeem, Wallet } from "@mui/icons-material";
import { Container } from "@mui/system";
import { tokenInstance } from "../../contracts";
import { getUserUSDTBalance } from "../../actions/smartActions";
import { setUsdtBalanceOfUser } from "../../reducers/UiReducer";

const useStyles = makeStyles((theme) => ({
  background: {
    width: "100%",
    paddingLeft: "3%",
    paddingRight: "3%",
    [theme.breakpoints.down("md")]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  linkItems: {
    fontWeight: 400,
    fontSize: 14,
    [theme.breakpoints.down("md")]: {
      fontSize: 14,
    },
  },
  paper: {
    top: 0,
    left: "unset !important",
    right: 0,
    width: 220,
    borderRadius: "0",
    backgroundColor: "black",
    transformOrigin: "16px -1px !important",
    paddingTop: 20,
    overflow: "hidden",
  },
  listItem: {
    justifyContent: "flex-start",
  },
  buttonConnect: {
    backgroundColor: theme.palette.secondary.main,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: "white",
    },
  },
}));

const Header = () => {
  const theme = useTheme();
  const store = useSelector((state) => state);
  const { refetchValue } = store.ui;
  const dispatch = useDispatch();
  const router = useRouter();
  const matches = useMediaQuery("(min-width:1153px)");
  const md = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const [success, setSuccess] = useState(0);
  const classes = useStyles();
  const { active, accountSC, web3AuthSC, connect, wallet } = useWeb3Auth();

  // Get USDT Balance in account
  useEffect(() => {
    if (accountSC) {
      async function asyncFn() {
        let res = await getUserUSDTBalance(accountSC);
        await dispatch(setUsdtBalanceOfUser(res));
      }
      asyncFn();
    }
  }, [accountSC, refetchValue]);

  // To connect the smart contract wallet
  const loginWallet = async () => {
    await connect();
  };

  const handleClaimFaucet = async () => {
    if (accountSC) {
      let provider = ethersServiceProvider.web3AuthInstance;
      let tokenContract = await tokenInstance(provider.provider);
      await tokenContract.cla;
      const response = await tokenContract.methods
        .claimFaucet()
        .send(
          {
            from: accountSC,
          },
          async function (error, transactionHash) {
            if (transactionHash) {
              setSuccess(1);
            } else {
              setSuccess(0);
            }
          }
        )
        .on("receipt", async function (receipt) {
          setSuccess(2);
          window.location.reload();
        })
        .on("error", async function (error) {
          setSuccess(0);
        });
    }
  };

  return (
    <Box className={classes.background}>
      <Container>
        <header>
          <Box
            style={{
              color: theme.palette.primary.contrastText,
              display: !md && "flex",
              paddingTop: "1rem",
              paddingBottom: "1rem",
              alignItems: "center",
              justifyContent: !md && "flex-end",
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent={"space-between"}
            >
              <Hidden mdUp>
                <Box>
                  <Typography variant="body2" pb={1} style={{ color: "white" }}>
                    <img
                      src="https://www.sleepswap.io/SleepSwap_Plain.png"
                      height="45px"
                    />
                    <strong>Sleep</strong>Swap
                  </Typography>
                </Box>
                {/* <Box display={"flex"} justifyContent={"start"}>
                  <Box pr={1}>
                    <img
                      src="https://cdn.pixabay.com/photo/2023/02/24/00/41/ai-generated-7809880_1280.jpg"
                      style={{
                        color: "white",
                        height: 40,
                        width: 40,
                        borderRadius: 10,
                      }}
                    />
                  </Box>
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"center"}
                  >
                    <Typography
                      variant="smallheading"
                      style={{
                        color: "white",
                        fontWeight: 600,
                      }}
                    >
                      $23,435
                    </Typography>

                    <Typography
                      variant="small"
                      style={{ color: "#bdbdbd", lineHeight: 1 }}
                    >
                      Wallet Balance
                    </Typography>
                  </Box>
                </Box> */}
              </Hidden>
              <Hidden mdDown>
                <Box>
                  <Button
                    style={{ textDecoration: "none", textTransform: "none" }}
                  >
                    <Typography variant="small" fontWeight={600}>
                      <Box
                        onClick={handleClaimFaucet}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: 40,
                          borderRadius: "14px",
                          marginRight: 0.5,
                          fontWeight: 500,
                          color: "#6EC046",
                          fontSize: 13,
                        }}
                      >
                        {success === 0 && "Get USDT Faucet"}
                        {success === 1 && "Receiving..."}
                        {success === 2 && "Received"}
                      </Box>{" "}
                    </Typography>
                  </Button>
                </Box>
              </Hidden>
              <Hidden mdDown>
                <Link href="/activities" style={{ textDecoration: "none" }}>
                  {/* <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",

                      height: 40,
                      border: "2px solid" + theme.palette.secondary.main,
                      borderRadius: "20px",
                      marginRight: 1,
                      fontWeight: 500,
                      color: "white",
                      fontSize: 12,
                    }}
                  >
                    <span style={{ paddingLeft: 10, paddingRight: 10 }}>
                      <img
                        src="https://cdn3d.iconscout.com/3d/premium/thumb/gift-box-6438383-5307752.png"
                        style={{ color: "yellow", height: 24, marginRight: 4 }}
                      />
                      Claim 32 SLEEP
                    </span>
                  </Box> */}
                </Link>
              </Hidden>

              {!accountSC ? (
                <Box>
                  {web3AuthSC ? (
                    <Button
                      color="primary"
                      style={{
                        fontWeight: 600,
                        minWidth: 120,
                        borderRadius: 14,
                        paddingLeft: 14,
                        paddingRight: 14,
                        textTransform: "capitalize",
                      }}
                      onClick={loginWallet}
                      className={classes.buttonConnect}
                    >
                      Connect {matches ? "Wallet" : ""}{" "}
                    </Button>
                  ) : (
                    <Button
                      color="secondary"
                      style={{
                        backgroundColor: "#17191A",
                        border: "1px solid #17191A",
                        boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.03)",
                        minWidth: matches ? 150 : 100,
                        borderRadius: 14,
                      }}
                      className={classes.buttonConnect}
                    >
                      Loading
                      <CircularProgress
                        style={{ color: "green", marginLeft: 5 }}
                        size={"16px"}
                      />
                    </Button>
                  )}
                </Box>
              ) : (
                <Link href="/portfolio" style={{ textDecoration: "none" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      height: 40,
                      border: "2px solid" + theme.palette.secondary.main,
                      borderRadius: 4,
                      marginRight: 1,
                      fontWeight: 500,
                    }}
                  >
                    <p
                      style={{
                        color: "white",
                        marginLeft: 10,
                        marginRight: 5,
                        marginTop: 15,
                        fontWeight: 600,
                        fontSize: matches ? 14 : 12,
                      }}
                    >
                      {accountSC &&
                        accountSC.slice(0, 3) + "..." + accountSC.slice(38, 42)}
                    </p>

                    <Button
                      color="secondary"
                      style={{
                        borderTopRightRadius: 14,
                        borderBottomRightRadius: 14,
                      }}
                      className={classes.buttonConnect}
                    >
                      <Wallet />
                    </Button>
                  </Box>
                </Link>
              )}
            </Box>
          </Box>
        </header>
      </Container>
    </Box>
  );
};

export default Header;
