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
import { getPoolDetails } from "../../../actions/smartActions";
import Link from "next/link";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });
import dynamic from "next/dynamic";
import { useWeb3Auth } from "../../../hooks/useWeb3Auth";
import TxPopup from "../../../common/TxPopup";
import ethersServiceProvider from "../../../services/ethersServiceProvider";
import { tradingInstance } from "../../../contracts";
import web3 from "../../../web3";
import { ArrowDropDown } from "@mui/icons-material";

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
  statsBoxPara: {
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
  const [grids, setGrids] = useState(5);
  const [stakeCase, setStakeCase] = useState(0);

  let data = {
    options: {
      chart: {
        id: "apexchart-example",
      },
      xaxis: {
        categories: [
          "BUY",
          "BUY",
          "BUY",
          "BUY",
          "SELL",
          "SELL",
          "SELL",
          "SELL",
          "SELL",
        ],
      },
    },
    series: [
      {
        name: "Price",
        data: [0.1, 0.11, 0.13, 0.16, 0.2, 0.24, 0.27, 0.32, 0.36],
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
  }, []);

  const handlePercentage = (event) => {
    let { value } = event.target;
    let min = 1;
    let max = 99;
    value = Math.max(Number(min), Math.min(Number(max), Number(value)));

    setPercent(value);
  };

  // Write functions
  const handleStake = async () => {
    console.log("hitting");

    if (amount > 0 && percent > 0 && grids > 0) {
      setStakeCase(1);
      let userAddress = accountSC;
      let provider = ethersServiceProvider.web3AuthInstance;
      let tradeContract = tradingInstance(provider.provider);

      try {
        let estimateGas = await tradeContract.methods
          .stake(
            [50, 75],
            [100, 200],
            "100",
            "0xF13285D6659Aa6895e02EEFe3495408c99f70a86"
          )
          .estimateGas({ from: userAddress });

        let estimateGasPrice = await web3.eth.getGasPrice();
        const response = await tradeContract.methods
          .stake(
            [50, 75],
            [100, 200],
            "100",
            "0x0d6ae2a429df13e44a07cd2969e085e4833f64a0"
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
        // dispatch(setBalancesFlag(balancesFlag + 1));
      } catch (err) {
        console.log(err);
        setStakeCase(4);
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
                    PBR
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
                    className={classes.statsBoxPara}
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
                    className={classes.statsBoxPara}
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
                    className={classes.statsBoxPara}
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
                    Grids:
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
                    onClick={handleStake}
                  >
                    Start Strategy
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