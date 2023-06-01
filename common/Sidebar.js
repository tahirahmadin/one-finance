import React, { useState } from "react";
import { Box, useTheme, Typography, Paper, useMediaQuery } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useSelector, useDispatch } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import {
  BarChart,
  EmojiEvents,
  Explore,
  Help,
  Logout,
  Telegram,
  Timeline,
  Wallet,
} from "@mui/icons-material";
import { setMenuIndex } from "../reducers/UiReducer";
import Link from "next/link";
import { constants } from "../utils/constants";

const useStyles = makeStyles((theme) => ({
  root: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    backgroundColor: constants.baseColorLight,
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
    fontSize: 14,
    lineHeight: 1,
    color: "#bdbdbd",
  },
  selectedMenuTitle: {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 1,
    color: "#f9f9f9",
  },
  selectedPaper: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: 7,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    marginBottom: 7,
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
              src="https://www.sleepswap.io/SleepSwap_Plain.png"
              height="45px"
            />
            <strong>Sleep</strong>Swap
          </Typography>
        </Box>

        <Box display={"flex"} justifyContent={"start"}>
          <Box pr={1}>
            <img
              src="https://cdn.pixabay.com/photo/2023/02/24/00/41/ai-generated-7809880_1280.jpg"
              style={{
                color: "white",
                height: 40,
                width: 40,
                borderRadius: 10,
              }}
            />
          </Box>
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
          >
            <Typography
              variant="smallheading"
              style={{
                color: "white",
                fontWeight: 600,
              }}
            >
              $23,435
            </Typography>

            <Typography
              variant="small"
              style={{ color: "#bdbdbd", lineHeight: 1 }}
            >
              Wallet Balance
            </Typography>
          </Box>
        </Box>
        <Box pt={5}>
          <Box
            onClick={() => dispatch(setMenuIndex(0))}
            key={0}
            className={classes.selectedPaper}
            sx={{
              boxShadow: 0,
              bgcolor:
                menuIndex === 0 ? constants.highlighColor : "transparent",
            }}
          >
            <Explore style={{ marginRight: 10, color: "white" }} />

            <Typography
              variant="smallheading"
              className={
                menuIndex === 0 ? classes.selectedMenuTitle : classes.menuTitle
              }
            >
              Strategy Pools
            </Typography>
          </Box>
          <Link href="/" style={{ textDecoration: "none" }}>
            <Box
              onClick={() => dispatch(setMenuIndex(1))}
              key={1}
              className={classes.selectedPaper}
              sx={{
                boxShadow: 0,
                bgcolor:
                  menuIndex === 1 ? constants.highlighColor : "transparent",
              }}
            >
              <EmojiEvents
                style={{
                  marginRight: 10,
                  color: menuIndex === 1 ? "white" : "#bdbdbd",
                }}
              />
              <Typography
                variant="title1"
                className={
                  menuIndex === 1
                    ? classes.selectedMenuTitle
                    : classes.menuTitle
                }
              >
                Rewards
              </Typography>
            </Box>
          </Link>
          <Link href="/" style={{ textDecoration: "none" }}>
            <Paper
              onClick={() => dispatch(setMenuIndex(2))}
              key={1}
              className={classes.selectedPaper}
              sx={{
                boxShadow: 0,
                bgcolor:
                  menuIndex === 2 ? constants.highlighColor : "transparent",
              }}
            >
              <BarChart
                style={{
                  marginRight: 10,
                  color: menuIndex === 2 ? "white" : "#bdbdbd",
                }}
              />
              <Typography
                variant="title1"
                className={
                  menuIndex === 2
                    ? classes.selectedMenuTitle
                    : classes.menuTitle
                }
              >
                Leaderboard
              </Typography>
            </Paper>
          </Link>
          {/* <Link href="/" style={{ textDecoration: "none" }}>
            {" "}
            <Paper
              onClick={() => dispatch(setMenuIndex(3))}
              key={1}
              sx={{
                boxShadow: 0,
                borderRadius: 2,
                bgcolor:
                  menuIndex === 3 ? `rgba(130, 71, 229, 0.3)` : "transparent",
                py: 2,
                px: 2,
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <Wallet style={{ marginRight: 10, color: "white" }} />
              <Typography variant="title1" className={classes.menuTitle}>
                Porfolio
              </Typography>
            </Paper>
          </Link> */}
          <Link href="/" style={{ textDecoration: "none" }}>
            <Paper
              onClick={() => dispatch(setMenuIndex(4))}
              key={1}
              className={classes.selectedPaper}
              sx={{
                boxShadow: 0,
                bgcolor:
                  menuIndex === 4 ? constants.highlighColor : "transparent",
              }}
            >
              <Timeline
                style={{
                  marginRight: 10,
                  color: menuIndex === 4 ? "white" : "#bdbdbd",
                }}
              />
              <Typography
                variant="title1"
                className={
                  menuIndex === 4
                    ? classes.selectedMenuTitle
                    : classes.menuTitle
                }
              >
                My Activities
              </Typography>
            </Paper>
          </Link>
          <Link href="/" style={{ textDecoration: "none" }}>
            <Paper
              onClick={() => dispatch(setMenuIndex(5))}
              key={5}
              className={classes.selectedPaper}
              sx={{
                boxShadow: 0,
                bgcolor:
                  menuIndex === 5 ? constants.highlighColor : "transparent",
              }}
            >
              <Telegram
                style={{
                  marginRight: 10,
                  color: "white",
                  color: menuIndex === 5 ? "white" : "#bdbdbd",
                }}
              />
              <Typography
                variant="title1"
                className={
                  menuIndex === 5
                    ? classes.selectedMenuTitle
                    : classes.menuTitle
                }
              >
                Community
              </Typography>
            </Paper>
          </Link>
          <Link href="/" style={{ textDecoration: "none" }}>
            {" "}
            <Paper
              onClick={() => dispatch(setMenuIndex(6))}
              key={6}
              className={classes.selectedPaper}
              sx={{
                boxShadow: 0,
                bgcolor:
                  menuIndex === 6 ? constants.highlighColor : "transparent",
              }}
            >
              <Help
                style={{
                  marginRight: 10,
                  color: menuIndex === 6 ? "white" : "#bdbdbd",
                }}
              />
              <Typography
                variant="title1"
                className={
                  menuIndex === 6
                    ? classes.selectedMenuTitle
                    : classes.menuTitle
                }
              >
                How To Use
              </Typography>
            </Paper>
          </Link>
          <Link href="/" style={{ textDecoration: "none" }}>
            <Paper
              onClick={() => dispatch(setMenuIndex(7))}
              key={0}
              className={classes.selectedPaper}
              sx={{
                boxShadow: 0,
                bgcolor:
                  menuIndex === 7 ? constants.highlighColor : "transparent",
              }}
            >
              <Logout
                style={{
                  marginRight: 10,
                  color: menuIndex === 7 ? "white" : "#bdbdbd",
                }}
              />
              <Typography
                variant="title1"
                className={
                  menuIndex === 7
                    ? classes.selectedMenuTitle
                    : classes.menuTitle
                }
              >
                Logout
              </Typography>
            </Paper>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default SideBar;
