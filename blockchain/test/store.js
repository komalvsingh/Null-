const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DonationStaking Store Tests", function () {
  let FoodCoin, foodCoin, DonationStaking, donationStaking;
  let deployer, user, volunteer;

  beforeEach(async function () {
    [deployer, user, volunteer] = await ethers.getSigners();

    // Deploy FoodCoin with an initial reward rate of 1000 tokens per donation.
    FoodCoin = await ethers.getContractFactory("FoodCoin");
    foodCoin = await FoodCoin.deploy(1000);
    await foodCoin.waitForDeployment();

    // Deploy DonationStaking, passing in the FoodCoin contract's address.
    DonationStaking = await ethers.getContractFactory("DonationStaking");
    donationStaking = await DonationStaking.deploy(await foodCoin.getAddress());
    await donationStaking.waitForDeployment();

    // Transfer ownership of FoodCoin to DonationStaking so it can mint tokens.
    await foodCoin.transferOwnership(await donationStaking.getAddress());
  });

  describe("Store Interaction and Incentive", function () {
    it("should mint the correct amount of FoodCoin tokens for a staked store donation", async function () {
      // Stake 2 ETH for the store (deployer).
      const stakeAmount = ethers.parseEther("2");
      await donationStaking.connect(deployer).stake({ value: stakeAmount });

      // Check initial FoodCoin balance is zero.
      const initialBalance = await foodCoin.balanceOf(deployer.address);
      expect(initialBalance).to.equal(0);

      // Record a donation.
      // For example, the store donates an "Apple" under the store name "StoreTest" and user.address is set as the receiver.
      const tx = await donationStaking.connect(deployer).markAsDonated("Apple", "StoreTest", user.address);
      await tx.wait();

      // With a stake of 2 ETH, our reward multiplier is expected to be 150 (i.e. 1.5×).
      // Thus, the expected reward = (1000 * 150) / 100 = 1500 tokens.
      const expectedReward = 1500;
      const finalBalance = await foodCoin.balanceOf(deployer.address);
      expect(finalBalance).to.equal(expectedReward);
    });

    it("should record donation details correctly", async function () {
      // Stake 1 ETH.
      const stakeAmount = ethers.parseEther("1");
      await donationStaking.connect(deployer).stake({ value: stakeAmount });

      // Record a donation with item "Banana", store "StoreX", receiver set to user.address.
      const tx = await donationStaking.connect(deployer).markAsDonated("Banana", "StoreX", user.address);
      await tx.wait();

      // Fetch donation records for "StoreX".
      const donations = await donationStaking.fetchDonations("StoreX");
      expect(donations.length).to.equal(1);
      const donation = donations[0];
      expect(donation.itemName).to.equal("Banana");
      expect(donation.storeName).to.equal("StoreX");
      expect(donation.receiver).to.equal(user.address);
    });

    it("should allow a store to withdraw staked funds", async function () {
      // Stake 1 ETH.
      const stakeAmount = ethers.parseEther("1");
      await donationStaking.connect(deployer).stake({ value: stakeAmount });

      // Withdraw the stake.
      const tx = await donationStaking.connect(deployer).withdraw();
      await tx.wait();

      // Verify that the stake info is reset.
      const stakeInfo = await donationStaking.stakes(deployer.address);
      expect(stakeInfo.active).to.be.false;
      expect(stakeInfo.amount).to.equal(0);
    });
  });
});
