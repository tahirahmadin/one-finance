import React, { useCallback, useEffect, useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box, IconButton, Typography, useTheme } from "@mui/material";

import { constants, strategyType } from "../../utils/constants";
import { LocalConvenienceStore, TrendingUp } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: constants.baseColorLight,
    marginTop: 20,
    marginBottom: 20,
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 14,
    paddingRight: 14,
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
}));

export default function TopPoolCard({ title, invested, change, icon }) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Box pt={0} className={classes.card}>
      <Box>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Box>
            <Typography
              variant="body2"
              mb={1}
              fontWeight={500}
              fontSize={12}
              color={"#bdbdbd"}
            >
              {title}
            </Typography>
            <Typography
              variant="h4"
              mb={1}
              fontWeight={600}
              fontSize={17}
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
            {icon}
          </IconButton>
        </Box>

        <Typography
          mt={1}
          variant="body2"
          textAlign="left"
          fontWeight={500}
          color={"#6ec046"}
        >
          +{change}%{" "}
          <span style={{ lineHeight: 1.4, fontSize: 10, color: "white" }}>
            this week
          </span>
        </Typography>
      </Box>
    </Box>
  );
}
