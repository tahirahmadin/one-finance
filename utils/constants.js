// 0 mainnet, 1 testnet
let network_type = 1;

let constants;
constants = {
  net: network_type,
  chainIdMain: 137,
  chainIdMainInHex: "0x89",
  chainIdTest: 80001,
  chainIdTestInHex: "0x13881",
  backend_url: "https://game.onerare.io/api",
  contracts: {
    accumulation: "0x7FE9E224E4e11A23b3BdF1d98eFB3eA9F31982D4",
  },
};

export default constants;
