// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.9;

contract Campaign  {
    struct Donator {
        bool exists;
        string name;
        uint date;
        uint[] donations;
        string comment;
    }

    address public manager;
    uint public minimumContribution;
    string public title;
    string public description;
    address[] public membersList;
    mapping(address => Donator) members;

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
        newDonator.donations.push(msg.value);
        newDonator.comment = commentDonator;
        newDonator.exists = true;
    }
    
    function donatorData(address donatorAddress) public view returns(Donator memory){
        return members[donatorAddress];
    }
}