import React from "react";
import { Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Loader from "./Loader";

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
    height: 420,
    minHeight: 350,
    maxWidth: 788,
    position: "relative",
    background: "#fff",
    border: "15px solid #D1FE1D",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 11,
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
  heading: {
    color: "#000000",
    textAlign: "center",
    fontSize: 30,
    [theme.breakpoints.down("md")]: {
      fontSize: 24,
    },
  },
  para: {
    color: "#212121",
    textAlign: "center",
    fontSize: 13,
    fontWeight: 400,
    fontFamily: "Karla",
    paddingTop: 15,
    [theme.breakpoints.down("md")]: {
      fontSize: 13,
      paddingTop: 5,
    },
  },
  closeIcon: {
    position: "absolute",
    top: 8,
    right: 8,
    height: 22,
    width: 22,
    cursor: "pointer",
    [theme.breakpoints.down("md")]: {
      top: 5,
      right: 5,
      height: 18,
      width: 18,
    },
  },
  reloadButton: {
    minWidth: 100,
    width: "fit-content",
    height: "40px",
    background: "transparent",
    border: "1.5px solid #212121",
    boxSizing: "border-box",
    borderRadius: "12px",
    fontSize: 13,

    color: "#212121",

    marginTop: 30,
    padding: "6px 30px 6px 30px",

    [theme.breakpoints.down("md")]: {
      padding: "8px 15px 8px 15px",
      fontSize: 14,
      marginTop: 20,
    },
  },
  svgImage: {
    width: "75%",
    [theme.breakpoints.down("md")]: {
      maxWidth: 220,
      width: "70%",
    },
  },
}));

const TransactionPopup = ({ txCase, resetPopup }) => {
  const classes = useStyles();

  return (
    <div className={classes.background}>
      <div className={classes.container}>
        <div className="w-100 d-flex justify-content-center align-items-center">
          <div className="d-flex justify-content-end" onClick={resetPopup}>
            <img src="https://onerare-bucket.s3.ap-south-1.amazonaws.com/assets/icons/closeIcon.svg" alt="Onerare" className={classes.closeIcon} />
          </div>
          {txCase === 3 && (
            <div
              className="w-100 h-100 row flex-row align-items-center justify-content-center"
             
            >
              <div className="col-sm-7 d-flex flex-column justify-content-center align-items-center">
                <div>
                  <Typography variant="h2" className={classes.heading}>
                    Toaster is waiting!
                  </Typography>
                  <Typography variant="h5" className={classes.para}>
                    ~ Confirm the transaction in your wallet ~
                  </Typography>
                </div>
              </div>
              <div className="col-sm-5">
                <div>
                  <Loader width={200} />
                </div>
              </div>
            </div>
          )}
          {txCase === 4 && (
            <div
              className="w-100 h-100 row flex-row align-items-center justify-content-center"
             
            >
              <div className="col-sm-7 d-flex flex-column justify-content-center align-items-center">
                  <Typography variant="h2" className={classes.heading}>
                    Oops ! Burnt Bread !
                  </Typography>
                  <Typography variant="h5" className={classes.para}>
                    ~ You denied the transaction ~
                  </Typography>
                  <Button
                    variant="contained"
                    className={classes.reloadButton}
                    onClick={() => window.location.reload()}
                  >
                    Reload
                  </Button>
              </div>
              <div className="col-sm-5 d-flex justify-content-center align-items-center">
                  <object
                    type="image/svg+xml"
                    data={"images/toaster.svg"}
                    className={classes.svgImage}
                  />
                </div>
            </div>
          )}
          {txCase === 5 && (
            <div
              className="w-100 h-100 row flex-row align-items-center justify-content-center"
             
            >
              <div className="col-sm-7 d-flex flex-column justify-content-center align-items-center">
                  <Typography variant="h2" className={classes.heading}>
                    Toaster is working!
                  </Typography>
                  <Typography variant="h5" className={classes.para}>
                    ~ Transaction submitted, waiting for confirmation ~
                  </Typography>
              </div>
              <div className="col-sm-5 d-flex justify-content-center align-items-center">
                  <object
                    type="image/svg+xml"
                    data={"images/toaster.svg"}
                    className={classes.svgImage}
                  />
              </div>
            </div>
          )}
          {txCase === 6 && (
            <div
              className="w-100 h-100 row flex-row align-items-center justify-content-center"
             
            >
              <div className="col-sm-7 d-flex flex-column justify-content-center align-items-center">
                  <Typography variant="h2" className={classes.heading}>
                    Oops ! Burnt Bread !
                  </Typography>
                  <Typography variant="h5" className={classes.para}>
                    ~ Transaction has been failed ~
                  </Typography>
                  <Button
                    variant="contained"
                    className={classes.reloadButton}
                    onClick={() => window.location.reload()}
                  >
                    Reload
                  </Button>
              </div>
              <div className="col-sm-5 d-flex justify-content-center align-items-center">
                  <object
                    type="image/svg+xml"
                    data={"images/toaster.svg"}
                    className={classes.svgImage}
                  />
              </div>
            </div>
          )}
          {txCase === 7 && (
            <div
              className="w-100 h-100 row flex-row align-items-center justify-content-center"
             
            >
              <div className="col-sm-7 d-flex flex-column justify-content-center align-items-center">
                  <Typography variant="h2" className={classes.heading}>
                    Ready to Party !
                  </Typography>
                  <Typography variant="h5" className={classes.para}>
                    YOUR TRANSACTION IS SUCCESSFUL
                  </Typography>
                  <Button
                    variant="contained"
                    className={classes.reloadButton}
                    onClick={() => window.location.reload()}
                  >
                    Refresh
                  </Button>
              </div>
              <div className="col-sm-5 d-flex justify-content-center align-items-center">
                  <object
                    type="image/svg+xml"
                    data={"images/success.svg"}
                    className={classes.svgImage}
                  />
              </div>
            </div>
          )}
          {txCase === 8 && (
            <div
              className="w-100 h-100 row flex-row align-items-center justify-content-center"
             
            >
              <div className="col-sm-7 d-flex flex-column justify-content-center align-items-center">
                  <Typography variant="h2" className={classes.heading}>
                    We’ll miss you !
                  </Typography>
                  <Typography variant="h5" className={classes.para}>
                    YOUR TOKENS HAVE BEEN UNSTAKED
                  </Typography>
                  <Button
                    variant="contained"
                    className={classes.reloadButton}
                    onClick={() => window.location.reload()}
                  >
                    Join party Again
                  </Button>
              </div>
              <div className="col-sm-5 d-flex justify-content-center align-items-center">
                  <object
                    type="image/svg+xml"
                    data={"images/unstake.svg"}
                    className={classes.svgImage}
                  />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionPopup;
