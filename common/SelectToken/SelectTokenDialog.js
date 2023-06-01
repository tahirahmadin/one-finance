import React, { useCallback, useMemo, useState } from "react";

import TokenList from "./TokenList";
import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Button,
  Checkbox,
  Dialog,
  Divider,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { tokenList } from "../../utils/data";

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundColor: "#1C1F23",
    color: theme.palette.primary.iconColor,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: 400,
    height: 500,
    [theme.breakpoints.down("sm")]: {
      width: "80vw",
      height: "100%",
      maxHeight: "80vh",
    },
  },
  heading: {
    fontSize: 18,
    fontWeight: 400,
    textAlign: "left",

    color: "#f9f9f9",
    [theme.breakpoints.down("sm")]: {
      fontSize: 20,
    },
  },

  input: {
    backgroundColor: "transparent",
    height: 50,
    border: "1px solid rgba(224, 224, 224,0.1)",
    borderRadius: 15,
    fontSize: 16,
    width: "90%",
    color: "#f9f9f9",
    padding: 10,
    outline: "none",
    [theme.breakpoints.down("sm")]: {
      height: 45,
      fontSize: 15,
    },
  },
  buttons: {
    marginBottom: 7,
  },

  closeIcon: {
    color: "#6E67B6",
    fontSize: 24,
    [theme.breakpoints.down("sm")]: {
      fontSize: 20,
    },
  },
  cancelButton: {
    backgroundColor: "#4369B0",
    color: "#4369B0",
    width: "100%",
    textTransform: "none",
    fontSize: 17,
    borderRadius: 20,
    padding: "8px 50px 8px 50px",

    [theme.breakpoints.down("sm")]: {
      fontSize: 16,
    },
  },
}));

const SelectTokenDialog = ({
  open,
  handleClose,
  handleTokenSelected,
  disableToken,
}) => {
  const classes = useStyles();

  const [filterInput, setFilterInput] = useState("");
  //   const { chainId } = useActiveWeb3React();
  const tokens = useSelector((state) => state?.list?.tokens);
  const [stockSelected, setStockSelected] = useState(
    localStorage.selectedList === "true" ? true : false
  );

  const onTokenSelect = (token) => {
    handleTokenSelected(token);
    handleClose();
  };

  const filteredTokenList = useMemo(() => {
    if (!tokenList) {
      return [];
    }

    const filtered =
      tokenList &&
      tokenList.filter(
        (item) =>
          (item.symbol &&
            item.symbol
              .toLocaleLowerCase()
              .includes(filterInput.toLocaleLowerCase())) ||
          (item.name &&
            item.name
              .toLowerCase()
              .includes(filterInput.toLocaleLowerCase())) ||
          (item.address &&
            item.address
              .toLowerCase()
              .includes(filterInput.toLocaleLowerCase()))
      );

    return filtered;
  }, [tokenList, filterInput]);

  const handleTokenFilter = async (value) => {
    if (!value) {
      const _value = "";
      setFilterInput(_value);
      return;
    }

    const _value = value.split(" ").join("");

    setFilterInput(_value);
  };

  const resetInputState = () => {
    handleTokenFilter("");
  };

  const onClose = () => {
    handleClose();
    resetInputState();
  };

  // const dispatch = useDispatch();

  // const handleListOptionChange = useCallback(() => {
  //   setStockSelected(!stockSelected);
  //   localStorage.selectedList = !stockSelected;

  //   dispatch(getTokenList(localStorage.selectedList === "true"));
  // }, [stockSelected, setStockSelected]);

  return (
    <Dialog
      onClose={onClose}
      open={open}
      disableBackdropClick
      className={classes.dialog}
      color="transparent"
      PaperProps={{
        style: { borderRadius: 20, backgroundColor: "#121827" },
      }}
    >
      <div className={classes.background}>
        <div
          className="d-flex justify-content-between"
          style={{ width: "90%", paddingTop: 20, paddingBottom: 15 }}
        >
          <div className={classes.heading}>Select a token</div>
          <div>
            <IconButton style={{ margin: 0, padding: 0 }}>
              <Close onClick={onClose} className={classes.closeIcon}></Close>
            </IconButton>
          </div>
        </div>

        <input
          type="text"
          className={classes.input}
          value={filterInput}
          placeholder="Search...."
          onChange={({ target: { value } }) => handleTokenFilter(value)}
        />
        <Divider
          style={{
            width: "100%",
            borderTop: "1px solid #616161",
            marginTop: 15,
          }}
        />

        {/* <div className="d-flex">
          <div className={classes.heading}>
            Platts{" "}
            <Checkbox
              checked={!stockSelected}
              onChange={handleListOptionChange}
            />
          </div>
          <div className={classes.heading}>
            {" "}
            Stocks{" "}
            <Checkbox
              checked={stockSelected}
              onChange={handleListOptionChange}
            />
          </div>
        </div> */}
        <TokenList
          handleItemSelected={onTokenSelect}
          tokens={filteredTokenList}
          disableToken={disableToken}
        />

        <Divider
          style={{
            width: "100%",
            borderTop: "1px solid #616161",
            marginTop: 15,
            marginBottom: 10,
          }}
        />
        <div>
          <Button
            onClick={onClose}
            style={{
              backgroundColor: "#6E67B6",
              color: "#f9f9f9",
              width: "100%",
              textTransform: "none",
              fontSize: 15,
              borderRadius: 10,
              padding: "10px 50px 10px 50px",
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default SelectTokenDialog;
