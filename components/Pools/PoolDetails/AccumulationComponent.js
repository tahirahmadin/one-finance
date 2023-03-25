import React, { useCallback, useEffect, useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Box,
  Button,
  Grid,
  Typography,
  useTheme,
  Input,
  Slider,
  Container,
} from "@mui/material";
import {
  checkUSDTApproved,
  getPoolDetails,
  getUserUSDTBalance,
} from "../../../actions/smartActions";
import { useWeb3Auth } from "../../../hooks/useWeb3Auth";
import TxPopup from "../../../common/TxPopup";
import ethersServiceProvider from "../../../services/ethersServiceProvider";
import { accumulationInstance, tokenInstance } from "../../../contracts";
import web3 from "../../../web3";
import { ArrowDropDown } from "@mui/icons-material";
import Web3 from "web3";
import { getTokenPriceStats } from "../../../actions/serverActions";
import { useSelector, useDispatch } from "react-redux";
import {
  GetPoolDataById,
  GetPoolUserActivityQuery,
} from "../../../queries/graphQueries";
import { useLazyQuery } from "@apollo/client";
import LineChart from "../../Charts/LineChart";
import TimeAgo from "timeago-react";
import { setUsdtBalanceOfUser } from "../../../reducers/UiReducer";

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
      paddingTop: "10%",
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
  card: {
    padding: 20,
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
    color: "#f9f9f9",
    textAlign: "left",
    fontSize: "1.2rem",
  },
  statsCardPara: {
    textAlign: "left",
    fontSize: 13,
    fontWeight: 300,
  },

  title: {
    fontWeight: 600,
    fontSize: 32,
    color: "#f9f9f9",
    textAlign: "left",
  },
  heading: {
    fontWeight: 600,
    fontSize: 22,
    color: "#f9f9f9",
    textAlign: "left",
  },
  inputWrapper: {
    border: "1px solid #2d2d32",
    padding: "6px 20px 6px 20px",
    borderRadius: 10,
    backgroundColor: "rgba(106, 85, 234,0.03)",
  },

  actionButton: {
    borderRadius: 10,
    background: "rgba(130, 71, 229, 0.3)",
    padding: "12px 20px 12px 20px",
    color: "white",
    width: "100%",
    marginTop: 20,
    fontWeight: 600,
    fontSize: 16,
  },
}));

export default function AccumulationComponent() {
  const classes = useStyles();
  const theme = useTheme();
  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  const { accountSC } = useWeb3Auth();

  const { usdtBalance } = store.ui;

  const [amount, setAmount] = useState(1000);
  const [percent, setPercent] = useState(10);
  const [grids, setGrids] = useState(4);
  const [stakeCase, setStakeCase] = useState(0);
  const [isApproved, setIsApproved] = useState(false);
  const [resetFlag, setResetFlag] = useState(0);
  const [orderPrices, setOrderPrices] = useState([]);
  const [orderTokenReceived, setOrderTokenReceived] = useState([]);
  const [tokenPriceData, setTokenPriceData] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const [poolGraphData, setPoolGraphData] = useState(null);
  const [activitiesGraphData, setActivitiesGraphData] = useState(null);

  const [getPoolDataQuery, { data, loading, error }] =
    useLazyQuery(GetPoolDataById);

  const [getPoolUserActivityQuery, { data: activityData }] = useLazyQuery(
    GetPoolUserActivityQuery
  );

  useEffect(() => {
    getPoolDataQuery({
      variables: { address: process.env.NEXT_PUBLIC_ACCUMULATION_CONTRACT },
      pollInterval: 5000,
    });
  }, [resetFlag, getPoolDataQuery]);

  useEffect(() => {
    if (accountSC) {
      getPoolUserActivityQuery({
        variables: { user: accountSC, type: "ACCUMULATION" },
        pollInterval: 5000,
      });
    }
  }, [resetFlag, accountSC, getPoolUserActivityQuery]);

  // Get USDT Balance in account
  useEffect(() => {
    if (accountSC) {
      async function asyncFn() {
        let res = await getUserUSDTBalance(accountSC);
        await dispatch(setUsdtBalanceOfUser(res));
      }
      asyncFn();
    }
  }, [accountSC, dispatch]);
  // Get pool data
  useEffect(() => {
    if (data) {
      let poolData = data.pool;
      setPoolGraphData(poolData);
      setLoaded(true);
    }
  }, [data]);

  // Get user pool data
  useEffect(() => {
    if (activityData) {
      console.log(activityData.userActivities);
      setActivitiesGraphData(activityData.userActivities);
    }
  }, [activityData]);

  // Check price of token
  useEffect(() => {
    async function asyncFn() {
      let res = await getTokenPriceStats();
      if (res) {
        setTokenPriceData(res.polkabridge);
        console.log(res);
      }
    }
    asyncFn();
  }, [resetFlag, accountSC]);

  // Check isApproved
  useEffect(() => {
    if (accountSC) {
      async function asyncFn() {
        let accumulation_contract =
          process.env.NEXT_PUBLIC_ACCUMULATION_CONTRACT;
        let res = await checkUSDTApproved(accountSC, accumulation_contract);

        setIsApproved(parseInt(res) > 0);
      }
      asyncFn();
    }
  }, [accountSC, resetFlag]);

  const calculateOrdersData = useMemo(async () => {
    let price = tokenPriceData ? tokenPriceData.usd : 0.113;
    let pricesArr = [];
    let tokenReceiveArr = [];
    let selectedTokenAddress = "0xF13285D6659Aa6895e02EEFe3495408c99f70a86";

    if (amount > 0 && percent > 0 && grids > 0) {
      let fiatAmount = await Web3.utils.toWei(amount.toString(), "ether");
      let orderPriceForBuy = price;

      let buyOrders = [...Array(grids)].map((ele, index) => {
        orderPriceForBuy = (orderPriceForBuy * (100 - percent)) / 100;
        pricesArr.push(orderPriceForBuy.toFixed(3));
        tokenReceiveArr.push((amount / grids / orderPriceForBuy).toFixed(2));
        return Web3.utils.toWei(orderPriceForBuy.toString(), "ether");
      });

      let orderObj = {
        buyOrders,
        fiatAmount,
        selectedTokenAddress,
      };

      setOrderPrices(pricesArr);
      setOrderTokenReceived(tokenReceiveArr);
      console.log(pricesArr);
      console.log(tokenReceiveArr);
      return orderObj;
    }
  }, [amount, grids, percent, resetFlag, loaded, tokenPriceData]);

  const handlePercentage = (event) => {
    let { value } = event.target;
    let min = 0;
    let max = 50;
    value = Math.max(Number(min), Math.min(Number(max), Number(value)));

    setPercent(value);
  };

  // Approve token
  const handleApprove = async () => {
    setStakeCase(1);

    let userAddress = accountSC;
    let accumulation_contract = process.env.NEXT_PUBLIC_ACCUMULATION_CONTRACT;
    let provider = ethersServiceProvider.web3AuthInstance;

    let tokenContract = tokenInstance(provider.provider);
    try {
      let estimateGas = await tokenContract.methods
        .approve(accumulation_contract, "100000000000000000000000000")
        .estimateGas({ from: userAddress });

      let estimateGasPrice = await web3.eth.getGasPrice();
      const response = await tokenContract.methods
        .approve(accumulation_contract, "100000000000000000000000000")
        .send(
          {
            from: userAddress,
            maxPriorityFeePerGas: "50000000000",
            gasPrice: parseInt(
              (parseInt(estimateGasPrice) * 10) / 9
            ).toString(),
            gas: parseInt((parseInt(estimateGas) * 10) / 9).toString(),
          },
          async function (error, transactionHash) {
            if (transactionHash) {
              setStakeCase(2);
            } else {
              setStakeCase(4);
            }
          }
        )
        .on("receipt", async function (receipt) {
          setStakeCase(3);
          setResetFlag(resetFlag + 1);
        })
        .on("error", async function (error) {
          if (error?.code === 4001) {
            setStakeCase(4);
          } else {
            setStakeCase(4);
          }
        });
    } catch (err) {
      console.log(err);
      setStakeCase(4);
    }
  };

  // Write functions
  const handleStake = async () => {
    let price = tokenPriceData
      ? Web3.utils.toWei(tokenPriceData.usd.toString(), "ether")
      : 0;
    if (amount > 0 && percent > 0 && grids > 0) {
      let ordersData = await calculateOrdersData;
      console.log(ordersData);
      setStakeCase(1);
      let userAddress = accountSC;
      let provider = ethersServiceProvider.web3AuthInstance;

      let accumulateContract = accumulationInstance(provider.provider);
      if (ordersData) {
        try {
          let estimateGas = await accumulateContract.methods
            .invest(
              ordersData.fiatAmount,
              grids,
              percent,
              price,
              ordersData.selectedTokenAddress
            )
            .estimateGas({ from: userAddress });

          let estimateGasPrice = await web3.eth.getGasPrice();
          const response = await accumulateContract.methods
            .invest(
              ordersData.fiatAmount,
              grids,
              percent,
              price,
              ordersData.selectedTokenAddress
            )
            .send(
              {
                from: userAddress,
                maxPriorityFeePerGas: "50000000000",
                gasPrice: parseInt(
                  (parseInt(estimateGasPrice) * 10) / 9
                ).toString(),
                gas: parseInt((parseInt(estimateGas) * 10) / 9).toString(),
              },
              async function (error, transactionHash) {
                if (transactionHash) {
                  setStakeCase(2);
                } else {
                  setStakeCase(4);
                }
              }
            )
            .on("receipt", async function (receipt) {
              setStakeCase(3);
              setResetFlag(resetFlag + 1);
            })
            .on("error", async function (error) {
              if (error?.code === 4001) {
                setStakeCase(4);
              } else {
                setStakeCase(4);
              }
            });
        } catch (err) {
          console.log(err);
          setStakeCase(4);
        }
      }
    }
  };

  const handleClosePopup = () => {
    setStakeCase(0);
  };

  const getFiatSpent = () => {
    let deposit = Web3.utils.fromWei(poolGraphData.deposit, "ether");
    let currentBalance = Web3.utils.fromWei(poolGraphData.fiatBalance, "ether");
    let spent = parseInt(deposit) - parseInt(currentBalance);
    return spent;
  };

  const getActivityActionName = (action) => {
    if (action === "EXECUTE_BUY_ORDER") {
      return "BUY";
    } else if (action === "EXECUTE_SELL_ORDER") {
      return "SeLL";
    } else {
      return action;
    }
  };
  return (
    <Box className={classes.background}>
      <TxPopup txCase={stakeCase} resetPopup={handleClosePopup} />
      <Container>
        <Typography variant="h2" className={classes.pageTitle}>
          Accumulate - Eat The Dip
        </Typography>
        <Typography variant="body2" className={classes.pageSubtitle}>
          Start the strategy and eat every dip automatically without hassle
        </Typography>
        <Grid
          container
          display={"flex"}
          justifyContent="space-between"
          spacing={12}
          pt={3}
        >
          <Grid item md={6}>
            <Box
              display="flex"
              flexDirection={"row"}
              justifyContent="space-between"
              alignItems="center"
              style={{
                border: "1px solid #2d2d32",
                padding: "10px 10px 10px 10px",
                borderRadius: 10,
              }}
            >
              <Box
                display="flex"
                flexDirection={"row"}
                justifyContent="flex-start"
                alignItems="center"
              >
                <img
                  src="https://d235dzzkn2ryki.cloudfront.net/polkabridge_large.png"
                  alt="PBR"
                  height="42px"
                />
                <Box ml={1}>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    color={"#f9f9f9"}
                    noWrap
                  >
                    PBR{" "}
                    {tokenPriceData && (
                      <small
                        className="blink_me"
                        style={{ color: "green", fontSize: 12 }}
                      >
                        ${tokenPriceData.usd.toFixed(3)}
                      </small>
                    )}
                  </Typography>
                  <Typography variant="small" noWrap>
                    PolkaBridge
                  </Typography>
                </Box>
              </Box>
              <Box>
                <ArrowDropDown style={{ color: "white" }} />
              </Box>
            </Box>
          </Grid>
          <Grid item md={6}>
            {poolGraphData && (
              <Grid container spacing={2}>
                <Grid item md={4}>
                  <Box className={classes.statsCard}>
                    <Typography
                      variant="body2"
                      className={classes.statsCardPara}
                      fontWeight={300}
                    >
                      Total Invested($)
                    </Typography>
                    <Typography
                      variant="h5"
                      className={classes.statsCardHeading}
                    >
                      ${Web3.utils.fromWei(poolGraphData.deposit, "ether")}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item md={4}>
                  <Box className={classes.statsCard}>
                    <Typography
                      variant="body2"
                      className={classes.statsCardPara}
                      fontWeight={300}
                    >
                      Fiat Spent
                    </Typography>
                    <Typography
                      variant="h5"
                      className={classes.statsCardHeading}
                    >
                      ${getFiatSpent()}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item md={4}>
                  <Box className={classes.statsCard}>
                    <Typography
                      variant="body2"
                      className={classes.statsCardPara}
                      fontWeight={300}
                    >
                      Total Orders
                    </Typography>
                    <Typography
                      variant="h5"
                      className={classes.statsCardHeading}
                    >
                      {poolGraphData.ordersCount}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid
          container
          display={"flex"}
          justifyContent="space-between"
          spacing={12}
          pt={3}
        >
          <Grid item md={6}>
            <Box className={classes.card}>
              <div className="d-flex flex-column justify-content-around">
                <div>
                  <Typography variant="h5" fontWeight={600} lineHeight={1}>
                    Create strategy
                  </Typography>
                  <Typography variant="small" lineHeight={1}>
                    Put your orders and let strategy work for you
                  </Typography>
                </div>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  mt={2}
                  className={classes.inputWrapper}
                >
                  <Box>
                    <Typography
                      variant="small"
                      textAlign={"left"}
                      lineHeight={1}
                    >
                      Amount:
                    </Typography>
                    <Input
                      value={amount}
                      onInput={(event) => setAmount(event.target.value)}
                      fullWidth
                      placeholder="0"
                      disableUnderline
                      style={{
                        fontSize: 24,
                        fontWeight: 600,
                        color: "#f9f9f9",
                      }}
                      type="number"
                    />
                  </Box>
                  <Box
                    display={"flex"}
                    flexDirection="column"
                    alignItems="flex-end"
                    justifyContent={"center"}
                  >
                    <Typography
                      variant="small"
                      textAlign={"right"}
                      style={{
                        width: 200,
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      Available: {usdtBalance}
                    </Typography>
                    <Box
                      display="flex"
                      flexDirection={"row"}
                      justifyContent="flex-end"
                      alignItems="center"
                    >
                      <Box
                        display="flex"
                        flexDirection={"row"}
                        justifyContent="flex-start"
                        alignItems="center"
                      >
                        <img
                          src="https://cdn3d.iconscout.com/3d/premium/thumb/usdt-coin-4999518-4160019.png"
                          alt="USDT"
                          height="30px"
                        />
                      </Box>
                      <Typography
                        variant="body2"
                        className={classes.para}
                        fontSize={20}
                        textAlign="left"
                        fontWeight={600}
                      >
                        USDT
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box mt={2} className={classes.inputWrapper}>
                  <Typography variant="small" textAlign={"left"} lineHeight={1}>
                    No of orders:
                  </Typography>
                  <Input
                    value={grids}
                    type="number"
                    onInput={(event) => setGrids(parseInt(event.target.value))}
                    fullWidth
                    placeholder="Enter grid count here"
                    disableUnderline
                    style={{ fontSize: 24, fontWeight: 600 }}
                  />
                </Box>

                <Box mt={2} className={classes.inputWrapper}>
                  <Typography variant="small" textAlign={"left"} lineHeight={1}>
                    Trigger Percent:
                  </Typography>
                  <Input
                    type="number"
                    disableUnderline
                    value={percent}
                    fullWidth
                    placeholder="10"
                    onChange={(e) => handlePercentage(e)}
                    style={{ fontSize: 22, fontWeight: 600 }}
                  />
                </Box>

                <div className="text-center">
                  <Button
                    className={classes.actionButton}
                    onClick={isApproved ? handleStake : handleApprove}
                  >
                    {isApproved ? "Create Strategy" : "Approve Strategy"}
                  </Button>
                </div>
              </div>
            </Box>
          </Grid>
          <Grid item md={6}>
            <Box className={classes.card}>
              <div>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  color={"#f9f9f9"}
                  noWrap
                >
                  Orders chart
                </Typography>
                <Typography variant="small" noWrap>
                  Visualise your orders in real-time
                </Typography>
              </div>
              <LineChart
                xaxis={orderPrices}
                yaxis={orderTokenReceived}
                yaxisMax={parseFloat(orderPrices[0]) * 1.2}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Box mt={4}>
        <div>
          <Typography variant="h4" className={classes.heading} fontWeight={700}>
            Your Trades
          </Typography>
        </div>
        <Box className={classes.boxCard}>
          {activitiesGraphData &&
            activitiesGraphData.map((singleActivity, index) => {
              return (
                <Grid
                  container
                  p={2}
                  style={{ borderBottom: "0.5px solid #212121" }}
                  key={index}
                >
                  <Grid item md={1}>
                    <img
                      src="https://d235dzzkn2ryki.cloudfront.net/polkabridge_large.png"
                      alt="ETH"
                      height="36px"
                    />
                  </Grid>
                  <Grid
                    item
                    md={1}
                    display="flex"
                    flexDirection={"row"}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Box
                      display="flex"
                      flexDirection={"column"}
                      justifyContent="flex-start"
                      alignItems="flex-start"
                    >
                      <Typography
                        variant="body2"
                        textAlign="left"
                        fontWeight={600}
                        color={"green"}
                      >
                        {getActivityActionName(singleActivity.action)}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid
                    item
                    md={2}
                    display="flex"
                    flexDirection={"row"}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Box>
                      <Typography
                        variant="body2"
                        textAlign="left"
                        fontWeight={400}
                        color={"#bdbdbd"}
                        fontSize={14}
                      >
                        $ {singleActivity.price}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    md={2}
                    display="flex"
                    flexDirection={"row"}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Box
                      display="flex"
                      flexDirection={"column"}
                      justifyContent="center"
                      alignItems="flex-start"
                    >
                      <Box>
                        <Typography
                          variant="body2"
                          textAlign="left"
                          fontWeight={400}
                          color={"#bdbdbd"}
                          fontSize={14}
                        >
                          {parseFloat(
                            Web3.utils.fromWei(singleActivity.token, "ether")
                          ).toFixed(2)}{" "}
                          PBR
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    md={2}
                    display="flex"
                    flexDirection={"row"}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Box
                      display="flex"
                      flexDirection={"column"}
                      justifyContent="flex-start"
                      alignItems="flex-start"
                    >
                      <Typography
                        variant="body2"
                        textAlign="left"
                        fontWeight={400}
                        color={"#bdbdbd"}
                        fontSize={14}
                      >
                        ${Web3.utils.fromWei(singleActivity.fiat, "ether")}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    md={2}
                    display="flex"
                    flexDirection={"row"}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Box
                      display="flex"
                      flexDirection={"column"}
                      justifyContent="flex-start"
                      alignItems="flex-start"
                    >
                      <Typography
                        variant="body2"
                        textAlign="left"
                        fontWeight={400}
                        color={"#bdbdbd"}
                        fontSize={14}
                      >
                        <TimeAgo
                          datetime={parseInt(singleActivity.timestamp) * 1000}
                        />
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              );
            })}
        </Box>
      </Box>
    </Box>
  );
}
