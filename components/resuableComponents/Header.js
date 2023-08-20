import React, { useEffect, useState } from "react";
import { Box, Button, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@mui/material";
import { useRouter } from "next/router";
import { Container } from "@mui/system";

const useStyles = makeStyles((theme) => ({
  background: {
    width: "100%",
    paddingLeft: "3%",
    paddingRight: "3%",
    [theme.breakpoints.down("md")]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  linkItems: {
    fontWeight: 400,
    fontSize: 14,
    [theme.breakpoints.down("md")]: {
      fontSize: 14,
    },
  },
  paper: {
    top: 0,
    left: "unset !important",
    right: 0,
    width: 220,
    borderRadius: "0",
    backgroundColor: "black",
    transformOrigin: "16px -1px !important",
    paddingTop: 20,
    overflow: "hidden",
  },
  listItem: {
    justifyContent: "flex-start",
  },
  buttonConnect: {
    backgroundColor: theme.palette.secondary.main,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: "white",
    },
  },
}));

const Header = () => {
  const theme = useTheme();
  const store = useSelector((state) => state);
  const { refetchValue } = store.ui;
  const md = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const [success, setSuccess] = useState(0);
  const classes = useStyles();

  return (
    <Box className={classes.background}>
      <Container>
        <header>
          <Box
            style={{
              color: theme.palette.primary.contrastText,
              display: !md && "flex",
              paddingTop: "1rem",
              paddingBottom: "1rem",
              alignItems: "center",
              justifyContent: !md && "flex-end",
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent={"space-between"}
            >
              <Button
                color="primary"
                style={{
                  fontWeight: 600,
                  minWidth: 120,
                  borderRadius: 14,
                  paddingLeft: 14,
                  paddingRight: 14,
                  textTransform: "capitalize",
                }}
                className={classes.buttonConnect}
              >
                Login Now
              </Button>
            </Box>
          </Box>
        </header>
      </Container>
    </Box>
  );
};

export default Header;
