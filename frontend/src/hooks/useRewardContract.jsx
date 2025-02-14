import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { useWallet } from "../context/WalletContext";

const useFoodCoin = () => {
  const { walletAddress, rewardContract } = useWallet();
  const [rewardRate, setRewardRate] = useState(null);
  const [balance, setBalance] = useState(null);

  // Fetch the current reward rate from the FoodCoin contract
  const fetchRewardRate = useCallback(async () => {
    if (!rewardContract) return;
    try {
      const rate = await rewardContract.rewardRate();
      setRewardRate(rate);
    } catch (error) {
      console.error("Error fetching reward rate", error);
    }
  }, [rewardContract]);

  // Fetch the token balance for the connected wallet
  const fetchBalance = useCallback(async () => {
    if (!rewardContract || !walletAddress) return;
    try {
      const bal = await rewardContract.balanceOf(walletAddress);
      setBalance(bal);
    } catch (error) {
      console.error("Error fetching balance", error);
    }
  }, [rewardContract, walletAddress]);

  // Change the reward rate (only owner can call this)
  const changeRewardRate = async (newRate) => {
    if (!rewardContract) return;
    try {
      const tx = await rewardContract.changeRewardRate(newRate);
      await tx.wait();
      await fetchRewardRate();
    } catch (error) {
      console.error("Error changing reward rate", error);
    }
  };

  // Mint tokens to a specified address (only owner can call this)
  const mintTokens = async (to, amount) => {
    if (!rewardContract) return;
    try {
      const tx = await rewardContract.mint(to, amount);
      await tx.wait();
      await fetchBalance();
    } catch (error) {
      console.error("Error minting tokens", error);
    }
  };

  // Fetch data when the rewardContract is available
  useEffect(() => {
    if (rewardContract) {
      fetchRewardRate();
      fetchBalance();
    }
  }, [rewardContract, fetchRewardRate, fetchBalance]);

  return {
    rewardRate,
    balance,
    fetchRewardRate,
    fetchBalance,
    changeRewardRate,
    mintTokens,
  };
};

export default useFoodCoin;
