import React, { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import TimeAgo from "timeago-react";
import { useWeb3Auth } from "../../hooks/useWeb3Auth";
import { GetActiveOrdersOfUser } from "../../queries/graphQueries";
import { useLazyQuery } from "@apollo/client";
import { fromWei, toDollarPrice } from "../../utils/helper";
import { AccessTime } from "@mui/icons-material";
import LinearProgressComponent from "../../common/LinearProgressComponent";

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
  actionButton: {
    borderRadius: 14,
    background: "rgba(130, 71, 229, 0.3)",
    padding: "10px 20px 10px 20px",
    color: "white",
    width: "100%",
    maxWidth: "fit-content",
    fontWeight: 600,
    fontSize: 14,
    "&:hover": {
      background: "rgba(130, 71, 229, 0.9)",
    },
  },
}));

export default function UserPoolOrders({ poolType }) {
  const classes = useStyles();
  const theme = useTheme();
  const { accountSC } = useWeb3Auth();

  const [ordersGraphData, setOrdersGraphData] = useState(null);

  const [getPoolUserOrderQuery, { data: ordersData }] = useLazyQuery(
    GetActiveOrdersOfUser
  );

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
      setOrdersGraphData(ordersData.orders);
    }
  }, [ordersData]);

  const getExecutedPercentage = (singleOrder) => {
    if (singleOrder && singleOrder.executedGrids && singleOrder.grids) {
      return (singleOrder.executedGrids * 100) / singleOrder.grids;
    } else {
      return 0;
    }
  };
  return (
    <Box className={classes.boxCard}>
      {ordersGraphData &&
        ordersGraphData.map((singleOrder, index) => {
          return (
            <Grid
              container
              p={3}
              style={{
                borderRadius: 20,
                marginTop: 10,
                backgroundColor: "#000000",
              }}
              key={1}
            >
              <Grid
                item
                md={2}
                display="flex"
                flexDirection={"row"}
                justifyContent="flex-start"
                alignItems="center"
              >
                <Box>
                  <img
                    src="https://cdn3d.iconscout.com/3d/free/thumb/squigly-globe-3494833-2926648@0.png"
                    alt="Token"
                    height="32px"
                  />
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    textAlign="left"
                    fontWeight={600}
                    color={"#f9f9f9"}
                    pl={1}
                    lineHeight={1}
                  >
                    SLEEPT
                  </Typography>
                  <Typography
                    variant="small"
                    textAlign="left"
                    fontWeight={300}
                    color={"#c7cad9"}
                    pl={1}
                    lineHeight={1}
                  >
                    <AccessTime fontSize="14" />{" "}
                    <TimeAgo
                      datetime={parseInt(singleOrder.timestamp) * 1000}
                    />
                  </Typography>
                </Box>
              </Grid>

              <Grid
                item
                md={5}
                display="flex"
                flexDirection={"column"}
                justifyContent="center"
                alignItems="flex-start"
              >
                <Typography
                  variant="h6"
                  textAlign="left"
                  fontWeight={600}
                  color={"#f9f9f9"}
                >
                  Order placed for ${fromWei(singleOrder.deposit)} at
                </Typography>
                <Box
                  pt={1}
                  display="flex"
                  flexDirection={"row"}
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <Typography
                    variant="small"
                    textAlign="left"
                    fontWeight={400}
                    color={"#c7cad9"}
                  >
                    Price: ${toDollarPrice(singleOrder.entryPrice)}
                  </Typography>
                  <Typography
                    variant="small"
                    textAlign="left"
                    fontWeight={400}
                    color={"#c7cad9"}
                    px={1}
                  >
                    |
                  </Typography>
                  <Typography
                    variant="small"
                    textAlign="left"
                    fontWeight={400}
                    color={"#c7cad9"}
                  >
                    Percetage: {singleOrder.percentage}%
                  </Typography>
                  <Typography
                    variant="small"
                    textAlign="left"
                    fontWeight={400}
                    color={"#c7cad9"}
                    px={1}
                  >
                    |
                  </Typography>
                  <Typography
                    variant="small"
                    textAlign="left"
                    fontWeight={400}
                    color={"#c7cad9"}
                  >
                    Orders: {singleOrder.grids}
                  </Typography>
                </Box>
              </Grid>
              <Grid
                item
                md={3}
                display="flex"
                flexDirection={"row"}
                justifyContent="flex-start"
                alignItems="center"
              >
                <Box>
                  <LinearProgressComponent
                    value={getExecutedPercentage(singleOrder)}
                  />
                  <Typography
                    variant="body2"
                    textAlign="left"
                    fontWeight={400}
                    color={"#bdbdbd"}
                    fontSize={15}
                    pt={1}
                  >
                    {getExecutedPercentage(singleOrder)}% Complete
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
                <Button className={classes.actionButton}>
                  <AccessTime style={{ marginRight: 5 }} /> Withdraw
                </Button>
              </Grid>
            </Grid>
          );
        })}
    </Box>
  );
}
