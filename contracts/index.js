import Web3 from "web3";
import ERC20RG from "../abi/ERC20RG.json";
import TradingContractABI from "../abi/ERC20Trading.json";
import AccumulationContractABI from "../abi/AccumulationABI.json";
import DcaContractABI from "../abi/DcaABI.json";

import { constants } from "../utils/constants";

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
      ERC20RG,
      constants.contracts.fiat
    );

    return tokenContract;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const tradingInstance = (provider = "unavailable") => {
  let contract_address = process.env.NEXT_PUBLIC_TRADING_CONTRACT;
  try {
    var web3 = web3Instance(provider);
    var tradingContract = new web3.eth.Contract(
      TradingContractABI,
      contract_address
    );
    return tradingContract;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const accumulationInstance = (provider = "unavailable") => {
  let contract_address = constants.contracts.accumulation;
  try {
    var web3 = web3Instance(provider);
    var accumulationContract = new web3.eth.Contract(
      AccumulationContractABI,
      contract_address
    );
    return accumulationContract;
  } catch (err) {
    console.log(err);
    return null;
  }
};

// DCA Contract
export const dcaInstance = (provider = "unavailable") => {
  let contract_address = constants.contracts.dca;
  try {
    var web3 = web3Instance(provider);
    var dcaContract = new web3.eth.Contract(DcaContractABI, contract_address);
    return dcaContract;
  } catch (err) {
    console.log(err);
    return null;
  }
};
