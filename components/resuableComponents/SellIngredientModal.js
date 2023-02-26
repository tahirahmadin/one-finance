import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Dialog,
  useMediaQuery,
  Typography,
  Hidden,
  Button,
  useTheme,
  Paper,
  Input,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useSelector, useDispatch } from "react-redux";
import {
  setSellBuyPopupCase,
  toggleSellIngredientModalVisible,
} from "../../reducers/UiReducer";
import CustomButton from "../resuableComponents/CustomButton";
import Web3 from "web3";
import { useRouter } from "next/router";

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
      height: 450,
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
  listingButton: {
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

const SellIngredientModal = ({ item, handleSellIngredient }) => {
  const classes = useStyles();

  const ingrData = item && JSON.parse(item.ingredientData.data);
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const theme = useTheme();
  const router = useRouter();

  const [quantity, setQuantity] = useState(1);
  const sm = useMediaQuery(theme.breakpoints.down("md"));
  const xs = useMediaQuery(theme.breakpoints.down("sm"));
  const { sellIngredientModalVisible, sellBuyPopupCase } = store.ui;

  const [itemPrice, setItemPrice] = useState(null);
  const [successful, setSuccessful] = useState(false); // MOVE LOCAL STATE TO THE REDUCER WHEN API IMPLEMENTATION

  useEffect(() => {
    dispatch(setSellBuyPopupCase(0));
  }, []);

  const handleClose = () => {
    dispatch(toggleSellIngredientModalVisible());
    dispatch(setSellBuyPopupCase(0));
    router.push(`/farmersmarket/${item.ingredientData.tokenId}#offers`);
  };

  const handleCloseButton = () => {
    dispatch(toggleSellIngredientModalVisible());
    dispatch(setSellBuyPopupCase(0));
  };

  const handlePriceInput = (value) => {
    const re = /^[0-9\b]+$/;

    // if value is not blank, then test the regex
    if (value === "") {
      setItemPrice(null);
    } else if (re.test(value) && parseInt(value) >= 0) {
      setItemPrice(value);
    }
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={sellIngredientModalVisible}
      maxWidth="lg"
      fullWidth={false}
    >
      <div className={classes.background}>
        <div className={classes.container}>
          <div className="w-100 pe-sm-4 pe-md-4 me-md-1">
            <div
              className="d-flex justify-content-end"
              onClick={handleCloseButton}
            >
              <img
                src="https://onerare-bucket.s3.ap-south-1.amazonaws.com/assets/icons/closeIcon.svg"
                alt="Onerare"
                className={classes.closeIcon}
              />
            </div>
            {sellBuyPopupCase === 0 && (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  px: xs && 4,
                  mt: xs && 2,
                  mb: xs ? 4 : 2,
                }}
              >
                <Box
                  text
                  pb={2}
                  className="d-flex flex-column justify-content-center align-items-center"
                >
                  <Hidden smUp>
                    <Grid item xs={12} sm={4} style={{ textAlign: "center" }}>
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        style={{ height: 120 }}
                      >
                        <object
                          type="image/svg+xml"
                          data={ingrData.animation_url}
                          style={{ height: 120 }}
                          className={classes.svgImage}
                        >
                          <img
                            src={ingrData.animation_url}
                            alt={ingrData.name}
                            style={{
                              marginBottom: theme.spacing(1.5),
                              height: 190,
                            }}
                          />
                        </object>
                      </Box>
                    </Grid>
                  </Hidden>
                  <Typography variant="h2">Create Offer</Typography>
                  <Hidden smUp>
                    <Typography variant="body1" fontWeight="bold" mb={1}>
                      INGREDIENT : {ingrData.name}
                    </Typography>
                  </Hidden>
                </Box>
                <Grid
                  container
                  style={{
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: "2vh",
                    paddingBottom: "2vh",
                    height: 190,
                  }}
                >
                  <Hidden smDown>
                    <Grid item xs={12} sm={4} style={{ textAlign: "center" }}>
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems={"center"}
                        style={{ height: 240 }}
                      >
                        <object
                          type="image/svg+xml"
                          data={ingrData.animation_url}
                          style={{ height: 190 }}
                          className={classes.svgImage}
                        >
                          <img
                            src={ingrData.animation_url}
                            alt={ingrData.name}
                            style={{
                              marginBottom: theme.spacing(1.5),
                              height: 190,
                            }}
                          />
                        </object>
                      </Box>
                    </Grid>
                  </Hidden>

                  <Grid
                    item
                    xs={12}
                    sm={8}
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
                    {successful ? (
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
                          height: 248,
                        }}
                      >
                        <Typography
                          variant="h2"
                          style={{ marginBottom: theme.spacing(2) }}
                        >
                          Listed on the Market !
                        </Typography>
                        <Hidden smUp>
                          <object
                            type="image/svg+xml"
                            // data={JuiceCornflakes}
                            className={classes.svgImage}
                            style={{
                              marginBottom: theme.spacing(3),
                              height: 200,
                            }}
                          >
                            <img
                              //   src={JuiceCornflakes}
                              alt="juice and cornflakes"
                              style={{
                                height: 200,
                                marginBottom: theme.spacing(5),
                                objectFit: "contain",
                              }}
                            />
                          </object>
                        </Hidden>
                        <Typography
                          variant="body1"
                          style={{ marginBottom: theme.spacing(5) }}
                        >
                          YOUR CROP HAS BEEN LISTED ON THE FARMER’S MARKET.
                          <br />
                          WE WILL INFORM YOU WHEN IT SELLS !
                        </Typography>{" "}
                        <Button
                          style={{
                            borderRadius: 12,
                            paddingLeft: theme.spacing(5),
                            paddingRight: theme.spacing(5),
                            border: "1px solid black",
                          }}
                          fullWidth={sm && true}
                          variant="outlined"
                          color="secondary"
                          onClick={handleClose}
                        >
                          CHECK YOUR LISTING
                        </Button>
                      </Grid>
                    ) : (
                      <>
                        <Hidden smDown>
                          <Box width="100%" textAlign="left">
                            <Typography
                              variant="body1"
                              fontWeight="bold"
                              mb={2}
                            >
                              INGREDIENT : {ingrData.name}
                            </Typography>
                          </Box>
                        </Hidden>
                        <Grid container border="1px solid #D7D7D7" mb={3}>
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            py={xs ? 1 : 2}
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                            bgcolor="background.default"
                            borderRight={!xs && "1px solid #D7D7D7"}
                            borderBottom={xs && "1px solid #D7D7D7"}
                          >
                            <Typography
                              variant="body2"
                              fontWeight="bold"
                              mb={1}
                            >
                              QUANTITY
                            </Typography>
                            <Box
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                            >
                              <Button
                                variant="contained"
                                sx={{
                                  borderRadius: "50%",
                                  boxShadow: 0,
                                  width: 25,
                                  height: 25,
                                  minWidth: 0,
                                  padding: 0,
                                  bgcolor: "#000",
                                }}
                                onClick={() => setQuantity(quantity - 1)}
                                disabled={quantity === 0}
                              >
                                <img
                                  src="https://onerare-bucket.s3.ap-south-1.amazonaws.com/assets/images/MinusIcon.svg"
                                  alt="minus"
                                />
                              </Button>
                              <Paper
                                sx={{
                                  boxShadow: 0,
                                  borderRadius: 0,
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  mx: 1,
                                  px: 4,
                                  border: "1px solid #D7D7D7",
                                }}
                              >
                                <Input
                                  type="number"
                                  disableUnderline
                                  onChange={(e) => {
                                    setQuantity(
                                      parseInt(
                                        Math.min(
                                          Math.max(e.target.value, 0),
                                          parseInt(item.ingredientCount, 10)
                                        ),
                                        10
                                      )
                                    );
                                  }}
                                  value={quantity || ""}
                                  style={{ paddingLeft: 10, maxWidth: 50 }}
                                />
                              </Paper>
                              <Button
                                variant="contained"
                                sx={{
                                  borderRadius: "50%",
                                  boxShadow: 0,
                                  width: 25,
                                  height: 25,
                                  minWidth: 0,
                                  padding: 0,
                                  bgcolor: "#000",
                                }}
                                onClick={() =>
                                  setQuantity(parseInt(quantity) + 1)
                                }
                                disabled={
                                  quantity ===
                                  parseInt(item.ingredientCount, 10)
                                }
                              >
                                <img
                                  src="https://onerare-bucket.s3.ap-south-1.amazonaws.com/assets/images/PlusIcon.svg"
                                  alt="plus"
                                />
                              </Button>
                            </Box>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            py={xs ? 1 : 2}
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                            bgcolor="background.default"
                          >
                            <Typography
                              variant="body2"
                              fontWeight="bold"
                              mb={1}
                            >
                              PRICE
                            </Typography>
                            <Box
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                            >
                              <Paper
                                sx={{
                                  boxShadow: 0,
                                  borderRadius: 0,
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  mx: 1,
                                  px: 4,
                                  border: "1px solid #D7D7D7",
                                }}
                              >
                                <img
                                  src="https://onerare-bucket.s3.ap-south-1.amazonaws.com/assets/images/GreyedOutLogo.svg"
                                  alt="greyed out logo"
                                />

                                <Input
                                  disableUnderline
                                  type="number"
                                  onChange={(e) =>
                                    handlePriceInput(e.target.value)
                                  }
                                  onKeyDown={(e) => {
                                    if (
                                      e.key === "e" ||
                                      e.key === "E" ||
                                      e.key === "-" ||
                                      e.key === "+" ||
                                      e.key === "."
                                    ) {
                                      e.preventDefault();
                                    }
                                  }}
                                  value={itemPrice || ""}
                                  style={{ paddingLeft: 10 }}
                                />
                              </Paper>
                            </Box>
                          </Grid>
                        </Grid>
                        <CustomButton
                          style={{
                            width: "100%",
                            justifyContent: "space-between",
                          }}
                          onClick={() =>
                            handleSellIngredient(
                              item.ingredientData.tokenId,
                              quantity,
                              Web3.utils.toWei(itemPrice.toString(), "ether"),
                              0
                            )
                          }
                          disabled={
                            quantity === 0 ||
                            !itemPrice ||
                            parseInt(itemPrice, 10) <= 0
                          }
                        >
                          {sm ? "LIST ON MARKET" : "LIST ON FARMER’S MARKET"}
                        </CustomButton>
                      </>
                    )}
                  </Grid>
                </Grid>
              </Box>
            )}

            {sellBuyPopupCase === 1 && (
              <div
                className="row flex-row align-items-center justify-content-center my-4 my-md-0"
                // style={{ gap: 5 }}
              >
                <div className="col-sm-7 d-flex flex-column align-items-center justify-content-center">
                  <Typography variant="h2" className={classes.heading}>
                    Almost Ready !
                  </Typography>
                  <Typography variant="h5" className={classes.para}>
                    CONFIRM THIS TRANSACTION WITH YOUR WALLET TO CONTINUE
                  </Typography>
                </div>
                <div className="col-sm-5 mt-2 d-flex align-items-center justify-content-center">
                  <object
                    type="image/svg+xml"
                    data="https://onerare-bucket.s3.ap-south-1.amazonaws.com/assets/images/cake_mixer.svg"
                    className={classes.svgImage}
                  />
                </div>
              </div>
            )}
            {(sellBuyPopupCase === 2 || sellBuyPopupCase === 3) && (
              <div
                className="row flex-row align-items-center justify-content-center mt-4 mt-sm-0"
                // style={{ gap: 5 }}
              >
                <div className="col-sm-7 d-flex flex-column align-items-center justify-content-center">
                  <Typography variant="h2" className={classes.heading}>
                    Loading the Truck!
                  </Typography>
                  <Typography variant="h5" className={classes.para}>
                    WAITING FOR YOUR <br />
                    TRANSACTION TO CONFIRM
                  </Typography>
                </div>
                <div className="col-sm-5 d-flex align-items-center justify-content-center">
                  <object
                    type="image/svg+xml"
                    data="https://onerare-bucket.s3.ap-south-1.amazonaws.com/assets/images/truck.svg"
                    className={classes.svgImage}
                    style={{ width: "90%" }}
                  />
                </div>
              </div>
            )}
            {sellBuyPopupCase === 4 && (
              <div className="row flex-row align-items-center justify-content-center my-4 my-md-0">
                <div className="col-sm-7 d-flex flex-column align-items-center justify-content-center">
                  <Typography variant="h2" className={classes.heading}>
                    Listed on the Market !
                  </Typography>
                  <Typography variant="h5" className={classes.para}>
                    YOUR CROP HAS BEEN LISTED ON THE FARMER’S MARKET. <br />
                    WE WILL INFORM YOU WHEN IT SELLS !
                  </Typography>
                  <div className="text-center">
                    <Button
                      className={classes.listingButton}
                      onClick={handleClose}
                    >
                      Check Your Listing
                    </Button>
                  </div>
                </div>
                <div className="col-sm-5 mt-2 d-flex align-items-center justify-content-center">
                  <object
                    type="image/svg+xml"
                    data="https://onerare-bucket.s3.ap-south-1.amazonaws.com/assets/images/cake_mixer.svg"
                    className={classes.svgImage}
                  />
                </div>
              </div>
            )}

            {sellBuyPopupCase === 5 && (
              <div
                className="row flex-row align-items-center justify-content-center my-4 my-md-0"
                //  style={{ gap: 5 }}
              >
                <div className="col-sm-7">
                  <div>
                    <Typography variant="h2" className={classes.heading}>
                      Oops ! Burnt Bread !
                    </Typography>
                    <Typography variant="h5" className={classes.para}>
                      Error in listing to the farmer&apos;s market. <br />
                    </Typography>
                    <div className="text-center">
                      <Button
                        className={classes.listingButton}
                        onClick={() =>
                          handleSellIngredient(
                            item.ingredientData.tokenId,
                            quantity,
                            Web3.utils.toWei(itemPrice.toString(), "ether"),
                            0
                          )
                        }
                      >
                        Try Again
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="col-sm-5 mt-2 d-flex align-items-center justify-content-center">
                  <object
                    type="image/svg+xml"
                    data={
                      "https://onerare-bucket.s3.ap-south-1.amazonaws.com/assets/images/toaster.svg"
                    }
                    className={classes.svgImage}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default SellIngredientModal;
