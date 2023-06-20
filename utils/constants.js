// 0 mainnet, 1 testnet
let network_type = 1;

export const constants = {
  highlighColor: "rgba(130, 71, 229, 0.3)",
  highlighColorDark: "#7540CF",
  baseColorLight: "#0C0D10",
  net: network_type,
  chainIdMain: 137,
  chainIdMainInHex: "0x89",
  chainIdTest: 80001,
  chainIdTestInHex: "0x13881",
  backend_url: "",
  backend_dev: "http://localhost:5004",
  contracts: {
    fiat: "0xE118429D095de1a93951c67D04B523fE5cbAB62c",
    accumulation: "0xD26E48de5356162E72CE66cF94075D205B196d7a",
  },
};

export const strategyType = {
  ACCUMULATION: "ACCUMULATION",
  DCA: "DCA",
};

export const graphQueryUrl =
  "https://api.thegraph.com/subgraphs/name/tahirahmadin/sleepswap";
