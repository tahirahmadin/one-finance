import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Container,
  Button,
  Typography,
  Hidden,
  useMediaQuery,
  Menu,
  ListItem,
  Backdrop,
  Grow,
  IconButton,
  SwipeableDrawer,
  Dialog,
  Badge,
  CircularProgress,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@mui/material";
import { useMetamask } from "../../hooks/useMetamask";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  toggleHeaderMenuExpanded,
  UpdateCorrectNetworkStatus,
  updateOrareBalance,
  updateMaticBalance,
  getTokensData,
  getTokensOwned,
  getUserOrderBooks,
  getUserActivity,
  getSalesHistory,
  changeUsername,
  changeUserProfile,
} from "../../reducers/UiReducer";
import LoginPopup from "../../common/LoginPopup";
import { checkCorrectNetwork, getUserAddress } from "../../actions/web3Actions";
import { getUserData } from "../../actions/serverActions";
import WrongNetworkPopup from "../../common/WrongNetworkPopup";
import ethersServiceProvider from "../../services/ethersServiceProvider";
import { getUserOrareBalance } from "../../actions/smartActions";
import constants from "../../utils/constants";
import NotificationsPopup from "../../common/NotificationsPopup";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import OutsideClickHandler from "react-outside-click-handler";
import { useWeb3Auth } from "../../hooks/useWeb3Auth";
import RPC from "../../actions/web3AuthActions";
import Web3 from "web3";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  linkItems: {
    fontWeight: "bold",
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
    backgroundColor: theme.palette.primary.main,
    color: "black",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: "black",
    },
  },
}));

const Header = ({ prelaunch }) => {
  const store = useSelector((state) => state);

  const dispatch = useDispatch();
  const classes = useStyles();
  const { active, accountSC, web3AuthSC, connect } = useWeb3Auth("1");

  const {
    headerMenuExpanded,
    userActivity,
    tokenData,
    balancesFlag,
    farmCategories,
  } = store.ui;
  const router = useRouter();
  const matches = useMediaQuery("(min-width:1153px)");
  const md = useMediaQuery("md");

  const [userInfo, setUserInfo] = useState(null);
  const [notificationPopup, setNotificationPopup] = useState(false);
  const [correctNetwork, setCorrectNetwork] = useState(true);
  const [networkPopup, setNetworkPopup] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [activityArray, setActivityArray] = useState([]);
  const [unread, setUnread] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [rewards, showRewards] = useState(false);

  const theme = useTheme();

  const currentChainId =
    constants.net === 0 ? constants.chainIdMain : constants.chainIdTest;

  const currentChainIdInHex =
    constants.net === 0
      ? constants.chainIdMainInHex
      : constants.chainIdTestInHex;

  const handleClick = (word) => {
    dispatch(toggleHeaderMenuExpanded());
    router.push(word);
  };

  useEffect(() => {
    dispatch(getTokensData());
    if (accountSC) {
      dispatch(getTokensOwned());
      dispatch(getUserOrderBooks());
      dispatch(getTokensData());
      dispatch(getUserActivity());
      dispatch(getSalesHistory());
    }
  }, [accountSC]);

  useEffect(() => {
    (async () => {
      if (window.ethereum !== undefined) {
        let networkStatus = await checkCorrectNetwork();
        if (networkStatus) {
          setCorrectNetwork(true);
          dispatch(UpdateCorrectNetworkStatus(true));
        } else {
          setCorrectNetwork(false);
          dispatch(UpdateCorrectNetworkStatus(false));
        }
      }
    })();
    // dispatch(isUserAuthenticated());
  }, [correctNetwork, accountSC]);

  useEffect(() => {
    if (accountSC) {
      getOneRareBalance();
      getMaticBalance();
    }
  }, [accountSC]);

  useEffect(() => {
    if (accountSC) {
      getOneRareBalance();
      getMaticBalance();
    }
  }, [balancesFlag]);

  const getMaticBalance = async () => {
    try {
      if (active) {
        const balance = await ethersServiceProvider.getMaticBalance();
        dispatch(updateMaticBalance(balance));
      }
    } catch (err) {
      console.log("Info: Get matic balance error: ", err);
    }
  };

  const getOneRareBalance = async () => {
    try {
      if (active) {
        const balance = await getUserOrareBalance(accountSC);
        dispatch(updateOrareBalance(parseFloat(balance)));
      }
    } catch (err) {
      // console.log("Get orare balance error: ", err);
    }
  };

  useEffect(() => {
    (async () => {
      if (active) {
        let userData = await getUserData(accountSC);
        setUserInfo(userData);
        if (userData && userData.username) {
          dispatch(changeUsername(userData.username));
        }
        if (userData && userData.profilePic) {
          dispatch(changeUserProfile(userData.profilePic));
        }
      }
    })();
    return () => {
      console.log("cleaned up");
    };
  }, [active]);

  // Handle account/network change
  useEffect(() => {
    async function asyncFn() {
      //Events to detect changes in account or network.
      if (window.ethereum !== undefined) {
        window.ethereum.on("accountsChanged", async function (accounts) {
          window.location.reload();
        });

        window.ethereum.on("networkChanged", async function (networkId) {
          window.location.reload();
        });
      }
    }
    asyncFn();
  }, [active, correctNetwork]);

  // Handle network change
  useEffect(() => {
    async function asyncFn() {
      //Events to detect changes in account or network.
      if (window.ethereum !== undefined) {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: currentChainIdInHex }], // chainId must be in hexadecimal numbers
        });
      }
    }
    asyncFn();
  }, [active]);

  // To connect the smart contract wallet
  const loginWallet = async () => {
    await connect();
  };

  const handleNetworkPopup = () => {
    setNetworkPopup(!networkPopup);
  };

  useEffect(() => {
    let data = dispatch(getUserActivity());
    return () => data;
  }, []);

  useEffect(() => {
    if (userActivity.length > 0 && tokenData.length > 0) {
      const activitiesArray = [];
      const uniqueDates = [];

      userActivity.map((activity) => {
        const tokenInAction = tokenData.filter(
          (token) => token.id === activity.tokenId
        );
        if (tokenInAction.length > 0) {
          const itemName = JSON.parse(tokenInAction[0].data).name;
          const itemImage = JSON.parse(tokenInAction[0].data).animation_url;
          const date = new Date(parseInt(activity.timestamp) * 1000);
          const activityDate =
            date.toDateString().substr(4, 6) +
            "," +
            date.toDateString().substr(10);
          if (!uniqueDates.includes(activityDate))
            uniqueDates.push(activityDate);
          const time = date.toTimeString().substr(0, 5).replace(":", ":");
          const sentence = getSentence(
            itemName,
            activity.action,
            activity.quantity,
            activity.contractAdd
          );

          if (activity.activityType != "DASHBOARD_ACTIVITY") {
            activitiesArray.push({
              date: activityDate,
              time: time,
              sentence: sentence,
              image: itemImage,
              timestamp: activity.timestamp,
            });
          }
          if (
            parseInt(activity.timestamp) * 1000 >
            parseInt(localStorage.getItem("activityTime"))
          ) {
            setUnread(true);
            setUnreadCount(unreadCount + 1);
          }
        }
      });

      const tempActivityArray = [];
      uniqueDates.map((uniqueDate) => {
        const dateActivity = {
          date: uniqueDate,
          activities: activitiesArray.filter(
            (activity) => activity.date === uniqueDate
          ),
        };
        tempActivityArray.push(dateActivity);
      });

      setActivityArray(tempActivityArray);
    }
    return () => 10;
  }, [userActivity, tokenData]);

  const getSentence = (tokenName, action, quantity, poolAdd) => {
    let poolName = "";
    if (action === "CLAIM_INGREDIENT" || action === "TOKEN_STAKED") {
      [...Array(6)].map((element, index) => {
        if (
          constants.farmingContract[index].toLowerCase() ===
          poolAdd.toLowerCase()
        ) {
          poolName = farmCategories[index].name;
        }
      });
    }

    if (action === "CLAIM_INGREDIENT") {
      if (parseInt(quantity) === 1) {
        return `Claimed ${tokenName} Ingredient from ${poolName} Pool`;
      }
      return `Claimed ${quantity} Ingredients from ${poolName} Pool -  ${tokenName} & ${
        parseInt(quantity) - 1
      } more`;
    } else if (action === "TOKEN_STAKED") {
      return `Started Farming in ${poolName} Pool`;
    } else if (action === "BATCH_CREATE_ORDER") {
      return `Listed ${quantity} Ingredients for Sale on the Market `;
    } else if (action === "CREATE_ORDER") {
      return `Listed ${tokenName} Crop for Sale on the Market`;
    } else if (action === "SELL_ORDER_INGREDIENT") {
      return `Sold ${tokenName} Crop at the Market`;
    } else if (action === "BUY_ORDER_INGREDIENT") {
      return `Bought ${tokenName} Ingredient from the market`;
    } else if (action === "BATCH_SELL_ORDER") {
      if (parseInt(quantity) === 1) {
        return `Sold ${tokenName} at the Market`;
      }
      return `Sold ${quantity} Ingredients at the Market- ${tokenName} & ${
        parseInt(quantity) - 1
      } More`;
    } else if (action === "COOK_DISH") {
      return `Cooked up ${tokenName} Dish`;
    } else if (action === "BATCH_BUY_ORDER") {
      return `Bought ${quantity} items using Magic Buy`;
    } else if (action === "CANCEL_ORDER") {
      return `Canceled your Listing for ${tokenName} Crop at the Market`;
    } else if (action === "BATCH_CANCEL_ORDER") {
      return `Canceled your Listing for ${quantity} Ingredients at the Market`;
    } else if (action === "TRANSFER_INGREDIENT") {
      return `Transferred ${tokenName} Ingredient.`;
    } else if (action === "BATCH_TRANSFER_INGREDIENT") {
      return `Transferred ${quantity} Ingredients - ${tokenName} & ${
        parseInt(quantity) - 1
      } More.`;
    } else if (action === "RECEIVE_INGREDIENT") {
      return `Received ${tokenName}.`;
    } else if (action === "BATCH_RECEIVE_INGREDIENT") {
      return `Received ${quantity} Ingredients - ${tokenName} & ${
        parseInt(quantity) - 1
      } More.`;
    } else if (action === "TRANSFER_DISH") {
      return `Transferred ${tokenName} Dish.`;
    } else if (action === "BATCH_TRANSFER_DISH") {
      return `Transferred ${quantity} Dishes - ${tokenName} & ${
        parseInt(quantity) - 1
      } More.`;
    } else if (action === "RECEIVE_DISH") {
      return `Received ${tokenName} dish.`;
    } else if (action === "BATCH_RECEIVE_DISH") {
      return `Received ${quantity} Dishes - ${tokenName} & ${
        parseInt(quantity) - 1
      } More.`;
    } else if (action === "CLAIM_NFT") {
      return `You received ${tokenName}.`;
    } else if (action === "LEADERBOARD_REWARD") {
      let amount = Web3.utils.fromWei(quantity, "ether");
      return `You received Leaderboard Reward  of ${amount} ORARE.`;
    } else return "";
  };

  return (
    <Box
      pr={3}
      pl={3}
      bgcolor="secondary.main"
      style={{
        position: "relative",
        zIndex: 101,
        position: "sticky",
        top: 0,
        position: "-webkit-sticky",
        position: "sticky",
      }}
    >
      <header>
        <NotificationsPopup
          userInfo={userInfo}
          popupEnable={notificationPopup}
          active={accountSC}
          accountSC={accountSC}
          notificationPopup={notificationPopup}
          setNotificationPopup={setNotificationPopup}
        />

        <Dialog
          open={networkPopup}
          TransitionComponent={Transition}
          keepMounted={false}
          onClose={null}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
          maxWidth="lg"
          fullWidth={false}
        >
          <WrongNetworkPopup handleNetworkPopup={handleNetworkPopup} />
        </Dialog>

        <Grid
          style={{
            color: theme.palette.primary.contrastText,
            display: "flex",
            paddingTop: "1rem",
            paddingBottom: "1rem",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Grid
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Link href="/">
              <a style={{ display: "flex", marginRight: "2rem" }}>
                <img
                  src="https://onerare-bucket.s3.ap-south-1.amazonaws.com/assets/images/LogoWhite.svg"
                  alt="One Rare logo white"
                />
              </a>
            </Link>
          </Grid>
          <Grid display="flex" alignItems="center">
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
                    color="primary"
                    style={{
                      fontWeight: "bold",
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
                  border: "2px solid" + theme.palette.primary.main,
                  borderRadius: "8px",
                  marginRight: 1,
                }}
              >
                <p
                  style={{
                    color: theme.palette.primary.main,
                    marginLeft: 5,
                    marginRight: 5,
                    marginTop: 15,
                    fontSize: matches ? 14 : 12,
                  }}
                >
                  {accountSC &&
                    accountSC.slice(0, 5) + "..." + accountSC.slice(38, 42)}
                </p>

                {matches && (
                  <Link href="/dashboard">
                    <a style={{ textDecoration: "none" }}>
                      <Button
                        color="primary"
                        style={{ fontWeight: "bold" }}
                        className={classes.buttonConnect}
                      >
                        VIEW Dashboard
                      </Button>
                    </a>
                  </Link>
                )}
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
                  <Link href="/farm">
                    <a style={{ textDecoration: "none" }}>
                      <Typography
                        onClick={handleClick}
                        variant="body2"
                        color="textSecondary"
                        className={classes.linkItems}
                        style={{
                          color:
                            router.asPath === "/farm"
                              ? theme.palette.cyan.main
                              : "white",
                          padding: "3px 25px",
                          width: 180,
                        }}
                      >
                        FARM
                      </Typography>
                    </a>
                  </Link>
                </ListItem>
                <ListItem classes={{ root: classes.listItem }}>
                  <Link href="/farmersmarket">
                    <a style={{ textDecoration: "none" }}>
                      <Typography
                        onClick={handleClick}
                        variant="body2"
                        color="textSecondary"
                        className={classes.linkItems}
                        style={{
                          color: router.asPath.includes("/farmersmarket")
                            ? theme.palette.cyan.main
                            : "white",
                          padding: "3px 25px",
                          width: 180,
                        }}
                      >
                        MARKET
                      </Typography>
                    </a>
                  </Link>
                </ListItem>
                <ListItem classes={{ root: classes.listItem }}>
                  <Link href="/recipes">
                    <a style={{ textDecoration: "none" }}>
                      <Typography
                        onClick={handleClick}
                        variant="body2"
                        color="textSecondary"
                        className={classes.linkItems}
                        style={{
                          color: router.asPath.includes("/recipes")
                            ? theme.palette.cyan.main
                            : "white",
                          padding: "3px 25px",
                          width: 180,
                        }}
                      >
                        KITCHEN
                      </Typography>
                    </a>
                  </Link>
                </ListItem>
                <ListItem classes={{ root: classes.listItem }}>
                  <Link href="/leaderboard">
                    <a style={{ textDecoration: "none" }}>
                      <Typography
                        onClick={handleClick}
                        variant="body2"
                        color="textSecondary"
                        className={classes.linkItems}
                        style={{
                          color: router.asPath.includes("/leaderboard")
                            ? theme.palette.cyan.main
                            : "white",
                          padding: "3px 25px",
                          width: 180,
                        }}
                      >
                        LEADERBOARD
                      </Typography>
                    </a>
                  </Link>
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
                {/* <ListItem classes={{ root: classes.listItem }}>
                  <Link href="/playground">
                    <a style={{ textDecoration: "none" }}>
                      <Typography
                        onClick={handleClick}
                        variant="body2"
                        color="textSecondary"
                        className={classes.linkItems}
                        style={{
                          color:
                            router.asPath === "/playground"
                              ? theme.palette.cyan.main
                              : "white",
                          padding: "3px 25px",
                          width: 180,
                        }}
                      >
                        {" "}
                        PLAYGROUND
                      </Typography>
                    </a>
                  </Link>
                </ListItem> */}
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
                <ListItem classes={{ root: classes.listItem }}>
                  <Link href="/rewards/bhukkad-cafe">
                    <a style={{ textDecoration: "none" }}>
                      <Typography
                        onClick={handleClick}
                        variant="body2"
                        color="textSecondary"
                        className={classes.linkItems}
                        style={{
                          color: router.asPath.includes("/rewards/bhukkad-cafe")
                            ? theme.palette.cyan.main
                            : "#FF87FF",
                          padding: "3px 25px",
                          width: 180,
                        }}
                      >
                        THE BHUKKAD CAFE
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
    </Box>
  );
};

export default Header;
