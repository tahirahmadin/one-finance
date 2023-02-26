import { tokenInstance, farmInstance } from "../contracts";
import web3 from "../web3";
import constants from "../utils/constants";
import ethersServiceProvider from "../services/ethersServiceProvider";
import Web3 from "web3";

// ***************** ERC20 Token Contract *************** //
//READ BalanceOf Orare
//RETURNS number

export const getUserOrareBalance = async (userAddress) => {
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
export const checkOrareApproved = async (userAddress, contractAddress) => {
  return await tokenInstance()
    .methods.allowance(userAddress, contractAddress)
    .call((err, response) => {
      return response;
    });
};
// ***************** Farming Contract *************** //

//READ getSmartPoolDetails
//RETURNS object
export const getSmartPoolDetails = async (currentCategory) => {
  let result = await farmInstance(currentCategory)
    .methods.getDetails()
    .call((err, res) => {
      return res;
    });

  return result;
};

//READ getSmartPoolDetails
//RETURNS object
export const getSmartStakerInfo = async (currentCategory, userAddress) => {
  let result = await farmInstance(currentCategory)
    .methods.getStakerInfo(userAddress)
    .call((err, res) => {
      console.log(res);
      return res;
    });
  console.log("result");
  console.log(result);

  return result;
};

//READ getSmartPoolDetails
//RETURNS object
export const getLockedStatus = async (currentCategory) => {
  let result = await farmInstance(currentCategory)
    .methods.isLocked()
    .call((err, res) => {
      return res;
    });

  return result;
};

//READ getSmartPoolDetails
//RETURNS object
export const getUniqueNFTsInPool = async (currentCategory) => {
  let result = await farmInstance(currentCategory)
    .methods.getAllRewardNftIds()
    .call((err, res) => {
      return res;
    });
  let count = [...new Set(result)].length;
  return count;
};

//READ getSmartPoolDetails
//RETURNS object
export const getUniqueNftIdsInPool = async (currentCategory) => {
  let result = await farmInstance(currentCategory)
    .methods.getAllRewardNftIds()
    .call((err, res) => {
      return res;
    });

  return result;
};

//READ getHighestYeildPool
//RETURNS poolId
export const getHighestYeildPool = async () => {
  let poolData = [];

  let data = [...Array(6)].map(async (value, index) => {
    let response = await getSmartPoolDetails(index);
    let stakedValue = parseInt(response.totalFundsStaked)
      ? parseInt(response.totalFundsStaked)
      : 1;
    let ratio = (10000000 * parseInt(response.rewardPerSec)) / stakedValue;
    return ratio;
  });

  let resultObject = await Promise.all(data).then((output) => {
    return output;
  });

  const max = Math.max(...resultObject);
  const index = resultObject.indexOf(max);
  return index;
};

//READ getIsFarmingApprovedd
//RETURNS number
export const getIsFarmingApproved = async (currentCategory, userAddress) => {
  let farmingContract = constants.farmingContract[currentCategory];

  let result = await tokenInstance()
    .methods.allowance(userAddress, farmingContract)
    .call((err, res) => {
      return res;
    });
  console.log(result);
  if (result > 0) {
    return true;
  } else {
    return false;
  }
};

// READ getTotalTokenStakd
// RETURN number
export const getTotalTokensStaked = async () => {
  let data = [...Array(6)].map(async (value, index) => {
    let response = await getSmartPoolDetails(index);

    return Web3.utils.fromWei(response.totalFundsStaked, "ether");
  });

  let resultObject = await Promise.all(data).then((output) => {
    return output.reduce((a, b) => parseInt(a) + parseInt(b), 0);
  });

  return resultObject;
};
//READ check allowance of marketplace contract
//RETURNS number
export const getMarketplaceAllowance = async () => {
  try {
    let userAddress = ethersServiceProvider.currentAccount;
    let marketplaceContract = process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT;

    let result = await tokenInstance()
      .methods.allowance(userAddress, marketplaceContract)
      .call((err, res) => {
        return res;
      });

    return result;
  } catch (err) {
    console.log("errMarket");
    console.log(err);
    return null;
  }
};
