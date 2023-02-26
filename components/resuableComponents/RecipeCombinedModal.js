import React, { useState } from "react";
import {
  Grid,
  Dialog,
  useMediaQuery,
  Typography,
  Hidden,
  Button,
  useTheme,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useSelector, useDispatch } from "react-redux";
import { toggleRecipeCombinedModalVisible } from "../../reducers/UiReducer";

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
    // background: "rgba(0,0,0,0.2)",
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
    zIndex: 11,
    padding: "25px 3%",
    [theme.breakpoints.down("md")]: {
      border: "10px solid #D1FE1D",
      width: "100%",
      maxWidth: "95%",
      height: 350,
    },
    [theme.breakpoints.down("sm")]: {
      padding: "5%",
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
    [theme.breakpoints.down("md")]: {
      top: 5,
      right: 5,
      height: 18,
      width: 18,
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
    paddingTop: 10,
    [theme.breakpoints.down("md")]: {
      fontSize: 13,
      paddingTop: 5,
    },
  },
  svgImage: {
    width: "85%",
    maxWidth: 240,
    [theme.breakpoints.down("md")]: {
      width: "80%",
    },
  },
}));
const RecipeCombinedModal = () => {
  const store = useSelector((state) => state);
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("md"));
  const { recipeCombinedModalVisible } = store.ui;

  const [successful, setSuccessful] = useState(false); // MOVE LOCAL STATE TO THE REDUCER WHEN API IMPLEMENTATION

  const handleClose = () => {
    dispatch(toggleRecipeCombinedModalVisible());
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={recipeCombinedModalVisible}
      maxWidth="lg"
      fullWidth={false}
    >
      <div className={classes.background}>
        <div className={classes.container}>
          <div className="w-100 d-flex justify-content-center align-items-center">
            <div className="d-flex justify-content-end" onClick={handleClose}>
              <img
                src="https://onerare-bucket.s3.ap-south-1.amazonaws.com/assets/icons/closeIcon.svg"
                alt="Onerare"
                className={classes.closeIcon}
              />
            </div>
            <Grid container>
              <Grid
                item
                xs={12}
                sm={9}
                style={{
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: "2vh",
                  paddingBottom: "2vh",
                }}
              >
                <Typography
                  variant="h2"
                  style={{ marginBottom: theme.spacing(2) }}
                >
                  {successful ? "Ready to serve" : "Burnt down the House"}
                </Typography>
                <Hidden smUp>img</Hidden>
                <Typography variant="body1">
                  {successful
                    ? "YOU ARE NOW THE PROUD OWNER OF THIS DISH."
                    : "OOPS ! LOOKS LIKE YOU DON’T HAVE ALL THE INGREDIENTS TO MAKE THIS DISH."}
                </Typography>
                <Button
                  variant="outlined"
                  sx={{
                    backgroundColor: "white",
                    paddingLeft: "2rem",
                    paddingRight: "2rem",
                    borderRadius: 4,
                    border: "1px solid black",
                    color: "#000",
                    mb: 2,
                    alignSelf: "center",
                  }}
                >
                  {successful
                    ? "VIEW DISH IN DASHBOARD"
                    : "CHECK YOUR INVENTORY"}
                </Button>
              </Grid>
              <Hidden smDown>
                <Grid item xs={12} sm={3} style={{ textAlign: "center" }}>
                  img
                </Grid>
              </Hidden>
            </Grid>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default RecipeCombinedModal;
