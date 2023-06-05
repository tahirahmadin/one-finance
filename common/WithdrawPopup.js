//done
import React from "react";
import {
  Typography,
  Slide,
  Dialog,
  Backdrop,
  Button,
  Box,
  Grid,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { AccessTime, Close } from "@mui/icons-material";
import TimeAgo from "timeago-react";
import { fromWei, toDollarPrice } from "../utils/helper";
import LinearProgressComponent from "./LinearProgressComponent";

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
    height: "fit-content",
    padding: 10,
    minHeight: 400,
    maxWidth: 540,
    position: "relative",
    background: "#000000",
    border: "2px solid #bdbdbd",
    display: "flex",
    alignItems: "center",
    zIndex: 11,
    borderRadius: 10,
    [theme.breakpoints.down("md")]: {
      border: "10px solid #D1FE1D",
      width: "100%",
      maxWidth: "95%",
      height: 350,
    },
    [theme.breakpoints.down("sm")]: {
      height: "max-content",
    },
  },
  closeIcon: {
    position: "absolute",
    top: 8,
    right: 8,
    height: 22,
    width: 22,
    cursor: "pointer",
    color: "white",
    [theme.breakpoints.down("md")]: {
      top: 5,
      right: 5,
      height: 18,
      width: 18,
    },
  },

  heading: {
    color: "#f9f9f9",
    textAlign: "center",
    fontSize: 30,
    lineHeight: 1,
    paddingTop: 5,
    [theme.breakpoints.down("md")]: {
      fontSize: 24,
    },
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

const WithdrawPopup = ({ open, resetPopup, handleWithdraw, order }) => {
  const classes = useStyles();

  const getExecutedPercentage = (singleOrder) => {
    if (singleOrder && singleOrder.executedGrids && singleOrder.grids) {
      return (singleOrder.executedGrids * 100) / singleOrder.grids;
    } else {
      return 0;
    }
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
          <div className="h-100 w-100">
            <div
              className="h-100 w-100 d-flex flex-column justify-content-between"
              style={{ minHeight: 400 }}
            >
              <div
                className="d-flex justify-content-end align-items-start"
                onClick={resetPopup}
              >
                <Close style={{ cursor: "pointer", color: "white" }} />
              </div>
              <div className="w-100">
                <Grid
                  container
                  p={2}
                  style={{
                    borderRadius: 20,
                    marginTop: 10,
                    backgroundColor: "#000000",
                  }}
                  key={1}
                >
                  <Grid
                    width={"100%"}
                    item
                    md={3}
                    // display="flex"
                    // flexDirection={"row"}
                    // justifyContent="flex-center"
                    // alignItems="center"
                  ></Grid>

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
                      Order placed for ${fromWei(order.deposit)}
                    </Typography>
                    <Box
                      pt={4}
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
                        USDT: <br /> <br />
                        {fromWei(order.remainingFiat)}
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
                        SLEEP: <br /> <br />
                        {fromWei(order.tokenBalance)}
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
                        Orders: <br /> <br />
                        {order.grids}
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
                        Executed: <br /> <br />
                        {order.executedGrids}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                <div className="my-2">
                  <Typography
                    variant="h6"
                    className={classes.para}
                    textAlign="center"
                    fontWeight={400}
                    fontSize={14}
                    pt={3}
                  >
                    Cancel your strategy and withdraw funds
                  </Typography>
                </div>
              </div>
              <div className="w-100 d-flex  justify-content-center mb-4">
                <Button
                  className={classes.actionButton}
                  onClick={handleWithdraw}
                >
                  Confirm, Cancel Order
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default WithdrawPopup;
