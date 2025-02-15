import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { useWallet } from "../context/WalletContext";

const useDonationStaking = () => {
    const {walletAddress, provider, signer, donationContract, connectWallet} = useWallet()
    const [donations, setDonations] = useState([]);
    const [deliveries, setDeliveries] = useState([]);
    const [stakeInfo, setStakeInfo] = useState(null);

    

    // Stake ETH
    const stake = async (amount) => {
        if (!donationContract || !signer) return;
        const tx = await donationContract.stake({ value: ethers.parseEther(amount) });
        await tx.wait();
    };

    // Donate
    const donate = async (itemName, storeName, receiver) => {
        if (!donationContract || !signer) return;
        const tx = await donationContract.markAsDonated(itemName, storeName, receiver);
        await tx.wait();
    };

    // Withdraw Stake
    const withdraw = async () => {
        if (!donationContract || !signer) return;
        const tx = await donationContract.withdraw();
        await tx.wait();
    };

    // Fetch all donations
    const fetchDonations = useCallback(async () => {
        if (!donationContract) return;
        const donationsList = await donationContract.fetchAllDonations();
        setDonations(donationsList);
    }, [donationContract]);

    // Fetch all deliveries
    const fetchDeliveries = useCallback(async () => {
        if (!donationContract) return;
        const deliveriesList = await donationContract.fetchAllDeliveries();
        setDeliveries(deliveriesList);
    }, [donationContract]);

    // Fetch stake info
    const fetchStakeInfo = useCallback(async () => {
        if (!donationContract || !account) return;
        const stakeDetails = await donationContract.stakes(account);
        setStakeInfo(stakeDetails);
    }, [donationContract, account]);

    // Fetch data on mount
    useEffect(() => {
        if (donationContract) {
            fetchDonations();
            fetchDeliveries();
            fetchStakeInfo();
        }
    }, [donationContract, fetchDonations, fetchDeliveries, fetchStakeInfo]);

    return {
        stake,
        donate,
        withdraw,
        donations,
        deliveries,
        stakeInfo,
    };
};

export default useDonationStaking;
