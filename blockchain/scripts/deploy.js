const hre = require("hardhat");

async function main() {
  // Get the deployer account from Hardhat.
  const [deployer] = await hre.ethers.getSigners();
  console.log(`Deploying contracts with account: ${deployer.address}`);

  // ----------------------------
  // Deploy FoodCoin Contract
  // ----------------------------
  // Set an initial reward rate (adjust as needed).
  const initialRewardRate = 1000;

  // Get the FoodCoin contract factory.
  const FoodCoin = await hre.ethers.getContractFactory("FoodCoin");
  console.log("Deploying FoodCoin...");
  // Deploy FoodCoin with the initialRewardRate.
  const foodCoin = await FoodCoin.deploy(initialRewardRate);
  await foodCoin.waitForDeployment();
  console.log(`✅ FoodCoin deployed to: ${await foodCoin.getAddress()}`);

  // ----------------------------
  // Deploy DonationStaking Contract
  // ----------------------------
  // Get the DonationStaking contract factory.
  const DonationStaking = await hre.ethers.getContractFactory("DonationStaking");
  console.log("Deploying DonationStaking...");
  // Deploy DonationStaking, passing the FoodCoin contract's address.
  const donationStaking = await DonationStaking.deploy(await foodCoin.getAddress());
  await donationStaking.waitForDeployment();
  console.log(`✅ DonationStaking deployed to: ${await donationStaking.getAddress()}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });
