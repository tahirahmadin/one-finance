import React from "react";
import { makeStyles } from "@mui/styles";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { SavingsTwoTone, ShowChartTwoTone } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: "#18181A",
    backgroundImage: `url(https://uploads-ssl.webflow.com/625440d…/625d972…_nft-sec-mockup.png)`,
    backgroundPosition: "100%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "auto 100%",
    borderRadius: "1em",
    flex: 1,
    padding: "1.5em",
    width: "100%",
    minHeight: 295,
    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.03)",
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
}));

export default function SummaryCard() {
  const classes = useStyles();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box pt={0} className={classes.card}>
      <Typography variant="h4" className={classes.title}>
        Summary
      </Typography>
      <Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          mt={1}
          style={{
            padding: "7px 7px 7px 7px",
            borderRadius: 10,
          }}
        >
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <SavingsTwoTone style={{ color: "#bdbdbd", fontSize: 28 }} />
            <Box
              ml={1}
              display={"flex"}
              flexDirection="column"
              justifyContent="center"
              alignItems={"flex-start"}
            >
              <Typography
                variant="body2"
                color={"#ffffff"}
                style={{ lineHeight: 1.4, textTransaform: "lowercase" }}
                fontSize={14}
              >
                Bank
              </Typography>
              <Typography
                variant="body2"
                color={"#bdbdbd"}
                style={{ lineHeight: 1.4, textTransaform: "lowercase" }}
                fontSize={12}
              >
                State Bank Of India
              </Typography>
            </Box>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"flex-end"}
            alignItems={"center"}
          >
            <Typography
              variant="body2"
              color={"#ffffff"}
              style={{ lineHeight: 1.4 }}
            >
              ₹40,000
            </Typography>
          </Box>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          mt={1}
          style={{
            padding: "7px 7px 7px 7px",
            borderRadius: 10,
          }}
        >
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <ShowChartTwoTone style={{ color: "#bdbdbd", fontSize: 28 }} />
            <Box
              ml={1}
              display={"flex"}
              flexDirection="column"
              justifyContent="center"
              alignItems={"flex-start"}
            >
              <Typography
                variant="body2"
                color={"#ffffff"}
                style={{ lineHeight: 1.4, textTransaform: "lowercase" }}
                fontSize={14}
              >
                Stocks
              </Typography>
              <Typography
                variant="body2"
                color={"#bdbdbd"}
                style={{ lineHeight: 1.4, textTransaform: "lowercase" }}
                fontSize={12}
              >
                Zerodha
              </Typography>
            </Box>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"flex-end"}
            alignItems={"center"}
          >
            <Typography
              variant="body2"
              color={"#ffffff"}
              style={{ lineHeight: 1.4 }}
            >
              ₹325,000
            </Typography>
          </Box>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          mt={1}
          style={{
            padding: "7px 7px 7px 7px",
            borderRadius: 10,
          }}
        >
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <ShowChartTwoTone style={{ color: "#bdbdbd", fontSize: 28 }} />
            <Box
              ml={1}
              display={"flex"}
              flexDirection="column"
              justifyContent="center"
              alignItems={"flex-start"}
            >
              <Typography
                variant="body2"
                color={"#ffffff"}
                style={{ lineHeight: 1.4, textTransaform: "lowercase" }}
                fontSize={14}
              >
                Stocks
              </Typography>
              <Typography
                variant="body2"
                color={"#bdbdbd"}
                style={{ lineHeight: 1.4, textTransaform: "lowercase" }}
                fontSize={12}
              >
                Groww
              </Typography>
            </Box>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"flex-end"}
            alignItems={"center"}
          >
            <Typography
              variant="body2"
              color={"#ffffff"}
              style={{ lineHeight: 1.4 }}
            >
              ₹112,000
            </Typography>
          </Box>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          mt={1}
          style={{
            padding: "7px 7px 7px 7px",
            borderRadius: 10,
          }}
        >
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <SavingsTwoTone style={{ color: "#bdbdbd", fontSize: 28 }} />
            <Box
              ml={1}
              display={"flex"}
              flexDirection="column"
              justifyContent="center"
              alignItems={"flex-start"}
            >
              <Typography
                variant="body2"
                color={"#ffffff"}
                style={{ lineHeight: 1.4, textTransaform: "lowercase" }}
                fontSize={14}
              >
                Mutual Funds
              </Typography>
              <Typography
                variant="body2"
                color={"#bdbdbd"}
                style={{ lineHeight: 1.4, textTransaform: "lowercase" }}
                fontSize={12}
              >
                PhonePe
              </Typography>
            </Box>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"flex-end"}
            alignItems={"center"}
          >
            <Typography
              variant="body2"
              color={"#ffffff"}
              style={{ lineHeight: 1.4 }}
            >
              ₹112,000
            </Typography>
          </Box>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          mt={1}
          style={{
            padding: "7px 7px 7px 7px",
            borderRadius: 10,
          }}
        >
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <SavingsTwoTone style={{ color: "#bdbdbd", fontSize: 28 }} />
            <Box
              ml={1}
              display={"flex"}
              flexDirection="column"
              justifyContent="center"
              alignItems={"flex-start"}
            >
              <Typography
                variant="body2"
                color={"#ffffff"}
                style={{ lineHeight: 1.4, textTransaform: "lowercase" }}
                fontSize={14}
              >
                Crypto
              </Typography>
              <Typography
                variant="body2"
                color={"#bdbdbd"}
                style={{ lineHeight: 1.4, textTransaform: "lowercase" }}
                fontSize={12}
              >
                Binance
              </Typography>
            </Box>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"flex-end"}
            alignItems={"center"}
          >
            <Typography
              variant="body2"
              color={"#ffffff"}
              style={{ lineHeight: 1.4 }}
            >
              ₹612,000
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
