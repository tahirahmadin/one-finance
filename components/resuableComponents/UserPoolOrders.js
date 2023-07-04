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
import { accumulationInstance } from "../../contracts";
import web3 from "../../web3";
import { useOrders } from "../../hooks/useOrders";
import { strategyType } from "../../utils/constants";

const useStyles = makeStyles((theme) => ({
  boxCard: {
    marginTop: 20,
  },
  actionButton: {
    borderRadius: 14,
    background: "rgba(130, 71, 229, 0.3)",
    padding: "10px 20px 10px 20px",
    color: "white",
    width: "100%",
    maxWidth: "fit-content",
    fontWeight: 600,
    fontSize: 14,
    "&:hover": {
      background: "rgba(130, 71, 229, 0.9)",
    },
  },
}));

export default function UserPoolOrders({ poolType }) {
  const classes = useStyles();
  const theme = useTheme();
  let accountSC = ethersServiceProvider.currentAccount;

  const [showWithdraw, setShowWithdraw] = useState(false);
  const [trxCase, setTrxCase] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState({});

  const { pendingOrders, completedOrders, loading, error } = useOrders(
    strategyType.ACCUMULATION
  );

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

    let accumulateContract = accumulationInstance(provider.provider);
    if (selectedOrder) {
      try {
        let estimateGas = await accumulateContract.methods
          .withdrawByOrderId(selectedOrder?.id)
          .estimateGas({ from: userAddress });

        let estimateGasPrice = await web3.eth.getGasPrice();
        const response = await accumulateContract.methods
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
              borderRadius: 20,
              marginTop: 10,
              backgroundColor: "#15171c",
            }}
            key={1}
          >
            <Grid
              item
              md={2}
              display="flex"
              flexDirection={"row"}
              justifyContent="flex-start"
              alignItems="center"
            >
              <Box>
                <img
                  src="https://www.sleepswap.io/SleepSwap_Plain.png"
                  alt="Token"
                  height="32px"
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
                >
                  SLEEPT
                </Typography>
                <Typography
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
              md={5}
              display="flex"
              flexDirection={"column"}
              justifyContent="center"
              alignItems="flex-start"
            >
              <Typography
                variant="h6"
                textAlign="left"
                fontWeight={600}
                color={"#f9f9f9"}
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
                <Typography
                  variant="small"
                  textAlign="left"
                  fontWeight={400}
                  color={"#c7cad9"}
                >
                  Price: ${toDollarPrice(singleOrder.entryPrice)}
                </Typography>
                <Typography
                  variant="small"
                  textAlign="left"
                  fontWeight={400}
                  color={"#c7cad9"}
                  px={1}
                >
                  |
                </Typography>
                <Typography
                  variant="small"
                  textAlign="left"
                  fontWeight={400}
                  color={"#c7cad9"}
                >
                  Percetage: {singleOrder.percentage}%
                </Typography>
                <Typography
                  variant="small"
                  textAlign="left"
                  fontWeight={400}
                  color={"#c7cad9"}
                  px={1}
                >
                  |
                </Typography>
                <Typography
                  variant="small"
                  textAlign="left"
                  fontWeight={400}
                  color={"#c7cad9"}
                >
                  Orders: {singleOrder.grids}
                </Typography>
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
                  fontSize={15}
                  pt={1}
                >
                  {getExecutedPercentage(singleOrder)}% Complete
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
              {singleOrder?.open && (
                <Button
                  className={classes.actionButton}
                  onClick={() => handleWithdraw(singleOrder)}
                >
                  <Close style={{ marginRight: 5 }} /> Cancel
                </Button>
              )}
              {!singleOrder?.open && (
                <Button className={classes.actionButton} disabled={true}>
                  <CheckBox style={{ marginRight: 5 }} /> Completed
                </Button>
              )}
            </Grid>
          </Grid>
        );
      })}
    </Box>
  );
}
