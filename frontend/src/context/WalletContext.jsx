import { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import {DonationStakingABI,RewardContractABI,DonationStakingAddress,RewardContractAddress} from "../lib/config"
const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
    const [walletAddress, setWalletAddress] = useState(null);
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [rewardContract, setRewardContract] = useState(null);
    const [donationContract, setDonationContract] = useState(null);
    const connectWallet = async () => {
        if (window.ethereum) {
            const web3Provider = new ethers.BrowserProvider(window.ethereum);
            setProvider(web3Provider);
            const web3Signer = await web3Provider.getSigner();
            setSigner(web3Signer);
            setWalletAddress(await web3Signer.getAddress());
            
            const rewardcontractInstance = new ethers.Contract(
                RewardContractAddress,
                RewardContractABI,
                web3Signer
            );
            setRewardContract(rewardcontractInstance);
            const donationContract = new ethers.Contract(
                DonationStakingAddress,
                DonationStakingABI,
                web3Signer
            );
            setDonationContract(donationContract);
        } else {
            console.error("No Ethereum provider found");
        }
    };
    return (
        <WalletContext.Provider value={{ walletAddress, provider, signer, rewardContract, donationContract, connectWallet }}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => {
    return useContext(WalletContext);
};