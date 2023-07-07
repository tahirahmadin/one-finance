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
import { dcaInstance, tokenInstance } from "../../contracts";
import web3 from "../../web3";
import {
  AvTimer,
  BorderClear,
  ExpandMore,
  SentimentSatisfiedAlt,
} from "@mui/icons-material";
import Web3 from "web3";
import { getTokenPriceStats } from "../../actions/serverActions";
import { useSelector, useDispatch } from "react-redux";
import {
  setRefetchValue,
  setUsdtBalanceOfUser,
} from "../../reducers/UiReducer";
import { STRATEGY_TYPE_ENUM, constants } from "../../utils/constants";
import "react-circular-progressbar/dist/styles.css";
import { tokenList } from "../../utils/data";
import SelectTokenDialog from "../../common/SelectToken/SelectTokenDialog";
import DCATopHeader from "./DCATopHeader";
import UserPoolOrders from "../resuableComponents/UserPoolOrders";

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

export default function DCAComponent() {
  const classes = useStyles();
  const theme = useTheme();
  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  const { accountSC } = useWeb3Auth();

  const { usdtBalance, refetchValue } = store.ui;

  const [amount, setAmount] = useState(1000);
  const [frequency, setFrequency] = useState(24);
  const [amountPerTradeState, setAmountPerTradeState] = useState(100);
  const [stakeCase, setStakeCase] = useState(0);
  const [isApproved, setIsApproved] = useState(false);
  const [resetFlag, setResetFlag] = useState(0);
  const [tokenPriceData, setTokenPriceData] = useState(null);
  const [openTokenSelect, setOpenTokenSelect] = useState(false);
  const [selectedToken, setSelectedToken] = useState(tokenList[0]);
  const [errorMsg, setErrorMsg] = useState(null);

  const sm = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const md = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const tokenPrice = { price: 2000 };

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
        let dca_contract = constants.contracts.dca;
        let res = await checkUSDTApproved(accountSC, dca_contract);
        setIsApproved(parseInt(res) > 0);
      }
      asyncFn();
    }
  }, [accountSC, resetFlag]);

  const handleFrequency = (event) => {
    let { value } = event.target;
    if (value) {
      let min = 0;
      let max = 720;
      value = Math.max(Number(min), Math.min(Number(max), Number(value)));
      setFrequency(value);
    }
    setFrequency(value);
  };

  // Approve token
  const handleApprove = async () => {
    setStakeCase(1);

    let userAddress = accountSC;
    let dca_contract_address = constants.contracts.dca;
    let provider = ethersServiceProvider.web3AuthInstance;

    let tokenContract = tokenInstance(provider.provider);
    try {
      let estimateGas = await tokenContract.methods
        .approve(dca_contract_address, "100000000000000000000000000")
        .estimateGas({ from: userAddress });

      let estimateGasPrice = await web3.eth.getGasPrice();
      const response = await tokenContract.methods
        .approve(dca_contract_address, "100000000000000000000000000")
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
    if (
      amount <= usdtBalance &&
      amount > 0 &&
      amountPerTradeState > 0 &&
      frequency > 0 &&
      amount >= amountPerTradeState
    ) {
      setErrorMsg(null);
      let fiatAmount = await Web3.utils.toWei(amount.toString(), "ether");
      let amountOfSingleOrder = await Web3.utils.toWei(
        amountPerTradeState.toString(),
        "ether"
      );

      // Enabling popup
      setStakeCase(1);
      let userAddress = accountSC;
      let provider = ethersServiceProvider.web3AuthInstance;

      // Instance of DCA Contract
      let dcaContract = dcaInstance(provider.provider);
      try {
        let estimateGas = await dcaContract.methods
          .invest(
            fiatAmount,
            amountOfSingleOrder,
            frequency,
            selectedToken.address
          )
          .estimateGas({ from: userAddress });

        let estimateGasPrice = await web3.eth.getGasPrice();
        const response = await dcaContract.methods
          .invest(
            fiatAmount,
            amountOfSingleOrder,
            frequency,
            selectedToken.address
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
            dispatch(setRefetchValue(refetchValue + 1));
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
    } else {
      if (amount > usdtBalance) {
        setErrorMsg("Amount is exceeding the balance.");
      }
      if (amountPerTradeState > amount) {
        setErrorMsg("Amount per trade is exceeding the invested amount.");
      }
      if (amount === 0) {
        setErrorMsg("Amount should be greater than 0.");
      }
      if (amountPerTradeState === 0) {
        setErrorMsg("Amount Amount per trade should be greater than 0.");
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

  return (
    <Box>
      <TxPopup txCase={stakeCase} resetPopup={handleClosePopup} />

      {/* Components for create order and top header */}
      <Grid
        container
        display={"flex"}
        justifyContent="space-between"
        spacing={4}
      >
        <Grid item md={8} sm={12} xs={12}>
          <DCATopHeader />
          <Hidden mdDown>
            <Box mb={4} mt={4}>
              <Typography
                variant="h6"
                className={classes.heading}
                fontWeight={700}
              >
                My investments
              </Typography>
              <UserPoolOrders poolTypeProp={STRATEGY_TYPE_ENUM.DCA} />
            </Box>
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
                      <ExpandMore style={{ color: "#f9f9f9", padding: 0 }} />
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
                </Accordion>
              </Box>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                my={1}
                className={classes.inputWrapper}
              >
                <Box>
                  <Typography variant="small" textAlign={"left"} lineHeight={1}>
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
                      Amount per trade:
                    </Typography>
                    <Input
                      value={amountPerTradeState}
                      type="number"
                      onInput={(event) =>
                        event.target.value >= 0 &&
                        event.target.value < amount &&
                        setAmountPerTradeState(parseInt(event.target.value))
                      }
                      fullWidth
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
                      Buy on every(hr):
                    </Typography>
                    <Input
                      type="number"
                      disableUnderline
                      value={frequency}
                      fullWidth
                      placeholder="24"
                      onChange={(e) => handleFrequency(e)}
                      style={{ fontSize: 20, fontWeight: 600 }}
                    />
                  </Box>
                </Grid>
              </Grid>

              {errorMsg && (
                <Typography
                  variant="small"
                  textAlign={"left"}
                  color={"#ef5350"}
                  lineHeight={1}
                  mt={1}
                >
                  * {errorMsg}
                </Typography>
              )}
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
                  fontSize={13}
                  color={"#f9f9f9"}
                >
                  My Investment summary
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={300}
                  fontSize={12}
                  color={"#e5e5e5"}
                >
                  Strategy will buy tokens for amount{" "}
                  <strong style={{ color: "white" }}>
                    {amountPerTradeState} USDT{" "}
                  </strong>{" "}
                  on every{" "}
                  <strong style={{ color: "white" }}>{frequency}</strong> hours.
                </Typography>
              </Box>
              <Typography
                mt={3}
                variant="body2"
                fontWeight={500}
                fontSize={13}
                color={"white"}
              >
                Expected results:
              </Typography>
              <Typography
                variant="body2"
                fontWeight={300}
                fontSize={12}
                color={"#e5e5e5"}
              >
                You will accumulate your favourite tokens with average price.
              </Typography>
            </div>
          </Box>
        </Grid>
      </Grid>
      <Hidden smUp>
        <Box mb={5}>
          <div>
            <Typography
              variant="h6"
              className={classes.heading}
              fontWeight={700}
            >
              My investments
            </Typography>
            <UserPoolOrders poolTypeProp={STRATEGY_TYPE_ENUM.DCA} />
          </div>
        </Box>
      </Hidden>
    </Box>
  );
}
