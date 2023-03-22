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
} from "../../../actions/smartActions";
import Link from "next/link";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });
import dynamic from "next/dynamic";
import { useWeb3Auth } from "../../../hooks/useWeb3Auth";
import TxPopup from "../../../common/TxPopup";
import ethersServiceProvider from "../../../services/ethersServiceProvider";
import { tokenInstance, tradingInstance } from "../../../contracts";
import web3 from "../../../web3";
import { ArrowDropDown } from "@mui/icons-material";
import Web3 from "web3";
import { getTokenPriceStats } from "../../../actions/serverActions";

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

export default function GridStrategyComponent() {
  const classes = useStyles();
  const theme = useTheme();

  const { active, accountSC, web3AuthSC, connect } = useWeb3Auth();

  const [amount, setAmount] = useState("");
  const [percent, setPercent] = useState(10);
  const [grids, setGrids] = useState(6);
  const [tokenData, setTokenData] = useState(null);
  const [stakeCase, setStakeCase] = useState(0);
  const [isApproved, setIsApproved] = useState(false);
  const [resetFlag, setResetFlag] = useState(0);
  const [orderPrices, setOrderPrices] = useState(null);
  const [tokenPriceData, setTokenPriceData] = useState(null);

  let data = {
    options: {
      chart: {
        id: "apexchart-example",
      },
      xaxis: {
        categories:
          grids > 1
            ? [
                ...[...Array(grids / 2)].map((ele) => "BUY"),
                ...[...Array(grids / 2)].map((ele) => "SELL"),
              ]
            : [],
      },
    },
    series: [
      {
        name: "Price",
        data: orderPrices ? [...orderPrices] : [],
      },
    ],
  };

  useEffect(() => {
    async function asyncFn() {
      let res = await getPoolDetails(
        "0x9D7117a07fca9F22911d379A9fd5118A5FA4F448"
      );
      console.log(res);
    }
    asyncFn();
  }, [resetFlag, accountSC]);

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
        let trading_contract = process.env.NEXT_PUBLIC_TRADING_CONTRACT;
        let res = await checkUSDTApproved(accountSC, trading_contract);

        setIsApproved(parseInt(res) > 0);
      }
      asyncFn();
    }
  }, [accountSC, resetFlag]);

  const calculateOrdersData = useMemo(async () => {
    let price = tokenPriceData ? tokenPriceData.usd : 0;
    let pricesArr = [];
    let selectedTokenAddress = "0xF13285D6659Aa6895e02EEFe3495408c99f70a86";
    if (amount > 0 && percent > 0 && grids > 0) {
      let fiatAmount = await Web3.utils.toWei(amount.toString(), "ether");
      let oneGridOrdersCount = parseInt(grids / 2);
      let orderValueForBuy = price;
      let buyOrders = [...Array(oneGridOrdersCount)].map((ele, index) => {
        orderValueForBuy = (orderValueForBuy * (100 - percent)) / 100;
        pricesArr.push(orderValueForBuy.toFixed(2));
        return Web3.utils.toWei(orderValueForBuy.toString(), "ether");
      });
      let orderValueForSell = price;
      let sellOrders = [...Array(oneGridOrdersCount)].map((ele, index) => {
        orderValueForSell = (orderValueForSell * (100 + percent)) / 100;
        pricesArr.push(orderValueForSell.toFixed(2));
        return Web3.utils.toWei(orderValueForSell.toString(), "ether");
      });
      let orderObj = {
        buyOrders,
        sellOrders,
        fiatAmount,
        selectedTokenAddress,
      };
      console.log(pricesArr);
      setOrderPrices(pricesArr);
      return orderObj;
    }
  }, [amount, grids, percent, resetFlag]);

  const handlePercentage = (event) => {
    let { value } = event.target;
    let min = 1;
    let max = 50;
    value = Math.max(Number(min), Math.min(Number(max), Number(value)));

    setPercent(value);
  };

  // Approve token
  const handleApprove = async () => {
    setStakeCase(1);

    let userAddress = accountSC;
    let trading_contract = process.env.NEXT_PUBLIC_TRADING_CONTRACT;
    let provider = ethersServiceProvider.web3AuthInstance;

    let tokenContract = tokenInstance(provider.provider);
    try {
      let estimateGas = await tokenContract.methods
        .approve(trading_contract, "100000000000000000000000000")
        .estimateGas({ from: userAddress });

      let estimateGasPrice = await web3.eth.getGasPrice();
      const response = await tokenContract.methods
        .approve(trading_contract, "100000000000000000000000000")
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
    if (amount > 0 && percent > 0 && grids > 0) {
      let ordersData = await calculateOrdersData;
      console.log(ordersData);
      setStakeCase(1);
      let userAddress = accountSC;
      let provider = ethersServiceProvider.web3AuthInstance;

      let tradeContract = tradingInstance(provider.provider);
      if (ordersData) {
        try {
          let estimateGas = await tradeContract.methods
            .stake(
              ordersData.buyOrders,
              ordersData.sellOrders,
              ordersData.fiatAmount,
              ordersData.selectedTokenAddress
            )
            .estimateGas({ from: userAddress });

          let estimateGasPrice = await web3.eth.getGasPrice();
          const response = await tradeContract.methods
            .stake(
              ordersData.buyOrders,
              ordersData.sellOrders,
              ordersData.fiatAmount,
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
  return (
    <Box className={classes.background}>
      <TxPopup txCase={stakeCase} resetPopup={handleClosePopup} />
      <Container>
        <Typography variant="h2" className={classes.pageTitle}>
          Spot Grid Strategy
        </Typography>
        <Typography variant="body2" className={classes.pageSubtitle}>
          Place order inside the strategy pools and enjoy high yeilds
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
                  <Typography variant="h5" className={classes.statsCardHeading}>
                    $ 13.43K
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
                    Profit & Loss
                  </Typography>
                  <Typography variant="h5" className={classes.statsCardHeading}>
                    $1,343
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
                  <Typography variant="h5" className={classes.statsCardHeading}>
                    2,343
                  </Typography>
                </Box>
              </Grid>
            </Grid>
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
                        width: 100,
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      Available: 21
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
                    onInput={(event) => setGrids(event.target.value)}
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
              <div id="chart">
                <ApexCharts
                  options={data.options}
                  series={data.series}
                  type="line"
                  height={350}
                />
              </div>
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
          <Grid container p={2} style={{ borderBottom: "0.5px solid #212121" }}>
            <Grid item md={1}>
              <img
                src="https://cdn3d.iconscout.com/3d/premium/thumb/ethereum-eth-coin-4722965-3917991.png"
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
                  BUY
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
                  $0.32
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
                    234 PBR
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
                  $71
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
                  32 mins ago
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid container p={2} style={{ borderBottom: "0.5px solid #212121" }}>
            <Grid item md={1}>
              <img
                src="https://cdn3d.iconscout.com/3d/premium/thumb/ethereum-eth-coin-4722965-3917991.png"
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
                  BUY
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
                  $0.32
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
                    234 PBR
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
                  $71
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
                  32 mins ago
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid container p={2} style={{ borderBottom: "0.5px solid #212121" }}>
            <Grid item md={1}>
              <img
                src="https://cdn3d.iconscout.com/3d/premium/thumb/ethereum-eth-coin-4722965-3917991.png"
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
                  color={"red"}
                >
                  SELL
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
                  $0.32
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
                    234 PBR
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
                  $71
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
                  32 mins ago
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
