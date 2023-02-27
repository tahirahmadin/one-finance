import React, { useCallback, useEffect, useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: "#17191A",
    marginTop: 20,
    marginBottom: 20,
    padding: "10px 10px 10px 10px",
    width: "90%",
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
  heading: {
    fontWeight: 600,
    fontSize: 16,
    letterSpacing: "0.02em",
    color: "#f9f9f9",
    textAlign: "center",
  },
  para: {
    fontWeight: 400,
    fontSize: 12,
    letterSpacing: "0.02em",
    color: "#f9f9f9",
    textAlign: "center",
  },
}));

export default function TokenCard() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Box pt={0} px={3} className={classes.card}>
      <Grid
        container
        style={{ borderBottom: "0.5px solid #212121" }}
        pb={1}
        pt={2}
      >
        <Grid item md={1}>
          <Typography
            variant="body2"
            className={classes.para}
            textAlign="left"
            fontWeight={400}
          >
            Asset
          </Typography>
        </Grid>
        <Grid item md={1}>
          <Typography
            variant="body2"
            className={classes.para}
            textAlign="left"
            fontWeight={400}
          >
            Name
          </Typography>
        </Grid>
        <Grid item md={2}>
          <Typography
            variant="body2"
            className={classes.para}
            textAlign="left"
            fontWeight={400}
          >
            Amount
          </Typography>
        </Grid>
        <Grid item md={2}>
          <Typography
            variant="body2"
            className={classes.para}
            textAlign="left"
            fontWeight={400}
          >
            Price
          </Typography>
        </Grid>
        <Grid item md={2}>
          <Typography
            variant="body2"
            className={classes.para}
            textAlign="left"
            fontWeight={400}
          >
            Buy Price
          </Typography>
        </Grid>
        <Grid item md={2}>
          <Typography
            variant="body2"
            className={classes.para}
            textAlign="left"
            fontWeight={400}
          >
            PNL
          </Typography>
        </Grid>
        <Grid item md={2}>
          <Typography
            variant="body2"
            className={classes.para}
            textAlign="left"
            fontWeight={400}
          >
            Holding
          </Typography>
        </Grid>
      </Grid>
      <Box>
        <Grid container p={2} style={{ borderBottom: "0.5px solid #212121" }}>
          <Grid item md={1}>
            <img
              src="https://cdn3d.iconscout.com/3d/premium/thumb/ethereum-eth-coin-4722965-3917991.png"
              alt="ETH"
              height="36px"
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
                variant="body2"
                className={classes.heading}
                textAlign="left"
                fontWeight={600}
              >
                ETH
              </Typography>
              <Typography
                variant="body2"
                className={classes.para}
                textAlign="left"
                fontWeight={400}
              >
                Ethereum
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
            {" "}
            <Box>
              <Typography
                variant="body2"
                className={classes.para}
                textAlign="left"
                fontWeight={400}
              >
                3,327
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
                className={classes.para}
                textAlign="left"
                fontWeight={400}
              >
                $1,323
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
                className={classes.para}
                textAlign="left"
                fontWeight={400}
              >
                $1,632
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
                className={classes.para}
                textAlign="left"
                fontWeight={400}
              >
                +13%
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
                className={classes.para}
                textAlign="left"
                fontWeight={400}
              >
                $12,382
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container p={2} style={{ borderBottom: "0.5px solid #212121" }}>
          <Grid item md={1}>
            <img
              src="https://cdn3d.iconscout.com/3d/premium/thumb/ethereum-eth-coin-4722965-3917991.png"
              alt="ETH"
              height="36px"
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
                variant="body2"
                className={classes.heading}
                textAlign="left"
                fontWeight={600}
              >
                ETH
              </Typography>
              <Typography
                variant="body2"
                className={classes.para}
                textAlign="left"
                fontWeight={400}
              >
                Ethereum
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
            {" "}
            <Box>
              <Typography
                variant="body2"
                className={classes.para}
                textAlign="left"
                fontWeight={400}
              >
                3,327
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
                className={classes.para}
                textAlign="left"
                fontWeight={400}
              >
                $1,323
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
                className={classes.para}
                textAlign="left"
                fontWeight={400}
              >
                $1,632
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
                className={classes.para}
                textAlign="left"
                fontWeight={400}
              >
                +13%
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
                className={classes.para}
                textAlign="left"
                fontWeight={400}
              >
                $12,382
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
