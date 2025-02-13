const { expect } = require("chai");
const { ethers, network } = require("hardhat");

describe("DonationStaking Additional Tests", function () {
  let FoodCoin, foodCoin, DonationStaking, donationStaking;
  let deployer, user, volunteer;

  beforeEach(async function () {
    [deployer, user, volunteer] = await ethers.getSigners();

    // Deploy FoodCoin with an initial reward rate of 1000.
    FoodCoin = await ethers.getContractFactory("FoodCoin");
    foodCoin = await FoodCoin.deploy(1000);
    await foodCoin.waitForDeployment();

    // Deploy DonationStaking, passing in the FoodCoin address.
    DonationStaking = await ethers.getContractFactory("DonationStaking");
    donationStaking = await DonationStaking.deploy(await foodCoin.getAddress());
    await donationStaking.waitForDeployment();

    // Transfer ownership of FoodCoin to DonationStaking so it can mint tokens.
    await foodCoin.transferOwnership(await donationStaking.getAddress());
  });
  describe("Penalty Application", function () {
    it("should apply a penalty when a donation is missed", async function () {
      // Have the deployer stake 1 ETH.
      const stakeAmount = ethers.parseEther("1");
      await donationStaking.connect(deployer).stake({ value: stakeAmount });
  
      // Record the first donation to set the last donation timestamp.
      await donationStaking.connect(deployer).markAsDonated("Item1", "StoreA", user.address);
      const initialStakeInfo = await donationStaking.stakes(deployer.address);
      const stakeBefore = initialStakeInfo.amount; // This is a BigInt
  
      // Increase EVM time by 31 days (more than ONE_MONTH) to simulate a missed donation.
      const increaseTime = 31 * 24 * 60 * 60; // 31 days in seconds
      await network.provider.send("evm_increaseTime", [increaseTime]);
      await network.provider.send("evm_mine");
  
      // Record a second donation; this should trigger a penalty.
      await donationStaking.connect(deployer).markAsDonated("Item2", "StoreA", user.address);
      const stakeAfter = (await donationStaking.stakes(deployer.address)).amount;
  
      // Calculate expected penalty using BigInt arithmetic.
      const expectedPenalty = (stakeBefore * 10n) / 100n; // 10% penalty
  
      // Calculate the actual reduction.
      const actualReduction = stakeBefore - stakeAfter;
      // Check that the reduction equals the expected penalty.
      expect(actualReduction).to.equal(expectedPenalty);
    });
  });
  

  describe("Withdrawal of Staked Funds", function () {
    it("should allow a store to withdraw staked funds", async function () {
      // Stake 1 ETH.
      const stakeAmount = ethers.parseEther("1");
      await donationStaking.connect(deployer).stake({ value: stakeAmount });

      // Confirm that the stake is active.
      let stakeInfo = await donationStaking.stakes(deployer.address);
      expect(stakeInfo.active).to.be.true;

      // Withdraw the stake.
      const tx = await donationStaking.connect(deployer).withdraw();
      await tx.wait();

      // After withdrawal, the stake should be reset.
      stakeInfo = await donationStaking.stakes(deployer.address);
      expect(stakeInfo.active).to.be.false;
      expect(stakeInfo.amount).to.equal(0);
    });
  });

  describe("Volunteer Delivery Functions", function () {
    it("should record volunteer deliveries", async function () {
      // Have a volunteer record a delivery.
      const details = "Delivered 5 boxes of food";
      const tx = await donationStaking.connect(volunteer).markAsDelivered(details);
      await tx.wait();

      // Retrieve deliveries for this volunteer.
      const deliveries = await donationStaking.fetchDelivered(volunteer.address);
      expect(deliveries.length).to.equal(1);
      expect(deliveries[0].details).to.equal(details);
    });
  });

  describe("Edge Cases and Error Conditions", function () {
    it("should revert if a stake of zero value is sent", async function () {
      await expect(donationStaking.stake({ value: 0 })).to.be.revertedWith("Stake amount must be greater than zero");
    });

    // Additional edge-case tests can be added here.
  });
});
