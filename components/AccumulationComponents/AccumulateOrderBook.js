import { makeStyles } from "@mui/styles";

import {
  Accordion,
  Box,
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: "#0C0D11",
    marginTop: 20,
    marginBottom: 20,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    width: "100%",
    minHeight: 250,
    border: "1px solid #1b1d24",
    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.03)",
    borderRadius: 14,
    "&:hover": {
      boxShadow: "0px 24px 33px -9px #0000005C",
    },

    [theme.breakpoints.down("md")]: {
      height: "100%",
      width: "100%",
    },
  },
}));

const AccumulateOrderBook = () => {
  const classes = useStyles();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Typography fontWeight={600} fontSize={18} color={"#f9f9f9"}>
          Order book
        </Typography>
        <Accordion
          expanded={false}
          style={{
            width: "25%",
            backgroundColor: "transparent",
            border: "1px solid #2d2d32",
            borderRadius: 14,
            paddingLeft: 5,
            paddingTop: 5,
            paddingBottom: 5,
          }}
          disableGutters={true}
        >
          <Box
            display="flex"
            flexDirection={"row"}
            justifyContent="flex-start"
            alignItems="center"
          >
            <img
              src={
                "https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png"
              }
              alt={"TokenLogo"}
              height="28px"
            />
            <Box ml={1}>
              <Typography
                variant="body2"
                fontWeight={600}
                color={"#e5e5e5"}
                lineHeight={1}
                padding={0}
              >
                MATIC{" "}
              </Typography>
            </Box>
          </Box>
        </Accordion>
      </Box>

      <Box
        style={{
          border: "1px solid #0C0D12",
          backgroundColor: "#111214",
          borderRadius: 14,
          padding: 6,
          paddingLeft: 20,
          paddingRight: 20,
          width: "auto",
        }}
      >
        <Grid container py={0.5}>
          <Grid item md={4}>
            <Typography
              variant="body2"
              fontWeight={300}
              fontSize={11}
              color={"#bdbdbd"}
            >
              Type
            </Typography>
          </Grid>

          <Grid item md={4}>
            <Typography
              variant="body2"
              fontWeight={300}
              fontSize={11}
              color={"#bdbdbd"}
            >
              Price(USDT)
            </Typography>
          </Grid>
          <Grid item md={4}>
            <Typography
              variant="body2"
              fontWeight={300}
              fontSize={11}
              color={"#bdbdbd"}
            >
              Amount(USDT)
            </Typography>
          </Grid>
        </Grid>

        <Grid container mt={1} py={1}>
          <Grid item md={4}>
            <Typography
              variant="body2"
              fontWeight={500}
              fontSize={13}
              color={"#28C59A"}
            >
              BUY
            </Typography>
          </Grid>

          <Grid item md={4}>
            <Typography
              variant="body2"
              fontWeight={500}
              fontSize={13}
              color={"#fff"}
            >
              $1500
            </Typography>
          </Grid>
          <Grid item md={4}>
            <Typography
              variant="body2"
              fontWeight={500}
              fontSize={13}
              color={"#fff"}
            >
              $130
            </Typography>
          </Grid>
        </Grid>
        <Grid container mt={1} py={1}>
          <Grid item md={4}>
            <Typography
              variant="body2"
              fontWeight={500}
              fontSize={13}
              color={"#28C59A"}
            >
              BUY
            </Typography>
          </Grid>

          <Grid item md={4}>
            <Typography
              variant="body2"
              fontWeight={500}
              fontSize={13}
              color={"#fff"}
            >
              $1500
            </Typography>
          </Grid>
          <Grid item md={4}>
            <Typography
              variant="body2"
              fontWeight={500}
              fontSize={13}
              color={"#fff"}
            >
              $130
            </Typography>
          </Grid>
        </Grid>
        <Grid container mt={1} py={1}>
          <Grid item md={4}>
            <Typography
              variant="body2"
              fontWeight={500}
              fontSize={13}
              color={"#28C59A"}
            >
              BUY
            </Typography>
          </Grid>

          <Grid item md={4}>
            <Typography
              variant="body2"
              fontWeight={500}
              fontSize={13}
              color={"#fff"}
            >
              $1500
            </Typography>
          </Grid>
          <Grid item md={4}>
            <Typography
              variant="body2"
              fontWeight={500}
              fontSize={13}
              color={"#fff"}
            >
              $130
            </Typography>
          </Grid>
        </Grid>
        <Grid container mt={1} py={1}>
          <Grid item md={4}>
            <Typography
              variant="body2"
              fontWeight={500}
              fontSize={13}
              color={"#28C59A"}
            >
              BUY
            </Typography>
          </Grid>

          <Grid item md={4}>
            <Typography
              variant="body2"
              fontWeight={500}
              fontSize={13}
              color={"#fff"}
            >
              $1500
            </Typography>
          </Grid>
          <Grid item md={4}>
            <Typography
              variant="body2"
              fontWeight={500}
              fontSize={13}
              color={"#fff"}
            >
              $130
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default AccumulateOrderBook;
