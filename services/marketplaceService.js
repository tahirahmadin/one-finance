import ethersServiceProvider from "./ethersServiceProvider";

export class MarketPlaceService {
  marketplaceContract = process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT;

  constructor() {}

  async approveOrder() {
    try {
      const tx = await ethersServiceProvider.approveERC1155Delegation(
        this.marketplaceContract
      );
      await tx.wait();
      console.log("going here");
      return tx;
    } catch (err) {
      console.log(err, "Error in approving order");
      throw err;
    }
  }

  async createOrderAfterApprove(tokenId, quantity, price, tokenIndex) {
    try {
      const createdTx = await ethersServiceProvider.createOrder(
        tokenId,
        quantity,
        price,
        tokenIndex
      );
      await createdTx.wait();
      return createdTx;
    } catch (err) {
      console.log(err, "Error in creating order");
      throw err;
    }
  }

  async confirmCreateOrder(tokenId, quantity, price, tokenIndex) {
    try {
      const createdTx = await ethersServiceProvider.createOrder(
        tokenId,
        quantity,
        price,
        tokenIndex
      );
      await createdTx.wait();
      return createdTx;
    } catch (err) {
      console.log(err, "Error in creating order");
      throw err;
    }
  }

  async createOrder(tokenId, quantity, price) {
    try {
      const isApproved = await ethersServiceProvider.isApprovalForAll(
        this.marketplaceContract
      );
      if (!isApproved[0]) {
        const tx = await ethersServiceProvider.approveERC1155Delegation(
          this.marketplaceContract
        );
        await tx.wait();
      }

      const createdTx = await ethersServiceProvider.createOrder(
        tokenId,
        quantity,
        price
      );
      await createdTx.wait();
      return createdTx;
    } catch (err) {
      console.log(err, "Error in creating order");
      throw err;
    }
  }

  async batchCreateOrder(tokenIds, quantities, prices) {
    try {
      const createdTx = await ethersServiceProvider.batchCreateOrder(
        tokenIds,
        quantities,
        prices
      );
      await createdTx.wait();
      return createdTx;
    } catch (err) {
      console.log(err, "Error in creating batch order");
      throw err;
    }
  }

  async batchBuyFromOrderId(tokenId, orderId, quantity, price) {
    try {
      const tx = await ethersServiceProvider.approveUSDCDelegation(
        price,
        this.marketplaceContract
      );
      await tx.wait();

      const bought = await ethersServiceProvider.batchBuyFromOrderId(
        tokenId,
        orderId,
        quantity
      );
      await bought.wait();
      return bought;
    } catch (err) {
      console.log(err, "Error in buying order");
      throw err;
    }
  }

  async cancelOrder(tokenId, orderId) {
    try {
      console.log(tokenId);
      console.log(orderId);

      const cancelled = await ethersServiceProvider.cancelOrder(
        tokenId,
        orderId
      );
      return cancelled;
    } catch (err) {
      console.log(err, "Error in cancelling order now");
      throw err;
    }
  }
  async batchCancelOrder(tokenIds, orderIds) {
    try {
      console.log(tokenIds);
      console.log(orderIds);

      const cancelled = await ethersServiceProvider.batchCancelOrder(
        tokenIds,
        orderIds
      );
      return cancelled;
    } catch (err) {
      console.log(err, "Error in cancelling order now");
      throw err;
    }
  }
}

const marketPlaceService = new MarketPlaceService();

export default marketPlaceService;
