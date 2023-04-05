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
    fiat: "0xE118429D095de1a93951c67D04B523fE5cbAB62c",
    accumulation: "0xB6A5e5B99C16D1E34eB382F98D78822E79eD63fE",
  },
};

export default constants;
