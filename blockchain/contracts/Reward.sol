// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FoodCoin is ERC20, Ownable {
    uint256 public rewardRate; // tokens rewarded per donation

    constructor(uint256 initialRewardRate)
        ERC20("FoodCoin", "FDC")
        Ownable(msg.sender) // Pass msg.sender as the owner to the Ownable constructor.
    {
        rewardRate = initialRewardRate;
    }
    
    // Mint reward tokens (only owner can call this)
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
    
    // Change reward rate (owner-only)
    function changeRewardRate(uint256 newRate) external onlyOwner {
        rewardRate = newRate;
    }
}
