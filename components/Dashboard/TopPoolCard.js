import React, { useCallback, useEffect, useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Box,
  Button,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { STRATEGY_TYPE_ENUM, constants } from "../../utils/constants";
import {
  Add,
  AlarmOnTwoTone,
  LocalConvenienceStore,
  NightsStayTwoTone,
  TrendingUp,
} from "@mui/icons-material";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: "#171320",
    marginTop: 20,
    marginBottom: 20,
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 14,
    paddingRight: 14,
    width: "100%",
    height: "100%",
    maxHeight: 130,
    // border: "1px solid #414141",
    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.03)",
    borderRadius: 14,
    "&:hover": {
      boxShadow: "0px 24px 33px -9px #0000005C",
    },

    [theme.breakpoints.down("md")]: {
      height: "100%",
      width: "100%",
      paddingTop: 21,
      paddingBottom: 21,
      paddingLeft: 21,
      paddingRight: 21,
      maxHeight: 160,
    },
  },
}));

export default function TopPoolCard({ title, invested, count, icon }) {
  const classes = useStyles();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box pt={0} className={classes.card}>
      <Link
        href={`/pools/${title.toLowerCase()}`}
        style={{ textDecoration: "none" }}
      >
        <Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box>
              <Typography
                style={{ textTransform: "capitalize" }}
                variant="body2"
                mb={1}
                fontWeight={500}
                fontSize={md ? 14 : 12}
                color={"#bdbdbd"}
              >
                {title.toLowerCase()}
              </Typography>
              <Typography
                variant="h2"
                mb={1}
                fontWeight={600}
                fontSize={md ? 233 : 180}
                color={"#f9f9f9"}
              >
                ${invested}
              </Typography>
            </Box>

            <IconButton
              style={{
                backgroundColor: constants.highlighColorDark,
                height: 40,
                width: 40,
                color: "white",
              }}
            >
              {title === STRATEGY_TYPE_ENUM.ACCUMULATION && (
                <NightsStayTwoTone />
              )}
              {title === STRATEGY_TYPE_ENUM.DCA && <AlarmOnTwoTone />}
              {title != STRATEGY_TYPE_ENUM.ACCUMULATION &&
                title != STRATEGY_TYPE_ENUM.DCA &&
                icon}
            </IconButton>
          </Box>

          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography
              mt={1}
              variant="body2"
              textAlign="left"
              fontWeight={500}
              color={"#6ec046"}
              fontSize={md ? 17 : 14}
            >
              {count}{" "}
              <span style={{ lineHeight: 1.4, fontSize: 11, color: "white" }}>
                people participated
              </span>
            </Typography>
            <Button
              style={{
                color: constants.highlighColorDark,
                textTransform: "lowercase",
                // borderColor: constants.highlighColorDark,
                // borderStyle: "solid",
                // borderWidth: 1,
                borderRadius: 14,
                height: 30,
                fontSize: 13,
              }}
            >
              + Invest now
            </Button>
          </Box>
        </Box>
      </Link>
    </Box>
  );
}
