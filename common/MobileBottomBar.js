import React, { useState } from "react";
import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setDashboardMenuItem } from "../reducers/UiReducer";
import { makeStyles } from "@mui/styles";
import {
  DashboardSharp,
  ShoppingBagSharp,
  HistorySharp,
  LogoutSharp,
  LocalOfferSharp,
  LocalPizzaSharp,
  Analytics,
  Wallet,
  Pool,
  Money,
  Home,
  StackedBarChart,
  Cookie,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import { constants } from "../utils/constants";

const useStyles = makeStyles((theme) => ({
  tabs: {
    position: "fixed",
    left: 0,
    right: 0,
    bottom: 0,
    height: 50,
    zIndex: 101,
    boxShadow: "1px 5px 50px -17px #000000",
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    backgroundColor: "#212121",
  },
  tab: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: "2px",
    borderRight: "1px solid #414141",
    "&:last-child": {
      border: "none",
    },
  },
  tab_name: {
    textAlign: "center",
    fontSize: 11,
    fontWeight: 600,
    color: "#f9f9f9",
  },
}));

const MobileBottomBar = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const { dashboardMenuItems, selectedDashboardMenuItem } = store.ui;
  const theme = useTheme();

  const classes = useStyles();
  const sm = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();

  return (
    <Grid container className={classes.tabs}>
      <Grid
        item
        xs={3}
        className={classes.tab}
        value={"DASHBOARD"}
        onClick={() => dispatch(setDashboardMenuItem("DASHBOARD"))}
        bgcolor={
          selectedDashboardMenuItem === "DASHBOARD" && constants.highlighColor
        }
      >
        <Home style={{ color: "#f9f9f9" }} />
        <Typography variant="body2" className={classes.tab_name}>
          DASHBOARD
        </Typography>
      </Grid>
      <Grid
        item
        xs={3}
        className={classes.tab}
        value={"POOLS"}
        onClick={() => dispatch(setDashboardMenuItem("POOLS"))}
        bgcolor={
          selectedDashboardMenuItem === "POOLS" && constants.highlighColor
        }
      >
        <Cookie style={{ color: "#f9f9f9" }} />
        <Typography variant="body2" className={classes.tab_name}>
          Pools
        </Typography>
      </Grid>
      <Grid
        item
        xs={3}
        className={classes.tab}
        value={"ACTIVITIES"}
        onClick={() => dispatch(setDashboardMenuItem("ACTIVITIES"))}
        bgcolor={
          selectedDashboardMenuItem === "ACTIVITIES" && constants.highlighColor
        }
      >
        <StackedBarChart style={{ color: "#f9f9f9" }} />
        <Typography variant="body2" className={classes.tab_name}>
          Activities
        </Typography>
      </Grid>
      <Grid
        item
        xs={3}
        className={classes.tab}
        value={"WALLET"}
        onClick={() => dispatch(setDashboardMenuItem("WALLET"))}
        bgcolor={
          selectedDashboardMenuItem === "WALLET" && constants.highlighColor
        }
      >
        <Wallet style={{ color: "#f9f9f9" }} />
        <Typography variant="body2" className={classes.tab_name}>
          Wallet
        </Typography>
      </Grid>
    </Grid>
  );
};

export default MobileBottomBar;
