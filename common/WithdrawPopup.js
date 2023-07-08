//done
import React, { useState } from "react";
import {
  Typography,
  Slide,
  Dialog,
  Backdrop,
  Button,
  Box,
  Grid,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { AccessTime, Close } from "@mui/icons-material";
import TimeAgo from "timeago-react";
import { fromWei, toDollarPrice } from "../utils/helper";
import LinearProgressComponent from "./LinearProgressComponent";
import { STRATEGY_TYPE_ENUM, constants } from "../utils/constants";
import ethersServiceProvider from "../services/ethersServiceProvider";
import { useDispatch, useSelector } from "react-redux";
import { setRefetchValue } from "../reducers/UiReducer";
import { accumulationInstance, dcaInstance } from "../contracts";
import web3 from "../web3";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  background: {
    position: "fixed",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    zIndex: 10,
    display: "grid",
    placeItems: "center",
    background: "rgba(0,0,0,0.2)",
  },
  container: {
    width: "100%",
    minHeight: 400,
    maxWidth: 480,
    padding: 21,
    backgroundColor: "#ffffff",
    borderRadius: "1rem",
    display: "flex",
    alignItems: "center",
    zIndex: 11,
    borderRadius: 21,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      maxWidth: "95%",
      height: 350,
    },
    [theme.breakpoints.down("sm")]: {
      height: "max-content",
    },
  },

  confirmButton: {
    borderRadius: 14,
    background: constants.highlighColorDark,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px 40px 10px 40px",
    color: "white",
    width: "100%",
    textTransform: "capitalize",
    maxWidth: "fit-content",
    fontWeight: 600,
    fontSize: 16,
    "&:hover": {
      background: "rgba(130, 71, 229, 0.9)",
    },
  },
  cancelButton: {
    color: "black",
    padding: "10px 20px 10px 20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    textTransform: "capitalize",
    maxWidth: "fit-content",
    fontWeight: 600,
    borderRadius: 14,
    fontSize: 16,
    "&:hover": {
      color: "rgba(130, 71, 229, 0.9)",
    },
  },
  statsCard: {
    width: 120,
    border: "1px solid #919191",
    borderRadius: 14,
    padding: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
}));

const WithdrawPopup = ({ poolTypeProp, open, resetPopup, order }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const { refetchValue } = store.ui;
  let accountSC = ethersServiceProvider.currentAccount;

  const [txCase, setTxCase] = useState(4);

  // Write functions
  const handleConfirmWithdraw = async () => {
    let selectedOrder = order;
    setTxCase(1);
    let userAddress = accountSC;
    let provider = ethersServiceProvider.web3AuthInstance;

    let contractInstance;
    if (poolTypeProp === STRATEGY_TYPE_ENUM.ACCUMULATION) {
      contractInstance = await accumulationInstance(provider.provider);
    } else {
      contractInstance = await dcaInstance(provider.provider);
    }

    if (selectedOrder) {
      try {
        let estimateGas = await contractInstance.methods
          .withdrawByOrderId(selectedOrder?.orderId)
          .estimateGas({ from: userAddress });

        let estimateGasPrice = await web3.eth.getGasPrice();
        const response = await contractInstance.methods
          .withdrawByOrderId(selectedOrder?.orderId)
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
                setTxCase(2);
              } else {
                setTxCase(3);
              }
            }
          )
          .on("receipt", async function (receipt) {
            setTxCase(4);
            dispatch(setRefetchValue(refetchValue + 1));
          })
          .on("error", async function (error) {
            setTxCase(5);
          });
      } catch (err) {
        console.log("withdraw error  ", err);
        setTxCase(5);
      }
    }
  };

  const handleResetPopup = () => {
    setTxCase(0);
    resetPopup();
  };
  return (
    <Dialog
      open={open}
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
      <div className={classes.background}>
        <div className={classes.container}>
          <IconButton
            style={{ position: "absolute", right: 10, top: 10 }}
            onClick={handleResetPopup}
          >
            <Close style={{ cursor: "pointer", color: "black" }} />
          </IconButton>

          {txCase != 4 && (
            <>
              <Typography
                variant="h5"
                textAlign="center"
                fontWeight={600}
                color={"#000000"}
                mb={2}
              >
                Cancel strategy
              </Typography>

              <img
                src="https://cdn3d.iconscout.com/3d/premium/thumb/mail-payment-6985921-5691408.png?f=webp"
                height="100px"
              />
              <Typography
                variant="body2"
                textAlign="center"
                fontWeight={400}
                fontSize={14}
                pt={2}
                px={1}
                color={"#000000"}
              >
                Canceling the order will remove you from trading pools, you may
                loose some juicy profits.
              </Typography>
              <Typography
                mt={3}
                variant="h6"
                textAlign="left"
                fontWeight={600}
                color={"#212121"}
              >
                You will receive
              </Typography>
              <Box
                mt={2}
                display="flex"
                flexDirection={"row"}
                justifyContent="space-between"
                alignItems="center"
                gap={2}
              >
                <Box className={classes.statsCard}>
                  <Typography
                    variant="body3"
                    fontWeight={300}
                    fontSize={11}
                    color={"black"}
                  >
                    USDT($)
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    fontSize={14}
                    color={"black"}
                    pt={0.2}
                  >
                    {fromWei(order.remainingFiat)} USDT
                  </Typography>
                </Box>
                <Box className={classes.statsCard}>
                  <Typography
                    variant="body3"
                    fontWeight={300}
                    fontSize={11}
                    color={"black"}
                  >
                    Token
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    fontSize={14}
                    color={"black"}
                    pt={0.2}
                  >
                    {fromWei(order.tokenBalance)} ETH
                  </Typography>
                </Box>
              </Box>
              <div className="h-100 w-100 d-flex flex-column justify-content-between">
                <Typography
                  variant="body2"
                  textAlign="center"
                  fontWeight={600}
                  fontSize={14}
                  pt={3}
                  color={"#000000"}
                >
                  Do you really wanted to cancel this strategy?
                </Typography>
                <div className="w-100 d-flex justify-content-center mb-4 mt-3">
                  <div className="px-2">
                    <Button
                      className={classes.cancelButton}
                      onClick={handleResetPopup}
                    >
                      Go back
                    </Button>
                  </div>
                  <div className="px-2">
                    <Button
                      className={classes.confirmButton}
                      onClick={handleConfirmWithdraw}
                    >
                      {txCase === 0 && "Confirm"}
                      {txCase === 1 && "Waiting for confirm..."}
                      {txCase === 2 && (
                        <span>
                          <CircularProgress
                            size={18}
                            style={{
                              color: "white",
                              marginRight: 5,
                            }}
                          />{" "}
                          Processing...
                        </span>
                      )}

                      {txCase === 5 && "Failed!, Try again"}
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
          {txCase === 4 && (
            <>
              <Typography
                variant="h5"
                textAlign="center"
                fontWeight={600}
                color={"#000000"}
                mb={2}
              >
                Withdraw success
              </Typography>

              <img
                src="https://cdn3d.iconscout.com/3d/premium/thumb/withdraw-complete-8327678-6634728.png?f=webp"
                height="120px"
              />

              <Typography
                mt={3}
                variant="h6"
                textAlign="left"
                fontWeight={600}
                color={"#212121"}
              >
                You have received
              </Typography>
              <Box
                mt={2}
                display="flex"
                flexDirection={"row"}
                justifyContent="space-between"
                alignItems="center"
                gap={2}
              >
                <Box className={classes.statsCard}>
                  <Typography
                    variant="body3"
                    fontWeight={300}
                    fontSize={11}
                    color={"black"}
                  >
                    USDT($)
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    fontSize={14}
                    color={"black"}
                    pt={0.2}
                  >
                    {fromWei(order.remainingFiat)} USDT
                  </Typography>
                </Box>
                <Box className={classes.statsCard}>
                  <Typography
                    variant="body3"
                    fontWeight={300}
                    fontSize={11}
                    color={"black"}
                  >
                    Token
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    fontSize={14}
                    color={"black"}
                    pt={0.2}
                  >
                    {fromWei(order.tokenBalance)} ETH
                  </Typography>
                </Box>
              </Box>
              <div className="h-100 w-100 d-flex flex-column justify-content-between">
                <Typography
                  variant="body2"
                  textAlign="center"
                  fontWeight={500}
                  fontSize={14}
                  pt={3}
                  color={"#000000"}
                >
                  Invest in top performing strategy pools recommended by <br />
                  degens and gain high profits.
                </Typography>
                <div className="w-100 d-flex justify-content-center mb-4 mt-3">
                  <div className="px-2">
                    <Button
                      className={classes.confirmButton}
                      onClick={handleResetPopup}
                    >
                      Continue to app
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default WithdrawPopup;
