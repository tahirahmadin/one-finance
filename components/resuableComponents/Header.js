import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Button,
  Typography,
  useMediaQuery,
  ListItem,
  SwipeableDrawer,
  CircularProgress,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  toggleHeaderMenuExpanded,
  updateMaticBalance,
} from "../../reducers/UiReducer";
import ethersServiceProvider from "../../services/ethersServiceProvider";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useWeb3Auth } from "../../hooks/useWeb3Auth";
import { Wallet } from "@mui/icons-material";
import { Container } from "@mui/system";

const useStyles = makeStyles((theme) => ({
  background: {
    width: "100%",
    paddingLeft: "3%",
    paddingRight: "3%",
    [theme.breakpoints.down("md")]: {
      paddingLeft: 15,
      paddingRight: 15,
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
  const store = useSelector((state) => state);

  const dispatch = useDispatch();
  const classes = useStyles();
  // const { active, accountSC, web3AuthSC, connect } = useWeb3Auth();
  const accountSC = "0x9D7117a07fca9F22911d379A9fd5118A5FA4F448";
  const web3AuthSC = true;
  const active = true;

  const {
    headerMenuExpanded,

    balancesFlag,
  } = store.ui;
  const router = useRouter();
  const matches = useMediaQuery("(min-width:1153px)");
  const md = useMediaQuery("md");

  const theme = useTheme();

  const handleClick = (word) => {
    dispatch(toggleHeaderMenuExpanded());
    router.push(word);
  };

  // To connect the smart contract wallet
  const loginWallet = async () => {
    await connect();
  };

  return (
    <Box className={classes.background}>
      <Container>
        <header>
          <Grid
            style={{
              color: theme.palette.primary.contrastText,
              display: "flex",
              paddingTop: "1rem",
              paddingBottom: "1rem",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Grid display="flex" alignItems="center">
              <Link href="/activities">
                <a style={{ textDecoration: "none" }}>
                  <Typography
                    onClick={handleClick}
                    variant="body2"
                    color="textSecondary"
                    className={classes.linkItems}
                    style={{
                      color: router.asPath.includes("/activities")
                        ? theme.palette.cyan.main
                        : "white",
                      padding: "3px 25px",
                      width: "100%",
                    }}
                  >
                    Explorer
                  </Typography>
                </a>
              </Link>
              <Link href="/activities">
                <a style={{ textDecoration: "none" }}>
                  <Typography
                    onClick={handleClick}
                    variant="body2"
                    color="textSecondary"
                    className={classes.linkItems}
                    style={{
                      color: router.asPath.includes("/activities")
                        ? theme.palette.cyan.main
                        : "white",
                      padding: "3px 25px",
                      width: "100%",
                    }}
                  >
                    Activities
                  </Typography>
                </a>
              </Link>
              <Link href="/activities">
                <a style={{ textDecoration: "none" }}>
                  <Typography
                    onClick={handleClick}
                    variant="body2"
                    color="textSecondary"
                    className={classes.linkItems}
                    style={{
                      color: router.asPath.includes("/activities")
                        ? theme.palette.cyan.main
                        : "white",
                      padding: "3px 25px",
                      width: "100%",
                    }}
                  >
                    How It Works
                  </Typography>
                </a>
              </Link>
              {!accountSC ? (
                <Box>
                  {web3AuthSC ? (
                    <Button
                      color="primary"
                      style={{ fontWeight: "bold", minWidth: 140 }}
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
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    height: 40,
                    border: "2px solid" + theme.palette.secondary.main,
                    borderRadius: "20px",
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
                      fontWeight: 500,
                      fontSize: matches ? 14 : 12,
                    }}
                  >
                    {accountSC &&
                      accountSC.slice(0, 5) + "..." + accountSC.slice(38, 42)}
                  </p>

                  <Button
                    color="secondary"
                    style={{
                      borderTopRightRadius: "20px",
                      borderBottomRightRadius: "20px",
                    }}
                    className={classes.buttonConnect}
                  >
                    <Wallet />
                  </Button>
                </Box>
              )}

              <SwipeableDrawer
                anchor="right"
                open={headerMenuExpanded}
                onOpen={() => dispatch(toggleHeaderMenuExpanded())}
                onClose={() => dispatch(toggleHeaderMenuExpanded())}
                classes={{ paper: classes.paper }}
                hidden={matches}
              >
                <Box position="relative">
                  <ListItem
                    onClick={handleClick}
                    sx={{ justifyContent: "flex-start", pb: 2.5, ml: 2.2 }}
                  >
                    <KeyboardArrowRightIcon
                      style={{ color: "#fff", fontSize: 26 }}
                    />
                  </ListItem>

                  <ListItem classes={{ root: classes.listItem }}>
                    <Link href="/season-2">
                      <a style={{ textDecoration: "none" }}>
                        <Typography
                          onClick={handleClick}
                          variant="body2"
                          color="textSecondary"
                          className={classes.linkItems}
                          style={{
                            color: router.asPath.includes("/season-2")
                              ? theme.palette.cyan.main
                              : "white",
                            padding: "3px 25px",
                            width: 180,
                          }}
                        >
                          SEASON 2
                        </Typography>
                      </a>
                    </Link>
                  </ListItem>

                  <ListItem classes={{ root: classes.listItem }}>
                    <Link href="/faq">
                      <a style={{ textDecoration: "none" }}>
                        <Typography
                          onClick={handleClick}
                          variant="body2"
                          color="textSecondary"
                          className={classes.linkItems}
                          style={{
                            color:
                              router.asPath === "/faq"
                                ? theme.palette.cyan.main
                                : "white",
                            padding: "3px 25px",
                            width: 180,
                          }}
                        >
                          FAQs
                        </Typography>
                      </a>
                    </Link>
                  </ListItem>

                  {/* <Hidden mdUp> d*/}
                  <ListItem classes={{ root: classes.listItem }}>
                    <Link href="/dashboard">
                      <a style={{ textDecoration: "none" }}>
                        <Typography
                          onClick={handleClick}
                          variant="body2"
                          color="textSecondary"
                          className={classes.linkItems}
                          style={{
                            color:
                              router.asPath === "/dashboard"
                                ? theme.palette.cyan.main
                                : "white",
                            padding: "3px 25px",
                            width: 180,
                          }}
                        >
                          VIEW DASHBOARD
                        </Typography>
                      </a>
                    </Link>
                  </ListItem>
                  {/* </Hidden> */}
                </Box>
              </SwipeableDrawer>
            </Grid>
          </Grid>
        </header>
      </Container>
    </Box>
  );
};

export default Header;
