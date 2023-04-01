import React, { useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  IconButton,
  Dialog,
  Button,
  Divider,
  List,
  ListItemAvatar,
  ListItemText,
  ListItem,
  Backdrop,
  Slide,
  Typography,
  Box,
  Input,
} from "@mui/material";
import { Close } from "@mui/icons-material";

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
    paddingTop: 20,
    paddingBottom: 20,
    maxHeight: 700,
    maxWidth: 400,
    position: "relative",
    background: "#000000",
    border: "2px solid #bdbdbd",
    display: "flex",
    alignItems: "center",
    zIndex: 11,
    borderRadius: 10,
    [theme.breakpoints.down("md")]: {
      border: "1px solid #bdbdbd",
      width: "100%",
      maxWidth: "95%",
      height: 350,
    },
    [theme.breakpoints.down("sm")]: {
      height: "max-content",
    },
  },
  heading: {
    fontSize: 18,
    fontWeight: 400,
    textAlign: "left",

    color: theme.palette.secondary.main,
    [theme.breakpoints.down("sm")]: {
      fontSize: 20,
    },
  },

  input: {
    backgroundColor: "transparent",
    height: 50,
    border: "1px solid rgba(224, 224, 224,1)",
    borderRadius: 15,
    fontSize: 18,
    width: "90%",
    color: theme.palette.secondary.main,
    padding: 10,
    outline: "none",
    [theme.breakpoints.down("sm")]: {
      height: 45,
      fontSize: 15,
    },
  },
  buttons: {
    marginBottom: 7,
  },

  closeIcon: {
    color: "#f9f9f9",
    fontSize: 24,
    [theme.breakpoints.down("sm")]: {
      fontSize: 20,
    },
  },
  cancelButton: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.iconColor,
    width: "100%",
    textTransform: "none",
    fontSize: 17,
    borderRadius: 20,
    padding: "8px 50px 8px 50px",

    [theme.breakpoints.down("sm")]: {
      fontSize: 16,
    },
  },
  list: {
    minHeight: 400,
    maxHeight: 550,
    overflowX: "scroll",
  },
  input: {
    fontSize: 14,
    borderRadius: 10,
  },
}));

let tokenList = [
  {
    name: "Polkabridge",
    symbol: "PBR",
    address: "0x298d492e8c1d909D3F63Bc4A36C66c64ACB3d695",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/13744/small/symbol-whitebg200x200.png?1611377553",
  },
  {
    name: "OneRare",
    symbol: "ORARE",
    address: "0xff2382bd52efacef02cc895bcbfc4618608aa56f",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/19696/small/Thumbnail_-_500_px_-_Black.png?1635751681",
  },

  {
    name: "Ethereum",
    symbol: "ETH",
    address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880",
  },

  {
    name: "1INCH Token",
    symbol: "1INCH",
    address: "0x111111111117dc0aa78b770fa6a738034120c302",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/13469/small/1inch-token.png?1608803028",
  },

  {
    name: "Aave Token",
    symbol: "AAVE",
    address: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/12645/small/AAVE.png?1601374110",
  },
  {
    name: "Amp",
    symbol: "AMP",
    address: "0xfF20817765cB7f73d4bde2e66e067E58D11095C2",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/12409/small/amp-200x200.png?1599625397",
  },
  {
    name: "Matic Token",
    symbol: "MATIC",
    address: "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png?1624446912",
  },
  {
    name: "Wrapped Bitcoin",
    symbol: "WBTC",
    address: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png?1548822744",
  },
  {
    name: "wDogecoin",
    symbol: "WDOGE",
    address: "0xf40c1f421ee02a550afdd8712ef34dce97eec6f2",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/5/small/dogecoin.png?1547792256",
  },
  {
    name: "Shiba Inu",
    symbol: "SHIB",
    address: "0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/11939/small/shiba.png?1622619446",
  },
  {
    name: "Maker",
    symbol: "MKR",
    address: "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/1364/small/Mark_Maker.png?1585191826",
  },
  {
    name: "Compound",
    symbol: "COMP",
    address: "0xc00e94cb662c3520282e6f5717214004a7f26888",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/10775/small/COMP.png?1592625425",
  },
  {
    name: "The Sandbox",
    symbol: "SAND",
    address: "0x3845badAde8e6dFF049820680d1F14bD3903a5d0",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/12129/small/sandbox_logo.jpg?1597397942",
  },
  {
    name: "Uniswap",
    symbol: "UNI",
    address: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
    logoURI:
      "https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png?1600306604",
  },
  {
    name: "Balancer",
    symbol: "BAL",
    address: "0xba100000625a3754423978a60c9317c58a424e3D",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/11683/small/Balancer.png?1592792958",
  },
  {
    name: "Curve DAO Token",
    symbol: "CRV",
    address: "0xD533a949740bb3306d119CC777fa900bA034cd52",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/12124/small/Curve.png?1597369484",
  },
  {
    name: "The Graph",
    symbol: "GRT",
    address: "0xc944e90c64b2c07662a292be6244bdf05cda44a7",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/13397/small/Graph_Token.png?1608145566",
  },
  {
    name: "Kyber Network Crystal v2",
    symbol: "KNC",
    address: "0xdeFA4e8a7bcBA345F687a2f1456F5Edd9CE97202",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/14899/small/RwdVsGcw_400x400.jpg?1618923851",
  },
  {
    name: "Decentraland",
    symbol: "MANA",
    address: "0x0f5d2fb29fb7d3cfee444a200298f468908cc942",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/878/small/decentraland-mana.png?1550108745",
  },

  {
    name: "Basic Attention Token",
    symbol: "BAT",
    address: "0x0d8775f648430679a709e98d2b0cb6250d2887ef",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/677/small/basic-attention-token.png?1547034427",
  },
];

const imagePath = (address) =>
  `https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
export const SelectTokenDialog = ({
  selectTokenPopup,
  handleClose,
  setSelectedToken,
}) => {
  const classes = useStyles();

  return (
    <Dialog
      onClose={handleClose}
      open={selectTokenPopup}
      TransitionComponent={Transition}
      keepMounted={false}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      maxWidth="lg"
      fullWidth={false}
    >
      {console.log(selectTokenPopup)}
      <div className={classes.background}>
        <div className={classes.container}>
          <div style={{ width: "100%" }}>
            <Box
              className="d-flex justify-content-between"
              style={{ width: "100%" }}
            >
              <Typography variant="h6" fontWeight={600} lineHeight={1}>
                Select a token
              </Typography>
              <IconButton
                style={{ margin: 0, padding: 0 }}
                onClick={handleClose}
              >
                <Close className={classes.closeIcon} />
              </IconButton>
            </Box>

            {/* <Input
              type="text"
              disableUnderline
              style={{
                fontSize: 14,
                fontWeight: 400,
                color: "#f9f9f9",
                border: "1px solid #bdbdbd",
                borderRadius: 12,
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 6,
                paddingBottom: 6,
              }}
              fullWidth
              value={filterInput}
              placeholder="Search name or paste address"
              onChange={({ target: { value } }) => handleTokenFilter(value)}
            /> */}

            <List className={classes.list}>
              {tokenList.map((token, index) => (
                <ListItem
                  style={{ height: 65, cursor: "pointer" }}
                  key={index}
                  onClick={() => {
                    setSelectedToken(token);
                    handleClose();
                  }}
                >
                  <ListItemAvatar>
                    <img
                      src={imagePath(token.address)}
                      alt={""}
                      style={{ height: 32, borderRadius: "50%" }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        color={"#f9f9f9"}
                        lineHeight={1}
                        padding={0}
                        noWrap
                        margin={0}
                        spacing={0}
                        gutterBottom={0}
                      >
                        {token.symbol}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="small"
                        lineHeight={1}
                        noWrap
                        style={{ fontSize: 10 }}
                      >
                        {token.name}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
