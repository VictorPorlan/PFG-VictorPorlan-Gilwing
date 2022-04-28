// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.9;

contract Campaign  {
    struct Donator {
        string name;
        uint date;
        uint amount;
        string comment;
    }

    address public manager;
    uint public minimumContribution;
    string public title;
    string public description;

    constructor (uint minimum, string memory titleCont, string memory descriptionCont) {
        manager = msg.sender;
        minimumContribution = minimum;
        title = titleCont;
        description = descriptionCont;
    }

    
}