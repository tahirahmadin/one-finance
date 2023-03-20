import { tokenInstance, tradingInstance } from "../contracts";
import web3 from "../web3";
import constants from "../utils/constants";
import ethersServiceProvider from "../services/ethersServiceProvider";
import Web3 from "web3";

// ***************** ERC20 Token Contract *************** //
//READ BalanceOf Orare
//RETURNS number

export const getUserUSDTBalance = async (userAddress) => {
  let result = await tokenInstance()
    .methods.balanceOf(userAddress)
    .call((err, response) => {
      return response;
    });

  let finalAmount = web3.utils.fromWei(result.toString(), "ether");

  return finalAmount;
};

//READ approved
//RETURNS number
export const checkUSDTApproved = async (userAddress, contractAddress) => {
  return await tokenInstance()
    .methods.allowance(userAddress, contractAddress)
    .call((err, response) => {
      return response;
    });
};
// ***************** Trading Contract *************** //

//READ getPoolDetails
//RETURNS object
export const getPoolDetails = async (address) => {
  // let result = await tradingInstance()
  //   .methods.balances(address)
  //   .call((err, res) => {
  //     return res;
  //   });

  // return result;
  return 10;
};
