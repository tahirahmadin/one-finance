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
    accumulation: "0x4099A304986f306f9b567FE2C128D66D696dd15C",
  },
};

export default constants;
