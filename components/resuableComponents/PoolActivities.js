import React, { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { useChain } from "react-moralis";
import { Container } from "@mui/system";
import Web3 from "web3";
import TimeAgo from "timeago-react";
import { useWeb3Auth } from "../../hooks/useWeb3Auth";
import { GetAllOrdersOfUser } from "../../queries/graphQueries";
import { useLazyQuery } from "@apollo/client";
import {
  fromWei,
  getTokenStaticDataByAddress,
  toDollarPrice,
} from "../../utils/helper";

const useStyles = makeStyles((theme) => ({
  boxCard: {
    marginTop: 20,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: "#0C0D10",
    borderRadius: 10,
  },
}));

export default function PoolActivities({ poolType }) {
  const classes = useStyles();
  const theme = useTheme();
  const { accountSC } = useWeb3Auth();

  const [ordersGraphData, setOrdersGraphData] = useState(null);

  const [getPoolUserOrderQuery, { data: ordersData }] =
    useLazyQuery(GetAllOrdersOfUser);

  useEffect(() => {
    if (accountSC) {
      getPoolUserOrderQuery({
        variables: { address: accountSC, type: poolType },
        // pollInterval: 5000,
      });
    }
  }, [accountSC, getPoolUserOrderQuery]);

  // Get user pool activities
  useEffect(() => {
    if (ordersData) {
      console.log("ordersData.orders");
      console.log(ordersData.orders);
      setOrdersGraphData(ordersData.orders);
    }
  }, [ordersData]);

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
    <Box className={classes.boxCard}>
      <Grid px={2} container py={1}>
        <Grid item md={2}>
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
          md={2}
          display="flex"
          flexDirection={"row"}
          justifyContent="flex-start"
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
              Invested($)
            </Typography>
          </Box>
        </Grid>

        <Grid
          item
          md={2}
          display="flex"
          flexDirection={"row"}
          justifyContent="flex-start"
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
              Next Price($)
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          md={1}
          display="flex"
          flexDirection={"row"}
          justifyContent="flex-start"
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
                Executed
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
              Pending
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
              Avg Buy Price($)
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
      {ordersGraphData &&
        ordersGraphData.map((singleOrder, index) => {
          return (
            <Grid
              container
              p={2}
              style={{
                borderRadius: 20,
                marginTop: 10,
                backgroundColor: "#000000",
              }}
              key={index}
            >
              <Grid item md={2}>
                <img
                  src="https://cdn3d.iconscout.com/3d/free/thumb/squigly-globe-3494833-2926648@0.png"
                  alt="Token"
                  height="24px"
                />
                <Typography
                  variant="body3"
                  textAlign="left"
                  fontWeight={600}
                  color={"#c7cad9"}
                  pl={1}
                >
                  SLEEPT
                </Typography>
              </Grid>

              <Grid
                item
                md={2}
                display="flex"
                flexDirection={"row"}
                justifyContent="flex-start"
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
                    ${fromWei(singleOrder.deposit)}
                  </Typography>
                </Box>
              </Grid>
              <Grid
                item
                md={2}
                display="flex"
                flexDirection={"row"}
                justifyContent="flex-start"
                alignItems="center"
              >
                <Box
                  display="flex"
                  flexDirection={"column"}
                  justifyContent="flex-start"
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
                      ${toDollarPrice(singleOrder.nextPrice)}
                    </Typography>
                  </Box>
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
                <Box
                  display="flex"
                  flexDirection={"column"}
                  justifyContent="center"
                  alignItems="flex-start"
                >
                  <Typography
                    variant="body2"
                    textAlign="left"
                    fontWeight={400}
                    color={"#bdbdbd"}
                    fontSize={14}
                  >
                    {singleOrder.executedGrids}
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
                  <Typography
                    variant="body2"
                    textAlign="left"
                    fontWeight={400}
                    color={"#bdbdbd"}
                    fontSize={14}
                  >
                    {singleOrder.grids - singleOrder.executedGrids}
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
                  <Typography
                    variant="body2"
                    textAlign="left"
                    fontWeight={400}
                    color={"#bdbdbd"}
                    fontSize={14}
                  >
                    $0.73
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
                    View
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          );
        })}
    </Box>
  );
}
