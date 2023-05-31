// 0 mainnet, 1 testnet
let network_type = 1;

export const constants = {
  net: network_type,
  chainIdMain: 137,
  chainIdMainInHex: "0x89",
  chainIdTest: 80001,
  chainIdTestInHex: "0x13881",
  backend_url: "",
  backend_dev: "http://localhost:5004",
  contracts: {
    fiat: "0xE118429D095de1a93951c67D04B523fE5cbAB62c",
    accumulation: "0x6a659bE81b515aec146839d423901BcE91D116A2",
  },
};

export const strategyType = {
  ACCUMULATION: "ACCUMULATION",
  DCA: "DCA",
};

export const graphQueryUrl =
  "https://api.thegraph.com/subgraphs/name/tahirahmadin/sleepswap";
