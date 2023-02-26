import detectProvider from "@metamask/detect-provider";
import { ethers, FixedNumber } from "ethers";
import ERC1155RG from "../abi/ERC1155Orare.json";
import IERC20 from "../abi/IERC20.json";
import ERC20RG from "../abi/ERC20RG.json";
import IERC1155Game from "../abi/ERC1155Game.json";
import StakingRewards from "../abi/StakingRewards.json";
import OneRareMarketplace from "../abi/OneRareMarketplace.json";
import { SUPPORTED_CHAINS } from "../config";
import bigInt from "big-integer";
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import web3 from "../web3";

// helper function
function utf8ToHex(str) {
  return (
    "0x" +
    Array.from(str)
      .map((c) =>
        c.charCodeAt(0) < 128
          ? c.charCodeAt(0).toString(16)
          : encodeURIComponent(c).replace(/\%/g, "").toLowerCase()
      )
      .join("")
  );
}

class EthersServiceProvider {
  provider;
  currentAccount;
  web3AuthInstance;
  erc1155RGContractInstance;
  maticContractInstance;
  gameContractAddrInstance;
  stakingContractInstance;

  constructor() {}

  async getProvider() {
    const clientId =
      "BIOMhgpLCKLpoPjcz0uLHvI8Uul1AknA2CT6gvCbR7vF3cl4ryN6Sm8RJ3Hxp3gnKLlmM06N4XGqXRDuKR697eQ"; // get from https://dashboard.web3auth.io

    const web3authInstance = new Web3Auth({
      clientId,
      uiConfig: {
        theme: "light",
        loginMethodsOrder: ["google", "facebook", "twitter", "apple"],
        appLogo:
          "https://icodrops.com/wp-content/uploads/2021/11/OneRare_logo.jpeg",
      },
      defaultLanguage: "en",
      modalZIndex: "99998",
      chainConfig: {
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        chainId: "0x89",
        rpcTarget: "https://polygon-rpc.com/",
      },
    });

    await web3authInstance.initModal();
    this.web3AuthInstance = web3authInstance;
    this.provider = web3authInstance.provider;
    return this.provider;
  }

  async setCurrentAccount(address) {
    this.currentAccount = address;
  }
  async setCurrentProvider(mainProvider) {
    this.provider = mainProvider;
  }

  async setCurrentWeb3AuthInstance(web3Auth) {
    this.web3AuthInstance = web3Auth;
  }

  async getCurrentGasPrice() {
    const providerMain = new ethers.providers.JsonRpcProvider(
      "https://polygon-rpc.com/",
      137
    );
    let gasp = await providerMain.getGasPrice();
    console.log(gasp);
    return gasp.mul(5).div(4);
  }
  async loadContractInstance(abi, address) {
    if (!this.web3AuthInstance) {
      throw new Error("Metamask is not connected");
    }
    if (abi == undefined) {
      throw new Error("ABI is not passed as arguments");
    }
    if (address == undefined) {
      throw new Error("address is not passed as argument");
    }
    const ethersProvider = new ethers.providers.Web3Provider(
      this.web3AuthInstance.provider
    );
    const signer = ethersProvider.getSigner();

    const contract = new ethers.Contract(address, abi, signer);
    return contract;
  }

  async getERC1155RGInstance() {
    if (!this.erc1155RGContractInstance) {
      this.erc1155RGContractInstance = await this.loadContractInstance(
        ERC1155RG.abi,
        process.env.NEXT_PUBLIC_ERC1155RG_CONTRACT
      );
    }
    return this.erc1155RGContractInstance;
  }

  async getUSDCInstance() {
    if (!this.maticContractInstance) {
      this.maticContractInstance = await this.loadContractInstance(
        IERC20.abi,
        process.env.NEXT_PUBLIC_ORARE_CONTRACT
      );
    }
    return this.maticContractInstance;
  }

  async getERC20Instance() {
    if (!this.ERC20ContractInstance) {
      this.ERC20ContractInstance = await this.loadContractInstance(
        ERC20RG.abi,
        process.env.NEXT_PUBLIC_ORARE_CONTRACT
      );
    }
    return this.ERC20ContractInstance;
  }

  async getGameContractInstance() {
    if (!this.gameContractAddrInstance) {
      this.gameContractAddrInstance = await this.loadContractInstance(
        IERC1155Game.abi,
        process.env.NEXT_PUBLIC_GAME_CONTRACT
      );
    }
    return this.gameContractAddrInstance;
  }

  async getOneRareMarketplaceContractInstance() {
    if (!this.OneRareMarketplaceAddrInstance) {
      console.log(process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT);

      this.OneRareMarketplaceAddrInstance = await this.loadContractInstance(
        OneRareMarketplace.abi,
        process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT
      );
    }
    return this.OneRareMarketplaceAddrInstance;
  }

  async approveERC1155Delegation(contractAddr) {
    const nftContract = await this.getERC1155RGInstance();
    let gasPrice = await this.getCurrentGasPrice();

    const gasEstimatedGasLimit =
      await nftContract.estimateGas.setApprovalForAll(contractAddr, true);
    const finalEstimatedGas = gasEstimatedGasLimit.mul(5).div(4);

    const tx = await nftContract.functions.setApprovalForAll(
      contractAddr,
      true,
      {
        gasPrice: gasPrice,
        gasLimit: finalEstimatedGas,
      }
    );
    return tx;
  }

  async isApprovalForAll(contractAddr) {
    const nftContract = await this.getERC1155RGInstance();

    const tx = await nftContract.functions.isApprovedForAll(
      this.currentAccount,
      contractAddr
    );
    console.log(tx);
    return tx;
  }

  // Check Approved  - Checking approve status
  async isGameContractApproved() {
    const nftContract = await this.getERC1155RGInstance();

    const tx = await nftContract.functions.isApprovedForAll(
      this.currentAccount,
      process.env.NEXT_PUBLIC_GAME_CONTRACT
    );
    console.log(tx);
    return tx;
  }
  // Approve function - Before cooking the first dish
  async approveCookDish() {
    try {
      const tx = await ethersServiceProvider.approveERC1155Delegation(
        process.env.NEXT_PUBLIC_GAME_CONTRACT
      );
      await tx.wait();

      return tx;
    } catch (err) {
      console.log(err, "Error in approve Dish");
      throw err;
    }
  }
  // CookDish function - For cooking the dish
  async cookDish(tokenId, data) {
    const gameContract = await this.getGameContractInstance();

    let gasPrice = await this.getCurrentGasPrice();

    let transcodedData = utf8ToHex(data);
    console.log(transcodedData);
    const gasEstimatedGasLimit = await gameContract.estimateGas.cookDish(
      tokenId,
      this.currentAccount,
      transcodedData
    );
    const finalEstimatedGas = gasEstimatedGasLimit.mul(5).div(4);

    console.log(finalEstimatedGas);
    const tx = await gameContract.functions.cookDish(
      tokenId,
      this.currentAccount,
      transcodedData,
      {
        // gasPrice: gasPrice,
        gasLimit: finalEstimatedGas,
        maxPriorityFeePerGas: "60000000000",
      }
    );
    return tx;
  }

  async approveUSDCDelegation(amount, contractAddress) {
    const tokenContract = await this.getUSDCInstance();
    let gasPrice = await this.getCurrentGasPrice();

    const gasEstimatedGasLimit = await tokenContract.estimateGas.approve(
      contractAddress,
      amount
    );
    const finalEstimatedGas = gasEstimatedGasLimit.mul(5).div(4);

    const tx = await tokenContract.functions.approve(contractAddress, amount, {
      gasPrice: gasPrice,
      gasLimit: finalEstimatedGas,
    });
    return tx;
  }

  async buyFixedPriceIngredient(tokenId, paymentTokenId) {
    const gameContract = await this.getGameContractInstance();
    let gasPrice = await this.getCurrentGasPrice();

    const gasEstimatedGasLimit =
      await gameContract.estimateGas.buyIngredient1NFT(
        tokenId.toString(),
        paymentTokenId.toString()
      );
    const finalEstimatedGas = gasEstimatedGasLimit.mul(5).div(4);

    const tx = await gameContract.functions.buyIngredient1NFT(
      tokenId.toString(),
      paymentTokenId.toString(),
      {
        gasPrice: gasPrice,
        gasLimit: finalEstimatedGas,
      }
    );
    return tx;
  }

  async buyVariablePriceIngredient(tokenId, purchaseTokenId) {
    const gameContract = await this.getGameContractInstance();
    let gasPrice = await this.getCurrentGasPrice();

    const gasEstimatedGasLimit =
      await gameContract.estimateGas.buyIngredient2NFT(
        tokenId,
        purchaseTokenId
      );
    const finalEstimatedGas = gasEstimatedGasLimit.mul(5).div(4);

    const tx = await gameContract.functions.buyIngredient2NFT(
      tokenId,
      purchaseTokenId,
      {
        gasPrice: gasPrice,
        gasLimit: finalEstimatedGas,
      }
    );
    return tx;
  }

  async createOrder(tokenId, quantity, price) {
    const marketplaceContract =
      await this.getOneRareMarketplaceContractInstance();
    let gasPrice = await this.getCurrentGasPrice();

    const gasEstimatedGasLimit =
      await marketplaceContract.estimateGas.createOrder(
        tokenId,
        quantity,
        price
      );
    const finalEstimatedGas = gasEstimatedGasLimit.mul(5).div(4);

    return await marketplaceContract.functions.createOrder(
      tokenId,
      quantity,
      price,
      {
        gasPrice: gasPrice,
        gasLimit: finalEstimatedGas,
      }
    );
  }

  async batchCreateOrder(tokenIds, quantities, prices) {
    const marketplaceContract =
      await this.getOneRareMarketplaceContractInstance();
    let gasPrice = await this.getCurrentGasPrice();

    const gasEstimatedGasLimit =
      await marketplaceContract.estimateGas.batchCreateOrder(
        tokenIds,
        quantities,
        prices
      );
    const finalEstimatedGas = gasEstimatedGasLimit.mul(5).div(4);

    return await marketplaceContract.functions.batchCreateOrder(
      tokenIds,
      quantities,
      prices,
      {
        gasPrice: gasPrice,
        gasLimit: finalEstimatedGas,
      }
    );
  }

  async approvebatchBuyFromOrderId(totalPrice) {
    const marketplaceContract =
      await this.getOneRareMarketplaceContractInstance();

    const tx = await ethersServiceProvider.approveUSDCDelegation(
      totalPrice,
      marketplaceContract.address
    );
    await tx.wait();
    return tx;
  }

  async buybatchBuyFromOrderId(tokenId, orderId, quantity) {
    console.log(tokenId, orderId, quantity);

    const marketplaceContract =
      await this.getOneRareMarketplaceContractInstance();
    let gasPrice = await this.getCurrentGasPrice();

    const gasEstimatedGasLimit =
      await marketplaceContract.estimateGas.batchBuyFromOrderId(
        tokenId,
        orderId,
        quantity
      );
    const finalEstimatedGas = gasEstimatedGasLimit.mul(5).div(4);

    const tx = await marketplaceContract.functions.batchBuyFromOrderId(
      tokenId,
      orderId,
      quantity,
      {
        gasPrice: gasPrice,
        gasLimit: finalEstimatedGas,
      }
    );
    await tx.wait();
    return tx;
  }

  async batchBuyFromOrderId(tokenId, orderId, quantity, totalPrice) {
    console.log(tokenId, orderId, quantity);

    const marketplaceContract =
      await this.getOneRareMarketplaceContractInstance();
    let gasPrice = await this.getCurrentGasPrice();

    const tx = await ethersServiceProvider.approveUSDCDelegation(
      totalPrice,
      marketplaceContract.address
    );
    await tx.wait();

    const gasEstimatedGasLimit =
      await marketplaceContract.estimateGas.batchBuyFromOrderId(
        tokenId,
        orderId,
        quantity
      );
    const finalEstimatedGas = gasEstimatedGasLimit.mul(5).div(4);

    return await marketplaceContract.functions.batchBuyFromOrderId(
      tokenId,
      orderId,
      quantity,
      {
        gasPrice: gasPrice,
        gasLimit: finalEstimatedGas,
      }
    );
  }

  async batchBuyFromOrderTokenIds(tokenIds, orderIds, quantities, totalPrice) {
    console.log(tokenIds, orderIds, quantities);

    const marketplaceContract =
      await this.getOneRareMarketplaceContractInstance();
    let gasPrice = await this.getCurrentGasPrice();

    const gasEstimatedGasLimit =
      await marketplaceContract.estimateGas.batchBuyFromOrderTokenIds(
        tokenIds,
        orderIds,
        quantities
      );
    const finalEstimatedGas = gasEstimatedGasLimit.mul(5).div(4);

    return await marketplaceContract.functions.batchBuyFromOrderTokenIds(
      tokenIds,
      orderIds,
      quantities,
      { gasPrice: gasPrice, gasLimit: finalEstimatedGas }
    );
  }

  async cancelOrder(tokenId, orderId) {
    const marketplaceContract =
      await this.getOneRareMarketplaceContractInstance();
    let gasPrice = await this.getCurrentGasPrice();

    const gasEstimatedGasLimit =
      await marketplaceContract.estimateGas.cancelOrder(tokenId, orderId);
    const finalEstimatedGas = gasEstimatedGasLimit.mul(5).div(4);

    return await marketplaceContract.functions.cancelOrder(tokenId, orderId, {
      gasPrice: gasPrice,
      gasLimit: finalEstimatedGas,
    });
  }
  async batchCancelOrder(tokenIds, orderIds) {
    const marketplaceContract =
      await this.getOneRareMarketplaceContractInstance();
    let gasPrice = await this.getCurrentGasPrice();

    const gasEstimatedGasLimit =
      await marketplaceContract.estimateGas.batchCancelOrder(
        tokenIds,
        orderIds
      );
    const finalEstimatedGas = gasEstimatedGasLimit.mul(5).div(4);

    return await marketplaceContract.functions.batchCancelOrder(
      tokenIds,
      orderIds,
      {
        gasPrice: gasPrice,
        gasLimit: finalEstimatedGas,
      }
    );
  }

  async getOneRareBalance() {
    const tokenContract = await this.getERC20Instance();
    const balance = await tokenContract.functions.balanceOf(
      this.currentAccount
    );
    return new bigInt(balance, 10).toString() / Math.pow(10, 18);
  }

  async getMaticBalance() {
    if (this.web3AuthInstance) {
      let authProvider = this.web3AuthInstance.provider;

      const ethersProvider = new ethers.providers.Web3Provider(authProvider);
      const balance = await ethersProvider.getBalance(this.currentAccount);
      return new bigInt(balance, 10).toString() / Math.pow(10, 18);
    } else {
      console.log(this.web3AuthInstance);
      return 0;
    }
  }
}

const ethersServiceProvider = new EthersServiceProvider();

export default ethersServiceProvider;
