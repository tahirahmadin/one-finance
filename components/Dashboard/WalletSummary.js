import React, { useCallback, useEffect, useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { AlarmOnTwoTone } from "@mui/icons-material";
import { useUserInvestmentInfo } from "../../hooks/useUserInvestmentInfo";
import Web3 from "web3";
import { useWeb3Auth } from "../../hooks/useWeb3Auth";
import { fromWei } from "../../utils/helper";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: "#171320",
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
  description: {
    fontWeight: 400,
    color: "#bdbdbd",
    textAlign: "left",
    lineHeight: 1.5,
    paddingTop: 5,
  },
  field: {
    fontWeight: 400,
    color: "#bdbdbd",
    textAlign: "center",
  },
  value: {
    fontWeight: 600,
    color: "#f9f9f9",
    textAlign: "center",
    lineHeight: 1.5,
    paddingTop: 5,
  },
  infoCard: {
    backgroundColor: "rgba(130, 71, 229, 0.1)",
    // borderTopRightRadius: 10,
    // borderTopLeftRadius: 10,
    borderRadius: 10,
    padding: "4%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  tokenDescription: {
    fontWeight: 400,
    fontSize: 12,
    color: "#bdbdbd",
    textAlign: "left",
  },
}));

export default function WalletSummary() {
  const classes = useStyles();
  const theme = useTheme();
  const { accountSC } = useWeb3Auth();
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const [strategyToInvestment, setStrategyToInvestment] = useState([]);

  // To fetch investment info
  const { userInvestmentInfo: investmentsData, loading } =
    useUserInvestmentInfo();

  useEffect(() => {
    if (investmentsData && investmentsData.length > 0) {
      let mergedData = [];
      investmentsData.map((ele) => {
        let duplicateEntryIndex = mergedData.findIndex(
          (uniqueSingle) => uniqueSingle.strategyType === ele.strategyType
        );

        // if data is already inside the result array
        if (duplicateEntryIndex >= 0) {
          mergedData[duplicateEntryIndex] = {
            balance:
              mergedData[duplicateEntryIndex].balance +
              parseFloat(fromWei(ele.fiatBalance)),
            strategyType: ele.strategyType,
            deposit:
              mergedData[duplicateEntryIndex].deposit +
              parseFloat(fromWei(ele.deposit)),
          };
        } else {
          // if data is not inside the result array
          mergedData.push({
            balance: parseFloat(fromWei(ele.fiatBalance)),
            strategyType: ele.strategyType,
            deposit: parseFloat(fromWei(ele.deposit)),
          });
        }
      });

      console.log(mergedData);

      setStrategyToInvestment(mergedData);
    }
  }, [investmentsData]);

  const getTotalInvestedOfUser = () => {
    if (!investmentsData) {
      return 0;
    } else {
      console.log(investmentsData);
      return investmentsData.reduce((a, b) => {
        return (
          a + parseFloat(Web3.utils.fromWei(b.fiatBalance.toString(), "ether"))
        );
      }, 0);
    }
  };
  return (
    <Box pt={0} className={classes.card}>
      {accountSC && (
        <Box>
          <Typography variant="body2" color="#bdbdbd" fontSize={12}>
            My Investments
          </Typography>
          <Typography
            variant="h2"
            style={{ fontWeight: 600, lineHeight: 1.6 }}
            fontSize={21}
          >
            ${getTotalInvestedOfUser()}
          </Typography>
        </Box>
      )}
      {accountSC && (
        <Box>
          {strategyToInvestment &&
            strategyToInvestment.map((singleInvest) => {
              return (
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  mt={1}
                  style={{
                    border: "1px solid rgba(106, 85, 234,0.1)",
                    padding: "7px 7px 7px 7px",
                    borderRadius: 10,
                    backgroundColor: "rgba(106, 85, 234,0.03)",
                  }}
                >
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <AlarmOnTwoTone style={{ color: "#e5e5e5" }} />
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
                        fontSize={13}
                      >
                        {singleInvest.strategyType}
                      </Typography>
                    </Box>
                  </Box>
                  <Box display={"flex"} justifyContent={"space-between"}>
                    <Box
                      ml={1}
                      display={"flex"}
                      flexDirection="column"
                      justifyContent="center"
                      alignItems={"flex-end"}
                    >
                      <Typography
                        variant="body2"
                        color={"#ffffff"}
                        style={{ lineHeight: 1.4 }}
                      >
                        ${singleInvest.balance}
                      </Typography>
                      <Typography
                        variant="verysmall"
                        textAlign="left"
                        fontWeight={500}
                        color={"#757575"}
                        style={{ lineHeight: 1.4 }}
                      >
                        Deposit: ${singleInvest.deposit}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              );
            })}
        </Box>
      )}
      {!accountSC && (
        <Box>
          <div className="text-center mt-5">
            <img
              src="finance.png"
              height="60px"
              style={{ opacity: 0.8 }}
              textAlign="center"
            />
          </div>
          <Typography
            pt={3}
            variant="h6"
            color="#e5e5e5"
            fontWeight={600}
            fontSize={13}
            textAlign="center"
          >
            No investment found
          </Typography>
          <Typography
            pt={1}
            variant="body2"
            color="#bdbdbd"
            fontSize={13}
            fontWeight={400}
            textAlign="center"
            px={3}
          >
            Login to see your investment preview here
          </Typography>
        </Box>
      )}
    </Box>
  );
}
