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

import Web3 from "web3";

import { constants, strategyType } from "../../utils/constants";
import { Info } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: constants.baseColorLight,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    width: "100%",
    border: "1px solid #21232b",
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

export default function AccumulateUserSummary() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Box pt={0} className={classes.card}>
      <Box>
        <Typography
          variant="body2"
          color="#bdbdbd"
          fontSize={12}
          fontWeight={300}
        >
          My Investment
        </Typography>
        <Typography
          variant="h3"
          fontSize={12}
          fontWeight={700}
          lineHeight={1.3}
        >
          $2,434
        </Typography>
      </Box>
      <Box
        display="flex"
        flexDirection={"row"}
        justifyContent="space-between"
        alignItems="center"
        mt={2}
      >
        <Typography
          variant="body2"
          color="#bdbdbd"
          fontSize={12}
          fontWeight={300}
        >
          Balances in pool
        </Typography>
        <Typography
          variant="small"
          fontSize={12}
          fontWeight={300}
          color={constants.highlighColorDark}
        >
          View All
        </Typography>
      </Box>

      <Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          mt={3}
          style={{
            border: "1px solid rgba(106, 85, 234,0.1)",
            padding: "10px 10px 10px 10px",
            borderRadius: 10,
            backgroundColor: "rgba(106, 85, 234,0.03)",
          }}
        >
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/800px-Bitcoin.svg.png"
              height="28px"
            />
            <Box
              ml={1}
              display={"flex"}
              flexDirection="column"
              justifyContent="center"
              alignItems={"flex-start"}
            >
              <Typography
                variant="body2"
                color={"#f9f9f9"}
                fontSize={13}
                fontWeight={500}
                lineHeight={1.2}
              >
                BTC
              </Typography>
              <Typography
                variant="verysmall"
                color={"#bdbdbd"}
                fontSize={11}
                fontWeight={300}
                lineHeight={1.2}
              >
                Bitcoin
              </Typography>
            </Box>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box
              ml={1}
              display={"flex"}
              flexDirection="column"
              justifyContent="center"
              alignItems={"flex-end"}
            >
              <Typography
                variant="body2"
                color={"#ffffff"}
                fontSize={11}
                fontWeight={500}
                lineHeight={1.2}
              >
                0.32 BTC
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          mt={1}
          style={{
            border: "1px solid rgba(106, 85, 234,0.1)",
            padding: "10px 10px 10px 10px",
            borderRadius: 10,
            backgroundColor: "rgba(106, 85, 234,0.03)",
          }}
        >
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <img
              src="https://cdn.icon-icons.com/icons2/2429/PNG/512/ethereum_logo_icon_147293.png"
              height="28px"
            />
            <Box
              ml={1}
              display={"flex"}
              flexDirection="column"
              justifyContent="center"
              alignItems={"flex-start"}
            >
              <Typography
                variant="body2"
                color={"#f9f9f9"}
                fontSize={13}
                fontWeight={500}
                lineHeight={1.2}
              >
                ETH
              </Typography>
              <Typography
                variant="verysmall"
                color={"#bdbdbd"}
                fontSize={11}
                fontWeight={300}
                lineHeight={1.2}
              >
                Ethereum
              </Typography>
            </Box>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box
              ml={1}
              display={"flex"}
              flexDirection="column"
              justifyContent="center"
              alignItems={"flex-end"}
            >
              <Typography
                variant="body2"
                color={"#ffffff"}
                fontSize={11}
                fontWeight={500}
                lineHeight={1.2}
              >
                1.32 ETH
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
