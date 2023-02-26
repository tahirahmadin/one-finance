import React from "react";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  container: {},
  image: {
    width: "100%",
    maxWidth: "80vw",
    height: "100%",
    objectFit: "contain",
    [theme.breakpoints.down("sm")]: {
      margin: "20px auto",
    },
  },
}));

const HomePageTiles = ({
  headerText,
  bodyText1,
  bodyText2,
  button,
  buttonText,
  animated,
  img,
  buttonLink,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("md"));
  const md = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box>
      {animated ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <img src={img} className={classes.animation_url} />
        </Box>
      ) : (
        <Box p={md && 10} py={sm ? 10 : 20}>
          <Typography
            variant={md ? "h2" : "h3"}
            sx={{ mb: 6, textAlign: "center" }}
          >
            {headerText}
          </Typography>
          <Typography
            variant={md ? "subtitle1" : "body2"}
            sx={{ mb: 3 }}
            style={{
              fontWeight: "normal",
              lineHeight: "normal",
              textAlign: sm && "center",
            }}
          >
            {bodyText1}
          </Typography>
          <Typography
            variant={md ? "subtitle1" : "body2"}
            sx={{ mb: 3 }}
            style={{
              fontWeight: "normal",
              lineHeight: "normal",
              textAlign: sm && "center",
            }}
          >
            {bodyText2}
          </Typography>
          {button && (
            <Link href={buttonLink}>
              <a style={{ textDecoration: "none" }}>
                <Button
                  variant="outlined"
                  sx={{
                    border: "1px solid black",
                    bgcolor: theme.palette.primary.main,
                    borderRadius: "12px",
                    color: "#000",
                    display: "block",
                    m: "auto",
                    px: 4,
                  }}
                >
                  {buttonText}
                </Button>
              </a>
            </Link>
          )}
        </Box>
      )}
    </Box>
  );
};

export default HomePageTiles;
