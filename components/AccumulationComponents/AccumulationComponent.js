import React, { useCallback, useEffect, useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Box,
  Button,
  Grid,
  Typography,
  useTheme,
  Input,
  Container,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  Hidden,
} from "@mui/material";
import {
  checkUSDTApproved,
  getUserUSDTBalance,
} from "../../actions/smartActions";
import { useWeb3Auth } from "../../hooks/useWeb3Auth";
import TxPopup from "../../common/TxPopup";
import ethersServiceProvider from "../../services/ethersServiceProvider";
import { accumulationInstance, tokenInstance } from "../../contracts";
import web3 from "../../web3";
import {
  AvTimer,
  BorderClear,
  ExpandMore,
  KeyboardArrowRight,
  SentimentSatisfiedAlt,
} from "@mui/icons-material";
import Web3 from "web3";
import { getTokenPriceStats } from "../../actions/serverActions";
import { useSelector, useDispatch } from "react-redux";
import { setUsdtBalanceOfUser } from "../../reducers/UiReducer";
import { constants, strategyType } from "../../utils/constants";
import "react-circular-progressbar/dist/styles.css";
import { tokenList } from "../../utils/data";
import UserPoolOrders from "../resuableComponents/UserPoolOrders";
import SelectTokenDialog from "../../common/SelectToken/SelectTokenDialog";
import AccumulateUserSummary from "./AccumulateUserSummary";
import AccumulationTopHeader from "./AccumulationTopHeader";
import AccumulateOrderBook from "./AccumulateOrderBook";
import MobileBottomBar from "../../common/MobileBottomBar";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  background: {
    // backgroundImage: 'url("images/network.png")',
    backgroundPosition: "center center,center center",
    backgroundRepeat: "no-repeat,no-repeat",
    backgroundSize: "cover,contain",
    height: "100%",
    width: "100%",
    paddingTop: 5,
    paddingLeft: "3%",
    paddingRight: "3%",
    [theme.breakpoints.down("md")]: {
      paddingTop: "2%",
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  pageTitle: {
    fontWeight: 600,
    color: "#212121",
    textAlign: "left",
  },

  pageSubtitle: {
    color: "#616161",
    textAlign: "left",
  },
  cardTop: {
    backgroundColor: "#0C0D11",
    marginTop: 20,
    marginBottom: 20,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 40,
    width: "100%",
    minHeight: 200,
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
  createCard: {
    backgroundImage: "linear-gradient(to left, #0C0D11,#000000)",
    border: "1px solid #1b1d24",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 14,
    [theme.breakpoints.down("md")]: {
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 10,
      paddingRight: 10,
    },
  },
  card: {
    padding: 20,
    width: "100%",
    border: "1px solid #21232b",
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
    padding: "2px 10px 2px 10px",
    borderRadius: 10,
    backgroundColor: "rgba(106, 85, 234,0.03)",
  },

  actionButton: {
    borderRadius: 8,
    background: "rgba(130, 71, 229, 0.7)",
    padding: "12px 20px 12px 20px",
    color: "white",
    width: "100%",
    marginTop: 20,
    fontWeight: 500,
    fontSize: 16,
    textTransform: "none",
    "&:hover": {
      background: "rgba(130, 71, 229, 0.9)",
    },
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
  const [openTokenSelect, setOpenTokenSelect] = useState(false);
  const [selectedToken, setSelectedToken] = useState(tokenList[0]);

  const sm = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const md = useMediaQuery((theme) => theme.breakpoints.down("md"));

  // Get Pool User Graph Data

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

  // Check price of token
  useEffect(() => {
    async function asyncFn() {
      let res = await getTokenPriceStats(selectedToken.id);
      if (res) {
        let tempData = {
          usd: 2000,
        };
        // setTokenPriceData(res[selectedToken.id.toLowerCase()]);
        setTokenPriceData(tempData);
        console.log(res);
      }
    }
    asyncFn();
  }, [resetFlag, accountSC, selectedToken]);

  // Check isApproved
  useEffect(() => {
    if (accountSC) {
      async function asyncFn() {
        let accumulation_contract = constants.contracts.accumulation;
        let res = await checkUSDTApproved(accountSC, accumulation_contract);

        setIsApproved(parseInt(res) > 0);
      }
      asyncFn();
    }
  }, [accountSC, resetFlag]);

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
    let accumulation_contract = constants.contracts.accumulation;
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
            maxPriorityFeePerGas: "80000000000",
            gasPrice: parseInt(
              (parseInt(estimateGasPrice) * 10) / 6
            ).toString(),
            gas: parseInt((parseInt(estimateGas) * 10) / 6).toString(),
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
      let price = tokenPriceData
        ? parseFloat(tokenPriceData.usd) * 100000000
        : 0; // Making it 8 decimal price
      let fiatAmount = await Web3.utils.toWei(amount.toString(), "ether");
      console.log(price);
      // let ordersData = await calculateOrdersData;

      setStakeCase(1);
      let userAddress = accountSC;
      let provider = ethersServiceProvider.web3AuthInstance;

      let accumulateContract = accumulationInstance(provider.provider);
      try {
        let estimateGas = await accumulateContract.methods
          .invest(fiatAmount, grids, percent, price, selectedToken.address)
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
              maxPriorityFeePerGas: "80000000000",
              gasPrice: parseInt(
                (parseInt(estimateGasPrice) * 10) / 6
              ).toString(),
              gas: parseInt((parseInt(estimateGas) * 10) / 6).toString(),
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
  };

  const handleClosePopup = () => {
    setStakeCase(0);
  };

  const handleTokenSelected = (token) => {
    setSelectedToken(token);
    // setExpandTokens(false);
    setOpenTokenSelect(false);
    console.log("selected token ", token);
  };

  // const tokenPrice = useUpdatePrice();
  const tokenPrice = { price: 2000 };

  const getPriceOfSingleOrder = (index) => {
    return parseFloat((2000 * (100 - (index + 1) * percent)) / 100);
  };
  const getTotalTokenAccumulated = () => {
    let amountToBuy = amount / grids;
    let totalAmountWillBeBought = 0;
    {
      [...Array(grids)].map((singleOrder, index) => {
        let amountOfSingleOrder = amountToBuy / getPriceOfSingleOrder(index);
        totalAmountWillBeBought += amountOfSingleOrder;
      });
    }
    return totalAmountWillBeBought.toFixed(3);
  };
  return (
    <Box>
      <Box className={classes.background}>
        <TxPopup txCase={stakeCase} resetPopup={handleClosePopup} />

        <Container>
          <Typography
            variant={"body2"}
            fontWeight={300}
            fontSize={12}
            mb={2}
            color={"#bdbdbd"}
          >
            <Link
              href="/"
              style={{
                textDecoration: "none",
                color: "#bdbdbd",
                cursor: "pointer",
              }}
            >
              Home
            </Link>{" "}
            <KeyboardArrowRight style={{ fontSize: 18 }} />
            Pools
            <KeyboardArrowRight style={{ fontSize: 18 }} />
            <span style={{ color: "#f9f9f9" }}>Accumulation Strategy</span>
          </Typography>
          {/* Components for create order and top header */}
          <Grid
            container
            display={"flex"}
            justifyContent="space-between"
            spacing={4}
          >
            <Grid item md={8} sm={12} xs={12}>
              <AccumulationTopHeader />
              <Hidden smDown>
                <Grid container mt={1} spacing={3}>
                  <Grid item md={12} xs={12}>
                    <AccumulateOrderBook />
                  </Grid>
                </Grid>
              </Hidden>
            </Grid>

            <Grid item md={4} sm={12} xs={12}>
              <Box className={classes.createCard}>
                <div className="d-flex flex-column justify-content-around">
                  <Typography fontWeight={600} fontSize={18} color={"#f9f9f9"}>
                    Create strategy
                  </Typography>

                  <Box mt={2}>
                    <Accordion
                      expanded={false}
                      style={{
                        width: "100%",
                        backgroundColor: "transparent",
                        border: "1px solid #2d2d32",
                        borderRadius: 10,
                        padding: 0,
                      }}
                      disableGutters={true}
                    >
                      <AccordionSummary
                        expandIcon={
                          <ExpandMore
                            style={{ color: "#f9f9f9", padding: 0 }}
                          />
                        }
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        onClick={() => setOpenTokenSelect(true)}
                      >
                        <Box>
                          <Typography
                            variant="small"
                            textAlign={"left"}
                            lineHeight={0.4}
                          >
                            Select token
                          </Typography>
                          <Box
                            display="flex"
                            flexDirection={"row"}
                            justifyContent="flex-start"
                            alignItems="center"
                          >
                            <img
                              src={selectedToken.logoURI}
                              alt={"TokenLogo"}
                              height="28px"
                            />
                            <Box ml={1}>
                              <Typography
                                variant="body2"
                                fontWeight={600}
                                color={"#e5e5e5"}
                                lineHeight={1}
                                padding={0}
                              >
                                {selectedToken.symbol}{" "}
                                {tokenPrice?.price && (
                                  <small
                                    className="blink_me"
                                    style={{ color: "green", fontSize: 11 }}
                                  >
                                    ${tokenPrice?.price}
                                  </small>
                                )}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </AccordionSummary>
                      <SelectTokenDialog
                        open={openTokenSelect}
                        handleClose={() => setOpenTokenSelect(false)}
                        handleTokenSelected={handleTokenSelected}
                        disableToken={selectedToken}
                      />
                      {/* <AccordionDetails>
                      <Box
                        style={{
                          maxHeight: 100,
                          overflowY: "auto",
                          borderTop: "0.5px solid #414141",
                        }}
                      >
                        {tokenList.map((singleToken, index) => {
                          return (
                            <Box
                              key={index}
                              display="flex"
                              flexDirection={"row"}
                              justifyContent="flex-start"
                              alignItems="center"
                              py={1}
                              onClick={() => handleTokenSelect(index)}
                              style={{ cursor: "pointer" }}
                            >
                              <img
                                src={singleToken.logoURI}
                                alt={"TokenLogo"}
                                height="28px"
                              />
                              <Box ml={1}>
                                <Typography
                                  variant="body2"
                                  fontWeight={600}
                                  color={"#e5e5e5"}
                                  lineHeight={1}
                                  noWrap
                                >
                                  {singleToken.symbol}{" "}
                                </Typography>
                              </Box>
                            </Box>
                          );
                        })}
                      </Box>
                    </AccordionDetails> */}
                    </Accordion>
                  </Box>
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    my={1}
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
                          fontSize: 20,
                          fontWeight: 600,
                          color: "#e5e5e5",
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
                            height="28px"
                          />
                        </Box>
                        <Typography
                          variant="body2"
                          className={classes.para}
                          fontSize={16}
                          textAlign="left"
                          fontWeight={600}
                        >
                          USDT
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Grid container spacing={2}>
                    <Grid item md={6} sm={6} xs={6}>
                      <Box className={classes.inputWrapper}>
                        <Typography
                          variant="small"
                          textAlign={"left"}
                          lineHeight={1}
                        >
                          Number of orders:
                        </Typography>
                        <Input
                          value={grids}
                          type="number"
                          onInput={(event) =>
                            event.target.value > 0 &&
                            event.target.value < 10 &&
                            setGrids(parseInt(event.target.value))
                          }
                          fullWidth
                          placeholder="Enter grid count here"
                          disableUnderline
                          style={{ fontSize: 20, fontWeight: 600 }}
                        />
                      </Box>
                    </Grid>
                    <Grid item md={6} sm={6} xs={6}>
                      <Box className={classes.inputWrapper}>
                        <Typography
                          variant="small"
                          textAlign={"left"}
                          lineHeight={1}
                        >
                          On every % drop of:
                        </Typography>
                        <Input
                          type="number"
                          disableUnderline
                          value={percent}
                          fullWidth
                          placeholder="10"
                          onChange={(e) => handlePercentage(e)}
                          style={{ fontSize: 20, fontWeight: 600 }}
                        />
                      </Box>
                    </Grid>
                  </Grid>

                  <div className="text-center">
                    <Button
                      className={classes.actionButton}
                      onClick={isApproved ? handleStake : handleApprove}
                      disabled={!accountSC}
                    >
                      {isApproved ? "Place order" : "Approve Investment"}
                    </Button>
                  </div>
                  <Box mt={3}>
                    <Typography
                      variant="body2"
                      mb={1}
                      fontWeight={500}
                      fontSize={12}
                      color={"#f9f9f9"}
                    >
                      My Investment summary
                    </Typography>
                    <Grid container py={0.5}>
                      <Grid item md={4} sm={4} xs={4}>
                        <Typography
                          variant="body2"
                          fontWeight={300}
                          fontSize={10}
                          color={"#bdbdbd"}
                        >
                          Price(USDT)
                        </Typography>
                      </Grid>
                      <Grid item md={4} sm={4} xs={4}>
                        <Typography
                          variant="body2"
                          fontWeight={300}
                          fontSize={10}
                          color={"#bdbdbd"}
                        >
                          Amount(USDT)
                        </Typography>
                      </Grid>
                      <Grid item md={4} sm={4} xs={4}>
                        <Typography
                          variant="body2"
                          fontWeight={300}
                          fontSize={10}
                          color={"#bdbdbd"}
                        >
                          Received(ETH)
                        </Typography>
                      </Grid>
                    </Grid>
                    <Box style={{ height: "80px", overflowY: "auto" }}>
                      {[...Array(grids)].map((singleOrder, index) => (
                        <Grid container mt={1}>
                          <Grid item md={4} sm={4} xs={4}>
                            <Typography
                              variant="body2"
                              fontWeight={500}
                              fontSize={13}
                              color={"#fff"}
                            >
                              ${(2000 * (100 - (index + 1) * percent)) / 100}
                            </Typography>
                          </Grid>
                          <Grid item md={4} sm={4} xs={4}>
                            <Typography
                              variant="body2"
                              fontWeight={500}
                              fontSize={13}
                              color={"#fff"}
                            >
                              ${(amount / grids).toFixed(2)}
                            </Typography>
                          </Grid>
                          <Grid item md={4} sm={4} xs={4}>
                            <Typography
                              variant="body2"
                              fontWeight={300}
                              fontSize={13}
                              color={"#fff"}
                            >
                              {(
                                amount /
                                grids /
                                getPriceOfSingleOrder(index)
                              ).toFixed(2)}{" "}
                              ETH
                            </Typography>
                          </Grid>
                        </Grid>
                      ))}
                    </Box>
                  </Box>
                  <Box
                    display={"flex"}
                    flexDirection="row"
                    justifyContent={"space-around"}
                    alignItems={"center"}
                    mt={3}
                  >
                    <Box
                      display={"flex"}
                      flexDirection="column"
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <AvTimer style={{ color: "#bdbdbd" }} />
                      <Typography
                        variant="body2"
                        fontWeight={400}
                        fontSize={11}
                        lineHeight={1}
                        color={"#e5e5e5"}
                      >
                        Accumulate
                      </Typography>
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        fontSize={14}
                        lineHeight={1}
                        color={"#e5e5e5"}
                        mt={1}
                      >
                        <strong> {getTotalTokenAccumulated()} ETH</strong>
                      </Typography>
                    </Box>
                    <Box
                      display={"flex"}
                      flexDirection="column"
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <BorderClear style={{ color: "#bdbdbd" }} />
                      <Typography
                        variant="body2"
                        fontWeight={400}
                        fontSize={11}
                        lineHeight={1}
                        color={"#e5e5e5"}
                      >
                        Target Price
                      </Typography>
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        fontSize={14}
                        lineHeight={1}
                        color={"#e5e5e5"}
                        mt={1}
                      >
                        <strong> $10,000</strong>
                      </Typography>
                    </Box>
                    <Box
                      display={"flex"}
                      flexDirection="column"
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <SentimentSatisfiedAlt style={{ color: "#bdbdbd" }} />
                      <Typography
                        variant="body2"
                        fontWeight={400}
                        fontSize={11}
                        lineHeight={1}
                        color={"#e5e5e5"}
                      >
                        You may receive
                      </Typography>
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        fontSize={14}
                        lineHeight={1}
                        color={"#e5e5e5"}
                        mt={1}
                      >
                        <strong>
                          {" "}
                          $ {(getTotalTokenAccumulated() * 10000).toFixed(
                            1
                          )}{" "}
                        </strong>
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                    justifyContent="center"
                    mt={2}
                  >
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      fontSize={22}
                      color={"#28C59A"}
                    >
                      <strong>
                        {(
                          ((getTotalTokenAccumulated() * 10000 - amount) *
                            100) /
                          amount
                        ).toFixed()}
                        %
                      </strong>
                    </Typography>
                    <Typography
                      variant="body2"
                      fontWeight={400}
                      fontSize={12}
                      lineHeight={1}
                      color={"#bdbdbd"}
                    >
                      Return on investment*
                    </Typography>
                  </Box>
                </div>
              </Box>
            </Grid>
          </Grid>
          {/* Recent orders table */}
          <Box mt={5}>
            <div>
              <Typography
                variant="h6"
                className={classes.heading}
                fontWeight={700}
              >
                My investments
              </Typography>
              <UserPoolOrders poolType={"ACCUMULATION"} />
            </div>
          </Box>
        </Container>
      </Box>
      <Hidden mdUp>
        <div style={{ position: "fixed" }}>
          <MobileBottomBar />
        </div>
      </Hidden>
    </Box>
  );
}
