import ethersServiceProvider from "./ethersServiceProvider";

class StakingService {
  contractAddr = process.env.NEXT_PUBLIC_STAKING_CONTRACT;

  constructor() {}

  async stakeTokens(tokenId, quantity) {
    try {
      const isApproved = await ethersServiceProvider.isApprovalForAll(
        this.contractAddr
      );
      if (!isApproved[0]) {
        const tx = await ethersServiceProvider.approveERC1155Delegation(
          this.contractAddr
        );
        await tx.wait();
      }
      const stakeTx = await ethersServiceProvider.stakeTokens(
        tokenId,
        quantity
      );
      return stakeTx;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getStakedTokens() {
    try {
      const stakedTokens = await ethersServiceProvider.getStakedTokens();
      return stakedTokens;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async unstakeTokens(tokenId, quantity) {
    try {
      const res = await ethersServiceProvider.unstakeTokens(tokenId, quantity);
      return res;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async claimRewards() {
    try {
      const res = await ethersServiceProvider.claimRewardTokens();
      return res;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getRewardsBalance() {
    try {
      const res = await ethersServiceProvider.getRewardsBalance();
      return res;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

const stakingService = new StakingService();
export default stakingService;
