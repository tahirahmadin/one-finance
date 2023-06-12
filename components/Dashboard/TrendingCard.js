import React, { useCallback, useEffect, useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Box,
  Button,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { useLazyQuery } from "@apollo/client";
import { GetPoolUserDataByAddress } from "./../../queries/graphQueries";
import Web3 from "web3";
import { useWeb3Auth } from "../../hooks/useWeb3Auth";
import { usePoolInfo } from "../../hooks/usePoolInfo";
import { constants, strategyType } from "../../utils/constants";
import { Info } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: constants.baseColorLight,
    marginTop: 20,
    marginBottom: 20,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    width: "100%",
    border: "1px solid #414141",
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
  title: {
    fontWeight: 600,
    color: "#f9f9f9",
    textAlign: "left",
    fontSize: 16,
  },
  description: {
    fontWeight: 400,
    color: "#bdbdbd",
    textAlign: "left",
    lineHeight: 1.5,
    paddingTop: 5,
  },
  field: {
    fontWeight: 400,
    color: "#bdbdbd",
    textAlign: "center",
  },
  value: {
    fontWeight: 600,
    color: "#f9f9f9",
    textAlign: "center",
    lineHeight: 1.5,
    paddingTop: 5,
  },
  infoCard: {
    backgroundColor: "rgba(130, 71, 229, 0.1)",
    // borderTopRightRadius: 10,
    // borderTopLeftRadius: 10,
    borderRadius: 10,
    padding: "4%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  tokenDescription: {
    fontWeight: 400,
    fontSize: 12,
    color: "#bdbdbd",
    textAlign: "left",
  },
}));

export default function TrendingCard() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Box pt={0} className={classes.card}>
      <Box>
        <Box
          style={{
            backgroundColor: constants.highlighColor,
            borderRadius: 12,
            width: "fit-content",
            color: "white",
            padding: "2px 10px 2px 10px",
            fontSize: 12,
          }}
        >
          Accumulation Strategy
        </Box>
        <Box mt={2}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/800px-Bitcoin.svg.png"
            height="30px"
          />
          <img
            src="https://cdn.iconscout.com/icon/free/png-256/free-tether-441954.png"
            height="30px"
            style={{ marginLeft: -10 }}
          />
        </Box>
        <Typography
          mt={1}
          variant="body2"
          color={"#ffffff"}
          style={{ lineHeight: 1.4 }}
          fontWeight={600}
        >
          BTC-USDT
        </Typography>
        <Typography
          mt={1}
          variant="h2"
          textAlign="left"
          fontWeight={500}
          color={"green"}
          style={{ lineHeight: 1.4 }}
        >
          42%{" "}
          <span style={{ lineHeight: 1.4, fontSize: 16, color: "white" }}>
            BTC-USDT
          </span>
        </Typography>
      </Box>
    </Box>
  );
}
