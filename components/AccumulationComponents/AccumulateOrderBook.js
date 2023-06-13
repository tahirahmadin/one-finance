import { makeStyles } from "@mui/styles";
import { Pending, Wallet } from "@mui/icons-material";

import {
  Box,
  Button,
  IconButton,
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
      <Typography fontWeight={600} fontSize={18} color={"#f9f9f9"}>
        Order book
      </Typography>

      <Box mt={1}>
        <Box
          style={{
            border: "1px solid #0C0D12",
            backgroundColor: "#111214",
            borderRadius: 14,
            padding: 10,
            paddingLeft: 20,
            paddingRight: 20,
            width: "auto",
          }}
          display={"flex"}
          justifyContent={"space-between"}
        >
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <IconButton color="success" style={{ height: 16, width: 16 }}>
              <Pending style={{ fontSize: 16 }} />
            </IconButton>
            <Box ml={2}>
              <Typography
                variant="verysmall"
                fontWeight={300}
                fontSize={12}
                color={"#e5e5e5"}
              >
                BTC
              </Typography>
              <Typography
                variant="body2"
                fontWeight={600}
                fontSize={14}
                color={"#fff"}
              >
                Bitcoin
              </Typography>
            </Box>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box ml={2}>
              <Typography
                variant="verysmall"
                fontWeight={300}
                fontSize={12}
                color={"#e5e5e5"}
              >
                USDT
              </Typography>
              <Typography
                variant="body2"
                fontWeight={600}
                fontSize={14}
                color={"#fff"}
              >
                132
              </Typography>
            </Box>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box ml={2}>
              <Typography
                variant="verysmall"
                fontWeight={300}
                fontSize={12}
                color={"#e5e5e5"}
              >
                BTC
              </Typography>
              <Typography
                variant="body2"
                fontWeight={600}
                fontSize={14}
                color={"#fff"}
              >
                0.27
              </Typography>
            </Box>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box ml={2}>
              <Typography
                variant="verysmall"
                fontWeight={300}
                fontSize={12}
                color={"#e5e5e5"}
              >
                Price
              </Typography>
              <Typography
                variant="body2"
                fontWeight={600}
                fontSize={14}
                color={"#fff"}
              >
                $25,500
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          style={{
            border: "1px solid #0C0D12",
            backgroundColor: "#111214",
            borderRadius: 14,
            padding: 10,
            paddingLeft: 20,
            paddingRight: 20,
            width: "auto",
          }}
          display={"flex"}
          justifyContent={"space-between"}
        >
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <IconButton color="success" style={{ height: 16, width: 16 }}>
              <Pending style={{ fontSize: 16 }} />
            </IconButton>
            <Box ml={2}>
              <Typography
                variant="verysmall"
                fontWeight={300}
                fontSize={12}
                color={"#e5e5e5"}
              >
                BTC
              </Typography>
              <Typography
                variant="body2"
                fontWeight={600}
                fontSize={14}
                color={"#fff"}
              >
                Bitcoin
              </Typography>
            </Box>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box ml={2}>
              <Typography
                variant="verysmall"
                fontWeight={300}
                fontSize={12}
                color={"#e5e5e5"}
              >
                USDT
              </Typography>
              <Typography
                variant="body2"
                fontWeight={600}
                fontSize={14}
                color={"#fff"}
              >
                132
              </Typography>
            </Box>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box ml={2}>
              <Typography
                variant="verysmall"
                fontWeight={300}
                fontSize={12}
                color={"#e5e5e5"}
              >
                BTC
              </Typography>
              <Typography
                variant="body2"
                fontWeight={600}
                fontSize={14}
                color={"#fff"}
              >
                0.29
              </Typography>
            </Box>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box ml={2}>
              <Typography
                variant="verysmall"
                fontWeight={300}
                fontSize={12}
                color={"#e5e5e5"}
              >
                Price
              </Typography>
              <Typography
                variant="body2"
                fontWeight={600}
                fontSize={14}
                color={"#fff"}
              >
                $24,000
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          style={{
            border: "1px solid #0C0D12",
            backgroundColor: "#111214",
            borderRadius: 14,
            padding: 10,
            paddingLeft: 20,
            paddingRight: 20,
            width: "auto",
          }}
          display={"flex"}
          justifyContent={"space-between"}
        >
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <IconButton color="success" style={{ height: 16, width: 16 }}>
              <Pending style={{ fontSize: 16 }} />
            </IconButton>
            <Box ml={2}>
              <Typography
                variant="verysmall"
                fontWeight={300}
                fontSize={12}
                color={"#e5e5e5"}
              >
                BTC
              </Typography>
              <Typography
                variant="body2"
                fontWeight={600}
                fontSize={14}
                color={"#fff"}
              >
                Bitcoin
              </Typography>
            </Box>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box ml={2}>
              <Typography
                variant="verysmall"
                fontWeight={300}
                fontSize={12}
                color={"#e5e5e5"}
              >
                USDT
              </Typography>
              <Typography
                variant="body2"
                fontWeight={600}
                fontSize={14}
                color={"#fff"}
              >
                132
              </Typography>
            </Box>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box ml={2}>
              <Typography
                variant="verysmall"
                fontWeight={300}
                fontSize={12}
                color={"#e5e5e5"}
              >
                BTC
              </Typography>
              <Typography
                variant="body2"
                fontWeight={600}
                fontSize={14}
                color={"#fff"}
              >
                0.32
              </Typography>
            </Box>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box ml={2}>
              <Typography
                variant="verysmall"
                fontWeight={300}
                fontSize={12}
                color={"#e5e5e5"}
              >
                Price
              </Typography>
              <Typography
                variant="body2"
                fontWeight={600}
                fontSize={14}
                color={"#fff"}
              >
                $22,500
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          style={{
            border: "1px solid #0C0D12",
            backgroundColor: "#111214",
            borderRadius: 14,
            padding: 10,
            paddingLeft: 20,
            paddingRight: 20,
            width: "auto",
          }}
          display={"flex"}
          justifyContent={"space-between"}
        >
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <IconButton color="success" style={{ height: 16, width: 16 }}>
              <Pending style={{ fontSize: 16 }} />
            </IconButton>
            <Box ml={2}>
              <Typography
                variant="verysmall"
                fontWeight={300}
                fontSize={12}
                color={"#e5e5e5"}
              >
                BTC
              </Typography>
              <Typography
                variant="body2"
                fontWeight={600}
                fontSize={14}
                color={"#fff"}
              >
                Bitcoin
              </Typography>
            </Box>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box ml={2}>
              <Typography
                variant="verysmall"
                fontWeight={300}
                fontSize={12}
                color={"#e5e5e5"}
              >
                USDT
              </Typography>
              <Typography
                variant="body2"
                fontWeight={600}
                fontSize={14}
                color={"#fff"}
              >
                132
              </Typography>
            </Box>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box ml={2}>
              <Typography
                variant="verysmall"
                fontWeight={300}
                fontSize={12}
                color={"#e5e5e5"}
              >
                BTC
              </Typography>
              <Typography
                variant="body2"
                fontWeight={600}
                fontSize={14}
                color={"#fff"}
              >
                0.39
              </Typography>
            </Box>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box ml={2}>
              <Typography
                variant="verysmall"
                fontWeight={300}
                fontSize={12}
                color={"#e5e5e5"}
              >
                Price
              </Typography>
              <Typography
                variant="body2"
                fontWeight={600}
                fontSize={14}
                color={"#fff"}
              >
                $21,000
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          style={{
            border: "1px solid #0C0D12",
            backgroundColor: "#111214",
            borderRadius: 14,
            padding: 10,
            paddingLeft: 20,
            paddingRight: 20,
            width: "auto",
          }}
          display={"flex"}
          justifyContent={"space-between"}
        >
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <IconButton color="success" style={{ height: 16, width: 16 }}>
              <Pending style={{ fontSize: 16 }} />
            </IconButton>
            <Box ml={2}>
              <Typography
                variant="verysmall"
                fontWeight={300}
                fontSize={12}
                color={"#e5e5e5"}
              >
                BTC
              </Typography>
              <Typography
                variant="body2"
                fontWeight={600}
                fontSize={14}
                color={"#fff"}
              >
                Bitcoin
              </Typography>
            </Box>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box ml={2}>
              <Typography
                variant="verysmall"
                fontWeight={300}
                fontSize={12}
                color={"#e5e5e5"}
              >
                USDT
              </Typography>
              <Typography
                variant="body2"
                fontWeight={600}
                fontSize={14}
                color={"#fff"}
              >
                132
              </Typography>
            </Box>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box ml={2}>
              <Typography
                variant="verysmall"
                fontWeight={300}
                fontSize={12}
                color={"#e5e5e5"}
              >
                BTC
              </Typography>
              <Typography
                variant="body2"
                fontWeight={600}
                fontSize={14}
                color={"#fff"}
              >
                0.43
              </Typography>
            </Box>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box ml={2}>
              <Typography
                variant="verysmall"
                fontWeight={300}
                fontSize={12}
                color={"#e5e5e5"}
              >
                Price
              </Typography>
              <Typography
                variant="body2"
                fontWeight={600}
                fontSize={14}
                color={"#fff"}
              >
                $27,000
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default AccumulateOrderBook;
