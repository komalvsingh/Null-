// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

// Interface for FoodCoin so we can call its functions
interface IFoodCoin {
    function mint(address to, uint256 amount) external;
    function rewardRate() external view returns (uint256);
}

contract DonationStaking is Ownable {
    // ================================
    // Constants & Variables for Stores
    // ================================

    // Constant for one month (approximately 30 days)
    uint256 public constant ONE_MONTH = 30 days;
    // Penalty percentage applied if donation is missed (e.g., 10 means 10%)
    uint256 public penaltyPercentage = 10;

    // Struct to store donation details (for stores)
    struct Donation {
        uint256 donationId;
        string itemName;
        string storeName;
        uint256 timestamp;
        address receiver;
    }

    // Donation ID counter for stores
    uint256 public donationIdCounter;

    // Mapping from store name to an array of donations
    mapping(string => Donation[]) public donationsByStore;
    // Array to hold all donation records
    Donation[] public allDonations;
    // Mapping from donor address to the timestamp of their last donation
    mapping(address => uint256) public lastDonationTimestamp;

    // Struct for staking details (only for stores)
    struct StakeInfo {
        uint256 amount;
        uint256 stakedAt;
        bool active;
    }
    // Mapping to track stakes for each store address
    mapping(address => StakeInfo) public stakes;

    // Emergency fund pool (accumulates penalties from stores)
    uint256 public emergencyFundBalance;

    // Instance of the FoodCoin contract
    IFoodCoin public foodCoin;

    // ================================
    // Variables for Volunteers
    // ================================

    // Struct to store delivery details (for volunteers)
    struct Delivery {
        uint256 deliveryId;
        address volunteer;
        string details;
        uint256 timestamp;
    }

    // Delivery ID counter for volunteers
    uint256 public deliveryIdCounter;
    // Array to hold all delivery records
    Delivery[] public allDeliveries;
    // Mapping from volunteer address to an array of their deliveries
    mapping(address => Delivery[]) public deliveriesByVolunteer;

    // ================================
    // Events
    // ================================

    // Events for store donations
    event DonationRecorded(
        uint256 donationId,
        string storeName,
        address indexed donor,
        uint256 timestamp
    );
    event Staked(address indexed staker, uint256 amount, uint256 timestamp);
    event Withdrawn(address indexed staker, uint256 amount, uint256 timestamp);
    event PenaltyApplied(
        address indexed staker,
        uint256 penaltyAmount,
        uint256 timestamp
    );
    event EmergencyFundUsed(uint256 amount, uint256 timestamp);

    // Event for volunteer deliveries
    event DeliveryRecorded(
        uint256 deliveryId,
        address indexed volunteer,
        uint256 timestamp,
        string details
    );

    // ================================
    // Constructor
    // ================================

    // Pass msg.sender to Ownable so that the deployer becomes the initial owner.
    constructor(address _foodCoinAddress) Ownable(msg.sender) {
        foodCoin = IFoodCoin(_foodCoinAddress);
    }

    // ================================
    // Helper: Calculate Reward Multiplier
    // ================================

    /// @notice Returns the reward multiplier based on the amount staked.
    ///         The multiplier is expressed in percentage points where 100 means 1.0×.
    ///         - If no stake or stake below 1 ETH, multiplier is 100 (i.e. 1.0×).
    ///         - At least 1 ETH but < 2 ETH: multiplier is 125 (1.25×).
    ///         - At least 2 ETH but < 3 ETH: multiplier is 150 (1.5×).
    ///         - At least 3 ETH but < 4 ETH: multiplier is 175 (1.75×).
    ///         - At least 4 ETH: multiplier is 200 (2.0×).
    function getRewardMultiplier(address donor) public view returns (uint256) {
        // If no active stake, return base multiplier (100%).
        if (!stakes[donor].active) {
            return 100;
        }

        uint256 stakedAmount = stakes[donor].amount;

        if (stakedAmount < 1 ether) {
            return 100;
        } else if (stakedAmount < 2 ether) {
            return 125;
        } else if (stakedAmount < 3 ether) {
            return 150;
        } else if (stakedAmount < 4 ether) {
            return 175;
        } else {
            return 200;
        }
    }

    // ================================
    // Store Functions (with Staking & Donations)
    // ================================

    /// @notice Stake ETH to participate in the donation program (for stores).
    function stake() external payable {
        require(msg.value > 0, "Stake amount must be greater than zero");
        // If already staked, add to the existing amount
        if (stakes[msg.sender].active) {
            stakes[msg.sender].amount += msg.value;
        } else {
            stakes[msg.sender] = StakeInfo({
                amount: msg.value,
                stakedAt: block.timestamp,
                active: true
            });
        }
        emit Staked(msg.sender, msg.value, block.timestamp);
    }

    /// @notice Record a donation by a store and update the last donation timestamp.
    /// @param itemName Name of the donated item.
    /// @param storeName Name of the store donating.
    /// @param receiver Address of the donation receiver.
    function markAsDonated(
        string calldata itemName,
        string calldata storeName,
        address receiver
    ) external {
        // If the sender has an active stake, perform a penalty check.
        if (stakes[msg.sender].active) {
            uint256 lastDonationTime = lastDonationTimestamp[msg.sender];
            if (
                lastDonationTime != 0 &&
                block.timestamp > lastDonationTime + ONE_MONTH
            ) {
                uint256 penaltyAmount = (stakes[msg.sender].amount *
                    penaltyPercentage) / 100;
                // Deduct the penalty from the staker's stake directly.
                stakes[msg.sender].amount -= penaltyAmount;
                emergencyFundBalance += penaltyAmount;
                emit PenaltyApplied(msg.sender, penaltyAmount, block.timestamp);
            }
        }

        // Increment donation ID and record donation details.
        donationIdCounter++;
        Donation memory newDonation = Donation({
            donationId: donationIdCounter,
            itemName: itemName,
            storeName: storeName,
            timestamp: block.timestamp,
            receiver: receiver
        });
        donationsByStore[storeName].push(newDonation);
        allDonations.push(newDonation);

        // Update the donor's last donation timestamp.
        lastDonationTimestamp[msg.sender] = block.timestamp;

        // Calculate the reward using the base FoodCoin reward and multiplier.
        uint256 baseReward = foodCoin.rewardRate();
        uint256 multiplier = getRewardMultiplier(msg.sender); // e.g., 125 for 1 ETH staked.
        uint256 reward = (baseReward * multiplier) / 100; // Divide by 100 to convert back to a normal multiplier.
        foodCoin.mint(msg.sender, reward);

        emit DonationRecorded(
            donationIdCounter,
            storeName,
            msg.sender,
            block.timestamp
        );
    }

    /// @notice Fetch all donations for a specific store.
    function fetchDonations(
        string calldata storeName
    ) external view returns (Donation[] memory) {
        return donationsByStore[storeName];
    }

    /// @notice Fetch all donation records.
    function fetchAllDonations() external view returns (Donation[] memory) {
        return allDonations;
    }

    /// @notice Withdraw staked funds (for stores).
    function withdraw() external {
        StakeInfo storage stakeInfo = stakes[msg.sender];
        require(stakeInfo.active, "No active stake found");
        uint256 amount = stakeInfo.amount;
        // Reset stake info.
        stakeInfo.amount = 0;
        stakeInfo.active = false;
        payable(msg.sender).transfer(amount);
        emit Withdrawn(msg.sender, amount, block.timestamp);
    }

    /// @notice Withdraw funds from the emergency fund. Only the owner can execute this.
    function emergencyFund(
        uint256 amount,
        address payable beneficiary
    ) external onlyOwner {
        require(
            amount <= emergencyFundBalance,
            "Insufficient emergency fund balance"
        );
        emergencyFundBalance -= amount;
        beneficiary.transfer(amount);
        emit EmergencyFundUsed(amount, block.timestamp);
    }

    /// @notice Change the penalty percentage (only owner).
    function changeStakeRewards(
        uint256 newPenaltyPercentage
    ) external onlyOwner {
        penaltyPercentage = newPenaltyPercentage;
    }

    // ================================
    // Volunteer Functions (No Staking)
    // ================================

    /// @notice Record a delivery by a volunteer.
    /// @param details A string describing the delivery details.
    function markAsDelivered(string calldata details) external {
        deliveryIdCounter++;
        Delivery memory newDelivery = Delivery({
            deliveryId: deliveryIdCounter,
            volunteer: msg.sender,
            details: details,
            timestamp: block.timestamp
        });
        allDeliveries.push(newDelivery);
        deliveriesByVolunteer[msg.sender].push(newDelivery);
        emit DeliveryRecorded(
            deliveryIdCounter,
            msg.sender,
            block.timestamp,
            details
        );

        // Reward the volunteer with 100 tokens (accounting for 18 decimals)
        foodCoin.mint(msg.sender, 100 * 10 ** 18);
    }

    /// @notice Fetch all recorded delivery records.
    function fetchAllDeliveries() external view returns (Delivery[] memory) {
        return allDeliveries;
    }

    /// @notice Fetch all delivery records for a specific volunteer.
    /// @param volunteer The address of the volunteer.
    function fetchDelivered(
        address volunteer
    ) external view returns (Delivery[] memory) {
        return deliveriesByVolunteer[volunteer];
    }
}
