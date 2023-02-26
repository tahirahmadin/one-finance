import Web3 from "web3";
import ERC20RG from "../abi/ERC20RG.json";
import FarmingABI from "../abi/FarmingABI.json";
import OneRareMarketplace from "../abi/OneRareMarketplace.json";
import constants from "../utils/constants";

const web3Instance = (provider) => {
  if (provider === "unavailable") {
    const rpcProvider =
      constants.net === 1
        ? `https://rpc-mumbai.maticvigil.com`
        : `https://polygon-mainnet.g.alchemy.com/v2/38R9Vnxi-6UPne8ACF4k4radrS8-6UJ1`;
    return new Web3(new Web3.providers.HttpProvider(rpcProvider));
  } else {
    return new Web3(provider);
  }
};

export const tokenInstance = (provider = "unavailable") => {
  try {
    var web3 = web3Instance(provider);
    var tokenContract = new web3.eth.Contract(
      ERC20RG.abi,
      process.env.NEXT_PUBLIC_ORARE_CONTRACT
    );
    return tokenContract;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const farmInstance = (poolNo, provider = "unavailable") => {
  try {
    var web3 = web3Instance(provider);
    var farmContract = new web3.eth.Contract(
      FarmingABI.abi,
      constants.farmingContract[poolNo]
    );
    return farmContract;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const marketplaceInstance = (provider = "unavailable") => {
  try {
    var web3 = web3Instance(provider);
    var marketplaceContract = new web3.eth.Contract(
      OneRareMarketplace.abi,
      process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT
    );
    return marketplaceContract;
  } catch (err) {
    console.log(err);
    return null;
  }
};
