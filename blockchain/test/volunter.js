const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DonationStaking Volunteer Tests", function () {
  let FoodCoin, foodCoin, DonationStaking, donationStaking;
  let deployer, volunteer;

  beforeEach(async function () {
    [deployer, volunteer] = await ethers.getSigners();

    // Deploy FoodCoin with an initial reward rate of 1000 tokens.
    const FoodCoinFactory = await ethers.getContractFactory("FoodCoin");
    foodCoin = await FoodCoinFactory.deploy(1000);
    await foodCoin.waitForDeployment();

    // Deploy DonationStaking, passing in the FoodCoin address.
    const DonationStakingFactory = await ethers.getContractFactory("DonationStaking");
    donationStaking = await DonationStakingFactory.deploy(await foodCoin.getAddress());
    await donationStaking.waitForDeployment();

    // Transfer ownership of FoodCoin to DonationStaking so it can mint tokens.
    await foodCoin.transferOwnership(await donationStaking.getAddress());
  });

  describe("Volunteer Delivery Functions", function () {
    it("should record a volunteer delivery via markAsDelivered, reward tokens, and fetch it correctly", async function () {
      const deliveryDetails = "Delivered 10 boxes of food";

      // Volunteer calls markAsDelivered.
      const tx = await donationStaking.connect(volunteer).markAsDelivered(deliveryDetails);
      await tx.wait();

      // Check that the volunteer received 100 FoodCoin tokens.
      // Get the token decimals (typically 18) and convert the expected reward.
      const decimals = await foodCoin.decimals();
      const expectedReward = ethers.parseUnits("100", Number(decimals));
      const volunteerBalance = await foodCoin.balanceOf(volunteer.address);
      expect(volunteerBalance).to.equal(expectedReward);

      // Fetch all deliveries recorded in the system.
      const allDeliveries = await donationStaking.fetchAllDeliveries();
      expect(allDeliveries.length).to.equal(1);

      // Fetch deliveries recorded for the volunteer.
      const volunteerDeliveries = await donationStaking.fetchDelivered(volunteer.address);
      expect(volunteerDeliveries.length).to.equal(1);

      // Validate the delivery details.
      const delivery = volunteerDeliveries[0];
      expect(delivery.details).to.equal(deliveryDetails);
      expect(delivery.volunteer).to.equal(volunteer.address);
      expect(delivery.timestamp).to.be.gt(0);
    });

    it("should allow a volunteer to record multiple deliveries and accumulate rewards", async function () {
      const details1 = "Delivery 1: 5 boxes";
      const details2 = "Delivery 2: 15 boxes";

      // Volunteer records two deliveries.
      await donationStaking.connect(volunteer).markAsDelivered(details1);
      await donationStaking.connect(volunteer).markAsDelivered(details2);

      // Fetch deliveries for this volunteer.
      const deliveries = await donationStaking.fetchDelivered(volunteer.address);
      expect(deliveries.length).to.equal(2);
      expect(deliveries[0].details).to.equal(details1);
      expect(deliveries[1].details).to.equal(details2);

      // Since each delivery rewards 100 tokens, the total expected reward is 200 tokens.
      const decimals = await foodCoin.decimals();
      const expectedTotalReward = ethers.parseUnits("200", Number(decimals));
      const volunteerBalance = await foodCoin.balanceOf(volunteer.address);
      expect(volunteerBalance).to.equal(expectedTotalReward);
    });
  });
});
