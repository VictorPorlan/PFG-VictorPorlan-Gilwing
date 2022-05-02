// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.9;

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

    constructor (uint minimum, string memory titleCont, string memory descriptionCont) {
        manager = msg.sender;
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
    
}