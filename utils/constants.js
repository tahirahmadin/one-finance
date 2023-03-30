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
    accumulation: "0x89e211C4e46CC592A598EE67127c285aDF3F7Ae1",
  },
};

export default constants;
