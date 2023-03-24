import React, { useCallback, useEffect, useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { getPoolDetails } from "../../actions/smartActions";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: "#17191A",
    marginTop: 20,
    marginBottom: 20,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    width: "100%",
    border: "1px solid #414141",
    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.03)",
    borderRadius: 10,
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
    textAlign: "left",
  },
  value: {
    fontWeight: 600,
    color: "#f9f9f9",
    textAlign: "left",
    lineHeight: 1.5,
    paddingTop: 5,
  },
  infoCard: {
    backgroundColor: "rgba(130, 71, 229, 0.1)",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
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

  useEffect(() => {
    async function asyncFn() {
      let res = await getPoolDetails(
        "0x9D7117a07fca9F22911d379A9fd5118A5FA4F448"
      );
      console.log(res);
    }
    asyncFn();
  }, []);

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
          <img src={poolStaticData.icon} alt="Grid" height="42px" />
          <Box ml={1}>
            <Typography variant="h5" className={classes.title}>
              {poolStaticData.title}
            </Typography>
          </Box>
        </Box>
        <div style={{ color: "#24A582" }}>#{index + 1}</div>
      </Box>
      <Typography variant="small" className={classes.description} paragraph>
        {poolStaticData.description}
      </Typography>

      <Box px={1}>
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
            $200
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
            Your Earning
          </Typography>
          <Typography
            variant="body2"
            className={classes.para}
            textAlign="center"
            fontWeight={700}
            ml={1}
          >
            +$32
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
            $324.4K
          </Typography>
        </Box>
        <Box className={classes.infoCard}>
          <Typography variant="small" className={classes.field}>
            Total PnL($)
          </Typography>
          <Typography variant="body1" className={classes.value}>
            +$34,434
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
            View Pool
          </Button>
        </Link>
        <Box display="flex" justifyContent="center" alignItems="center">
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
        </Box>
      </Box>
    </Box>
  );
}
