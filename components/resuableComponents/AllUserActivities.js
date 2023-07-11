import React, { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import TimeAgo from "timeago-react";
import { useWeb3Auth } from "../../hooks/useWeb3Auth";
import { GetUserAllActivities } from "../../queries/graphQueries";
import { useLazyQuery } from "@apollo/client";
import { fromWei, toDollarPrice } from "../../utils/helper";
import { getTokenStaticDataByAddress } from "../../utils/helper";
import web3 from "../../web3";

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

export default function AllUserActivities() {
  const classes = useStyles();
  const theme = useTheme();
  const { accountSC } = useWeb3Auth();
  const md = useMediaQuery(theme.breakpoints.down("md"));

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
      <Grid px={md ? 0 : 2} container py={1}>
        <Grid item md={2} sm={2} xs={2}>
          <Typography
            variant="body2"
            textAlign="left"
            fontWeight={400}
            color={"#bdbdbd"}
            fontSize={md ? 10 : 12}
          >
            Token
          </Typography>
        </Grid>
        <Grid
          item
          md={2}
          sm={2}
          xs={2}
          display="flex"
          flexDirection={"row"}
          justifyContent="flex-start"
          alignItems="center"
        >
          <Typography
            variant="body2"
            textAlign="left"
            fontWeight={400}
            color={"#bdbdbd"}
            fontSize={md ? 10 : 12}
          >
            Action
          </Typography>
        </Grid>

        <Grid
          item
          md={2}
          sm={2}
          xs={2}
          display="flex"
          flexDirection={"row"}
          justifyContent="flex-start"
          alignItems="center"
        >
          <Typography
            variant="body2"
            textAlign="left"
            fontWeight={400}
            color={"#bdbdbd"}
            fontSize={md ? 10 : 12}
          >
            Price($)
          </Typography>
        </Grid>
        <Grid
          item
          md={2}
          sm={2}
          xs={2}
          display="flex"
          flexDirection={"row"}
          justifyContent="flex-start"
          alignItems="center"
        >
          <Typography
            variant="body2"
            textAlign="left"
            fontWeight={400}
            color={"#bdbdbd"}
            fontSize={md ? 10 : 12}
          >
            Type
          </Typography>
        </Grid>

        <Grid
          item
          md={2}
          sm={2}
          xs={2}
          display="flex"
          flexDirection={"row"}
          justifyContent="flex-start"
          alignItems="center"
        >
          <Typography
            variant="body2"
            textAlign="left"
            fontWeight={400}
            color={"#bdbdbd"}
            fontSize={md ? 10 : 12}
          >
            Amount
          </Typography>
        </Grid>
        <Grid
          item
          md={2}
          sm={2}
          xs={2}
          display="flex"
          flexDirection={"row"}
          justifyContent="flex-start"
          alignItems="center"
        >
          <Typography
            variant="body2"
            textAlign="left"
            fontWeight={400}
            color={"#bdbdbd"}
            fontSize={md ? 10 : 12}
          >
            Time
          </Typography>
        </Grid>
      </Grid>
      {activities &&
        activities.map((activity, index) => {
          return (
            <Grid
              container
              p={2}
              style={{
                borderRadius: 10,
                marginTop: 10,
                backgroundColor: "#000000",
              }}
              key={index}
            >
              {console.log(activity)}
              <Grid item md={2}>
                <img
                  src={
                    getTokenStaticDataByAddress(activity.tokenAddress)?.logoURI
                  }
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
                    fontSize={12}
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
                      color={"#f9f9f9"}
                      fontSize={12}
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
                    color={"#f9f9f9"}
                    fontSize={12}
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
                    color={"#f9f9f9"}
                    fontSize={12}
                  >
                    $ {fromWei(activity.amount)}
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
                    color={"#f9f9f9"}
                    fontSize={12}
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
