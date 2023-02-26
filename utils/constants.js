// 0 mainnet, 1 testnet
let network_type = 0;

let constants;
constants = {
  net: network_type,
  chainIdMain: 137,
  chainIdMainInHex: "0x89",
  chainIdTest: 80001,
  chainIdTestInHex: "0x13881",
  backend_url: "https://game.onerare.io/api",
  vaultContract: process.env.NEXT_PUBLIC_VAULT_CONTRACT,
  farmingContract: {
    0: "0xd1d25EAc33401b97568869564ee4ba6e259DCB35",
    1: "0xbEa244d7Cbc3BEAaD79Ea00e97b8515Cb8C1916E",
    2: "0x8765330eBe67FAEb3Cf5a2Abd2d7aB1Fa00F83eD",
    3: "0x0C271f2F3F1ACAD6BA99B5DEBE610cEc391a5d33",
    4: "0xCB39949A7a0A0da883BC584c1f408E4c269F3587",
    5: "0x47f48E1B7e4C3A72C355cb6A3940cf905FE46615",
  },
};

export default constants;
