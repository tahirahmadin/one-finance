import React, { useCallback, useEffect, useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box, Typography, useTheme } from "@mui/material";

import { constants, strategyType } from "../../utils/constants";
import LinearProgressComponent from "../../common/LinearProgressComponent";

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

export default function DashboardActivities() {
  const classes = useStyles();
  const theme = useTheme();

  return (
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
            height="35px"
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
              color={"#ffffff"}
              style={{ lineHeight: 1.4 }}
            >
              CREATE ORDER
            </Typography>
            <Typography
              variant="verysmall"
              textAlign="left"
              fontWeight={500}
              color={"#757575"}
              style={{ lineHeight: 1.4 }}
            >
              Accumulation Strategy
            </Typography>
          </Box>
        </Box>
        <Box
          ml={1}
          display={"flex"}
          flexDirection="row"
          justifyContent="center"
          alignItems={"center"}
        >
          <Typography
            variant="body2"
            color={"#ffffff"}
            style={{ lineHeight: 1.4 }}
          >
            $1700-$2200
          </Typography>
        </Box>{" "}
        <Box
          ml={1}
          display={"flex"}
          flexDirection="row"
          justifyContent="center"
          alignItems={"center"}
        >
          <Typography
            variant="body2"
            color={"#ffffff"}
            style={{ lineHeight: 1.4 }}
          >
            6 grids
          </Typography>
        </Box>
        <Box>
          <LinearProgressComponent value={25} />
          <Typography
            variant="body2"
            textAlign="left"
            fontWeight={400}
            color={"#bdbdbd"}
            fontSize={15}
            pt={1}
          >
            25% Complete
          </Typography>
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
              style={{ lineHeight: 1.4 }}
            >
              $1000
            </Typography>
            <Typography
              variant="verysmall"
              textAlign="left"
              fontWeight={500}
              color={"#757575"}
              style={{ lineHeight: 1.4 }}
            >
              01/03/23
            </Typography>
          </Box>
        </Box>
      </Box>
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
            src="https://s2.coinmarketcap.com/static/img/coins/200x200/1027.png"
            height="35px"
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
              color={"#ffffff"}
              style={{ lineHeight: 1.4 }}
            >
              CANCEL ORDER
            </Typography>
            <Typography
              variant="verysmall"
              textAlign="left"
              fontWeight={500}
              color={"#757575"}
              style={{ lineHeight: 1.4 }}
            >
              Accumulation Strategy
            </Typography>
          </Box>
        </Box>
        <Box
          ml={1}
          display={"flex"}
          flexDirection="row"
          justifyContent="center"
          alignItems={"center"}
        >
          <Typography
            variant="body2"
            color={"#ffffff"}
            style={{ lineHeight: 1.4 }}
          >
            $1700-$2200
          </Typography>
        </Box>{" "}
        <Box
          ml={1}
          display={"flex"}
          flexDirection="row"
          justifyContent="center"
          alignItems={"center"}
        >
          <Typography
            variant="body2"
            color={"#ffffff"}
            style={{ lineHeight: 1.4 }}
          >
            6 grids
          </Typography>
        </Box>
        <Box>
          <LinearProgressComponent value={25} />
          <Typography
            variant="body2"
            textAlign="left"
            fontWeight={400}
            color={"#bdbdbd"}
            fontSize={15}
            pt={1}
          >
            25% Complete
          </Typography>
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
              style={{ lineHeight: 1.4 }}
            >
              $1000
            </Typography>
            <Typography
              variant="verysmall"
              textAlign="left"
              fontWeight={500}
              color={"#757575"}
              style={{ lineHeight: 1.4 }}
            >
              01/03/23
            </Typography>
          </Box>
        </Box>
      </Box>
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
            src="https://s2.coinmarketcap.com/static/img/coins/200x200/1027.png"
            height="35px"
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
              color={"#ffffff"}
              style={{ lineHeight: 1.4 }}
            >
              CREATE ORDER
            </Typography>
            <Typography
              variant="verysmall"
              textAlign="left"
              fontWeight={500}
              color={"#757575"}
              style={{ lineHeight: 1.4 }}
            >
              Accumulation Strategy
            </Typography>
          </Box>
        </Box>
        <Box
          ml={1}
          display={"flex"}
          flexDirection="row"
          justifyContent="center"
          alignItems={"center"}
        >
          <Typography
            variant="body2"
            color={"#ffffff"}
            style={{ lineHeight: 1.4 }}
          >
            $1700-$2200
          </Typography>
        </Box>{" "}
        <Box
          ml={1}
          display={"flex"}
          flexDirection="row"
          justifyContent="center"
          alignItems={"center"}
        >
          <Typography
            variant="body2"
            color={"#ffffff"}
            style={{ lineHeight: 1.4 }}
          >
            6 grids
          </Typography>
        </Box>
        <Box>
          <LinearProgressComponent value={25} />
          <Typography
            variant="body2"
            textAlign="left"
            fontWeight={400}
            color={"#bdbdbd"}
            fontSize={15}
            pt={1}
          >
            25% Complete
          </Typography>
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
              style={{ lineHeight: 1.4 }}
            >
              $1000
            </Typography>
            <Typography
              variant="verysmall"
              textAlign="left"
              fontWeight={500}
              color={"#757575"}
              style={{ lineHeight: 1.4 }}
            >
              01/03/23
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
