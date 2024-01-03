// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FundingPlatform {
    struct Campaign {
        address payable creator;
        string title;
        string description;
        uint256 goal;
        string tokenName;
        uint256 deadline;
        uint256 totalFunds;
        bool goalReached;
    }

    uint256 private nextCampaignId;
    mapping(uint256 => Campaign) public campaigns;
    mapping(uint256 => mapping(address => uint256)) public contributions;

    event CampaignCreated(uint256 campaignId, string title, address creator);
    event ContributionReceived(uint256 campaignId, address contributor, uint256 amount);
    event FundsWithdrawn(uint256 campaignId, address recipient, uint256 amount);

    function createCampaign(
        string memory _title,
        string memory _description,
        uint256 _goal,
        string memory _tokenName,
        uint256 _duration
    ) public {
        uint256 campaignId = nextCampaignId++;
        Campaign storage newCampaign = campaigns[campaignId];

        newCampaign.creator = payable(msg.sender);
        newCampaign.title = _title;
        newCampaign.description = _description;
        newCampaign.goal = _goal;
        newCampaign.tokenName = _tokenName;
        newCampaign.deadline = block.timestamp + _duration;

        emit CampaignCreated(campaignId, _title, msg.sender);
    }

    function contribute(uint256 _campaignId) external payable {
        Campaign storage campaign = campaigns[_campaignId];
        require(block.timestamp < campaign.deadline, "Campaign has ended.");
        require(msg.value > 0, "Contribution must be greater than 0.");

        contributions[_campaignId][msg.sender] += msg.value;
        campaign.totalFunds += msg.value;

        emit ContributionReceived(_campaignId, msg.sender, msg.value);

        if (campaign.totalFunds >= campaign.goal) {
            campaign.goalReached = true;
        }
    }

    function withdrawFunds(uint256 _campaignId) external {
        Campaign storage campaign = campaigns[_campaignId];
        require(msg.sender == campaign.creator, "Only creator can withdraw funds.");
        require(campaign.goalReached, "Goal not reached.");
        require(block.timestamp >= campaign.deadline, "Campaign not ended.");
        
        uint256 withdrawalAmount = (campaign.totalFunds * 20) / 100;
        campaign.creator.transfer(withdrawalAmount);

        emit FundsWithdrawn(_campaignId, campaign.creator, withdrawalAmount);
    }

    function refund(uint256 _campaignId) external {
        Campaign storage campaign = campaigns[_campaignId];
        require(block.timestamp >= campaign.deadline, "Campaign not ended.");
        require(!campaign.goalReached, "Goal was reached, no refunds.");

        uint256 amount = contributions[_campaignId][msg.sender];
        require(amount > 0, "No contributions to refund.");

        contributions[_campaignId][msg.sender] = 0;
        payable(msg.sender).transfer(amount);

        emit FundsWithdrawn(_campaignId, msg.sender, amount);
    }

    function getCampaign(uint256 _campaignId) public view returns (Campaign memory) {
        return campaigns[_campaignId];
    }

    function getAllCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](nextCampaignId);
        for (uint256 i = 0; i < nextCampaignId; i++) {
            allCampaigns[i] = campaigns[i];
        }
        return allCampaigns;
    }
}
