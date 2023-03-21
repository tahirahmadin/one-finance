import React, { useCallback, useEffect, useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { getPoolDetails } from "../../actions/smartActions";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: "#17191A",
    marginTop: 20,
    marginBottom: 20,
    paddingTop: 20,
    paddingBottom: 20,
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
  para: {
    fontWeight: 400,
    fontSize: 14,

    color: "#f9f9f9",
    textAlign: "center",
  },
  tokenName: {
    fontWeight: 600,
    fontSize: 16,

    color: "#f9f9f9",
    textAlign: "left",
  },
  tokenDescription: {
    fontWeight: 400,
    fontSize: 12,
    color: "#bdbdbd",
    textAlign: "left",
  },
}));

export default function PoolCard() {
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
    <Box pt={0} px={3} className={classes.card}>
      <Box>
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
            <Box
              display="flex"
              flexDirection={"row"}
              justifyContent="flex-start"
              alignItems="center"
            >
              <img
                src="https://cdn3d.iconscout.com/3d/premium/thumb/ethereum-eth-coin-4722965-3917991.png"
                alt="ETH"
                height="24px"
              />{" "}
              <img
                src="https://cdn3d.iconscout.com/3d/premium/thumb/tether-usdt-coin-4199895-3478983@0.png"
                alt="USDT"
                height="24px"
                style={{ marginLeft: -10 }}
              />
            </Box>
            <Box ml={1}>
              <div className={classes.tokenName}>ETH-USDT</div>
            </Box>
          </Box>
          <div className={classes.tokenName} style={{ color: "#24A582" }}>
            30%+
          </div>
        </Box>
        <Box display={"flex"} justifyContent={"space-around"} mt={3}>
          <Box>
            <Typography
              variant="h6"
              className={classes.para}
              textAlign="center"
              fontSize={14}
              fontWeight={400}
              ml={1}
            >
              Total Deposits
            </Typography>
            <Typography
              variant="body2"
              className={classes.para}
              textAlign="center"
              fontWeight={700}
              ml={1}
            >
              $324.4K
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="h6"
              className={classes.para}
              textAlign="center"
              fontSize={14}
              fontWeight={400}
              ml={1}
            >
              Profit/Loss
            </Typography>
            <Typography
              variant="body2"
              className={classes.para}
              textAlign="center"
              fontWeight={700}
              ml={1}
            >
              $3,232
            </Typography>
          </Box>
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
          <Typography
            variant="h6"
            className={classes.para}
            textAlign="center"
            fontSize={14}
            fontWeight={400}
            ml={1}
          >
            Your stake
          </Typography>
          <Typography
            variant="body2"
            className={classes.para}
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
          <Typography
            variant="h6"
            className={classes.para}
            textAlign="center"
            fontSize={14}
            fontWeight={400}
            ml={1}
          >
            Earning
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
      <Box px={2} mt={2} className="text-center">
        <Button
          onClick={() => setStakePopup(true)}
          style={{
            borderRadius: 10,
            background: "rgba(130, 71, 229, 0.3)",
            padding: "9px 20px 9px 20px",
            color: "white",
          }}
        >
          Start Strategy
        </Button>
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
