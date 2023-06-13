import React, { useCallback, useEffect, useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { TrendingUp } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  pageTitle: {
    fontWeight: 600,
    color: "#212121",
    textAlign: "left",
  },

  pageSubtitle: {
    color: "#616161",
    textAlign: "left",
  },
  cardTop: {
    backgroundColor: "#0C0D11",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 40,
    width: "100%",
    height: "100%",
    minHeight: 220,
    border: "1px solid #1b1d24",
    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.03)",
    borderRadius: 14,
    "&:hover": {
      boxShadow: "0px 24px 33px -9px #0000005C",
    },

    [theme.breakpoints.down("md")]: {
      height: "100%",
      width: "100%",
    },
  },
  card: {
    padding: 20,
    width: "100%",
    border: "1px solid #2d2d32",
    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.03)",
    borderRadius: 30,
    "&:hover": {
      boxShadow: "0px 24px 33px -9px #0000005C",
    },
    [theme.breakpoints.down("md")]: {
      height: "100%",
      width: "100%",
    },
  },
  statsCard: {
    padding: 10,
    width: "100%",
    border: "1px solid #2d2d32",
    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.03)",
    borderRadius: 12,
    "&:hover": {
      boxShadow: "0px 24px 33px -9px #0000005C",
    },
    [theme.breakpoints.down("md")]: {
      height: "100%",
      width: "100%",
    },
  },
  statsCardHeading: {
    fontWeight: 600,
    color: "#e5e5e5",
    textAlign: "left",
  },
  statsCardPara: {
    textAlign: "left",
    fontSize: 13,
    fontWeight: 300,
  },

  title: {
    fontWeight: 600,
    fontSize: 32,
    color: "#e5e5e5",
    textAlign: "left",
  },
  heading: {
    fontWeight: 600,
    color: "#e5e5e5",
    textAlign: "left",
  },
  inputWrapper: {
    border: "1px solid #2d2d32",
    padding: "2px 20px 2px 20px",
    borderRadius: 10,
    backgroundColor: "rgba(106, 85, 234,0.03)",
  },

  actionButton: {
    borderRadius: 14,
    background: "rgba(130, 71, 229, 0.7)",
    padding: "12px 20px 12px 20px",
    color: "white",
    width: "100%",
    marginTop: 20,
    fontWeight: 600,
    fontSize: 16,
    "&:hover": {
      background: "rgba(130, 71, 229, 0.9)",
    },
  },
}));

export default function AccumulationTopHeader() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Box
      className={classes.cardTop}
      style={{
        backgroundImage: "linear-gradient(to right, #FFF27A,#f2dd22)",
      }}
    >
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems={"center"}
      >
        <Box display={"flex"} justifyContent="flex-start" alignItems={"center"}>
          <Box
            style={{
              backgroundColor: "#0C0D11",
              height: 80,
              width: 80,
              borderRadius: 8,
            }}
            display={"flex"}
            justifyContent="center"
            alignItems={"center"}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/2936/2936952.png"
              height={50}
              width={50}
            />
          </Box>
          <Box ml={2}>
            <Box
              display={"flex"}
              justifyContent="flex-start"
              alignItems={"center"}
            >
              <Typography
                variant="h3"
                className={classes.pageTitle}
                color="#212121"
              >
                Accumulate - Eat The Dip
              </Typography>
              <Typography
                style={{
                  marginLeft: 5,
                  borderRadius: 10,
                  fontSize: 8,

                  paddingLeft: 10,
                  paddingRight: 10,
                  color: "black",
                  fontWeight: 600,
                  paddingTop: 3,
                  paddingBottom: 3,
                  backgroundImage: "linear-gradient(to right,#DADADA, #bdbdbd)",
                }}
              >
                <TrendingUp style={{ fontSize: 12 }} /> 326 people invested
              </Typography>
            </Box>

            <Typography variant="small" className={classes.pageSubtitle}>
              Start the strategy and eat every dip automatically without hassle
            </Typography>
          </Box>
        </Box>

        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent="flex-end"
        >
          <Box>
            <Typography variant="body2" color="#616161" fontSize={12}>
              Pool Investment
            </Typography>
            <Typography
              variant="h2"
              color="#000000"
              style={{ fontWeight: 600, lineHeight: 1.6 }}
            >
              $943,600
            </Typography>
          </Box>
          <Box mt={2}>
            <Typography variant="body2" color="#616161" fontSize={12}>
              *Recommended period
            </Typography>
            <Typography
              variant="body1"
              color="#212121"
              fontSize={16}
              fontWeight={600}
            >
              2 Yrs
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
