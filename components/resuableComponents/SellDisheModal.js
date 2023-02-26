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
  toggleSellDishModalVisible,
} from "../../reducers/UiReducer";
import CustomButton from "../resuableComponents/CustomButton";
import web3 from "../../web3";
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
const SellDishModal = ({ item, handleSellDish }) => {
  const store = useSelector((state) => state);
  const dishData = JSON.parse(item ? item.dishData.data : null);
  const classes = useStyles();
  const router = useRouter();

  const dispatch = useDispatch();
  const theme = useTheme();
  const [quantity, setQuantity] = useState(1);
  const sm = useMediaQuery(theme.breakpoints.down("md"));
  const xs = useMediaQuery(theme.breakpoints.down("sm"));
  const { sellDishModalVisible, sellBuyPopupCase } = store.ui;
  const [itemPrice, setItemPrice] = useState(null);

  const [successful, setSuccessful] = useState(false); // MOVE LOCAL STATE TO THE REDUCER WHEN API IMPLEMENTATION

  useEffect(() => {
    dispatch(setSellBuyPopupCase(0));
  }, []);

  const handleClose = () => {
    dispatch(toggleSellDishModalVisible());
    dispatch(setSellBuyPopupCase(0));
    router.push(`/farmersmarket/${item.dishData.id}`);
  };

  const handleCloseButton = () => {
    dispatch(toggleSellDishModalVisible());
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
      open={sellDishModalVisible}
      maxWidth="lg"
      fullWidth={false}
    >
      <div className={classes.background}>
        <div className={classes.container}>
          <div className="w-100 pe-sm-3 me-md-3">
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
              <Box p={xs && 4} pb={xs && 3}>
                <Box
                  text
                  pb={1}
                  className="d-flex justify-content-center align-items-center"
                >
                  <Hidden smUp>
                    <Grid item xs={12} sm={4} style={{ textAlign: "center" }}>
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        style={{ height: "100%" }}
                      >
                        <object
                          type="image/svg+xml"
                          data={dishData.animation_url}
                          style={{
                            height: 100,
                          }}
                        />
                      </Box>
                    </Grid>
                  </Hidden>
                </Box>
                <Typography width="100%" textAlign="center" variant="h2">
                  Create Offer
                </Typography>
                <Grid container>
                  <Hidden smDown>
                    <Grid item xs={12} sm={4} style={{ textAlign: "center" }}>
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems={"center"}
                        style={{ height: "100%" }}
                      >
                        <object
                          type="image/svg+xml"
                          data={dishData.animation_url}
                          style={{
                            marginBottom: theme.spacing(2.5),
                            height: 170,
                          }}
                        >
                          <img
                            src={dishData.animation_url}
                            alt={dishData.name}
                            style={{
                              height: 170,
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
                      paddingTop: !xs && "2vh",
                      paddingBottom: !xs && "2vh",
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
                          YOUR DISH HAS BEEN LISTED ON THE FARMER’S MARKET.
                          <br />
                          WE WILL INFORM YOU WHEN IT SELLS !
                        </Typography>
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
                        <Box width="100%" textAlign="left">
                          <Typography
                            variant="body1"
                            fontWeight="bold"
                            mb={!xs && 1}
                          >
                            DISH : {dishData.name}
                          </Typography>
                        </Box>
                        <Grid
                          container
                          border="1px solid #D7D7D7"
                          mb={xs ? 1 : 3}
                        >
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            py={2}
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                            bgcolor="background.default"
                            borderRight={!sm && "1px solid #D7D7D7"}
                            borderBottom={sm && "1px solid #D7D7D7"}
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
                                  onChange={(e) => {
                                    setQuantity(
                                      parseInt(
                                        Math.min(
                                          Math.max(e.target.value, 0),
                                          parseInt(item.dishCount, 10)
                                        ),
                                        10
                                      )
                                    );
                                  }}
                                  value={quantity}
                                  style={{ paddingLeft: 10, maxWidth: 50 }}
                                  InputProps={{ disableUnderline: true }}
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
                                  quantity === parseInt(item.dishCount, 10)
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
                            py={2}
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
                                  type="number"
                                  value={itemPrice}
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
                                  style={{ paddingLeft: 10 }}
                                  InputProps={{ disableUnderline: true }}
                                />
                              </Paper>
                            </Box>
                          </Grid>
                        </Grid>
                        <div className="d-flex justify-content-center align-items-center">
                          <CustomButton
                            style={{
                              width: "100%",
                              justifyContent: "space-between",
                            }}
                            onClick={() =>
                              handleSellDish(
                                item.dishData.id,
                                quantity,
                                web3.utils.toWei(itemPrice.toString(), "ether"),
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
                        </div>
                      </>
                    )}
                  </Grid>
                </Grid>
              </Box>
            )}
            {sellBuyPopupCase === 1 && (
              <div
                className="row flex-row align-items-center justify-content-center mt-4 mt-sm-0"
                style={{ height: "100%", width: "100%", margin: "0 auto" }}
              >
                <div className="col-sm-7 d-flex flex-column justify-content-center align-items-center">
                  <Typography variant="h2" className={classes.heading}>
                    Setting up your Shop
                  </Typography>
                  <Typography variant="h5" className={classes.para}>
                    WAITING FOR YOUR TRANSACTION TO CONFIRM
                  </Typography>
                </div>
                <div className="col-sm-5 d-flex justify-content-center align-items-center">
                  <object
                    type="image/svg+xml"
                    data="https://onerare-bucket.s3.ap-south-1.amazonaws.com/assets/images/Popup_BuyDish.svg"
                    style={{ width: "100%", maxWidth: 260 }}
                  />
                </div>
              </div>
            )}
            {sellBuyPopupCase === 2 && (
              <div
                className="row flex-row align-items-center justify-content-center mt-4 mt-sm-0"
                style={{ height: "100%", width: "100%", margin: "0 auto" }}
              >
                <div className="col-sm-7 d-flex flex-column justify-content-center align-items-center">
                  <Typography variant="h2" className={classes.heading}>
                    Setting up your Shop
                  </Typography>
                  <Typography variant="h5" className={classes.para}>
                    WAITING FOR YOUR TRANSACTION TO CONFIRM
                  </Typography>
                </div>
                <div className="col-sm-5 d-flex justify-content-center align-items-center">
                  <object
                    type="image/svg+xml"
                    data="https://onerare-bucket.s3.ap-south-1.amazonaws.com/assets/images/Popup_BuyDish.svg"
                    style={{ width: "100%", maxWidth: 300 }}
                  />
                </div>
              </div>
            )}
            {sellBuyPopupCase === 3 && (
              <div
                className="row flex-row align-items-center justify-content-center mt-4 mt-sm-0"
                style={{ height: "100%", width: "100%" }}
              >
                <div className="col-sm-7 d-flex flex-column justify-content-center align-items-center">
                  <Typography variant="h2" className={classes.heading}>
                    Setting up your Shop
                  </Typography>
                  <Typography variant="h5" className={classes.para}>
                    WAITING FOR YOUR TRANSACTION TO CONFIRM
                  </Typography>
                </div>
                <div className="col-sm-5 d-flex justify-content-center align-items-center">
                  <object
                    type="image/svg+xml"
                    data="https://onerare-bucket.s3.ap-south-1.amazonaws.com/assets/images/Popup_BuyDish.svg"
                    style={{ width: "100%", maxWidth: 260 }}
                  />
                </div>
              </div>
            )}
            {sellBuyPopupCase === 4 && (
              <div
                className="row flex-row align-items-center justify-content-center ps-sm-4 mt-2 mt-sm-0"
                style={{
                  height: "100%",
                  width: "100%",
                  margin: "0 auto",
                }}
              >
                <div className="col-sm-7 d-flex flex-column justify-content-center align-items-center">
                  <Typography variant="h2" className={classes.heading}>
                    Listed on the Market !
                  </Typography>
                  <Typography variant="h5" className={classes.para}>
                    YOUR DISH HAS BEEN LISTED ON THE FARMER’S MARKET. WE WILL
                    INFORM YOU WHEN IT SELLS !
                  </Typography>
                  <div className="text-center">
                    <Button
                      className={classes.listingButton}
                      onClick={handleClose}
                    >
                      CHECK YOUR LISTING
                    </Button>
                  </div>
                </div>
                <div className="col-sm-5 d-flex justify-content-center align-items-center">
                  <object
                    type="image/svg+xml"
                    data="https://onerare-bucket.s3.ap-south-1.amazonaws.com/assets/images/dish_finish.svg"
                    style={{ width: "100%", maxWidth: 260 }}
                  />
                </div>
              </div>
            )}
            {sellBuyPopupCase === 5 && (
              <div
                className="row flex-row align-items-center justify-content-center ps-sm-4 mt-5 mt-sm-0"
                style={{ height: "100%", width: "100%", margin: "0 auto" }}
              >
                <div className="col-sm-7 d-flex flex-column justify-content-center align-items-center">
                  <Typography variant="h2" className={classes.heading}>
                    Oops ! The Bag is torn.
                  </Typography>
                  <Typography variant="h5" className={classes.para}>
                    THERE HAS BEEN AN ERROR IN <br />
                    MAKING THE PURCHASE.
                  </Typography>
                  <div className="text-center">
                    <Button
                      className={classes.listingButton}
                      onClick={() =>
                        handleSellDish(
                          item.dishData.id,
                          quantity,
                          web3.utils.toWei(itemPrice.toString(), "ether"),
                          0
                        )
                      }
                      disabled={quantity === 0}
                    >
                      LET&apos;S TRY AGAIN
                    </Button>
                  </div>
                </div>
                <div className="col-sm-5 mt-3 mt-sm-0 d-flex justify-content-center align-items-center">
                  <object
                    type="image/svg+xml"
                    data="https://onerare-bucket.s3.ap-south-1.amazonaws.com/assets/images/Popup_Torn.svg"
                    style={{ width: "100%", maxWidth: xs ? 220 : 260 }}
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

export default SellDishModal;
