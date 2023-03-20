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

const useStyles = makeStyles((theme) => ({
  spacing: {
    padding: "5%",
  },
  card: {
    // backgroundColor: "#17191A",
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
  cardBox: {
    // backgroundColor: "#17191A",
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
  boxHeading: {
    fontWeight: 600,
    fontSize: 18,
    color: "#f9f9f9",
    textAlign: "left",
    paddingTop: 7,
  },
  boxPara: {
    color: "#bdbdbd",
    textAlign: "center",
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
    padding: 10,
  },
  input: {
    backgroundColor: "#ffffff",
    border: "1px solid #757575",
    borderRadius: 18,
    width: "80%",
    padding: 6,
    outline: "none",
    color: "#212121",
    textAlign: "left",
    paddingLeft: 10,
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 14,
    fontFamily: "Karla",
  },

  para: {
    color: "#bdbdbd",
    textAlign: "center",
    fontSize: 13,
    fontWeight: 300,
    paddingTop: 5,
    [theme.breakpoints.down("md")]: {
      fontSize: 13,
      paddingTop: 15,
    },
  },
  activateButton: {
    width: "fit-content",
    height: "50px",
    background: "#FF5AFF",
    boxSizing: "border-box",
    borderRadius: "15px",
    fontSize: 16,
    lineHeight: "33px",
    color: "#ffffff",
    fontWeight: 700,

    padding: "12px 30px 12px 30px",
    "&:hover": {
      background: "#FFB469",
    },
    [theme.breakpoints.down("md")]: {
      padding: "12px 20px 12px 20px",
      fontSize: 18,
    },
  },
  connectButton: {
    width: "fit-content",
    outline: "none",
    textDecoration: "none",

    background: theme.palette.primary.main,
    boxSizing: "border-box",
    borderRadius: "15px",
    fontSize: 16,
    lineHeight: "33px",
    color: "#ffffff",
    fontWeight: 600,
    marginTop: 20,
    padding: "10px 40px 10px 40px",
    fontFamily: "poppins",
    "&:hover": {
      background: theme.palette.primary.main,
    },
    [theme.breakpoints.down("md")]: {
      padding: "12px 20px 12px 20px",
      fontSize: 18,
    },
  },
  registerButton: {
    width: "fit-content",
    height: "45px",
    background: "#FF87FF",
    border: "1px solid #FFFFFF",
    boxSizing: "border-box",
    borderRadius: "20px",
    fontSize: 16,
    lineHeight: "33px",
    color: "#000000",

    marginTop: 20,
    padding: "12px 30px 12px 30px",
    "&:hover": {
      background: "#FFB469",
    },
    [theme.breakpoints.down("md")]: {
      padding: "12px 20px 12px 20px",
      fontSize: 18,
    },
  },
}));

export default function GridPoolDetails() {
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
    <Box className={classes.spacing}>
      <TxPopup txCase={stakeCase} resetPopup={handleClosePopup} />
      <Box
        display="flex"
        flexDirection={"row"}
        justifyContent="flex-start"
        alignItems="center"
      >
        <Box
          display="flex"
          flexDirection={"row"}
          justifyContent="flex-start"
          alignItems="center"
        >
          <img
            src="https://cdn3d.iconscout.com/3d/premium/thumb/polkadot-4897427-4081372.png"
            alt="PBR"
            height="48px"
          />{" "}
          <img
            src="https://cdn3d.iconscout.com/3d/premium/thumb/tether-usdt-coin-4199895-3478983@0.png"
            alt="USDT"
            height="48px"
            style={{ marginLeft: -10 }}
          />
        </Box>
        <Box ml={1}>
          <div className={classes.title}>PBR-USDT</div>
        </Box>
      </Box>
      <Grid
        container
        display={"flex"}
        justifyContent="space-between"
        spacing={12}
        pt={3}
      >
        <Grid item md={7}>
          <Grid container spacing={2}>
            <Grid item md={4}>
              <Box className={classes.cardBox}>
                <Typography
                  variant="body"
                  className={classes.boxPara}
                  fontWeight={300}
                >
                  Total Value Deposited
                </Typography>
                <Typography
                  variant="h4"
                  className={classes.boxHeading}
                  fontWeight={700}
                >
                  $ 13.43K
                </Typography>
              </Box>
            </Grid>
            <Grid item md={4}>
              <Box className={classes.cardBox}>
                <Typography
                  variant="body"
                  className={classes.boxPara}
                  fontWeight={300}
                >
                  Profit & Loss
                </Typography>
                <Typography
                  variant="h4"
                  className={classes.boxHeading}
                  fontWeight={700}
                >
                  $1,343
                </Typography>
              </Box>
            </Grid>
            <Grid item md={4}>
              <Box className={classes.cardBox}>
                <Typography
                  variant="body"
                  className={classes.boxPara}
                  fontWeight={300}
                >
                  Total Orders
                </Typography>
                <Typography
                  variant="h4"
                  className={classes.boxHeading}
                  fontWeight={700}
                >
                  2,343
                </Typography>
              </Box>
            </Grid>
          </Grid>
          {/* <Box className={classes.card} mt={2}>
            <div>
              <Typography
                variant="h4"
                className={classes.heading}
                fontWeight={700}
              >
                Total Orders
              </Typography>
              <Typography
                variant="body"
                className={classes.para}
                fontWeight={300}
              >
                Deposit USDT and place orders and let strategy work for you
              </Typography>
            </div>
          </Box> */}
          <Box className={classes.card} mt={2}>
            <div>
              <Typography
                variant="h4"
                className={classes.heading}
                fontWeight={700}
              >
                Orders chart
              </Typography>
              <Typography
                variant="body"
                className={classes.para}
                fontWeight={300}
              >
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
        <Grid item md={5}>
          <Box className={classes.card}>
            <div className="d-flex flex-column justify-content-around">
              <div>
                <Typography
                  variant="h4"
                  className={classes.heading}
                  fontWeight={700}
                >
                  Stake
                </Typography>
                <Typography
                  variant="body"
                  className={classes.para}
                  fontWeight={300}
                >
                  Deposit USDT and place orders and let strategy work for you
                </Typography>
              </div>

              <Box
                display={"flex"}
                justifyContent={"space-between"}
                mt={2}
                style={{
                  border: "1px solid rgba(106, 85, 234,0.2)",
                  padding: "6px 20px 6px 20px",
                  borderRadius: 10,
                  backgroundColor: "rgba(106, 85, 234,0.03)",
                }}
              >
                <Box>
                  <Typography
                    variant="body2"
                    textAlign={"left"}
                    fontWeight={500}
                    fontSize={12}
                    color={"#bdbdbd"}
                  >
                    Amount:
                  </Typography>
                  <Input
                    value={amount}
                    onInput={(event) => setAmount(event.target.value)}
                    fullWidth
                    placeholder="0"
                    disableUnderline
                    style={{ fontSize: 24, fontWeight: 600 }}
                  />
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    textAlign={"right"}
                    fontWeight={500}
                    fontSize={12}
                    color={"#bdbdbd"}
                    style={{ minWidth: 120 }}
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
                      />{" "}
                    </Box>
                    <Typography
                      variant="body2"
                      className={classes.para}
                      fontSize={20}
                      textAlign="left"
                      fontWeight={600}
                      ml={1}
                    >
                      USDT
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box
                mt={2}
                style={{
                  border: "1px solid rgba(106, 85, 234,0.2)",
                  padding: "6px 20px 6px 20px",
                  borderRadius: 10,
                  backgroundColor: "rgba(106, 85, 234,0.03)",
                }}
              >
                <Typography
                  variant="body2"
                  textAlign={"left"}
                  fontWeight={500}
                  fontSize={12}
                  color={"#bdbdbd"}
                >
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

              <Box
                mt={2}
                style={{
                  border: "1px solid rgba(106, 85, 234,0.2)",
                  padding: "6px 20px 6px 20px",
                  borderRadius: 10,
                  backgroundColor: "rgba(106, 85, 234,0.03)",
                }}
              >
                <Typography
                  variant="body2"
                  textAlign={"left"}
                  fontWeight={500}
                  fontSize={12}
                  color={"#bdbdbd"}
                >
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
                <Button className={classes.connectButton} onClick={handleStake}>
                  STAKE NOW
                </Button>
              </div>
            </div>
          </Box>
        </Grid>
      </Grid>
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
