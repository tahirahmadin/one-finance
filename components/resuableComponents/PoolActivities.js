import React, { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { useChain } from "react-moralis";
import { Container } from "@mui/system";
import Web3 from "web3";
import TimeAgo from "timeago-react";

const useStyles = makeStyles((theme) => ({
  boxCard: {
    paddingTop: 7,
  },
}));

export default function PoolActivities({ activities }) {
  const classes = useStyles();
  const theme = useTheme();

  const { account } = useChain();

  const getActivityActionName = (action) => {
    if (action === "EXECUTE_BUY_ORDER") {
      return "BUY";
    } else if (action === "EXECUTE_SELL_ORDER") {
      return "SeLL";
    } else {
      return action;
    }
  };

  return (
    <Box>
      <Box className={classes.boxCard}>
        <Grid px={2} container py={1}>
          <Grid item md={1}>
            {" "}
            <Box>
              <Typography
                variant="body2"
                textAlign="left"
                fontWeight={400}
                color={"#bdbdbd"}
                fontSize={14}
              >
                Token
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            md={1}
            display="flex"
            flexDirection={"row"}
            justifyContent="center"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="body2"
                textAlign="left"
                fontWeight={400}
                color={"#bdbdbd"}
                fontSize={14}
              >
                Action
              </Typography>
            </Box>
          </Grid>

          <Grid
            item
            md={2}
            display="flex"
            flexDirection={"row"}
            justifyContent="center"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="body2"
                textAlign="left"
                fontWeight={400}
                color={"#bdbdbd"}
                fontSize={14}
              >
                Price
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            md={2}
            display="flex"
            flexDirection={"row"}
            justifyContent="center"
            alignItems="center"
          >
            <Box
              display="flex"
              flexDirection={"column"}
              justifyContent="center"
              alignItems="flex-start"
            >
              <Box>
                <Typography
                  variant="body2"
                  textAlign="left"
                  fontWeight={400}
                  color={"#bdbdbd"}
                  fontSize={14}
                >
                  Tokens
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            md={2}
            display="flex"
            flexDirection={"row"}
            justifyContent="center"
            alignItems="center"
          >
            <Box
              display="flex"
              flexDirection={"column"}
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Typography
                variant="body2"
                textAlign="left"
                fontWeight={400}
                color={"#bdbdbd"}
                fontSize={14}
              >
                Amount
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            md={2}
            display="flex"
            flexDirection={"row"}
            justifyContent="center"
            alignItems="center"
          >
            <Box
              display="flex"
              flexDirection={"column"}
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Typography
                variant="body2"
                textAlign="left"
                fontWeight={400}
                color={"#bdbdbd"}
                fontSize={14}
              >
                Time
              </Typography>
            </Box>
          </Grid>
        </Grid>
        {activities &&
          activities.map((singleActivity, index) => {
            return (
              <Grid
                container
                p={2}
                style={{
                  border: "0.5px solid #414141",
                  borderRadius: 20,
                  marginTop: 10,
                }}
                key={index}
              >
                <Grid item md={1}>
                  <img
                    src="https://d235dzzkn2ryki.cloudfront.net/polkabridge_large.png"
                    alt="ETH"
                    height="32px"
                  />
                </Grid>
                <Grid
                  item
                  md={1}
                  display="flex"
                  flexDirection={"row"}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box
                    display="flex"
                    flexDirection={"column"}
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
                    <Typography
                      variant="body3"
                      textAlign="left"
                      fontWeight={600}
                      color={"green"}
                    >
                      {getActivityActionName(singleActivity.action)}
                    </Typography>
                  </Box>
                </Grid>

                <Grid
                  item
                  md={2}
                  display="flex"
                  flexDirection={"row"}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box>
                    <Typography
                      variant="body2"
                      textAlign="left"
                      fontWeight={400}
                      color={"#bdbdbd"}
                      fontSize={14}
                    >
                      $ {singleActivity.price}
                    </Typography>
                  </Box>
                </Grid>
                <Grid
                  item
                  md={2}
                  display="flex"
                  flexDirection={"row"}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box
                    display="flex"
                    flexDirection={"column"}
                    justifyContent="center"
                    alignItems="flex-start"
                  >
                    <Box>
                      <Typography
                        variant="body2"
                        textAlign="left"
                        fontWeight={400}
                        color={"#bdbdbd"}
                        fontSize={14}
                      >
                        {parseFloat(
                          Web3.utils.fromWei(singleActivity.token, "ether")
                        ).toFixed(2)}{" "}
                        PBR
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid
                  item
                  md={2}
                  display="flex"
                  flexDirection={"row"}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box
                    display="flex"
                    flexDirection={"column"}
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
                    <Typography
                      variant="body2"
                      textAlign="left"
                      fontWeight={400}
                      color={"#bdbdbd"}
                      fontSize={14}
                    >
                      ${Web3.utils.fromWei(singleActivity.fiat, "ether")}
                    </Typography>
                  </Box>
                </Grid>
                <Grid
                  item
                  md={2}
                  display="flex"
                  flexDirection={"row"}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box
                    display="flex"
                    flexDirection={"column"}
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
                    <Typography
                      variant="body2"
                      textAlign="left"
                      fontWeight={400}
                      color={"#bdbdbd"}
                      fontSize={14}
                    >
                      <TimeAgo
                        datetime={parseInt(singleActivity.timestamp) * 1000}
                      />
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            );
          })}
      </Box>
    </Box>
  );
}
