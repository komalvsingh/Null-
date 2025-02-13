const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DonationStaking", function () {
  let FoodCoin, foodCoin, DonationStaking, donationStaking;
  let deployer, user;

  beforeEach(async function () {
    [deployer, user] = await ethers.getSigners();

    // Deploy FoodCoin with an initial reward rate of 1000.
    FoodCoin = await ethers.getContractFactory("FoodCoin");
    foodCoin = await FoodCoin.deploy(1000);
    await foodCoin.waitForDeployment();

    // Deploy DonationStaking, passing in the FoodCoin address.
    DonationStaking = await ethers.getContractFactory("DonationStaking");
    donationStaking = await DonationStaking.deploy(await foodCoin.getAddress());
    await donationStaking.waitForDeployment();

    // **Transfer ownership of FoodCoin to DonationStaking**
    await foodCoin.transferOwnership(await donationStaking.getAddress());
  });

  it("Should allow a store to stake and record a donation", async function () {
    // Have the deployer stake some ETH.
    const stakeAmount = ethers.parseEther("1");
    await donationStaking.connect(deployer).stake({ value: stakeAmount });

    // Now call markAsDonated from the deployer.
    const tx = await donationStaking.connect(deployer).markAsDonated(
      "Bread",
      "StoreA",
      user.address
    );
    await tx.wait();

    // Verify donation was recorded.
    const donations = await donationStaking.fetchDonations("StoreA");
    expect(donations.length).to.equal(1);
    expect(donations[0].itemName).to.equal("Bread");

    // Verify that FoodCoin tokens were minted to the deployer.
    const balance = await foodCoin.balanceOf(deployer.address);
    expect(balance).to.be.gt(0);
  });
});
