import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box, Button, Divider, Typography, useTheme } from "@mui/material";
import { useMoralis } from "react-moralis";
import { useChain } from "react-moralis";

const useStyles = makeStyles((theme) => ({
  filterCard: {
    marginTop: 20,
    marginBottom: 20,
    height: "100%",
    width: "92%",
    paddingTop: 30,
    paddingBottom: 30,
    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.03)",
    backgroundColor: "#140F16",
    border: "3px solid rgba(255, 255, 255, 0.2)",
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
    fontSize: 15,
    letterSpacing: "0.02em",
    color: "#e5e5e5",
    textAlign: "center",
  },

  buttonWrapper: {
    display: "flex",
    justifyContent: "center",
  },
  buttonFirst: {
    width: "fit-content",
    color: "#212121",
    backgroundColor: "#eeeeee",
    padding: "12px 50px 12px 50px",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    cursor: "pointer",
  },
  buttonSecond: {
    width: "fit-content",
    color: "white",
    backgroundColor: "#6A55EA",
    padding: "12px 50px 12px 50px",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    cursor: "pointer",
  },

  cardTitle: {
    fontWeight: 600,
    fontSize: 16,
    letterSpacing: "0.02em",
    color: "#FFFFFF",
    textAlign: "left",
  },
  imageWrapper: {
    background: `linear-gradient(332.86deg, rgba(146, 103, 219, 0.3) 26.45%, rgba(215, 86, 236, 0.3) 69.5%)`,
    borderRadius: "20%",
    padding: 10,
  },
}));

export default function StakePoolCard() {
  const classes = useStyles();
  const theme = useTheme();
  const { account } = useChain();

  const { isAuthenticated } = useMoralis();

  const [stakePopup, setStakePopup] = useState(false);
  const [txCase, setTxCase] = useState(0);

  return (
    <Box>
      <div className={classes.filterCard}>
        <Box pt={0} px={3}>
          <Box
            mb={2}
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
              <Box className={classes.imageWrapper}>
                <img
                  src="https://polkabridge.org/images/symbol.png"
                  alt="PBR"
                  height="35px"
                />{" "}
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  className={classes.cardTitle}
                  textAlign="left"
                  fontWeight={600}
                  ml={1}
                >
                  PBR
                </Typography>
                <Box display={"flex"} justifyContent={"center"}>
                  <Button
                    style={{
                      marginLeft: 5,
                      height: 26,
                      width: "fit-content",
                      fontSize: 10,
                      borderRadius: 10,
                      background: "transparent",
                      border: "1px solid #6A55EA",
                      padding: "2px 5px 2px 5px",
                      color: "#6A55EA",
                    }}
                  >
                    Buy
                  </Button>
                  <Button
                    style={{
                      marginLeft: 5,
                      height: 26,
                      width: "fit-content",
                      fontSize: 10,
                      borderRadius: 10,
                      background: "#6A55EA",
                      padding: "2px 5px 2px 5px",
                      color: "white",
                    }}
                  >
                    Info
                  </Button>{" "}
                </Box>
              </Box>
            </Box>
            <Typography
              variant="h4"
              textAlign="left"
              fontWeight={600}
              ml={1}
              color={"#e5e5e5"}
            >
              25%
            </Typography>
          </Box>
          <Divider />
          <Box mt={2}>
            <Box display={"flex"} justifyContent={"space-between"} mb={1}>
              <Typography
                variant="h6"
                textAlign="center"
                fontSize={13}
                fontWeight={600}
                ml={1}
                color="#e5e5e5"
              >
                Total Locked value:
              </Typography>

              <Typography
                variant="body2"
                className={classes.para}
                textAlign="center"
                fontWeight={700}
                ml={1}
              >
                $23M
              </Typography>
            </Box>
            <Box display={"flex"} justifyContent={"space-between"} mb={1}>
              <Typography
                variant="h6"
                textAlign="center"
                fontSize={13}
                fontWeight={600}
                ml={1}
                color="#e5e5e5"
              >
                Total Staked:
              </Typography>

              <Typography
                variant="body2"
                className={classes.para}
                textAlign="center"
                fontWeight={700}
                ml={1}
              >
                19.46M
              </Typography>
            </Box>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography
                variant="h6"
                textAlign="center"
                fontSize={13}
                fontWeight={600}
                ml={1}
                color="#e5e5e5"
              >
                Total Claimed:
              </Typography>

              <Typography
                variant="body2"
                className={classes.para}
                textAlign="center"
                fontWeight={700}
                ml={1}
              >
                580K
              </Typography>
            </Box>
          </Box>

          <Box
            display={"flex"}
            flexDirection="row"
            justifyContent={"space-around"}
          >
            <Box
              display={"flex"}
              flexDirection="column"
              justifyContent={"center"}
              alignItems="center"
              mt={3}
            >
              <Typography
                variant="body2"
                textAlign="center"
                fontSize={14}
                fontWeight={600}
                ml={1}
                color="#919191"
              >
                <span style={{ color: "#E0077D" }}>PBR</span> Earned
              </Typography>
              <Typography
                variant="h6"
                textAlign="center"
                fontSize={32}
                fontWeight={600}
                ml={1}
                color="#FFFFFF"
              >
                132
              </Typography>
            </Box>
            <Box
              display={"flex"}
              flexDirection="column"
              justifyContent={"center"}
              mt={3}
            >
              <Button
                onClick={() => setStakePopup(true)}
                style={{
                  borderRadius: 10,
                  background: "#521B8F",
                  padding: "10px 30px 10px 30px",
                  color: "white",
                }}
              >
                CLAIM
              </Button>
            </Box>
          </Box>
          <Divider
            light
            variant="fullWidth"
            style={{ color: "white", marginTop: 10 }}
          />
          <Box
            display={"flex"}
            flexDirection="row"
            justifyContent={"space-around"}
          >
            <Box
              display={"flex"}
              flexDirection="column"
              justifyContent={"center"}
              alignItems="center"
              mt={3}
            >
              <Typography
                variant="body2"
                textAlign="center"
                fontSize={14}
                fontWeight={400}
                ml={1}
                color="#919191"
              >
                Total Staked
              </Typography>
              <Typography
                variant="h6"
                textAlign="center"
                fontSize={22}
                fontWeight={600}
                ml={1}
                color="#FFFFFF"
              >
                1,326
              </Typography>
            </Box>
            <Box
              display={"flex"}
              flexDirection="column"
              justifyContent={"center"}
              mt={3}
            >
              <Typography
                variant="body2"
                textAlign="center"
                fontSize={14}
                fontWeight={400}
                ml={1}
                color="#919191"
              >
                Total Claimed
              </Typography>
              <Typography
                variant="h6"
                textAlign="center"
                fontSize={22}
                fontWeight={600}
                ml={1}
                color="#FFFFFF"
              >
                126
              </Typography>
            </Box>
          </Box>
          <Box px={2} mt={2} className="d-flex justify-content-around">
            <Button
              onClick={() => setStakePopup(true)}
              style={{
                borderRadius: 10,
                background: "#521B8F",
                padding: "9px 20px 9px 20px",
                color: "white",
              }}
            >
              Stake
            </Button>
            <Button
              onClick={() => setStakePopup(true)}
              style={{
                borderRadius: 10,
                background: "#521B8F",
                padding: "9px 20px 9px 20px",
                color: "white",
              }}
            >
              Unstake
            </Button>
          </Box>
        </Box>
      </div>
    </Box>
  );
}
