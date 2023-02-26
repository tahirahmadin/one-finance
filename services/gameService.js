import ethersServiceProvider from "./ethersServiceProvider";
import { ethers } from "ethers";

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

export class GameService {
  contractAddr = process.env.NEXT_PUBLIC_GAME_CONTRACT;

  constructor() {}

  async purchaseIngredient(type, tokenId, price) {
    try {
      let purchaseTx;
      const tokenPrice = await ethersServiceProvider.getCurrentPrice(tokenId);
      const tx = await ethersServiceProvider.approveUSDCDelegation(
        tokenPrice[0][2],
        this.contractAddr
      ); //2 index for USDC coin
      await tx.wait();
      console.log(type);
      if (type === "4") {
        purchaseTx = await ethersServiceProvider.buyFixedPriceIngredient(
          tokenId,
          2
        ); //2 index for USDC coin
      } else if (type === "5") {
        purchaseTx = await ethersServiceProvider.buyVariablePriceIngredient(
          tokenId,
          2
        ); //2 index for USDC coin
      }
      return purchaseTx;
    } catch (err) {
      console.log(err, "Error in purchasing ingredients");
      throw err;
    }
  }

  async approveCookDish() {
    try {
      const tx = await ethersServiceProvider.approveERC1155Delegation(
        this.contractAddr
      );
      await tx.wait();

      return tx;
    } catch (err) {
      console.log(err, "Error in approve Dish");
      throw err;
    }
  }
  async completeCookDish(tokenId, data) {
    try {
      const cookTx = await ethersServiceProvider.cookDish(
        tokenId,
        ethersServiceProvider.currentAccount,
        utf8ToHex(data)
      );
      return cookTx;
    } catch (err) {
      console.log(err, "Error in cooking Dish");
      throw err;
    }
  }

  async cookDish(tokenId, data) {
    try {
      const isApproved = await ethersServiceProvider.isApprovalForAll(
        this.contractAddr
      );
      console.log("Reached here1");
      if (!isApproved[0]) {
        const tx = await ethersServiceProvider.approveERC1155Delegation(
          this.contractAddr
        );
        await tx.wait();
      }

      const cookTx = await ethersServiceProvider.cookDish(
        tokenId,
        ethersServiceProvider.currentAccount,
        utf8ToHex(data)
      );
      return cookTx;
    } catch (err) {
      console.log(err, "Error in cooking Dish");
      throw err;
    }
  }
}

const gameService = new GameService();

export default gameService;
