// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.9;

contract Factory {
    Campaign[] public deployedCampaigns;
    
    function createCampaign(uint minimum, string memory titleCont, string memory descriptionCont) public {
        Campaign newCampaign = new Campaign(minimum, titleCont, descriptionCont, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (Campaign[] memory) {
        return deployedCampaigns;
    }
}

contract Campaign  {
    struct Donation {
        uint amount;
        string comment;
    }

    struct Donator {
        bool exists;
        string name;
        uint date;
        Donation[] donations;
    }

    address public manager;
    uint public minimumContribution;
    string public title;
    string public description;
    address[] public membersList;
    mapping(address => Donator) public members;

    constructor (uint minimum, string memory titleCont, string memory descriptionCont, address managerCont) {
        manager = managerCont;
        minimumContribution = minimum;
        title = titleCont;
        description = descriptionCont;
    }

    function newDonatorContribution(string memory nameDonator, string memory commentDonator) public payable {
        require(msg.value > minimumContribution);
        require(!members[msg.sender].exists);
        membersList.push(msg.sender);
        Donator storage newDonator = members[msg.sender];
        newDonator.name = nameDonator;
        newDonator.date = block.timestamp;
        newDonator.exists = true;

        Donation memory newDonation = Donation({amount: msg.value, comment:commentDonator});
        newDonator.donations.push(newDonation);
    }
    
    function getDonations (address donator) public view returns(Donation[]memory){
        return (members[donator].donations);
    }

    function getMemberList () public view returns(address[]memory){
        return membersList;
    }

    function addDonation(string memory commentDonator) public payable {
        require(msg.value > minimumContribution);
        require(members[msg.sender].exists);

        Donator storage donor = members[msg.sender];
        Donation memory newDonation = Donation({amount: msg.value, comment:commentDonator});

        donor.donations.push(newDonation);
    }

}