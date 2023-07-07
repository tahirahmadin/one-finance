import React, { useMemo, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import TimeAgo from "timeago-react";
import { fromWei, toDollarPrice } from "../../utils/helper";
import { AccessTime, CheckBox, Close } from "@mui/icons-material";
import LinearProgressComponent from "../../common/LinearProgressComponent";
import WithdrawPopup from "../../common/WithdrawPopup";
import TxPopup from "../../common/TxPopup";
import ethersServiceProvider from "../../services/ethersServiceProvider";
import { accumulationInstance, dcaInstance } from "../../contracts";
import web3 from "../../web3";
import { useOrders } from "../../hooks/useOrders";
import { STRATEGY_TYPE_ENUM } from "../../utils/constants";
import { setRefetchValue } from "../../reducers/UiReducer";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  boxCard: {
    marginTop: 20,
  },
  actionButton: {
    borderRadius: 10,
    textTransform: "none",
    background: "rgba(130, 71, 229, 0.3)",
    padding: "5px 15px 5px 15px",
    color: "white",
    width: "100%",
    maxWidth: "fit-content",
    fontWeight: 400,
    fontSize: 12,
    "&:hover": {
      background: "rgba(130, 71, 229, 0.9)",
    },
  },
}));

export default function UserPoolOrders({ poolTypeProp }) {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const { refetchValue } = store.ui;

  let accountSC = ethersServiceProvider.currentAccount;

  const [showWithdraw, setShowWithdraw] = useState(false);
  const [trxCase, setTrxCase] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState({});

  const { pendingOrders, completedOrders, loading, error } =
    useOrders(poolTypeProp);

  const allOrders = useMemo(() => {
    const pending = !pendingOrders?.orders ? [] : pendingOrders?.orders;
    const completed = !completedOrders?.orders ? [] : completedOrders?.orders;
    return [...pending, ...completed];
  }, [pendingOrders, completedOrders]);

  const getExecutedPercentage = (singleOrder) => {
    if (singleOrder && singleOrder.executedGrids && singleOrder.grids) {
      return (singleOrder.executedGrids * 100) / singleOrder.grids;
    } else {
      return 0;
    }
  };

  const handleWithdraw = (order) => {
    setSelectedOrder(order);
    setShowWithdraw(true);
  };

  // Write functions
  const handleConfirm = async () => {
    setTrxCase(1);
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
          .withdrawByOrderId(selectedOrder?.id)
          .estimateGas({ from: userAddress });

        let estimateGasPrice = await web3.eth.getGasPrice();
        const response = await contractInstance.methods
          .withdrawByOrderId(selectedOrder?.id)
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
                setTrxCase(2);
              } else {
                setTrxCase(4);
              }
            }
          )
          .on("receipt", async function (receipt) {
            setTrxCase(3);
            dispatch(setRefetchValue(refetchValue + 1));
          })
          .on("error", async function (error) {
            if (error?.code === 4001) {
              setTrxCase(4);
            } else {
              setTrxCase(4);
            }
          });
      } catch (err) {
        console.log("withdraw error  ", err);
        setTrxCase(4);
      }
    }
  };

  return (
    <Box className={classes.boxCard}>
      <WithdrawPopup
        order={selectedOrder}
        handleWithdraw={handleConfirm}
        open={showWithdraw}
        resetPopup={() => setShowWithdraw(false)}
      />
      <TxPopup
        txCase={trxCase}
        resetPopup={() => {
          setShowWithdraw(false);
          setTrxCase(0);
        }}
      />
      {allOrders.length === 0 && (
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          p={2}
          style={{
            color: "#bdbdbd",
            paddingBottom: 10,
            fontSize: 13,
            borderRadius: 14,
            marginTop: 10,
            backgroundColor: "#15171c",
            paddingBottom: 20,
            fontWeight: 600,
          }}
        >
          You did not invested in this strategy yet.
        </Box>
      )}
      {allOrders?.map((singleOrder, index) => {
        return (
          <Grid
            container
            p={2}
            style={{
              borderRadius: 14,
              marginTop: 10,
              backgroundColor: "#15171c",
            }}
            key={1}
          >
            <Grid
              item
              md={2.5}
              display="flex"
              flexDirection={"row"}
              justifyContent="flex-start"
              alignItems="center"
            >
              <Box>
                <img
                  src="https://www.sleepswap.io/SleepSwap_Plain.png"
                  alt="Token"
                  height="28px"
                />
              </Box>
              <Box>
                <Typography
                  variant="body2"
                  textAlign="left"
                  fontWeight={600}
                  color={"#f9f9f9"}
                  pl={1}
                  lineHeight={1}
                  fontSize={13}
                >
                  SLEEPT
                </Typography>
                <Typography
                  fontSize={11}
                  variant="small"
                  textAlign="left"
                  fontWeight={300}
                  color={"#c7cad9"}
                  pl={1}
                  lineHeight={1}
                >
                  <AccessTime fontSize="14" />{" "}
                  <TimeAgo datetime={parseInt(singleOrder.timestamp) * 1000} />
                </Typography>
              </Box>
            </Grid>

            <Grid
              item
              md={5.5}
              display="flex"
              flexDirection={"column"}
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Typography
                variant="body2"
                textAlign="left"
                fontWeight={600}
                color={"#f9f9f9"}
                fontSize={13}
              >
                Order placed for ${fromWei(singleOrder.deposit)}
              </Typography>
              <Box
                pt={1}
                display="flex"
                flexDirection={"row"}
                justifyContent="flex-start"
                alignItems="center"
              >
                {poolTypeProp === STRATEGY_TYPE_ENUM.ACCUMULATION && [
                  <Typography
                    variant="small"
                    textAlign="left"
                    fontWeight={300}
                    color={"#c7cad9"}
                    fontSize={11}
                  >
                    Entry Price: ${toDollarPrice(singleOrder.entryPrice)}
                  </Typography>,
                  <Typography
                    variant="small"
                    textAlign="left"
                    fontWeight={400}
                    color={"#c7cad9"}
                    px={0.5}
                  >
                    -
                  </Typography>,
                ]}

                {poolTypeProp === STRATEGY_TYPE_ENUM.ACCUMULATION && (
                  <Typography
                    variant="small"
                    textAlign="left"
                    fontWeight={300}
                    color={"#c7cad9"}
                    fontSize={11}
                  >
                    Change: {singleOrder.percentage}%
                  </Typography>
                )}

                {poolTypeProp === STRATEGY_TYPE_ENUM.DCA && (
                  <Typography
                    variant="small"
                    textAlign="left"
                    fontWeight={300}
                    color={"#c7cad9"}
                    fontSize={11}
                  >
                    Period: {singleOrder.dcaFrequencyInHours}hrs
                  </Typography>
                )}

                <Typography
                  variant="small"
                  textAlign="left"
                  fontWeight={400}
                  color={"#c7cad9"}
                  px={0.5}
                >
                  -
                </Typography>
                {poolTypeProp === STRATEGY_TYPE_ENUM.ACCUMULATION && (
                  <Typography
                    variant="small"
                    textAlign="left"
                    fontWeight={300}
                    color={"#c7cad9"}
                    fontSize={11}
                  >
                    Amount: {singleOrder.grids}
                  </Typography>
                )}

                {poolTypeProp === STRATEGY_TYPE_ENUM.DCA && (
                  <Typography
                    variant="small"
                    textAlign="left"
                    fontWeight={300}
                    color={"#c7cad9"}
                    fontSize={11}
                  >
                    Order amount: ${fromWei(singleOrder.dcaAmountPerTrade)}
                  </Typography>
                )}
              </Box>
            </Grid>
            <Grid
              item
              md={3}
              display="flex"
              flexDirection={"row"}
              justifyContent="flex-start"
              alignItems="center"
            >
              <Box>
                <LinearProgressComponent
                  value={getExecutedPercentage(singleOrder)}
                />
                <Typography
                  variant="body2"
                  textAlign="left"
                  fontWeight={400}
                  color={"#bdbdbd"}
                  fontSize={12}
                  pt={0.5}
                >
                  {getExecutedPercentage(singleOrder)}% Complete
                </Typography>
              </Box>
            </Grid>

            <Grid
              item
              md={1}
              display="flex"
              flexDirection={"row"}
              justifyContent="center"
              alignItems="center"
            >
              {singleOrder?.open && (
                <Button
                  className={classes.actionButton}
                  onClick={() => handleWithdraw(singleOrder)}
                >
                  Cancel
                </Button>
              )}
              {!singleOrder?.open && (
                <Button
                  className={classes.actionButton}
                  disabled={true}
                  style={{ backgroundColor: "#6ec046" }}
                >
                  Completed
                </Button>
              )}
            </Grid>
          </Grid>
        );
      })}
    </Box>
  );
}
