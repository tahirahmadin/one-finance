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

export default function PoolCard({ poolStaticData, index }) {
  const classes = useStyles();
  const theme = useTheme();

  const [poolUserGraphData, setPoolUserGraphData] = useState(null);

  const { accountSC } = useWeb3Auth();

  const { poolInfo: poolGraphData, loading } = usePoolInfo(
    strategyType.ACCUMULATION
  );

  const [getPoolUserDataByAddress, { data: userPoolData }] = useLazyQuery(
    GetPoolUserDataByAddress
  );

  useEffect(() => {
    if (poolStaticData && accountSC) {
      getPoolUserDataByAddress({
        variables: {
          user: accountSC,
          type: poolStaticData.type,
        },
        // pollInterval: 5000,
      });
    }
  }, [poolStaticData, accountSC, getPoolUserDataByAddress]);

  useEffect(() => {
    if (userPoolData) {
      console.log(userPoolData);
      let userPoolGraphData = userPoolData.poolUsers;
      if (userPoolGraphData.length > 0) {
        setPoolUserGraphData(userPoolGraphData[0]);
      }
    }
  }, [userPoolData]);

  return (
    <Box pt={0} className={classes.card}>
      <Box
        display="flex"
        flexDirection={"row"}
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          display="flex"
          flexDirection={"row"}
          justifyContent="flex-start"
          alignItems="center"
        >
          <img src={poolStaticData.icon} alt="Grid" height="32px" />
          <Box ml={1}>
            <Typography variant="h6" className={classes.title}>
              {poolStaticData.title}
              <Tooltip title={poolStaticData.description}>
                <IconButton>
                  <Info style={{ color: "white", fontSize: 18 }} />
                </IconButton>
              </Tooltip>
            </Typography>
          </Box>
        </Box>
        {/* <div>
          <Typography variant="body3" style={{ color: "#24A582" }}>
            Add
          </Typography>
        </div> */}
      </Box>
      <Box
        display="flex"
        flexDirection={"row"}
        justifyContent="space-between"
        alignItems="center"
        gap={1}
        py={2}
        mt={2}
        style={{
          backgroundColor: "#000000",
          borderRadius: 10,
          padding: "4%",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="small" className={classes.field}>
            Invested($)
          </Typography>
          <Typography variant="body3" className={classes.value}>
            $
            {poolGraphData.invested &&
              parseFloat(
                Web3.utils.fromWei(poolGraphData.invested, "ether")
              ).toFixed(2)}
          </Typography>
        </Box>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="small" className={classes.field}>
            Volume($)
          </Typography>
          <Typography variant="body3" className={classes.value}>
            $43K
          </Typography>
        </Box>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="small" className={classes.field}>
            Participants
          </Typography>
          <Typography variant="body3" className={classes.value}>
            {poolGraphData.totalOrders ? poolGraphData.totalOrders : "-"}
          </Typography>
        </Box>
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
          <Typography variant="body2" className={classes.field} ml={1}>
            Your stake
          </Typography>
          <Typography
            variant="body2"
            className={classes.value}
            textAlign="center"
            fontWeight={700}
            ml={1}
          >
            $
            {poolUserGraphData
              ? Web3.utils.fromWei(
                  poolUserGraphData.deposit.toString(),
                  "ether"
                )
              : "0"}
          </Typography>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          mt={2}
          style={{
            border: "1px solid rgba(106, 85, 234,0.1)",
            padding: "10px 10px 10px 10px",
            borderRadius: 10,
            backgroundColor: "rgba(106, 85, 234,0.03)",
          }}
        >
          <Typography variant="body2" className={classes.field} ml={1}>
            In order
          </Typography>
          <Typography
            variant="body2"
            className={classes.para}
            textAlign="center"
            fontWeight={700}
            ml={1}
          >
            $
            {poolUserGraphData
              ? Web3.utils.fromWei(
                  poolUserGraphData.fiatBalance.toString(),
                  "ether"
                )
              : "0"}
          </Typography>
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection={"row"}
        justifyContent="space-between"
        alignItems="center"
        gap={2}
        py={2}
      >
        <Box className={classes.infoCard}>
          <Typography variant="small" className={classes.field}>
            Total Invested($)
          </Typography>
          <Typography variant="body1" className={classes.value}>
            ${" "}
            {poolGraphData.invested &&
              parseFloat(
                Web3.utils.fromWei(poolGraphData.invested, "ether")
              ).toFixed(2)}
          </Typography>
        </Box>
        <Box className={classes.infoCard}>
          <Typography variant="small" className={classes.field}>
            Participants
          </Typography>
          <Typography variant="body1" className={classes.value}>
            {poolGraphData.totalOrders ? poolGraphData.totalOrders : "-"}
          </Typography>
        </Box>
      </Box>
      <Box className="text-center">
        <Link href={poolStaticData.url} style={{ textDecoration: "none" }}>
          <Button
            style={{
              borderRadius: 10,
              background: "rgba(130, 71, 229, 0.3)",
              padding: "12px 20px 12px 20px",
              color: "white",
              width: "100%",
            }}
          >
            Start Strategy
          </Button>
        </Link>
        {/* <Box display="flex" justifyContent="center" alignItems="center">
          <div
            style={{
              paddingTop: 15,
              color: "#027FFF",
              fontWeight: 400,
              fontSize: 13,
              textDecoration: "none",
              marginRight: 10,
              fontFamily: "poppins",
            }}
          >
            ⭐️ Stake and Earn
          </div>
        </Box> */}
      </Box>
    </Box>
  );
}
