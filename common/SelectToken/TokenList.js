import { List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import TokenIcon from "../TokenIcon";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    position: "relative",
    overflowY: "auto",
    maxHeight: 380,
    padding: 5,
  },
  tokenIcon: {
    height: "100%",
    width: 40,
    padding: 3,
    borderRadius: "50%",
    backgroundColor: theme.palette.primary.tokenBack,
    [theme.breakpoints.down("sm")]: {
      height: 32,
    },
  },
  tokenTitle: {
    padding: 0,
    margin: 0,
    color: "#f9f9f9",
    fontSize: 14,
    [theme.breakpoints.down("sm")]: {
      fontSize: 15,
    },
  },
  tokenSubtitle: {
    color: "#e5e5e5",
    fontWeight: 400,
    fontSize: 12,
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
    },
  },
  listItem: {
    marginTop: 5,
    marginBottom: 5,
    "&:hover": {
      background: "rgba(0, 0, 0, 0.9)",
      borderRadius: 3,
    },
  },
}));

const TokenList = ({ handleItemSelected, tokens, disableToken }) => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {tokens.map((token, index) => (
        <ListItem
          style={{ height: 65 }}
          button
          key={index}
          className={classes.listItem}
          onClick={() => handleItemSelected(token)}
          disabled={
            !disableToken ? false : token.symbol === disableToken.symbol
          }
        >
          <ListItemAvatar>
            <TokenIcon path={token?.logoURI} className={classes.tokenIcon} />
          </ListItemAvatar>
          <ListItemText
            primary={<p className={classes.tokenTitle}>{token.symbol}</p>}
            secondary={
              <span className={classes.tokenSubtitle}>{token.name}</span>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default React.memo(TokenList);
