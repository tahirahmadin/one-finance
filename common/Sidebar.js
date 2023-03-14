import React, { useState } from "react";
import { Box, useTheme, Typography, Paper, useMediaQuery } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useSelector, useDispatch } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { BarChart, Explore, Help, Logout, Telegram } from "@mui/icons-material";
import { setMenuIndex } from "../reducers/UiReducer";

const useStyles = makeStyles((theme) => ({
  root: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    backgroundColor: "#1D1D21",
  },
  inputRoot: {
    backgroundColor: "#6F6F6F",
    height: "100%",
  },
  input: {
    border: "2px solid #bdbdbd",
    outline: "none",

    "&:active": {
      outline: "none",
    },
  },
  menuTitle: {
    fontWeight: 600,
    fontSize: 16,
    lineHeight: "30px",
    color: "white",
  },
}));

const SideBar = ({}) => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();

  const sm = useMediaQuery(theme.breakpoints.down("md"));
  const { menuIndex } = store.ui;

  return (
    <Box
      style={{ position: "fixed" }}
      px={2}
      pt={3}
      pb={2}
      bgcolor={"#0C0D10"}
      display="flex"
      flexDirection="column"
      height="100%"
      minWidth={240}
    >
      <Box>
        <Box py={2}>
          <Typography variant="body2" pb={1} style={{ color: "white" }}>
            <img
              src="https://cdn3d.iconscout.com/3d/free/thumb/squigly-globe-3494833-2926648@0.png"
              height="40px"
            />{" "}
            SleepSwap
          </Typography>
        </Box>
        <Box pt={5}>
          <Paper
            onClick={() => dispatch(setMenuIndex(0))}
            key={0}
            sx={{
              boxShadow: 0,

              bgcolor:
                menuIndex === 0 ? `rgba(130, 71, 229, 0.3)` : "transparent",
              py: 2,
              px: 2,
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              borderRadius: 2,
            }}
          >
            <Explore style={{ marginRight: 10, color: "white" }} />
            <Typography variant="title1" className={classes.menuTitle}>
              Pools
            </Typography>
          </Paper>

          <Paper
            onClick={() => dispatch(setMenuIndex(1))}
            key={1}
            sx={{
              boxShadow: 0,
              borderRadius: 2,
              bgcolor:
                menuIndex === 1 ? `rgba(130, 71, 229, 0.3)` : "transparent",
              py: 2,
              px: 2,
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <BarChart style={{ marginRight: 10, color: "white" }} />
            <Typography variant="title1" className={classes.menuTitle}>
              Porfolio
            </Typography>
          </Paper>
          <Paper
            onClick={() => dispatch(setMenuIndex(2))}
            key={0}
            sx={{
              boxShadow: 0,

              bgcolor:
                menuIndex === 2 ? `rgba(130, 71, 229, 0.3)` : "transparent",
              py: 2,
              px: 2,
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              borderRadius: 2,
            }}
          >
            <Telegram style={{ marginRight: 10, color: "white" }} />
            <Typography variant="title1" className={classes.menuTitle}>
              Community
            </Typography>
          </Paper>
          <Paper
            onClick={() => dispatch(setMenuIndex(3))}
            key={0}
            sx={{
              boxShadow: 0,

              bgcolor:
                menuIndex === 3 ? `rgba(130, 71, 229, 0.3)` : "transparent",
              py: 2,
              px: 2,
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              borderRadius: 2,
            }}
          >
            <Help style={{ marginRight: 10, color: "white" }} />
            <Typography variant="title1" className={classes.menuTitle}>
              FAQs
            </Typography>
          </Paper>
          <Paper
            onClick={() => dispatch(setMenuIndex(3))}
            key={0}
            sx={{
              boxShadow: 0,

              bgcolor:
                menuIndex === 3 ? `rgba(130, 71, 229, 0.3)` : "transparent",
              py: 2,
              px: 2,
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              borderRadius: 2,
            }}
          >
            <Logout style={{ marginRight: 10, color: "white" }} />
            <Typography variant="title1" className={classes.menuTitle}>
              Logout
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default SideBar;
