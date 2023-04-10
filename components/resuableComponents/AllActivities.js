import React, { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import TimeAgo from "timeago-react";
import { useWeb3Auth } from "../../hooks/useWeb3Auth";
import {
  GetActiveOrdersOfUser,
  GetUserAllActivities,
} from "../../queries/graphQueries";
import { useLazyQuery } from "@apollo/client";
import { fromWei, toDollarPrice } from "../../utils/helper";
import { getTokenStaticDataByAddress } from "../../utils/helper";

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

export default function AllActivities() {
  const classes = useStyles();
  const theme = useTheme();
  const { accountSC } = useWeb3Auth();

  const [activities, setActivities] = useState(null);

  const [getUserAllActivitiesQuery, { data: activitiesData }] =
    useLazyQuery(GetUserAllActivities);

  useEffect(() => {
    if (accountSC) {
      getUserAllActivitiesQuery({
        variables: { user: accountSC },
        // pollInterval: 5000,
      });
    }
  }, [accountSC, getUserAllActivitiesQuery]);

  // Get user pool activities
  useEffect(() => {
    if (activitiesData) {
      setActivities(activitiesData.userActivities);
    }
  }, [activitiesData]);

  const getSentence = (action) => {
    if (action === "EXECUTE_BUY_ORDER") {
      return `BUY ORDER`;
    } else if (action === "INVESTED") {
      return `CREATE ORDER`;
    } else return action;
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
              TOKEN
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
              ACTION
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
              Price($)
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
                TYPE
              </Typography>
            </Box>
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
        activities.map((activity, index) => {
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
                  {getTokenStaticDataByAddress(activity.tokenAddress)?.symbol}
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
                    color={"rgba(130, 71, 229, 1)"}
                    fontSize={14}
                  >
                    {getSentence(activity.action)}
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
                      ${toDollarPrice(activity.price)}
                    </Typography>
                  </Box>
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
                    {activity.strategyType}
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
                  <Typography
                    variant="body2"
                    textAlign="left"
                    fontWeight={400}
                    color={"#bdbdbd"}
                    fontSize={14}
                  >
                    <TimeAgo datetime={parseInt(activity.timestamp) * 1000} />
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          );
        })}
    </Box>
  );
}
