import React, { useEffect } from "react";
import { Box, Grid, Hidden, useMediaQuery, useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useSelector, useDispatch } from "react-redux";
import Seo from "../common/Seo";
import ethersServiceProvider from "../services/ethersServiceProvider";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
  },
  container_mobile: {
    width: "100%",
    height: "100%",
    overflow: "visible",
  },
}));

const DashboardPage = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("md"));
  const { selectedDashboardMenuItem, web3AuthReducer } = store.ui;

  return (
    <Box mb={4.6}>
      <Seo
        title="Dashboard | OneRare Foodverse"
        description="Take a look at your ORARE, Ingredients, Dishes and the Dish calculator — all in one place. See the Dashboard here."
        keywords="dashboard, metaverse dashboard, dashboard foodverse, foodverse status, dish calculator foodverse, nft game, metaverse game, game nft, nft metaverse, nft blockchain, metaverse blockchain, food metaverse, foodverse, food game, nft food, metaverse food game"
        image="https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/001/990/708/datas/original.png"
      />
      dsddsdsd
    </Box>
  );
};

export default DashboardPage;
