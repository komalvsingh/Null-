// scripts/transferOwnership.js
const hre = require("hardhat");

async function main() {
  // Retrieve the deployer (owner) from Hardhat's signers.
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deployer address:", deployer.address);

  // Set your deployed contract addresses.
  const foodCoinAddress = "0xdb9A10154cbEaDd153880d82Ba328DB72f490ac4";
  const donationStakingAddress = "0x583b28F4d2Df04484e265Ba2CA82e1B207e78127";

  // Get the contract factories.
  const FoodCoinFactory = await hre.ethers.getContractFactory("FoodCoin");
  // Connect the FoodCoin instance to the deployer (owner) so that transferOwnership can be called by the owner.
  const foodCoin = FoodCoinFactory.connect(deployer).attach(foodCoinAddress);

  const DonationStakingFactory = await hre.ethers.getContractFactory("DonationStaking");
  const donationStaking = DonationStakingFactory.attach(donationStakingAddress);

  // Transfer ownership of FoodCoin to the DonationStaking contract.
  console.log("Transferring ownership of FoodCoin to DonationStaking...");
  const tx = await foodCoin.transferOwnership(await donationStaking.getAddress());
  await tx.wait();
  console.log("Ownership transferred to DonationStaking at:", await donationStaking.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error transferring ownership:", error);
    process.exit(1);
  });
