import React, { useCallback, useEffect, useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

import { constants } from "../../utils/constants";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: "#171320",

    // maxWidth: 320,
    width: "100%",
    height: "100%",
    maxHeight: 310,
    border: "4px solid #171320",
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

export default function ArticleCard({
  title,
  image = "https://zebpay.com/in/wp-content/uploads/2022/09/Dollar-Cost-Average.jpg",
  url,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Link href={url} style={{ textDecoration: "none" }} target="blank">
      <Box className={classes.card}>
        <div
          style={{
            width: "100%",
            borderTopRightRadius: 14,
            borderTopLeftRadius: 14,
            height: 200,
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <Typography
          variant="body2"
          fontSize={md ? 18 : 16}
          px={1}
          py={2}
          mb={1}
          fontWeight={500}
          color={"#e5e5e5"}
        >
          {title}
        </Typography>
      </Box>
    </Link>
  );
}
